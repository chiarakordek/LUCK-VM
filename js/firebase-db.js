const FirebaseDB = (() => {
  'use strict';

  const CONFIG_DOC = 'config';
  const SECCIONES_COL = 'secciones';

  // ===== CONFIG =====
  async function getConfig() {
    try {
      const doc = await db.collection('admin').doc(CONFIG_DOC).get();
      if (doc.exists) return doc.data();
    } catch (e) { /* ignore */ }
    return { whatsapp: { numero: '' }, catalogo: { nombre: 'Luck VM', subtitulo: 'Catálogo de Productos • Impresión Creativa', videoUrl: '' } };
  }

  async function saveConfig(data) {
    await db.collection('admin').doc(CONFIG_DOC).set(data, { merge: true });
  }

  // ===== SECCIONES =====
  async function getSecciones() {
    const snapshot = await db.collection(SECCIONES_COL).orderBy('orden', 'asc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function addSeccion(data) {
    const ref = await db.collection(SECCIONES_COL).add({
      nombre: data.nombre,
      orden: data.orden || Date.now(),
      productos: []
    });
    return ref.id;
  }

  async function updateSeccion(id, data) {
    await db.collection(SECCIONES_COL).doc(id).update({ nombre: data.nombre });
  }

  async function deleteSeccion(id) {
    await db.collection(SECCIONES_COL).doc(id).delete();
  }

  // ===== PRODUCTOS =====
  async function addProducto(sectionId, producto) {
    const secRef = db.collection(SECCIONES_COL).doc(sectionId);
    const secDoc = await secRef.get();
    if (!secDoc.exists) throw new Error('Sección no encontrada');

    const productos = secDoc.data().productos || [];
    const newId = 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const newProducto = { id: newId, ...producto };
    productos.push(newProducto);

    await secRef.update({ productos });
    return newId;
  }

  async function updateProducto(sectionId, productId, producto) {
    const secRef = db.collection(SECCIONES_COL).doc(sectionId);
    const secDoc = await secRef.get();
    if (!secDoc.exists) throw new Error('Sección no encontrada');

    const productos = secDoc.data().productos || [];
    const idx = productos.findIndex(p => p.id === productId);
    if (idx === -1) throw new Error('Producto no encontrado');

    productos[idx] = { ...productos[idx], ...producto };
    await secRef.update({ productos });
  }

  async function deleteProducto(sectionId, productId) {
    const secRef = db.collection(SECCIONES_COL).doc(sectionId);
    const secDoc = await secRef.get();
    if (!secDoc.exists) return;

    const productos = secDoc.data().productos || [];
    const filtered = productos.filter(p => p.id !== productId);
    await secRef.update({ productos: filtered });
  }

  async function moveProducto(fromSectionId, toSectionId, productId) {
    const fromRef = db.collection(SECCIONES_COL).doc(fromSectionId);
    const toRef = db.collection(SECCIONES_COL).doc(toSectionId);

    const fromDoc = await fromRef.get();
    const toDoc = await toRef.get();
    if (!fromDoc.exists || !toDoc.exists) return;

    const fromProductos = fromDoc.data().productos || [];
    const producto = fromProductos.find(p => p.id === productId);
    if (!producto) return;

    const newFrom = fromProductos.filter(p => p.id !== productId);
    const toProductos = toDoc.data().productos || [];
    toProductos.push(producto);

    await fromRef.update({ productos: newFrom });
    await toRef.update({ productos: toProductos });
  }

  // ===== SEED DATA (primera vez) =====
  async function seedData() {
    const snapshot = await db.collection(SECCIONES_COL).limit(1).get();
    if (!snapshot.empty) return;

    const defaultData = typeof CATALOGO_DATA !== 'undefined' ? CATALOGO_DATA : null;
    if (!defaultData) return;

    for (const sec of defaultData.secciones) {
      await db.collection(SECCIONES_COL).add({
        nombre: sec.nombre,
        orden: sec.orden,
        productos: sec.productos
      });
    }

    await saveConfig({
      whatsapp: { numero: '' },
      catalogo: { nombre: 'Luck VM', subtitulo: 'Catálogo de Productos • Impresión Creativa', videoUrl: '' }
    });

    await saveStock({ actual: 1000, minimo: 300, historial: [] });
  }

  // ===== RESET CATALOGO (borrar y re-seedear) =====
  async function resetCatalogo() {
    const snapshot = await db.collection(SECCIONES_COL).get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    const defaultData = typeof CATALOGO_DATA !== 'undefined' ? CATALOGO_DATA : null;
    if (!defaultData) return;

    for (const sec of defaultData.secciones) {
      await db.collection(SECCIONES_COL).add({
        nombre: sec.nombre,
        orden: sec.orden,
        productos: sec.productos
      });
    }
  }

  // ===== PEDIDOS =====
  const PEDIDOS_COL = 'pedidos';

  async function savePedido(pedido) {
    const ref = await db.collection(PEDIDOS_COL).add({
      ...pedido,
      estado: 'pendiente',
      fecha: new Date().toISOString(),
      fechaModificacion: new Date().toISOString()
    });
    return ref.id;
  }

  async function getPedidos() {
    const snapshot = await db.collection(PEDIDOS_COL).orderBy('fecha', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function updatePedido(id, data) {
    await db.collection(PEDIDOS_COL).doc(id).update({
      ...data,
      fechaModificacion: new Date().toISOString()
    });
  }

  async function deletePedido(id) {
    await db.collection(PEDIDOS_COL).doc(id).delete();
  }

  // ===== STOCK =====
  const STOCK_DOC = 'stock';

  async function getStock() {
    try {
      const doc = await db.collection('admin').doc(STOCK_DOC).get();
      if (doc.exists) return doc.data();
    } catch (e) { /* ignore */ }
    return { actual: 1000, minimo: 300, historial: [] };
  }

  async function saveStock(data) {
    await db.collection('admin').doc(STOCK_DOC).set(data, { merge: true });
  }

  async function updateStock(gramos, motivo) {
    const stock = await getStock();
    stock.actual = Math.max(0, stock.actual + gramos);
    stock.historial = stock.historial || [];
    stock.historial.unshift({
      cambio: gramos,
      motivo: motivo || (gramos > 0 ? 'Compra de filamento' : 'Pedido despachado'),
      fecha: new Date().toISOString(),
      saldo: stock.actual
    });
    if (stock.historial.length > 100) stock.historial = stock.historial.slice(0, 100);
    await saveStock(stock);
    return stock;
  }

  return {
    getConfig,
    saveConfig,
    getSecciones,
    addSeccion,
    updateSeccion,
    deleteSeccion,
    addProducto,
    updateProducto,
    deleteProducto,
    moveProducto,
    seedData,
    resetCatalogo,
    savePedido,
    getPedidos,
    updatePedido,
    deletePedido,
    getStock,
    saveStock,
    updateStock
  };
})();

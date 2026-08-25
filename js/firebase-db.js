const FirebaseDB = (() => {
  'use strict';

  const CONFIG_DOC = 'config';
  const SECCIONES_COL = 'secciones';
  const FILAMENTOS_COL = 'filamentos';
  const PEDIDOS_COL = 'pedidos';

  // ===== CONFIG =====
  async function getConfig() {
    try {
      const doc = await db.collection('admin').doc(CONFIG_DOC).get();
      if (doc.exists) return doc.data();
    } catch (e) { /* ignore */ }
    return { whatsapp: { numero: '5493535630595' }, catalogo: { nombre: 'Luck VM', subtitulo: 'Catálogo de Productos • Impresión Creativa', videoUrl: 'https://www.youtube.com/embed/V8hpJz5eX38' }, costoGramo: 25, markup: 3 };
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

  // ===== FILAMENTOS =====
  const FILAMENTOS_DEFAULT = [
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Jet Black', colorHex: '#1a1a1a' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Lily White', colorHex: '#f0f0f0' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Scarlet Red', colorHex: '#cc2222' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'True Blue', colorHex: '#2255cc' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Grass Green', colorHex: '#22aa44' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Lemon Yellow', colorHex: '#ddcc22' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Sun Orange', colorHex: '#ee7722' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Sakura Pink', colorHex: '#ee66aa' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Concrete Gray', colorHex: '#888888' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Chocolate Brown', colorHex: '#885533' },
    { marca: 'BambuLab', tipo: 'PLA Basic', color: 'Lavender Purple', colorHex: '#8844cc' }
  ];

  async function getFilamentos() {
    const snapshot = await db.collection(FILAMENTOS_COL).orderBy('color').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async function addFilamento(data) {
    const ref = await db.collection(FILAMENTOS_COL).add({
      marca: data.marca || 'BambuLab',
      tipo: data.tipo || 'PLA Basic',
      color: data.color,
      colorHex: data.colorHex || '#cccccc',
      gramosActuales: data.gramosActuales || 1000,
      gramosMax: data.gramosMax || 1000,
      gramosMin: data.gramosMin || 200,
      historial: []
    });
    return ref.id;
  }

  async function updateFilamento(id, data) {
    await db.collection(FILAMENTOS_COL).doc(id).update(data);
  }

  async function deleteFilamento(id) {
    await db.collection(FILAMENTOS_COL).doc(id).delete();
  }

  async function addFilamentoStock(id, gramos, motivo) {
    const ref = db.collection(FILAMENTOS_COL).doc(id);
    const doc = await ref.get();
    if (!doc.exists) throw new Error('Filamento no encontrado');

    const fil = doc.data();
    const nuevoActual = Math.min((fil.gramosActuales || 0) + gramos, fil.gramosMax || 1000);
    const historial = fil.historial || [];
    historial.unshift({
      cambio: gramos,
      motivo: motivo || 'Compra de filamento',
      fecha: new Date().toISOString(),
      saldo: nuevoActual
    });
    if (historial.length > 50) historial.length = 50;

    await ref.update({ gramosActuales: nuevoActual, historial });
    return { ...fil, gramosActuales: nuevoActual };
  }

  async function deductFilamentoStock(items, pedidoId) {
    const filamentosUsados = {};

    for (const item of items) {
      for (const f of (item.filamento || [])) {
        const key = f.filamentoId;
        if (!key) continue;
        filamentosUsados[key] = (filamentosUsados[key] || 0) + (f.gramos * (item.cantidad || 1));
      }
    }

    const errores = [];
    for (const [filId, totalGrams] of Object.entries(filamentosUsados)) {
      const ref = db.collection(FILAMENTOS_COL).doc(filId);
      const doc = await ref.get();
      if (!doc.exists) { errores.push(`Filamento ${filId} no encontrado`); continue; }

      const fil = doc.data();
      const nuevoActual = Math.max(0, (fil.gramosActuales || 0) - totalGrams);
      const historial = fil.historial || [];
      historial.unshift({
        cambio: -totalGrams,
        motivo: `Pedido ${pedidoId || 'confirmado'}`,
        fecha: new Date().toISOString(),
        saldo: nuevoActual
      });
      if (historial.length > 50) historial.length = 50;

      await ref.update({ gramosActuales: nuevoActual, historial });
    }

    return errores;
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
      whatsapp: { numero: '5493535630595' },
      catalogo: { nombre: 'Luck VM', subtitulo: 'Catálogo de Productos • Impresión Creativa', videoUrl: 'https://www.youtube.com/embed/V8hpJz5eX38' },
      costoGramo: 25,
      markup: 3
    });

    await seedFilamentos();
  }

  async function seedFilamentos() {
    const snapshot = await db.collection(FILAMENTOS_COL).limit(1).get();
    if (!snapshot.empty) return;

    for (const f of FILAMENTOS_DEFAULT) {
      await addFilamento({ ...f, gramosActuales: 1000, gramosMax: 1000, gramosMin: 200 });
    }
  }

  // ===== RESET CATALOGO (borrar y re-seedear) =====
  async function resetCatalogo() {
    const snapshot = await db.collection(SECCIONES_COL).get();
    for (const doc of snapshot.docs) {
      await db.collection(SECCIONES_COL).doc(doc.id).delete();
    }

    const filSnapshot = await db.collection(FILAMENTOS_COL).get();
    for (const doc of filSnapshot.docs) {
      await db.collection(FILAMENTOS_COL).doc(doc.id).delete();
    }

    const defaultData = typeof CATALOGO_DATA !== 'undefined' ? CATALOGO_DATA : null;
    if (!defaultData) throw new Error('CATALOGO_DATA no encontrado');

    for (const sec of defaultData.secciones) {
      await db.collection(SECCIONES_COL).add({
        nombre: sec.nombre,
        orden: sec.orden,
        productos: sec.productos
      });
    }

    for (const f of FILAMENTOS_DEFAULT) {
      await addFilamento({ ...f, gramosActuales: 1000, gramosMax: 1000, gramosMin: 200 });
    }
  }

  // ===== PEDIDOS =====
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
    getFilamentos,
    addFilamento,
    updateFilamento,
    deleteFilamento,
    addFilamentoStock,
    deductFilamentoStock,
    seedFilamentos,
    seedData,
    resetCatalogo,
    savePedido,
    getPedidos,
    updatePedido,
    deletePedido
  };
})();

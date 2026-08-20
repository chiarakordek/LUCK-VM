(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  let secciones = [];
  let appConfig = {};

  // ===== TOAST =====
  function showToast(msg, isError = false) {
    const toast = $('#toastAdmin');
    toast.textContent = msg;
    toast.className = 'toast-admin' + (isError ? ' error' : '');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // ===== AUTH =====
  function initAuth() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        showAdmin(user.email);
      } else {
        showLogin();
      }
    });

    $('#loginBtn').addEventListener('click', doLogin);
    $('#loginPassword').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doLogin();
    });
    $('#logoutBtn').addEventListener('click', doLogout);
  }

  async function doLogin() {
    const email = $('#loginEmail').value.trim();
    const password = $('#loginPassword').value;

    if (!email || !password) {
      showToast('Completá email y contraseña', true);
      return;
    }

    try {
      $('#loginError').style.display = 'none';
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.error('Login error:', e);
      $('#loginError').textContent = 'Email o contraseña incorrectos';
      $('#loginError').style.display = 'block';
    }
  }

  function doLogout() {
    auth.signOut();
  }

  function showLogin() {
    $('#loginScreen').style.display = 'flex';
    $('#adminLayout').classList.remove('active');
    $('#loginPassword').value = '';
  }

  async function showAdmin(email) {
    $('#loginScreen').style.display = 'none';
    $('#adminLayout').classList.add('active');
    if (email) {
      const headerP = $('.sidebar-header p');
      if (headerP) headerP.textContent = email;
    }
    await loadData();
    renderDashboard();
  }

  // ===== DATA =====
  async function loadData() {
    try {
      secciones = await FirebaseDB.getSecciones();
      appConfig = await FirebaseDB.getConfig();
    } catch (e) {
      console.error('Error loading data:', e);
      showToast('Error al cargar datos', true);
    }
  }

  // ===== NAVIGATION =====
  function navigateTo(page) {
    $$('.admin-page').forEach(p => p.classList.remove('active'));
    $$('.nav-link').forEach(l => l.classList.remove('active'));

    $(`#page-${page}`).classList.add('active');
    $(`.nav-link[data-page="${page}"]`).classList.add('active');

    $('#adminSidebar').classList.remove('open');

    if (page === 'dashboard') renderDashboard();
    if (page === 'productos') renderProductsTable();
    if (page === 'secciones') renderSectionsTable();
    if (page === 'configuracion') renderConfigForm();
    if (page === 'calculadora') renderCalculatorPage();
    if (page === 'pedidos') renderPedidosPage();
    if (page === 'stock') renderStockPage();
  }

  // ===== DASHBOARD =====
  function renderDashboard() {
    let totalProducts = 0;
    secciones.forEach(s => totalProducts += (s.productos || []).length);

    const hasWhatsApp = appConfig.whatsapp?.numero ? 'Configurado' : 'No configurado';

    $('#statsGrid').innerHTML = `
      <div class="stat-card">
        <div class="stat-label">Total Productos</div>
        <div class="stat-value">${totalProducts}</div>
        <div class="stat-sub">en ${secciones.length} secciones</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Secciones</div>
        <div class="stat-value">${secciones.length}</div>
        <div class="stat-sub">categorías activas</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">WhatsApp</div>
        <div class="stat-value" style="font-size:1.2rem;">${hasWhatsApp}</div>
        <div class="stat-sub">${appConfig.whatsapp?.numero || 'Sin número'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Última edición</div>
        <div class="stat-value" style="font-size:1.2rem;">${new Date().toLocaleDateString('es-AR')}</div>
      </div>
    `;
  }

  // ===== PRODUCTS TABLE =====
  function renderProductsTable() {
    let rows = '';
    secciones.forEach(sec => {
      (sec.productos || []).forEach(p => {
        rows += `
          <tr>
            <td><img class="col-img" src="${p.imagen}" alt="${p.nombre}"></td>
            <td><strong>${p.nombre}</strong><br><span style="color:var(--text-muted);font-size:0.8rem;">${sec.nombre}</span></td>
            <td class="col-actions">
              <button class="btn-edit" data-edit="${p.id}" data-sec="${sec.id}">Editar</button>
              <button class="btn-delete" data-delete="${p.id}" data-sec="${sec.id}">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });

    if (!rows) {
      rows = '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:40px;">No hay productos. Creá uno nuevo.</td></tr>';
    }

    $('#productsTable').innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    $$('.btn-edit[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => openProductForm(btn.dataset.edit, btn.dataset.sec));
    });

    $$('.btn-delete[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => deleteProduct(btn.dataset.sec, btn.dataset.delete));
    });
  }

  async function deleteProduct(sectionId, productId) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
      await FirebaseDB.deleteProducto(sectionId, productId);
      await loadData();
      renderProductsTable();
      showToast('Producto eliminado');
    } catch (e) {
      showToast('Error al eliminar: ' + e.message, true);
    }
  }

  function openProductForm(productId, sectionId) {
    const product = productId ? findProduct(productId) : null;
    const isEdit = !!product;

    $('#modalFormTitle').textContent = isEdit ? 'Editar producto' : 'Nuevo producto';

    const sectionOptions = secciones.map(s =>
      `<option value="${s.id}" ${product && product._sectionId === s.id ? 'selected' : ''}>${s.nombre}</option>`
    ).join('');

    const formHtml = `
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" id="formNombre" value="${product?.nombre || ''}">
      </div>
      <div class="form-group">
        <label>Sección</label>
        <select id="formSeccion">${sectionOptions}</select>
      </div>
      <div class="form-group">
        <label>Descripción (cómo se usa / cómo se juega)</label>
        <textarea id="formDesc">${product?.descripcion || product?.descripcionCorta || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Ruta de imagen</label>
        <input type="text" id="formImagen" value="${product?.imagen || 'images/'}" placeholder="images/archivo.png">
      </div>
      <div class="form-group">
        <label>Gramos de filamento</label>
        <input type="number" id="formFilamentoGrams" value="${product?.filamentoGrams || 0}" min="0" placeholder="0">
      </div>
      <div class="form-actions">
        <button class="btn-primary" id="formSave">${isEdit ? 'Guardar cambios' : 'Crear producto'}</button>
        <button class="btn-secondary" id="formCancel">Cancelar</button>
      </div>
    `;

    $('#modalFormContent').innerHTML = formHtml;
    $('#modalFormOverlay').classList.add('active');

    if (isEdit && product._sectionId) {
      $('#formSeccion').value = product._sectionId;
    }

    $('#formCancel').addEventListener('click', closeForm);
    $('#modalFormOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeForm();
    });

    $('#formSave').addEventListener('click', async () => {
      const nombre = $('#formNombre').value;
      const seccionId = $('#formSeccion').value;
      const desc = $('#formDesc').value;
      const imagen = $('#formImagen').value;
      const filamentoGrams = parseInt($('#formFilamentoGrams').value) || 0;

      if (!nombre || !seccionId || !imagen) {
        showToast('Completá nombre, sección e imagen', true);
        return;
      }

      const productData = {
        nombre,
        descripcion: desc,
        imagen,
        filamentoGrams,
        destacado: product?.destacado || false
      };

      try {
        if (isEdit) {
          const oldSectionId = product._sectionId;
          if (oldSectionId !== seccionId) {
            await FirebaseDB.moveProducto(oldSectionId, seccionId, productId);
            await FirebaseDB.updateProducto(seccionId, productId, productData);
          } else {
            await FirebaseDB.updateProducto(seccionId, productId, productData);
          }
        } else {
          await FirebaseDB.addProducto(seccionId, productData);
        }

        await loadData();
        closeForm();
        renderProductsTable();
        showToast(isEdit ? 'Producto actualizado' : 'Producto creado');
      } catch (e) {
        showToast('Error: ' + e.message, true);
      }
    });
  }

  function closeForm() {
    $('#modalFormOverlay').classList.remove('active');
  }

  function findProduct(id) {
    for (const sec of secciones) {
      const p = (sec.productos || []).find(p => p.id === id);
      if (p) return { ...p, _sectionId: sec.id };
    }
    return null;
  }

  // ===== SECTIONS TABLE =====
  function renderSectionsTable() {
    let rows = '';
    secciones.forEach((sec, idx) => {
      rows += `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${sec.nombre}</strong></td>
          <td>${(sec.productos || []).length} productos</td>
          <td class="col-actions">
            <button class="btn-edit" data-edit-sec="${sec.id}">Editar</button>
            <button class="btn-delete" data-delete-sec="${sec.id}">Eliminar</button>
          </td>
        </tr>
      `;
    });

    $('#sectionsTable').innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Sección</th>
            <th>Productos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:40px;">No hay secciones.</td></tr>'}</tbody>
      </table>
    `;

    $$('.btn-edit[data-edit-sec]').forEach(btn => {
      btn.addEventListener('click', () => openSectionForm(btn.dataset.editSec));
    });

    $$('.btn-delete[data-delete-sec]').forEach(btn => {
      btn.addEventListener('click', () => deleteSection(btn.dataset.deleteSec));
    });
  }

  async function deleteSection(id) {
    const sec = secciones.find(s => s.id === id);
    if (!sec) return;
    if (!confirm(`¿Eliminar la sección "${sec.nombre}" y sus ${(sec.productos || []).length} productos?`)) return;
    try {
      await FirebaseDB.deleteSeccion(id);
      await loadData();
      renderSectionsTable();
      showToast('Sección eliminada');
    } catch (e) {
      showToast('Error: ' + e.message, true);
    }
  }

  function openSectionForm(sectionId) {
    const section = sectionId ? secciones.find(s => s.id === sectionId) : null;
    const isEdit = !!section;

    $('#modalFormTitle').textContent = isEdit ? 'Editar sección' : 'Nueva sección';

    $('#modalFormContent').innerHTML = `
      <div class="form-group">
        <label>Nombre de la sección</label>
        <input type="text" id="formSecNombre" value="${section?.nombre || ''}">
      </div>
      <div class="form-group">
        <label>ID (identificador único)</label>
        <input type="text" id="formSecId" value="${section?.id || ''}" ${isEdit ? 'disabled' : ''} placeholder="ej: juegos-mesa">
      </div>
      <div class="form-actions">
        <button class="btn-primary" id="formSecSave">${isEdit ? 'Guardar' : 'Crear'}</button>
        <button class="btn-secondary" id="formSecCancel">Cancelar</button>
      </div>
    `;

    $('#modalFormOverlay').classList.add('active');

    $('#formSecCancel').addEventListener('click', closeForm);
    $('#formSecSave').addEventListener('click', async () => {
      const nombre = $('#formSecNombre').value.trim();
      const id = $('#formSecId').value.trim();

      if (!nombre) {
        showToast('Completá el nombre', true);
        return;
      }

      try {
        if (isEdit) {
          await FirebaseDB.updateSeccion(section.id, { nombre });
        } else {
          if (!id) {
            showToast('Completá el ID', true);
            return;
          }
          if (secciones.find(s => s.id === id)) {
            showToast('Ya existe una sección con ese ID', true);
            return;
          }
          await FirebaseDB.addSeccion({ nombre, id, orden: secciones.length + 1 });
        }

        await loadData();
        closeForm();
        renderSectionsTable();
        showToast(isEdit ? 'Sección actualizada' : 'Sección creada');
      } catch (e) {
        showToast('Error: ' + e.message, true);
      }
    });
  }

  // ===== CONFIG =====
  function renderConfigForm() {
    $('#configForm').innerHTML = `
      <div class="form-group">
        <label>Número de WhatsApp (formato: 5491155551234)</label>
        <input type="text" id="cfgWhatsapp" value="${appConfig.whatsapp?.numero || ''}" placeholder="5491155551234">
      </div>
      <div class="form-group">
        <label>Nombre del catálogo</label>
        <input type="text" id="cfgNombre" value="${appConfig.catalogo?.nombre || 'Luck VM'}">
      </div>
      <div class="form-group">
        <label>Subtítulo del header</label>
        <input type="text" id="cfgSubtitulo" value="${appConfig.catalogo?.subtitulo || 'Catálogo de Productos • Impresión Creativa'}">
      </div>
      <div class="form-group">
        <label>URL del video (YouTube embed u otro)</label>
        <input type="text" id="cfgVideo" value="${appConfig.catalogo?.videoUrl || ''}" placeholder="https://www.youtube.com/embed/...">
      </div>
      <div class="form-actions">
        <button class="btn-primary" id="cfgSave">Guardar configuración</button>
      </div>
    `;

    $('#cfgSave').addEventListener('click', async () => {
      const config = {
        whatsapp: { numero: $('#cfgWhatsapp').value.trim() },
        catalogo: {
          nombre: $('#cfgNombre').value.trim(),
          subtitulo: $('#cfgSubtitulo').value.trim(),
          videoUrl: $('#cfgVideo').value.trim()
        }
      };

      try {
        await FirebaseDB.saveConfig(config);
        appConfig = config;
        showToast('Configuración guardada');
      } catch (e) {
        showToast('Error: ' + e.message, true);
      }
    });
  }

  // ===== CALCULATOR =====
  const CALC_PRESETS = [
    { name: 'Pila 1220', cost: 300 },
    { name: 'LED (diodo)', cost: 70 },
    { name: 'Clicker (switch)', cost: 240 },
    { name: 'Llavero', cost: 200 },
    { name: 'Bolsa', cost: 100 },
    { name: 'Imán', cost: 320 }
  ];
  const CALC_FILAMENTO = 25;
  const CALC_ELECTRICIDAD = 15;
  let calcComponents = [];

  function calcFmt(n) {
    return '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function renderCalculatorPage() {
    const container = document.getElementById('calculatorContent');
    if (!container) return;

    container.innerHTML = `
      <div class="calc-grid">
        <div class="calc-card">
          <h3>Filamento</h3>
          <div class="calc-field">
            <label>Gramos utilizados</label>
            <input type="number" id="calcGrams" value="0" min="0" step="1">
            <span class="calc-sub">${calcFmt(CALC_FILAMENTO)}/gramo</span>
          </div>
          <div class="calc-result" id="resultFilamento">${calcFmt(0)}</div>
        </div>
        <div class="calc-card">
          <h3>Electricidad</h3>
          <div class="calc-field">
            <label>Tiempo de impresión</label>
            <div class="calc-time">
              <input type="number" id="calcHours" value="0" min="0" max="99" placeholder="hs">
              <span>:</span>
              <input type="number" id="calcMinutes" value="0" min="0" max="59" placeholder="min">
            </div>
            <span class="calc-sub">BambuLab A1 ~100W · ${calcFmt(CALC_ELECTRICIDAD)}/hora</span>
          </div>
          <div class="calc-result" id="resultElectricidad">${calcFmt(0)}</div>
        </div>
        <div class="calc-card calc-card-wide">
          <h3>Componentes</h3>
          <div id="componentsList"></div>
          <div class="calc-add-component">
            <div class="calc-presets">
              <span class="calc-presets-label">Agregar rápido:</span>
              <div class="calc-presets-btns">
                ${CALC_PRESETS.map(p => `<button class="btn-preset" data-name="${p.name}" data-cost="${p.cost}">${p.name}</button>`).join('')}
              </div>
            </div>
            <div class="calc-custom-row">
              <input type="text" id="compName" placeholder="Componente custom">
              <input type="number" id="compCost" placeholder="Costo unitario $" min="0">
              <input type="number" id="compQty" placeholder="Cant." min="1" value="1">
              <button class="btn-primary" id="btnAddComp">+ Agregar</button>
            </div>
          </div>
          <div class="calc-result" id="resultComponentes">${calcFmt(0)}</div>
        </div>
      </div>
      <div class="calc-total">
        <span>COSTO TOTAL ESTIMADO</span>
        <span class="calc-total-value" id="resultTotal">${calcFmt(0)}</span>
      </div>
    `;

    ['calcGrams', 'calcHours', 'calcMinutes'].forEach(id => {
      document.getElementById(id).addEventListener('input', calcUpdate);
    });

    document.querySelectorAll('.btn-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        calcComponents.push({ name: btn.dataset.name, cost: parseFloat(btn.dataset.cost), qty: 1 });
        calcRenderComponents();
        calcUpdate();
      });
    });

    document.getElementById('btnAddComp').addEventListener('click', calcAddComponent);
    document.getElementById('compCost').addEventListener('keydown', (e) => { if (e.key === 'Enter') calcAddComponent(); });
    document.getElementById('compQty').addEventListener('keydown', (e) => { if (e.key === 'Enter') calcAddComponent(); });

    calcComponents = [];
    calcUpdate();
  }

  function calcAddComponent() {
    const nameEl = document.getElementById('compName');
    const costEl = document.getElementById('compCost');
    const qtyEl = document.getElementById('compQty');
    const name = nameEl.value.trim();
    const cost = parseFloat(costEl.value) || 0;
    const qty = parseInt(qtyEl.value) || 1;
    if (!name || cost <= 0) return;
    calcComponents.push({ name, cost, qty: Math.max(1, qty) });
    nameEl.value = '';
    costEl.value = '';
    qtyEl.value = '1';
    calcRenderComponents();
    calcUpdate();
  }

  function calcRenderComponents() {
    const list = document.getElementById('componentsList');
    list.innerHTML = calcComponents.map((c, i) => `
      <div class="calc-extra-row">
        <span class="calc-comp-name">${c.name}</span>
        <span class="calc-comp-price">${calcFmt(c.cost)} c/u</span>
        <div class="calc-comp-qty">
          <button class="calc-extra-remove" data-idx="${i}" data-action="minus">−</button>
          <span>${c.qty}</span>
          <button class="calc-extra-remove" data-idx="${i}" data-action="plus">+</button>
        </div>
        <span class="calc-comp-subtotal">${calcFmt(c.cost * c.qty)}</span>
        <button class="calc-extra-remove calc-extra-delete" data-idx="${i}" data-action="delete">×</button>
      </div>
    `).join('');

    list.querySelectorAll('.calc-extra-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const action = btn.dataset.action;
        if (action === 'delete') {
          calcComponents.splice(idx, 1);
        } else if (action === 'plus') {
          calcComponents[idx].qty++;
        } else if (action === 'minus') {
          calcComponents[idx].qty = Math.max(1, calcComponents[idx].qty - 1);
        }
        calcRenderComponents();
        calcUpdate();
      });
    });
  }

  function calcUpdate() {
    const grams = parseFloat(document.getElementById('calcGrams')?.value) || 0;
    const hours = parseFloat(document.getElementById('calcHours')?.value) || 0;
    const minutes = parseFloat(document.getElementById('calcMinutes')?.value) || 0;
    const totalHours = hours + (minutes / 60);
    const cFil = grams * CALC_FILAMENTO;
    const cElec = totalHours * CALC_ELECTRICIDAD;
    const cComp = calcComponents.reduce((s, c) => s + (c.cost * c.qty), 0);
    const total = cFil + cElec + cComp;

    document.getElementById('resultFilamento').textContent = calcFmt(cFil);
    document.getElementById('resultElectricidad').textContent = calcFmt(cElec);
    document.getElementById('resultComponentes').textContent = calcFmt(cComp);
    document.getElementById('resultTotal').textContent = calcFmt(total);
  }

  // ===== PEDIDOS =====
  async function renderPedidosPage() {
    const container = document.getElementById('pedidosContent');
    if (!container) return;
    container.innerHTML = '<p style="color:var(--text-muted);">Cargando pedidos...</p>';

    let pedidos = [];
    try {
      pedidos = await FirebaseDB.getPedidos();
    } catch (e) {
      container.innerHTML = '<p style="color:var(--danger);">Error al cargar pedidos</p>';
      return;
    }

    if (pedidos.length === 0) {
      container.innerHTML = '<div class="empty-state">No hay pedidos todavía. Los pedidos aparecen cuando un cliente envía el carrito por WhatsApp.</div>';
      return;
    }

    container.innerHTML = pedidos.map(p => {
      const fecha = new Date(p.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const estadoClass = p.estado === 'pendiente' ? 'badge-pending' : p.estado === 'confirmado' ? 'badge-confirmed' : 'badge-cancelled';
      const items = (p.items || []).map(item => `
        <div class="pedido-item">
          <span class="pedido-item-name">${item.nombre}</span>
          <span class="pedido-item-qty">x${item.cantidad}</span>
          <span class="pedido-item-grams">${item.filamentoGrams || 0}g</span>
          <div class="pedido-item-controls">
            <button class="qty-btn-sm" data-pedido="${p.id}" data-item-idx="${(p.items || []).indexOf(item)}" data-action="minus">−</button>
            <button class="qty-btn-sm" data-pedido="${p.id}" data-item-idx="${(p.items || []).indexOf(item)}" data-action="plus">+</button>
          </div>
        </div>
      `).join('');

      return `
        <div class="pedido-card">
          <div class="pedido-header">
            <span class="pedido-fecha">${fecha}</span>
            <span class="pedido-badge ${estadoClass}">${p.estado}</span>
          </div>
          <div class="pedido-items">${items}</div>
          <div class="pedido-footer">
            <span class="pedido-total-grams">Total filamento: <strong>${p.totalFilamento || 0}g</strong></span>
            <div class="pedido-actions">
              <button class="btn-secondary btn-sm" data-pedido-delete="${p.id}">Eliminar</button>
              ${p.estado === 'pendiente' ? `<button class="btn-primary btn-sm" data-pedido-confirm="${p.id}">Confirmar</button>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const pedidoId = btn.dataset.pedido;
        const idx = parseInt(btn.dataset.itemIdx);
        const action = btn.dataset.action;
        const pedido = pedidos.find(p => p.id === pedidoId);
        if (!pedido || !pedido.items[idx]) return;

        if (action === 'plus') pedido.items[idx].cantidad++;
        if (action === 'minus' && pedido.items[idx].cantidad > 1) pedido.items[idx].cantidad--;

        const product = findProduct(pedido.items[idx].id);
        pedido.items[idx].filamentoGrams = product?.filamentoGrams || 0;
        pedido.totalFilamento = pedido.items.reduce((sum, item) => sum + (item.filamentoGrams * item.cantidad), 0);

        await FirebaseDB.updatePedido(pedidoId, { items: pedido.items, totalFilamento: pedido.totalFilamento });
        renderPedidosPage();
      });
    });

    container.querySelectorAll('[data-pedido-confirm]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const pedidoId = btn.dataset.pedidoConfirm;
        const pedido = pedidos.find(p => p.id === pedidoId);
        if (!pedido) return;

        const stock = await FirebaseDB.getStock();
        if (stock.actual < (pedido.totalFilamento || 0)) {
          showToast('Stock insuficiente para confirmar este pedido', true);
          return;
        }

        await FirebaseDB.updatePedido(pedidoId, { estado: 'confirmado' });
        await FirebaseDB.updateStock(-(pedido.totalFilamento || 0), `Pedido confirmado - ${pedido.items.map(i => i.nombre).join(', ')}`);
        showToast('Pedido confirmado y stock descontado');
        renderPedidosPage();
      });
    });

    container.querySelectorAll('[data-pedido-delete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('¿Eliminar este pedido?')) return;
        await FirebaseDB.deletePedido(btn.dataset.pedidoDelete);
        showToast('Pedido eliminado');
        renderPedidosPage();
      });
    });
  }

  // ===== STOCK =====
  async function renderStockPage() {
    const container = document.getElementById('stockContent');
    if (!container) return;
    container.innerHTML = '<p style="color:var(--text-muted);">Cargando stock...</p>';

    let stock;
    try {
      stock = await FirebaseDB.getStock();
    } catch (e) {
      container.innerHTML = '<p style="color:var(--danger);">Error al cargar stock</p>';
      return;
    }

    const isLow = stock.actual <= stock.minimo;
    const historial = (stock.historial || []).slice(0, 20);

    container.innerHTML = `
      <div class="stock-summary ${isLow ? 'stock-low' : ''}">
        <div class="stock-current">
          <span class="stock-label">Stock actual</span>
          <span class="stock-value">${stock.actual}g</span>
          ${isLow ? '<span class="stock-alert">STOCK BAJO</span>' : ''}
        </div>
        <div class="stock-min">
          <span class="stock-label">Mínimo</span>
          <span class="stock-value-sm">${stock.minimo}g</span>
        </div>
      </div>

      <div class="stock-controls">
        <div class="stock-add">
          <h3>Agregar filamento (compra)</h3>
          <div class="stock-input-row">
            <input type="number" id="stockAddGrams" placeholder="Gramos" min="0">
            <button class="btn-primary" id="btnStockAdd">+ Agregar</button>
          </div>
        </div>
        <div class="stock-subtract">
          <h3>Configurar mínimo</h3>
          <div class="stock-input-row">
            <input type="number" id="stockMinInput" value="${stock.minimo}" min="0">
            <button class="btn-secondary" id="btnStockMin">Guardar</button>
          </div>
        </div>
      </div>

      <div class="stock-history">
        <h3>Historial</h3>
        ${historial.length === 0 ? '<p style="color:var(--text-muted);">Sin movimientos aún</p>' : `
          <table class="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Movimiento</th>
                <th>Motivo</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              ${historial.map(h => {
                const fecha = new Date(h.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const cls = h.cambio > 0 ? 'stock-in' : 'stock-out';
                return `<tr>
                  <td>${fecha}</td>
                  <td class="${cls}">${h.cambio > 0 ? '+' : ''}${h.cambio}g</td>
                  <td>${h.motivo}</td>
                  <td>${h.saldo}g</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        `}
      </div>
    `;

    document.getElementById('btnStockAdd').addEventListener('click', async () => {
      const grams = parseInt(document.getElementById('stockAddGrams').value) || 0;
      if (grams <= 0) { showToast('Ingresá una cantidad válida', true); return; }
      await FirebaseDB.updateStock(grams, 'Compra de filamento');
      showToast(`+${grams}g agregados al stock`);
      renderStockPage();
    });

    document.getElementById('btnStockMin').addEventListener('click', async () => {
      const min = parseInt(document.getElementById('stockMinInput').value) || 0;
      stock.minimo = min;
      await FirebaseDB.saveStock(stock);
      showToast('Mínimo actualizado');
      renderStockPage();
    });
  }

  // ===== INIT =====
  function init() {
    initAuth();

    $$('.nav-link').forEach(link => {
      link.addEventListener('click', () => navigateTo(link.dataset.page));
    });

    $('#mobileMenuBtn').addEventListener('click', () => {
      $('#adminSidebar').classList.toggle('open');
    });

    $('#btnAddProduct').addEventListener('click', () => openProductForm(null, null));
    $('#btnAddSection').addEventListener('click', () => openSectionForm(null));

    $('#btnResetCatalogo').addEventListener('click', async () => {
      if (!confirm('⚠️ Esto va a BORRAR todos los productos y secciones actuales y recargar los datos de data.js. ¿Continuar?')) return;
      const btn = $('#btnResetCatalogo');
      btn.disabled = true;
      btn.textContent = 'Borrando...';
      try {
        await FirebaseDB.resetCatalogo();
        secciones = await FirebaseDB.getSecciones();
        renderDashboard();
        renderProductsTable();
        renderSectionsTable();
        toast('Catálogo reseteado correctamente');
      } catch (err) {
        console.error('Error reset:', err);
        toast('Error al resetear: ' + err.message);
      }
      btn.disabled = false;
      btn.textContent = '🔄 Resetear Catálogo (re-seedear datos)';
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

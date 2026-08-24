(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  let secciones = [];
  let filamentos = [];
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
      filamentos = await FirebaseDB.getFilamentos();
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
    const markup = appConfig.markup || 3;
    const costoGramo = appConfig.costoGramo || 25;
    secciones.forEach(sec => {
      (sec.productos || []).forEach(p => {
        const totalG = (p.filamento || []).reduce((s, f) => s + (f.gramos || 0), 0);
        const precio = Math.round(totalG * costoGramo * markup);
        const precioStr = totalG > 0 ? `$${precio.toLocaleString('es-AR')}` : '-';
        rows += `
          <tr>
            <td><img class="col-img" src="${p.imagen}" alt="${p.nombre}"></td>
            <td><strong>${p.nombre}</strong><br><span style="color:var(--text-muted);font-size:0.8rem;">${sec.nombre}</span></td>
            <td style="text-align:center;font-weight:700;color:var(--accent);">${precioStr}</td>
            <td class="col-actions">
              <button class="btn-edit" data-edit="${p.id}" data-sec="${sec.id}">Editar</button>
              <button class="btn-delete" data-delete="${p.id}" data-sec="${sec.id}">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });

    if (!rows) {
      rows = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:40px;">No hay productos. Creá uno nuevo.</td></tr>';
    }

    $('#productsTable').innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Precio</th>
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

    const productFilamento = product?.filamento || [];
    const filamentoRows = filamentos.map(f => {
      const entry = productFilamento.find(pf => pf.filamentoId === f.id);
      return `
        <div class="fil-row" data-fil-id="${f.id}">
          <span class="fil-swatch" style="background:${f.colorHex}"></span>
          <span class="fil-name">${f.color}</span>
          <input type="number" class="fil-grams-input" data-fil="${f.id}" value="${entry ? entry.gramos : 0}" min="0" placeholder="0">
          <span class="fil-unit">g</span>
        </div>
      `;
    }).join('');

    const totalGrams = productFilamento.reduce((s, f) => s + (f.gramos || 0), 0);
    const markup = appConfig.markup || 3;
    const costoGramo = appConfig.costoGramo || 25;
    const precioEstimado = Math.round(totalGrams * costoGramo * markup);

    const formHtml = `
      <div class="form-group">
        <label for="formNombre">Nombre</label>
        <input type="text" id="formNombre" value="${product?.nombre || ''}">
      </div>
      <div class="form-group">
        <label for="formSeccion">Sección</label>
        <select id="formSeccion">${sectionOptions}</select>
      </div>
      <div class="form-group">
        <label for="formDesc">Descripción</label>
        <textarea id="formDesc">${product?.descripcion || ''}</textarea>
      </div>
      <div class="form-group">
        <label for="formImagen">Ruta de imagen</label>
        <input type="text" id="formImagen" value="${product?.imagen || 'images/'}" placeholder="images/archivo.png">
      </div>
      <div class="form-group">
        <label>Filamento por producto <span id="formFilTotal" style="color:var(--accent);font-weight:600;">(${totalGrams}g total)</span>
          <span id="formPrecioEst" style="color:var(--gold);font-weight:600;margin-left:12px;">→ $${precioEstimado.toLocaleString('es-AR')} (x${markup})</span>
        </label>
        <div class="fil-grid">${filamentoRows}</div>
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

    document.querySelectorAll('.fil-grams-input').forEach(inp => {
      inp.addEventListener('input', () => {
        let total = 0;
        document.querySelectorAll('.fil-grams-input').forEach(i => total += parseInt(i.value) || 0);
        $('#formFilTotal').textContent = `(${total}g total)`;
        const mk = appConfig.markup || 3;
        const cg = appConfig.costoGramo || 25;
        const precio = Math.round(total * cg * mk);
        $('#formPrecioEst').textContent = `→ $${precio.toLocaleString('es-AR')} (x${mk})`;
      });
    });

    $('#formCancel').addEventListener('click', closeForm);
    $('#modalFormOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeForm();
    });

    $('#formSave').addEventListener('click', async () => {
      const nombre = $('#formNombre').value;
      const seccionId = $('#formSeccion').value;
      const desc = $('#formDesc').value;
      const imagen = $('#formImagen').value;

      if (!nombre || !seccionId || !imagen) {
        showToast('Completá nombre, sección e imagen', true);
        return;
      }

      const filamento = [];
      document.querySelectorAll('.fil-grams-input').forEach(inp => {
        const gramos = parseInt(inp.value) || 0;
        if (gramos > 0) {
          filamento.push({ filamentoId: inp.dataset.fil, gramos });
        }
      });

      const productData = {
        nombre,
        descripcion: desc,
        imagen,
        filamento,
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
        <label for="cfgWhatsapp">Número de WhatsApp (formato: 5491155551234)</label>
        <input type="text" id="cfgWhatsapp" value="${appConfig.whatsapp?.numero || ''}" placeholder="5491155551234">
      </div>
      <div class="form-group">
        <label for="cfgNombre">Nombre del catálogo</label>
        <input type="text" id="cfgNombre" value="${appConfig.catalogo?.nombre || 'Luck VM'}">
      </div>
      <div class="form-group">
        <label for="cfgSubtitulo">Subtítulo del header</label>
        <input type="text" id="cfgSubtitulo" value="${appConfig.catalogo?.subtitulo || 'Catálogo de Productos • Impresión Creativa'}">
      </div>
      <div class="form-group">
        <label for="cfgVideo">URL del video (YouTube embed u otro)</label>
        <input type="text" id="cfgVideo" value="${appConfig.catalogo?.videoUrl || ''}" placeholder="https://www.youtube.com/embed/...">
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1);margin:20px 0;padding-top:20px;">
        <label style="font-weight:700;color:var(--gold);margin-bottom:12px;display:block;">💰 Precios (solo visible en admin)</label>
        <div class="form-group">
          <label for="cfgCostoGramo">Costo por gramo de filamento ($)</label>
          <input type="number" id="cfgCostoGramo" value="${appConfig.costoGramo || 25}" min="1" placeholder="25">
        </div>
        <div class="form-group">
          <label for="cfgMarkup">Multiplicador de precio (x)</label>
          <select id="cfgMarkup">
            <option value="2" ${appConfig.markup === 2 ? 'selected' : ''}>x2</option>
            <option value="3" ${(appConfig.markup || 3) === 3 ? 'selected' : ''}>x3 (recomendado)</option>
            <option value="4" ${appConfig.markup === 4 ? 'selected' : ''}>x4</option>
            <option value="5" ${appConfig.markup === 5 ? 'selected' : ''}>x5</option>
          </select>
        </div>
        <p style="color:var(--text-muted);font-size:0.8rem;margin-top:4px;">Precio = Gramos × Costo/gramo × Multiplicador</p>
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
        },
        costoGramo: parseFloat($('#cfgCostoGramo').value) || 25,
        markup: parseInt($('#cfgMarkup').value) || 3
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
      const items = (p.items || []).map(item => {
        const filDots = (item.filamento || []).map(f => {
          const fil = filamentos.find(fi => fi.id === f.filamentoId);
          return fil ? `<span class="fil-swatch-sm" style="background:${fil.colorHex}" title="${fil.color}: ${f.gramos}g"></span>` : '';
        }).join('');
        return `
        <div class="pedido-item">
          <span class="pedido-item-name">${item.nombre}</span>
          <span class="pedido-item-qty">x${item.cantidad}</span>
          <span class="pedido-item-grams">${filDots}</span>
          <div class="pedido-item-controls">
            <button class="qty-btn-sm" data-pedido="${p.id}" data-item-idx="${(p.items || []).indexOf(item)}" data-action="minus">−</button>
            <button class="qty-btn-sm" data-pedido="${p.id}" data-item-idx="${(p.items || []).indexOf(item)}" data-action="plus">+</button>
          </div>
        </div>
      `}).join('');

      return `
        <div class="pedido-card">
          <div class="pedido-header">
            <span class="pedido-fecha">${fecha}</span>
            <span class="pedido-badge ${estadoClass}">${p.estado}</span>
          </div>
          <div class="pedido-items">${items}</div>
          <div class="pedido-footer">
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

        await FirebaseDB.updatePedido(pedidoId, { items: pedido.items });
        renderPedidosPage();
      });
    });

    container.querySelectorAll('[data-pedido-confirm]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const pedidoId = btn.dataset.pedidoConfirm;
        const pedido = pedidos.find(p => p.id === pedidoId);
        if (!pedido) return;

        try {
          const errores = await FirebaseDB.deductFilamentoStock(pedido.items, pedidoId);
          await FirebaseDB.updatePedido(pedidoId, { estado: 'confirmado' });
          if (errores.length > 0) {
            showToast('Pedido confirmado, pero: ' + errores.join('; '), true);
          } else {
            showToast('Pedido confirmado y stock descontado por color');
          }
          filamentos = await FirebaseDB.getFilamentos();
          renderPedidosPage();
        } catch (e) {
          showToast('Error: ' + e.message, true);
        }
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

  // ===== STOCK / FILAMENTOS =====
  async function renderStockPage() {
    const container = document.getElementById('stockContent');
    if (!container) return;
    container.innerHTML = '<p style="color:var(--text-muted);">Cargando inventario...</p>';

    try {
      filamentos = await FirebaseDB.getFilamentos();
    } catch (e) {
      container.innerHTML = '<p style="color:var(--danger);">Error al cargar filamentos</p>';
      return;
    }

    if (filamentos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No hay filamentos cargados.</p>
          <button class="btn-primary" id="btnSeedFil">Cargar filamentos BambuLab (11 colores)</button>
        </div>
      `;
      document.getElementById('btnSeedFil')?.addEventListener('click', async () => {
        await FirebaseDB.seedFilamentos();
        showToast('11 filamentos BambuLab cargados');
        renderStockPage();
      });
      return;
    }

    const totalGrams = filamentos.reduce((s, f) => s + (f.gramosActuales || 0), 0);
    const lowStock = filamentos.filter(f => (f.gramosActuales || 0) <= (f.gramosMin || 0));

    container.innerHTML = `
      <div class="stock-summary ${lowStock.length > 0 ? 'stock-low' : ''}">
        <div class="stock-current">
          <span class="stock-label">Total en inventario</span>
          <span class="stock-value">${(totalGrams / 1000).toFixed(1)}kg</span>
          <span class="stock-sub">${totalGrams}g · ${filamentos.length} rollos</span>
        </div>
        ${lowStock.length > 0 ? `<div class="stock-alert">STOCK BAJO: ${lowStock.map(f => f.color).join(', ')}</div>` : ''}
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h3 style="margin:0;">Inventario de Filamentos</h3>
        <button class="btn-primary" id="btnAddFil">+ Agregar filamento</button>
      </div>

      <div class="fil-inventory-grid">
        ${filamentos.map(f => {
          const pct = f.gramosMax ? Math.round((f.gramosActuales / f.gramosMax) * 100) : 0;
          const isLow = (f.gramosActuales || 0) <= (f.gramosMin || 0);
          return `
            <div class="fil-card ${isLow ? 'fil-low' : ''}">
              <div class="fil-card-header">
                <span class="fil-swatch-lg" style="background:${f.colorHex}"></span>
                <div class="fil-card-info">
                  <strong>${f.color}</strong>
                  <span class="fil-card-type">${f.marca} ${f.tipo}</span>
                </div>
              </div>
              <div class="fil-card-bar">
                <div class="fil-bar-fill" style="width:${pct}%;background:${isLow ? 'var(--danger)' : f.colorHex}"></div>
              </div>
              <div class="fil-card-stats">
                <span>${f.gramosActuales}g / ${f.gramosMax}g</span>
                <span>${pct}%</span>
              </div>
              <div class="fil-card-actions">
                <button class="btn-secondary btn-sm" data-fil-add="${f.id}" title="Agregar stock">+ Stock</button>
                <button class="btn-secondary btn-sm" data-fil-min="${f.id}" title="Configurar mínimo">Mín</button>
                <button class="btn-sm" style="color:var(--danger);background:none;border:none;cursor:pointer;" data-fil-del="${f.id}" title="Eliminar">✕</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="stock-history" style="margin-top:24px;">
        <h3>Historial reciente</h3>
        ${renderFilamentoHistory()}
      </div>
    `;

    container.querySelectorAll('[data-fil-add]').forEach(btn => {
      btn.addEventListener('click', () => promptFilamentoStock(btn.dataset.filAdd));
    });
    container.querySelectorAll('[data-fil-min]').forEach(btn => {
      btn.addEventListener('click', () => promptFilamentoMin(btn.dataset.filMin));
    });
    container.querySelectorAll('[data-fil-del]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('¿Eliminar este filamento?')) return;
        await FirebaseDB.deleteFilamento(btn.dataset.filDel);
        showToast('Filamento eliminado');
        renderStockPage();
      });
    });
    document.getElementById('btnAddFil')?.addEventListener('click', () => openFilamentoForm());
  }

  function renderFilamentoHistory() {
    const allHistory = [];
    filamentos.forEach(f => {
      (f.historial || []).forEach(h => {
        allHistory.push({ ...h, color: f.color, colorHex: f.colorHex });
      });
    });
    allHistory.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const recent = allHistory.slice(0, 20);

    if (recent.length === 0) return '<p style="color:var(--text-muted);">Sin movimientos aún</p>';

    return `
      <table class="data-table">
        <thead><tr><th>Fecha</th><th>Filamento</th><th>Movimiento</th><th>Motivo</th><th>Saldo</th></tr></thead>
        <tbody>
          ${recent.map(h => {
            const fecha = new Date(h.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
            const cls = h.cambio > 0 ? 'stock-in' : 'stock-out';
            return `<tr>
              <td>${fecha}</td>
              <td><span class="fil-swatch-sm" style="background:${h.colorHex}"></span> ${h.color}</td>
              <td class="${cls}">${h.cambio > 0 ? '+' : ''}${h.cambio}g</td>
              <td>${h.motivo}</td>
              <td>${h.saldo}g</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  async function promptFilamentoStock(filId) {
    const fil = filamentos.find(f => f.id === filId);
    if (!fil) return;
    const gramos = prompt(`¿Cuántos gramos agregar a ${fil.color}?`, '1000');
    if (!gramos || parseInt(gramos) <= 0) return;
    await FirebaseDB.addFilamentoStock(filId, parseInt(gramos), 'Compra de filamento');
    showToast(`+${gramos}g agregados a ${fil.color}`);
    renderStockPage();
  }

  async function promptFilamentoMin(filId) {
    const fil = filamentos.find(f => f.id === filId);
    if (!fil) return;
    const min = prompt(`Mínimo en gramos para ${fil.color}:`, fil.gramosMin || 200);
    if (!min || parseInt(min) < 0) return;
    await FirebaseDB.updateFilamento(filId, { gramosMin: parseInt(min) });
    showToast(`Mínimo de ${fil.color} actualizado`);
    renderStockPage();
  }

  function openFilamentoForm() {
    $('#modalFormTitle').textContent = 'Nuevo filamento';
    $('#modalFormContent').innerHTML = `
      <div class="form-group">
        <label>Marca</label>
        <input type="text" id="filMarca" value="BambuLab">
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <input type="text" id="filTipo" value="PLA Basic">
      </div>
      <div class="form-group">
        <label>Color</label>
        <input type="text" id="filColor" placeholder="ej: Jet Black">
      </div>
      <div class="form-group">
        <label>Color HEX</label>
        <div style="display:flex;gap:8px;align-items:center;">
          <input type="color" id="filColorPicker" value="#888888">
          <input type="text" id="filColorHex" value="#888888" style="width:100px;">
        </div>
      </div>
      <div class="form-group">
        <label>Gramos actuales</label>
        <input type="number" id="filGramos" value="1000" min="0">
      </div>
      <div class="form-group">
        <label>Máximo (capacidad del rollo)</label>
        <input type="number" id="filMax" value="1000" min="0">
      </div>
      <div class="form-group">
        <label>Mínimo (alerta)</label>
        <input type="number" id="filMin" value="200" min="0">
      </div>
      <div class="form-actions">
        <button class="btn-primary" id="filSave">Crear filamento</button>
        <button class="btn-secondary" id="formCancel">Cancelar</button>
      </div>
    `;
    $('#modalFormOverlay').classList.add('active');

    $('#filColorPicker').addEventListener('input', (e) => { $('#filColorHex').value = e.target.value; });
    $('#filColorHex').addEventListener('input', (e) => { $('#filColorPicker').value = e.target.value; });
    $('#formCancel').addEventListener('click', closeForm);
    $('#modalFormOverlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeForm(); });

    $('#filSave').addEventListener('click', async () => {
      const color = $('#filColor').value.trim();
      if (!color) { showToast('Ingresá un nombre de color', true); return; }
      await FirebaseDB.addFilamento({
        marca: $('#filMarca').value.trim(),
        tipo: $('#filTipo').value.trim(),
        color,
        colorHex: $('#filColorHex').value,
        gramosActuales: parseInt($('#filGramos').value) || 1000,
        gramosMax: parseInt($('#filMax').value) || 1000,
        gramosMin: parseInt($('#filMin').value) || 200
      });
      filamentos = await FirebaseDB.getFilamentos();
      closeForm();
      renderStockPage();
      showToast(`Filamento "${color}" creado`);
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
        filamentos = await FirebaseDB.getFilamentos();
        renderDashboard();
        renderProductsTable();
        renderSectionsTable();
        showToast('Catálogo reseteado correctamente');
      } catch (err) {
        console.error('Error reset:', err);
        showToast('Error al resetear: ' + err.message, true);
      }
      btn.disabled = false;
      btn.textContent = '🔄 Resetear Catálogo (re-seedear datos)';
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

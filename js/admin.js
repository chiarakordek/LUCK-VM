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
    $('#setupBtn').addEventListener('click', setupAccount);
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

  async function setupAccount() {
    const email = $('#newEmail').value.trim();
    const pw = $('#newPassword').value;
    const confirm = $('#newPasswordConfirm').value;

    if (!email || !pw) {
      showToast('Completá email y contraseña', true);
      return;
    }
    if (pw.length < 6) {
      showToast('La contraseña debe tener al menos 6 caracteres', true);
      return;
    }
    if (pw !== confirm) {
      showToast('Las contraseñas no coinciden', true);
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, pw);
      showToast('Cuenta creada. Bienvenido!');
      $('#loginSetup').style.display = 'none';
    } catch (e) {
      console.error('Setup error:', e);
      if (e.code === 'auth/email-already-in-use') {
        showToast('Este email ya está registrado. Ingresá con él.', true);
      } else {
        showToast('Error al crear cuenta: ' + e.message, true);
      }
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
            <td>${p.tag}</td>
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
            <th>Categoría</th>
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
        <label>Tag / Categoría</label>
        <input type="text" id="formTag" value="${product?.tag || ''}" placeholder="Ej: Fidget Gamer">
      </div>
      <div class="form-group">
        <label>Descripción corta</label>
        <input type="text" id="formDescCorta" value="${product?.descripcionCorta || ''}">
      </div>
      <div class="form-group">
        <label>Descripción completa</label>
        <textarea id="formDescCompleta">${product?.descripcionCompleta || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Características</label>
        <textarea id="formCaract">${product?.caracteristicas || ''}</textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Ruta de imagen</label>
          <input type="text" id="formImagen" value="${product?.imagen || 'images/'}" placeholder="images/archivo.png">
        </div>
        <div class="form-group">
          <label>Colores (separados por coma)</label>
          <input type="text" id="formColores" value="${product?.colores?.join(', ') || ''}" placeholder="Rojo, Azul, Verde">
        </div>
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
      const tag = $('#formTag').value;
      const descCorta = $('#formDescCorta').value;
      const descCompleta = $('#formDescCompleta').value;
      const caract = $('#formCaract').value;
      const imagen = $('#formImagen').value;
      const colores = $('#formColores').value.split(',').map(c => c.trim()).filter(Boolean);

      if (!nombre || !seccionId || !imagen) {
        showToast('Completá nombre, sección e imagen', true);
        return;
      }

      const productData = {
        nombre,
        tag,
        descripcionCorta: descCorta,
        descripcionCompleta: descCompleta,
        caracteristicas: caract,
        imagen,
        colores,
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
  }

  document.addEventListener('DOMContentLoaded', init);
})();

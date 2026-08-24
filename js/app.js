(() => {
  'use strict';

  let cart = JSON.parse(localStorage.getItem('luckvm_cart')) || [];
  let secciones = [];
  let appConfig = { whatsapp: { numero: '5493535630595' }, catalogo: { nombre: 'Luck VM', subtitulo: '', videoUrl: '' } };
  let currentProduct = null;
  let currentQty = 1;
  let activeSection = 'all';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function saveCart() {
    localStorage.setItem('luckvm_cart', JSON.stringify(cart));
    updateCartBadge();
  }

  function updateCartBadge() {
    const badge = $('#cartBadge');
    const total = cart.reduce((sum, item) => sum + item.cantidad, 0);
    badge.textContent = total;
    badge.classList.toggle('show', total > 0);
  }

  function showToast(msg) {
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  function renderTabs() {
    const container = $('#tabsContainer');
    container.innerHTML = '<button class="tab-btn active" data-section="all">Todos</button>';
    secciones.forEach(sec => {
      const btn = document.createElement('button');
      btn.className = 'tab-btn';
      btn.dataset.section = sec.id;
      btn.textContent = sec.nombre;
      container.appendChild(btn);
    });
  }

  function renderProducts(filter = 'all', search = '') {
    const main = $('#mainContent');
    const existing = main.querySelectorAll('.section');
    existing.forEach(el => el.remove());

    const noResults = $('#noResults');
    let totalFound = 0;

    secciones.forEach((sec, idx) => {
      if (filter !== 'all' && filter !== sec.id) return;

      const filtered = (sec.productos || []).filter(p => {
        if (!search) return true;
        const s = search.toLowerCase();
        return p.nombre.toLowerCase().includes(s) ||
                p.descripcion.toLowerCase().includes(s);
      });

      if (filtered.length === 0) return;
      totalFound += filtered.length;

      const section = document.createElement('div');
      section.className = 'section';
      section.dataset.sectionId = sec.id;

      section.innerHTML = `
        <div class="section-header">
          <div class="section-number">${idx + 1}</div>
          <h2 class="section-title">${sec.nombre}</h2>
        </div>
        <div class="product-grid">
          ${filtered.map(p => renderCard(p)).join('')}
        </div>
      `;

      main.insertBefore(section, noResults);
    });

    noResults.classList.toggle('show', totalFound === 0);

    requestAnimationFrame(() => {
      $$('.product-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 50);
      });
    });

    bindCardEvents();
  }

  function renderCard(product) {
    return `
      <div class="product-card" data-product-id="${product.id}">
        <img class="card-image" src="${product.imagen}" alt="${product.nombre}" loading="lazy">
        <div class="card-body">
          <h3 class="card-name">${product.nombre}</h3>
          <p class="card-desc">${product.descripcion}</p>
        </div>
        <div class="card-footer">
          <button class="card-add-btn" data-add="${product.id}" title="Agregar al carrito">+</button>
        </div>
      </div>
    `;
  }

  function bindCardEvents() {
    $$('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-add-btn')) {
          e.stopPropagation();
          const id = e.target.closest('.card-add-btn').dataset.add;
          quickAddToCart(id);
          return;
        }
        const id = card.dataset.productId;
        openModal(id);
      });
    });
  }

  function quickAddToCart(productId) {
    const product = findProduct(productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.cantidad += 1;
    } else {
      cart.push({ id: productId, cantidad: 1 });
    }
    saveCart();
    showToast(`${product.nombre} agregado al carrito`);
  }

  function findProduct(id) {
    for (const sec of secciones) {
      const p = (sec.productos || []).find(p => p.id === id);
      if (p) return p;
    }
    return null;
  }

  function openModal(productId) {
    const product = findProduct(productId);
    if (!product) return;

    currentProduct = product;
    currentQty = 1;

    $('#modalImage').src = product.imagen;
    $('#modalImage').alt = product.nombre;
    $('#modalName').textContent = product.nombre;
    $('#modalDesc').textContent = product.descripcion;
    $('#qtyValue').textContent = '1';

    $('#qtyValue').textContent = '1';

    const overlay = $('#modalOverlay');
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('active'));
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = $('#modalOverlay');
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
    currentProduct = null;
  }

  function addToCartFromModal() {
    if (!currentProduct) return;
    const existing = cart.find(item => item.id === currentProduct.id);
    if (existing) {
      existing.cantidad += currentQty;
    } else {
      cart.push({ id: currentProduct.id, cantidad: currentQty });
    }
    saveCart();
    showToast(`${currentProduct.nombre} x${currentQty} agregado`);
    closeModal();
  }

  function sendWhatsAppSingle() {
    if (!currentProduct) return;
    const msg = `Hola! Me interesa el producto:\n\n• ${currentProduct.nombre} (x${currentQty})\n\nQuisiera saber precio, tiempos de entrega y personalización.`;
    openWhatsApp(msg);
    closeModal();
  }

  function openWhatsApp(message) {
    const numero = appConfig.whatsapp?.numero || '';
    if (!numero) {
      showToast('WhatsApp no configurado. Próximamente disponible.');
      return;
    }
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${numero}?text=${encoded}`, '_blank');
  }

  function renderCart() {
    const container = $('#cartItems');
    const empty = $('#cartEmpty');
    const footer = $('#cartFooter');

    container.querySelectorAll('.cart-item').forEach(el => el.remove());

    if (cart.length === 0) {
      empty.style.display = 'block';
      footer.style.display = 'none';
      return;
    }

    empty.style.display = 'none';
    footer.style.display = 'block';

    cart.forEach(item => {
      const product = findProduct(item.id);
      if (!product) return;

      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img class="cart-item-img" src="${product.imagen}" alt="${product.nombre}">
        <div class="cart-item-info">
          <div class="cart-item-name">${product.nombre}</div>
          <div class="cart-item-qty">Cantidad: ${item.cantidad}</div>
        </div>
        <button class="cart-item-remove" data-remove="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
          </svg>
        </button>
      `;
      container.appendChild(el);
    });

    container.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.remove;
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
        showToast('Producto eliminado');
      });
    });
  }

  async function sendWhatsAppCart() {
    if (cart.length === 0) return;

    const items = cart.map(item => {
      const product = findProduct(item.id);
      return {
        id: item.id,
        nombre: product?.nombre || item.id,
        cantidad: item.cantidad,
        filamento: product?.filamento || []
      };
    });

    try {
      await FirebaseDB.savePedido({
        items,
        cliente: 'WhatsApp'
      });
    } catch (e) {
      console.error('Error guardando pedido:', e);
    }

    const lines = items.map(item => `• ${item.nombre} (x${item.cantidad})`);
    const msg = `Hola! Me interesan estos productos del catálogo Luck VM:\n\n${lines.join('\n')}\n\nQuisiera saber precio, tiempos de entrega y personalización.`;
    openWhatsApp(msg);
  }

  function openCart() {
    renderCart();
    $('#cartPanel').classList.add('open');
    $('#cartBackdrop').classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    $('#cartPanel').classList.remove('open');
    $('#cartBackdrop').classList.remove('show');
    document.body.style.overflow = '';
  }

  async function init() {
    try {
      [secciones, appConfig] = await Promise.all([
        FirebaseDB.getSecciones(),
        FirebaseDB.getConfig()
      ]);
      await FirebaseDB.seedData();
      if (secciones.length === 0) {
        secciones = await FirebaseDB.getSecciones();
      }
    } catch (e) {
      console.error('Error cargando datos:', e);
    }

    renderTabs();
    renderProducts();
    updateCartBadge();

    $('#searchInput').addEventListener('input', (e) => {
      const search = e.target.value.trim();
      renderProducts(activeSection, search);
    });

    $('#tabsContainer').addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSection = btn.dataset.section;
      renderProducts(activeSection, $('#searchInput').value.trim());
    });

    $('#modalClose').addEventListener('click', closeModal);
    $('#modalOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    $('#qtyMinus').addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        $('#qtyValue').textContent = currentQty;
      }
    });

    $('#qtyPlus').addEventListener('click', () => {
      if (currentQty < 99) {
        currentQty++;
        $('#qtyValue').textContent = currentQty;
      }
    });

    $('#btnAddCart').addEventListener('click', addToCartFromModal);
    $('#btnWhatsappSingle').addEventListener('click', sendWhatsAppSingle);

    $('#cartBtn').addEventListener('click', openCart);
    $('#cartClose').addEventListener('click', closeCart);
    $('#cartBackdrop').addEventListener('click', closeCart);
    $('#btnWhatsappCart').addEventListener('click', sendWhatsAppCart);
    $('#btnClearCart').addEventListener('click', () => {
      cart = [];
      saveCart();
      renderCart();
      showToast('Carrito vaciado');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeCart();
      }
    });

    const stickyHeader = $('#stickyHeader');
    const headerEl = $('.header');
    if (stickyHeader && headerEl) {
      const observer = new IntersectionObserver(([entry]) => {
        stickyHeader.classList.toggle('visible', !entry.isIntersecting);
      }, { threshold: 0 });
      observer.observe(headerEl);
    }

    const btnContact = $('#btnContact');
    if (btnContact) {
      btnContact.addEventListener('click', (e) => {
        e.preventDefault();
        const overlay = $('#contactOverlay');
        overlay.style.display = 'flex';
        requestAnimationFrame(() => overlay.classList.add('active'));
        document.body.style.overflow = 'hidden';
      });
    }

    const contactClose = $('#contactClose');
    if (contactClose) {
      contactClose.addEventListener('click', () => {
        const overlay = $('#contactOverlay');
        overlay.classList.remove('active');
        setTimeout(() => { overlay.style.display = 'none'; document.body.style.overflow = ''; }, 300);
      });
    }

    const contactOverlay = $('#contactOverlay');
    if (contactOverlay) {
      contactOverlay.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
          contactOverlay.classList.remove('active');
          setTimeout(() => { contactOverlay.style.display = 'none'; document.body.style.overflow = ''; }, 300);
        }
      });
    }

    const contactForm = $('#contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#contactName').value.trim();
        const email = $('#contactEmail').value.trim();
        const type = $('#contactType').value;
        const message = $('#contactMessage').value.trim();

        if (!name || !email || !message) {
          showToast('Completá todos los campos', true);
          return;
        }

        const subject = encodeURIComponent(`Consulta - ${type}`);
        const body = encodeURIComponent(
          `Hola! Soy ${name}.\n` +
          `Email: ${email}\n` +
          `Tipo de consulta: ${type}\n\n` +
          `${message}`
        );
        window.open(`mailto:somosluckvm@gmail.com?subject=${subject}&body=${body}`, '_blank');

        contactForm.reset();
        const overlay = $('#contactOverlay');
        overlay.classList.remove('active');
        setTimeout(() => { overlay.style.display = 'none'; document.body.style.overflow = ''; }, 300);
        showToast('Consulta enviada!');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();

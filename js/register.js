(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  const SETUP_KEY = 'luckvm2026';

  function showToast(msg, isError = false) {
    const toast = $('#toastAdmin');
    toast.textContent = msg;
    toast.className = 'toast-admin' + (isError ? ' error' : '');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function showError(msg) {
    const el = $('#regError');
    el.textContent = msg;
    el.style.display = 'block';
  }

  function hideError() {
    $('#regError').style.display = 'none';
  }

  async function doRegister() {
    hideError();

    const key = $('#setupKey').value.trim();
    const email = $('#regEmail').value.trim();
    const pw = $('#regPassword').value;
    const confirm = $('#regPasswordConfirm').value;

    if (!key || !email || !pw || !confirm) {
      showError('Completá todos los campos');
      return;
    }

    if (key !== SETUP_KEY) {
      showError('Clave de registro incorrecta');
      return;
    }

    if (pw.length < 6) {
      showError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (pw !== confirm) {
      showError('Las contraseñas no coinciden');
      return;
    }

    try {
      $('#registerBtn').disabled = true;
      $('#registerBtn').textContent = 'Creando cuenta...';

      await auth.createUserWithEmailAndPassword(email, pw);

      showToast('Cuenta creada. Redirigiendo...');
      setTimeout(() => {
        window.location.href = 'admin.html';
      }, 1500);

    } catch (e) {
      console.error('Register error:', e);
      if (e.code === 'auth/email-already-in-use') {
        showError('Este email ya está registrado. Usá el login.');
      } else if (e.code === 'auth/weak-password') {
        showError('La contraseña es muy débil');
      } else {
        showError('Error al crear cuenta: ' + e.message);
      }
      $('#registerBtn').disabled = false;
      $('#registerBtn').textContent = 'Crear cuenta';
    }
  }

  function init() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        window.location.href = 'admin.html';
      }
    });

    $('#registerBtn').addEventListener('click', doRegister);

    ['regPassword', 'regPasswordConfirm'].forEach(id => {
      $(`#${id}`).addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doRegister();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

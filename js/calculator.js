(() => {
  'use strict';

  const COSTS = {
    filamento: 25,
    electricidad: 15,
    pila: 300,
    led: 70,
    clicker: 240,
    llavero: 200,
    bolsa: 100,
    iman: 320
  };

  let extras = [];

  function fmt(n) {
    return '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  function renderCalculator() {
    const container = document.getElementById('calculatorContent');
    if (!container) return;

    container.innerHTML = `
      <div class="calc-grid">
        <div class="calc-card">
          <h3>Filamento</h3>
          <div class="calc-field">
            <label>Gramos utilizados</label>
            <input type="number" id="calcGrams" value="0" min="0" step="1">
            <span class="calc-sub">${fmt(COSTS.filamento)}/gramo</span>
          </div>
          <div class="calc-result" id="resultFilamento">${fmt(0)}</div>
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
            <span class="calc-sub">BambuLab A1 ~100W · ${fmt(COSTS.electricidad)}/hora</span>
          </div>
          <div class="calc-result" id="resultElectricidad">${fmt(0)}</div>
        </div>

        <div class="calc-card calc-card-wide">
          <h3>Componentes</h3>
          <div class="calc-checks">
            <label class="calc-check">
              <input type="checkbox" id="calcPila">
              <span class="calc-check-label">Pila 1220</span>
              <span class="calc-check-price">${fmt(COSTS.pila)}</span>
            </label>
            <label class="calc-check">
              <input type="checkbox" id="calcLed">
              <span class="calc-check-label">LED (diodo)</span>
              <span class="calc-check-price">${fmt(COSTS.led)}</span>
            </label>
            <label class="calc-check">
              <input type="checkbox" id="calcClicker">
              <span class="calc-check-label">Clicker (switch)</span>
              <span class="calc-check-price">${fmt(COSTS.clicker)}</span>
            </label>
            <label class="calc-check">
              <input type="checkbox" id="calcLlavero">
              <span class="calc-check-label">Llavero</span>
              <span class="calc-check-price">${fmt(COSTS.llavero)}</span>
            </label>
            <label class="calc-check">
              <input type="checkbox" id="calcBolsa">
              <span class="calc-check-label">Bolsa</span>
              <span class="calc-check-price">${fmt(COSTS.bolsa)}</span>
            </label>
            <label class="calc-check">
              <input type="checkbox" id="calcIman">
              <span class="calc-check-label">Imán</span>
              <span class="calc-check-price">${fmt(COSTS.iman)}</span>
            </label>
          </div>
          <div class="calc-result" id="resultComponentes">${fmt(0)}</div>
        </div>

        <div class="calc-card calc-card-wide">
          <h3>Extras personalizados</h3>
          <div id="extrasList"></div>
          <div class="calc-add-extra">
            <input type="text" id="extraName" placeholder="Nombre (ej: sticker)">
            <input type="number" id="extraCost" placeholder="Costo $" min="0">
            <button class="btn-primary" id="btnAddExtra">+ Agregar</button>
          </div>
          <div class="calc-result" id="resultExtras">${fmt(0)}</div>
        </div>
      </div>

      <div class="calc-total">
        <span>COSTO TOTAL ESTIMADO</span>
        <span class="calc-total-value" id="resultTotal">${fmt(0)}</span>
      </div>
    `;

    bindCalcEvents();
  }

  function bindCalcEvents() {
    const inputs = ['calcGrams', 'calcHours', 'calcMinutes', 'calcPila', 'calcLed', 'calcClicker', 'calcLlavero', 'calcBolsa', 'calcIman'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calculate);
    });

    document.getElementById('btnAddExtra')?.addEventListener('click', addExtra);
    document.getElementById('extraCost')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addExtra();
    });

    calculate();
  }

  function addExtra() {
    const nameEl = document.getElementById('extraName');
    const costEl = document.getElementById('extraCost');
    const name = nameEl?.value.trim();
    const cost = parseFloat(costEl?.value) || 0;

    if (!name || cost <= 0) return;

    extras.push({ name, cost });
    nameEl.value = '';
    costEl.value = '';
    renderExtras();
    calculate();
  }

  function removeExtra(index) {
    extras.splice(index, 1);
    renderExtras();
    calculate();
  }

  function renderExtras() {
    const list = document.getElementById('extrasList');
    if (!list) return;

    list.innerHTML = extras.map((e, i) => `
      <div class="calc-extra-row">
        <span>${e.name}</span>
        <span>${fmt(e.cost)}</span>
        <button class="calc-extra-remove" data-idx="${i}">×</button>
      </div>
    `).join('');

    list.querySelectorAll('.calc-extra-remove').forEach(btn => {
      btn.addEventListener('click', () => removeExtra(parseInt(btn.dataset.idx)));
    });
  }

  function calculate() {
    const grams = parseFloat(document.getElementById('calcGrams')?.value) || 0;
    const hours = parseFloat(document.getElementById('calcHours')?.value) || 0;
    const minutes = parseFloat(document.getElementById('calcMinutes')?.value) || 0;
    const totalHours = hours + (minutes / 60);

    const costFilamento = grams * COSTS.filamento;
    const costElectricidad = totalHours * COSTS.electricidad;
    let costComponentes = 0;
    if (document.getElementById('calcPila')?.checked) costComponentes += COSTS.pila;
    if (document.getElementById('calcLed')?.checked) costComponentes += COSTS.led;
    if (document.getElementById('calcClicker')?.checked) costComponentes += COSTS.clicker;
    if (document.getElementById('calcLlavero')?.checked) costComponentes += COSTS.llavero;
    if (document.getElementById('calcBolsa')?.checked) costComponentes += COSTS.bolsa;
    if (document.getElementById('calcIman')?.checked) costComponentes += COSTS.iman;
    const costExtras = extras.reduce((sum, e) => sum + e.cost, 0);

    const total = costFilamento + costElectricidad + costComponentes + costExtras;

    document.getElementById('resultFilamento').textContent = fmt(costFilamento);
    document.getElementById('resultElectricidad').textContent = fmt(costElectricidad);
    document.getElementById('resultComponentes').textContent = fmt(costComponentes);
    document.getElementById('resultExtras').textContent = fmt(costExtras);
    document.getElementById('resultTotal').textContent = fmt(total);
  }

  window.renderCalculator = renderCalculator;
})();

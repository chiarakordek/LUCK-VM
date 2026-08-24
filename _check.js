const fs = require('fs');
let c = fs.readFileSync('js/data.js', 'utf8').replace('const CATALOGO_DATA', 'var CATALOGO_DATA');
eval(c);
const imgs = fs.readdirSync('images').filter(f => !f.startsWith('logo') && !f.startsWith('Gemini')).map(f => 'images/' + f);
const inCat = new Set();
for (const s of CATALOGO_DATA.secciones) for (const p of s.productos) inCat.add(p.imagen);
const missing = imgs.filter(i => !inCat.has(i));
const extra = [...inCat].filter(i => !imgs.includes(i));
console.log('Imgs:', imgs.length, 'EnCatalogo:', inCat.size, 'Faltan:', missing.length);
if (missing.length) console.log('FALTAN:\n' + missing.join('\n'));
if (extra.length) console.log('ROTAS:\n' + extra.join('\n'));
let t = 0;
for (const s of CATALOGO_DATA.secciones) { console.log(s.nombre + ': ' + s.productos.length); t += s.productos.length; }
console.log('TOTAL:', t);

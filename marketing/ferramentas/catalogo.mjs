/**
 * CATÁLOGO VISUAL DOS ASSETS: gera uma prancha (PNG) com todos os elementos
 * e exporta cada um como SVG em marketing/assets/. Rodar na raiz:
 *   node marketing/ferramentas/catalogo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, grao, renderizar } from './marca.mjs';
import * as A from './assets.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(RAIZ, 'marketing/assets');
fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });

const itens = [
  ['cantoneira', A.cantoneira({ t: 140 })],
  ['moldura', A.moldura({ w: 360, h: 240 })],
  ['divisor', A.divisor({ w: 420 })],
  ['cartucho', A.cartucho({ texto: 'Diretoria Científica', w: 420 })],
  ['selo', A.selo({ t: 220 })],
  ['selo-ano', A.selo({ t: 220, miolo: 'ano', texto: 'CIÊNCIA · CORAGEM · SERVIÇO · ' })],
  ['losango-duplo', A.losangoDuplo({ t: 56 })],
  ['ramo', A.ramo({ w: 420 })],
  ['ramo-duplo', A.ramoDuplo({ w: 440 })],
  ['grinalda', A.grinalda({ t: 240 })],
  ['folha-oficial', A.folhaSolta({ w: 110 })],
  ['frasco', A.frasco({ t: 110 })],
  ['microscopio', A.microscopio({ t: 120 })],
  ['serpente-traco', A.serpenteTraco({ w: 420, h: 90 })],
  ['estetoscopio', A.estetoscopio({ t: 120 })],
  ['jaleco', A.jaleco({ t: 120 })],
  ['logo-horizontal', A.logoHorizontal({ h: 90 })],
  ['logo-empilhado', A.logoEmpilhado({ w: 300 })],
  ['logo-monograma', A.logoMonograma({ t: 150 })],
  ['logo-selo', A.logoSelo({ t: 220 })],
  ['figura', A.figuraInline({ w: 150 })],
];

for (const [nome, s] of itens) fs.writeFileSync(path.join(OUT, 'svg', `${nome}.svg`), s);
// Versões para fundo claro (verde) dos ornamentos principais
for (const [nome, s] of [['cantoneira', A.cantoneira({ t: 140, cor: COR.ouroEscuro })], ['divisor', A.divisor({ w: 420, cor: COR.ouroEscuro })], ['ramo', A.ramo({ w: 420, cor: COR.verde })], ['grinalda', A.grinalda({ t: 240, cor: COR.verde })], ['selo', A.selo({ t: 220, cor: COR.verde })], ['logo-monograma', A.logoMonograma({ t: 150, cor: COR.verde })]]) fs.writeFileSync(path.join(OUT, 'svg', `${nome}-claro.svg`), s);

const W = 2000;
const cards = itens.map(([nome, s]) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:30px;border:1px solid rgba(176,141,87,.25);min-height:300px"><div style="display:grid;place-items:center;flex:1">${s}</div><div class="eyebrow" style="font-size:13px;color:${COR.salvia}">${nome}</div></div>`).join('');
const html = `<div style="position:relative;width:${W}px;background:${COR.noite};padding:60px">
  <div class="pf" style="font-weight:800;font-size:54px;color:${COR.papel}">Biblioteca de assets · Gravura Viva</div>
  <div class="in" style="font-size:20px;color:${COR.salvia};margin:10px 0 40px">marketing/assets/svg · todos vetoriais, cor via parâmetro (ouro no escuro, verde no claro)</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px">${cards}</div>
  ${grao(0.08)}
</div>`;
await renderizar({ html, w: W, h: 2400, saida: path.join(OUT, 'catalogo.png'), medirAltura: true });
console.log('catálogo em', OUT);

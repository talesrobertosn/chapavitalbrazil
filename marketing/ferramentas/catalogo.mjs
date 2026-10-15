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
  // II · ornamentos
  ['banderola', A.banderola({ texto: 'Dr. Vital Brazil', w: 420 })],
  ['roseta', A.roseta({ t: 130 })],
  ['filete', A.filete({ w: 420 })],
  ['asterismo', A.asterismo({ t: 60 })],
  ['etiqueta', A.etiqueta({ fig: 'Fig. 3', texto: 'Ouvidoria anônima', w: 400 })],
  ['carimbo', A.carimbo({ texto: 'Vote', w: 260, h: 96 })],
  ['lacre', A.lacre({ t: 170 })],
  ['envelope', A.envelope({ w: 400 })],
  // II · botânica
  ['samambaia', A.samambaia({ h: 260 })],
  ['espiga', A.espiga({ h: 240 })],
  ['flor', A.flor({ t: 170 })],
  ['trepadeira', A.trepadeira({ h: 280 })],
  ['oliveira', A.oliveira({ w: 400 })],
  ['folhas-espalhadas', A.folhasEspalhadas({ w: 420, h: 240, n: 9, op: 0.6 })],
  // II · ciência
  ['bastao-asclepio', A.bastaoAsclepio({ h: 240 })],
  ['livro', A.livro({ w: 220 })],
  ['pena', A.pena({ h: 220 })],
  ['lampada', A.lampada({ w: 200 })],
  ['ampulheta', A.ampulheta({ h: 220 })],
  ['balanca', A.balanca({ w: 220 })],
  ['coracao', A.coracao({ h: 220 })],
  ['lupa', A.lupa({ t: 170 })],
  ['retorta', A.retorta({ w: 220 })],
  ['ampola', A.ampola({ h: 220 })],
  ['dna', A.dna({ w: 420, h: 110 })],
  ['bussola', A.bussola({ t: 200 })],
  // II · logo
  ['logo-assinatura', A.logoAssinatura({ w: 400 })],
  ['logo-carimbo', A.logoCarimbo({ t: 230 })],
  ['logo-banderola', A.logoBanderola({ w: 400 })],
  ['logo-etiqueta', A.logoEtiqueta({ w: 400 })],
  ['logo-minimo', A.logoMinimo({ h: 60 })],
  ['logo-lacre', A.logoLacre({ t: 170 })],
];

for (const [nome, s] of itens) fs.writeFileSync(path.join(OUT, 'svg', `${nome}.svg`), s);
// Versões para fundo claro (verde) dos ornamentos principais
for (const [nome, s] of [['cantoneira', A.cantoneira({ t: 140, cor: COR.ouroEscuro })], ['divisor', A.divisor({ w: 420, cor: COR.ouroEscuro })], ['ramo', A.ramo({ w: 420, cor: COR.verde })], ['grinalda', A.grinalda({ t: 240, cor: COR.verde })], ['selo', A.selo({ t: 220, cor: COR.verde })], ['logo-monograma', A.logoMonograma({ t: 150, cor: COR.verde })], ['samambaia', A.samambaia({ h: 260, cor: COR.verde })], ['flor', A.flor({ t: 170, cor: COR.verde })], ['oliveira', A.oliveira({ w: 400, cor: COR.verde })], ['trepadeira', A.trepadeira({ h: 280, cor: COR.verde })], ['bastao-asclepio', A.bastaoAsclepio({ h: 240, cor: COR.verde })], ['coracao', A.coracao({ h: 220, cor: COR.verde })], ['livro', A.livro({ w: 220, cor: COR.verde })], ['etiqueta', A.etiqueta({ fig: 'Fig. 3', texto: 'Ouvidoria anônima', w: 400, cor: COR.verde })], ['logo-etiqueta', A.logoEtiqueta({ w: 400, cor: COR.verde, ouro: COR.ouroEscuro })], ['logo-assinatura', A.logoAssinatura({ w: 400, cor: COR.ouroEscuro })], ['logo-carimbo', A.logoCarimbo({ t: 230, cor: COR.verde })]]) fs.writeFileSync(path.join(OUT, 'svg', `${nome}-claro.svg`), s);

const W = 2000;
const cards = itens.map(([nome, s]) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:30px;border:1px solid rgba(176,141,87,.25);min-height:300px"><div style="display:grid;place-items:center;flex:1">${s}</div><div class="eyebrow" style="font-size:13px;color:${COR.salvia}">${nome}</div></div>`).join('');
const html = `<div style="position:relative;width:${W}px;background:${COR.noite};padding:60px">
  <div class="pf" style="font-weight:800;font-size:54px;color:${COR.papel}">Biblioteca de assets · Gravura Viva</div>
  <div class="in" style="font-size:20px;color:${COR.salvia};margin:10px 0 40px">marketing/assets/svg · 52 elementos vetoriais, cor via parâmetro (ouro no escuro, verde no claro)</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px">${cards}</div>
  ${grao(0.08)}
</div>`;
await renderizar({ html, w: W, h: 2400, saida: path.join(OUT, 'catalogo.png'), medirAltura: true });
console.log('catálogo em', OUT);

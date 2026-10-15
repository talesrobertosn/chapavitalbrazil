/**
 * KIT DE MARCA PARA ARTES (Instagram, cartazes, PNGs)
 * ----------------------------------------------------------------------------
 * Reúne, em HTML/CSS, tudo o que define a "Gravura Viva": fontes oficiais
 * embutidas, paleta, medalhão/figura/folhagem vetorizados, granulação,
 * poeira dourada, fio com losango e pincelada.
 *
 * Uso: importe as funções, monte o HTML da arte e renderize com
 * `renderizar()` (Playwright/Chromium). Veja marketing/README.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const ler = (p) => fs.readFileSync(path.join(RAIZ, p));

export const COR = {
  noite: '#12241C',
  noite2: '#0C1913',
  verde: '#1E3A2F',
  verde2: '#284A3C',
  papel: '#F4F0E6',
  papel2: '#EBE4D3',
  tinta: '#0F1C16',
  tinta2: '#3A4A42',
  ouro: '#B08D57',
  ouroClaro: '#CDB186',
  ouroEscuro: '#7A5C30',
  salvia: '#93A698',
};

function vetor(arquivo, nome) {
  const src = ler(arquivo).toString();
  const m = src.match(new RegExp(`${nome} = \\{ viewBox: '([^']+)', d: '([^']+)'`));
  return { vb: m[1], d: m[2] };
}
export const MEDAL = vetor('src/components/brand/logoPaths.ts', 'MEDAL');
export const FIGURE = vetor('src/components/brand/logoPaths.ts', 'FIGURE');
export const LEAF = vetor('src/components/brand/leafPath.ts', 'LEAF');

const fonte = (p, tipo = 'woff2') => `data:font/${tipo};base64,${ler(`node_modules/${p}`).toString('base64')}`;
export const FONTES = `
@font-face{font-family:'PF';src:url(${fonte('@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2')}) format('woff2');font-weight:400 900}
@font-face{font-family:'PF';font-style:italic;src:url(${fonte('@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2')}) format('woff2');font-weight:400 900}
@font-face{font-family:'IN';src:url(${fonte('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:'CG';font-style:italic;src:url(${fonte('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2')}) format('woff2');font-weight:500}
@font-face{font-family:'CG';font-style:italic;src:url(${fonte('@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff2')}) format('woff2');font-weight:600}`;

/** Imagem das artes da campanha como data URI. */
export const imagem = (nome) => `data:image/jpeg;base64,${ler(`src/assets/img/${nome}`).toString('base64')}`;

export const CSS_BASE = `
${FONTES}
*{margin:0;padding:0;box-sizing:border-box}
body{background:${COR.noite};-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.pf{font-family:'PF',Georgia,serif}
.in{font-family:'IN',system-ui,sans-serif}
.cg{font-family:'CG',Georgia,serif;font-style:italic}
.eyebrow{font-family:'IN';font-weight:600;text-transform:uppercase;letter-spacing:.32em}
.vazado{color:transparent;-webkit-text-stroke:2px ${COR.ouro}}
.abs{position:absolute}
`;

export function medalhao({ cor = COR.papel, fundo = null, w = 300, estilo = '' } = {}) {
  const [x, y, vw, vh] = MEDAL.vb.split(' ').map(Number);
  const disco = fundo ? `<circle cx="${x + vw / 2}" cy="${y + vh / 2}" r="${Math.min(vw, vh) / 2 - 3}" fill="${fundo}"/>` : '';
  return `<svg viewBox="${MEDAL.vb}" width="${w}" height="${Math.round((w * vh) / vw)}" style="display:block;${estilo}">${disco}<path fill="${cor}" fill-rule="evenodd" d="${MEDAL.d}"/></svg>`;
}
export const figura = ({ cor = COR.ouro, w = 400, estilo = '' } = {}) => `<svg viewBox="${FIGURE.vb}" width="${w}" style="${estilo}"><path fill="${cor}" fill-rule="evenodd" d="${FIGURE.d}"/></svg>`;
export const folha = ({ cor = COR.ouro, w = 300, op = 0.2, flip = false, estilo = '' } = {}) => {
  // Altura proporcional ao desenho: sem ela o navegador corta a ponta da folha.
  const [, , vw, vh] = LEAF.vb.split(' ').map(Number);
  const h = Math.round((w * vh) / vw);
  return `<svg viewBox="${LEAF.vb}" width="${w}" height="${h}" style="display:block;opacity:${op};${flip ? 'transform:scaleX(-1);' : ''}${estilo}"><path fill="${cor}" d="${LEAF.d}"/></svg>`;
};

/** Granulação de papel/filme sobre toda a área. */
export const grao = (op = 0.09, escuro = false) => `
<svg class="abs" style="inset:0;width:100%;height:100%;opacity:${op};mix-blend-mode:${escuro ? 'multiply' : 'overlay'};pointer-events:none" xmlns="http://www.w3.org/2000/svg">
<filter id="g${escuro ? 'e' : 'c'}"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 ${escuro ? 0.45 : 1} 0 0 0 0 ${escuro ? 0.38 : 1} 0 0 0 0 ${escuro ? 0.25 : 1} 0 0 0 0.9 0"/></filter>
<rect width="100%" height="100%" filter="url(#g${escuro ? 'e' : 'c'})"/></svg>`;

/** Poeira dourada (determinística: mesma semente = mesma arte). */
export function poeira({ w, h, n = 120, semente = 7, op = 0.9 }) {
  let s = semente;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let out = '';
  for (let i = 0; i < n; i++) {
    const tam = 1.5 + r() * r() * 9;
    const a = (0.15 + r() * 0.75) * op;
    out += `<div class="abs" style="left:${r() * w}px;top:${r() * h}px;width:${tam}px;height:${tam}px;border-radius:50%;background:radial-gradient(circle,rgba(226,200,150,${a}) 0%,rgba(205,177,134,0) 70%)"></div>`;
  }
  return out;
}

/** Fio ── ◆ ── */
export const fio = ({ w = 90, cor = COR.ouro, losango = 12 } = {}) =>
  `<span style="display:inline-flex;align-items:center;gap:14px"><span style="width:${w}px;height:2px;background:${cor};opacity:.75"></span><span style="width:${losango}px;height:${losango}px;background:${cor};transform:rotate(45deg)"></span><span style="width:${w}px;height:2px;background:${cor};opacity:.75"></span></span>`;

export const losango = (t = 12, cor = COR.ouro) => `<span style="display:inline-block;width:${t}px;height:${t}px;background:${cor};transform:rotate(45deg)"></span>`;

/** Pincelada dourada (sublinhado orgânico). */
export const pincelada = ({ w = 600, h = 28, cor = COR.ouro, estilo = '' } = {}) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 600 24" preserveAspectRatio="none" style="${estilo}"><path d="M4 16 C 120 8, 260 6, 420 9 S 560 13, 596 10" stroke="${cor}" stroke-width="4.2" fill="none" stroke-linecap="round"/><path d="M40 20 C 180 15, 330 14, 520 17" stroke="${cor}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/></svg>`;

/** Ícone dentro de anel duplo. */
export const anel = (svg, t = 120, cor = COR.ouro) =>
  `<div style="position:relative;width:${t}px;height:${t}px;border-radius:50%;border:2px solid ${cor}99;display:grid;place-items:center"><div style="position:absolute;inset:6px;border-radius:50%;border:1px solid ${cor}33"></div>${svg}</div>`;

/** Renderiza HTML em PNG. `recortes` = lista de {x,y,w,h,arquivo} (para carrosséis panorâmicos). */
export async function renderizar({ html, w, h, saida, recortes, medirAltura = false }) {
  let pw;
  try {
    pw = await import('playwright');
  } catch {
    pw = await import(process.env.PLAYWRIGHT_MODULE);
  }
  const b = await pw.chromium.launch();
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS_BASE}</style></head><body style="width:${w}px;height:${medirAltura ? 'auto' : `${h}px`};position:relative;overflow:hidden">${html}</body></html>`);
  await p.evaluate(() => document.fonts.ready);
  // Ajuste automático de textos marcados com data-caber="largura"
  await p.evaluate(() => {
    for (const el of document.querySelectorAll('[data-caber]')) {
      const alvo = Number(el.dataset.caber);
      let s = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > alvo && s > 10) {
        s -= 1;
        el.style.fontSize = `${s}px`;
      }
    }
  });
  await p.waitForTimeout(150);
  if (medirAltura) {
    // Altura real do conteúdo (pôsteres de altura variável)
    const alt = await p.evaluate(() => Math.ceil(document.body.firstElementChild.getBoundingClientRect().height));
    await p.setViewportSize({ width: w, height: alt });
    await p.evaluate((a) => { document.body.style.height = `${a}px`; }, alt);
    await p.waitForTimeout(100);
    await p.screenshot({ path: saida, clip: { x: 0, y: 0, width: w, height: alt } });
  } else if (recortes) for (const r of recortes) await p.screenshot({ path: r.arquivo, clip: { x: r.x, y: r.y, width: r.w, height: r.h } });
  else await p.screenshot({ path: saida });
  await b.close();
}

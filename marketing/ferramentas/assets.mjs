/**
 * BIBLIOTECA DE ASSETS · Gravura Viva
 * ----------------------------------------------------------------------------
 * Elementos vetoriais desenhados no mesmo traço fino de gravura, para variar
 * as artes sem sair da direção de arte. Todos devolvem SVG em texto.
 *
 *  ORNAMENTOS   cantoneira, moldura, divisor, cartucho, selo, losangoDuplo,
 *               banderola, roseta, filete, asterismo, etiqueta, carimbo, lacre, envelope
 *  BOTÂNICA     ramo, ramoDuplo, grinalda, folhaSolta,
 *               samambaia, espiga, flor, trepadeira, oliveira, folhasEspalhadas
 *  CIÊNCIA      frasco, microscopio, serpenteTraco, estetoscopio, jaleco,
 *               bastaoAsclepio, livro, pena, lampada, ampulheta, balanca, coracao,
 *               lupa, retorta, ampola, dna, bussola
 *  LOGO         logoHorizontal, logoEmpilhado, logoMonograma, logoSelo, figuraInline,
 *               logoAssinatura, logoCarimbo, logoBanderola, logoEtiqueta, logoMinimo, logoLacre
 *
 * Use `cor` para a tonalidade (ouro sobre escuro; verde sobre claro).
 */
import { COR, MEDAL, FIGURE, LEAF, medalhao } from './marca.mjs';
import { site } from '../../src/config/site.ts';

const F_DISPLAY = "'PF',Georgia,serif";
const F_SANS = "'IN',system-ui,sans-serif";
const F_SCRIPT = "'CG',Georgia,serif";

const svg = (w, h, inner, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" ${extra}>${inner}</svg>`;
const traco = (cor, w = 1.4) => `stroke="${cor}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

/* ------------------------------------------------------------ ORNAMENTOS */

/** Cantoneira de moldura (canto superior esquerdo; gire com `rot` para os outros). */
export const cantoneira = ({ cor = COR.ouro, t = 120, rot = 0 } = {}) =>
  svg(t, t, `<g transform="rotate(${rot} ${t / 2} ${t / 2})" ${traco(cor, 1.6)}>
    <path d="M6 ${t * 0.75} V 6 H ${t * 0.75}"/>
    <path d="M18 ${t * 0.6} V 18 H ${t * 0.6}" opacity=".45"/>
    <path d="M6 6 l10 10" opacity=".6"/>
    <path d="M${t * 0.42} 6 c 6 10, 14 10, 20 0" opacity=".7"/>
    <path d="M6 ${t * 0.42} c 10 6, 10 14, 0 20" opacity=".7"/>
    <rect x="${t * 0.75 - 4}" y="2" width="8" height="8" transform="rotate(45 ${t * 0.75} 6)" fill="${cor}"/>
    <rect x="2" y="${t * 0.75 - 4}" width="8" height="8" transform="rotate(45 6 ${t * 0.75})" fill="${cor}"/>
  </g>`);

/** Moldura dupla completa com losangos nos cantos. */
export const moldura = ({ w, h, cor = COR.ouro, margem = 40 } = {}) =>
  svg(w, h, `<g ${traco(cor, 2)}>
    <rect x="${margem}" y="${margem}" width="${w - margem * 2}" height="${h - margem * 2}" opacity=".6"/>
    <rect x="${margem + 14}" y="${margem + 14}" width="${w - margem * 2 - 28}" height="${h - margem * 2 - 28}" stroke-width="1" opacity=".25"/>
    ${[[margem, margem], [w - margem, margem], [margem, h - margem], [w - margem, h - margem]].map(([x, y]) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" transform="rotate(45 ${x} ${y})" fill="${COR.noite}" stroke="${cor}" stroke-width="2"/>`).join('')}
  </g>`);

/** Divisor ornamental: fio ── ◆ ── com volutas finas. */
export const divisor = ({ cor = COR.ouro, w = 520 } = {}) =>
  svg(w, 40, `<g ${traco(cor, 1.6)}>
    <path d="M10 20 H ${w / 2 - 60}"/><path d="M${w / 2 + 60} 20 H ${w - 10}"/>
    <path d="M${w / 2 - 60} 20 c -10 -10, -24 -10, -30 0 c 6 10, 20 10, 30 0" opacity=".6"/>
    <path d="M${w / 2 + 60} 20 c 10 -10, 24 -10, 30 0 c -6 10, -20 10, -30 0" opacity=".6"/>
    <path d="M${w / 2 - 34} 20 c 8 -14, 24 -14, 34 -4 c 10 -10, 26 -10, 34 4" opacity=".5"/>
    <rect x="${w / 2 - 8}" y="12" width="16" height="16" transform="rotate(45 ${w / 2} 20)" fill="${cor}"/>
  </g>`);

/** Cartucho: faixa com título dentro, pontas em losango (para rótulos de cargo/seção). */
export const cartucho = ({ texto, cor = COR.ouroClaro, fundo = COR.noite, px = 20, w = 520 } = {}) =>
  svg(w, 56, `<g ${traco(cor, 1.4)}>
    <path d="M28 10 H ${w - 28} l 16 18 l -16 18 H 28 l -16 -18 z" fill="${fundo}" opacity=".95"/>
    <path d="M36 18 H ${w - 36} l 9 10 l -9 10 H 36 l -9 -10 z" opacity=".35"/>
  </g>
  <text x="${w / 2}" y="35" text-anchor="middle" font-family="${F_SANS}" font-weight="600" font-size="${px}" letter-spacing="${px * 0.28}" fill="${cor}" style="text-transform:uppercase">${texto.toUpperCase()}</text>`);

/** Selo circular com texto em volta (ex.: "GESTÃO DR. VITAL BRAZIL · CA MEDICINA FAPI"). */
export const selo = ({ texto = 'GESTÃO DR. VITAL BRAZIL · CA MEDICINA FAPI · ', cor = COR.ouro, t = 260, miolo = 'medalhao', fundo = null } = {}) => {
  const r = t / 2;
  const id = `selo${Math.round(Math.random() * 1e6)}`;
  const miolos = {
    medalhao: `<g transform="translate(${r - t * 0.21} ${r - t * 0.21}) scale(${(t * 0.42) / 1200})"><svg viewBox="${MEDAL.vb}" width="1200" height="1200"><path d="${MEDAL.d}" fill="${cor}" fill-rule="evenodd"/></svg></g>`,
    ano: `<text x="${r}" y="${r + t * 0.1}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="700" font-size="${t * 0.28}" fill="${cor}">1865</text>`,
    losango: `<rect x="${r - t * 0.07}" y="${r - t * 0.07}" width="${t * 0.14}" height="${t * 0.14}" transform="rotate(45 ${r} ${r})" fill="${cor}"/>`,
  };
  return svg(t, t, `<defs><path id="${id}" d="M ${r} ${r} m -${r - t * 0.16} 0 a ${r - t * 0.16} ${r - t * 0.16} 0 1 1 ${2 * (r - t * 0.16)} 0 a ${r - t * 0.16} ${r - t * 0.16} 0 1 1 -${2 * (r - t * 0.16)} 0"/></defs>
    ${fundo ? `<circle cx="${r}" cy="${r}" r="${r - 2}" fill="${fundo}"/>` : ''}
    <g ${traco(cor, 1.6)}>
      <circle cx="${r}" cy="${r}" r="${r - 3}"/><circle cx="${r}" cy="${r}" r="${r - 9}" stroke-width="1" opacity=".5"/>
      <circle cx="${r}" cy="${r}" r="${r - t * 0.25}" stroke-width="1" opacity=".6"/>
      <circle cx="${r}" cy="${r}" r="${r - t * 0.28}" stroke-width="1" stroke-dasharray="2 5" opacity=".5"/>
    </g>
    <text font-family="${F_SANS}" font-weight="600" font-size="${t * 0.056}" letter-spacing="${t * 0.016}" fill="${cor}" dy="${t * 0.02}"><textPath href="#${id}">${texto}</textPath></text>
    ${miolos[miolo] ?? ''}`);
};

/** Losango duplo com fios (marcador grande). */
export const losangoDuplo = ({ cor = COR.ouro, t = 60 } = {}) =>
  svg(t * 3, t, `<g ${traco(cor, 1.6)}>
    <path d="M0 ${t / 2} H ${t * 0.9}"/><path d="M${t * 2.1} ${t / 2} H ${t * 3}"/>
    <rect x="${t * 1.5 - t * 0.22}" y="${t / 2 - t * 0.22}" width="${t * 0.44}" height="${t * 0.44}" transform="rotate(45 ${t * 1.5} ${t / 2})"/>
    <rect x="${t * 1.5 - t * 0.1}" y="${t / 2 - t * 0.1}" width="${t * 0.2}" height="${t * 0.2}" transform="rotate(45 ${t * 1.5} ${t / 2})" fill="${cor}"/>
  </g>`);

/* -------------------------------------------------------------- BOTÂNICA */

/** Ramo de louro em traço fino (folhas alternadas, nervuras). `curva` inclina o ramo. */
export const ramo = ({ cor = COR.ouro, w = 420, folhas = 9, curva = 0.18, flip = false, op = 1 } = {}) => {
  const h = w * 0.5;
  const pontos = Array.from({ length: folhas }, (_, i) => {
    const t = (i + 1) / (folhas + 1);
    const x = t * w * 0.92;
    const y = h * 0.6 - Math.sin(t * Math.PI * 0.7) * h * curva * 2.2;
    const lado = i % 2 === 0 ? -1 : 1;
    const len = (1 - t * 0.55) * w * 0.17;
    const larg = len * 0.36;
    const ang = -25 * lado + t * 30 * lado;
    return `<g transform="translate(${x} ${y}) rotate(${ang})">
      <path d="M0 0 C ${len * 0.3} ${-larg * lado}, ${len * 0.75} ${-larg * lado}, ${len} 0 C ${len * 0.75} ${larg * lado * 0.6}, ${len * 0.3} ${larg * lado * 0.6}, 0 0 z"/>
      <path d="M${len * 0.08} 0 H ${len * 0.9}" opacity=".6"/>
      ${[0.3, 0.5, 0.7].map((k) => `<path d="M${len * k} 0 l ${len * 0.1} ${-larg * lado * 0.5}" opacity=".4"/>`).join('')}
    </g>`;
  }).join('');
  return svg(w, h, `<g ${traco(cor, 1.3)} opacity="${op}" ${flip ? `transform="scale(-1 1) translate(-${w} 0)"` : ''}>
    <path d="M0 ${h * 0.62} C ${w * 0.3} ${h * 0.62 - h * curva}, ${w * 0.7} ${h * 0.5 - h * curva * 2}, ${w} ${h * 0.3 - h * curva * 2}"/>
    ${pontos}
  </g>`);
};

/** Dois ramos espelhados formando um V (para rodapés e selos). */
export const ramoDuplo = ({ cor = COR.ouro, w = 520 } = {}) => {
  const r = ramo({ cor, w: w / 2, folhas: 7, curva: 0.26 });
  const inner = r.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  return svg(w, w * 0.3, `<g transform="translate(${w / 2} 0) scale(-1 1)">${inner}</g><g transform="translate(${w / 2} 0)">${inner}</g>`);
};

/** Grinalda circular de louro (para selos e retratos). */
export const grinalda = ({ cor = COR.ouro, t = 360, folhas = 22 } = {}) => {
  const r = t / 2;
  const raio = r - t * 0.12;
  const itens = Array.from({ length: folhas }, (_, i) => {
    const a = (i / folhas) * Math.PI * 2 + Math.PI / 2;
    if (Math.abs(a - Math.PI * 1.5) < 0.35) return ''; // abertura no topo
    const x = r + Math.cos(a) * raio;
    const y = r + Math.sin(a) * raio;
    const ang = (a * 180) / Math.PI + (a < Math.PI * 1.5 ? 90 : -90) + (a < Math.PI * 1.5 ? -30 : 30);
    const len = t * 0.11;
    return `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0 C ${len * 0.3} ${-len * 0.3}, ${len * 0.75} ${-len * 0.3}, ${len} 0 C ${len * 0.75} ${len * 0.2}, ${len * 0.3} ${len * 0.2}, 0 0 z"/><path d="M${len * 0.1} 0 H ${len * 0.85}" opacity=".6"/></g>`;
  }).join('');
  return svg(t, t, `<g ${traco(cor, 1.3)}><path d="M ${r} ${t - t * 0.08} A ${raio} ${raio} 0 1 1 ${r + 0.01} ${t - t * 0.08}" opacity=".5"/>${itens}<rect x="${r - 6}" y="${t - t * 0.08 - 6}" width="12" height="12" transform="rotate(45 ${r} ${t - t * 0.08})" fill="${cor}"/></g>`);
};

/** Folha botânica oficial (vetorizada da arte), como data URI utilizável em <img>. */
export const folhaSolta = ({ cor = COR.ouro, w = 300, op = 1 } = {}) => {
  const [, , vw, vh] = LEAF.vb.split(' ').map(Number);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LEAF.vb}" width="${w}" height="${Math.round((w * vh) / vw)}" style="opacity:${op}"><path fill="${cor}" d="${LEAF.d}"/></svg>`;
};

/* ---------------------------------------------------------------- CIÊNCIA */

export const frasco = ({ cor = COR.ouro, t = 160 } = {}) =>
  svg(t, t * 1.4, `<g ${traco(cor, 1.5)}>
    <path d="M${t * 0.38} ${t * 0.1} h ${t * 0.24}"/><path d="M${t * 0.42} ${t * 0.1} v ${t * 0.42} L ${t * 0.14} ${t * 1.2} a ${t * 0.08} ${t * 0.08} 0 0 0 ${t * 0.08} ${t * 0.1} h ${t * 0.56} a ${t * 0.08} ${t * 0.08} 0 0 0 ${t * 0.08} -${t * 0.1} L ${t * 0.58} ${t * 0.52} v -${t * 0.42}"/>
    <path d="M${t * 0.26} ${t * 0.95} h ${t * 0.48}" opacity=".6"/><path d="M${t * 0.22} ${t * 1.04} c ${t * 0.1} -${t * 0.05}, ${t * 0.2} ${t * 0.05}, ${t * 0.3} 0 s ${t * 0.18} ${t * 0.05}, ${t * 0.26} 0" opacity=".5"/>
    <circle cx="${t * 0.4}" cy="${t * 1.12}" r="${t * 0.02}" fill="${cor}"/><circle cx="${t * 0.55}" cy="${t * 1.08}" r="${t * 0.015}" fill="${cor}"/>
  </g>`);

export const microscopio = ({ cor = COR.ouro, t = 180 } = {}) =>
  svg(t, t * 1.3, `<g ${traco(cor, 1.5)}>
    <path d="M${t * 0.2} ${t * 1.2} h ${t * 0.6}"/><path d="M${t * 0.3} ${t * 1.2} v -${t * 0.12} h ${t * 0.4} v ${t * 0.12}"/>
    <path d="M${t * 0.5} ${t * 1.08} v -${t * 0.2}"/><path d="M${t * 0.3} ${t * 0.88} h ${t * 0.4}" opacity=".7"/>
    <path d="M${t * 0.5} ${t * 0.88} c -${t * 0.3} -${t * 0.1}, -${t * 0.3} -${t * 0.5}, ${t * 0.02} -${t * 0.62}" />
    <path d="M${t * 0.4} ${t * 0.22} l ${t * 0.26} ${t * 0.36}"/><path d="M${t * 0.33} ${t * 0.28} l ${t * 0.14} -${t * 0.1}"/><path d="M${t * 0.58} ${t * 0.64} l ${t * 0.14} -${t * 0.1}"/>
    <circle cx="${t * 0.7}" cy="${t * 0.72}" r="${t * 0.04}"/><path d="M${t * 0.44} ${t * 0.84} h ${t * 0.2}" opacity=".5"/>
  </g>`);

/** Serpente em traço contínuo (curva em S), para linhas do tempo e divisores. */
export const serpenteTraco = ({ cor = COR.ouro, w = 600, h = 120 } = {}) =>
  svg(w, h, `<g ${traco(cor, 2)}>
    <path d="M${w * 0.02} ${h * 0.55} C ${w * 0.18} ${h * 0.1}, ${w * 0.3} ${h * 0.1}, ${w * 0.42} ${h * 0.55} S ${w * 0.66} ${h * 1.0}, ${w * 0.8} ${h * 0.55} S ${w * 0.9} ${h * 0.2}, ${w * 0.95} ${h * 0.4}"/>
    <path d="M${w * 0.95} ${h * 0.4} c ${w * 0.02} -${h * 0.1}, ${w * 0.05} -${h * 0.08}, ${w * 0.04} ${h * 0.02} c -${w * 0.01} ${h * 0.08}, -${w * 0.03} ${h * 0.08}, -${w * 0.04} -${h * 0.02} z" fill="${cor}" opacity=".9"/>
    <path d="M${w * 0.1} ${h * 0.4} l ${w * 0.01} -${h * 0.1}" opacity=".5"/><path d="M${w * 0.5} ${h * 0.75} l ${w * 0.01} ${h * 0.1}" opacity=".5"/>
    ${Array.from({ length: 14 }, (_, i) => `<circle cx="${w * 0.06 + i * w * 0.063}" cy="${h * 0.55 + Math.sin(i * 1.1) * h * 0.3}" r="1.2" fill="${cor}" opacity=".5"/>`).join('')}
  </g>`);

export const estetoscopio = ({ cor = COR.ouro, t = 160 } = {}) =>
  svg(t, t, `<g ${traco(cor, 1.5)}>
    <path d="M${t * 0.22} ${t * 0.1} v ${t * 0.3} a ${t * 0.18} ${t * 0.18} 0 0 0 ${t * 0.36} 0 v -${t * 0.3}"/>
    <path d="M${t * 0.4} ${t * 0.58} v ${t * 0.1} a ${t * 0.2} ${t * 0.2} 0 0 0 ${t * 0.4} 0 v -${t * 0.08}"/>
    <circle cx="${t * 0.8}" cy="${t * 0.5}" r="${t * 0.1}"/><circle cx="${t * 0.8}" cy="${t * 0.5}" r="${t * 0.05}" opacity=".6"/>
    <path d="M${t * 0.18} ${t * 0.1} h ${t * 0.08}"/><path d="M${t * 0.54} ${t * 0.1} h ${t * 0.08}"/>
  </g>`);

export const jaleco = ({ cor = COR.ouro, t = 200 } = {}) =>
  svg(t, t * 1.25, `<g ${traco(cor, 1.5)}>
    <path d="M${t * 0.5} ${t * 0.06} v ${t * 0.08}"/><path d="M${t * 0.3} ${t * 0.14} h ${t * 0.4}"/>
    <path d="M${t * 0.36} ${t * 0.2} L ${t * 0.1} ${t * 0.32} v ${t * 0.86} h ${t * 0.8} v -${t * 0.86} L ${t * 0.64} ${t * 0.2} l -${t * 0.14} ${t * 0.3} z"/>
    <path d="M${t * 0.36} ${t * 0.2} l ${t * 0.14} ${t * 0.3} v ${t * 0.68}" opacity=".6"/>
    <path d="M${t * 0.64} ${t * 0.2} l -${t * 0.14} ${t * 0.3}" opacity=".6"/>
    <path d="M${t * 0.58} ${t * 0.7} h ${t * 0.2} v ${t * 0.16} h -${t * 0.2} z" opacity=".7"/>
    <path d="M${t * 0.68} ${t * 0.73} c -${t * 0.04} -${t * 0.04}, -${t * 0.08} 0, -${t * 0.04} ${t * 0.04} l ${t * 0.04} ${t * 0.04} l ${t * 0.04} -${t * 0.04} c ${t * 0.04} -${t * 0.04}, 0 -${t * 0.08}, -${t * 0.04} -${t * 0.04} z" fill="${cor}"/>
  </g>`);

/* -------------------------------------------------------------------- LOGO */

/** Logo horizontal: medalhão + "GESTÃO / DR. VITAL BRAZIL / CA MEDICINA FAPI". */
export const logoHorizontal = ({ cor = COR.papel, ouro = COR.ouroClaro, h = 120, invertido = true } = {}) => {
  const w = h * 5.2;
  const m = invertido ? medalhao({ cor: COR.verde, fundo: COR.papel, w: h }) : medalhao({ cor, w: h });
  return svg(w, h, `<foreignObject x="0" y="0" width="${h}" height="${h}">${m.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')}</foreignObject>
    <text x="${h * 1.25}" y="${h * 0.32}" font-family="${F_SANS}" font-weight="600" font-size="${h * 0.13}" letter-spacing="${h * 0.04}" fill="${ouro}">GESTÃO</text>
    <text x="${h * 1.25}" y="${h * 0.66}" font-family="${F_DISPLAY}" font-weight="800" font-size="${h * 0.34}" letter-spacing="-0.5" fill="${cor}">DR. VITAL BRAZIL</text>
    <text x="${h * 1.25}" y="${h * 0.9}" font-family="${F_SANS}" font-weight="500" font-size="${h * 0.12}" letter-spacing="${h * 0.035}" fill="${ouro}">CA MEDICINA · FAPI</text>`);
};

/** Logo empilhado (centralizado): medalhão em cima, nome, fio, slogan. */
export const logoEmpilhado = ({ cor = COR.papel, ouro = COR.ouroClaro, w = 520, slogan = true } = {}) => {
  const h = slogan ? w * 0.92 : w * 0.78;
  const m = medalhao({ cor: COR.verde, fundo: COR.papel, w: w * 0.36 });
  return svg(w, h, `<foreignObject x="${w * 0.32}" y="0" width="${w * 0.36}" height="${w * 0.36}">${m.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')}</foreignObject>
    <text x="${w / 2}" y="${w * 0.47}" text-anchor="middle" font-family="${F_SANS}" font-weight="600" font-size="${w * 0.04}" letter-spacing="${w * 0.016}" fill="${ouro}">GESTÃO</text>
    <text x="${w / 2}" y="${w * 0.62}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="800" font-size="${w * 0.115}" letter-spacing="-1" fill="${cor}">DR. VITAL BRAZIL</text>
    <path d="M${w * 0.2} ${w * 0.68} H ${w * 0.46} M${w * 0.54} ${w * 0.68} H ${w * 0.8}" stroke="${ouro}" stroke-width="1.5" opacity=".8"/><rect x="${w / 2 - 5}" y="${w * 0.68 - 5}" width="10" height="10" transform="rotate(45 ${w / 2} ${w * 0.68})" fill="${ouro}"/>
    ${slogan ? `<text x="${w / 2}" y="${w * 0.8}" text-anchor="middle" font-family="${F_SCRIPT}" font-style="italic" font-weight="600" font-size="${w * 0.058}" fill="${ouro}">Mais que uma gestão, um compromisso</text><text x="${w / 2}" y="${w * 0.87}" text-anchor="middle" font-family="${F_SCRIPT}" font-style="italic" font-weight="600" font-size="${w * 0.058}" fill="${ouro}">com a nossa formação.</text>` : ''}`);
};

/** Monograma "VB" em serifada com losango, para marcas d'água e favicons alternativos. */
export const logoMonograma = ({ cor = COR.ouro, t = 200, fundo = null } = {}) =>
  svg(t, t, `${fundo ? `<circle cx="${t / 2}" cy="${t / 2}" r="${t / 2 - 2}" fill="${fundo}"/>` : ''}
    <circle cx="${t / 2}" cy="${t / 2}" r="${t / 2 - 4}" fill="none" stroke="${cor}" stroke-width="1.5"/>
    <circle cx="${t / 2}" cy="${t / 2}" r="${t / 2 - 12}" fill="none" stroke="${cor}" stroke-width="1" opacity=".4"/>
    <text x="${t / 2}" y="${t * 0.62}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="700" font-size="${t * 0.4}" letter-spacing="-2" fill="${cor}">VB</text>
    <rect x="${t / 2 - 5}" y="${t * 0.74}" width="10" height="10" transform="rotate(45 ${t / 2} ${t * 0.74 + 5})" fill="${cor}"/>`);

/** Selo-carimbo com o medalhão e texto circular (versão pronta do `selo`). */
export const logoSelo = ({ cor = COR.ouro, t = 300 } = {}) => selo({ cor, t, miolo: 'medalhao', texto: `${site.nome.toUpperCase()} · CA MEDICINA FAPI · ` });

/** Figura (retrato + serpente) como SVG inline. */
export const figuraInline = ({ cor = COR.ouro, w = 400 } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FIGURE.vb}" width="${w}"><path d="${FIGURE.d}" fill="${cor}" fill-rule="evenodd"/></svg>`;


/* --------------------------------------------------------- ORNAMENTOS II */

/** Banderola (fita) com texto e pontas em cauda de andorinha. */
export const banderola = ({ texto, cor = COR.ouro, fundo = COR.noite, w = 560, px = 22 } = {}) =>
  svg(w, 96, `<g ${traco(cor, 1.5)}>
    <path d="M70 40 H 12 l 14 18 l -14 18 H 70 z" fill="${fundo}" opacity=".85"/>
    <path d="M${w - 70} 40 H ${w - 12} l -14 18 l 14 18 H ${w - 70} z" fill="${fundo}" opacity=".85"/>
    <path d="M70 76 l -12 -10 h 12 z" fill="${cor}" opacity=".6"/><path d="M${w - 70} 76 l 12 -10 h -12 z" fill="${cor}" opacity=".6"/>
    <path d="M58 24 H ${w - 58} v 42 H 58 z" fill="${fundo}"/>
    <path d="M66 32 H ${w - 66} v 26 H 66 z" opacity=".35" stroke-width="1"/>
  </g>
  <text x="${w / 2}" y="${52 + px * 0.34}" text-anchor="middle" font-family="${F_SANS}" font-weight="600" font-size="${px}" letter-spacing="${px * 0.26}" fill="${cor}">${texto.toUpperCase()}</text>`);

/** Roseta: pétalas radiais em traço fino (marcador de capítulo, medalha). */
export const roseta = ({ cor = COR.ouro, t = 120, petalas = 12 } = {}) => {
  const r = t / 2;
  const pet = Array.from({ length: petalas }, (_, i) => `<ellipse cx="${r}" cy="${r * 0.46}" rx="${t * 0.07}" ry="${t * 0.22}" transform="rotate(${(360 / petalas) * i} ${r} ${r})" opacity=".8"/>`).join('');
  return svg(t, t, `<g ${traco(cor, 1.2)}><circle cx="${r}" cy="${r}" r="${r - 2}" opacity=".5"/><circle cx="${r}" cy="${r}" r="${r * 0.72}" stroke-dasharray="2 4" opacity=".6"/>${pet}<circle cx="${r}" cy="${r}" r="${t * 0.09}" fill="${cor}"/><circle cx="${r}" cy="${r}" r="${t * 0.14}" opacity=".7"/></g>`);
};

/** Filete tipográfico: fio duplo com pontos (rodapés, separações de coluna). */
export const filete = ({ cor = COR.ouro, w = 600, pontos = true } = {}) =>
  svg(w, 14, `<g ${traco(cor, 1.2)}><path d="M0 3 H ${w}" opacity=".8"/><path d="M0 11 H ${w}" opacity=".4"/>${pontos ? Array.from({ length: Math.floor(w / 60) }, (_, i) => `<circle cx="${30 + i * 60}" cy="7" r="1.6" fill="${cor}"/>`).join('') : ''}</g>`);

/** Asterismo ⁂ : três losangos (fim de texto, pausa). */
export const asterismo = ({ cor = COR.ouro, t = 48 } = {}) =>
  svg(t, t, `<g fill="${cor}">${[[t / 2, t * 0.22], [t * 0.26, t * 0.7], [t * 0.74, t * 0.7]].map(([x, y]) => `<rect x="${x - t * 0.08}" y="${y - t * 0.08}" width="${t * 0.16}" height="${t * 0.16}" transform="rotate(45 ${x} ${y})"/>`).join('')}</g>`);

/** Etiqueta de espécime (prancha científica): "Fig. N" + nome. Cantos chanfrados, borda dupla. */
export const etiqueta = ({ fig = 'Fig. 1', texto = '', cor = COR.ouroEscuro, tinta = COR.tinta, fundo = COR.papel, w = 420, h = 110 } = {}) =>
  svg(w, h, `<g ${traco(cor, 1.4)}>
    <path d="M14 4 H ${w - 14} l 10 10 V ${h - 14} l -10 10 H 14 l -10 -10 V 14 z" fill="${fundo}"/>
    <path d="M22 12 H ${w - 22} l 6 6 V ${h - 18} l -6 6 H 22 l -6 -6 V 18 z" opacity=".4" stroke-width="1"/>
  </g>
  <text x="34" y="${h * 0.42}" font-family="${F_SANS}" font-weight="600" font-size="${h * 0.15}" letter-spacing="${h * 0.045}" fill="${cor}">${fig.toUpperCase()}</text>
  <text x="34" y="${h * 0.74}" font-family="${F_SCRIPT}" font-style="italic" font-weight="600" font-size="${h * 0.3}" fill="${tinta}">${texto}</text>`);

/** Carimbo retangular (inclinado), para "VOTE", "URGENTE", "APROVADO". */
export const carimbo = ({ texto = 'VOTE', cor = COR.ouro, w = 320, h = 110, rot = -8, px = 44 } = {}) =>
  svg(w + 40, h + 50, `<g transform="rotate(${rot} ${(w + 40) / 2} ${(h + 50) / 2})" ${traco(cor, 3)} opacity=".9">
    <rect x="20" y="25" width="${w}" height="${h}" rx="10"/>
    <rect x="30" y="35" width="${w - 20}" height="${h - 20}" rx="7" stroke-width="1.2" opacity=".6"/>
    <text x="${20 + w / 2}" y="${25 + h / 2 + px * 0.36}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="800" font-size="${px}" letter-spacing="${px * 0.12}" fill="${cor}" stroke="none">${texto.toUpperCase()}</text>
  </g>`);

/** Lacre de cera com o medalhão em relevo. */
export const lacre = ({ cor = COR.ouro, t = 180, miolo = COR.noite, semente = 3 } = {}) => {
  const r = t / 2;
  let s = semente;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const n = 26;
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (0.86 + rnd() * 0.12);
    d += `${i ? 'L' : 'M'} ${r + Math.cos(a) * rr} ${r + Math.sin(a) * rr} `;
  }
  return svg(t, t, `<path d="${d}z" fill="${cor}"/>
    <circle cx="${r}" cy="${r}" r="${r * 0.7}" fill="none" stroke="${miolo}" stroke-width="1.5" opacity=".55"/>
    <circle cx="${r}" cy="${r}" r="${r * 0.64}" fill="none" stroke="${miolo}" stroke-width="1" stroke-dasharray="2 4" opacity=".45"/>
    <g transform="translate(${r - t * 0.26} ${r - t * 0.26}) scale(${(t * 0.52) / 1200})"><svg viewBox="${MEDAL.vb}" width="1200" height="1200"><path d="${MEDAL.d}" fill="${miolo}" fill-rule="evenodd" opacity=".9"/></svg></g>
    <path d="M${r - r * 0.5} ${r - r * 0.55} a ${r * 0.75} ${r * 0.75} 0 0 1 ${r * 0.9} -${r * 0.2}" stroke="#fff" stroke-width="2" opacity=".22" fill="none" stroke-linecap="round"/>`);
};

/** Envelope fechado com lacre e linhas de endereço ("Para: …"). */
export const envelope = ({ cor = COR.ouroEscuro, papel = COR.papel, w = 720, para = 'Para: quem está chegando', de = 'Gestão Dr. Vital Brazil' } = {}) => {
  const h = w * 0.66;
  const l = lacre({ t: w * 0.2, cor: COR.ouro, miolo: COR.noite });
  return svg(w, h, `<g ${traco(cor, 1.6)}>
    <rect x="3" y="3" width="${w - 6}" height="${h - 6}" fill="${papel}"/>
    <rect x="14" y="14" width="${w - 28}" height="${h - 28}" stroke-width="1" opacity=".35"/>
    <path d="M3 3 L ${w / 2} ${h * 0.55} L ${w - 3} 3" opacity=".9"/>
    <path d="M3 ${h - 3} L ${w * 0.42} ${h * 0.5}" opacity=".45"/><path d="M${w - 3} ${h - 3} L ${w * 0.58} ${h * 0.5}" opacity=".45"/>
    <path d="M${w * 0.1} ${h * 0.8} H ${w * 0.46}" opacity=".3"/><path d="M${w * 0.1} ${h * 0.9} H ${w * 0.34}" opacity=".3"/>
  </g>
  <text x="${w * 0.1}" y="${h * 0.78}" font-family="${F_SCRIPT}" font-style="italic" font-weight="600" font-size="${w * 0.048}" fill="${COR.tinta}">${para}</text>
  <text x="${w * 0.1}" y="${h * 0.88}" font-family="${F_SANS}" font-weight="500" font-size="${w * 0.024}" letter-spacing="${w * 0.004}" fill="${cor}">${de.toUpperCase()}</text>
  <g transform="translate(${w / 2 - w * 0.1} ${h * 0.55 - w * 0.1})">${l.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>`);
};

/* ------------------------------------------------------------ BOTÂNICA II */

/** Samambaia: fronde com folíolos decrescentes. */
export const samambaia = ({ cor = COR.ouro, h = 420, flip = false, op = 1 } = {}) => {
  const w = h * 0.5;
  const n = 14;
  const pinas = Array.from({ length: n }, (_, i) => {
    const t = i / n;
    const y = h - t * h * 0.88;
    const x = w * 0.55 - Math.sin(t * 1.6) * w * 0.25;
    const len = (1 - t) * w * 0.42 + w * 0.06;
    const ang = -40 + t * 25;
    const pina = (lado) => `<g transform="translate(${x} ${y}) rotate(${ang * lado}) scale(${lado} 1)">
      <path d="M0 0 C ${len * 0.25} ${-len * 0.12}, ${len * 0.7} ${-len * 0.14}, ${len} 0 C ${len * 0.7} ${len * 0.1}, ${len * 0.25} ${len * 0.1}, 0 0 z"/>
      <path d="M${len * 0.05} 0 H ${len * 0.9}" opacity=".5"/>
      ${[0.2, 0.35, 0.5, 0.65, 0.8].map((k) => `<path d="M${len * k} 0 l ${len * 0.06} -${len * 0.08}" opacity=".35"/>`).join('')}
    </g>`;
    return pina(1) + pina(-1);
  }).join('');
  return svg(w, h, `<g ${traco(cor, 1.2)} opacity="${op}" ${flip ? `transform="scale(-1 1) translate(-${w} 0)"` : ''}>
    <path d="M${w * 0.55} ${h} C ${w * 0.5} ${h * 0.6}, ${w * 0.35} ${h * 0.4}, ${w * 0.36} ${h * 0.06} c 0 -4, 4 -8, 8 -6" stroke-width="1.6"/>${pinas}</g>`);
};

/** Espiga (trigo/capim): haste com grãos alternados e aristas. */
export const espiga = ({ cor = COR.ouro, h = 360, op = 1 } = {}) => {
  const w = h * 0.22;
  const graos = Array.from({ length: 10 }, (_, i) => {
    const y = h * 0.08 + i * h * 0.055;
    const lado = i % 2 ? 1 : -1;
    return `<ellipse cx="${w / 2 + lado * w * 0.14}" cy="${y}" rx="${w * 0.11}" ry="${w * 0.2}" transform="rotate(${lado * 28} ${w / 2 + lado * w * 0.14} ${y})"/><path d="M${w / 2 + lado * w * 0.2} ${y - w * 0.12} l ${lado * w * 0.28} -${h * 0.09}" opacity=".5"/>`;
  }).join('');
  return svg(w, h, `<g ${traco(cor, 1.2)} opacity="${op}"><path d="M${w / 2} ${h} V ${h * 0.08}" stroke-width="1.6"/><path d="M${w / 2} ${h * 0.75} c ${w * 0.5} -${h * 0.05}, ${w * 0.6} -${h * 0.2}, ${w * 0.55} -${h * 0.3}" opacity=".6"/>${graos}</g>`);
};

/** Flor em gravura (oito pétalas com nervura, miolo pontilhado, haste com duas folhas). */
export const flor = ({ cor = COR.ouro, t = 220, petalas = 8, haste = true, op = 1 } = {}) => {
  const cx = t / 2;
  const cy = haste ? t * 0.34 : t / 2;
  const R = t * 0.3;
  const pet = Array.from({ length: petalas }, (_, i) => {
    const a = (360 / petalas) * i;
    return `<g transform="rotate(${a} ${cx} ${cy})"><path d="M${cx} ${cy} C ${cx - R * 0.32} ${cy - R * 0.4}, ${cx - R * 0.26} ${cy - R * 0.95}, ${cx} ${cy - R} C ${cx + R * 0.26} ${cy - R * 0.95}, ${cx + R * 0.32} ${cy - R * 0.4}, ${cx} ${cy} z"/><path d="M${cx} ${cy - R * 0.15} V ${cy - R * 0.85}" opacity=".45"/></g>`;
  }).join('');
  const miolo = Array.from({ length: 12 }, (_, i) => `<circle cx="${cx + Math.cos(i * 1.7) * R * 0.14 * (i % 3)}" cy="${cy + Math.sin(i * 1.7) * R * 0.14 * (i % 3)}" r="1.4" fill="${cor}"/>`).join('');
  return svg(t, haste ? t * 1.35 : t, `<g ${traco(cor, 1.2)} opacity="${op}">${pet}<circle cx="${cx}" cy="${cy}" r="${R * 0.22}"/>${miolo}
    ${haste ? `<path d="M${cx} ${cy + R} C ${cx + t * 0.05} ${t * 0.9}, ${cx - t * 0.05} ${t * 1.1}, ${cx} ${t * 1.35}" stroke-width="1.6"/>
    <path d="M${cx} ${t * 0.95} c -${t * 0.18} -${t * 0.1}, -${t * 0.24} ${t * 0.02}, -${t * 0.2} ${t * 0.1} c ${t * 0.12} ${t * 0.04}, ${t * 0.18} -${t * 0.02}, ${t * 0.2} -${t * 0.1} z"/><path d="M${cx} ${t * 1.1} c ${t * 0.18} -${t * 0.1}, ${t * 0.24} ${t * 0.02}, ${t * 0.2} ${t * 0.1} c -${t * 0.12} ${t * 0.04}, -${t * 0.18} -${t * 0.02}, -${t * 0.2} -${t * 0.1} z"/>` : ''}
  </g>`);
};

/** Trepadeira vertical (para bordas laterais): haste ondulada, folhas e gavinhas. */
export const trepadeira = ({ cor = COR.ouro, h = 900, op = 1, flip = false } = {}) => {
  const w = h * 0.16;
  const n = Math.round(h / 90);
  const itens = Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const y = t * h;
    const x = w * 0.5 + Math.sin(t * Math.PI * 3) * w * 0.25;
    const lado = i % 2 ? 1 : -1;
    const len = w * 0.62;
    return `<g transform="translate(${x} ${y}) rotate(${lado * 35 + 10}) scale(${lado} 1)"><path d="M0 0 C ${len * 0.3} ${-len * 0.45}, ${len * 0.8} ${-len * 0.4}, ${len} 0 C ${len * 0.8} ${len * 0.3}, ${len * 0.3} ${len * 0.3}, 0 0 z"/><path d="M${len * 0.1} 0 H ${len * 0.85}" opacity=".5"/></g>
      ${i % 3 === 0 ? `<path d="M${x} ${y + 30} c ${-lado * 12} 10, ${-lado * 22} 2, ${-lado * 14} -8 c 6 -8, 14 -2, 10 6" opacity=".6"/>` : ''}`;
  }).join('');
  let d = `M ${w * 0.5} 0`;
  for (let i = 1; i <= 24; i++) d += ` L ${w * 0.5 + Math.sin((i / 24) * Math.PI * 3) * w * 0.25} ${(i / 24) * h}`;
  return svg(w, h, `<g ${traco(cor, 1.2)} opacity="${op}" ${flip ? `transform="scale(-1 1) translate(-${w} 0)"` : ''}><path d="${d}" stroke-width="1.6" stroke-linejoin="round"/>${itens}</g>`);
};

/** Ramo de oliveira: folhas estreitas e frutos. */
export const oliveira = ({ cor = COR.ouro, w = 420, op = 1, flip = false } = {}) => {
  const h = w * 0.42;
  const n = 11;
  const itens = Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / (n + 1);
    const x = t * w * 0.94;
    const y = h * 0.58 - Math.sin(t * Math.PI * 0.6) * h * 0.4;
    const lado = i % 2 ? 1 : -1;
    const len = (1 - t * 0.4) * w * 0.15;
    return `<g transform="translate(${x} ${y}) rotate(${-50 * lado + t * 20 * lado})"><path d="M0 0 C ${len * 0.3} ${-len * 0.14 * lado}, ${len * 0.75} ${-len * 0.14 * lado}, ${len} 0 C ${len * 0.75} ${len * 0.12 * lado}, ${len * 0.3} ${len * 0.12 * lado}, 0 0 z"/><path d="M${len * 0.08} 0 H ${len * 0.9}" opacity=".5"/></g>
      ${i % 4 === 1 ? `<circle cx="${x + 10}" cy="${y + 16 * lado}" r="${w * 0.018}" fill="${cor}" opacity=".85"/><circle cx="${x + 24}" cy="${y + 8 * lado}" r="${w * 0.014}" fill="${cor}" opacity=".6"/>` : ''}`;
  }).join('');
  return svg(w, h, `<g ${traco(cor, 1.2)} opacity="${op}" ${flip ? `transform="scale(-1 1) translate(-${w} 0)"` : ''}><path d="M0 ${h * 0.6} C ${w * 0.3} ${h * 0.55}, ${w * 0.7} ${h * 0.3}, ${w} ${h * 0.18}" stroke-width="1.5"/>${itens}</g>`);
};

/** Folhas espalhadas (determinísticas) numa área w × h, para texturizar fundos. */
export const folhasEspalhadas = ({ cor = COR.ouro, w = 1080, h = 1350, n = 14, semente = 5, op = 0.14 } = {}) => {
  let s = semente;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const itens = Array.from({ length: n }, () => {
    const x = r() * w, y = r() * h, len = 40 + r() * 70, a = r() * 360;
    return `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0 C ${len * 0.3} ${-len * 0.4}, ${len * 0.8} ${-len * 0.35}, ${len} 0 C ${len * 0.8} ${len * 0.3}, ${len * 0.3} ${len * 0.3}, 0 0 z"/><path d="M${len * 0.1} 0 H ${len * 0.85}" opacity=".5"/><path d="M${len * 0.3} 0 l ${len * 0.1} -${len * 0.15}" opacity=".35"/><path d="M${len * 0.55} 0 l ${len * 0.1} -${len * 0.15}" opacity=".35"/></g>`;
  }).join('');
  return svg(w, h, `<g ${traco(cor, 1.1)} opacity="${op}">${itens}</g>`);
};

/* ------------------------------------------------------------- CIÊNCIA II */

/** Bastão de Asclépio: um bastão, uma serpente (símbolo correto da medicina). */
export const bastaoAsclepio = ({ cor = COR.ouro, h = 260 } = {}) => {
  const w = h * 0.42;
  const cx = w / 2;
  return svg(w, h, `<g ${traco(cor, 1.6)}>
    <path d="M${cx} ${h * 0.1} V ${h * 0.98}" stroke-width="2.4"/><circle cx="${cx}" cy="${h * 0.08}" r="${w * 0.1}"/>
    <path d="M${cx - w * 0.3} ${h * 0.28} C ${cx + w * 0.55} ${h * 0.3}, ${cx + w * 0.55} ${h * 0.44}, ${cx} ${h * 0.46} S ${cx - w * 0.55} ${h * 0.6}, ${cx} ${h * 0.62} S ${cx + w * 0.55} ${h * 0.76}, ${cx} ${h * 0.78} S ${cx - w * 0.5} ${h * 0.9}, ${cx - w * 0.1} ${h * 0.92}"/>
    <path d="M${cx - w * 0.3} ${h * 0.28} c -${w * 0.16} -${h * 0.02}, -${w * 0.2} ${h * 0.06}, -${w * 0.04} ${h * 0.07} c ${w * 0.1} 0, ${w * 0.14} -${h * 0.03}, ${w * 0.04} -${h * 0.07} z" fill="${cor}"/>
    ${[0.33, 0.4, 0.5, 0.56, 0.66, 0.72, 0.84].map((k) => `<path d="M${cx + (k % 0.2 < 0.1 ? 1 : -1) * w * 0.2} ${h * k} l ${w * 0.04} ${h * 0.012}" opacity=".5"/>`).join('')}
  </g>`);
};

/** Livro aberto, páginas com linhas. */
export const livro = ({ cor = COR.ouro, w = 220 } = {}) => {
  const h = w * 0.62;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <path d="M${w / 2} ${h * 0.22} C ${w * 0.38} ${h * 0.1}, ${w * 0.18} ${h * 0.1}, ${w * 0.06} ${h * 0.16} V ${h * 0.86} C ${w * 0.18} ${h * 0.8}, ${w * 0.38} ${h * 0.8}, ${w / 2} ${h * 0.92} C ${w * 0.62} ${h * 0.8}, ${w * 0.82} ${h * 0.8}, ${w * 0.94} ${h * 0.86} V ${h * 0.16} C ${w * 0.82} ${h * 0.1}, ${w * 0.62} ${h * 0.1}, ${w / 2} ${h * 0.22} z"/>
    <path d="M${w / 2} ${h * 0.22} V ${h * 0.92}"/><path d="M${w * 0.03} ${h * 0.2} V ${h * 0.9} L ${w / 2} ${h * 0.98} L ${w * 0.97} ${h * 0.9} V ${h * 0.2}" opacity=".5"/>
    ${[0.34, 0.46, 0.58, 0.7].map((k) => `<path d="M${w * 0.14} ${h * k} C ${w * 0.26} ${h * (k - 0.03)}, ${w * 0.36} ${h * (k - 0.03)}, ${w * 0.44} ${h * (k + 0.02)}" opacity=".45"/><path d="M${w * 0.56} ${h * (k + 0.02)} C ${w * 0.64} ${h * (k - 0.03)}, ${w * 0.74} ${h * (k - 0.03)}, ${w * 0.86} ${h * k}" opacity=".45"/>`).join('')}
  </g>`);
};

/** Pena de escrever com tinteiro. */
export const pena = ({ cor = COR.ouro, h = 240 } = {}) => {
  const w = h * 0.7;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <path d="M${w * 0.2} ${h * 0.86} C ${w * 0.3} ${h * 0.5}, ${w * 0.55} ${h * 0.2}, ${w * 0.9} ${h * 0.04} C ${w * 0.92} ${h * 0.3}, ${w * 0.8} ${h * 0.55}, ${w * 0.5} ${h * 0.7} C ${w * 0.4} ${h * 0.74}, ${w * 0.3} ${h * 0.8}, ${w * 0.2} ${h * 0.86} z"/>
    <path d="M${w * 0.22} ${h * 0.84} C ${w * 0.45} ${h * 0.6}, ${w * 0.65} ${h * 0.35}, ${w * 0.88} ${h * 0.06}" opacity=".6"/>
    ${[0.3, 0.42, 0.54, 0.66].map((k) => `<path d="M${w * (0.95 - k * 0.6)} ${h * (0.1 + k * 0.8)} l ${w * 0.1} -${h * 0.12}" opacity=".35"/>`).join('')}
    <path d="M${w * 0.06} ${h * 0.98} h ${w * 0.3} v -${h * 0.1} h -${w * 0.3} z"/><path d="M${w * 0.12} ${h * 0.88} v -${h * 0.05} h ${w * 0.18} v ${h * 0.05}" opacity=".7"/>
  </g>`);
};

/** Lamparina (luz do conhecimento). */
export const lampada = ({ cor = COR.ouro, w = 200 } = {}) => {
  const h = w * 0.8;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <path d="M${w * 0.22} ${h * 0.55} C ${w * 0.1} ${h * 0.55}, ${w * 0.08} ${h * 0.75}, ${w * 0.3} ${h * 0.8} H ${w * 0.7} C ${w * 0.95} ${h * 0.75}, ${w * 0.98} ${h * 0.6}, ${w * 0.78} ${h * 0.55} z"/>
    <path d="M${w * 0.78} ${h * 0.58} C ${w * 0.9} ${h * 0.5}, ${w * 0.94} ${h * 0.58}, ${w * 0.9} ${h * 0.64}" opacity=".7"/>
    <path d="M${w * 0.22} ${h * 0.58} C ${w * 0.1} ${h * 0.5}, ${w * 0.05} ${h * 0.4}, ${w * 0.16} ${h * 0.36} C ${w * 0.22} ${h * 0.4}, ${w * 0.2} ${h * 0.5}, ${w * 0.22} ${h * 0.58}" opacity=".8"/>
    <path d="M${w * 0.5} ${h * 0.55} V ${h * 0.46}"/><path d="M${w * 0.5} ${h * 0.46} C ${w * 0.38} ${h * 0.34}, ${w * 0.42} ${h * 0.1}, ${w * 0.5} ${h * 0.04} C ${w * 0.58} ${h * 0.1}, ${w * 0.62} ${h * 0.34}, ${w * 0.5} ${h * 0.46}"/><path d="M${w * 0.5} ${h * 0.42} C ${w * 0.45} ${h * 0.34}, ${w * 0.47} ${h * 0.24}, ${w * 0.5} ${h * 0.2}" opacity=".5"/>
    <path d="M${w * 0.3} ${h * 0.86} H ${w * 0.7}" opacity=".6"/><path d="M${w * 0.36} ${h * 0.92} H ${w * 0.64}" opacity=".4"/>
  </g>`);
};

export const ampulheta = ({ cor = COR.ouro, h = 220 } = {}) => {
  const w = h * 0.6;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <path d="M${w * 0.1} ${h * 0.04} H ${w * 0.9}"/><path d="M${w * 0.1} ${h * 0.96} H ${w * 0.9}"/>
    <path d="M${w * 0.18} ${h * 0.08} C ${w * 0.18} ${h * 0.4}, ${w * 0.46} ${h * 0.42}, ${w * 0.5} ${h * 0.5} C ${w * 0.54} ${h * 0.42}, ${w * 0.82} ${h * 0.4}, ${w * 0.82} ${h * 0.08}"/>
    <path d="M${w * 0.18} ${h * 0.92} C ${w * 0.18} ${h * 0.6}, ${w * 0.46} ${h * 0.58}, ${w * 0.5} ${h * 0.5} C ${w * 0.54} ${h * 0.58}, ${w * 0.82} ${h * 0.6}, ${w * 0.82} ${h * 0.92}"/>
    <path d="M${w * 0.3} ${h * 0.28} C ${w * 0.34} ${h * 0.38}, ${w * 0.46} ${h * 0.4}, ${w * 0.5} ${h * 0.46} C ${w * 0.54} ${h * 0.4}, ${w * 0.66} ${h * 0.38}, ${w * 0.7} ${h * 0.28} z" fill="${cor}" opacity=".45"/>
    <path d="M${w * 0.3} ${h * 0.9} C ${w * 0.4} ${h * 0.84}, ${w * 0.6} ${h * 0.84}, ${w * 0.7} ${h * 0.9} z" fill="${cor}" opacity=".45"/>
    <path d="M${w * 0.5} ${h * 0.5} V ${h * 0.86}" stroke-dasharray="1 4" opacity=".6"/>
    <path d="M${w * 0.14} ${h * 0.04} V ${h * 0.96}" opacity=".35"/><path d="M${w * 0.86} ${h * 0.04} V ${h * 0.96}" opacity=".35"/>
  </g>`);
};

/** Balança de pratos (transparência, justiça). */
export const balanca = ({ cor = COR.ouro, w = 240 } = {}) => {
  const h = w * 0.9;
  const prato = (x) => `<path d="M${x} ${h * 0.36} L ${x - w * 0.12} ${h * 0.62}"/><path d="M${x} ${h * 0.36} L ${x + w * 0.12} ${h * 0.62}"/><path d="M${x - w * 0.16} ${h * 0.62} A ${w * 0.16} ${w * 0.1} 0 0 0 ${x + w * 0.16} ${h * 0.62}"/><circle cx="${x}" cy="${h * 0.36}" r="2" fill="${cor}"/>`;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <path d="M${w / 2} ${h * 0.12} V ${h * 0.86}" stroke-width="2"/><path d="M${w * 0.3} ${h * 0.94} H ${w * 0.7}" stroke-width="2"/><path d="M${w * 0.36} ${h * 0.88} H ${w * 0.64}" opacity=".6"/>
    <path d="M${w * 0.18} ${h * 0.3} L ${w * 0.82} ${h * 0.3}" stroke-width="2"/><path d="M${w / 2} ${h * 0.12} l -${w * 0.05} -${h * 0.06} h ${w * 0.1} z" fill="${cor}"/>
    ${prato(w * 0.18)}${prato(w * 0.82)}
  </g>`);
};

/** Coração anatômico simplificado em gravura. */
export const coracao = ({ cor = COR.ouro, h = 220 } = {}) => {
  const w = h * 0.86;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <path d="M${w * 0.5} ${h * 0.34} C ${w * 0.42} ${h * 0.2}, ${w * 0.18} ${h * 0.14}, ${w * 0.12} ${h * 0.36} C ${w * 0.06} ${h * 0.58}, ${w * 0.3} ${h * 0.82}, ${w * 0.5} ${h * 0.96} C ${w * 0.74} ${h * 0.8}, ${w * 0.96} ${h * 0.58}, ${w * 0.88} ${h * 0.34} C ${w * 0.82} ${h * 0.16}, ${w * 0.6} ${h * 0.18}, ${w * 0.5} ${h * 0.34} z"/>
    <path d="M${w * 0.36} ${h * 0.3} C ${w * 0.3} ${h * 0.14}, ${w * 0.34} ${h * 0.04}, ${w * 0.42} ${h * 0.02}" /><path d="M${w * 0.5} ${h * 0.34} C ${w * 0.5} ${h * 0.2}, ${w * 0.5} ${h * 0.1}, ${w * 0.56} ${h * 0.02}"/><path d="M${w * 0.62} ${h * 0.26} C ${w * 0.62} ${h * 0.16}, ${w * 0.7} ${h * 0.08}, ${w * 0.8} ${h * 0.1}"/>
    <path d="M${w * 0.4} ${h * 0.02} h ${w * 0.08}" opacity=".7"/><path d="M${w * 0.54} ${h * 0.02} h ${w * 0.06}" opacity=".7"/>
    <path d="M${w * 0.44} ${h * 0.4} C ${w * 0.5} ${h * 0.56}, ${w * 0.46} ${h * 0.72}, ${w * 0.52} ${h * 0.88}" opacity=".55"/>
    <path d="M${w * 0.44} ${h * 0.46} c ${w * 0.08} -${h * 0.02}, ${w * 0.14} ${h * 0.02}, ${w * 0.2} ${h * 0.06}" opacity=".4"/><path d="M${w * 0.46} ${h * 0.6} c ${w * 0.06} ${h * 0.04}, ${w * 0.12} ${h * 0.06}, ${w * 0.18} ${h * 0.04}" opacity=".4"/>
    ${[0.46, 0.56, 0.66].map((k) => `<path d="M${w * 0.2} ${h * k} c ${w * 0.04} -${h * 0.02}, ${w * 0.08} 0, ${w * 0.1} ${h * 0.03}" opacity=".3"/>`).join('')}
  </g>`);
};

export const lupa = ({ cor = COR.ouro, t = 180 } = {}) =>
  svg(t, t, `<g ${traco(cor, 1.6)}>
    <circle cx="${t * 0.4}" cy="${t * 0.4}" r="${t * 0.28}"/><circle cx="${t * 0.4}" cy="${t * 0.4}" r="${t * 0.22}" opacity=".45" stroke-width="1"/>
    <path d="M${t * 0.6} ${t * 0.6} L ${t * 0.9} ${t * 0.9}" stroke-width="${t * 0.05}"/><path d="M${t * 0.64} ${t * 0.56} l ${t * 0.06} ${t * 0.06}" opacity=".6"/>
    <path d="M${t * 0.26} ${t * 0.3} c ${t * 0.04} -${t * 0.08}, ${t * 0.14} -${t * 0.1}, ${t * 0.22} -${t * 0.06}" opacity=".5"/>
  </g>`);

/** Retorta (balão com pescoço longo), química do séc. XIX. */
export const retorta = ({ cor = COR.ouro, w = 220 } = {}) => {
  const h = w * 0.8;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <circle cx="${w * 0.3}" cy="${h * 0.62}" r="${w * 0.24}"/>
    <path d="M${w * 0.42} ${h * 0.36} C ${w * 0.5} ${h * 0.2}, ${w * 0.7} ${h * 0.2}, ${w * 0.96} ${h * 0.6}" stroke-width="1.8"/><path d="M${w * 0.5} ${h * 0.4} C ${w * 0.56} ${h * 0.3}, ${w * 0.7} ${h * 0.3}, ${w * 0.9} ${h * 0.64}" stroke-width="1.8"/>
    <path d="M${w * 0.9} ${h * 0.64} l ${w * 0.06} -${h * 0.04}"/>
    <path d="M${w * 0.1} ${h * 0.7} c ${w * 0.1} -${h * 0.04}, ${w * 0.2} ${h * 0.04}, ${w * 0.3} 0 s ${w * 0.08} ${h * 0.03}, ${w * 0.12} 0" opacity=".5"/><path d="M${w * 0.1} ${h * 0.7} A ${w * 0.24} ${w * 0.24} 0 0 0 ${w * 0.52} ${h * 0.7}" fill="${cor}" opacity=".18"/>
    <circle cx="${w * 0.2}" cy="${h * 0.58}" r="1.6" fill="${cor}"/><circle cx="${w * 0.3}" cy="${h * 0.5}" r="1.2" fill="${cor}"/>
    <path d="M${w * 0.14} ${h * 0.94} H ${w * 0.46}" opacity=".5"/>
  </g>`);
};

/** Ampola/vidro de soro com rolha. */
export const ampola = ({ cor = COR.ouro, h = 220 } = {}) => {
  const w = h * 0.4;
  return svg(w, h, `<g ${traco(cor, 1.5)}>
    <path d="M${w * 0.32} ${h * 0.04} h ${w * 0.36} v ${h * 0.1} h -${w * 0.36} z"/><path d="M${w * 0.36} ${h * 0.14} v ${h * 0.08} c -${w * 0.22} ${h * 0.03}, -${w * 0.22} ${h * 0.06}, -${w * 0.22} ${h * 0.12} v ${h * 0.56} a ${w * 0.1} ${w * 0.1} 0 0 0 ${w * 0.1} ${h * 0.04} h ${w * 0.52} a ${w * 0.1} ${w * 0.1} 0 0 0 ${w * 0.1} -${h * 0.04} v -${h * 0.56} c 0 -${h * 0.06}, 0 -${h * 0.09}, -${w * 0.22} -${h * 0.12} v -${h * 0.08}"/>
    <path d="M${w * 0.2} ${h * 0.46} h ${w * 0.6} v ${h * 0.28} h -${w * 0.6} z" opacity=".55"/>
    <path d="M${w * 0.28} ${h * 0.56} h ${w * 0.44}" opacity=".4"/><path d="M${w * 0.28} ${h * 0.64} h ${w * 0.3}" opacity=".4"/>
    <path d="M${w * 0.22} ${h * 0.8} c ${w * 0.1} -${h * 0.02}, ${w * 0.2} ${h * 0.02}, ${w * 0.28} 0 s ${w * 0.2} ${h * 0.02}, ${w * 0.28} 0" opacity=".5"/>
  </g>`);
};

/** Dupla hélice de DNA (horizontal). */
export const dna = ({ cor = COR.ouro, w = 520, h = 120 } = {}) => {
  const n = 18;
  const pts = (fase) => Array.from({ length: 61 }, (_, i) => `${(i / 60) * w} ${h / 2 + Math.sin((i / 60) * Math.PI * 4 + fase) * h * 0.38}`).join(' L ');
  const degraus = Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const x = t * w;
    const y1 = h / 2 + Math.sin(t * Math.PI * 4) * h * 0.38;
    const y2 = h / 2 + Math.sin(t * Math.PI * 4 + Math.PI) * h * 0.38;
    return `<path d="M${x} ${y1} V ${y2}" opacity=".5"/><circle cx="${x}" cy="${(y1 + y2) / 2}" r="1.5" fill="${cor}"/>`;
  }).join('');
  return svg(w, h, `<g ${traco(cor, 1.5)}><path d="M${pts(0)}"/><path d="M${pts(Math.PI)}" opacity=".7"/>${degraus}</g>`);
};

/** Rosa dos ventos (direção, rumo). */
export const bussola = ({ cor = COR.ouro, t = 220 } = {}) => {
  const c = t / 2;
  const ponta = (ang, len, larg) => `<g transform="rotate(${ang} ${c} ${c})"><path d="M${c} ${c - len} L ${c + larg} ${c} L ${c} ${c + larg * 0.4} L ${c - larg} ${c} z"/><path d="M${c} ${c - len} L ${c + larg} ${c} L ${c} ${c} z" fill="${cor}" opacity=".7"/></g>`;
  return svg(t, t, `<g ${traco(cor, 1.3)}>
    <circle cx="${c}" cy="${c}" r="${c - 3}" opacity=".7"/><circle cx="${c}" cy="${c}" r="${c - 12}" stroke-dasharray="2 5" opacity=".5"/>
    ${[45, 135, 225, 315].map((a) => ponta(a, c * 0.5, c * 0.08)).join('')}
    ${[0, 90, 180, 270].map((a) => ponta(a, c * 0.82, c * 0.12)).join('')}
    <circle cx="${c}" cy="${c}" r="${c * 0.08}" fill="${COR.noite}" stroke="${cor}"/>
    <text x="${c}" y="${c * 0.26}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="700" font-size="${t * 0.09}" fill="${cor}">N</text>
  </g>`);
};

/* ----------------------------------------------------------------- LOGO II */

/** Assinatura em itálico (Cormorant) + fio: para cartas, convites e rodapés leves. */
export const logoAssinatura = ({ cor = COR.ouroClaro, w = 520 } = {}) =>
  svg(w, w * 0.26, `<text x="${w / 2}" y="${w * 0.12}" text-anchor="middle" font-family="${F_SCRIPT}" font-style="italic" font-weight="600" font-size="${w * 0.082}" fill="${cor}">Gestão Dr. Vital Brazil</text>
    <path d="M${w * 0.2} ${w * 0.19} H ${w * 0.47} M${w * 0.53} ${w * 0.19} H ${w * 0.8}" stroke="${cor}" stroke-width="1.2" opacity=".7"/><rect x="${w / 2 - 4}" y="${w * 0.19 - 4}" width="8" height="8" transform="rotate(45 ${w / 2} ${w * 0.19})" fill="${cor}"/>
    <text x="${w / 2}" y="${w * 0.245}" text-anchor="middle" font-family="${F_SANS}" font-weight="600" font-size="${w * 0.028}" letter-spacing="${w * 0.01}" fill="${cor}">CA MEDICINA · FAPI</text>`);

/** Carimbo circular com os anos (1865 · 2026) no miolo. */
export const logoCarimbo = ({ cor = COR.ouro, t = 300 } = {}) => {
  const base = selo({ cor, t, miolo: 'losango', texto: 'GESTÃO DR. VITAL BRAZIL · CA MEDICINA · FAPI · ' });
  const r = t / 2;
  return base.replace('</svg>', `<text x="${r}" y="${r - t * 0.02}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="700" font-size="${t * 0.13}" letter-spacing="${t * 0.01}" fill="${cor}">1865</text><text x="${r}" y="${r + t * 0.16}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="700" font-size="${t * 0.13}" letter-spacing="${t * 0.01}" fill="${cor}">2026</text></svg>`).replace(/<rect x="[^"]+" y="[^"]+" width="[^"]+" height="[^"]+" transform="rotate\(45[^>]+>/, `<rect x="${r - t * 0.03}" y="${r + t * 0.025}" width="${t * 0.06}" height="${t * 0.06}" transform="rotate(45 ${r} ${r + t * 0.055})" fill="${cor}"/>`);
};

/** Medalhão sobre banderola com o nome. */
export const logoBanderola = ({ cor = COR.papel, ouro = COR.ouro, w = 560, fundo = COR.noite } = {}) => {
  const m = medalhao({ cor: COR.verde, fundo: COR.papel, w: w * 0.3 });
  const b = banderola({ texto: 'Dr. Vital Brazil', cor: ouro, fundo, w, px: w * 0.045 });
  return svg(w, w * 0.64, `<foreignObject x="${w * 0.35}" y="0" width="${w * 0.3}" height="${w * 0.3}">${m.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')}</foreignObject>
    <text x="${w / 2}" y="${w * 0.37}" text-anchor="middle" font-family="${F_SANS}" font-weight="600" font-size="${w * 0.03}" letter-spacing="${w * 0.012}" fill="${ouro}">GESTÃO</text>
    <g transform="translate(0 ${w * 0.385})">${b.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</g>
    <text x="${w / 2}" y="${w * 0.62}" text-anchor="middle" font-family="${F_SANS}" font-weight="500" font-size="${w * 0.024}" letter-spacing="${w * 0.01}" fill="${cor}" opacity=".8">CA MEDICINA · FAPI</text>`);
};

/** Placa/etiqueta retangular com borda dupla (para rodapés e cartões). */
export const logoEtiqueta = ({ cor = COR.papel, ouro = COR.ouroClaro, w = 460, fundo = null } = {}) => {
  const h = w * 0.42;
  return svg(w, h, `${fundo ? `<rect x="2" y="2" width="${w - 4}" height="${h - 4}" fill="${fundo}"/>` : ''}
    <g ${traco(ouro, 1.5)}><rect x="3" y="3" width="${w - 6}" height="${h - 6}"/><rect x="12" y="12" width="${w - 24}" height="${h - 24}" stroke-width="1" opacity=".4"/>
    ${[[3, 3], [w - 3, 3], [3, h - 3], [w - 3, h - 3]].map(([x, y]) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" transform="rotate(45 ${x} ${y})" fill="${ouro}"/>`).join('')}</g>
    <text x="${w / 2}" y="${h * 0.3}" text-anchor="middle" font-family="${F_SANS}" font-weight="600" font-size="${w * 0.03}" letter-spacing="${w * 0.012}" fill="${ouro}">GESTÃO</text>
    <text x="${w / 2}" y="${h * 0.58}" text-anchor="middle" font-family="${F_DISPLAY}" font-weight="800" font-size="${w * 0.085}" letter-spacing="-0.5" fill="${cor}">DR. VITAL BRAZIL</text>
    <path d="M${w * 0.3} ${h * 0.7} H ${w * 0.47} M${w * 0.53} ${h * 0.7} H ${w * 0.7}" stroke="${ouro}" stroke-width="1.2" opacity=".7"/><rect x="${w / 2 - 4}" y="${h * 0.7 - 4}" width="8" height="8" transform="rotate(45 ${w / 2} ${h * 0.7})" fill="${ouro}"/>
    <text x="${w / 2}" y="${h * 0.86}" text-anchor="middle" font-family="${F_SANS}" font-weight="500" font-size="${w * 0.026}" letter-spacing="${w * 0.01}" fill="${ouro}">CA MEDICINA · FAPI</text>`);
};

/** Mínimo: medalhão + @ (assinatura de canto). */
export const logoMinimo = ({ cor = COR.papel, h = 64 } = {}) => {
  const m = medalhao({ cor: COR.verde, fundo: COR.papel, w: h });
  const w = h * 6;
  return svg(w, h, `<foreignObject x="0" y="0" width="${h}" height="${h}">${m.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')}</foreignObject>
    <text x="${h * 1.3}" y="${h * 0.64}" font-family="${F_SANS}" font-weight="600" font-size="${h * 0.42}" fill="${cor}">${site.instagram.handle}</text>`);
};

/** Lacre com o medalhão (versão pronta). */
export const logoLacre = ({ t = 200 } = {}) => lacre({ t, cor: COR.ouro, miolo: COR.noite });

export const CATALOGO = { cantoneira, moldura, divisor, cartucho, selo, losangoDuplo, banderola, roseta, filete, asterismo, etiqueta, carimbo, lacre, envelope, ramo, ramoDuplo, grinalda, folhaSolta, samambaia, espiga, flor, trepadeira, oliveira, folhasEspalhadas, frasco, microscopio, serpenteTraco, estetoscopio, jaleco, bastaoAsclepio, livro, pena, lampada, ampulheta, balanca, coracao, lupa, retorta, ampola, dna, bussola, logoHorizontal, logoEmpilhado, logoMonograma, logoSelo, figuraInline, logoAssinatura, logoCarimbo, logoBanderola, logoEtiqueta, logoMinimo, logoLacre };

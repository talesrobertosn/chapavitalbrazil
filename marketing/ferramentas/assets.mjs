/**
 * BIBLIOTECA DE ASSETS · Gravura Viva
 * ----------------------------------------------------------------------------
 * Elementos vetoriais desenhados no mesmo traço fino de gravura, para variar
 * as artes sem sair da direção de arte. Todos devolvem SVG em texto.
 *
 *  ORNAMENTOS   cantoneira, moldura, divisor, cartucho, selo, losangoDuplo
 *  BOTÂNICA     ramo, ramoDuplo, grinalda, folhaSolta
 *  CIÊNCIA      frasco, microscopio, serpenteTraco, estetoscopio, jaleco
 *  LOGO         logoHorizontal, logoEmpilhado, logoMonograma, logoSelo
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

export const CATALOGO = { cantoneira, moldura, divisor, cartucho, selo, losangoDuplo, ramo, ramoDuplo, grinalda, folhaSolta, frasco, microscopio, serpenteTraco, estetoscopio, jaleco, logoHorizontal, logoEmpilhado, logoMonograma, logoSelo, figuraInline };

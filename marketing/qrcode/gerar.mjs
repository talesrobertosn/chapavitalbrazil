/**
 * QR CODE DO SITE · Gravura Viva
 * ----------------------------------------------------------------------------
 * Abre a página inicial do site (site.url). Correção de erro alta (H), por isso
 * o medalhão no centro não atrapalha a leitura.
 *
 * Gera:
 *   public/qr-code.svg            vetor (site, impressão, Canva)
 *   public/qr-code.png            2048 × 2048 (download no site)
 *   marketing/qrcode/qr-feed.png  1080 × 1350 (post de feed)
 *   marketing/qrcode/qr-story.png 1080 × 1920 (story)
 *
 * Rodar na raiz: node marketing/qrcode/gerar.mjs
 * (sem playwright no projeto: PLAYWRIGHT_MODULE=/caminho/playwright/index.mjs)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import { COR, MEDAL, fio, pincelada, renderizar } from '../ferramentas/marca.mjs';
import { STORY, fundoEscuro, montar, montarStory, FEED, cantoneiras } from '../ferramentas/templates.mjs';
import { site } from '../../src/config/site.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(AQUI, '../../public');
const URL_SITE = `${site.url}/`;
const ENDERECO = site.url.replace(/^https?:\/\//, '');

/** SVG do QR: módulos em verde-noite sobre papel, medalhão no centro. */
function qrSvg({ tinta = COR.noite, fundo = COR.papel, margem = 4 } = {}) {
  const { modules } = QRCode.create(URL_SITE, { errorCorrectionLevel: 'H' });
  const n = modules.size;
  const t = n + margem * 2;
  // Área central livre para o medalhão (~22% do lado, dentro do limite da correção H)
  const livre = Math.round(n * 0.22) | 1;
  const ini = Math.floor((n - livre) / 2);
  const noCentro = (x, y) => x >= ini && x < ini + livre && y >= ini && y < ini + livre;
  let d = '';
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) if (modules.get(x, y) && !noCentro(x, y)) d += `M${x + margem} ${y + margem}h1v1h-1z`;
  const c = t / 2;
  const r = livre / 2;
  const [mx, my, mw, mh] = MEDAL.vb.split(' ').map(Number);
  const lado = r * 2 * 0.86;
  const esc = lado / Math.max(mw, mh);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${t}" shape-rendering="crispEdges">
  <title>QR Code: ${URL_SITE}</title>
  <rect width="${t}" height="${t}" fill="${fundo}"/>
  <path fill="${tinta}" d="${d}"/>
  <g shape-rendering="geometricPrecision">
    <circle cx="${c}" cy="${c}" r="${r}" fill="${tinta}"/>
    <circle cx="${c}" cy="${c}" r="${r - 0.35}" fill="none" stroke="${COR.ouro}" stroke-width="0.18"/>
    <g transform="translate(${c - (mw * esc) / 2} ${c - (mh * esc) / 2}) scale(${esc}) translate(${-mx} ${-my})"><path fill="${fundo}" fill-rule="evenodd" d="${MEDAL.d}"/></g>
  </g>
</svg>
`;
}

const svg = qrSvg();
fs.writeFileSync(path.join(PUBLIC, 'qr-code.svg'), svg);
const img = (w) => `<img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" width="${w}" height="${w}" style="display:block"/>`;
await renderizar({ html: img(2048), w: 2048, h: 2048, saida: path.join(PUBLIC, 'qr-code.png') });

/** Cartão de papel com o QR, cantoneiras e o endereço. */
const cartao = (w) => `
  <div style="position:relative;width:${w}px;padding:34px;background:${COR.papel};box-shadow:0 50px 100px -40px rgba(0,0,0,.7)">
    <div class="abs" style="inset:12px;border:1px solid rgba(122,92,48,.45)"></div>
    ${img(w - 68)}
  </div>`;

const texto = (top, feed) => `
  <div class="abs" style="left:0;right:0;top:${top}px;display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro}">Gestão Dr. Vital Brazil</div>
    <div class="pf" style="font-weight:800;font-size:${feed ? 92 : 104}px;line-height:.95;letter-spacing:-.02em;color:${COR.papel};margin-top:18px">APONTE A CÂMERA</div>
    <div style="margin-top:10px">${pincelada({ w: 420, h: 24 })}</div>
    <div class="cg" style="font-weight:600;font-size:${feed ? 44 : 50}px;line-height:1.15;color:${COR.ouroClaro};margin-top:22px">Programa, diretoria e como votar:<br/>tudo da chapa em um só lugar.</div>
  </div>`;

const endereco = (top) => `
  <div class="abs" style="left:0;right:0;top:${top}px;display:flex;flex-direction:column;align-items:center">
    ${fio({ w: 80 })}
    <div class="in" style="font-weight:600;font-size:34px;color:${COR.papel};margin-top:22px;letter-spacing:.02em">${ENDERECO}</div>
  </div>`;

await montar({
  pasta: AQUI,
  formato: FEED,
  prefixo: 'qr-feed',
  rodapeNosSlides: false,
  slides: [
    `${fundoEscuro({ semente: 41, textura: 'raios' })}
    ${cantoneiras({ inset: 44, base: 96, t: 90 })}
    ${texto(110, true)}
    <div class="abs" style="left:${(1080 - 560) / 2}px;top:500px">${cartao(560)}</div>
    ${endereco(1120)}`,
  ],
});
fs.renameSync(path.join(AQUI, 'qr-feed-01.png'), path.join(AQUI, 'qr-feed.png'));

await montarStory({
  pasta: AQUI,
  nome: 'qr-story',
  html: `${fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.5, semente: 43, textura: 'raios' })}
    ${texto(300, false)}
    <div class="abs" style="left:${(1080 - 680) / 2}px;top:760px">${cartao(680)}</div>
    ${endereco(1560)}`,
});
console.log('QR Code gerado para', URL_SITE);

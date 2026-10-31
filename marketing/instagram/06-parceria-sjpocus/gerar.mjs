// Post 06 · Nova parceria: Chapa Vital Brazil + SJPOCUS  (versão 2, do zero)
//
// Conceito: o holofote do "palco" vira o SETOR DO ULTRASSOM, o leque da tela do aparelho,
// com o granulado típico (speckle) desenhado em verde e creme. Ele atravessa o carrossel.
// Identidade das peças de marketing (docs/SOCIAL-MEDIA.md § 4): Anton (impacto) + DM Serif Display
// (ênfase em itálico) + Manrope (texto). Verde #0D3B2A / palco #05201A, dourado #C9A15A, off-white #F3EEE2.
// Logos originais, enormes, em círculo, com o nome embaixo e "+" entre elas.
//
// Rodar na raiz:  node marketing/instagram/06-parceria-sjpocus/gerar.mjs
// Gera slides.html (fonte editável) e carrossel-01..06.png (1080×1350).

import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE ?? 'playwright');

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../../..');
const FONTES = resolve(RAIZ, 'marketing/ferramentas/fontes-marketing');

// ─── Dados ───────────────────────────────────────────────────────────────────
const HANDLE_CHAPA = '@chapavitalbrazil';
const SITE_CHAPA = 'chapavitalbrazil.com.br';
const HANDLE_SJ = '@sjpocus';
const SITE_SJ = 'sjpocus.com.br';
const LOGO_SJ = pathToFileURL(resolve(AQUI, 'logo-sjpocus.png')).href; // logo oficial (troque por versão em alta quando chegar)
const TOTAL = 6;

const C = {
  palco: '#05201A', verde: '#0D3B2A', inst: '#0B3325', verde2: '#124A36',
  ouro: '#C9A15A', ouroClaro: '#E6D3A3', ouroTexto: '#6B5320',
  creme: '#F3EEE2', verdeCinza: '#BFCDBF', verdeMedio: '#3F5A4C',
};

// ─── Logo oficial da chapa: disco VERDE, retrato CREME (nunca invertido) ─────
const src = readFileSync(resolve(RAIZ, 'src/components/brand/logoPaths.ts'), 'utf8');
const M = /export const MEDAL = \{ viewBox: '([^']+)', d: '([^']+)' \}/.exec(src);
const [mx, my, mw, mh] = M[1].split(' ').map(Number);
const logoChapa = `<svg viewBox="${M[1]}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${mx + mw / 2}" cy="${my + mh / 2}" r="${Math.min(mw, mh) / 2 - 3}" fill="${C.verde}"/>
  <path d="${M[2]}" fill-rule="evenodd" fill="${C.creme}"/></svg>`;

// ─── Setor de ultrassom (leque com speckle) ──────────────────────────────────
// Ápice em (540, y0); abre ANG graus; raio R. Rendido em SVG com feTurbulence para o granulado.
const setor = ({ id = 's', R = 1500, ang = 64, y0 = -40, forca = 0.55, topo = 0.9 } = {}) => {
  const a = (ang / 2) * Math.PI / 180;
  const x1 = 540 - R * Math.sin(a), x2 = 540 + R * Math.sin(a), y = y0 + R * Math.cos(a);
  const d = `M540 ${y0} L${x1.toFixed(1)} ${y.toFixed(1)} A${R} ${R} 0 0 0 ${x2.toFixed(1)} ${y.toFixed(1)} Z`;
  return `<svg class="setor" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <clipPath id="${id}-clip"><path d="${d}"/></clipPath>
      <radialGradient id="${id}-luz" cx="540" cy="${y0}" r="${R}" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="${C.creme}" stop-opacity="${topo}"/>
        <stop offset=".35" stop-color="${C.creme}" stop-opacity="${(forca * 0.45).toFixed(2)}"/>
        <stop offset="1" stop-color="${C.creme}" stop-opacity="0"/>
      </radialGradient>
      <filter id="${id}-speckle" x="0" y="0" width="1" height="1">
        <feTurbulence type="fractalNoise" baseFrequency="0.9 0.55" numOctaves="2" seed="7" result="n"/>
        <feColorMatrix type="matrix" values="0 0 0 0 .95  0 0 0 0 .93  0 0 0 0 .88  0 0 0 ${forca} 0"/>
        <feComponentTransfer><feFuncA type="gamma" exponent="2.6" amplitude="1.4"/></feComponentTransfer>
      </filter>
    </defs>
    <g clip-path="url(#${id}-clip)">
      <rect width="1080" height="1350" fill="url(#${id}-luz)"/>
      <rect width="1080" height="1350" filter="url(#${id}-speckle)" opacity=".55"/>
      <path d="${d}" fill="none" stroke="${C.ouro}" stroke-opacity=".55" stroke-width="2"/>
    </g>
  </svg>`;
};

// Escala de profundidade (as marquinhas na lateral da tela do aparelho)
const escala = (cm = 12, altura = 760, topo = 240) => {
  const ticks = [];
  for (let i = 0; i <= cm; i++) {
    const y = topo + (i / cm) * altura;
    const grande = i % 2 === 0;
    ticks.push(`<i style="top:${y}px;width:${grande ? 22 : 12}px"></i>${grande ? `<b style="top:${y}px">${i}</b>` : ''}`);
  }
  return `<div class="escala">${ticks.join('')}</div>`;
};

// ─── Componentes ─────────────────────────────────────────────────────────────
const rotulo = (t) => `<div class="rotulo">${t}</div>`;
const rodape = (n) => `<div class="rodape"><span>${HANDLE_CHAPA}</span><span class="rc">CA Medicina FAPI</span><span>${String(n).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}</span></div>`;
const duo = (d) => `
  <div class="duo" style="--d:${d}px">
    <div class="marca"><div class="circulo">${logoChapa}</div><div class="nome">Chapa Vital Brazil</div></div>
    <div class="mais">+</div>
    <div class="marca"><div class="circulo circulo-sj"><img src="${LOGO_SJ}" alt="SJPOCUS"></div><div class="nome">SJPOCUS</div></div>
  </div>`;

// ─── Slides ──────────────────────────────────────────────────────────────────
const slides = [
  // 1 · Capa: o leque do ultrassom é o holofote do palco
  `<section class="slide">
    ${setor({ id: 'a', R: 1700, ang: 58, y0: -120, forca: .5, topo: .75 })}
    ${rotulo('Nova parceria · Curitiba')}
    <div class="miolo centro">
      <h1 class="anton" style="font-size:132px;line-height:.92;margin-top:10px">O NOVO<br>ESTETOSCÓPIO</h1>
      <p class="serif-it" style="font-size:72px;margin-top:-6px">chega <span class="ouro">à FAPI.</span></p>
      <div style="height:34px"></div>
      ${duo(330)}
    </div>
    ${rodape(1)}
  </section>`,

  // 2 · Quem é a SJPOCUS: a tela do aparelho vira moldura
  `<section class="slide">
    ${rotulo('Quem é a SJPOCUS')}
    <div class="miolo" style="gap:0">
      <div class="tela">
        ${setor({ id: 'b', R: 600, ang: 84, y0: -10, forca: .75, topo: .95 })}
        ${escala(10, 470, 50)}
        <div class="tela-ui topo-esq">SJPOCUS · CURITIBA</div>
        <div class="tela-ui topo-dir">POCUS</div>
        <div class="tela-ui base-esq">TORÁCICO · EMERGÊNCIA</div>
        <div class="tela-ui base-dir">ACADÊMICOS</div>
        <div class="tela-titulo"><span class="serif-it">point-of-care</span></div>
      </div>
      <h2 class="h2" style="margin-top:40px;font-size:78px">O ultrassom à beira do leito é o <em>novo estetoscópio.</em></h2>
      <p class="corpo" style="margin-top:22px;font-size:28px">Centro de treinamento em ultrassonografia point-of-care em Curitiba, com ênfase em ultrassom torácico e de emergência. Curso credenciado pela Pocus Certification Academy e extensão universitária com reconhecimento do MEC.</p>
    </div>
    ${rodape(2)}
  </section>`,

  // 3 · O que a parceria traz: lista como "achados" numerados, sem cards
  `<section class="slide">
    ${setor({ id: 'c', R: 1900, ang: 40, y0: 1350, forca: .35, topo: .5 })}
    ${rotulo('O que a parceria traz para você')}
    <div class="miolo" style="gap:0">
      <h2 class="anton" style="font-size:108px;line-height:.95">POCUS NA SUA<br><span class="ouro">FORMAÇÃO.</span></h2>
      <ol class="achados">
        <li><span class="n">1</span><div><b>Turma exclusiva FAPI</b><span>nos cursos da SJPOCUS em Curitiba</span></div></li>
        <li><span class="n">2</span><div><b>Aula introdutória</b><span>"POCUS para acadêmicos", aberta a todas as turmas</span></div></li>
        <li><span class="n">3</span><div><b>Workshop prático no FAPIC</b><span>ultrassom torácico e POCUS na emergência</span></div></li>
        <li><span class="n">4</span><div><b>"Qual é o achado?"</b><span>uma imagem de ultrassom por semana nos stories, comentada pela SJPOCUS</span></div></li>
      </ol>
    </div>
    ${rodape(3)}
  </section>`,

  // 4 · Condições especiais: o cupom como bilhete picotado
  `<section class="slide">
    ${setor({ id: 'd', R: 1700, ang: 50, y0: -200, forca: .4, topo: .6 })}
    ${rotulo('Condições especiais')}
    <div class="miolo centro" style="gap:0">
      <h2 class="anton" style="font-size:124px;line-height:.92">CUPOM<br>EXCLUSIVO</h2>
      <p class="serif-it" style="font-size:66px;margin-top:4px">para quem é <span class="ouro">FAPI.</span></p>
      <div class="bilhete">
        <div class="bilhete-esq">
          <small>SJPOCUS × CHAPA VITAL BRAZIL</small>
          <strong>Condições especiais nos cursos da SJPOCUS para estudantes de Medicina da FAPI.</strong>
          <small>Cupom rastreável · detalhes em breve</small>
        </div>
        <div class="bilhete-dir"><span>FAPI</span></div>
      </div>
      <p class="serif-it" style="font-size:40px;color:${C.ouroClaro};margin-top:36px">E isso é só o começo. <span style="color:${C.creme};font-style:normal;font-family:Manrope;font-weight:600;font-size:30px">Tem mais vindo pelo caminho.</span></p>
    </div>
    ${rodape(4)}
  </section>`,

  // 5 · Regras claras: os artigos como colunas de laudo
  `<section class="slide">
    ${rotulo('Parceria séria, com regras claras')}
    <div class="miolo" style="gap:0">
      <h2 class="h2">Transparência <em>por estatuto.</em></h2>
      <div class="artigos">
        <div><span class="anton art">ART. 10º</span><p><b>Receita oficial do CA.</b> Toda parceria entra na prestação de contas. <i>(inciso IV)</i></p></div>
        <div><span class="anton art">ART. 16º</span><p><b>Sem conflito de interesse.</b> Parceiros sem vínculo com os diretores.</p></div>
        <div><span class="anton art">ART. 30º</span><p><b>Balancete todo mês,</b> publicado em até 8 dias. <i>(inciso IV)</i></p></div>
      </div>
      <p class="nota">As ações ligadas ao CA passam a valer a partir da posse da gestão.</p>
    </div>
    ${rodape(5)}
  </section>`,

  // 6 · Fecho no palco: logos, links e chamada
  `<section class="slide">
    ${setor({ id: 'f', R: 1700, ang: 58, y0: -120, forca: .5, topo: .75 })}
    ${rotulo('Chapa Vital Brazil + SJPOCUS')}
    <div class="miolo centro" style="gap:0">
      ${duo(300)}
      <div class="links">
        <span>${SITE_CHAPA}</span>
        <span>${SITE_SJ}</span>
        <small>${HANDLE_CHAPA} · ${HANDLE_SJ}</small>
      </div>
      <p class="cta">Salva este post e manda para a sua turma.</p>
      <p class="serif-it" style="font-size:32px;color:${C.verdeCinza};margin-top:30px">Mais que uma gestão, um compromisso com a nossa formação.</p>
    </div>
    ${rodape(6)}
  </section>`,
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const f = (n) => pathToFileURL(resolve(FONTES, n)).href;
const css = `
@font-face{font-family:'DM Serif Display';src:url('${f('DMSerifDisplay-Regular.ttf')}');font-weight:400;font-style:normal}
@font-face{font-family:'DM Serif Display';src:url('${f('DMSerifDisplay-Italic.ttf')}');font-weight:400;font-style:italic}
${[400,500,600,700,800].map(w=>`@font-face{font-family:'Manrope';src:url('${f(`Manrope-${w}.ttf`)}');font-weight:${w}}`).join('\n')}
@font-face{font-family:'Anton';src:url('${f('Anton-Regular.ttf')}')}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#333;font-family:'Manrope',sans-serif;-webkit-font-smoothing:antialiased}

.slide{width:1080px;height:1350px;position:relative;overflow:hidden;padding:84px 84px 0;display:flex;flex-direction:column;color:${C.creme};
  background:radial-gradient(70% 45% at 50% 0%, ${C.verde2} 0%, ${C.verde} 40%, ${C.palco} 100%)}
.slide + .slide{margin-top:40px}
.slide::after{content:'';position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;opacity:.5;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.95' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .12 0'/></filter><rect width='220' height='220' filter='url(%23g)'/></svg>")}
.setor{position:absolute;inset:0;width:1080px;height:1350px;pointer-events:none}

.anton{font-family:'Anton',sans-serif;font-weight:400;letter-spacing:.01em;text-transform:uppercase}
.serif-it{font-family:'DM Serif Display',serif;font-style:italic;font-weight:400;line-height:1.05}
.ouro{color:${C.ouro}}
h2.h2{font-family:'DM Serif Display',serif;font-weight:400;font-size:84px;line-height:1.02;letter-spacing:-.01em}
h2.h2 em{font-style:italic;color:${C.ouro}}
.corpo{font-size:30px;line-height:1.45;font-weight:500;color:${C.verdeCinza};max-width:900px}

.rotulo{position:relative;z-index:2;font-weight:700;font-size:22px;letter-spacing:.3em;text-transform:uppercase;color:${C.ouroClaro};display:flex;align-items:center;gap:22px}
.rotulo::after{content:'';flex:1;height:1px;background:${C.ouro};opacity:.55}
.miolo{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:36px;gap:40px}
.centro{align-items:center;text-align:center}
.rodape{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:0 0 58px;font-size:19px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${C.ouroClaro};white-space:nowrap}
.rc{color:${C.verdeCinza}}

/* logos */
.duo{display:flex;align-items:flex-start;justify-content:center;gap:28px}
.marca{display:flex;flex-direction:column;align-items:center;gap:24px;width:calc(var(--d) + 70px)}
.circulo{width:var(--d);height:var(--d);border-radius:50%;background:${C.verde};border:7px solid ${C.ouro};overflow:hidden;display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 0 14px rgba(201,161,90,.12), 0 40px 80px rgba(0,0,0,.45)}
.circulo svg,.circulo img{width:100%;height:100%;display:block;object-fit:cover}
.circulo-sj{background:#fff}
.circulo-sj img{transform:scale(1.22)}
.nome{font-family:'DM Serif Display',serif;font-size:40px;line-height:1.1;white-space:nowrap}
.mais{font-family:'DM Serif Display',serif;font-size:140px;line-height:1;color:${C.ouro};margin-top:calc(var(--d)/2 - 72px)}

/* tela do aparelho (slide 2) */
.tela{position:relative;height:600px;margin:36px -84px 0;overflow:hidden;border-top:1px solid rgba(201,161,90,.35);border-bottom:1px solid rgba(201,161,90,.35);background:${C.palco}}
.tela .setor{top:0;height:1350px}
.tela-ui{position:absolute;font-size:19px;font-weight:700;letter-spacing:.26em;color:${C.ouroClaro};opacity:.9}
.topo-esq{top:28px;left:84px}.topo-dir{top:28px;right:84px}.base-esq{bottom:28px;left:84px}.base-dir{bottom:28px;right:84px}
.tela-titulo{position:absolute;left:0;right:0;top:46%;transform:translateY(-50%);text-align:center;font-size:140px;color:${C.creme};text-shadow:0 10px 40px rgba(0,0,0,.4)}
.escala{position:absolute;top:0;bottom:0;right:18px;width:60px}
.escala i{position:absolute;right:0;height:2px;background:${C.ouro};opacity:.8}
.escala b{position:absolute;right:30px;transform:translateY(-55%);font-size:16px;font-weight:700;color:${C.ouroClaro};letter-spacing:.1em}

/* achados (slide 3) */
.achados{list-style:none;margin-top:46px;display:flex;flex-direction:column}
.achados li{display:grid;grid-template-columns:120px 1fr;align-items:center;gap:20px;padding:26px 0;border-top:1px solid rgba(201,161,90,.4)}
.achados li:last-child{border-bottom:1px solid rgba(201,161,90,.4)}
.achados .n{font-family:'Anton';font-size:96px;line-height:.9;color:${C.ouro};text-align:left}
.achados b{display:block;font-family:'DM Serif Display',serif;font-weight:400;font-size:44px;line-height:1.05;color:${C.creme}}
.achados span:not(.n){display:block;font-size:25px;color:${C.verdeCinza};margin-top:8px;line-height:1.35;font-weight:500}

/* bilhete (slide 4) */
.bilhete{margin-top:44px;width:900px;display:grid;grid-template-columns:1fr 200px;color:${C.verde};
  -webkit-mask:radial-gradient(circle at 0 50%, transparent 26px, #000 27px), radial-gradient(circle at 100% 50%, transparent 26px, #000 27px);
  -webkit-mask-composite:source-in;mask-composite:intersect}
.bilhete-esq{background:${C.creme};padding:40px 44px;text-align:left;display:flex;flex-direction:column;gap:16px;border-right:3px dashed ${C.verde}}
.bilhete-esq small{font-size:17px;font-weight:800;letter-spacing:.26em;text-transform:uppercase;color:${C.ouroTexto}}
.bilhete-esq strong{font-family:'DM Serif Display',serif;font-weight:400;font-size:38px;line-height:1.12}
.bilhete-dir{background:${C.ouro};display:flex;align-items:center;justify-content:center}
.bilhete-dir span{font-family:'Anton';font-size:64px;color:${C.verde};writing-mode:vertical-rl;transform:rotate(180deg);letter-spacing:.2em}

/* artigos (slide 5) */
.artigos{margin-top:48px;display:flex;flex-direction:column}
.artigos > div{display:grid;grid-template-columns:330px 1fr;gap:30px;align-items:center;padding:36px 0;border-top:1px solid rgba(201,161,90,.4)}
.artigos > div:last-child{border-bottom:1px solid rgba(201,161,90,.4)}
.art{font-size:76px;line-height:.9;color:${C.ouro}}
.artigos p{font-size:30px;line-height:1.4;color:${C.verdeCinza};font-weight:500}
.artigos b{color:${C.creme};font-weight:800}
.artigos i{color:${C.ouroClaro};font-style:normal;font-size:22px;letter-spacing:.08em}
.nota{margin-top:40px;font-family:'DM Serif Display',serif;font-style:italic;font-size:32px;color:${C.ouroClaro}}

/* fecho */
.links{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:40px}
.links span{font-weight:800;font-size:48px;letter-spacing:-.01em;color:${C.creme}}
.links small{font-size:25px;font-weight:600;letter-spacing:.06em;color:${C.ouroClaro};margin-top:10px}
.cta{margin-top:40px;font-size:32px;font-weight:700;color:${C.verde};background:${C.ouroClaro};padding:22px 44px;border-radius:999px}
`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Post 06 · Chapa Vital Brazil + SJPOCUS</title><style>${css}</style></head><body>${slides.join('\n')}</body></html>`;
writeFileSync(resolve(AQUI, 'slides.html'), html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(resolve(AQUI, 'slides.html')).href);
await page.evaluate(() => document.fonts.ready);
const els = await page.$$('.slide');
for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: resolve(AQUI, `carrossel-${String(i + 1).padStart(2, '0')}.png`) });
await browser.close();
console.log(`✓ ${els.length} slides`);

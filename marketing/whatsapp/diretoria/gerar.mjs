/**
 * PÔSTER DA DIRETORIA · WhatsApp (4:5, como um post de feed)
 * ----------------------------------------------------------------------------
 * Feito para circular como FOTO no WhatsApp, não como documento.
 * O WhatsApp reduz toda foto para no máximo 1600 px no lado maior (qualidade padrão)
 * e recomprime o JPEG. Por isso exportamos:
 *   • diretoria-vital-brazil-whatsapp.jpg  1280 × 1600  (exatamente o limite: o app não redimensiona)
 *   • diretoria-vital-brazil-hd.jpg        1600 × 2000  (para envio em "HD")
 *   • diretoria-vital-brazil.png           2000 × 2500  (original sem perda)
 *
 * Composição: cabeçalho com o retrato em arco + título; núcleo (Presidência, Vice,
 * Secretaria); 10 diretorias em fileiras de 4, 3 e 3 ligadas por fios de ouro; fecho com o @.
 *
 * Rodar na raiz: node marketing/whatsapp/diretoria/gerar.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, fio, folha, grao, imagem, losango, medalhao, pincelada, poeira, renderizar } from '../../ferramentas/marca.mjs';
import { serpenteLogo } from '../../ferramentas/assets.mjs';
import { CARGOS, MEMBROS } from '../../../src/data/diretoria.ts';
import { site } from '../../../src/config/site.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../..');
const W = 2000;
const H = 2500;
const M = 70; // margem interna

const foto = (slug) => {
  const f = path.join(RAIZ, 'src/assets/diretoria', `${slug}.jpg`);
  return fs.existsSync(f) ? `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}` : null;
};
const iniciais = (nome) => nome.split(' ').filter((p) => p.length > 2)[0]?.[0] + nome.split(' ').at(-1)[0];
const RETRATO = imagem('portrait-snake.jpg');
const doCargo = (id) => MEMBROS.filter((m) => m.cargo.id === id);
const cargo = (id) => CARGOS.find((c) => c.id === id);

/* ------------------------------------------------------------------ peças */

function retrato(m, t) {
  const f = foto(m.slug);
  const dentro = f
    ? `<img src="${f}" style="width:100%;height:100%;object-fit:cover;display:block"/>`
    : `<div class="pf" style="width:100%;height:100%;display:grid;place-items:center;font-weight:600;font-size:${t * 0.34}px;color:${COR.papel}">${iniciais(m.nome)}</div>`;
  return `<div style="position:relative;width:${t}px;height:${t}px;flex:none">
    <div class="abs" style="inset:-${t * 0.18}px;border-radius:50%;background:radial-gradient(circle,rgba(205,177,134,.22),rgba(205,177,134,0) 62%)"></div>
    <div class="abs" style="inset:-${t * 0.085}px;border-radius:50%;border:1px solid rgba(176,141,87,.35)"></div>
    <div class="abs" style="inset:-${t * 0.04}px;border-radius:50%;border:${Math.max(3, t * 0.018)}px solid ${COR.ouro}"></div>
    <div style="position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 38%,${COR.verde2},${COR.verde} 60%,${COR.noite});box-shadow:0 ${t * 0.1}px ${t * 0.24}px -${t * 0.07}px rgba(0,0,0,.75)">${dentro}</div>
  </div>`;
}

/** Pessoa: retrato + nome (até 2 linhas) + turma. Tamanhos pensados para leitura no celular. */
function pessoa(m, t, nomePx, largura) {
  return `<div style="display:flex;flex-direction:column;align-items:center;width:${largura}px;flex:none">
    ${retrato(m, t)}
    <div class="pf" style="font-weight:700;font-size:${nomePx}px;line-height:1.08;color:${COR.papel};text-align:center;margin-top:${t * 0.14}px;text-wrap:balance">${m.nome}</div>
    <div class="in" style="font-weight:700;font-size:${nomePx * 0.6}px;letter-spacing:.2em;text-transform:uppercase;color:${COR.ouroClaro};margin-top:${nomePx * 0.32}px">Turma ${m.turma}</div>
  </div>`;
}

const faixa = (titulo, px) => `<div class="abs" style="left:50%;top:0;transform:translate(-50%,-50%);background:${COR.noite};padding:6px 18px;display:flex;align-items:center;gap:12px;white-space:nowrap">
  ${losango(9)}<span class="eyebrow" style="font-size:${px}px;color:${COR.ouroClaro};letter-spacing:.16em">${titulo}</span>${losango(9)}</div>`;

function quadro(c, largura, t, nomePx) {
  const ms = doCargo(c.id);
  const gap = 18;
  const padX = 18;
  const lp = (largura - padX * 2 - gap * (ms.length - 1)) / ms.length;
  const canto = (pos) => `<div class="abs" style="${pos};width:11px;height:11px;background:${COR.ouro};transform:translate(-50%,-50%) rotate(45deg)"></div>`;
  return `<div style="position:relative;width:${largura}px;flex:none;border:1.5px solid rgba(176,141,87,.55);background:linear-gradient(180deg,rgba(40,74,60,.6),rgba(18,36,28,.3));padding:${t * 0.3}px ${padX}px ${t * 0.17}px;box-shadow:inset 0 0 80px rgba(0,0,0,.25)">
    <div class="abs" style="inset:7px;border:1px solid rgba(176,141,87,.16)"></div>
    ${canto('left:0;top:0')}${canto('left:100%;top:0')}${canto('left:0;top:100%')}${canto('left:100%;top:100%')}
    ${faixa(c.titulo, 17)}
    <div style="display:flex;justify-content:center;gap:${gap}px">${ms.map((m) => pessoa(m, t, nomePx, lp)).join('')}</div>
  </div>`;
}

/* ---------------------------------------------------------------- layout */

const presidencia = doCargo('presidencia')[0];
const vice = doCargo('vice-presidencia')[0];
const LINHAS = [
  ['cientifica', 'ensino-pesquisa', 'patrimonio', 'marketing'],
  ['produtos', 'comunicacao', 'extensao'],
  ['relacoes-publicas', 'juridica', 'financeira'],
].map((l) => l.map(cargo));
// confere: todas as 10 frentes estão no pôster
const usados = new Set(['presidencia', 'vice-presidencia', 'secretaria', ...LINHAS.flat().map((c) => c.id)]);
const faltando = CARGOS.filter((c) => !usados.has(c.id));
if (faltando.length) throw new Error(`Cargos fora do pôster: ${faltando.map((c) => c.id).join(', ')}`);

const LARG_UTIL = W - M * 2 - 40;
const GUT = 26;
const largura = (n) => (LARG_UTIL - GUT * (n - 1)) / n;
const T = 150;
const NOME = 29;

/** Fio de ouro ligando o centro às colunas da próxima fileira. */
const conector = (altura, n) => {
  const xs = Array.from({ length: n }, (_, k) => LARG_UTIL / 2 + (k - (n - 1) / 2) * (largura(n) + GUT));
  return `<svg width="${LARG_UTIL}" height="${altura}" style="display:block;margin:0 auto" viewBox="0 0 ${LARG_UTIL} ${altura}">
    <line x1="${LARG_UTIL / 2}" y1="0" x2="${LARG_UTIL / 2}" y2="${altura / 2}" stroke="${COR.ouro}" stroke-width="2.4"/>
    <line x1="${xs[0]}" y1="${altura / 2}" x2="${xs.at(-1)}" y2="${altura / 2}" stroke="${COR.ouro}" stroke-width="2.4"/>
    ${xs.map((x) => `<line x1="${x}" y1="${altura / 2}" x2="${x}" y2="${altura}" stroke="${COR.ouro}" stroke-width="2.4"/><rect x="${x - 7}" y="${altura / 2 - 7}" width="14" height="14" transform="rotate(45 ${x} ${altura / 2})" fill="${COR.ouro}"/>`).join('')}
  </svg>`;
};

const html = `
<div style="position:relative;width:${W}px;height:${H}px;overflow:hidden;display:flex;flex-direction:column;background:
  radial-gradient(1300px 700px at 62% 300px, rgba(40,74,60,1), rgba(40,74,60,0)),
  radial-gradient(1200px 900px at 50% 1700px, rgba(40,74,60,.45), rgba(40,74,60,0)),
  linear-gradient(180deg, ${COR.noite} 0%, ${COR.noite2} 100%)">

  <!-- luz, folhagem (bordas dissolvidas), serpente do logo em marca d'água -->
  <div class="abs" style="left:34%;top:-420px;width:30%;height:1700px;transform:rotate(16deg);background:linear-gradient(180deg,rgba(205,177,134,.15),rgba(205,177,134,.03) 55%,transparent 80%);filter:blur(50px);mix-blend-mode:screen"></div>
  <div class="abs" style="left:50%;top:1150px;transform:translateX(-50%)">${serpenteLogo({ cor: COR.ouro, w: 1700, op: 0.04 })}</div>
  <div class="abs" style="right:-200px;top:-180px">${folha({ w: 640, op: 0.14, flip: true })}</div>
  <div class="abs" style="left:-220px;bottom:-200px">${folha({ w: 640, op: 0.14 })}</div>
  ${poeira({ w: W, h: H, n: 380, semente: 31, op: 0.8 })}

  <!-- moldura dupla com losangos -->
  <div class="abs" style="inset:30px;border:2px solid rgba(176,141,87,.6)"></div>
  <div class="abs" style="inset:42px;border:1px solid rgba(176,141,87,.22)"></div>
  ${['left:30px;top:30px', 'right:30px;top:30px', 'left:30px;bottom:30px', 'right:30px;bottom:30px'].map((p) => `<div class="abs" style="${p};width:18px;height:18px;background:${COR.noite};transform:translate(${p.includes('left') ? '-50%' : '50%'},${p.includes('top') ? '-50%' : '50%'}) rotate(45deg);border:2px solid ${COR.ouro}"></div>`).join('')}

  <!-- CABEÇALHO -->
  <div style="position:relative;display:flex;align-items:center;gap:70px;padding:86px ${M + 50}px 0 ${M + 70}px">
    <div style="position:relative;width:330px;height:410px;flex:none">
      <div class="abs" style="inset:-30px;border-radius:195px 195px 0 0;border:1.5px solid rgba(176,141,87,.32)"></div>
      <div class="abs" style="inset:-14px;border-radius:179px 179px 0 0;border:3px solid rgba(176,141,87,.9)"></div>
      <div class="abs" style="inset:0;border-radius:165px 165px 0 0;overflow:hidden;box-shadow:0 70px 120px -40px rgba(0,0,0,.85)">
        <img src="${RETRATO}" style="width:100%;height:100%;object-fit:cover;object-position:60% 8%;transform:scale(1.04);transform-origin:60% 20%"/>
        <div class="abs" style="inset:0;background:linear-gradient(0deg,${COR.noite} 0%,rgba(18,36,28,.55) 12%,rgba(18,36,28,0) 34%)"></div>
      </div>
      <div class="abs" style="left:50%;bottom:-62px;transform:translateX(-50%);width:124px;height:124px">
        <div class="abs" style="inset:-9px;border-radius:50%;border:3px solid ${COR.ouro};background:${COR.noite}"></div>
        <div class="abs" style="inset:0">${medalhao({ cor: COR.verde, fundo: COR.papel, w: 124 })}</div>
      </div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;align-items:flex-start">
      <div style="display:flex;align-items:center;gap:18px;color:${COR.ouroClaro}">${losango(10)}<span class="eyebrow" style="font-size:24px;letter-spacing:.3em">Chapa ao CA de Medicina · FAPI</span></div>
      <div class="eyebrow" style="font-size:28px;color:${COR.ouroClaro};margin-top:30px;letter-spacing:.44em">Gestão</div>
      <div class="pf" style="font-weight:800;font-size:128px;line-height:.92;letter-spacing:-.025em;color:${COR.papel};margin-top:8px;text-shadow:0 22px 60px rgba(0,0,0,.6)">DR. VITAL BRAZIL</div>
      <div style="margin-top:4px">${pincelada({ w: 760, h: 32 })}</div>
      <div class="cg" style="font-weight:600;font-size:46px;line-height:1.1;color:${COR.ouroClaro};margin-top:20px">Mais que uma gestão, <span style="color:${COR.papel}">um compromisso com a nossa formação.</span></div>
      <div style="display:flex;align-items:center;gap:22px;margin-top:30px">
        <div class="pf" style="font-weight:800;font-size:46px;color:${COR.papel};text-transform:uppercase;letter-spacing:.06em">Conheça a diretoria</div>
        <span style="width:100px;height:2px;background:linear-gradient(90deg,${COR.ouro},transparent)"></span>
      </div>
      <div class="in" style="font-size:25px;color:${COR.salvia};margin-top:10px;letter-spacing:.04em">${MEMBROS.length} estudantes · ${CARGOS.length} frentes · do 1º ao último período. <span style="color:${COR.papel}">Uma só chapa.</span></div>
    </div>
  </div>

  <!-- NÚCLEO -->
  <div style="position:relative;margin-top:96px;display:flex;justify-content:center;align-items:flex-start;gap:50px">
    <div class="abs" style="left:50%;top:50%;transform:translate(-50%,-50%);width:1700px;height:560px;border-radius:50%;background:radial-gradient(ellipse,rgba(205,177,134,.13),rgba(205,177,134,0) 65%)"></div>
    ${[['Presidência', presidencia], ['Vice-Presidência', vice]].map(([t, m]) => `
    <div style="position:relative;display:flex;flex-direction:column;align-items:center;width:380px">
      <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};letter-spacing:.26em;margin-bottom:28px;display:flex;align-items:center;gap:14px">${losango(10)} ${t} ${losango(10)}</div>
      ${retrato(m, 200)}
      <div class="pf" style="font-weight:700;font-size:36px;line-height:1.08;color:${COR.papel};text-align:center;margin-top:30px;text-wrap:balance">${m.nome}</div>
      <div class="in" style="font-weight:700;font-size:21px;letter-spacing:.24em;text-transform:uppercase;color:${COR.ouroClaro};margin-top:10px">Turma ${m.turma}</div>
    </div>`).join('')}
    <div style="position:relative;width:1.5px;align-self:stretch;background:linear-gradient(180deg,transparent,${COR.ouro},transparent);opacity:.6"></div>
    <div style="position:relative;padding-top:14px">${quadro(cargo('secretaria'), 760, 170, 31)}</div>
  </div>

  <!-- DIRETORIAS -->
  <div style="position:relative;margin-top:10px">${conector(70, 4)}</div>
  <div style="position:relative;display:flex;flex-direction:column;align-items:center">
    ${LINHAS.map((l, i) => `
      ${i > 0 ? conector(56, l.length) : ''}
      <div style="display:flex;gap:${GUT}px;align-items:stretch;justify-content:center">${l.map((c) => quadro(c, largura(l.length), T, NOME)).join('')}</div>`).join('')}
  </div>

  <!-- FECHO -->
  <div style="position:relative;margin-top:auto;padding:0 0 70px;display:flex;flex-direction:column;align-items:center;text-align:center">
    ${fio({ w: 110, losango: 12 })}
    <div class="cg" style="font-weight:600;font-size:42px;line-height:1.08;color:${COR.papel};margin-top:16px">Ciência, coragem e serviço. <span style="color:${COR.ouroClaro}">Por isso o nome.</span></div>
    <div class="in" style="font-weight:700;font-size:38px;color:${COR.papel};margin-top:12px">${site.instagram.handle}</div>
  </div>
  ${grao(0.07)}
</div>`;

const saida = path.join(AQUI, 'diretoria-vital-brazil.png');
await renderizar({ html, w: W, h: H, saida });
// Versões para o WhatsApp (Python + Pillow): reamostragem LANCZOS e JPEG de alta qualidade, sRGB, sem subamostragem de cor
const { execFileSync } = await import('node:child_process');
execFileSync('python3', ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(saida)}).convert('RGB')
for w, h, nome in [(1280, 1600, 'whatsapp'), (1600, 2000, 'hd')]:
    im.resize((w, h), Image.LANCZOS).save(${JSON.stringify(path.join(AQUI, 'diretoria-vital-brazil-'))} + nome + '.jpg', quality=92, subsampling=0, optimize=True, progressive=True)
`]);
console.log('Pôster gerado em', saida);

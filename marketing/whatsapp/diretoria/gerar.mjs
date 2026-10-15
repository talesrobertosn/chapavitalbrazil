/**
 * PÔSTER DA DIRETORIA · para WhatsApp (PNG retrato, grande)
 * ----------------------------------------------------------------------------
 * Prancha de museu em três atos:
 *   I.   Abertura: retrato em arco, serpente, "DR. VITAL BRAZIL" em folha de ouro.
 *   II.  Núcleo: Presidência e Vice em medalhões grandes sobre pedestal de ouro.
 *   III. A árvore: tronco central que se ramifica em losangos até cada diretoria.
 * Fecha com "Ciência, coragem e serviço. Por isso o nome." e o @ do Instagram.
 * (Sem o endereço do site, que ainda é provisório.)
 *
 * Rodar na raiz: node marketing/whatsapp/diretoria/gerar.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, FIGURE, figura, fio, folha, grao, imagem, losango, medalhao, pincelada, poeira, renderizar } from '../../ferramentas/marca.mjs';
import { CARGOS, MEMBROS } from '../../../src/data/diretoria.ts';
import { site } from '../../../src/config/site.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../..');
const W = 3000;

const foto = (slug) => {
  const f = path.join(RAIZ, 'src/assets/diretoria', `${slug}.jpg`);
  return fs.existsSync(f) ? `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}` : null;
};
const iniciais = (nome) => nome.split(' ').filter((p) => p.length > 2)[0]?.[0] + nome.split(' ').at(-1)[0];
const RETRATO = imagem('portrait-snake.jpg');

/* ------------------------------------------------------------------ peças */

/** Retrato circular com anel duplo de ouro e sombra profunda. */
function retrato(m, t, { luz = true } = {}) {
  const f = foto(m.slug);
  const dentro = f
    ? `<img src="${f}" style="width:100%;height:100%;object-fit:cover;display:block"/>`
    : `<div class="pf" style="width:100%;height:100%;display:grid;place-items:center;font-weight:600;font-size:${t * 0.34}px;color:${COR.papel}">${iniciais(m.nome)}</div>`;
  return `<div style="position:relative;width:${t}px;height:${t}px;flex:none">
    ${luz ? `<div class="abs" style="inset:-${t * 0.22}px;border-radius:50%;background:radial-gradient(circle,rgba(205,177,134,.22),rgba(205,177,134,0) 62%)"></div>` : ''}
    <div class="abs" style="inset:-${t * 0.1}px;border-radius:50%;border:1.5px solid rgba(176,141,87,.3)"></div>
    <div class="abs" style="inset:-${t * 0.05}px;border-radius:50%;border:${Math.max(2.5, t * 0.014)}px solid ${COR.ouro}"></div>
    <div style="position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 38%,${COR.verde2},${COR.verde} 60%,${COR.noite});box-shadow:0 ${t * 0.12}px ${t * 0.3}px -${t * 0.08}px rgba(0,0,0,.75)">${dentro}</div>
  </div>`;
}

/** Pessoa: retrato + nome + turma. */
function pessoa(m, t, nomePx, largura) {
  return `<div style="display:flex;flex-direction:column;align-items:center;width:${largura}px;flex:none">
    ${retrato(m, t)}
    <div class="pf" style="font-weight:700;font-size:${nomePx}px;line-height:1.12;color:${COR.papel};text-align:center;margin-top:${t * 0.14}px;text-wrap:balance">${m.nome}</div>
    <div class="in" style="font-weight:600;font-size:${nomePx * 0.55}px;letter-spacing:.24em;text-transform:uppercase;color:${COR.ouroClaro};margin-top:${nomePx * 0.42}px">Turma ${m.turma}</div>
  </div>`;
}

/** Faixa-título de um quadro: fio ◆ TÍTULO ◆ fio, sobre o fundo. */
const faixa = (titulo, px) => `<div class="abs" style="left:50%;top:0;transform:translate(-50%,-50%);background:${COR.noite};padding:12px 30px;display:flex;align-items:center;gap:18px;white-space:nowrap">
  <span style="width:36px;height:2px;background:${COR.ouro};opacity:.8"></span>${losango(11)}
  <span class="eyebrow" style="font-size:${px}px;color:${COR.ouroClaro};letter-spacing:.26em">${titulo}</span>
  ${losango(11)}<span style="width:36px;height:2px;background:${COR.ouro};opacity:.8"></span></div>`;

/** Quadro de diretoria com moldura dupla e cantos em losango. */
function quadro(cargo, largura, t, nomePx) {
  const membros = MEMBROS.filter((m) => m.cargo.id === cargo.id);
  const larguraPessoa = Math.min(largura - 100, (largura - 100) / membros.length);
  const canto = (pos) => `<div class="abs" style="${pos};width:12px;height:12px;background:${COR.ouro};transform:translate(-50%,-50%) rotate(45deg)"></div>`;
  return `<div style="position:relative;width:${largura}px;flex:none;border:1.5px solid rgba(176,141,87,.5);background:linear-gradient(180deg,rgba(40,74,60,.55),rgba(18,36,28,.25));padding:${t * 0.34}px 50px ${t * 0.26}px;box-shadow:inset 0 0 120px rgba(0,0,0,.25)">
    <div class="abs" style="inset:10px;border:1px solid rgba(176,141,87,.16)"></div>
    ${canto('left:0;top:0')}${canto('left:100%;top:0')}${canto('left:0;top:100%')}${canto('left:100%;top:100%')}
    ${faixa(cargo.titulo, nomePx * 0.62)}
    <div style="display:flex;justify-content:center;gap:50px;margin-top:${t * 0.08}px">
      ${membros.map((m) => pessoa(m, t, nomePx, larguraPessoa)).join('')}
    </div>
  </div>`;
}

/* ------------------------------------------------------------ dados/layout */

const porId = (id) => CARGOS.find((c) => c.id === id);
const presidencia = MEMBROS.find((m) => m.cargo.id === 'presidencia');
const vice = MEMBROS.find((m) => m.cargo.id === 'vice-presidencia');
const secretaria = porId('secretaria');
const frentes = CARGOS.filter((c) => !['presidencia', 'vice-presidencia', 'secretaria'].includes(c.id));

const MARGEM = 110;
const GUT = 48;
const COLS = 3;
const LARG_QUADRO = (W - MARGEM * 2 - GUT * (COLS - 1)) / COLS;
const T_FRENTE = 280;
const NOME_FRENTE = 34;
const linhas = [];
for (const n of [3, 3, 2, 2]) linhas.push(frentes.splice(0, n));

/** Conector em T com losangos. */
const conector = (altura, largura, pontos, dir = 'baixo') => `
  <svg width="${largura}" height="${altura}" style="display:block;margin:0 auto" viewBox="0 0 ${largura} ${altura}">
    <defs><linearGradient id="g${altura}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${COR.ouro}" stop-opacity=".5"/><stop offset="1" stop-color="${COR.ouroClaro}"/></linearGradient></defs>
    <line x1="${largura / 2}" y1="0" x2="${largura / 2}" y2="${altura / 2}" stroke="url(#g${altura})" stroke-width="3"/>
    ${pontos.length > 1 ? `<line x1="${pontos[0]}" y1="${altura / 2}" x2="${pontos.at(-1)}" y2="${altura / 2}" stroke="${COR.ouro}" stroke-width="3" opacity=".9"/>` : ''}
    ${pontos.map((x) => `<line x1="${x}" y1="${altura / 2}" x2="${x}" y2="${altura}" stroke="${COR.ouro}" stroke-width="3" opacity=".9"/><rect x="${x - 9}" y="${altura / 2 - 9}" width="18" height="18" transform="rotate(45 ${x} ${altura / 2})" fill="${COR.ouro}"/>`).join('')}
    ${dir === 'baixo' ? pontos.map((x) => `<rect x="${x - 7}" y="${altura - 7}" width="14" height="14" transform="rotate(45 ${x} ${altura})" fill="${COR.ouroClaro}"/>`).join('') : ''}
  </svg>`;
const conectorReto = (altura) => `<div style="position:relative;width:3px;height:${altura}px;background:linear-gradient(180deg,${COR.ouro},${COR.ouroClaro});margin:0 auto"><div class="abs" style="left:50%;top:50%;width:16px;height:16px;background:${COR.ouro};transform:translate(-50%,-50%) rotate(45deg)"></div></div>`;

/* ------------------------------------------------------------------- HTML */

const html = `
<div style="position:relative;width:${W}px;background:
  radial-gradient(1500px 1100px at 50% 700px, rgba(40,74,60,1), rgba(40,74,60,0)),
  radial-gradient(1500px 1300px at 50% 3000px, rgba(40,74,60,.5), rgba(40,74,60,0)),
  linear-gradient(180deg, ${COR.noite} 0%, ${COR.noite2} 100%);padding:0 0 120px;overflow:hidden">

  <!-- Feixes de luz -->
  <div class="abs" style="left:28%;top:-400px;width:34%;height:3200px;transform:rotate(14deg);background:linear-gradient(180deg,rgba(205,177,134,.16),rgba(205,177,134,.03) 55%,transparent 80%);filter:blur(60px);mix-blend-mode:screen"></div>
  <div class="abs" style="left:56%;top:-400px;width:20%;height:3000px;transform:rotate(22deg);background:linear-gradient(180deg,rgba(244,240,230,.12),rgba(205,177,134,.02) 50%,transparent 80%);filter:blur(50px);mix-blend-mode:screen"></div>

  <!-- Gravura monumental e folhagem -->
  <div class="abs" style="left:50%;top:2300px;transform:translateX(-50%);opacity:.04">${figura({ cor: COR.ouro, w: 2300 })}</div>
  <div class="abs" style="left:-320px;top:-280px">${folha({ w: 980, op: 0.2 })}</div>
  <div class="abs" style="right:-380px;top:900px">${folha({ w: 1000, op: 0.14, flip: true })}</div>
  <div class="abs" style="left:-420px;top:2800px">${folha({ w: 880, op: 0.12 })}</div>
  <div class="abs" style="right:-360px;bottom:-360px">${folha({ w: 980, op: 0.18, flip: true })}</div>
  ${poeira({ w: W, h: 5400, n: 760, semente: 23, op: 0.85 })}

  <!-- Moldura dupla com losangos nos cantos -->
  <div class="abs" style="inset:46px;border:2px solid rgba(176,141,87,.6)"></div>
  <div class="abs" style="inset:62px;border:1px solid rgba(176,141,87,.22)"></div>
  ${['left:46px;top:46px', 'right:46px;top:46px', 'left:46px;bottom:46px', 'right:46px;bottom:46px'].map((p) => `<div class="abs" style="${p};width:22px;height:22px;background:${COR.noite};transform:translate(${p.includes('left') ? '-50%' : '50%'},${p.includes('top') ? '-50%' : '50%'}) rotate(45deg);border:2px solid ${COR.ouro}"></div>`).join('')}

  <!-- ATO I · Abertura -->
  <div style="position:relative;padding-top:140px;display:flex;flex-direction:column;align-items:center;text-align:center">
    <div style="display:flex;align-items:center;gap:30px;color:${COR.ouroClaro}">${fio({ w: 150, losango: 14 })}</div>
    <div class="eyebrow" style="font-size:32px;color:${COR.ouroClaro};margin-top:36px;letter-spacing:.34em">Chapa ao Centro Acadêmico de Medicina · FAPI</div>

    <!-- Retrato em arco com a serpente do medalhão -->
    <div style="position:relative;width:600px;height:720px;margin-top:56px">
      <div class="abs" style="inset:-44px;border-radius:344px 344px 0 0;border:1.5px solid rgba(176,141,87,.3)"></div>
      <div class="abs" style="inset:-20px;border-radius:320px 320px 0 0;border:3px solid rgba(176,141,87,.9)"></div>
      <div class="abs" style="inset:0;border-radius:300px 300px 0 0;overflow:hidden;box-shadow:0 120px 200px -60px rgba(0,0,0,.85)">
        <img src="${RETRATO}" style="width:100%;height:100%;object-fit:cover;object-position:62% 12%"/>
        <div class="abs" style="inset:0;background:linear-gradient(0deg,${COR.noite} 0%,rgba(18,36,28,.78) 16%,rgba(18,36,28,0) 44%)"></div>
      </div>
      <!-- Medalhão sobreposto na base do arco -->
      <div class="abs" style="left:50%;bottom:-130px;transform:translateX(-50%);width:260px;height:260px">
        <div class="abs" style="inset:-30px;border-radius:50%;background:radial-gradient(circle,rgba(205,177,134,.4),rgba(205,177,134,0) 65%)"></div>
        <div class="abs" style="inset:-14px;border-radius:50%;border:3px solid ${COR.ouro};background:${COR.noite}"></div>
        <div class="abs" style="inset:0;border-radius:50%;background:${COR.papel}"></div>
        <div class="abs" style="inset:0;display:grid;place-items:center">${medalhao({ cor: COR.verde, w: 260 })}</div>
      </div>
    </div>

    <div class="eyebrow" style="font-size:36px;color:${COR.ouroClaro};margin-top:170px;letter-spacing:.44em">Gestão</div>
    <div class="pf" style="position:relative;font-weight:800;font-size:176px;line-height:.92;letter-spacing:-.025em;color:${COR.papel};margin-top:18px;text-shadow:0 30px 80px rgba(0,0,0,.6)">DR. VITAL BRAZIL</div>
    <div style="margin-top:10px">${pincelada({ w: 1120, h: 46 })}</div>
    <div class="cg" style="font-weight:600;font-size:72px;line-height:1.1;color:${COR.ouroClaro};margin-top:44px">Mais que uma gestão,<br/><span style="color:${COR.papel}">um compromisso com a nossa formação.</span></div>

    <div style="display:flex;align-items:center;gap:40px;margin-top:80px">
      <span style="width:200px;height:2px;background:linear-gradient(90deg,transparent,${COR.ouro})"></span>
      <div class="pf" style="font-weight:800;font-size:80px;color:${COR.papel};text-transform:uppercase;letter-spacing:.06em">Conheça a diretoria</div>
      <span style="width:200px;height:2px;background:linear-gradient(90deg,${COR.ouro},transparent)"></span>
    </div>
    <div class="in" style="font-size:38px;color:${COR.salvia};margin-top:26px;letter-spacing:.06em">${MEMBROS.length} estudantes · ${CARGOS.length} frentes · do 1º ao último período. <span style="color:${COR.papel}">Uma só chapa.</span></div>
  </div>

  <!-- ATO II · Núcleo: Presidência · Vice · Secretaria -->
  <div style="position:relative;margin-top:90px">
    <div class="abs" style="left:50%;top:50%;transform:translate(-50%,-50%);width:2200px;height:900px;border-radius:50%;background:radial-gradient(ellipse,rgba(205,177,134,.14),rgba(205,177,134,0) 65%)"></div>
    <div style="position:relative;display:flex;justify-content:center;align-items:flex-start;gap:110px">
      ${[['Presidência', presidencia], ['Vice-Presidência', vice]].map(([t, m]) => `
      <div style="display:flex;flex-direction:column;align-items:center;width:560px">
        <div class="eyebrow" style="font-size:30px;color:${COR.ouroClaro};letter-spacing:.32em;margin-bottom:50px;display:flex;align-items:center;gap:20px">${losango(13)} ${t} ${losango(13)}</div>
        ${retrato(m, 400)}
        <div class="pf" style="font-weight:700;font-size:52px;line-height:1.1;color:${COR.papel};text-align:center;margin-top:62px;text-wrap:balance">${m.nome}</div>
        <div class="in" style="font-weight:600;font-size:30px;letter-spacing:.26em;text-transform:uppercase;color:${COR.ouroClaro};margin-top:20px">Turma ${m.turma}</div>
      </div>`).join('')}
      <div style="width:1.5px;align-self:stretch;background:linear-gradient(180deg,transparent,${COR.ouro},transparent);opacity:.6;margin:0 10px"></div>
      <div style="padding-top:16px">${quadro(secretaria, 1000, 300, 38)}</div>
    </div>
  </div>

  <!-- ATO III · A árvore -->
  <div style="position:relative;margin-top:60px">${conector(130, W - MARGEM * 2, Array.from({ length: COLS }, (_, i) => LARG_QUADRO / 2 + i * (LARG_QUADRO + GUT)))}</div>
  <div style="position:relative;display:flex;flex-direction:column;gap:${GUT + 16}px;padding:0 ${MARGEM}px">
    ${linhas.map((linha, i) => `
      ${i > 0 && linha.length === linhas[i - 1].length ? `<div style="display:flex;gap:${GUT}px;justify-content:center;margin:-${GUT + 16}px 0 0">${linha.map(() => `<div style="width:${LARG_QUADRO}px">${conectorReto(GUT + 16)}</div>`).join('')}</div>` : ''}
      ${i > 0 && linha.length !== linhas[i - 1].length ? `<div style="margin:-${GUT + 16}px 0 0">${conector(GUT + 16 + 110, W - MARGEM * 2, linha.map((_, k) => (W - MARGEM * 2) / 2 + (k - (linha.length - 1) / 2) * (LARG_QUADRO + GUT)))}</div>` : ''}
      <div style="display:flex;gap:${GUT}px;align-items:stretch;justify-content:center">${linha.map((c) => quadro(c, LARG_QUADRO, T_FRENTE, NOME_FRENTE)).join('')}</div>`).join('')}
  </div>

  <!-- Fecho -->
  <div style="position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:100px">
    <div style="width:180px;opacity:.9">${medalhao({ cor: COR.verde, fundo: COR.papel, w: 180 })}</div>
    <div style="margin-top:50px">${fio({ w: 180, losango: 16 })}</div>
    <div class="cg" style="font-weight:600;font-size:76px;line-height:1.08;color:${COR.papel};margin-top:50px">Ciência, coragem e serviço.<br/><span style="color:${COR.ouroClaro}">Por isso o nome.</span></div>
    <div class="in" style="font-weight:700;font-size:54px;color:${COR.papel};margin-top:70px;letter-spacing:.02em">${site.instagram.handle}</div>
    <div class="eyebrow" style="font-size:26px;color:${COR.ouroClaro};margin-top:40px;letter-spacing:.34em">Gestão Dr. Vital Brazil · CA Medicina FAPI</div>
  </div>
  ${grao(0.08)}
</div>`;

const saida = path.join(AQUI, 'diretoria-vital-brazil.png');
await renderizar({ html, w: W, h: 4000, saida, medirAltura: true });
console.log('Pôster gerado em', saida);
void FIGURE;

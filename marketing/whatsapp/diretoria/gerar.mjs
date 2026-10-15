/**
 * PÔSTER DA DIRETORIA · WhatsApp (proporção A4, 1 : 1,41)
 * ----------------------------------------------------------------------------
 * Feito para circular como FOTO no WhatsApp (não como documento): a proporção
 * de folha é mostrada inteira na conversa e o app a comprime pouco.
 *
 * Composição:
 *   • Cabeçalho horizontal: retrato em arco à esquerda, título e slogan à direita.
 *   • Núcleo: Presidência · Vice · Secretaria na mesma linha.
 *   • Árvore de 10 diretorias em 3 colunas, todas ligadas por fios de ouro.
 *   • Fecho: "Ciência, coragem e serviço." e @chapavitalbrazil.
 *
 * Rodar na raiz: node marketing/whatsapp/diretoria/gerar.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, figura, fio, folha, grao, imagem, losango, medalhao, pincelada, poeira, renderizar } from '../../ferramentas/marca.mjs';
import { CARGOS, MEMBROS } from '../../../src/data/diretoria.ts';
import { site } from '../../../src/config/site.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../../..');
const W = 2480;
const H = 3508; // A4 em 300 dpi

const foto = (slug) => {
  const f = path.join(RAIZ, 'src/assets/diretoria', `${slug}.jpg`);
  return fs.existsSync(f) ? `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}` : null;
};
const iniciais = (nome) => nome.split(' ').filter((p) => p.length > 2)[0]?.[0] + nome.split(' ').at(-1)[0];
const RETRATO = imagem('portrait-snake.jpg');

/* ------------------------------------------------------------------ peças */

function retrato(m, t) {
  const f = foto(m.slug);
  const dentro = f
    ? `<img src="${f}" style="width:100%;height:100%;object-fit:cover;display:block"/>`
    : `<div class="pf" style="width:100%;height:100%;display:grid;place-items:center;font-weight:600;font-size:${t * 0.34}px;color:${COR.papel}">${iniciais(m.nome)}</div>`;
  return `<div style="position:relative;width:${t}px;height:${t}px;flex:none">
    <div class="abs" style="inset:-${t * 0.2}px;border-radius:50%;background:radial-gradient(circle,rgba(205,177,134,.2),rgba(205,177,134,0) 62%)"></div>
    <div class="abs" style="inset:-${t * 0.09}px;border-radius:50%;border:1px solid rgba(176,141,87,.3)"></div>
    <div class="abs" style="inset:-${t * 0.045}px;border-radius:50%;border:${Math.max(2, t * 0.014)}px solid ${COR.ouro}"></div>
    <div style="position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 38%,${COR.verde2},${COR.verde} 60%,${COR.noite});box-shadow:0 ${t * 0.1}px ${t * 0.26}px -${t * 0.07}px rgba(0,0,0,.75)">${dentro}</div>
  </div>`;
}

function pessoa(m, t, nomePx, largura) {
  return `<div style="display:flex;flex-direction:column;align-items:center;width:${largura}px;flex:none">
    ${retrato(m, t)}
    <div class="pf" style="font-weight:700;font-size:${nomePx}px;line-height:1.1;color:${COR.papel};text-align:center;margin-top:${t * 0.13}px;text-wrap:balance">${m.nome}</div>
    <div class="in" style="font-weight:600;font-size:${nomePx * 0.55}px;letter-spacing:.22em;text-transform:uppercase;color:${COR.ouroClaro};margin-top:${nomePx * 0.36}px">Turma ${m.turma}</div>
  </div>`;
}

const faixa = (titulo, px) => `<div class="abs" style="left:50%;top:0;transform:translate(-50%,-50%);background:${COR.noite};padding:8px 22px;display:flex;align-items:center;gap:14px;white-space:nowrap">
  <span style="width:26px;height:1.5px;background:${COR.ouro};opacity:.8"></span>${losango(8)}
  <span class="eyebrow" style="font-size:${px}px;color:${COR.ouroClaro};letter-spacing:.24em">${titulo}</span>
  ${losango(8)}<span style="width:26px;height:1.5px;background:${COR.ouro};opacity:.8"></span></div>`;

function quadro(cargo, largura, t, nomePx, { gap = 44, padX = 36 } = {}) {
  const membros = MEMBROS.filter((m) => m.cargo.id === cargo.id);
  const larguraPessoa = Math.min(largura - padX * 2, (largura - padX * 2 - gap * (membros.length - 1)) / membros.length);
  const canto = (pos) => `<div class="abs" style="${pos};width:10px;height:10px;background:${COR.ouro};transform:translate(-50%,-50%) rotate(45deg)"></div>`;
  return `<div style="position:relative;width:${largura}px;flex:none;border:1.5px solid rgba(176,141,87,.5);background:linear-gradient(180deg,rgba(40,74,60,.55),rgba(18,36,28,.25));padding:${t * 0.36}px ${padX}px ${t * 0.26}px;box-shadow:inset 0 0 100px rgba(0,0,0,.25)">
    <div class="abs" style="inset:8px;border:1px solid rgba(176,141,87,.16)"></div>
    ${canto('left:0;top:0')}${canto('left:100%;top:0')}${canto('left:0;top:100%')}${canto('left:100%;top:100%')}
    ${faixa(cargo.titulo, nomePx * 0.6)}
    <div style="display:flex;justify-content:center;gap:${gap}px;margin-top:${t * 0.06}px">
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

const MARGEM = 96;
const GUT = 40;
const COLS = 3;
const LARG = (W - MARGEM * 2 - GUT * (COLS - 1)) / COLS;
const T = 168; // retrato nos quadros
const NOME = 24;
const linhas = [];
for (const n of [3, 3, 2, 2]) linhas.push(frentes.splice(0, n));
const VAO = 42; // espaço entre linhas (onde passa o fio)

const conector = (altura, largura, pontos) => `
  <svg width="${largura}" height="${altura}" style="display:block;margin:0 auto" viewBox="0 0 ${largura} ${altura}">
    <line x1="${largura / 2}" y1="0" x2="${largura / 2}" y2="${altura / 2}" stroke="${COR.ouro}" stroke-width="2.5" opacity=".9"/>
    ${pontos.length > 1 ? `<line x1="${pontos[0]}" y1="${altura / 2}" x2="${pontos.at(-1)}" y2="${altura / 2}" stroke="${COR.ouro}" stroke-width="2.5" opacity=".9"/>` : ''}
    ${pontos.map((x) => `<line x1="${x}" y1="${altura / 2}" x2="${x}" y2="${altura}" stroke="${COR.ouro}" stroke-width="2.5" opacity=".9"/><rect x="${x - 7}" y="${altura / 2 - 7}" width="14" height="14" transform="rotate(45 ${x} ${altura / 2})" fill="${COR.ouro}"/>`).join('')}
  </svg>`;
const conectorReto = (altura) => `<div style="position:relative;width:2.5px;height:${altura}px;background:${COR.ouro};margin:0 auto;opacity:.9"><div class="abs" style="left:50%;top:50%;width:13px;height:13px;background:${COR.ouro};transform:translate(-50%,-50%) rotate(45deg)"></div></div>`;
const centros = (n) => Array.from({ length: n }, (_, k) => (W - MARGEM * 2) / 2 + (k - (n - 1) / 2) * (LARG + GUT));

/* ------------------------------------------------------------------- HTML */

const html = `
<div style="position:relative;width:${W}px;height:${H}px;overflow:hidden;display:flex;flex-direction:column;background:
  radial-gradient(1500px 900px at 68% 560px, rgba(40,74,60,1), rgba(40,74,60,0)),
  radial-gradient(1400px 1200px at 50% 2200px, rgba(40,74,60,.45), rgba(40,74,60,0)),
  linear-gradient(180deg, ${COR.noite} 0%, ${COR.noite2} 100%)">

  <!-- Luz, gravura e folhagem -->
  <div class="abs" style="left:30%;top:-500px;width:34%;height:2400px;transform:rotate(16deg);background:linear-gradient(180deg,rgba(205,177,134,.16),rgba(205,177,134,.03) 55%,transparent 80%);filter:blur(60px);mix-blend-mode:screen"></div>
  <div class="abs" style="left:50%;top:1500px;transform:translateX(-50%);opacity:.04">${figura({ cor: COR.ouro, w: 2000 })}</div>
  <div class="abs" style="left:-300px;top:-260px">${folha({ w: 900, op: 0.18 })}</div>
  <div class="abs" style="right:-360px;top:700px">${folha({ w: 920, op: 0.13, flip: true })}</div>
  <div class="abs" style="left:-380px;top:2000px">${folha({ w: 820, op: 0.11 })}</div>
  <div class="abs" style="right:-320px;bottom:-340px">${folha({ w: 900, op: 0.17, flip: true })}</div>
  ${poeira({ w: W, h: H, n: 520, semente: 29, op: 0.85 })}

  <!-- Moldura dupla -->
  <div class="abs" style="inset:40px;border:2px solid rgba(176,141,87,.6)"></div>
  <div class="abs" style="inset:54px;border:1px solid rgba(176,141,87,.22)"></div>
  ${['left:40px;top:40px', 'right:40px;top:40px', 'left:40px;bottom:40px', 'right:40px;bottom:40px'].map((p) => `<div class="abs" style="${p};width:20px;height:20px;background:${COR.noite};transform:translate(${p.includes('left') ? '-50%' : '50%'},${p.includes('top') ? '-50%' : '50%'}) rotate(45deg);border:2px solid ${COR.ouro}"></div>`).join('')}

  <!-- CABEÇALHO: retrato à esquerda, texto à direita -->
  <div style="position:relative;display:flex;align-items:center;gap:90px;padding:88px ${MARGEM + 40}px 0 ${MARGEM + 60}px">
    <div style="position:relative;width:500px;height:600px;flex:none">
      <div class="abs" style="inset:-38px;border-radius:288px 288px 0 0;border:1.5px solid rgba(176,141,87,.3)"></div>
      <div class="abs" style="inset:-18px;border-radius:268px 268px 0 0;border:3px solid rgba(176,141,87,.9)"></div>
      <div class="abs" style="inset:0;border-radius:250px 250px 0 0;overflow:hidden;box-shadow:0 90px 160px -50px rgba(0,0,0,.85)">
        <img src="${RETRATO}" style="width:100%;height:100%;object-fit:cover;object-position:58% 10%"/>
        <div class="abs" style="inset:0;background:linear-gradient(0deg,${COR.noite} 0%,rgba(18,36,28,.7) 14%,rgba(18,36,28,0) 40%)"></div>
      </div>
      <div class="abs" style="left:50%;bottom:-84px;transform:translateX(-50%);width:180px;height:180px">
        <div class="abs" style="inset:-24px;border-radius:50%;background:radial-gradient(circle,rgba(205,177,134,.4),rgba(205,177,134,0) 65%)"></div>
        <div class="abs" style="inset:-12px;border-radius:50%;border:3px solid ${COR.ouro};background:${COR.noite}"></div>
        <div class="abs" style="inset:0;border-radius:50%;background:${COR.papel}"></div>
        <div class="abs" style="inset:0;display:grid;place-items:center">${medalhao({ cor: COR.verde, w: 180 })}</div>
      </div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;align-items:flex-start">
      <div style="display:flex;align-items:center;gap:22px;color:${COR.ouroClaro}">${losango(11)}<span class="eyebrow" style="font-size:26px;letter-spacing:.34em">Chapa ao CA de Medicina · FAPI</span></div>
      <div class="eyebrow" style="font-size:30px;color:${COR.ouroClaro};margin-top:54px;letter-spacing:.44em">Gestão</div>
      <div class="pf" style="font-weight:800;font-size:136px;line-height:.9;letter-spacing:-.025em;color:${COR.papel};margin-top:14px;text-shadow:0 26px 70px rgba(0,0,0,.6)">DR. VITAL<br/>BRAZIL</div>
      <div style="margin-top:6px">${pincelada({ w: 760, h: 36 })}</div>
      <div class="cg" style="font-weight:600;font-size:50px;line-height:1.12;color:${COR.ouroClaro};margin-top:32px">Mais que uma gestão,<br/><span style="color:${COR.papel}">um compromisso com a nossa formação.</span></div>
      <div style="display:flex;align-items:center;gap:26px;margin-top:54px">
        <span style="width:120px;height:2px;background:linear-gradient(90deg,transparent,${COR.ouro})"></span>
        <div class="pf" style="font-weight:800;font-size:58px;color:${COR.papel};text-transform:uppercase;letter-spacing:.06em">Conheça a diretoria</div>
      </div>
      <div class="in" style="font-size:28px;color:${COR.salvia};margin-top:16px;letter-spacing:.05em">${MEMBROS.length} estudantes · ${CARGOS.length} frentes · do 1º ao último período. <span style="color:${COR.papel}">Uma só chapa.</span></div>
    </div>
  </div>

  <!-- NÚCLEO: Presidência · Vice · Secretaria -->
  <div style="position:relative;margin-top:116px;padding:0 ${MARGEM}px">
    <div class="abs" style="left:50%;top:50%;transform:translate(-50%,-50%);width:1900px;height:700px;border-radius:50%;background:radial-gradient(ellipse,rgba(205,177,134,.14),rgba(205,177,134,0) 65%)"></div>
    <div style="position:relative;display:flex;justify-content:center;align-items:flex-start;gap:70px">
      ${[['Presidência', presidencia], ['Vice-Presidência', vice]].map(([t, m]) => `
      <div style="display:flex;flex-direction:column;align-items:center;width:440px">
        <div class="eyebrow" style="font-size:24px;color:${COR.ouroClaro};letter-spacing:.3em;margin-bottom:36px;display:flex;align-items:center;gap:16px">${losango(10)} ${t} ${losango(10)}</div>
        ${retrato(m, 240)}
        <div class="pf" style="font-weight:700;font-size:36px;line-height:1.1;color:${COR.papel};text-align:center;margin-top:42px;text-wrap:balance">${m.nome}</div>
        <div class="in" style="font-weight:600;font-size:24px;letter-spacing:.26em;text-transform:uppercase;color:${COR.ouroClaro};margin-top:16px">Turma ${m.turma}</div>
      </div>`).join('')}
      <div style="width:1.5px;align-self:stretch;background:linear-gradient(180deg,transparent,${COR.ouro},transparent);opacity:.6;margin:0 6px"></div>
      <div style="padding-top:10px">${quadro(secretaria, 900, 196, 27, { gap: 60, padX: 40 })}</div>
    </div>
  </div>

  <!-- ÁRVORE -->
  <div style="position:relative;margin-top:24px">${conector(84, W - MARGEM * 2, centros(3))}</div>
  <div style="position:relative;display:flex;flex-direction:column;padding:0 ${MARGEM}px">
    ${linhas.map((linha, i) => `
      ${i > 0 && linha.length === linhas[i - 1].length ? `<div style="display:flex;gap:${GUT}px;justify-content:center">${linha.map(() => `<div style="width:${LARG}px">${conectorReto(VAO)}</div>`).join('')}</div>` : ''}
      ${i > 0 && linha.length !== linhas[i - 1].length ? conector(VAO + 40, W - MARGEM * 2, centros(linha.length)) : ''}
      <div style="display:flex;gap:${GUT}px;align-items:stretch;justify-content:center">${linha.map((c) => quadro(c, LARG, T, NOME)).join('')}</div>`).join('')}
  </div>

  <!-- FECHO -->
  <div style="position:relative;margin-top:auto;padding:70px 0 84px;display:flex;flex-direction:column;align-items:center;text-align:center">
    ${fio({ w: 130, losango: 12 })}
    <div class="cg" style="font-weight:600;font-size:46px;line-height:1.08;color:${COR.papel};margin-top:24px">Ciência, coragem e serviço. <span style="color:${COR.ouroClaro}">Por isso o nome.</span></div>
    <div class="in" style="font-weight:700;font-size:36px;color:${COR.papel};margin-top:22px;letter-spacing:.02em">${site.instagram.handle}</div>
    <div class="eyebrow" style="font-size:18px;color:${COR.ouroClaro};margin-top:14px;letter-spacing:.34em">Gestão Dr. Vital Brazil · CA Medicina FAPI</div>
  </div>
  ${grao(0.08)}
</div>`;

const saida = path.join(AQUI, 'diretoria-vital-brazil.png');
await renderizar({ html, w: W, h: H, saida });
console.log('Pôster gerado em', saida);

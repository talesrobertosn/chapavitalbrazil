/**
 * POST 01 · APRESENTAÇÃO ("CHEGAMOS.")
 * Carrossel panorâmico de feed (7 slides 1080×1350 que formam uma única
 * gravura, atravessada por um fio de ouro em serpente) e dois stories 1080×1920.
 *
 * Rodar (na raiz do repositório): node marketing/instagram/01-apresentacao/gerar.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, CSS_BASE, anel, figura, fio, folha, grao, imagem, losango, medalhao, pincelada, poeira, renderizar } from '../../ferramentas/marca.mjs';
import { icone } from '../../ferramentas/icones.mjs';
import { MEMBROS, iniciais } from '../../../src/data/diretoria.ts';
import fs from 'node:fs';

const foto = (slug) => {
  const f = path.resolve(path.dirname(fileURLToPath(import.meta.url)), `../../../src/assets/diretoria/${slug}.jpg`);
  return fs.existsSync(f) ? `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}` : null;
};

void CSS_BASE;
const AQUI = path.dirname(fileURLToPath(import.meta.url));
const W = 1080;
const H = 1350;
const N = 7;
const RETRATO = imagem('portrait-snake.jpg');
const LAB = imagem('portrait-lab.jpg');

const rotulo = (txt, cor = COR.ouroClaro, extra = '') => `<div class="eyebrow" style="display:flex;align-items:center;gap:16px;font-size:22px;color:${cor};${extra}">${losango(11, cor)}<span>${txt}</span></div>`;
const contador = (i, cor = COR.salvia) => `<div class="abs eyebrow" style="left:${i * W + 80}px;top:1283px;font-size:18px;color:${cor}">${String(i + 1).padStart(2, '0')} <span style="opacity:.5">/ ${String(N).padStart(2, '0')}</span></div>`;
const assinatura = (i, cor = COR.salvia) => `<div class="abs eyebrow" style="right:${(N - 1 - i) * W + 80}px;top:1283px;font-size:16px;color:${cor};letter-spacing:.26em">@chapavitalbrazil</div>`;

// Fio de ouro em serpente que atravessa os 7 slides
function serpente() {
  let d = `M 0 1240`;
  for (let i = 0; i < N * 2; i++) {
    const x0 = (i * W) / 2;
    const up = i % 2 === 0 ? -34 : 34;
    d += ` C ${x0 + W * 0.17} ${1240 + up}, ${x0 + W * 0.33} ${1240 + up}, ${x0 + W / 2} 1240`;
  }
  const marcos = Array.from({ length: N }, (_, i) => `<div class="abs" style="left:${i * W + W / 2 - 8}px;top:1232px;width:16px;height:16px;background:${COR.ouro};transform:rotate(45deg)"></div>`).join('');
  return `<svg class="abs" style="left:0;top:0" width="${W * N}" height="${H}"><path d="${d}" stroke="${COR.ouro}" stroke-width="2.4" fill="none" opacity=".85"/></svg>${marcos}`;
}

function fundo() {
  // Base contínua com luzes por slide
  const luzes = [
    [520, 520, 0.85],
    [1700, 600, 0.6],
    [2700, 700, 0.3],
    [3780, 760, 0.75],
    [4860, 560, 0.55],
    [5940, 600, 0.2],
    [7020, 520, 0.85],
  ]
    .map(([x, y, a]) => `radial-gradient(620px 620px at ${x}px ${y}px, rgba(40,74,60,${a}) 0%, rgba(40,74,60,0) 100%)`)
    .join(',');
  return `<div class="abs" style="inset:0;background:${luzes},linear-gradient(180deg,${COR.noite} 0%,${COR.noite2} 100%)"></div>`;
}

// ---------- SLIDES ----------
function s1() {
  const x = 0;
  return `
  <div class="abs" style="left:${x + 540 - 620}px;top:${120}px;opacity:.05">${medalhao({ cor: COR.ouro, w: 1240 })}</div>
  <div class="abs" style="left:${x - 90}px;top:930px">${folha({ w: 340, op: 0.18 })}</div>
  <div class="abs" style="left:${x + 80}px;top:96px">${rotulo('Chapa ao CA de Medicina · FAPI')}</div>
  <div class="abs pf" data-caber="930" style="left:${x + 72}px;top:150px;font-weight:800;font-size:182px;line-height:1;letter-spacing:-.035em;color:${COR.papel};white-space:nowrap">CHEGAMOS.</div>
  <div class="abs" style="left:${x + 78}px;top:338px">${pincelada({ w: 760, h: 34 })}</div>
  <div class="abs" style="left:${x + 80}px;top:470px;width:440px">
    <div class="pf" style="font-weight:600;font-size:42px;line-height:1.08;color:${COR.papel};white-space:nowrap">Mais que uma gestão,</div>
    <div class="cg" style="font-weight:600;font-size:54px;line-height:1.05;color:${COR.ouroClaro};margin-top:10px">um compromisso<br/>com a nossa<br/>formação.</div>
    <div class="in" style="font-size:25px;line-height:1.5;color:rgba(244,240,230,.72);margin-top:34px">Estudantes do primeiro ao último período, por uma formação médica mais humana, justa, forte e participativa.</div>
  </div>
  <div class="abs eyebrow" style="left:${x + 80}px;top:1120px;font-size:20px;color:${COR.ouroClaro};display:flex;align-items:center;gap:18px">Arraste <span style="display:inline-block;width:120px;height:2px;background:${COR.ouro}"></span>${losango(12)}</div>`;
}

function arcoRetrato() {
  // Retrato em arco que atravessa a fronteira entre o slide 1 e o 2
  const cx = 812;
  const w = 536;
  const h = 760;
  const top = 470;
  return `
  <div class="abs" style="left:${cx - w / 2 - 26}px;top:${top - 26}px;width:${w + 52}px;height:${h + 52}px;border-radius:${(w + 52) / 2}px ${(w + 52) / 2}px 0 0;border:1.5px solid rgba(176,141,87,.28)"></div>
  <div class="abs" style="left:${cx - w / 2 - 12}px;top:${top - 12}px;width:${w + 24}px;height:${h + 24}px;border-radius:${(w + 24) / 2}px ${(w + 24) / 2}px 0 0;border:2px solid rgba(176,141,87,.7)"></div>
  <div class="abs" style="left:${cx - w / 2}px;top:${top}px;width:${w}px;height:${h}px;border-radius:${w / 2}px ${w / 2}px 0 0;overflow:hidden;box-shadow:0 60px 120px -40px rgba(0,0,0,.8)">
    <img src="${RETRATO}" style="width:100%;height:100%;object-fit:cover;object-position:50% 18%;filter:contrast(1.04)"/>
    <div class="abs" style="inset:0;background:linear-gradient(0deg,${COR.noite} 0%,rgba(18,36,28,0) 30%)"></div>
  </div>`;
}

function s2() {
  const x = W;
  const anos = [
    ['1865', 'Nasce em Campanha, MG'],
    ['1901', 'Dirige o Butantan'],
    ['1919', 'Funda o instituto em Niterói'],
  ];
  return `
  <div class="abs" style="left:${x + 310}px;top:150px;width:690px">
    ${rotulo('O nome')}
    <div class="pf" style="font-weight:700;font-size:104px;line-height:.98;letter-spacing:-.02em;color:${COR.papel};margin-top:34px">Por que<br/><i style="color:${COR.ouroClaro}">Vital</i> Brazil?</div>
    <div class="in" style="font-size:27px;line-height:1.5;color:rgba(244,240,230,.75);margin-top:34px">Médico, cientista e sanitarista. Descobriu que cada soro age contra o veneno de um tipo de serpente, e transformou ciência em vidas salvas.</div>
    <div style="display:flex;gap:34px;margin-top:56px">
      ${anos.map(([a, t]) => `<div style="flex:1"><div class="pf vazado" style="font-weight:700;font-size:84px;line-height:.9">${a}</div><div class="in" style="font-size:19px;line-height:1.35;color:${COR.salvia};margin-top:12px">${t}</div></div>`).join('')}
    </div>
    <div class="cg" style="font-weight:600;font-size:50px;line-height:1.1;color:${COR.ouroClaro};margin-top:64px">Ciência, coragem e serviço.<br/><span style="color:${COR.papel}">Por isso o nome.</span></div>
  </div>`;
}

function s3() {
  const x = 2 * W;
  const ax = x + 70;
  const aw = W - 140;
  return `
  <div class="abs" style="left:${ax - 14}px;top:96px;width:${aw + 28}px;height:${H}px;border-radius:${(aw + 28) / 2}px ${(aw + 28) / 2}px 0 0;border:2px solid rgba(176,141,87,.55)"></div>
  <div class="abs" style="left:${ax}px;top:110px;width:${aw}px;height:${H}px;border-radius:${aw / 2}px ${aw / 2}px 0 0;background:${COR.papel};overflow:hidden">
    ${grao(0.16, true)}
    <div class="abs" style="right:-70px;bottom:120px">${folha({ cor: COR.verde, w: 330, op: 0.1, flip: true })}</div>
    <div class="abs" style="left:0;right:0;top:${330}px;text-align:center">${rotulo('Manifesto', COR.ouroEscuro, 'justify-content:center')}</div>
    <div class="abs pf" style="left:70px;right:70px;top:400px;text-align:center;font-weight:800;font-size:92px;line-height:.98;letter-spacing:-.02em;color:${COR.verde};text-transform:uppercase">A medicina também se faz <span style="position:relative;color:${COR.ouroEscuro}">fora<span class="abs" style="left:-6px;right:-6px;bottom:-18px">${pincelada({ w: 260, h: 22, estilo: 'width:100%' })}</span></span> da sala de aula.</div>
    <div class="abs in" style="left:110px;right:110px;top:${880}px;text-align:center;font-size:27px;line-height:1.5;color:${COR.tinta2}">No respeito ao estudante, na defesa dos nossos direitos e na união.</div>
  </div>`;
}

function s4() {
  const x = 3 * W;
  const cx = x + 540;
  const cy = 830;
  const nucleo = MEMBROS.slice(0, 2);
  const demais = MEMBROS.slice(2);
  const interno = demais.slice(0, 8);
  const externo = demais.slice(8);
  const bolinha = (m, px, py, t, cor = COR.papel) => {
    const f = foto(m.slug);
    const dentro = f ? `<img src="${f}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;filter:grayscale(.35) sepia(.12)"/>` : iniciais(m.nome);
    return `<div class="abs pf" style="left:${px - t / 2}px;top:${py - t / 2}px;width:${t}px;height:${t}px;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 38%,${COR.verde2},${COR.verde} 60%,${COR.noite});border:2px solid rgba(176,141,87,.75);display:grid;place-items:center;font-weight:600;font-size:${t * 0.34}px;color:${cor}">${dentro}</div>`;
  };
  const anelM = (lista, r, t, rot = 0) =>
    lista.map((m, i) => {
      const a = (i / lista.length) * Math.PI * 2 - Math.PI / 2 + rot;
      return bolinha(m, cx + r * Math.cos(a), cy + r * Math.sin(a), t);
    }).join('');
  return `
  <div class="abs" style="left:${x + 80}px;top:110px;width:920px">
    ${rotulo('Quem somos')}
    <div class="pf" style="font-weight:700;font-size:78px;line-height:1;letter-spacing:-.02em;color:${COR.papel};margin-top:30px">Do 1º ao último período.<br/><span style="color:${COR.ouroClaro}">Uma só chapa.</span></div>
    <div class="in" style="font-size:24px;color:${COR.salvia};margin-top:22px;letter-spacing:.04em">${MEMBROS.length} estudantes · 13 frentes · da turma 1 à turma 6</div>
  </div>
  <svg class="abs" style="left:${cx - 400}px;top:${cy - 400}px" width="800" height="800" viewBox="0 0 800 800">
    <circle cx="400" cy="400" r="395" fill="none" stroke="${COR.ouro}" stroke-opacity=".25" stroke-width="1.5"/>
    <circle cx="400" cy="400" r="330" fill="none" stroke="${COR.ouro}" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="3 9"/>
    <circle cx="400" cy="400" r="210" fill="none" stroke="${COR.ouro}" stroke-opacity=".35" stroke-width="1.5"/>
  </svg>
  ${anelM(externo, 330, 76, 0.12)}
  ${anelM(interno, 210, 70, 0.3)}
  <div class="abs" style="left:${cx - 92}px;top:${cy - 92}px">${medalhao({ cor: COR.noite, fundo: COR.papel, w: 184 })}</div>
  ${nucleo.map((m, i) => `${bolinha(m, x + (i === 0 ? 120 : 960), cy + 190, 96)}<div class="abs" style="left:${x + (i === 0 ? 70 : 760)}px;top:${cy + 252}px;width:250px;text-align:${i === 0 ? 'left' : 'right'}"><div class="eyebrow" style="font-size:15px;color:${COR.ouroClaro}">${m.cargo.titulo}</div><div class="pf" style="font-weight:600;font-size:24px;line-height:1.15;color:${COR.papel};margin-top:8px">${m.nome}</div></div>`).join('')}`;
}

function s5() {
  const x = 4 * W;
  const eixos = [
    ['Microscope', '01', 'Ensino, Pesquisa e Carreira', 'Sutura não se aprende só no vídeo.'],
    ['Stethoscope', '02', 'Internato e Estágios', 'Cansaço não é mérito.'],
    ['HeartHandshake', '03', 'Cuidado com o Estudante', 'Antes de ser médico, você é gente.'],
    ['Scale', '04', 'Transparência e Representação', 'Todo mês. Todo centavo.'],
    ['UsersRound', '05', 'Integração, Benefícios e Comunidade', 'Medicina também é time.'],
  ];
  return `
  <div class="abs" style="left:${x + 80}px;top:100px;width:920px">
    ${rotulo('O programa')}
    <div class="pf" style="font-weight:800;font-size:90px;line-height:.95;letter-spacing:-.025em;color:${COR.papel};margin-top:28px;text-transform:uppercase">5 eixos.<br/><span style="color:${COR.ouroClaro}">1 compromisso.</span></div>
  </div>
  <div class="abs" style="left:${x + 80}px;top:400px;width:920px">
    ${eixos
      .map(
        ([ic, n, t, f]) => `<div style="display:flex;align-items:center;gap:30px;padding:20px 0;border-top:1.5px solid rgba(176,141,87,.22)">
      ${anel(icone(ic, { size: 44, stroke: 1.15, cor: COR.ouroClaro }), 96)}
      <div class="pf vazado" style="font-weight:700;font-size:64px;line-height:1;width:96px;-webkit-text-stroke:1.6px ${COR.ouro}">${n}</div>
      <div style="flex:1"><div class="pf" style="font-weight:700;font-size:33px;line-height:1.1;color:${COR.papel}">${t}</div><div class="cg" style="font-weight:500;font-size:29px;color:${COR.ouroClaro};margin-top:6px">“${f}”</div></div>
    </div>`,
      )
      .join('')}
  </div>`;
}

function s6() {
  const x = 5 * W;
  const nums = [
    ['52', 'propostas'],
    ['100', 'primeiros dias'],
    ['12', 'prestações de contas por ano'],
  ];
  return `
  <div class="abs" style="left:${x + 46}px;top:46px;width:${W - 92}px;height:${H - 92}px;background:${COR.papel};overflow:hidden">
    ${grao(0.16, true)}
    <div class="abs" style="inset:22px;border:1.5px solid rgba(122,92,48,.45)"></div>
    <div class="abs" style="inset:30px;border:1px solid rgba(122,92,48,.2)"></div>
    <div class="abs" style="left:-80px;top:-60px">${folha({ cor: COR.verde, w: 300, op: 0.08 })}</div>
    <div class="abs" style="left:84px;top:120px;width:830px">
      ${rotulo('Como você pode nos cobrar', COR.ouroEscuro)}
      <div class="pf" style="font-weight:800;font-size:108px;line-height:.93;letter-spacing:-.03em;color:${COR.verde};margin-top:34px;text-transform:uppercase">Escrito<br/>para ser<br/><i style="color:${COR.ouroEscuro}">cobrado.</i></div>
      <div style="display:flex;gap:28px;margin-top:64px;border-top:1.5px solid rgba(30,58,47,.15);padding-top:36px">
        ${nums.map(([n, r]) => `<div style="flex:1"><div class="pf" style="font-weight:700;font-size:78px;line-height:1;color:${COR.ouroEscuro}">${n}</div><div class="in" style="font-size:20px;line-height:1.3;color:${COR.tinta2};margin-top:10px">${r}</div></div>`).join('')}
      </div>
      <div class="in" style="font-size:24px;line-height:1.5;color:${COR.tinta2};margin-top:44px">Painel público de propostas, relatório dos 100 dias, reuniões abertas e Ouvidoria com prazo de resposta.</div>
      <div class="cg" style="font-weight:600;font-size:46px;line-height:1.1;color:${COR.verde};margin-top:40px">Se algo não andar,<br/>você vai saber por nós.</div>
    </div>
  </div>`;
}

function s7() {
  const x = 6 * W;
  return `
  <div class="abs" style="left:${x + 540 - 560}px;top:-140px;opacity:.06">${figura({ cor: COR.ouro, w: 1120 })}</div>
  <div class="abs" style="left:${x + W - 300}px;top:900px">${folha({ w: 360, op: 0.16, flip: true })}</div>
  <div class="abs" style="left:${x}px;width:${W}px;top:150px;display:flex;flex-direction:column;align-items:center;text-align:center">
    <div style="position:relative;width:330px;height:330px">
      <div class="abs" style="inset:-28px;border-radius:50%;border:1.5px solid rgba(176,141,87,.3)"></div>
      <div class="abs" style="inset:-14px;border-radius:50%;border:2px solid rgba(176,141,87,.75)"></div>
      ${medalhao({ cor: COR.noite, fundo: COR.papel, w: 330 })}
    </div>
    <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};margin-top:70px">Gestão</div>
    <div class="pf" style="font-weight:800;font-size:96px;line-height:.95;letter-spacing:-.02em;color:${COR.papel};margin-top:14px">DR. VITAL BRAZIL</div>
    <div style="margin-top:12px">${pincelada({ w: 560, h: 28 })}</div>
    <div class="cg" style="font-weight:600;font-size:52px;line-height:1.12;color:${COR.ouroClaro};margin-top:30px">Mais que uma gestão,<br/>um compromisso com a nossa formação.</div>
    <div style="margin-top:46px">${fio({ w: 110 })}</div>
    <div class="in" style="font-weight:600;font-size:38px;color:${COR.papel};margin-top:36px;letter-spacing:.02em">@chapavitalbrazil</div>
    <div class="in" style="font-size:24px;color:${COR.salvia};margin-top:12px">Ativa o sininho: todo dia tem novidade.</div>
  </div>`;
}

const panorama = `
${fundo()}
${poeira({ w: W * N, h: H, n: 520, semente: 11, op: 0.85 })}
${s1()}${arcoRetrato()}${s2()}${s3()}${s4()}${s5()}${s6()}${s7()}
${serpente()}
${Array.from({ length: N }, (_, i) => contador(i, i === 5 ? COR.ouroEscuro : COR.salvia) + assinatura(i, i === 5 ? COR.ouroEscuro : COR.salvia)).join('')}
${grao(0.08)}
`;

await renderizar({
  html: panorama,
  w: W * N,
  h: H,
  recortes: Array.from({ length: N }, (_, i) => ({ x: i * W, y: 0, w: W, h: H, arquivo: path.join(AQUI, `carrossel-${String(i + 1).padStart(2, '0')}.png`) })),
});
await renderizar({ html: panorama, w: W * N, h: H, saida: path.join(AQUI, '_panorama.png') });

// ---------- STORIES ----------
const SH = 1920;
const story1 = `
<div class="abs" style="inset:0;background:radial-gradient(800px 900px at 540px 760px,rgba(40,74,60,.95),rgba(40,74,60,0)),linear-gradient(180deg,${COR.noite},${COR.noite2})"></div>
${poeira({ w: W, h: SH, n: 170, semente: 3 })}
<div class="abs" style="left:-120px;top:1250px">${folha({ w: 460, op: 0.2 })}</div>
<div class="abs" style="right:-120px;top:-60px">${folha({ w: 420, op: 0.14, flip: true })}</div>
<div class="abs" style="left:0;right:0;top:290px;display:flex;flex-direction:column;align-items:center;text-align:center">
  <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};display:flex;align-items:center;gap:16px">${fio({ w: 60 })}</div>
  <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};margin-top:22px">Chapa ao CA de Medicina · FAPI</div>
  <div style="position:relative;width:400px;height:400px;margin-top:64px">
    <div class="abs" style="inset:-34px;border-radius:50%;border:1.5px solid rgba(176,141,87,.28)"></div>
    <div class="abs" style="inset:-16px;border-radius:50%;border:2px solid rgba(176,141,87,.8)"></div>
    ${medalhao({ cor: COR.noite, fundo: COR.papel, w: 400 })}
  </div>
  <div class="pf" data-caber="960" style="font-weight:800;font-size:184px;line-height:1;letter-spacing:-.035em;color:${COR.papel};margin-top:96px;white-space:nowrap">CHEGAMOS.</div>
  <div style="margin-top:6px">${pincelada({ w: 700, h: 32 })}</div>
  <div class="pf" style="font-weight:600;font-size:52px;color:${COR.papel};margin-top:56px">Mais que uma gestão,</div>
  <div class="cg" style="font-weight:600;font-size:64px;line-height:1.08;color:${COR.ouroClaro};margin-top:6px">um compromisso<br/>com a nossa formação.</div>
</div>
<div class="abs eyebrow" style="left:0;right:0;top:1540px;text-align:center;font-size:20px;color:${COR.ouroClaro}">Conheça o programa ↓</div>
<div class="abs" style="left:0;right:0;top:1660px;display:flex;flex-direction:column;align-items:center">
  ${fio({ w: 80 })}
  <div class="in" style="font-weight:600;font-size:32px;color:${COR.papel};margin-top:22px">@chapavitalbrazil</div>
</div>
${grao(0.09)}
`;
await renderizar({ html: story1, w: W, h: SH, saida: path.join(AQUI, 'story-01-chegamos.png') });

const linha = (n, t, cor = COR.papel) => `<div style="display:flex;align-items:baseline;gap:34px;border-top:1.5px solid rgba(176,141,87,.25);padding:26px 0">
  <div class="pf vazado" style="font-weight:700;font-size:250px;line-height:.82;width:420px;text-align:right;-webkit-text-stroke:2.4px ${COR.ouro}">${n}</div>
  <div class="pf" style="font-weight:700;font-size:72px;line-height:1;color:${cor}">${t}</div></div>`;
const story2 = `
<div class="abs" style="inset:0;background:radial-gradient(900px 900px at 540px 900px,rgba(40,74,60,.9),rgba(40,74,60,0)),linear-gradient(180deg,${COR.noite},${COR.noite2})"></div>
<div class="abs" style="left:${540 - 560}px;top:480px;opacity:.06">${figura({ cor: COR.ouro, w: 1120 })}</div>
${poeira({ w: W, h: SH, n: 140, semente: 9 })}
<div class="abs" style="left:0;right:0;top:300px;text-align:center">
  <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};display:inline-flex;align-items:center;gap:16px">${losango(11)} O programa ${losango(11)}</div>
</div>
<div class="abs" style="left:70px;right:70px;top:420px">
  ${linha('5', 'eixos')}
  ${linha('52', 'propostas')}
  ${linha('1', `<span style="color:${COR.ouroClaro};font-style:italic">compromisso.</span>`)}
</div>
<div class="abs" style="left:0;right:0;top:1340px;text-align:center">
  <div class="pf" style="font-weight:800;font-size:66px;line-height:1;color:${COR.papel};text-transform:uppercase">Escrito para ser cobrado.</div>
  <div style="display:flex;justify-content:center;margin-top:10px">${pincelada({ w: 520, h: 26 })}</div>
  <div class="in" style="font-size:28px;color:rgba(244,240,230,.72);margin-top:30px">O programa inteiro está no link.</div>
</div>
<div class="abs" style="left:0;right:0;top:1660px;display:flex;flex-direction:column;align-items:center">
  ${fio({ w: 80 })}
  <div class="in" style="font-weight:600;font-size:32px;color:${COR.papel};margin-top:22px">@chapavitalbrazil</div>
</div>
${grao(0.09)}
`;
await renderizar({ html: story2, w: W, h: SH, saida: path.join(AQUI, 'story-02-programa.png') });

const story3 = `
<div class="abs" style="inset:0;background:radial-gradient(800px 900px at 540px 900px,rgba(40,74,60,.95),rgba(40,74,60,0)),linear-gradient(180deg,${COR.noite},${COR.noite2})"></div>
${poeira({ w: W, h: SH, n: 160, semente: 21 })}
<div class="abs" style="right:-130px;top:1180px">${folha({ w: 470, op: 0.2, flip: true })}</div>
<div class="abs" style="left:0;right:0;top:290px;text-align:center">
  <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};display:inline-flex;align-items:center;gap:16px">${losango(11)} O nome ${losango(11)}</div>
</div>
<div class="abs" style="left:${540 - 300 - 30}px;top:${380 - 30}px;width:660px;height:900px;border-radius:330px 330px 0 0;border:1.5px solid rgba(176,141,87,.3)"></div>
<div class="abs" style="left:${540 - 300 - 15}px;top:${380 - 15}px;width:630px;height:870px;border-radius:315px 315px 0 0;border:2px solid rgba(176,141,87,.8)"></div>
<div class="abs" style="left:${540 - 300}px;top:380px;width:600px;height:840px;border-radius:300px 300px 0 0;overflow:hidden">
  <img src="${RETRATO}" style="width:100%;height:100%;object-fit:cover;object-position:50% 15%"/>
  <div class="abs" style="inset:0;background:linear-gradient(0deg,${COR.noite} 0%,rgba(18,36,28,.6) 18%,rgba(18,36,28,0) 40%)"></div>
</div>
<div class="abs pf" style="left:0;right:0;top:1090px;text-align:center;font-weight:800;font-size:112px;line-height:.95;letter-spacing:-.02em;color:${COR.papel};text-transform:uppercase">Vital Brazil</div>
<div class="abs eyebrow" style="left:0;right:0;top:1215px;text-align:center;font-size:22px;color:${COR.salvia}">1865 — 1950</div>
<div class="abs cg" style="left:0;right:0;top:1300px;text-align:center;font-weight:600;font-size:64px;line-height:1.1;color:${COR.ouroClaro}">Ciência, coragem e serviço.<br/><span style="color:${COR.papel}">Por isso o nome.</span></div>
<div class="abs" style="left:0;right:0;top:1660px;display:flex;flex-direction:column;align-items:center">
  ${fio({ w: 80 })}
  <div class="in" style="font-weight:600;font-size:32px;color:${COR.papel};margin-top:22px">@chapavitalbrazil</div>
</div>
${grao(0.09)}
`;
await renderizar({ html: story3, w: W, h: SH, saida: path.join(AQUI, 'story-03-vital-brazil.png') });

void LAB;
console.log('Artes geradas em', AQUI);

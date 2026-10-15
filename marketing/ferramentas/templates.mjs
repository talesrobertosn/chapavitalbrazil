/**
 * TEMPLATES DE POST · Instagram (Gravura Viva)
 * ----------------------------------------------------------------------------
 * Blocos prontos para montar carrosséis e stories sem reescrever o visual.
 * Cada função devolve HTML absoluto dentro de um slide. Use com `montar()`.
 *
 * Formatos:  FEED = 1080 × 1350   ·   STORY = 1080 × 1920
 * Zonas seguras: feed, margem 80 px; story, conteúdo entre y 260 e 1660.
 *
 * Templates (ver docs/DIRECAO-DE-ARTE.md § 8):
 *   capa(...)        fundo escuro, frase de impacto, retrato opcional em arco
 *   frase(...)       escuro ou claro, uma frase grande, UMA palavra em ouro + pincelada
 *   proposta(...)    claro, ícone do eixo em anel, título, até 3 tópicos
 *   pergunta(...)    pergunta em cima (escuro), resposta embaixo (claro)
 *   lista(...)       escuro, itens numerados (01, 02…) com fio
 *   pessoa(...)      escuro, retrato circular + nome + cargo + frase
 *   fecho(...)       medalhão + slogan + @ (último slide, sempre)
 *   storyFrase / storyPessoa
 *
 * Templates II (estilos criativos, ver docs/MARKETING.md § 11):
 *   cartaCapa / carta        carta em papel (envelope com lacre, caligrafia, assinatura)
 *   gazeta                   primeira página de jornal do séc. XIX ("Você sabia?", notícias)
 *   prancha                  prancha científica: figuras numeradas + legendas (propostas como espécimes)
 *   numero                   um número gigante (52 propostas, 23 pessoas, 20 dias)
 *   linhaDoTempo             marcos com fio vertical (Vital Brazil, 100 dias)
 *   citacao                  frase longa em itálico com aspas monumentais
 *   convite                  data grande, horário, local, carimbo (eleição, eventos)
 *   checklist                itens com caixa marcada (100 primeiros dias, prestação de contas)
 *   dicionario               verbete: palavra, sílabas, classe, definições (Ouvidoria, Transparência)
 *   prescricao               receituário: "Rx" + itens com posologia
 *   mosaico                  grade de retratos circulares (times, diretorias)
 *   fotoMoldura              foto real com moldura dupla e legenda (bastidores)
 *   telegrama                mensagem urgente com STOP (reta final, avisos)
 *   storyContagem / storyEnquete / storyQuiz / storyCarta / storyAgenda / storyNumero
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, anel, figura, fio, folha, grao, imagem, losango, medalhao, pincelada, poeira, renderizar } from './marca.mjs';
import { icone } from './icones.mjs';
import * as A from './assets.mjs';
import { site } from '../../src/config/site.ts';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const FEED = { w: 1080, h: 1350 };
export const QUADRADO = { w: 1080, h: 1080 };
export const STORY = { w: 1080, h: 1920 };

/**
 * TONS: variações leves da paleta, para o feed não ficar engessado.
 *  escuro: 'noite' (padrão, profundo) · 'verde' (institucional) · 'musgo' (mais claro)
 *  claro:  'papel' (padrão) · 'marfim' (mais forte/quente) · 'areia' (mais escuro)
 */
export const TONS = {
  escuro: { noite: [COR.noite, COR.noite2], verde: [COR.verde, COR.noite], musgo: ['#2B4A3C', COR.verde], floresta: ['#173126', '#0E1F18'], carvao: ['#161D19', '#0B100D'] },
  claro: { papel: COR.papel, marfim: '#F7F2E4', areia: '#E9E1CE', branco: '#FBF9F3', linho: '#EFE8D9' },
};

/** Tamanho do título conforme o comprimento (frases longas descem de corpo). */
export const tamanhoFrase = (t, base = 118) => (t.length > 140 ? base * 0.55 : t.length > 90 ? base * 0.68 : t.length > 60 ? base * 0.82 : base);

export const ICONE_EIXO = { ensino: 'Microscope', internato: 'Stethoscope', cuidado: 'HeartHandshake', transparencia: 'Scale', integracao: 'UsersRound' };

export const foto = (slug) => {
  const f = path.join(RAIZ, 'src/assets/diretoria', `${slug}.jpg`);
  return fs.existsSync(f) ? `data:image/jpeg;base64,${fs.readFileSync(f).toString('base64')}` : null;
};
export const RETRATO = () => imagem('portrait-snake.jpg');
export const LABORATORIO = () => imagem('portrait-lab.jpg');
export const BUTANTAN = () => imagem('butantan.jpg');

/* ------------------------------------------------------------- utilidades */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Destaca UMA palavra em ouro (+ pincelada opcional). `palavra` compara sem pontuação/caixa. */
export function destacar(texto, palavra, { cor = COR.ouroClaro, pincel = true } = {}) {
  if (!palavra) return esc(texto);
  const norm = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const alvo = norm(palavra);
  return texto
    .split(' ')
    .map((w) =>
      norm(w) === alvo
        ? `<span style="position:relative;display:inline-block;color:${cor};font-style:italic">${esc(w)}${pincel ? `<span class="abs" style="left:-3%;right:-3%;bottom:-.02em;height:.14em;line-height:0">${pincelada({ w: 300, h: 22, estilo: 'width:100%;height:100%' })}</span>` : ''}</span>`
        : esc(w),
    )
    .join(' ');
}

/** Rótulo de catálogo: ◆ TEXTO */
export const rotulo = (txt, cor = COR.ouroClaro, px = 22) => `<div class="eyebrow" style="display:flex;align-items:center;gap:16px;font-size:${px}px;color:${cor}">${losango(Math.round(px / 2), cor)}<span>${esc(txt)}</span></div>`;

/** Rodapé: contador (esquerda) e @ (direita). */
export const rodape = (i, n, claro = false) => {
  const cor = claro ? COR.ouroEscuro : COR.salvia;
  return `<div class="abs eyebrow" style="left:80px;top:1283px;font-size:18px;color:${cor}">${String(i).padStart(2, '0')} <span style="opacity:.5">/ ${String(n).padStart(2, '0')}</span></div>
  <div class="abs eyebrow" style="right:80px;top:1283px;font-size:16px;color:${cor};letter-spacing:.26em">${site.instagram.handle}</div>`;
};

/** Fundo escuro com luz, folhagem e poeira. */
/**
 * `textura`: 'luz' (padrão) · 'raios' (feixes de luz do alto) · 'vinheta' (bordas escuras) · 'folhas' (folhas espalhadas) · 'samambaia' · 'oliveira'
 */
export const fundoEscuro = ({ w = FEED.w, h = FEED.h, luzX = 0.5, luzY = 0.42, semente = 7, folhas = true, tom = 'noite', textura = 'luz' } = {}) => {
  const [a, b] = TONS.escuro[tom] ?? TONS.escuro.noite;
  const texturas = {
    luz: '',
    raios: `<div class="abs" style="inset:0;background:repeating-conic-gradient(from -24deg at 50% -12%, rgba(205,177,134,.07) 0deg 2.5deg, rgba(205,177,134,0) 2.5deg 13deg);mask-image:linear-gradient(180deg,#000,transparent 85%);-webkit-mask-image:linear-gradient(180deg,#000,transparent 85%)"></div>`,
    vinheta: `<div class="abs" style="inset:0;background:radial-gradient(ellipse at 50% 45%, rgba(12,25,19,0) 50%, rgba(12,25,19,.8) 100%)"></div>`,
    folhas: `<div class="abs" style="inset:0">${A.folhasEspalhadas({ w, h, n: Math.round((w * h) / 90000), semente, op: 0.12 })}</div>`,
    samambaia: `<div class="abs" style="left:-40px;bottom:-60px">${A.samambaia({ h: h * 0.55, op: 0.22 })}</div><div class="abs" style="right:-30px;top:-40px;transform:rotate(180deg)">${A.samambaia({ h: h * 0.42, op: 0.14 })}</div>`,
    oliveira: `<div class="abs" style="left:-60px;bottom:40px">${A.oliveira({ w: w * 0.5, op: 0.25 })}</div><div class="abs" style="right:-60px;top:60px;transform:rotate(180deg)">${A.oliveira({ w: w * 0.42, op: 0.16 })}</div>`,
  };
  return `
  <div class="abs" style="inset:0;background:radial-gradient(${w * 0.7}px ${h * 0.5}px at ${luzX * 100}% ${luzY * 100}%, rgba(40,74,60,.9), rgba(40,74,60,0)),linear-gradient(180deg,${a},${b})"></div>
  ${texturas[textura] ?? ''}
  ${folhas && !['samambaia', 'oliveira', 'folhas'].includes(textura) ? `<div class="abs" style="left:-110px;bottom:-120px">${folha({ w: 420, op: 0.18 })}</div><div class="abs" style="right:-120px;top:-90px">${folha({ w: 380, op: 0.12, flip: true })}</div>` : ''}
  ${poeira({ w, h, n: Math.round((w * h) / 9000), semente })}`;
};

/** Fundo de papel com granulação e folhagem verde. */
/**
 * `decor`: 'folhas' (padrão) · 'ramos' · 'moldura' (borda dupla) · 'trepadeira' (bordas laterais) · 'flores' · 'nenhum'
 */
export const fundoClaro = ({ folhas = true, tom = 'papel', decor = 'folhas', w = FEED.w, h = FEED.h } = {}) => {
  const decors = {
    folhas: `<div class="abs" style="right:-80px;bottom:60px">${folha({ cor: COR.verde, w: 340, op: 0.1, flip: true })}</div><div class="abs" style="left:-90px;top:-100px">${folha({ cor: COR.verde, w: 300, op: 0.07 })}</div>`,
    ramos: `<div class="abs" style="left:-30px;bottom:30px">${A.ramo({ cor: COR.verde, w: 420, op: 0.2 })}</div><div class="abs" style="right:-30px;top:20px;transform:rotate(180deg)">${A.ramo({ cor: COR.verde, w: 360, op: 0.14 })}</div>`,
    moldura: `<div class="abs" style="inset:44px 44px ${h === FEED.h ? 96 : 44}px;border:1px solid rgba(30,58,47,.45)"></div><div class="abs" style="inset:54px 54px ${h === FEED.h ? 106 : 54}px;border:1px solid rgba(30,58,47,.2)"></div>${[[0, 0], [90, 1], [270, 2], [180, 3]].map(([rot, i]) => `<div class="abs" style="${i % 2 ? 'right' : 'left'}:34px;${i < 2 ? 'top' : 'bottom'}:${i < 2 || h !== FEED.h ? 34 : 86}px">${A.cantoneira({ cor: COR.ouroEscuro, t: 90, rot })}</div>`).join('')}`,
    trepadeira: `<div class="abs" style="left:14px;top:-20px">${A.trepadeira({ cor: COR.verde, h: h + 40, op: 0.22 })}</div><div class="abs" style="right:14px;top:-20px">${A.trepadeira({ cor: COR.verde, h: h + 40, op: 0.22, flip: true })}</div>`,
    flores: `<div class="abs" style="left:-20px;bottom:-30px;transform:rotate(-18deg)">${A.flor({ cor: COR.verde, t: 260, op: 0.16 })}</div><div class="abs" style="right:-40px;top:-60px;transform:rotate(160deg)">${A.flor({ cor: COR.verde, t: 220, op: 0.12 })}</div>`,
    nenhum: '',
  };
  return `
  <!--claro-->
  <div class="abs" style="inset:0;background:${TONS.claro[tom] ?? COR.papel}"></div>
  ${grao(0.16, true)}
  ${folhas ? decors[decor] ?? decors.folhas : ''}`;
};

/** Retrato em arco (imagem institucional). */
export const arco = ({ src, x, y, w, h, pos = '50% 15%' }) => `
  <div class="abs" style="left:${x - 26}px;top:${y - 26}px;width:${w + 52}px;height:${h + 52}px;border-radius:${(w + 52) / 2}px ${(w + 52) / 2}px 0 0;border:1.5px solid rgba(176,141,87,.28)"></div>
  <div class="abs" style="left:${x - 12}px;top:${y - 12}px;width:${w + 24}px;height:${h + 24}px;border-radius:${(w + 24) / 2}px ${(w + 24) / 2}px 0 0;border:2px solid rgba(176,141,87,.7)"></div>
  <div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${w / 2}px ${w / 2}px 0 0;overflow:hidden;box-shadow:0 60px 120px -40px rgba(0,0,0,.8)">
    <img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:${pos}"/>
    <div class="abs" style="inset:0;background:linear-gradient(0deg,${COR.noite} 0%,rgba(18,36,28,0) 30%)"></div>
  </div>`;

/** Retrato circular (pessoa) com anel de ouro. */
export const circulo = ({ src, iniciais, x, y, t }) => `
  <div class="abs" style="left:${x}px;top:${y}px;width:${t}px;height:${t}px">
    <div class="abs" style="inset:-${t * 0.09}px;border-radius:50%;border:1px solid rgba(176,141,87,.3)"></div>
    <div class="abs" style="inset:-${t * 0.045}px;border-radius:50%;border:${Math.max(2, t * 0.014)}px solid ${COR.ouro}"></div>
    <div style="width:100%;height:100%;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 38%,${COR.verde2},${COR.verde} 60%,${COR.noite});display:grid;place-items:center;box-shadow:0 ${t * 0.1}px ${t * 0.26}px -${t * 0.07}px rgba(0,0,0,.75)">
      ${src ? `<img src="${src}" style="width:100%;height:100%;object-fit:cover;display:block"/>` : `<span class="pf" style="font-weight:600;font-size:${t * 0.34}px;color:${COR.papel}">${iniciais}</span>`}
    </div>
  </div>`;

/* --------------------------------------------------------------- templates */

/**
 * CAPA: frase de impacto gigante + retrato em arco à direita (opcional).
 * `frase` em CAIXA ALTA automática; `sub` em Cormorant itálico.
 */
export function capa({ frase, destaque, sub, rotuloTxt = 'Chapa ao CA de Medicina · FAPI', retrato = true, arraste = true, tom }) {
  const larg = retrato ? 560 : 940;
  const n = frase.length;
  const tam = retrato ? (n > 24 ? 96 : n > 12 ? 124 : 150) : tamanhoFrase(frase, 150);
  return `
    ${fundoEscuro({ luzX: 0.3, semente: 3, tom })}
    ${retrato ? arco({ src: RETRATO(), x: 600, y: 520, w: 480, h: 760, pos: '58% 12%' }) : ''}
    <div class="abs" style="left:80px;top:96px">${rotulo(rotuloTxt)}</div>
    <div class="abs" style="left:72px;top:150px;width:${larg}px;display:flex;flex-direction:column;align-items:flex-start;gap:28px">
      <div class="pf" data-caber="${larg}" style="font-weight:800;font-size:${tam}px;line-height:.95;letter-spacing:-.03em;color:${COR.papel};text-transform:uppercase;text-wrap:balance">${destacar(frase.toUpperCase(), destaque, { pincel: false })}</div>
      <div style="margin-left:6px">${pincelada({ w: Math.round(larg * 0.75), h: 34 })}</div>
      ${sub ? `<div class="cg" style="margin-left:8px;width:${retrato ? 480 : 900}px;font-weight:600;font-size:${retrato ? 44 : 52}px;line-height:1.08;color:${COR.ouroClaro}">${esc(sub)}</div>` : ''}
    </div>
    ${arraste ? `<div class="abs eyebrow" style="left:80px;top:1120px;font-size:20px;color:${COR.ouroClaro};display:flex;align-items:center;gap:18px">Arraste <span style="display:inline-block;width:120px;height:2px;background:${COR.ouro}"></span>${losango(12)}</div>` : ''}`;
}

/** FRASE: uma frase grande, uma palavra em ouro. `tema`: 'escuro' | 'claro'. */
export function frase({ texto, destaque, tema = 'escuro', tom, rotuloTxt, apoio }) {
  const claro = tema === 'claro';
  const corTxt = claro ? COR.verde : COR.papel;
  const corDest = claro ? COR.ouroEscuro : COR.ouroClaro;
  return `
    ${claro ? fundoClaro({ tom }) : fundoEscuro({ semente: 5, tom })}
    ${rotuloTxt ? `<div class="abs" style="left:80px;top:110px">${rotulo(rotuloTxt, corDest)}</div>` : ''}
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:50%;transform:translateY(-50%);font-weight:800;font-size:${tamanhoFrase(texto)}px;line-height:1;letter-spacing:-.025em;color:${corTxt};text-transform:uppercase;text-wrap:balance">${destacar(texto.toUpperCase(), destaque, { cor: corDest })}</div>
    ${apoio ? `<div class="abs in" style="left:80px;right:80px;top:1090px;font-size:28px;line-height:1.5;color:${claro ? COR.tinta2 : 'rgba(244,240,230,.75)'}">${esc(apoio)}</div>` : ''}`;
}

/** PROPOSTA (claro): ícone do eixo, rótulo, título, até 3 tópicos. */
export function proposta({ eixoId, eixoNumero, eixoTitulo, titulo, topicos = [], texto, tom }) {
  return `
    ${fundoClaro({ tom })}
    <div class="abs" style="left:80px;top:110px">${anel(icone(ICONE_EIXO[eixoId] ?? 'Microscope', { size: 52, stroke: 1.15, cor: COR.ouroEscuro }), 120, COR.ouroEscuro)}</div>
    <div class="abs" style="left:80px;top:270px">${rotulo(`Eixo ${eixoNumero} · ${eixoTitulo}`, COR.ouroEscuro, 20)}</div>
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:330px;font-weight:800;font-size:92px;line-height:.98;letter-spacing:-.02em;color:${COR.verde};text-transform:uppercase;text-wrap:balance">${esc(titulo)}</div>
    ${texto ? `<div class="abs in" style="left:80px;right:80px;top:700px;font-size:30px;line-height:1.5;color:${COR.tinta2}">${esc(texto)}</div>` : ''}
    <div class="abs" style="left:80px;right:80px;top:${texto ? 880 : 760}px;display:flex;flex-direction:column;gap:26px">
      ${topicos.slice(0, 3).map((t) => `<div style="display:flex;gap:22px;align-items:flex-start"><span style="flex:none;margin-top:16px">${losango(12, COR.ouroEscuro)}</span><span class="pf" style="font-weight:600;font-size:38px;line-height:1.2;color:${COR.tinta}">${esc(t)}</span></div>`).join('')}
    </div>`;
}

/** PERGUNTA / RESPOSTA: metade escura com a pergunta, metade clara com a resposta. */
export function pergunta({ pergunta: q, resposta }) {
  return `
    ${fundoEscuro({ luzY: 0.25, semente: 9, folhas: false })}
    <div class="abs" style="left:0;right:0;top:640px;bottom:0;background:${COR.papel}"></div>
    <div class="abs" style="left:0;right:0;top:640px;bottom:0;overflow:hidden">${grao(0.16, true)}<div class="abs" style="right:-80px;bottom:-60px">${folha({ cor: COR.verde, w: 320, op: 0.1, flip: true })}</div></div>
    <div class="abs" style="left:80px;top:110px">${rotulo('Pergunta pra gente')}</div>
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:190px;font-weight:800;font-size:76px;line-height:1.02;color:${COR.papel};text-wrap:balance">${esc(q)}</div>
    <div class="abs" style="left:50%;top:640px;transform:translate(-50%,-50%);width:70px;height:70px;border-radius:50%;background:${COR.papel};border:3px solid ${COR.ouro};display:grid;place-items:center">${medalhao({ cor: COR.verde, w: 56 })}</div>
    <div class="abs" style="left:80px;top:720px">${rotulo('A gente responde', COR.ouroEscuro)}</div>
    <div class="abs cg" style="left:80px;right:80px;top:790px;font-weight:600;font-size:46px;line-height:1.2;color:${COR.verde}">${esc(resposta)}</div>`;
}

/** LISTA (escuro): título + itens numerados. Bom para "3 coisas", resumos. */
export function lista({ rotuloTxt, titulo, itens = [], tom }) {
  return `
    ${fundoEscuro({ semente: 13, tom })}
    <div class="abs" style="left:80px;top:100px">${rotulo(rotuloTxt)}</div>
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:160px;font-weight:800;font-size:80px;line-height:.98;color:${COR.papel};text-transform:uppercase;text-wrap:balance">${esc(titulo)}</div>
    <div class="abs" style="left:80px;right:80px;top:420px">
      ${itens.slice(0, 5).map((it, i) => `<div style="display:flex;align-items:flex-start;gap:28px;padding:22px 0;border-top:1.5px solid rgba(176,141,87,.22)">
        <div class="pf" style="font-weight:700;font-size:60px;line-height:1;color:transparent;-webkit-text-stroke:1.6px ${COR.ouro};width:90px;flex:none">${String(i + 1).padStart(2, '0')}</div>
        <div><div class="pf" style="font-weight:700;font-size:34px;line-height:1.15;color:${COR.papel}">${esc(it.titulo ?? it)}</div>${it.texto ? `<div class="in" style="font-size:24px;line-height:1.45;color:rgba(244,240,230,.7);margin-top:8px">${esc(it.texto)}</div>` : ''}</div>
      </div>`).join('')}
    </div>`;
}

/** PESSOA (escuro): retrato circular + nome + cargo + frase (depoimento). */
export function pessoa({ slug, nome, cargo, turma, iniciais, fraseTxt, rotuloTxt = 'Eu estou na chapa porque…' }) {
  return `
    ${fundoEscuro({ luzY: 0.35, semente: 17 })}
    <div class="abs" style="left:80px;top:100px">${rotulo(rotuloTxt)}</div>
    ${circulo({ src: foto(slug), iniciais, x: 540 - 190, y: 200, t: 380 })}
    <div class="abs pf" style="left:0;right:0;top:630px;text-align:center;font-weight:700;font-size:200px;line-height:1;color:${COR.ouro};opacity:.5">“</div>
    <div class="abs cg" style="left:90px;right:90px;top:720px;text-align:center;font-weight:600;font-size:54px;line-height:1.15;color:${COR.papel}">${esc(fraseTxt ?? '')}</div>
    <div class="abs" style="left:0;right:0;top:1120px;text-align:center">
      <div class="pf" style="font-weight:700;font-size:40px;color:${COR.papel}">${esc(nome)}</div>
      <div class="eyebrow" style="font-size:20px;color:${COR.ouroClaro};margin-top:10px">${esc(cargo)}${turma ? ` · Turma ${turma}` : ''}</div>
    </div>`;
}

/** FECHO: último slide, sempre. Medalhão + slogan + @ + CTA. */
export function fecho({ cta = 'Ativa o sininho: todo dia tem novidade.' } = {}) {
  return `
    ${fundoEscuro({ semente: 21 })}
    <div class="abs" style="left:-20px;top:-140px;opacity:.06">${figura({ cor: COR.ouro, w: 1120 })}</div>
    <div class="abs" style="left:0;right:0;top:150px;display:flex;flex-direction:column;align-items:center;text-align:center">
      <div style="position:relative;width:330px;height:330px">
        <div class="abs" style="inset:-28px;border-radius:50%;border:1.5px solid rgba(176,141,87,.3)"></div>
        <div class="abs" style="inset:-14px;border-radius:50%;border:2px solid rgba(176,141,87,.75)"></div>
        ${medalhao({ cor: COR.verde, fundo: COR.papel, w: 330 })}
      </div>
      <div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};margin-top:70px">Gestão</div>
      <div class="pf" style="font-weight:800;font-size:96px;line-height:.95;letter-spacing:-.02em;color:${COR.papel};margin-top:14px">DR. VITAL BRAZIL</div>
      <div style="margin-top:12px">${pincelada({ w: 560, h: 28 })}</div>
      <div class="cg" style="font-weight:600;font-size:52px;line-height:1.12;color:${COR.ouroClaro};margin-top:30px">Mais que uma gestão,<br/>um compromisso com a nossa formação.</div>
      <div style="margin-top:46px">${fio({ w: 110 })}</div>
      <div class="in" style="font-weight:600;font-size:38px;color:${COR.papel};margin-top:36px">${site.instagram.handle}</div>
      <div class="in" style="font-size:24px;color:${COR.salvia};margin-top:12px">${esc(cta)}</div>
    </div>`;
}

/* ------------------------------------------------------------------ stories */

const cabecalhoStory = (claro = false) => `
  <div class="abs" style="left:0;right:0;top:290px;display:flex;flex-direction:column;align-items:center">
    <div style="display:flex;align-items:center;gap:16px">${fio({ w: 60 })}</div>
    <div class="eyebrow" style="font-size:22px;color:${claro ? COR.ouroEscuro : COR.ouroClaro};margin-top:22px">Chapa ao CA de Medicina · FAPI</div>
  </div>`;
const rodapeStory = (claro = false) => `
  <div class="abs" style="left:0;right:0;top:1660px;display:flex;flex-direction:column;align-items:center">
    ${fio({ w: 80 })}
    <div class="in" style="font-weight:600;font-size:32px;color:${claro ? COR.verde : COR.papel};margin-top:22px">${site.instagram.handle}</div>
  </div>`;

export function storyFrase({ texto, destaque, tema = 'escuro', cta }) {
  const claro = tema === 'claro';
  return `
    ${claro ? fundoClaro() : fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.45, semente: 23 })}
    ${cabecalhoStory(claro)}
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:50%;transform:translateY(-50%);text-align:center;font-weight:800;font-size:128px;line-height:1;letter-spacing:-.025em;color:${claro ? COR.verde : COR.papel};text-transform:uppercase;text-wrap:balance">${destacar(texto.toUpperCase(), destaque, { cor: claro ? COR.ouroEscuro : COR.ouroClaro })}</div>
    ${cta ? `<div class="abs eyebrow" style="left:0;right:0;top:1540px;text-align:center;font-size:20px;color:${claro ? COR.ouroEscuro : COR.ouroClaro}">${esc(cta)}</div>` : ''}
    ${rodapeStory(claro)}`;
}

export function storyPessoa({ slug, nome, cargo, turma, iniciais, fraseTxt }) {
  return `
    ${fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.4, semente: 31 })}
    ${cabecalhoStory()}
    ${circulo({ src: foto(slug), iniciais, x: 540 - 230, y: 520, t: 460 })}
    <div class="abs cg" style="left:0;right:0;top:1080px;text-align:center;font-weight:500;font-size:56px;color:${COR.ouroClaro}">Eu estou na chapa porque…</div>
    <div class="abs cg" style="left:100px;right:100px;top:1160px;text-align:center;font-weight:600;font-size:52px;line-height:1.15;color:${COR.papel}">${esc(fraseTxt ?? '')}</div>
    <div class="abs" style="left:0;right:0;top:1470px;text-align:center"><div class="pf" style="font-weight:700;font-size:44px;color:${COR.papel}">${esc(nome)}</div><div class="eyebrow" style="font-size:22px;color:${COR.ouroClaro};margin-top:10px">${esc(cargo)}${turma ? ` · Turma ${turma}` : ''}</div></div>
    ${rodapeStory()}`;
}

/* ----------------------------------------------------------------- montagem */

/**
 * Monta um carrossel (ou story) e grava os PNGs.
 * slides: lista de HTML (cada um um slide). formato: FEED | QUADRADO | STORY.
 * Opções: { pasta, prefixo, panoramico, rodapeNosSlides }
 *   panoramico = true  → fio de ouro em serpente atravessa todos os slides.
 */
export async function montar({ slides, formato = FEED, pasta, prefixo = 'carrossel', panoramico = true, rodapeNosSlides = true }) {
  const { w, h } = formato;
  const n = slides.length;
  const serpente = () => {
    if (!panoramico || n < 2 || formato === STORY) return '';
    const y = h - 110;
    let d = `M 0 ${y}`;
    for (let i = 0; i < n * 2; i++) {
      const x0 = (i * w) / 2;
      const up = i % 2 === 0 ? -34 : 34;
      d += ` C ${x0 + w * 0.17} ${y + up}, ${x0 + w * 0.33} ${y + up}, ${x0 + w / 2} ${y}`;
    }
    const marcos = Array.from({ length: n }, (_, i) => `<div class="abs" style="left:${i * w + w / 2 - 8}px;top:${y - 8}px;width:16px;height:16px;background:${COR.ouro};transform:rotate(45deg)"></div>`).join('');
    return `<svg class="abs" style="left:0;top:0" width="${w * n}" height="${h}"><path d="${d}" stroke="${COR.ouro}" stroke-width="2.4" fill="none" opacity=".85"/></svg>${marcos}`;
  };
  const html = `
    <div style="position:relative;width:${w * n}px;height:${h}px;overflow:hidden;background:${COR.noite}">
      ${slides.map((s, i) => `<div class="abs" style="left:${i * w}px;top:0;width:${w}px;height:${h}px;overflow:hidden">${s}${rodapeNosSlides && formato !== STORY ? rodape(i + 1, n, s.includes('<!--claro-->')) : ''}</div>`).join('')}
      ${serpente()}
      ${grao(0.08)}
    </div>`;
  fs.mkdirSync(pasta, { recursive: true });
  await renderizar({ html, w: w * n, h, recortes: Array.from({ length: n }, (_, i) => ({ x: i * w, y: 0, w, h, arquivo: path.join(pasta, `${prefixo}-${String(i + 1).padStart(2, '0')}.png`) })) });
  if (n > 1 && formato !== STORY) await renderizar({ html, w: w * n, h, saida: path.join(pasta, `_panorama-${prefixo}.png`) });
  return n;
}

/** Atalho para um único story. */
export async function montarStory({ html, pasta, nome }) {
  fs.mkdirSync(pasta, { recursive: true });
  await renderizar({ html: `<div style="position:relative;width:${STORY.w}px;height:${STORY.h}px;overflow:hidden;background:${COR.noite}">${html}${grao(0.09)}</div>`, w: STORY.w, h: STORY.h, saida: path.join(pasta, `${nome}.png`) });
}

/* ======================================================================== */
/* TEMPLATES II · estilos criativos                                         */
/* ======================================================================== */

/** Quatro cantoneiras nos cantos de uma área (moldura leve). */
export const cantoneiras = ({ cor = COR.ouro, t = 100, inset = 40 } = {}) =>
  [[0, 'left', 'top'], [90, 'right', 'top'], [270, 'left', 'bottom'], [180, 'right', 'bottom']]
    .map(([rot, x, y]) => `<div class="abs" style="${x}:${inset}px;${y}:${inset}px">${A.cantoneira({ cor, t, rot })}</div>`)
    .join('');

/** Imagem de qualquer caminho (foto real) como data URI. */
export const fotoLocal = (caminho) => {
  const f = path.isAbsolute(caminho) ? caminho : path.join(RAIZ, caminho);
  const ext = path.extname(f).slice(1).toLowerCase();
  return `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${fs.readFileSync(f).toString('base64')}`;
};

/* --------------------------------------------------------------- carta */

/** CARTA · capa: envelope lacrado sobre fundo escuro e o título em caligrafia. */
export function cartaCapa({ titulo = 'Querido calouro,', sub, para = 'Para: quem está chegando', rotuloTxt = 'Uma carta', tom = 'verde', arraste = 'Arraste para abrir' }) {
  return `
    ${fundoEscuro({ tom, textura: 'folhas', semente: 41, luzY: 0.5 })}
    <div class="abs" style="left:0;right:0;top:100px;display:flex;justify-content:center">${rotulo(rotuloTxt)}</div>
    <div class="abs cg" data-caber="940" style="left:70px;right:70px;top:170px;text-align:center;font-weight:600;font-size:140px;line-height:1;color:${COR.ouroClaro}">${esc(titulo)}</div>
    <div class="abs" style="left:50%;top:400px;transform:translateX(-50%) rotate(-4deg);filter:drop-shadow(0 50px 60px rgba(0,0,0,.6))">${A.envelope({ w: 700, para })}</div>
    ${sub ? `<div class="abs cg" style="left:120px;right:120px;top:1010px;text-align:center;font-weight:500;font-size:42px;line-height:1.2;color:${COR.papel}">${esc(sub)}</div>` : ''}
    ${arraste ? `<div class="abs eyebrow" style="left:0;right:0;top:1180px;text-align:center;font-size:20px;color:${COR.ouroClaro}">${esc(arraste)}</div>` : ''}`;
}

/**
 * CARTA · página: papel com borda dupla, caligrafia (Cormorant itálico), capitular opcional,
 * despedida + assinatura + lacre na última página. Cabem ~2 parágrafos de 220 caracteres por página.
 */
export function carta({ saudacao, paragrafos = [], capitular = false, despedida, assinatura = 'Gestão Dr. Vital Brazil', cumprimento = 'Com carinho,', tom = 'marfim', rotuloTxt = 'CA Medicina · FAPI', corpo = 44 }) {
  const pars = paragrafos
    .map((t, i) => {
      const cap = capitular && i === 0;
      const txt = cap ? `<span class="pf" style="float:left;font-weight:800;font-size:118px;line-height:.82;color:${COR.verde};margin:8px 16px 0 0">${esc(t[0])}</span>${esc(t.slice(1))}` : esc(t);
      return `<p class="cg" style="font-weight:500;font-size:${corpo}px;line-height:1.45;color:${COR.tinta}">${txt}</p>`;
    })
    .join('');
  return `
    ${fundoClaro({ tom, decor: 'nenhum' })}
    <div class="abs" style="inset:56px 56px 96px;border:3px double rgba(30,58,47,.55)"></div>
    <div class="abs" style="inset:66px 66px 106px;border:1px solid rgba(176,141,87,.25)"></div>
    <div class="abs" style="left:66px;right:66px;top:450px;height:1px;background:rgba(15,28,22,.05)"></div>
    <div class="abs" style="left:66px;right:66px;top:900px;height:1px;background:rgba(15,28,22,.05)"></div>
    <div class="abs" style="left:120px;top:112px">${rotulo(rotuloTxt, COR.ouroEscuro, 17)}</div>
    <div class="abs" style="right:116px;top:100px;width:76px;height:76px;border-radius:50%;border:1px solid rgba(122,92,48,.5);display:grid;place-items:center">${medalhao({ cor: COR.verde, w: 64 })}</div>
    <div class="abs" style="left:120px;right:120px;top:${saudacao ? 200 : 190}px;display:flex;flex-direction:column;gap:${corpo * 0.7}px">
      ${saudacao ? `<div class="cg" style="font-weight:600;font-size:86px;line-height:1;color:${COR.verde};margin-bottom:${corpo * 0.5}px">${esc(saudacao)}</div>` : ''}
      ${pars}
      ${despedida ? `<p class="cg" style="font-weight:600;font-size:${corpo * 1.1}px;line-height:1.3;color:${COR.verde};margin-top:${corpo * 0.3}px">${esc(despedida)}</p>` : ''}
    </div>
    ${assinatura && despedida !== undefined ? `
    <div class="abs" style="left:120px;bottom:120px">
      <div class="cg" style="font-weight:500;font-size:34px;color:${COR.tinta2}">${esc(cumprimento)}</div>
      <div class="pf" style="font-weight:700;font-size:36px;color:${COR.verde};margin-top:10px">${esc(assinatura)}</div>
      <div style="margin-top:14px">${fio({ w: 70, cor: COR.ouroEscuro, losango: 9 })}</div>
    </div>
    <div class="abs" style="right:120px;bottom:104px;transform:rotate(8deg);filter:drop-shadow(0 14px 18px rgba(0,0,0,.25))">${A.lacre({ t: 150, cor: COR.ouro, miolo: COR.noite })}</div>` : ''}`;
}

/* -------------------------------------------------------------- gazeta */

/** GAZETA: primeira página de jornal do séc. XIX. Bom para "Você sabia?", fatos e notícias da campanha. */
export function gazeta({ nome = 'Gazeta Vital Brazil', edicao = 'Edição nº 1', data = '', manchete, destaque, lead, colunas = [], ilustracao, legenda, chamada = 'Continua no link da bio', tom = 'papel' }) {
  const texto = colunas.map((t, i) => `<p style="margin:0 0 18px${i === 0 ? '' : ''}">${i === 0 ? `<span class="pf" style="float:left;font-weight:800;font-size:92px;line-height:.8;color:${COR.verde};margin:6px 12px 0 0">${esc(t[0])}</span>${esc(t.slice(1))}` : esc(t)}</p>`).join('');
  return `
    ${fundoClaro({ tom, decor: 'nenhum' })}
    <div class="abs" style="left:80px;right:80px;top:84px">${A.filete({ w: 920, cor: COR.ouroEscuro })}</div>
    <div class="abs eyebrow" style="left:80px;right:80px;top:112px;display:flex;justify-content:space-between;font-size:15px;color:${COR.ouroEscuro};letter-spacing:.26em"><span>${esc(edicao)}</span><span>CA Medicina · FAPI</span><span>${esc(data || site.instagram.handle)}</span></div>
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:146px;text-align:center;font-weight:900;font-size:92px;line-height:1;letter-spacing:.04em;color:${COR.verde};text-transform:uppercase;white-space:nowrap">${esc(nome)}</div>
    <div class="abs" style="left:80px;right:80px;top:262px;border-top:3px solid ${COR.verde};border-bottom:1px solid ${COR.verde};height:7px"></div>
    <div class="abs" style="left:80px;right:80px;top:300px;bottom:150px;display:flex;flex-direction:column;gap:22px">
      <div class="pf" style="font-weight:800;font-size:${tamanhoFrase(manchete, 78)}px;line-height:1.02;letter-spacing:-.015em;color:${COR.tinta};text-wrap:balance">${destacar(manchete, destaque, { cor: COR.ouroEscuro, pincel: false })}</div>
      ${lead ? `<div class="cg" style="font-weight:600;font-size:36px;line-height:1.2;color:${COR.verde};border-left:3px solid ${COR.ouro};padding-left:22px">${esc(lead)}</div>` : ''}
      <div style="display:flex;gap:36px;flex:1;min-height:0">
        ${ilustracao ? `<div style="flex:none;width:330px;display:flex;flex-direction:column;align-items:center;gap:14px;padding:18px;border:1px solid rgba(122,92,48,.45)"><div style="display:grid;place-items:center;flex:1">${ilustracao}</div>${legenda ? `<div class="cg" style="font-weight:600;font-size:22px;line-height:1.2;text-align:center;color:${COR.tinta2}">${esc(legenda)}</div>` : ''}</div>` : ''}
        <div class="in" style="flex:1;font-size:24px;line-height:1.5;color:${COR.tinta};text-align:justify;${ilustracao ? '' : 'column-count:2;column-gap:40px;column-rule:1px solid rgba(122,92,48,.4)'}">${texto}</div>
      </div>
    </div>
    <div class="abs" style="left:80px;right:80px;top:1218px">${A.filete({ w: 920, cor: COR.ouroEscuro, pontos: false })}</div>
    <div class="abs eyebrow" style="left:0;right:0;top:1244px;text-align:center;font-size:16px;color:${COR.ouroEscuro}">${esc(chamada)}</div>`;
}

/* ------------------------------------------------------------- prancha */

/**
 * PRANCHA científica: figuras numeradas com legendas, como num atlas do séc. XIX.
 * figuras: [{ svg, legenda, fig? }] (até 4). Ex.: propostas como "espécimes".
 */
export function prancha({ numero = 'I', titulo, figuras = [], nota, rotuloTxt = 'Prancha', tom = 'papel' }) {
  const n = Math.min(figuras.length, 4);
  const duas = n > 2;
  const cels = figuras.slice(0, 4).map((f, i) => `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:16px;padding:10px">
      <div style="display:grid;place-items:center;height:${duas ? 230 : 320}px">${f.svg}</div>
      <div class="eyebrow" style="font-size:15px;color:${COR.ouroEscuro}">${esc(f.fig ?? `Fig. ${i + 1}`)}</div>
      <div class="cg" style="font-weight:600;font-size:${duas ? 32 : 38}px;line-height:1.15;text-align:center;color:${COR.tinta};max-width:${duas ? 400 : 600}px">${esc(f.legenda)}</div>
    </div>`).join('');
  return `
    ${fundoClaro({ tom, decor: 'nenhum' })}
    <div class="abs" style="inset:48px 48px 96px;border:1px solid rgba(122,92,48,.5)"></div>
    ${[[0, "left", "top", 38], [90, "right", "top", 38], [270, "left", "bottom", 86], [180, "right", "bottom", 86]].map(([rot, x, y, i]) => `<div class="abs" style="${x}:38px;${y}:${i}px">${A.cantoneira({ cor: COR.ouroEscuro, t: 96, rot })}</div>`).join("")}
    <div class="abs eyebrow" style="left:0;right:0;top:112px;text-align:center;font-size:20px;letter-spacing:.42em;color:${COR.ouroEscuro}">${esc(rotuloTxt)} ${esc(numero)}</div>
    ${titulo ? `<div class="abs pf" data-caber="860" style="left:110px;right:110px;top:150px;text-align:center;font-weight:700;font-size:58px;line-height:1.05;color:${COR.verde};text-wrap:balance">${esc(titulo)}</div>` : ''}
    <div class="abs" style="left:0;right:0;top:${titulo ? 262 : 180}px;display:flex;justify-content:center">${A.divisor({ w: 360, cor: COR.ouroEscuro })}</div>
    <div class="abs" style="left:90px;right:90px;top:${titulo ? 330 : 260}px;bottom:${nota ? 230 : 150}px;display:grid;grid-template-columns:${duas ? '1fr 1fr' : '1fr'};grid-auto-rows:1fr;gap:${duas ? 10 : 20}px">${cels}</div>
    ${nota ? `<div class="abs in" style="left:120px;right:120px;top:1150px;text-align:center;font-size:19px;line-height:1.4;color:${COR.tinta2};font-style:italic">${esc(nota)}</div>` : ''}`;
}

/* -------------------------------------------------------------- numero */

/** NÚMERO gigante: "52" + "propostas". estilo: 'vazado' (contorno ouro) | 'cheio'. */
export function numero({ valor, rotuloTxt, texto, destaque, tema = 'escuro', tom, estilo = 'vazado', cabecalho }) {
  const claro = tema === 'claro';
  const ouro = claro ? COR.ouroEscuro : COR.ouro;
  const corTxt = claro ? COR.verde : COR.papel;
  const tam = String(valor).length > 2 ? 420 : 560;
  return `
    ${claro ? fundoClaro({ tom, decor: 'ramos' }) : fundoEscuro({ tom, textura: 'raios', semente: 43, luzY: 0.3 })}
    ${cabecalho ? `<div class="abs" style="left:0;right:0;top:110px;display:flex;justify-content:center">${rotulo(cabecalho, claro ? COR.ouroEscuro : COR.ouroClaro)}</div>` : `<div class="abs" style="left:0;right:0;top:120px;display:flex;justify-content:center">${A.asterismo({ cor: ouro, t: 44 })}</div>`}
    <div class="abs pf" style="left:0;right:0;top:${tam === 560 ? 200 : 300}px;text-align:center;font-weight:800;font-size:${tam}px;line-height:.9;letter-spacing:-.04em;${estilo === 'vazado' ? `color:transparent;-webkit-text-stroke:4px ${ouro}` : `color:${corTxt}`}">${esc(valor)}</div>
    <div class="abs pf" style="left:80px;right:80px;top:${tam === 560 ? 790 : 720}px;text-align:center;font-weight:800;font-size:${rotuloTxt.length > 30 ? 64 : rotuloTxt.length > 16 ? 78 : 96}px;line-height:1;letter-spacing:-.02em;color:${corTxt};text-transform:uppercase;text-wrap:balance">${destacar(rotuloTxt.toUpperCase(), destaque, { cor: claro ? COR.ouroEscuro : COR.ouroClaro, pincel: false })}</div>
    ${texto ? `<div class="abs cg" style="left:140px;right:140px;top:1070px;text-align:center;font-weight:600;font-size:36px;line-height:1.2;color:${claro ? COR.tinta2 : COR.ouroClaro}">${esc(texto)}</div>` : ''}`;
}

/* -------------------------------------------------------- linha do tempo */

/** LINHA DO TEMPO: até 5 marcos ({ ano, titulo, texto }) num fio vertical com losangos. */
export function linhaDoTempo({ rotuloTxt = 'Linha do tempo', titulo, marcos = [], tema = 'escuro', tom }) {
  const claro = tema === 'claro';
  const ms = marcos.slice(0, 5);
  const top = titulo ? 400 : 260;
  const passo = ms.length > 1 ? (1180 - top) / (ms.length - 1) : 0;
  const x = 320;
  const ouro = claro ? COR.ouroEscuro : COR.ouro;
  const path = `M ${x} ${top - 60} ${ms.map((_, i) => `L ${x + (i % 2 ? 6 : -6)} ${top + i * passo}`).join(' ')} L ${x} ${1240}`;
  return `
    ${claro ? fundoClaro({ tom, decor: 'nenhum' }) : fundoEscuro({ tom, textura: 'vinheta', semente: 47, folhas: false })}
    <div class="abs" style="left:80px;top:100px">${rotulo(rotuloTxt, claro ? COR.ouroEscuro : COR.ouroClaro)}</div>
    ${titulo ? `<div class="abs pf" data-caber="920" style="left:80px;right:80px;top:160px;font-weight:800;font-size:76px;line-height:1;color:${claro ? COR.verde : COR.papel};text-transform:uppercase">${esc(titulo)}</div>` : ''}
    <svg class="abs" style="left:0;top:0" width="1080" height="1350"><path d="${path}" stroke="${ouro}" stroke-width="1.6" fill="none" opacity=".6"/></svg>
    ${ms.map((m, i) => {
      const y = top + i * passo;
      return `
      <div class="abs" style="left:${x - 9}px;top:${y - 9}px;width:18px;height:18px;background:${ouro};transform:rotate(45deg);box-shadow:0 0 0 6px ${claro ? TONS.claro[tom] ?? COR.papel : 'rgba(18,36,28,1)'}"></div>
      <div class="abs pf" style="left:80px;width:200px;top:${y - 34}px;text-align:right;font-weight:700;font-size:${String(m.ano).length > 4 ? 40 : 60}px;line-height:1;color:transparent;-webkit-text-stroke:1.5px ${ouro}">${esc(m.ano)}</div>
      <div class="abs" style="left:${x + 50}px;right:80px;top:${y - 26}px">
        <div class="pf" style="font-weight:700;font-size:36px;line-height:1.12;color:${claro ? COR.verde : COR.papel}">${esc(m.titulo)}</div>
        ${m.texto ? `<div class="in" style="font-size:22px;line-height:1.4;color:${claro ? COR.tinta2 : 'rgba(244,240,230,.68)'};margin-top:8px">${esc(m.texto)}</div>` : ''}
      </div>`;
    }).join('')}`;
}

/* ------------------------------------------------------------- citação */

/** CITAÇÃO: frase longa em Cormorant itálico com aspas monumentais e autoria. Só frases oficiais/aprovadas. */
export function citacao({ texto, autor, fonte, tema = 'escuro', tom, decor = 'trepadeira' }) {
  const claro = tema === 'claro';
  return `
    ${claro ? fundoClaro({ tom, decor }) : fundoEscuro({ tom, textura: 'oliveira', semente: 53 })}
    <div class="abs pf" style="left:90px;top:60px;font-weight:700;font-size:360px;line-height:1;color:${claro ? COR.ouroEscuro : COR.ouro};opacity:.35">“</div>
    <div class="abs cg" style="left:140px;right:120px;top:50%;transform:translateY(-50%);font-weight:600;font-size:${tamanhoFrase(texto, 96)}px;line-height:1.15;color:${claro ? COR.verde : COR.papel};text-wrap:balance">${esc(texto)}</div>
    <div class="abs" style="left:140px;top:1120px;display:flex;align-items:center;gap:22px">
      ${fio({ w: 60, cor: claro ? COR.ouroEscuro : COR.ouro, losango: 9 })}
      <div><div class="eyebrow" style="font-size:19px;color:${claro ? COR.ouroEscuro : COR.ouroClaro}">${esc(autor ?? site.nome)}</div>${fonte ? `<div class="in" style="font-size:20px;color:${claro ? COR.tinta2 : COR.salvia};margin-top:6px">${esc(fonte)}</div>` : ''}</div>
    </div>`;
}

/* ------------------------------------------------------------- convite */

/** CONVITE / AGENDA: data gigante, horário, local, quem vota e carimbo. Valores vazios viram "em breve". */
export function convite({ rotuloTxt = 'Eleição do CA de Medicina', titulo = 'Sua voz vira voto', dia, mes, hora, local, quemVota, cta = 'Ativa o lembrete', carimboTxt = 'Vote', tema = 'claro', tom }) {
  const claro = tema === 'claro';
  const ouro = claro ? COR.ouroEscuro : COR.ouro;
  const corTxt = claro ? COR.verde : COR.papel;
  const corSec = claro ? COR.tinta2 : 'rgba(244,240,230,.75)';
  const linha = (ic, t) => `<div style="display:flex;align-items:center;gap:22px"><div style="flex:none">${anel(icone(ic, { size: 26, stroke: 1.3, cor: ouro }), 64, ouro)}</div><div class="in" style="font-size:30px;line-height:1.25;color:${corSec}">${esc(t)}</div></div>`;
  return `
    ${claro ? fundoClaro({ tom, decor: 'moldura' }) : fundoEscuro({ tom, textura: 'raios', semente: 59 })}
    ${claro ? '' : cantoneiras({ cor: COR.ouro, t: 96, inset: 40 })}
    <div class="abs" style="left:0;right:0;top:120px;display:flex;justify-content:center">${rotulo(rotuloTxt, claro ? COR.ouroEscuro : COR.ouroClaro)}</div>
    <div class="abs pf" data-caber="860" style="left:110px;right:110px;top:176px;text-align:center;font-weight:800;font-size:74px;line-height:1;color:${corTxt};text-transform:uppercase;white-space:nowrap">${esc(titulo)}</div>
    <div class="abs pf" style="left:0;right:0;top:290px;text-align:center;font-weight:800;font-size:380px;line-height:.9;letter-spacing:-.05em;color:${corTxt}">${esc(dia)}</div>
    <div class="abs eyebrow" style="left:0;right:0;top:650px;text-align:center;font-size:34px;letter-spacing:.5em;color:${ouro}">${esc(mes)}</div>
    <div class="abs" style="left:0;right:0;top:730px;display:flex;justify-content:center">${A.divisor({ w: 420, cor: ouro })}</div>
    <div class="abs" style="left:180px;right:120px;top:820px;display:flex;flex-direction:column;gap:26px">
      ${linha('Clock', hora || 'Horário: em breve')}
      ${linha('MapPin', local || 'Local: em breve')}
      ${linha('UsersRound', quemVota || 'Quem vota: em breve')}
    </div>
    <div class="abs" style="right:90px;top:1040px">${A.carimbo({ texto: carimboTxt, cor: ouro, w: 260, h: 96, px: 44 })}</div>
    <div class="abs eyebrow" style="left:0;right:0;top:1190px;text-align:center;font-size:19px;color:${claro ? COR.ouroEscuro : COR.ouroClaro}">${esc(cta)}</div>`;
}

/* ----------------------------------------------------------- checklist */

/** CHECKLIST: até 6 itens ({ titulo, texto?, feito? }). Para 100 dias, prestação de contas, "o que já fizemos". */
export function checklist({ rotuloTxt, titulo, itens = [], tema = 'claro', tom, nota }) {
  const claro = tema === 'claro';
  const ouro = claro ? COR.ouroEscuro : COR.ouro;
  const corTxt = claro ? COR.tinta : COR.papel;
  return `
    ${claro ? fundoClaro({ tom, decor: 'ramos' }) : fundoEscuro({ tom, semente: 61 })}
    <div class="abs" style="left:80px;top:100px">${rotulo(rotuloTxt, claro ? COR.ouroEscuro : COR.ouroClaro)}</div>
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:160px;font-weight:800;font-size:76px;line-height:1;color:${claro ? COR.verde : COR.papel};text-transform:uppercase;text-wrap:balance">${esc(titulo)}</div>
    <div class="abs" style="left:80px;right:80px;top:${titulo.length > 24 ? 420 : 340}px;display:flex;flex-direction:column">
      ${itens.slice(0, 6).map((it) => `<div style="display:flex;align-items:flex-start;gap:26px;padding:22px 0;border-bottom:1px solid ${claro ? 'rgba(122,92,48,.3)' : 'rgba(176,141,87,.22)'}">
        <div style="flex:none;width:50px;height:50px;border:2px solid ${ouro};display:grid;place-items:center;margin-top:2px;${it.feito ? `background:${ouro}` : ''}">${it.feito ? icone('Check', { size: 30, stroke: 2.2, cor: claro ? COR.papel : COR.noite }) : ''}</div>
        <div><div class="pf" style="font-weight:700;font-size:34px;line-height:1.15;color:${corTxt}">${esc(it.titulo ?? it)}</div>${it.texto ? `<div class="in" style="font-size:23px;line-height:1.4;color:${claro ? COR.tinta2 : 'rgba(244,240,230,.7)'};margin-top:6px">${esc(it.texto)}</div>` : ''}</div>
      </div>`).join('')}
    </div>
    ${nota ? `<div class="abs in" style="left:80px;right:80px;top:1190px;font-size:20px;color:${claro ? COR.tinta2 : COR.salvia};font-style:italic">${esc(nota)}</div>` : ''}`;
}

/* ---------------------------------------------------------- dicionário */

/** DICIONÁRIO: verbete com palavra, sílabas, classe e definições numeradas. */
export function dicionario({ palavra, silabas, classe = 's.f.', definicoes = [], exemplo, rotuloTxt = 'Dicionário da chapa', tema = 'claro', tom }) {
  const claro = tema === 'claro';
  const ouro = claro ? COR.ouroEscuro : COR.ouroClaro;
  return `
    ${claro ? fundoClaro({ tom, decor: 'nenhum' }) : fundoEscuro({ tom, textura: 'vinheta', semente: 67, folhas: false })}
    <div class="abs" style="left:80px;top:100px">${rotulo(rotuloTxt, ouro)}</div>
    <div class="abs pf" data-caber="920" style="left:80px;right:80px;top:170px;font-weight:800;font-size:150px;line-height:1;letter-spacing:-.03em;color:${claro ? COR.verde : COR.papel}">${esc(palavra)}</div>
    <div class="abs" style="left:80px;right:80px;top:360px;display:flex;align-items:baseline;gap:22px"><span class="in" style="font-size:30px;letter-spacing:.08em;color:${claro ? COR.tinta2 : COR.salvia}">${esc(silabas ?? '')}</span><span class="cg" style="font-weight:600;font-size:34px;color:${ouro}">${esc(classe)}</span></div>
    <div class="abs" style="left:80px;right:80px;top:430px">${A.filete({ w: 920, cor: ouro })}</div>
    <div class="abs" style="left:80px;right:80px;top:490px;display:flex;flex-direction:column;gap:30px">
      ${definicoes.slice(0, 4).map((d, i) => `<div style="display:flex;gap:24px;align-items:flex-start"><span class="pf" style="flex:none;font-weight:700;font-size:40px;line-height:1.1;color:${ouro}">${i + 1}.</span><span class="in" style="font-size:33px;line-height:1.4;color:${claro ? COR.tinta : COR.papel}">${esc(d)}</span></div>`).join('')}
    </div>
    ${exemplo ? `<div class="abs cg" style="left:80px;right:80px;top:1060px;font-weight:600;font-size:36px;line-height:1.25;color:${claro ? COR.verde : COR.ouroClaro}"><span class="eyebrow" style="font-size:16px;color:${ouro};margin-right:14px">Ex.</span>${esc(exemplo)}</div>` : ''}
    <div class="abs" style="left:0;right:0;top:1200px;display:flex;justify-content:center">${A.asterismo({ cor: ouro, t: 40 })}</div>`;
}

/* ----------------------------------------------------------- prescrição */

/** RECEITUÁRIO: "Rx" + itens com posologia ({ nome, posologia }). Leve, bem-humorado, sem prometer o que não está no programa. */
export function prescricao({ para = 'Para: todo estudante de medicina', itens = [], assinatura = 'Gestão Dr. Vital Brazil', rotuloTxt = 'Receituário', tom = 'marfim' }) {
  return `
    ${fundoClaro({ tom, decor: 'nenhum' })}
    <div class="abs" style="left:80px;top:84px">${A.logoHorizontal({ cor: COR.verde, ouro: COR.ouroEscuro, h: 84 })}</div>
    <div class="abs eyebrow" style="right:80px;top:112px;font-size:16px;color:${COR.ouroEscuro}">${esc(rotuloTxt)}</div>
    <div class="abs" style="left:80px;right:80px;top:200px">${A.filete({ w: 920, cor: COR.ouroEscuro, pontos: false })}</div>
    <div class="abs pf" style="left:80px;top:230px;font-weight:800;font-style:italic;font-size:200px;line-height:1;color:${COR.ouro};opacity:.9">R<span style="font-size:.55em;vertical-align:-.25em;margin-left:-.08em">x</span></div>
    <div class="abs cg" style="left:360px;right:80px;top:300px;font-weight:600;font-size:40px;line-height:1.2;color:${COR.tinta}">${esc(para)}</div>
    <div class="abs" style="left:80px;right:80px;top:480px;display:flex;flex-direction:column;gap:28px">
      ${itens.slice(0, 5).map((it, i) => `<div style="display:flex;gap:22px;align-items:flex-start;border-bottom:1px dotted rgba(122,92,48,.5);padding-bottom:20px">
        <span class="pf" style="flex:none;font-weight:700;font-size:40px;line-height:1.1;color:${COR.ouroEscuro};width:60px">${i + 1}.</span>
        <div><div class="pf" style="font-weight:700;font-size:38px;line-height:1.15;color:${COR.verde}">${esc(it.nome)}</div><div class="in" style="font-size:25px;line-height:1.4;color:${COR.tinta2};margin-top:6px">${esc(it.posologia ?? '')}</div></div>
      </div>`).join('')}
    </div>
    <div class="abs" style="left:80px;bottom:120px"><div style="width:420px;border-top:1.5px solid ${COR.verde};padding-top:12px"><div class="pf" style="font-weight:700;font-size:28px;color:${COR.verde}">${esc(assinatura)}</div><div class="eyebrow" style="font-size:14px;color:${COR.ouroEscuro};margin-top:6px">CA Medicina · FAPI</div></div></div>
    <div class="abs" style="right:100px;bottom:96px">${A.carimbo({ texto: 'Uso contínuo', cor: COR.ouroEscuro, w: 330, h: 90, px: 30, rot: -6 })}</div>`;
}

/* ------------------------------------------------------------- mosaico */

/** MOSAICO: grade de retratos circulares (até 12), nome abaixo. membros: [{ slug, nome, iniciais, cargo? }]. */
export function mosaico({ rotuloTxt, titulo, membros = [], tom, cta }) {
  const ms = membros.slice(0, 12);
  const cols = ms.length <= 4 ? ms.length : ms.length <= 6 ? 3 : 4;
  const t = cols <= 3 ? 230 : 170;
  const colW = 920 / cols;
  const rows = Math.ceil(ms.length / cols);
  const rowH = t + 110;
  const top = titulo ? 340 : 250;
  return `
    ${fundoEscuro({ tom, semente: 71, luzY: 0.55 })}
    <div class="abs" style="left:80px;top:100px">${rotulo(rotuloTxt ?? 'Quem faz')}</div>
    ${titulo ? `<div class="abs pf" data-caber="920" style="left:80px;right:80px;top:160px;font-weight:800;font-size:72px;line-height:1;color:${COR.papel};text-transform:uppercase;text-wrap:balance">${esc(titulo)}</div>` : ''}
    ${ms.map((m, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const x = 80 + c * colW + colW / 2 - t / 2;
      const y = top + r * rowH + (rows * rowH < 900 ? (900 - rows * rowH) / 2 : 0);
      return `${circulo({ src: foto(m.slug), iniciais: m.iniciais, x, y, t })}
        <div class="abs" style="left:${80 + c * colW}px;width:${colW}px;top:${y + t + 18}px;text-align:center"><div class="in" style="font-weight:600;font-size:${cols <= 3 ? 24 : 20}px;color:${COR.papel}">${esc(m.nome)}</div>${m.cargo ? `<div class="eyebrow" style="font-size:${cols <= 3 ? 13 : 11}px;letter-spacing:.2em;color:${COR.ouroClaro};margin-top:4px;line-height:1.3">${esc(m.cargo)}</div>` : ''}</div>`;
    }).join('')}
    ${cta ? `<div class="abs eyebrow" style="left:0;right:0;top:1200px;text-align:center;font-size:19px;color:${COR.ouroClaro}">${esc(cta)}</div>` : ''}`;
}

/* -------------------------------------------------------- foto moldura */

/** FOTO com moldura dupla e cantoneiras: para fotos reais (bastidores, eventos). `src` = fotoLocal('caminho.jpg'). */
export function fotoMoldura({ src, legenda, rotuloTxt, forma = 'retangulo', pos = '50% 50%', tema = 'escuro', tom }) {
  const claro = tema === 'claro';
  const ouro = claro ? COR.ouroEscuro : COR.ouro;
  const r = forma === 'arco' ? '410px 410px 0 0' : '0';
  return `
    ${claro ? fundoClaro({ tom, decor: 'nenhum' }) : fundoEscuro({ tom, textura: 'vinheta', semente: 73, folhas: false })}
    ${rotuloTxt ? `<div class="abs" style="left:0;right:0;top:96px;display:flex;justify-content:center">${rotulo(rotuloTxt, claro ? COR.ouroEscuro : COR.ouroClaro)}</div>` : ''}
    <div class="abs" style="left:130px;top:160px;width:820px;height:880px">
      <div class="abs" style="inset:-24px;border:1px solid ${ouro};opacity:.35;border-radius:${forma === 'arco' ? '434px 434px 0 0' : '0'}"></div>
      <div class="abs" style="inset:-11px;border:2px solid ${ouro};opacity:.8;border-radius:${forma === 'arco' ? '421px 421px 0 0' : '0'}"></div>
      ${forma === 'arco' ? '' : cantoneiras({ cor: ouro, t: 90, inset: -42 })}
      <div class="abs" style="inset:0;overflow:hidden;border-radius:${r};box-shadow:0 60px 100px -40px rgba(0,0,0,.8)"><img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:${pos};display:block"/>${grao(0.12)}</div>
    </div>
    ${legenda ? `<div class="abs cg" style="left:120px;right:120px;top:1110px;text-align:center;font-weight:600;font-size:38px;line-height:1.2;color:${claro ? COR.verde : COR.papel}">${esc(legenda)}</div>` : ''}`;
}

/* ----------------------------------------------------------- telegrama */

/** TELEGRAMA: aviso urgente em CAIXA ALTA com STOP. linhas: frases curtas. */
export function telegrama({ de = 'Gestão Dr. Vital Brazil', para = 'Todo estudante de medicina', linhas = [], data = '', carimboTxt = 'Urgente', tom = 'areia' }) {
  const corpo = linhas.map((l) => esc(l.toUpperCase())).join(` <span style="color:${COR.ouroEscuro};font-weight:800">STOP</span> `) + ` <span style="color:${COR.ouroEscuro};font-weight:800">STOP</span>`;
  return `
    ${fundoClaro({ tom, decor: 'nenhum' })}
    <div class="abs" style="inset:48px 48px 96px;border:1px solid rgba(30,58,47,.5)"></div><div class="abs" style="inset:58px 58px 106px;border:1px solid rgba(30,58,47,.2)"></div>
    <div class="abs pf" style="left:0;right:0;top:110px;text-align:center;font-weight:900;font-size:92px;line-height:1;letter-spacing:.14em;color:${COR.verde}">TELEGRAMA</div>
    <div class="abs" style="left:100px;right:100px;top:230px">${A.filete({ w: 880, cor: COR.verde })}</div>
    <div class="abs" style="left:100px;right:100px;top:280px;display:grid;grid-template-columns:1fr 1fr;gap:16px 40px">
      ${[['De', de], ['Para', para], ['Data', data || 'Hoje'], ['Via', site.instagram.handle]].map(([k, v]) => `<div style="border-bottom:1px dotted rgba(30,58,47,.45);padding-bottom:10px"><span class="eyebrow" style="font-size:14px;color:${COR.ouroEscuro};margin-right:14px">${k}</span><span class="in" style="font-size:22px;color:${COR.tinta}">${esc(v)}</span></div>`).join('')}
    </div>
    <div class="abs in" style="left:100px;right:100px;top:460px;font-weight:600;font-size:36px;line-height:1.65;letter-spacing:.06em;color:${COR.tinta}">${corpo}</div>
    <div class="abs" style="right:90px;bottom:120px">${A.carimbo({ texto: carimboTxt, cor: COR.ouroEscuro, w: 300, h: 100, px: 40, rot: -10 })}</div>
    <div class="abs" style="left:100px;bottom:130px">${A.logoAssinatura({ cor: COR.ouroEscuro, w: 360 })}</div>`;
}

/* ---------------------------------------------------------- stories II */

const cabecalhoStory2 = (claro = false) => `
  <div class="abs" style="left:0;right:0;top:290px;display:flex;flex-direction:column;align-items:center">
    ${fio({ w: 60 })}
    <div class="eyebrow" style="font-size:22px;color:${claro ? COR.ouroEscuro : COR.ouroClaro};margin-top:22px">Chapa ao CA de Medicina · FAPI</div>
  </div>`;
const rodapeStory2 = (claro = false) => `
  <div class="abs" style="left:0;right:0;top:1660px;display:flex;flex-direction:column;align-items:center">
    ${fio({ w: 80 })}
    <div class="in" style="font-weight:600;font-size:32px;color:${claro ? COR.verde : COR.papel};margin-top:22px">${site.instagram.handle}</div>
  </div>`;

/** STORY contagem regressiva: "FALTAM 7 DIAS". */
export function storyContagem({ dias, texto = 'para a eleição do CA', cta = 'Ativa o lembrete ↓', tom }) {
  const um = Number(dias) === 1;
  return `
    ${fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.42, semente: 77, tom, textura: 'raios' })}
    ${cabecalhoStory2()}
    <div class="abs eyebrow" style="left:0;right:0;top:520px;text-align:center;font-size:34px;letter-spacing:.5em;color:${COR.ouroClaro}">${um ? 'Falta' : 'Faltam'}</div>
    <div class="abs pf" style="left:0;right:0;top:500px;text-align:center;font-weight:800;font-size:${String(dias).length > 1 ? 480 : 520}px;line-height:.9;letter-spacing:-.05em;color:${COR.papel}">${esc(dias)}</div>
    <div class="abs pf" style="left:0;right:0;top:1140px;text-align:center;font-weight:800;font-size:110px;line-height:1;letter-spacing:.06em;color:transparent;-webkit-text-stroke:3px ${COR.ouro}">${um ? 'DIA' : 'DIAS'}</div>
    <div class="abs" style="left:0;right:0;top:1268px;display:flex;justify-content:center">${pincelada({ w: 420, h: 26 })}</div>
    <div class="abs cg" style="left:100px;right:100px;top:1312px;text-align:center;font-weight:600;font-size:52px;line-height:1.1;color:${COR.ouroClaro}">${esc(texto)}</div>
    <div class="abs eyebrow" style="left:0;right:0;top:1540px;text-align:center;font-size:20px;color:${COR.ouroClaro}">${esc(cta)}</div>
    ${rodapeStory2()}`;
}

/** STORY enquete: pergunta em cima e espaço com duas opções desenhadas (cole a figurinha de enquete por cima). */
export function storyEnquete({ pergunta, opcoes = [], rotuloTxt = 'Enquete', tema = 'escuro', tom, nota = 'Toque para votar' }) {
  const claro = tema === 'claro';
  const ouro = claro ? COR.ouroEscuro : COR.ouro;
  return `
    ${claro ? fundoClaro({ tom, w: STORY.w, h: STORY.h, decor: 'ramos' }) : fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.35, semente: 79, tom })}
    ${cabecalhoStory2(claro)}
    <div class="abs" style="left:0;right:0;top:470px;display:flex;justify-content:center">${rotulo(rotuloTxt, claro ? COR.ouroEscuro : COR.ouroClaro)}</div>
    <div class="abs pf" data-caber="900" style="left:90px;right:90px;top:540px;text-align:center;font-weight:800;font-size:${tamanhoFrase(pergunta, 96)}px;line-height:1.02;color:${claro ? COR.verde : COR.papel};text-wrap:balance">${esc(pergunta)}</div>
    <div class="abs" style="left:140px;right:140px;top:1000px;display:flex;flex-direction:column;gap:22px">
      ${opcoes.slice(0, 4).map((o) => `<div class="in" style="height:96px;border:2px solid ${ouro};border-radius:48px;display:grid;place-items:center;font-weight:600;font-size:34px;color:${claro ? COR.verde : COR.papel}">${esc(o)}</div>`).join('')}
    </div>
    <div class="abs eyebrow" style="left:0;right:0;top:1540px;text-align:center;font-size:20px;color:${claro ? COR.ouroEscuro : COR.ouroClaro}">${esc(nota)}</div>
    ${rodapeStory2(claro)}`;
}

/** STORY quiz "Você sabia?": pergunta grande e, se `revelar`, a resposta num cartão de papel. */
export function storyQuiz({ pergunta, resposta, rotuloTxt = 'Você sabia?', revelar = true, tom }) {
  return `
    ${fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.35, semente: 83, tom, textura: 'vinheta', folhas: false })}
    <div class="abs pf" style="left:0;right:0;top:300px;text-align:center;font-weight:800;font-size:900px;line-height:1;color:${COR.ouro};opacity:.07">?</div>
    ${cabecalhoStory2()}
    <div class="abs" style="left:0;right:0;top:470px;display:flex;justify-content:center">${rotulo(rotuloTxt)}</div>
    <div class="abs pf" data-caber="900" style="left:90px;right:90px;top:560px;text-align:center;font-weight:800;font-size:${tamanhoFrase(pergunta, 92)}px;line-height:1.02;color:${COR.papel};text-wrap:balance">${esc(pergunta)}</div>
    ${revelar ? `<div class="abs" style="left:110px;right:110px;top:1080px;background:${COR.papel};padding:44px 50px;box-shadow:0 40px 80px -30px rgba(0,0,0,.8)"><div class="eyebrow" style="font-size:16px;color:${COR.ouroEscuro}">Resposta</div><div class="cg" style="font-weight:600;font-size:40px;line-height:1.2;color:${COR.verde};margin-top:14px">${esc(resposta ?? '')}</div></div>` : `<div class="abs eyebrow" style="left:0;right:0;top:1180px;text-align:center;font-size:22px;color:${COR.ouroClaro}">Responde na figurinha ↓</div>`}
    ${rodapeStory2()}`;
}

/** STORY carta: envelope lacrado + título em caligrafia + trecho. */
export function storyCarta({ titulo = 'Querido calouro,', trecho, cta = 'Lê a carta inteira no link ↓', tom = 'verde' }) {
  return `
    ${fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.5, semente: 89, tom, textura: 'folhas' })}
    ${cabecalhoStory2()}
    <div class="abs cg" data-caber="920" style="left:80px;right:80px;top:430px;text-align:center;font-weight:600;font-size:128px;line-height:1;color:${COR.ouroClaro}">${esc(titulo)}</div>
    <div class="abs" style="left:50%;top:620px;transform:translateX(-50%) rotate(-3deg);filter:drop-shadow(0 50px 60px rgba(0,0,0,.6))">${A.envelope({ w: 640 })}</div>
    ${trecho ? `<div class="abs cg" style="left:110px;right:110px;top:1130px;text-align:center;font-weight:500;font-size:46px;line-height:1.2;color:${COR.papel}">${esc(trecho)}</div>` : ''}
    <div class="abs eyebrow" style="left:0;right:0;top:1540px;text-align:center;font-size:20px;color:${COR.ouroClaro}">${esc(cta)}</div>
    ${rodapeStory2()}`;
}

/** STORY agenda: data grande + hora + local (eleição, evento). */
export function storyAgenda({ rotuloTxt = 'Eleição do CA de Medicina', dia, mes, hora, local, titulo = 'Sua voz vira voto', cta = 'Ativa o lembrete ↓', tom }) {
  const linha = (ic, t) => `<div style="display:flex;align-items:center;gap:22px;justify-content:center"><div style="flex:none">${anel(icone(ic, { size: 24, stroke: 1.3, cor: COR.ouro }), 58, COR.ouro)}</div><div class="in" style="font-size:32px;color:rgba(244,240,230,.85)">${esc(t)}</div></div>`;
  return `
    ${fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.4, semente: 97, tom, textura: 'raios' })}
    ${cantoneiras({ cor: COR.ouro, t: 90, inset: 60 })}
    ${cabecalhoStory2()}
    <div class="abs" style="left:0;right:0;top:470px;display:flex;justify-content:center">${rotulo(rotuloTxt)}</div>
    <div class="abs pf" style="left:0;right:0;top:530px;text-align:center;font-weight:800;font-size:460px;line-height:.9;letter-spacing:-.05em;color:${COR.papel}">${esc(dia)}</div>
    <div class="abs eyebrow" style="left:0;right:0;top:960px;text-align:center;font-size:36px;letter-spacing:.5em;color:${COR.ouroClaro}">${esc(mes)}</div>
    <div class="abs" style="left:0;right:0;top:1040px;display:flex;justify-content:center">${A.divisor({ w: 380 })}</div>
    <div class="abs pf" data-caber="880" style="left:100px;right:100px;top:1110px;text-align:center;font-weight:800;font-size:66px;line-height:1;color:${COR.papel};text-transform:uppercase;white-space:nowrap">${esc(titulo)}</div>
    <div class="abs" style="left:100px;right:100px;top:1230px;display:flex;flex-direction:column;gap:18px">${linha('Clock', hora || 'Horário em breve')}${linha('MapPin', local || 'Local em breve')}</div>
    <div class="abs eyebrow" style="left:0;right:0;top:1540px;text-align:center;font-size:20px;color:${COR.ouroClaro}">${esc(cta)}</div>
    ${rodapeStory2()}`;
}

/** STORY número: "52 / propostas". */
export function storyNumero({ valor, rotuloTxt, texto, cta, tom }) {
  return `
    ${fundoEscuro({ w: STORY.w, h: STORY.h, luzY: 0.42, semente: 101, tom, textura: 'folhas' })}
    ${cabecalhoStory2()}
    <div class="abs pf" style="left:0;right:0;top:500px;text-align:center;font-weight:800;font-size:${String(valor).length > 2 ? 440 : 560}px;line-height:.9;letter-spacing:-.05em;color:transparent;-webkit-text-stroke:4px ${COR.ouro}">${esc(valor)}</div>
    <div class="abs pf" data-caber="900" style="left:90px;right:90px;top:1060px;text-align:center;font-weight:800;font-size:100px;line-height:1;color:${COR.papel};text-transform:uppercase">${esc(rotuloTxt)}</div>
    ${texto ? `<div class="abs cg" style="left:120px;right:120px;top:1210px;text-align:center;font-weight:600;font-size:46px;line-height:1.15;color:${COR.ouroClaro}">${esc(texto)}</div>` : ''}
    ${cta ? `<div class="abs eyebrow" style="left:0;right:0;top:1540px;text-align:center;font-size:20px;color:${COR.ouroClaro}">${esc(cta)}</div>` : ''}
    ${rodapeStory2()}`;
}

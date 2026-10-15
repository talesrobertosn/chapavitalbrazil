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
 *   storyFrase / storyContagem / storyPessoa
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, anel, figura, fio, folha, grao, imagem, losango, medalhao, pincelada, poeira, renderizar } from './marca.mjs';
import { icone } from './icones.mjs';
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
  escuro: { noite: [COR.noite, COR.noite2], verde: [COR.verde, COR.noite], musgo: ['#2B4A3C', COR.verde] },
  claro: { papel: COR.papel, marfim: '#F7F2E4', areia: '#E9E1CE' },
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
        ? `<span style="position:relative;display:inline-block;color:${cor};font-style:italic">${esc(w)}${pincel ? `<span class="abs" style="left:-4%;right:-4%;bottom:-.14em;height:.24em">${pincelada({ w: 300, h: 22, estilo: 'width:100%;height:100%' })}</span>` : ''}</span>`
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
export const fundoEscuro = ({ w = FEED.w, h = FEED.h, luzX = 0.5, luzY = 0.42, semente = 7, folhas = true, tom = 'noite' } = {}) => {
  const [a, b] = TONS.escuro[tom] ?? TONS.escuro.noite;
  return `
  <div class="abs" style="inset:0;background:radial-gradient(${w * 0.7}px ${h * 0.5}px at ${luzX * 100}% ${luzY * 100}%, rgba(40,74,60,.9), rgba(40,74,60,0)),linear-gradient(180deg,${a},${b})"></div>
  ${folhas ? `<div class="abs" style="left:-110px;bottom:-120px">${folha({ w: 420, op: 0.18 })}</div><div class="abs" style="right:-120px;top:-90px">${folha({ w: 380, op: 0.12, flip: true })}</div>` : ''}
  ${poeira({ w, h, n: Math.round((w * h) / 9000), semente })}`;
};

/** Fundo de papel com granulação e folhagem verde. */
export const fundoClaro = ({ folhas = true, tom = 'papel' } = {}) => `
  <!--claro-->
  <div class="abs" style="inset:0;background:${TONS.claro[tom] ?? COR.papel}"></div>
  ${grao(0.16, true)}
  ${folhas ? `<div class="abs" style="right:-80px;bottom:60px">${folha({ cor: COR.verde, w: 340, op: 0.1, flip: true })}</div><div class="abs" style="left:-90px;top:-100px">${folha({ cor: COR.verde, w: 300, op: 0.07 })}</div>` : ''}`;

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
  return `
    ${fundoEscuro({ luzX: 0.3, semente: 3, tom })}
    ${retrato ? arco({ src: RETRATO(), x: 560, y: 470, w: 520, h: 760, pos: '58% 12%' }) : ''}
    <div class="abs" style="left:80px;top:96px">${rotulo(rotuloTxt)}</div>
    <div class="abs pf" data-caber="${retrato ? 640 : 920}" style="left:72px;top:150px;font-weight:800;font-size:150px;line-height:.95;letter-spacing:-.03em;color:${COR.papel};text-transform:uppercase;width:${retrato ? 660 : 940}px;text-wrap:balance">${destacar(frase.toUpperCase(), destaque, { pincel: false })}</div>
    <div class="abs" style="left:78px;top:${retrato ? 520 : 560}px">${pincelada({ w: retrato ? 480 : 760, h: 34 })}</div>
    ${sub ? `<div class="abs cg" style="left:80px;top:${retrato ? 600 : 640}px;width:${retrato ? 460 : 900}px;font-weight:600;font-size:52px;line-height:1.08;color:${COR.ouroClaro}">${esc(sub)}</div>` : ''}
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

/**
 * POST 05 · "A MEDICINA TAMBÉM SE FAZ FORA DA SALA DE AULA." (dia 2 do calendário)
 * ----------------------------------------------------------------------------
 * Trecho do manifesto (src/sections/home/Manifesto.tsx).
 * Conceito: a sala de aula é uma moldura; "FORA" escapa dela, atravessando o fio de ouro,
 * e do lado de fora crescem plantas em gravura. A capa funciona sozinha (imagem única).
 * Slides 2–4: as três partes do manifesto, cada uma com propostas reais do programa.
 *
 * O @ novo ainda não foi definido: o rodapé mostra o site. Quando existir, troque HANDLE.
 * Rodar na raiz: node marketing/instagram/05-fora-da-sala/gerar.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, fio, grao, losango, pincelada } from '../../ferramentas/marca.mjs';
import * as A from '../../ferramentas/assets.mjs';
import { FEED, STORY, fecho, fundoClaro, fundoEscuro, montar, montarStory, rotulo, storyEnquete } from '../../ferramentas/templates.mjs';
import { EIXOS } from '../../../src/data/programa.ts';
import { site } from '../../../src/config/site.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const HANDLE = 'chapavitalbrazil.com.br'; // ← troque pelo @ novo e rode de novo
site.instagram.handle = HANDLE; // só neste gerador; o site não muda

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const acha = (t) => {
  for (const e of EIXOS) for (const g of e.grupos) for (const p of g.propostas) if (p.titulo === t) return { ...p, eixo: e };
  throw new Error(`proposta não encontrada: ${t}`);
};

/* ------------------------------------------------------------------ CAPA */
/**
 * A moldura é a sala; "FORA" fura a moldura. `h` = altura da arte (feed ou story),
 * `topo` = início da moldura, `alto` = altura da moldura.
 */
function sala({ h = FEED.h, topo = 190, alto = 850, sub = true, cta } = {}) {
  const L = 110;
  const LARG = 760;
  const base = topo + alto;
  const tx = topo + 86; // início do texto
  const gapTopo = tx + 196; // abertura no lado direito da moldura
  const gapBase = tx + 478;
  return `
  ${fundoClaro({ tom: 'marfim', decor: 'nenhum', h })}
  <!-- fora da sala: botânica livre -->
  <div class="abs" style="left:4px;top:${topo + 120}px">${A.trepadeira({ cor: COR.verde, h: alto - 160, op: 0.3 })}</div>
  <div class="abs" style="right:34px;top:${base - 300}px;transform:rotate(8deg)">${A.flor({ cor: COR.verde, t: 170, op: 0.42 })}</div>
  <div class="abs" style="right:150px;top:${base - 150}px;transform:rotate(-18deg)">${A.flor({ cor: COR.verde, t: 110, haste: false, op: 0.32 })}</div>
  <div class="abs" style="right:20px;top:${topo - 70}px;transform:rotate(200deg)">${A.ramo({ cor: COR.verde, w: 230, op: 0.34 })}</div>

  <!-- a sala: moldura dupla com pauta de caderno -->
  <div class="abs" style="left:${L}px;top:${topo}px;width:${LARG}px;height:${alto}px;background:repeating-linear-gradient(180deg,transparent 0 61px,rgba(30,58,47,.07) 61px 62px)"></div>
  <!-- lados da moldura; o lado direito tem uma abertura por onde "FORA" sai -->
  <div class="abs" style="left:${L}px;top:${topo}px;width:${LARG}px;height:${alto}px;border:2px solid rgba(30,58,47,.75);border-right:none"></div>
  <div class="abs" style="left:${L + 12}px;top:${topo + 12}px;width:${LARG - 24}px;height:${alto - 24}px;border:1px solid rgba(122,92,48,.45);border-right:none"></div>
  ${[[L + LARG - 2, 2, 'rgba(30,58,47,.75)', 0], [L + LARG - 12, 1, 'rgba(122,92,48,.45)', 12]].map(([x, w, cor, d]) => `
  <div class="abs" style="left:${x}px;top:${topo + d}px;width:${w}px;height:${gapTopo - topo - d}px;background:${cor}"></div>
  <div class="abs" style="left:${x}px;top:${gapBase}px;width:${w}px;height:${base - d - gapBase}px;background:${cor}"></div>`).join('')}
  ${[[L, topo], [L + LARG, topo], [L, base], [L + LARG, base]].map(([x, y]) => `<div class="abs" style="left:${x - 9}px;top:${y - 9}px;width:18px;height:18px;background:${COR.ouro};transform:rotate(45deg)"></div>`).join('')}

  <div class="abs" style="left:${L}px;top:${topo - 56}px">${rotulo('Manifesto · Gestão Dr. Vital Brazil', COR.ouroEscuro, 19)}</div>

  <!-- o texto -->
  <div class="abs pf" data-caber="680" style="left:${L + 60}px;top:${tx}px;font-weight:800;font-size:84px;line-height:1;letter-spacing:-.025em;color:${COR.verde};text-transform:uppercase;white-space:nowrap">A medicina<br/>também se faz</div>
  <!-- FORA atravessa a moldura: o fundo da palavra "rompe" o fio -->
  <div class="abs" style="left:${L + LARG - 8}px;top:${gapTopo - 8}px;width:14px;height:14px;background:${COR.ouro};transform:rotate(45deg)"></div>
  <div class="abs" style="left:${L + LARG - 8}px;top:${gapBase - 6}px;width:14px;height:14px;background:${COR.ouro};transform:rotate(45deg)"></div>
  <div class="abs pf" style="left:${L + 214}px;top:${tx + 178}px;font-weight:800;font-style:italic;font-size:290px;line-height:.86;letter-spacing:-.04em;color:${COR.ouroEscuro};text-transform:uppercase;white-space:nowrap">Fora</div>
  <div class="abs" style="left:${L + 230}px;top:${tx + 430}px">${pincelada({ w: 690, h: 34, cor: COR.ouro })}</div>
  <div class="abs pf" style="left:${L + 60}px;top:${tx + 482}px;font-weight:800;font-size:84px;line-height:1;letter-spacing:-.025em;color:${COR.verde};text-transform:uppercase;white-space:nowrap">da sala<br/>de aula.</div>

  <!-- etiqueta de prancha, dentro da sala -->
  <div class="abs" style="left:${L + 60}px;top:${base - 112}px">${A.etiqueta({ fig: 'Fig. 1', texto: 'A sala de aula', cor: COR.ouroEscuro, fundo: '#F7F2E4', w: 320, h: 84 })}</div>
  <div class="abs cg" style="left:${L + LARG - 330}px;top:${base + 22}px;width:420px;text-align:right;font-weight:600;font-size:32px;color:${COR.ouroEscuro}">…e todo o resto.</div>

  ${sub ? `<div class="abs cg" style="left:${L}px;top:${base + 78}px;width:${LARG + 120}px;font-weight:600;font-size:35px;line-height:1.16;color:${COR.tinta}">No respeito ao estudante, na defesa dos nossos direitos e na união.</div>` : ''}
  ${cta ? `<div class="abs eyebrow" style="left:0;right:0;top:${base + 230}px;text-align:center;font-size:20px;color:${COR.ouroEscuro}">${esc(cta)}</div>` : ''}`;
}

/* ---------------------------------------------------- TRECHOS (slides 2–4) */
function trecho({ numero, antes, palavra, depois, propostas, ornamento, tema = 'escuro', tom }) {
  const claro = tema === 'claro';
  const ouro = claro ? COR.ouroEscuro : COR.ouro;
  const corTxt = claro ? COR.verde : COR.papel;
  const corDest = claro ? COR.ouroEscuro : COR.ouroClaro;
  const corSec = claro ? COR.tinta2 : 'rgba(244,240,230,.7)';
  return `
  ${claro ? fundoClaro({ tom, decor: 'nenhum' }) : fundoEscuro({ tom, textura: 'vinheta', semente: 131 + numero.length, folhas: false })}
  <div class="abs" style="left:80px;top:100px">${rotulo(`Manifesto · parte ${numero}`, corDest)}</div>
  <div class="abs pf" style="right:80px;top:80px;font-weight:700;font-size:170px;line-height:1;color:transparent;-webkit-text-stroke:2px ${ouro};opacity:.8">${numero}</div>
  <div class="abs" style="right:${80 + 70 * numero.length + 40}px;top:110px;opacity:${claro ? 0.55 : 0.6}">${ornamento}</div>

  <div class="abs pf" style="left:80px;right:80px;top:${(antes + palavra + (depois ?? '')).length < 14 ? 360 : 330}px;font-weight:800;font-size:${(antes + palavra + (depois ?? '')).length < 14 ? 150 : 104}px;line-height:.98;letter-spacing:-.025em;color:${corTxt};text-transform:uppercase;text-wrap:balance">
    ${esc(antes)} <span style="position:relative;display:inline-block;color:${corDest};font-style:italic">${esc(palavra)}<span class="abs" style="left:-3%;right:-3%;bottom:-.02em;height:.14em;line-height:0">${pincelada({ w: 300, h: 22, cor: COR.ouro, estilo: 'width:100%;height:100%;display:block' })}</span></span>${depois ? ` ${esc(depois)}` : ''}
  </div>

  <div class="abs" style="left:80px;top:760px">${fio({ w: 70, cor: ouro, losango: 10 })}</div>
  <div class="abs eyebrow" style="left:80px;top:810px;font-size:18px;color:${corDest}">Está no programa</div>
  <div class="abs" style="left:80px;right:80px;top:860px;display:flex;flex-direction:column;gap:30px">
    ${propostas.map((p) => `<div style="display:flex;gap:22px;align-items:flex-start">
      <span style="flex:none;margin-top:15px">${losango(12, ouro)}</span>
      <div><div class="pf" style="font-weight:700;font-size:38px;line-height:1.12;color:${corTxt}">${esc(p.titulo)}</div>
      <div class="in" style="font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:${corSec};margin-top:8px">Eixo ${p.eixo.numero} · ${esc(p.eixo.titulo)}</div></div>
    </div>`).join('')}
  </div>`;
}

const slides = [
  sala(),
  trecho({
    numero: 'I',
    antes: 'No',
    palavra: 'respeito',
    depois: 'ao estudante.',
    propostas: ['Protocolo contra assédio', 'Trote solidário', 'Rodas de conversa periódicas'].map(acha),
    ornamento: A.coracao({ h: 170, cor: COR.ouro }),
    tema: 'escuro',
    tom: 'verde',
  }),
  trecho({
    numero: 'II',
    antes: 'Na defesa dos nossos',
    palavra: 'direitos.',
    propostas: ['Proposta formal sobre carga horária', 'Escalas com antecedência', 'Equipamentos de proteção'].map(acha),
    ornamento: A.balanca({ w: 180, cor: COR.ouroEscuro }),
    tema: 'claro',
    tom: 'papel',
  }),
  trecho({
    numero: 'III',
    antes: 'E na',
    palavra: 'união.',
    propostas: ['Parceria com a Atlética', 'Encontros entre períodos', 'Projetos de ação social'].map(acha),
    ornamento: A.ramoDuplo({ w: 220, cor: COR.ouro }),
    tema: 'escuro',
    tom: 'noite',
  }),
  fecho({ cta: 'Concorda? Compartilha nos stories.' }),
];

await montar({ pasta: AQUI, formato: FEED, slides });

/* --------------------------------------------------------------- STORIES */
await montarStory({
  pasta: AQUI,
  nome: 'story-01',
  html: `${sala({ h: STORY.h, topo: 420, alto: 900, cta: 'Concorda? Compartilha ↓' })}
    <div class="abs" style="left:0;right:0;top:1660px;display:flex;flex-direction:column;align-items:center">${fio({ w: 80 })}<div class="in" style="font-weight:600;font-size:32px;color:${COR.verde};margin-top:22px">${HANDLE}</div></div>`,
});
await montarStory({
  pasta: AQUI,
  nome: 'story-02',
  html: storyEnquete({
    pergunta: 'Onde você mais aprende medicina fora da sala?',
    opcoes: ['Nas ligas', 'No estágio e no plantão', 'Com a turma', 'Ainda procurando'],
    rotuloTxt: 'Conta pra gente',
    tema: 'claro',
    tom: 'marfim',
  }),
});
console.log('ok', AQUI);

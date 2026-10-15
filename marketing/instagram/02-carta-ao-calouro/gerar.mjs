/**
 * POST 02 · CARTA AO CALOURO (dia 14 do calendário)
 * Carrossel de 6 slides + 3 stories. Texto da carta = src/pages/Calouro.tsx (compromissos do programa).
 * Rodar na raiz: node marketing/instagram/02-carta-ao-calouro/gerar.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR } from '../../ferramentas/marca.mjs';
import * as A from '../../ferramentas/assets.mjs';
import { FEED, carta, cartaCapa, fecho, frase, montar, montarStory, prancha, storyCarta, storyEnquete, storyFrase } from '../../ferramentas/templates.mjs';
import { EIXOS } from '../../../src/data/programa.ts';
import { FRASES } from '../../../src/data/frases.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));

// Texto oficial da carta (src/pages/Calouro.tsx)
const P = [
  'Você chegou. Depois de tanto estudo e de tanta espera, você está aqui. E a gente sabe: o começo pode assustar. Prédios novos, rostos novos e uma rotina que ninguém explica direito.',
  'Por isso, queremos te dizer uma coisa logo no primeiro dia: ninguém deveria se sentir sozinho no 1º período.',
  'Queremos uma semana de acolhimento de verdade, com tour pelo campus, apresentação das ligas e do CA, e um veterano para chamar de padrinho. Uma recepção sem humilhação, com regras claras e tolerância zero a abusos.',
  'Queremos mentoria com quem já passou por onde você está passando, materiais de estudo organizados por período e gente disposta a ouvir quando a pressão apertar.',
  'A medicina também se faz fora da sala de aula. E ela começa com cuidado: com você.',
];

// Propostas citadas na carta (copiadas de src/data/programa.ts pelo título)
const acha = (t) => {
  for (const e of EIXOS) for (const g of e.grupos) for (const p of g.propostas) if (p.titulo === t) return { ...p, eixo: e.numero };
  throw new Error(`proposta não encontrada: ${t}`);
};
const recepcao = acha('Recepção dos calouros');
const trote = acha('Trote solidário');
const mentoria = acha('Programa de mentoria');
const materiais = acha('Banco de materiais de estudo');
const rede = acha('Rede de apoio entre alunos');
const fora = FRASES[0]; // "A medicina também se faz fora da sala de aula."

await montar({
  pasta: AQUI,
  formato: FEED,
  slides: [
    cartaCapa({ titulo: 'Querido calouro,', sub: 'Uma carta para quem está chegando. E para todo veterano que lembra como foi.', tom: 'verde' }),
    carta({ saudacao: 'Querido calouro,', capitular: true, paragrafos: [P[0], P[1], P[2]], tom: 'marfim' }),
    carta({ paragrafos: [P[3], P[4]], despedida: 'Seja muito bem-vindo.', tom: 'marfim' }),
    prancha({
      numero: 'I',
      rotuloTxt: 'Prancha',
      titulo: 'O que está escrito nesta carta',
      figuras: [
        { svg: A.flor({ t: 180, cor: COR.verde }), legenda: recepcao.titulo, fig: `Fig. 1 · Eixo ${recepcao.eixo}` },
        { svg: A.jaleco({ t: 150, cor: COR.verde }), legenda: trote.titulo, fig: `Fig. 2 · Eixo ${trote.eixo}` },
        { svg: A.lampada({ w: 200, cor: COR.verde }), legenda: mentoria.titulo, fig: `Fig. 3 · Eixo ${mentoria.eixo}` },
        { svg: A.coracao({ h: 190, cor: COR.verde }), legenda: rede.titulo, fig: `Fig. 4 · Eixo ${rede.eixo}` },
      ],
      nota: `Também na carta: ${materiais.titulo.toLowerCase()} (Eixo ${materiais.eixo}). São 5 eixos e 52 propostas, todas no site.`,
      tom: 'papel',
    }),
    frase({ texto: 'Ninguém deveria se sentir sozinho no 1º período.', destaque: 'sozinho', tema: 'escuro', tom: 'musgo', rotuloTxt: 'O recado da carta', apoio: 'Acolhimento de verdade, mentoria e uma recepção sem humilhação. Está no programa, e você pode cobrar.' }),
    fecho({ cta: 'Manda pra um calouro.' }),
  ],
});

await montarStory({ pasta: AQUI, nome: 'story-01', html: storyCarta({ trecho: 'Ninguém deveria se sentir sozinho no 1º período.', cta: 'Lê a carta inteira no link ↓' }) });
await montarStory({ pasta: AQUI, nome: 'story-02', html: storyFrase({ texto: fora.texto, destaque: fora.destaque, tema: 'claro', cta: 'Manda pra um calouro ↓' }) });
await montarStory({ pasta: AQUI, nome: 'story-03', html: storyEnquete({ pergunta: 'Calouro, o que mais assustou na primeira semana?', opcoes: ['A rotina nova', 'Conhecer gente', 'Me achar no campus', 'Nada, cheguei voando'], rotuloTxt: 'Conta pra gente' }) });
console.log('ok', AQUI);

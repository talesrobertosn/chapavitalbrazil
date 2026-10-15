/**
 * POST 04 · ESTAMOS DE VOLTA ("Trocamos de pele. Não de ideia.")
 * ----------------------------------------------------------------------------
 * Contexto: o perfil da chapa no Instagram foi derrubado um dia depois de criado.
 * Postura: sem acusar ninguém, sem citar outra chapa. O "jogo de palavras" fica
 * em "Caiu sem explicação. Voltou sem demora." e "ideia boa incomoda".
 * Conceito: a serpente do logo troca de pele (perfil novo), a ideia é a mesma.
 *
 * O @ novo ainda não existe: por enquanto o lugar do @ mostra o site, que não cai.
 * Quando o @ for definido, troque HANDLE abaixo e rode de novo.
 *
 * Rodar na raiz: node marketing/instagram/04-estamos-de-volta/gerar.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, losango, pincelada } from '../../ferramentas/marca.mjs';
import * as A from '../../ferramentas/assets.mjs';
import { FEED, STORY, cantoneiras, fecho, frase, fundoEscuro, gazeta, lista, montar, montarStory, numero, rotulo, storyFrase, storyNumero, telegrama } from '../../ferramentas/templates.mjs';
import { site } from '../../../src/config/site.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const HANDLE = 'chapavitalbrazil.com.br'; // ← troque pelo @ novo (ex.: '@chapavitalbrazil…') e rode de novo
site.instagram.handle = HANDLE; // só neste gerador; o site não muda

/* --------------------------------------------------------------- CAPA */
const capa = `
  ${fundoEscuro({ tom: 'noite', textura: 'raios', semente: 113, luzY: 0.3, folhas: false })}
  ${cantoneiras({ cor: COR.ouro, t: 90, inset: 40, base: 96 })}
  <div class="abs" style="left:80px;top:100px">${rotulo('Estamos de volta')}</div>
  <div class="abs pf" style="left:72px;top:160px;width:940px;font-weight:800;font-size:168px;line-height:.9;letter-spacing:-.035em;color:${COR.papel};text-transform:uppercase">Trocamos<br/>de <span style="color:${COR.ouroClaro};font-style:italic">pele.</span></div>
  <div class="abs" style="left:78px;top:480px">${pincelada({ w: 620, h: 34 })}</div>
  <div class="abs cg" style="left:80px;top:540px;font-weight:600;font-size:60px;line-height:1.05;color:${COR.ouroClaro}">Não de ideia.</div>
  <div class="abs" style="left:330px;top:650px;width:700px;height:520px">${A.serpenteMuda({ w: 700 })}</div>
  <div class="abs eyebrow" style="left:80px;top:1120px;font-size:20px;color:${COR.ouroClaro};display:flex;align-items:center;gap:18px">Arraste <span style="display:inline-block;width:120px;height:2px;background:${COR.ouro}"></span>${losango(12)}</div>`;

/* ----------------------------------------------------------- SLIDES */
const slides = [
  capa,
  gazeta({
    edicao: 'Edição extra',
    data: 'Outubro de 2026',
    manchete: 'Perfil da chapa sai do ar. A chapa segue de pé.',
    destaque: 'pé.',
    lead: 'Caiu sem explicação. Voltou sem demora.',
    colunas: [
      'O perfil da Gestão Dr. Vital Brazil no Instagram foi derrubado menos de um dia depois de nascer. Ninguém nos disse o motivo. Não sabemos quem pediu. Imaginamos por quê: ideia boa incomoda.',
      'Não vamos apontar dedo. Não temos provas, e não é assim que a gente faz política. O que temos é o de sempre: 23 estudantes, 5 eixos, 52 propostas e um site que não sai do ar. Este é o perfil novo. Se você seguia, segue de novo. Se não seguia, chegou na hora certa.',
    ],
    ilustracao: A.serpenteLogo({ cor: COR.verde, w: 280 }),
    legenda: 'A serpente troca de pele. A ideia, não.',
    chamada: 'Tudo continua em chapavitalbrazil.com.br',
    tom: 'marfim',
  }),
  numero({ valor: '0', rotuloTxt: 'seguidores. De novo.', destaque: 'novo.', texto: 'Zeramos a contagem. Não zeramos o compromisso: mesma chapa, mesmos 23, mesmas 52 propostas.', tema: 'escuro', tom: 'verde' }),
  frase({ texto: 'Em 1919, Vital Brazil deixou o Butantan e fundou um instituto novo.', destaque: 'novo.', tema: 'claro', tom: 'areia', decor: 'serpente', rotuloTxt: 'Recomeçar está no nome', apoio: 'O instituto de Niterói leva o nome dele até hoje. Recomeçar nunca foi fraqueza. É método.' }),
  lista({ rotuloTxt: 'O que não mudou', titulo: 'Tudo o que importa', tom: 'carvao', textura: 'vinheta', itens: [
    { titulo: 'As 52 propostas', texto: 'Em 5 eixos, escritas para serem cobradas.' },
    { titulo: 'Os 23 nomes', texto: 'Do 1º ao último período. Uma só chapa.' },
    { titulo: 'O site', texto: 'chapavitalbrazil.com.br segue no ar, com o programa inteiro.' },
    { titulo: 'O compromisso', texto: 'Mais que uma gestão, um compromisso com a nossa formação.' },
  ] }),
  telegrama({ para: 'Quem seguia. E quem ainda não.', data: 'Outubro de 2026', carimboTxt: 'De volta', linhas: ['Derrubaram o perfil', 'Não derrubaram a chapa', 'A gente não para', 'Perfil novo, ideia de sempre', 'Siga de novo e avise a turma'] }),
  fecho({ cta: 'Siga de novo. E marca quem seguia.' }),
];

await montar({ pasta: AQUI, formato: FEED, slides });

/* ---------------------------------------------------------- STORIES */
const story1 = `
  ${storyFrase({ texto: 'Trocamos de pele. Não de ideia.', destaque: 'ideia.', tema: 'escuro', cta: 'Perfil novo. Siga de novo ↓' })}
  <div class="abs" style="left:50%;top:400px;transform:translateX(-50%);width:420px;height:310px">${A.serpenteMuda({ w: 420, deslocX: -34, deslocY: -28, traco: 2.4 })}</div>`;
await montarStory({ pasta: AQUI, nome: 'story-01', html: story1 });
await montarStory({ pasta: AQUI, nome: 'story-02', html: storyNumero({ valor: '0', rotuloTxt: 'seguidores', texto: 'De novo. Mesma chapa, mesmas 52 propostas.', cta: 'Conta pra sua turma que voltamos ↓', tom: 'verde' }) });
const story3 = `
  ${storyFrase({ texto: 'Caiu sem explicação. Voltou sem demora.', destaque: 'Voltou', tema: 'claro', cta: 'Marca quem seguia ↓' })}
  <div class="abs" style="right:90px;top:1270px">${A.carimbo({ texto: 'De volta', cor: COR.ouroEscuro, w: 360, h: 120, px: 52, rot: -10 })}</div>`;
await montarStory({ pasta: AQUI, nome: 'story-03', html: story3 });
console.log('ok', AQUI);

/**
 * POST 03 · DIA DOS PROFESSORES (15 de outubro)
 * Carrossel de 5 slides + 2 stories. A chapa valoriza quem ensina todo dia:
 * as propostas citadas são as do programa que aproximam alunos, professores e preceptores.
 * Rodar na raiz: node marketing/instagram/03-dia-dos-professores/gerar.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEED, cantoneiras, citacao, fecho, frase, homenagem, lista, montar, montarStory, storyHomenagem, storyQuiz } from '../../ferramentas/templates.mjs';
import { EIXOS } from '../../../src/data/programa.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const acha = (t) => {
  for (const e of EIXOS) for (const g of e.grupos) for (const p of g.propostas) if (p.titulo === t) return { ...p, eixo: e.numero };
  throw new Error(`proposta não encontrada: ${t}`);
};
const PROPOSTAS = ['Ponte entre alunos e orientadores', 'Encontros com especialistas', 'Transição entre os ciclos', 'Cursos práticos todo semestre', 'Campanhas de conscientização'].map(acha);

await montar({
  pasta: AQUI,
  formato: FEED,
  slides: [
    homenagem({ data: '15 de outubro', titulo: 'Professores', sub: 'Hoje é a data. Pra gente, é todo dia.' }),
    citacao({ texto: 'Ninguém se forma sozinho. Cada diagnóstico que um dia vamos fazer passou antes pelas mãos de quem nos ensinou.', autor: 'Gestão Dr. Vital Brazil', fonte: 'Mensagem aos professores', tema: 'claro', tom: 'marfim', decor: 'buque' }),
    lista({ rotuloTxt: 'No nosso programa, todo dia', titulo: 'Mais perto de quem ensina', tom: 'verde', textura: 'vinheta', itens: PROPOSTAS.map((p) => ({ titulo: p.titulo, texto: p.texto })) }),
    frase({ texto: 'Valorizar quem ensina é cuidar de quem aprende.', destaque: 'ensina', tema: 'claro', tom: 'branco', decor: 'flores', rotuloTxt: 'Dia dos Professores', apoio: 'Respeito nas relações entre alunos, professores e preceptores está escrito no nosso programa. E se cobra todo dia.' }),
    fecho({ cta: 'Marca um professor que marcou você.' }),
  ],
});

await montarStory({ pasta: AQUI, nome: 'story-01', html: storyHomenagem({ data: '15 de outubro', titulo: 'Professores', sub: 'Hoje é a data. Pra gente, é todo dia.', cta: 'Marca quem te ensinou ↓' }) });
await montarStory({ pasta: AQUI, nome: 'story-02', html: storyQuiz({ rotuloTxt: 'Conta pra gente', pergunta: 'Qual professor marcou a sua formação?', revelar: false, tom: 'floresta' }) + cantoneiras({ t: 90, inset: 60 }) });
console.log('ok', AQUI);

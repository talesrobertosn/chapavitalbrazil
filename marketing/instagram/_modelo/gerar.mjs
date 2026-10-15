/**
 * MODELO DE POST · copie esta pasta para marketing/instagram/NN-nome/ e edite.
 * Rodar na raiz: node marketing/instagram/NN-nome/gerar.mjs
 *
 * Regras: docs/DIRECAO-DE-ARTE.md e docs/MARKETING.md. Conteúdo vem de src/data.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEED, capa, fecho, frase, lista, montar, montarStory, pergunta, pessoa, proposta, storyFrase, storyPessoa } from '../../ferramentas/templates.mjs';
import { EIXOS } from '../../../src/data/programa.ts';
import { FRASES } from '../../../src/data/frases.ts';
import { MEMBROS, iniciais } from '../../../src/data/diretoria.ts';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const eixo = EIXOS[2]; // Cuidado com o Estudante
const f = FRASES[1]; // "Antes de ser médico, você é gente."
const m = MEMBROS[0];

// CARROSSEL (alterne escuro ↔ claro; capa escura; fecho sempre no fim)
await montar({
  pasta: AQUI,
  formato: FEED,
  slides: [
    capa({ frase: f.texto, destaque: f.destaque, sub: 'Eixo 03 · Cuidado com o Estudante' }),
    frase({ texto: eixo.intro, tema: 'claro', rotuloTxt: `Eixo ${eixo.numero}` }),
    proposta({ eixoId: eixo.id, eixoNumero: eixo.numero, eixoTitulo: eixo.titulo, titulo: eixo.grupos[0].titulo, topicos: eixo.grupos[0].propostas.slice(0, 3).map((p) => p.titulo) }),
    lista({ rotuloTxt: 'Respeito e proteção', titulo: 'O que vamos fazer', itens: eixo.grupos[1].propostas.map((p) => ({ titulo: p.titulo, texto: p.texto })) }),
    pergunta({ pergunta: 'E quem está no internato?', resposta: 'Atenção específica na entrada do internato, rede de apoio entre alunos e canal para relatar jornadas excessivas.' }),
    pessoa({ slug: m.slug, nome: m.nome, cargo: m.cargo.titulo, turma: m.turma, iniciais: iniciais(m.nome), fraseTxt: m.porque ?? 'Depoimento em breve.' }),
    fecho({ cta: 'Cuida de você hoje.' }),
  ],
});

// STORIES
await montarStory({ pasta: AQUI, nome: 'story-01', html: storyFrase({ texto: f.texto, destaque: f.destaque, cta: 'Conheça o eixo Cuidado ↓' }) });
await montarStory({ pasta: AQUI, nome: 'story-02', html: storyPessoa({ slug: m.slug, nome: m.nome, cargo: m.cargo.titulo, turma: m.turma, iniciais: iniciais(m.nome), fraseTxt: m.porque ?? 'Depoimento em breve.' }) });
console.log('ok', AQUI);

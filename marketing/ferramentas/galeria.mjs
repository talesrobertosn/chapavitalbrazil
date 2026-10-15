/**
 * GALERIA DOS TEMPLATES: renderiza um exemplo de cada estilo de slide e de story
 * numa prancha única (marketing/assets/galeria-templates.png) para consulta rápida.
 * Rodar na raiz: node marketing/ferramentas/galeria.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COR, grao, renderizar } from './marca.mjs';
import * as A from './assets.mjs';
import * as T from './templates.mjs';
import { EIXOS } from '../../src/data/programa.ts';
import { FRASES } from '../../src/data/frases.ts';
import { MARCOS, REDE } from '../../src/data/vitalBrazil.ts';
import { MEMBROS, iniciais } from '../../src/data/diretoria.ts';
import { site } from '../../src/config/site.ts';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const e3 = EIXOS[2];
const e4 = EIXOS[3];
const [dia, mes] = [site.eleicao.data.slice(8, 10), ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'][Number(site.eleicao.data.slice(5, 7)) - 1]];

export const EXEMPLOS = {
  cartaCapa: T.cartaCapa({ sub: 'Uma carta para quem está chegando. E para todo veterano que lembra como foi.' }),
  carta: T.carta({ saudacao: 'Querido calouro,', capitular: true, paragrafos: ['Você chegou. Depois de tanto estudo e de tanta espera, você está aqui. E a gente sabe: o começo pode assustar.', 'Por isso, queremos te dizer uma coisa logo no primeiro dia: ninguém deveria se sentir sozinho no 1º período.'] }),
  cartaFim: T.carta({ paragrafos: ['A medicina também se faz fora da sala de aula. E ela começa com cuidado: com você.'], despedida: 'Seja muito bem-vindo.' }),
  gazeta: T.gazeta({ edicao: 'Edição nº 16', data: 'Outubro de 2026', manchete: REDE.titulo, destaque: 'rede.', lead: REDE.ponte, colunas: [REDE.texto, 'Cada estudante contribuindo e todos recebendo de volta: é assim que entendemos um Centro Acadêmico. Presente no dia a dia, transparente nas contas e aberto a quem quiser participar.'], ilustracao: A.serpenteTraco({ w: 280, h: 90, cor: COR.verde }), legenda: 'Serpentes chegavam de todo o interior.' }),
  prancha: T.prancha({ numero: 'III', titulo: 'Cuidado com o estudante', figuras: [{ svg: A.coracao({ h: 200, cor: COR.verde }), legenda: e3.grupos[0].propostas[0].titulo }, { svg: A.lampada({ w: 200, cor: COR.verde }), legenda: e3.grupos[0].propostas[1].titulo }, { svg: A.balanca({ w: 190, cor: COR.verde }), legenda: e3.grupos[1].propostas[0].titulo }, { svg: A.livro({ w: 210, cor: COR.verde }), legenda: e3.grupos[2].propostas[0].titulo }], nota: 'Eixo 03 · quatro das dez propostas. O programa inteiro está no site.' }),
  numero: T.numero({ valor: '52', rotuloTxt: 'propostas escritas para serem cobradas', destaque: 'cobradas', texto: 'Em 5 eixos. E se algo não andar, você vai saber por nós.' }),
  numeroClaro: T.numero({ valor: '23', rotuloTxt: 'estudantes, do 1º ao último período', destaque: 'estudantes,', tema: 'claro', tom: 'branco', estilo: 'cheio', cabecalho: 'Quem somos' }),
  linhaDoTempo: T.linhaDoTempo({ titulo: 'Por que Vital Brazil?', marcos: MARCOS.filter((m) => m.destaque).map((m) => ({ ano: m.ano, titulo: m.titulo, texto: m.texto })) }),
  citacao: T.citacao({ texto: FRASES[10].texto, autor: 'Manifesto da chapa' }),
  citacaoClara: T.citacao({ texto: FRASES[6].texto, autor: 'Manifesto da chapa', tema: 'claro', tom: 'marfim' }),
  convite: T.convite({ dia, mes, hora: site.eleicao.horario, local: site.eleicao.local, quemVota: site.eleicao.quemVota, tom: 'marfim' }),
  conviteEscuro: T.convite({ dia, mes, tema: 'escuro', tom: 'floresta', rotuloTxt: 'Reunião aberta', titulo: 'Vem perguntar', carimboTxt: 'Aberta' }),
  checklist: T.checklist({ rotuloTxt: 'Primeiros 100 dias', titulo: 'O que você vai ver primeiro', itens: [{ titulo: 'Prestação de contas mensal', texto: 'Entradas, saídas e saldo publicados todo mês.' }, { titulo: 'Ouvidoria anônima no ar' }, { titulo: 'Guia do Internato e Estágios' }, { titulo: 'Calendário único de cursos e eventos' }], tom: 'linho' }),
  dicionario: T.dicionario({ palavra: 'Ouvidoria', silabas: 'ou·vi·do·ri·a', classe: 's.f.', definicoes: ['Canal anônimo para sugestões, dúvidas e denúncias, aberto a todo estudante.', 'Compromisso de resposta e encaminhamento formal de cada relato.'], exemplo: 'Fala. A gente escuta. Nem precisa dizer quem é.' }),
  prescricao: T.prescricao({ itens: [{ nome: 'Prestação de contas mensal', posologia: 'Uso contínuo. Todo mês, todo centavo.' }, { nome: 'Rodas de conversa', posologia: 'Periódicas, com profissionais convidados.' }, { nome: 'Escalas com antecedência', posologia: 'Cobradas junto à Coordenação, com prazo mínimo combinado.' }] }),
  mosaico: T.mosaico({ rotuloTxt: 'Diretoria', titulo: 'Quem faz acontecer', membros: MEMBROS.slice(0, 8).map((m) => ({ slug: m.slug, nome: m.nome.split(' ')[0], iniciais: iniciais(m.nome), cargo: m.cargo.titulo })), cta: 'Conheça os 23 no site' }),
  fotoMoldura: T.fotoMoldura({ src: T.BUTANTAN(), legenda: 'Instituto Butantan, onde a ciência virou serviço.', rotuloTxt: 'Bastidores', forma: 'arco' }),
  telegrama: T.telegrama({ linhas: ['Amanhã sua voz vira voto', 'Leve um documento com foto', 'Chame sua turma'], data: `${dia} de ${mes}` }),
  lista: T.lista({ rotuloTxt: 'Transparência', titulo: 'Todo mês. Todo centavo.', itens: e4.grupos[0].propostas.slice(0, 4).map((p) => ({ titulo: p.titulo, texto: p.texto })), tom: 'carvao' }),
};
export const STORIES = {
  storyContagem: T.storyContagem({ dias: 7 }),
  storyEnquete: T.storyEnquete({ pergunta: 'Do que o campus mais precisa?', opcoes: ['Sala de descanso', 'Micro-ondas e tomadas', 'Armários'] }),
  storyQuiz: T.storyQuiz({ pergunta: 'Cada soro antiofídico serve para qualquer serpente?', resposta: 'Não. Vital Brazil demonstrou que cada soro age contra o veneno de um tipo de serpente.' }),
  storyCarta: T.storyCarta({ trecho: 'Ninguém deveria se sentir sozinho no 1º período.' }),
  storyAgenda: T.storyAgenda({ dia, mes }),
  storyNumero: T.storyNumero({ valor: '5', rotuloTxt: 'eixos', texto: 'Um só compromisso com a nossa formação.', cta: 'O programa inteiro ↓' }),
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const esc = 0.42;
  const card = (nome, html, w, h) => `<div style="display:flex;flex-direction:column;gap:12px;align-items:center"><div style="width:${w * esc}px;height:${h * esc}px;overflow:hidden;box-shadow:0 20px 40px -20px #000"><div style="position:relative;width:${w}px;height:${h}px;overflow:hidden;transform:scale(${esc});transform-origin:0 0;background:${COR.noite}">${html}${h === 1350 ? T.rodape(1, 7, html.includes('<!--claro-->')) : ''}</div></div><div class="eyebrow" style="font-size:12px;color:${COR.salvia}">${nome}</div></div>`;
  const html = `<div style="position:relative;width:2000px;background:${COR.noite2};padding:60px">
    <div class="pf" style="font-weight:800;font-size:54px;color:${COR.papel}">Galeria de templates · Gravura Viva</div>
    <div class="in" style="font-size:20px;color:${COR.salvia};margin:10px 0 40px">marketing/ferramentas/templates.mjs · cada estilo aceita tema/tom e assets diferentes</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:36px 20px">${Object.entries(EXEMPLOS).map(([n, h]) => card(n, h, 1080, 1350)).join('')}</div>
    <div class="pf" style="font-weight:800;font-size:40px;color:${COR.papel};margin:60px 0 30px">Stories</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:36px 20px">${Object.entries(STORIES).map(([n, h]) => card(n, h, 1080, 1920)).join('')}</div>
    ${grao(0.06)}
  </div>`;
  await renderizar({ html, w: 2000, h: 4000, saida: path.join(RAIZ, 'marketing/assets/galeria-templates.png'), medirAltura: true });
  console.log('galeria em marketing/assets/galeria-templates.png');
}

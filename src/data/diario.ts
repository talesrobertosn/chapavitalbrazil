/**
 * DIÁRIO DA CAMPANHA · fonte: "Calendário de 20 dias"
 * Os dias 1 a 18 seguem o calendário a partir de `site.campanhaInicio`.
 * Os dias 19 (véspera) e 20 (eleição) acompanham `site.eleicao.data`,
 * como orienta o próprio calendário ("se a data for outra, desloquem os dias 19 e 20").
 */
import { site } from '../config/site';
import { addDays, parseISODate } from '../lib/datas';

export type Semana = 1 | 2 | 3;

export interface DiaCampanha {
  dia: number;
  semana: Semana;
  formato: string;
  frase: string;
  tema: string;
  chamada: string;
  /** Rota interna relacionada ao tema do dia. */
  rota: string;
  /** Data do post (preenchida abaixo). */
  data: Date;
}

export const SEMANAS: Record<Semana, { titulo: string; texto: string }> = {
  1: { titulo: 'Quem somos', texto: 'A chapa, o nome e o primeiro eixo.' },
  2: { titulo: 'O que propomos', texto: 'Os outros eixos, com rostos na frente das propostas.' },
  3: { titulo: 'Reta final', texto: 'Resumo, perguntas e o chamado para votar.' },
};

type DiaBase = Omit<DiaCampanha, 'data'>;

const BASE: DiaBase[] = [
  { dia: 1, semana: 1, formato: 'Carrossel', frase: 'Chegamos.', tema: 'Mais que uma gestão, um compromisso com a nossa formação.', chamada: 'Ativa o sininho, todo dia tem novidade.', rota: '/' },
  { dia: 2, semana: 1, formato: 'Imagem única', frase: 'A medicina também se faz fora da sala de aula.', tema: 'Um trecho do nosso manifesto.', chamada: 'Concorda? Compartilha nos stories.', rota: '/#manifesto' },
  { dia: 3, semana: 1, formato: 'Carrossel', frase: 'Por que Vital Brazil?', tema: 'Ciência, coragem e serviço. Por isso o nome.', chamada: 'Salva pra mostrar pro calouro.', rota: '/vital-brazil' },
  { dia: 4, semana: 1, formato: 'Carrossel', frase: 'Sutura não se aprende só no vídeo.', tema: 'Eixo 1: Ensino, Pesquisa e Carreira.', chamada: 'Que curso você quer primeiro? Comenta.', rota: '/programa/ensino' },
  { dia: 5, semana: 1, formato: 'Imagem única', frase: 'Quem nunca descobriu a escala na véspera?', tema: 'Guia do Internato e Estágios: escala com antecedência.', chamada: 'Marca aquele amigo que já passou por isso.', rota: '/programa/internato' },
  { dia: 6, semana: 1, formato: 'Carrossel de fotos', frase: 'Do 1º ao último período. Uma só chapa.', tema: 'Conheça o time.', chamada: 'Conhece alguém daqui? Marca.', rota: '/diretoria' },
  { dia: 7, semana: 1, formato: 'Imagem única', frase: 'Antes de ser médico, você é gente.', tema: 'Uma reflexão sobre a saúde mental do estudante.', chamada: 'Cuida de você hoje.', rota: '/programa/cuidado' },
  { dia: 8, semana: 2, formato: 'Imagem única', frase: 'Cansaço não é mérito.', tema: 'Internato com carga horária justa para aprender e descansar.', chamada: 'Quantas horas foi seu plantão mais longo? Responde nos stories.', rota: '/programa/internato' },
  { dia: 9, semana: 2, formato: 'Card + enquete', frase: 'Do que o campus precisa?', tema: 'Espaços de convivência e descanso.', chamada: 'Vota nos stories, o resultado vira proposta.', rota: '/programa/cuidado' },
  { dia: 10, semana: 2, formato: 'Carrossel', frase: 'Todo mês. Todo centavo.', tema: 'Eixo 4: Transparência e Representação.', chamada: 'Transparência não é favor, é obrigação.', rota: '/programa/transparencia' },
  { dia: 11, semana: 2, formato: 'Imagem única', frase: 'Fala. A gente escuta. Nem precisa dizer quem é.', tema: 'A Ouvidoria do CA, um canal anônimo.', chamada: 'Que sugestão você mandaria hoje?', rota: '/fale-conosco' },
  { dia: 12, semana: 2, formato: 'Depoimentos', frase: 'Eu estou na chapa porque…', tema: 'Os membros contam o motivo pessoal.', chamada: 'E você, por que escolheu medicina?', rota: '/diretoria' },
  { dia: 13, semana: 2, formato: 'Imagem única', frase: 'Medicina também é time.', tema: 'Integração e vida acadêmica, com a Atlética.', chamada: 'Marca seu time do intermed.', rota: '/programa/integracao' },
  { dia: 14, semana: 2, formato: 'Carta', frase: 'Querido calouro,', tema: 'Ninguém deveria se sentir sozinho no 1º período.', chamada: 'Manda pra um calouro.', rota: '/calouro' },
  { dia: 15, semana: 3, formato: 'Imagem única', frase: 'O jaleco também serve fora do hospital.', tema: 'Projetos de ação social na comunidade.', chamada: 'Que comunidade você gostaria de ajudar?', rota: '/programa/integracao' },
  { dia: 16, semana: 3, formato: 'Você sabia?', frase: 'Ciência se faz em rede.', tema: 'Fazendeiros enviavam serpentes ao Butantan e recebiam soro em troca.', chamada: 'Salva e manda pro grupo da turma.', rota: '/vital-brazil#rede' },
  { dia: 17, semana: 3, formato: 'Carrossel', frase: '5 eixos. 1 compromisso.', tema: 'O programa inteiro, para salvar.', chamada: 'Salva esse post, é o nosso programa inteiro.', rota: '/programa' },
  { dia: 18, semana: 3, formato: 'Stories + carrossel', frase: 'Pergunta pra gente.', tema: 'Respostas para dúvidas reais.', chamada: 'Ficou alguma? Manda no direct.', rota: '/fale-conosco#perguntas' },
  { dia: 19, semana: 3, formato: 'Imagem + contagem', frase: 'Amanhã, sua voz vira voto.', tema: 'Local, horário e quem pode votar.', chamada: 'Ativa o lembrete nos stories.', rota: '/votar' },
  { dia: 20, semana: 3, formato: 'Imagem única', frase: 'Hoje é dia de escolher a formação que você quer.', tema: 'Obrigado pela campanha. Agora, o voto.', chamada: 'Vota e chama sua turma.', rota: '/votar' },
];

const inicio = parseISODate(site.campanhaInicio);
const eleicao = parseISODate(site.eleicao.data);

export const DIARIO: DiaCampanha[] = BASE.map((d) => {
  let data: Date;
  if (d.dia === 20) data = eleicao;
  else if (d.dia === 19) data = addDays(eleicao, -1);
  else data = addDays(inicio, d.dia - 1);
  return { ...d, data };
});

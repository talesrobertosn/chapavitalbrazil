/**
 * PROGRAMA DE GESTÃO · fonte: "Programa_Gestao_Vital_Brazil.docx"
 * Os textos das propostas foram transcritos sem alteração de sentido.
 *
 * `perfis` indica para quem a proposta pesa mais (usado no seletor
 * "O que muda pra mim?"). É uma curadoria editorial, ajustável aqui.
 */

export type Perfil = 'calouro' | 'basico' | 'clinico' | 'internato';

export const PERFIS: { id: Perfil; rotulo: string; descricao: string }[] = [
  { id: 'calouro', rotulo: 'Calouro', descricao: 'Chegando agora' },
  { id: 'basico', rotulo: 'Ciclo básico', descricao: 'Primeiros anos' },
  { id: 'clinico', rotulo: 'Ciclo clínico', descricao: 'Rumo às práticas' },
  { id: 'internato', rotulo: 'Internato', descricao: 'Na linha de frente' },
];

const TODOS: Perfil[] = ['calouro', 'basico', 'clinico', 'internato'];

export type IconeEixo = 'ensino' | 'internato' | 'cuidado' | 'transparencia' | 'integracao';

export interface Proposta {
  n: string;
  titulo: string;
  texto: string;
  perfis: Perfil[];
}

export interface Grupo {
  titulo: string;
  propostas: Proposta[];
}

export interface Eixo {
  id: IconeEixo;
  numero: string;
  titulo: string;
  tituloCurto: string;
  intro: string;
  /** Frase de impacto, vinda do calendário do Instagram. */
  frase: string;
  /** Números das propostas em destaque nos resumos. */
  destaques: string[];
  grupos: Grupo[];
}

export const EIXOS: Eixo[] = [
  {
    id: 'ensino',
    numero: '01',
    titulo: 'Ensino, Pesquisa e Carreira',
    tituloCurto: 'Ensino e Pesquisa',
    intro:
      'O estudante aprende muito além da grade, mas hoje depende de iniciativa individual para chegar a cursos práticos, pesquisa e orientação de carreira. O CA vai organizar esse caminho.',
    frase: 'Sutura não se aprende só no vídeo.',
    destaques: ['01', '03', '09'],
    grupos: [
      {
        titulo: 'Formação prática',
        propostas: [
          { n: '01', titulo: 'Cursos práticos todo semestre', texto: 'Sutura, BLS, ACLS introdutório e simulação clínica, em parceria com ligas, professores e instituições, com prioridade para valores acessíveis.', perfis: TODOS },
          { n: '02', titulo: 'Calendário único de cursos e eventos', texto: 'Tudo o que acontece no curso (ligas, jornadas, congressos) reunido num só lugar, atualizado todo mês.', perfis: TODOS },
          { n: '03', titulo: 'Banco de materiais de estudo', texto: 'Resumos, roteiros de prática e provas antigas autorizadas, organizados por período e disciplina.', perfis: ['calouro', 'basico', 'clinico'] },
          { n: '04', titulo: 'Monitorias e grupos de estudo', texto: 'Apoio à criação de grupos entre períodos, com atenção às disciplinas de maior reprovação.', perfis: ['calouro', 'basico', 'clinico'] },
        ],
      },
      {
        titulo: 'Pesquisa e produção científica',
        propostas: [
          { n: '05', titulo: 'Apoio às ligas acadêmicas', texto: 'Ajuda com divulgação, organização de eventos e relação com a coordenação.', perfis: ['calouro', 'basico', 'clinico'] },
          { n: '06', titulo: 'Oficinas de pesquisa', texto: 'Como montar um projeto, usar o Lattes, escrever um resumo e submeter a congressos.', perfis: ['basico', 'clinico'] },
          { n: '07', titulo: 'Ponte entre alunos e orientadores', texto: 'Lista de professores com linhas de pesquisa abertas a estudantes.', perfis: ['basico', 'clinico'] },
          { n: '08', titulo: 'Apoio para apresentar trabalhos', texto: 'Busca de descontos e auxílio para inscrições em congressos.', perfis: ['basico', 'clinico', 'internato'] },
        ],
      },
      {
        titulo: 'Carreira e residência',
        propostas: [
          { n: '09', titulo: 'Programa de mentoria', texto: 'Veteranos e médicos egressos acompanhando calouros e internos.', perfis: ['calouro', 'internato'] },
          { n: '10', titulo: 'Encontros com especialistas', texto: 'Conversas sobre a rotina e o caminho de cada especialidade.', perfis: ['basico', 'clinico', 'internato'] },
          { n: '11', titulo: 'Orientação para residência', texto: 'Como funcionam as provas, como montar o currículo e como se preparar ao longo do curso.', perfis: ['clinico', 'internato'] },
        ],
      },
    ],
  },
  {
    id: 'internato',
    numero: '02',
    titulo: 'Internato e Estágios',
    tituloCurto: 'Internato',
    intro:
      'O internato é o período mais exigente do curso e, muitas vezes, o mais distante do CA. Queremos estar presentes justamente aí.',
    frase: 'Quem nunca descobriu a escala na véspera?',
    destaques: ['01', '02', '05'],
    grupos: [
      {
        titulo: 'Organização e clareza',
        propostas: [
          { n: '01', titulo: 'Guia do Internato e Estágios', texto: 'Documento com cada campo de estágio, rotinas, contatos e dicas de quem já passou por lá, revisado todo ano.', perfis: ['clinico', 'internato'] },
          { n: '02', titulo: 'Escalas com antecedência', texto: 'Cobrar junto à Coordenação a divulgação das escalas com prazo mínimo combinado.', perfis: ['internato'] },
          { n: '03', titulo: 'Transição entre os ciclos', texto: 'Encontro de preparação antes de entrar no internato, com internos e preceptores.', perfis: ['clinico'] },
          { n: '04', titulo: 'Representante do internato no CA', texto: 'Um membro dedicado a ouvir os internos e levar as demandas adiante.', perfis: ['internato'] },
        ],
      },
      {
        titulo: 'Carga horária e descanso',
        propostas: [
          { n: '05', titulo: 'Proposta formal sobre carga horária', texto: 'Levar à Coordenação um documento com limites de horas e descanso após plantões, construído a partir de pesquisa com os internos.', perfis: ['internato'] },
          { n: '06', titulo: 'Registro de abusos de escala', texto: 'Canal para relatar jornadas excessivas, com encaminhamento formal.', perfis: ['internato'] },
        ],
      },
      {
        titulo: 'Segurança e saúde',
        propostas: [
          { n: '07', titulo: 'Protocolo de acidente com material biológico', texto: 'Fluxo claro divulgado a todos os alunos antes de entrarem em campo.', perfis: ['basico', 'clinico', 'internato'] },
          { n: '08', titulo: 'Acompanhamento da vacinação', texto: 'Campanha para que todo aluno esteja com o cartão em dia antes das práticas.', perfis: TODOS },
          { n: '09', titulo: 'Segurança no deslocamento', texto: 'Mapear riscos nos trajetos aos hospitais e em plantões noturnos e buscar soluções com a instituição.', perfis: ['clinico', 'internato'] },
          { n: '10', titulo: 'Equipamentos de proteção', texto: 'Cobrar o acesso adequado a EPIs em todos os campos de estágio.', perfis: ['clinico', 'internato'] },
        ],
      },
    ],
  },
  {
    id: 'cuidado',
    numero: '03',
    titulo: 'Cuidado com o Estudante',
    tituloCurto: 'Cuidado',
    intro: 'Você escolheu Medicina para cuidar de pessoas. Chegou a hora de alguém cuidar de você.',
    frase: 'Antes de ser médico, você é gente.',
    destaques: ['01', '05', '08'],
    grupos: [
      {
        titulo: 'Saúde mental',
        propostas: [
          { n: '01', titulo: 'Parceria com serviço de psicologia', texto: 'Buscar atendimento acessível para os alunos, junto à instituição ou a clínicas-escola.', perfis: TODOS },
          { n: '02', titulo: 'Rodas de conversa periódicas', texto: 'Espaços seguros para falar de pressão, ansiedade e cansaço, com profissionais convidados.', perfis: TODOS },
          { n: '03', titulo: 'Atenção nos momentos críticos', texto: 'Ações específicas em semanas de prova, no início do curso e na entrada do internato.', perfis: ['calouro', 'basico', 'clinico', 'internato'] },
          { n: '04', titulo: 'Rede de apoio entre alunos', texto: 'Estudantes preparados para acolher colegas e indicar onde buscar ajuda.', perfis: TODOS },
        ],
      },
      {
        titulo: 'Respeito e proteção',
        propostas: [
          { n: '05', titulo: 'Protocolo contra assédio', texto: 'Acolhimento sigiloso, orientação sobre os caminhos formais e acompanhamento de cada caso até o fim.', perfis: TODOS },
          { n: '06', titulo: 'Trote solidário', texto: 'Recepção sem humilhação, com regras claras e tolerância zero a abusos.', perfis: ['calouro'] },
          { n: '07', titulo: 'Campanhas de conscientização', texto: 'Sobre assédio, saúde mental e respeito nas relações entre alunos, professores e preceptores.', perfis: TODOS },
        ],
      },
      {
        titulo: 'Bem-estar no campus',
        propostas: [
          { n: '08', titulo: 'Espaços de convivência e descanso', texto: 'Buscar junto à instituição sofás, micro-ondas, tomadas, armários e uma sala de descompressão.', perfis: ['calouro', 'basico', 'clinico'] },
          { n: '09', titulo: 'Acessibilidade e inclusão', texto: 'Ouvir alunos com deficiência e neurodivergentes e cobrar as adaptações necessárias.', perfis: TODOS },
          { n: '10', titulo: 'Apoio a quem está em vulnerabilidade', texto: 'Divulgar bolsas, auxílios e programas disponíveis, e buscar parcerias para materiais e alimentação.', perfis: TODOS },
        ],
      },
    ],
  },
  {
    id: 'transparencia',
    numero: '04',
    titulo: 'Transparência e Representação',
    tituloCurto: 'Transparência',
    intro: 'O CA pertence aos alunos. Por isso, todo aluno deve saber o que o CA faz, quanto gasta e o que conseguiu.',
    frase: 'Todo mês. Todo centavo.',
    destaques: ['01', '04', '09'],
    grupos: [
      {
        titulo: 'Transparência',
        propostas: [
          { n: '01', titulo: 'Prestação de contas mensal', texto: 'Entradas, saídas e saldo publicados todo mês, com comprovantes disponíveis a quem pedir.', perfis: TODOS },
          { n: '02', titulo: 'Reuniões abertas', texto: 'Encontros periódicos em que qualquer aluno pode participar, perguntar e propor.', perfis: TODOS },
          { n: '03', titulo: 'Atas públicas', texto: 'Resumo de cada reunião da gestão e de cada reunião com a Coordenação.', perfis: TODOS },
          { n: '04', titulo: 'Painel de propostas', texto: 'Acompanhamento público do andamento de cada item deste programa.', perfis: TODOS },
        ],
      },
      {
        titulo: 'Representação',
        propostas: [
          { n: '05', titulo: 'Representantes por turma', texto: 'Um ponto de contato em cada período, com reuniões regulares com a gestão.', perfis: TODOS },
          { n: '06', titulo: 'Voz ativa junto à Coordenação e à Direção', texto: 'Pautas levadas por escrito, com retorno aos alunos sobre cada resposta.', perfis: TODOS },
          { n: '07', titulo: 'Participação nos colegiados', texto: 'Ocupar e fortalecer os espaços de representação discente previstos pela instituição.', perfis: TODOS },
          { n: '08', titulo: 'Avaliação semestral do curso', texto: 'Pesquisa com os alunos sobre disciplinas e campos de estágio, com relatório levado à Coordenação.', perfis: ['basico', 'clinico', 'internato'] },
        ],
      },
      {
        titulo: 'Escuta',
        propostas: [
          { n: '09', titulo: 'Ouvidoria do CA', texto: 'Canal anônimo para denúncias, dúvidas e sugestões, com prazo de retorno para cada manifestação.', perfis: TODOS },
          { n: '10', titulo: 'Consultas aos alunos', texto: 'Decisões importantes do CA passam por enquete aberta antes de serem tomadas.', perfis: TODOS },
        ],
      },
    ],
  },
  {
    id: 'integracao',
    numero: '05',
    titulo: 'Integração, Benefícios e Comunidade',
    tituloCurto: 'Integração',
    intro:
      'Um curso unido aprende melhor, aguenta mais e vive a faculdade de verdade. E o CA também precisa fazer diferença no bolso e fora dos muros.',
    frase: 'Medicina também é time.',
    destaques: ['02', '06', '09'],
    grupos: [
      {
        titulo: 'Integração',
        propostas: [
          { n: '01', titulo: 'Parceria com a Atlética', texto: 'Calendário conjunto de jogos, treinos e eventos esportivos, com apoio a quem representa o curso.', perfis: TODOS },
          { n: '02', titulo: 'Recepção dos calouros', texto: 'Semana de acolhimento com tour pelo campus, apresentação das ligas e do CA, e apadrinhamento por veteranos.', perfis: ['calouro'] },
          { n: '03', titulo: 'Recepção do internato', texto: 'Cerimônia e orientação para quem está começando o ciclo prático.', perfis: ['clinico', 'internato'] },
          { n: '04', titulo: 'Festas e eventos acadêmicos', texto: 'Organizados com segurança, responsabilidade e prestação de contas.', perfis: TODOS },
          { n: '05', titulo: 'Encontros entre períodos', texto: 'Momentos para turmas diferentes se conhecerem, já que o curso inteiro raramente se encontra.', perfis: TODOS },
        ],
      },
      {
        titulo: 'Benefícios',
        propostas: [
          { n: '06', titulo: 'Clube de benefícios do CA', texto: 'Parcerias com descontos em livros, jalecos, estetoscópios, materiais, cursos e academias.', perfis: TODOS },
          { n: '07', titulo: 'Produtos da medicina', texto: 'Moletons, jalecos personalizados e acessórios, com renda revertida para as ações do CA.', perfis: TODOS },
          { n: '08', titulo: 'Descontos em congressos e eventos', texto: 'Negociação de valores especiais para os alunos da FAPI.', perfis: ['basico', 'clinico', 'internato'] },
        ],
      },
      {
        titulo: 'Comunidade',
        propostas: [
          { n: '09', titulo: 'Projetos de ação social', texto: 'Ações de saúde na comunidade, como aferição de pressão, orientação e campanhas, sempre com supervisão adequada.', perfis: TODOS },
          { n: '10', titulo: 'Campanhas solidárias', texto: 'Doação de sangue, arrecadações e apoio a instituições locais.', perfis: TODOS },
          { n: '11', titulo: 'Medicina perto das pessoas', texto: 'Levar informação de saúde a escolas e espaços públicos, aproximando o curso da cidade.', perfis: TODOS },
        ],
      },
    ],
  },
];

export const TOTAL_PROPOSTAS = EIXOS.reduce((t, e) => t + e.grupos.reduce((g, gr) => g + gr.propostas.length, 0), 0);

export const PRINCIPIOS = [
  { id: 'presenca', titulo: 'Presença', texto: 'Um CA que está no campus, no hospital e no internato, não só na eleição.' },
  { id: 'transparencia', titulo: 'Transparência', texto: 'Tudo o que fazemos e gastamos é aberto a qualquer aluno.' },
  { id: 'representacao', titulo: 'Representação', texto: 'Levamos a voz do estudante à Coordenação e à Direção com firmeza e respeito.' },
  { id: 'cuidado', titulo: 'Cuidado', texto: 'Quem cuida de pessoas também precisa ser cuidado.' },
  { id: 'uniao', titulo: 'União', texto: 'Do calouro ao interno, um só curso.' },
] as const;

export const CEM_DIAS = [
  {
    prazo: '30',
    itens: ['Ouvidoria do CA no ar', 'Primeira prestação de contas', 'Representantes de turma definidos', 'Pesquisa com os internos sobre carga horária'],
  },
  {
    prazo: '60',
    itens: ['Protocolo de acidente com material biológico divulgado', 'Primeiro curso prático', 'Primeira roda de conversa', 'Calendário único de eventos publicado'],
  },
  {
    prazo: '100',
    itens: ['Primeira versão do Guia do Internato', 'Proposta de carga horária entregue à Coordenação', 'Clube de benefícios com as primeiras parcerias', 'Relatório público dos 100 dias'],
  },
] as const;

export const COMO_COBRAR = [
  { titulo: 'Painel público', texto: 'O andamento de cada proposta: feito, em andamento ou não iniciado.' },
  { titulo: 'Relatórios', texto: 'Relatório dos 100 dias e ao fim de cada semestre, com o que avançou e o que travou, e por quê.' },
  { titulo: 'Contas abertas', texto: 'Prestação de contas mensal, aberta a qualquer aluno.' },
  { titulo: 'Reuniões abertas', texto: 'Qualquer estudante pode questionar a gestão.' },
  { titulo: 'Ouvidoria com prazo', texto: 'Para que nenhuma manifestação fique sem resposta.' },
] as const;

export const QUEM_SOMOS = {
  curto: 'Somos estudantes do primeiro ao último período, unidos pelo compromisso de construir uma formação médica mais humana, justa, forte e participativa.',
  longo:
    'Acreditamos que a medicina não se faz apenas dentro das salas de aula ou dos hospitais, mas também no respeito ao estudante, na defesa dos nossos direitos e na união. Escolhemos o nome de Vital Brazil porque ele uniu ciência, coragem e serviço, e é isso que queremos para o nosso Centro Acadêmico.',
  cobrar: 'Este programa foi escrito para ser cobrado. Cada proposta diz o que vamos fazer.',
};

export function eixoPorId(id: string | undefined): Eixo | undefined {
  return EIXOS.find((e) => e.id === id);
}

export function todasPropostas() {
  return EIXOS.flatMap((eixo) => eixo.grupos.flatMap((grupo) => grupo.propostas.map((p) => ({ ...p, eixo, grupo: grupo.titulo }))));
}

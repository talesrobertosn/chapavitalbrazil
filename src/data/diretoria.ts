/**
 * DIRETORIA · Gestão Dr. Vital Brazil
 * ----------------------------------------------------------------------------
 * COMO ADICIONAR A FOTO DE ALGUÉM
 *   1. Salve a foto em  src/assets/diretoria/<slug>.jpg  (ou .jpeg/.png/.webp)
 *      O <slug> de cada pessoa está no campo `slug` abaixo.
 *   2. Pronto. O site recorta em círculo, otimiza e usa a foto em todo lugar.
 *   3. Se o rosto ficar fora do centro, ajuste `foco` (ex.: '50% 30%' sobe o
 *      enquadramento) e `zoom` (ex.: 1.2 aproxima).
 *
 * COMO ADICIONAR O DEPOIMENTO ("Eu estou na chapa porque…")
 *   Preencha `porque` com a frase da própria pessoa. Vazio = "em breve".
 *
 * Nada aqui deve ser inventado: só nomes, cargos e turmas informados pela chapa.
 */

export interface Membro {
  slug: string;
  nome: string;
  /** Número da turma (T1 = turma 1). */
  turma: number;
  /** Enquadramento do rosto no círculo (CSS object-position). */
  foco?: string;
  /** Aproximação da foto dentro do círculo (1 = sem zoom). */
  zoom?: number;
  /** "Eu estou na chapa porque…" — escrito pela própria pessoa. */
  porque?: string;
  /** Responde sozinha por uma frente: retrato maior e anel de ouro na diretoria. */
  destaque?: boolean;
}

export interface Cargo {
  id: string;
  numero: string;
  titulo: string;
  /** Núcleo = presidência e vice (destaque visual). */
  nucleo?: boolean;
  membros: Membro[];
}

export const CARGOS: Cargo[] = [
  {
    id: 'presidencia',
    numero: '01',
    titulo: 'Presidência',
    nucleo: true,
    membros: [{ slug: 'enzo-martins-de-marco-santos', nome: 'Enzo Martins de Marco Santos', turma: 1, porque: 'Como estudante da primeira turma de Medicina da Faculdade de Pinhais, reconheço o legado que cada estudante, da T1 à T6, constrói e carrega na história da nossa instituição. Um legado formado por diferentes trajetórias, vivências e perspectivas que, apesar de suas particularidades, se encontram e se fortalecem no mesmo ambiente. Nosso objetivo, enquanto chapa, é garantir que essa pluralidade de histórias e ideias seja respeitada e que todas as vozes que a representam tenham espaço para se expressar e serem ouvidas. Como Presidente, assumo o compromisso de atuar para que cada demanda seja acolhida, encaminhada e acompanhada com responsabilidade pelo Centro Acadêmico, buscando assegurar que toda a comunidade estudantil do curso de Medicina da Faculdade de Pinhais se sinta representada, amparada e parte ativa da construção da nossa história.\n\n"A única felicidade da vida está na consciência de ter realizado algo útil em benefício da comunidade." (Vital Brazil)' }],
  },
  {
    id: 'vice-presidencia',
    numero: '02',
    titulo: 'Vice-Presidência',
    nucleo: true,
    membros: [{ slug: 'rafaella-hanna-arcanjo', nome: 'Rafaella Hanna Arcanjo', turma: 4, porque: 'Como acadêmica de medicina, autora de diversos artigos científicos publicados e Diretora da Liga Acadêmica de Psiquiatria da PUCPR. Acredito que liderança vai muito além de ocupar um cargo e sim, assumir responsabilidades, dar voz às pessoas e transformar ideias em mudanças reais. Minha trajetória na produção científica e no meio acadêmico fortaleceu meu compromisso com o conhecimento, a representatividade e a vontade de tornar a FAPI cada vez mais forte no meio acadêmico. Quero ser vice-presidente do Centro Acadêmico porque acredito que os estudantes merecem uma gestão presente, atuante e comprometida com as demandas e necessidades dos estudantes. Quero contribuir com iniciativa, responsabilidade e propósito, ajudando a construir um Centro acadêmico que não apenas represente os acadêmicos, mas que faça mudanças reais e a diferença na trajetória de cada um. Não quero ocupar um cargo apenas por ocupar, quero fazer parte de uma gestão que deixe sua marca e construa algo que realmente transforme a vida acadêmica de todos os estudantes da FAPI.' }],
  },
  {
    id: 'secretaria',
    numero: '03',
    titulo: 'Secretaria',
    membros: [
      { slug: 'marcela-beatriz-brittes-ranciaro', nome: 'Marcela Beatriz Brittes Ranciaro', turma: 3, porque: 'Quero contribuir para que a voz dos estudantes seja ouvida e para que nossas necessidades se transformem em iniciativas que melhorem a experiência acadêmica de todos.' },
      { slug: 'ana-julia-machado-woiciechovski', nome: 'Ana Julia Machado Woiciechovski', turma: 3, porque: 'Acredito na importância de uma representação estudantil presente e participativa, capaz de aproximar os alunos, identificar suas demandas e buscar melhorias para a nossa vivência acadêmica.' },
    ],
  },
  {
    id: 'cientifica',
    numero: '04',
    titulo: 'Diretoria Científica',
    membros: [
      { slug: 'julia-london-fontoura', nome: 'Julia London Fontoura', turma: 2, porque: 'Por ser aluna transferida, sei como pode ser desafiador chegar a uma faculdade nova. Quero fazer parte da chapa para representar também esses alunos, ouvir diferentes perspectivas e contribuir para uma experiência acadêmica melhor para todos.' },
      { slug: 'isadora-bertolli', nome: 'Isadora Bertolli', turma: 2 },
    ],
  },
  {
    id: 'ensino-pesquisa',
    numero: '05',
    titulo: 'Coordenação de Ensino e Pesquisa',
    membros: [
      { slug: 'julia-sinestri-dos-santos', nome: 'Julia Sinestri dos Santos', turma: 3, porque: 'Quero fazer parte do Centro Acadêmico porque acredito que posso contribuir ativamente para melhorar a experiência dos alunos na faculdade, tornando o ambiente mais acolhedor, transparente e participativo. Gostaria de ajudar os estudantes transferidos a passarem por uma transição mais tranquila, além de incentivar melhorias na área acadêmica e ampliar as oportunidades de pesquisa e desenvolvimento científico, buscando uma faculdade cada vez mais integrada e comprometida com a formação dos seus alunos.' },
      { slug: 'maria-luisa-de-souza-keretch', nome: 'Maria Luisa de Souza Keretch', turma: 3, porque: 'Quero participar do Centro Acadêmico para colaborar de um jeito que realmente faça diferença no nosso dia a dia. Acredito que dá pra criar um espaço mais próximo, onde todo mundo se sinta ouvido e parte das decisões. Quero fortalecer esse senso de comunidade, ajudar a aproximar as turmas e incentivar projetos que melhorem nossa vivência dentro e fora da sala de aula. Meu objetivo é contribuir com dedicação, ouvir diferentes perspectivas e transformar boas ideias em ações concretas.' },
    ],
  },
  {
    id: 'patrimonio',
    numero: '06',
    titulo: 'Diretoria de Patrimônio',
    membros: [
      { slug: 'ana-helena-laginski', nome: 'Ana Helena Laginski', turma: 2, porque: 'Acredito que a representação estudantil é essencial para unir os alunos, ouvir suas demandas e dialogar com a direção para assim construirmos uma melhor experiência acadêmica para todos.' },
      { slug: 'gabriel-belloulou', nome: 'Gabriel Belloulou', turma: 6, porque: 'Mesmo tendo ingressado há pouco tempo na faculdade, já vejo a importância da união e da participação dos alunos. Quero fazer parte do Centro Acadêmico para contribuir com ideias, ouvir os colegas e ajudar a construir uma faculdade mais integrada e representativa para todos!' },
    ],
  },
  {
    id: 'marketing',
    numero: '07',
    titulo: 'Diretoria de Marketing',
    membros: [{ slug: 'valeria-godoy-de-aguiar-e-sousa', nome: 'Valéria Godoy de Aguiar e Sousa', turma: 1, porque: 'Entrei em Medicina para cuidar de pessoas, e logo percebi que esse cuidado não começa no hospital. Começa aqui, entre nós: no colega que está exausto, no calouro que chegou perdido, em quem precisava ser ouvido e não tinha onde falar.\n\nEstou na chapa para o Centro Acadêmico porque um dia também precisei de alguém do meu lado. Agora quero ser esse alguém. Não para passar pela faculdade, mas para deixá-la melhor para quem vem depois. 💚', destaque: true }],
  },
  {
    id: 'produtos',
    numero: '08',
    titulo: 'Diretoria de Produtos',
    membros: [
      { slug: 'julia-de-souza-moroz', nome: 'Júlia de Souza Moroz', turma: 5, porque: 'Escolhi fazer parte desse projeto para transformar ideias em experiências, criar memórias e construir juntos a nossa história.' },
      { slug: 'elias-pacheco-pinto', nome: 'Elias Pacheco Pinto', turma: 5, porque: 'Quero ser a ponte entre os nossos desafios e as melhorias que garantem uma medicina mais estruturada e bem amparada.' },
    ],
  },
  {
    id: 'comunicacao',
    numero: '09',
    titulo: 'Diretoria de Comunicação',
    membros: [
      { slug: 'samuel-alberto-saar-filho', nome: 'Samuel Alberto Saar Filho', turma: 3, porque: 'Gostaria de fortalecer a união entre os estudantes, dar voz às suas necessidades e lutar pelos nossos direitos, sempre respeitando as individualidades. Meu propósito é contribuir para uma faculdade mais acolhedora, participativa e colaborativa, onde todos tenham a oportunidade de crescer e fazer a diferença. Acredito nos valores da chapa Vital Brazil, e juntos vamos transformar nosso espaço acadêmico.' },
      { slug: 'nelson-juvenal-da-silva-sobrinho', nome: 'Nelson Juvenal da Silva Sobrinho', turma: 5, porque: 'Acredito que o valor da nossa existência se revela no impacto que causamos na vida daqueles que nos rodeiam. Por isso, darei o meu melhor para contribuir com a construção de um Centro Acadêmico em que cada estudante, respeitadas suas particularidades, encontre acolhimento, pertencimento e a certeza de que sua voz tem valor.' },
    ],
  },
  {
    id: 'extensao',
    numero: '10',
    titulo: 'Diretoria de Extensão',
    membros: [{ slug: 'julia-moreira-rapelli', nome: 'Júlia Moreira Rapelli', turma: 4, porque: 'Acredito que podemos construir uma trajetória universitária melhor quando trabalhamos juntos. Quero contribuir com ideias, ouvir as necessidades dos alunos e transformar nossas demandas em ações concretas. Mais do que ocupar um cargo, quero fazer a diferença e ajudar a construir um curso que represente todos nós!' }],
  },
  {
    id: 'relacoes-publicas',
    numero: '11',
    titulo: 'Diretoria de Relações Públicas',
    membros: [
      { slug: 'carlos-roberto-botelho-filho', nome: 'Carlos Roberto Botelho Filho', turma: 1, porque: 'Quero contribuir ativamente com a representatividade estudantil, promover iniciativas que fortaleçam a formação médica e transformar ideias em ações que gerem impacto positivo na vida acadêmica dos estudantes. Acredito na liderança como ferramenta de união, mudança e construção coletiva.' },
      { slug: 'sergio-luiz-roman-de-faria', nome: 'Sérgio Luiz Roman de Faria', turma: 4, porque: 'Fazer a diferença com propósito e competência.' },
    ],
  },
  {
    id: 'juridica',
    numero: '12',
    titulo: 'Diretoria Jurídica',
    membros: [
      { slug: 'carla-cristina-pereira-paschoal-da-silva', nome: 'Carla Cristina Pereira Paschoal da Silva', turma: 4, porque: 'Minha motivação para entrar nesta chapa é usar o conhecimento jurídico em prol dos alunos, assegurando transparência, segurança e melhorias práticas para todos nós.' },
      { slug: 'tatiane-cordeiro-breda-de-siqueira', nome: 'Tatiane Cordeiro Breda de Siqueira', turma: 3, porque: 'Candidato-me à Diretoria Jurídica porque acredito que a defesa dos direitos estudantis, a legalidade, a ética e a transparência são pilares inegociáveis de uma gestão democrática. Nenhum acadêmico deve ser privado de voz, nenhum direito deve ser negligenciado e nenhum ato de gestão deve estar acima dos princípios da legalidade, da impessoalidade e da publicidade.' },
    ],
  },
  {
    id: 'financeira',
    numero: '13',
    titulo: 'Diretoria Financeira',
    membros: [
      { slug: 'bruna-barrim-chandoha', nome: 'Bruna Barrim Chandoha', turma: 3, porque: 'Quero fazer parte dessa chapa porque acredito que posso contribuir de alguma forma para tornar nossa experiência na faculdade ainda melhor.\n\nSou formada em Ciências Contábeis pela UFPR e acredito que minha experiência e meus conhecimentos podem somar bastante, principalmente na parte de organização e gestão.\n\nMas, acima de tudo, quero ajudar no que for preciso, ouvir meus colegas, trocar ideias e fazer parte de um grupo que realmente queira fazer a diferença. Sei que nem tudo depende apenas de nós, mas acredito que, com dedicação, diálogo e trabalho em equipe, podemos conquistar muitas coisas juntos.\n\nMinha intenção é simples: somar, ajudar e fazer o melhor que estiver ao meu alcance! 💛' },
      { slug: 'pedro-ramiro-meireles-santos', nome: 'Pedro Ramiro Meireles Santos', turma: 2, porque: 'Sempre enxerguei a Medicina como uma oportunidade de fazer a diferença na vida das pessoas. Fazer parte da Dr. Vital Brazil é uma forma de começar isso ainda na faculdade: ouvindo meus colegas, ajudando a superar dificuldades e contribuindo para uma formação cada vez melhor. Acima de tudo, quero poder olhar para trás e saber que fiz o meu melhor por aqueles que estiveram ao meu lado.' },
    ],
  },
];

export interface MembroComCargo extends Membro {
  cargo: Cargo;
  /** Posição (0..n-1) na ordem oficial. */
  indice: number;
}

export const MEMBROS: MembroComCargo[] = CARGOS.flatMap((cargo) => cargo.membros.map((m) => ({ ...m, cargo }))).map((m, indice) => ({ ...m, indice }));

export const TURMAS = [...new Set(MEMBROS.map((m) => m.turma))].sort((a, b) => a - b);

export function membroPorSlug(slug: string | undefined) {
  return MEMBROS.find((m) => m.slug === slug);
}

const PARTICULAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);
const SUFIXOS = new Set(['filho', 'filha', 'sobrinho', 'sobrinha', 'neto', 'neta', 'junior', 'júnior', 'jr', 'jr.']);

/** Iniciais: primeiro nome + último sobrenome (ignorando "de", "Filho" etc.). */
export function iniciais(nome: string) {
  const partes = nome.split(/\s+/).filter((p) => !PARTICULAS.has(p.toLowerCase()));
  while (partes.length > 2 && SUFIXOS.has(partes[partes.length - 1]!.toLowerCase())) partes.pop();
  const primeiro = partes[0] ?? '';
  const ultimo = partes.length > 1 ? partes[partes.length - 1]! : '';
  return (primeiro.charAt(0) + ultimo.charAt(0)).toUpperCase();
}

export function primeiroNome(nome: string) {
  return nome.split(/\s+/)[0] ?? nome;
}

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
    membros: [{ slug: 'enzo-martins-de-marco-santos', nome: 'Enzo Martins de Marco Santos', turma: 1 }],
  },
  {
    id: 'vice-presidencia',
    numero: '02',
    titulo: 'Vice-Presidência',
    nucleo: true,
    membros: [{ slug: 'rafaella-hanna-arcanjo', nome: 'Rafaella Hanna Arcanjo', turma: 4 }],
  },
  {
    id: 'secretaria',
    numero: '03',
    titulo: 'Secretaria',
    membros: [
      { slug: 'marcela-beatriz-brittes-ranciaro', nome: 'Marcela Beatriz Brittes Ranciaro', turma: 3 },
      { slug: 'ana-julia-machado-woiciechovski', nome: 'Ana Julia Machado Woiciechovski', turma: 3 },
    ],
  },
  {
    id: 'cientifica',
    numero: '04',
    titulo: 'Diretoria Científica',
    membros: [
      { slug: 'julia-london-fontoura', nome: 'Julia London Fontoura', turma: 2 },
      { slug: 'isadora-bertolli', nome: 'Isadora Bertolli', turma: 2 },
    ],
  },
  {
    id: 'ensino-pesquisa',
    numero: '05',
    titulo: 'Coordenação de Ensino e Pesquisa',
    membros: [
      { slug: 'julia-sinestri-dos-santos', nome: 'Julia Sinestri dos Santos', turma: 3 },
      { slug: 'maria-luisa-de-souza-keretch', nome: 'Maria Luisa de Souza Keretch', turma: 3 },
    ],
  },
  {
    id: 'patrimonio',
    numero: '06',
    titulo: 'Diretoria de Patrimônio',
    membros: [
      { slug: 'ana-helena-laginski', nome: 'Ana Helena Laginski', turma: 2 },
      { slug: 'gabriel-belloulou', nome: 'Gabriel Belloulou', turma: 6 },
    ],
  },
  {
    id: 'marketing',
    numero: '07',
    titulo: 'Diretoria de Marketing',
    membros: [
      { slug: 'allana-stancke-akamatsu', nome: 'Allana Stancke Akamatsu', turma: 1 },
      { slug: 'valeria-godoy-de-aguiar-e-sousa', nome: 'Valéria Godoy de Aguiar e Sousa', turma: 1 },
    ],
  },
  {
    id: 'produtos',
    numero: '08',
    titulo: 'Diretoria de Produtos',
    membros: [
      { slug: 'julia-de-souza-moroz', nome: 'Júlia de Souza Moroz', turma: 5 },
      { slug: 'elias-pacheco-pinto', nome: 'Elias Pacheco Pinto', turma: 5 },
    ],
  },
  {
    id: 'comunicacao',
    numero: '09',
    titulo: 'Diretoria de Comunicação',
    membros: [
      { slug: 'samuel-alberto-saar-filho', nome: 'Samuel Alberto Saar Filho', turma: 3 },
      { slug: 'nelson-juvenal-da-silva-sobrinho', nome: 'Nelson Juvenal da Silva Sobrinho', turma: 5 },
    ],
  },
  {
    id: 'extensao',
    numero: '10',
    titulo: 'Diretoria de Extensão',
    membros: [{ slug: 'julia-moreira-rapelli', nome: 'Júlia Moreira Rapelli', turma: 4 }],
  },
  {
    id: 'relacoes-publicas',
    numero: '11',
    titulo: 'Diretoria de Relações Públicas',
    membros: [
      { slug: 'carlos-roberto-botelho-filho', nome: 'Carlos Roberto Botelho Filho', turma: 1 },
      { slug: 'sergio-luiz-roman-de-faria', nome: 'Sérgio Luiz Roman de Faria', turma: 4 },
    ],
  },
  {
    id: 'juridica',
    numero: '12',
    titulo: 'Diretoria Jurídica',
    membros: [
      { slug: 'carla-cristina-pereira-paschoal-da-silva', nome: 'Carla Cristina Pereira Paschoal da Silva', turma: 4 },
      { slug: 'tatiane-cordeiro-breda-de-siqueira', nome: 'Tatiane Cordeiro Breda de Siqueira', turma: 3 },
    ],
  },
  {
    id: 'financeira',
    numero: '13',
    titulo: 'Diretoria Financeira',
    membros: [
      { slug: 'bruna-barrim-chandoha', nome: 'Bruna Barrim Chandoha', turma: 3 },
      { slug: 'pedro-ramiro-meireles-santos', nome: 'Pedro Ramiro Meireles Santos', turma: 2 },
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

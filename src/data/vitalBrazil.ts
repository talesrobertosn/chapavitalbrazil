/**
 * VITAL BRAZIL MINEIRO DA CAMPANHA (1865–1950)
 * Linha do tempo com fatos amplamente documentados. Ao revisar, mantenha
 * o tom sóbrio: nada de frases atribuídas a ele sem fonte.
 */

export interface Marco {
  ano: string;
  titulo: string;
  texto: string;
  /** Marcos principais aparecem no resumo da home. */
  destaque?: boolean;
}

export const MARCOS: Marco[] = [
  {
    ano: '1865',
    titulo: 'Nasce em Campanha, Minas Gerais',
    texto: 'Vital Brazil Mineiro da Campanha leva no próprio nome a cidade onde nasceu, no sul de Minas.',
    destaque: true,
  },
  {
    ano: '1892',
    titulo: 'Forma-se médico no Rio de Janeiro',
    texto: 'Logo depois, entra para o serviço sanitário paulista e enfrenta epidemias no interior do estado.',
  },
  {
    ano: '1899',
    titulo: 'A peste chega a Santos',
    texto: 'O combate à epidemia leva à criação de um laboratório para produzir soro na fazenda Butantan, em São Paulo.',
  },
  {
    ano: '1901',
    titulo: 'Primeiro diretor do Instituto Butantan',
    texto: 'À frente do instituto, transforma um laboratório improvisado em referência científica.',
    destaque: true,
  },
  {
    ano: 'Soros',
    titulo: 'A especificidade dos soros antiofídicos',
    texto: 'Demonstra que cada soro age contra o veneno de um tipo de serpente. Uma descoberta que salvou e salva incontáveis vidas.',
    destaque: true,
  },
  {
    ano: '1919',
    titulo: 'Funda o instituto em Niterói',
    texto: 'Cria o instituto que hoje leva o seu nome, dedicado à pesquisa e à produção de soros.',
    destaque: true,
  },
  {
    ano: '1950',
    titulo: 'Um legado que segue vivo',
    texto: 'Deixa uma obra que une ciência, saúde pública e compromisso com o país.',
  },
];

export const REDE = {
  titulo: 'Você sabia? Ciência se faz em rede.',
  texto:
    'Fazendeiros de todo o interior enviavam serpentes ao Butantan e, em troca, recebiam doses de soro. Uma rede de gente comum tornou possível a ciência que salvava vidas no campo.',
  ponte: 'É assim que queremos o nosso CA: cada estudante contribuindo, e todos recebendo de volta.',
};

export const POR_ISSO = 'Ciência, coragem e serviço. Por isso o nome.';

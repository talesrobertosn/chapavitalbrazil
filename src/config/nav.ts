export interface NavItem {
  to: string;
  rotulo: string;
  descricao: string;
}

export const NAV: NavItem[] = [
  { to: '/programa', rotulo: 'Programa', descricao: '5 eixos, todas as propostas' },
  { to: '/diretoria', rotulo: 'Diretoria', descricao: 'Quem faz a gestão' },
  { to: '/vital-brazil', rotulo: 'Vital Brazil', descricao: 'Por que o nome' },
  { to: '/diario', rotulo: 'Diário', descricao: 'Os 20 dias de campanha' },
  { to: '/fale-conosco', rotulo: 'Fale conosco', descricao: 'Ouvidoria e perguntas' },
];

export const NAV_EXTRA: NavItem[] = [
  { to: '/votar', rotulo: 'Como votar', descricao: 'Data, local e lembrete' },
  { to: '/calouro', rotulo: 'Querido calouro', descricao: 'Uma carta pra quem chega' },
  { to: '/transferido', rotulo: 'Querido transferido', descricao: 'Pra quem chegou depois' },
  { to: '/compartilhar', rotulo: 'Stories', descricao: 'Imagens para compartilhar' },
];

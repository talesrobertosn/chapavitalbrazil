/**
 * BANCO DE FRASES · fonte: "Calendário de 20 dias" (banco extra + cards).
 * `destaque` = palavra pintada em ouro com pincelada nos Stories.
 */
export interface Frase {
  texto: string;
  destaque?: string;
}

export const FRASES: Frase[] = [
  { texto: 'A medicina também se faz fora da sala de aula.', destaque: 'fora' },
  { texto: 'Antes de ser médico, você é gente.', destaque: 'gente.' },
  { texto: 'Cansaço não é mérito.', destaque: 'mérito.' },
  { texto: 'Formação forte começa com estudante ouvido.', destaque: 'ouvido.' },
  { texto: 'Representar é estar presente, não só aparecer na eleição.', destaque: 'presente,' },
  { texto: 'O CA é seu. A gente só quer cuidar bem dele.', destaque: 'seu.' },
  { texto: 'Humanizar a medicina começa por humanizar quem estuda medicina.', destaque: 'humanizar' },
  { texto: 'Do primeiro dia de aula ao último plantão, com você.', destaque: 'você.' },
  { texto: 'Menos promessa, mais prestação de contas.', destaque: 'contas.' },
  { texto: 'Quem cuida também precisa de cuidado.', destaque: 'cuidado.' },
  { texto: 'Tradição para lembrar de onde viemos. Coragem para mudar o que precisa.', destaque: 'coragem' },
  { texto: 'Todo mês. Todo centavo.', destaque: 'centavo.' },
  { texto: 'Medicina também é time.', destaque: 'time.' },
];

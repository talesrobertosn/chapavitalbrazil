/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ----------------------------------------------------------------------------
 * Tudo o que muda com frequência mora aqui. Alterou a data da eleição?
 * Mude só `eleicao.data` e o site inteiro se ajusta: contagem regressiva,
 * modo véspera, modo dia da eleição e diário da campanha.
 */

declare const __SITE_URL__: string | undefined;
declare const process: { env?: Record<string, string | undefined> } | undefined;

const PADRAO = 'https://talesrobertosn.github.io/chapavitalbrazil';
const URL_PUBLICA = (
  (typeof __SITE_URL__ !== 'undefined' && __SITE_URL__) ||
  (typeof process !== 'undefined' && process.env?.SITE_URL) ||
  PADRAO
).replace(/\/$/, '');

export const site = {
  nome: 'Gestão Dr. Vital Brazil',
  assinatura: 'Gestão Dr. Vital Brazil · CA Medicina FAPI',
  slogan: 'Mais que uma gestão, um compromisso com a nossa formação.',
  lema: 'De estudantes para estudantes.',
  instagram: {
    handle: '@chapavitalbrazil',
    url: 'https://www.instagram.com/chapavitalbrazil/',
  },
  hashtags: ['#GestãoVitalBrazil', '#CAMedFAPI', '#MedicinaFAPI', '#UmaMedicinaMaisHumana', '#EstudanteDeMedicina'],

  eleicao: {
    /** Data no formato AAAA-MM-DD (horário de Brasília). */
    data: '2026-11-20',
    /** Enquanto `false`, o site mostra "data a confirmar" ao lado da data. */
    confirmada: false,
    /** Preencha quando souber, ex.: '8h às 18h'. Vazio = "a confirmar". */
    horario: '',
    /** Preencha quando souber, ex.: 'Hall do bloco A'. Vazio = "a confirmar". */
    local: '',
    /** Preencha quando souber. Vazio = "a confirmar". */
    quemVota: '',
  },

  /** Primeiro dia do calendário de 20 dias no Instagram (dia 1). */
  campanhaInicio: '2026-10-14',

  /**
   * Link do formulário anônimo da Ouvidoria (ex.: Tally ou Google Forms
   * configurado SEM coleta de e-mail). Vazio = o site orienta a usar o direct.
   */
  ouvidoriaUrl: '',
  /** Prazo de retorno da Ouvidoria em dias (promessa do programa). Vazio = não exibe. */
  ouvidoriaPrazoDias: '',

  /** E-mail de contato (montado no navegador para dificultar robôs de spam). */
  email: { usuario: 'valeriagodoy0208', dominio: 'gmail.com' },

  /**
   * Google Search Console: cole aqui só o código do "content" da tag
   * <meta name="google-site-verification" content="..."> (método "Tag HTML").
   * Vazio = a tag não é gerada.
   */
  googleVerificacao: '',

  /**
   * Endereço público do site: vai em TODAS as mensagens de WhatsApp,
   * stories, prévias e no sitemap. Vem da variável SITE_URL do deploy
   * (.github/workflows/deploy.yml). Trocou o domínio? Mude só lá.
   */
  url: URL_PUBLICA,
} as const;

export type Site = typeof site;

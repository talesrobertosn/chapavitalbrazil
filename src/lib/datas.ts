/** Datas sempre no fuso de Brasília (sem horário de verão desde 2019: UTC−3). */
const TZ_OFFSET = '-03:00';

export function parseISODate(iso: string): Date {
  return new Date(`${iso}T00:00:00${TZ_OFFSET}`);
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 86_400_000);
}

const fmtDia = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' });

/** "AAAA-MM-DD" de uma data, no fuso de Brasília. */
export function diaISO(d: Date): string {
  return fmtDia.format(d);
}

const fmtLongo = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: 'numeric', month: 'long' });
const fmtCurto = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'short' });
const fmtSemana = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long' });

export const formatarLongo = (d: Date) => fmtLongo.format(d); // "20 de novembro"
export const formatarCurto = (d: Date) => fmtCurto.format(d).replace('.', ''); // "20 nov"
export const diaDaSemana = (d: Date) => fmtSemana.format(d); // "sexta-feira"

/** Diferença em dias de calendário (Brasília) entre hoje e a data. */
export function diasAte(alvo: Date, agora: Date = new Date()): number {
  const a = parseISODate(diaISO(agora)).getTime();
  const b = parseISODate(diaISO(alvo)).getTime();
  return Math.round((b - a) / 86_400_000);
}

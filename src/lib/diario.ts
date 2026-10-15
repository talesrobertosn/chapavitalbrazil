import { DIARIO, type DiaCampanha } from '../data/diario';
import { diaISO } from './datas';

export function estadoDoDia(d: DiaCampanha, agora = new Date()): 'aberto' | 'hoje' | 'lacrado' {
  const hoje = diaISO(agora);
  const dia = diaISO(d.data);
  if (dia === hoje) return 'hoje';
  return dia < hoje ? 'aberto' : 'lacrado';
}

/** Último dia já publicado (ou o primeiro, antes do início). */
export function diaAtual(agora = new Date()): DiaCampanha {
  const abertos = DIARIO.filter((d) => estadoDoDia(d, agora) !== 'lacrado');
  return abertos[abertos.length - 1] ?? DIARIO[0]!;
}

import { useEffect, useState } from 'react';
import { site } from '../config/site';
import { diasAte, parseISODate } from './datas';

/**
 * Fases do site, calculadas no navegador (o site é estático, então a fase
 * muda sozinha no dia certo, sem precisar publicar de novo).
 */
export type Fase = 'campanha' | 'vespera' | 'eleicao' | 'encerrada';

export const DATA_ELEICAO = parseISODate(site.eleicao.data);

export function calcularFase(agora = new Date()): Fase {
  const d = diasAte(DATA_ELEICAO, agora);
  if (d > 1) return 'campanha';
  if (d === 1) return 'vespera';
  if (d === 0) return 'eleicao';
  return 'encerrada';
}

/** Permite pré-visualizar fases com ?fase=vespera (útil para revisar). */
function faseForcada(): Fase | null {
  if (typeof window === 'undefined') return null;
  const f = new URLSearchParams(window.location.search).get('fase');
  return f === 'campanha' || f === 'vespera' || f === 'eleicao' || f === 'encerrada' ? f : null;
}

export function useFase(): Fase {
  const [fase, setFase] = useState<Fase>(() => faseForcada() ?? calcularFase());
  useEffect(() => {
    if (faseForcada()) return;
    const id = window.setInterval(() => setFase(calcularFase()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return fase;
}

export interface Restante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
  total: number;
}

export function useContagem(alvo: Date = DATA_ELEICAO): Restante {
  const calc = (): Restante => {
    const total = Math.max(0, alvo.getTime() - Date.now());
    return {
      total,
      dias: Math.floor(total / 86_400_000),
      horas: Math.floor((total / 3_600_000) % 24),
      minutos: Math.floor((total / 60_000) % 60),
      segundos: Math.floor((total / 1000) % 60),
    };
  };
  const [r, setR] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setR(calc()), 1000);
    return () => window.clearInterval(id);
  }, [alvo.getTime()]);
  return r;
}

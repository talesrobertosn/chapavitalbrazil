import { useSyncExternalStore } from 'react';

function subscribe(query: string) {
  return (cb: () => void) => {
    const m = window.matchMedia(query);
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
  };
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(subscribe(query), () => window.matchMedia(query).matches, () => false);
}

/** Computador com mouse de verdade (hover confiável). */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useIsDesktop = () => useMediaQuery('(min-width: 64rem)');

/** Aparelho modesto ou economia de dados: menos efeitos. */
export function isLowPower(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return Boolean(nav.connection?.saveData) || (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 2;
}

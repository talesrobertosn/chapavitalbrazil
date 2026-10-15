import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { useFinePointer } from '../../lib/media';

interface Ctx {
  /** Rola suavemente até um elemento, seletor ou posição. */
  scrollTo: (alvo: string | HTMLElement | number, opts?: { immediate?: boolean; offset?: number }) => void;
  /** Trava a rolagem (menus e sobreposições). Retorna a função que destrava. */
  lock: () => () => void;
}

const SmoothCtx = createContext<Ctx>({
  scrollTo: () => undefined,
  lock: () => () => undefined,
});

export const useSmooth = () => useContext(SmoothCtx);

/**
 * Rolagem suave (Lenis) apenas em computadores com mouse e sem
 * "reduzir movimento". No toque, a rolagem nativa é sempre melhor.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(0);

  useEffect(() => {
    if (!fine || reduce) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.95 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [fine, reduce]);

  const scrollTo = useCallback<Ctx['scrollTo']>(
    (alvo, opts = {}) => {
      const header = 72;
      const offset = opts.offset ?? (typeof alvo === 'number' ? 0 : -header + 1);
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(alvo, { offset, immediate: opts.immediate, duration: 1.6, easing: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2), force: true });
        return;
      }
      let y = 0;
      if (typeof alvo === 'number') y = alvo;
      else {
        const el = typeof alvo === 'string' ? document.querySelector<HTMLElement>(alvo) : alvo;
        if (!el) return;
        y = el.getBoundingClientRect().top + window.scrollY + offset;
      }
      window.scrollTo({ top: y, behavior: opts.immediate || reduce ? 'auto' : 'smooth' });
    },
    [reduce],
  );

  const lock = useCallback(() => {
    locks.current += 1;
    lenisRef.current?.stop();
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    if (sw > 0) document.documentElement.style.paddingRight = `${sw}px`;
    let liberado = false;
    return () => {
      if (liberado) return;
      liberado = true;
      locks.current = Math.max(0, locks.current - 1);
      if (locks.current === 0) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        lenisRef.current?.start();
      }
    };
  }, []);

  const value = useMemo(() => ({ scrollTo, lock }), [scrollTo, lock]);
  return <SmoothCtx.Provider value={value}>{children}</SmoothCtx.Provider>;
}

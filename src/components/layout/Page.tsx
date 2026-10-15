import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { Medal } from '../brand/Brand';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';
import { useSmooth } from './SmoothScroll';
import { site } from '../../config/site';

let primeiraCarga = true;
const posicoes = new Map<string, number>();

const cortina: Variants = {
  ini: { scaleY: 1, originY: 0 },
  in: { scaleY: 0, originY: 0, transition: { scaleY: { duration: 0.85, ease: EASE_IN_OUT, delay: 0.05 }, originY: { duration: 0 } } },
  out: { scaleY: 1, originY: 1, transition: { scaleY: { duration: 0.6, ease: EASE_IN_OUT }, originY: { duration: 0 } } },
};

const selo: Variants = {
  ini: { opacity: 1, scale: 1 },
  in: { opacity: 0, scale: 0.92, transition: { duration: 0.35, ease: EASE_OUT } },
  out: { opacity: [0, 1], scale: [0.9, 1], transition: { duration: 0.4, delay: 0.25, ease: EASE_OUT } },
};

const conteudo: Variants = {
  ini: { opacity: 0, y: 40 },
  in: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, delay: 0.35 } },
  out: { opacity: 0, y: -24, transition: { duration: 0.5, ease: EASE_IN_OUT } },
};

/**
 * Envolve cada página: cuida do título, da posição de rolagem
 * e da transição em cortina entre páginas.
 */
export function Page({ titulo, children, tema = 'noite' }: { titulo?: string; children: ReactNode; tema?: 'noite' | 'papel' }) {
  const reduce = useReducedMotion();
  const location = useLocation();
  const navType = useNavigationType();
  const { scrollTo } = useSmooth();
  // Calculado uma única vez: re-renderizações não podem reativar a cortina.
  const [inicial] = useState<false | 'ini'>(() => (primeiraCarga || reduce ? false : 'ini'));

  useEffect(() => {
    primeiraCarga = false;
  }, []);

  useEffect(() => {
    document.title = titulo ? `${titulo} · ${site.nome}` : `${site.nome} · CA Medicina FAPI`;
  }, [titulo]);

  // Posição: volta onde estava (voltar/avançar) ou vai ao topo.
  useLayoutEffect(() => {
    const chave = location.pathname;
    if (!location.hash) {
      if (navType === 'POP' && posicoes.has(chave)) scrollTo(posicoes.get(chave)!, { immediate: true });
      else scrollTo(0, { immediate: true });
    }
    return () => {
      posicoes.set(chave, window.scrollY);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Âncoras (#secao): rola suavemente, inclusive dentro da mesma página.
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) scrollTo(el);
    }, reduce ? 0 : 650);
    return () => window.clearTimeout(t);
  }, [location.hash, location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.main id="conteudo" initial={inicial} animate="in" exit="out" className={tema === 'papel' ? 'on-paper' : undefined}>
      <motion.div variants={reduce ? undefined : conteudo}>{children}</motion.div>
      {!reduce && (
        <motion.div
          variants={cortina}
          aria-hidden="true"
          className="no-print pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-noite"
        >
          <div className="grain" />
          <motion.div variants={selo} className="flex flex-col items-center gap-4">
            <Medal className="size-16 text-papel" title="" />
            <span className="h-px w-16 bg-ouro" />
          </motion.div>
        </motion.div>
      )}
    </motion.main>
  );
}

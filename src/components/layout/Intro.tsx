import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { MEDAL } from '../brand/logoPaths';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';

const CHAVE = 'vb-intro-vista';

function jaViu() {
  try {
    return sessionStorage.getItem(CHAVE) === '1';
  } catch {
    return false;
  }
}

/**
 * Abertura (só na primeira visita da sessão, ~1,9 s):
 * o medalhão é gravado em traço dourado, ganha preenchimento,
 * e a cena se abre em arco revelando o site. Toque/tecla pula.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [ativo, setAtivo] = useState(() => !jaViu() && !reduce && typeof window !== 'undefined' && window.location.search.indexOf('semintro') === -1);

  useEffect(() => {
    if (!ativo) return;
    try {
      sessionStorage.setItem(CHAVE, '1');
    } catch {
      /* navegação privada */
    }
    const t = window.setTimeout(() => setAtivo(false), 2300);
    const pular = () => setAtivo(false);
    window.addEventListener('keydown', pular);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', pular);
    };
  }, [ativo]);

  return (
    <AnimatePresence>
      {ativo && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-noite"
          onClick={() => setAtivo(false)}
          aria-hidden="true"
          exit={{ clipPath: 'inset(0% 0% 100% 0% round 0% 0% 50% 50%)', transition: { duration: 1, ease: EASE_IN_OUT } }}
          initial={{ clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)' }}
        >
          <div className="grain" />
          <motion.div
            className="relative flex flex-col items-center"
            exit={{ y: -60, opacity: 0, transition: { duration: 0.6, ease: EASE_IN_OUT } }}
          >
            <svg viewBox={MEDAL.viewBox} className="size-[clamp(9rem,26vw,13rem)]" aria-hidden="true">
              <motion.path
                d={MEDAL.d}
                fillRule="evenodd"
                stroke="var(--color-ouro)"
                strokeWidth={5}
                initial={{ pathLength: 0, fill: 'rgba(244,240,230,0)' }}
                animate={{ pathLength: 1, fill: 'rgba(244,240,230,1)' }}
                transition={{ pathLength: { duration: 1.3, ease: EASE_IN_OUT }, fill: { duration: 0.6, delay: 1.05, ease: EASE_OUT } }}
              />
            </svg>
            <motion.span
              className="mt-8 block h-px w-24 origin-center bg-ouro"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
            />
            <motion.span
              className="eyebrow mt-5 text-[0.62rem] text-ouro-claro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
            >
              Gestão Dr. Vital Brazil
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Indica se a abertura está rodando nesta carga (para atrasar a entrada do hero). */
export const INTRO_ATIVA_NA_CARGA = typeof window !== 'undefined' && !jaViu() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.location.search.indexOf('semintro') === -1;

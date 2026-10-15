import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { MEDAL } from '../brand/logoPaths';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';

const CHAVE = 'vb-intro-vista';
const DURACAO = 2900;

function jaViu() {
  try {
    return sessionStorage.getItem(CHAVE) === '1';
  } catch {
    return false;
  }
}

function deveMostrar() {
  if (typeof window === 'undefined') return false;
  // Só na página inicial: quem chega por link direto (proposta, membro) vai direto ao conteúdo.
  const naHome = window.location.pathname.replace(/\/+$/, '') === import.meta.env.BASE_URL.replace(/\/+$/, '');
  return naHome && !jaViu() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.location.search.indexOf('semintro') === -1;
}

/**
 * ABERTURA (primeira visita da sessão, ~2,9 s; qualquer toque ou tecla pula)
 * 1. O medalhão é gravado em traço dourado e ganha preenchimento.
 * 2. Um contador sobe de 1865 a 2026 (da história ao presente).
 * 3. Um fio de ouro corta a tela ao meio.
 * 4. A tela se abre como duas portas, revelando o site.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [ativo, setAtivo] = useState(() => deveMostrar() && !reduce);
  const [ano, setAno] = useState(1865);

  useEffect(() => {
    if (!ativo) return;
    try {
      sessionStorage.setItem(CHAVE, '1');
    } catch {
      /* navegação privada */
    }
    const ini = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - ini) / 1700);
      const e = 1 - Math.pow(1 - k, 3);
      setAno(Math.round(1865 + (2026 - 1865) * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t = window.setTimeout(() => setAtivo(false), DURACAO);
    const pular = () => setAtivo(false);
    window.addEventListener('keydown', pular);
    window.addEventListener('wheel', pular, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener('keydown', pular);
      window.removeEventListener('wheel', pular);
    };
  }, [ativo]);

  return (
    <AnimatePresence>
      {ativo && (
        <motion.div key="intro" className="fixed inset-0 z-[90]" onClick={() => setAtivo(false)} aria-hidden="true" exit={{ pointerEvents: 'none' }}>
          {/* Duas portas */}
          <motion.div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-noite" exit={{ y: '-100%', transition: { duration: 1.1, ease: EASE_IN_OUT, delay: 0.15 } }}>
            <div className="grain" />
          </motion.div>
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-noite" exit={{ y: '100%', transition: { duration: 1.1, ease: EASE_IN_OUT, delay: 0.15 } }}>
            <div className="grain" />
          </motion.div>

          {/* Fio de ouro que corta a tela */}
          <motion.span
            className="absolute left-0 right-0 top-1/2 h-px origin-center bg-ouro"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, transition: { duration: 1, delay: 1.7, ease: EASE_IN_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          />

          {/* Medalhão + contador */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.45, ease: EASE_OUT } }}
          >
            <svg viewBox={MEDAL.viewBox} className="size-[clamp(8rem,22vw,11.5rem)]" aria-hidden="true">
              <motion.path
                d={MEDAL.d}
                fillRule="evenodd"
                stroke="var(--color-ouro)"
                strokeWidth={5}
                initial={{ pathLength: 0, fill: 'rgba(244,240,230,0)' }}
                animate={{ pathLength: 1, fill: 'rgba(244,240,230,1)' }}
                transition={{ pathLength: { duration: 1.4, ease: EASE_IN_OUT }, fill: { duration: 0.6, delay: 1.1, ease: EASE_OUT } }}
              />
            </svg>
            <motion.p
              className="tabular mt-8 font-display text-[clamp(2.2rem,6vw,3.4rem)] font-bold leading-none text-ouro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {ano}
            </motion.p>
            <motion.p className="eyebrow mt-4 text-[0.6rem] text-ouro-claro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
              Gestão Dr. Vital Brazil
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Indica se a abertura está rodando nesta carga (para atrasar a entrada do hero). */
export const INTRO_ATIVA_NA_CARGA = deveMostrar();
export const INTRO_DURACAO = DURACAO;

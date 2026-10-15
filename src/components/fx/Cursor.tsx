import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useFinePointer } from '../../lib/media';

/**
 * Cursor próprio (apenas com mouse): um ponto preciso e um anel dourado
 * que segue com mola, cresce sobre elementos clicáveis e mostra um rótulo
 * (data-cursor="Ver") sobre cards.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ax = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ay = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  const [modo, setModo] = useState<'normal' | 'link' | 'rotulo' | 'texto'>('normal');
  const [rotulo, setRotulo] = useState('');
  const [visivel, setVisivel] = useState(false);
  const [pressionado, setPressionado] = useState(false);
  const ativo = fine && !reduce;

  useEffect(() => {
    if (!ativo) return;
    document.documentElement.classList.add('cursor-proprio');
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisivel(true);
      const alvo = e.target as HTMLElement | null;
      const comRotulo = alvo?.closest<HTMLElement>('[data-cursor]');
      if (comRotulo) {
        setModo('rotulo');
        setRotulo(comRotulo.dataset.cursor ?? '');
        return;
      }
      if (alvo?.closest('input, textarea, select, [contenteditable="true"]')) setModo('texto');
      else if (alvo?.closest('a, button, [role="button"], [role="tab"], label, summary')) setModo('link');
      else setModo('normal');
    };
    const sai = () => setVisivel(false);
    const baixo = () => setPressionado(true);
    const cima = () => setPressionado(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', sai);
    window.addEventListener('blur', sai);
    window.addEventListener('pointerdown', baixo);
    window.addEventListener('pointerup', cima);
    return () => {
      document.documentElement.classList.remove('cursor-proprio');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', sai);
      window.removeEventListener('blur', sai);
      window.removeEventListener('pointerdown', baixo);
      window.removeEventListener('pointerup', cima);
    };
  }, [ativo, x, y]);

  if (!ativo) return null;

  const tamanho = modo === 'rotulo' ? 88 : modo === 'link' ? 52 : modo === 'texto' ? 4 : 34;

  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 z-[200]" style={{ opacity: visivel ? 1 : 0, transition: 'opacity .3s' }}>
      {/* Anel */}
      <motion.div className="absolute left-0 top-0" style={{ x: ax, y: ay }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          animate={{
            width: tamanho,
            height: tamanho,
            scale: pressionado ? 0.82 : 1,
            backgroundColor: modo === 'rotulo' ? 'rgba(205,177,134,0.95)' : modo === 'link' ? 'rgba(205,177,134,0.12)' : 'rgba(205,177,134,0)',
            borderColor: modo === 'texto' ? 'rgba(205,177,134,0)' : 'rgba(205,177,134,0.75)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ borderWidth: 1, borderStyle: 'solid', mixBlendMode: modo === 'rotulo' ? 'normal' : 'difference' }}
        >
          <AnimatePresence>
            {modo === 'rotulo' && (
              <motion.span
                key={rotulo}
                className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-noite"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
              >
                {rotulo}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      {/* Ponto */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-ouro-claro"
          animate={{ width: modo === 'rotulo' ? 0 : modo === 'texto' ? 2 : 5, height: modo === 'texto' ? 22 : modo === 'rotulo' ? 0 : 5 }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      </motion.div>
    </div>
  );
}

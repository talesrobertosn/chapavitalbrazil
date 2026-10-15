import { AnimatePresence, motion } from 'motion/react';
import { useContagem } from '../../lib/fase';
import { cn } from '../../lib/cn';
import { EASE_OUT } from '../../lib/motion';

/** Dígito que troca deslizando na vertical (sem "dança" de largura). */
function Digito({ v }: { v: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={v}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          {v}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Bloco({ n, rotulo, size }: { n: number; rotulo: string; size: string }) {
  const s = String(n).padStart(2, '0');
  return (
    <div className="flex flex-col items-start">
      <span className={cn('tabular font-display font-semibold leading-none', size)} aria-hidden="true">
        {s.split('').map((d, i) => (
          <Digito key={i} v={d} />
        ))}
      </span>
      <span className="eyebrow mt-2 text-[0.58rem] opacity-70">{rotulo}</span>
    </div>
  );
}

export function Countdown({ className, size = 'text-[2rem] md:text-[2.4rem]', segundos = true }: { className?: string; size?: string; segundos?: boolean }) {
  const r = useContagem();
  return (
    <div className={cn('flex items-start gap-4 md:gap-6', className)} role="timer" aria-label={`Faltam ${r.dias} dias, ${r.horas} horas e ${r.minutos} minutos para a eleição`}>
      <Bloco n={r.dias} rotulo={r.dias === 1 ? 'dia' : 'dias'} size={size} />
      <span className={cn('font-display leading-none text-ouro/60', size)} aria-hidden="true">:</span>
      <Bloco n={r.horas} rotulo="horas" size={size} />
      <span className={cn('font-display leading-none text-ouro/60', size)} aria-hidden="true">:</span>
      <Bloco n={r.minutos} rotulo="min" size={size} />
      {segundos && (
        <>
          <span className={cn('hidden font-display leading-none text-ouro/60 sm:inline', size)} aria-hidden="true">:</span>
          <div className="hidden sm:block">
            <Bloco n={r.segundos} rotulo="seg" size={size} />
          </div>
        </>
      )}
    </div>
  );
}

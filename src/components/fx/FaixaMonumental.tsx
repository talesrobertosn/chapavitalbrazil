import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';
import { useRef } from 'react';
import { Diamond } from '../brand/Brand';
import { cn } from '../../lib/cn';

function wrap(min: number, max: number, v: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

/**
 * Faixa de letras monumentais que desliza sozinha e acelera com a
 * velocidade da rolagem (inverte o sentido quando a pessoa sobe).
 */
export function FaixaMonumental({
  palavras,
  velocidade = 2.2,
  className,
  vazado = true,
  traco,
}: {
  palavras: string[];
  velocidade?: number;
  className?: string;
  vazado?: boolean;
  /** Cor do contorno das letras. */
  traco?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const suave = useSpring(vel, { damping: 50, stiffness: 400 });
  const fator = useTransform(suave, [0, 1000], [0, 4], { clamp: false });
  const sentido = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let mov = sentido.current * -velocidade * (delta / 1000);
    const f = fator.get();
    if (f < 0) sentido.current = -1;
    else if (f > 0) sentido.current = 1;
    mov += mov * Math.abs(f);
    baseX.set(baseX.get() + mov);
  });

  const bloco = (
    <span className="flex shrink-0 items-center">
      {palavras.map((p) => (
        <span key={p} className="flex items-center">
          <span className={cn('px-[0.25em]', vazado && 'texto-vazado')}>{p}</span>
          <Diamond size={18} className="mx-[0.2em] shrink-0 text-ouro md:size-7" />
        </span>
      ))}
    </span>
  );

  return (
    <div className={cn('relative overflow-hidden whitespace-nowrap py-6 md:py-10', className)} style={traco ? ({ ['--traco' as string]: traco } as React.CSSProperties) : undefined} aria-hidden="true">
      <motion.div style={{ x }} className="flex w-max font-display text-[clamp(3.5rem,11vw,10rem)] font-bold uppercase leading-none tracking-[-0.02em]">
        {bloco}
        {bloco}
        {bloco}
        {bloco}
      </motion.div>
    </div>
  );
}

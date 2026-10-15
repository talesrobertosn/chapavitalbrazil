import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useIsDesktop } from '../../lib/media';

/**
 * O ARCO DO BUTANTAN
 * A seção entra na tela recortada como a janela em arco do instituto
 * e se abre até ocupar tudo, conforme a rolagem.
 */
export function ArcoReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] });
  const lado = useTransform(scrollYProgress, [0, 1], [desktop ? 16 : 7, 0]);
  const raio = useTransform(scrollYProgress, [0, 0.7, 1], [50, 22, 0]);
  const clip = useMotionTemplate`inset(0% ${lado}% 0% ${lado}% round ${raio}vw ${raio}vw 0vw 0vw)`;

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ clipPath: clip }} className={className}>
      {children}
    </motion.div>
  );
}

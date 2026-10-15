import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'motion/react';
import type { ReactNode } from 'react';
import { useFinePointer } from '../../lib/media';
import { SPRING_SOFT } from '../../lib/motion';
import { cn } from '../../lib/cn';

/**
 * Card que responde ao mouse: inclinação 3D discreta (máx. ~4°) e uma luz
 * que acompanha o cursor. No toque, fica estático (sem depender de hover).
 */
export function TiltCard({ children, className, max = 4, luz = true, ...rest }: { children: ReactNode; className?: string; max?: number; luz?: boolean } & HTMLMotionProps<'div'>) {
  const fine = useFinePointer();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING_SOFT);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING_SOFT);
  const lx = useTransform(px, (v) => `${v * 100}%`);
  const ly = useTransform(py, (v) => `${v * 100}%`);
  const brilho = useMotionTemplate`radial-gradient(420px circle at ${lx} ${ly}, rgb(205 177 134 / 0.13), transparent 60%)`;

  return (
    <motion.div
      {...rest}
      className={cn('relative [transform-style:preserve-3d]', className)}
      style={fine ? { rotateX: rx, rotateY: ry, transformPerspective: 1100, ...(rest.style as object) } : rest.style}
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        rest.onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        px.set(0.5);
        py.set(0.5);
        rest.onPointerLeave?.(e);
      }}
    >
      {children}
      {fine && luz && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: brilho }} />}
    </motion.div>
  );
}

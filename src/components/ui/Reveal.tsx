import { motion, useInView, type HTMLMotionProps } from 'motion/react';
import { useRef, type ElementType, type ReactNode } from 'react';
import { DUR, EASE_OUT } from '../../lib/motion';
import { cn } from '../../lib/cn';

/** Entrada com fade + deslocamento, uma vez, quando entra na tela. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  amount = 0.25,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; amount?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }}
      transition={{ duration: DUR.longa, ease: EASE_OUT, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Texto que sobe "de dentro de uma fenda", palavra por palavra.
 * Leitores de tela recebem a frase inteira; as palavras animadas são decorativas.
 */
export function RevealText({
  text,
  as: Tag = 'span',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  once = true,
  highlight,
  highlightClassName,
  trigger,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** Palavras a destacar (comparação sem pontuação, sem caixa). */
  highlight?: string[];
  highlightClassName?: string;
  /** Controle externo: quando definido, ignora a visibilidade. */
  trigger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount: 0.4 });
  const show = trigger ?? inView;
  const linhas = text.split('\n');
  let i = 0;
  const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const hl = new Set((highlight ?? []).map(norm));

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {linhas.map((linha, li) => (
        <span key={li} className="block" aria-hidden="true">
          {linha.split(' ').map((w, wi) => {
            const idx = i++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                <motion.span
                  className={cn('inline-block will-change-transform', wordClassName, hl.has(norm(w)) && highlightClassName)}
                  initial={{ y: '108%' }}
                  animate={show ? { y: '0%' } : { y: '108%' }}
                  transition={{ duration: DUR.longa, ease: EASE_OUT, delay: delay + idx * stagger }}
                >
                  {w}
                </motion.span>
                {wi < linha.split(' ').length - 1 ? ' ' : null}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Fio de ouro que se desenha da esquerda para a direita. */
export function GoldLine({ className, delay = 0, trigger }: { className?: string; delay?: number; trigger?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const show = trigger ?? inView;
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={cn('block h-px origin-left bg-ouro', className)}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: show ? 1 : 0 }}
      transition={{ duration: 1.4, ease: EASE_OUT, delay }}
    />
  );
}

/** Sublinhado "pincelado" (como nas artes), desenhado em traço. */
export function BrushUnderline({ className, delay = 0, trigger }: { className?: string; delay?: number; trigger?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const show = trigger ?? inView;
  return (
    <svg ref={ref} viewBox="0 0 600 24" preserveAspectRatio="none" className={cn('text-ouro', className)} aria-hidden="true" fill="none">
      <motion.path
        d="M4 16 C 120 8, 260 6, 420 9 S 560 13, 596 10"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.3, ease: EASE_OUT, delay }}
      />
      <motion.path
        d="M40 20 C 180 15, 330 14, 520 17"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={0.6}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: show ? 1 : 0 }}
        transition={{ duration: 1.5, ease: EASE_OUT, delay: delay + 0.15 }}
      />
    </svg>
  );
}

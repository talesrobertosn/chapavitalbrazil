import { motion, useMotionValue, useSpring } from 'motion/react';
import { forwardRef, useRef, type ComponentProps, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useFinePointer } from '../../lib/media';

type Variant = 'solid' | 'outline' | 'ghost' | 'solid-dark';

const base =
  'group/btn relative isolate inline-flex select-none whitespace-nowrap items-center justify-center gap-3 overflow-hidden rounded-[2px] px-6 h-13 min-h-[3.25rem] text-[0.82rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-expo)] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, { box: string; fill: string; text: string }> = {
  // Sobre fundo escuro: papel → ao passar, o ouro sobe por baixo.
  solid: { box: 'bg-papel text-noite', fill: 'bg-ouro-claro', text: '' },
  // Sobre papel: verde-noite → ao passar, verde sobe por baixo.
  'solid-dark': { box: 'bg-noite text-papel', fill: 'bg-verde-2', text: '' },
  outline: { box: 'text-current ring-1 ring-inset ring-ouro/55 hover:ring-ouro', fill: 'bg-ouro/12', text: '' },
  ghost: { box: 'text-current px-3', fill: 'bg-current/6', text: '' },
};

interface Common {
  variant?: Variant;
  icon?: ReactNode | false;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
}

function Inner({ variant = 'solid', icon, children }: Pick<Common, 'variant' | 'icon' | 'children'>) {
  const v = variants[variant];
  const ic = icon === undefined ? <ArrowRight size={16} strokeWidth={1.6} /> : icon;
  return (
    <>
      <span
        aria-hidden="true"
        className={cn('absolute inset-0 -z-10 translate-y-[101%] transition-transform duration-[650ms] ease-[var(--ease-expo)] group-hover/btn:translate-y-0', v.fill)}
      />
      <span className="relative">{children}</span>
      {ic ? (
        <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-[140%]">{ic}</span>
          <span className="absolute inset-0 flex -translate-x-[140%] items-center justify-center transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-0">{ic}</span>
        </span>
      ) : null}
    </>
  );
}

/** Atração magnética leve em direção ao cursor (só com mouse). */
function useMagnet(enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const ref = useRef<HTMLElement | null>(null);
  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 10);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 8);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { ref, style: { x: sx, y: sy }, onPointerMove: onMove, onPointerLeave: onLeave };
}

export function ButtonLink({ variant = 'solid', icon, className, children, magnetic = true, ...rest }: Common & LinkProps) {
  const fine = useFinePointer();
  const m = useMagnet(magnetic && fine);
  return (
    <motion.span
      ref={m.ref as never}
      style={m.style}
      onPointerMove={m.onPointerMove}
      onPointerLeave={m.onPointerLeave}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      <Link {...rest} className={cn(base, 'w-full', variants[variant].box, className)}>
        <Inner variant={variant} icon={icon}>
          {children}
        </Inner>
      </Link>
    </motion.span>
  );
}

export function ButtonA({ variant = 'solid', icon, className, children, magnetic = true, ...rest }: Common & Omit<ComponentProps<'a'>, 'ref'>) {
  const fine = useFinePointer();
  const m = useMagnet(magnetic && fine);
  const externo = typeof rest.href === 'string' && /^https?:/.test(rest.href);
  return (
    <motion.a
      {...(rest as object)}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      ref={m.ref as never}
      style={m.style}
      onPointerMove={m.onPointerMove}
      onPointerLeave={m.onPointerLeave}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant].box, className)}
    >
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </motion.a>
  );
}

export const Button = forwardRef<HTMLButtonElement, Common & Omit<ComponentProps<'button'>, 'ref'>>(function Button(
  { variant = 'solid', icon, className, children, magnetic = true, ...rest },
  fwd,
) {
  const fine = useFinePointer();
  const m = useMagnet(magnetic && fine);
  return (
    <motion.button
      type="button"
      {...(rest as object)}
      ref={(el: HTMLButtonElement | null) => {
        m.ref.current = el;
        if (typeof fwd === 'function') fwd(el);
        else if (fwd) fwd.current = el;
      }}
      style={m.style}
      onPointerMove={m.onPointerMove}
      onPointerLeave={m.onPointerLeave}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant].box, className)}
    >
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </motion.button>
  );
});

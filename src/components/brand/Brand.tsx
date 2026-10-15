import type { SVGProps } from 'react';
import { FIGURE, MEDAL } from './logoPaths';
import { LEAF } from './leafPath';

type P = SVGProps<SVGSVGElement> & { title?: string };

const [MX, MY, MW, MH] = MEDAL.viewBox.split(' ').map(Number) as [number, number, number, number];

/**
 * Medalhão oficial (vetorizado). Cor = currentColor.
 * `invertido`: disco claro com o retrato em verde (as feições aparecem;
 * é a versão usada no site). Sem `invertido`: disco na cor do texto e
 * retrato vazado (marca d'água, favicon sobre fundo claro).
 */
export function Medal({ title = 'Medalhão da Gestão Dr. Vital Brazil', invertido = false, disco = 'var(--color-papel)', retrato = 'var(--color-verde)', ...p }: P & { invertido?: boolean; disco?: string; retrato?: string }) {
  if (invertido) {
    return (
      <svg viewBox={MEDAL.viewBox} role="img" aria-label={title} {...p}>
        <circle cx={MX + MW / 2} cy={MY + MH / 2} r={Math.min(MW, MH) / 2 - 3} fill={disco} />
        <path d={MEDAL.d} fillRule="evenodd" fill={retrato} />
      </svg>
    );
  }
  return (
    <svg viewBox={MEDAL.viewBox} fill="currentColor" role="img" aria-label={title} {...p}>
      <path d={MEDAL.d} fillRule="evenodd" />
    </svg>
  );
}

/** Retrato com serpente, sem disco. */
export function Figure({ title, ...p }: P) {
  return (
    <svg viewBox={FIGURE.viewBox} fill="currentColor" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...p}>
      <path d={FIGURE.d} fillRule="evenodd" />
    </svg>
  );
}

/** Folhagem em gravura (decorativa). */
export function Leaf(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={LEAF.viewBox} fill="currentColor" aria-hidden="true" {...p}>
      <path d={LEAF.d} />
    </svg>
  );
}

/** Losango ornamental. */
export function Diamond({ size = 8, ...p }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M5 0 10 5 5 10 0 5z" />
    </svg>
  );
}

/** Fio ── ◆ ── usado nos cabeçalhos das artes. */
export function Ornament({ className = '', width = 64 }: { className?: string; width?: number }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className="h-px bg-current opacity-60" style={{ width }} />
      <Diamond size={7} />
      <span className="h-px bg-current opacity-60" style={{ width }} />
    </span>
  );
}

/** Ícone do Instagram em traço fino (o Lucide não traz marcas). */
export function InstagramIcon({ size = 20, strokeWidth = 1.4, ...p }: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Ícone do WhatsApp em traço fino. */
export function WhatsappIcon({ size = 20, strokeWidth = 1.4, ...p }: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M3.6 20.4 5 16.3A8.6 8.6 0 1 1 8 19.2z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.7.4-3.3-.4a8.6 8.6 0 0 1-3.7-3.7c-.8-1.6-.7-2.7-.3-3.3z" />
    </svg>
  );
}

import type { ReactNode } from 'react';
import { Diamond } from '../brand/Brand';
import { RevealText, Reveal } from './Reveal';
import { cn } from '../../lib/cn';

/** Cabeçalho de seção: rótulo numerado + título revelado + texto de apoio. */
export function SectionHead({
  numero,
  rotulo,
  titulo,
  children,
  tom = 'escuro',
  className,
  align = 'left',
  tituloClass = 't-h1',
}: {
  numero?: string;
  rotulo: string;
  titulo: string;
  children?: ReactNode;
  tom?: 'escuro' | 'claro';
  className?: string;
  align?: 'left' | 'center';
  tituloClass?: string;
}) {
  const ouro = tom === 'escuro' ? 'text-ouro-claro' : 'text-ouro-escuro';
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      <Reveal y={12} className={cn('flex items-center gap-3', align === 'center' && 'justify-center', ouro)}>
        {numero && <span className="tabular eyebrow">{numero}</span>}
        <Diamond size={6} />
        <span className="eyebrow">{rotulo}</span>
      </Reveal>
      <RevealText as="h2" text={titulo} className={cn('mt-5 text-balance', tituloClass)} />
      {children && (
        <Reveal delay={0.2} className={cn('t-lead mt-6 max-w-2xl text-pretty', align === 'center' && 'mx-auto', tom === 'escuro' ? 'text-papel/75' : 'text-tinta-2')}>
          {children}
        </Reveal>
      )}
    </div>
  );
}

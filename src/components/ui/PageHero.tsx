import type { ReactNode } from 'react';
import { Diamond, Leaf } from '../brand/Brand';
import { BrushUnderline, Reveal, RevealText } from './Reveal';
import { PoeiraDourada } from '../fx/Atmosfera';
import { cn } from '../../lib/cn';

/** Abertura padrão das páginas internas: rótulo, título monumental, pincelada e apoio. */
export function PageHero({
  rotulo,
  titulo,
  destaque,
  children,
  extra,
  className,
  tituloClass = 't-mega',
}: {
  rotulo: string;
  titulo: string;
  destaque?: string[];
  children?: ReactNode;
  extra?: ReactNode;
  className?: string;
  tituloClass?: string;
}) {
  return (
    <section className={cn('relative overflow-hidden bg-noite pb-20 pt-[calc(var(--header-h)+4rem)] md:pb-28 md:pt-[calc(var(--header-h)+6rem)]', className)}>
      <PoeiraDourada densidade={0.6} />
      <div className="grain" />
      <div className="vignette" />
      <Leaf className="pointer-events-none absolute -right-20 bottom-0 w-[min(26rem,50vw)] -scale-x-100 text-ouro/[0.08]" />
      <div className="container-x relative">
        <Reveal y={10} className="flex items-center gap-3 text-ouro-claro">
          <Diamond size={6} />
          <span className="eyebrow">{rotulo}</span>
        </Reveal>
        <RevealText as="h1" text={titulo} className={cn('mt-6 text-balance text-papel', tituloClass)} highlight={destaque} highlightClassName="italic text-ouro-claro" />
        <BrushUnderline className="mt-2 h-5 w-[min(70%,32rem)]" delay={0.8} trigger />
        {children && (
          <Reveal delay={0.3} className="t-lead mt-10 max-w-2xl text-pretty text-papel/75">
            {children}
          </Reveal>
        )}
        {extra && (
          <Reveal delay={0.45} className="mt-10">
            {extra}
          </Reveal>
        )}
      </div>
    </section>
  );
}

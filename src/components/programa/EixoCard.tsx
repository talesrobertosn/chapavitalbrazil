import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Eixo } from '../../data/programa';
import { Diamond } from '../brand/Brand';
import { ICONE_EIXO, IconRing } from '../ui/Icons';
import { TiltCard } from '../ui/TiltCard';
import { SPRING_LAYOUT } from '../../lib/motion';
import { cn } from '../../lib/cn';

export function contarPropostas(e: Eixo) {
  return e.grupos.reduce((t, g) => t + g.propostas.length, 0);
}

/**
 * Card de eixo. Os elementos com layoutId (moldura, número, ícone, título)
 * viajam até a página do eixo quando o card é aberto.
 */
export function EixoCard({ eixo, className }: { eixo: Eixo; className?: string }) {
  const location = useLocation();
  const destaques = eixo.grupos.flatMap((g) => g.propostas).filter((p) => eixo.destaques.includes(p.n));
  const Icon = ICONE_EIXO[eixo.id];

  return (
    <Link
      to={`/programa/${eixo.id}`}
      state={{ fundo: location }}
      data-cursor="Abrir"
      className={cn('group block h-full outline-none', className)}
      aria-label={`Eixo ${eixo.numero}: ${eixo.titulo}. Ver as ${contarPropostas(eixo)} propostas`}
    >
      <TiltCard className="h-full" max={3}>
        <motion.article
          layoutId={`eixo-${eixo.id}`}
          transition={SPRING_LAYOUT}
          className="relative flex h-full flex-col overflow-hidden border border-ouro/20 bg-verde/50 p-7 transition-colors duration-500 group-hover:border-ouro/50 group-focus-visible:border-ouro md:p-9"
          style={{ borderRadius: 2 }}
        >
          <div className="grain" />
          <div className="relative flex items-start justify-between">
            <motion.span
              layoutId={`eixo-num-${eixo.id}`}
              transition={SPRING_LAYOUT}
              className="tabular font-display text-[clamp(5rem,9vw,8.5rem)] font-bold leading-[0.8] text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_var(--color-ouro)] group-hover:text-ouro/15"
            >
              {eixo.numero}
            </motion.span>
            <motion.span layoutId={`eixo-icon-${eixo.id}`} transition={SPRING_LAYOUT}>
              <IconRing Icon={Icon} className="group-hover:bg-ouro/10 group-hover:text-papel" />
            </motion.span>
          </div>

          <div className="relative mt-auto pt-10">
            <p className="eyebrow text-[0.62rem] text-ouro-claro">Eixo {eixo.numero}</p>
            <motion.h3 layoutId={`eixo-titulo-${eixo.id}`} transition={SPRING_LAYOUT} className="t-h2 mt-3 text-balance text-papel">
              {eixo.titulo}
            </motion.h3>
            <p className="t-quote mt-5 text-[clamp(1.35rem,2vw,1.75rem)] text-ouro-claro">“{eixo.frase}”</p>
            <ul className="mt-7 space-y-2.5 border-t border-ouro/15 pt-6">
              {destaques.map((p) => (
                <li key={p.n} className="flex items-start gap-3 text-[0.92rem] leading-snug text-papel/75">
                  <Diamond size={6} className="mt-[0.45em] shrink-0 text-ouro" />
                  {p.titulo}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-center justify-between text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-papel">
              <span>
                Ver as {contarPropostas(eixo)} propostas
              </span>
              <span className="grid size-10 place-items-center rounded-full ring-1 ring-ouro/40 transition-all duration-500 ease-[var(--ease-expo)] group-hover:rotate-45 group-hover:bg-ouro group-hover:text-noite">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </span>
            </p>
          </div>
        </motion.article>
      </TiltCard>
    </Link>
  );
}

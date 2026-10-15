import { Link } from 'react-router';
import { ArrowUpRight, Lock } from 'lucide-react';
import type { DiaCampanha } from '../../data/diario';
import { formatarCurto } from '../../lib/datas';
import { Medal } from '../brand/Brand';
import { cn } from '../../lib/cn';

/**
 * Prancha do diário. Dias futuros ficam "lacrados" com selo de cera
 * e abrem sozinhos na data. O dia de hoje ganha destaque dourado.
 */
export function Prancha({ dia, estado, className }: { dia: DiaCampanha; estado: 'aberto' | 'hoje' | 'lacrado'; className?: string }) {
  const data = formatarCurto(dia.data);
  if (estado === 'lacrado') {
    return (
      <div
        className={cn('relative flex h-full min-h-[15rem] flex-col items-center justify-center overflow-hidden border border-dashed border-ouro/25 bg-noite/40 p-6 text-center', className)}
        aria-label={`Dia ${dia.dia}, ${data}: abre na data`}
      >
        <span className="tabular eyebrow text-[0.6rem] text-salvia">Dia {String(dia.dia).padStart(2, '0')}</span>
        <span className="relative mt-5 grid size-16 place-items-center rounded-full bg-verde-2 shadow-[inset_0_-6px_12px_rgb(0_0_0/0.35),0_6px_18px_-6px_rgb(0_0_0/0.6)] ring-1 ring-ouro/30">
          <Medal className="size-11 text-noite/70" title="" aria-hidden="true" />
        </span>
        <span className="mt-5 flex items-center gap-2 text-[0.8rem] text-papel/60">
          <Lock size={13} strokeWidth={1.5} /> Abre em {data}
        </span>
      </div>
    );
  }
  return (
    <Link
      to={dia.rota}
      className={cn(
        'group relative flex h-full min-h-[15rem] flex-col overflow-hidden border p-6 transition-[border-color,transform] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1',
        estado === 'hoje' ? 'border-ouro bg-verde' : 'border-ouro/20 bg-verde/40 hover:border-ouro/50',
        className,
      )}
    >
      <div className="grain" />
      <div className="relative flex items-center justify-between">
        <span className="tabular eyebrow text-[0.6rem] text-ouro-claro">
          Dia {String(dia.dia).padStart(2, '0')} · {data}
        </span>
        {estado === 'hoje' && <span className="rounded-full bg-ouro px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-noite">Hoje</span>}
      </div>
      <p className="relative mt-6 font-display text-[1.45rem] font-bold uppercase leading-[1.05] text-papel">{dia.frase}</p>
      <p className="relative mt-3 flex-1 text-[0.88rem] leading-relaxed text-papel/65">{dia.tema}</p>
      <span className="relative mt-5 flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-salvia">
        {dia.formato}
        <ArrowUpRight size={16} className="text-ouro transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </Link>
  );
}

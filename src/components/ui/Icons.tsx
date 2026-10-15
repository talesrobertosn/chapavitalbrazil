import { Eye, HandHeart, HeartHandshake, Link2, MapPin, Megaphone, Microscope, Scale, Stethoscope, UsersRound, type LucideIcon } from 'lucide-react';
import type { IconeEixo } from '../../data/programa';
import { cn } from '../../lib/cn';

export const ICONE_EIXO: Record<IconeEixo, LucideIcon> = {
  ensino: Microscope,
  internato: Stethoscope,
  cuidado: HeartHandshake,
  transparencia: Scale,
  integracao: UsersRound,
};

export const ICONE_PRINCIPIO: Record<string, LucideIcon> = {
  presenca: MapPin,
  transparencia: Eye,
  representacao: Megaphone,
  cuidado: HandHeart,
  uniao: Link2,
};

/** Ícone de traço fino dentro de um círculo, como nas artes. */
export function IconRing({ Icon, className, size = 'md', tom = 'escuro' }: { Icon: LucideIcon; className?: string; size?: 'sm' | 'md' | 'lg'; tom?: 'escuro' | 'claro' }) {
  const box = { sm: 'size-11', md: 'size-16', lg: 'size-20' }[size];
  const ic = { sm: 18, md: 26, lg: 32 }[size];
  return (
    <span
      className={cn(
        'relative inline-grid shrink-0 place-items-center rounded-full ring-1 ring-inset transition-[background-color,color,box-shadow] duration-500',
        tom === 'escuro' ? 'text-ouro-claro ring-ouro/50' : 'text-ouro-escuro ring-ouro-escuro/40',
        box,
        className,
      )}
      aria-hidden="true"
    >
      <span className={cn('absolute inset-[3px] rounded-full ring-1 ring-inset', tom === 'escuro' ? 'ring-ouro/15' : 'ring-ouro-escuro/15')} />
      <Icon size={ic} strokeWidth={1.15} />
    </span>
  );
}

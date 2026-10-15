import { motion } from 'motion/react';
import { useState } from 'react';
import { fotoDe } from '../../lib/fotos';
import { iniciais, type Membro } from '../../data/diretoria';
import { cn } from '../../lib/cn';
import { SPRING_LAYOUT } from '../../lib/motion';

/**
 * Retrato circular, enquadrado no rosto.
 * Sem foto: monograma com as iniciais, em serifada, dentro de um medalhão
 * com anéis de gravura. Com foto: recorte circular, P&B levemente esverdeado,
 * que ganha cor quando `ativo`.
 */
export function Portrait({
  membro,
  className,
  layoutId,
  tamanho = 'md',
  ativo = false,
  prioridade = false,
  anel = true,
}: {
  membro: Pick<Membro, 'slug' | 'nome' | 'foco' | 'zoom'>;
  className?: string;
  layoutId?: string;
  tamanho?: 'sm' | 'md' | 'lg' | 'xl';
  ativo?: boolean;
  prioridade?: boolean;
  anel?: boolean;
}) {
  const foto = fotoDe(membro.slug);
  const [carregada, setCarregada] = useState(false);
  const src = foto ? (tamanho === 'sm' || tamanho === 'md' ? foto.pequena : foto.grande) : null;

  const fonte = {
    sm: 'text-[0.95rem]',
    md: 'text-[clamp(1.6rem,4vw,2.4rem)]',
    lg: 'text-[clamp(2.6rem,7vw,4.2rem)]',
    xl: 'text-[clamp(4rem,14vw,8.5rem)]',
  }[tamanho];

  return (
    <motion.div
      layoutId={layoutId}
      transition={SPRING_LAYOUT}
      className={cn('relative aspect-square overflow-hidden rounded-full bg-verde', className)}
      style={{ borderRadius: 9999 }}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={`Foto de ${membro.nome}`}
            loading={prioridade ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            onLoad={() => setCarregada(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-[filter,opacity,transform] duration-700 ease-[var(--ease-expo)]',
              carregada ? 'opacity-100' : 'opacity-0',
              ativo ? 'grayscale-0 sepia-0' : 'grayscale-[0.45] sepia-[0.12]',
            )}
            style={{ objectPosition: membro.foco ?? '50% 35%', transform: `scale(${(membro.zoom ?? 1) * (ativo ? 1.04 : 1)})` }}
          />
          {!carregada && <div className="absolute inset-0 animate-pulse bg-verde-2/60" aria-hidden="true" />}
        </>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          role="img"
          aria-label={`Iniciais de ${membro.nome} (foto em breve)`}
          style={{
            background:
              'radial-gradient(circle at 50% 38%, var(--color-verde-2) 0%, var(--color-verde) 55%, var(--color-noite) 100%)',
          }}
        >
          {/* Anéis concêntricos de gravura */}
          <svg className="absolute inset-0 h-full w-full text-ouro/25" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.35" />
            <circle cx="50" cy="50" r="42.5" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="0.6 1.4" />
            <circle cx="50" cy="50" r="31" fill="none" stroke="currentColor" strokeWidth="0.15" opacity="0.6" />
          </svg>
          <span
            aria-hidden="true"
            className={cn(
              'relative font-display font-semibold tracking-[0.04em] transition-colors duration-500',
              ativo ? 'text-ouro-claro' : 'text-papel/85',
              fonte,
            )}
          >
            {iniciais(membro.nome)}
          </span>
        </div>
      )}
      {anel && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset transition-[box-shadow,opacity] duration-500',
            ativo ? 'ring-ouro-claro/90' : 'ring-ouro/35',
          )}
        />
      )}
    </motion.div>
  );
}

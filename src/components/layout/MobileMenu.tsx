import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { NAV, NAV_EXTRA } from '../../config/nav';
import { site } from '../../config/site';
import { Diamond, InstagramIcon, Leaf } from '../brand/Brand';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';
import { useSmooth } from './SmoothScroll';
import { cn } from '../../lib/cn';

/** Menu de tela cheia: um círculo verde se expande a partir do botão. */
export function MobileMenu({ onClose, cta }: { onClose: () => void; cta: string }) {
  const { pathname } = useLocation();
  const { lock } = useSmooth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unlock = lock();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        // Mantém o foco dentro do menu
        const f = ref.current.querySelectorAll<HTMLElement>('a, button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    ref.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [lock, onClose]);

  const origem = 'calc(100% - 2.75rem) 2.25rem';
  const itens = [...NAV, ...NAV_EXTRA];

  return (
    <motion.div
      ref={ref}
      id="menu-movel"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[45] overflow-y-auto overflow-x-hidden overscroll-contain bg-noite lg:hidden"
      data-lenis-prevent
      initial={{ clipPath: `circle(0% at ${origem})` }}
      animate={{ clipPath: `circle(150% at ${origem})` }}
      exit={{ clipPath: `circle(0% at ${origem})`, transition: { duration: 0.55, ease: EASE_IN_OUT, delay: 0.1 } }}
      transition={{ duration: 0.8, ease: EASE_IN_OUT }}
    >
      <div className="grain" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Leaf className="absolute -bottom-10 -right-16 w-72 text-ouro/15" />
      </div>
      <div className="container-x relative flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+2rem)]">
        <nav aria-label="Menu principal" className="flex-1">
          <ul className="flex flex-col">
            <li>
              <MenuLink to="/" i={0} on={pathname === '/'} numero="00" rotulo="Início" />
            </li>
            {itens.map((item, i) => (
              <li key={item.to}>
                <MenuLink to={item.to} i={i + 1} on={pathname.startsWith(item.to)} numero={String(i + 1).padStart(2, '0')} rotulo={item.to === '/votar' ? cta : item.rotulo} descricao={item.descricao} />
              </li>
            ))}
          </ul>
        </nav>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <div className="grid grid-cols-2 gap-3">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-papel text-[0.74rem] font-bold uppercase tracking-[0.14em] text-noite active:scale-[0.98]">
              <InstagramIcon size={18} /> Seguir
            </a>
            <Link to="/compartilhar" className="flex h-14 items-center justify-center gap-2.5 rounded-full text-[0.74rem] font-bold uppercase tracking-[0.14em] text-papel ring-1 ring-inset ring-ouro/60 active:scale-[0.98]">
              <InstagramIcon size={18} /> Meu story
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 flex items-center justify-between border-t border-ouro/20 pt-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.6, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-papel/80">
            <InstagramIcon size={18} />
            {site.instagram.handle}
          </a>
          <span className="eyebrow text-[0.6rem] text-salvia">CA Medicina FAPI</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MenuLink({ to, i, on, numero, rotulo, descricao }: { to: string; i: number; on: boolean; numero: string; rotulo: string; descricao?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.18 + i * 0.045, duration: 0.7, ease: EASE_OUT } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2, ease: EASE_IN_OUT } }}
    >
      <Link
        to={to}
        aria-current={on ? 'page' : undefined}
        className="group flex items-baseline gap-4 border-b border-papel/[0.07] py-3.5"
      >
        <span className={cn('tabular w-6 text-[0.7rem] font-medium tracking-widest', on ? 'text-ouro' : 'text-salvia')}>{numero}</span>
        <span className="flex flex-1 flex-col">
          <span className={cn('font-display text-[clamp(1.6rem,7vw,2.3rem)] font-semibold leading-tight transition-colors', on ? 'text-ouro-claro' : 'text-papel group-active:text-ouro-claro')}>
            {rotulo}
          </span>
          {descricao && <span className="text-[0.8rem] text-salvia">{descricao}</span>}
        </span>
        {on && <Diamond size={8} className="text-ouro" />}
      </Link>
    </motion.div>
  );
}

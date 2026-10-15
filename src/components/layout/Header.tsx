import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { NAV } from '../../config/nav';
import { Medal } from '../brand/Brand';
import { cn } from '../../lib/cn';
import { EASE_OUT, SPRING_UI } from '../../lib/motion';
import { MobileMenu } from './MobileMenu';
import { useFase } from '../../lib/fase';
import { useIsDesktop } from '../../lib/media';

function ativo(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Header() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [rolou, setRolou] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const fase = useFase();
  const desktop = useIsDesktop();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setRolou(y > 24);
    if (menu) return;
    if (y > 360 && y - prev > 4) setOculto(true);
    else if (prev - y > 4 || y < 360) setOculto(false);
  });

  useEffect(() => {
    setMenu(false);
    setOculto(false);
  }, [pathname]);

  const atual = NAV.find((n) => ativo(pathname, n.to))?.to ?? null;
  const indicador = hover ?? atual;
  const cta = fase === 'eleicao' ? 'Vote hoje' : fase === 'vespera' ? 'Vote amanhã' : 'Como votar';

  return (
    <>
      <motion.header
        className="no-print fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: oculto && desktop ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div
          className={cn(
            'absolute inset-0 -z-10 border-b transition-[background-color,border-color] duration-700 ease-[var(--ease-expo)]',
            rolou || menu ? 'border-ouro/15 bg-noite/[0.94]' : 'border-transparent bg-transparent',
          )}
          aria-hidden="true"
        />
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6 pt-[env(safe-area-inset-top)]">
          <Link to="/" className="group flex items-center gap-3" aria-label="Gestão Dr. Vital Brazil, página inicial">
            <span className="relative grid size-10 place-items-center">
              <Medal className="size-10 text-papel transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-[-8deg] group-hover:scale-105" title="" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="eyebrow text-[0.58rem] text-ouro-claro">Gestão</span>
              <span className="mt-1 font-display text-[1rem] font-bold tracking-tight text-papel sm:text-[1.08rem]">Dr. Vital Brazil</span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1" onPointerLeave={() => setHover(null)}>
              {NAV.map((item) => {
                const on = atual === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={on ? 'page' : undefined}
                      onPointerEnter={() => setHover(item.to)}
                      onFocus={() => setHover(item.to)}
                      onBlur={() => setHover(null)}
                      className={cn(
                        'relative block px-4 py-3 text-[0.8rem] font-medium tracking-[0.06em] transition-colors duration-300',
                        on ? 'text-papel' : 'text-papel/70 hover:text-papel',
                      )}
                    >
                      {item.rotulo}
                      {indicador === item.to && (
                        <motion.span
                          layoutId="nav-indicador"
                          transition={SPRING_UI}
                          className="absolute inset-x-4 bottom-1.5 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <span className="h-px w-full bg-ouro" />
                          <span className="absolute size-[5px] rotate-45 bg-ouro" />
                        </motion.span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/votar"
              className={cn(
                'group/cta relative hidden h-11 items-center gap-2 overflow-hidden rounded-[2px] px-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] ring-1 ring-inset ring-ouro/60 transition-colors duration-500 hover:text-noite sm:inline-flex',
                fase === 'eleicao' ? 'bg-ouro text-noite' : 'text-papel',
              )}
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full bg-ouro-claro transition-transform duration-500 ease-[var(--ease-expo)] group-hover/cta:translate-y-0" />
              {fase === 'campanha' && <span className="size-1.5 rotate-45 bg-ouro transition-colors group-hover/cta:bg-noite" aria-hidden="true" />}
              {cta}
            </Link>
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="menu-movel"
              aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
              className={cn(
                'relative z-[60] flex h-11 items-center gap-3 rounded-full pl-4 pr-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] ring-1 ring-inset transition-colors duration-300 active:scale-95 lg:hidden',
                menu ? 'bg-papel text-noite ring-papel' : 'bg-noite/60 text-papel ring-ouro/60',
              )}
            >
              <span aria-hidden="true">{menu ? 'Fechar' : 'Menu'}</span>
              <span className="relative block h-3 w-5" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-5 bg-current"
                  animate={menu ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={SPRING_UI}
                />
                <motion.span
                  className="absolute bottom-0 right-0 h-[1.5px] bg-current"
                  animate={menu ? { y: -5, rotate: -45, width: 20 } : { y: 0, rotate: 0, width: 13 }}
                  transition={SPRING_UI}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>{menu && <MobileMenu onClose={() => setMenu(false)} cta={cta} />}</AnimatePresence>
    </>
  );
}

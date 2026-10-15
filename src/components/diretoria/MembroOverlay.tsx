import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Check, Link as LinkIcon, X } from 'lucide-react';
import { MEMBROS, iniciais, membroPorSlug, primeiroNome, type MembroComCargo } from '../../data/diretoria';
import type { EstadoNav } from '../../App';
import { Portrait } from '../ui/Portrait';
import { Diamond, InstagramIcon, Leaf, WhatsappIcon } from '../brand/Brand';
import { useSmooth } from '../layout/SmoothScroll';
import { fotoDe } from '../../lib/fotos';
import { TEXTOS_WHATSAPP, compartilharImagem, linkPublico, whatsappUrl } from '../../lib/share';
import { gerarStory } from '../../lib/story';
import { cn } from '../../lib/cn';
import { EASE_IN_OUT, EASE_OUT, SPRING_LAYOUT, SPRING_UI } from '../../lib/motion';

/**
 * Dossiê do membro. Abre crescendo a partir do retrato clicado (layoutId),
 * navega entre membros por setas, teclado, miniaturas ou deslize, e fecha
 * com Esc, botão ou toque fora.
 */
export default function MembroOverlay({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const estado = location.state as EstadoNav | null;
  const { lock } = useSmooth();
  const membro = membroPorSlug(slug);
  const slugInicial = useRef(slug);
  const [direcao, setDirecao] = useState(0);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const tiraRef = useRef<HTMLDivElement>(null);

  const fechar = useCallback(() => {
    if (estado?.fundo) navigate(-1);
    else navigate('/diretoria', { replace: true });
  }, [estado, navigate]);

  const ir = useCallback(
    (m: MembroComCargo, dir: number) => {
      setDirecao(dir);
      navigate(`/diretoria/${m.slug}`, { replace: true, state: estado });
    },
    [estado, navigate],
  );

  const passo = useCallback(
    (dir: 1 | -1) => {
      if (!membro) return;
      const n = MEMBROS.length;
      ir(MEMBROS[(membro.indice + dir + n) % n]!, dir);
    },
    [membro, ir],
  );

  useEffect(() => {
    if (!membro) navigate('/diretoria', { replace: true });
  }, [membro, navigate]);

  useEffect(() => {
    const unlock = lock();
    const anterior = document.activeElement as HTMLElement | null;
    fecharRef.current?.focus({ preventScroll: true });
    return () => {
      unlock();
      anterior?.focus?.({ preventScroll: true });
    };
  }, [lock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
      else if (e.key === 'ArrowRight') passo(1);
      else if (e.key === 'ArrowLeft') passo(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fechar, passo]);

  // Mantém a miniatura ativa visível na tira
  useEffect(() => {
    const el = tiraRef.current?.querySelector<HTMLElement>(`[data-slug="${slug}"]`);
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [slug]);

  useEffect(() => {
    if (membro) document.title = `${membro.nome} · Gestão Dr. Vital Brazil`;
  }, [membro]);

  if (!membro) return null;

  const colegas = MEMBROS.filter((m) => m.cargo.id === membro.cargo.id && m.slug !== membro.slug);
  const usaLayout = slug === slugInicial.current;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 500) passo(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label={`${membro.nome}, ${membro.cargo.titulo}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Fundo */}
      <motion.div
        className="absolute inset-0 bg-noite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.985 }}
        exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE_IN_OUT, delay: 0.1 } }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        onClick={fechar}
      />
      <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
        <div className="grain" />
        <Leaf className="absolute -bottom-16 -left-20 w-[min(26rem,60vw)] text-ouro/[0.08]" />
      </motion.div>

      <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain" data-lenis-prevent>
        {/* Barra superior */}
        <motion.div
          className="container-x sticky top-0 z-10 flex h-[var(--header-h)] shrink-0 items-center justify-between bg-gradient-to-b from-noite via-noite/90 to-transparent pt-[env(safe-area-inset-top)]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.6, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <p className="tabular eyebrow text-[0.62rem] text-ouro-claro" aria-live="polite">
            {String(membro.indice + 1).padStart(2, '0')} <span className="text-salvia">/ {String(MEMBROS.length).padStart(2, '0')}</span>
          </p>
          <div className="flex items-center gap-2">
            <BotaoRedondo rotulo="Anterior" onClick={() => passo(-1)} className="hidden sm:grid">
              <ArrowLeft size={18} strokeWidth={1.5} />
            </BotaoRedondo>
            <BotaoRedondo rotulo="Próximo" onClick={() => passo(1)} className="hidden sm:grid">
              <ArrowRight size={18} strokeWidth={1.5} />
            </BotaoRedondo>
            <button
              ref={fecharRef}
              type="button"
              onClick={fechar}
              className="ml-2 flex h-11 items-center gap-2 rounded-full bg-papel px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-noite transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Fechar <X size={16} strokeWidth={1.8} />
            </button>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <motion.div
          className="container-x relative flex-1 pb-10 pt-4 md:pt-10"
          drag="x"
          dragDirectionLock
          dragSnapToOrigin
          dragElastic={0.18}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Retrato */}
            <div className="relative mx-auto w-[min(70vw,22rem)] lg:col-span-5 lg:mx-0 lg:w-full lg:max-w-[30rem]">
              <AnimatePresence mode="popLayout" custom={direcao} initial={false}>
                <motion.div
                  key={membro.slug}
                  custom={direcao}
                  variants={{
                    entra: (d: number) => ({ opacity: 0, x: d * 80, scale: 0.94 }),
                    fica: { opacity: 1, x: 0, scale: 1 },
                    sai: (d: number) => ({ opacity: 0, x: d * -80, scale: 0.94 }),
                  }}
                  initial="entra"
                  animate="fica"
                  exit="sai"
                  transition={{ ...SPRING_LAYOUT, opacity: { duration: 0.35 } }}
                  className="relative"
                >
                  <Portrait membro={membro} layoutId={usaLayout ? `ret-${membro.slug}` : undefined} tamanho="xl" ativo prioridade className="w-full shadow-[0_50px_100px_-40px_rgb(0_0_0/0.8)]" />
                </motion.div>
              </AnimatePresence>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-full border border-ouro/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.35, duration: 0.9, ease: EASE_OUT } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              />
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full border border-ouro/15"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.45, duration: 1, ease: EASE_OUT } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              />
            </div>

            {/* Ficha */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8, ease: EASE_OUT } }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={membro.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE_OUT }}>
                  <p className="flex items-center gap-3 text-ouro-claro">
                    <span className="tabular eyebrow text-[0.62rem]">{membro.cargo.numero}</span>
                    <Diamond size={6} />
                    <span className="eyebrow text-[0.62rem]">{membro.cargo.titulo}</span>
                  </p>
                  <h2 className="t-h1 mt-5 text-balance text-papel">{membro.nome}</h2>
                  <p className="mt-4 flex items-center gap-3 text-papel/70">
                    <span className="rounded-full px-3 py-1 text-[0.75rem] font-semibold tracking-wide ring-1 ring-ouro/40">Turma {membro.turma}</span>
                    <span className="text-[0.85rem] text-salvia">Gestão Dr. Vital Brazil</span>
                  </p>

                  <div className="mt-10 border-l border-ouro/40 pl-6">
                    <p className="eyebrow text-[0.58rem] text-salvia">Eu estou na chapa porque…</p>
                    {membro.porque ? (
                      <p className="t-quote mt-3 text-papel">“{membro.porque}”</p>
                    ) : (
                      <p className="mt-3 font-script text-[1.4rem] italic leading-snug text-papel/45">O depoimento de {primeiroNome(membro.nome)} chega em breve.</p>
                    )}
                  </div>

                  {colegas.length > 0 && (
                    <div className="mt-10">
                      <p className="eyebrow text-[0.58rem] text-salvia">Na mesma frente</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {colegas.map((c) => (
                          <button
                            key={c.slug}
                            type="button"
                            onClick={() => ir(c, c.indice > membro.indice ? 1 : -1)}
                            className="group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 ring-1 ring-papel/15 transition-colors hover:bg-papel/5 hover:ring-ouro/50"
                          >
                            <Portrait membro={c} tamanho="sm" className="w-10" anel={false} />
                            <span className="text-left">
                              <span className="block text-[0.85rem] font-semibold text-papel">{c.nome}</span>
                              <span className="block text-[0.72rem] text-salvia">Turma {c.turma}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Compartilhar membro={membro} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Tira de miniaturas */}
        <motion.div
          className="sticky bottom-0 z-10 shrink-0 bg-gradient-to-t from-noite via-noite/95 to-transparent pb-[max(1rem,env(safe-area-inset-bottom))] pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.7, ease: EASE_OUT } }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
        >
          <div ref={tiraRef} className="scroller flex gap-3 overflow-x-auto px-[var(--gutter)] py-2" role="list" aria-label="Todos os membros">
            {MEMBROS.map((m) => {
              const on = m.slug === membro.slug;
              return (
                <button
                  key={m.slug}
                  data-slug={m.slug}
                  role="listitem"
                  type="button"
                  onClick={() => ir(m, m.indice > membro.indice ? 1 : -1)}
                  aria-label={`${m.nome}, ${m.cargo.titulo}`}
                  aria-current={on ? 'true' : undefined}
                  className="relative shrink-0 rounded-full p-1"
                >
                  {on && <motion.span layoutId="tira-ativo" transition={SPRING_UI} className="absolute inset-0 rounded-full ring-[1.5px] ring-ouro" />}
                  <span className={cn('block transition-[opacity,transform] duration-300', on ? 'opacity-100' : 'opacity-50 hover:opacity-90')}>
                    <Portrait membro={m} tamanho="sm" className="w-11 md:w-12" anel={false} />
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-1 text-center text-[0.7rem] text-salvia sm:hidden">Deslize para o lado para ver outros membros</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function BotaoRedondo({ rotulo, onClick, children, className }: { rotulo: string; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      type="button"
      aria-label={rotulo}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className={cn('size-11 place-items-center rounded-full text-papel ring-1 ring-papel/20 transition-colors hover:bg-papel hover:text-noite', className)}
    >
      {children}
    </motion.button>
  );
}

function Compartilhar({ membro }: { membro: MembroComCargo }) {
  const [copiado, setCopiado] = useState(false);
  const [gerando, setGerando] = useState(false);
  const rota = `/diretoria/${membro.slug}`;
  const story = async () => {
    setGerando(true);
    try {
      const foto = fotoDe(membro.slug);
      const blob = await gerarStory({ tipo: 'membro', nome: membro.nome, cargo: membro.cargo.titulo, turma: membro.turma, iniciais: iniciais(membro.nome), foto: foto?.grande ?? null });
      await compartilharImagem(blob, `story-${membro.slug}.png`, `${membro.nome} · Gestão Dr. Vital Brazil`);
    } finally {
      setGerando(false);
    }
  };
  return (
    <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-papel/10 pt-6">
      <span className="eyebrow mr-2 text-[0.58rem] text-salvia">Compartilhar</span>
      <button type="button" onClick={story} disabled={gerando} className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.78rem] font-semibold text-papel ring-1 ring-papel/20 transition-colors hover:bg-papel hover:text-noite disabled:opacity-60">
        <InstagramIcon size={15} /> {gerando ? 'Gerando…' : 'Story'}
      </button>
      <a
        href={whatsappUrl(TEXTOS_WHATSAPP.membro(membro.nome, membro.cargo.titulo, rota))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.78rem] font-semibold text-papel ring-1 ring-papel/20 transition-colors hover:bg-papel hover:text-noite"
      >
        <WhatsappIcon size={15} /> WhatsApp
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(linkPublico(rota));
            setCopiado(true);
            window.setTimeout(() => setCopiado(false), 1800);
          } catch {
            /* sem permissão de cópia */
          }
        }}
        className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[0.78rem] font-semibold text-papel ring-1 ring-papel/20 transition-colors hover:bg-papel hover:text-noite"
      >
        {copiado ? <Check size={15} /> : <LinkIcon size={15} />} {copiado ? 'Copiado' : 'Link'}
      </button>
      <Link to="/diretoria" className="link-fio ml-auto text-[0.78rem] text-salvia hover:text-papel">
        Toda a diretoria
      </Link>
    </div>
  );
}

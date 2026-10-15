import { motion } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { EIXOS, eixoPorId } from '../../data/programa';
import type { EstadoNav } from '../../App';
import { ICONE_EIXO, IconRing } from '../ui/Icons';
import { PropostaItem } from './PropostaItem';
import { Diamond, Leaf, WhatsappIcon } from '../brand/Brand';
import { useSmooth } from '../layout/SmoothScroll';
import { TEXTOS_WHATSAPP, whatsappUrl } from '../../lib/share';
import { EASE_OUT, SPRING_LAYOUT } from '../../lib/motion';
import { contarPropostas } from './EixoCard';

/**
 * Página do eixo como sobreposição: o card clicado cresce até ocupar a
 * tela (moldura, número, ícone e título viajam com layoutId) e as
 * propostas surgem por baixo.
 */
export default function EixoOverlay({ id }: { id: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const estado = location.state as EstadoNav | null;
  const { lock } = useSmooth();
  const eixo = eixoPorId(id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  const fechar = useCallback(() => {
    if (estado?.fundo) navigate(-1);
    else navigate('/programa', { replace: true });
  }, [estado, navigate]);

  useEffect(() => {
    if (!eixo) navigate('/programa', { replace: true });
  }, [eixo, navigate]);

  useEffect(() => {
    const unlock = lock();
    const anterior = document.activeElement as HTMLElement | null;
    fecharRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
      anterior?.focus?.({ preventScroll: true });
    };
  }, [lock, fechar]);

  // Âncora de proposta (#p-05) ou topo ao trocar de eixo
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      const alvo = location.hash ? el.querySelector<HTMLElement>(location.hash) : null;
      if (alvo) {
        el.scrollTo({ top: alvo.offsetTop - 120, behavior: 'smooth' });
        alvo.animate([{ backgroundColor: 'rgb(205 177 134 / 0.18)' }, { backgroundColor: 'transparent' }], { duration: 2200, easing: 'ease-out' });
      } else el.scrollTo({ top: 0 });
    }, location.hash ? 750 : 0);
    return () => window.clearTimeout(t);
  }, [id, location.hash]);

  useEffect(() => {
    if (eixo) document.title = `Eixo ${eixo.numero}: ${eixo.titulo} · Gestão Dr. Vital Brazil`;
  }, [eixo]);

  if (!eixo) return null;
  const Icon = ICONE_EIXO[eixo.id];
  const idx = EIXOS.indexOf(eixo);
  const anterior = EIXOS[(idx - 1 + EIXOS.length) % EIXOS.length]!;
  const proximo = EIXOS[(idx + 1) % EIXOS.length]!;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={`Eixo ${eixo.numero}: ${eixo.titulo}`}>
      <motion.div className="absolute inset-0 bg-noite/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.1 } }} onClick={fechar} />

      <motion.div
        layoutId={`eixo-${eixo.id}`}
        transition={SPRING_LAYOUT}
        className="absolute inset-0 overflow-hidden border border-ouro/20 bg-verde md:inset-3 lg:inset-5"
        style={{ borderRadius: 2 }}
      >
        <div className="grain" />
        <Leaf className="pointer-events-none absolute -bottom-20 -right-16 w-[min(28rem,60vw)] -scale-x-100 text-ouro/[0.08]" />

        <div ref={scrollRef} className="relative h-full overflow-y-auto overflow-x-hidden overscroll-contain" data-lenis-prevent>
          {/* Barra */}
          <motion.div
            className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-b from-verde via-verde/95 to-transparent px-[var(--gutter)] pb-6 pt-[max(1rem,env(safe-area-inset-top))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <Link to="/programa" className="eyebrow flex items-center gap-2 text-[0.6rem] text-ouro-claro hover:text-papel">
              <Diamond size={5} /> Programa
            </Link>
            <button
              ref={fecharRef}
              type="button"
              onClick={fechar}
              className="flex h-11 items-center gap-2 rounded-full bg-papel px-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-noite transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Fechar <X size={16} strokeWidth={1.8} />
            </button>
          </motion.div>

          <div className="mx-auto max-w-6xl px-[var(--gutter)] pb-24">
            {/* Cabeçalho que veio do card */}
            <div className="flex items-start justify-between gap-6">
              <motion.span
                layoutId={`eixo-num-${eixo.id}`}
                transition={SPRING_LAYOUT}
                className="tabular font-display text-[clamp(6rem,16vw,13rem)] font-bold leading-[0.8] text-transparent [-webkit-text-stroke:1.2px_var(--color-ouro)]"
              >
                {eixo.numero}
              </motion.span>
              <motion.span layoutId={`eixo-icon-${eixo.id}`} transition={SPRING_LAYOUT}>
                <IconRing Icon={Icon} size="lg" />
              </motion.span>
            </div>
            <p className="eyebrow mt-8 text-ouro-claro">Eixo {eixo.numero} · {contarPropostas(eixo)} propostas</p>
            <motion.h2 layoutId={`eixo-titulo-${eixo.id}`} transition={SPRING_LAYOUT} className="t-hero mt-4 max-w-4xl text-balance text-papel">
              {eixo.titulo}
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.9, ease: EASE_OUT } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <div className="mt-10 grid gap-8 border-t border-ouro/20 pt-10 lg:grid-cols-2">
                <p className="t-lead text-pretty text-papel/80">{eixo.intro}</p>
                <p className="t-quote text-ouro-claro">“{eixo.frase}”</p>
              </div>

              <div className="mt-16 space-y-14">
                {eixo.grupos.map((g, gi) => (
                  <motion.section
                    key={g.titulo}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 + gi * 0.12, duration: 0.8, ease: EASE_OUT } }}
                  >
                    <h3 className="eyebrow mb-3 text-ouro-claro">{g.titulo}</h3>
                    <ul>
                      {g.propostas.map((p) => (
                        <PropostaItem key={p.n} p={p} eixo={eixo} tom="escuro" />
                      ))}
                    </ul>
                  </motion.section>
                ))}
              </div>

              {/* Rodapé do eixo */}
              <div className="mt-20 flex flex-col gap-4 border-t border-ouro/20 pt-10 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={whatsappUrl(TEXTOS_WHATSAPP.proposta(eixo.titulo, `Eixo ${eixo.numero} · ${contarPropostas(eixo)} propostas`, `/programa/${eixo.id}`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2.5 self-start rounded-full px-5 text-sm text-papel ring-1 ring-papel/20 transition-colors hover:bg-papel hover:text-noite"
                >
                  <WhatsappIcon size={17} /> Mandar este eixo no grupo
                </a>
                <div className="flex gap-3">
                  <NavEixo to={anterior.id} rotulo={anterior.tituloCurto} dir="ant" />
                  <NavEixo to={proximo.id} rotulo={proximo.tituloCurto} dir="prox" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function NavEixo({ to, rotulo, dir }: { to: string; rotulo: string; dir: 'ant' | 'prox' }) {
  const location = useLocation();
  return (
    <Link
      to={`/programa/${to}`}
      replace
      state={location.state}
      className="group flex h-12 items-center gap-3 rounded-full px-5 text-[0.8rem] font-semibold text-papel ring-1 ring-papel/20 transition-colors hover:bg-papel hover:text-noite"
    >
      {dir === 'ant' && <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />}
      {rotulo}
      {dir === 'prox' && <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}


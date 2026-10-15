import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { PERFIS, todasPropostas, type Perfil } from '../../data/programa';
import { SectionHead } from '../../components/ui/SectionHead';
import { ICONE_EIXO } from '../../components/ui/Icons';
import { cn } from '../../lib/cn';
import { EASE_OUT, SPRING_LAYOUT, SPRING_UI } from '../../lib/motion';

const PROPOSTAS = todasPropostas();

/** Seletor de perfil: as propostas mais relevantes se reorganizam com mola. */
export function PraMim() {
  const [perfil, setPerfil] = useState<Perfil>('calouro');
  const location = useLocation();

  const { lista, total } = useMemo(() => {
    const doPerfil = PROPOSTAS.filter((p) => p.perfis.includes(perfil));
    // Mais específicas primeiro (feitas sob medida para este perfil)
    const ordenadas = [...doPerfil].sort((a, b) => a.perfis.length - b.perfis.length);
    return { lista: ordenadas.slice(0, 6), total: doPerfil.length };
  }, [perfil]);

  const rotulo = PERFIS.find((p) => p.id === perfil)!;

  return (
    <section className="surface-papel section-y relative overflow-hidden" aria-labelledby="pramim-titulo">
      <div className="grain" />
      <div className="container-x relative">
        <SectionHead numero="04" rotulo="Feito para você" titulo="O que muda pra mim?" tom="claro" align="center">
          Escolha onde você está no curso e veja as propostas pensadas para esse momento.
        </SectionHead>

        {/* Seletor segmentado */}
        <LayoutGroup id="perfil">
          <div role="tablist" aria-label="Seu momento no curso" className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-1 rounded-full bg-papel-2 p-1.5 ring-1 ring-verde/10 sm:grid-cols-4">
            {PERFIS.map((p) => {
              const on = p.id === perfil;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setPerfil(p.id)}
                  className={cn('relative rounded-full px-4 py-3 text-center transition-colors duration-300', on ? 'text-papel' : 'text-tinta-2 hover:text-verde')}
                >
                  {on && <motion.span layoutId="perfil-pill" transition={SPRING_UI} className="absolute inset-0 rounded-full bg-verde shadow-[0_8px_24px_-12px_rgb(18_36_28/0.6)]" />}
                  <span className="relative block text-[0.82rem] font-semibold tracking-wide">{p.rotulo}</span>
                  <span className={cn('relative hidden text-[0.7rem] sm:block', on ? 'text-salvia' : 'text-tinta-2/70')}>{p.descricao}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mx-auto mt-6 text-center text-[0.9rem] text-tinta-2" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p key={perfil} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
              <strong className="font-semibold text-verde">{total} propostas</strong> pesam diretamente para quem está no {rotulo.rotulo.toLowerCase() === 'calouro' ? '1º período' : rotulo.rotulo.toLowerCase()}.
            </motion.p>
          </AnimatePresence>
        </div>

        <LayoutGroup id="pramim-lista">
          <motion.ul layout className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {lista.map((p) => {
                const Icon = ICONE_EIXO[p.eixo.id];
                return (
                  <motion.li
                    key={`${p.eixo.id}-${p.n}`}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                    transition={{ ...SPRING_LAYOUT, opacity: { duration: 0.4, ease: EASE_OUT } }}
                  >
                    <Link
                      to={`/programa/${p.eixo.id}#p-${p.n}`}
                      state={{ fundo: location }}
                      className="group flex h-full flex-col rounded-[2px] border border-verde/10 bg-papel p-6 shadow-[0_1px_0_rgb(15_28_22/0.04)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-ouro-escuro/40 hover:shadow-[0_24px_48px_-28px_rgb(18_36_28/0.45)]"
                    >
                      <span className="flex items-center gap-3 text-ouro-escuro">
                        <Icon size={18} strokeWidth={1.3} />
                        <span className="eyebrow text-[0.6rem]">
                          Eixo {p.eixo.numero} · {p.n}
                        </span>
                      </span>
                      <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-snug text-verde">{p.titulo}</h3>
                      <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-tinta-2">{p.texto}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-verde">
                        {p.eixo.tituloCurto}
                        <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <div className="mt-10 text-center">
          <Link to={`/programa?perfil=${perfil}`} className="link-fio text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-verde">
            Ver todas as {total} no programa <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

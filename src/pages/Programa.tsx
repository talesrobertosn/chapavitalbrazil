import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Printer, Search, X } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { EIXOS, PERFIS, TOTAL_PROPOSTAS, QUEM_SOMOS, type Perfil } from '../data/programa';
import { EixoCard } from '../components/programa/EixoCard';
import { PropostaItem } from '../components/programa/PropostaItem';
import { ICONE_EIXO, IconRing } from '../components/ui/Icons';
import { Diamond, Leaf, WhatsappIcon } from '../components/brand/Brand';
import { Reveal, RevealText, BrushUnderline } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { PoeiraDourada } from '../components/fx/Atmosfera';
import { ArcoReveal } from '../components/fx/Arco';
import { CemDias } from '../sections/home/CemDias';
import { Cobrar } from '../sections/home/Cobrar';
import { useNuvem } from '../components/layout/NuvemFrases';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../lib/motion';

const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export default function Programa() {
  const [params, setParams] = useSearchParams();
  const { abrir: abrirNuvem } = useNuvem();
  const [termo, setTermo] = useState('');
  const [eixo, setEixo] = useState<string | null>(null);
  const perfilParam = params.get('perfil');
  const perfil = (PERFIS.some((p) => p.id === perfilParam) ? perfilParam : null) as Perfil | null;

  const setPerfil = (p: Perfil | null) => {
    const n = new URLSearchParams(params);
    if (p) n.set('perfil', p);
    else n.delete('perfil');
    setParams(n, { replace: true, preventScrollReset: true });
  };

  const resultado = useMemo(() => {
    const t = norm(termo.trim());
    return EIXOS.filter((e) => !eixo || e.id === eixo)
      .map((e) => ({
        eixo: e,
        grupos: e.grupos
          .map((g) => ({
            ...g,
            propostas: g.propostas.filter((p) => (!perfil || p.perfis.includes(perfil)) && (!t || norm(`${p.titulo} ${p.texto} ${g.titulo} ${e.titulo}`).includes(t))),
          }))
          .filter((g) => g.propostas.length > 0),
      }))
      .filter((e) => e.grupos.length > 0);
  }, [termo, eixo, perfil]);

  const total = resultado.reduce((t, e) => t + e.grupos.reduce((g, gr) => g + gr.propostas.length, 0), 0);
  const filtrando = Boolean(termo || eixo || perfil);

  return (
    <Page titulo="Programa">
      {/* Abertura */}
      <section className="print-plain relative overflow-hidden bg-noite pb-20 pt-[calc(var(--header-h)+4rem)] md:pb-28 md:pt-[calc(var(--header-h)+6rem)]">
        <PoeiraDourada densidade={0.6} className="no-print" />
        <div className="grain" />
        <Leaf className="no-print pointer-events-none absolute -right-20 bottom-0 w-[min(26rem,50vw)] -scale-x-100 text-ouro/[0.08]" />
        <div className="container-x relative">
          <Reveal y={10} className="flex items-center gap-3 text-ouro-claro">
            <Diamond size={6} />
            <span className="eyebrow">Programa de Gestão</span>
          </Reveal>
          <RevealText as="h1" text={'Escrito para\nser cobrado.'} className="t-hero mt-6 text-papel" highlight={['cobrado.']} highlightClassName="italic text-ouro-claro" />
          <BrushUnderline className="no-print mt-2 h-5 w-[min(70%,36rem)]" delay={0.8} trigger />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <Reveal delay={0.3} className="lg:col-span-6">
              <p className="t-lead text-pretty text-papel/80">{QUEM_SOMOS.curto}</p>
              <p className="mt-4 text-pretty text-papel/60">{QUEM_SOMOS.cobrar}</p>
            </Reveal>
            <Reveal delay={0.4} className="flex flex-wrap items-end gap-x-10 gap-y-6 lg:col-span-5 lg:col-start-8 lg:justify-end">
              {[
                ['5', 'eixos'],
                [String(TOTAL_PROPOSTAS), 'propostas'],
                ['100', 'primeiros dias'],
              ].map(([n, r]) => (
                <div key={r}>
                  <p className="tabular font-display text-[3.2rem] font-bold leading-none text-ouro">{n}</p>
                  <p className="eyebrow mt-2 text-[0.6rem] text-salvia">{r}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.5} className="no-print mt-12 flex flex-col gap-3 xs:flex-row">
            <Button onClick={() => window.print()} icon={<Printer size={16} strokeWidth={1.6} />}>
              Salvar em PDF
            </Button>
            <Button onClick={abrirNuvem} variant="outline" icon={<WhatsappIcon size={16} />}>
              Mandar no grupo
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Os eixos (cards que viram páginas) */}
      <section className="no-print surface-noite relative pb-24">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {EIXOS.map((e, i) => (
              <motion.div
                key={e.id}
                className={`min-h-[30rem] ${i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'} ${i === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: EASE_OUT, delay: i * 0.07 }}
              >
                <EixoCard eixo={e} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Busca e lista completa */}
      <ArcoReveal>
        <section id="propostas" className="surface-papel print-plain relative pb-28 pt-20 md:pt-28">
          <div className="grain no-print" />
          <div className="container-x relative">
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-3 text-ouro-escuro">
                <Diamond size={6} />
                <span className="eyebrow">Todas as propostas</span>
              </p>
              <h2 className="t-h1 text-verde">Encontre o que importa pra você.</h2>
            </div>

            <div className="no-print mt-10 space-y-5">
              <label className="relative block">
                <span className="sr-only">Buscar proposta</span>
                <Search size={20} strokeWidth={1.5} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ouro-escuro" />
                <input
                  type="search"
                  value={termo}
                  onChange={(e) => setTermo(e.target.value)}
                  placeholder="Busque: sutura, escala, psicologia, festa…"
                  className="h-16 w-full rounded-full border border-verde/15 bg-papel pl-14 pr-14 text-[1.05rem] text-tinta shadow-[0_10px_30px_-20px_rgb(18_36_28/0.5)] outline-none transition-[border-color,box-shadow] placeholder:text-tinta-2/60 focus:border-ouro-escuro/60 focus:shadow-[0_14px_40px_-20px_rgb(18_36_28/0.6)]"
                />
                {termo && (
                  <button type="button" onClick={() => setTermo('')} className="absolute right-4 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-tinta-2 hover:bg-papel-2" aria-label="Limpar busca">
                    <X size={16} />
                  </button>
                )}
              </label>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <Chips
                  rotulo="Eixo"
                  itens={EIXOS.map((e) => ({ id: e.id, rotulo: `${e.numero} · ${e.tituloCurto}` }))}
                  valor={eixo}
                  onChange={setEixo}
                />
                <Chips rotulo="Para" itens={PERFIS.map((p) => ({ id: p.id, rotulo: p.rotulo }))} valor={perfil} onChange={(v) => setPerfil(v as Perfil | null)} />
              </div>
              <p className="text-[0.9rem] text-tinta-2" aria-live="polite">
                {filtrando ? (
                  <>
                    <strong className="font-semibold text-verde">{total}</strong> de {TOTAL_PROPOSTAS} propostas{' '}
                    <button
                      type="button"
                      className="link-fio ml-2 text-ouro-escuro"
                      onClick={() => {
                        setTermo('');
                        setEixo(null);
                        setPerfil(null);
                      }}
                    >
                      limpar filtros
                    </button>
                  </>
                ) : (
                  <>Todas as {TOTAL_PROPOSTAS} propostas, organizadas por eixo.</>
                )}
              </p>
            </div>

            <div className="mt-14 space-y-20">
              <AnimatePresence mode="popLayout" initial={false}>
                {resultado.map(({ eixo: e, grupos }) => {
                  const Icon = ICONE_EIXO[e.id];
                  return (
                    <motion.article
                      key={e.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      className="print-break grid gap-8 lg:grid-cols-12"
                    >
                      <header className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                          <IconRing Icon={Icon} tom="claro" />
                          <p className="tabular eyebrow mt-6 text-ouro-escuro">Eixo {e.numero}</p>
                          <h3 className="t-h2 mt-3 text-balance text-verde">{e.titulo}</h3>
                          <p className="mt-4 text-pretty text-tinta-2">{e.intro}</p>
                          <p className="t-quote mt-5 text-[1.5rem] text-ouro-escuro">“{e.frase}”</p>
                        </div>
                      </header>
                      <div className="lg:col-span-8">
                        {grupos.map((g) => (
                          <div key={g.titulo} className="mb-10 last:mb-0">
                            <p className="eyebrow mb-2 text-[0.62rem] text-ouro-escuro">{g.titulo}</p>
                            <ul>
                              {g.propostas.map((p) => (
                                <PropostaItem key={p.n} p={p} eixo={e} termo={termo} />
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
              {resultado.length === 0 && (
                <div className="py-16 text-center">
                  <p className="t-h3 text-verde">Nenhuma proposta com esse termo.</p>
                  <p className="mt-2 text-tinta-2">Tente outra palavra, ou mande sua ideia pra gente: o resultado pode virar proposta.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </ArcoReveal>

      <div className="no-print">
        <CemDias />
        <Cobrar />
      </div>
    </Page>
  );
}

function Chips({ rotulo, itens, valor, onChange }: { rotulo: string; itens: { id: string; rotulo: string }[]; valor: string | null; onChange: (v: string | null) => void }) {
  return (
    <div className="scroller -mx-[var(--gutter)] flex items-center gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label={`Filtrar por ${rotulo.toLowerCase()}`}>
      <span className="eyebrow mr-1 shrink-0 text-[0.58rem] text-ouro-escuro">{rotulo}</span>
      {itens.map((it) => {
        const on = valor === it.id;
        return (
          <button
            key={it.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? null : it.id)}
            className={cn('h-9 shrink-0 rounded-full px-4 text-[0.78rem] font-semibold ring-1 ring-inset transition-colors duration-300', on ? 'bg-verde text-papel ring-verde' : 'text-tinta-2 ring-verde/15 hover:ring-verde/40')}
          >
            {it.rotulo}
          </button>
        );
      })}
    </div>
  );
}

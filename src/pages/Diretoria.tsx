import { LayoutGroup, motion } from 'motion/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { LayoutGrid, Network } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { CARGOS, MEMBROS, TURMAS, type Cargo, type MembroComCargo } from '../data/diretoria';
import { Portrait } from '../components/ui/Portrait';
import { Diamond, Leaf } from '../components/brand/Brand';
import { Reveal, RevealText, BrushUnderline } from '../components/ui/Reveal';
import { cn } from '../lib/cn';
import { EASE_OUT, SPRING_LAYOUT, SPRING_UI } from '../lib/motion';

type Vista = 'galeria' | 'estrutura';

export default function Diretoria() {
  const [vista, setVista] = useState<Vista>('galeria');
  const [turma, setTurma] = useState<number | null>(null);
  const [foco, setFoco] = useState<string | null>(null);
  const [alternou, setAlternou] = useState(false);
  const nucleo = MEMBROS.filter((m) => m.cargo.nucleo);

  return (
    <Page titulo="Diretoria">
      {/* Abertura */}
      <section className="relative overflow-hidden bg-noite pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
        <div className="grain" />
        <Leaf className="pointer-events-none absolute -right-16 top-20 w-[min(24rem,50vw)] -scale-x-100 text-ouro/[0.08]" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={10} className="flex items-center gap-3 text-ouro-claro">
              <Diamond size={6} />
              <span className="eyebrow">A diretoria</span>
            </Reveal>
            <RevealText as="h1" text={'Do 1º ao último período.\nUma só chapa.'} className="t-hero mt-6 text-balance" />
            <BrushUnderline className="mt-2 h-5 w-[min(70%,30rem)]" delay={0.7} trigger />
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {[
                [String(MEMBROS.length), 'estudantes'],
                [String(CARGOS.length), 'frentes de trabalho'],
                [`${TURMAS[0]}–${TURMAS[TURMAS.length - 1]}`, 'turmas representadas'],
              ].map(([n, r]) => (
                <div key={r}>
                  <p className="tabular font-display text-[2.6rem] font-bold leading-none text-ouro">{n}</p>
                  <p className="eyebrow mt-2 text-[0.6rem] text-salvia">{r}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:col-span-5">
            {nucleo.map((m, i) => (
              <motion.div key={m.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.5 + i * 0.12 }}>
                <MembroLink m={m} className="group flex flex-col items-center text-center">
                  <span className="relative block w-full max-w-[13rem]">
                    <Portrait membro={m} tamanho="lg" className="w-full transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03]" prioridade />
                    <span className="absolute -inset-2 rounded-full border border-ouro/30 transition-colors duration-500 group-hover:border-ouro/70" aria-hidden="true" />
                  </span>
                  <span className="eyebrow mt-6 text-[0.6rem] text-ouro-claro">{m.cargo.titulo}</span>
                  <span className="mt-2 font-display text-[1.15rem] font-semibold leading-tight text-papel md:text-[1.3rem]">{m.nome}</span>
                  <span className="mt-1 text-[0.8rem] text-salvia">Turma {m.turma}</span>
                </MembroLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Controles */}
      <section className="surface-papel relative min-h-screen pb-28">
        <div className="grain" />
        <div className="sticky top-0 z-30 border-b border-verde/10 bg-papel/95 backdrop-blur-[2px]">
          <div className="container-x flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <LayoutGroup id="vista">
              <div role="tablist" aria-label="Forma de ver a diretoria" className="flex w-fit gap-1 rounded-full bg-papel-2 p-1 ring-1 ring-verde/10">
                {(
                  [
                    ['galeria', 'Galeria', LayoutGrid],
                    ['estrutura', 'Estrutura', Network],
                  ] as const
                ).map(([id, rot, Icon]) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={vista === id}
                    onClick={() => {
                      setVista(id);
                      setAlternou(true);
                    }}
                    className={cn('relative flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8rem] font-semibold transition-colors', vista === id ? 'text-papel' : 'text-tinta-2 hover:text-verde')}
                  >
                    {vista === id && <motion.span layoutId="vista-pill" transition={SPRING_UI} className="absolute inset-0 rounded-full bg-verde" />}
                    <Icon size={15} strokeWidth={1.6} className="relative" />
                    <span className="relative">{rot}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <div className="scroller -mx-[var(--gutter)] flex items-center gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0" role="group" aria-label="Filtrar por turma">
              <span className="eyebrow mr-1 shrink-0 text-[0.58rem] text-ouro-escuro">Turma</span>
              {[null, ...TURMAS].map((t) => {
                const on = turma === t;
                return (
                  <button
                    key={t ?? 'todas'}
                    onClick={() => setTurma(t)}
                    aria-pressed={on}
                    className={cn(
                      'tabular h-9 shrink-0 rounded-full px-4 text-[0.78rem] font-semibold ring-1 ring-inset transition-colors duration-300',
                      on ? 'bg-verde text-papel ring-verde' : 'text-tinta-2 ring-verde/15 hover:ring-verde/40',
                    )}
                  >
                    {t === null ? 'Todas' : `T${t}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container-x relative pt-14 md:pt-20">
          <LayoutGroup id="retratos">
            {/* Troca direta (sem espera): os retratos com o mesmo layoutId voam para a nova posição */}
            {vista === 'galeria' ? <Galeria turma={turma} foco={foco} setFoco={setFoco} entrada={!alternou} /> : <Estrutura turma={turma} foco={foco} setFoco={setFoco} />}
          </LayoutGroup>
          <p className="mt-20 text-center text-[0.85rem] text-tinta-2">
            Fotos e depoimentos de cada membro chegam em breve. Toque em alguém para ver a ficha completa.
          </p>
        </div>
      </section>
    </Page>
  );
}

interface VistaProps {
  turma: number | null;
  foco: string | null;
  setFoco: (s: string | null) => void;
}

function MembroLink({ m, className, children, ...rest }: { m: MembroComCargo; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) {
  const location = useLocation();
  return (
    <Link to={`/diretoria/${m.slug}`} state={{ fundo: location }} className={className} aria-label={`${m.nome}, ${m.cargo.titulo}, turma ${m.turma}`} {...rest}>
      {children}
    </Link>
  );
}

/** Cartão de membro na galeria: destaca no hover, demais perdem ênfase. */
function CartaoMembro({ m, turma, foco, setFoco, tamanho = 'md' }: VistaProps & { m: MembroComCargo; tamanho?: 'sm' | 'md' }) {
  const apagado = (turma !== null && m.turma !== turma) || (foco !== null && foco !== m.slug);
  const ativo = foco === m.slug;
  return (
    <MembroLink
      m={m}
      className={cn('group flex flex-col items-center text-center transition-[opacity,filter] duration-500', apagado ? 'opacity-30 grayscale' : 'opacity-100')}
      onPointerEnter={() => setFoco(m.slug)}
      onPointerLeave={() => setFoco(null)}
      onFocus={() => setFoco(m.slug)}
      onBlur={() => setFoco(null)}
    >
      <span className={cn('relative block', tamanho === 'md' ? 'w-[7.5rem] sm:w-[8.5rem]' : 'w-[4.5rem] sm:w-20')}>
        <Portrait membro={m} layoutId={`ret-${m.slug}`} tamanho={tamanho === 'md' ? 'md' : 'sm'} ativo={ativo} className={cn('w-full transition-transform duration-700 ease-[var(--ease-expo)]', ativo && 'scale-[1.06]')} />
        <span aria-hidden="true" className={cn('absolute -inset-1.5 rounded-full border transition-[opacity,transform] duration-500', ativo ? 'scale-100 border-ouro-escuro/60 opacity-100' : 'scale-95 border-transparent opacity-0')} />
      </span>
      <span className={cn('mt-4 max-w-[10rem] font-display font-semibold leading-tight text-verde', tamanho === 'md' ? 'text-[1rem]' : 'text-[0.82rem]')}>{m.nome}</span>
      <span className={cn('mt-1 text-[0.75rem] transition-colors duration-300', ativo ? 'text-ouro-escuro' : 'text-tinta-2')}>Turma {m.turma}</span>
    </MembroLink>
  );
}

function Galeria({ entrada, ...props }: VistaProps & { entrada: boolean }) {
  return (
    <div className="divide-y divide-verde/10 border-y border-verde/10">
      {CARGOS.map((c, i) => (
        <motion.div
          key={c.id}
          className="grid gap-8 py-10 md:grid-cols-12 md:gap-6 md:py-12"
          initial={entrada ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: Math.min(i, 3) * 0.04 }}
        >
          <div className="md:col-span-4">
            <p className="tabular eyebrow text-[0.62rem] text-ouro-escuro">{c.numero}</p>
            <h2 className="t-h3 mt-2 text-verde">{c.titulo}</h2>
            <p className="mt-1 text-[0.8rem] text-tinta-2">
              {c.membros.length} {c.membros.length === 1 ? 'membro' : 'membros'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 sm:justify-start md:col-span-8">
            {MEMBROS.filter((m) => m.cargo.id === c.id).map((m) => (
              <CartaoMembro key={m.slug} m={m} {...props} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Organograma: presidência → vice → secretaria → frentes de trabalho. */
function Estrutura(props: VistaProps) {
  const porId = (id: string) => CARGOS.find((c) => c.id === id)!;
  const topo = ['presidencia', 'vice-presidencia', 'secretaria'].map(porId);
  const frentes = CARGOS.filter((c) => !['presidencia', 'vice-presidencia', 'secretaria'].includes(c.id));

  return (
    <div className="flex flex-col items-center">
      {topo.map((c, i) => (
        <div key={c.id} className="flex flex-col items-center">
          <No cargo={c} {...props} destaque={i < 2} />
          <Fio />
        </div>
      ))}
      {/* Barramento */}
      <div className="relative w-full">
        <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-0 hidden h-px bg-ouro-escuro/40 lg:block" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 pt-0 sm:grid-cols-3 lg:grid-cols-5 lg:pt-10">
          {frentes.map((c) => (
            <div key={c.id} className="relative flex flex-col items-center">
              <span aria-hidden="true" className="absolute -top-10 hidden h-10 w-px bg-ouro-escuro/40 lg:block" />
              <No cargo={c} {...props} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fio() {
  return (
    <span aria-hidden="true" className="relative my-2 block h-10 w-px bg-ouro-escuro/40">
      <span className="absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ouro-escuro" />
    </span>
  );
}

function No({ cargo, destaque, ...props }: VistaProps & { cargo: Cargo; destaque?: boolean }) {
  const membros = MEMBROS.filter((m) => m.cargo.id === cargo.id);
  return (
    <motion.div layout transition={SPRING_LAYOUT} className={cn('flex w-full flex-col items-center rounded-[2px] border bg-papel px-4 py-5', destaque ? 'border-ouro-escuro/50 sm:px-10' : 'border-verde/12')}>
      <p className="tabular eyebrow text-[0.56rem] text-ouro-escuro">{cargo.numero}</p>
      <p className="mt-1 text-balance text-center font-display text-[0.98rem] font-semibold leading-tight text-verde">{cargo.titulo}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {membros.map((m) => (
          <CartaoMembro key={m.slug} m={m} {...props} tamanho="sm" />
        ))}
      </div>
    </motion.div>
  );
}

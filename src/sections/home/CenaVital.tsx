import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef, useState } from 'react';
import { MARCOS, POR_ISSO } from '../../data/vitalBrazil';
import { Diamond, Figure } from '../../components/brand/Brand';
import { ButtonLink } from '../../components/ui/Button';
import { PoeiraDourada } from '../../components/fx/Atmosfera';
import { IMG } from '../../assets/img';
import { cn } from '../../lib/cn';
import { VitalTeaser } from './VitalTeaser';

const CENAS = MARCOS.filter((m) => m.destaque);
// Janelas de rolagem: abertura, um marco por vez, fechamento.
const N = CENAS.length;
const INI = 0.16;
const FIM = 0.84;
const passo = (FIM - INI) / N;

/**
 * Cena fixa (estilo apresentação de carro): a tela trava e a história de
 * Vital Brazil passa em capítulos enquanto a gravura cresce ao fundo.
 */
export function CenaVital() {
  const reduce = useReducedMotion();
  if (reduce) return <VitalTeaser />;
  return <Cena />;
}

function Cena() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Gravura monumental ao fundo: aproxima e gira levemente
  const escala = useTransform(p, [0, 1], [0.85, 1.55]);
  const giro = useTransform(p, [0, 1], [-4, 6]);
  const yFig = useTransform(p, [0, 1], ['6%', '-10%']);
  const opFig = useTransform(p, [0, 0.1, 0.9, 1], [0.05, 0.11, 0.11, 0.04]);

  // Abertura
  const opAbre = useTransform(p, [0, 0.03, INI - 0.03, INI], [1, 1, 1, 0]);
  const yAbre = useTransform(p, [INI - 0.06, INI], ['0%', '-12%']);
  const escAbre = useTransform(p, [0, INI], [1, 0.94]);

  // Fechamento
  const opFecha = useTransform(p, [FIM, FIM + 0.05], [0, 1]);
  const yFecha = useTransform(p, [FIM, FIM + 0.06], ['8%', '0%']);

  // Retrato em arco que acompanha
  const opRet = useTransform(p, [INI - 0.04, INI + 0.02, FIM - 0.02, FIM + 0.03], [0, 1, 1, 0]);
  const yRet = useTransform(p, [INI, FIM], ['8%', '-8%']);

  // Fio do progresso
  const fio = useTransform(p, [INI, FIM], [0, 1]);

  const [atual, setAtual] = useState(-1);
  useMotionValueEvent(p, 'change', (v) => {
    const i = v < INI || v >= FIM ? -1 : Math.min(N - 1, Math.floor((v - INI) / passo));
    setAtual(i);
  });

  return (
    <section ref={ref} className="relative h-[520vh] bg-noite" aria-labelledby="cena-titulo">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(70% 70% at 50% 45%, rgb(40 74 60 / 0.7), transparent 75%)' }} />
        <motion.div aria-hidden="true" style={{ scale: escala, rotate: giro, y: yFig, opacity: opFig }} className="absolute left-1/2 top-1/2 w-[min(62rem,120vw)] -translate-x-1/2 -translate-y-1/2 text-ouro">
          <Figure />
        </motion.div>
        <PoeiraDourada densidade={0.7} />
        <div className="grain" />
        <div className="vignette" />

        {/* Abertura */}
        <motion.div style={{ opacity: opAbre, y: yAbre, scale: escAbre }} className="absolute inset-0 flex flex-col items-center justify-center px-[var(--gutter)] text-center">
          <p className="flex items-center gap-3 text-ouro-claro">
            <span className="tabular eyebrow">05</span>
            <Diamond size={6} />
            <span className="eyebrow">O nome</span>
          </p>
          <h2 id="cena-titulo" className="t-mega mt-6 max-w-[11ch] text-balance text-papel !leading-[0.98]">
            Por que <span className="italic text-ouro-claro">Vital</span> Brazil?
          </h2>
          <p className="t-lead mt-8 max-w-xl text-papel/70">Médico, cientista e sanitarista. Uma vida dedicada a transformar conhecimento em vidas salvas.</p>
          <motion.span className="mt-12 block h-14 w-px origin-top bg-ouro/60" animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" />
        </motion.div>

        {/* Retrato em arco (computador) */}
        <motion.div style={{ opacity: opRet, y: yRet }} className="absolute right-[6vw] top-1/2 hidden w-[min(22rem,24vw)] -translate-y-1/2 lg:block" aria-hidden="true">
          <div className="aspect-[3/4] overflow-hidden rounded-t-full">
            <img srcSet={IMG.laboratorio.srcSet} src={IMG.laboratorio.src} sizes="24vw" alt="" loading="lazy" className="h-full w-full object-cover object-[50%_30%] [filter:sepia(0.2)_brightness(0.9)]" />
          </div>
          <span className="absolute -inset-3 rounded-t-full border border-ouro/40" />
          <span className="absolute -inset-6 rounded-t-full border border-ouro/15" />
        </motion.div>

        {/* Capítulos */}
        {CENAS.map((m, i) => (
          <Capitulo key={m.ano} i={i} p={p} ano={m.ano} titulo={m.titulo} texto={m.texto} />
        ))}

        {/* Linha do progresso + índice */}
        <div className="absolute bottom-8 left-[var(--gutter)] right-[var(--gutter)] flex items-center gap-4 lg:right-auto lg:w-[40vw]" aria-hidden="true">
          {CENAS.map((m, i) => (
            <span key={m.ano} className={cn('tabular text-[0.62rem] font-semibold tracking-[0.2em] transition-colors duration-500', i === atual ? 'text-ouro-claro' : 'text-papel/25')}>
              {m.ano}
            </span>
          ))}
          <span className="relative h-px flex-1 bg-papel/10">
            <motion.span style={{ scaleX: fio }} className="absolute inset-0 origin-left bg-ouro" />
          </span>
        </div>

        {/* Fechamento */}
        <motion.div style={{ opacity: opFecha, y: yFecha }} className="absolute inset-0 flex flex-col items-center justify-center px-[var(--gutter)] text-center">
          <Diamond size={10} className="text-ouro" />
          <p className="t-hero mt-8 max-w-4xl text-balance text-papel">{POR_ISSO.replace(' Por isso o nome.', '')}</p>
          <p className="t-quote mt-6 text-ouro-claro">Por isso o nome.</p>
          <div className="mt-12">
            <ButtonLink to="/vital-brazil">Conheça a história completa</ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Capitulo({ i, p, ano, titulo, texto }: { i: number; p: MotionValue<number>; ano: string; titulo: string; texto: string }) {
  const a = INI + i * passo;
  const b = a + passo;
  const m = 0.035;
  const opacity = useTransform(p, [a - m * 0.2, a + m, b - m, b + m * 0.2], [0, 1, 1, 0]);
  const y = useTransform(p, [a, b], ['10%', '-10%']);
  const yAno = useTransform(p, [a, b], ['22%', '-22%']);
  const letra = useTransform(p, [a, b], ['-0.02em', '0.04em']);
  const anoNumerico = /^\d+$/.test(ano);

  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 flex items-center">
      <div className="container-x relative w-full">
        <div className="max-w-3xl lg:max-w-[52vw]">
          <motion.p
            style={{ y: yAno, letterSpacing: letra }}
            className={cn('tabular font-display font-bold leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--color-ouro)]', anoNumerico ? 'text-[clamp(6rem,24vw,20rem)]' : 'text-[clamp(4.5rem,15vw,13rem)] italic')}
          >
            {ano}
          </motion.p>
          <motion.div style={{ y }} className="mt-4 md:-mt-6">
            <p className="eyebrow text-[0.62rem] text-ouro-claro">
              Capítulo {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="t-h1 mt-4 text-balance text-papel">{titulo}</h3>
            <p className="t-lead mt-5 max-w-xl text-pretty text-papel/75">{texto}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

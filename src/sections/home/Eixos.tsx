import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { EIXOS, TOTAL_PROPOSTAS } from '../../data/programa';
import { EixoCard } from '../../components/programa/EixoCard';
import { SectionHead } from '../../components/ui/SectionHead';
import { ButtonLink } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { useIsDesktop } from '../../lib/media';

/**
 * Os 5 eixos. Computador: a seção trava e o trilho corre na horizontal
 * enquanto a pessoa rola (como um seletor de modelos). Celular/tablet:
 * carrossel nativo com encaixe.
 */
export function Eixos() {
  const desktop = useIsDesktop();
  return (
    <section id="eixos" className="surface-noite relative" aria-labelledby="eixos-titulo">
      {desktop ? <Trilho /> : <Carrossel />}
    </section>
  );
}

function Intro({ className }: { className?: string }) {
  return (
    <div className={className}>
      <SectionHead numero="03" rotulo="O programa" titulo={'5 eixos.\n1 compromisso.'} tituloClass="t-h1">
        {TOTAL_PROPOSTAS} propostas que dizem o que vamos fazer. Escritas para serem cobradas.
      </SectionHead>
      <Reveal delay={0.3} className="mt-10">
        <ButtonLink to="/programa" variant="outline">
          Programa completo
        </ButtonLink>
      </Reveal>
    </div>
  );
}

function Trilho() {
  const secao = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const medir = () => {
      if (!trilho.current) return;
      setDist(Math.max(0, trilho.current.scrollWidth - window.innerWidth));
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (trilho.current) ro.observe(trilho.current);
    window.addEventListener('resize', medir);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] });
  const xBruto = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const x = useSpring(xBruto, { stiffness: 140, damping: 30, mass: 0.4 });
  const barra = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const indice = useTransform(scrollYProgress, (v) => Math.min(5, Math.max(1, Math.round(v * 4) + 1)));
  const [atual, setAtual] = useState(1);
  useMotionValueEvent(indice, 'change', (v) => setAtual(v));

  return (
    <div ref={secao} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="grain" />
        <motion.div ref={trilho} style={{ x }} className="relative flex w-max items-stretch gap-6 pl-[var(--gutter)] pr-[12vw] will-change-transform">
          <Intro className="flex w-[34vw] max-w-[34rem] shrink-0 flex-col justify-center pr-[4vw]" />
          {EIXOS.map((e) => (
            <div key={e.id} className="h-[min(74vh,44rem)] w-[min(31rem,36vw)] shrink-0">
              <EixoCard eixo={e} />
            </div>
          ))}
        </motion.div>

        {/* Progresso */}
        <div className="container-x absolute inset-x-0 bottom-8 flex items-center gap-5" aria-hidden="true">
          <span className="tabular eyebrow text-[0.62rem] text-ouro-claro">0{atual}</span>
          <span className="relative h-px flex-1 bg-papel/10">
            <motion.span style={{ scaleX: barra }} className="absolute inset-0 origin-left bg-ouro" />
          </span>
          <span className="tabular eyebrow text-[0.62rem] text-salvia">05</span>
        </div>
      </div>
    </div>
  );
}

function Carrossel() {
  const ref = useRef<HTMLUListElement>(null);
  const [ativo, setAtivo] = useState(0);
  return (
    <div className="section-y relative overflow-hidden">
      <div className="grain" />
      <Intro className="container-x relative" />
      <ul
        ref={ref}
        className="scroller relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2"
        onScroll={(e) => {
          const el = e.currentTarget;
          const card = el.firstElementChild as HTMLElement | null;
          if (!card) return;
          setAtivo(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
        }}
      >
        {EIXOS.map((e) => (
          <li key={e.id} className="w-[86vw] max-w-[26rem] shrink-0 snap-start">
            <EixoCard eixo={e} className="min-h-[34rem]" />
          </li>
        ))}
        <li aria-hidden="true" className="w-1 shrink-0" />
      </ul>
      <div className="container-x mt-6 flex items-center justify-center gap-2.5" aria-hidden="true">
        {EIXOS.map((e, i) => (
          <span key={e.id} className={`h-px transition-all duration-500 ${i === ativo ? 'w-8 bg-ouro' : 'w-3 bg-papel/25'}`} />
        ))}
      </div>
    </div>
  );
}

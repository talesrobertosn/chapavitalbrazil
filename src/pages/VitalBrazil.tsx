import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { MARCOS, POR_ISSO, REDE } from '../data/vitalBrazil';
import { IMG } from '../assets/img';
import { Diamond, Figure, Ornament } from '../components/brand/Brand';
import { Reveal, RevealText } from '../components/ui/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { ArcoReveal } from '../components/fx/Arco';
import { FaixaMonumental } from '../components/fx/FaixaMonumental';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../lib/motion';

// Serpente: curva em S repetida, desenhada conforme a rolagem
function caminhoSerpente(voltas: number) {
  let d = 'M50 0';
  const h = 1000 / voltas;
  for (let i = 0; i < voltas; i++) {
    const y = i * h;
    const lado = i % 2 === 0 ? 1 : -1;
    d += ` C ${50 + 38 * lado} ${y + h * 0.25}, ${50 + 38 * lado} ${y + h * 0.75}, 50 ${y + h}`;
  }
  return d;
}

const IMAGENS = [IMG.retrato, IMG.butantan, IMG.laboratorio, IMG.butantan2];

export default function VitalBrazil() {
  const linha = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: linha, offset: ['start 0.7', 'end 0.6'] });
  const desenho = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Page titulo="Por que Vital Brazil?">
      <PageHero rotulo="O nome" titulo={'Ciência, coragem\ne serviço.'} destaque={['serviço.']}>
        Vital Brazil Mineiro da Campanha (1865–1950) foi médico, cientista e sanitarista. Dedicou a vida a transformar conhecimento em vidas salvas. É por isso que a chapa leva o nome dele.
      </PageHero>

      <ArcoReveal>
        <section className="surface-papel relative overflow-hidden py-24 md:py-36">
          <div className="grain" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 w-[min(40rem,90vw)] -translate-x-1/2 text-verde/[0.04]">
            <Figure />
          </div>
          <div className="container-x relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="flex items-center justify-center gap-3 text-ouro-escuro">
                <Diamond size={6} />
                <span className="eyebrow">Linha do tempo</span>
              </p>
              <RevealText as="h2" text="Uma vida a serviço da vida." className="t-h1 mt-5 text-verde" />
            </div>

            <div ref={linha} className="relative mx-auto mt-20 max-w-6xl md:mt-28">
              {/* Serpente */}
              <svg aria-hidden="true" className="absolute left-3 top-0 h-full w-14 md:left-1/2 md:w-24 md:-translate-x-1/2" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="none">
                <path d={caminhoSerpente(MARCOS.length)} stroke="currentColor" className="text-verde/10" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                <motion.path d={caminhoSerpente(MARCOS.length)} stroke="var(--color-ouro-escuro)" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength: desenho }} />
              </svg>

              <ol className="relative space-y-20 md:space-y-28">
                {MARCOS.map((m, i) => (
                  <Marco key={m.ano} i={i} {...m} />
                ))}
              </ol>
            </div>
          </div>
        </section>
      </ArcoReveal>

      <FaixaMonumental palavras={['Ciência', 'Coragem', 'Serviço']} className="bg-noite" traco="rgb(176 141 87 / 0.7)" />

      {/* Você sabia? */}
      <section id="rede" className="relative scroll-mt-20 overflow-hidden bg-verde py-24 md:py-36">
        <div className="grain" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-t-full border border-ouro/30">
              <img srcSet={IMG.serpente.srcSet} src={IMG.serpente.src} sizes="(min-width: 64rem) 40vw, 90vw" alt="Gravura de serpente em tons de verde" loading="lazy" className="aspect-[4/3] w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-verde via-transparent to-transparent" />
            </div>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="flex items-center gap-3 text-ouro-claro">
              <Diamond size={6} />
              <span className="eyebrow">Você sabia?</span>
            </p>
            <RevealText as="h2" text="Ciência se faz em rede." className="t-h1 mt-5 text-papel" />
            <Reveal delay={0.2}>
              <p className="t-lead mt-8 text-pretty text-papel/80">{REDE.texto}</p>
              <p className="t-quote mt-8 text-ouro-claro">{REDE.ponte}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Por isso o nome */}
      <section className="relative overflow-hidden bg-noite py-28 text-center md:py-40">
        <div className="grain" />
        <div className="container-x relative flex flex-col items-center">
          <Ornament className="text-ouro" width={56} />
          <RevealText as="p" text={POR_ISSO} className="t-hero mt-10 max-w-4xl text-balance text-papel" highlight={['nome.']} highlightClassName="italic text-ouro-claro" />
          <Reveal delay={0.3} className="mt-12 flex flex-col gap-3 xs:flex-row">
            <ButtonLink to="/programa">Conheça o programa</ButtonLink>
            <ButtonLink to="/diretoria" variant="outline" icon={false}>
              Quem faz a gestão
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}

function Marco({ i, ano, titulo, texto }: { i: number; ano: string; titulo: string; texto: string }) {
  const direita = i % 2 === 1;
  const img = IMAGENS[i % IMAGENS.length];
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <li ref={ref} className="relative grid items-center gap-8 pl-16 md:grid-cols-2 md:gap-24 md:pl-0">
      <motion.span
        aria-hidden="true"
        className="absolute left-[1.15rem] top-3 size-4 rotate-45 border border-ouro-escuro bg-papel md:left-1/2 md:top-1/2 md:-ml-2 md:-mt-2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, backgroundColor: 'var(--color-ouro-escuro)' }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />
      <motion.div
        className={cn(direita ? 'md:order-2' : 'md:text-right')}
        initial={{ opacity: 0, x: direita ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: EASE_OUT }}
      >
        <motion.p style={{ y }} className={cn('tabular font-display font-bold leading-[0.85] text-transparent [-webkit-text-stroke:1.2px_var(--color-ouro-escuro)]', /^\d+$/.test(ano) ? 'text-[clamp(4.5rem,10vw,8.5rem)]' : 'text-[clamp(3.5rem,7vw,6rem)] italic')}>
          {ano}
        </motion.p>
        <h3 className="t-h2 mt-3 text-balance text-verde">{titulo}</h3>
        <p className={cn('mt-4 max-w-md text-pretty text-tinta-2', !direita && 'md:ml-auto')}>{texto}</p>
      </motion.div>
      <div className={cn('hidden md:block', direita ? 'md:order-1' : '')}>
        {img && (
          <motion.div
            className={cn('relative w-[min(20rem,80%)] overflow-hidden rounded-t-full', direita ? 'ml-auto' : '')}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <img srcSet={img.srcSet} src={img.src} sizes="20rem" alt="" loading="lazy" className="aspect-[3/4] w-full object-cover [filter:sepia(0.15)]" />
          </motion.div>
        )}
      </div>
    </li>
  );
}

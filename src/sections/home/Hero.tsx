import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Diamond, Leaf, Medal } from '../../components/brand/Brand';
import { FeixesDeLuz, PoeiraDourada } from '../../components/fx/Atmosfera';
import { ButtonLink } from '../../components/ui/Button';
import { Countdown } from '../../components/ui/Countdown';
import { BrushUnderline } from '../../components/ui/Reveal';
import { INTRO_ATIVA_NA_CARGA } from '../../components/layout/Intro';
import { site } from '../../config/site';
import { InstagramIcon, WhatsappIcon } from '../../components/brand/Brand';
import { FRASES } from '../../data/frases';
import { MEMBROS } from '../../data/diretoria';
import { Portrait } from '../../components/ui/Portrait';
import { useNuvem } from '../../components/layout/NuvemFrases';
import { diaISO } from '../../lib/datas';
import { DATA_ELEICAO, useFase, type Fase } from '../../lib/fase';
import { diaDaSemana, formatarLongo } from '../../lib/datas';
import { useFinePointer } from '../../lib/media';
import { EASE_OUT, SPRING_SOFT } from '../../lib/motion';
import { IMG } from '../../assets/img';

const TITULOS: Record<Fase, { titulo: string; sub: string }> = {
  campanha: { titulo: 'Chegamos.', sub: site.slogan },
  vespera: { titulo: 'Amanhã.', sub: 'Sua voz vira voto. Amanhã é dia de escolher a formação que você quer.' },
  eleicao: { titulo: 'Hoje.', sub: 'É dia de escolher a formação que você quer. Vota e chama sua turma.' },
  encerrada: { titulo: 'Obrigado.', sub: 'Pela escuta, pela confiança e por cada conversa durante a campanha.' },
};

export function Hero() {
  const fase = useFase();
  const { titulo, sub } = TITULOS[fase];
  const d0 = INTRO_ATIVA_NA_CARGA ? 2.75 : 0.15;
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();

  // Paralaxe por rolagem
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yTitulo = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const opTitulo = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const yPredio = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);

  // Paralaxe pelo mouse (só computador): três profundidades
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING_SOFT);
  const sy = useSpring(my, SPRING_SOFT);
  const p1x = useTransform(sx, (v) => v * -10);
  const p1y = useTransform(sy, (v) => v * -8);
  const p2x = useTransform(sx, (v) => v * 18);
  const p2y = useTransform(sy, (v) => v * 12);
  const p3x = useTransform(sx, (v) => v * 34);
  const p3y = useTransform(sy, (v) => v * 22);

  const dataTxt = `${diaDaSemana(DATA_ELEICAO)}, ${formatarLongo(DATA_ELEICAO)}`;
  const letras = titulo.toUpperCase().split('');
  const { abrir: abrirNuvem } = useNuvem();
  // Frase do dia: muda a cada dia, igual para todo mundo
  const fraseDoDia = FRASES[Number(diaISO(new Date()).replace(/-/g, '')) % FRASES.length]!;

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-noite pt-[calc(var(--header-h)+env(safe-area-inset-top))] lg:min-h-[100svh]"
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      aria-labelledby="hero-titulo"
    >
      {/* Atmosfera */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(80% 60% at 72% 42%, rgb(40 74 60 / 0.75) 0%, transparent 70%), radial-gradient(60% 50% at 10% 90%, rgb(30 58 47 / 0.6) 0%, transparent 70%)' }}
      />
      {/* Medalhão monumental girando devagar ao fundo */}
      <motion.div
        aria-hidden="true"
        style={{ x: p1x, y: p1y }}
        className="pointer-events-none absolute -right-[18vw] top-[8%] -z-10 w-[min(64rem,92vw)] md:-right-[10vw] md:top-[2%]"
        initial={{ opacity: 0, scale: 0.9, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 3, delay: d0, ease: EASE_OUT }}
      >
        <div className="animate-spin-slow text-ouro/[0.045]" style={{ ['--spin-duration' as string]: '260s' }}>
          <Medal title="" aria-hidden="true" />
        </div>
      </motion.div>
      <FeixesDeLuz className="-z-10" />
      <PoeiraDourada className="-z-10" densidade={1.1} />
      <div className="grain -z-10" />
      <div className="vignette -z-10" />
      <motion.div aria-hidden="true" style={{ x: p3x, y: p3y }} className="pointer-events-none absolute -left-24 bottom-[-6rem] -z-10 w-[min(26rem,60vw)] text-ouro/[0.14]">
        <Leaf />
      </motion.div>
      {/* Folhagem em primeiro plano, mais próxima da câmera */}
      <motion.div aria-hidden="true" style={{ x: p3x, y: p3y }} className="pointer-events-none absolute -bottom-24 -right-16 z-20 hidden w-[min(22rem,30vw)] -scale-x-100 text-ouro/[0.22] lg:block">
        <Leaf />
      </motion.div>

      <div className="container-x relative">
        {/* Rótulo */}
        <motion.div
          className="flex items-center gap-3 pt-8 text-ouro-claro md:pt-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: d0, ease: EASE_OUT }}
        >
          <span className="h-px w-10 bg-ouro/70" />
          <Diamond size={6} />
          <span className="eyebrow text-[0.62rem] sm:text-[0.72rem]">Chapa ao CA de Medicina · FAPI</span>
        </motion.div>

        {/* Título monumental */}
        <motion.div style={{ y: yTitulo, opacity: opTitulo }} className="relative z-10">
          <h1 id="hero-titulo" className="t-mega relative mt-5 text-papel md:mt-8" aria-label={titulo}>
            {/* Folha de ouro: o brilho percorre o título de tempos em tempos */}
            <motion.span
              aria-hidden="true"
              className="brilho-metalico pointer-events-none absolute inset-0 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d0 + 1.6, duration: 0.6 }}
            >
              {letras.map((l, i) => (
                <span key={i} className="inline-block pb-[0.06em]">
                  {l}
                </span>
              ))}
            </motion.span>
            <span className="flex" aria-hidden="true">
              {letras.map((l, i) => (
                <span key={`${titulo}-${i}`} className="inline-block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.2, delay: d0 + 0.15 + i * 0.055, ease: EASE_OUT }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
          <BrushUnderline className="-mt-1 h-4 w-[min(78%,52rem)] md:h-6" delay={d0 + 0.85} trigger />
        </motion.div>

        <div className="relative grid gap-12 pb-16 pt-8 md:grid-cols-12 md:gap-8 md:pb-24 lg:pt-4">
          {/* Texto e chamadas */}
          <div className="relative z-10 md:col-span-7 lg:col-span-6 lg:pt-10">
            <div className="flex items-start gap-5">
              <motion.p
              className="t-lead min-w-0 flex-1 max-w-xl text-pretty text-papel/80"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: d0 + 0.95, ease: EASE_OUT }}
            >
              {fase === 'campanha' ? (
                <>
                  Mais que uma gestão, <span className="text-ouro-claro">um compromisso</span> com a nossa formação.
                </>
              ) : (
                sub
              )}
            </motion.p>
              {/* Retrato compacto (celular e tablet) */}
              <motion.div
                aria-hidden="true"
                className="relative w-[34%] max-w-[11rem] shrink-0 md:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: d0 + 0.7, ease: EASE_OUT }}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-t-full">
                  <img srcSet={IMG.retrato.srcSet} src={IMG.retrato.src} sizes="(min-width: 48rem) 1px, 34vw" alt="" className="h-full w-full object-cover object-[50%_18%]" />
                </div>
                <span className="absolute -inset-1.5 rounded-t-full border border-ouro/45" />
              </motion.div>
            </div>
            <motion.p
              className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-salvia"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: d0 + 1.05, ease: EASE_OUT }}
            >
              Estudantes do primeiro ao último período, por uma formação médica mais humana, justa, forte e participativa.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: d0 + 1.2, ease: EASE_OUT }}
            >
              {fase === 'vespera' || fase === 'eleicao' ? (
                <ButtonLink to="/votar">Como votar</ButtonLink>
              ) : (
                <ButtonLink to="/programa">Ver o programa</ButtonLink>
              )}
              <ButtonLink to="/diretoria" variant="outline" icon={false}>
                <span className="flex items-center gap-3">
                  <span className="flex -space-x-2.5" aria-hidden="true">
                    {MEMBROS.slice(0, 4).map((m) => (
                      <Portrait key={m.slug} membro={m} tamanho="sm" anel={false} className="w-7 ring-2 ring-noite" />
                    ))}
                  </span>
                  Conheça a diretoria
                </span>
              </ButtonLink>
            </motion.div>
            <motion.a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/ig mt-5 inline-flex items-center gap-2.5 text-[0.85rem] font-semibold text-papel/85 transition-colors hover:text-ouro-claro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: d0 + 1.32, ease: EASE_OUT }}
            >
              <span className="grid size-8 place-items-center rounded-full ring-1 ring-ouro/60 transition-colors group-hover/ig:bg-ouro-claro group-hover/ig:text-noite">
                <InstagramIcon size={15} />
              </span>
              {site.instagram.handle}
              <span className="text-salvia">· todo dia tem novidade</span>
            </motion.a>

            {/* Frase do dia */}
            {fase === 'campanha' && (
              <motion.div
                className="mt-8 flex max-w-xl flex-col gap-3 border-l border-ouro/40 pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: d0 + 1.45, ease: EASE_OUT }}
              >
                <div>
                  <p className="eyebrow text-[0.56rem] text-salvia">Frase do dia</p>
                  <p className="mt-1 font-script text-[1.35rem] italic leading-snug text-ouro-claro">“{fraseDoDia.texto}”</p>
                </div>
                <button
                  type="button"
                  onClick={abrirNuvem}
                  className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full px-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-papel ring-1 ring-inset ring-ouro/60 transition-colors hover:bg-papel hover:text-noite sm:self-auto"
                >
                  <WhatsappIcon size={15} /> Mandar essa
                </button>
              </motion.div>
            )}

            {/* Contagem */}
            {(fase === 'campanha' || fase === 'vespera') && (
              <motion.div
                className="mt-12 border-t border-ouro/20 pt-6 md:mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: d0 + 1.45 }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="eyebrow text-[0.62rem] text-ouro-claro">Eleição do CA</p>
                  <p className="text-[0.85rem] text-papel/70">
                    <span className="first-letter:uppercase">{dataTxt}</span>
                    {!site.eleicao.confirmada && <span className="ml-2 text-salvia">· data a confirmar</span>}
                  </p>
                </div>
                <Countdown className="mt-4 text-papel" />
              </motion.div>
            )}
          </div>

          {/* Composição em camadas: prédio do Butantan + retrato em arco */}
          <div className="relative hidden md:col-span-5 md:block md:pt-6 lg:col-span-6 lg:-mt-[clamp(4rem,9vw,10rem)] lg:pt-0" aria-hidden="true">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] lg:ml-auto lg:mr-0">
              {/* Prédio, ao fundo */}
              <motion.div style={{ x: p1x, y: p1y }} className="absolute right-0 top-0 h-[78%] w-[66%]">
                <motion.div
                  className="h-full w-full overflow-hidden rounded-t-full"
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ duration: 1.6, delay: d0 + 0.35, ease: [0.76, 0, 0.24, 1] }}
                >
                  <motion.img
                    srcSet={IMG.butantan.srcSet}
                    src={IMG.butantan.src}
                    sizes="(min-width: 64rem) 22rem, (min-width: 48rem) 28vw, 1px"
                    alt=""
                    className="h-[118%] w-full object-cover opacity-80 [filter:sepia(0.35)_saturate(0.8)_brightness(0.85)]"
                    style={{ y: yPredio }}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.2, delay: d0 + 0.35, ease: EASE_OUT }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noite via-noite/30 to-transparent" />
                </motion.div>
                <span className="absolute -inset-3 rounded-t-full border border-ouro/25" />
              </motion.div>

              {/* Retrato, à frente */}
              <motion.div style={{ x: p2x, y: p2y }} className="absolute bottom-0 left-0 h-[82%] w-[60%]">
                <motion.div style={{ y: yImg }} className="relative h-full w-full">
                  <motion.div
                    className="h-full w-full overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]"
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    transition={{ duration: 1.6, delay: d0 + 0.6, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <motion.img
                      srcSet={IMG.retrato.srcSet}
                      src={IMG.retrato.src}
                      sizes="(min-width: 64rem) 20rem, (min-width: 48rem) 26vw, 1px"
                      alt=""
                      className="h-full w-full object-cover object-[50%_20%]"
                      initial={{ scale: 1.25 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2.4, delay: d0 + 0.6, ease: EASE_OUT }}
                    />
                  </motion.div>
                  <motion.span
                    className="absolute -inset-2.5 rounded-t-full border border-ouro/50"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, delay: d0 + 1.5, ease: EASE_OUT }}
                  />
                </motion.div>
              </motion.div>

              {/* Legenda de catálogo */}
              <motion.div
                className="absolute bottom-[6%] right-0 hidden w-[34%] border-l border-ouro/40 pl-4 lg:block"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: d0 + 1.7, ease: EASE_OUT }}
              >
                <p className="eyebrow text-[0.56rem] text-ouro-claro">Vital Brazil</p>
                <p className="tabular mt-1 text-[0.8rem] text-papel/70">1865 — 1950</p>
                <p className="mt-2 font-script text-[1.05rem] italic leading-snug text-papel/80">Ciência, coragem e serviço.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Convite à rolagem */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-salvia xl:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d0 + 2.1, duration: 1 }}
        aria-hidden="true"
      >
        <span className="eyebrow text-[0.55rem]">Role</span>
        <span className="relative h-10 w-px overflow-hidden bg-papel/15">
          <motion.span className="absolute inset-x-0 top-0 h-4 bg-ouro" animate={{ y: [-16, 40] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </motion.div>
    </section>
  );
}

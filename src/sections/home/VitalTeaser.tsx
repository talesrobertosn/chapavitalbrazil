import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { MARCOS, POR_ISSO } from '../../data/vitalBrazil';
import { IMG } from '../../assets/img';
import { SectionHead } from '../../components/ui/SectionHead';
import { ButtonLink } from '../../components/ui/Button';
import { Diamond } from '../../components/brand/Brand';
import { Reveal } from '../../components/ui/Reveal';
import { DUR, EASE_OUT } from '../../lib/motion';

export function VitalTeaser() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const linha = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const marcos = MARCOS.filter((m) => m.destaque);

  return (
    <section ref={ref} className="surface-papel section-y relative overflow-hidden" aria-labelledby="vital-titulo">
      <div className="grain" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Retrato em arco com paralaxe */}
        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:mx-0">
          <motion.div
            className="relative aspect-[3/4] overflow-hidden rounded-t-full"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              srcSet={IMG.laboratorio.srcSet}
              src={IMG.laboratorio.src}
              sizes="(min-width: 64rem) 26rem, 90vw"
              alt="Ilustração de Vital Brazil trabalhando em laboratório, ao microscópio"
              loading="lazy"
              style={{ y }}
              className="h-[116%] w-full object-cover object-[50%_30%]"
            />
          </motion.div>
          <span aria-hidden="true" className="absolute -inset-3 rounded-t-full border border-ouro-escuro/40" />
          <p className="eyebrow absolute -bottom-9 left-0 text-[0.58rem] text-ouro-escuro">Vital Brazil · 1865 — 1950</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHead numero="05" rotulo="O nome" titulo="Por que Vital Brazil?" tom="claro">
            Médico, cientista e sanitarista. Dedicou a vida a transformar conhecimento em vidas salvas, longe dos holofotes e perto de quem precisava.
          </SectionHead>

          <ol className="relative mt-12 space-y-7 pl-8">
            <span aria-hidden="true" className="absolute bottom-2 left-[3px] top-2 w-px bg-verde/15" />
            <motion.span aria-hidden="true" style={{ scaleY: linha }} className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-ouro-escuro" />
            {marcos.map((m, i) => (
              <motion.li
                key={m.ano}
                className="relative"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: DUR.media, ease: EASE_OUT, delay: i * 0.08 }}
              >
                <Diamond size={8} className="absolute -left-8 top-[0.4em] -translate-x-[1px] text-ouro-escuro" />
                <p className="tabular font-display text-[1.35rem] font-bold leading-none text-ouro-escuro">{m.ano}</p>
                <p className="mt-1.5 font-display text-[1.15rem] font-semibold text-verde">{m.titulo}</p>
              </motion.li>
            ))}
          </ol>

          <Reveal delay={0.15} className="mt-12 border-t border-verde/15 pt-8">
            <p className="t-quote text-verde">{POR_ISSO}</p>
            <ButtonLink to="/vital-brazil" variant="solid-dark" className="mt-8">
              Conheça a história
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

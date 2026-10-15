import { motion } from 'motion/react';
import { CEM_DIAS } from '../../data/programa';
import { SectionHead } from '../../components/ui/SectionHead';
import { Diamond } from '../../components/brand/Brand';
import { DUR, EASE_OUT } from '../../lib/motion';

/** Primeiros 100 dias: três marcos ligados por um fio de ouro que se desenha. */
export function CemDias() {
  return (
    <section className="surface-verde section-y relative overflow-hidden" aria-labelledby="cem-titulo">
      <div className="grain" />
      <div className="container-x relative">
        <SectionHead numero="06" rotulo="Primeiros 100 dias" titulo="Resultado desde o início.">
          Algumas propostas levam a gestão inteira. Estas começam já, para você ver resultado desde o início.
        </SectionHead>

        <div className="relative mt-16 md:mt-24">
          {/* Fio horizontal (computador) */}
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-ouro md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2, ease: EASE_OUT }}
          />
          <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
            {CEM_DIAS.map((etapa, i) => (
              <motion.li
                key={etapa.prazo}
                className="relative border-l border-ouro/30 pl-6 md:border-l-0 md:pl-0 md:pt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: DUR.longa, ease: EASE_OUT, delay: 0.25 + i * 0.25 }}
              >
                <p className="flex items-baseline gap-3">
                  <span className="eyebrow text-[0.6rem] text-salvia">Até</span>
                  <span className="tabular font-display text-[clamp(4rem,8vw,6.5rem)] font-bold leading-[0.8] text-ouro">{etapa.prazo}</span>
                  <span className="font-display text-xl italic text-papel/70">dias</span>
                </p>
                <span aria-hidden="true" className="absolute left-0 top-0 z-[2] hidden size-3 -translate-y-1/2 rotate-45 border border-ouro bg-verde md:block" />
                <ul className="mt-8 space-y-3.5">
                  {etapa.itens.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.98rem] leading-snug text-papel/85">
                      <Diamond size={6} className="mt-[0.45em] shrink-0 text-ouro" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

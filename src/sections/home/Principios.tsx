import { motion } from 'motion/react';
import { PRINCIPIOS } from '../../data/programa';
import { ICONE_PRINCIPIO, IconRing } from '../../components/ui/Icons';
import { SectionHead } from '../../components/ui/SectionHead';
import { DUR, EASE_OUT } from '../../lib/motion';

/** Os cinco princípios: fileira no computador, carrossel por toque no celular. */
export function Principios() {
  return (
    <section className="surface-verde section-y relative overflow-hidden" aria-labelledby="principios-titulo">
      <div className="grain" />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHead numero="02" rotulo="Nossos princípios" titulo="O que nos guia." className="lg:col-span-5" />
          <p className="t-lead self-end text-pretty text-papel/70 lg:col-span-6 lg:col-start-7">
            Cinco compromissos que atravessam todas as propostas, do primeiro dia de aula ao último plantão.
          </p>
        </div>
      </div>

      <ul className="scroller relative mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 md:mt-20 lg:mx-auto lg:max-w-[92rem] lg:grid lg:grid-cols-5 lg:gap-0 lg:overflow-visible lg:pb-0">
        {PRINCIPIOS.map((p, i) => {
          const Icon = ICONE_PRINCIPIO[p.id]!;
          return (
            <motion.li
              key={p.id}
              className="group relative w-[78vw] max-w-[20rem] shrink-0 snap-start border border-ouro/20 bg-noite/25 p-7 lg:w-auto lg:max-w-none lg:border-y-0 lg:border-l lg:border-r-0 lg:bg-transparent lg:px-7 lg:py-2 lg:[&:nth-child(5)]:border-r"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: DUR.longa, ease: EASE_OUT, delay: i * 0.08 }}
            >
              <IconRing Icon={Icon} className="group-hover:bg-ouro/10 group-hover:text-papel" />
              <p className="tabular eyebrow mt-8 text-[0.62rem] text-salvia">0{i + 1}</p>
              <h3 className="t-h3 mt-2 text-papel">{p.titulo}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-papel/70">{p.texto}</p>
              <span aria-hidden="true" className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-ouro transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100 lg:bottom-auto lg:top-0" />
            </motion.li>
          );
        })}
        <li aria-hidden="true" className="w-1 shrink-0 lg:hidden" />
      </ul>
    </section>
  );
}

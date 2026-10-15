import { motion } from 'motion/react';
import { COMO_COBRAR } from '../../data/programa';
import { Diamond, Ornament } from '../../components/brand/Brand';
import { Reveal, RevealText } from '../../components/ui/Reveal';
import { DUR, EASE_OUT } from '../../lib/motion';

export function Cobrar() {
  return (
    <section className="surface-papel section-y relative overflow-hidden" aria-labelledby="cobrar-titulo">
      <div className="grain" />
      <div className="container-x relative">
        <Reveal y={12} className="flex items-center gap-3 text-ouro-escuro">
          <span className="tabular eyebrow">08</span>
          <Diamond size={6} />
          <span className="eyebrow">Como você pode nos cobrar</span>
        </Reveal>
        <RevealText
          as="h2"
          text={'Este programa foi escrito\npara ser cobrado.'}
          className="t-hero mt-6 max-w-5xl text-balance text-verde"
          highlight={['cobrado.']}
          highlightClassName="italic text-ouro-escuro"
        />

        <ul className="mt-16 grid border-t border-verde/15 sm:grid-cols-2 lg:grid-cols-5">
          {COMO_COBRAR.map((c, i) => (
            <motion.li
              key={c.titulo}
              className="border-b border-verde/15 py-7 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: DUR.longa, ease: EASE_OUT, delay: i * 0.07 }}
            >
              <span className="tabular eyebrow text-[0.6rem] text-ouro-escuro">0{i + 1}</span>
              <h3 className="mt-3 font-display text-[1.3rem] font-semibold text-verde">{c.titulo}</h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-tinta-2">{c.texto}</p>
            </motion.li>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col items-center text-center">
          <Ornament className="text-ouro-escuro" width={48} />
          <p className="t-quote mt-6 max-w-2xl text-verde">Se algo não andar, você vai saber por nós.</p>
        </Reveal>
      </div>
    </section>
  );
}

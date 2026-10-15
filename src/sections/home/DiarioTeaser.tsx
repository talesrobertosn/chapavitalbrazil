import { motion } from 'motion/react';
import { DIARIO } from '../../data/diario';
import { diaAtual, estadoDoDia } from '../../lib/diario';
import { Prancha } from '../../components/diario/Prancha';
import { SectionHead } from '../../components/ui/SectionHead';
import { ButtonLink } from '../../components/ui/Button';
import { DUR, EASE_OUT } from '../../lib/motion';

export function DiarioTeaser() {
  const atual = diaAtual();
  const i = DIARIO.indexOf(atual);
  const janela = DIARIO.slice(Math.max(0, Math.min(i - 1, DIARIO.length - 4)), Math.max(0, Math.min(i - 1, DIARIO.length - 4)) + 4);

  return (
    <section className="surface-noite section-y relative overflow-hidden" aria-labelledby="diario-titulo">
      <div className="grain" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead numero="09" rotulo="Diário da campanha" titulo={`Dia ${atual.dia} de 20.`}>
            Um post por dia, do primeiro "Chegamos." ao dia da eleição. Os próximos ficam lacrados até a data.
          </SectionHead>
          <ButtonLink to="/diario" variant="outline" className="self-start lg:self-auto">
            Ver o diário
          </ButtonLink>
        </div>
        <div className="scroller -mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {janela.map((d, k) => (
            <motion.div
              key={d.dia}
              className="w-[72vw] max-w-[18rem] shrink-0 snap-start md:w-auto md:max-w-none"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: DUR.longa, ease: EASE_OUT, delay: k * 0.08 }}
            >
              <Prancha dia={d} estado={estadoDoDia(d)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

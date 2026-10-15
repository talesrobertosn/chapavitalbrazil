import { motion } from 'motion/react';
import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { DIARIO, SEMANAS, type Semana } from '../data/diario';
import { diaAtual, estadoDoDia } from '../lib/diario';
import { Prancha } from '../components/diario/Prancha';
import { Diamond, InstagramIcon } from '../components/brand/Brand';
import { ButtonA } from '../components/ui/Button';
import { site } from '../config/site';
import { EASE_OUT } from '../lib/motion';

export default function Diario() {
  const atual = diaAtual();
  const progresso = DIARIO.filter((d) => estadoDoDia(d) !== 'lacrado').length / DIARIO.length;

  return (
    <Page titulo="Diário da campanha">
      <PageHero
        rotulo="Diário da campanha"
        titulo={`Dia ${atual.dia} de 20.`}
        extra={
          <div className="max-w-xl">
            <div className="flex items-center justify-between text-[0.75rem] text-salvia">
              <span className="eyebrow text-[0.58rem]">Campanha</span>
              <span className="tabular">{Math.round(progresso * 100)}%</span>
            </div>
            <div className="mt-3 h-px w-full bg-papel/10">
              <motion.div className="h-px origin-left bg-ouro" initial={{ scaleX: 0 }} animate={{ scaleX: progresso }} transition={{ duration: 1.6, delay: 0.6, ease: EASE_OUT }} />
            </div>
            <div className="mt-8">
              <ButtonA href={site.instagram.url} variant="outline" icon={<InstagramIcon size={16} />}>
                Acompanhe no Instagram
              </ButtonA>
            </div>
          </div>
        }
      >
        Um post por dia, do primeiro “Chegamos.” ao dia da eleição. Os próximos ficam lacrados até a data. Ativa o sininho: todo dia tem novidade.
      </PageHero>

      <section className="surface-verde relative pb-28 pt-6">
        <div className="grain" />
        <div className="container-x relative space-y-20">
          {([1, 2, 3] as Semana[]).map((s) => (
            <div key={s}>
              <div className="flex flex-col gap-2 border-b border-ouro/20 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="flex items-center gap-3 text-ouro-claro">
                    <span className="tabular eyebrow">Semana {s}</span>
                    <Diamond size={6} />
                  </p>
                  <h2 className="t-h2 mt-3 text-papel">{SEMANAS[s].titulo}</h2>
                </div>
                <p className="text-papel/60">{SEMANAS[s].texto}</p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4">
                {DIARIO.filter((d) => d.semana === s).map((d, i) => (
                  <motion.div
                    key={d.dia}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: EASE_OUT, delay: (i % 4) * 0.06 }}
                  >
                    <Prancha dia={d} estado={estadoDoDia(d)} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

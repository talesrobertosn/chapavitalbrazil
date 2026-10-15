import { motion } from 'motion/react';
import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { Medal, WhatsappIcon } from '../components/brand/Brand';
import { ButtonA, ButtonLink } from '../components/ui/Button';
import { TEXTOS_WHATSAPP, whatsappUrl } from '../lib/share';
import { EASE_OUT } from '../lib/motion';

/**
 * CARTA AO CALOURO (dia 14 do calendário).
 * Texto construído só com compromissos do programa: recepção, trote
 * solidário, apadrinhamento, mentoria, materiais e cuidado.
 */
const PARAGRAFOS = [
  'Você chegou. Depois de tanto estudo e de tanta espera, você está aqui. E a gente sabe: o começo pode assustar. Prédios novos, rostos novos e uma rotina que ninguém explica direito.',
  'Por isso, queremos te dizer uma coisa logo no primeiro dia: ninguém deveria se sentir sozinho no 1º período.',
  'Queremos uma semana de acolhimento de verdade, com tour pelo campus, apresentação das ligas e do CA, e um veterano para chamar de padrinho. Uma recepção sem humilhação, com regras claras e tolerância zero a abusos.',
  'Queremos mentoria com quem já passou por onde você está passando, materiais de estudo organizados por período e gente disposta a ouvir quando a pressão apertar.',
  'A medicina também se faz fora da sala de aula. E ela começa com cuidado: com você.',
];

export default function Calouro() {
  return (
    <Page titulo="Querido calouro">
      <PageHero rotulo="Uma carta" titulo={'Querido\ncalouro,'} destaque={['calouro,']}>
        Para quem está chegando agora, e para todo veterano que lembra como foi.
      </PageHero>

      <section className="relative overflow-hidden bg-verde py-20 md:py-28">
        <div className="grain" />
        <motion.article
          className="container-x relative"
          initial={{ opacity: 0, y: 60, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <div className="surface-papel relative mx-auto max-w-3xl p-3 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] md:p-4">
            <div className="grain" />
            <div className="relative border-[3px] border-double border-verde/60 px-6 py-12 sm:px-12 md:px-16 md:py-16">
              <div className="flex items-start justify-between">
                <p className="eyebrow text-[0.6rem] text-ouro-escuro">CA Medicina · FAPI</p>
                <Medal className="size-14 text-verde/80" title="" aria-hidden="true" />
              </div>
              <h2 className="mt-8 font-script text-[clamp(2.4rem,6vw,3.6rem)] font-semibold italic leading-none text-verde">Querido calouro,</h2>
              <div className="mt-10 space-y-6">
                {PARAGRAFOS.map((p, i) => (
                  <motion.p
                    key={i}
                    className="font-script text-[1.4rem] italic leading-[1.55] text-tinta md:text-[1.6rem]"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.05 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <p className="mt-12 font-script text-[1.6rem] italic text-tinta">Seja muito bem-vindo.</p>
              <div className="mt-10 flex items-end justify-between gap-6 border-t border-verde/15 pt-8">
                <div>
                  <p className="font-script text-[1.3rem] italic text-tinta-2">Com carinho,</p>
                  <p className="mt-2 font-display text-[1.35rem] font-bold text-verde">Gestão Dr. Vital Brazil</p>
                </div>
                <span className="relative grid size-20 shrink-0 place-items-center rounded-full bg-verde shadow-[inset_0_-8px_14px_rgb(0_0_0/0.35)]" aria-hidden="true">
                  <Medal className="size-14 text-noite/60" title="" />
                </span>
              </div>
            </div>
          </div>
        </motion.article>
        <div className="container-x relative mt-14 flex flex-col items-center justify-center gap-3 xs:flex-row">
          <ButtonA href={whatsappUrl(TEXTOS_WHATSAPP.calouro())} icon={<WhatsappIcon size={16} />}>
            Manda pra um calouro
          </ButtonA>
          <ButtonLink to="/programa" variant="outline" icon={false}>
            O que propomos
          </ButtonLink>
        </div>
      </section>
    </Page>
  );
}

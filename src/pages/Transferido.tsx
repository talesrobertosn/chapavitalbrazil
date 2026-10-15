import { motion } from 'motion/react';
import { BookOpenCheck, CalendarRange, MessagesSquare, UsersRound, Waypoints } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { SectionHead } from '../components/ui/SectionHead';
import { Reveal } from '../components/ui/Reveal';
import { Diamond, Medal, WhatsappIcon } from '../components/brand/Brand';
import { ButtonA, ButtonLink } from '../components/ui/Button';
import { TEXTOS_WHATSAPP, whatsappUrl } from '../lib/share';
import { EASE_OUT } from '../lib/motion';

/**
 * CARTA AO ALUNO TRANSFERIDO (irmã da carta ao calouro).
 * Texto escrito pela chapa. A proposta de apoio aos transferidos é
 * apresentada aqui, à parte dos 5 eixos / 52 propostas do programa oficial.
 */
const CARTA = [
  'Se você acabou de se transferir, provavelmente já percebeu que mudar de faculdade envolve muito mais do que simplesmente começar a frequentar as aulas. É chegar em um lugar onde as pessoas já se conhecem, os grupos já estão formados e muita coisa que parece óbvia para quem está ali desde o início é completamente nova para você.',
  'Na nossa chapa temos duas meninas que são transferidas e sabemos como pode ser difícil entender o funcionamento da faculdade, descobrir com quem falar, como funcionam as provas, os estágios, as atividades extracurriculares e até mesmo conseguir se integrar à turma.',
  'Por isso, a nossa proposta é criar um apoio mais organizado para os alunos transferidos, para que ninguém precise descobrir tudo sozinho.',
];

const FECHO = 'Nossa intenção é que o aluno transferido não se sinta perdido ou deixado de lado por ter chegado depois. Queremos que exista um espaço onde ele possa perguntar, participar, sugerir melhorias e, principalmente, sentir que também faz parte da turma.';

const QUEREMOS = [
  {
    Icon: CalendarRange,
    titulo: 'Informação desde o primeiro dia',
    texto: 'Orientações sobre a rotina acadêmica, calendário de provas, plataformas utilizadas, funcionamento das disciplinas, atividades práticas, ligas acadêmicas, projetos de extensão e oportunidades dentro da faculdade.',
  },
  {
    Icon: MessagesSquare,
    titulo: 'Um canal só dos transferidos',
    texto: 'Um canal de comunicação específico para tirar dúvidas, compartilhar informações e identificar dificuldades que possam ser levadas à comissão e à coordenação.',
  },
  {
    Icon: UsersRound,
    titulo: 'Integração com a turma',
    texto: 'Quem chega de transferência muitas vezes encontra uma turma com seus grupos e sua rotina estabelecida. Queremos incentivar a aproximação, facilitando a participação em grupos de estudo, atividades acadêmicas e eventos da turma.',
  },
  {
    Icon: BookOpenCheck,
    titulo: 'Adaptação curricular',
    texto: 'Atenção à equivalência de disciplinas, diferenças entre grades, reposições, horários e possíveis pendências acadêmicas, ajudando a encontrar os setores responsáveis e as orientações adequadas.',
  },
  {
    Icon: Waypoints,
    titulo: 'Espaço para participar',
    texto: 'Um lugar para perguntar, participar e sugerir melhorias. Chegar depois não é motivo para ficar de fora.',
  },
];

export default function Transferido() {
  return (
    <Page titulo="Querido transferido">
      <PageHero rotulo="Uma carta" titulo={'Querido\ntransferido,'} destaque={['transferido,']} tituloClass="t-mega !text-[clamp(2.4rem,10.4vw,9.5rem)]">
        Para quem chegou depois, no meio do caminho. E para toda turma que vai receber alguém novo.
      </PageHero>

      {/* A CARTA */}
      <section className="relative overflow-hidden bg-verde py-20 md:py-28">
        <div className="grain" />
        <motion.article
          className="container-x relative"
          initial={{ opacity: 0, y: 60, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <div className="surface-papel relative mx-auto max-w-3xl p-3 shadow-[0_60px_120px_-40px_rgb(0_0_0/0.7)] md:p-4">
            <div className="grain" />
            <div className="relative border-[3px] border-double border-verde/60 px-6 py-12 sm:px-12 md:px-16 md:py-16">
              <div className="flex items-start justify-between">
                <p className="eyebrow text-[0.6rem] text-ouro-escuro">CA Medicina · FAPI</p>
                <Medal invertido disco="var(--color-verde)" retrato="var(--color-papel)" className="size-14 rounded-full ring-1 ring-ouro-escuro/50" title="" aria-hidden="true" />
              </div>
              <h2 className="mt-8 font-script text-[clamp(2.4rem,6vw,3.6rem)] font-semibold italic leading-none text-verde">Querido transferido,</h2>
              <div className="mt-10 space-y-6">
                {CARTA.map((p, i) => (
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
              <p className="mt-10 font-script text-[1.4rem] italic leading-[1.55] text-tinta-2 md:text-[1.6rem]">
                O que queremos fazer está logo abaixo da carta. ↓
              </p>
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
      </section>

      {/* O QUE QUEREMOS */}
      <section className="surface-papel relative overflow-hidden py-20 md:py-28">
        <div className="grain" />
        <div className="container-x relative">
          <SectionHead tom="claro" rotulo="Apoio aos transferidos" titulo="Ninguém precisa descobrir tudo sozinho.">
            Um apoio mais organizado para quem chega de transferência, com informação, canal próprio, integração e ajuda na adaptação curricular.
          </SectionHead>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUEREMOS.map(({ Icon, titulo, texto }, i) => (
              <motion.li
                key={titulo}
                className="relative flex h-full flex-col border border-ouro/35 bg-papel-2/50 p-6 md:p-7"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.06 }}
              >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full ring-1 ring-ouro-escuro/50 text-ouro-escuro">
                      <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="tabular font-display text-[1.6rem] font-bold text-ouro-escuro/70">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.3rem] font-bold leading-tight text-verde">{titulo}</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-tinta-2">{texto}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* FECHO */}
      <section className="relative overflow-hidden bg-noite py-20 text-center md:py-28">
        <div className="grain" />
        <div className="container-x relative">
          <Reveal className="flex items-center justify-center gap-3 text-ouro">
            <span className="h-px w-12 bg-ouro/70" />
            <Diamond size={8} />
            <span className="h-px w-12 bg-ouro/70" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-3xl text-balance font-script text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold italic leading-snug text-papel">{FECHO}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 eyebrow text-ouro-claro">Você também faz parte da turma.</p>
          </Reveal>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 xs:flex-row">
            <ButtonA href={whatsappUrl(TEXTOS_WHATSAPP.transferido())} icon={<WhatsappIcon size={16} />}>
              Manda pra um transferido
            </ButtonA>
            <ButtonLink to="/calouro" variant="outline" icon={false}>
              Carta ao calouro
            </ButtonLink>
          </div>
        </div>
      </section>
    </Page>
  );
}

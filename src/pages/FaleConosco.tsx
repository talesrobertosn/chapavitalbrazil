import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, Phone, ShieldCheck } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { Envelope } from '../components/brand/Envelope';
import { Diamond, InstagramIcon, WhatsappIcon } from '../components/brand/Brand';
import { ButtonA } from '../components/ui/Button';
import { Reveal, RevealText } from '../components/ui/Reveal';
import { ArcoReveal } from '../components/fx/Arco';
import { site } from '../config/site';
import { TOTAL_PROPOSTAS } from '../data/programa';
import { MEMBROS, TURMAS } from '../data/diretoria';
import { DATA_ELEICAO } from '../lib/fase';
import { diaDaSemana, formatarLongo } from '../lib/datas';
import { TEXTOS_WHATSAPP, whatsappUrl } from '../lib/share';
import { cn } from '../lib/cn';
import { EASE_OUT, SPRING_UI } from '../lib/motion';

const data = `${diaDaSemana(DATA_ELEICAO)}, ${formatarLongo(DATA_ELEICAO)}`;

const PERGUNTAS: { p: string; r: React.ReactNode }[] = [
  {
    p: 'O que é a Gestão Dr. Vital Brazil?',
    r: <>Uma chapa ao Centro Acadêmico de Medicina da FAPI, formada por {MEMBROS.length} estudantes da turma {TURMAS[0]} à turma {TURMAS[TURMAS.length - 1]}, unidos pelo compromisso de construir uma formação médica mais humana, justa, forte e participativa.</>,
  },
  {
    p: 'Por que o nome Vital Brazil?',
    r: (
      <>
        Porque ele uniu ciência, coragem e serviço, e é isso que queremos para o nosso Centro Acadêmico. <Link to="/vital-brazil" className="link-fio text-ouro-escuro">Conheça a história.</Link>
      </>
    ),
  },
  {
    p: 'Quais são as propostas?',
    r: (
      <>
        São {TOTAL_PROPOSTAS} propostas em 5 eixos: Ensino, Pesquisa e Carreira; Internato e Estágios; Cuidado com o Estudante; Transparência e Representação; Integração, Benefícios e Comunidade. <Link to="/programa" className="link-fio text-ouro-escuro">Veja o programa completo.</Link>
      </>
    ),
  },
  {
    p: 'Como vou saber se as propostas estão sendo cumpridas?',
    r: 'Com um painel público mostrando o andamento de cada proposta, relatório dos 100 dias e de cada semestre, prestação de contas mensal e reuniões abertas em que qualquer estudante pode questionar a gestão. Se algo não andar, você vai saber por nós.',
  },
  {
    p: 'O que muda para quem está no internato?',
    r: 'Guia do Internato e Estágios, cobrança de escalas com antecedência, proposta formal sobre carga horária e descanso, canal para registrar abusos de escala, um representante do internato no CA e atenção à segurança, à vacinação e aos EPIs.',
  },
  {
    p: 'A Ouvidoria é anônima mesmo?',
    r: 'Ela foi pensada para isso: você não precisa se identificar para mandar denúncias, dúvidas ou sugestões. E toda manifestação tem retorno.',
  },
  {
    p: 'Quando é a eleição e quem pode votar?',
    r: (
      <>
        Data prevista: {data}
        {site.eleicao.confirmada ? '' : ' (a confirmar)'}. Local, horário e quem pode votar serão divulgados aqui e no Instagram. <Link to="/votar" className="link-fio text-ouro-escuro">Ver como votar.</Link>
      </>
    ),
  },
  {
    p: 'Como posso ajudar a campanha?',
    r: (
      <>
        Conversando com a sua turma, compartilhando as propostas e postando nos Stories. <Link to="/compartilhar" className="link-fio text-ouro-escuro">Tem imagens prontas aqui.</Link>
      </>
    ),
  },
];

export default function FaleConosco() {
  const [aberto, setAberto] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <Page titulo="Fale conosco">
      <PageHero rotulo="Ouvidoria e perguntas" titulo={'Fala.\nA gente escuta.'} destaque={['escuta.']}>
        Nem precisa dizer quem é. Denúncias, dúvidas e sugestões: toda manifestação tem retorno.
      </PageHero>

      {/* Envelope */}
      <ArcoReveal>
        <section className="surface-papel relative overflow-hidden py-24 md:py-32">
          <div className="grain" />
          <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <button
                type="button"
                onClick={() => setAberto((v) => !v)}
                aria-expanded={aberto}
                aria-controls="carta-ouvidoria"
                data-cursor={aberto ? 'Fechar' : 'Abrir'}
                className="group relative mx-auto block w-full max-w-[34rem]"
              >
                <motion.div whileHover={{ y: -6, rotate: -1 }} whileTap={{ scale: 0.98 }} transition={SPRING_UI}>
                  <Envelope aberto={aberto} className="w-full drop-shadow-[0_40px_50px_rgb(18_36_28/0.25)]" />
                </motion.div>
                <span className="mt-6 block text-center text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-verde">
                  {aberto ? 'Fechar o envelope' : 'Toque para romper o selo'}
                </span>
              </button>
            </div>
            <div id="carta-ouvidoria" className="lg:col-span-6">
              <p className="flex items-center gap-3 text-ouro-escuro">
                <Diamond size={6} />
                <span className="eyebrow">Ouvidoria do CA</span>
              </p>
              <RevealText as="h2" text="Um canal anônimo, com prazo de resposta." className="t-h1 mt-5 text-verde" />
              <AnimatePresence initial={false}>
                <motion.div key={String(aberto)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }} className="mt-8 space-y-5 text-tinta-2">
                  <p className="t-lead text-pretty">
                    O CA pertence aos alunos. A Ouvidoria é o lugar para levar denúncias, dúvidas e sugestões sem precisar dizer quem é.
                    {site.ouvidoriaPrazoDias ? ` Cada manifestação tem retorno em até ${site.ouvidoriaPrazoDias} dias.` : ' Cada manifestação tem retorno.'}
                  </p>
                  <div className="flex flex-col gap-3 pt-2 xs:flex-row xs:flex-wrap">
                    {site.ouvidoriaUrl ? (
                      <ButtonA href={site.ouvidoriaUrl} variant="solid-dark">
                        Escrever para a Ouvidoria
                      </ButtonA>
                    ) : (
                      <ButtonA href={site.instagram.url} variant="solid-dark" icon={<InstagramIcon size={16} />}>
                        Mandar no direct
                      </ButtonA>
                    )}
                  </div>
                  {!site.ouvidoriaUrl && <p className="text-[0.85rem]">O formulário anônimo entra no ar em breve. Enquanto isso, fale com a gente pelo direct do Instagram.</p>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </ArcoReveal>

      {/* Cuidado: canais de apoio */}
      <section className="relative overflow-hidden bg-verde py-16 md:py-20">
        <div className="grain" />
        <div className="container-x relative grid gap-8 md:grid-cols-2">
          <Reveal className="flex gap-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-ouro/50 text-ouro-claro">
              <Phone size={20} strokeWidth={1.4} />
            </span>
            <div>
              <h3 className="t-h3 text-papel">Precisa conversar agora?</h3>
              <p className="mt-2 text-papel/75">
                O CVV atende 24 horas, de graça e em sigilo, pelo telefone <a href="tel:188" className="font-semibold text-ouro-claro underline underline-offset-2">188</a> ou pelo chat em cvv.org.br. Em emergência, ligue 192 (SAMU).
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex gap-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-ouro/50 text-ouro-claro">
              <ShieldCheck size={20} strokeWidth={1.4} />
            </span>
            <div>
              <h3 className="t-h3 text-papel">Casos de assédio</h3>
              <p className="mt-2 text-papel/75">
                A Ouvidoria acolhe e orienta, mas não substitui os canais oficiais da instituição. A gente te ajuda a encontrar o caminho formal e acompanha até o fim.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Perguntas */}
      <section id="perguntas" className="surface-papel relative scroll-mt-20 py-24 md:py-32">
        <div className="grain" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 text-ouro-escuro">
              <Diamond size={6} />
              <span className="eyebrow">Pergunta pra gente</span>
            </p>
            <RevealText as="h2" text="Perguntas frequentes." className="t-h1 mt-5 text-verde" />
            <p className="mt-6 text-tinta-2">Ficou alguma dúvida? Manda no direct, a resposta pode aparecer aqui.</p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row lg:flex-col xl:flex-row">
              <ButtonA href={site.instagram.url} variant="solid-dark" icon={<InstagramIcon size={16} />}>
                Direct
              </ButtonA>
              <ButtonA href={whatsappUrl(TEXTOS_WHATSAPP.site())} variant="outline" icon={<WhatsappIcon size={16} />} className="text-verde">
                Compartilhar
              </ButtonA>
            </div>
          </div>
          <ul className="lg:col-span-8">
            {PERGUNTAS.map((q, i) => {
              const on = faq === i;
              return (
                <li key={q.p} className="border-b border-verde/15 first:border-t">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setFaq(on ? null : i)}
                      aria-expanded={on}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className={cn('font-display text-[1.2rem] font-semibold leading-snug transition-colors md:text-[1.4rem]', on ? 'text-ouro-escuro' : 'text-verde group-hover:text-ouro-escuro')}>{q.p}</span>
                      <motion.span animate={{ rotate: on ? 180 : 0 }} transition={SPRING_UI} className="grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-verde/20 text-verde">
                        <ChevronDown size={18} strokeWidth={1.5} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 text-[1rem] leading-relaxed text-tinta-2">{q.r}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </Page>
  );
}

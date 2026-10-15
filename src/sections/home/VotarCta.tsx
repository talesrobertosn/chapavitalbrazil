import { CalendarPlus } from 'lucide-react';
import { Countdown } from '../../components/ui/Countdown';
import { ButtonA, ButtonLink } from '../../components/ui/Button';
import { RevealText, Reveal, BrushUnderline } from '../../components/ui/Reveal';
import { Diamond, Figure, WhatsappIcon } from '../../components/brand/Brand';
import { site } from '../../config/site';
import { DATA_ELEICAO, useFase } from '../../lib/fase';
import { diaDaSemana, formatarLongo } from '../../lib/datas';
import { TEXTOS_WHATSAPP, whatsappUrl } from '../../lib/share';

export function VotarCta() {
  const fase = useFase();
  const data = `${diaDaSemana(DATA_ELEICAO)}, ${formatarLongo(DATA_ELEICAO)}`;
  const titulo = fase === 'eleicao' ? 'Hoje, sua voz vira voto.' : fase === 'vespera' ? 'Amanhã, sua voz vira voto.' : fase === 'encerrada' ? 'Obrigado por cada voto.' : 'Sua voz vira voto.';

  return (
    <section className="surface-verde section-y relative overflow-hidden" aria-labelledby="votar-titulo">
      <div className="grain" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 w-[min(30rem,60vw)] text-noite/25">
        <Figure />
      </div>
      <div className="container-x relative text-center">
        <Reveal y={12} className="flex items-center justify-center gap-3 text-ouro-claro">
          <span className="tabular eyebrow">11</span>
          <Diamond size={6} />
          <span className="eyebrow">Eleição do CA</span>
        </Reveal>
        <RevealText as="h2" text={titulo} className="t-hero mx-auto mt-6 max-w-4xl text-balance" />
        <BrushUnderline className="mx-auto mt-2 h-5 w-[min(60%,26rem)]" delay={0.6} />
        <Reveal delay={0.2}>
          <p className="mt-6 text-papel/80">
            <span className="first-letter:uppercase">{data}</span>
            {!site.eleicao.confirmada && <span className="text-salvia"> · data a confirmar</span>}
          </p>
          {(fase === 'campanha' || fase === 'vespera') && <Countdown className="mt-10 justify-center text-papel" size="text-[2.4rem] sm:text-[3.4rem] md:text-[4.4rem]" />}
          <div className="mt-12 flex flex-col items-center justify-center gap-3 xs:flex-row">
            <ButtonLink to="/votar" icon={<CalendarPlus size={16} strokeWidth={1.6} />}>
              Lembrete na agenda
            </ButtonLink>
            <ButtonA href={whatsappUrl(TEXTOS_WHATSAPP.votar(data))} variant="outline" icon={<WhatsappIcon size={16} />}>
              Chama sua turma
            </ButtonA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

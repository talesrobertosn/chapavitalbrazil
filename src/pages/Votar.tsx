import { useState } from 'react';
import { CalendarPlus, Clock, Download, MapPin, Users } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { Countdown } from '../components/ui/Countdown';
import { Button, ButtonA } from '../components/ui/Button';
import { Diamond, InstagramIcon, WhatsappIcon } from '../components/brand/Brand';
import { Reveal } from '../components/ui/Reveal';
import { site } from '../config/site';
import { DATA_ELEICAO, useFase } from '../lib/fase';
import { diaDaSemana, diasAte, formatarLongo } from '../lib/datas';
import { TEXTOS_WHATSAPP, baixar, compartilharImagem, googleAgendaUrl, icsEleicao, whatsappUrl } from '../lib/share';
import { gerarStory } from '../lib/story';
import { cn } from '../lib/cn';

const TITULOS = {
  campanha: 'Sua voz\nvira voto.',
  vespera: 'Amanhã,\nsua voz vira voto.',
  eleicao: 'Hoje é dia\nde votar.',
  encerrada: 'Obrigado\npor cada voto.',
};

export default function Votar() {
  const fase = useFase();
  const [gerando, setGerando] = useState(false);
  const data = `${diaDaSemana(DATA_ELEICAO)}, ${formatarLongo(DATA_ELEICAO)}`;
  const titulo = 'Eleição do CA de Medicina FAPI';
  const desc = `Gestão Dr. Vital Brazil · ${site.slogan} ${site.url}/programa`;
  const local = site.eleicao.local;

  const info = [
    { Icon: CalendarPlus, rotulo: 'Data', valor: data, pendente: !site.eleicao.confirmada },
    { Icon: Clock, rotulo: 'Horário', valor: site.eleicao.horario || 'A confirmar', pendente: !site.eleicao.horario },
    { Icon: MapPin, rotulo: 'Local', valor: local || 'A confirmar', pendente: !local },
    { Icon: Users, rotulo: 'Quem pode votar', valor: site.eleicao.quemVota || 'A confirmar', pendente: !site.eleicao.quemVota },
  ];

  return (
    <Page titulo="Como votar">
      <PageHero rotulo="Eleição do CA" titulo={TITULOS[fase]} destaque={['voto.', 'votar.']}>
        Escolher o CA é escolher a formação que você quer. Anota a data, ativa o lembrete e chama a sua turma.
      </PageHero>

      {/* Contagem monumental */}
      {(fase === 'campanha' || fase === 'vespera') && (
        <section className="relative overflow-hidden bg-verde py-20 text-center md:py-28">
          <div className="grain" />
          <div className="container-x relative">
            <p className="eyebrow text-ouro-claro">Faltam</p>
            <Countdown className="mt-8 justify-center text-papel" size="text-[2.8rem] sm:text-[4.5rem] md:text-[6.5rem]" />
            <p className="mt-8 text-papel/75">
              <span className="first-letter:uppercase">{data}</span>
              {!site.eleicao.confirmada && <span className="text-salvia"> · data a confirmar</span>}
            </p>
          </div>
        </section>
      )}

      <section className="surface-papel relative py-20 md:py-28">
        <div className="grain" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-ouro-escuro">
              <Diamond size={6} />
              <span className="eyebrow">O que você precisa saber</span>
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {info.map(({ Icon, rotulo, valor, pendente }, i) => (
                <Reveal key={rotulo} delay={i * 0.06}>
                  <li className="h-full rounded-[2px] border border-verde/12 bg-papel p-6">
                    <Icon size={22} strokeWidth={1.3} className="text-ouro-escuro" />
                    <p className="eyebrow mt-5 text-[0.6rem] text-tinta-2">{rotulo}</p>
                    <p className={cn('mt-2 font-display text-[1.35rem] font-semibold leading-snug first-letter:uppercase', pendente ? 'text-tinta-2/60' : 'text-verde')}>{valor}</p>
                    {pendente && rotulo === 'Data' && <p className="mt-1 text-[0.8rem] text-ouro-escuro">Data prevista, a confirmar</p>}
                  </li>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-[0.85rem] text-tinta-2">As informações oficiais serão confirmadas pela comissão eleitoral e atualizadas aqui e no Instagram.</p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="flex items-center gap-3 text-ouro-escuro">
              <Diamond size={6} />
              <span className="eyebrow">Não esqueça</span>
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonA href={googleAgendaUrl(site.eleicao.data, titulo, desc, local)} variant="solid-dark" icon={<CalendarPlus size={16} strokeWidth={1.6} />}>
                Google Agenda
              </ButtonA>
              <Button variant="outline" className="text-verde" icon={<Download size={16} strokeWidth={1.6} />} onClick={() => baixar(icsEleicao(site.eleicao.data, titulo, desc, local), 'eleicao-ca-medicina-fapi.ics')}>
                iPhone / Outlook
              </Button>
              <ButtonA href={whatsappUrl(TEXTOS_WHATSAPP.votar(data))} variant="outline" className="text-verde" icon={<WhatsappIcon size={16} />}>
                Chamar a turma
              </ButtonA>
              <Button
                variant="outline"
                className="text-verde"
                disabled={gerando}
                icon={<InstagramIcon size={16} />}
                onClick={async () => {
                  setGerando(true);
                  try {
                    const dias = fase === 'eleicao' ? 0 : fase === 'vespera' ? 1 : fase === 'encerrada' ? -1 : Math.max(2, diasAte(DATA_ELEICAO));
                    const blob = await gerarStory({ tipo: 'votar', dias, dataTexto: data, confirmada: site.eleicao.confirmada });
                    await compartilharImagem(blob, 'story-eleicao.png', 'Eleição do CA de Medicina FAPI');
                  } finally {
                    setGerando(false);
                  }
                }}
              >
                {gerando ? 'Gerando…' : 'Story da contagem'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

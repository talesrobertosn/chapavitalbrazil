import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { site } from '../config/site';
import { Email } from '../components/ui/Email';

const ITENS = [
  ['Sem cookies e sem rastreadores', 'Este site não usa cookies de publicidade nem ferramentas que acompanham você pela internet.'],
  ['Stories gerados no seu aparelho', 'As imagens para Stories são criadas no próprio navegador. Nada é enviado para servidores da chapa.'],
  ['Formulários externos', 'Quando a Ouvidoria estiver no ar, ela usará um formulário de serviço externo, configurado para não pedir nome nem e-mail. Leia o aviso do próprio formulário antes de enviar.'],
  ['Fotos da diretoria', 'As fotos dos membros são publicadas com autorização de cada pessoa. Para pedir a retirada de uma imagem, fale com a gente.'],
  ['Links para outros sites', 'Instagram, WhatsApp e agendas têm as próprias políticas de privacidade.'],
] as const;

export default function Privacidade() {
  return (
    <Page titulo="Privacidade">
      <PageHero rotulo="Privacidade" titulo="O mínimo possível." tituloClass="t-hero">
        Um site de estudantes para estudantes não precisa saber nada sobre você.
      </PageHero>
      <section className="surface-papel relative py-20 md:py-28">
        <div className="grain" />
        <div className="container-x relative max-w-3xl">
          <dl className="divide-y divide-verde/12 border-y border-verde/12">
            {ITENS.map(([t, d]) => (
              <div key={t} className="py-7">
                <dt className="font-display text-[1.3rem] font-semibold text-verde">{t}</dt>
                <dd className="mt-2 leading-relaxed text-tinta-2">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-tinta-2">
            Dúvidas? Fale com a gente no Instagram:{' '}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-fio font-semibold text-verde">
              {site.instagram.handle}
            </a>{' '}
            ou por e-mail: <Email icone={false} className="font-semibold text-verde" />
          </p>
        </div>
      </section>
    </Page>
  );
}

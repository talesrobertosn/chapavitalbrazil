import { Page } from '../components/layout/Page';
import { ArcoReveal } from '../components/fx/Arco';
import { FaixaMonumental } from '../components/fx/FaixaMonumental';
import { Hero } from '../sections/home/Hero';
import { Manifesto } from '../sections/home/Manifesto';
import { Principios } from '../sections/home/Principios';
import { Eixos } from '../sections/home/Eixos';
import { PraMim } from '../sections/home/PraMim';
import { CenaVital } from '../sections/home/CenaVital';
import { DiretoriaTeaser } from '../sections/home/DiretoriaTeaser';
import { CemDias } from '../sections/home/CemDias';
import { Cobrar } from '../sections/home/Cobrar';
import { DiarioTeaser } from '../sections/home/DiarioTeaser';
import { Participe } from '../sections/home/Participe';
import { VotarCta } from '../sections/home/VotarCta';

/**
 * Ritmo da home: escuro → claro (abre em arco) → verde → faixa monumental →
 * eixos → claro → cena fixa → … alternando escala, cor e densidade.
 */
export default function Home() {
  return (
    <Page>
      <Hero />
      <ArcoReveal>
        <Manifesto />
      </ArcoReveal>
      {/* Diretoria logo no começo: é a pergunta que todo mundo faz primeiro */}
      <DiretoriaTeaser />
      <Principios />
      <FaixaMonumental palavras={['Ciência', 'Coragem', 'Serviço']} className="bg-noite" traco="rgb(176 141 87 / 0.75)" />
      <Eixos />
      <ArcoReveal>
        <PraMim />
      </ArcoReveal>
      <CenaVital />
      <CemDias />
      <ArcoReveal>
        <Cobrar />
      </ArcoReveal>
      <DiarioTeaser />
      <FaixaMonumental palavras={['De estudantes', 'para estudantes']} velocidade={1.6} className="bg-noite" traco="rgb(244 240 230 / 0.4)" />
      <Participe />
      <VotarCta />
    </Page>
  );
}

import { Page } from '../components/layout/Page';
import { Hero } from '../sections/home/Hero';
import { Manifesto } from '../sections/home/Manifesto';
import { Principios } from '../sections/home/Principios';
import { Eixos } from '../sections/home/Eixos';
import { PraMim } from '../sections/home/PraMim';
import { DiretoriaTeaser } from '../sections/home/DiretoriaTeaser';
import { VitalTeaser } from '../sections/home/VitalTeaser';
import { CemDias } from '../sections/home/CemDias';
import { Cobrar } from '../sections/home/Cobrar';
import { DiarioTeaser } from '../sections/home/DiarioTeaser';
import { Participe } from '../sections/home/Participe';
import { VotarCta } from '../sections/home/VotarCta';

export default function Home() {
  return (
    <Page>
      <Hero />
      <Manifesto />
      <Principios />
      <Eixos />
      <PraMim />
      <DiretoriaTeaser />
      <VitalTeaser />
      <CemDias />
      <Cobrar />
      <DiarioTeaser />
      <Participe />
      <VotarCta />
    </Page>
  );
}

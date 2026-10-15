import { Page } from '../components/layout/Page';
import { Hero } from '../sections/home/Hero';

export default function Home() {
  return (
    <Page>
      <Hero />
      <div className="h-[100vh]" />
    </Page>
  );
}

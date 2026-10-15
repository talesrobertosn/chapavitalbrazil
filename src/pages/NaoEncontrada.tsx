import { motion } from 'motion/react';
import { Page } from '../components/layout/Page';
import { Medal } from '../components/brand/Brand';
import { ButtonLink } from '../components/ui/Button';
import { PoeiraDourada } from '../components/fx/Atmosfera';
import { EASE_OUT } from '../lib/motion';

export default function NaoEncontrada() {
  return (
    <Page titulo="Página não encontrada">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-noite pt-[var(--header-h)]">
        <PoeiraDourada />
        <div className="grain" />
        <div className="container-x relative flex flex-col items-center text-center">
          <motion.div initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 1.4, ease: EASE_OUT }} className="w-28 text-papel">
            <Medal invertido className="rounded-full ring-2 ring-ouro/60" title="" aria-hidden="true" />
          </motion.div>
          <p className="tabular mt-10 font-display text-[clamp(6rem,22vw,14rem)] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-ouro)]">404</p>
          <h1 className="t-h2 mt-4 text-papel">Essa página saiu para o plantão.</h1>
          <p className="mt-4 max-w-md text-papel/70">O endereço pode ter mudado ou não existe. Vamos te levar de volta.</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <ButtonLink to="/">Página inicial</ButtonLink>
            <ButtonLink to="/programa" variant="outline" icon={false}>
              Ver o programa
            </ButtonLink>
          </div>
        </div>
      </section>
    </Page>
  );
}

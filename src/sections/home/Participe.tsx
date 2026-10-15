import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { Envelope } from '../../components/brand/Envelope';
import { InstagramIcon, Medal, WhatsappIcon } from '../../components/brand/Brand';
import { SectionHead } from '../../components/ui/SectionHead';
import { TiltCard } from '../../components/ui/TiltCard';
import { site } from '../../config/site';
import { useNuvem } from '../../components/layout/NuvemFrases';
import { DUR, EASE_OUT } from '../../lib/motion';

export function Participe() {
  const [hover, setHover] = useState(false);
  const { abrir } = useNuvem();
  return (
    <section className="surface-noite section-y relative overflow-hidden" aria-labelledby="participe-titulo">
      <div className="grain" />
      <div className="container-x relative">
        <SectionHead numero="10" rotulo="Participe" titulo="O CA é seu. A gente só quer cuidar bem dele." />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Ouvidoria */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DUR.longa, ease: EASE_OUT }}
          >
            <Link to="/fale-conosco" className="group block h-full" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
              <TiltCard className="h-full" max={2.5}>
                <div className="surface-papel relative grid h-full items-center gap-6 overflow-hidden p-7 sm:grid-cols-2 md:p-10" style={{ borderRadius: 2 }}>
                  <div className="grain" />
                  <div className="relative">
                    <p className="eyebrow text-[0.62rem] text-ouro-escuro">Ouvidoria do CA</p>
                    <h3 className="t-h2 mt-4 text-verde">Fala. A gente escuta.</h3>
                    <p className="mt-3 font-script text-xl italic text-tinta-2">Nem precisa dizer quem é.</p>
                    <p className="mt-5 text-[0.93rem] leading-relaxed text-tinta-2">Um canal anônimo para denúncias, dúvidas e sugestões. Toda manifestação tem retorno.</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-verde">
                      Abrir o envelope <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>
                  <Envelope aberto={hover} className="relative mx-auto w-full max-w-[20rem]" />
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          {/* Stories + compartilhar */}
          <motion.div
            className="flex flex-col gap-5 lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: DUR.longa, ease: EASE_OUT, delay: 0.1 }}
          >
            <Link to="/compartilhar" className="group relative flex flex-1 items-center gap-6 overflow-hidden border border-ouro/25 bg-verde/50 p-7 transition-colors duration-500 hover:border-ouro/60">
              <div className="grain" />
              {/* Mini story */}
              <div className="relative aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-[10px] bg-verde-2 ring-1 ring-ouro/40 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-rotate-3 group-hover:scale-105 sm:w-28">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 text-center">
                  <Medal invertido className="w-10 rounded-full ring-1 ring-ouro/60" title="" aria-hidden="true" />
                  <span className="font-script text-[0.6rem] italic text-ouro-claro">Eu apoio a</span>
                  <span className="font-display text-[0.7rem] font-extrabold uppercase leading-none text-papel">Gestão<br />Vital Brazil</span>
                  <span className="h-px w-8 bg-ouro" />
                </div>
              </div>
              <div className="relative">
                <p className="eyebrow text-[0.62rem] text-ouro-claro">Stories</p>
                <h3 className="t-h3 mt-3 text-papel">Leve a chapa para o seu story.</h3>
                <p className="mt-2 text-[0.9rem] text-papel/70">Imagens prontas, no tamanho certo. Um toque para postar ou salvar.</p>
              </div>
            </Link>
            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={abrir}
                className="group flex flex-col gap-6 border border-ouro/25 p-6 text-left transition-colors duration-500 hover:border-ouro/60 hover:bg-verde/40"
              >
                <WhatsappIcon size={26} className="text-ouro-claro" />
                <span>
                  <span className="block font-display text-[1.1rem] font-semibold text-papel">Manda no grupo</span>
                  <span className="mt-1 block text-[0.8rem] text-salvia">Escolha a frase, o link vai junto</span>
                </span>
              </button>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-6 border border-ouro/25 p-6 transition-colors duration-500 hover:border-ouro/60 hover:bg-verde/40"
              >
                <InstagramIcon size={26} className="text-ouro-claro" />
                <span>
                  <span className="block font-display text-[1.1rem] font-semibold text-papel">Ativa o sininho</span>
                  <span className="mt-1 block text-[0.8rem] text-salvia">{site.instagram.handle}</span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

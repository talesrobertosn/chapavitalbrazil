import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { NAV, NAV_EXTRA } from '../../config/nav';
import { site } from '../../config/site';
import { Figure, InstagramIcon, Leaf, Ornament, WhatsappIcon } from '../brand/Brand';
import { TEXTOS_WHATSAPP, whatsappUrl } from '../../lib/share';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['18%', '0%']);
  const fig = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <footer ref={ref} className="no-print relative overflow-hidden bg-noite-2 text-papel">
      <div className="grain" />
      <Leaf className="pointer-events-none absolute -left-24 top-10 w-80 -scale-x-100 text-ouro/[0.07]" />
      <div className="container-x relative pt-24 md:pt-32">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Ornament className="text-ouro" width={40} />
            <p className="t-h2 mt-6 max-w-md text-balance">
              Mais que uma gestão, <span className="text-ouro-claro">um compromisso</span> com a nossa formação.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full px-5 text-sm ring-1 ring-inset ring-papel/20 transition-colors hover:bg-papel hover:text-noite"
              >
                <InstagramIcon size={18} /> {site.instagram.handle}
              </a>
              <a
                href={whatsappUrl(TEXTOS_WHATSAPP.site())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full px-5 text-sm ring-1 ring-inset ring-papel/20 transition-colors hover:bg-papel hover:text-noite"
              >
                <WhatsappIcon size={18} /> Mandar no grupo
              </a>
            </div>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 md:col-span-6 md:col-start-7">
            <div>
              <p className="eyebrow text-ouro-claro">Explore</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/" className="link-fio text-papel/80 hover:text-papel">Início</Link>
                </li>
                {NAV.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="link-fio text-papel/80 hover:text-papel">{n.rotulo}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-ouro-claro">Participe</p>
              <ul className="mt-5 space-y-3">
                {NAV_EXTRA.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="link-fio text-papel/80 hover:text-papel">{n.rotulo}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/privacidade" className="link-fio text-papel/80 hover:text-papel">Privacidade</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] text-salvia">
          {site.hashtags.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>

      {/* Assinatura monumental */}
      <div className="relative mt-10 overflow-hidden" aria-hidden="true">
        <motion.div style={{ y }} className="container-x flex items-end gap-[2vw]">
          <motion.div style={{ y: fig }} className="hidden w-[11vw] shrink-0 pb-[1.2vw] text-ouro/80 sm:block">
            <Figure />
          </motion.div>
          <p className="whitespace-nowrap font-display text-[15.5vw] font-extrabold uppercase leading-[0.78] tracking-[-0.04em] text-papel sm:text-[10.6vw]">
            Vital Brazil
          </p>
        </motion.div>
      </div>

      <div className="container-x relative flex flex-col gap-3 border-t border-papel/10 py-7 text-[0.78rem] text-salvia sm:flex-row sm:items-center sm:justify-between">
        <p>{site.assinatura}</p>
        <p className="font-script text-base italic text-ouro-claro">{site.lema}</p>
      </div>
    </footer>
  );
}

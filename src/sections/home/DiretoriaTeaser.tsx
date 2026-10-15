import { motion } from 'motion/react';
import { useNavigate, useLocation, Link } from 'react-router';
import { CARGOS, MEMBROS, TURMAS, primeiroNome, type MembroComCargo } from '../../data/diretoria';
import { Portrait } from '../../components/ui/Portrait';
import { SectionHead } from '../../components/ui/SectionHead';
import { ButtonLink } from '../../components/ui/Button';
import { Medal } from '../../components/brand/Brand';
import { Reveal } from '../../components/ui/Reveal';
import { useIsDesktop } from '../../lib/media';
import { EASE_OUT } from '../../lib/motion';

const NUCLEO = MEMBROS.filter((m) => m.cargo.nucleo);
const DEMAIS = MEMBROS.filter((m) => !m.cargo.nucleo);
const INTERNO = DEMAIS.slice(0, 10);
const EXTERNO = DEMAIS.slice(10);

export function DiretoriaTeaser() {
  const desktop = useIsDesktop();
  return (
    <section id="diretoria" className="surface-noite section-y relative overflow-hidden" aria-labelledby="diretoria-titulo">
      <div className="grain" />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(50% 60% at 70% 50%, rgb(40 74 60 / 0.55), transparent 70%)' }} />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHead numero="05" rotulo="A diretoria" titulo={'Do 1º ao último período.\nUma só chapa.'} tituloClass="t-h1">
            {MEMBROS.length} estudantes, da turma {TURMAS[0]} à turma {TURMAS[TURMAS.length - 1]}, em {CARGOS.length} frentes de trabalho.
          </SectionHead>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-4">
            {NUCLEO.map((m) => (
              <Nucleo key={m.slug} m={m} />
            ))}
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <ButtonLink to="/diretoria">Conheça a diretoria</ButtonLink>
          </Reveal>
        </div>
        <div className="min-w-0 lg:col-span-7">{desktop ? <Orbita /> : <Faixas />}</div>
      </div>
    </section>
  );
}

function useAbrir() {
  const navigate = useNavigate();
  const location = useLocation();
  return (m: MembroComCargo) => navigate(`/diretoria/${m.slug}`, { state: { fundo: location } });
}

function Nucleo({ m }: { m: MembroComCargo }) {
  const location = useLocation();
  return (
    <Link to={`/diretoria/${m.slug}`} state={{ fundo: location }} className="group block border border-ouro/20 bg-verde/40 p-4 transition-colors duration-500 hover:border-ouro/60 sm:p-5">
      <Portrait membro={m} tamanho="md" className="w-20 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105 sm:w-24" />
      <p className="eyebrow mt-4 text-[0.58rem] text-ouro-claro">{m.cargo.titulo}</p>
      <p className="mt-1.5 font-display text-[1.05rem] font-semibold leading-tight text-papel sm:text-[1.15rem]">{m.nome}</p>
      <p className="mt-1 text-[0.78rem] text-salvia">Turma {m.turma}</p>
    </Link>
  );
}

/** Órbita: dois anéis girando em sentidos opostos; pausa no hover/foco. */
function Orbita() {
  const abrir = useAbrir();
  return (
    <motion.div
      className="orbita group/orb relative mx-auto aspect-square w-full max-w-[44rem]"
      initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.6, ease: EASE_OUT }}
    >
      {/* Anéis de gravura */}
      <svg className="absolute inset-0 h-full w-full text-ouro" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeWidth="0.12" opacity="0.35" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.4 1.2" opacity="0.5" />
        <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" strokeWidth="0.12" opacity="0.35" />
        <circle cx="50" cy="50" r="17" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="0.3 0.9" opacity="0.5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 w-[24%] -translate-x-1/2 -translate-y-1/2 text-papel">
        <Medal title="Medalhão Vital Brazil" />
      </div>
      <Anel membros={EXTERNO} raio={42} duracao={190} reverso onAbrir={abrir} />
      <Anel membros={INTERNO} raio={29} duracao={150} onAbrir={abrir} />
      <p className="eyebrow pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[0.58rem] text-salvia opacity-0 transition-opacity duration-500 group-hover/orb:opacity-100">
        Toque em alguém para conhecer
      </p>
    </motion.div>
  );
}

function Anel({ membros, raio, duracao, reverso, onAbrir }: { membros: MembroComCargo[]; raio: number; duracao: number; reverso?: boolean; onAbrir: (m: MembroComCargo) => void }) {
  const giro = reverso ? 'animate-spin-slow-rev' : 'animate-spin-slow';
  const contra = reverso ? 'animate-spin-slow' : 'animate-spin-slow-rev';
  return (
    <div
      className={`absolute inset-0 ${giro} group-hover/orb:[animation-play-state:paused] group-focus-within/orb:[animation-play-state:paused]`}
      style={{ ['--spin-duration' as string]: `${duracao}s` }}
    >
      {membros.map((m, i) => {
        const ang = (i / membros.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + raio * Math.cos(ang);
        const y = 50 + raio * Math.sin(ang);
        return (
          <div key={m.slug} className="absolute w-[11.5%] -translate-x-1/2 -translate-y-1/2 focus-within:z-20 hover:z-20" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className={`${contra} group-hover/orb:[animation-play-state:paused] group-focus-within/orb:[animation-play-state:paused]`} style={{ ['--spin-duration' as string]: `${duracao}s` }}>
              <button
                type="button"
                onClick={() => onAbrir(m)}
                className="group/m relative block w-full rounded-full"
                aria-label={`${m.nome}, ${m.cargo.titulo}`}
              >
                <Portrait membro={m} tamanho="sm" className="w-full transition-[transform,filter] duration-500 ease-[var(--ease-expo)] group-hover/m:scale-[1.18] group-focus-visible/m:scale-[1.18]" />
                <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[11rem] -translate-x-1/2 translate-y-1 rounded-[2px] bg-papel px-3 py-2 text-center opacity-0 shadow-xl transition-all duration-300 group-hover/m:translate-y-0 group-hover/m:opacity-100 group-focus-visible/m:translate-y-0 group-focus-visible/m:opacity-100">
                  <span className="block font-display text-[0.9rem] font-semibold leading-tight text-verde">{primeiroNome(m.nome)}</span>
                  <span className="block text-[0.62rem] uppercase tracking-[0.12em] text-ouro-escuro">{m.cargo.titulo.replace('Diretoria ', '').replace('Coordenação de ', '')}</span>
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Celular: duas faixas de retratos deslizando em sentidos opostos. */
function Faixas() {
  const abrir = useAbrir();
  const linhas = [DEMAIS.slice(0, 12), DEMAIS.slice(12)];
  return (
    <div className="-mx-[var(--gutter)] space-y-4 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {linhas.map((linha, li) => (
        <div key={li} className={`flex w-max gap-4 ${li === 0 ? 'animate-marquee' : 'animate-marquee-rev'} hover:[animation-play-state:paused]`} style={{ ['--marquee-duration' as string]: '70s' }}>
          {[...linha, ...linha].map((m, i) => (
            <button
              key={`${m.slug}-${i}`}
              type="button"
              onClick={() => abrir(m)}
              tabIndex={i >= linha.length ? -1 : 0}
              aria-hidden={i >= linha.length ? true : undefined}
              aria-label={`${m.nome}, ${m.cargo.titulo}`}
              className="flex w-[5.5rem] shrink-0 flex-col items-center gap-2"
            >
              <Portrait membro={m} tamanho="sm" className="w-[4.5rem]" />
              <span className="line-clamp-1 text-[0.72rem] text-papel/75">{primeiroNome(m.nome)}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

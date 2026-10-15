import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Diamond, Leaf } from '../../components/brand/Brand';
import { BrushUnderline, Reveal } from '../../components/ui/Reveal';
import { QUEM_SOMOS } from '../../data/programa';
import { cn } from '../../lib/cn';

const FRASE =
  'A medicina também se faz FORA da sala de aula: no respeito ao estudante, na defesa dos nossos direitos e na união.';

function Palavra({ p, i, total, progresso, destaque }: { p: string; i: number; total: number; progresso: MotionValue<number>; destaque: boolean }) {
  const ini = (i / total) * 0.82;
  const fim = ini + 0.82 / total + 0.06;
  const opacity = useTransform(progresso, [ini, fim], [0.13, 1]);
  return (
    <motion.span style={{ opacity }} className={cn('relative inline-block', destaque && 'text-ouro-escuro')}>
      {p}
      {destaque && <BrushUnderline className="absolute -bottom-[0.18em] left-0 h-[0.28em] w-full" delay={0.1} />}
    </motion.span>
  );
}

/**
 * Manifesto lido pela rolagem: a frase fica fixa na tela enquanto as
 * palavras acendem uma a uma. "FORA" acende em ouro, com a pincelada.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end end'] });
  const palavras = FRASE.split(' ');
  const yLeaf = useTransform(scrollYProgress, [0, 1], ['10%', '-20%']);

  return (
    <section ref={ref} id="manifesto" className="surface-papel relative h-[190vh] md:h-[220vh]" aria-labelledby="manifesto-titulo">
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden">
        <div className="grain" />
        <motion.div style={{ y: yLeaf }} className="pointer-events-none absolute -right-20 top-[8%] w-[min(22rem,48vw)] text-verde/[0.09]" aria-hidden="true">
          <Leaf />
        </motion.div>
        <div className="container-x relative py-24">
          <div className="flex items-center gap-3 text-ouro-escuro">
            <span className="tabular eyebrow">01</span>
            <Diamond size={6} />
            <span className="eyebrow" id="manifesto-titulo">Manifesto</span>
          </div>
          <p className="mt-8 max-w-[22ch] font-display text-[clamp(2.1rem,6.4vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em] text-verde sm:max-w-[20ch]" aria-label={FRASE}>
            <span aria-hidden="true">
              {palavras.map((p, i) => (
                <span key={i}>
                  {reduce ? (
                    <span className={cn(p === 'FORA' && 'text-ouro-escuro')}>{p}</span>
                  ) : (
                    <Palavra p={p} i={i} total={palavras.length} progresso={scrollYProgress} destaque={p === 'FORA'} />
                  )}{' '}
                </span>
              ))}
            </span>
          </p>
          <Reveal delay={0.1} className="mt-12 grid max-w-4xl gap-6 border-t border-verde/15 pt-8 md:grid-cols-2 md:gap-10">
            <p className="t-body text-pretty text-tinta-2">{QUEM_SOMOS.curto}</p>
            <p className="t-body text-pretty text-tinta-2">
              Escolhemos o nome de Vital Brazil porque ele uniu <strong className="font-semibold text-verde">ciência, coragem e serviço</strong>, e é isso que queremos para o nosso Centro Acadêmico.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

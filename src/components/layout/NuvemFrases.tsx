import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Check, Link as LinkIcon, Shuffle, X } from 'lucide-react';
import { Diamond, Medal, WhatsappIcon } from '../brand/Brand';
import { useSmooth } from './SmoothScroll';
import { site } from '../../config/site';
import { FRASES } from '../../data/frases';
import { EIXOS } from '../../data/programa';
import { linkPublico, whatsappUrl } from '../../lib/share';
import { EASE_OUT, SPRING_LAYOUT, SPRING_UI } from '../../lib/motion';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

/**
 * NUVEM DE FRASES · compartilhar no WhatsApp
 * Um painel onde as frases da campanha flutuam como poeira dourada.
 * A pessoa toca numa frase, vê a mensagem montada (com o link do site,
 * que vem de `site.url`) e envia. Sem frase escolhida, vai a mensagem padrão.
 */

interface Opcao {
  id: string;
  texto: string;
  destaque?: string;
  /** Rota do site que a mensagem aponta (padrão: início). */
  rota: string;
  origem: 'frase' | 'eixo';
}

const OPCOES: Opcao[] = [
  ...FRASES.map((f, i) => ({ id: `f${i}`, texto: f.texto, destaque: f.destaque, rota: '/', origem: 'frase' as const })),
  ...EIXOS.map((e) => ({ id: `e${e.id}`, texto: e.frase, rota: `/programa/${e.id}`, origem: 'eixo' as const })),
];

export function montarMensagem(op: Opcao | null) {
  const link = linkPublico(op?.rota ?? '/');
  if (!op) {
    return `🟢 *Gestão Dr. Vital Brazil* · CA Medicina FAPI\n\nMais que uma gestão, um compromisso com a nossa formação.\n\nConhece o programa, a diretoria e a história por trás do nome:\n${link}\n\nSegue também no Instagram: ${site.instagram.handle}`;
  }
  const eixo = op.origem === 'eixo' ? EIXOS.find((e) => `e${e.id}` === op.id) : null;
  const corpo = eixo ? `Eixo ${eixo.numero} · ${eixo.titulo}\n${eixo.intro}` : `Mais que uma gestão, um compromisso com a nossa formação.`;
  return `“${op.texto}”\n\n🟢 *Gestão Dr. Vital Brazil* · CA Medicina FAPI\n${corpo}\n\n${link}\n\nInstagram: ${site.instagram.handle}`;
}

/* ----------------------------------------------------------------- contexto */

const Ctx = createContext<{ abrir: () => void }>({ abrir: () => undefined });
export const useNuvem = () => useContext(Ctx);

export function NuvemProvider({ children }: { children: ReactNode }) {
  const [aberta, setAberta] = useState(false);
  const abrir = useCallback(() => setAberta(true), []);
  const fechar = useCallback(() => setAberta(false), []);
  const value = useMemo(() => ({ abrir }), [abrir]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>{aberta && <Nuvem onFechar={fechar} />}</AnimatePresence>
    </Ctx.Provider>
  );
}

/** Botão/link de WhatsApp que abre a nuvem (use no lugar do wa.me genérico). */
export function BotaoNuvem({ className, children, icon = true }: { className?: string; children: ReactNode; icon?: boolean }) {
  const { abrir } = useNuvem();
  return (
    <button type="button" onClick={abrir} className={className}>
      {icon && <WhatsappIcon size={16} />}
      {children}
    </button>
  );
}

/* --------------------------------------------------------------------- nuvem */

// Posições pseudoaleatórias e estáveis para as frases flutuarem
function semente(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function Nuvem({ onFechar }: { onFechar: () => void }) {
  const { lock } = useSmooth();
  const reduce = useReducedMotion();
  const [sel, setSel] = useState<Opcao | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [embaralho, setEmbaralho] = useState(0);

  useEffect(() => {
    const unlock = lock();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
    };
  }, [lock, onFechar]);

  const mensagem = montarMensagem(sel);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 700) onFechar();
  };

  return (
    <div className="no-print fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Escolha uma frase para compartilhar no WhatsApp">
      <motion.div className="absolute inset-0 bg-noite-2/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onFechar} />
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.75rem] bg-noite ring-1 ring-ouro/30 sm:bottom-4 sm:rounded-[1.75rem]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%', transition: { duration: 0.35, ease: [0.5, 0, 0.75, 0] } }}
        transition={SPRING_UI}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={onDragEnd}
        data-lenis-prevent
      >
        <div className="grain" />
        {/* Poeira dourada ao fundo */}
        {!reduce && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 28 }, (_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-ouro-claro"
                style={{ left: `${semente(i) * 100}%`, top: `${semente(i + 50) * 100}%`, width: 2 + semente(i + 7) * 4, height: 2 + semente(i + 7) * 4, opacity: 0.15 + semente(i + 3) * 0.5 }}
                animate={{ y: [0, -18 - semente(i) * 24, 0], opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 5 + semente(i + 11) * 6, repeat: Infinity, ease: 'easeInOut', delay: semente(i + 2) * 4 }}
              />
            ))}
          </div>
        )}

        <div className="relative flex justify-center pt-3" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-papel/25" />
        </div>
        <div className="relative flex items-center justify-between px-5 pb-3 pt-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Medal invertido className="size-9 rounded-full ring-1 ring-ouro/60" title="" aria-hidden="true" />
            <div>
              <p className="eyebrow text-[0.56rem] text-ouro-claro">WhatsApp</p>
              <p className="font-display text-[1.15rem] font-semibold text-papel">Escolha a frase que vai com o link</p>
            </div>
          </div>
          <button type="button" onClick={onFechar} aria-label="Fechar" className="grid size-10 place-items-center rounded-full text-papel ring-1 ring-papel/15 hover:bg-papel/10">
            <X size={18} />
          </button>
        </div>

        {/* Frases */}
        <div className="scroller relative min-h-0 flex-1 overflow-y-auto px-4 pb-3 sm:px-5" data-lenis-prevent>
          <div className="flex flex-wrap gap-2" role="listbox" aria-label="Frases">
            <Frase key="padrao" op={null} sel={sel === null} onClick={() => setSel(null)} i={0} embaralho={embaralho} />
            {OPCOES.map((op, i) => (
              <Frase key={op.id} op={op} sel={sel?.id === op.id} onClick={() => setSel(op)} i={i + 1} embaralho={embaralho} />
            ))}
          </div>
          <button type="button" onClick={() => setEmbaralho((v) => v + 1)} className="mt-3 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-salvia hover:text-papel">
            <Shuffle size={13} /> Reorganizar
          </button>
        </div>

        {/* Prévia + enviar */}
        <div className="relative border-t border-ouro/20 bg-noite-2/60 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.pre
              key={sel?.id ?? 'padrao'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="max-h-28 overflow-y-auto whitespace-pre-wrap rounded-xl bg-verde/40 px-4 py-3 font-sans text-[0.8rem] leading-relaxed text-papel/85 ring-1 ring-inset ring-ouro/15"
              aria-live="polite"
            >
              {mensagem}
            </motion.pre>
          </AnimatePresence>
          <div className="mt-3 flex gap-2">
            <a
              href={whatsappUrl(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => window.setTimeout(onFechar, 400)}
              className="flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-papel text-[0.78rem] font-bold uppercase tracking-[0.14em] text-noite transition-colors hover:bg-ouro-claro active:scale-[0.98]"
            >
              <WhatsappIcon size={18} /> Enviar no WhatsApp
            </a>
            <button
              type="button"
              aria-label="Copiar mensagem"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(mensagem);
                  setCopiado(true);
                  window.setTimeout(() => setCopiado(false), 1600);
                } catch {
                  /* sem permissão */
                }
              }}
              className="grid size-13 shrink-0 place-items-center rounded-full text-papel ring-1 ring-papel/20 hover:bg-papel/10"
            >
              {copiado ? <Check size={18} /> : <LinkIcon size={18} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Frase({ op, sel, onClick, i, embaralho }: { op: Opcao | null; sel: boolean; onClick: () => void; i: number; embaralho: number }) {
  const reduce = useReducedMotion();
  const texto = op ? op.texto : 'Mensagem padrão da chapa';
  const d = semente(i + embaralho * 17);
  return (
    <motion.button
      type="button"
      role="option"
      aria-selected={sel}
      onClick={onClick}
      layout
      transition={SPRING_LAYOUT}
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={reduce ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: [0, -3 - d * 5, 0] }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileTap={{ scale: 0.96 }}
      style={reduce ? undefined : { transition: 'none' }}
      {...(!reduce && { transition: { ...SPRING_LAYOUT, y: { duration: 4 + d * 4, repeat: Infinity, ease: 'easeInOut', delay: d * 2 }, opacity: { duration: 0.4, delay: Math.min(i, 14) * 0.03 }, scale: { ...SPRING_UI, delay: Math.min(i, 14) * 0.03 } } })}
      className={cn(
        'rounded-full px-4 py-2.5 text-left font-script text-[1.05rem] italic leading-tight ring-1 transition-colors duration-300',
        sel ? 'bg-ouro-claro text-noite ring-ouro-claro' : op ? 'bg-verde/50 text-papel ring-ouro/30 hover:ring-ouro/70' : 'bg-papel/5 text-papel/80 ring-papel/20 hover:ring-papel/50',
        op?.origem === 'eixo' && !sel && 'ring-dashed',
      )}
    >
      {op?.origem === 'eixo' && <Diamond size={6} className={cn('mr-2 inline-block -translate-y-px', sel ? 'text-noite' : 'text-ouro')} />}
      {texto}
    </motion.button>
  );
}

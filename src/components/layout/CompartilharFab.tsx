import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Check, ChevronRight, Images, Link as LinkIcon, Loader2, X } from 'lucide-react';
import { InstagramIcon, Medal, WhatsappIcon } from '../brand/Brand';
import { useSmooth } from './SmoothScroll';
import { site } from '../../config/site';
import { gerarStory } from '../../lib/story';
import { TEXTOS_WHATSAPP, compartilharImagem, linkPublico, whatsappUrl } from '../../lib/share';
import { EASE_OUT, SPRING_UI } from '../../lib/motion';
import { cn } from '../../lib/cn';

/**
 * Botão fixo de compartilhar (canto inferior direito) + gaveta de opções.
 * O mais usado pelos estudantes: postar no story do Instagram.
 */
export function CompartilharFab() {
  const { pathname } = useLocation();
  const [aberto, setAberto] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const oculto = pathname.startsWith('/compartilhar');

  useEffect(() => {
    const t = window.setTimeout(() => setVisivel(true), 1600);
    return () => window.clearTimeout(t);
  }, []);
  useEffect(() => setAberto(false), [pathname]);

  return (
    <>
      <AnimatePresence>
        {visivel && !oculto && !aberto && (
          <motion.button
            type="button"
            onClick={() => setAberto(true)}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="no-print fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-13 items-center gap-2.5 rounded-full bg-papel pl-4 pr-5 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-noite shadow-[0_18px_40px_-12px_rgb(0_0_0/0.6)] ring-1 ring-ouro/60 transition-colors hover:bg-ouro-claro sm:right-6"
            aria-label="Compartilhar: postar no story do Instagram, WhatsApp ou copiar link"
          >
            <span className="relative grid size-8 place-items-center rounded-full bg-noite text-papel">
              <InstagramIcon size={16} />
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full ring-2 ring-ouro"
                animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeOut' }}
              />
            </span>
            Compartilhar
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>{aberto && <Gaveta onFechar={() => setAberto(false)} />}</AnimatePresence>
    </>
  );
}

function Gaveta({ onFechar }: { onFechar: () => void }) {
  const { lock } = useSmooth();
  const [estado, setEstado] = useState<'' | 'gerando' | 'ok' | 'baixado'>('');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const unlock = lock();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', onKey);
    return () => {
      unlock();
      window.removeEventListener('keydown', onKey);
    };
  }, [lock, onFechar]);

  const postarStory = async () => {
    setEstado('gerando');
    try {
      const blob = await gerarStory({ tipo: 'apoio' });
      const r = await compartilharImagem(blob, 'story-gestao-vital-brazil.png', `${site.nome} · ${site.instagram.handle}`);
      setEstado(r === 'baixado' ? 'baixado' : r === 'compartilhado' ? 'ok' : '');
    } catch {
      setEstado('');
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 90 || info.velocity.y > 600) onFechar();
  };

  const linha = 'flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors active:scale-[0.99]';

  return (
    <div className="no-print fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Compartilhar">
      <motion.div className="absolute inset-0 bg-noite-2/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onFechar} />
      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto max-w-lg overflow-hidden rounded-t-[1.75rem] bg-noite pb-[max(1.25rem,env(safe-area-inset-bottom))] ring-1 ring-ouro/30 sm:bottom-6 sm:rounded-[1.75rem]"
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
        <div className="relative flex justify-center pt-3" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-papel/25" />
        </div>
        <div className="relative flex items-center justify-between px-6 pb-2 pt-4">
          <div className="flex items-center gap-3">
            <Medal invertido className="size-9 rounded-full ring-1 ring-ouro/60" title="" aria-hidden="true" />
            <div>
              <p className="eyebrow text-[0.56rem] text-ouro-claro">Compartilhar</p>
              <p className="font-display text-[1.15rem] font-semibold text-papel">Leve a chapa adiante</p>
            </div>
          </div>
          <button type="button" onClick={onFechar} aria-label="Fechar" className="grid size-10 place-items-center rounded-full text-papel ring-1 ring-papel/15 hover:bg-papel/10">
            <X size={18} />
          </button>
        </div>

        <div className="relative space-y-2 px-3 pt-3">
          {/* Principal: story */}
          <button type="button" onClick={postarStory} disabled={estado === 'gerando'} className={cn(linha, 'bg-papel text-noite hover:bg-ouro-claro')}>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-noite text-papel">
              {estado === 'gerando' ? <Loader2 size={18} className="animate-spin" /> : estado === 'ok' ? <Check size={18} /> : <InstagramIcon size={19} />}
            </span>
            <span className="flex-1">
              <span className="block text-[1rem] font-bold">Postar no meu story</span>
              <span className="block text-[0.8rem] text-tinta-2">
                {estado === 'gerando' ? 'Preparando a imagem…' : estado === 'baixado' ? 'Imagem salva! Abra o Instagram e poste.' : estado === 'ok' ? 'Valeu por compartilhar!' : 'Imagem pronta, um toque e escolha Instagram'}
              </span>
            </span>
            <ChevronRight size={18} />
          </button>

          <Link to="/compartilhar" onClick={onFechar} className={cn(linha, 'text-papel hover:bg-papel/5')}>
            <span className="grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-ouro/50 text-ouro-claro">
              <Images size={19} strokeWidth={1.5} />
            </span>
            <span className="flex-1">
              <span className="block text-[0.98rem] font-semibold">Escolher outra arte</span>
              <span className="block text-[0.8rem] text-salvia">15 stories: frases, contagem, eixos</span>
            </span>
            <ChevronRight size={18} className="text-salvia" />
          </Link>

          <a href={whatsappUrl(TEXTOS_WHATSAPP.site())} target="_blank" rel="noopener noreferrer" className={cn(linha, 'text-papel hover:bg-papel/5')}>
            <span className="grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-ouro/50 text-ouro-claro">
              <WhatsappIcon size={19} />
            </span>
            <span className="flex-1">
              <span className="block text-[0.98rem] font-semibold">Mandar no WhatsApp</span>
              <span className="block text-[0.8rem] text-salvia">Texto pronto pro grupo da turma</span>
            </span>
            <ChevronRight size={18} className="text-salvia" />
          </a>

          <div className="grid grid-cols-2 gap-2 px-1 pt-1">
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(linkPublico('/'));
                  setCopiado(true);
                  window.setTimeout(() => setCopiado(false), 1800);
                } catch {
                  /* sem permissão */
                }
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-xl text-[0.82rem] font-semibold text-papel ring-1 ring-papel/15 hover:bg-papel/5"
            >
              {copiado ? <Check size={16} /> : <LinkIcon size={16} />} {copiado ? 'Copiado!' : 'Copiar link'}
            </button>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-xl text-[0.82rem] font-semibold text-papel ring-1 ring-papel/15 hover:bg-papel/5">
              <InstagramIcon size={16} /> Seguir
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { Check, Link as LinkIcon } from 'lucide-react';
import type { Eixo, Proposta } from '../../data/programa';
import { InstagramIcon, WhatsappIcon } from '../brand/Brand';
import { TEXTOS_WHATSAPP, compartilharImagem, linkPublico, whatsappUrl } from '../../lib/share';
import { gerarStory } from '../../lib/story';
import { cn } from '../../lib/cn';

/** Destaca o termo buscado dentro do texto (sem diferenciar acentos). */
export function Marcado({ texto, termo }: { texto: string; termo: string }) {
  if (!termo) return <>{texto}</>;
  const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const t = norm(termo);
  const n = norm(texto);
  const partes: React.ReactNode[] = [];
  let i = 0;
  let k = 0;
  for (;;) {
    const j = n.indexOf(t, i);
    if (j < 0 || !t) break;
    partes.push(texto.slice(i, j));
    partes.push(
      <mark key={k++} className="rounded-[2px] bg-ouro/30 px-0.5 text-inherit">
        {texto.slice(j, j + t.length)}
      </mark>,
    );
    i = j + t.length;
  }
  partes.push(texto.slice(i));
  return <>{partes}</>;
}

export function PropostaItem({ p, eixo, termo = '', tom = 'claro' }: { p: Proposta; eixo: Eixo; termo?: string; tom?: 'claro' | 'escuro' }) {
  const [copiado, setCopiado] = useState(false);
  const rota = `/programa/${eixo.id}#p-${p.n}`;
  const claro = tom === 'claro';
  const btn = cn(
    'inline-flex size-9 items-center justify-center rounded-full ring-1 transition-colors',
    claro ? 'text-verde ring-verde/15 hover:bg-verde hover:text-papel' : 'text-papel ring-papel/15 hover:bg-papel hover:text-noite',
  );

  return (
    <li id={`p-${p.n}`} className={cn('print-avoid group grid scroll-mt-28 grid-cols-[3rem_1fr] gap-x-4 border-t py-6 sm:grid-cols-[4rem_1fr_auto]', claro ? 'border-verde/10' : 'border-papel/10')}>
      <span className={cn('tabular font-display text-[1.6rem] font-bold leading-none', claro ? 'text-ouro-escuro' : 'text-ouro')}>{p.n}</span>
      <div>
        <h4 className={cn('font-display text-[1.2rem] font-semibold leading-snug md:text-[1.3rem]', claro ? 'text-verde' : 'text-papel')}>
          <Marcado texto={p.titulo} termo={termo} />
        </h4>
        <p className={cn('mt-1.5 max-w-2xl text-[0.95rem] leading-relaxed', claro ? 'text-tinta-2' : 'text-papel/70')}>
          <Marcado texto={p.texto} termo={termo} />
        </p>
      </div>
      <div className="no-print col-start-2 mt-4 flex gap-2 sm:col-start-3 sm:mt-0 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        <a href={whatsappUrl(TEXTOS_WHATSAPP.proposta(p.titulo, `Eixo ${eixo.numero}: ${eixo.titulo}`, rota))} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Compartilhar "${p.titulo}" no WhatsApp`}>
          <WhatsappIcon size={15} />
        </a>
        <button
          type="button"
          className={btn}
          aria-label={`Gerar story de "${p.titulo}"`}
          onClick={async () => {
            const blob = await gerarStory({ tipo: 'proposta', eixoNumero: eixo.numero, eixoTitulo: eixo.titulo, titulo: p.titulo, texto: p.texto });
            await compartilharImagem(blob, `proposta-${eixo.id}-${p.n}.png`, p.titulo);
          }}
        >
          <InstagramIcon size={15} />
        </button>
        <button
          type="button"
          className={btn}
          aria-label="Copiar link da proposta"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(linkPublico(rota));
              setCopiado(true);
              window.setTimeout(() => setCopiado(false), 1600);
            } catch {
              /* sem permissão */
            }
          }}
        >
          {copiado ? <Check size={15} /> : <LinkIcon size={15} />}
        </button>
      </div>
    </li>
  );
}

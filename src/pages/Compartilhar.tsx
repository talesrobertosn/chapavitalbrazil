import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { PageHero } from '../components/ui/PageHero';
import { Diamond, WhatsappIcon } from '../components/brand/Brand';
import { Button } from '../components/ui/Button';
import { FRASES } from '../data/frases';
import { site } from '../config/site';
import { DATA_ELEICAO, useFase } from '../lib/fase';
import { diaDaSemana, diasAte, formatarLongo } from '../lib/datas';
import { gerarStory, type StoryConteudo } from '../lib/story';
import { baixar, compartilharImagem } from '../lib/share';
import { useNuvem } from '../components/layout/NuvemFrases';
import { cn } from '../lib/cn';
import { SPRING_UI } from '../lib/motion';

interface Modelo {
  id: string;
  nome: string;
  conteudo: StoryConteudo;
}

export default function Compartilhar() {
  const fase = useFase();
  const { abrir: abrirNuvem } = useNuvem();
  const modelos = useMemo<Modelo[]>(() => {
    const data = `${diaDaSemana(DATA_ELEICAO)}, ${formatarLongo(DATA_ELEICAO)}`;
    const dias = fase === 'eleicao' ? 0 : fase === 'vespera' ? 1 : fase === 'encerrada' ? -1 : Math.max(2, diasAte(DATA_ELEICAO));
    return [
      { id: 'apoio', nome: 'Eu apoio', conteudo: { tipo: 'apoio' } },
      { id: 'votar', nome: 'Contagem', conteudo: { tipo: 'votar', dias, dataTexto: data, confirmada: site.eleicao.confirmada } },
      ...FRASES.map((f, i) => ({ id: `frase-${i}`, nome: f.texto, conteudo: { tipo: 'frase' as const, frase: f.texto, destaque: f.destaque, tema: i % 3 === 2 ? ('papel' as const) : ('noite' as const) } })),
    ];
  }, [fase]);

  const [sel, setSel] = useState(modelos[0]!.id);
  const [previa, setPrevia] = useState<{ id: string; url: string; blob: Blob } | null>(null);
  const [estado, setEstado] = useState<'' | 'gerando' | 'baixado' | 'compartilhado'>('');
  const atual = modelos.find((m) => m.id === sel) ?? modelos[0]!;

  useEffect(() => {
    let vivo = true;
    let url = '';
    setEstado('gerando');
    // Prévia leve (metade do tamanho, JPEG); o PNG cheio é gerado só na hora de compartilhar.
    gerarStory(atual.conteudo, { escala: 0.5, formato: 'jpeg' }).then((blob) => {
      if (!vivo) return;
      url = URL.createObjectURL(blob);
      setPrevia({ id: atual.id, url, blob });
      setEstado('');
    });
    return () => {
      vivo = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [atual]);

  const nomeArquivo = `story-vital-brazil-${atual.id}.png`;

  return (
    <Page titulo="Stories">
      <PageHero rotulo="Stories" titulo={'Leve a chapa\npro seu story.'} destaque={['story.']} tituloClass="t-hero">
        Imagens prontas no tamanho certo (1080 × 1920). No celular, toque em <strong className="text-papel">Compartilhar</strong> e escolha Instagram ou WhatsApp. Se preferir, salve a imagem e poste quando quiser.
      </PageHero>

      <section className="relative overflow-hidden bg-verde py-16 md:py-24">
        <div className="grain" />
        <div className="container-x relative grid items-start gap-12 lg:grid-cols-12">
          {/* Prévia */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="relative mx-auto aspect-[9/16] w-[min(78vw,22rem)] overflow-hidden rounded-[1.6rem] bg-noite shadow-[0_60px_120px_-40px_rgb(0_0_0/0.8)] ring-1 ring-ouro/30">
              <AnimatePresence mode="popLayout">
                {previa && (
                  <motion.img
                    key={previa.id}
                    src={previa.url}
                    alt={`Prévia do story: ${atual.nome}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
              {estado === 'gerando' && <div className="absolute inset-0 animate-pulse bg-noite/40" aria-hidden="true" />}
            </div>
            <div className="mx-auto mt-8 flex w-[min(78vw,22rem)] flex-col gap-3">
              <Button
                disabled={!previa || estado === 'gerando'}
                icon={<Share2 size={16} strokeWidth={1.6} />}
                onClick={async () => {
                  if (!previa) return;
                  setEstado('gerando');
                  const cheio = await gerarStory(atual.conteudo);
                  const r = await compartilharImagem(cheio, nomeArquivo, `${site.nome} · ${site.instagram.handle}`);
                  setEstado(r === 'cancelado' ? '' : r);
                }}
              >
                Compartilhar
              </Button>
              <Button
                variant="outline"
                disabled={!previa || estado === 'gerando'}
                icon={<Download size={16} strokeWidth={1.6} />}
                onClick={async () => {
                  if (!previa) return;
                  setEstado('gerando');
                  baixar(await gerarStory(atual.conteudo), nomeArquivo);
                  setEstado('baixado');
                }}
              >
                Salvar imagem
              </Button>
              <p className="min-h-[1.5em] text-center text-[0.85rem] text-salvia" aria-live="polite">
                {estado === 'baixado' && 'Imagem salva. Agora é só postar no story!'}
                {estado === 'compartilhado' && 'Valeu por compartilhar!'}
              </p>
            </div>
          </div>

          {/* Modelos */}
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-ouro-claro">
              <Diamond size={6} />
              <span className="eyebrow">Escolha a arte</span>
            </p>
            <div role="radiogroup" aria-label="Modelos de story" className="mt-6 grid gap-2 sm:grid-cols-2">
              {modelos.map((m) => {
                const on = m.id === sel;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSel(m.id)}
                    className={cn('relative rounded-[2px] p-4 text-left transition-colors duration-300', on ? 'text-noite' : 'text-papel ring-1 ring-inset ring-papel/15 hover:ring-ouro/50')}
                  >
                    {on && <motion.span layoutId="modelo-sel" transition={SPRING_UI} className="absolute inset-0 rounded-[2px] bg-papel" />}
                    <span className="relative block font-display text-[1.02rem] font-semibold leading-snug">{m.nome}</span>
                    <span className={cn('relative mt-1 block text-[0.72rem] uppercase tracking-[0.14em]', on ? 'text-ouro-escuro' : 'text-salvia')}>
                      {m.conteudo.tipo === 'frase' ? (m.conteudo.tema === 'papel' ? 'Frase · claro' : 'Frase · escuro') : m.conteudo.tipo === 'apoio' ? 'Medalhão' : 'Eleição'}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-10 border-t border-ouro/20 pt-8">
              <p className="text-papel/75">Prefere mandar texto? Escolha uma frase da campanha e o link do site vai junto.</p>
              <Button onClick={abrirNuvem} variant="outline" icon={<WhatsappIcon size={16} />} className="mt-5">
                Mandar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

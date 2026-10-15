import { AnimatePresence, LayoutGroup, MotionConfig } from 'motion/react';
import { lazy, Suspense, type ReactNode } from 'react';
import { matchPath, Route, Routes, useLocation, type Location } from 'react-router';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Intro } from './components/layout/Intro';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Cursor } from './components/fx/Cursor';
import { CompartilharFab } from './components/layout/CompartilharFab';
import Home from './pages/Home';

const Programa = lazy(() => import('./pages/Programa'));
const Diretoria = lazy(() => import('./pages/Diretoria'));
const VitalBrazil = lazy(() => import('./pages/VitalBrazil'));
const Diario = lazy(() => import('./pages/Diario'));
const FaleConosco = lazy(() => import('./pages/FaleConosco'));
const Votar = lazy(() => import('./pages/Votar'));
const Calouro = lazy(() => import('./pages/Calouro'));
const Compartilhar = lazy(() => import('./pages/Compartilhar'));
const Privacidade = lazy(() => import('./pages/Privacidade'));
const NaoEncontrada = lazy(() => import('./pages/NaoEncontrada'));
const EixoOverlay = lazy(() => import('./components/programa/EixoOverlay'));
const MembroOverlay = lazy(() => import('./components/diretoria/MembroOverlay'));

export interface EstadoNav {
  /** Página que fica por trás de uma sobreposição (eixo, membro). */
  fundo?: Location;
}

function Carregando() {
  return <div className="min-h-[100dvh] bg-noite" aria-busy="true" />;
}

function L({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Carregando />}>{children}</Suspense>;
}

export default function App() {
  const location = useLocation();
  const estado = location.state as EstadoNav | null;

  const eixoMatch = matchPath('/programa/:eixo', location.pathname);
  const membroMatch = matchPath('/diretoria/:slug', location.pathname);

  // Camada de página: se há sobreposição, mantém a página de origem por trás.
  let pagina: Location = estado?.fundo ?? location;
  if (!estado?.fundo && eixoMatch) pagina = { ...location, pathname: '/programa', hash: '' };
  if (!estado?.fundo && membroMatch) pagina = { ...location, pathname: '/diretoria', hash: '' };

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <a href="#conteudo" className="sr-only-focusable fixed left-4 top-4 z-[100] rounded bg-papel px-4 py-3 text-sm font-semibold text-noite">
          Pular para o conteúdo
        </a>
        <Intro />
        <Cursor />
        <Header />
        <CompartilharFab />
        <LayoutGroup>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={pagina} key={pagina.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/programa" element={<L><Programa /></L>} />
              <Route path="/diretoria" element={<L><Diretoria /></L>} />
              <Route path="/vital-brazil" element={<L><VitalBrazil /></L>} />
              <Route path="/diario" element={<L><Diario /></L>} />
              <Route path="/fale-conosco" element={<L><FaleConosco /></L>} />
              <Route path="/votar" element={<L><Votar /></L>} />
              <Route path="/calouro" element={<L><Calouro /></L>} />
              <Route path="/compartilhar" element={<L><Compartilhar /></L>} />
              <Route path="/privacidade" element={<L><Privacidade /></L>} />
              <Route path="*" element={<L><NaoEncontrada /></L>} />
            </Routes>
          </AnimatePresence>

          <Suspense fallback={null}>
            <AnimatePresence>
              {eixoMatch?.params.eixo && <EixoOverlay key="eixo" id={eixoMatch.params.eixo} />}
              {membroMatch?.params.slug && <MembroOverlay key="membro" slug={membroMatch.params.slug} />}
            </AnimatePresence>
          </Suspense>
        </LayoutGroup>
        <Footer />
      </SmoothScroll>
    </MotionConfig>
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import './styles/index.css';

// GitHub Pages: o 404.html devolve rotas desconhecidas como ?/rota.
// Aqui restauramos o endereço original antes de o roteador ler a URL.
(function restaurarRota() {
  const l = window.location;
  if (l.search.startsWith('?/')) {
    const [rota, ...resto] = l.search.slice(2).split('&');
    const query = resto.length ? `?${resto.join('&').replace(/~and~/g, '&')}` : '';
    window.history.replaceState(null, '', `${import.meta.env.BASE_URL}${(rota ?? '').replace(/~and~/g, '&')}${query}${l.hash}`);
  }
})();

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

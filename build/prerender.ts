/**
 * Pré-renderização de metadados por rota (executada no fim do build).
 * O site é uma aplicação React, mas prévias de link (WhatsApp, Instagram,
 * Google) leem só o HTML inicial. Aqui geramos um index.html por rota com
 * título, descrição e imagem próprios, e um 404.html para o GitHub Pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { EIXOS } from '../src/data/programa';
import { MEMBROS } from '../src/data/diretoria';
import { site } from '../src/config/site';

interface Rota {
  path: string;
  titulo: string;
  descricao: string;
}

const SUFIXO = 'Gestão Dr. Vital Brazil';

function rotas(): Rota[] {
  const r: Rota[] = [
    { path: '/programa', titulo: `Programa · ${SUFIXO}`, descricao: '5 eixos e todas as propostas da Gestão Dr. Vital Brazil, escritas para serem cobradas.' },
    { path: '/diretoria', titulo: `Diretoria · ${SUFIXO}`, descricao: 'Do 1º ao último período. Uma só chapa. Conheça quem faz a Gestão Dr. Vital Brazil.' },
    { path: '/vital-brazil', titulo: `Por que Vital Brazil? · ${SUFIXO}`, descricao: 'Ciência, coragem e serviço. A história do médico e cientista que dá nome à chapa.' },
    { path: '/diario', titulo: `Diário da campanha · ${SUFIXO}`, descricao: 'Os 20 dias de campanha, um por um.' },
    { path: '/fale-conosco', titulo: `Fale conosco · ${SUFIXO}`, descricao: 'Fala. A gente escuta. Nem precisa dizer quem é. Ouvidoria e perguntas.' },
    { path: '/votar', titulo: `Como votar · ${SUFIXO}`, descricao: 'Data, local e horário da eleição do CA de Medicina FAPI. Sua voz vira voto.' },
    { path: '/calouro', titulo: `Querido calouro · ${SUFIXO}`, descricao: 'Uma carta para quem está chegando: ninguém deveria se sentir sozinho no 1º período.' },
    { path: '/compartilhar', titulo: `Stories · ${SUFIXO}`, descricao: 'Imagens prontas para compartilhar nos Stories.' },
    { path: '/privacidade', titulo: `Privacidade · ${SUFIXO}`, descricao: 'Como o site trata dados: o mínimo possível.' },
  ];
  for (const e of EIXOS) {
    r.push({ path: `/programa/${e.id}`, titulo: `Eixo ${e.numero}: ${e.titulo} · ${SUFIXO}`, descricao: e.intro });
  }
  for (const m of MEMBROS) {
    r.push({ path: `/diretoria/${m.slug}`, titulo: `${m.nome} · ${m.cargo.titulo} · ${SUFIXO}`, descricao: `${m.cargo.titulo} da Gestão Dr. Vital Brazil · Turma ${m.turma}.` });
  }
  return r;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function aplicar(html: string, r: Rota | null, url: string, base: string) {
  const ogImage = `${url}/og.png`;
  let h = html;
  if (r) {
    h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.titulo)}</title>`);
    h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(r.descricao)}$2`);
    h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.titulo)}$2`);
    h = h.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.descricao)}$2`);
  }
  const caminho = r ? r.path : '/';
  h = h.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${ogImage}$2`);
  h = h.replace('</head>', `    <meta property="og:url" content="${url}${caminho === '/' ? '/' : caminho}" />\n    <link rel="canonical" href="${url}${caminho === '/' ? '/' : caminho}" />\n  </head>`);
  void base;
  return h;
}

export function prerenderMeta(): Plugin {
  let outDir = 'dist';
  let base = '/';
  return {
    name: 'prerender-meta',
    apply: 'build',
    configResolved(c) {
      outDir = c.build.outDir;
      base = c.base;
    },
    closeBundle() {
      const url = (process.env.SITE_URL ?? site.url).replace(/\/$/, '');
      const indexPath = path.resolve(outDir, 'index.html');
      const html = fs.readFileSync(indexPath, 'utf8');
      fs.writeFileSync(indexPath, aplicar(html, null, url, base));
      for (const r of rotas()) {
        const dir = path.resolve(outDir, `.${r.path}`);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), aplicar(html, r, url, base));
      }
      // GitHub Pages serve o 404.html para qualquer rota desconhecida: o app trata.
      fs.writeFileSync(path.resolve(outDir, '404.html'), aplicar(html, { path: '/404', titulo: `Página não encontrada · ${SUFIXO}`, descricao: site.slogan }, url, base));
      // Evita o processamento Jekyll do GitHub Pages.
      fs.writeFileSync(path.resolve(outDir, '.nojekyll'), '');
      console.log(`\n✓ ${rotas().length + 1} rotas pré-renderizadas para ${url}`);
    },
  };
}

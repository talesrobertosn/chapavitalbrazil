/**
 * PRÉ-RENDERIZAÇÃO E SEO (executada no fim do build)
 * ----------------------------------------------------------------------------
 * O site é uma aplicação React. O Google executa JavaScript, mas prévias de
 * link (WhatsApp, Instagram) e alguns robôs leem só o HTML inicial. Então,
 * para cada rota, geramos um index.html com:
 *   • título, descrição, canonical e Open Graph próprios;
 *   • dados estruturados (JSON-LD);
 *   • o conteúdo principal em HTML puro dentro do #root (o React substitui
 *     ao carregar; sem JavaScript, o conteúdo continua legível).
 * E também: sitemap.xml, robots.txt, 404.html e .nojekyll.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { EIXOS, PRINCIPIOS, QUEM_SOMOS, TOTAL_PROPOSTAS } from '../src/data/programa';
import { CARGOS, MEMBROS } from '../src/data/diretoria';
import { MARCOS, POR_ISSO, REDE } from '../src/data/vitalBrazil';
import { site } from '../src/config/site';

interface Rota {
  path: string;
  titulo: string;
  descricao: string;
  prioridade: number;
  conteudo: string;
}

const SUFIXO = 'Gestão Dr. Vital Brazil';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function nav(base: string) {
  const links = [
    ['', 'Início'],
    ['programa', 'Programa'],
    ['diretoria', 'Diretoria'],
    ['vital-brazil', 'Vital Brazil'],
    ['diario', 'Diário'],
    ['fale-conosco', 'Fale conosco'],
    ['votar', 'Como votar'],
  ];
  return `<nav><ul>${links.map(([h, t]) => `<li><a href="${base}${h}">${t}</a></li>`).join('')}</ul></nav>`;
}

function htmlPrograma(base: string) {
  return EIXOS.map(
    (e) =>
      `<section><h2><a href="${base}programa/${e.id}">Eixo ${e.numero}: ${esc(e.titulo)}</a></h2><p>${esc(e.intro)}</p>${e.grupos
        .map((g) => `<h3>${esc(g.titulo)}</h3><ol>${g.propostas.map((p) => `<li><strong>${esc(p.titulo)}</strong>: ${esc(p.texto)}</li>`).join('')}</ol>`)
        .join('')}</section>`,
  ).join('');
}

function htmlDiretoria(base: string) {
  return CARGOS.map(
    (c) => `<section><h2>${esc(c.titulo)}</h2><ul>${MEMBROS.filter((m) => m.cargo.id === c.id)
      .map((m) => `<li><a href="${base}diretoria/${m.slug}">${esc(m.nome)}</a> (Turma ${m.turma})</li>`)
      .join('')}</ul></section>`,
  ).join('');
}

function rotas(base: string): Rota[] {
  const home: Rota = {
    path: '/',
    titulo: `${SUFIXO} · CA Medicina FAPI`,
    descricao: `${site.slogan} Conheça o programa, a diretoria e a história da Gestão Dr. Vital Brazil, chapa ao Centro Acadêmico de Medicina da FAPI.`,
    prioridade: 1,
    conteudo: `<h1>Gestão Dr. Vital Brazil · CA Medicina FAPI</h1><p>${esc(site.slogan)}</p><p>${esc(QUEM_SOMOS.curto)}</p><p>${esc(QUEM_SOMOS.longo)}</p><h2>Nossos princípios</h2><ul>${PRINCIPIOS.map((p) => `<li><strong>${p.titulo}</strong>: ${esc(p.texto)}</li>`).join('')}</ul><h2>5 eixos, ${TOTAL_PROPOSTAS} propostas</h2><ul>${EIXOS.map((e) => `<li><a href="${base}programa/${e.id}">${esc(e.titulo)}</a>: ${esc(e.frase)}</li>`).join('')}</ul>`,
  };
  const r: Rota[] = [
    home,
    {
      path: '/programa',
      titulo: `Programa · ${SUFIXO}`,
      descricao: `5 eixos e ${TOTAL_PROPOSTAS} propostas da Gestão Dr. Vital Brazil para o CA de Medicina da FAPI, escritas para serem cobradas.`,
      prioridade: 0.9,
      conteudo: `<h1>Programa de Gestão Dr. Vital Brazil</h1><p>${esc(QUEM_SOMOS.cobrar)}</p>${htmlPrograma(base)}`,
    },
    {
      path: '/diretoria',
      titulo: `Diretoria · ${SUFIXO}`,
      descricao: `Do 1º ao último período. Uma só chapa. Conheça os ${MEMBROS.length} estudantes da Gestão Dr. Vital Brazil, CA Medicina FAPI.`,
      prioridade: 0.9,
      conteudo: `<h1>Diretoria da Gestão Dr. Vital Brazil</h1><p>Do 1º ao último período. Uma só chapa.</p>${htmlDiretoria(base)}`,
    },
    {
      path: '/vital-brazil',
      titulo: `Por que Vital Brazil? · ${SUFIXO}`,
      descricao: 'Ciência, coragem e serviço. A história de Vital Brazil Mineiro da Campanha (1865–1950), médico, cientista e sanitarista que dá nome à chapa.',
      prioridade: 0.8,
      conteudo: `<h1>Por que Vital Brazil?</h1><ol>${MARCOS.map((m) => `<li><strong>${esc(m.ano)}: ${esc(m.titulo)}</strong>. ${esc(m.texto)}</li>`).join('')}</ol><h2>${esc(REDE.titulo)}</h2><p>${esc(REDE.texto)}</p><p>${esc(POR_ISSO)}</p>`,
    },
    { path: '/diario', titulo: `Diário da campanha · ${SUFIXO}`, descricao: 'Os 20 dias de campanha da Gestão Dr. Vital Brazil, um post por dia.', prioridade: 0.6, conteudo: '<h1>Diário da campanha</h1><p>Um post por dia, do primeiro “Chegamos.” ao dia da eleição.</p>' },
    { path: '/fale-conosco', titulo: `Fale conosco · ${SUFIXO}`, descricao: 'Fala. A gente escuta. Nem precisa dizer quem é. Ouvidoria do CA e perguntas frequentes.', prioridade: 0.7, conteudo: '<h1>Fale conosco</h1><p>Fala. A gente escuta. Nem precisa dizer quem é.</p>' },
    { path: '/votar', titulo: `Como votar · ${SUFIXO}`, descricao: 'Data, local e horário da eleição do CA de Medicina FAPI. Sua voz vira voto.', prioridade: 0.8, conteudo: '<h1>Como votar</h1><p>Sua voz vira voto. Data, local e horário da eleição do CA de Medicina FAPI.</p>' },
    { path: '/calouro', titulo: `Querido calouro · ${SUFIXO}`, descricao: 'Uma carta para quem está chegando: ninguém deveria se sentir sozinho no 1º período.', prioridade: 0.6, conteudo: '<h1>Querido calouro,</h1><p>Ninguém deveria se sentir sozinho no 1º período.</p>' },
    { path: '/transferido', titulo: `Querido transferido · ${SUFIXO}`, descricao: 'Uma carta para quem chegou de transferência: ninguém precisa descobrir tudo sozinho.', prioridade: 0.6, conteudo: '<h1>Querido transferido,</h1><p>Mudar de faculdade é chegar onde as pessoas já se conhecem. Por isso, queremos um apoio organizado para os alunos transferidos: informação desde o primeiro dia, um canal próprio, integração com a turma e ajuda na adaptação curricular.</p>' },
    { path: '/compartilhar', titulo: `Stories · ${SUFIXO}`, descricao: 'Imagens prontas para compartilhar nos Stories do Instagram.', prioridade: 0.4, conteudo: '<h1>Stories</h1><p>Imagens prontas para compartilhar.</p>' },
    { path: '/privacidade', titulo: `Privacidade · ${SUFIXO}`, descricao: 'Como o site trata dados: o mínimo possível.', prioridade: 0.2, conteudo: '<h1>Privacidade</h1><p>Sem cookies e sem rastreadores.</p>' },
  ];
  for (const e of EIXOS) {
    r.push({
      path: `/programa/${e.id}`,
      titulo: `Eixo ${e.numero}: ${e.titulo} · ${SUFIXO}`,
      descricao: e.intro,
      prioridade: 0.7,
      conteudo: `<h1>Eixo ${e.numero}: ${esc(e.titulo)}</h1><p>${esc(e.intro)}</p>${e.grupos.map((g) => `<h2>${esc(g.titulo)}</h2><ol>${g.propostas.map((p) => `<li><strong>${esc(p.titulo)}</strong>: ${esc(p.texto)}</li>`).join('')}</ol>`).join('')}`,
    });
  }
  for (const m of MEMBROS) {
    r.push({
      path: `/diretoria/${m.slug}`,
      titulo: `${m.nome} · ${m.cargo.titulo} · ${SUFIXO}`,
      descricao: `${m.nome}, ${m.cargo.titulo} da Gestão Dr. Vital Brazil, CA Medicina FAPI. Turma ${m.turma}.`,
      prioridade: 0.5,
      conteudo: `<h1>${esc(m.nome)}</h1><p>${esc(m.cargo.titulo)} · Turma ${m.turma} · Gestão Dr. Vital Brazil</p>`,
    });
  }
  return r;
}

function jsonLd(url: string, r: Rota) {
  const org = {
    '@type': 'Organization',
    '@id': `${url}/#organizacao`,
    name: 'Gestão Dr. Vital Brazil',
    alternateName: ['Chapa Vital Brazil', 'Gestão Vital Brazil · CA Medicina FAPI'],
    description: site.slogan,
    url: `${url}/`,
    logo: `${url}/icon-512.png`,
    image: `${url}/og.png`,
    sameAs: [site.instagram.url],
  };
  const grafo: object[] = [
    org,
    { '@type': 'WebSite', '@id': `${url}/#site`, url: `${url}/`, name: 'Gestão Dr. Vital Brazil', inLanguage: 'pt-BR', publisher: { '@id': `${url}/#organizacao` } },
    { '@type': 'WebPage', url: `${url}${r.path === '/' ? '/' : `${r.path}/`}`, name: r.titulo, description: r.descricao, inLanguage: 'pt-BR', isPartOf: { '@id': `${url}/#site` } },
  ];
  const membro = MEMBROS.find((m) => r.path === `/diretoria/${m.slug}`);
  if (membro) grafo.push({ '@type': 'Person', name: membro.nome, jobTitle: membro.cargo.titulo, memberOf: { '@id': `${url}/#organizacao` } });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': grafo }).replace(/</g, '\\u003c')}</script>`;
}

function aplicar(html: string, r: Rota, url: string, base: string, opts: { noindex?: boolean } = {}) {
  const canon = `${url}${r.path === '/' ? '/' : `${r.path}/`}`; // o GitHub Pages serve /rota/ (com barra)
  let h = html;
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.titulo)}</title>`);
  h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(r.descricao)}$2`);
  h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.titulo)}$2`);
  h = h.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.descricao)}$2`);
  h = h.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${url}/og.png$2`);
  const extra = [
    `<meta property="og:url" content="${canon}" />`,
    `<link rel="canonical" href="${canon}" />`,
    `<meta name="twitter:title" content="${esc(r.titulo)}" />`,
    `<meta name="twitter:description" content="${esc(r.descricao)}" />`,
    `<meta name="twitter:image" content="${url}/og.png" />`,
    opts.noindex ? '<meta name="robots" content="noindex" />' : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    site.googleVerificacao ? `<meta name="google-site-verification" content="${esc(site.googleVerificacao)}" />` : '',
    jsonLd(url, r),
  ].filter(Boolean);
  h = h.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);
  // Conteúdo estático dentro do #root (o React substitui ao carregar).
  h = h.replace('<div id="root"></div>', `<div id="root"><div class="seo-pre">${nav(base)}<main>${r.conteudo}</main><footer><p>${esc(site.assinatura)} · <a href="${site.instagram.url}">${site.instagram.handle}</a></p></footer></div></div>`);
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
      const lista = rotas(base);

      for (const r of lista) {
        const destino = r.path === '/' ? indexPath : path.join(path.resolve(outDir, `.${r.path}`), 'index.html');
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.writeFileSync(destino, aplicar(html, r, url, base));
      }

      // 404: o GitHub Pages serve este arquivo em qualquer rota desconhecida.
      fs.writeFileSync(
        path.resolve(outDir, '404.html'),
        aplicar(html, { path: '/404', titulo: `Página não encontrada · ${SUFIXO}`, descricao: site.slogan, prioridade: 0, conteudo: '<h1>Página não encontrada</h1>' }, url, base, { noindex: true }),
      );

      // Sitemap
      const hoje = new Date().toISOString().slice(0, 10);
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lista
        .map((r) => `  <url>\n    <loc>${url}${r.path === '/' ? '/' : `${r.path}/`}</loc>\n    <lastmod>${hoje}</lastmod>\n    <priority>${r.prioridade.toFixed(1)}</priority>\n  </url>`)
        .join('\n')}\n</urlset>\n`;
      fs.writeFileSync(path.resolve(outDir, 'sitemap.xml'), sitemap);

      // robots.txt aponta para o sitemap
      fs.writeFileSync(path.resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`);

      // Sem processamento Jekyll no GitHub Pages
      fs.writeFileSync(path.resolve(outDir, '.nojekyll'), '');
      console.log(`\n✓ ${lista.length} rotas pré-renderizadas · sitemap.xml · robots.txt · 404.html → ${url}`);
    },
  };
}

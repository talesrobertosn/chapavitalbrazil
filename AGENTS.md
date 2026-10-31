# Instruções para agentes de IA · Gestão Dr. Vital Brazil

Este repositório é o site **e** a base de marca da chapa *Gestão Dr. Vital Brazil* (CA de Medicina da FAPI).
Ele será usado também para criar **posts, stories, carrosséis e outras artes** para o Instagram.

## Leia antes de qualquer tarefa
1. [`docs/SOCIAL-MEDIA.md`](docs/SOCIAL-MEDIA.md): **configuração permanente da Diretoria de Marketing**: como atuar (agência + direção de arte), uso obrigatório das skills, padrão de produção, identidade visual das peças de marketing e parcerias, entregáveis, mídia kits, fatos, parcerias e cuidados.
2. [`docs/DIRECAO-DE-ARTE.md`](docs/DIRECAO-DE-ARTE.md): paleta, tipografia, ornamentos, imagem, movimento, formatos e templates do **site** (linha "Gravura Viva").
3. [`docs/MARKETING.md`](docs/MARKETING.md): voz, mensagens, fatos verificados, frases aprovadas, calendário e cuidados.
4. `src/data/*.ts`: **fonte oficial de conteúdo** (programa, diretoria, diário, frases, Vital Brazil). Copie daqui, não da memória.
5. `src/config/site.ts`: data da eleição, links, e-mail e configurações.

## Regra principal para design e social media
Toda solicitação de design (Instagram, posts, carrosséis, stories, reels, identidade, branding, infográficos, campanhas, materiais institucionais) começa com a **identificação e leitura das skills relevantes em `.claude/skills/`** (tabela em `docs/SOCIAL-MEDIA.md` § 8), seguida da **execução prática**: produza a arte (PNG em alta + fonte editável), não só o roteiro. Entregue junto a legenda e/ou a mensagem de WhatsApp.

> Duas identidades convivem no repositório e **não se misturam**: o **site** usa "Gravura Viva" (abaixo); **peças de marketing, parcerias e mídia kits** usam a identidade de `docs/SOCIAL-MEDIA.md` § 4 (DM Serif Display + Manrope + Anton, verde `#0D3B2A`, dourado `#C9A15A`, off-white `#F3EEE2`).

## Regras inegociáveis
- **Conceito "Gravura Viva"**: gravura científica do séc. XIX + composição editorial contemporânea. Épico, sóbrio, prestigioso.
- **Cores**: `#12241C` noite · `#1E3A2F` verde · `#F4F0E6` papel · `#B08D57` ouro (só fios, losangos, sublinhados, números; ≤ 5% da peça). Texto dourado: `#CDB186` no escuro, `#7A5C30` no claro.
- **Fontes**: Playfair Display (títulos, CAIXA ALTA no impacto) · Inter (texto) · Cormorant Garamond itálico (citações/voz humana).
- **Assinaturas visuais**: fio de ouro com losango `── ◆ ──`, pincelada dourada sob UMA palavra, arco do Butantan (imagens), círculo (pessoas), folhagem em gravura nos cantos, granulação.
- **Logo voltado para a DIREITA** (vetores em `src/components/brand/logoPaths.ts`).
- **Nunca** mencionar/atacar outras chapas ou a instituição. **Nunca** inventar membros, cargos, falas, biografias ou fatos.
- **Nunca** atribuir a Vital Brazil a frase de Pasteur ("A ciência não tem pátria…").
- Programa oficial = **5 eixos, 52 propostas**.
- Português do Brasil, tom sério, próximo e propositivo.

## Posts do Instagram
Pedido de post/carrossel/story → siga `.claude/skills/post/SKILL.md` (comando `/post`). Templates em `marketing/ferramentas/templates.mjs`, assets em `marketing/ferramentas/assets.mjs`, modelo em `marketing/instagram/_modelo/`.

## Ferramentas prontas
- `src/lib/story.ts`: gera stories 1080×1920 com fontes e vetores oficiais (`frase`, `apoio`, `votar`, `proposta`, `membro`).
- `public/og.png`: referência de composição horizontal (1200×630).
- Página `/compartilhar`: estúdio de stories no navegador.

## Código (se for mexer no site)
- React 19 + TypeScript + Vite + Tailwind 4 + Motion + Lenis. Tokens de design em `src/styles/index.css`; curvas e molas em `src/lib/motion.ts`.
- `npm run dev` · `npm run build` (typecheck + build + pré-renderização/sitemap) · deploy automático pelo GitHub Actions.
- Mantenha: acessibilidade (contraste, foco, `prefers-reduced-motion`), animações só com transform/opacity, celular primeiro.
- Antes de publicar, rode o build e verifique em 390 px (celular), 820 px (tablet) e 1440 px (computador).

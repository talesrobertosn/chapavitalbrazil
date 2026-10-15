# Instruções para agentes de IA · Gestão Dr. Vital Brazil

Este repositório é o site **e** a base de marca da chapa *Gestão Dr. Vital Brazil* (CA de Medicina da FAPI).
Ele será usado também para criar **posts, stories, carrosséis e outras artes** para o Instagram.

## Leia antes de qualquer tarefa
1. [`docs/DIRECAO-DE-ARTE.md`](docs/DIRECAO-DE-ARTE.md): paleta, tipografia, ornamentos, imagem, movimento, formatos e templates do Instagram.
2. [`docs/MARKETING.md`](docs/MARKETING.md): voz, mensagens, fatos verificados, frases aprovadas, calendário e cuidados.
3. `src/data/*.ts`: **fonte oficial de conteúdo** (programa, diretoria, diário, frases, Vital Brazil). Copie daqui, não da memória.
4. `src/config/site.ts`: data da eleição, links, e-mail e configurações.

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

## Ferramentas prontas
- `src/lib/story.ts`: gera stories 1080×1920 com fontes e vetores oficiais (`frase`, `apoio`, `votar`, `proposta`, `membro`).
- `public/og.png`: referência de composição horizontal (1200×630).
- Página `/compartilhar`: estúdio de stories no navegador.

## Código (se for mexer no site)
- React 19 + TypeScript + Vite + Tailwind 4 + Motion + Lenis. Tokens de design em `src/styles/index.css`; curvas e molas em `src/lib/motion.ts`.
- `npm run dev` · `npm run build` (typecheck + build + pré-renderização/sitemap) · deploy automático pelo GitHub Actions.
- Mantenha: acessibilidade (contraste, foco, `prefers-reduced-motion`), animações só com transform/opacity, celular primeiro.
- Antes de publicar, rode o build e verifique em 390 px (celular), 820 px (tablet) e 1440 px (computador).

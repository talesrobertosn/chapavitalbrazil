---
name: post
description: Cria um post do Instagram (carrossel de feed + stories + legenda) da Gestão Dr. Vital Brazil, sempre na direção de arte "Gravura Viva" e com o conteúdo oficial. Use quando o usuário pedir um post, carrossel, story, feed ou arte para o Instagram.
---

# /post · gerar um post do Instagram no padrão da chapa

Você vai criar uma pasta `marketing/instagram/NN-nome/` com `gerar.mjs`, os PNGs e `LEGENDA.md`, renderizar, revisar visualmente, enviar as imagens ao usuário e publicar no repositório.

## 1. Leia antes (obrigatório, nesta ordem)
1. `docs/MARKETING.md` § 11 "Como pedir um post" e § 2 (tom), § 6 (frases), § 9 (cuidados).
2. `docs/DIRECAO-DE-ARTE.md` § 2 (paleta), § 3 (tipografia), § 8 (formatos e templates), § 9 (faça/não faça), § 10 (checklist).
3. `marketing/ferramentas/templates.mjs` (blocos prontos) e `marketing/ferramentas/assets.mjs` (ornamentos, botânica, logos).
4. Conteúdo oficial em `src/data/*.ts`: `programa.ts` (5 eixos, 52 propostas), `diretoria.ts` (23 membros), `frases.ts`, `vitalBrazil.ts`, `diario.ts`. **Copie de lá; nunca invente.**
5. `marketing/instagram/_modelo/gerar.mjs` (exemplo completo) e o último post publicado (para alternar o ritmo escuro ↔ claro).

## 2. Entenda o pedido
Extraia do pedido: **tema** (eixo, proposta, membro, frase, data, Vital Brazil, evento), **formato** (carrossel de feed 4:5 por padrão; stories; quadrado só se pedido), **quantidade de slides** (5–7 é o ideal; capa + miolo + fecho), **tom** (escuro/claro; se o último post foi escuro, comece claro ou vice-versa) e **CTA**. Se faltar o essencial (ex.: qual eixo), pergunte em uma linha; senão, decida e siga.

## 3. Roteiro visual (antes de codar)
Escreva, em 5–8 linhas, o roteiro slide a slide: frase, template, tom, destaque (UMA palavra em ouro) e o que a pessoa sente ao arrastar. Regras:
- **Capa** com frase de impacto em CAIXA ALTA (template `capa`), **fecho** sempre com `fecho()` (medalhão + slogan + @).
- Alterne tons: `tom: 'noite' | 'verde' | 'musgo'` no escuro; `'papel' | 'marfim' | 'areia'` no claro. Varie levemente, nunca saia da paleta.
- Ornamentos e botânica vêm de `assets.mjs` (`ramo`, `grinalda`, `cantoneira`, `divisor`, `selo`, `cartucho`, `serpenteTraco`, `frasco`, `microscopio`, `jaleco`…). Use 1–2 por slide, nos cantos, nunca sobre texto.
- Uma ideia por slide. Texto curto. Números grandes em serifada vazada quando houver.
- Pessoas em círculo; imagens históricas em arco. Fotos da diretoria vêm de `src/assets/diretoria/<slug>.jpg`.
- Carrossel **panorâmico** (fio de ouro atravessa os slides) é o padrão: `montar({ panoramico: true })`.

## 4. Gere
1. Copie `marketing/instagram/_modelo/` para `marketing/instagram/NN-nome/` (NN = próximo número; nome curto em kebab-case).
2. Edite `gerar.mjs` montando os slides com os templates. Se precisar de um slide fora dos templates, componha com `fundoEscuro/fundoClaro` + `arco/circulo/rotulo/pincelada` + assets; mantenha margens de 80 px e a zona segura dos stories (y 260–1660).
3. Rode: `PLAYWRIGHT_MODULE=<caminho do playwright> node marketing/instagram/NN-nome/gerar.mjs` (na raiz; se o Playwright estiver em `node_modules`, a variável é desnecessária).
4. **Revise visualmente** o `_panorama-*.png` e cada story (abra as imagens). Corrija texto cortado, palavra destacada errada, contraste fraco, elementos sobre texto, rodapé errado em slide claro. Repita até ficar limpo.
5. Escreva `LEGENDA.md` com: legenda pronta (§ 8 de MARKETING.md: gancho, dor → proposta → como cobrar, CTA, assinatura, hashtags), textos/figurinhas dos stories, texto alternativo de cada slide, ordem de publicação.

## 5. Entregue
- Envie ao usuário as imagens do carrossel (em ordem) e os stories, e cole a legenda na resposta.
- Commit + push na branch de trabalho (mensagem: `Post NN · <tema>`), sem zips.
- Anote no fim da resposta: ritmo do feed (este post foi escuro/claro) e sugestões de stories de apoio.

## Checklist final (não pule)
- [ ] Nada inventado: propostas, nomes, cargos, turmas e fatos batem com `src/data`.
- [ ] Nenhuma menção a outras chapas ou à instituição; frase de Pasteur não atribuída a Vital Brazil.
- [ ] "5 eixos, 52 propostas"; slogan e @ corretos; ouro ≤ 5% da peça; uma palavra destacada por slide.
- [ ] Capa + fecho; rodapé com contador e @ nos slides de feed; stories dentro da zona segura.
- [ ] Legenda com CTA, assinatura e as 5 hashtags fixas.

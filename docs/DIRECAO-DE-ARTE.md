# Direção de Arte · Gestão Dr. Vital Brazil

> **Leia isto antes de criar qualquer peça**: site, post, story, carrossel, cartaz, camiseta, adesivo, slide, vídeo ou PNG.
> Este documento é a fonte da verdade visual da chapa. Quando houver dúvida, ele vence o gosto pessoal.
> Complementa: [`MARKETING.md`](./MARKETING.md) (voz, conteúdo e calendário) e [`../AGENTS.md`](../AGENTS.md) (regras para agentes de IA).

---

## 1. Conceito: **"Gravura Viva"**

A precisão de um laboratório de 1901 encontra a de um produto digital de 2026.

- **Estética**: pranchas científicas do século XIX. Gravura em metal, papel envelhecido, fio dourado, tipografia de catálogo, folhagem botânica e a serpente do Butantan.
- **Composição**: rigor contemporâneo, com grid, espaço vazio e escala dramática. A referência de *qualidade* (não de identidade) são Apple, Porsche, Mercedes, Awwwards, Linear e Vercel.
- **Sensação**: prestígio acadêmico, seriedade, coragem e calor humano. **Épico, nunca exagerado.**

Em uma frase: *um gabinete de ciência que ganha vida.*

### Três assinaturas (sempre presentes, nunca todas no máximo ao mesmo tempo)

| Assinatura | O que é | Onde aparece |
|---|---|---|
| **O Fio de Ouro** | Linha dourada fina (1–2 px) com losango ◆ ao centro ou nas pontas. Também a **pincelada dourada** sob a palavra-chave. | Sublinhados, separadores (`── ◆ ──`), linhas do tempo, barras de progresso, molduras |
| **O Arco do Butantan** | Topo em semicírculo, como as janelas do Instituto Butantan. | Molduras de imagens institucionais, transições entre seções, recortes de foto histórica |
| **A Serpente como traço** | Curva em S que se desenha. Vem do medalhão. | Linhas do tempo, ornamentos de canto, transições. Pouca e marcante, nunca repetida como estampa |

**Retratos de pessoas** (diretoria, depoimentos) usam **círculo** (medalhão), enquadrado no rosto, com anel dourado fino. **Imagens históricas e institucionais** usam **arco**.

---

## 2. Paleta

| Token | Hex | Papel | Uso |
|---|---|---|---|
| `noite` | `#12241C` | Fundo mais profundo | Heros, cenas cinematográficas, stories escuros |
| `noite-2` | `#0C1913` | Sombra | Rodapé, vinhetas, bordas de gradiente radial |
| `verde` | `#1E3A2F` | **Cor institucional** (do guia original) | Fundos verdes, texto sobre papel, selo de cera |
| `verde-2` | `#284A3C` | Luz sobre o verde | Centro de gradientes radiais, superfícies elevadas no escuro |
| `papel` | `#F4F0E6` | **Off-white oficial** | Fundos claros e texto sobre escuro |
| `papel-2` | `#EBE4D3` | Papel sombreado | Cards sobre papel, controles |
| `tinta` | `#0F1C16` | Texto máximo contraste | Corpo de texto sobre papel |
| `tinta-2` | `#3A4A42` | Texto secundário | Parágrafos de apoio sobre papel |
| `ouro` | `#B08D57` | **Dourado envelhecido oficial** | **Só** fios, losangos, sublinhados, números grandes, contornos |
| `ouro-claro` | `#CDB186` | Ouro legível no escuro | Rótulos e destaques de texto sobre verde/noite (contraste ≈ 6:1) |
| `ouro-escuro` | `#7A5C30` | Ouro legível no claro | Rótulos e destaques de texto sobre papel (contraste ≈ 5,4:1) |
| `salvia` | `#93A698` | Texto terciário no escuro | Legendas, datas, metadados |

### Regras de cor
1. **O ouro ocupa no máximo ~5% da peça.** Prestígio vem da contenção.
2. **Nunca** use `#B08D57` em texto pequeno: sobre verde use `ouro-claro`, sobre papel use `ouro-escuro`.
3. **Sem gradientes genéricos** (roxo-azul, arco-íris, neon). Gradientes permitidos: **radiais sutis** de `verde-2 → verde → noite-2`, simulando luz sobre a gravura.
4. **Ritmo xadrez**: alterne peças/seções escuras (noite/verde) e claras (papel). No feed do Instagram isso forma um tabuleiro bonito visto de longe.
5. Nada de branco puro (`#FFF`) nem preto puro (`#000`). Branco = `papel`, preto = `noite`/`tinta`.
6. Fotos coloridas de pessoas podem aparecer, mas o padrão é **P&B levemente esverdeado/sépia**, ganhando cor no destaque.

---

## 3. Tipografia

| Papel | Fonte | Peso / estilo | Uso |
|---|---|---|---|
| **Display** | **Playfair Display** | 700–800, CAIXA ALTA nas frases de impacto | Títulos monumentais, números, nomes |
| **Texto/UI** | **Inter** | 400–600 | Parágrafos, botões, rótulos |
| **Voz humana** | **Cormorant Garamond** *Itálico* | 500–600 | Citações, cartas, assinaturas, frases de efeito secundárias |

### Hierarquia (site, em `rem`; nas artes, escale proporcionalmente)
- **Mega** (heros): `clamp(3.4rem, 15.5vw, 13.5rem)`, peso 800, entrelinha 0.86, tracking −0.03em, CAIXA ALTA.
- **Hero**: até 7.5rem, peso 750, entrelinha 0.93.
- **H1**: até 5rem · **H2**: até 3.4rem · **H3**: até 1.75rem.
- **Rótulo de catálogo** (*eyebrow*): Inter 0.72rem, peso 550, **CAIXA ALTA**, tracking **0.28em**, cor ouro. Ex.: `◆ GESTÃO ── ◆ ──`.
- **Citação**: Cormorant itálico 1.6–2.75rem.

### Regras
- **Contraste de escala é o que dá ar editorial**: título gigante + texto pequeno e preciso. Evite tudo em tamanho médio.
- Destaque **uma** palavra por frase: em **ouro + itálico** ou com a **pincelada dourada** por baixo (ex.: "A medicina também se faz **FORA** da sala de aula").
- Números grandes (anos, contagem, "100 dias") em Playfair, ouro, às vezes **vazados** (só contorno de 1–1,5 px).
- Nunca mais de 3 famílias. Nunca fontes "divertidas", script de casamento ou sem-serifa geométrica da moda.

---

## 4. Ornamentos e elementos gráficos

| Elemento | Especificação |
|---|---|
| **Fio com losango** | `────── ◆ ──────`: linhas de 1 px em ouro 60–70%, losango de 7–9 px. Cabeçalhos e rodapés |
| **Pincelada** | Curva dourada orgânica (traço de 3–9 px com um segundo traço fino abaixo, 60% de opacidade). Sob a palavra-chave |
| **Losango** | Quadrado girado 45°, ouro. Marcador de lista, separador, ponto da linha do tempo |
| **Ícone em anel** | Ícone de traço fino (1,15–1,3 px, estilo Lucide) dentro de círculo com anel duplo (externo 50%, interno 15%) |
| **Medalhão** | Logo circular (vetor). Selo, favicon, centro de composições, marca d'água gigante a 4–5% de opacidade |
| **Selo de cera** | Disco verde irregular com o medalhão em baixo-relevo. Ouvidoria, cartas, "lacrado" |
| **Folhagem em gravura** | Folhas botânicas vetorizadas, em ouro a 8–22% de opacidade, saindo dos cantos. Nunca no centro, nunca sobre texto |
| **Granulação** | Ruído fino de papel/filme a 7–16%. Dá matéria à cor chapada |
| **Vinheta** | Escurecimento radial das bordas nas cenas escuras |
| **Poeira dourada** | Partículas de luz dourada flutuando (só em cenas escuras e épicas) |
| **Feixes de luz** | Faixas diagonais muito suaves de luz quente (abertura e hero) |
| **Texto vazado** | Letras só com contorno ouro (1–1,5 px), para faixas monumentais e números |

### Assets (já prontos no repositório)
- `src/components/brand/logoPaths.ts`: **MEDAL** (medalhão) e **FIGURE** (retrato com serpente), em vetor e **voltados para a direita**.
- `src/components/brand/leafPath.ts`: **LEAF** (folhagem em gravura).
- `src/components/brand/Envelope.tsx`: envelope com selo de cera (desenho próprio).
- `public/favicon.svg`, `public/icon-512.png`, `public/og.png` (prévia 1200×630).
- `src/assets/img/`: gravuras da campanha (retrato com serpente, retrato no laboratório, prédio do Butantan, serpente).

> **O logo olha para a DIREITA.** Não use as versões antigas voltadas para a esquerda.

---

## 5. Imagem

- **Linguagem**: gravura, água-forte, fotografia do início do século XX, sépia/verde. Pense em pranchas de museu e arquivos do Butantan.
- **Tratamento**: P&B ou sépia leve (`sepia 15–35%`), contraste suave, sombras verdes.
- **Molduras**: arco (instituição, história) ou círculo (pessoas), sempre com **fio dourado afastado 8–14 px** da imagem (às vezes duplo).
- **Revelação**: imagens surgem por máscara (de baixo para cima, ou abrindo em arco), nunca por "pop".
- **Fotos da diretoria**: mesmo enquadramento (peito para cima, rosto centralizado, fundo neutro), recorte circular, P&B levemente esverdeado.
- **Evitar**: fotos de banco genéricas, emojis gráficos, 3D brilhante, ilustração flat colorida, clip-art médico (cruz vermelha, coração de desenho animado), imagens da instituição sem autorização.

### Prompt-base para gerar novas imagens com IA (mantém o estilo)
```
Gravura científica do século XIX em água-forte, linhas finas e hachuras,
paleta verde-escuro #12241C e #1E3A2F com detalhes em dourado envelhecido #B08D57
e papel off-white #F4F0E6, iluminação de museu, granulação de papel antigo,
composição elegante com muito espaço vazio, folhagem botânica nos cantos,
[ASSUNTO], sem texto, sem marcas d'água, estética de prancha de museu, épico e sóbrio.
```
Assuntos que combinam: microscópio de latão, frascos de laboratório, serpente jararaca em gravura, jaleco pendurado, estetoscópio antigo, livro aberto, prédio com torres e arcos, mãos segurando um frasco, mapa antigo do interior paulista.

---

## 6. Composição e layout

- **Grid editorial assimétrico** (12 colunas no site; nas artes, terços e áureo). Textos começam fora do centro; imagens "sangram" da margem.
- **Espaço vazio é luxo**: margens generosas (no post de 1080 px, mínimo de 80–96 px de margem).
- **Cantos**: retos ou quase (2–4 px). Arredondamento só no arco e nos círculos. **Nada de cartões muito arredondados** (cara de app/painel).
- **Sombras**: quase nenhuma. Profundidade por camadas de tom (noite atrás, papel na frente).
- **Bordas**: 1 px em ouro a 20–50%.
- **Rodapé-assinatura** em todas as peças: `GESTÃO DR. VITAL BRAZIL · CA MEDICINA FAPI` (ou o `@chapavitalbrazil`).

---

## 7. Movimento (site, reels, stories animados)

| Tipo | Curva / física | Duração |
|---|---|---|
| Revelação | `cubic-bezier(0.16, 1, 0.3, 1)` (desaceleração longa) | 0,7–1,1 s |
| Cortina / troca de cena | `cubic-bezier(0.76, 0, 0.24, 1)` | 0,6–1 s |
| Interface (botões, menus) | Mola rígida e amortecida, **sem quique** | ~0,3 s |
| Layout (elemento que viaja e cresce) | Mola com massa (`stiffness 170, damping 26`) | ~0,8 s |

**Princípios**
1. Texto sobe **de dentro de uma fenda** (máscara), palavra por palavra ou letra por letra.
2. Fios de ouro **se desenham** (da esquerda para a direita; a serpente segue o caminho).
3. **Continuidade espacial**: o que você toca cresce e vira o próximo conteúdo (card → página, retrato → dossiê).
4. Saída sempre mais rápida que a entrada.
5. Só `transform`, `opacity` e máscara (60 fps). Nada de desfoque animado.
6. Sempre respeitar "reduzir movimento".

**Momentos-assinatura do site** (referência para reels):
- Abertura: medalhão gravado em traço dourado, contador 1865→2026, fio corta a tela, portas se abrem.
- "CHEGAMOS." sobe letra por letra; pincelada se desenha; brilho de folha de ouro percorre o título.
- Seções claras entram pelo **arco do Butantan** que se abre até a tela cheia.
- Cena do Vital Brazil: tela trava, gravura gigante cresce ao fundo, capítulos com o ano vazado em ouro.
- Faixas monumentais "CIÊNCIA ◆ CORAGEM ◆ SERVIÇO" em letras vazadas, aceleram com a rolagem.

---

## 8. Formatos para Instagram (e como aplicar)

| Formato | Tamanho | Zona segura |
|---|---|---|
| Feed retrato (preferido) | **1080 × 1350** (4:5) | Margem de 80 px; texto importante fora dos 60 px inferiores |
| Feed quadrado | 1080 × 1080 | Margem de 80 px |
| Story / Reels | **1080 × 1920** (9:16) | Conteúdo importante entre **y = 260 e y = 1660** (topo e base ficam sob a interface do app) |
| Capa de Reels no grid | 1080 × 1920, mas o centro **1080 × 1350** precisa funcionar sozinho | |

### Três templates-base (do guia original, refinados)

**A. Frase de impacto** (fundo escuro)
- Fundo `noite` com gradiente radial sutil + granulação + folhagem em um canto.
- Cabeçalho: `GESTÃO` (rótulo ouro) / `DR. VITAL BRAZIL` (Playfair 800) / `CA MEDICINA FAPI` + fio com losango.
- Frase em Playfair 800, CAIXA ALTA, `papel`, ocupando 60–70% da largura, com **uma** palavra em ouro + pincelada.
- Rodapé: fio + `@chapavitalbrazil`.

**B. Proposta** (fundo claro)
- Fundo `papel` + granulação + folhagem verde a 8–12%.
- Ícone do eixo em anel no topo · rótulo `EIXO 0X` (ouro-escuro) · título em `verde`.
- Até 3 tópicos curtos com losango dourado.
- Rodapé-assinatura.

**C. Carrossel**
- **Capa** escura com pergunta/provocação (template A).
- **Miolo** claro (template B), um assunto por slide, numeração `01 / 06` discreta.
- **Último slide** sempre com o slogan: *"Mais que uma gestão, um compromisso com a nossa formação."* + `@chapavitalbrazil`.

**Ritmo do feed**: alterne escuro e claro (xadrez).

### Gerador pronto
`src/lib/story.ts` desenha stories 1080×1920 com as fontes e os vetores oficiais (`frase`, `apoio`, `votar`, `proposta`, `membro`). Use-o como referência exata de proporções, ou gere imagens direto pela página `/compartilhar` do site.

### Ícones por eixo (Lucide, traço 1,15–1,3)
| Eixo | Ícone |
|---|---|
| 01 Ensino, Pesquisa e Carreira | `Microscope` |
| 02 Internato e Estágios | `Stethoscope` |
| 03 Cuidado com o Estudante | `HeartHandshake` |
| 04 Transparência e Representação | `Scale` |
| 05 Integração, Benefícios e Comunidade | `UsersRound` |

Princípios: Presença `MapPin` · Transparência `Eye` · Representação `Megaphone` · Cuidado `HandHeart` · União `Link2`.

---

## 9. Faça / Não faça

**Faça**
- Muito espaço vazio, um único ponto focal, uma palavra destacada.
- Ouro só em detalhes finos. Escala dramática.
- Gravura, papel, arco, círculo, losango, fio.
- Revise a ortografia e confira os fatos (veja `MARKETING.md` › Fatos).

**Não faça**
- Gradientes genéricos, neon, glassmorphism, sombras pesadas, cantos muito redondos.
- Emojis como elemento gráfico (no texto da legenda, com moderação, pode).
- Mais de 2 tamanhos de destaque na mesma peça.
- Ouro em texto pequeno; branco ou preto puros.
- Mencionar, comparar ou atacar **outras chapas** ou a **instituição**.
- Atribuir a Vital Brazil frases sem fonte (ver `MARKETING.md`).
- Usar o logo voltado para a esquerda.

---

## 10. Checklist antes de publicar qualquer peça

- [ ] Paleta só com os tokens acima; ouro ≤ 5%.
- [ ] Playfair (títulos) + Inter (texto) + Cormorant itálico (voz). Nada além.
- [ ] Uma palavra destacada (ouro/pincelada), não três.
- [ ] Assinatura/rodapé presente.
- [ ] Contraste legível no celular, com brilho baixo.
- [ ] Conteúdo dentro da zona segura do formato.
- [ ] Fatos e nomes conferidos com `src/data/*`.
- [ ] Tom propositivo, sem citar outras chapas.
- [ ] Alterna com o post anterior (escuro ↔ claro).

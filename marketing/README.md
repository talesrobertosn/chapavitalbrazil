# Marketing · artes do Instagram

Cada post tem uma pasta em `marketing/instagram/NN-nome/` com:
- `gerar.mjs`: o roteiro visual em código (gera os PNGs);
- os PNGs prontos (`carrossel-NN.png`, `story-NN-*.png`);
- `LEGENDA.md`: legenda pronta, textos dos stories e texto alternativo.

## Kit de marca
`marketing/ferramentas/marca.mjs` traz fontes oficiais embutidas, paleta, medalhão/figura/folhagem vetorizados, granulação, poeira dourada, fio com losango, pincelada e o `renderizar()` (Chromium via Playwright). `icones.mjs` exporta os ícones Lucide em traço fino.

Siga sempre [`docs/DIRECAO-DE-ARTE.md`](../docs/DIRECAO-DE-ARTE.md) e [`docs/MARKETING.md`](../docs/MARKETING.md).

## Rodar
```bash
npm install                     # dependências do site (fontes, React para os ícones)
npm i --no-save playwright      # só na sua máquina, para renderizar
npx playwright install chromium
node marketing/instagram/01-apresentacao/gerar.mjs
```

## Técnica do carrossel panorâmico
Monte uma única arte com largura `1080 × N` e recorte em N slides (`recortes` no `renderizar`). Elementos que cruzam a fronteira (fio de ouro, molduras em arco) criam continuidade ao arrastar.

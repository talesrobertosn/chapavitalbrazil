# Post 02 · Carta ao calouro ("Querido calouro,")

**Formato**: carrossel de feed (6 slides, 1080×1350) + 3 stories (1080×1920).
**Dia do calendário**: 14 (formato "Carta"). **Ritmo do feed**: post predominantemente **claro** (capa escura, miolo em papel marfim, fecho escuro).
**Ordem de publicação**: carrossel no feed → story 01 (figurinha de link para `/calouro`) → story 02 → story 03 (enquete).

## Legenda do carrossel (copiar e colar)

```
Querido calouro, ✉️

Você chegou. E a gente sabe: o começo pode assustar. Prédios novos, rostos novos e uma rotina que ninguém explica direito.

Por isso queremos te dizer logo no primeiro dia: ninguém deveria se sentir sozinho no 1º período.

O que está escrito nesta carta está no nosso programa:
◆ Recepção dos calouros: semana de acolhimento com tour pelo campus, apresentação das ligas e do CA, e apadrinhamento por veteranos.
◆ Trote solidário: recepção sem humilhação, regras claras e tolerância zero a abusos.
◆ Programa de mentoria com quem já passou por onde você está passando.
◆ Banco de materiais de estudo organizado por período.
◆ Rede de apoio entre alunos, para ouvir quando a pressão apertar.

A medicina também se faz fora da sala de aula. E ela começa com cuidado: com você.

💌 Manda pra um calouro. A carta inteira está no link da bio.

Gestão Dr. Vital Brazil · CA Medicina FAPI

#GestãoVitalBrazil #CAMedFAPI #MedicinaFAPI #UmaMedicinaMaisHumana #EstudanteDeMedicina
```

## Textos para os stories

- **Story 01 (Querido calouro,)**: figurinha de **link** para a página `/calouro` do site, logo abaixo de "Lê a carta inteira no link ↓". Texto do link: `Ler a carta`.
- **Story 02 (A medicina também se faz fora da sala de aula.)**: figurinha de **link** para `/calouro` ou repost do carrossel. Texto: `Manda pra um calouro`.
- **Story 03 (enquete)**: cole a figurinha de **enquete** sobre as quatro opções desenhadas, com as mesmas respostas: *A rotina nova · Conhecer gente · Me achar no campus · Nada, cheguei voando*. No dia seguinte, repostar o resultado com a frase "A gente ouviu."

## Texto alternativo (acessibilidade)

1. Capa verde-escura com "Querido calouro," em caligrafia dourada e um envelope de papel lacrado com o medalhão da chapa.
2. Página de carta em papel marfim, com borda dupla: saudação "Querido calouro," e os três primeiros parágrafos da carta.
3. Segunda página da carta: mentoria, materiais de estudo, cuidado, "Seja muito bem-vindo", assinatura da Gestão Dr. Vital Brazil e lacre dourado.
4. Prancha científica "O que está escrito nesta carta": quatro figuras em traço fino (flor, jaleco, lamparina e coração) com as propostas Recepção dos calouros, Trote solidário, Programa de mentoria e Rede de apoio entre alunos.
5. Frase em letras grandes sobre verde-musgo: "Ninguém deveria se sentir sozinho no 1º período."
6. Fecho com o medalhão, "Gestão Dr. Vital Brazil", o slogan e @chapavitalbrazil.

## Como foi feito
`gerar.mjs` usa os templates `cartaCapa`, `carta`, `prancha`, `frase` e `fecho` e os assets `envelope`, `lacre`, `flor`, `jaleco`, `lampada`, `coracao`. O texto da carta é o mesmo de `src/pages/Calouro.tsx`; as propostas são lidas de `src/data/programa.ts` pelo título.

# Post 03 · Dia dos Professores (15 de outubro)

**Formato**: carrossel de feed (5 slides, 1080×1350) + 2 stories (1080×1920).
**Ritmo do feed**: post **escuro** com miolo alternado (capa floresta → citação marfim → lista verde → frase branco → fecho). O post anterior (carta) foi claro.
**Ordem de publicação**: carrossel no feed pela manhã → story 01 → story 02 (figurinha de pergunta) → repostar as melhores respostas à tarde.

## Legenda do carrossel (copiar e colar)

```
Feliz Dia dos Professores. ◆

Hoje é a data. Pra gente, é todo dia.

Ninguém se forma sozinho. Cada diagnóstico que um dia vamos fazer passou antes pelas mãos de quem nos ensinou: na sala de aula, no laboratório, no ambulatório e no plantão.

Valorizar quem ensina está escrito no nosso programa:
◆ Ponte entre alunos e orientadores: lista de professores com linhas de pesquisa abertas a estudantes.
◆ Encontros com especialistas sobre a rotina e o caminho de cada especialidade.
◆ Transição entre os ciclos, com internos e preceptores.
◆ Cursos práticos todo semestre, em parceria com ligas, professores e instituições.
◆ Campanhas de respeito nas relações entre alunos, professores e preceptores.

Valorizar quem ensina é cuidar de quem aprende.

🍎 Marca um professor que marcou você.

Gestão Dr. Vital Brazil · CA Medicina FAPI

#GestãoVitalBrazil #CAMedFAPI #MedicinaFAPI #UmaMedicinaMaisHumana #EstudanteDeMedicina #DiaDosProfessores
```

## Textos para os stories

- **Story 01 (coroa de louros, Feliz Dia dos Professores)**: figurinha de **menção** livre ("Marca quem te ensinou") ou repost do carrossel. Opcional: figurinha de música.
- **Story 02 (Qual professor marcou a sua formação?)**: figurinha de **pergunta** colada na área vazia abaixo do título. Repostar as respostas ao longo do dia, sempre com o nome do professor e sem expor quem respondeu, a menos que a pessoa autorize.

## Texto alternativo (acessibilidade)

1. Capa verde-escura com feixes de luz e uma coroa de louros dourada emoldurando "15 de outubro · Feliz Dia dos Professores" e o medalhão da chapa. Abaixo: "Hoje é a data. Pra gente, é todo dia."
2. Página marfim com aspas douradas e um buquê em traço fino no canto: "Ninguém se forma sozinho. Cada diagnóstico que um dia vamos fazer passou antes pelas mãos de quem nos ensinou."
3. Lista "Mais perto de quem ensina" com cinco propostas do programa numeradas em dourado.
4. Frase em verde sobre branco, com flores em traço fino no alto: "Valorizar quem ensina é cuidar de quem aprende."
5. Fecho com o medalhão, "Gestão Dr. Vital Brazil", o slogan e @chapavitalbrazil.

## Como foi feito
`gerar.mjs` usa `homenagem` (coroa de louros), `citacao` com buquê, `lista`, `frase`, `fecho`, `storyHomenagem` e `storyQuiz`. As cinco propostas são lidas de `src/data/programa.ts` pelo título.

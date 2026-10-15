# Gestão Dr. Vital Brazil · CA Medicina FAPI

> *Mais que uma gestão, um compromisso com a nossa formação.*

Site oficial da chapa **Gestão Dr. Vital Brazil** ao Centro Acadêmico de Medicina da FAPI.
Instagram: [@chapavitalbrazil](https://www.instagram.com/chapavitalbrazil/)

- **Direção de arte**: [`docs/DIRECAO-DE-ARTE.md`](docs/DIRECAO-DE-ARTE.md)
- **Marketing e conteúdo**: [`docs/MARKETING.md`](docs/MARKETING.md)
- **Instruções para agentes de IA**: [`AGENTS.md`](AGENTS.md)
- **Pendências e ideias**: [`docs/IDEIAS.md`](docs/IDEIAS.md)

---

## Tarefas do dia a dia (sem precisar programar)

Edite os arquivos direto no GitHub (ícone de lápis ✏️) e faça o *commit*: o site publica sozinho em 1–2 minutos.

| Quero… | Arquivo | O que mudar |
|---|---|---|
| Mudar a **data da eleição** | `src/config/site.ts` | `eleicao.data: 'AAAA-MM-DD'` e `confirmada: true` |
| Informar **horário, local, quem vota** | `src/config/site.ts` | `eleicao.horario`, `eleicao.local`, `eleicao.quemVota` |
| Pôr o **formulário da Ouvidoria** | `src/config/site.ts` | `ouvidoriaUrl` e `ouvidoriaPrazoDias` |
| **Adicionar a foto** de um membro | `src/assets/diretoria/` | Envie `<slug>.jpg` (o slug está em `src/data/diretoria.ts`) |
| Ajustar o **enquadramento** da foto | `src/data/diretoria.ts` | `foco: '50% 30%'` e/ou `zoom: 1.2` no membro |
| Pôr o **depoimento** de um membro | `src/data/diretoria.ts` | `porque: 'texto da pessoa'` |
| Editar **propostas** | `src/data/programa.ts` | Textos dos eixos e propostas |
| Editar o **diário** | `src/data/diario.ts` | Frases e temas dos 20 dias |
| Editar **frases dos Stories** | `src/data/frases.ts` | Texto e palavra destacada |

> O site muda de "roupa" sozinho conforme a data: **campanha → véspera → dia da eleição → encerrada**.
> Para pré-visualizar: adicione `?fase=vespera` (ou `eleicao`, `encerrada`) ao endereço.

---

## Publicar no GitHub Pages (uma vez só)

1. No GitHub, abra o repositório → **Settings** → **Pages**.
2. Em **Build and deployment** › **Source**, escolha **GitHub Actions**.
3. Abra a aba **Actions**, entre em **"Publicar site (GitHub Pages)"** e clique em **Run workflow** (ou faça qualquer commit).
4. Em 1–2 minutos o site fica no ar em: **https://talesrobertosn.github.io/chapavitalbrazil/**

O workflow está em `.github/workflows/deploy.yml` e roda a cada envio para o branch `main` ou para o branch atual.

## Domínio próprio (`chapavitalbrazil.com.br`)

Quando quiser ativar:

1. **No registro do domínio (Registro.br)**, em DNS, crie:
   - 4 registros **A** para `@` apontando para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - 1 registro **CNAME** para `www` apontando para `talesrobertosn.github.io`
2. **No repositório**:
   - crie o arquivo `public/CNAME` contendo só `chapavitalbrazil.com.br`;
   - em `.github/workflows/deploy.yml`, troque `BASE_PATH: /` e `SITE_URL: https://chapavitalbrazil.com.br`;
   - em `src/config/site.ts`, troque `url: 'https://chapavitalbrazil.com.br'`.
3. **Settings → Pages → Custom domain**: digite `chapavitalbrazil.com.br`, salve e, depois que o DNS propagar, marque **Enforce HTTPS**.

## Google (Search Console)

O site já gera **sitemap.xml**, **robots.txt**, títulos e descrições por página, dados estruturados (JSON-LD) e conteúdo em HTML puro para robôs.

1. Acesse [search.google.com/search-console](https://search.google.com/search-console) e adicione a propriedade:
   - **com domínio próprio**: use o tipo **Domínio** e verifique pelo **registro TXT** no DNS (o mais robusto);
   - **sem domínio**: use **Prefixo do URL** com `https://talesrobertosn.github.io/chapavitalbrazil/` e escolha o método **Tag HTML**. Copie só o código do `content="…"` e cole em `googleVerificacao` no `src/config/site.ts`. Faça o commit, espere publicar e clique em **Verificar**.
2. Em **Sitemaps**, envie: `sitemap.xml` (endereço completo: `…/sitemap.xml`).
3. Em **Inspeção de URL**, peça a indexação da página inicial, de `/programa/` e de `/diretoria/`.

> Dica: links no Instagram (bio), no WhatsApp e nos grupos da turma ajudam o Google a descobrir o site mais rápido.

---

## Para quem programa

```bash
npm install
npm run dev        # http://localhost:5173/chapavitalbrazil/
npm run build      # typecheck + build + pré-renderização (dist/)
npm run preview    # testa o build de produção
```

**Stack**: React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion · Lenis · Lucide. Imagens otimizadas por `vite-imagetools`.

**Estrutura**
```
src/
  config/        site.ts (data, links, e-mail, Google) · nav.ts
  data/          programa · diretoria · diario · frases · vitalBrazil  ← conteúdo oficial
  components/
    brand/       logo vetorizado (MEDAL, FIGURE), folhagem, envelope, ícones
    fx/          poeira dourada, feixes de luz, arco do Butantan, faixas monumentais, cursor
    layout/      cabeçalho, menu, rodapé, transições de página, abertura, rolagem suave
    ui/          botões, revelações, retratos, contagem, cards
    programa/    cards de eixo, página do eixo (sobreposição), propostas
    diretoria/   dossiê do membro (sobreposição)
  sections/home/ seções da página inicial
  pages/         páginas
  lib/           datas, fases da eleição, movimento, compartilhamento, gerador de stories
build/prerender.ts   metadados por rota, sitemap, robots, 404
```

**Princípios técnicos**: celular primeiro; animações só com `transform`/`opacity`/máscara; `prefers-reduced-motion` respeitado; rolagem suave só com mouse; páginas carregadas sob demanda; sem cookies nem rastreadores.

---

<sub>Gestão Dr. Vital Brazil · CA Medicina FAPI · De estudantes para estudantes. · Site criado por [Tales](https://ortoquestoes.com.br/).</sub>

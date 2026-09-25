# Design — Unipar In Company

Fonte de verdade das decisões visuais deste projeto (`unipar-site`). Este documento descreve as decisões **observáveis no site atual** (HTML/CSS/JS estáticos em `index.html` e `css/styles.css`).

## Referência

- **Oura (referência de direção) — A DEFINIR:** a Oura foi citada como referência de *direção* (clima, hierarquia, minimalismo premium), mas **nunca** deve ser replicada. O print/captura da página da Oura e o arquivo com o link da página da Oura **não foram encontrados** no projeto nesta etapa. Enquanto a referência não for fornecida, a base de decisões é o próprio site atual. Quando a referência for entregue, deve servir apenas para ajustar direção — **nunca** para copiar textos, imagens, componentes ou identidade literal.

## Direção Visual

Site institucional **premium, limpo e sóbrio**, com forte presença do vermelho institucional Unipar sobre fundos neutros. Comunica solidez, educação e desenvolvimento. Moderno e espaçoso: cantos arredondados médios, poucos detalhes geométricos em vermelho e micro-animações discretas de entrada (`fade-up`). Leitura vertical por seções bem definidas, alternando fundo branco e cinza clarinho.

## Princípios de Design

1. **Neutralidade como base, vermelho como identidade** — fundo branco/neutro no corpo; vermelho reservado para header, CTA, badges, destaques e microdetalhes.
2. **Hierarquia clara** — títulos grandes (Manrope extrabold) vs. corpo (Inter), com `letter-spacing` apertado nos títulos e `line-height` folgado no texto.
3. **Espaçamento generoso** — seções com `80px/112px` verticais; respiro amplo entre blocos.
4. **Conteúdo primeiro** — textos longos e institucionais bem legíveis; fotografias reais (turmas, unidades, eventos) e logos de parceiros em destaque. **Exceção (2026-09-25, com confirmação do usuário):** não existe mais a seção de equipe no site — ver "Seção de equipe (removida)" em Componentes.
5. **Consistência** — mesmos componentes/tokens em todas as seções (cards arredondados, badges, botões `border-radius: 9999px`).
6. **Acessibilidade e movimento** — animações sutis, respeitam `prefers-reduced-motion`, foco visível (`:focus-visible`) e `aria-*`.
7. **Português do Brasil (pt-BR)** como idioma único do conteúdo.

## Paleta

Sistema em `css/styles.css` via variáveis `oklch`. Vermelho institucional derivado de **Unipar `#c8102e`** (`--primary: oklch(0.523 0.214 26)`).

- **Fundo (`--background`):** branco `oklch(1 0 0)`.
- **Superfícies/cards (`--card`, `--popover`):** branco.
- **Secundário/muted (`--secondary`, `--muted`):** cinza-rosado muito claro `oklch(0.968 …)` — usado como fundo alternado de seções (Solutions, Youth, Units). *(Team foi removido em 2026-09-25.)*
- **Texto principal (`--foreground`):** quase preto de tom quente `oklch(0.19 0.01 20)`.
- **Texto secundário (`--muted-foreground`):** cinza médio `oklch(0.5 0.015 22)`.
- **Destaque/primária (`--primary`):** vermelho Unipar `oklch(0.523 0.214 26)`.
- **Vermelhos derivados:** `--red-50` (chips de ícone/cards `oklch(0.971 0.014 17)`), `--red-500` (`oklch(0.577 0.222 25)`), `--red-700` (CTA escuro e hover `oklch(0.457 0.19 27)`), `--red-100` (texto sobre vermelho), `--red-900`.
- **Bordas (`--border`):** cinza claro `oklch(0.912 0.006 20)`.
- **Texto sobre vermelho:** branco (`--primary-foreground`) e `--red-100`.
- **Destructive/erro:** `oklch(0.577 0.245 27.325)`.
- **Raio base:** `--radius: 0.75rem`; cards e seções usam `12px–24px` de borda arredondada (`rounded-2xl` conversão de 16px, `border-radius: 16px`/`24px`).

**Regra:** não usar cores fora deste sistema sem registrar em `@memoria.md`. Pares de contraste garantidos: texto principal sobre branco e texto branco sobre vermelho.

## Tipografia

Tres famílias do Google Fonts (via `<link>` no `<head>`):

- **Títulos — Manrope** (weights 400–800): usada em `h1–h6` e títulos de card. Pesos principais: extrabold (800) e bold (700). `letter-spacing: -0.02em/-0.025em`, `line-height: 1.03–1.08`.
- **Corpo — Inter** (weights 400–700): textos, labels e `body` base. Regular/medium, `line-height: 1.5–1.625`.

Hierarquia observada em `css/styles.css`:
- **Hero H1:** `font-size: clamp(2rem, 7vw, 4.2rem)`, peso 800, `line-height: 1.03`.
- **Título de seção (`.section-title__h2`):** `font-size: clamp(1.7rem, 5vw, 2.9rem)`, 800, `letter-spacing: -0.025em`, `text-wrap: balance`.
- **Subtítulo de seção:** textos `h3` em `1.25rem–1.5rem`, 700/800.
- **Corpo/longo:** `1rem–1.125rem`, `line-height: 1.625`, `text-wrap: pretty`.
- **Corpo de card:** `0.875rem`, `line-height: 1.625`, `--muted-foreground`.
- **Eyebrow/labels (`.section-title__label`):** `0.75rem`, 700, `uppercase`, `letter-spacing: 0.18em`, cor `--primary`, com traço horizontal de 32px à esquerda.
- **Uppercase forte** em marcas-âncora (Educação • Evolução • Legado) e labels de pilares.

## Layout

- **Container máximo:** `1440px` (`.container-1440`); conteúdo de texto usa até `1024px` (`.container-5xl`) ou `64rem` em blocos de projeto.
- **Padding horizontal:** `20px` (mobile) / `32px` (≥768px).
- **Ritmo vertical das seções:** `.section-py` = `80px`/`112px` (≥1024px); seções alternam `--background` (branco) e `--secondary` (cinza claro).
- **Grids:** CSS Grid responsivo — padrões `1col → 2col (640px) → 3col (1024px)` (soluções, projetos, unidades), `4col (1024px)` parceiros, `2col (1024px)` para texto+mídia (hero, split). *(O grid `2col (768px)` da equipe foi removido em 2026-09-25 com a seção.)*
- **Hero:** fundo **`#FF0000`** (vermelho puro da logo `hero-in-company-logo.jpg`, confirmado por análise de pixels: 88% da imagem) com 2 radiais sutis de profundidade (branco 6% topo-direita, preto 18% base-esquerda); min-height 90vh desktop; grid `1fr 1.05fr` (≥1024px) empilhado mobile; título **Manrope** 800 (`clamp(2rem,7vw,4.2rem)`) branco com palavra `.primary` **branca 800** (visível sobre vermelho); subtítulo branco 86% opacidade; botões primário branco+vermelho, outline branco-transparente (escopados `.hero__actions`); frame sem borda/fundo branco — imagem `contain` integrada diretamente ao fundo vermelho; blob branco 7% brilho 420px. Header fixo vermelho `--primary` integra-se naturalmente.
- **Header fixo:** fundo `--primary` (vermelho), reduz altura do logo ao rolar (`224×48 → 192×40`), sombra ao rolar; menu mobile fullscreen sobre vermelho.
- **Cards:** `border: 1px solid var(--border)`, fundo branco, hover `translateY(-4px)` + sombra.
- **Alinhamento:** títulos à esquerda na maioria das seções; a seção de parceiros (vitrine) centraliza título (`section-title--center`).
- **Detalhes geométricos:** pequenos — barra de 4px (`--primary`) acima de títulos de card de solução, números cadenciais em valores, timeline com linha de 1px e nós vermelhos redondos, badges `border-radius: 9999px`.
- **Fixos sobrepostos:** botão "voltar ao topo" (`.back-to-top`) canto inferior direito.

## Espaçamento

- **Seções:** `padding: 80px 0` (mobile) → `112px 0` (desktop).
- **Entre título de seção e grelha:** `48px–56px`.
- **Cards internamente:** `24px–32px`.
- **Gaps de grid:** `16px–24px` (cards), `40px–64px` (blocos de texto+mídia).
- **Header:** logo `16px` verticais → `10px` ao rolar.
- **CTA seção:** `64px`/`80px` verticais.
- Padrão de respiro: títulos `gap 16px`, blocos de texto `24px`.

## Componentes

- **Botões principais (`.btn-primary`, `.form-submit`, `.contact__whatsapp`):** `border-radius: 9999px`, fundo `--primary`, texto branco, peso 600, hover `--red-700`, seta inline (SVG).
- **Botões secundários (`.btn-outline`, `.header-cta`):** `border-radius: 9999px`, `border: 1px solid var(--border)`, hover `border/color --primary`.
- **Botões sobre vermelho (`.cta__btn`):** fundo branco, texto `--red-700`, hover `scale(1.02)`.
- **`.section-title`:** eyelash (traço 32px) + H2 + subtítulo opcional; variante `--center`.
- **Reveal:** animação `fade-up` (0.6s, `cubic-bezier(0.22,1,0.36,1)`) com `animation-delay` em ms para escalonar (`.reveal` → `.is-visible`, via IntersectionObserver).
- **Entrance screen (`.entrance`):** overlay fixed `--primary` com logo e CTA, exibida 1x por sessão (`sessionStorage`), sai com `fade-out`.
- **Cards de projeto (`.project-card`):** imagem `aspect-ratio 16/10`, badge de categoria `--primary`, título Manrope 700, organização em `--primary`, "Conhecer projeto" com seta que desliza no hover.
- **Seção de equipe (`.team`, `.team-card`) — REMOVIDA (2026-09-25, com confirmação do usuário):** a seção "Equipe Unipar In Company" foi **eliminada por completo** do site. Não é ocultação (`display:none`/`visibility`/`opacity`) nem remoção parcial: o `<section id="equipe">` saiu do `site.html` junto com o comentário `<!-- TEAM -->`, o `.container-1440`, o wrapper `gap: 48px`, o bloco `.section-title` (label "Equipe Unipar In Company", H2 "Conheça nossa equipe", parágrafo de descrição), o `.team__grid`, os 2 `.team-card` (Professor Celso Ferrari Júnior e Kayke Pasquim Ferrari) com nome, cargo, Instagram, LinkedIn e WhatsApp, além do bloco `.team-card__img` e das 6 réguas CSS exclusivas (`.team`, `.team__grid` + media query 768px, `.team-card`, `.team-card:hover`, `.team-card__body` + media query, `.team-card__head`, `.team-card__name`, `.team-card__role` + media query, `.team-card__links`, `.team-card__link`, `.team-card__link--medium/--phone`, `:hover`, `.soc`, `.word`). **Não havia item de navegação** para `#equipe` (nav desktop, menu mobile e footer nunca tiveram "Equipe"), portanto nenhum link foi quebrado. Os arquivos `img/equipe-celso.jpg` e `img/equipe-kayke.jpg` foram **mantidos no repositório** (sem referência, órfãos). A classe `.soc` e os ícones SVG de WhatsApp eram usados **exclusivamente** aqui e saíram junto. Ordem das seções na home: `#inicio` → `#sobre` → `#estrategia` → `#solucoes` → `#projetos` → `#feedbacks-projetos` → `#parceiros` → `#unidades` → `#contato`.
- **Cards de valores (`.value-card`):** ícone em chip `--red-50` (vira `--primary` no hover), numeração `01–07`.
- **Timeline (`.timeline`) do programa Jovens Potenciais:** linha vertical/central, nós redondos, ano em pill `--primary`, conteúdo alterna lado.
- **Cards de parceiros (`.partner-link`):** logo em área branca `80px` `object-contain`, nome, descrição, CTA; grid 4 col (desktop).
- **Mapa das unidades (`.units__map-wrap`, seção "Presença e unidades"):** o mapa fica **à esquerda** dentro de `.units__layout` (card `.units__map-card`, grid `1fr → 1.4fr 1fr` em ≥1024px, gap 28–40px). SVG gerado por JS a partir de `data/parana.geojson`: estado `fill --red-50` + `stroke --primary` 1.5; marcadores mínimos = halo r10 (`--primary`, `opacity .16`, ativo/hover r12) + pino r5 (`--primary`, traço branco 2); **tooltip** (retângulo 108×28 rx8 + texto) só no hover/:focus/ativo — **sem labels sempre visíveis**; nota abaixo do mapa: "Localização aproximada das unidades no estado do Paraná. Endereços disponibilizados sob consulta."
- **Lista de cidades (`.units__cities-card`, lado direito do mapa):** `.units__cities` = lista vertical de **7 botões `.units__city-item`** com **somente os nomes** (Umuarama, Cianorte, Paranavaí, Toledo, Cascavel, Guaíra, Francisco Beltrão — uma vez cada, ordem fixa). Manrope 600, hover fundo `--red-50`, item ativo com borda esquerda `--primary` + cor `--primary` + peso 700. **Sem fotos, endereços, cards ou CTA na lateral.**
- **Filtros por cidade (`.units__filters-row`, **abaixo** do bloco mapa+cidades):** chips `.units__btn` (border 1px `--border`, `border-radius: 9999px`, ativo `fill --primary` texto `--primary-foreground`) em `.units__filter` — `flex-wrap: wrap` `justify-content: center` (chips podem quebrar linha). Primeiro chip **"Todas as cidades"** (ativo por padrão, `data-city="all"`) + as 7 cidades. Lista lateral e filtros compartilham o mesmo estado ativo via evento `unit:select`; clicar em cidade/chip também destaca o marcador(es) correspondente no mapa. Mobile: mapa → cidades → filtros empilhados.
- **Cards de unidade (`.units__grid` + `.unit-card`, **abaixo** de todo o bloco mapa+lista+filtros):** subseção **"Nossas unidades"** (`.units__heading` — label `.section-title__label` + título `.units__title` "Conheça nossos campi") seguida de grid responsivo `1col → 2col (640px) → 3col (1024px)` com os **10 cards de campus**. Cada card: imagem `16/10` `object-cover` com zoom suave no hover, cidade em uppercase `--primary`, nome do campus (Manrope 700), endereço com pin e CTA **"Mais informações"** (`--primary`, seta desliza no hover) apontando para o link externo oficial `https://www.unipar.br/unidades/<slug>/<campus>/` com `target="_blank"`. Distribuição: Umuarama 3 (Campus I Sede, II Clínica Escola Veterinária, III Tiradentes), Cianorte 1, Toledo 2 (Campus I e II), Guaíra 1, Paranavaí 1, Cascavel 1, Francisco Beltrão 1.
- **Duo de imagens (`.case-image-duo`, páginas de projeto):** duas fotografias lado a lado em um container próprio, abaixo do bloco de texto completo de uma seção. CSS Grid `1fr → 2 colunas (640px)`, `gap: 20px`; cada imagem reutiliza `.case-image` (border-radius 16px, border, sombra) + `.case-image--cover` (aspect-ratio `16/10` → `21/10` ≥1024px, `object-fit: cover`); wrapper com `reveal` (fade-up). Mobile (1 coluna) empilha. Sem galeria/carrossel/lightbox. **Exceção `.case-image-duo--sescoop` (2026-09-14):** imagens panorâmicas (fotos largas, ex.: `sescoop-4` 2.66:1 e `sescoop-5` 2.32:1) são exibidas **inteiras, sem corte** — `aspect-ratio: auto` no `.case-image` e `img { height: auto; object-fit: contain; }`, preservando proporção original; estrutura/ordem do duo mantidas. **Extensão da exceção (2026-09-14, com confirmação do usuário):** a mesma classe `.case-image-duo--sescoop` passou a ser **reutilizada** no duo de **panorâmicas da Uniprime Pioneira** (`uniprime-5` 2.66:1 e `uniprime-6` 2.32:1, lado a lado, no fim da última seção) — sem novas regras de CSS; apenas reaproveitamento da classe escopada existente para exibição integral das imagens. **BLOCO DUPLO (2026-09-15, com confirmação do usuário):** na seção final "Educação que transforma" da página da Uniprime Pioneira, as panorâmicas tornaram-se **duas linhas** — LINHA 1 `uniprime-5 | uniprime-6` e LINHA 2 `uniprime-7.png | uniprime-8.png` (1887×710 2.66:1 e 1883×903 2.09:1, também panoramas), cada linha um `.case-image-duo.case-image-duo--sescoop` com `reveal`; mesma classe escopada reutilizada, **sem novas regras de CSS**; desktop `5|6 / 7|8`, mobile empilha `5,6,7,8`; imagens 1–4, hero e demais seções intactas.
- **Formulário de contato:** inputs `border-radius: 8px`, foco `border --primary` + ring `primary/20%`, botão `border-radius: 9999px`, estados de status erro/sucesso com ícone; campos inválidos com borda `--destructive` + mensagem inline (`.form-field__error`); honeypot oculto (`.hp-field`) para anti-spam. Envio via `fetch` para a Function `api/contact.js` (Resend).
- **Feedbacks de projetos (`.feedback-section`, `#feedbacks-projetos`):** área pequena e elegante **dentro da experiência de Projetos** — fica **logo abaixo dos cards de `#projetos` e antes da linha do tempo Youth (Gazin)**, como continuação natural dos projetos (não é página/seção separadas). Inspirada no tratamento de cards/avatares do Testimonials-6 (referência visual apenas) e **recriada em HTML+CSS+JS puros, sem libs**. Título centrado compacto (`section-title--center` + `section-title--sm`: H2 clamp 1.375/2.4vw/1.875rem, label "Depoimentos", legenda "Quem vive a experiência, conta"). `.feedbacks-grid`: **1 col mobile → 2 col ≥768px → 3 col ≥1024px**, gap 20/24px, sem overflow horizontal; **9 cards** (3×3 no desktop). `.feedback-card`: `var(--card)`, `border 1px var(--border)`, `border-radius: 16px`, sombra leve, hover `-2px` (padrão dos demais cards). **Ordem interna de cada card:** (`<header class="feedback-card__author">`) **avatar no canto superior ESQUERDO** + **nome à direita do avatar** (alinhado ao topo) com "Participante" abaixo (`.feedback-card__author-info`) — `display: flex; align-items: flex-start; gap: 12px` — e, **abaixo**, (`<blockquote class="feedback-card__text">`) o **depoimento em linha própria, largura total do card** (não fica ao lado da foto). `.feedback-avatar`: **círculo 42×42px, `border-radius: 50%`, inicial centralizada, fonte do site (Manrope) peso 600, cor `#fff`** — **nunca** à direita do nome, nem acima centralizado, nem com foto real (projeto não tem fotos de perfil). **Exceção de cor (confirmada pelo usuário, 2026-09-15 — substitui "não introduzir cores fora dos tokens" para avatares):** 9 tons discretos/dessaturados escopados — roxo `#7a6db3`, azul `#5b84d1`, verde `#4e9b8f`, laranja `#cc8a5a`, rosa `#c76a8e`, grafite `#7d8ca3`, lilás `#a26d9e`, dourado `#b18c63`, oliva `#74995f`. **Conteúdo demonstrativo:** nomes e textos **fictícios** (comentário no HTML: "Conteúdo demonstrativo — substituir por depoimentos reais quando disponíveis."); sem fotos, sem empresas/cargos inventados (contexto genérico "Participante"); tom institucional, 1–2 frases. `<section><h2><article><header><blockquote><p>` semânticos; `.reveal` calculado pelo JS existente; **sem animação de marquee** (layout estático, `js/main.js` intacto).
- **Ícones:** SVGs inline (Lucide-style, stroke 2, round caps) e ícones externos de redes sociais via `thesvg.org`.

## Imagens e Mídia

- **Fotografias reais** de turmas, campi e eventos — sensação de instituição viva e regional; `object-cover` com zoom suave no hover. **Exceção (2026-09-14):** fotos panorâmicas muito largas que perderiam conteúdo relevante com `cover` (ex.: `sescoop-4`, `sescoop-5` no duo do Sescoop; `uniprime-5`, `uniprime-6` e as panorâmicas da segunda linha `uniprime-7.png`, `uniprime-8.png` no bloco final — "Educação que transforma" — da página Uniprime Pioneira) usam exibição integral `object-contain`/`height: auto` via classe escopada - nunca cortar. **Exceção (2026-09-25, com confirmação do usuário):** **não há fotografias de equipe no site** — a seção de equipe foi removida por completo (ver "Seção de equipe (removida)"), e portanto não existem fotos, avatares, placeholders ou ícones de identidade de integrantes em lugar nenhum.
- **Imagens-pôster/artes (ex.: `mba-agro-credito.jpeg`, `sescoop-2027.png`, `mestrado-biotec.png`):** `object-contain` — **nunca** cortar textos/logos.
- **Logos de parceiros** sobre área branca `border-radius: 12px`, `object-contain`, sem distorção.
- **Logo do site (`brand-logo`):** carregado de URL externa (Vercel Blob) com `mix-blend-mode: screen` sobre fundo `--primary`; há cópia local em `img/`.
- **Vídeos** embedados via iframe (YouTube) em frames `16/9` ou `9/16` nas páginas de projeto.

## Tom e Comunicação

- **Personalidade:** institucional, séria e confiável, mas acolhedora e centrada em pessoas; foco em "educação, evolução e legado".
- **Linguagem:** português formal (pt-BR), termos corporativos e acadêmicos (MBA, pós-graduação, cooperativismo, liderança, governança).
- **Forma de apresentar benefícios:** narrativa institucional — "soluções educacionais personalizadas", "desenvolvimento de pessoas e organizações", "transformar conhecimento em evolução".
- **CTAs:** orientados à ação e ao contato — "Conheça a Unipar In Company", "Conheça nossos projetos", "Solicitar uma proposta", "Fale conosco", "Falar pelo WhatsApp".
- **Nome/identidade:** "Unipar In Company" (by UNIPAR); tagline "Educação que transforma conhecimento em evolução".

## Responsividade

- **Breakpoints:** `640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl).
- **Abordagem:** mobile-first; grid colapsa para 1 coluna, header vira menu fullscreen (toggle hamburger ≥1024px esconde), nav desktop aparece em ≥1024px.
- **Tipografia fluida:** `clamp()` para H1, títulos de seção e subtítulos.
- **Conteineres:** gutter `20px` → `32px`; ritmo vertical reduzido no mobile (`80px`).
- **Imagens:** sempre responsivas (`max-width: 100%`), `aspect-ratio` fixos para frames.
- **Mapa e timeline** ajustam eixo/posição por breakpoint (linha lateral no mobile, central no desktop).

## O que Evitar

- **Não** replicar/clonar a Oura (textos, imagens, componentes, código ou identidade) — usar apenas como referência de direção.
- **Não** introduzir cores fora do sistema de tokens de `css/styles.css`.
- **Não** trocar Manrope/Inter por outras famílias sem registrar a mudança.
- **Não** criar layout denso/carregado; manter respiro e hierarquia limpa.
- **Não** cortar imagens-pôster (usar `object-contain`).
- **Não** usar tom casual/descontraído ou gírias; manter registro institucional pt-BR.
- **Não** remover animações de foco/acessibilidade nem ignorar `prefers-reduced-motion`.
- **Não** alterar contatos oficiais, ordem fixa de projetos/parceiros/seções ou textos institucionais sem confirmação.

## Decisões em Aberto

- **Referência Oura** (print + link): **A DEFINIR** — não localizada no projeto. Quando fornecida, será analisada apenas como direção (clima, hierarquia, minimalismo premium) e registrada aqui.
- **Envio real do formulário de contato:** **RESOLVIDO** (2026-09-07; ajustado em 2026-09-22) — `js/contact.js` envia via `fetch` para a Function serverless `api/contact.js`, que integra com **Resend** (assunto **"Novo contato — Unipar In Company — [Nome completo]"**, e-mail com versão HTML — banda vermelha e seções DADOS DO CONTATO / DESAFIO DE DESENVOLVIMENTO / Origem / Data-hora — e versão **text/plain** no mesmo formato; `reply_to` = e-mail do visitante). `RESEND_API_KEY` fica **somente no servidor** (variável de ambiente; `.env.example` com placeholders; `.gitignore` cobre `.env*`). Validação dupla, honeypot + rate limit em memória (5/IP/10min), mensagens de sucesso/erro aprovadas pelo usuário. Formulário: Nome completo*, Empresa / Organização, E-mail*, Telefone e Desafio de desenvolvimento* (textarea) com `autocomplete` adequado. Sem banco de dados.
- **Unidades:** a home mostra, na seção "Presença e unidades": **mapa à esquerda** (`.units__map-card`), **lista de cidades à direita** (`.units__cities-card` — somente os 7 nomes, uma vez cada) e **filtros abaixo** (`.units__filters-row`, chip "Todas as cidades" + 7 cidades). **Abaixo** de todo esse bloco, a subseção **"Nossas unidades"** apresenta o **grid com os 10 cards de unidade** (`.units__grid` + `.unit-card`; 1col → 2col 640px → 3col 1024px): imagem, cidade, campus, endereço com pin e CTA "Mais informações" → link externo oficial `https://www.unipar.br/unidades/<slug>/<campus>/` (`target="_blank"`). Distribuição: Umuarama Campus I Sede / II Clínica Escola Veterinária / III Tiradentes (3), Cianorte (1), Toledo Campus I e II (2), Guaíra (1), Paranavaí (1), Cascavel (1), Francisco Beltrão (1) — espelhando `data/unidades.js`. Imagens `img/unidade-<cidade>-<nn>.<ext>` (padrão numérico para diferenciar múltiplas unidades da mesma cidade); **cada um dos 10 campi tem foto própria** (Campus II e III de Umuarama e Campus I de Toledo ganharam fotos novas do usuário; Campus II de Umuarama deixou de ter `imagem: null`).
- **Fonte de verdade da logo:** logo carregada de URL externa (Vercel Blob); cópia local existe em `img/`. Padronizar para asset local **A DEFINIR**.
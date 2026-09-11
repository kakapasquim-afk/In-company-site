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
4. **Conteúdo primeiro** — textos longos e institucionais bem legíveis; fotografias reais (turmas, unidades, equipe) e logos de parceiros em destaque.
5. **Consistência** — mesmos componentes/tokens em todas as seções (cards arredondados, badges, botões `border-radius: 9999px`).
6. **Acessibilidade e movimento** — animações sutis, respeitam `prefers-reduced-motion`, foco visível (`:focus-visible`) e `aria-*`.
7. **Português do Brasil (pt-BR)** como idioma único do conteúdo.

## Paleta

Sistema em `css/styles.css` via variáveis `oklch`. Vermelho institucional derivado de **Unipar `#c8102e`** (`--primary: oklch(0.523 0.214 26)`).

- **Fundo (`--background`):** branco `oklch(1 0 0)`.
- **Superfícies/cards (`--card`, `--popover`):** branco.
- **Secundário/muted (`--secondary`, `--muted`):** cinza-rosado muito claro `oklch(0.968 …)` — usado como fundo alternado de seções (Team, Solutions, Youth, Units).
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

Duas famílias do Google Fonts (via `<link>` no `<head>`):

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
- **Grids:** CSS Grid responsivo — padrões `1col → 2col (640px) → 3col (1024px)` (soluções, projetos, unidades), `2col (768px)` (equipe), `4col (1024px)` parceiros, `2col (1024px)` para texto+mídia (hero, split).
- **Hero:** grid `1.05fr 1fr` (≥1024px), título à esquerda, imagem em frame `4/3` (`border-radius: 16px`) com moldura decorativa vermelha deslocada; mano "blob" `--red-50` `blur(72px)` decorativo em desktop.
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
- **Cards de equipe (`.team-card`):** foto `4/5` `object-cover top`, nome, cargo, links sociais com ícone + texto, hover `-4px`.
- **Cards de valores (`.value-card`):** ícone em chip `--red-50` (vira `--primary` no hover), numeração `01–07`.
- **Timeline (`.timeline`) do programa Jovens Potenciais:** linha vertical/central, nós redondos, ano em pill `--primary`, conteúdo alterna lado.
- **Cards de parceiros (`.partner-link`):** logo em área branca `80px` `object-contain`, nome, descrição, CTA; grid 4 col (desktop).
- **Mapa das unidades (`.units__map-wrap`, seção "Presença e unidades"):** o mapa fica **à esquerda** dentro de `.units__layout` (card `.units__map-card`, grid `1fr → 1.4fr 1fr` em ≥1024px, gap 28–40px). SVG gerado por JS a partir de `data/parana.geojson`: estado `fill --red-50` + `stroke --primary` 1.5; marcadores mínimos = halo r10 (`--primary`, `opacity .16`, ativo/hover r12) + pino r5 (`--primary`, traço branco 2); **tooltip** (retângulo 108×28 rx8 + texto) só no hover/:focus/ativo — **sem labels sempre visíveis**; nota abaixo do mapa: "Localização aproximada das unidades no estado do Paraná. Endereços disponibilizados sob consulta."
- **Lista de cidades (`.units__cities-card`, lado direito do mapa):** `.units__cities` = lista vertical de **7 botões `.units__city-item`** com **somente os nomes** (Umuarama, Cianorte, Paranavaí, Toledo, Cascavel, Guaíra, Francisco Beltrão — uma vez cada, ordem fixa). Manrope 600, hover fundo `--red-50`, item ativo com borda esquerda `--primary` + cor `--primary` + peso 700. **Sem fotos, endereços, cards ou CTA na lateral.**
- **Filtros por cidade (`.units__filters-row`, **abaixo** do bloco mapa+cidades):** chips `.units__btn` (border 1px `--border`, `border-radius: 9999px`, ativo `fill --primary` texto `--primary-foreground`) em `.units__filter` — `flex-wrap: wrap` `justify-content: center` (chips podem quebrar linha). Primeiro chip **"Todas as cidades"** (ativo por padrão, `data-city="all"`) + as 7 cidades. Lista lateral e filtros compartilham o mesmo estado ativo via evento `unit:select`; clicar em cidade/chip também destaca o marcador(es) correspondente no mapa. Mobile: mapa → cidades → filtros empilhados.
- **Cards de unidade (`.units__grid` + `.unit-card`, **abaixo** de todo o bloco mapa+lista+filtros):** subseção **"Nossas unidades"** (`.units__heading` — label `.section-title__label` + título `.units__title` "Conheça nossos campi") seguida de grid responsivo `1col → 2col (640px) → 3col (1024px)` com os **10 cards de campus**. Cada card: imagem `16/10` `object-cover` com zoom suave no hover, cidade em uppercase `--primary`, nome do campus (Manrope 700), endereço com pin e CTA **"Mais informações"** (`--primary`, seta desliza no hover) apontando para o link externo oficial `https://www.unipar.br/unidades/<slug>/<campus>/` com `target="_blank"`. Distribuição: Umuarama 3 (Campus I Sede, II Clínica Escola Veterinária, III Tiradentes), Cianorte 1, Toledo 2 (Campus I e II), Guaíra 1, Paranavaí 1, Cascavel 1, Francisco Beltrão 1.
- **Duo de imagens (`.case-image-duo`, páginas de projeto):** duas fotografias lado a lado em um container próprio, abaixo do bloco de texto completo de uma seção. CSS Grid `1fr → 2 colunas (640px)`, `gap: 20px`; cada imagem reutiliza `.case-image` (border-radius 16px, border, sombra) + `.case-image--cover` (aspect-ratio `16/10` → `21/10` ≥1024px, `object-fit: cover`); wrapper com `reveal` (fade-up). Mobile (1 coluna) empilha. Sem galeria/carrossel/lightbox.
- **Formulário de contato:** inputs `border-radius: 8px`, foco `border --primary` + ring `primary/20%`, botão `border-radius: 9999px`, estados de status erro/sucesso com ícone; campos inválidos com borda `--destructive` + mensagem inline (`.form-field__error`); honeypot oculto (`.hp-field`) para anti-spam. Envio via `fetch` para a Function `api/contact.js` (Resend).
- **Ícones:** SVGs inline (Lucide-style, stroke 2, round caps) e ícones externos de redes sociais via `thesvg.org`.

## Imagens e Mídia

- **Fotografias reais** de turmas, campi, eventos e equipe — sensação de instituição viva e regional; `object-cover` com zoom suave no hover.
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
- **Envio real do formulário de contato:** **RESOLVIDO** (2026-09-07) — `js/contact.js` envia via `fetch` para a Function serverless `api/contact.js`, que integra com **Resend** (assunto "Novo contato pelo site — [Nome]", e-mail HTML com banda vermelha e campos; `reply_to` = e-mail do visitante). `RESEND_API_KEY` fica **somente no servidor** (variável de ambiente; `.env.example` com placeholders; `.gitignore` cobre `.env*`). Validação dupla, honeypot + rate limit em memória (5/IP/10min), mensagens de sucesso/erro aprovadas pelo usuário. Sem banco de dados.
- **Unidades:** a home mostra, na seção "Presença e unidades": **mapa à esquerda** (`.units__map-card`), **lista de cidades à direita** (`.units__cities-card` — somente os 7 nomes, uma vez cada) e **filtros abaixo** (`.units__filters-row`, chip "Todas as cidades" + 7 cidades). **Abaixo** de todo esse bloco, a subseção **"Nossas unidades"** apresenta o **grid com os 10 cards de unidade** (`.units__grid` + `.unit-card`; 1col → 2col 640px → 3col 1024px): imagem, cidade, campus, endereço com pin e CTA "Mais informações" → link externo oficial `https://www.unipar.br/unidades/<slug>/<campus>/` (`target="_blank"`). Distribuição: Umuarama Campus I Sede / II Clínica Escola Veterinária / III Tiradentes (3), Cianorte (1), Toledo Campus I e II (2), Guaíra (1), Paranavaí (1), Cascavel (1), Francisco Beltrão (1) — espelhando `data/unidades.js`. Imagens `img/unidade-<cidade>-<nn>.<ext>` (padrão numérico para diferenciar múltiplas unidades da mesma cidade); **cada um dos 10 campi tem foto própria** (Campus II e III de Umuarama e Campus I de Toledo ganharam fotos novas do usuário; Campus II de Umuarama deixou de ter `imagem: null`).
- **Fonte de verdade da logo:** logo carregada de URL externa (Vercel Blob); cópia local existe em `img/`. Padronizar para asset local **A DEFINIR**.
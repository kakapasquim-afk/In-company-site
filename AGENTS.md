# AGENTS.md — Unipar In Company

## O que é este projeto

Site institucional da **Unipar In Company**, a vertente de educação corporativa da Universidade Paranaense (Unipar). Criada em 2023 pela Diretoria de Inovação, conecta a universidade a empresas, cooperativas e instituições por meio de soluções educacionais personalizadas.

Este diretório (`unipar-site`) é um site **estático** (HTML/CSS/JS puro) que migra o design de uma implementação original em Next.js/Tailwind v4 (mantida no diretório irmão `../unipar-main`). O site apresenta a iniciativa, sua estratégia, soluções, projetos realizados com parceiros, equipe, unidades e contato.

## Objetivo geral

Comunicar a Unipar In Company como parceira estratégica de educação e desenvolvimento para empresas, cooperativas e instituições, convertendo visitantes interessados em contatos/propostas (lead) por meio da seção de contato.

## Regras fundamentais

1. **Não apagar/substituir a estrutura existente.** Este é um projeto em andamento; altere somente o necessário.
2. **Contatos oficiais são fixos** (e-mail `celso.ferrari@prof.unipar.br`, telefone `(44) 9916-2293`, WhatsApp e sede em Umuarama — não alterar).
3. **Ordem dos projetos, parceiros e seções é fixa** (conforme `index.html`); não reordenar por critério próprio.
4. **Imagens-pôster** usam `object-contain` (sem corte); fotografias usam `object-cover`. Exceção registrada (2026-09-14): fotos panorâmicas muito largas que perderiam conteúdo sob `cover` (ex.: `sescoop-4`/`sescoop-5`) usam exibição integral via classe escopada `.case-image-duo--sescoop` (`aspect-ratio: auto` + `height: auto` + `object-fit: contain`).
5. **Siga os tokens de cor/tipografia** de `css/styles.css` (variáveis `oklch`); não invente cores fora do sistema.
6. **Acessibilidade**: preservar `aria-*`, foco visível e `prefers-reduced-motion` já implementados.
7. **Idioma único:** português do Brasil (pt-BR).
8. **Logos/contatos de parceiros e textos institucionais** não podem ser trocados sem confirmação.

## Documentos de referência

- `@specs/design.md` — fonte de verdade das decisões visuais (direção, paleta, tipografia, layout, componentes, tom, responsividade e "o que evitar"). Consulte antes de qualquer alteração de visual.
- `@memoria.md` — decisões registradas, aprendizados, problemas/soluções, mudanças de direção e histórico do projeto. Atualize ao tomar decisões relevantes.

## Conflitos entre novos pedidos e decisões registradas

Se qualquer pedido futuro do usuário contradizer uma decisão já definida em `@specs/design.md`, **pare antes de fazer a alteração** e:

1. identifique a decisão existente em `@specs/design.md`;
2. explique a contradição (o pedido vs. o que está registrado);
3. explique o impacto da mudança;
4. pergunte ao usuário se ele deseja substituir a decisão anterior.

Não altere a decisão automaticamente, não ignore o `specs/design.md` e não faça a alteração silenciosamente. Somente após a confirmação do usuário, atualize `specs/design.md` e/ou `memoria.md` e prossiga.
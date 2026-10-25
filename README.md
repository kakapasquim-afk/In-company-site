# Unipar In Company — site institucional

Site estático (HTML, CSS e JavaScript puro), publicado na Vercel a partir da branch `main`.

## Estrutura

| Pasta / arquivo | O que tem |
|---|---|
| `site.html` | Home (a rota `/` é reescrita para ela em `vercel.json`) |
| `projetos/` | 9 páginas de projeto; fonte em `projetos/_templates/` |
| `css/`, `js/`, `data/` | Estilos, scripts e dados do mapa/unidades |
| `img/` | `marca/`, `home/`, `unidades/`, `partners/`, `projetos/<projeto>/`, `arquivo/` (sem uso) |
| `specs/design.md` | Decisões visuais |
| `memoria.md` | Histórico de decisões |
| `AGENTS.md` | Regras do projeto |

## Rodar localmente

Abra `site.html` no navegador ou sirva a pasta com qualquer servidor estático. Não há build nem dependências.

## Regenerar uma página de projeto

```powershell
powershell -File projetos/_templates/build.ps1 -Title "Título" -Desc "Descrição" -BodyFile _body-gazin.html -OutFile gazin.html
```

## Publicar

`git push origin main` — a Vercel publica automaticamente.

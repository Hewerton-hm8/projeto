---
name: orquestrador
description: "Orquestra a estilização CSS do projeto. Use quando: criar componentes, estilizar seções, ajustar layout responsivo, aplicar design tokens, seguir convenções BEM, manter consistência visual do design system escuro."
---

# Orquestrador de Estilização

Skill para garantir que toda estilização siga os padrões e convenções do projeto.

## Quando Usar

- Criar ou estilizar novos componentes/seções
- Ajustar responsividade
- Adicionar novos estilos ao `index.css` ou `admin/admin.css`
- Verificar consistência visual

## Design Tokens

Sempre usar variáveis CSS definidas no `:root`. Nunca usar cores ou valores hardcoded.

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#1C2128` | Fundo principal |
| `--bg-2` | `#161B22` | Fundo secundário |
| `--bg-card` | `#21262D` | Fundo de cards |
| `--text` | `#E6EDF3` | Texto principal |
| `--text-muted` | `rgba(230,237,243,0.55)` | Texto secundário |
| `--blue` | `#0057FF` | Cor primária (ações, links) |
| `--green` | `#9CFF00` | Destaque / sucesso |
| `--border` | `rgba(255,255,255,0.08)` | Bordas sutis |
| `--radius` | `14px` | Cards e painéis |
| `--radius-sm` | `8px` | Botões e inputs |
| `--transition` | `0.2s ease` | Transições padrão |
| `--shadow` | `0 4px 24px rgba(0,0,0,0.35)` | Profundidade |

**Fonte**: Nunito (já importada via Google Fonts)

## Convenção de Nomes (BEM)

Seguir estritamente o padrão BEM:

```
.bloco__elemento--modificador
```

- **Bloco**: nome do componente (`.hero`, `.navbar`, `.card`)
- **Elemento**: parte interna (`__tag`, `__title`, `__icon`)
- **Modificador**: variação (`--primary`, `--active`, `--scrolled`)

Exemplos corretos:
```css
.hero__tag { }
.hero__title { }
.btn--primary { }
.btn--ghost { }
.navbar--scrolled { }
```

## Padrões de Layout

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 24px;
```

### Grid para cards/colunas
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 24px;
```

### Flexbox para alinhamento
```css
display: flex;
align-items: center;
gap: 12px;
```

## Padrões de Componentes

### Botões
- `.btn--primary`: fundo `var(--blue)`, texto branco
- `.btn--ghost`: transparente com borda `var(--border)`
- `.btn--full`: largura 100%
- Sempre usar `border-radius: var(--radius-sm)` e `transition: var(--transition)`

### Cards
```css
background: var(--bg-card);
border: 1px solid var(--border);
border-radius: var(--radius);
padding: 32px;
```
Adicionar hover com elevação: `transform: translateY(-4px)` e `box-shadow: var(--shadow)`.

### Inputs/Forms
```css
background: rgba(255,255,255,0.05);
border: 1px solid var(--border);
border-radius: var(--radius-sm);
color: var(--text);
```
Focus: `border-color: var(--blue)` com `box-shadow: 0 0 0 3px rgba(0,87,255,0.1)`.

## Responsividade

Breakpoints (mobile-last, max-width):

| Breakpoint | Alvo |
|------------|------|
| `960px` | Tablets / desktop pequeno |
| `768px` | Tablets menores |
| `600px` | Mobile |

### Técnicas obrigatórias
- Usar `clamp()` para tipografia: `font-size: clamp(28px, 4vw, 40px)`
- Grids: reduzir colunas progressivamente (`3 → 2 → 1`)
- Navbar: menu hamburguer visível abaixo de `960px`

## Checklist ao Estilizar

1. Usou variáveis CSS (`var(--*)`) em vez de valores hardcoded?
2. Seguiu BEM para nomear classes?
3. Adicionou estados interativos (hover, focus, active)?
4. Testou nos 3 breakpoints (960, 768, 600)?
5. Transições usam `var(--transition)`?
6. Cards têm `var(--bg-card)` + `var(--border)` + `var(--radius)`?

## Referência

Consulte o [guia de tokens detalhado](./references/tokens.md) para a lista completa de variáveis e exemplos.

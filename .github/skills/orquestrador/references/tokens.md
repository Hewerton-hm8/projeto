# Tokens de Design — Referência Completa

## Cores

```css
:root {
  --bg: #1C2128;
  --bg-2: #161B22;
  --bg-card: #21262D;
  --text: #E6EDF3;
  --text-muted: rgba(230, 237, 243, 0.55);
  --blue: #0057FF;
  --green: #9CFF00;
  --border: rgba(255, 255, 255, 0.08);
}
```

### Uso contextual

| Contexto | Cor |
|----------|-----|
| Fundo de página | `var(--bg)` |
| Fundo de sidebar/seção alternada | `var(--bg-2)` |
| Fundo de card/painel | `var(--bg-card)` |
| Texto principal | `var(--text)` |
| Texto secundário/labels | `var(--text-muted)` |
| CTA / links / ações primárias | `var(--blue)` |
| Sucesso / destaque / badge | `var(--green)` |
| Bordas / separadores | `var(--border)` |

## Espaçamento

| Tamanho | Uso |
|---------|-----|
| `8px` | Gaps pequenos, padding interno de badges |
| `12px` | Gap entre ícone e texto |
| `16px` | Padding de inputs, gap em listas |
| `24px` | Gap de grids, padding de containers |
| `32px` | Padding interno de cards |
| `48px` | Espaçamento entre seções (mobile) |
| `80px` | Espaçamento entre seções (desktop) |

## Tipografia

| Elemento | Tamanho | Peso |
|----------|---------|------|
| H1 (hero) | `clamp(36px, 5vw, 56px)` | 800 |
| H2 (seção) | `clamp(28px, 4vw, 40px)` | 700 |
| H3 (card) | `18px` | 700 |
| Body | `16px` | 400 |
| Small/label | `13px` - `14px` | 600 |

## Bordas e Raios

```css
--radius: 14px;    /* Cards, painéis, modais */
--radius-sm: 8px;  /* Botões, inputs, tags */
/* Badges/pills: border-radius: 100px */
```

## Sombras

```css
--shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
/* Hover de cards: box-shadow: var(--shadow) */
/* Focus de inputs: box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.1) */
```

## Transições

```css
--transition: 0.2s ease;
/* Usar em: color, background, transform, box-shadow, border-color, opacity */
```

## Animações Existentes

| Keyframe | Uso |
|----------|-----|
| `pulse-dot` | Indicador de status online |
| `blink` | Cursor no terminal mock |
| `spin` | Loading spinner |

## Efeitos

| Efeito | CSS | Onde |
|--------|-----|------|
| Glassmorphism | `backdrop-filter: blur(12px)` | Navbar |
| Hover elevação | `transform: translateY(-4px)` | Cards |
| Glow verde | `box-shadow: 0 0 20px rgba(156,255,0,0.15)` | Destaques |

# Multi-Theme Architecture

This project serves two brands from a single repository:

| Brand | Theme value | Domain | Blocks |
|-------|-------------|--------|--------|
| AT&T Business | `batt` | business.att.com | 19 `batt-*` blocks |
| FirstNet | `firstnet` | firstnet.com | 5 `firstnet-*` blocks |

Both brands share 17 generic blocks (accordion, cards, carousel, columns, etc.).

---

## How theming works

### 1. Page metadata

Every page declares its brand via the `theme` page property in Universal Editor, which renders as:

```html
<meta name="theme" content="batt">
```

If no theme is set, the default is `firstnet`.

### 2. Body class

`scripts.js` reads the theme metadata and adds the brand class to `<body>` before the page appears:

```
body.batt     /* AT&T Business pages */
body.firstnet /* FirstNet pages */
```

### 3. Conditional CSS loading

Only the active brand's CSS is loaded (never both). In `loadEager()`:

```
styles/{brand}/{brand}-tokens.css   /* design tokens */
styles/{brand}/{brand}-sections.css /* section background styles */
```

### 4. Abstract token layer

Brand-specific tokens (e.g. `--batt-blue-primary`, `--firstnet-dark-navy`) are mapped to abstract `--brand-*` tokens scoped to the body class:

```css
/* styles/batt/batt-tokens.css */
body.batt {
  --brand-bg: var(--batt-bg-default, #fff);
  --brand-link: var(--batt-link-color, #0568ae);
  --brand-button-bg: var(--batt-button-primary-bg, #00388f);
  /* ... */
}

/* styles/firstnet/firstnet-tokens.css */
body.firstnet {
  --brand-bg: var(--firstnet-bg-default, #fff);
  --brand-link: var(--firstnet-link-color, #0568ae);
  --brand-button-bg: var(--firstnet-button-cta-bg, #0568ae);
  /* ... */
}
```

`styles.css` references only `--brand-*` tokens, making it brand-neutral:

```css
:root {
  --background-color: var(--brand-bg, white);
  --link-color: var(--brand-link, #0568ae);
  /* ... */
}
```

### 5. Nav and footer

Each brand has its own navigation and footer content:

| Brand | Nav | Footer |
|-------|-----|--------|
| FirstNet | `/nav` | `/footer` |
| AT&T Business | `/batt/nav` | `/batt/footer` |

`header.js` and `footer.js` resolve the path based on the active theme. Authors can override per-page using `<meta name="nav">` or `<meta name="footer">`.

---

## Brand token reference

### `--brand-*` abstract tokens

| Token | Purpose | BATT default | FirstNet default |
|-------|---------|-------------|-----------------|
| `--brand-bg` | Page background | `#fff` | `#fff` |
| `--brand-text` | Primary text | `#1d2329` | `#000` |
| `--brand-text-inverse` | Text on dark bg | `#fff` | `#fff` |
| `--brand-link` | Link color | `#0568ae` | `#0568ae` |
| `--brand-link-hover` | Link hover | `#0074b3` | `#004a87` |
| `--brand-heading-font` | Heading typeface | AT&T Aleck Sans | System sans-serif |
| `--brand-body-font` | Body typeface | Roboto | System sans-serif |
| `--brand-button-radius` | Button rounding | `28px` | `25px` |
| `--brand-button-bg` | Primary button bg | `#00388f` | `#0568ae` |
| `--brand-button-color` | Primary button text | `#fff` | `#fff` |
| `--brand-button-hover-bg` | Button hover bg | `#0057b8` | `#004a87` |
| `--brand-light-bg` | Light section bg | `#f3f4f6` | `#f2f2f2` |
| `--brand-dark-bg` | Dark section bg | `#25303a` | `#00263e` |
| `--brand-nav-bg` | Nav background | `#fff` | `#00263e` |
| `--brand-nav-text` | Nav text color | `#454b52` | `#fff` |
| `--brand-footer-bg` | Footer background | `#25303a` | `#00263e` |
| `--brand-footer-text` | Footer text color | `#fff` | `#fff` |

---

## Authoring in Universal Editor

### Section types

Authors choose a brand-specific section when adding content:

| Section component | Available blocks | Section styles |
|-------------------|-----------------|----------------|
| **AT&T Business Section** | 19 `batt-*` + 17 generic | Highlight, Batt Light, Batt Neutral, Batt Dark, Batt Accent |
| **FirstNet Section** | 5 `firstnet-*` + 17 generic | Highlight, Dark Navy, Light Grey, Dark Blue Accent |

The section type determines which blocks appear in the "Add Block" menu and which style options are available in section properties.

### Path-based component scoping

For additional isolation, BATT pages authored under the `/batt/` content path use scoped component files:

```
/batt/component-definition.json  /* only BATT section + all block defs */
/batt/component-models.json      /* only BATT section model */
/batt/component-filters.json     /* main: [section-batt] only */
```

At this path, authors see only "AT&T Business Section" — no FirstNet option.

### Theme page property

Set in Universal Editor page properties:

| Property | Options | Effect |
|----------|---------|--------|
| Theme | FirstNet / AT&T Business | Controls `body` class, CSS loading, nav/footer path |

---

## File structure

```
styles/
  styles.css                      # Brand-neutral global styles (uses --brand-* tokens)
  batt/
    batt-tokens.css               # AT&T Business design tokens + body.batt --brand-* mapping
    batt-sections.css             # BATT section background styles
    README.md                     # Token reference
  firstnet/
    firstnet-tokens.css           # FirstNet design tokens + body.firstnet --brand-* mapping
    firstnet-sections.css         # FirstNet section background styles

scripts/
  scripts.js                      # getTheme(), conditional CSS loading, body class

blocks/
  header/
    header.js                     # Theme-aware nav path resolution
    header.css                    # Uses --brand-nav-* tokens
  footer/
    footer.js                     # Theme-aware footer path resolution
    footer.css                    # Uses --brand-footer-* tokens
  batt-*/                         # 19 AT&T Business blocks
  firstnet-*/                     # 5 FirstNet blocks
  (generic blocks)                # 17 shared blocks

models/
  _section.json                   # Combined section (legacy, all blocks)
  _section-batt.json              # section-batt definition/model/filter
  _section-firstnet.json          # section-firstnet definition/model/filter
  _component-definition.json      # Root merge source (both brands)
  _component-models.json          # Root merge source (both brands)
  _component-filters.json         # Root merge source (both brands)
  _component-definition-batt.json # BATT merge source
  _component-models-batt.json     # BATT merge source
  _component-filters-batt.json    # BATT merge source

batt/
  nav.plain.html                  # AT&T Business navigation content
  footer.plain.html               # AT&T Business footer content
  component-definition.json       # Compiled BATT-scoped definitions
  component-models.json           # Compiled BATT-scoped models
  component-filters.json          # Compiled BATT-scoped filters
```

---

## Build

```sh
npm run build:json
```

Compiles 6 component JSON files in parallel:

| Source | Output |
|--------|--------|
| `models/_component-definition.json` | `component-definition.json` |
| `models/_component-models.json` | `component-models.json` |
| `models/_component-filters.json` | `component-filters.json` |
| `models/_component-definition-batt.json` | `batt/component-definition.json` |
| `models/_component-models-batt.json` | `batt/component-models.json` |
| `models/_component-filters-batt.json` | `batt/component-filters.json` |

---

## Adding a new brand

1. Create `styles/{brand}/{brand}-tokens.css` with design tokens and `body.{brand} { --brand-*: ... }` mapping
2. Create `styles/{brand}/{brand}-sections.css` with section background styles
3. Create `models/_section-{brand}.json` with unique `section-{brand}` definition, model, and filter IDs
4. Add `section-{brand}` to the `main` filter in `_component-filters.json`
5. Add the section references to `_component-definition.json` and `_component-models.json`
6. Create `{brand}/nav.plain.html` and `{brand}/footer.plain.html`
7. Add the brand to the theme select options in `models/_page.json`
8. Add the brand to the `getTheme()` allowlist in `scripts/scripts.js`
9. (Optional) Create `{brand}/` path-scoped component merge sources and build targets in `package.json`
10. Run `npm run build:json`

---

## Writing block CSS

### Brand-specific blocks (`batt-*`, `firstnet-*`)

Reference your brand's tokens directly:

```css
.batt-hero { background: var(--batt-blue-primary); }
```

### Generic / shared blocks

Use `--brand-*` abstract tokens so the block adapts to both brands:

```css
.hero h1 { color: var(--brand-text); }
.hero a.button { background: var(--brand-button-bg); }
```

For brand-specific overrides within shared blocks, scope to the body class:

```css
body.batt .hero { border-top: 4px solid var(--batt-cyan); }
body.firstnet .hero { border-top: 4px solid var(--firstnet-blue-accent); }
```

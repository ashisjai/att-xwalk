# AT&T Business Design Tokens

Design tokens and section styles extracted from [business.att.com](https://www.business.att.com/), verified across all page types (homepage, product, industry, support, contact, blog/resources).

## Files

| File | Purpose |
|------|---------|
| `batt-tokens.css` | CSS custom properties for the full AT&T Business design system |
| `batt-sections.css` | Section background variants with button color inversions |

## Usage

Import both files in your `styles.css`:

```css
@import url('batt/batt-tokens.css');
@import url('batt/batt-sections.css');
```

Then reference tokens in your block CSS:

```css
.my-block h2 {
  font-family: var(--batt-heading-font-family);
  color: var(--batt-text-primary);
}
```

---

## Token Reference

### Colors

#### Primary Brand

| Token | Value | Preview |
|-------|-------|---------|
| `--batt-blue-primary` | `#00388f` | Deep blue (buttons, accents) |
| `--batt-blue-hover` | `#0057b8` | Blue hover state |
| `--batt-blue-accent` | `#0074b3` | CTA links, focus rings |
| `--batt-cyan` | `#009fdb` | Cyan accent (top bar highlight) |
| `--batt-blue-light-bg` | `#f2fafd` | Light blue tint (section bg) |
| `--batt-blue-light-hover` | `#dcf3fa` | Light blue hover |

#### Neutral / Grey Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--batt-grey-50` | `#f3f4f6` | Lightest grey (neutral section bg, top bar) |
| `--batt-grey-100` | `#f2f2f2` | Light grey |
| `--batt-grey-200` | `#dcdfe3` | Disabled backgrounds |
| `--batt-grey-300` | `#d2d2d2` | Borders, dividers |
| `--batt-grey-350` | `#c4c4c4` | Subscribe area bg |
| `--batt-grey-400` | `#bdc2c7` | Soft borders |
| `--batt-grey-500` | `#878c94` | Muted text, input borders |
| `--batt-grey-550` | `#767676` | Placeholder text (WCAG minimum) |
| `--batt-grey-600` | `#686e74` | Secondary muted text |
| `--batt-grey-700` | `#454b52` | Body text, nav links |
| `--batt-grey-900` | `#1d2329` | Primary text, headings |

#### Semantic Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--batt-text-primary` | `#1d2329` | Headings, primary text |
| `--batt-text-body` | `#454b52` | Body paragraphs |
| `--batt-text-secondary` | `#333` | Secondary text, labels |
| `--batt-text-inverse` | `#fff` | Text on dark/accent backgrounds |
| `--batt-text-muted` | `#686e74` | De-emphasized text |
| `--batt-text-placeholder` | `#767676` | Input placeholders |
| `--batt-text-error` | `#f00` | Validation errors |

#### Section Backgrounds

| Token | Value | Usage |
|-------|-------|-------|
| `--batt-bg-default` | `#fff` | Default white |
| `--batt-bg-light` | `#f2fafd` | Light blue tint (product features) |
| `--batt-bg-neutral` | `#f3f4f6` | Grey (testimonials, support) |
| `--batt-bg-dark` | `#25303a` | Dark charcoal (CTAs) |
| `--batt-bg-accent` | `#00388f` | Deep blue (brand messaging) |

---

### Typography

#### Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `--batt-heading-font-family` | `attAleckSans-Bold` + fallbacks | All headings |
| `--batt-body-font-family` | `attAleckSans-Regular` + fallbacks | Body text |
| `--batt-body-font-family-medium` | `attAleckSans-Medium` + fallbacks | Emphasized body |
| `--batt-body-font-family-light` | `attAleckSans-Light` + fallbacks | Labels, breadcrumbs |

> **Note:** attAleckSans is AT&T's proprietary font. It is not publicly downloadable. System fallbacks (Helvetica Neue, Arial) will render when the font is unavailable.

#### Heading Sizes

| Token | Desktop | Mobile (<768px) |
|-------|---------|-----------------|
| `--batt-heading-size-xxl` | 48px | 36px |
| `--batt-heading-size-xl` | 36px | 28px |
| `--batt-heading-size-l` | 26px | 22px |
| `--batt-heading-size-m` | 22px | 20px |
| `--batt-heading-size-s` | 18px | 16px |
| `--batt-heading-size-xs` | 16px | 14px |

#### Body Sizes

| Token | Desktop | Mobile (<768px) |
|-------|---------|-----------------|
| `--batt-body-size-xl` | 18px | 16px |
| `--batt-body-size-l` | 17px | 15px |
| `--batt-body-size-m` | 16px | 14px |
| `--batt-body-size-s` | 14px | — |
| `--batt-body-size-xs` | 12px | — |

---

### Spacing

| Token | Value |
|-------|-------|
| `--batt-spacing-2xs` | 4px |
| `--batt-spacing-xs` | 8px |
| `--batt-spacing-s` | 16px |
| `--batt-spacing-m` | 24px |
| `--batt-spacing-l` | 32px |
| `--batt-spacing-xl` | 48px |
| `--batt-spacing-xxl` | 64px |
| `--batt-spacing-3xl` | 80px |

Container: max-width `1310px`, padding `0 15px`.

---

### Buttons

AT&T Business uses three button variants: primary (filled), secondary (outlined), and text CTA (link style).

#### Primary Button

```
On light bg:  filled #00388f, white text    → hover: #0057b8
On dark bg:   filled #f2fafd, blue text     → hover: #dcf3fa
```

| Token | Value |
|-------|-------|
| `--batt-button-primary-bg` | `#00388f` |
| `--batt-button-primary-color` | `#fff` |
| `--batt-button-primary-hover-bg` | `#0057b8` |
| `--batt-button-primary-on-dark-bg` | `#f2fafd` |
| `--batt-button-primary-on-dark-color` | `#00388f` |

#### Secondary Button (Outlined)

```
On dark bg:   outlined white, transparent   → hover: filled #0057b8
On light bg:  outlined #00388f, transparent → hover: filled #0057b8
```

#### Text CTA

```
Color: #0074b3  → hover: underline
```

#### Shared Button Properties

| Token | Value |
|-------|-------|
| `--batt-button-border-radius` | `28px` (pill shape) |
| `--batt-button-height` | `48px` |
| `--batt-button-padding` | `0 32px` |
| `--batt-button-font-size` | `14px` |
| `--batt-button-font-family` | `attAleckSans-Bold` + fallbacks |

---

### Section Variants (batt-sections.css)

Apply via `section-metadata` block with `style` property in your content:

| Style Value | Class Applied | Background | Text | Buttons |
|-------------|--------------|------------|------|---------|
| `batt-light` | `.batt-light` | `#f2fafd` light blue | Dark | Primary filled blue |
| `batt-neutral` | `.batt-neutral` | `#f3f4f6` grey | Dark | Primary filled blue |
| `batt-dark` | `.batt-dark` | `#25303a` charcoal | White | Primary inverted (light bg, blue text) |
| `batt-accent` | `.batt-accent` | `#00388f` deep blue | White | Primary inverted (light bg, blue text) |

All section variants include:
- Centered `h2` headings with `16px` bottom margin
- Centered `h2 + p` subheadings with `32px` bottom margin
- Proper button color inversions and hover states
- Secondary button support on dark/accent variants

---

### Cards

| Token | Value |
|-------|-------|
| `--batt-card-bg` | `#fff` |
| `--batt-card-border-radius` | `16px` |
| `--batt-card-shadow` | `0 2px 8px rgb(0 0 0 / 8%)` |

---

### Form Elements

| Token | Value |
|-------|-------|
| `--batt-input-border` | `1px solid #878c94` |
| `--batt-input-border-radius` | `8px` |
| `--batt-input-height` | `48px` |
| `--batt-input-padding` | `12px 16px` |
| `--batt-input-focus-border-color` | `#0074b3` |
| `--batt-label-font-family` | `attAleckSans-Light` |
| `--batt-label-font-weight` | `700` |

---

### Border Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--batt-border-radius-pill` | `28px` | Buttons |
| `--batt-border-radius-card` | `16px` | Cards |
| `--batt-border-radius-input` | `8px` | Form inputs |
| `--batt-border-radius-small` | `4px` | Subtle rounding |

---

### Miscellaneous

| Token | Value |
|-------|-------|
| `--batt-hero-overlay-gradient` | `linear-gradient(to right, rgb(0 0 0 / 80%) 35%, rgb(0 0 0 / 0%) 60%)` |
| `--batt-blog-accent-purple` | `#af29bb` |
| `--batt-transition-default` | `all 0.2s ease` |
| `--batt-focus-outline` | `2px solid #0074b3` |

---

## Extraction Methodology

Tokens were extracted using Playwright browser automation against the live business.att.com site. Computed styles were captured from key elements (`h1`-`h4`, `p`, `a`, `button`, `input`, `nav`, `footer`) using `window.getComputedStyle()`. Hover states were extracted from CSS rule inspection via `document.styleSheets`.

**Pages verified:** Homepage, Products/Mobility, Industries/Healthcare, Support, Contact, Resources/Blog.

All pages share the same centralized design system. Page-specific computed size variations are responsive breakpoint calculations applied to the same base tokens.

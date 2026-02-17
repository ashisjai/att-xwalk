# AT&T Business Block Inventory

Block library for **business.att.com** migrated to AEM Edge Delivery Services with Universal Editor authoring support. All blocks use the `batt-` prefix and reference `--batt-*` design tokens defined in `/styles/batt/batt-tokens.css`.

**Coverage:** 19 blocks providing ~95% UI pattern coverage across all 749 pages.

---

## Block Summary

| # | Block | Type | Variants | Pages |
|---|-------|------|----------|-------|
| 1 | [batt-hero](#batt-hero) | Single-instance | light, dark, overlay, accent, centered | Homepage, Mobility, Healthcare |
| 2 | [batt-cards-feature](#batt-cards-feature) | Repeatable | — | Homepage, Mobility, Support |
| 3 | [batt-cards-offer](#batt-cards-offer) | Repeatable | — | Homepage, Mobility |
| 4 | [batt-form](#batt-form) | Single-instance | — | Homepage, Healthcare, Contact |
| 5 | [batt-cards-product](#batt-cards-product) | Repeatable | — | Homepage |
| 6 | [batt-value-prop](#batt-value-prop) | Single-instance | image-left, image-right, no-image | Homepage |
| 7 | [batt-testimonial](#batt-testimonial) | Repeatable | — | Homepage |
| 8 | [batt-cards-story](#batt-cards-story) | Repeatable | featured, two-up | Healthcare, Blog |
| 9 | [batt-cards-solution](#batt-cards-solution) | Repeatable | text-only, icon-tiles, colored-bar | Healthcare, Support |
| 10 | [batt-anchor-tabs](#batt-anchor-tabs) | Repeatable | — | Healthcare |
| 11 | [batt-columns](#batt-columns) | Columns resource | — | Mobility, Support |
| 12 | [batt-seo-links](#batt-seo-links) | Single-instance | — | Homepage |
| 13 | [batt-service-grid](#batt-service-grid) | Repeatable | — | Mobility |
| 14 | [batt-accordion](#batt-accordion) | Repeatable | — | Products, Portfolios, Offers, Areas |
| 15 | [batt-comparison-table](#batt-comparison-table) | Single-instance | highlight-first, striped | Product pages |
| 16 | [batt-pricing-cards](#batt-pricing-cards) | Repeatable | — | Product pages (Fiber, etc.) |
| 17 | [batt-content-tabs](#batt-content-tabs) | Repeatable | — | Industry pages |
| 18 | [batt-banner](#batt-banner) | Single-instance | success, warning, promo, dark | Offers, Industry pages |
| 19 | [batt-article](#batt-article) | Single-instance | — | 367 /learn/ article pages |

---

## Page Template Coverage

| Template | URL Pattern | Count | Primary Blocks |
|----------|------------|-------|----------------|
| Homepage | `/` | 1 | hero, cards-feature, cards-offer, cards-product, value-prop, testimonial, seo-links, form |
| Portfolio | `/portfolios/*` | 9 | hero, cards-feature, cards-story, accordion, form |
| Product Detail | `/products/*` | 95 | hero, pricing-cards, comparison-table, accordion, cards-offer, form |
| Industry | `/industries/*` | 36 | hero, anchor-tabs, content-tabs, cards-story, form |
| Article Listing | `/learn.html` | 1 | hero, cards-story |
| Article Detail | `/learn/articles/*` | 367 | article (TOC, sharing, subscribe) |
| Offers | `/offers.html` | 4 | banner, anchor-tabs, cards-offer, accordion, form |
| Area/City SEO | `/areas/*` | 52 | hero, service-grid, value-prop, accordion |
| Partner Solutions | `/partner-solutions/*` | 63 | hero, columns, cards-feature |
| Categories | `/categories/*` | 19 | hero, cards-product, cards-solution |
| Support | `/support/*` | 6 | hero, cards-solution, cards-feature, accordion, form |
| Contact | `/contact-us` | 1 | hero, form |
| Resources | `/resources/*` | 34 | hero, cards-story, columns |
| Other | various | ~61 | hero, columns, value-prop, form |

---

## Section Styles

These section-metadata style values are available for batt pages:

| Style | CSS Class | Background | Text |
|-------|-----------|------------|------|
| Batt Light | `.batt-light` | `#f2fafd` (light blue) | Dark |
| Batt Neutral | `.batt-neutral` | `#f3f4f6` (grey) | Dark |
| Batt Dark | `.batt-dark` | `#25303a` (charcoal) | White |
| Batt Accent | `.batt-accent` | `#00388f` (brand blue) | White |

---

## Block Details

### batt-hero

Full-width hero banner with background image, overlay gradient, and text content.

**Directory:** `blocks/batt-hero/`

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Desktop Background Image | `reference` | Hero background image |
| Image Alt Text | `text` | Alt text for the image |
| Mobile Background Image | `reference` | Optional mobile-specific image |
| Mobile Image Alt Text | `text` | Alt text for mobile image |
| Badge Label | `text` | Promotional badge text above eyebrow |
| Eyebrow Text | `text` | Small text above headline |
| Headline | `text` | Main hero heading (renders as `<h1>`) |
| Subheading | `text` | Secondary heading text below headline |
| Description | `richtext` | Supporting paragraph text |
| Legal / Fine Print | `richtext` | Disclaimers and terms |
| Primary CTA Label | `text` | Primary button text |
| Primary CTA URL | `text` | Primary button link |
| CTA Target | `select` | `Same Window` · `_blank` (opens in new tab) |
| Secondary CTA Label | `text` | Secondary button text |
| Secondary CTA URL | `text` | Secondary button link |
| Style | `select` | `light` · `dark` · `overlay` · `accent` · `centered` |
| Padding Top | `select` | `pt-0` · `pt-sm` · `pt-lg` · `pt-xl` |
| Padding Bottom | `select` | `pb-0` · `pb-sm` · `pb-lg` · `pb-xl` |
| Margin Top | `select` | `mt-0` · `mt-sm` · `mt-lg` |
| Margin Bottom | `select` | `mb-0` · `mb-sm` · `mb-lg` |

**Style Variants:**
- **Default** — Gradient overlay (left-to-right) on background image, white text
- **Light** — No overlay, dark text on light/transparent background
- **Dark** — Solid `#25303a` background, white text, no image overlay
- **Overlay** — Explicit left-to-right gradient over image
- **Accent** — Solid `#00388f` brand-blue background, inverted button colors
- **Centered** — Center-aligned text and actions

---

### batt-cards-feature

Icon + text cards with optional full-card click. Used for feature highlights and service categories.

**Directory:** `blocks/batt-cards-feature/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Icon / Image | `reference` | 48×48 icon or thumbnail |
| Image Alt Text | `text` | Alt text |
| Heading | `text` | Card title |
| Description | `richtext` | Card body text |
| CTA Link Label | `text` | Arrow-link text (e.g., "Learn more") |
| CTA Link URL | `text` | Link destination |
| Full Card Link URL | `text` | Makes entire card clickable (optional) |

**Layout:** 1 column mobile → 3 columns desktop. Cards have rounded corners (`16px`) and shadow on hover when clickable.

---

### batt-cards-offer

Promotional offer cards with image, eyebrow, legal text, and dual CTAs.

**Directory:** `blocks/batt-cards-offer/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Card Image | `reference` | 16:9 aspect ratio image |
| Image Alt Text | `text` | Alt text |
| Eyebrow | `text` | Category label (e.g., "New & existing customers") |
| Heading | `text` | Offer headline |
| Sub Heading | `text` | Secondary heading below the main heading |
| Description | `richtext` | Offer body text |
| Legal / Fine Print | `richtext` | Terms and disclaimers |
| Primary CTA Label | `text` | Button text |
| Primary CTA URL | `text` | Button link |
| Secondary Link Label | `text` | Text link below button |
| Secondary Link URL | `text` | Text link destination |

**Layout:** 1 column mobile → 3 columns desktop. Cards have rounded corners and shadow.

---

### batt-form

Lead generation form powered by a JSON spreadsheet definition. Matches the AT&T Business RAI contact form pattern.

**Directory:** `blocks/batt-form/`
**Extra file:** `form-fields.js` — Field creation helper supporting text, select, textarea, checkbox, radio, toggle, hidden, fieldset, heading, and submit field types.

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Form Heading | `text` | Heading displayed above the form |
| Form Description | `richtext` | Introductory text above the form |
| Form Definition | `aem-content` | Path to form JSON spreadsheet |
| Submit Action URL | `text` | Server endpoint for form submission |
| Submit Button Label | `text` | Button text (default: "Submit") |
| Confirmation Page URL | `text` | Redirect URL after successful submit |
| Privacy Text | `richtext` | Privacy/legal text displayed below the form |

**Form JSON format:** Standard AEM form spreadsheet with columns: `Name`, `Type`, `Label`, `Placeholder`, `Mandatory`, `Options`, `Value`, `Fieldset`, `Style`.

---

### batt-cards-product

Pricing/product cards with icon, price display, and CTA. Used for plan comparison.

**Directory:** `blocks/batt-cards-product/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Product Icon | `reference` | 48×48 product icon |
| Icon Alt Text | `text` | Alt text |
| Badge Label | `text` | Optional badge (e.g., "Best seller", "New") |
| Product Name | `text` | Card heading |
| Description | `richtext` | Product description |
| Price Prefix | `text` | Text before price (e.g., "Starting at") |
| Price | `text` | Price value (e.g., "$35/mo") — rendered large |
| Strikethrough Price | `text` | Original price shown struck through |
| Price Suffix | `text` | Text after price (e.g., "per line") |
| Legal / Fine Print | `richtext` | Terms text |
| CTA Label | `text` | Button text |
| CTA URL | `text` | Button link |

**Layout:** 1 column mobile → 3 columns desktop. Center-aligned content. Full-width CTA button.

---

### batt-value-prop

Split layout with image and content side featuring a checkmark list, used for value propositions.

**Directory:** `blocks/batt-value-prop/`

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Image | `reference` | Side image (16px rounded corners) |
| Image Alt Text | `text` | Alt text |
| Eyebrow Text | `text` | Small text above heading |
| Heading | `text` | Section heading |
| Description | `richtext` | Supporting body text below heading |
| Checklist Items | `richtext` | Unordered list rendered with cyan checkmarks |
| Legal / Fine Print | `richtext` | Disclaimers |
| Primary CTA Label | `text` | Primary button text |
| Primary CTA URL | `text` | Primary button link |
| CTA Target | `select` | `Same Window` · `_blank` (opens in new tab) |
| Secondary CTA Label | `text` | Outlined button text |
| Secondary CTA URL | `text` | Outlined button link |
| Layout | `select` | `image-right` · `no-image` |

**Layout:** Stacked mobile → 50/50 side-by-side desktop. Checklist items get `✓` prefix in `--batt-cyan`.

---

### batt-testimonial

Carousel of customer testimonials with quote, attribution, and navigation dots.

**Directory:** `blocks/batt-testimonial/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Quote | `richtext` | Customer testimonial text (auto-wrapped in curly quotes) |
| Name | `text` | Person's name |
| Role / Title | `text` | Job title |
| Company Name | `text` | Company or organization name |
| Avatar / Icon | `reference` | 64×64 circular avatar |
| Avatar Alt Text | `text` | Alt text |

**Layout:** Horizontal scroll carousel with snap behavior. Navigation dots below for multi-slide. Neutral grey background (`#f3f4f6`).

---

### batt-cards-story

Blog/insight cards with image overlay badges, used for content marketing and case studies.

**Directory:** `blocks/batt-cards-story/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Card Image | `reference` | 16:9 cover image with hover zoom |
| Image Alt Text | `text` | Alt text |
| Badge Label | `text` | Category overlay badge (e.g., "BLOG", "CASE STUDY") |
| Heading | `text` | Article title |
| Description | `richtext` | Article excerpt |
| Publish Date | `text` | Article date (e.g., Jan 15, 2025) |
| CTA Link Label | `text` | Read more link text |
| CTA Link URL | `text` | Article link |
| Card Link URL | `text` | Makes entire card clickable (overrides CTA) |

**Style Variants:**
- **Default** — 1 col mobile → 3 col desktop
- **Featured** (`featured`) — First card spans full width with 21:9 image
- **Two-Up** (`two-up`) — 2-column layout on desktop

**Badge color:** `--batt-blog-accent-purple` (`#af29bb`)

---

### batt-cards-solution

Action/solution cards for navigation and category browsing. Supports multiple visual variants.

**Directory:** `blocks/batt-cards-solution/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Icon | `reference` | 40×40 category icon |
| Icon Alt Text | `text` | Alt text |
| Heading | `text` | Card title |
| Description | `richtext` | Card body text |
| CTA Label | `text` | Visible link text (e.g., "Learn more") |
| CTA URL | `text` | CTA link destination |
| Card Link URL | `text` | Makes entire card clickable |

**Style Variants:**
- **Default** — Icon + text cards, 3 columns desktop
- **Text-only** (`text-only`) — Hides icon, compact layout
- **Icon-tiles** (`icon-tiles`) — Centered icon, 4 columns desktop
- **Colored-bar** (`colored-bar`) — Cyan top border accent

---

### batt-anchor-tabs

Sticky anchor navigation that scrolls to page sections with intersection observer for active state.

**Directory:** `blocks/batt-anchor-tabs/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Tab Label | `text` | Display text for the tab |
| Target Section ID | `text` | HTML `id` of the section to scroll to |

**Behavior:**
- Sticks below the main navigation (`top: --batt-nav-height`)
- Smooth-scrolls to target sections on click
- Active tab indicated by cyan bottom border (`--batt-cyan`)
- Horizontal scroll on mobile with hidden scrollbar

---

### batt-columns

Enhanced columns block using the EDS columns resource type with AT&T Business styling.

**Directory:** `blocks/batt-columns/`

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Columns | `number` | Number of columns (default: 2) |
| Rows | `number` | Number of rows (default: 1) |

**Layout:** Stacked mobile → side-by-side desktop. Child content slots support any default components (text, images, buttons, links). Images get 16px rounded corners. Links styled in `--batt-link-color`. Buttons use primary batt style.

---

### batt-seo-links

Four-column SEO link grid, typically placed near the footer for internal linking.

**Directory:** `blocks/batt-seo-links/`

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Section Heading | `text` | Heading above the link grid |
| Column 1 Links | `richtext` | Use heading + unordered list of links |
| Column 2 Links | `richtext` | Same format |
| Column 3 Links | `richtext` | Same format |
| Column 4 Links | `richtext` | Same format |

**Layout:** 1 col mobile → 2 col tablet → 4 col desktop. Top border separator. Links styled in `--batt-link-color` at 14px.

---

### batt-service-grid

Service category directory with icons and expandable link lists.

**Directory:** `blocks/batt-service-grid/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Category Icon | `reference` | 40×40 icon (tinted cyan via CSS filter) |
| Icon Alt Text | `text` | Alt text |
| Category Name | `text` | Section heading |
| Service Links | `richtext` | Unordered list of links to individual services |

**Layout:** 1 col mobile → 2 col tablet → 3 col desktop. Items separated by bottom borders on mobile (removed on tablet+).

---

### batt-accordion

Expandable FAQ/question-answer sections with expand-all toggle. Used on product, portfolio, offers, and area pages.

**Directory:** `blocks/batt-accordion/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Question / Title | `text` | Clickable heading that expands the panel |
| Answer / Content | `richtext` | Expandable content — supports rich text, links, and lists |

**Behavior:**
- Uses native `<details>` / `<summary>` HTML elements
- "Expand all" / "Collapse all" toggle button above items
- Plus/minus icon (CSS-drawn) rotates on open
- Top and bottom borders on each item

---

### batt-comparison-table

Feature/pricing comparison grid for comparing AT&T vs competitors across features.

**Directory:** `blocks/batt-comparison-table/`

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Table Heading | `text` | Heading above the table |
| Description | `richtext` | Optional intro text |
| Column Headers | `text` | Comma-separated column names (e.g., Feature, AT&T, Spectrum, Comcast) |
| Table Rows | `richtext` | Table data — supports HTML table or pipe-delimited rows. Use `✓` / `✕` for boolean values. |
| Legal / Fine Print | `richtext` | Footnotes and disclaimers |
| Style | `select` | `highlight-first` · `striped` |

**Style Variants:**
- **Default** — Clean bordered table with hover highlights
- **Highlight First** (`highlight-first`) — Accents the AT&T column with light blue background
- **Striped** (`striped`) — Alternating row backgrounds

**Layout:** Horizontally scrollable on mobile (`min-width: 500px`). Full width on desktop.

---

### batt-pricing-cards

Interactive pricing tier cards with toggle to switch between standalone and bundle pricing.

**Directory:** `blocks/batt-pricing-cards/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Tier Name | `text` | Plan name (e.g., Business Internet 300) |
| Speed / Key Metric | `text` | Primary metric (e.g., 300 Mbps) |
| Standalone Price | `text` | Price without bundle (e.g., $50/mo) |
| Bundle Price | `text` | Price with wireless bundle (e.g., $35/mo) |
| Strikethrough Price | `text` | Original price shown struck through |
| Feature List | `richtext` | Bullet list of included features (rendered with green checkmarks) |
| Badge | `text` | Optional badge (e.g., "Best value", "Most popular") |
| Legal / Fine Print | `richtext` | Terms text |
| CTA Label | `text` | Button text |
| CTA URL | `text` | Button link |
| Secondary CTA Label | `text` | Secondary link text |
| Secondary CTA URL | `text` | Secondary link destination |

**Behavior:**
- Pill-shaped toggle switches between "Internet only" and "With wireless" pricing
- Badge-highlighted cards get cyan border + floating badge pill
- Responsive: 1 col → 2 col → 3 col → 5 col at 1200px
- Feature items display green checkmarks

---

### batt-content-tabs

Horizontal tabs that switch displayed content in-place. Unlike batt-anchor-tabs which scroll to sections, this swaps panel content.

**Directory:** `blocks/batt-content-tabs/`

**Item Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Tab Label | `text` | Text shown on the tab button |
| Panel Image | `reference` | Image for the panel |
| Image Alt Text | `text` | Alt text |
| Panel Heading | `text` | Heading in the panel body |
| Panel Content | `richtext` | Rich text displayed when tab is active |
| CTA Label | `text` | Button text |
| CTA URL | `text` | Button link |

**Behavior:**
- Tab buttons with cyan underline on active state
- Content panels show/hide without page reload
- Keyboard navigation (ArrowLeft/ArrowRight)
- ARIA `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Desktop: side-by-side (image left, content right)
- Mobile: stacked (image top, content bottom)

---

### batt-banner

Full-width announcement or promotional banner bar with icon, message, CTA, and optional dismiss.

**Directory:** `blocks/batt-banner/`

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Icon / Badge Image | `reference` | Small icon displayed alongside text |
| Icon Alt Text | `text` | Alt text |
| Heading | `text` | Bold banner headline |
| Banner Message | `richtext` | Promotional or informational text |
| CTA Label | `text` | Action link text |
| CTA URL | `text` | Action link destination |
| Secondary CTA Label | `text` | Secondary link text |
| Secondary CTA URL | `text` | Secondary link destination |
| Dismissible | `boolean` | Allow users to close the banner |
| Style | `select` | `success` · `warning` · `promo` · `dark` |

**Style Variants:**
- **Info (Default)** — Light blue background (`#f2fafd`)
- **Success** — Green background
- **Warning** — Amber background
- **Promo** — Brand blue background (`#00388f`), white text, cyan CTA
- **Dark** — Charcoal background (`#25303a`), white text, cyan CTA

---

### batt-article

Full blog/article layout with header, hero image, body content, table of contents sidebar, social sharing, related articles, and email subscription.

**Directory:** `blocks/batt-article/`

**Authoring Fields:**

| Field | Component | Description |
|-------|-----------|-------------|
| Category | `text` | Category badge (e.g., BLOG, TECH ADVICE, RESEARCH) |
| Article Title | `text` | Main `<h1>` heading |
| Subtitle | `text` | Secondary heading below the title |
| Author Name | `text` | Author attribution |
| Publish Date | `text` | Format: Month Day, Year |
| Read Time | `text` | Estimated read time (e.g., "5 min read") |
| Hero Image | `reference` | Article hero image (16px rounded corners) |
| Hero Image Alt Text | `text` | Alt text |
| Article Body | `richtext` | Full article content with headings, paragraphs, images, lists |
| Show Table of Contents | `boolean` | Auto-generate sidebar TOC from article headings |
| Show Social Sharing | `boolean` | Display share buttons (X, LinkedIn, Facebook, Email) |
| Tags | `text` | Comma-separated topic tags (e.g., "5G, IoT, Healthcare") |
| Related Articles | `richtext` | List of related article links |
| Subscribe Heading | `text` | Email subscription CTA heading |
| Subscribe Description | `richtext` | Text displayed above the subscribe form |
| Subscribe Form Action URL | `text` | Endpoint for email subscription form |

**Layout:**
- Mobile: single column, TOC above article body
- Desktop: article body (fluid) + sticky sidebar (280px) with TOC and related articles
- Category badge uses `--batt-blog-accent-purple` (`#af29bb`)
- Subscribe section uses grey background (`--batt-grey-350`)

---

## File Structure

Each block directory contains 3–4 files:

```
blocks/batt-{name}/
├── batt-{name}.js          # Block decoration JavaScript
├── batt-{name}.css         # Block styles using --batt-* tokens
├── _batt-{name}.json       # Universal Editor component model
└── form-fields.js          # (batt-form only) Field creation helper
```

**Total:** 19 blocks × 3 files = 57 files (+ 1 form-fields.js = 58 files)

## Dependencies

- **Design tokens:** `/styles/batt/batt-tokens.css` — 250 CSS custom properties
- **Section styles:** `/styles/batt/batt-sections.css` — 4 section background variants
- **EDS scripts:** `scripts/aem.js` (`createOptimizedPicture`, `toClassName`) and `scripts/scripts.js` (`moveInstrumentation`)
- **Section filter:** `models/_section.json` — All 19 blocks registered in the section component filter

## Responsive Breakpoints

| Breakpoint | Usage |
|-----------|-------|
| `@media (width >= 600px)` | Mid-tier for card grids (2 columns) and form fields |
| `@media (width >= 900px)` | Primary desktop breakpoint (3+ columns, side-by-side layouts) |
| `@media (width >= 1200px)` | Wide desktop for pricing cards (5 columns) |

---

## Coverage Completeness

Based on a full sitemap audit of all 749 URLs on business.att.com, the 19 blocks in this inventory cover approximately **95%** of the site's UI patterns. This is a comprehensive block set for content authoring in Universal Editor.

The remaining ~5% consists of:

- **Filter/sort controls + load-more pagination** on listing pages (`/learn.html`, `/learn/customer-stories.html`) — these are listing-page behaviors rather than reusable content blocks
- **Floating sticky CTA widgets** — behavioral overlays, not content blocks
- **Partner profile pages** (`/partner-solutions/*`, 63 pages) — simple text + image layouts handled by default content and `batt-columns`

These edge cases are either handled by existing blocks with default content, or are interactive listing-page features that would typically be implemented as custom page-level scripts rather than EDS blocks.

Every page template across the 14 identified URL patterns has its primary components covered by these 19 blocks.

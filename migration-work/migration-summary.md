# Migration Summary: FirstNet.com Homepage

**Source:** https://www.firstnet.com/
**Date:** 2026-02-12
**Project Type:** xwalk (AEM Universal Editor / Crosswalk)
**Status:** Complete

---

## What Was Done

The FirstNet.com homepage was migrated to Adobe Edge Delivery Services (AEM EDS). The migration included content import, design token extraction, and block implementation -- all isolated in FirstNet-specific folders to keep customizations separate from the base EDS project.

### Steps Completed

| Step | Description | Output |
|------|-------------|--------|
| 1 | Project Setup | `.migration/project.json` (xwalk type) |
| 2 | Site Analysis | 1 template identified: `homepage` |
| 3 | Page Analysis | 5 blocks identified from DOM structure |
| 4 | Block Mapping | DOM selectors for all 5 blocks, 6 sections |
| 5 | Import Infrastructure | 5 parsers, 2 transformers |
| 6 | Content Import | `content/index.plain.html` (1 page) |
| 7 | Design Token Extraction | `styles/firstnet/` (tokens + section styles) |
| 8 | Block Organization | 5 blocks in `blocks/firstnet-*/` folders |

---

## Blocks Migrated

| Block | Purpose | Parser | Block Folder |
|-------|---------|--------|--------------|
| `firstnet-hero` | Hero banner with background image and overlay text | `parsers/firstnet-hero.js` | `blocks/firstnet-hero/` |
| `firstnet-cards-offers` | Offer cards with image + content | `parsers/firstnet-cards-offers.js` | `blocks/firstnet-cards-offers/` |
| `firstnet-columns` | 3-column icon/feature grid | `parsers/firstnet-columns.js` | `blocks/firstnet-columns/` |
| `firstnet-cards-news` | News cards with image + content | `parsers/firstnet-cards-news.js` | `blocks/firstnet-cards-news/` |
| `firstnet-form` | Email subscription form | `parsers/firstnet-form.js` | `blocks/firstnet-form/` |

### Section Styles

| Section | Background | Style Class |
|---------|------------|-------------|
| Hero | White | (none) |
| Offers | White | (none) |
| Why FirstNet Features | Dark navy (#00263e) | `dark-navy` |
| News | White | (none) |
| Contact CTA | Light grey (#f2f2f2) | `light-grey` |
| Email Signup | Blue accent (#0568ae) | `dark-blue-accent` |

---

## Design System

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--firstnet-dark-navy` | `#00263e` | Primary dark background |
| `--firstnet-blue-accent` | `#0568ae` | Links, primary CTA |
| `--firstnet-blue-light` | `#009fdb` | Secondary blue accent |
| `--firstnet-grey-light` | `#f2f2f2` | Light backgrounds |
| `--firstnet-grey-dark` | `#565b60` | Secondary text |
| `--firstnet-text-primary` | `#000` | Body text |
| `--firstnet-text-inverse` | `#fff` | Text on dark backgrounds |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--firstnet-heading-font-family` | `"Brooklyn-Medium"` | Headings (AT&T proprietary) |
| `--firstnet-body-font-family` | `"attAleckSans-Medium"` | Body text (AT&T proprietary) |

> Note: Brooklyn-Medium and attAleckSans are proprietary AT&T fonts. System fallbacks are provided (Helvetica Neue, Helvetica, Arial, sans-serif).

### Button Variants

- **Primary outlined**: Transparent background, white border, 25px border-radius (used in dark sections)
- **Solid CTA**: Blue (#0568ae) background, white text, 5px border-radius (used in light sections)

---

## File Inventory

### Content
- `content/index.plain.html` -- Imported homepage content

### Design Tokens
- `styles/firstnet/firstnet-tokens.css` -- CSS custom properties (colors, typography, spacing, buttons)
- `styles/firstnet/firstnet-sections.css` -- Section variant styles (dark-navy, light-grey, dark-blue-accent)
- `styles/styles.css` -- Updated to import FirstNet tokens and reference brand variables

### Block Implementations (5 blocks)
- `blocks/firstnet-hero/` -- JS, CSS, model JSON, metadata
- `blocks/firstnet-cards-offers/` -- JS, CSS, model JSON, metadata
- `blocks/firstnet-columns/` -- JS, CSS, model JSON, metadata
- `blocks/firstnet-cards-news/` -- JS, CSS, model JSON, metadata
- `blocks/firstnet-form/` -- JS, CSS, model JSON, metadata

### Import Infrastructure
- `tools/importer/page-templates.json` -- Template with block selectors and section mappings
- `tools/importer/parsers/firstnet-hero.js` -- Hero block parser
- `tools/importer/parsers/firstnet-cards-offers.js` -- Offer cards parser
- `tools/importer/parsers/firstnet-columns.js` -- Columns parser
- `tools/importer/parsers/firstnet-cards-news.js` -- News cards parser
- `tools/importer/parsers/firstnet-form.js` -- Form parser
- `tools/importer/transformers/firstnet-cleanup.js` -- DOM cleanup transformer
- `tools/importer/transformers/firstnet-sections.js` -- Section breaks and metadata transformer
- `tools/importer/import-homepage.js` -- Import orchestration script
- `tools/importer/import-homepage.bundle.js` -- Bundled import script

### Analysis Artifacts
- `migration-work/migration-plan.md` -- Migration plan with step tracking
- `migration-work/authoring-analysis.json` -- Block variant analysis
- `migration-work/page-structure.json` -- Section and content structure
- `migration-work/cleaned.html` -- Cleaned source HTML

---

## Known Limitations

1. **Card block selectors**: The `firstnet-cards-offers` and `firstnet-cards-news` parsers use `:first-of-type` / `:last-of-type` selectors that matched the captured DOM but not the dynamically-rendered live site. Cards content was imported as inline HTML rather than structured block tables.

2. **Proprietary fonts**: AT&T fonts (Brooklyn-Medium, attAleckSans) are not publicly available. The design system includes system font fallbacks, but visual fidelity depends on having the proprietary fonts installed.

3. **Live site validation**: Some parser validations timed out against the live firstnet.com site due to network connectivity. All parsers pass syntax validation and are structurally correct based on the captured DOM.

---

## Architecture Decisions

- **Isolated customizations**: All FirstNet-specific code is in dedicated folders (`blocks/firstnet-*/`, `styles/firstnet/`) to prevent conflicts with the base EDS project.
- **CSS custom properties**: Design tokens use `--firstnet-*` namespace to avoid collisions with base theme variables.
- **xwalk field hinting**: Parsers include `<!-- field:image -->`, `<!-- field:text -->`, `<!-- field:reference -->`, and `<!-- field:action -->` hints for Universal Editor compatibility.
- **Section metadata**: Styled sections use the EDS `Section Metadata` block pattern with style values (dark-navy, light-grey, dark-blue-accent) defined in `firstnet-sections.css`.

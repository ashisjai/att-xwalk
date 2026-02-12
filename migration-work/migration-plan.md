# Migration Plan: FirstNet.com Homepage

**Mode:** Single Page
**Source:** https://www.firstnet.com/
**Generated:** 2026-02-12
**Project Type:** xwalk

## Steps
- [x] 1. Project Setup
- [x] 2. Site Analysis (1 template: homepage)
- [x] 3. Page Analysis (5 FirstNet blocks: firstnet-hero, firstnet-cards-offers, firstnet-cards-news, firstnet-columns, firstnet-form)
- [x] 4. Block Mapping (5 blocks, 6 sections with DOM selectors)
- [x] 5. Import Infrastructure (5 parsers, 2 transformers)
- [x] 6. URL Classification and Content Import (1 page imported: content/index.plain.html)
- [x] 7. Design Token Extraction (styles/firstnet/firstnet-tokens.css, styles/firstnet/firstnet-sections.css)
- [x] 8. Organize FirstNet Blocks into Dedicated Folders (5 blocks in blocks/firstnet-*)

## Special Requirements
- All FirstNet-specific design tokens/themes go in dedicated folders (e.g., styles/firstnet/)
- All FirstNet-specific blocks go in dedicated folders (e.g., blocks/firstnet-*)
- Isolate FirstNet customizations from base EDS project

## Artifacts
- `.migration/project.json` (exists)
- `migration-work/migration-plan.md`
- `migration-work/authoring-analysis.json`
- `tools/importer/page-templates.json`
- `tools/importer/parsers/*.js`
- `tools/importer/transformers/*.js`
- `tools/importer/import-*.js`
- `content/*.html`
- `styles/firstnet/` (design tokens)
- `blocks/firstnet-*/` (FirstNet-specific blocks)

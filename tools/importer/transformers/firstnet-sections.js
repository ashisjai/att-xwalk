/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: FirstNet sections
 * Adds section breaks (<hr>) and section-metadata blocks based on template sections.
 * Runs in afterTransform only, after block parsing.
 *
 * Sections from page-templates.json:
 * - section-1: Hero Banner (no style)
 * - section-2: Offers Discounts (no style)
 * - section-3: Why FirstNet Features (dark-navy)
 * - section-4: Latest News (no style)
 * - section-5: Contact CTA (light-grey)
 * - section-6: Email Signup Banner (dark-blue-accent)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

/**
 * Find the first DOM element matching a section selector.
 * Supports single string or array of selectors (tried in order).
 */
function findSectionElement(element, selector) {
  if (Array.isArray(selector)) {
    for (const sel of selector) {
      const found = element.querySelector(sel);
      if (found) return found;
    }
    return null;
  }
  return element.querySelector(selector);
}

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.afterTransform) return;

  const { document } = payload;
  const template = payload.template;
  if (!template || !template.sections || template.sections.length <= 1) return;

  const sections = template.sections;

  // Process sections in reverse order to avoid DOM position shifts
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const sectionEl = findSectionElement(element, section.selector);
    if (!sectionEl) continue;

    // Add section-metadata block if section has a style
    if (section.style) {
      const sectionMetadata = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      // Insert section-metadata after the last element belonging to this section
      // We find the section content boundary by looking at the next section's first element
      if (i < sections.length - 1) {
        const nextSection = sections[i + 1];
        const nextSectionEl = findSectionElement(element, nextSection.selector);
        if (nextSectionEl) {
          nextSectionEl.before(sectionMetadata);
        } else {
          // No next section found; append at end of element
          element.append(sectionMetadata);
        }
      } else {
        // Last section - append at end
        element.append(sectionMetadata);
      }
    }

    // Add <hr> section break before section (except the first section)
    if (i > 0) {
      const hr = document.createElement('hr');
      sectionEl.before(hr);
    }
  }
}

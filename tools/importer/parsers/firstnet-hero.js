/* eslint-disable */
/* global WebImporter */

/**
 * Parser for firstnet-hero block
 *
 * Source: https://www.firstnet.com/
 * Base Block: hero
 *
 * Block Structure (from block library):
 * - Row 1: Block name header ("firstnet-hero")
 * - Row 2: Background image (1 column)
 * - Row 3: Content - title, subheading, CTA (1 column)
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="marquee-heading">
 *   <div class="marquee-item">
 *     <img src="..."> (background image)
 *     <div class="marquee-overlay">
 *       <h3>MISSION-CRITICAL COMMUNICATIONS</h3> (eyebrow)
 *       <h2>America's first responder network</h2> (heading)
 *       <p>...</p> (description)
 *       <a class="att-button primary large">Check eligibility</a> (CTA)
 *     </div>
 *   </div>
 * </div>
 *
 * xwalk model fields: image (reference), imageAlt (collapsed), text (richtext)
 */
export default function parse(element, { document }) {
  // Extract background image from marquee-item
  // Validated: .marquee-item > img exists in source DOM
  const bgImage = element.querySelector('.marquee-item > img') ||
                  element.querySelector('.marquee-item img:first-of-type');

  // Extract content from overlay
  // Validated: .marquee-overlay contains h3 (eyebrow), h2, p, a
  const overlay = element.querySelector('.marquee-overlay') ||
                  element.querySelector('.marquee-overlay-container');

  // Build content cell with heading, description, and CTA
  const contentFrag = document.createDocumentFragment();

  if (overlay) {
    // Eyebrow text (h3 with uppercase text like "MISSION-CRITICAL COMMUNICATIONS")
    const eyebrow = overlay.querySelector('h3');
    if (eyebrow) contentFrag.appendChild(eyebrow);

    // Main heading (h2 like "America's first responder network")
    const heading = overlay.querySelector('h2:not(:empty)');
    if (heading && heading.textContent.trim()) contentFrag.appendChild(heading);

    // Description paragraph
    const desc = overlay.querySelector('p');
    if (desc) contentFrag.appendChild(desc);

    // CTA link
    const cta = overlay.querySelector('a.att-button, a[class*="button"]');
    if (cta) {
      const p = document.createElement('p');
      const link = document.createElement('a');
      link.href = cta.href;
      link.textContent = cta.textContent.trim();
      p.appendChild(link);
      contentFrag.appendChild(p);
    }
  }

  // Build cells matching hero block library structure:
  // Row 1 (auto): block name "firstnet-hero"
  // Row 2: background image
  // Row 3: text content
  const cells = [];

  // Row 1: Background image with field hint
  if (bgImage) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(bgImage);
    cells.push([imgFrag]);
  } else {
    cells.push(['']);
  }

  // Row 2: Text content with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  textFrag.appendChild(contentFrag);
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'firstnet-hero', cells });
  element.replaceWith(block);
}

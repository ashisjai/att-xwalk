/* eslint-disable */
/* global WebImporter */

/**
 * Parser for firstnet-columns block
 *
 * Source: https://www.firstnet.com/
 * Base Block: columns
 *
 * Block Structure (from block library):
 * - Row 1: Block name header ("firstnet-columns")
 * - Row 2-N: Each row has N columns, each cell contains content
 *
 * For this instance: 1 row with 3 columns, each containing icon + title + description
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="icon-grid-description icon-grid">
 *   <div class="icon-grid-container">
 *     <div class="col-icon">
 *       <div class="ig-block">
 *         <img src="..." alt="">
 *         <div class="icon-grid-icon-title white-text"><p>Title</p></div>
 *         <div class="icon-grid-icon-description white-text"><p>Description</p></div>
 *       </div>
 *     </div>
 *     ... (3 columns)
 *   </div>
 * </div>
 *
 * xwalk model: columns block - no field hints needed per hinting.md Rule 5 (Columns exception)
 */
export default function parse(element, { document }) {
  // Find all column items (ig-block elements)
  // Validated: .ig-block elements exist within .col-icon containers in source DOM
  const columnItems = element.querySelectorAll('.ig-block');

  // Build single row with 3 columns
  const row = [];

  columnItems.forEach((item) => {
    const colFrag = document.createDocumentFragment();

    // Icon image
    const icon = item.querySelector('img');
    if (icon) {
      colFrag.appendChild(icon);
    }

    // Title (inside .icon-grid-icon-title)
    const titleEl = item.querySelector('.icon-grid-icon-title p') ||
                    item.querySelector('.icon-grid-icon-title');
    if (titleEl && titleEl.textContent.trim()) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      p.appendChild(strong);
      colFrag.appendChild(p);
    }

    // Description (inside .icon-grid-icon-description)
    const descEl = item.querySelector('.icon-grid-icon-description p') ||
                   item.querySelector('.icon-grid-icon-description');
    if (descEl && descEl.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      colFrag.appendChild(p);
    }

    row.push(colFrag);
  });

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, { name: 'firstnet-columns', cells });
  element.replaceWith(block);
}

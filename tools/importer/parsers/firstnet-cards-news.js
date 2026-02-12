/* eslint-disable */
/* global WebImporter */

/**
 * Parser for firstnet-cards-news block
 *
 * Source: https://www.firstnet.com/
 * Base Block: cards
 *
 * Block Structure (from block library):
 * - Row 1: Block name header ("firstnet-cards-news")
 * - Row 2-N: Each card = 2 columns [image | text content]
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="offersCard"> (inside .new-offers-card:last-of-type)
 *   <div class="container"><div class="row">
 *     <div class="col-md-4">
 *       <div class="card-tile bg-white">
 *         <div class="img-section"><img ...></div>
 *         <div class="content-section">
 *           <div class="eyebrow">PRODUCT LAUNCH</div>
 *           <div class="heading">Introducing FirstNet Fusion</div>
 *           <div class="acc-panel"><div class="bodyText"><p>...</p></div></div>
 *           <div class="cta-section">
 *             <a class="att-button primary-link">Read more</a>
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *     ... (3 cards total)
 *   </div></div>
 * </div>
 *
 * xwalk model (container): card items with fields: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  // Find all card tiles within the offersCard container
  // Validated: .card-tile elements exist in source DOM
  const cardTiles = element.querySelectorAll('.card-tile');

  const cells = [];

  cardTiles.forEach((card) => {
    // Column 1: Card image with field hint
    const img = card.querySelector('.img-section img') ||
                card.querySelector('img.img-responsive') ||
                card.querySelector('img');
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (img) {
      imgFrag.appendChild(img);
    }

    // Column 2: Text content with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    // Eyebrow category tag (e.g., "PRODUCT LAUNCH", "HEALTH AND WELLNESS")
    const eyebrow = card.querySelector('.eyebrow');
    if (eyebrow && eyebrow.textContent.trim()) {
      const em = document.createElement('em');
      em.textContent = eyebrow.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(em);
      textFrag.appendChild(p);
    }

    // Card heading (e.g., "Introducing FirstNet Fusion")
    const heading = card.querySelector('.heading');
    if (heading && heading.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(strong);
      textFrag.appendChild(p);
    }

    // Body text from acc-panel
    const bodyText = card.querySelector('.bodyText p') ||
                     card.querySelector('.bodyText');
    if (bodyText && bodyText.textContent.trim()) {
      if (bodyText.tagName === 'P') {
        textFrag.appendChild(bodyText);
      } else {
        const p = document.createElement('p');
        p.textContent = bodyText.textContent.trim();
        textFrag.appendChild(p);
      }
    }

    // CTA links (typically "Read more")
    const ctaLinks = card.querySelectorAll('.cta-section a');
    ctaLinks.forEach((cta) => {
      if (cta.textContent.trim()) {
        const p = document.createElement('p');
        const link = document.createElement('a');
        link.href = cta.href;
        link.textContent = cta.textContent.trim();
        p.appendChild(link);
        textFrag.appendChild(p);
      }
    });

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'firstnet-cards-news', cells });
  element.replaceWith(block);
}

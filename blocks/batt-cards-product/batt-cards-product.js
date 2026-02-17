import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Columns: icon, badge, heading, description, pricePrefix, price,
    // strikethroughPrice, priceSuffix, legal, cta
    const cols = [...row.children];
    const [iconCol, badgeCol, headingCol, descCol, prefixCol, priceCol,
      strikeCol, suffixCol, legalCol, ctaCol] = cols;

    // Card body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-card-body';

    // Icon
    const pic = iconCol?.querySelector('picture') || iconCol?.querySelector('img');
    if (pic) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'card-icon';
      iconDiv.append(pic.closest('picture') || pic);
      bodyDiv.append(iconDiv);
    }

    if (badgeCol?.textContent.trim()) {
      const badge = document.createElement('span');
      badge.className = 'card-badge';
      badge.textContent = badgeCol.textContent.trim();
      bodyDiv.append(badge);
    }

    if (headingCol?.textContent.trim()) {
      const heading = document.createElement('h3');
      heading.textContent = headingCol.textContent.trim();
      bodyDiv.append(heading);
    }

    if (descCol?.textContent.trim()) {
      const desc = document.createElement('p');
      desc.className = 'description';
      desc.textContent = descCol.textContent.trim();
      bodyDiv.append(desc);
    }

    // Price group
    const priceText = priceCol?.textContent.trim();
    if (priceText) {
      const priceGroup = document.createElement('div');
      priceGroup.className = 'price-group';

      const prefix = prefixCol?.textContent.trim();
      if (prefix) {
        const prefixEl = document.createElement('span');
        prefixEl.className = 'price-prefix';
        prefixEl.textContent = prefix;
        priceGroup.append(prefixEl);
      }

      const strikeText = strikeCol?.textContent.trim();
      if (strikeText) {
        const strikeEl = document.createElement('span');
        strikeEl.className = 'price-strikethrough';
        strikeEl.textContent = strikeText;
        priceGroup.append(strikeEl);
      }

      const priceEl = document.createElement('span');
      priceEl.className = 'price';
      priceEl.textContent = priceText;
      priceGroup.append(priceEl);

      const suffix = suffixCol?.textContent.trim();
      if (suffix) {
        const suffixEl = document.createElement('span');
        suffixEl.className = 'price-suffix';
        suffixEl.textContent = suffix;
        priceGroup.append(suffixEl);
      }

      bodyDiv.append(priceGroup);
    }

    if (legalCol?.textContent.trim()) {
      const legal = document.createElement('p');
      legal.className = 'legal';
      legal.textContent = legalCol.textContent.trim();
      bodyDiv.append(legal);
    }

    const ctaLink = ctaCol?.querySelector('a');
    if (ctaLink) {
      ctaLink.className = 'button';
      const p = document.createElement('p');
      p.className = 'button-container';
      p.append(ctaLink);
      bodyDiv.append(p);
    }

    li.append(bodyDiv);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}

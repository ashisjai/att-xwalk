import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Columns: icon, heading, description, cta, (ctaUrl), linkUrl
    const cols = [...row.children];
    const [iconCol, headingCol, descCol, ctaCol, , linkCol] = cols;

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

    const ctaLink = ctaCol?.querySelector('a');
    if (ctaLink) {
      const p = document.createElement('p');
      p.className = 'cta-link';
      p.append(ctaLink);
      bodyDiv.append(p);
    }

    li.append(bodyDiv);

    // Full-card link
    const link = linkCol?.querySelector('a') || linkCol?.textContent.trim();
    if (link) {
      const href = typeof link === 'string' ? link : link.href;
      if (href) {
        li.dataset.href = href;
        li.style.cursor = 'pointer';
      }
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Full-card click
  ul.querySelectorAll('li[data-href]').forEach((li) => {
    li.addEventListener('click', () => {
      window.location.href = li.dataset.href;
    });
  });

  block.textContent = '';
  block.append(ul);
}

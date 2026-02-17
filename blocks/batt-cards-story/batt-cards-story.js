import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Columns: image, badge, heading, description, publishDate, cta, linkUrl
    const cols = [...row.children];
    const [imageCol, badgeCol, headingCol, descCol, dateCol, ctaCol, , linkCol] = cols;

    // Card image with overlay
    const imageDiv = document.createElement('div');
    imageDiv.className = 'cards-card-image';
    const pic = imageCol?.querySelector('picture') || imageCol?.querySelector('img');
    if (pic) imageDiv.append(pic.closest('picture') || pic);

    // Badge overlay on image
    if (badgeCol?.textContent.trim()) {
      const badge = document.createElement('span');
      badge.className = 'card-badge';
      badge.textContent = badgeCol.textContent.trim();
      imageDiv.append(badge);
    }

    li.append(imageDiv);

    // Card body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-card-body';

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

    if (dateCol?.textContent.trim()) {
      const date = document.createElement('p');
      date.className = 'publish-date';
      date.textContent = dateCol.textContent.trim();
      bodyDiv.append(date);
    }

    const ctaLink = ctaCol?.querySelector('a');
    if (ctaLink) {
      const p = document.createElement('p');
      p.className = 'cta-link';
      p.append(ctaLink);
      bodyDiv.append(p);
    }

    // Full-card link
    const link = linkCol?.querySelector('a') || linkCol?.textContent?.trim();
    if (link) {
      const href = typeof link === 'string' ? link : link.href;
      if (href) {
        li.dataset.href = href;
        li.style.cursor = 'pointer';
      }
    }

    li.append(bodyDiv);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
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

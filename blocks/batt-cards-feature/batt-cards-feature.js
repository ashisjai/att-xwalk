import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Columns: image, heading, description, cta, linkUrl
    const cols = [...row.children];
    const [imageCol, headingCol, descCol, ctaCol, linkCol] = cols;

    // Card image / icon
    const imageDiv = document.createElement('div');
    imageDiv.className = 'cards-card-image';
    const pic = imageCol?.querySelector('picture') || imageCol?.querySelector('img');
    if (pic) imageDiv.append(pic.closest('picture') || pic);
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

    const ctaLink = ctaCol?.querySelector('a');
    if (ctaLink) {
      const p = document.createElement('p');
      p.className = 'cta-link';
      p.append(ctaLink);
      bodyDiv.append(p);
    }

    li.append(bodyDiv);

    // Full-card click wrapper
    const fullLink = linkCol?.querySelector('a') || linkCol?.textContent.trim();
    if (fullLink) {
      const href = typeof fullLink === 'string' ? fullLink : fullLink.href;
      if (href) li.dataset.href = href;
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Enable full-card click
  ul.querySelectorAll('li[data-href]').forEach((li) => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      window.location.href = li.dataset.href;
    });
  });

  block.textContent = '';
  block.append(ul);
}

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Columns: image, eyebrow, heading, description, legal, cta, secondaryCta
    const cols = [...row.children];
    const [imageCol, eyebrowCol, headingCol, descCol, legalCol, ctaCol, secondaryCol] = cols;

    // Card image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'cards-card-image';
    const pic = imageCol?.querySelector('picture') || imageCol?.querySelector('img');
    if (pic) imageDiv.append(pic.closest('picture') || pic);
    li.append(imageDiv);

    // Card body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-card-body';

    if (eyebrowCol?.textContent.trim()) {
      const eyebrow = document.createElement('p');
      eyebrow.className = 'eyebrow';
      eyebrow.textContent = eyebrowCol.textContent.trim();
      bodyDiv.append(eyebrow);
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

    const secondaryLink = secondaryCol?.querySelector('a');
    if (secondaryLink) {
      const p = document.createElement('p');
      p.className = 'secondary-cta';
      p.append(secondaryLink);
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

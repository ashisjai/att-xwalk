import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Columns: image, category, title, description, cta
    const cols = [...row.children];
    const [imageCol, categoryCol, titleCol, descCol, ctaCol] = cols;

    // Card image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'cards-card-image';
    const pic = imageCol?.querySelector('picture') || imageCol?.querySelector('img');
    if (pic) imageDiv.append(pic.closest('picture') || pic);
    li.append(imageDiv);

    // Card body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-card-body';

    if (categoryCol?.textContent.trim()) {
      const category = document.createElement('p');
      category.className = 'category';
      category.textContent = categoryCol.textContent.trim();
      bodyDiv.append(category);
    }

    if (titleCol?.textContent.trim()) {
      const heading = document.createElement('h3');
      heading.textContent = titleCol.textContent.trim();
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

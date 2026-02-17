import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Columns: icon, heading, links (richtext with list of links)
    const cols = [...row.children];
    const [iconCol, headingCol, linksCol] = cols;

    // Card body
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'grid-card-body';

    // Icon
    const pic = iconCol?.querySelector('picture') || iconCol?.querySelector('img');
    if (pic) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'grid-card-icon';
      iconDiv.append(pic.closest('picture') || pic);
      bodyDiv.append(iconDiv);
    }

    if (headingCol?.textContent.trim()) {
      const heading = document.createElement('h3');
      heading.textContent = headingCol.textContent.trim();
      bodyDiv.append(heading);
    }

    // Links list
    if (linksCol) {
      const linkList = linksCol.querySelector('ul');
      if (linkList) {
        linkList.className = 'grid-card-links';
        bodyDiv.append(linkList);
      } else if (linksCol.innerHTML.trim()) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'grid-card-links';
        linksDiv.innerHTML = linksCol.innerHTML;
        bodyDiv.append(linksDiv);
      }
    }

    li.append(bodyDiv);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}

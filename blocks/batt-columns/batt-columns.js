import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Set up columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // Optimize images
      col.querySelectorAll('picture > img').forEach((img) => {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        img.closest('picture').replaceWith(optimizedPic);
      });

      // Style links
      col.querySelectorAll('a').forEach((a) => {
        if (a.closest('.button-container') || a.classList.contains('button')) return;
        a.classList.add('batt-link');
      });
    });
  });
}

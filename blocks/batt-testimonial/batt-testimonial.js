import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  const track = document.createElement('div');
  track.className = 'testimonial-track';

  slides.forEach((row) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';
    moveInstrumentation(row, slide);

    // Columns: quote, attribution, attributionRole, companyName, icon
    const cols = [...row.children];
    const [quoteCol, attrCol, roleCol, companyCol, iconCol] = cols;

    // Icon / avatar
    const pic = iconCol?.querySelector('picture') || iconCol?.querySelector('img');
    if (pic) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'testimonial-icon';
      iconDiv.append(pic.closest('picture') || pic);
      slide.append(iconDiv);
    }

    // Quote
    if (quoteCol?.textContent.trim()) {
      const quoteEl = document.createElement('blockquote');
      quoteEl.textContent = quoteCol.textContent.trim();
      slide.append(quoteEl);
    }

    // Attribution
    if (attrCol?.textContent.trim()) {
      const cite = document.createElement('cite');
      const name = document.createElement('span');
      name.className = 'attribution-name';
      name.textContent = attrCol.textContent.trim();
      cite.append(name);

      if (roleCol?.textContent.trim()) {
        const role = document.createElement('span');
        role.className = 'attribution-role';
        role.textContent = roleCol.textContent.trim();
        cite.append(role);
      }

      if (companyCol?.textContent.trim()) {
        const company = document.createElement('span');
        company.className = 'attribution-company';
        company.textContent = companyCol.textContent.trim();
        cite.append(company);
      }

      slide.append(cite);
    }

    track.append(slide);
  });

  // Navigation dots
  const nav = document.createElement('div');
  nav.className = 'testimonial-nav';

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `testimonial-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => {
      track.scrollTo({ left: track.children[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
      nav.querySelectorAll('.testimonial-dot').forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
    });
    nav.append(dot);
  });

  // Optimize images
  track.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(track);
  if (slides.length > 1) block.append(nav);
}

import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.className = 'anchor-tabs-nav';
  nav.setAttribute('aria-label', 'Page sections');

  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cols = [...row.children];
    const [labelCol, targetCol] = cols;

    const label = labelCol?.textContent.trim() || '';
    const targetId = targetCol?.textContent.trim() || '';

    if (label && targetId) {
      const link = document.createElement('a');
      link.href = `#${targetId}`;
      link.textContent = label;
      link.dataset.target = targetId;
      li.append(link);
    }

    ul.append(li);
  });

  nav.append(ul);
  block.replaceChildren(nav);

  // Smooth scroll on click
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.target);
      if (target) {
        const offset = block.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Intersection Observer for active state
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { id } = entry.target;
        nav.querySelectorAll('a').forEach((a) => {
          a.classList.toggle('active', a.dataset.target === id);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  });

  nav.querySelectorAll('a').forEach((link) => {
    const target = document.getElementById(link.dataset.target);
    if (target) observer.observe(target);
  });
}

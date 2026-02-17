import { moveInstrumentation } from '../../scripts/scripts.js';

function toggleItem(details) {
  const isOpen = details.hasAttribute('open');
  if (isOpen) {
    details.removeAttribute('open');
  } else {
    details.setAttribute('open', '');
  }
}

export default function decorate(block) {
  const items = [...block.children];
  const container = document.createElement('div');
  container.className = 'accordion-items';

  // Expand-all toggle
  const controls = document.createElement('div');
  controls.className = 'accordion-controls';
  const expandBtn = document.createElement('button');
  expandBtn.className = 'accordion-expand-all';
  expandBtn.textContent = 'Expand all';
  expandBtn.setAttribute('aria-expanded', 'false');
  expandBtn.addEventListener('click', () => {
    const allOpen = expandBtn.getAttribute('aria-expanded') === 'true';
    container.querySelectorAll('details').forEach((d) => {
      if (allOpen) d.removeAttribute('open');
      else d.setAttribute('open', '');
    });
    expandBtn.setAttribute('aria-expanded', String(!allOpen));
    expandBtn.textContent = allOpen ? 'Expand all' : 'Collapse all';
  });
  controls.append(expandBtn);

  items.forEach((row) => {
    const cols = [...row.children];
    const question = cols[0]?.textContent?.trim() || '';
    const answerContent = cols[1] || document.createElement('div');

    const details = document.createElement('details');
    moveInstrumentation(row, details);

    const summary = document.createElement('summary');
    summary.textContent = question;

    const chevron = document.createElement('span');
    chevron.className = 'accordion-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    summary.append(chevron);

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      toggleItem(details);
    });

    const panel = document.createElement('div');
    panel.className = 'accordion-panel';
    panel.append(...answerContent.childNodes);

    details.append(summary, panel);
    container.append(details);
  });

  block.textContent = '';
  block.append(controls, container);
}

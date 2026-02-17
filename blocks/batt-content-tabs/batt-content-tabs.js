import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const tabList = document.createElement('div');
  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');

  const panelsContainer = document.createElement('div');
  panelsContainer.className = 'tabs-panels';

  rows.forEach((row, i) => {
    const cols = [...row.children];
    const label = cols[0]?.textContent?.trim() || `Tab ${i + 1}`;
    const image = cols[1]?.querySelector('picture');
    const imageAlt = cols[2]?.textContent?.trim() || '';
    const heading = cols[3]?.textContent?.trim() || '';
    const content = cols[4];
    const ctaLabel = cols[5]?.textContent?.trim() || '';
    const ctaUrl = cols[6]?.textContent?.trim() || '';

    const tabId = `tab-${i}`;
    const panelId = `panel-${i}`;

    // Tab button
    const tab = document.createElement('button');
    tab.className = `tab-button${i === 0 ? ' active' : ''}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(i === 0));
    tab.setAttribute('aria-controls', panelId);
    tab.id = tabId;
    tab.textContent = label;
    tabList.append(tab);

    // Panel
    const panel = document.createElement('div');
    panel.className = `tab-panel${i === 0 ? ' active' : ''}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.id = panelId;
    moveInstrumentation(row, panel);

    // Image
    if (image) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'tab-panel-image';
      const img = image.querySelector('img');
      if (img) {
        const optimized = createOptimizedPicture(img.src, imageAlt || img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimized.querySelector('img'));
        imgWrap.append(optimized);
      } else {
        imgWrap.append(image);
      }
      panel.append(imgWrap);
    }

    const body = document.createElement('div');
    body.className = 'tab-panel-body';

    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading;
      body.append(h3);
    }

    if (content?.textContent?.trim()) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'tab-panel-content';
      contentDiv.append(...content.childNodes);
      body.append(contentDiv);
    }

    if (ctaLabel && ctaUrl) {
      const cta = document.createElement('a');
      cta.className = 'button tab-panel-cta';
      cta.href = ctaUrl;
      cta.textContent = ctaLabel;
      body.append(cta);
    }

    panel.append(body);
    panelsContainer.append(panel);
  });

  // Tab switching
  tabList.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('.tab-button');
    if (!clickedTab) return;

    tabList.querySelectorAll('.tab-button').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    clickedTab.classList.add('active');
    clickedTab.setAttribute('aria-selected', 'true');

    const targetPanel = clickedTab.getAttribute('aria-controls');
    panelsContainer.querySelectorAll('.tab-panel').forEach((p) => {
      p.classList.toggle('active', p.id === targetPanel);
    });
  });

  // Keyboard navigation
  tabList.addEventListener('keydown', (e) => {
    const tabs = [...tabList.querySelectorAll('.tab-button')];
    const current = tabs.indexOf(document.activeElement);
    let next;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    if (next !== undefined) {
      tabs[next].focus();
      tabs[next].click();
    }
  });

  block.textContent = '';
  block.append(tabList, panelsContainer);
}

import { moveInstrumentation } from '../../scripts/scripts.js';

function buildToggle() {
  const toggle = document.createElement('div');
  toggle.className = 'pricing-toggle';

  const label1 = document.createElement('label');
  label1.className = 'pricing-toggle-option active';
  const radio1 = document.createElement('input');
  radio1.type = 'radio';
  radio1.name = 'pricing-mode';
  radio1.value = 'standalone';
  radio1.checked = true;
  label1.append(radio1);
  label1.append(document.createTextNode('Internet only'));

  const label2 = document.createElement('label');
  label2.className = 'pricing-toggle-option';
  const radio2 = document.createElement('input');
  radio2.type = 'radio';
  radio2.name = 'pricing-mode';
  radio2.value = 'bundle';
  label2.append(radio2);
  label2.append(document.createTextNode('With wireless'));

  toggle.append(label1, label2);
  return toggle;
}

function buildTierCard(row) {
  const cols = [...row.children];
  const card = document.createElement('div');
  card.className = 'pricing-card';
  moveInstrumentation(row, card);

  const tierName = cols[0]?.textContent?.trim() || '';
  const speed = cols[1]?.textContent?.trim() || '';
  const priceStandalone = cols[2]?.textContent?.trim() || '';
  const priceBundle = cols[3]?.textContent?.trim() || '';
  const strikePrice = cols[4]?.textContent?.trim() || '';
  const features = cols[5];
  const badge = cols[6]?.textContent?.trim() || '';
  const legal = cols[7];
  const ctaLabel = cols[8]?.textContent?.trim() || '';
  const ctaUrl = cols[9]?.textContent?.trim() || '';
  const secondaryLabel = cols[10]?.textContent?.trim() || '';
  const secondaryUrl = cols[11]?.textContent?.trim() || '';

  if (badge) {
    const badgeEl = document.createElement('div');
    badgeEl.className = 'pricing-badge';
    badgeEl.textContent = badge;
    card.append(badgeEl);
    card.classList.add('has-badge');
  }

  const header = document.createElement('div');
  header.className = 'pricing-header';

  const nameEl = document.createElement('h3');
  nameEl.textContent = tierName;
  header.append(nameEl);

  if (speed) {
    const speedEl = document.createElement('div');
    speedEl.className = 'pricing-speed';
    speedEl.textContent = speed;
    header.append(speedEl);
  }

  card.append(header);

  // Price displays (toggle switches between them)
  const priceSection = document.createElement('div');
  priceSection.className = 'pricing-prices';

  const standalonePriceEl = document.createElement('div');
  standalonePriceEl.className = 'pricing-price standalone active';
  standalonePriceEl.textContent = priceStandalone;
  priceSection.append(standalonePriceEl);

  const bundlePriceEl = document.createElement('div');
  bundlePriceEl.className = 'pricing-price bundle';
  bundlePriceEl.textContent = priceBundle;
  priceSection.append(bundlePriceEl);

  if (strikePrice) {
    const strikeEl = document.createElement('div');
    strikeEl.className = 'pricing-strikethrough';
    strikeEl.textContent = strikePrice;
    priceSection.append(strikeEl);
  }

  card.append(priceSection);

  // Features
  if (features?.textContent?.trim()) {
    const featDiv = document.createElement('div');
    featDiv.className = 'pricing-features';
    featDiv.append(...features.childNodes);
    card.append(featDiv);
  }

  // Legal
  if (legal?.textContent?.trim()) {
    const legalDiv = document.createElement('div');
    legalDiv.className = 'pricing-legal';
    legalDiv.append(...legal.childNodes);
    card.append(legalDiv);
  }

  // CTA
  if (ctaLabel && ctaUrl) {
    const cta = document.createElement('a');
    cta.className = 'button pricing-cta';
    cta.href = ctaUrl;
    cta.textContent = ctaLabel;
    card.append(cta);
  }

  if (secondaryLabel && secondaryUrl) {
    const secondary = document.createElement('a');
    secondary.className = 'pricing-cta secondary';
    secondary.href = secondaryUrl;
    secondary.textContent = secondaryLabel;
    card.append(secondary);
  }

  return card;
}

export default function decorate(block) {
  const rows = [...block.children];
  const toggle = buildToggle();
  const grid = document.createElement('div');
  grid.className = 'pricing-grid';

  rows.forEach((row) => {
    grid.append(buildTierCard(row));
  });

  // Toggle behavior
  toggle.addEventListener('change', (e) => {
    const mode = e.target.value;
    toggle.querySelectorAll('.pricing-toggle-option').forEach((opt) => {
      opt.classList.toggle('active', opt.querySelector('input').value === mode);
    });
    grid.querySelectorAll('.pricing-price').forEach((p) => {
      p.classList.toggle('active', p.classList.contains(mode));
    });
  });

  block.textContent = '';
  block.append(toggle, grid);
}

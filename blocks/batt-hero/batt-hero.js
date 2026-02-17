export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: image, Row 1: mobileImage, Row 2: badge, Row 3: eyebrow,
  // Row 4: heading, Row 5: subheading, Row 6: description, Row 7: legal,
  // Row 8: cta, Row 9: ctaTarget, Row 10: secondaryCta,
  // Row 11: classes, Row 12: paddingTop, Row 13: paddingBottom,
  // Row 14: marginTop, Row 15: marginBottom
  const [imageRow, , badgeRow, eyebrowRow, headingRow, subheadingRow,
    descriptionRow, legalRow, ctaRow, ctaTargetRow, secondaryCtaRow, ,
    paddingTopRow, paddingBottomRow, marginTopRow, marginBottomRow] = rows;

  // Apply spacing classes from dropdown fields
  [paddingTopRow, paddingBottomRow, marginTopRow, marginBottomRow].forEach((row) => {
    const val = row?.textContent?.trim();
    if (val) block.classList.add(val);
  });

  // Build background image container
  const bgContainer = document.createElement('div');
  bgContainer.className = 'hero-bg';
  const picture = imageRow?.querySelector('picture');
  if (picture) {
    bgContainer.append(picture);
  } else {
    const img = imageRow?.querySelector('img');
    if (img) bgContainer.append(img);
  }

  // Build text overlay container
  const textContainer = document.createElement('div');
  textContainer.className = 'hero-content';

  if (badgeRow?.textContent.trim()) {
    const badge = document.createElement('span');
    badge.className = 'hero-badge';
    badge.textContent = badgeRow.textContent.trim();
    textContainer.append(badge);
  }

  if (eyebrowRow?.textContent.trim()) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'hero-eyebrow';
    eyebrow.textContent = eyebrowRow.textContent.trim();
    textContainer.append(eyebrow);
  }

  if (headingRow?.textContent.trim()) {
    const heading = document.createElement('h1');
    heading.textContent = headingRow.textContent.trim();
    textContainer.append(heading);
  }

  if (subheadingRow?.textContent.trim()) {
    const subheading = document.createElement('p');
    subheading.className = 'hero-subheading';
    subheading.textContent = subheadingRow.textContent.trim();
    textContainer.append(subheading);
  }

  if (descriptionRow?.textContent.trim()) {
    const desc = document.createElement('p');
    desc.className = 'hero-description';
    desc.textContent = descriptionRow.textContent.trim();
    textContainer.append(desc);
  }

  if (legalRow?.textContent.trim()) {
    const legal = document.createElement('p');
    legal.className = 'hero-legal';
    legal.textContent = legalRow.textContent.trim();
    textContainer.append(legal);
  }

  const btnContainer = document.createElement('div');
  btnContainer.className = 'hero-actions';
  let hasActions = false;

  const ctaTarget = ctaTargetRow?.textContent?.trim();
  const ctaLink = ctaRow?.querySelector('a');
  if (ctaLink) {
    ctaLink.className = 'button primary';
    if (ctaTarget === '_blank') {
      ctaLink.target = '_blank';
      ctaLink.rel = 'noopener noreferrer';
    }
    const p = document.createElement('p');
    p.className = 'button-container';
    p.append(ctaLink);
    btnContainer.append(p);
    hasActions = true;
  }

  const secondaryLink = secondaryCtaRow?.querySelector('a');
  if (secondaryLink) {
    secondaryLink.className = 'button secondary';
    const p = document.createElement('p');
    p.className = 'button-container';
    p.append(secondaryLink);
    btnContainer.append(p);
    hasActions = true;
  }

  if (hasActions) textContainer.append(btnContainer);

  block.replaceChildren(bgContainer, textContainer);
}

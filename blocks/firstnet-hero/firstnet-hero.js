export default function decorate(block) {
  const rows = [...block.children];

  // Extract content from field-hinted rows (order matches model)
  // Row 0: image, Row 1: mobileImage, Row 2: eyebrow, Row 3: heading,
  // Row 4: description, Row 5: cta
  // Row 6: paddingTop, Row 7: paddingBottom, Row 8: marginTop, Row 9: marginBottom
  const [imageRow, , eyebrowRow, headingRow, descriptionRow, ctaRow,
    paddingTopRow, paddingBottomRow, marginTopRow, marginBottomRow] = rows;

  // Apply spacing classes from separate dropdown fields
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

  if (eyebrowRow) {
    const eyebrow = document.createElement('h3');
    eyebrow.textContent = eyebrowRow.textContent.trim();
    textContainer.append(eyebrow);
  }

  if (headingRow) {
    const heading = document.createElement('h2');
    heading.textContent = headingRow.textContent.trim();
    textContainer.append(heading);
  }

  if (descriptionRow) {
    const p = document.createElement('p');
    p.textContent = descriptionRow.textContent.trim();
    textContainer.append(p);
  }

  if (ctaRow) {
    const link = ctaRow.querySelector('a');
    if (link) {
      link.className = 'button';
      const p = document.createElement('p');
      p.className = 'button-container';
      p.append(link);
      textContainer.append(p);
    }
  }

  block.replaceChildren(bgContainer, textContainer);
}

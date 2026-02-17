export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: image, Row 1: eyebrow, Row 2: heading, Row 3: description,
  // Row 4: checklistItems, Row 5: legal, Row 6: cta, Row 7: secondaryCta,
  // Row 8: ctaTarget
  const [imageRow, eyebrowRow, headingRow, descriptionRow, checklistRow,
    legalRow, ctaRow, secondaryCtaRow, ctaTargetRow] = rows;

  // Image side
  const imageContainer = document.createElement('div');
  imageContainer.className = 'value-prop-image';
  const picture = imageRow?.querySelector('picture');
  if (picture) {
    imageContainer.append(picture);
  } else {
    const img = imageRow?.querySelector('img');
    if (img) imageContainer.append(img);
  }

  // Content side
  const contentContainer = document.createElement('div');
  contentContainer.className = 'value-prop-content';

  if (eyebrowRow?.textContent.trim()) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'value-prop-eyebrow';
    eyebrow.textContent = eyebrowRow.textContent.trim();
    contentContainer.append(eyebrow);
  }

  if (headingRow?.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.textContent = headingRow.textContent.trim();
    contentContainer.append(heading);
  }

  // Description text between heading and checklist
  const descContent = descriptionRow?.querySelector('div');
  if (descContent?.textContent?.trim()) {
    const desc = document.createElement('div');
    desc.className = 'value-prop-description';
    desc.append(...descContent.childNodes);
    contentContainer.append(desc);
  }

  // Checklist items from richtext (expects <ul> with <li> items)
  if (checklistRow) {
    const list = checklistRow.querySelector('ul');
    if (list) {
      list.className = 'checklist';
      contentContainer.append(list);
    } else if (checklistRow.textContent.trim()) {
      const checklist = document.createElement('ul');
      checklist.className = 'checklist';
      checklistRow.textContent.trim().split('\n').forEach((item) => {
        if (item.trim()) {
          const li = document.createElement('li');
          li.textContent = item.trim();
          checklist.append(li);
        }
      });
      contentContainer.append(checklist);
    }
  }

  if (legalRow?.textContent.trim()) {
    const legal = document.createElement('p');
    legal.className = 'value-prop-legal';
    legal.textContent = legalRow.textContent.trim();
    contentContainer.append(legal);
  }

  const btnContainer = document.createElement('div');
  btnContainer.className = 'value-prop-actions';
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
    if (ctaTarget === '_blank') {
      secondaryLink.target = '_blank';
      secondaryLink.rel = 'noopener noreferrer';
    }
    const p = document.createElement('p');
    p.className = 'button-container';
    p.append(secondaryLink);
    btnContainer.append(p);
    hasActions = true;
  }

  if (hasActions) contentContainer.append(btnContainer);

  block.replaceChildren(imageContainer, contentContainer);
}

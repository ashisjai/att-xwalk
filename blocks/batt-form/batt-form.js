import createField from './form-fields.js';

async function createForm(formHref, submitHref) {
  const { pathname } = new URL(formHref);
  const resp = await fetch(pathname);
  const json = await resp.json();

  const form = document.createElement('form');
  form.dataset.action = submitHref;

  const fields = await Promise.all(json.data.map((fd) => createField(fd, form)));
  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    form.querySelectorAll(`[data-fieldset="${fieldset.name}"`).forEach((field) => {
      fieldset.append(field);
    });
  });

  return form;
}

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === 'checkbox') {
        if (field.checked) payload[field.name] = payload[field.name] ? `${payload[field.name]},${field.value}` : field.value;
      } else {
        payload[field.name] = field.value;
      }
    }
  });
  return payload;
}

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

    // create payload
    const payload = generatePayload(form);
    const response = await fetch(form.dataset.action, {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (form.dataset.confirmation) {
        window.location.href = form.dataset.confirmation;
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;
  }
}

export default async function decorate(block) {
  const rows = [...block.children];

  // Row 0: formHeading, Row 1: formDescription, Row 2: reference (form JSON link),
  // Row 3: action URL, Row 4: submitLabel, Row 5: confirmationUrl, Row 6: privacyText
  const formHeadingText = rows[0]?.textContent?.trim();
  const formDescContent = rows[1]?.querySelector('div');

  const links = [...block.querySelectorAll('a')].map((a) => a.href);
  const formLink = links.find((link) => link.startsWith(window.location.origin) && link.endsWith('.json'));
  let submitLink = links.find((link) => link !== formLink);

  // Fallback: extract action URL from plain text
  if (!submitLink && rows[3]) {
    const text = rows[3].textContent.trim();
    if (text.startsWith('http')) submitLink = text;
  }

  const submitLabel = rows[4]?.textContent.trim() || 'Submit';
  const confirmationUrl = rows[5]?.textContent.trim() || '';
  const privacyContent = rows[6]?.querySelector('div');

  if (!formLink || !submitLink) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'form-wrapper';

  // Form heading
  if (formHeadingText) {
    const heading = document.createElement('h2');
    heading.className = 'form-heading';
    heading.textContent = formHeadingText;
    wrapper.append(heading);
  }

  // Form description
  if (formDescContent?.textContent?.trim()) {
    const desc = document.createElement('div');
    desc.className = 'form-description';
    desc.append(...formDescContent.childNodes);
    wrapper.append(desc);
  }

  const form = await createForm(formLink, submitLink);

  // Apply custom submit label
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn && submitLabel) submitBtn.textContent = submitLabel;

  // Store confirmation URL for post-submit redirect
  if (confirmationUrl) form.dataset.confirmation = confirmationUrl;

  wrapper.append(form);

  // Privacy text
  if (privacyContent?.textContent?.trim()) {
    const privacy = document.createElement('div');
    privacy.className = 'form-privacy';
    privacy.append(...privacyContent.childNodes);
    wrapper.append(privacy);
  }

  block.replaceChildren(wrapper);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = form.checkValidity();
    if (valid) {
      handleSubmit(form);
    } else {
      const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
      if (firstInvalidEl) {
        firstInvalidEl.focus();
        firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

/* eslint-disable */
/* global WebImporter */

/**
 * Parser for firstnet-form block
 *
 * Source: https://www.firstnet.com/
 * Base Block: form
 *
 * xwalk model fields (each field = separate row with field hint comment):
 *   Row 1: reference (aem-content) - <!-- field:reference --> + link to form definition (.json)
 *   Row 2: action (text, valueType: string) - <!-- field:action --> + form submission endpoint URL
 *
 * The decorate function (firstnet-form.js) expects:
 *   - A link ending in .json (form definition, same origin)
 *   - A link to the submit endpoint (action URL)
 *
 * Heading/description from the source page are extracted as default content
 * BEFORE the block table, not inside it.
 */
export default function parse(element, { document }) {
  // Extract heading/description as default content before the block
  const defaultContent = document.createDocumentFragment();

  const heading = element.querySelector('.col-text h2') ||
                  element.querySelector('h2');
  if (heading) {
    defaultContent.appendChild(heading);
  }

  const desc = element.querySelector('.description.email-txt') ||
               element.querySelector('p.description');
  if (desc) {
    defaultContent.appendChild(desc);
  }

  const legalText = element.querySelector('.legal-text.email-txt') ||
                    element.querySelector('p.legal-text');
  if (legalText) {
    defaultContent.appendChild(legalText);
  }

  // Row 1: reference (aem-content) - link to form definition with field hint
  const refCell = document.createDocumentFragment();
  refCell.appendChild(document.createComment(' field:reference '));
  const refLink = document.createElement('a');
  refLink.href = '/forms/email-signup.json';
  refLink.textContent = '/forms/email-signup.json';
  refCell.appendChild(refLink);

  // Row 2: action (text) - form submission endpoint with field hint
  const actionCell = document.createDocumentFragment();
  actionCell.appendChild(document.createComment(' field:action '));
  const form = element.querySelector('form');
  const actionUrl = (form && form.action) ? form.action : '/email-signup';
  const actionText = document.createElement('p');
  actionText.textContent = actionUrl;
  actionCell.appendChild(actionText);

  // Each model field gets its own row (matching xwalk model-based block pattern)
  const cells = [
    [refCell],    // Row 1: reference field
    [actionCell], // Row 2: action field
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'firstnet-form', cells });

  // Insert default content before the block
  const wrapper = document.createDocumentFragment();
  wrapper.appendChild(defaultContent);
  wrapper.appendChild(block);

  // Clean up residual content in the parent container (gated forms, tracking pixels,
  // feedback widgets) that are siblings of the matched element
  const parent = element.parentElement;
  element.replaceWith(wrapper);

  if (parent) {
    // Remove all remaining form elements, inputs, selects
    parent.querySelectorAll('form, input, select, textarea').forEach((el) => el.remove());

    // Remove gated content form fields (paragraphs with field labels followed by empty lists)
    parent.querySelectorAll('ul').forEach((ul) => {
      if (ul.textContent.trim() === '') ul.remove();
    });

    // Remove tracking pixels and close buttons
    parent.querySelectorAll('p').forEach((p) => {
      const img = p.querySelector('img');
      const link = p.querySelector('a');
      const text = p.textContent.trim();

      // Remove tracking pixel paragraphs
      if (img) {
        const src = img.getAttribute('src') || '';
        if (src.includes('bat.bing.com') || src.includes('rlcdn.com')
            || src.includes('verint') || src.includes('.gif')) {
          p.remove();
          return;
        }
      }

      // Remove close button (×)
      if (link && (text === '×' || text === 'x') && (!link.href || link.href === '' || link.href.endsWith('#'))) {
        p.remove();
        return;
      }

      // Remove residual form-related text
      if (text === 'Submit' || text === 'Feedback'
          || text === 'Please provide the following information to access your document:'
          || text.startsWith('By submitting this form')) {
        p.remove();
        return;
      }

      // Remove orphaned form field labels (short text without links/images)
      if (!img && !link && text.length < 30 && !p.querySelector('strong, em, h1, h2, h3, h4, h5, h6')) {
        const prevSibling = p.previousElementSibling;
        const nextSibling = p.nextElementSibling;
        // If surrounded by other short paragraphs or empty lists, likely a form field label
        if ((prevSibling && prevSibling.tagName === 'P' && prevSibling.textContent.trim().length < 30)
            || (nextSibling && nextSibling.tagName === 'UL' && nextSibling.textContent.trim() === '')) {
          p.remove();
        }
      }
    });
  }
}

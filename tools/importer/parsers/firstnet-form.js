/* eslint-disable */
/* global WebImporter */

/**
 * Parser for firstnet-form block
 *
 * Source: https://www.firstnet.com/
 * Base Block: form
 *
 * Block Structure:
 * - Row 1: Block name header ("firstnet-form")
 * - Row 2: Form reference (link to form definition)
 * - Row 3: Action URL (form submission endpoint)
 *
 * Source HTML Pattern (from captured DOM):
 * <section class="firstnet-email-sub" id="firstnet-email-signup">
 *   <div class="container"><div class="row">
 *     <div class="email-sub-wrapper">
 *       <div class="col-text">
 *         <h2>LEARN ABOUT AMERICA'S PUBLIC SAFETY NETWORK</h2>
 *         <p class="description email-txt">Get connected</p>
 *         <p class="legal-text email-txt">By clicking Submit, you consent to...</p>
 *       </div>
 *       <div class="col-emailsub">
 *         <form class="firstnetsub-email-subscription">
 *           <input id="email">
 *           <select id="subFormCategory">...</select>
 *           <a class="button blue">Submit</a>
 *         </form>
 *       </div>
 *     </div>
 *   </div></div>
 * </section>
 *
 * xwalk model fields: reference (aem-content), action (text)
 * Note: For form blocks, we capture the heading/description and form structure
 * as rich text content since the actual form definition will be managed separately.
 */
export default function parse(element, { document }) {
  // Build content cell capturing the form section content
  // Row 1: Form reference (heading + description + form summary)
  const refFrag = document.createDocumentFragment();
  refFrag.appendChild(document.createComment(' field:reference '));

  // Heading (e.g., "LEARN ABOUT AMERICA'S PUBLIC SAFETY NETWORK")
  const heading = element.querySelector('.col-text h2') ||
                  element.querySelector('h2');
  if (heading) {
    refFrag.appendChild(heading);
  }

  // Description text (e.g., "Get connected")
  const desc = element.querySelector('.description.email-txt') ||
               element.querySelector('p.description');
  if (desc) {
    refFrag.appendChild(desc);
  }

  // Legal text
  const legalText = element.querySelector('.legal-text.email-txt') ||
                    element.querySelector('p.legal-text');
  if (legalText) {
    refFrag.appendChild(legalText);
  }

  // Row 2: Action URL - capture the form action or a placeholder
  const actionFrag = document.createDocumentFragment();
  actionFrag.appendChild(document.createComment(' field:action '));

  const form = element.querySelector('form');
  if (form && form.action) {
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = form.action;
    link.textContent = form.action;
    p.appendChild(link);
    actionFrag.appendChild(p);
  } else {
    // Provide placeholder action URL
    const p = document.createElement('p');
    p.textContent = '/email-signup';
    actionFrag.appendChild(p);
  }

  const cells = [
    [refFrag],
    [actionFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'firstnet-form', cells });
  element.replaceWith(block);
}

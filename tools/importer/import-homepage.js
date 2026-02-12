/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS - Import all parsers needed for the homepage template
import firstnetHeroParser from './parsers/firstnet-hero.js';
import firstnetCardsOffersParser from './parsers/firstnet-cards-offers.js';
import firstnetColumnsParser from './parsers/firstnet-columns.js';
import firstnetCardsNewsParser from './parsers/firstnet-cards-news.js';
import firstnetFormParser from './parsers/firstnet-form.js';

// TRANSFORMER IMPORTS - Import all transformers from tools/importer/transformers/
import firstnetCleanupTransformer from './transformers/firstnet-cleanup.js';
import firstnetSectionsTransformer from './transformers/firstnet-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'FirstNet.com homepage - main landing page with hero, feature sections, and call-to-action areas for first responder network services',
  urls: [
    'https://www.firstnet.com/'
  ],
  blocks: [
    {
      name: 'firstnet-hero',
      instances: ['.marquee-heading']
    },
    {
      name: 'firstnet-cards-offers',
      instances: ['.new-offers-card:first-of-type .offersCard']
    },
    {
      name: 'firstnet-columns',
      instances: ['.icon-grid-description.icon-grid']
    },
    {
      name: 'firstnet-cards-news',
      instances: ['.new-offers-card:last-of-type .offersCard']
    },
    {
      name: 'firstnet-form',
      instances: ['section.firstnet-email-sub']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '.marquee-heading',
      style: null,
      blocks: ['firstnet-hero'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Offers Discounts',
      selector: ['.segment-heading:has(h3.no-title:not(.white-text)):first-of-type', '.new-offers-card:first-of-type'],
      style: null,
      blocks: ['firstnet-cards-offers'],
      defaultContent: ['section.segment-heading:has(h3:not(.white-text)):first-of-type']
    },
    {
      id: 'section-3',
      name: 'Why FirstNet Features',
      selector: ['.segment-heading:has(.white-text)', '.icon-grid-description.icon-grid', '.call-to-action:nth-of-type(2)', '.legal-text.text:has(.white-text)'],
      style: 'dark-navy',
      blocks: ['firstnet-columns'],
      defaultContent: ['section.segment-heading:has(.white-text)', '.call-to-action:nth-of-type(2)', '.legal-text.text:has(.white-text)']
    },
    {
      id: 'section-4',
      name: 'Latest News',
      selector: ['.segment-heading:has(h3.black-text)', '.new-offers-card:last-of-type', '.call-to-action:has(.icon-long-arrow)'],
      style: null,
      blocks: ['firstnet-cards-news'],
      defaultContent: ['section.segment-heading:has(h3.black-text)', '.call-to-action:has(.icon-long-arrow)']
    },
    {
      id: 'section-5',
      name: 'Contact CTA',
      selector: '.experiencefragment:has(h3 span)',
      style: 'light-grey',
      blocks: [],
      defaultContent: ['.experiencefragment:has(h3 span)']
    },
    {
      id: 'section-6',
      name: 'Email Signup Banner',
      selector: '.experiencefragment:has(#firstnet-email-signup)',
      style: 'dark-blue-accent',
      blocks: ['firstnet-form'],
      defaultContent: ['.col-text h2', 'p.description.email-txt', 'p.legal-text.email-txt']
    }
  ]
};

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'firstnet-hero': firstnetHeroParser,
  'firstnet-cards-offers': firstnetCardsOffersParser,
  'firstnet-columns': firstnetColumnsParser,
  'firstnet-cards-news': firstnetCardsNewsParser,
  'firstnet-form': firstnetFormParser,
};

// TRANSFORMER REGISTRY - Array of transformer functions
// Section transformer runs after cleanup in afterTransform hook
const transformers = [
  firstnetCleanupTransformer,
  firstnetSectionsTransformer,
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 0. Immediately remove all scripts to prevent deferred JS from injecting
    // content (gated forms, tracking pixels) during or after the transform
    main.querySelectorAll('script').forEach((s) => s.remove());

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 4.5. Final pass: remove residual gated form content that survives parsing
    // These are loose form field labels, tracking pixels, close buttons etc.
    // that are siblings of the parsed firstnet-form block.
    const formLabels = [
      'first name', 'last name', 'company', 'company name',
      'title', 'title name', 'city', 'state', 'zip code',
      'email', 'email address', 'phone', 'phone number',
      'submit', 'feedback',
    ];
    // The form labels may be in <label>, <span>, <div>, <input> etc.
    // (not <p> tags). They become <p> only after markdown→HTML conversion.
    // Search ALL elements for matching text content.
    const formLabelSet = new Set(formLabels);
    [...main.querySelectorAll('p, span, label, div, li, td')].forEach((el) => {
      const text = (el.textContent || '').replace(/\u00A0/g, ' ').trim();
      const lower = text.toLowerCase();

      // Skip elements with children that are block-level or contain important content
      if (el.children.length > 0 && el.tagName !== 'P') {
        // Only remove leaf elements or simple wrappers
        const hasBlockChild = el.querySelector('div, table, ul, ol, h1, h2, h3, h4, h5, h6, section');
        if (hasBlockChild) return;
      }

      // Close button (× or x as link text)
      if (el.querySelector('a') && (text === '\u00D7' || text === '×' || lower === 'x')) {
        el.remove();
        return;
      }

      // Tracking pixel images
      const img = el.querySelector('img');
      if (img) {
        const src = img.getAttribute('src') || '';
        if (src.includes('verint') || src.includes('bat.bing.com')
            || src.includes('rlcdn.com') || src.includes('d41.co')
            || src.includes('.gif')) {
          el.remove();
          return;
        }
      }

      // Form field labels
      if (formLabelSet.has(lower)) {
        el.remove();
        return;
      }

      // Gated form instructional/consent text
      if (lower.startsWith('please provide the following information')
          || lower.startsWith('by submitting this form')) {
        el.remove();
        return;
      }
    });

    // Remove empty <ul> elements (form validation placeholders)
    [...main.querySelectorAll('ul')].forEach((ul) => {
      if ((ul.textContent || '').trim() === '') ul.remove();
    });

    // Remove <input>, <select>, <textarea> elements (form field remnants)
    [...main.querySelectorAll('input, select, textarea')].forEach((el) => el.remove());

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    // 7. Deep-clone the element to freeze the DOM state
    const frozen = main.cloneNode(true);

    return [{
      element: frozen,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};

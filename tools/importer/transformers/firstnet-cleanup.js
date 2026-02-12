/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: FirstNet cleanup
 * Removes non-authorable content from FirstNet.com pages.
 * Selectors validated against captured DOM from https://www.firstnet.com/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie banners, modals, and overlays that may block parsing
    // Found in captured DOM: modal elements and hidden inputs
    WebImporter.DOMUtils.remove(element, [
      '.modal-anchor',
      '.modal',
      '.modal-backdrop',
      '[class*="cookie"]',
      '[id*="cookie"]',
      'noscript',
    ]);

    // Remove lazy-loaded placeholder images (base64 gif placeholders)
    const placeholderImgs = element.querySelectorAll('img[src^="data:image/gif"]');
    placeholderImgs.forEach((img) => img.remove());

    // Remove hidden inputs used for tracking
    const hiddenInputs = element.querySelectorAll('input[type="hidden"], input.input-hidden');
    hiddenInputs.forEach((input) => input.remove());
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    // Found in captured DOM: nav.main-navigation, footer.Att-Footer
    // Also target broader header/footer/nav patterns for live site DOM
    WebImporter.DOMUtils.remove(element, [
      'nav',
      'nav.main-navigation',
      'header',
      'footer',
      'footer.Att-Footer',
      '.Att-Footer',
      '.Att-Header',
      '[class*="breadcrumb"]',
      '[class*="globalNav"]',
      '[class*="global-nav"]',
      '[class*="site-header"]',
      '[class*="site-footer"]',
      '[id*="globalNav"]',
      '[id*="sitemap"]',
      '[role="navigation"]',
      '[role="banner"]',
      '[role="contentinfo"]',
      'iframe',
      'link',
      'script',
      '.skip-nav',
      '.sr-only',
      '.gated-content-form',
      '[class*="chat-widget"]',
      '[id*="chat"]',
    ]);

    // Clean up tracking attributes from all elements
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('data-sitecat-cta');
      el.removeAttribute('data-sitecat-position');
      el.removeAttribute('data-sitecat-datatype');
      el.removeAttribute('onclick');
    });

    // Remove gated content forms and popups (e.g., "Please provide the following information")
    WebImporter.DOMUtils.remove(element, [
      '.gated-form',
      '[class*="gated-content"]',
      '[class*="gatedContent"]',
      '.modal-form',
    ]);

    // Remove tracking pixels (1x1 images from third-party domains)
    element.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (src.includes('bat.bing.com')
        || src.includes('rlcdn.com')
        || src.includes('d41.co')
        || src.includes('demdex.net')
        || src.includes('doubleclick.net')
        || src.includes('facebook.com/tr')
        || src.includes('verint')
        || (src.endsWith('.gif') && img.width <= 1)) {
        const parent = img.closest('p') || img.parentElement;
        if (parent && parent.children.length <= 1) {
          parent.remove();
        } else {
          img.remove();
        }
      }
    });

    // Remove Verint/Foresee feedback widgets
    WebImporter.DOMUtils.remove(element, [
      '[class*="verint"]',
      '[id*="verint"]',
      '[class*="foresee"]',
    ]);

    // Remove empty containers left after cleanup
    WebImporter.DOMUtils.remove(element, [
      '.featured-products-container',
      '.error-dropdown-msg',
      '.mobile-image',
    ]);

    // Remove residual gated form content (form field labels, empty lists,
    // close buttons, submit buttons, tracking consent text) that survive
    // after parsers run. These are loose elements outside any container.
    const formFieldLabels = new Set([
      'first name', 'last name', 'company', 'company name',
      'title', 'title name', 'city', 'state', 'zip code',
      'email', 'email address', 'phone', 'phone number',
      'submit', 'feedback',
    ]);

    element.querySelectorAll('p').forEach((p) => {
      const text = p.textContent.trim();
      const lower = text.toLowerCase();

      // Remove close button paragraphs (× or x as link text)
      const link = p.querySelector('a');
      if (link && (text === '×' || text === 'x')) {
        p.remove();
        return;
      }

      // Remove known form field labels
      if (formFieldLabels.has(lower)) {
        p.remove();
        return;
      }

      // Remove gated form instructional text
      if (text === 'Please provide the following information to access your document:'
        || text.startsWith('By submitting this form')) {
        p.remove();
        return;
      }
    });

    // Remove empty <ul> elements (leftover from form validation placeholders)
    element.querySelectorAll('ul').forEach((ul) => {
      if (ul.textContent.trim() === '') {
        ul.remove();
      }
    });
  }
}

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

    // Remove empty containers left after cleanup
    WebImporter.DOMUtils.remove(element, [
      '.featured-products-container',
      '.error-dropdown-msg',
      '.mobile-image',
    ]);
  }
}

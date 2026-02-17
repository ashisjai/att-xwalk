import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  const [iconRow, , headingRow, messageRow, ctaLabelRow, ctaUrlRow,
    secondaryCtaRow, secondaryCtaUrlRow, dismissibleRow] = rows;

  const banner = document.createElement('div');
  banner.className = 'banner-inner';

  // Icon
  const iconPic = iconRow?.querySelector('picture');
  if (iconPic) {
    const iconWrap = document.createElement('div');
    iconWrap.className = 'banner-icon';
    const img = iconPic.querySelector('img');
    if (img) {
      const optimized = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '100' }]);
      iconWrap.append(optimized);
    } else {
      iconWrap.append(iconPic);
    }
    banner.append(iconWrap);
  }

  // Heading
  const headingText = headingRow?.textContent?.trim();
  if (headingText) {
    const heading = document.createElement('strong');
    heading.className = 'banner-heading';
    heading.textContent = headingText;
    banner.append(heading);
  }

  // Message
  const msgContent = messageRow?.querySelector('div');
  if (msgContent?.textContent?.trim()) {
    const msg = document.createElement('div');
    msg.className = 'banner-message';
    msg.append(...msgContent.childNodes);
    banner.append(msg);
  }

  // CTA
  const ctaLabel = ctaLabelRow?.textContent?.trim();
  const ctaUrl = ctaUrlRow?.textContent?.trim();
  if (ctaLabel && ctaUrl) {
    const cta = document.createElement('a');
    cta.className = 'banner-cta';
    cta.href = ctaUrl;
    cta.textContent = ctaLabel;
    banner.append(cta);
  }

  // Secondary CTA
  const secLabel = secondaryCtaRow?.textContent?.trim();
  const secUrl = secondaryCtaUrlRow?.textContent?.trim();
  if (secLabel && secUrl) {
    const secCta = document.createElement('a');
    secCta.className = 'banner-cta banner-cta-secondary';
    secCta.href = secUrl;
    secCta.textContent = secLabel;
    banner.append(secCta);
  }

  // Dismiss button
  const isDismissible = dismissibleRow?.textContent?.trim().toLowerCase() === 'true';
  if (isDismissible) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'banner-close';
    closeBtn.setAttribute('aria-label', 'Dismiss banner');
    closeBtn.innerHTML = '<span aria-hidden="true">&times;</span>';
    closeBtn.addEventListener('click', () => {
      block.closest('.section')?.remove();
    });
    banner.append(closeBtn);
  }

  block.textContent = '';
  block.append(banner);
}

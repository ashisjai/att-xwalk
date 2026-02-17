function buildToc(articleBody) {
  const headings = articleBody.querySelectorAll('h2, h3');
  if (headings.length < 2) return null;

  const toc = document.createElement('nav');
  toc.className = 'article-toc';
  const tocTitle = document.createElement('h4');
  tocTitle.textContent = 'In this article:';
  toc.append(tocTitle);

  const list = document.createElement('ol');
  headings.forEach((heading, i) => {
    const id = heading.id || `section-${i}`;
    heading.id = id;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = heading.textContent;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth' });
    });
    li.append(a);
    list.append(li);
  });
  toc.append(list);
  return toc;
}

function buildShareButtons(url, title) {
  const share = document.createElement('div');
  share.className = 'article-share';

  const label = document.createElement('span');
  label.className = 'share-label';
  label.textContent = 'Share';
  share.append(label);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    { name: 'X', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Email', url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];

  platforms.forEach(({ name, url: shareUrl }) => {
    const a = document.createElement('a');
    a.className = `share-btn share-${name.toLowerCase()}`;
    a.href = shareUrl;
    a.target = name === 'Email' ? '_self' : '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `Share on ${name}`);
    a.textContent = name;
    share.append(a);
  });

  return share;
}

function buildSubscribeForm(heading, description, action) {
  const section = document.createElement('div');
  section.className = 'article-subscribe';

  const h3 = document.createElement('h3');
  h3.textContent = heading || 'Stay in the know';
  section.append(h3);

  if (description) {
    const desc = document.createElement('p');
    desc.className = 'subscribe-description';
    desc.textContent = description;
    section.append(desc);
  }

  const form = document.createElement('form');
  form.action = action || '#';
  form.method = 'post';
  form.className = 'subscribe-form';

  const input = document.createElement('input');
  input.type = 'email';
  input.placeholder = 'Enter your email';
  input.required = true;
  input.name = 'email';
  input.className = 'subscribe-input';

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.className = 'button subscribe-btn';
  btn.textContent = 'Subscribe';

  form.append(input, btn);
  section.append(form);
  return section;
}

export default function decorate(block) {
  const rows = [...block.children];
  const [
    categoryRow, headingRow, subtitleRow, authorRow, dateRow, readTimeRow,
    heroImageRow, , bodyRow, showTocRow, showSharingRow, tagsRow,
    relatedRow, subscribeHeadingRow, subscribeDescRow, subscribeActionRow,
  ] = rows;

  const article = document.createElement('article');
  article.className = 'article-layout';

  // Header
  const header = document.createElement('header');
  header.className = 'article-header';

  const category = categoryRow?.textContent?.trim();
  if (category) {
    const badge = document.createElement('span');
    badge.className = 'article-category';
    badge.textContent = category;
    header.append(badge);
  }

  const heading = headingRow?.textContent?.trim();
  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading;
    header.append(h1);
  }

  const subtitle = subtitleRow?.textContent?.trim();
  if (subtitle) {
    const sub = document.createElement('p');
    sub.className = 'article-subtitle';
    sub.textContent = subtitle;
    header.append(sub);
  }

  // Meta line
  const meta = document.createElement('div');
  meta.className = 'article-meta';
  const author = authorRow?.textContent?.trim();
  const date = dateRow?.textContent?.trim();
  const readTime = readTimeRow?.textContent?.trim();
  const metaParts = [author, date, readTime].filter(Boolean);
  meta.textContent = metaParts.join(' · ');
  if (metaParts.length) header.append(meta);

  article.append(header);

  // Hero image
  const heroPic = heroImageRow?.querySelector('picture');
  if (heroPic) {
    const heroWrap = document.createElement('div');
    heroWrap.className = 'article-hero-image';
    heroWrap.append(heroPic);
    article.append(heroWrap);
  }

  // Sharing (top)
  const showSharing = showSharingRow?.textContent?.trim().toLowerCase() === 'true';
  if (showSharing) {
    article.append(buildShareButtons(window.location.href, heading || ''));
  }

  // Main content area (body + sidebar)
  const main = document.createElement('div');
  main.className = 'article-main';

  // Body
  const bodyContent = bodyRow?.querySelector('div');
  const bodyEl = document.createElement('div');
  bodyEl.className = 'article-body';
  if (bodyContent) bodyEl.append(...bodyContent.childNodes);
  main.append(bodyEl);

  // Sidebar (TOC + related)
  const sidebar = document.createElement('aside');
  sidebar.className = 'article-sidebar';

  const showToc = showTocRow?.textContent?.trim().toLowerCase() === 'true';
  if (showToc) {
    const toc = buildToc(bodyEl);
    if (toc) sidebar.append(toc);
  }

  const relatedContent = relatedRow?.querySelector('div');
  if (relatedContent?.textContent?.trim()) {
    const related = document.createElement('div');
    related.className = 'article-related';
    const relatedTitle = document.createElement('h4');
    relatedTitle.textContent = 'Related articles';
    related.append(relatedTitle);
    related.append(...relatedContent.childNodes);
    sidebar.append(related);
  }

  if (sidebar.children.length) main.append(sidebar);
  article.append(main);

  // Tags
  const tagsText = tagsRow?.textContent?.trim();
  if (tagsText) {
    const tagsWrap = document.createElement('div');
    tagsWrap.className = 'article-tags';
    tagsText.split(',').forEach((tag) => {
      const trimmed = tag.trim();
      if (trimmed) {
        const span = document.createElement('span');
        span.className = 'article-tag';
        span.textContent = trimmed;
        tagsWrap.append(span);
      }
    });
    article.append(tagsWrap);
  }

  // Sharing (bottom)
  if (showSharing) {
    article.append(buildShareButtons(window.location.href, heading || ''));
  }

  // Subscribe
  const subHeading = subscribeHeadingRow?.textContent?.trim();
  const subDesc = subscribeDescRow?.textContent?.trim();
  const subAction = subscribeActionRow?.textContent?.trim();
  if (subHeading || subAction) {
    article.append(buildSubscribeForm(subHeading, subDesc, subAction));
  }

  block.textContent = '';
  block.append(article);
}

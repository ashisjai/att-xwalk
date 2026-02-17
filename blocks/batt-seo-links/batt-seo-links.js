export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: heading, Rows 1-4: richtext columns
  const [headingRow, ...colRows] = rows;

  const container = document.createElement('div');
  container.className = 'seo-links-container';

  // Heading
  if (headingRow?.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.textContent = headingRow.textContent.trim();
    container.append(heading);
  }

  // Link columns grid
  const grid = document.createElement('div');
  grid.className = 'seo-links-grid';

  colRows.forEach((row) => {
    const col = document.createElement('div');
    col.className = 'seo-links-column';

    // Move richtext content (lists, paragraphs)
    const content = row.querySelector('div');
    if (content) {
      col.innerHTML = content.innerHTML;
    } else {
      col.innerHTML = row.innerHTML;
    }

    grid.append(col);
  });

  container.append(grid);
  block.replaceChildren(container);
}

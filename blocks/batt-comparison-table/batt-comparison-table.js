export default function decorate(block) {
  const rows = [...block.children];
  const [headingRow, descriptionRow, colHeadersRow, tableDataRow, legalRow] = rows;

  const wrapper = document.createElement('div');
  wrapper.className = 'comparison-wrapper';

  // Heading
  const heading = headingRow?.textContent?.trim();
  if (heading) {
    const h2 = document.createElement('h2');
    h2.className = 'comparison-heading';
    h2.textContent = heading;
    wrapper.append(h2);
  }

  // Description
  const descContent = descriptionRow?.querySelector('div');
  if (descContent?.textContent?.trim()) {
    const desc = document.createElement('div');
    desc.className = 'comparison-description';
    desc.append(...descContent.childNodes);
    wrapper.append(desc);
  }

  // Build table
  const tableContainer = document.createElement('div');
  tableContainer.className = 'comparison-scroll';

  // Check if the table data already contains a <table>
  const existingTable = tableDataRow?.querySelector('table');
  if (existingTable) {
    existingTable.className = 'comparison-grid';
    tableContainer.append(existingTable);
  } else {
    // Build table from column headers + richtext rows
    const table = document.createElement('table');
    table.className = 'comparison-grid';

    const colHeaders = colHeadersRow?.textContent?.trim().split(',').map((h) => h.trim()) || [];
    if (colHeaders.length) {
      const thead = document.createElement('thead');
      const headerTr = document.createElement('tr');
      colHeaders.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headerTr.append(th);
      });
      thead.append(headerTr);
      table.append(thead);
    }

    // Parse row data from richtext
    const tbody = document.createElement('tbody');
    const dataDiv = tableDataRow?.querySelector('div');
    if (dataDiv) {
      const dataTable = dataDiv.querySelector('table');
      if (dataTable) {
        tbody.append(...dataTable.querySelector('tbody')?.children || []);
      } else {
        // Parse pipe-delimited or line-separated rows
        const lines = dataDiv.innerHTML.split(/<br\s*\/?>/i).filter((l) => l.trim());
        lines.forEach((line) => {
          const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
          if (cells.length) {
            const tr = document.createElement('tr');
            cells.forEach((cell) => {
              const td = document.createElement('td');
              td.innerHTML = cell;
              tr.append(td);
            });
            tbody.append(tr);
          }
        });
      }
    }
    table.append(tbody);
    tableContainer.append(table);
  }

  wrapper.append(tableContainer);

  // Legal
  const legalContent = legalRow?.querySelector('div');
  if (legalContent?.textContent?.trim()) {
    const legal = document.createElement('div');
    legal.className = 'comparison-legal';
    legal.append(...legalContent.childNodes);
    wrapper.append(legal);
  }

  block.textContent = '';
  block.append(wrapper);
}

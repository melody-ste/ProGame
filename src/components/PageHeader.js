export const PageHeader = () => {
  return `
    <header class="page-header">
      <h1 class="page-title">The Hyper Progame</h1>
      <div class="controls">
        <input type="text" id="searchInput" placeholder="Find a game..." />
      </div>
    </header>
  `;
};

export const attachHeaderEvents = () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim().replace(/\s+/g, '-');
        window.location.hash = `#pagelist/${query}`;
      }
    });
  }
};
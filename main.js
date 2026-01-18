// Interacciones mínimas: menú, accesibilidad y pequeños efectos
(function () {
  // Menú responsive
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Smooth links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Productos: filtro que afecta grid y tabla (si existen)
  const filter = document.getElementById("filter");
  if (filter) {
    const catalog = document.getElementById("catalog");
    const tableRows = () => Array.from(document.querySelectorAll('.product-table tbody tr'));
    const searchInput = document.getElementById('search');

    function applyFilters(){
      const v = filter.value;
      const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      if(catalog){
        Array.from(catalog.querySelectorAll('.product')).forEach(card=>{
          const matchesType = (v==='all' || card.dataset.type===v);
          const text = (card.textContent||'').toLowerCase();
          const matchesQuery = q === '' || text.indexOf(q) !== -1;
          card.style.display = (matchesType && matchesQuery) ? '' : 'none';
        });
      }
      const rows = tableRows();
      if(rows.length){
        rows.forEach(tr=>{
          const t = tr.dataset.type;
          const matchesType = (v==='all' || t===v);
          const rowText = (tr.textContent||'').toLowerCase();
          const matchesQuery = q === '' || rowText.indexOf(q) !== -1;
          tr.style.display = (matchesType && matchesQuery) ? '' : 'none';
        });
      }
    }

    filter.addEventListener('change', applyFilters);
    if(document.getElementById('search')){
      document.getElementById('search').addEventListener('input', applyFilters);
    }
  }

  // Small accessibility: focus outline on keyboard navigation
  window.addEventListener("keyup", (e) => {
    if (e.key === "Tab") document.body.classList.add("show-focus");
  });
})();

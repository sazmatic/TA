document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-section]");
  const content = document.getElementById("ta-content");

  if (!content) return;

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const section = button.getAttribute("data-section");
      const url = `./sections/${section}.html`;

      // UI state
      buttons.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      content.setAttribute("aria-busy", "true");
      content.innerHTML = `<p>Loading…</p>`;

      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${url}`);

        const html = await res.text();
        content.innerHTML = html;
        content.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (err) {
        console.error(err);
        content.innerHTML = `
          <div style="color: red; font-weight: 700;">
            ⚠️ Error loading section. Check that ${url} exists and the filename matches.
          </div>
        `;
      } finally {
        content.removeAttribute("aria-busy");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('#quick-links a').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      // Let the browser scroll first
      setTimeout(() => {
        if (target.tagName === 'DETAILS') {
          target.open = true;
        }

        // If FAQ is wrapped inside a DETAILS dropdown
        if (target.closest('details')) {
          target.closest('details').open = true;
        }
      }, 50);
    });
  });
});

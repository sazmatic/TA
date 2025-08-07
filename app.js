document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button[data-section]");
  const content = document.getElementById("ta-content");

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const section = button.getAttribute("data-section");
      const url = `./sections/${section}.html`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to load ${section}.html`);
        }

        const html = await res.text();
        content.innerHTML = html;
        content.scrollIntoView({ behavior: 'smooth' });
      } catch (err) {
        console.error(err);
        content.innerHTML = `
          <div style="color: red; font-weight: bold;">
            ⚠️ Error loading section. Please check the file name or try again later.
          </div>
        `;
      }
    });
  });
});

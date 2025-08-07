document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[data-section]");
  const content = document.getElementById("ta-content");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const section = link.getAttribute("data-section");

      try {
        const res = await fetch(`./sections/${section}.html`);
        if (!res.ok) throw new Error("Failed to load section.");
        const html = await res.text();
        content.innerHTML = html;
      } catch (err) {
        content.innerHTML = "<p>Error loading section. Please try again later.</p>";
      }
    });
  });
});

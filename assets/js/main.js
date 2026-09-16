const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willOpen));
    nav.classList.toggle("open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  nav
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) closeMenu();
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

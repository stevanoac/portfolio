const dashboard = document.querySelector(".site-shell");
const dashboardButton = document.querySelector(".dashboard-toggle");
const menuButton = document.querySelector(".menu-toggle");
const directory = document.querySelector(".directory");

dashboardButton.addEventListener("click", () => {
  const isOpen = dashboardButton.getAttribute("aria-expanded") === "true";
  dashboardButton.setAttribute("aria-expanded", String(!isOpen));
  dashboardButton.setAttribute("aria-label", isOpen ? "Show dashboard" : "Hide dashboard");
  dashboard.classList.toggle("dashboard-hidden", isOpen);
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open pages menu" : "Close pages menu");
  menuButton.querySelector(".menu-icon").textContent = isOpen ? "+" : "−";
  directory.classList.toggle("is-open", !isOpen);
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const image = carousel.querySelector(".carousel-image");
  const status = carousel.querySelector(".carousel-status");
  const images = ["images/0.png", "images/1.png", "images/2.png"];
  let current = 0;

  const showImage = (nextIndex) => {
    current = (nextIndex + images.length) % images.length;
    image.style.opacity = "0";
    window.setTimeout(() => {
      image.src = images[current];
      image.alt = `Autumn project screenshot ${current + 1} of ${images.length}`;
      status.textContent = `${String(current + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
      image.style.opacity = "1";
    }, 120);
  };

  carousel.querySelector(".carousel-previous").addEventListener("click", () => showImage(current - 1));
  carousel.querySelector(".carousel-next").addEventListener("click", () => showImage(current + 1));
});

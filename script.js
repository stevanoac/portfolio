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

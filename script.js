const dashboard = document.querySelector(".site-shell");
const dashboardButton = document.querySelector(".dashboard-toggle");
const menuButton = document.querySelector(".menu-toggle");
const directory = document.querySelector(".directory");

dashboardButton.addEventListener("click", () => {
  const isOpen = dashboardButton.getAttribute("aria-expanded") === "true";
  dashboardButton.setAttribute("aria-expanded", String(!isOpen));
  dashboardButton.setAttribute(
    "aria-label",
    isOpen ? "Show dashboard" : "Hide dashboard",
  );
  dashboard.classList.toggle("dashboard-hidden", isOpen);
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Open pages menu" : "Close pages menu",
  );
  menuButton.querySelector(".menu-icon").textContent = isOpen ? "+" : "−";
  directory.classList.toggle("is-open", !isOpen);
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const image = carousel.querySelector(".carousel-image");
  const imageTrigger = carousel.querySelector(".carousel-image-trigger");
  const status = carousel.querySelector(".carousel-status");
  const imageDirectory = carousel.dataset.imageDirectory;
  const imageExtension = carousel.dataset.imageExtension;
  const initialImage = image.getAttribute("src");
  let images = [initialImage];
  let current = 0;
  let lightbox;
  let discoveryPromise;

  const imageExists = (src) =>
    new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve(true);
      probe.onerror = () => resolve(false);
      probe.src = src;
    });

  const refreshThumbnails = () => {
    if (!lightbox) return;
    const thumbnails = lightbox.querySelector(".lightbox-thumbnails");
    thumbnails.replaceChildren();
    images.forEach((src, index) => {
      const thumbnail = document.createElement("button");
      thumbnail.className = "lightbox-thumbnail";
      thumbnail.type = "button";
      thumbnail.setAttribute("aria-label", `Show screenshot ${index + 1}`);
      thumbnail.innerHTML = `<img src="${src}" alt="" />`;
      thumbnail.addEventListener("click", () => showImage(index, true));
      thumbnails.append(thumbnail);
    });
  };

  const discoverImages = async () => {
    for (let index = 1; index < 100; index += 1) {
      const src = `${imageDirectory}${index}.${imageExtension}`;
      if (!(await imageExists(src))) break;
      images.push(src);
    }
    updateImageDetails();
    refreshThumbnails();
  };

  const updateImageDetails = () => {
    image.src = images[current];
    image.alt = `Project screenshot ${current + 1} of ${images.length}`;
    status.textContent = `${String(current + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
  };

  const createLightbox = () => {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "project screenshot viewer");
    lightbox.innerHTML = `
      <button class="lightbox-button lightbox-close" type="button" aria-label="Close image viewer">×</button>
      <div class="lightbox-content">
        <button class="lightbox-button lightbox-previous" type="button" aria-label="Previous screenshot">←</button>
        <div class="lightbox-image-wrap"><img class="lightbox-image" alt="" /></div>
        <button class="lightbox-button lightbox-next" type="button" aria-label="Next screenshot">→</button>
      </div>
      <div class="lightbox-thumbnails" aria-label="Choose screenshot"></div>
    `;
    document.body.append(lightbox);
    refreshThumbnails();
    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", closeLightbox);
    lightbox
      .querySelector(".lightbox-previous")
      .addEventListener("click", () => showImage(current - 1, true));
    lightbox
      .querySelector(".lightbox-next")
      .addEventListener("click", () => showImage(current + 1, true));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  };

  const openLightbox = async () => {
    await discoveryPromise;
    if (!lightbox) createLightbox();
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    showImage(current, true);
    lightbox.querySelector(".lightbox-close").focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    imageTrigger.focus();
  };

  function showImage(nextIndex, updateLightbox = false) {
    current = (nextIndex + images.length) % images.length;
    image.style.opacity = "0";
    window.setTimeout(() => {
      image.src = images[current];
      image.alt = `Project screenshot ${current + 1} of ${images.length}`;
      status.textContent = `${String(current + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
      image.style.opacity = "1";
    }, 120);
    if (updateLightbox && lightbox) {
      lightbox.querySelector(".lightbox-image").src = images[current];
      lightbox.querySelector(".lightbox-image").alt =
        `Project screenshot ${current + 1} of ${images.length}`;
      lightbox
        .querySelectorAll(".lightbox-thumbnail")
        .forEach((thumbnail, index) => {
          thumbnail.classList.toggle("is-selected", index === current);
        });
    }
  }

  carousel
    .querySelector(".carousel-previous")
    .addEventListener("click", () => showImage(current - 1));
  carousel
    .querySelector(".carousel-next")
    .addEventListener("click", () => showImage(current + 1));
  imageTrigger.addEventListener("click", openLightbox);

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(current - 1, true);
    if (event.key === "ArrowRight") showImage(current + 1, true);
  });

  discoveryPromise = discoverImages();
});

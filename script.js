(() => {
  "use strict";

  const APP_STORE_URL = "https://apps.apple.com/app/id6817477024";
  const STORE_RELEASED = false;

  if (STORE_RELEASED) {
    document.querySelectorAll(".store-action").forEach((link) => {
      link.href = APP_STORE_URL;
      link.textContent = "Download on the App Store";
    });
    document.querySelectorAll(".release-status").forEach((status) => status.remove());
  }

  function prepareLazyImage(image) {
    const source = image.dataset.lazySrc;
    if (!source) return;

    const frame = image.closest(".media-frame");
    const fallback = frame?.querySelector(".image-fallback");
    const retry = frame?.querySelector(".retry-image");

    const showImage = () => {
      image.hidden = false;
      if (fallback) fallback.hidden = true;
    };

    const showFallback = () => {
      image.hidden = true;
      if (fallback) fallback.hidden = false;
    };

    image.addEventListener("load", showImage);
    image.addEventListener("error", showFallback);

    if (retry) {
      retry.addEventListener("click", () => {
        const separator = source.includes("?") ? "&" : "?";
        image.src = `${source}${separator}retry=${Date.now()}`;
      });
    }

    const load = () => {
      if (!image.src) image.src = source;
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      load();
      observer.disconnect();
    }, { rootMargin: "160px 0px" });

    observer.observe(image);
  }

  document.querySelectorAll(".media-frame img[data-lazy-src]").forEach(prepareLazyImage);

  document.querySelectorAll(".closing-bank > img[data-lazy-src]").forEach((image) => {
    const load = () => {
      if (!image.src) image.src = image.dataset.lazySrc;
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      load();
      observer.disconnect();
    }, { rootMargin: "160px 0px" });

    observer.observe(image);
  });
})();

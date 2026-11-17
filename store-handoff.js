/* Store handoff: one document for every device; the visible store action is
   chosen in the browser before first paint. iPhone/iPad (including iPadOS that
   reports a Mac user agent) get the App Store badge, wide non-iOS screens get the
   QR card, everything else gets a plain "available for iPhone and iPad" note.
   All three point to the same listing (id6817477024). */
(() => {
  "use strict";
  const root = document.documentElement;
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = !isAndroid && (/iPhone|iPad|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1));
  const isMobileOS = isAndroid || /Mobi/i.test(ua);
  const wide = window.matchMedia ? window.matchMedia("(min-width: 900px) and (hover: hover)") : null;

  const apply = () => {
    let mode = "other";
    if (isIOS) mode = "ios";
    else if (!isMobileOS && wide && wide.matches) mode = "desktop";
    root.setAttribute("data-store", mode);
  };

  apply();
  if (wide && !isIOS) {
    if (wide.addEventListener) wide.addEventListener("change", apply);
    else if (wide.addListener) wide.addListener(apply);
  }
})();

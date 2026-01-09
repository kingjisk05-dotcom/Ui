/* =========================================
   CONTROL CENTER CORE
   - Single owner of panel open/close
   - Safe for all addons
   ========================================= */

(function () {
  const settingsBtn = document.getElementById("settingsBtn");
  const panel =
    document.getElementById("wallpaperPanel") ||
    document.querySelector(".wallpaper-panel");

  if (!settingsBtn || !panel) {
    console.warn("Control Center core: missing elements");
    return;
  }

  settingsBtn.addEventListener("click", e => {
    e.stopPropagation();
    panel.classList.toggle("open");
  });

  // click outside → close
  document.addEventListener("click", e => {
    if (!panel.contains(e.target) && panel.classList.contains("open")) {
      panel.classList.remove("open");
    }
  });

  // click inside → stay open
  panel.addEventListener("click", e => e.stopPropagation());
})();

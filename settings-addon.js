/* ==================================================
   SETTINGS SYSTEM (UPGRADED & MERGED)
   - Uses EXISTING mini panel (no floating box)
   - ⚙️ icon toggle
   - Outside click close
   - Reset wallpaper
   - Toggle video
   - Compatible with layout / drag system
   ================================================== */

window.addEventListener("load", () => {

  /* ===============================
     🎯 TARGET ELEMENTS
     =============================== */

  const settingsBtn = document.getElementById("settingsBtn");

  // existing mini panel (IMPORTANT)
  const panel =
    document.getElementById("wallpaperPanel") ||
    document.querySelector(".wallpaper-panel");

  if (!settingsBtn || !panel) {
    console.warn("Settings system: panel or button not found");
    return;
  }

  let open = false;

  /* ===============================
     ⚙️ OPEN / CLOSE PANEL
     =============================== */
  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    open = !open;
    panel.classList.toggle("open", open);
  });

  /* ===============================
     🛑 CLICK INSIDE → STAY OPEN
     =============================== */
  panel.addEventListener("click", e => e.stopPropagation());

  /* ===============================
     👆 CLICK OUTSIDE → CLOSE
     =============================== */
  document.addEventListener("click", () => {
    if (open) {
      open = false;
      panel.classList.remove("open");
    }
  });

  /* ===============================
     🔄 RESET WALLPAPER (REUSE)
     =============================== */
  const resetBtn = panel.querySelector("#resetWall");
  if (resetBtn) {
    resetBtn.onclick = () => {
      localStorage.removeItem("ultraWall");
      localStorage.removeItem("ultraWallType");
      location.reload();
    };
  }

  /* ===============================
     🎥 TOGGLE VIDEO (REUSE)
     =============================== */
  const toggleVideoBtn = panel.querySelector("#toggleVideo");
  if (toggleVideoBtn && window.bgVideo) {
    toggleVideoBtn.onclick = () => {
      if (bgVideo.style.display === "none") {
        bgVideo.style.display = "block";
        document.body.style.backgroundImage = "none";
      } else {
        bgVideo.style.display = "none";
      }
    };
  }

});

/* ==================================================
   WALLPAPER SHORTCUT ADDON
   - Move file picker to Settings panel
   ================================================== */

window.addEventListener("load", () => {

  /* 1️⃣ STOP direct file picker on settings icon */
  if (typeof settingsBtn !== "undefined") {
    settingsBtn.onclick = null;
  }

  /* 2️⃣ Create Add Wallpaper button */
  const addWallBtn = document.createElement("button");
  addWallBtn.className = "fs-btn";
  addWallBtn.innerHTML = "➕ Add Wallpaper";

  /* 3️⃣ Insert at TOP of settings panel */
  const panel = document.getElementById("floatingSettings");
  if (!panel) return;

  panel.insertBefore(addWallBtn, panel.firstChild);

  /* 4️⃣ Open file picker only when button clicked */
  addWallBtn.onclick = () => {
    if (wallPicker) wallPicker.click();
  };

});

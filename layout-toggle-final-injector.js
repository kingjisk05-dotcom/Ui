/* ==================================================
   FINAL LAYOUT TOGGLE INJECTOR
   Anchored to EXISTING "+ Add Wallpaper" button
   ================================================== */

window.addEventListener("load", () => {

  const addBtn = [...document.querySelectorAll("button")]
    .find(b => b.textContent.trim().includes("Add Wallpaper"));

  if (!addBtn) {
    console.warn("Add Wallpaper button not found");
    return;
  }

  if (document.getElementById("layoutToggleBtn")) return;

  const layoutBtn = document.createElement("button");
  layoutBtn.id = "layoutToggleBtn";
  layoutBtn.className = "panel-btn layout-btn";

  addBtn.parentNode.insertBefore(layoutBtn, addBtn.nextSibling);

  // 🔒 STATE (IMPORTANT)
  let locked = localStorage.getItem("layoutLocked") === "true";

  function updateUI() {
    layoutBtn.textContent = locked
      ? "🔒 Layout Locked"
      : "🔓 Layout Unlocked";

    layoutBtn.classList.toggle("locked", locked);
    layoutBtn.classList.toggle("unlocked", !locked);
  }

  // 🔁 Toggle
  layoutBtn.addEventListener("click", () => {
    locked = !locked;
    localStorage.setItem("layoutLocked", locked);
    updateUI();
  });

  // 🌍 Global hook (used by drag addon)
  window.isDragLocked = () => locked;

  // 🚀 INITIAL UI SYNC
  updateUI();

});

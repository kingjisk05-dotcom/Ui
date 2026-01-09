/* ==================================================
   FINAL LAYOUT TOGGLE INJECTOR
   Anchored to EXISTING "+ Add Wallpaper" button
   ================================================== */

window.addEventListener("load", () => {

  // 🔎 Find "+ Add Wallpaper" button
  const addBtn = [...document.querySelectorAll("button")]
    .find(b => b.textContent.trim().includes("Add Wallpaper"));

  if (!addBtn) {
    console.warn("Add Wallpaper button not found");
    return;
  }

  // ❌ Already added check
  if (document.getElementById("layoutToggleBtn")) return;

  // 🔘 Create Layout toggle button
  const layoutBtn = document.createElement("button");
  layoutBtn.id = "layoutToggleBtn";

  layoutBtn.className = "panel-btn layout-btn";

  // 📍 Insert JUST AFTER "+ Add Wallpaper"
  addBtn.parentNode.insertBefore(layoutBtn, addBtn.nextSibling);

  // 🔒 STATE
  let locked = localStorage.getItem("layoutLocked") === "true";

  function updateUI() {
    layoutBtn.textContent = locked
      ? "🔒 Layout Locked"
      : "🔓 Layout Unlocked";
  }
  updateUI();

  // 🔁 Toggle
  layoutBtn.addEventListener("click", () => {
    locked = !locked;
    localStorage.setItem("layoutLocked", locked);
    updateUI();
  });

  // 🌍 Global hook (used by drag addon)
  window.isDragLocked = () => locked;

});

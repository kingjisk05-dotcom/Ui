/* ==================================================
   FINAL LAYOUT TOGGLE INJECTOR (MERGED & FIXED)
   - Persistent lock state
   - Global drag hook
   - UI sync on reload
   ================================================== */

window.addEventListener("load", () => {

  // 🔎 Find "+ Add Wallpaper" button
  const addBtn = [...document.querySelectorAll("button")]
    .find(b => b.textContent.trim().includes("Add Wallpaper"));

  if (!addBtn) {
    console.warn("Add Wallpaper button not found");
    return;
  }

  // ❌ Prevent duplicate button
  if (document.getElementById("layoutToggleBtn")) return;

  // 🔘 Create button
  const layoutBtn = document.createElement("button");
  layoutBtn.id = "layoutToggleBtn";
  layoutBtn.className = "panel-btn layout-btn";

  // 📍 Insert after Add Wallpaper
  addBtn.parentNode.insertBefore(layoutBtn, addBtn.nextSibling);

  /* ===============================
     🔒 SINGLE SOURCE OF TRUTH
     =============================== */

  let locked = localStorage.getItem("layoutLocked") === "true";

  // 🌍 GLOBAL FUNCTION (drag addon reads this)
  window.isDragLocked = () => locked;

  /* ===============================
     🎨 UI UPDATE
     =============================== */
  function updateUI() {
    layoutBtn.textContent = locked
      ? "🔒 Layout Locked"
      : "🔓 Layout Unlocked";

    layoutBtn.classList.toggle("locked", locked);
    layoutBtn.classList.toggle("unlocked", !locked);
  }

  /* ===============================
     🔁 TOGGLE HANDLER
     =============================== */
  layoutBtn.addEventListener("click", () => {
    locked = !locked;
    localStorage.setItem("layoutLocked", locked);
    updateUI();
  });

  /* ===============================
     🚀 INITIAL SYNC ON PAGE LOAD
     =============================== */
  updateUI();

});

/* ==================================================
   LAYOUT TOGGLE CONNECTOR
   Uses EXISTING button inside SAME settings panel
   No new panel, no new UI
   ================================================== */

window.addEventListener("load", () => {

  const btn = document.getElementById("dragToggleBtn");
  if (!btn) return;

  /* ---------- STATE ---------- */
  let locked = localStorage.getItem("layoutLocked") === "true";

  function updateUI() {
    btn.textContent = locked
      ? "🔒 Layout Locked"
      : "🔓 Layout Unlocked";
  }
  updateUI();

  /* ---------- TOGGLE ---------- */
  btn.addEventListener("click", () => {
    locked = !locked;
    localStorage.setItem("layoutLocked", locked);
    updateUI();
  });

  /* ---------- GLOBAL ACCESS ---------- */
  window.isDragLocked = () => locked;

});

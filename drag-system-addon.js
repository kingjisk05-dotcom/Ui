/* ==================================================
   DRAG SYSTEM ADDON
   - Lock / Unlock (settings button)
   - Position save & restore
   ================================================== */

window.addEventListener("load", () => {

  const btn = document.getElementById("dragToggleBtn");

  const targets = {
    clock: document.getElementById("clockBox"),
    search: document.getElementById("searchWrap"),
    apps: document.querySelector(".speed-dial")
  };

  let locked = localStorage.getItem("dragLocked") === "true";

  /* ---------- BUTTON UI ---------- */
  function updateBtn() {
    if (!btn) return;
    btn.textContent = locked ? "🔒 Layout Locked" : "🔓 Layout Unlocked";
  }
  updateBtn();

  btn?.addEventListener("click", () => {
    locked = !locked;
    localStorage.setItem("dragLocked", locked);
    updateBtn();
  });

  /* ---------- GLOBAL LOCK FLAG ---------- */
  window.isDragLocked = () => locked;

  /* ---------- RESTORE POSITIONS ---------- */
  Object.entries(targets).forEach(([key, el]) => {
    if (!el) return;
    const y = localStorage.getItem("drag-pos-" + key);
    if (y !== null) {
      el.style.position = "absolute";
      el.style.top = y + "px";
    }
  });

  /* ---------- SAVE POSITIONS ---------- */
  function save() {
    if (locked) return;
    Object.entries(targets).forEach(([key, el]) => {
      if (!el) return;
      localStorage.setItem("drag-pos-" + key, el.offsetTop);
    });
  }

  document.addEventListener("mouseup", save);
  document.addEventListener("touchend", save);

});

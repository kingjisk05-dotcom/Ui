/* ==================================================
   FINAL LAYOUT TOGGLE INJECTOR (SINGLE SCRIPT)
   - Early global lock state
   - Persistent layout lock
   - Drag-safe (no race condition)
   - UI sync on reload
   - OS-style safe reload on UNLOCK
   ================================================== */

/* ---------- EARLY GLOBAL STATE (BOOTSTRAP) ---------- */
(function () {
  // 🔒 single source of truth
  window.__layoutLocked =
    localStorage.getItem("layoutLocked") === "true";

  // 🌍 global reader (used by drag addon)
  window.isDragLocked = () => window.__layoutLocked;
})();

/* ---------- UI + TOGGLE INJECTOR ---------- */
window.addEventListener("load", () => {

  /* ===============================
     🔎 FIND "+ Add Wallpaper" BUTTON
     =============================== */
  const addBtn = [...document.querySelectorAll("button")]
    .find(b => b.textContent.trim().includes("Add Wallpaper"));

  if (!addBtn) {
    console.warn("Add Wallpaper button not found");
    return;
  }

  // ❌ prevent duplicate injection
  if (document.getElementById("layoutToggleBtn")) return;

  /* ===============================
     🔘 CREATE LAYOUT TOGGLE BUTTON
     =============================== */
  const layoutBtn = document.createElement("button");
  layoutBtn.id = "layoutToggleBtn";
  layoutBtn.className = "panel-btn layout-btn";

  // 📍 insert just after "+ Add Wallpaper"
  addBtn.parentNode.insertBefore(layoutBtn, addBtn.nextSibling);

  /* ===============================
     🔒 LOCAL STATE (SYNCED)
     =============================== */
  let locked = window.__layoutLocked;

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
     🔁 TOGGLE HANDLER (MERGED)
     =============================== */
  layoutBtn.addEventListener("click", () => {
    locked = !locked;

    // 🔥 sync everywhere
    window.__layoutLocked = locked;
    localStorage.setItem("layoutLocked", locked);

    updateUI();

    // 🔔 notify other addons (drag, etc.)
    document.dispatchEvent(
      new CustomEvent("layout-lock-changed", {
        detail: { locked }
      })
    );

    // 🧠 OS-style safety:
    // when UNLOCK → reload to reset drag listeners cleanly
    if (!locked) {
      setTimeout(() => {
        location.reload();
      }, 120);
    }
  });

  /* ===============================
     🚀 INITIAL UI SYNC
     =============================== */
  updateUI();

});

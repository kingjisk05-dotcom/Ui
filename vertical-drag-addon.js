/* ==================================================
   VERTICAL DRAG ADDON (FINAL HARDENED)
   - Sirf UP / DOWN movement
   - X-axis locked
   - Layout lock respected (even after refresh)
   - Position save & restore
   - Safe storage keys
   ================================================== */

(function () {

  /* ---------- SAFE LOCK READER ---------- */
  function isLocked() {
    return window.isDragLocked && window.isDragLocked();
  }

  /* ---------- APPLY LOCK STATE ---------- */
  function applyLockState() {
    document.querySelectorAll("[data-draggable]").forEach(el => {
      el.style.pointerEvents = isLocked() ? "none" : "auto";
      el.style.cursor = isLocked() ? "default" : "grab";
    });
  }

  window.addEventListener("load", () => {

    const elements = [
      document.getElementById("clockBox"),
      document.getElementById("searchWrap"),
      document.querySelector(".speed-dial")
    ];

    elements.forEach(el => {
      if (!el) return;
      el.dataset.draggable = "true";
      enableVerticalDrag(el);
    });

    // 🔒 apply lock on page load
    applyLockState();
  });

  /* ---------- SYNC WITH LAYOUT TOGGLE ---------- */
  document.addEventListener("layout-lock-changed", e => {
    applyLockState();
  });

  /* ---------- DRAG ENGINE ---------- */
  function enableVerticalDrag(el) {

    /* ===============================
       📍 SAFE STORAGE KEY
       =============================== */
    const key = "drag_pos_" + (el.id || "anon_" + [...el.classList].join("_"));

    /* ===============================
       🔄 RESTORE POSITION
       =============================== */
    const savedTop = localStorage.getItem(key);
    if (savedTop !== null) {
      el.style.position = "absolute";
      el.style.top = savedTop + "px";
    }

    let startY = 0;
    let startTop = 0;
    let dragging = false;

    el.style.touchAction = "none";

    el.addEventListener("mousedown", startDrag);
    el.addEventListener("touchstart", startDrag, { passive: false });

    function startDrag(e) {

      /* 🔒 HARD LOCK CHECK */
      if (isLocked()) return;

      dragging = true;
      el.style.cursor = "grabbing";
      el.style.position = "absolute";

      startY = getY(e);
      startTop = el.offsetTop;

      document.addEventListener("mousemove", onDrag);
      document.addEventListener("touchmove", onDrag, { passive: false });
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchend", stopDrag);
    }

    function onDrag(e) {
      if (!dragging || isLocked()) return;
      e.preventDefault();

      const deltaY = getY(e) - startY;
      el.style.top = startTop + deltaY + "px";
    }

    function stopDrag() {
      if (!dragging) return;

      dragging = false;
      el.style.cursor = "grab";

      /* 💾 SAVE POSITION */
      localStorage.setItem(key, el.offsetTop);

      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
    }

    function getY(e) {
      return e.touches ? e.touches[0].clientY : e.clientY;
    }
  }

})();

/* ==================================================
   VERTICAL DRAG ADDON (FINAL – OS SAFE)
   - Only UP / DOWN drag
   - X-axis locked
   - Layout lock respected (even after refresh)
   - Position save & restore
   - No race condition
   - Single source of truth
   ================================================== */

(function () {

  /* ==================================================
     🔒 GLOBAL LOCK READER (SAFE)
     ================================================== */
  function isLocked() {
    return !!(window.isDragLocked && window.isDragLocked());
  }

  /* ==================================================
     🎯 APPLY LOCK STATE (HARD)
     ================================================== */
  function applyLockState() {
    document.querySelectorAll("[data-vertical-drag]").forEach(el => {
      if (isLocked()) {
        el.style.pointerEvents = "none";
        el.style.cursor = "default";
      } else {
        el.style.pointerEvents = "auto";
        el.style.cursor = "grab";
      }
    });
  }

  /* ==================================================
     🚀 INIT AFTER LOAD
     ================================================== */
  window.addEventListener("load", () => {

    const elements = [
      document.getElementById("clockBox"),
      document.getElementById("searchWrap"),
      document.querySelector(".speed-dial")
    ];

    elements.forEach(el => {
      if (!el) return;

      // mark element (important)
      el.dataset.verticalDrag = "true";

      enableVerticalDrag(el);
    });

    // 🔒 enforce lock immediately (CRITICAL)
    applyLockState();
  });

  /* ==================================================
     🔁 LISTEN TO LAYOUT TOGGLE (SYNC)
     ================================================== */
  document.addEventListener("layout-lock-changed", () => {
    applyLockState();
  });

  /* ==================================================
     🧲 DRAG ENGINE
     ================================================== */
  function enableVerticalDrag(el) {

    /* ---------- UNIQUE & SAFE STORAGE KEY ---------- */
    const key =
      "vd_pos_" +
      (el.id ||
        "anon_" + [...el.classList].join("_") ||
        Math.random().toString(36).slice(2));

    /* ---------- RESTORE POSITION ---------- */
    const savedTop = localStorage.getItem(key);
    if (savedTop !== null) {
      el.style.position = "absolute";
      el.style.top = savedTop + "px";
    }

    let startY = 0;
    let startTop = 0;
    let dragging = false;

    el.style.touchAction = "none";
    el.style.cursor = "grab";

    el.addEventListener("mousedown", startDrag);
    el.addEventListener("touchstart", startDrag, { passive: false });

    function startDrag(e) {

      /* 🔒 HARD BLOCK IF LOCKED */
      if (isLocked()) return;

      dragging = true;
      el.style.position = "absolute";
      el.style.cursor = "grabbing";

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
      el.style.cursor = isLocked() ? "default" : "grab";

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

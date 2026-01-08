/* ==================================================
   LAYOUT CONTROL SYSTEM
   - Lock / Unlock Drag
   - Save / Restore Position
   - Ghost Preview
   ================================================== */

let layoutLocked = localStorage.getItem("layoutLocked") === "true";

/* ---------- SETTINGS PANEL EXTENSION ---------- */
const layoutControls = document.createElement("div");
layoutControls.innerHTML = `
  <hr style="opacity:.2">
  <button class="fs-btn" id="toggleLayout">
    ${layoutLocked ? "🔓 Unlock Layout" : "🔒 Lock Layout"}
  </button>
`;

document.getElementById("floatingSettings")?.appendChild(layoutControls);

/* ---------- DRAG ENGINE ---------- */
function makeDraggable(el, key) {
  let startX = 0, startY = 0, x = 0, y = 0, ghost;

  /* Restore position */
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  if (saved.x !== undefined) {
    el.style.transform = `translate(${saved.x}px, ${saved.y}px)`;
  }

  el.style.cursor = layoutLocked ? "default" : "grab";

  el.addEventListener("mousedown", startDrag);
  el.addEventListener("touchstart", startDrag, { passive: false });

  function startDrag(e) {
    if (layoutLocked) return;

    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;

    startX = point.clientX;
    startY = point.clientY;

    const matrix = window.getComputedStyle(el).transform;
    if (matrix !== "none") {
      const values = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
      x = parseFloat(values[4]);
      y = parseFloat(values[5]);
    }

    /* Ghost */
    ghost = el.cloneNode(true);
    ghost.style.cssText = `
      position:absolute;
      pointer-events:none;
      opacity:0.3;
      filter:blur(1px);
      transform:${el.style.transform};
      transition:none;
    `;
    document.body.appendChild(ghost);

    el.style.transition = "none";

    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
  }

  function drag(e) {
    const point = e.touches ? e.touches[0] : e;
    const dx = point.clientX - startX;
    const dy = point.clientY - startY;

    el.style.transform = `translate(${x + dx}px, ${y + dy}px)`;
    ghost.style.transform = el.style.transform;
  }

  function endDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchend", endDrag);

    ghost.remove();

    const matrix = window.getComputedStyle(el).transform;
    const values = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    localStorage.setItem(key, JSON.stringify({
      x: parseFloat(values[4]),
      y: parseFloat(values[5])
    }));

    el.style.transition = "transform .25s ease";
  }
}

/* ---------- APPLY DRAGGABLE ELEMENTS ---------- */
window.addEventListener("load", () => {
  makeDraggable(document.getElementById("clockBox"), "pos_clock");
  makeDraggable(document.getElementById("searchWrap"), "pos_search");

  document.querySelectorAll(".speed-dial .app-icon").forEach((el, i) => {
    makeDraggable(el, "pos_icon_" + i);
  });
});

/* ---------- LOCK / UNLOCK BUTTON ---------- */
document.getElementById("toggleLayout")?.addEventListener("click", () => {
  layoutLocked = !layoutLocked;
  localStorage.setItem("layoutLocked", layoutLocked);
  location.reload();
});

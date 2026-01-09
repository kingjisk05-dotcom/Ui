/* ==================================================
   VERTICAL DRAG ADDON
   - Sirf UP / DOWN movement
   - X-axis locked
   - Lock system compatible
   ================================================== */

window.addEventListener("load", () => {

  const elements = [
    document.getElementById("clockBox"),
    document.getElementById("searchWrap"),
    document.querySelector(".speed-dial")
  ];

  elements.forEach(el => {
    if (!el) return;
    enableVerticalDrag(el);
  });

  function enableVerticalDrag(el) {
    let startY = 0;
    let startTop = 0;
    let dragging = false;

    el.style.touchAction = "none";
    el.style.cursor = "grab";

    el.addEventListener("mousedown", startDrag);
    el.addEventListener("touchstart", startDrag, { passive: false });

    function startDrag(e) {
      if (window.isDragLocked && window.isDragLocked()) return;

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
      if (!dragging) return;
      e.preventDefault();

      const deltaY = getY(e) - startY;
      el.style.top = startTop + deltaY + "px";
    }

    function stopDrag() {
      dragging = false;
      el.style.cursor = "grab";

      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchend", stopDrag);
    }

    function getY(e) {
      return e.touches ? e.touches[0].clientY : e.clientY;
    }
  }

});

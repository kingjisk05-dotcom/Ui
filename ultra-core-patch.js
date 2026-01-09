/* ==================================================
   ULTRA CORE PATCH (STABILITY ENGINE)
   - Layout Persistence (Saves positions)
   - Conflict Manager (Disables Tilt during Drag)
   - Memory Garbage Collector (Video Cleanup)
   - Touch Event Polyfill (Mobile Drag Stability)
   ================================================== */
window.__NEW_CONTROL_CENTER__ = true;

window.addEventListener("DOMContentLoaded", () => {
  console.log("🔰 Ultra Core Patch: Initializing Stability Engine...");

  const clock = document.getElementById("clockBox");
  const search = document.getElementById("searchWrap");
  const tiltCard = document.getElementById("tiltCard");

  // ===============================================
  // 1. LAYOUT PERSISTENCE (Save & Load Positions)
  // ===============================================
  function loadPositions() {
    const positions = JSON.parse(localStorage.getItem("os_layout_cfg")) || {};
    
    if (positions.clock) {
      clock.style.position = "absolute";
      clock.style.top = positions.clock.top;
      clock.style.left = positions.clock.left;
    }
    
    if (positions.search) {
      search.style.position = "absolute";
      search.style.top = positions.search.top;
      search.style.left = positions.search.left;
    }
  }

  function savePositions() {
    const cfg = {
      clock: { top: clock.style.top, left: clock.style.left },
      search: { top: search.style.top, left: search.style.left }
    };
    localStorage.setItem("os_layout_cfg", JSON.stringify(cfg));
  }

  // Restore positions immediately on load
  loadPositions();

  // Save positions whenever a drag ends (Mouse & Touch)
  document.addEventListener("mouseup", savePositions);
  document.addEventListener("touchend", savePositions);


  // ===============================================
  // 2. CONFLICT MANAGER (Stop Tilt when Dragging)
  // ===============================================
  let isDragging = false;

  // Intercept the drag start
  const draggables = [clock, search];
  
  draggables.forEach(el => {
    // Detect drag start (Standard + Touch)
    el.addEventListener("mousedown", () => { isDragging = true; disableTilt(); });
    el.addEventListener("touchstart", () => { isDragging = true; disableTilt(); }, {passive: true});
    
    // Detect drag end
    el.addEventListener("mouseup", () => { isDragging = false; enableTilt(); });
    el.addEventListener("touchend", () => { isDragging = false; enableTilt(); });
  });

  // Global safety release
  window.addEventListener("mouseup", () => { isDragging = false; enableTilt(); });

  function disableTilt() {
    if(tiltCard) {
      // Force reset transform to prevent jitter
      tiltCard.style.transform = "rotateY(0deg) rotateX(0deg)";
      tiltCard.style.transition = "transform 0.2s ease"; // Smooth reset
    }
    // Block the original tilt script by capturing the event
    window.addEventListener("mousemove", blockTilt, true);
  }

  function enableTilt() {
    window.removeEventListener("mousemove", blockTilt, true);
    if(tiltCard) tiltCard.style.transition = ""; // Remove transition for instant tilt response
  }

  function blockTilt(e) {
    if (isDragging) {
      e.stopPropagation(); // Stop the original tilt calculation
    }
  }


  // ===============================================
  // 3. MOBILE TOUCH POLYFILL (Make Drag work on Phone)
  // ===============================================
  // Your original code only uses 'mousedown'. This adds touch support.
  function touchHandler(event) {
    const touches = event.changedTouches;
    const first = touches[0];
    let type = "";

    switch(event.type) {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;        
        case "touchend":   type = "mouseup";   break;
        default: return;
    }

    const simulatedEvent = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1,
        screenX: first.screenX,
        screenY: first.screenY,
        clientX: first.clientX,
        clientY: first.clientY,
        button: 0
    });

    first.target.dispatchEvent(simulatedEvent);
  }

  draggables.forEach(el => {
    el.addEventListener("touchstart", touchHandler, true);
    el.addEventListener("touchmove", touchHandler, true);
    el.addEventListener("touchend", touchHandler, true);
    el.addEventListener("touchcancel", touchHandler, true);
  });


  // ===============================================
  // 4. VIDEO MEMORY OPTIMIZER (Garbage Collection)
  // ===============================================
  // Monitors video source changes and frees memory
  const videoEl = document.getElementById("bg-video");
  if(videoEl) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "src") {
           // If there was an old blob URL, revoke it to free RAM
           const oldSrc = mutation.oldValue;
           if(oldSrc && oldSrc.startsWith("blob:")) {
             URL.revokeObjectURL(oldSrc);
             console.log("🧹 Released Video Memory");
           }
        }
      });
    });
    
    observer.observe(videoEl, { 
      attributes: true, 
      attributeOldValue: true // Important to capture previous URL
    });
  }
});

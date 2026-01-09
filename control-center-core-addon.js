/* ==================================================
   CONTROL CENTER CORE ENGINE
   - Single root detection
   - Slot-based injection
   - Conflict-free addon system
   ================================================== */

(function () {

  if (window.ControlCenter) return; // 🛑 already initialized

  window.ControlCenter = {
    root: null,
    slots: {},
    ready: false,
    queue: []
  };

  // 🔍 Detect Control Center root
  function findControlCenter() {
    return [...document.querySelectorAll("div")]
      .find(el =>
        el.textContent.includes("Control Center") &&
        el.querySelector("button")
      );
  }

  // 👀 Watch DOM until Control Center appears
  const observer = new MutationObserver(() => {
    const root = findControlCenter();
    if (root) {
      observer.disconnect();
      init(root);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  function init(root) {
    console.log("🧩 Control Center Core Ready");

    root.dataset.ccRoot = "true";
    ControlCenter.root = root;
    ControlCenter.ready = true;

    // 🔳 Create default slots
    createSlot("top");
    createSlot("middle");
    createSlot("bottom");

    // 🚀 Flush queued addons
    ControlCenter.queue.forEach(fn => fn());
    ControlCenter.queue = [];
  }

  function createSlot(name) {
    const slot = document.createElement("div");
    slot.className = "cc-slot cc-" + name;
    slot.style.marginTop = "12px";

    ControlCenter.root.appendChild(slot);
    ControlCenter.slots[name] = slot;
  }

  // 🌍 PUBLIC API
  ControlCenter.register = function (addonFn) {
    if (ControlCenter.ready) addonFn();
    else ControlCenter.queue.push(addonFn);
  };

})();

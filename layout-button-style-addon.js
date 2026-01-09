/* ==================================================
   LAYOUT BUTTON STYLE ADDON
   Fixes white background & matches panel UI
   ================================================== */

(function () {
  const style = document.createElement("style");
  style.textContent = `
    /* Force layout button to match panel buttons */
    .panel-btn.layout-btn {
      background: rgba(255, 255, 255, 0.08) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 14px;
      padding: 14px;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      font-size: 16px;
      text-align: left;
    }

    /* Locked state */
    .panel-btn.layout-btn.locked {
      background: rgba(0, 0, 0, 0.35) !important;
    }

    /* Unlocked state */
    .panel-btn.layout-btn.unlocked {
      background: rgba(255, 52, 179, 0.18) !important;
      box-shadow: 0 0 12px rgba(255, 52, 179, 0.45);
    }
  `;
  document.head.appendChild(style);
})();

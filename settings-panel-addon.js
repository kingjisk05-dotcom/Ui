/* ==================================================
   SETTINGS PANEL ADDON
   Creates panel dynamically (no HTML edit needed)
   ================================================== */

window.addEventListener("load", () => {

  const settingsBtn = document.getElementById("settingsBtn");
  if (!settingsBtn) return;

  /* ---------- CREATE PANEL ---------- */
  const panel = document.createElement("div");
  panel.id = "settingsPanel";

  panel.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 260px;
    height: 100vh;
    background: rgba(0,0,0,.65);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: -10px 0 30px rgba(0,0,0,.6);
    transform: translateX(100%);
    transition: transform .35s ease;
    z-index: 9999;
    padding: 20px;
    color: #fff;
  `;

  panel.innerHTML = `
    <h3 style="margin-top:0">⚙️ Settings</h3>
    <button id="dragToggleBtn"
      style="
        width:100%;
        padding:12px;
        margin-top:10px;
        border-radius:10px;
        border:none;
        background:#222;
        color:#fff;
        font-size:16px;
      ">
      🔓 Layout Unlocked
    </button>
  `;

  document.body.appendChild(panel);

  /* ---------- TOGGLE PANEL ---------- */
  let open = false;
  settingsBtn.addEventListener("click", () => {
    open = !open;
    panel.style.transform = open ? "translateX(0)" : "translateX(100%)";
  });

  /* ---------- CLOSE ON OUTSIDE TAP ---------- */
  document.addEventListener("click", e => {
    if (open && !panel.contains(e.target) && !settingsBtn.contains(e.target)) {
      open = false;
      panel.style.transform = "translateX(100%)";
    }
  });

});

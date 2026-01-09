/* ==================================================
   ADVANCED FLOATING SETTINGS PANEL
   - OS-style glass UI
   - ⚙️ icon toggle
   - Outside click close
   - Layout lock control
   - Wallpaper actions
   - State safe (no conflict)
   ================================================== */

window.addEventListener("load", () => {

  /* ===============================
     🎯 CORE REFERENCES
     =============================== */
  const settingsBtn = document.getElementById("settingsBtn");
  if (!settingsBtn) return;

  const bgVideo = document.getElementById("bg-video");

  /* ===============================
     🧱 PANEL CREATE
     =============================== */
  const panel = document.createElement("div");
  panel.id = "floatingSettings";

  panel.innerHTML = `
    <div class="fs-header">
      <span>⚙ Settings</span>
      <span class="fs-close">✕</span>
    </div>

    <div class="fs-section">
      <button class="fs-btn" id="fsLayoutLock"></button>
    </div>

    <div class="fs-section">
      <button class="fs-btn" id="fsAddWall">🖼 Add Wallpaper</button>
      <button class="fs-btn" id="fsResetWall">♻ Reset Wallpaper</button>
      <button class="fs-btn" id="fsToggleVideo">🎥 Toggle Video</button>
    </div>
  `;

  document.body.appendChild(panel);

  /* ===============================
     🎨 STYLES (INJECTED)
     =============================== */
  const style = document.createElement("style");
  style.innerHTML = `
    #floatingSettings{
      position:fixed;
      top:70px;
      right:20px;
      width:260px;
      padding:16px;
      border-radius:18px;
      background:rgba(0,0,0,0.55);
      backdrop-filter:blur(25px);
      -webkit-backdrop-filter:blur(25px);
      border:1px solid rgba(255,255,255,0.12);
      box-shadow:0 0 30px rgba(255,52,179,0.35);
      color:#fff;
      z-index:9999;
      opacity:0;
      transform:translateY(-10px) scale(0.95);
      pointer-events:none;
      transition:0.35s ease;
    }

    #floatingSettings.open{
      opacity:1;
      transform:translateY(0) scale(1);
      pointer-events:auto;
    }

    .fs-header{
      display:flex;
      justify-content:space-between;
      align-items:center;
      font-weight:700;
      margin-bottom:12px;
      color:var(--neon);
    }

    .fs-close{
      cursor:pointer;
      opacity:0.7;
    }

    .fs-section{
      margin-top:10px;
    }

    .fs-btn{
      width:100%;
      margin-top:8px;
      padding:12px;
      border:none;
      border-radius:14px;
      background:rgba(255,255,255,0.08);
      color:#fff;
      font-size:14px;
      cursor:pointer;
      transition:0.25s;
      text-align:left;
    }

    .fs-btn:hover{
      background:var(--neon);
      color:#000;
    }
  `;
  document.head.appendChild(style);

  /* ===============================
     🔒 LAYOUT LOCK STATE
     =============================== */
  let locked = window.__layoutLocked ?? false;
  const lockBtn = panel.querySelector("#fsLayoutLock");

  function updateLockUI(){
    lockBtn.textContent = locked
      ? "🔒 Layout Locked"
      : "🔓 Layout Unlocked";
  }
  updateLockUI();

  lockBtn.onclick = () => {
    locked = !locked;
    window.__layoutLocked = locked;
    localStorage.setItem("layoutLocked", locked);
    updateLockUI();
  };

  /* ===============================
     🖼 WALLPAPER ACTIONS
     =============================== */
  panel.querySelector("#fsAddWall").onclick = () => {
    const picker = document.getElementById("wallPicker");
    if (picker) picker.click();
  };

  panel.querySelector("#fsResetWall").onclick = () => {
    localStorage.removeItem("ultraWall");
    localStorage.removeItem("ultraWallType");
    location.reload();
  };

  panel.querySelector("#fsToggleVideo").onclick = () => {
    if (!bgVideo) return;
    if (bgVideo.style.display === "none") {
      bgVideo.style.display = "block";
      document.body.style.backgroundImage = "none";
    } else {
      bgVideo.style.display = "none";
    }
  };

  /* ===============================
     ⚙️ OPEN / CLOSE LOGIC
     =============================== */
  let open = false;

  function closePanel(){
    open = false;
    panel.classList.remove("open");
  }

  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    open = !open;
    panel.classList.toggle("open", open);
  });

  panel.querySelector(".fs-close").onclick = closePanel;

  panel.addEventListener("click", e => e.stopPropagation());

  document.addEventListener("click", () => {
    if (open) closePanel();
  });

});

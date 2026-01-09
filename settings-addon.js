/* ==================================================
   ADVANCED FLOATING SETTINGS PANEL (FINAL FIX)
   - Wallpaper preview (image/video)
   - Real layout lock (drag-safe)
   - OS-style glass UI
   ================================================== */

window.addEventListener("load", () => {

  /* ===============================
     CORE REFERENCES
     =============================== */
  const settingsBtn = document.getElementById("settingsBtn");
  const bgVideo = document.getElementById("bg-video");
  const wallPicker = document.getElementById("wallPicker");

  if (!settingsBtn) return;

  /* ===============================
     ENSURE GLOBAL LOCK HOOK
     =============================== */
  if (!window.isDragLocked) {
    window.isDragLocked = () => window.__layoutLocked === true;
  }

  /* ===============================
     PANEL CREATE
     =============================== */
  const panel = document.createElement("div");
  panel.id = "floatingSettings";

  panel.innerHTML = `
    <div class="fs-header">
      <span>⚙ Settings</span>
      <span class="fs-close">✕</span>
    </div>

    <div class="fs-preview">
      <div class="fs-thumb" id="fsThumb"></div>
      <div class="fs-preview-text">Current Wallpaper</div>
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
     STYLES
     =============================== */
  const style = document.createElement("style");
  style.innerHTML = `
    #floatingSettings{
      position:fixed;
      top:70px;
      right:20px;
      width:270px;
      padding:16px;
      border-radius:20px;
      background:rgba(0,0,0,0.55);
      backdrop-filter:blur(28px);
      -webkit-backdrop-filter:blur(28px);
      border:1px solid rgba(255,255,255,0.12);
      box-shadow:0 0 35px rgba(255,52,179,0.35);
      color:#fff;
      z-index:9999;
      opacity:0;
      transform:translateY(-12px) scale(0.95);
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
      margin-bottom:10px;
      color:var(--neon);
    }

    .fs-preview{
      margin:10px 0;
      text-align:center;
    }

    .fs-thumb{
      width:100%;
      height:110px;
      border-radius:14px;
      background:#111 center / cover no-repeat;
      box-shadow:inset 0 0 0 1px rgba(255,255,255,0.12);
    }

    .fs-preview-text{
      font-size:12px;
      opacity:0.7;
      margin-top:6px;
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

    .fs-close{
      cursor:pointer;
      opacity:0.7;
    }
  `;
  document.head.appendChild(style);

  /* ===============================
     WALLPAPER PREVIEW LOGIC
     =============================== */
  const thumb = panel.querySelector("#fsThumb");

  function updatePreview() {
    const type = localStorage.getItem("ultraWallType");
    const wall = localStorage.getItem("ultraWall");

    if (!wall) {
      thumb.style.backgroundImage = `url("wall.jpg")`;
      return;
    }

    if (type === "image") {
      thumb.style.backgroundImage = `url(${wall})`;
    } else {
      thumb.style.backgroundImage =
        `linear-gradient(135deg, #ff34b3, #000)`;
    }
  }
  updatePreview();

  /* ===============================
     REAL LAYOUT LOCK (FIXED)
     =============================== */
  let locked = window.__layoutLocked === true;
  const lockBtn = panel.querySelector("#fsLayoutLock");

  function updateLockUI(){
    lockBtn.textContent = locked
      ? "🔒 Layout Locked (Drag OFF)"
      : "🔓 Layout Unlocked (Drag ON)";
  }
  updateLockUI();

  lockBtn.onclick = () => {
    locked = !locked;
    window.__layoutLocked = locked;
    localStorage.setItem("layoutLocked", locked);

    // 🔥 FORCE drag system to respect lock
    window.isDragLocked = () => locked;

    updateLockUI();
  };

  /* ===============================
     ACTION BUTTONS
     =============================== */
  panel.querySelector("#fsAddWall").onclick = () => {
    if (wallPicker) wallPicker.click();
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
     OPEN / CLOSE LOGIC
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
    updatePreview();
  });

  panel.querySelector(".fs-close").onclick = closePanel;
  panel.addEventListener("click", e => e.stopPropagation());

  document.addEventListener("click", () => {
    if (open) closePanel();
  });

});

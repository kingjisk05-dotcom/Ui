/* ==================================================
   ADVANCED FLOATING SETTINGS PANEL (FINAL STABLE)
   - Persistent layout lock (refresh safe)
   - Drag system hard-linked
   - Image + LIVE video wallpaper preview
   - All buttons fully functional
   ================================================== */

window.addEventListener("load", () => {

  /* ===============================
     CORE REFERENCES (SAFE)
     =============================== */
  const settingsBtn = document.getElementById("settingsBtn");
  if (!settingsBtn) return;

  /* ===============================
     🔒 HARD SYNC LAYOUT LOCK ON LOAD
     =============================== */
  const savedLock = localStorage.getItem("layoutLocked") === "true";
  window.__layoutLocked = savedLock;
  window.isDragLocked = () => window.__layoutLocked;

  /* ===============================
     🧱 CREATE FLOATING PANEL
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
     🎨 STYLES
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

    .fs-thumb{
      width:100%;
      height:120px;
      border-radius:14px;
      overflow:hidden;
      background:#000;
      box-shadow:inset 0 0 0 1px rgba(255,255,255,0.12);
    }

    .fs-thumb video{
      width:100%;
      height:100%;
      object-fit:cover;
    }

    .fs-preview-text{
      font-size:12px;
      opacity:0.7;
      margin-top:6px;
      text-align:center;
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
     🖼 WALLPAPER PREVIEW (IMAGE + LIVE VIDEO)
     =============================== */
  const thumb = panel.querySelector("#fsThumb");

  function updatePreview() {
    thumb.innerHTML = "";
    thumb.style.backgroundImage = "";

    const type = localStorage.getItem("ultraWallType");
    const wall = localStorage.getItem("ultraWall");

    if (!wall) {
      thumb.style.backgroundImage = `url("wall.jpg")`;
      return;
    }

    if (type === "image") {
      thumb.style.backgroundImage = `url(${wall})`;
    } 
    else if (type === "video") {
      const v = document.createElement("video");
      v.src = wall;
      v.muted = true;
      v.loop = true;
      v.autoplay = true;
      v.playsInline = true;
      thumb.appendChild(v);
    }
  }

  updatePreview();

  /* ===============================
     🔒 LAYOUT LOCK (REAL & REFRESH SAFE)
     =============================== */
  let locked = window.__layoutLocked;
  const lockBtn = panel.querySelector("#fsLayoutLock");

  function updateLockUI(){
    lockBtn.textContent = locked
      ? "🔒 Layout Locked (Drag OFF)"
      : "🔓 Layout Unlocked (Drag ON)";
  }
  updateLockUI();

  lockBtn.addEventListener("click", () => {
    locked = !locked;
    window.__layoutLocked = locked;
    localStorage.setItem("layoutLocked", locked);
    window.isDragLocked = () => locked;
    updateLockUI();
  });

  /* ===============================
     ⚙️ ACTION BUTTONS (HARD SAFE)
     =============================== */

  // 🖼 Add Wallpaper
  panel.querySelector("#fsAddWall").addEventListener("click", () => {
    const picker = document.getElementById("wallPicker");
    if (picker) picker.click();
  });

  // ♻ Reset Wallpaper
  panel.querySelector("#fsResetWall").addEventListener("click", () => {
    localStorage.removeItem("ultraWall");
    localStorage.removeItem("ultraWallType");
    location.reload();
  });

  // 🎥 Toggle Video
  panel.querySelector("#fsToggleVideo").addEventListener("click", () => {
    const video = document.getElementById("bg-video");
    if (!video) return;

    if (video.style.display === "none") {
      video.style.display = "block";
      document.body.style.backgroundImage = "none";
    } else {
      video.style.display = "none";
    }
  });

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

  panel.querySelector(".fs-close").addEventListener("click", closePanel);
  panel.addEventListener("click", e => e.stopPropagation());

  document.addEventListener("click", () => {
    if (open) closePanel();
  });

});

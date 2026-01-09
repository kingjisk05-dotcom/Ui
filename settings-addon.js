/* ==================================================
   ULTRA UI SETTINGS PANEL (ENHANCED)
   - Glassmorphism & Neon Aesthetics
   - SVG Icons & Grid Layout
   - Modern Toggle Switch for Layout Lock
   - Fully Compatible with existing logic
   ================================================== */

window.addEventListener("load", () => {

  /* ===============================
     CORE REFERENCES
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
     🧱 CREATE FLOATING PANEL (NEW STRUCTURE)
     =============================== */
  const panel = document.createElement("div");
  panel.id = "floatingSettings";

  // SVG Icons
  const icons = {
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
  };

  panel.innerHTML = `
    <div class="fs-glass-bg"></div>
    
    <div class="fs-header">
      <div class="fs-title">
        ${icons.settings}
        <span>Control Center</span>
      </div>
      <div class="fs-close">${icons.close}</div>
    </div>

    <div class="fs-preview-container">
      <div class="fs-thumb" id="fsThumb"></div>
      <div class="fs-badge">Active Wallpaper</div>
    </div>

    <div class="fs-control-row" id="fsLayoutLockRow">
      <div class="fs-control-info">
        <span class="fs-control-title">Layout Lock</span>
        <span class="fs-control-desc" id="fsLockStatus">Drag Disabled</span>
      </div>
      <div class="fs-toggle-wrapper">
        <input type="checkbox" id="fsLayoutLockCheckbox">
        <label for="fsLayoutLockCheckbox" class="fs-toggle-slider"></label>
      </div>
    </div>

    <div class="fs-divider"></div>

    <div class="fs-grid">
      <button class="fs-btn primary" id="fsAddWall">
        ${icons.image}
        <span>Change BG</span>
      </button>
      
      <button class="fs-btn" id="fsToggleVideo">
        ${icons.video}
        <span>Video On/Off</span>
      </button>

      <button class="fs-btn danger full-width" id="fsResetWall">
        ${icons.trash}
        <span>Reset Default</span>
      </button>
    </div>
  `;

  document.body.appendChild(panel);

  /* ===============================
     🎨 ULTRA CSS STYLES
     =============================== */
  const style = document.createElement("style");
  style.textContent = `
    :root {
      --fs-bg: rgba(18, 18, 24, 0.65);
      --fs-border: rgba(255, 255, 255, 0.08);
      --fs-accent: #00d2ff;
      --fs-accent-glow: rgba(0, 210, 255, 0.4);
      --fs-text: #ffffff;
      --fs-text-dim: rgba(255, 255, 255, 0.5);
      --fs-danger: #ff4757;
    }

    #floatingSettings {
      position: fixed;
      top: 80px;
      right: 25px;
      width: 300px;
      border-radius: 24px;
      z-index: 10000;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      opacity: 0;
      transform: translateY(-20px) scale(0.96);
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px var(--fs-border);
      overflow: hidden;
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      background: var(--fs-bg);
    }

    #floatingSettings.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .fs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 15px 20px;
    }

    .fs-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 16px;
      color: var(--fs-text);
      letter-spacing: 0.5px;
    }

    .fs-title svg { width: 18px; height: 18px; }

    .fs-close {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      cursor: pointer;
      transition: 0.2s;
      color: var(--fs-text);
    }
    .fs-close:hover { background: rgba(255,255,255,0.15); transform: rotate(90deg); }
    .fs-close svg { width: 18px; height: 18px; }

    /* Preview */
    .fs-preview-container {
      position: relative;
      margin: 0 20px 20px 20px;
    }

    .fs-thumb {
      width: 100%;
      height: 140px;
      border-radius: 16px;
      background: #000;
      background-size: cover;
      background-position: center;
      overflow: hidden;
      border: 1px solid var(--fs-border);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .fs-thumb video { width: 100%; height: 100%; object-fit: cover; }

    .fs-badge {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 600;
      color: var(--fs-text);
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Controls */
    .fs-control-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
    }

    .fs-control-info { display: flex; flex-direction: column; }
    .fs-control-title { font-size: 14px; font-weight: 600; color: var(--fs-text); }
    .fs-control-desc { font-size: 12px; color: var(--fs-text-dim); margin-top: 2px; }

    /* Toggle Switch */
    .fs-toggle-wrapper { position: relative; width: 44px; height: 24px; }
    .fs-toggle-wrapper input { opacity: 0; width: 0; height: 0; }
    .fs-toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(255,255,255,0.1);
      transition: .4s;
      border-radius: 34px;
    }
    .fs-toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px; width: 18px;
      left: 3px; bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    input:checked + .fs-toggle-slider { background-color: var(--fs-accent); box-shadow: 0 0 15px var(--fs-accent-glow); }
    input:checked + .fs-toggle-slider:before { transform: translateX(20px); }

    .fs-divider {
      height: 1px;
      background: var(--fs-border);
      margin: 0 20px 20px 20px;
    }

    /* Grid Buttons */
    .fs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 0 20px 20px 20px;
    }

    .fs-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px 10px;
      border: 1px solid var(--fs-border);
      background: rgba(255,255,255,0.03);
      border-radius: 16px;
      color: var(--fs-text);
      cursor: pointer;
      transition: all 0.25s;
    }

    .fs-btn:hover {
      background: rgba(255,255,255,0.08);
      transform: translateY(-2px);
      border-color: rgba(255,255,255,0.2);
    }

    .fs-btn svg { width: 22px; height: 22px; opacity: 0.8; }
    .fs-btn span { font-size: 11px; font-weight: 500; opacity: 0.8; }

    .fs-btn.primary:hover { border-color: var(--fs-accent); color: var(--fs-accent); }
    .fs-btn.primary:hover svg { stroke: var(--fs-accent); }
    
    .fs-btn.danger:hover { border-color: var(--fs-danger); color: var(--fs-danger); }
    .fs-btn.danger:hover svg { stroke: var(--fs-danger); }

    .full-width { grid-column: span 2; flex-direction: row; padding: 12px; }
  `;
  document.head.appendChild(style);

  /* ===============================
     🖼 WALLPAPER PREVIEW (LOGIC PRESERVED)
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
     🔒 LAYOUT LOCK (UPDATED FOR TOGGLE)
     =============================== */
  let locked = window.__layoutLocked;
  const lockCheckbox = panel.querySelector("#fsLayoutLockCheckbox");
  const lockStatusText = panel.querySelector("#fsLockStatus");
  const lockRow = panel.querySelector("#fsLayoutLockRow");

  function updateLockUI(){
    lockCheckbox.checked = locked;
    if(locked) {
      lockStatusText.textContent = "Position Fixed";
      lockStatusText.style.color = "var(--fs-accent)";
    } else {
      lockStatusText.textContent = "Drag Enabled";
      lockStatusText.style.color = "var(--fs-text-dim)";
    }
  }
  updateLockUI();

  // Listen for click on the whole row or checkbox
  lockCheckbox.addEventListener("change", (e) => {
    locked = e.target.checked;
    window.__layoutLocked = locked;
    localStorage.setItem("layoutLocked", locked);
    window.isDragLocked = () => locked;
    updateLockUI();
  });

  /* ===============================
     ⚙️ ACTION BUTTONS (LOGIC PRESERVED)
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

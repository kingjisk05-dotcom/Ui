/* ==================================================
   ULTRA CONTROL CENTER (SINGLE SCRIPT)
   - Settings Panel
   - Layout Lock (Persistent)
   - Drag Sync
   - Wallpaper Picker Safe Trigger
   - Event Isolation (NO CONFLICTS)
   ================================================== */

(function () {

  /* ==================================================
     🔒 GLOBAL STATE (BOOTSTRAP)
     ================================================== */
  const savedLock = localStorage.getItem("layoutLocked") === "true";
  window.__layoutLocked = savedLock;
  window.isDragLocked = () => window.__layoutLocked;

  /* ==================================================
     🚀 INIT AFTER LOAD
     ================================================== */
  window.addEventListener("load", () => {

    const settingsBtn = document.getElementById("settingsBtn");
    if (!settingsBtn) return;

    /* ==================================================
       🧱 CREATE PANEL
       ================================================== */
    const panel = document.createElement("div");
    panel.id = "floatingSettings";
    panel.innerHTML = `
      <div class="fs-header">
        <span>⚙ Control Center</span>
        <button id="fsClose">✕</button>
      </div>

      <div class="fs-preview" id="fsThumb"></div>

      <label class="fs-row">
        <span id="fsLockStatus">Position Fixed</span>
        <input type="checkbox" id="fsLayoutLock">
      </label>

      <button id="fsAddWall">🖼 Change BG</button>
      <button id="fsToggleVideo">🎥 Video On / Off</button>
      <button id="fsResetWall">♻ Reset Default</button>
    `;
    document.body.appendChild(panel);

    /* ==================================================
       🎨 BASIC STYLES (MINIMAL)
       ================================================== */
    const style = document.createElement("style");
    style.textContent = `
      #floatingSettings{
        position:fixed; top:80px; right:20px;
        width:260px; padding:16px;
        background:rgba(0,0,0,.6);
        backdrop-filter:blur(25px);
        border-radius:18px;
        color:#fff; z-index:10000;
        opacity:0; pointer-events:none;
        transform:scale(.95);
        transition:.3s ease;
      }
      #floatingSettings.open{
        opacity:1; pointer-events:auto; transform:scale(1);
      }
      .fs-header{display:flex;justify-content:space-between;align-items:center;}
      .fs-preview{height:120px;border-radius:12px;background:#000;margin:12px 0;}
      .fs-row{display:flex;justify-content:space-between;align-items:center;margin:10px 0;}
      #floatingSettings button{width:100%;margin-top:8px;padding:10px;border-radius:12px;border:none;}
    `;
    document.head.appendChild(style);

    /* ==================================================
       🖼 WALLPAPER PREVIEW
       ================================================== */
    const thumb = panel.querySelector("#fsThumb");
    function updatePreview(){
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
      } else if (type === "video") {
        const v = document.createElement("video");
        v.src = wall;
        v.autoplay = true;
        v.loop = true;
        v.muted = true;
        v.playsInline = true;
        v.style.width = "100%";
        v.style.height = "100%";
        v.style.objectFit = "cover";
        thumb.appendChild(v);
      }
    }

    /* ==================================================
       🔒 LAYOUT LOCK
       ================================================== */
    let locked = window.__layoutLocked;
    const lockBox = panel.querySelector("#fsLayoutLock");
    const lockText = panel.querySelector("#fsLockStatus");

    function syncLockUI(){
      lockBox.checked = locked;
      lockText.textContent = locked ? "Position Fixed" : "Drag Enabled";
    }
    syncLockUI();

    lockBox.addEventListener("change", (e) => {
      locked = e.target.checked;
      window.__layoutLocked = locked;
      localStorage.setItem("layoutLocked", locked);
      window.isDragLocked = () => locked;

      document.dispatchEvent(
        new CustomEvent("layout-lock-changed", { detail: locked })
      );

      syncLockUI();
    });

    /* ==================================================
       ⚙️ BUTTON ACTIONS (SAFE)
       ================================================== */
    panel.querySelector("#fsAddWall").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const picker = document.getElementById("wallPicker");
      if (picker) picker.click();
    });

    panel.querySelector("#fsResetWall").addEventListener("click", () => {
      localStorage.removeItem("ultraWall");
      localStorage.removeItem("ultraWallType");
      location.reload();
    });

    panel.querySelector("#fsToggleVideo").addEventListener("click", () => {
      const video = document.getElementById("bg-video");
      if (!video) return;
      video.style.display =
        video.style.display === "none" ? "block" : "none";
    });

    /* ==================================================
       🧠 OPEN / CLOSE (NO CONFLICT)
       ================================================== */
    let open = false;

    settingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // 🔥 KEY FIX
      open = !open;
      panel.classList.toggle("open", open);
      updatePreview();
    });

    panel.querySelector("#fsClose").onclick = () => {
      open = false;
      panel.classList.remove("open");
    };

    panel.addEventListener("click", e => e.stopPropagation());
    document.addEventListener("click", () => {
      if (open) {
        open = false;
        panel.classList.remove("open");
      }
    });

  });

})();

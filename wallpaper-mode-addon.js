/* ==================================================
   WALLPAPER MODE ENGINE
   Fit / Fill / Smart + Blur Bars + Center Focus
   ================================================== */

let mode = localStorage.getItem("wallMode") || "smart";

/* ---------- SETTINGS PANEL EXTENSION ---------- */
const wallControls = document.createElement("div");
wallControls.innerHTML = `
  <hr style="opacity:.2">
  <div class="fs-title">🖼 Wallpaper Mode</div>
  <button class="fs-btn" data-mode="fit">Fit</button>
  <button class="fs-btn" data-mode="fill">Fill</button>
  <button class="fs-btn" data-mode="smart">Smart</button>
`;

document.getElementById("floatingSettings")?.appendChild(wallControls);

wallControls.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => {
    localStorage.setItem("wallMode", btn.dataset.mode);
    location.reload();
  };
});

/* ---------- BLUR BAR LAYER ---------- */
const blurLayer = document.createElement("div");
blurLayer.style.cssText = `
  position:fixed;
  inset:0;
  background:inherit;
  filter:blur(30px) brightness(0.8);
  z-index:-2;
  display:none;
`;
document.body.appendChild(blurLayer);

/* ---------- CENTER FOCUS HEURISTIC ---------- */
function applyCenterFocus(video) {
  video.style.objectPosition = "50% 40%"; // head-biased center
}

/* ---------- APPLY MODE ---------- */
function applyWallpaperMode() {
  const type = localStorage.getItem("ultraWallType");

  if (type === "video" && bgVideo?.src) {
    bgVideo.onloadedmetadata = () => {
      const vr = bgVideo.videoWidth / bgVideo.videoHeight;
      const sr = window.innerWidth / window.innerHeight;

      if (mode === "fit") {
        bgVideo.style.objectFit = "contain";
        blurLayer.style.display = "block";
      }

      if (mode === "fill") {
        bgVideo.style.objectFit = "cover";
        blurLayer.style.display = "none";
        applyCenterFocus(bgVideo);
      }

      if (mode === "smart") {
        if (vr < sr) {
          bgVideo.style.objectFit = "contain";
          blurLayer.style.display = "block";
        } else {
          bgVideo.style.objectFit = "cover";
          blurLayer.style.display = "none";
          applyCenterFocus(bgVideo);
        }
      }
    };
  }

  /* IMAGE MODE */
  if (type === "image") {
    if (mode === "fit") {
      document.body.style.backgroundSize = "contain";
      blurLayer.style.display = "block";
    }

    if (mode === "fill") {
      document.body.style.backgroundSize = "cover";
      blurLayer.style.display = "none";
      document.body.style.backgroundPosition = "center 40%";
    }

    if (mode === "smart") {
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }
}

/* ---------- EVENTS ---------- */
window.addEventListener("load", applyWallpaperMode);
window.addEventListener("resize", applyWallpaperMode);
window.addEventListener("orientationchange", applyWallpaperMode);

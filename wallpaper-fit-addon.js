/* ==================================================
   SMART WALLPAPER FIT ADDON
   Image + Video | Mobile + Desktop
   ================================================== */

function isMobile() {
  return window.innerWidth <= 768;
}

/* ---------- IMAGE FIT ---------- */
function applyImageFit() {
  if (bgVideo) return;

  if (isMobile()) {
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
  } else {
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
  }
}

/* ---------- VIDEO FIT ---------- */
function applyVideoFit() {
  if (!bgVideo) return;

  if (isMobile()) {
    bgVideo.style.objectFit = "cover";
    bgVideo.style.objectPosition = "center";
  } else {
    bgVideo.style.objectFit = "cover";
    bgVideo.style.objectPosition = "center";
  }
}

/* ---------- SMART SWITCH ---------- */
function smartWallpaperFit() {
  const type = localStorage.getItem("ultraWallType");

  if (type === "video") {
    applyVideoFit();
  } else {
    applyImageFit();
  }
}

/* ---------- EVENTS ---------- */
window.addEventListener("load", smartWallpaperFit);
window.addEventListener("resize", smartWallpaperFit);
window.addEventListener("orientationchange", smartWallpaperFit);

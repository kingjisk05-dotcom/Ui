/* ==================================================
   SMART VIDEO FIT (NO UNWANTED CROP)
   ================================================== */

function smartVideoFit() {
  if (!bgVideo || !bgVideo.src) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  bgVideo.onloadedmetadata = () => {
    const videoRatio = bgVideo.videoWidth / bgVideo.videoHeight;
    const screenRatio = vw / vh;

    /* Portrait / tall video */
    if (videoRatio < screenRatio) {
      bgVideo.style.objectFit = "contain";
      bgVideo.style.background = "#000";
    } 
    /* Wide or cinematic */
    else {
      bgVideo.style.objectFit = "cover";
      bgVideo.style.objectPosition = "center";
    }
  };
}

window.addEventListener("load", smartVideoFit);
window.addEventListener("resize", smartVideoFit);
window.addEventListener("orientationchange", smartVideoFit);

/* ==================================================
   WALLPAPER PREVIEW THUMBNAIL ADDON
   ================================================== */

window.addEventListener("load", () => {

  const panel = document.getElementById("floatingSettings");
  if (!panel) return;

  /* ---------- Preview Container ---------- */
  const previewBox = document.createElement("div");
  previewBox.id = "wallPreview";
  previewBox.style.cssText = `
    width:100%;
    height:110px;
    border-radius:14px;
    overflow:hidden;
    margin-bottom:12px;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.15);
    cursor:pointer;
    position:relative;
  `;

  /* ---------- Preview Label ---------- */
  const label = document.createElement("div");
  label.innerText = "Wallpaper Preview";
  label.style.cssText = `
    position:absolute;
    bottom:6px;
    left:10px;
    font-size:12px;
    opacity:0.8;
    z-index:2;
  `;

  previewBox.appendChild(label);

  /* ---------- Insert at TOP ---------- */
  panel.insertBefore(previewBox, panel.firstChild);

  /* ---------- Update Preview ---------- */
  function updatePreview() {
    previewBox.innerHTML = "";
    previewBox.appendChild(label);

    const type = localStorage.getItem("ultraWallType");
    const wall = localStorage.getItem("ultraWall");

    if (!wall) return;

    if (type === "image") {
      previewBox.style.background = `
        url(${wall}) center / cover no-repeat
      `;
    }

    if (type === "video") {
      const vid = document.createElement("video");
      vid.src = wall;
      vid.muted = true;
      vid.loop = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.style.cssText = `
        width:100%;
        height:100%;
        object-fit:cover;
      `;
      previewBox.appendChild(vid);
    }
  }

  /* ---------- Click → Add Wallpaper ---------- */
  previewBox.onclick = () => {
    if (wallPicker) wallPicker.click();
  };

  updatePreview();

});

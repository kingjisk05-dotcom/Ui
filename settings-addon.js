/* ================= SETTINGS PANEL ADD-ON (FIXED) ================= */

const panel = document.createElement("div");
panel.id = "settingsPanel";
panel.innerHTML = `
  <h3>⚙ Settings</h3>
  <button id="resetWall">Reset Wallpaper</button>
  <button id="toggleVideo">Toggle Video</button>
`;

panel.style.cssText = `
  position:fixed;
  top:0;
  right:-260px;
  width:250px;
  height:100%;
  background:rgba(0,0,0,0.85);
  backdrop-filter:blur(20px);
  color:#fff;
  padding:20px;
  transition:0.4s ease;
  z-index:9998;
`;

document.body.appendChild(panel);

let panelOpen = false;

/* ===== OPEN PANEL (ONLY FROM SETTINGS BUTTON) ===== */
settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // ⛔ outside click block
  panelOpen = !panelOpen;
  panel.style.right = panelOpen ? "0" : "-260px";
});

/* ===== PREVENT PANEL CLOSING WHEN CLICK INSIDE ===== */
panel.addEventListener("click", (e) => {
  e.stopPropagation(); // ⛔ very important
});

/* ===== CLOSE ONLY WHEN CLICK OUTSIDE ===== */
document.addEventListener("click", () => {
  if (panelOpen) {
    panelOpen = false;
    panel.style.right = "-260px";
  }
});

/* ===== RESET WALL ===== */
document.getElementById("resetWall").onclick = () => {
  localStorage.removeItem("ultraWall");
  localStorage.removeItem("ultraWallType");
  location.reload();
};

/* ===== VIDEO TOGGLE ===== */
document.getElementById("toggleVideo").onclick = () => {
  if (bgVideo.style.display === "none") {
    bgVideo.style.display = "block";
    document.body.style.backgroundImage = "none";
  } else {
    bgVideo.style.display = "none";
  }
};

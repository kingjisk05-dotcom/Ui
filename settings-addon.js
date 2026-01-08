/* ========== FLOATING GLASS SETTINGS BOX ========== */

const settingsBox = document.createElement("div");
settingsBox.id = "floatingSettings";

settingsBox.innerHTML = `
  <div class="fs-title">⚙ Settings</div>
  <button class="fs-btn" id="resetWall">Reset Wallpaper</button>
  <button class="fs-btn" id="toggleVideo">Toggle Video</button>
`;

settingsBox.style.cssText = `
  position:fixed;
  top:80px;
  right:20px;
  width:220px;
  padding:18px;
  border-radius:18px;
  background:rgba(0,0,0,0.55);
  backdrop-filter:blur(25px);
  -webkit-backdrop-filter:blur(25px);
  border:1px solid rgba(255,255,255,0.12);
  box-shadow:0 0 25px rgba(255,52,179,0.25);
  color:#fff;
  z-index:9999;
  opacity:0;
  transform:scale(0.9);
  pointer-events:none;
  transition:0.35s ease;
`;

document.body.appendChild(settingsBox);

/* ===== INTERNAL STYLES ===== */
const style = document.createElement("style");
style.innerHTML = `
  #floatingSettings .fs-title{
    font-weight:700;
    margin-bottom:12px;
    color:var(--neon);
    text-align:center;
    letter-spacing:1px;
  }
  #floatingSettings .fs-btn{
    width:100%;
    margin-top:10px;
    padding:10px;
    border:none;
    border-radius:12px;
    background:rgba(255,255,255,0.08);
    color:#fff;
    font-size:14px;
    cursor:pointer;
    transition:0.25s;
  }
  #floatingSettings .fs-btn:hover{
    background:var(--neon);
    color:#000;
  }
`;
document.head.appendChild(style);

let open = false;

/* ===== OPEN / CLOSE FROM SETTINGS ICON ===== */
settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  open = !open;

  settingsBox.style.opacity = open ? "1" : "0";
  settingsBox.style.transform = open ? "scale(1)" : "scale(0.9)";
  settingsBox.style.pointerEvents = open ? "auto" : "none";
});

/* ===== CLICK INSIDE → STAY OPEN ===== */
settingsBox.addEventListener("click", e => e.stopPropagation());

/* ===== CLICK OUTSIDE → CLOSE ===== */
document.addEventListener("click", () => {
  if(open){
    open = false;
    settingsBox.style.opacity = "0";
    settingsBox.style.transform = "scale(0.9)";
    settingsBox.style.pointerEvents = "none";
  }
});

/* ===== BUTTON ACTIONS ===== */
document.getElementById("resetWall").onclick = () => {
  localStorage.removeItem("ultraWall");
  localStorage.removeItem("ultraWallType");
  location.reload();
};

document.getElementById("toggleVideo").onclick = () => {
  if(bgVideo.style.display === "none"){
    bgVideo.style.display = "block";
    document.body.style.backgroundImage = "none";
  } else {
    bgVideo.style.display = "none";
  }
};

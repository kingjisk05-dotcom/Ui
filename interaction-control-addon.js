/* ==================================================
   INTERACTION CONTROL ADDON
   - Keyboard focus animation
   - Mouse tilt ON/OFF toggle
   ================================================== */

/* ---------- STATE ---------- */
let tiltEnabled = localStorage.getItem("tiltEnabled") !== "false";

/* ---------- SETTINGS PANEL EXTENSION ---------- */
const interactionControls = document.createElement("div");
interactionControls.innerHTML = `
  <button class="fs-btn" id="toggleTilt">
    ${tiltEnabled ? "🌀 Disable Mouse Tilt" : "🌀 Enable Mouse Tilt"}
  </button>
`;

document.getElementById("floatingSettings")?.appendChild(interactionControls);

/* ---------- KEYBOARD FOCUS ANIMATION ---------- */
window.addEventListener("load", () => {
  const search = document.getElementById("searchInput");
  const stage = document.querySelector(".center-stage");

  if (!search || !stage) return;

  search.addEventListener("focus", () => {
    stage.style.transition = "transform .35s ease";
    stage.style.transform = "translateY(-80px) scale(0.98)";
  });

  search.addEventListener("blur", () => {
    stage.style.transform = "translateY(0) scale(1)";
  });
});

/* ---------- MOUSE TILT CONTROL ---------- */
let tiltHandler;

function enableTilt() {
  const card = document.getElementById("tiltCard");
  if (!card) return;

  tiltHandler = (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  document.addEventListener("mousemove", tiltHandler);
}

function disableTilt() {
  document.removeEventListener("mousemove", tiltHandler);
  const card = document.getElementById("tiltCard");
  if (card) card.style.transform = "none";
}

/* Apply saved state */
if (tiltEnabled) enableTilt();

/* ---------- TOGGLE BUTTON ---------- */
document.getElementById("toggleTilt")?.addEventListener("click", () => {
  tiltEnabled = !tiltEnabled;
  localStorage.setItem("tiltEnabled", tiltEnabled);

  tiltEnabled ? enableTilt() : disableTilt();
  location.reload();
});

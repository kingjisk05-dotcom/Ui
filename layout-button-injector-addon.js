/* ==================================================
   LAYOUT BUTTON INJECTOR
   Injects Layout Lock button into EXISTING mini panel
   ================================================== */

window.addEventListener("load", () => {

  // 🔎 Find existing wallpaper / settings panel
  const panel = document.querySelector(".wallpaper-panel");
  if (!panel) {
    console.warn("Wallpaper panel not found");
    return;
  }

  // ❌ Already injected check
  if (document.getElementById("layoutToggleBtn")) return;

  // 🔘 Create button
  const btn = document.createElement("button");
  btn.id = "layoutToggleBtn";
  btn.style.cssText = `
    width:100%;
    padding:12px;
    margin:10px 0;
    border-radius:12px;
    border:none;
    background:#222;
    color:#fff;
    font-size:16px;
  `;

  panel.insertBefore(btn, panel.children[2]); 
  // 👆 Reset Wallpaper se pehle inject ho jaayega

  // 🔒 STATE
  let locked = localStorage.getItem("layoutLocked") === "true";

  function updateUI() {
    btn.textContent = locked
      ? "🔒 Layout Locked"
      : "🔓 Layout Unlocked";
  }
  updateUI();

  // 🔁 Toggle
  btn.addEventListener("click", () => {
    locked = !locked;
    localStorage.setItem("layoutLocked", locked);
    updateUI();
  });

  // 🌍 Global access for drag system
  window.isDragLocked = () => locked;

});

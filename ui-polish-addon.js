/* ==================================================
   UI POLISH ADDON (FINAL MERGED)
   FIX-1: Status bar blend
   FIX-2: Clock & greeting sync
   FIX-3: Mini settings / wallpaper panel open-close
   ================================================== */

/* ---------- FIX-1: FAKE STATUS BAR BLEND ---------- */
const statusBlend = document.createElement("div");
statusBlend.id = "statusBlend";

statusBlend.style.cssText = `
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:32px;
  background:linear-gradient(
    to bottom,
    rgba(0,0,0,0.45),
    rgba(0,0,0,0)
  );
  z-index:3;
  pointer-events:none;
`;

document.body.appendChild(statusBlend);

/* ---------- FIX-2 + FIX-3: CSS INJECTION ---------- */
const style = document.createElement("style");
style.innerHTML = `
  /* Clock polish */
  #time{
    text-shadow:0 0 25px rgba(255,255,255,0.35);
  }

  /* Greeting polish */
  .greeting{
    opacity:0.85;
    letter-spacing:1.5px;
  }

  /* ===============================
     MINI SETTINGS / WALLPAPER PANEL
     =============================== */
  .wallpaper-panel{
    opacity:0;
    pointer-events:none;
    transform:scale(0.96);
    transition:0.35s ease;
  }

  .wallpaper-panel.open{
    opacity:1;
    pointer-events:auto;
    transform:scale(1);
  }
`;
document.head.appendChild(style);

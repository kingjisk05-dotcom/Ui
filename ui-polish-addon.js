/* ==================================================
   UI POLISH ADDON
   FIX-1: Status bar blend
   FIX-2: Clock & greeting sync
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

/* ---------- FIX-2: CLOCK & GREETING SYNC ---------- */
const style = document.createElement("style");
style.innerHTML = `
  #time{
    text-shadow:0 0 25px rgba(255,255,255,0.35);
  }
  .greeting{
    opacity:0.85;
    letter-spacing:1.5px;
  }
`;
document.head.appendChild(style);

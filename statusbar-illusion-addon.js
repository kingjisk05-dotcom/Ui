/* ==================================================
   STATUS BAR ILLUSION FIX (FINAL & WORKING)
   ================================================== */

/* ---- Fake status bar layer ---- */
const fakeStatus = document.createElement("div");
fakeStatus.id = "fakeStatusBar";

fakeStatus.style.cssText = `
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:56px; /* Android status bar cover */
  background:linear-gradient(
    to bottom,
    rgba(0,0,0,0.75),
    rgba(0,0,0,0.35),
    rgba(0,0,0,0)
  );
  z-index:999;
  pointer-events:none;
`;

/* ---- Push UI slightly down so it aligns ---- */
const pushStyle = document.createElement("style");
pushStyle.innerHTML = `
  body{
    padding-top:12px;
  }
`;

document.body.appendChild(fakeStatus);
document.head.appendChild(pushStyle);

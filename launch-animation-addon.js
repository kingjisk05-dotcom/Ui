/* ==================================================
   APP LAUNCH ANIMATION ADDON
   ================================================== */

/* ---------- OVERLAY ---------- */
const launchOverlay = document.createElement("div");
launchOverlay.id = "launchOverlay";

launchOverlay.innerHTML = `
  <div class="launch-logo">S</div>
`;

launchOverlay.style.cssText = `
  position:fixed;
  inset:0;
  background:#000;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:10000;
`;

document.body.appendChild(launchOverlay);

/* ---------- STYLES ---------- */
const launchStyle = document.createElement("style");
launchStyle.innerHTML = `
  .launch-logo{
    font-size:80px;
    font-weight:900;
    color:var(--neon);
    filter:drop-shadow(0 0 25px var(--neon));
    animation:logoIn 1.1s ease forwards;
  }

  @keyframes logoIn{
    0%{
      opacity:0;
      transform:scale(0.6);
    }
    60%{
      opacity:1;
      transform:scale(1.1);
    }
    100%{
      opacity:1;
      transform:scale(1);
    }
  }

  body.launch-hide{
    overflow:hidden;
  }

  body.launch-ready{
    animation:uiReveal 0.6s ease forwards;
  }

  @keyframes uiReveal{
    from{
      opacity:0;
      transform:scale(1.02);
    }
    to{
      opacity:1;
      transform:scale(1);
    }
  }
`;
document.head.appendChild(launchStyle);

/* ---------- SEQUENCE ---------- */
document.body.classList.add("launch-hide");

window.addEventListener("load", () => {
  setTimeout(() => {
    launchOverlay.style.transition = "opacity 0.6s ease";
    launchOverlay.style.opacity = "0";

    document.body.classList.remove("launch-hide");
    document.body.classList.add("launch-ready");

    setTimeout(() => {
      launchOverlay.remove();
    }, 650);

  }, 1100); // logo duration
});

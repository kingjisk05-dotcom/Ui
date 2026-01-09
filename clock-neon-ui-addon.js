/* ==================================================
   CLOCK + GREETING NEON UI ADDON
   Fixes greeting neon + improves time UI
   ================================================== */

window.addEventListener("load", () => {

  const style = document.createElement("style");

  style.innerHTML = `
    /* ---------- GREETING NEON ---------- */
    .greeting {
      color: var(--neon) !important;
      font-size: 22px;
      letter-spacing: 2px;
      font-weight: 700;
      margin-bottom: 6px;
      text-transform: uppercase;
      text-shadow:
        0 0 6px rgba(255,52,179,.8),
        0 0 14px rgba(255,52,179,.6),
        0 0 22px rgba(255,52,179,.4);
      animation: greetPulse 2.2s ease-in-out infinite;
    }

    @keyframes greetPulse {
      0%   { opacity: .85; }
      50%  { opacity: 1; }
      100% { opacity: .85; }
    }

    /* ---------- TIME UI IMPROVEMENT ---------- */
    #time {
      font-size: 68px;
      font-weight: 800;
      letter-spacing: 1px;
      color: #ffffff !important;
      background: none !important;
      -webkit-text-fill-color: #ffffff !important;
      text-shadow:
        0 6px 18px rgba(0,0,0,.55),
        0 0 12px rgba(255,255,255,.25);
    }

    /* ---------- DATE CLEAN ---------- */
    #date {
      font-size: 18px;
      opacity: .9;
      color: #ffffff !important;
      text-shadow: 0 2px 6px rgba(0,0,0,.7);
    }

    /* ---------- CLOCK CARD SPACING ---------- */
    .clock-card {
      padding: 6px 0;
    }
  `;

  document.head.appendChild(style);
});

/* ==================================================
   CLOCK DATE VISIBILITY ADDON
   Improves weekday + date readability on any wallpaper
   ================================================== */

window.addEventListener("load", () => {

  const style = document.createElement("style");

  style.innerHTML = `
    /* ---------- TIME SEPARATION ---------- */
    #time {
      margin-bottom: 8px;
    }

    /* ---------- DATE GLASS PILL ---------- */
    #date {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;

      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1px;

      color: #ffffff !important;

      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);

      box-shadow:
        0 4px 12px rgba(0,0,0,.45),
        inset 0 0 0 1px rgba(255,255,255,.15);

      text-shadow: none;
    }

    /* ---------- MOBILE FRIENDLY ---------- */
    @media (max-width: 600px) {
      #date {
        font-size: 16px;
        padding: 5px 12px;
      }
    }
  `;

  document.head.appendChild(style);
});

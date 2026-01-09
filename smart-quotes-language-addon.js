/* ==================================================
   SMART QUOTES + LANGUAGE SWITCH ADDON
   - Alphabet based trigger (A–Z)
   - Hindi / English switch from Settings
   - Floating panel under search box
   ================================================== */

(function () {

  /* ---------- GLOBAL STATE ---------- */
  window.__quoteLanguage =
    localStorage.getItem("quoteLang") || "hi"; // hi | en

  /* ---------- QUOTES DATA ---------- */
  const QUOTES = {
    A: {
      hi: {
        title: "आत्मविश्वास",
        list: [
          "खुद पर भरोसा ही सफलता की पहली सीढ़ी है।",
          "आत्मविश्वास वो ताकत है जो असंभव को संभव बनाती है।",
          "जो खुद पर विश्वास करता है, वही आगे बढ़ता है।"
        ]
      },
      en: {
        title: "Confidence",
        list: [
          "Confidence is the first step to success.",
          "Believe in yourself before the world does.",
          "Confidence turns dreams into reality."
        ]
      }
    },
    B: {
      hi: {
        title: "भरोसा",
        list: [
          "भरोसा रिश्तों की नींव होता है।",
          "खुद पर भरोसा रखना सबसे जरूरी है।"
        ]
      },
      en: {
        title: "Trust",
        list: [
          "Trust is built with consistency.",
          "Believe first, results follow."
        ]
      }
    }
    // 👉 baaki alphabets baad me easily add ho sakte hain
  };

  /* ---------- FIND SEARCH INPUT ---------- */
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  /* ---------- CREATE PANEL ---------- */
  const panel = document.createElement("div");
  panel.id = "smartQuotePanel";
  panel.style.cssText = `
    position:absolute;
    z-index:9998;
    width:100%;
    margin-top:8px;
    padding:14px;
    border-radius:16px;
    background:rgba(0,0,0,0.55);
    backdrop-filter:blur(18px);
    -webkit-backdrop-filter:blur(18px);
    box-shadow:0 0 20px rgba(0,255,213,0.35);
    color:#fff;
    font-size:14px;
    display:none;
  `;
  document.body.appendChild(panel);

  /* ---------- POSITION UPDATE ---------- */
  function positionPanel() {
    const r = searchInput.getBoundingClientRect();
    panel.style.top = r.bottom + window.scrollY + "px";
    panel.style.left = r.left + "px";
    panel.style.width = r.width + "px";
  }

  window.addEventListener("resize", positionPanel);

  /* ---------- RENDER QUOTES ---------- */
  function renderQuotes(letter) {
    const key = letter.toUpperCase();
    const lang = window.__quoteLanguage;
    const data = QUOTES[key]?.[lang];
    if (!data) {
      panel.style.display = "none";
      return;
    }

    const items = data.list.slice(0, 3)
      .map((q, i) => `<div>${i + 1}. ${q}</div>`)
      .join("");

    panel.innerHTML = `
      <div style="font-weight:700;margin-bottom:6px;color:var(--neon)">
        ${key} — ${data.title}
      </div>
      ${items}
    `;

    positionPanel();
    panel.style.display = "block";
  }

  /* ---------- INPUT LISTENER ---------- */
  searchInput.addEventListener("input", e => {
    const v = e.target.value.trim();
    if (/^[a-zA-Z]$/.test(v)) {
      renderQuotes(v);
    } else {
      panel.style.display = "none";
    }
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => panel.style.display = "none", 150);
  });

  /* ---------- SETTINGS PANEL BUTTON ---------- */
  window.addEventListener("load", () => {
    const settingsBox = document.getElementById("floatingSettings");
    if (!settingsBox) return;

    const btn = document.createElement("button");
    btn.className = "fs-btn";

    function updateBtn() {
      btn.textContent =
        window.__quoteLanguage === "hi"
          ? "🌐 Quotes Language : हिंदी"
          : "🌐 Quotes Language : English";
    }

    btn.onclick = () => {
      window.__quoteLanguage =
        window.__quoteLanguage === "hi" ? "en" : "hi";
      localStorage.setItem("quoteLang", window.__quoteLanguage);
      updateBtn();

      // refresh panel if visible
      const v = searchInput.value.trim();
      if (/^[a-zA-Z]$/.test(v)) renderQuotes(v);
    };

    updateBtn();
    settingsBox.appendChild(btn);
  });

})();

/* ==================================================
   DYNAMIC WEATHER EFFECTS ADDON
   - Icon animation by weather
   - Glow color by temperature
   ================================================== */

window.addEventListener("load", () => {

  const weather = document.getElementById("weather");
  if (!weather) return;

  const icon = weather.querySelector("i");
  if (!icon) return;

  /* ---------- Inject animations ---------- */
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes sunSpin {
      from { transform:rotate(0deg); }
      to { transform:rotate(360deg); }
    }
    @keyframes cloudFloat {
      0%,100% { transform:translateX(0); }
      50% { transform:translateX(6px); }
    }
    @keyframes rainDrop {
      0% { transform:translateY(0); opacity:1; }
      100% { transform:translateY(6px); opacity:.3; }
    }
    @keyframes snowFall {
      0% { transform:translateY(0); }
      100% { transform:translateY(4px); }
    }
  `;
  document.head.appendChild(style);

  /* ---------- Detect weather text ---------- */
  function detectWeather() {
    const txt = weather.innerText.toLowerCase();

    if (txt.includes("rain")) return "rain";
    if (txt.includes("snow")) return "snow";
    if (txt.includes("cloud")) return "cloud";
    return "clear";
  }

  /* ---------- Apply icon animation ---------- */
  function applyWeatherAnimation(type) {
    icon.style.animation = "none";

    if (type === "clear")
      icon.style.animation = "sunSpin 8s linear infinite";

    if (type === "cloud")
      icon.style.animation = "cloudFloat 3s ease-in-out infinite";

    if (type === "rain")
      icon.style.animation = "rainDrop 1s linear infinite";

    if (type === "snow")
      icon.style.animation = "snowFall 1.5s ease-in-out infinite";
  }

  /* ---------- Extract temperature ---------- */
  function extractTemp() {
    const match = weather.innerText.match(/(-?\d+)\s*°/);
    return match ? parseInt(match[1]) : null;
  }

  /* ---------- Apply glow color ---------- */
  function applyTempGlow(temp) {
    let glow = "rgba(0,255,200,.6)"; // default

    if (temp <= 10) glow = "rgba(120,180,255,.9)";
    else if (temp <= 22) glow = "rgba(120,255,180,.8)";
    else if (temp <= 32) glow = "rgba(255,220,120,.9)";
    else glow = "rgba(255,120,80,.95)";

    weather.style.boxShadow = `
      0 0 10px ${glow},
      0 0 22px ${glow}
    `;
  }

  /* ---------- Observe weather changes ---------- */
  const observer = new MutationObserver(() => {
    const type = detectWeather();
    const temp = extractTemp();

    applyWeatherAnimation(type);
    if (temp !== null) applyTempGlow(temp);
  });

  observer.observe(weather, { childList: true, subtree: true });

});

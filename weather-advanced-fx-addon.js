/* ==================================================
   ADVANCED WEATHER FX ADDON
   - Canvas rain particles
   - Wind-based icon sway
   - Sunrise / Sunset glow shift
   ================================================== */

window.addEventListener("load", () => {

  const weather = document.getElementById("weather");
  if (!weather) return;

  const icon = weather.querySelector("i");

  /* ---------- CANVAS SETUP (RAIN) ---------- */
  const canvas = document.createElement("canvas");
  canvas.width = weather.offsetWidth;
  canvas.height = weather.offsetHeight;
  canvas.style.cssText = `
    position:absolute;
    inset:0;
    pointer-events:none;
    z-index:0;
  `;
  weather.style.position = "relative";
  weather.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let rainDrops = [];

  function createRain() {
    rainDrops = [];
    for (let i = 0; i < 30; i++) {
      rainDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: 8 + Math.random() * 6,
        speed: 2 + Math.random() * 2
      });
    }
  }

  function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(180,220,255,.7)";
    ctx.lineWidth = 1;

    rainDrops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.len);
      ctx.stroke();

      d.y += d.speed;
      if (d.y > canvas.height) d.y = -10;
    });

    requestAnimationFrame(drawRain);
  }

  /* ---------- WIND ICON SWAY ---------- */
  function applyWindSway(speed) {
    if (!icon) return;

    const sway = Math.min(speed, 20);
    icon.style.animation = `windSway ${3 - sway / 10}s ease-in-out infinite`;
  }

  const windStyle = document.createElement("style");
  windStyle.innerHTML = `
    @keyframes windSway {
      0% { transform:rotate(-4deg); }
      50% { transform:rotate(4deg); }
      100% { transform:rotate(-4deg); }
    }
  `;
  document.head.appendChild(windStyle);

  /* ---------- SUNRISE / SUNSET GLOW ---------- */
  function applySunGlow() {
    const hour = new Date().getHours();
    let glow;

    if (hour >= 5 && hour < 8)
      glow = "rgba(255,200,120,.9)";        // sunrise
    else if (hour >= 17 && hour < 20)
      glow = "rgba(255,140,120,.9)";        // sunset
    else if (hour >= 20 || hour < 5)
      glow = "rgba(120,180,255,.8)";        // night
    else
      glow = "rgba(180,255,220,.7)";        // day

    weather.style.boxShadow = `
      0 0 12px ${glow},
      0 0 26px ${glow}
    `;
  }

  /* ---------- WEATHER TEXT PARSE ---------- */
  function getTemp() {
    const m = weather.innerText.match(/(-?\d+)\s*°/);
    return m ? parseInt(m[1]) : null;
  }

  function getWeatherType() {
    const t = weather.innerText.toLowerCase();
    if (t.includes("rain")) return "rain";
    return "clear";
  }

  /* ---------- OBSERVER ---------- */
  const observer = new MutationObserver(() => {
    const type = getWeatherType();
    const temp = getTemp();

    applySunGlow();

    if (type === "rain") {
      createRain();
      drawRain();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (temp !== null) {
      const windApprox = Math.abs(temp - 20); // heuristic
      applyWindSway(windApprox);
    }
  });

  observer.observe(weather, { childList: true, subtree: true });

});

/* ==================================================
   LIVE WEATHER BADGE ADDON
   - Neon circular glow animation
   - Animated icon (float)
   - Greeting for max 8 sec, then real weather
   ================================================== */

window.addEventListener("load", () => {
  const weather = document.getElementById("weather");
  if (!weather) return;

  /* ---------- Neon Glow Animation ---------- */
  weather.style.position = "relative";
  weather.style.borderRadius = "30px";
  weather.style.animation = "neonPulse 2s infinite";

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes neonPulse {
      0%   { box-shadow: 0 0 8px rgba(0,255,200,.4); }
      50%  { box-shadow: 0 0 18px rgba(0,255,200,.9); }
      100% { box-shadow: 0 0 8px rgba(0,255,200,.4); }
    }
    @keyframes weatherFloat {
      0%   { transform: translateY(0); }
      50%  { transform: translateY(-4px); }
      100% { transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  /* ---------- Animate Icon ---------- */
  const icon = weather.querySelector("i");
  if (icon) {
    icon.style.animation = "weatherFloat 2s ease-in-out infinite";
  }

  /* ---------- Greeting Logic (max 8 sec) ---------- */
  const hour = new Date().getHours();
  let greet = "Hello";

  if (hour < 12) greet = "🌅 Good Morning";
  else if (hour < 17) greet = "☀️ Good Afternoon";
  else if (hour < 21) greet = "🌆 Good Evening";
  else greet = "🌙 Good Night • Sweet Dreams";

  const originalHTML = weather.innerHTML;
  weather.innerHTML = `<span>${greet}</span>`;

  setTimeout(() => {
    weather.innerHTML = originalHTML;
  }, 8000);
});

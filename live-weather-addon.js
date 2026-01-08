/* ==================================================
   LIVE WEATHER BADGE ADDON
   - Neon glow animation
   - Greeting before location
   ================================================== */

window.addEventListener("load", () => {

  const weather = document.getElementById("weather");
  if (!weather) return;

  /* ---------- Neon Glow Effect ---------- */
  weather.style.position = "relative";
  weather.style.borderRadius = "30px";
  weather.style.boxShadow = `
    0 0 10px rgba(0,255,200,.6),
    0 0 20px rgba(0,255,200,.4)
  `;
  weather.style.animation = "neonPulse 2s infinite";

  /* ---------- Neon Keyframes ---------- */
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes neonPulse {
      0% { box-shadow:0 0 8px rgba(0,255,200,.4); }
      50% { box-shadow:0 0 18px rgba(0,255,200,.9); }
      100% { box-shadow:0 0 8px rgba(0,255,200,.4); }
    }
  `;
  document.head.appendChild(style);

  /* ---------- Live Weather Icon ---------- */
  const icon = weather.querySelector("i");
  if (icon) {
    icon.style.animation = "weatherFloat 2s ease-in-out infinite";
    style.innerHTML += `
      @keyframes weatherFloat {
        0% { transform:translateY(0); }
        50% { transform:translateY(-4px); }
        100% { transform:translateY(0); }
      }
    `;
  }

  /* ---------- Greeting Logic ---------- */
  const hour = new Date().getHours();
  let greet = "Hello";

  if (hour < 12) greet = "🌅 Good Morning";
  else if (hour < 17) greet = "☀️ Good Afternoon";
  else if (hour < 21) greet = "🌆 Good Evening";
  else greet = "🌙 Good Night • Sweet Dreams";

  const originalHTML = weather.innerHTML;

  weather.innerHTML = `<span>${greet}</span>`;

  /* ---------- After 8 sec → show real weather ---------- */
  setTimeout(() => {
    weather.innerHTML = originalHTML;
  }, 8000);

});

/* ==================================================
   LIVE WEATHER BADGE ADDON (IMPROVED)
   - Smooth transitions (Fade In/Out)
   - Non-destructive CSS injection
   - Fixes animation loss on content swap
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const weather = document.getElementById("weather");
  if (!weather) return;

  // 1. Inject Styles centrally (Clean & Performance friendly)
  const css = `
    .weather-neon {
      position: relative;
      border-radius: 30px;
      box-shadow: 0 0 10px rgba(0,255,200,0.6), 0 0 20px rgba(0,255,200,0.4);
      animation: neonPulse 2s infinite;
      transition: opacity 0.5s ease-in-out; /* Smooth fade effect */
    }

    /* Target the icon generically so animation persists after HTML swap */
    .weather-neon i {
      display: inline-block;
      animation: weatherFloat 2s ease-in-out infinite;
    }

    .weather-hidden {
      opacity: 0;
    }

    @keyframes neonPulse {
      0% { box-shadow: 0 0 8px rgba(0,255,200,0.4); }
      50% { box-shadow: 0 0 18px rgba(0,255,200,0.9); }
      100% { box-shadow: 0 0 8px rgba(0,255,200,0.4); }
    }

    @keyframes weatherFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  `;
  
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);

  // 2. Initialize the Badge
  weather.classList.add("weather-neon");
  
  // 3. Greeting Logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good Morning";
    if (hour < 17) return "☀️ Good Afternoon";
    if (hour < 21) return "🌆 Good Evening";
    return "🌙 Good Night";
  };

  // 4. Store original content & Swap
  const originalHTML = weather.innerHTML;
  
  // Apply Greeting
  weather.innerHTML = `<span style="font-weight:bold; padding: 0 10px;">${getGreeting()}</span>`;

  // 5. Timer with Smooth Transition
  // We wait 4 seconds (8 seconds is usually too long for a UI toast)
  setTimeout(() => {
    // Fade out
    weather.classList.add("weather-hidden");

    // Wait for fade out to finish (500ms), then swap and fade in
    setTimeout(() => {
      weather.innerHTML = originalHTML;
      weather.classList.remove("weather-hidden");
    }, 500); // Matches CSS transition time

  }, 4000); 
});

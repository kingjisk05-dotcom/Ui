/* ==================================================
   iOS 17 STYLE ADDON (CLEAN & MINIMAL)
   - Apple System Fonts (SF Pro)
   - Lock Screen Layout (Date above Time)
   - iOS App Icons (Squircles + Focus Effect)
   ================================================== */

window.addEventListener("load", () => {

  /* ===============================
     🎯 TARGETS (Adjust selectors if needed)
     =============================== */
  const TARGETS = {
    clock: document.getElementById("clock") || document.querySelector(".clock"),
    greeting: document.getElementById("greeting") || document.querySelector("h1"),
    // Tries to find the container holding your app icons
    appContainer: document.querySelector(".apps") || document.getElementById("links") || document.querySelector("div[style*='flex']"),
    // Target specific app links/images
    appIcons: document.querySelectorAll("a img, .app-icon") 
  };

  /* ===============================
     🍎 INJECT iOS STYLES
     =============================== */
  const style = document.createElement("style");
  style.textContent = `
    /* --- iOS FONT STACK --- */
    :root {
      --ios-font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* --- LAYOUT CONTAINER (Centers everything) --- */
    .ios-center-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-top: 4vh;
    }

    /* --- 1. GREETING (Like iOS Date) --- */
    ${getTag(TARGETS.greeting)} {
      font-family: var(--ios-font) !important;
      font-size: 22px !important;
      font-weight: 500 !important;
      color: rgba(255, 255, 255, 0.9) !important;
      text-transform: uppercase !important;
      letter-spacing: 1px !important;
      margin: 0 !important;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
      order: 1; /* Puts greeting ABOVE clock */
    }

    /* --- 2. CLOCK (Big & Bold) --- */
    ${getTag(TARGETS.clock)} {
      font-family: var(--ios-font) !important;
      font-size: 6.5rem !important;
      font-weight: 700 !important;
      color: #fff !important;
      letter-spacing: -3px !important;
      line-height: 1 !important;
      margin: 10px 0 30px 0 !important;
      text-shadow: 0 4px 20px rgba(0,0,0,0.2);
      order: 2;
    }

    /* --- 3. APP ICONS (Squircles) --- */
    .ios-app-grid {
      display: flex !important;
      gap: 25px !important;
      justify-content: center !important;
      flex-wrap: wrap !important;
      padding: 20px !important;
      order: 3;
    }

    /* The Link (Wrapper) */
    .ios-app-grid a {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .ios-app-grid a:hover {
      transform: scale(1.15); /* iOS Focus Effect */
      z-index: 10;
    }

    /* The Image (Icon) */
    .ios-app-grid img {
      width: 64px !important;
      height: 64px !important;
      object-fit: cover !important;
      border-radius: 14px !important; /* The Squircle Shape */
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }
    
    /* Optional: App Label Text */
    .ios-app-grid span {
      margin-top: 8px;
      font-family: var(--ios-font);
      font-size: 12px;
      color: #fff;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
      opacity: 0.9;
    }
  `;
  document.head.appendChild(style);

  /* ===============================
     📱 DOM REORDERING (Layout Fix)
     =============================== */
  // 1. Find a wrapper to center clock/greeting
  let mainWrapper = document.querySelector(".center-wrapper") || document.querySelector(".container");
  
  // If no main wrapper exists, create one to enforce layout
  if (!mainWrapper && TARGETS.clock) {
    mainWrapper = document.createElement("div");
    mainWrapper.className = "ios-center-layout";
    TARGETS.clock.parentNode.insertBefore(mainWrapper, TARGETS.clock);
    
    // Move elements into wrapper
    if (TARGETS.greeting) mainWrapper.appendChild(TARGETS.greeting);
    if (TARGETS.clock) mainWrapper.appendChild(TARGETS.clock);
  } else if (mainWrapper) {
    mainWrapper.classList.add("ios-center-layout");
  }

  /* ===============================
     📱 APP ICONS SETUP
     =============================== */
  if (TARGETS.appContainer) {
    TARGETS.appContainer.classList.add("ios-app-grid");
    
    // Clean up existing styles on the container to let CSS take over
    TARGETS.appContainer.style.width = "";
    TARGETS.appContainer.style.maxWidth = "800px";
  }

  // Helper function
  function getTag(el) {
    if (!el) return ".missing-element"; 
    return el.id ? "#" + el.id : el.tagName.toLowerCase();
  }
});

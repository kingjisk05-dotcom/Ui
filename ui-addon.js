/* ==================================================
   ULTRA UI THEME ADDON
   - Matches the Settings Panel design
   - Glassmorphism Search Bar & Glowing Clock
   - Injects styles dynamically (No HTML edits needed)
   ================================================== */

window.addEventListener("load", () => {

  /* ===============================
     🎯 CONFIGURATION
     (Match these IDs to your real HTML IDs)
     =============================== */
  const TARGETS = {
    clock: document.getElementById("clock") || document.querySelector(".clock"),
    search: document.querySelector("input[type='text']") || document.getElementById("search"),
    greeting: document.getElementById("greeting") || document.querySelector("h1"),
    container: document.querySelector(".container") || document.body
  };

  /* ===============================
     🎨 INJECT ULTRA STYLES
     =============================== */
  const style = document.createElement("style");
  style.textContent = `
    /* --- FONTS & ANIMATIONS --- */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;600;800&display=swap');

    @keyframes floatUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* --- CLOCK STYLES --- */
    ${getTag(TARGETS.clock)} {
      font-family: 'Inter', sans-serif !important;
      font-size: 8rem !important;
      font-weight: 800 !important;
      color: #fff !important;
      text-shadow: 0 0 30px rgba(0, 210, 255, 0.25) !important;
      letter-spacing: -2px !important;
      margin-bottom: 0 !important;
      animation: floatUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    /* --- GREETING STYLES --- */
    ${getTag(TARGETS.greeting)} {
      font-family: 'Inter', sans-serif !important;
      font-size: 1.5rem !important;
      font-weight: 300 !important;
      color: rgba(255, 255, 255, 0.7) !important;
      text-transform: uppercase !important;
      letter-spacing: 4px !important;
      margin-top: -10px !important;
      margin-bottom: 40px !important;
      animation: floatUp 1s ease 0.2s backwards;
    }

    /* --- SEARCH BAR CONTAINER --- */
    .ultra-search-wrapper {
      position: relative;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      animation: floatUp 1.2s ease 0.3s backwards;
    }

    /* --- SEARCH INPUT STYLES --- */
    ${getTag(TARGETS.search)} {
      width: 100% !important;
      padding: 18px 25px !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 16px !important;
      color: #fff !important;
      
      /* Glassmorphism */
      background: rgba(18, 18, 24, 0.65) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      border-radius: 50px !important;
      
      outline: none !important;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
      text-align: center !important;
    }

    /* Placeholder Styling */
    ${getTag(TARGETS.search)}::placeholder {
      color: rgba(255, 255, 255, 0.3) !important;
      letter-spacing: 1px;
    }

    /* --- SEARCH HOVER & FOCUS --- */
    ${getTag(TARGETS.search)}:hover {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-2px);
    }

    ${getTag(TARGETS.search)}:focus {
      background: rgba(18, 18, 24, 0.85) !important;
      border-color: #00d2ff !important; /* Neon Accent */
      box-shadow: 0 0 30px rgba(0, 210, 255, 0.25), inset 0 0 20px rgba(0, 210, 255, 0.05) !important;
      width: 100% !important; /* Ensure it stays full width */
      transform: scale(1.02);
    }
  `;
  document.head.appendChild(style);

  /* ===============================
     🧹 DOM CLEANUP & WRAPPER
     (Centers the search bar perfectly)
     =============================== */
  if (TARGETS.search) {
    // Create a wrapper if it doesn't exist to center the floating bar
    const parent = TARGETS.search.parentNode;
    if (!parent.classList.contains("ultra-search-wrapper")) {
      const wrapper = document.createElement("div");
      wrapper.className = "ultra-search-wrapper";
      
      // Move search input into wrapper
      parent.insertBefore(wrapper, TARGETS.search);
      wrapper.appendChild(TARGETS.search);
    }
  }

  // Helper to get selector string safely
  function getTag(el) {
    if (!el) return ".non-existent-element"; // Safe fallback
    return el.id ? "#" + el.id : el.tagName.toLowerCase();
  }

});

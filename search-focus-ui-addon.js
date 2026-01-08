/* ==================================================
   SEARCH FOCUS UI HIDE ADDON
   Hide: Greeting, Clock, App shortcuts
   Keep: Weather, Settings
   ================================================== */

window.addEventListener("load", () => {

  const search = document.getElementById("searchInput");
  const greeting = document.getElementById("greeting");
  const clock = document.getElementById("time");
  const date = document.getElementById("date");
  const apps = document.querySelector(".speed-dial");

  if (!search) return;

  const hideTargets = [greeting, clock, date, apps];

  /* ---------- HIDE FUNCTION ---------- */
  function hideUI() {
    hideTargets.forEach(el => {
      if (!el) return;
      el.style.transition = "all .25s ease";
      el.style.opacity = "0";
      el.style.transform = "translateY(-10px)";
      el.style.pointerEvents = "none";
    });
  }

  /* ---------- SHOW FUNCTION ---------- */
  function showUI() {
    hideTargets.forEach(el => {
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.pointerEvents = "auto";
    });
  }

  /* ---------- EVENTS ---------- */
  search.addEventListener("focus", hideUI);
  search.addEventListener("blur", showUI);

});

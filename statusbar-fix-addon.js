/* ==================================================
   STATUS BAR COLOR FIX ADDON
   Works AFTER app load & resume
   ================================================== */

function setStatusBar(color) {
  let meta = document.querySelector('meta[name="theme-color"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", color);
}

/* Apply after full load */
window.addEventListener("load", () => {
  setTimeout(() => {
    setStatusBar("rgba(0,0,0,0)");
  }, 300);
});

/* Re-apply when app comes from background */
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    setTimeout(() => {
      setStatusBar("rgba(0,0,0,0)");
    }, 200);
  }
});

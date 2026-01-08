/* ==================================================
   KEYBOARD PASSWORD DETECTION FIX
   ================================================== */

window.addEventListener("load", () => {
  const search = document.getElementById("searchInput");
  if (!search) return;

  /* Tell browser this is SEARCH, not PASSWORD */
  search.setAttribute("type", "search");
  search.setAttribute("inputmode", "search");
  search.setAttribute("autocomplete", "off");
  search.setAttribute("autocorrect", "off");
  search.setAttribute("autocapitalize", "none");
  search.setAttribute("spellcheck", "false");
  search.setAttribute("name", "search-field");

  /* Extra safety for Android keyboards */
  search.addEventListener("focus", () => {
    search.setAttribute("autocomplete", "off");
  });
});

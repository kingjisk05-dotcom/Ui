/* =========================================
   CONTROL CENTER ROOT HELPER
   Single source of truth for addons
   ========================================= */

(function () {
  window.getControlCenterActions = function () {
    return document.querySelector(
      "#controlCenter .cc-actions"
    );
  };
})();

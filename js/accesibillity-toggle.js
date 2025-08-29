// *************** SCRIPT OPTIMIZADO AVANZADO ***************
(function () {
  // ===== Ejecuta callback cuando el DOM está listo =====
  function onReady(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }

  // ===== Alterna la visibilidad de un elemento (display: block <-> none) =====
  function toggleDisplay(elementId, displayType = "block") {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.style.display = el.style.display === displayType ? "none" : displayType;
  }

  // ===== Alterna una clase CSS en un elemento dado =====
  function toggleClass(elementId, className) {
    const el = document.getElementById(elementId);
    if (el) el.classList.toggle(className);
  }

  // ===== Configura un par de toggles (esconder/mostrar via visibility) =====
  function setupTogglePair(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);
    if (!hideEl || !showEl) return;

    hideEl.addEventListener("click", () => {
      hideEl.style.visibility = "hidden";
    });
    showEl.addEventListener("click", () => {
      hideEl.style.visibility = "visible";
    });
  }

  onReady(() => {
    // toggles numéricos (toggle1↔toggle2 … toggle19↔toggle20)
    for (let start = 1; start <= 19; start += 2) {
      setupTogglePair(`toggle${start}`, `toggle${start + 1}`);
    }

    // toggles alfabéticos (toggleA↔toggleB … toggleS↔toggleT)
    for (let code = 65; code <= 84; code += 2) {
      const hideId = `toggle${String.fromCharCode(code)}`;
      const showId = `toggle${String.fromCharCode(code + 1)}`;
      setupTogglePair(hideId, showId);
    }

    // ===== Alternar color de elemento SVG con clase CSS =====
    const svgBtn = document.getElementById("color-change");
    if (svgBtn) {
      svgBtn.addEventListener("click", () => {
        toggleClass("color-change", "forcecolor");
      });
    }
  });

  // ===== Funciones globales para llamadas desde HTML =====
  window.handleShowElement = (elementId) =>
    toggleDisplay(elementId || "show-accesibillity");

  window.handleShowElement_ = (elementId) =>
    toggleDisplay(elementId || "show-accesibillity_");

  // ===== Alias genérico para alternar clases desde HTML =====
  window.toggleElementClass = (elementId, className) =>
    toggleClass(elementId, className);

  // ===== Mantener compatibilidad con callcolor =====
  window.callcolor = () => toggleClass("color-change", "forcecolor");
})();

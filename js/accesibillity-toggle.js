// *************** SCRIPT OPTIMIZADO AVANZADO (HOVER vs CLIC SEGÚN DISPOSITIVO) ***************
(function () {
  // Ejecuta callback cuando el DOM está listo
  function onReady(callback) {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

  // Alterna la visibilidad de un elemento
  function toggleDisplay(elementId, displayType = "block") {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.style.display = el.style.display === displayType ? "none" : displayType;
  }

  // Alterna una clase CSS en un elemento
  function toggleClass(elementId, className) {
    const el = document.getElementById(elementId);
    if (el) el.classList.toggle(className);
  }

  // Configura pares de toggles hide↔show
  function setupTogglePair(hideId, showId) {
    const hideEl = document.getElementById(hideId);
    const showEl = document.getElementById(showId);
    if (!hideEl || !showEl) return;
    hideEl.addEventListener(
      "click",
      () => (hideEl.style.visibility = "hidden")
    );
    showEl.addEventListener(
      "click",
      () => (hideEl.style.visibility = "visible")
    );
  }

  // Comprueba si un elemento está visible
  function isVisible(el) {
    if (!el) return false;
    const cs = window.getComputedStyle(el);
    return (
      cs.display !== "none" && cs.visibility !== "hidden" && cs.opacity !== "0"
    );
  }

  let lastToggleByIcon = false;

  onReady(() => {
    // pares numéricos toggle1↔toggle2 … toggle19↔toggle20
    for (let i = 1; i <= 19; i += 2) {
      setupTogglePair(`toggle${i}`, `toggle${i + 1}`);
    }

    // pares alfabéticos toggleA↔toggleB … toggleS↔toggleT
    for (let code = 65; code <= 84; code += 2) {
      setupTogglePair(
        `toggle${String.fromCharCode(code)}`,
        `toggle${String.fromCharCode(code + 1)}`
      );
    }

    // botón SVG para cambiar color
    const svgBtn = document.getElementById("color-change");
    if (svgBtn) {
      svgBtn.addEventListener("click", () => {
        toggleClass("color-change", "forcecolor");
      });
    }

    // click fuera para cerrar paneles
    document.addEventListener("click", (e) => {
      const panels = ["show-accesibillity", "show-accesibillity_"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      for (const box of panels) {
        if (isVisible(box) && !box.contains(e.target)) {
          if (lastToggleByIcon) return;
          if (box.id === "show-accesibillity" && window.handleShowElement) {
            window.handleShowElement("show-accesibillity", false);
          } else if (
            box.id === "show-accesibillity_" &&
            window.handleShowElement_
          ) {
            window.handleShowElement_("show-accesibillity_", false);
          } else {
            box.style.display = "none";
          }
        }
      }
    });

    // Hover en escritorio vs Click en móviles
    const accIcon = document.getElementById("accessibility-icon");
    const accPanel = document.getElementById("show-accesibillity");
    if (accIcon && accPanel) {
      const canHover = window.matchMedia("(hover: hover)").matches;

      if (canHover) {
        // Desactiva cualquier onclick inline y bloquea clicks
        accIcon.removeAttribute("onclick");
        accIcon.addEventListener("click", (e) => {
          e.stopImmediatePropagation();
          e.preventDefault();
        });

        // Mostrar/ocultar con hover
        accIcon.addEventListener("mouseenter", () => {
          accPanel.style.display = "block";
        });
        accPanel.addEventListener("mouseenter", () => {
          accPanel.style.display = "block";
        });
        accPanel.addEventListener("mouseleave", () => {
          accPanel.style.display = "none";
        });
      } else {
        // Móviles/tabletas: mostrar/ocultar con clic
        accIcon.addEventListener("click", () => {
          lastToggleByIcon = true;
          setTimeout(() => (lastToggleByIcon = false), 0);
          toggleDisplay("show-accesibillity");
        });
      }
    }
  });

  // Funciones globales para llamadas desde HTML
  window.handleShowElement = (elementId, fromIcon = true) => {
    if (fromIcon) {
      lastToggleByIcon = true;
      setTimeout(() => (lastToggleByIcon = false), 0);
    }
    toggleDisplay(elementId || "show-accesibillity");
  };

  window.handleShowElement_ = (elementId, fromIcon = true) => {
    if (fromIcon) {
      lastToggleByIcon = true;
      setTimeout(() => (lastToggleByIcon = false), 0);
    }
    toggleDisplay(elementId || "show-accesibillity_");
  };

  window.toggleElementClass = (elementId, className) =>
    toggleClass(elementId, className);

  window.callcolor = () => toggleClass("color-change", "forcecolor");
})();

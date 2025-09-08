// ********************************************************************
//                       Helpers y configuración
// ********************************************************************
const BREAKPOINT = 768;
const isMobile = () => window.innerWidth <= BREAKPOINT;

/**
 * Transición simple de max-height (footer en móvil).
 */
const slideToggle = (el, open) => {
  el.style.maxHeight = open ? `${el.scrollHeight}px` : "0";
};

/**
 * Cálculo/animación de apertura con cacheo de altura.
 */
const animateOpen = (panel) => {
  panel.style.maxHeight = "none";

  // Si ya lo habíamos medido, lo reutilizamos
  let fullH = panel.dataset.fullHeight;
  if (!fullH) {
    fullH = panel.offsetHeight;
    panel.dataset.fullHeight = fullH;
  }

  panel.style.maxHeight = "0";
  panel.offsetHeight; // reflow
  panel.style.maxHeight = `${fullH}px`;
};

/**
 * Cierre suave: fijamos altura actual y luego a 0.
 */
const animateClose = (panel) => {
  panel.style.maxHeight = `${panel.offsetHeight}px`;
  panel.offsetHeight; // reflow
  panel.style.maxHeight = "0";
};

/**
 * Toggle genérico con animación tipo acordeón.
 */
const togglePanel = (label, panel) => {
  const open = label.classList.toggle("open");
  open ? animateOpen(panel) : animateClose(panel);
};

/**
 * Cierra si está abierto, con animación garantizada.
 */
const closePanelIfOpen = (label, panel) => {
  if (!label.classList.contains("open")) return;
  animateClose(panel);
  label.classList.remove("open");
};

/**
 * Restaura estado original del footer cuando salimos de mobile.
 */
const resetFooterAccordion = () => {
  if (isMobile()) return;

  // Quita 'open' a todos los labels del footer y limpia sus contenedores
  document.querySelectorAll(".label").forEach((label) => {
    label.classList.remove("open");
    const c = label.nextElementSibling;
    if (c?.classList.contains("label-container")) {
      c.style.maxHeight = "";
      delete c.dataset.fullHeight;
    }
  });
};

// ********************************************************************
//                      Inicialización general
// ********************************************************************
document.addEventListener("DOMContentLoaded", () => {
  // FOOTER DROPDOWN CONTROL (móvil)
  document.querySelectorAll(".label").forEach((label) => {
    const container = label.nextElementSibling;
    if (!container?.classList.contains("label-container")) return;

    label.addEventListener("click", () => {
      if (!isMobile()) return;
      slideToggle(container, label.classList.toggle("open"));
    });
  });

  window.addEventListener("resize", resetFooterAccordion);

  // HEADER DROPDOWNS (MÓVIL y BIG-SCREEN) via delegación
  document.addEventListener(
    "click",
    (e) => {
      // Mobile header
      if (e.target.matches(".info-rotulo-h")) {
        const labelH = e.target.closest(".label-h");
        const wrap = labelH.closest(".block-wrapper_mod").nextElementSibling;
        togglePanel(labelH, wrap);
        return;
      }

      // Big-screen header
      if (e.target.matches(".info-rotulo-bs")) {
        const labelBS = e.target.closest(".label-bs");
        const panel = document.querySelector(".label-container-bs");
        e.stopPropagation();
        togglePanel(labelBS, panel);
        return;
      }

      // Click fuera: cerrar cualquier abierto con animación
      document.querySelectorAll(".label-h.open").forEach((l) => {
        const w = l.closest(".block-wrapper_mod").nextElementSibling;
        if (!l.contains(e.target) && !w.contains(e.target)) {
          closePanelIfOpen(l, w);
        }
      });
      const bsPanel = document.querySelector(".label-container-bs");
      document.querySelectorAll(".label-bs.open").forEach((l) => {
        if (!l.contains(e.target) && !bsPanel.contains(e.target)) {
          closePanelIfOpen(l, bsPanel);
        }
      });
    },
    { passive: true }
  );
});



// ****************CIERRE TÁCTIL DE DROPDOWNS MÓVILES******************

document.addEventListener('DOMContentLoaded', () => {
  // Primer menú (dropdown via #switch-menu_)
  const switchDropdown  = document.getElementById('switch-menu_');
  const wrapperDropdown = document.querySelector('.ribbon-wrapper');

  // Segundo menú (fixed via #switch-menu)
  const switchFixed     = document.getElementById('switch-menu');
  const wrapperFixed    = document.querySelector('.main-topbar-m');

  document.addEventListener('click', event => {
    // Cerrar dropdown si está abierto y el clic es afuera
    if (switchDropdown?.checked && !wrapperDropdown.contains(event.target)) {
      switchDropdown.checked = false;
    }

    // Cerrar fixed menu si está abierto y el clic es afuera
    if (switchFixed?.checked && !wrapperFixed.contains(event.target)) {
      switchFixed.checked = false;
    }
  });

  // Cerrar ambos menús con Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (switchDropdown?.checked) switchDropdown.checked = false;
      if (switchFixed?.checked)    switchFixed.checked    = false;
    }
  });
});

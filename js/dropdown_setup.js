// ********************************************************************
//                        FOOTER DROPDOWN CONTROL
// ********************************************************************
document.addEventListener("DOMContentLoaded", () => {
  const BREAKPOINT = 768;
  const labels = document.querySelectorAll(".label");

  // 1. Handler de clic para desplegar/colapsar con altura dinámica
  labels.forEach((label) => {
    label.addEventListener("click", () => {
      if (window.innerWidth > BREAKPOINT) return;

      const container = label.nextElementSibling;
      if (!container || !container.classList.contains("label-container"))
        return;

      label.classList.toggle("open");
      if (label.classList.contains("open")) {
        container.style.maxHeight = container.scrollHeight + "px";
      } else {
        container.style.maxHeight = "0";
      }
    });
  });

  // 2. Función para limpiar inline‐styles y clases al pasar de móvil a escritorio
  function resetAccordion() {
    if (window.innerWidth > BREAKPOINT) {
      labels.forEach((label) => {
        label.classList.remove("open");
        const container = label.nextElementSibling;
        if (container && container.classList.contains("label-container")) {
          // Quitamos la altura inline para que vuelva al CSS original
          container.style.maxHeight = "";
        }
      });
    }
  }

  // 3. Escuchamos resize y aplicamos el reset cuando crucemos el breakpoint
  window.addEventListener("resize", resetAccordion);
});



// ********************************************************************
//                    MOBILE HEADER DROPDOWN CONTROL
// ********************************************************************
document.addEventListener("DOMContentLoaded", function () {
  const triggers = document.querySelectorAll(".label-h .info-rotulo-h");

  function closePanel(label, wrapper) {
    if (!label.classList.contains("open")) return;
    // Animación de cierre con la altura actual
    wrapper.style.maxHeight = wrapper.offsetHeight + "px";
    wrapper.offsetHeight; // forzar reflujo
    wrapper.style.maxHeight = "0";
    label.classList.remove("open");
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const label = trigger.closest(".label-h");
      const wrapper = label.closest(".block-wrapper_mod").nextElementSibling;

      label.classList.toggle("open");

      if (label.classList.contains("open")) {
        // Abrir: medir altura real y animar
        wrapper.style.maxHeight = "none";
        const fullHeight = wrapper.offsetHeight;
        wrapper.style.maxHeight = "0";
        wrapper.offsetHeight; // forzar reflujo
        wrapper.style.maxHeight = fullHeight + "px";
      } else {
        // Cerrar: animar desde la altura actual a 0
        wrapper.style.maxHeight = wrapper.offsetHeight + "px";
        wrapper.offsetHeight;
        wrapper.style.maxHeight = "0";
      }
    });
  });

  // Cerrar al hacer click/tap fuera del panel y del label_container.h
  document.addEventListener(
    "click",
    (e) => {
      // Si el click está dentro de label_container.h, no cerrar
      const insideContainer = e.target.closest(".label_container.h");
      if (insideContainer) return;

      document.querySelectorAll(".label-h.open").forEach((openLabel) => {
        const wrapper =
          openLabel.closest(".block-wrapper_mod").nextElementSibling;
        // Si el click no fue dentro del label ni dentro del panel, cerrar
        const clickedInsideLabel = openLabel.contains(e.target);
        const clickedInsidePanel = wrapper && wrapper.contains(e.target);
        if (!clickedInsideLabel && !clickedInsidePanel) {
          closePanel(openLabel, wrapper);
        }
      });
    },
    { passive: true }
  );
});

// ********************************************************************
//                  BIG-SCREEN HEADER DROPDOWN CONTROL
// ********************************************************************
document.addEventListener('DOMContentLoaded', () => {
  // 1. Seleccionamos todos los disparadores .info-rotulo-bs dentro de .label-bs
  const bsTriggers = document.querySelectorAll('.label-bs .info-rotulo-bs');

  // 2. Función genérica de cierre
  function closeBsPanel(label, panel) {
    panel.style.maxHeight = panel.offsetHeight + 'px';
    panel.offsetHeight;              // forzar reflow
    panel.style.maxHeight = '0';
    label.classList.remove('open');
  }

  // 3. Configuramos apertura / cierre al click sobre la flecha
  bsTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.stopPropagation();           // no propagar al document
      const label = trigger.closest('.label-bs');
      const panel = document.querySelector('.label-container-bs');

      label.classList.toggle('open');

      if (label.classList.contains('open')) {
        // Medir altura real y animar
        panel.style.maxHeight = 'none';
        const fullH = panel.offsetHeight;
        panel.style.maxHeight = '0';
        panel.offsetHeight;          // reflow
        panel.style.maxHeight = fullH + 'px';
      } else {
        // Animar cierre
        closeBsPanel(label, panel);
      }
    });
  });

  // 4. Cerrar al click fuera de cualquier .label-bs abierto
  document.addEventListener('click', e => {
    document.querySelectorAll('.label-bs.open').forEach(label => {
      const panel = document.querySelector('.label-container-bs');
      if (!label.contains(e.target) && !panel.contains(e.target)) {
        closeBsPanel(label, panel);
      }
    });
  });
});
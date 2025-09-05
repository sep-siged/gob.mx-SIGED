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

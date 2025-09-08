// ********************************************************************
//                        FOOTER DROPDOWN CONTROL
// ********************************************************************
document.addEventListener("DOMContentLoaded", () => {
  const BREAKPOINT = 768;
  const labels = document.querySelectorAll(".label");

  const isMobile = () => window.innerWidth <= BREAKPOINT;

  labels.forEach((label) => {
    const container = label.nextElementSibling;
    const isValidContainer = container?.classList.contains("label-container");

    if (!isValidContainer) return;

    label.addEventListener("click", () => {
      if (!isMobile()) return;

      const open = label.classList.toggle("open");
      container.style.maxHeight = open ? `${container.scrollHeight}px` : "0";
    });
  });

  const resetAccordion = () => {
    if (!isMobile()) {
      labels.forEach((label) => {
        label.classList.remove("open");
        const container = label.nextElementSibling;
        if (container?.classList.contains("label-container")) {
          container.style.maxHeight = "";
        }
      });
    }
  };

  window.addEventListener("resize", resetAccordion);
});


// ********************************************************************
//                    MOBILE HEADER DROPDOWN CONTROL
// ********************************************************************
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".label-h .info-rotulo-h");

  const closePanel = (label, wrapper) => {
    if (!label.classList.contains("open")) return;
    wrapper.style.maxHeight = `${wrapper.offsetHeight}px`;
    wrapper.offsetHeight; // forzar reflow
    wrapper.style.maxHeight = "0";
    label.classList.remove("open");
  };

  triggers.forEach((trigger) => {
    const label = trigger.closest(".label-h");
    const wrapper = label.closest(".block-wrapper_mod").nextElementSibling;

    trigger.addEventListener("click", () => {
      const open = label.classList.toggle("open");

      if (open) {
        wrapper.style.maxHeight = "none";
        const fullHeight = wrapper.offsetHeight;
        wrapper.style.maxHeight = "0";
        wrapper.offsetHeight;
        wrapper.style.maxHeight = `${fullHeight}px`;
      } else {
        wrapper.style.maxHeight = `${wrapper.offsetHeight}px`;
        wrapper.offsetHeight;
        wrapper.style.maxHeight = "0";
      }
    });
  });

  document.addEventListener(
    "click",
    (e) => {
      if (e.target.closest(".label_container.h")) return;

      document.querySelectorAll(".label-h.open").forEach((openLabel) => {
        const wrapper =
          openLabel.closest(".block-wrapper_mod").nextElementSibling;
        if (!openLabel.contains(e.target) && !wrapper.contains(e.target)) {
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
document.addEventListener("DOMContentLoaded", () => {
  const bsTriggers = document.querySelectorAll(".label-bs .info-rotulo-bs");
  const panel = document.querySelector(".label-container-bs");

  const closeBsPanel = (label) => {
    panel.style.maxHeight = `${panel.offsetHeight}px`;
    panel.offsetHeight;
    panel.style.maxHeight = "0";
    label.classList.remove("open");
  };

  bsTriggers.forEach((trigger) => {
    const label = trigger.closest(".label-bs");

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = label.classList.toggle("open");

      if (open) {
        panel.style.maxHeight = "none";
        const fullH = panel.offsetHeight;
        panel.style.maxHeight = "0";
        panel.offsetHeight;
        panel.style.maxHeight = `${fullH}px`;
      } else {
        closeBsPanel(label);
      }
    });
  });

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".label-bs.open").forEach((label) => {
      if (!label.contains(e.target) && !panel.contains(e.target)) {
        closeBsPanel(label);
      }
    });
  });
});

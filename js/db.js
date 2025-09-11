// db.js — BÚSQUEDA OPTIMIZADA SOBRE JSON (con ?folio= en URL)
(function () {
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    // 1. Referencias al input y nodos de salida
    const formInput =
      document.getElementById("form-data") ||
      document.querySelector('input[name="folio"]');
    const output = {
      invoice: document.getElementById("invoice_"),
      name: document.getElementById("name_"),
      authority: document.getElementById("authority_"),
      promedy: document.getElementById("promedy_"),
      promedy2: document.getElementById("promedy2_"),
      period: document.getElementById("period_"),
      date: document.getElementById("date_"),
      showVal: document.getElementById("showVal_"),
      hideInfo: document.getElementById("hideInfo"),
    };

    // 1.1 Guardamos el display ORIGINAL de hideInfo
    const originalHideInfoDisplay = getComputedStyle(output.hideInfo).display;

    // 1.2 Función reutilizable para ocultar la sección desplegable
    const hideSection = () => {
      output.showVal.style.display = "none";
      output.hideInfo.style.display = originalHideInfoDisplay;
    };

    // 2. Capturar pegado (insertFromPaste) justo antes de que cambie el valor
    formInput.addEventListener("beforeinput", (e) => {
      if (e.inputType === "insertFromPaste") {
        hideSection();
      }
    });

    // 3. Carga y Map para lookup O(1)
    const personas = await fetch("data/personas.json").then((r) => r.json());
    const personMap = new Map(personas.map((p) => [p.ID.trim(), p]));

    // 4. Filtrado (searchFilter)
    window.searchFilter = () => {
      const term = formInput.value.trim().toUpperCase();
      const matches = personas.filter((p) => p.ID.toUpperCase().includes(term));
      console.log("Sugerencias:", matches.slice(0, 5));
    };

    // 5. getVal / getVal2: llenado de campos (SIN cambiar visibilidad)
    window.getVal = window.getVal2 = () => {
      const key = formInput.value.trim();
      const person = personMap.get(key);
      if (!person) return;

      output.invoice.textContent = person.ID;
      output.name.textContent = person.NOMBRE;
      output.authority.textContent = person.AUTORIDAD;
      output.promedy.textContent = person.PROMEDIO;
      output.promedy2.textContent = person.PROMEDIO2;
      output.period.textContent = person.PERIODO;
      output.date.textContent = `${person.FECHA} ${person.HORA}`;

      // Importante: NO tocar display aquí. El despliegue lo controla:
      // - El botón "Buscar" (flujo externo existente).
      // - La precarga por ?folio= (abajo).
    };

    // 6. Precarga ?folio= en URL: siempre asigna el input,
    //    pero muestra la sección solo si el folio existe en personMap
    const params = new URLSearchParams(window.location.search);
    const folio = (params.get("folio") || "").trim();

    if (folio) {
      // 1) mostrar texto en el input incluso si es inválido
      formInput.value = folio;

      // 2) ejecutar tu filtro/carga de datos
      window.searchFilter();
      window.getVal();

      // 3) determinar si mostramos la sección
      const person = personMap.get(folio);
      if (person) {
        output.showVal.style.display = "block";
        output.hideInfo.style.display = "none";
        output.showVal.style.marginTop = "40px";
        const detalleElemento = document.querySelector(".txt-showinfo");
        if (detalleElemento) {
          setTimeout(() => {
            // Primer scroll a .txt-showinfo
            const offsetTop =
              detalleElemento.getBoundingClientRect().top +
              window.scrollY -
              120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });

            // Segundo scroll a .square-wrapper tras 3 s
            setTimeout(() => {
              const wrapper = document.querySelector(".square-wrapper");
              if (!wrapper) return;

              const offsetWrapper =
                wrapper.getBoundingClientRect().top + window.scrollY - 150;
              window.scrollTo({ top: offsetWrapper, behavior: "smooth" });
            }, 3000);
          }, 1000);
        }
      } else {
        // 1) Feedback al usuario por valor no encontrado
        setTimeout(() => {
          const dialog = document.getElementById("dialog-box4");
          dialog.style.display = "initial";
        }, 1500);

        // 2) Scroll suave a .txt-detail tras 1.8 s
        setTimeout(() => {
          const detalleElemento = document.querySelector(".txt-detail");
          if (detalleElemento) {
            const offsetTop =
              detalleElemento.getBoundingClientRect().top +
              window.scrollY -
              120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }
        }, 1800);
      }
    }

    // 7. Listener de input: sugerencias, prellenado y regla para campo vacío
    formInput.addEventListener("input", () => {
      window.searchFilter();
      window.getVal(); // llena datos si hay match, pero NO muestra sección automáticamente

      // Regla adicional: si el campo queda vacío por SUPR o BACKSPACE, ocultar sección
      if (formInput.value.trim() === "") {
        hideSection();
      }
    });

    // Aquí otros listeners o inicializadores que ya tengas…
  }
  // Función gatillo de .btn-reset-mod que refleja al Botón RESET (hideVal)
  const retryBtn = document.querySelector("#dialog-box4 .btn-reset-mod");
  const originalReset = document.getElementById("hideVal");
  if (retryBtn && originalReset) {
    retryBtn.addEventListener("click", () => {
      originalReset.click();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    });
  }
})();

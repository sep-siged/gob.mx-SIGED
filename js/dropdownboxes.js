(function () {
  // ===== Control de menús desplegables en página principal de SIGED =====

  // Ejecutar la inicialización al cargar el DOM
  function alCargarDOM(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  // Función genérica para alternar display de un elemento por su ID
  function alternarDesplegable(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = el.style.display === "block" ? "none" : "block";
  }

  alCargarDOM(() => {
    // Lista de IDs a alternar y sufijos de función
    const objetivos = [
      "target",
      "target2",
      "target3",
      "target4",
      "targeta",
      "targetb",
      "targetc",
      "targetd",
      "targete",
      "targetf",
      "targetg",
      "targeth",
      "targeti",
    ];
    const sufijos = [
      "",
      "2",
      "3",
      "4",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
    ];

    // Registrar globalmente handleDropDown, handleDropDown2, … handleDropDownI
    objetivos.forEach((id, i) => {
      const nombreFn = "handleDropDown" + sufijos[i];
      window[nombreFn] = () => alternarDesplegable(id);
    });
  });
})();

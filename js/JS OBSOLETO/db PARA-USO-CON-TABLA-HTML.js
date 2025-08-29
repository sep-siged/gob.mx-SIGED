// *************** DATABASE & BÚSQUEDA OPTIMIZADA ***************
(function () {
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    // 1. Referencias al input (por id o por name) y la tabla
    const formInput =
      document.getElementById("form-data") ||
      document.querySelector('input[name="folio"]');
    const dataTable = document.getElementById("dataTable");

    // 2. Extraer encabezados y filas de datos de la tabla
    const allRows = Array.from(dataTable.rows);
    const headerRow = allRows.shift(); // la primera fila son los headers
    const keys = Array.from(headerRow.cells).map((cell) =>
      cell.textContent.replace(/\s/g, "")
    );
    const dataRows = allRows; // el resto son datos

    // 3. Convertir filas en objetos y construir un Map para lookup O(1)
    const persons = dataRows.map((row) => {
      const cells = Array.from(row.cells);
      return keys.reduce((obj, key, i) => {
        obj[key] = cells[i].textContent.trim();
        return obj;
      }, {});
    });
    const personMap = new Map(persons.map((p) => [p.ID, p]));

    // 4. Cache de nodos de salida
    const output = {
      invoice: document.getElementById("invoice_"),
      name: document.getElementById("name_"),
      authority: document.getElementById("authority_"),
      promedy: document.getElementById("promedy_"),
      promedy2: document.getElementById("promedy2_"),
      date: document.getElementById("date_"),
      showVal: document.getElementById("showVal_"),
      hideInfo: document.getElementById("hideInfo"),
    };

    // 5. Filtrado de la tabla por ID (igual que tu searchFilter original)
    window.searchFilter = function () {
      const term = formInput.value.trim().toUpperCase();
      dataRows.forEach((row) => {
        const idText = row.cells[0].textContent.toUpperCase();
        row.style.display = idText.includes(term) ? "" : "none";
      });
    };

    // 6. Mostrar datos en pantalla según folio exacto
    window.getVal = function () {
      const val = formInput.value.trim();
      const person = personMap.get(val);
      if (!person) return; // si no existe, salir

      // Rellenar campos
      output.invoice.textContent = person.ID;
      output.name.textContent = person.NOMBRE;
      output.authority.textContent = person.AUTORIDAD;
      output.promedy.textContent = person.PROMEDIO;
      output.promedy2.textContent = person.PROMEDIO2;
      output.date.textContent = `${person.FECHA} ${person.HORA}`;

      // Mostrar u ocultar contenedores según longitud 36
      if (val.length === 36) {
        output.showVal.style.display = "block";
        output.hideInfo.style.display = "none";
        output.showVal.style.marginTop = "40px";
      } else {
        output.showVal.style.display = "none";
        output.hideInfo.style.display = "flex";
      }
    };

    // Alias para compatibilidad con getVal2
    window.getVal2 = window.getVal;

    // 7. Si hay ?folio= en la URL, precargar input, filtrar y mostrar datos
    const params = new URLSearchParams(window.location.search);
    const folio = params.get("folio");
    if (folio) {
      formInput.value = folio;
      window.searchFilter();
      window.getVal();
    }

    // 8. Listeners de input y botón (si existe uno con onClick="getVal2()")
    formInput.addEventListener("input", () => {
      window.searchFilter();
      window.getVal();
    });
  }
})();

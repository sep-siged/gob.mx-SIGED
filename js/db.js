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
      date: document.getElementById("date_"),
      showVal: document.getElementById("showVal_"),
      hideInfo: document.getElementById("hideInfo"),
    };

    // 2. Carga y Map para lookup O(1)
    const personas = await fetch("data/personas.json").then((r) => r.json());
    const personMap = new Map(personas.map((p) => [p.ID.trim(), p]));

    // 3. Filtrado (searchFilter)
    window.searchFilter = () => {
      const term = formInput.value.trim().toUpperCase();
      const matches = personas.filter((p) => p.ID.toUpperCase().includes(term));
      console.log("Sugerencias:", matches.slice(0, 5));
    };

    // 4. getVal / getVal2: llenado de campos
    window.getVal = window.getVal2 = () => {
      const key = formInput.value.trim();
      const person = personMap.get(key);
      if (!person) return;

      output.invoice.textContent = person.ID;
      output.name.textContent = person.NOMBRE;
      output.authority.textContent = person.AUTORIDAD;
      output.promedy.textContent = person.PROMEDIO;
      output.promedy2.textContent = person.PROMEDIO2;
      output.date.textContent = `${person.FECHA} ${person.HORA}`;

      if (key.length === 36) {
        output.showVal.style.display = "block";
        output.hideInfo.style.display = "none";
        output.showVal.style.marginTop = "40px";
      } else {
        output.showVal.style.display = "none";
        output.hideInfo.style.display = "flex";
      }
    };

    // 5. Precarga ?folio= en URL y disparo de filtro y getVal
    const params = new URLSearchParams(window.location.search);
    const folio = params.get("folio");
    if (folio) {
      formInput.value = folio;
      window.searchFilter();
      window.getVal();
    }

    // 6. Listeners de input para buscar y mostrar al vuelo
    formInput.addEventListener("input", () => {
      window.searchFilter();
      window.getVal();
    });
  }
})();

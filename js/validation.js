(() => {
  const d = (id) => document.getElementById(id),
    f = document.form.folio,
    inv = d("invoice_"),
    l = d("loader"),
    svs = d("showVal_"),
    hv = d("hideInfo"),
    fr = d("form-reg"),
    [svb, hvb] = [d("showVal"), d("hideVal")],
    [d1, d2, d3] = ["dialog-box1", "dialog-box2", "dialog-box3"].map(d);

  const show = (e, t = "flex") => e && (e.style.display = t),
    hide = (e) => e && (e.style.display = "none");

  // muestra loader si el folio coincide EXACTO
  window.load = () => {
    const v = f.value.trim();
    if (v.length === 36 && v === inv.innerHTML) {
      show(l);
      setTimeout(() => hide(l), 3000);
    }
  };

  // validaciones + loaders + diálogos + sección oculta
  const req = () => {
    const v = f.value.trim();
    if (!v) return show(d1);
    if (v.length !== 36) return show(d2);
    if (v !== inv.innerHTML) {
      show(l);
      setTimeout(() => hide(l), 2000);
      return setTimeout(() => show(d3), 3000);
    }
    // caso válido: loader 3s, después sección oculta y scroll
 show(l);

 setTimeout(() => {
   hide(l);
   show(svs, "block");
   svs.style.marginTop = "40px";
   hide(hv);

   const detalleElemento = document.querySelector(".txt-detail");

   if (detalleElemento) {
     // Ajuste fino: restar más margen para que no se pase del título
     const offsetTop =
       detalleElemento.getBoundingClientRect().top + window.scrollY - 120; // antes estaba -60
     window.scrollTo({ top: offsetTop, behavior: "smooth" });
   }
 }, 3000);
  };

  svb.onclick = req;
  hvb.onclick = () => {
    hide(svs);
    hide(fr);
    show(hv);
  };

  // cierres de diálogos
  ["1", "2", "3"].forEach(
    (n) => (window["pushOk" + n] = () => hide(d("dialog-box" + n)))
  );

  // borrar datos
  window.erase = () => {
    ["fullName", "invoiceData", "dateData"].forEach((k) =>
      localStorage.removeItem(k)
    );
    ["name_", "invoice_", "date_"].forEach((id) => (d(id).innerHTML = ""));
    ["getName", "getInvoice", "getDate"].forEach((id) => (d(id).value = ""));
  };
})();

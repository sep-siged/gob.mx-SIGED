(() => {
  const d = (id) => document.getElementById(id),
    f = document.form.folio,
    inv = d("invoice_"),
    l = d("loader"),
    svs = d("showVal_"),
    hv = d("hideInfo"),
    fr = d("form-reg"),
    [svb, hvb] = [d("showVal"), d("hideVal")],
    [d1, d2, d4] = ["dialog-box1", "dialog-box2", "dialog-box4"].map(d);

  const show = (e, t = "flex") => e && (e.style.display = t),
    hide = (e) => e && (e.style.display = "none");

  window.load = () => {
    const v = f.value.trim();
    if (v.length === 36 && v === inv.innerHTML) {
      show(l);
      setTimeout(() => hide(l), 3000);
    }
  };

  const req = () => {
    // 0) NUEVO: oculta cualquier “no encontrado” previo antes de validar
    hide(d4);

    // 1) Sincronizamos invoice_ con el valor actual del input
    window.getVal();

    const v = f.value.trim();
    const invoiceText = inv.innerHTML.trim().toUpperCase();
    const inputText = v.toUpperCase();

    // 2) Validaciones
    if (!v) return show(d1);
    if (v.length !== 36) return show(d2);
    if (inputText !== invoiceText) {
      // 0) Si previamente había una búsqueda válida, la ocultamos
      hide(svs);
      hide(fr);
      show(hv);

      // 1) Loader y hide tras 2 s
      show(l);
      setTimeout(() => hide(l), 2000);

      // 2) Mostrar dialog-box4 + scroll tras 3 s
      return setTimeout(() => {
        // aparecer el mensaje de "no encontrado"
        show(d4, "initial");

        // hacer scroll al contenedor de error
        const dialog = document.getElementById("dialog-box4");
        if (dialog) {
          const offsetTop =
            dialog.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 3000);
    }

    // SE COMPLEMENTA CON EL CÓDIGO DE INFOBOXES TEXT ANIMATION
    document.querySelectorAll(".showup").forEach((el) => {
      el.classList.remove("showup--visible");
      window.showupObserver.observe(el);
    });

    // 3) Caso válido: loader y despliegue
    show(l);
    setTimeout(() => {
      hide(l);
      show(svs, "initial");
      // svs.style.marginTop = "40px";
      hide(hv);

      // 2) Primer scroll a .txt-showinfo
      const detalleElemento = document.querySelector(".txt-showinfo");
      if (detalleElemento) {
        const offsetTxt =
          detalleElemento.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: offsetTxt, behavior: "smooth" });

        // 3) Segundo scroll a .square-wrapper tras otros 3 s
        setTimeout(() => {
          const wrapper = document.querySelector(".square-wrapper");
          if (!wrapper) return;

          const offsetWrapper =
            wrapper.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: offsetWrapper, behavior: "smooth" });
        }, 3000);
      }
    }, 3000);
  };

  svb.onclick = req;
  hvb.onclick = () => {
    hide(svs);
    hide(fr);
    show(hv);
    hide(d("dialog-box4"));
  };

  ["1", "2", "3"].forEach(
    (n) => (window["pushOk" + n] = () => hide(d("dialog-box" + n)))
  );

  window.erase = () => {
    ["fullName", "invoiceData", "dateData"].forEach((k) =>
      localStorage.removeItem(k)
    );
    ["name_", "invoice_", "date_"].forEach((id) => (d(id).innerHTML = ""));
    ["getName", "getInvoice", "getDate"].forEach((id) => (d(id).value = ""));
  };
})();

// ****************** INFOBOXES TEXT ANIMATION ******************
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("showup--visible")
        observer.unobserve(entry.target)
      }
    })
  }, {
    root: null,
    threshold: 1.0,
    rootMargin: "0px 0px -10% 0px",
  })

  document.querySelectorAll(".showup").forEach(el => {
    observer.observe(el)
  })

  // Exponemos el observer para reiniciar las animaciones más tarde
  window.showupObserver = observer
})

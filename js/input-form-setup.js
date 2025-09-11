(function () {
  // =========================================
  // CONSTANTES DE CACHÉ (TTL + VERSIÓN MANUAL)
  // =========================================
  const CACHE_KEY = "cache_personas";
  const CACHE_TS_KEY = "cache_personas_ts";
  const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 horas
  const CACHE_VERSION = "v1"; // Incrementar al actualizar personas.json
  const CACHE_VER_KEY = "cache_personas_version";

  // =========================================
  // 0. ARRANQUE AL CARGAR EL DOM
  // =========================================
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    //
    // 1. CACHE DE SELECTORES
    //
    const d = (id) => document.getElementById(id);
    const DOM = {
      formInput:
        d("form-data") || document.querySelector('input[name="folio"]'),
      formReg: d("form-reg"),

      invoice: d("invoice_"),
      name: d("name_"),
      authority: d("authority_"),
      promedy: d("promedy_"),
      promedy2: d("promedy2_"),
      period: d("period_"),
      date: d("date_"),

      showValCont: d("showVal_"),
      hideInfoCont: d("hideInfo"),
      showValBtn: d("showVal"),
      hideValBtn: d("hideVal"),

      loader: d("loader"),
      dialogs: {
        empty: d("dialog-box1"),
        wrongLength: d("dialog-box2"),
        notFound: d("dialog-box4"),
        other: d("dialog-box3"), // opcional (compatibilidad)
      },

      txtShowInfo: ".txt-showinfo",
      txtDetail: ".txt-detail",
      squareWrapper: ".square-wrapper",
      showupEls: ".showup",
      retryBtn: "#dialog-box4 .btn-reset-mod",
    };

    // Compatibilidad con otros scripts que lean document.form
    const f = document.form?.folio || DOM.formInput;

    //
    // 2. CONSTANTES Y AUXILIARES UI
    //
    const CONST = {
      FOLIO_LEN: 36,
      OFFSET_TXT_SHOWINFO: -120,
      OFFSET_SQUARE_WRAPPER: -150,
      T1_SCROLL_DELAY: 1000,
      T2_SCROLL_DELAY: 3000,
      LOADER_OK: 3000,
      LOADER_NOTFOUND_HIDE: 2000,
      NOTFOUND_SHOW_DELAY: 3000,
      DLG_NOTFOUND_INITIAL: 1500,
      DLG_NOTFOUND_SCROLL: 1800,
      SEARCH_DEBOUNCE: 200,
      SCROLL_BEHAVIOR: "smooth",
    };

    const UI = {
      // — Mostrar/ocultar
      show(el, disp = "flex") {
        if (el) el.style.display = disp;
      },
      hide(el) {
        if (el) el.style.display = "none";
      },

      // — Scroll helpers
      scrollTo(target, offset) {
        const el =
          typeof target === "string" ? document.querySelector(target) : target;
        if (!el) return;
        const top =
          el.getBoundingClientRect().top +
          window.scrollY +
          (offset ?? CONST.OFFSET_TXT_SHOWINFO);
        window.scrollTo({ top, behavior: CONST.SCROLL_BEHAVIOR });
      },
      scrollSequence(step1, off1, delay1, step2, off2, delay2) {
        setTimeout(() => {
          UI.scrollTo(step1, off1);
          setTimeout(() => UI.scrollTo(step2, off2), delay2);
        }, delay1);
      },

      // — Debounce
      debounce(fn, delay = CONST.SEARCH_DEBOUNCE) {
        let t;
        return function (...args) {
          clearTimeout(t);
          t = setTimeout(() => fn.apply(this, args), delay);
        };
      },
    };

    //
    // 3. MÓDULO DE DATOS CON CACHÉ EN localStorage (TTL + VERSIÓN)
    //
    const Data = {
      personas: [],
      map: new Map(),

      async load() {
        try {
          // Invalidar caché si la versión cambió
          const savedVersion = localStorage.getItem(CACHE_VER_KEY);
          if (savedVersion !== CACHE_VERSION) {
            localStorage.removeItem(CACHE_KEY);
            localStorage.removeItem(CACHE_TS_KEY);
            localStorage.setItem(CACHE_VER_KEY, CACHE_VERSION);
          }

          // Intentar leer del caché si está fresco
          const rawCache = localStorage.getItem(CACHE_KEY);
          const cacheTs = parseInt(localStorage.getItem(CACHE_TS_KEY), 10) || 0;
          const isFresh = Date.now() - cacheTs < CACHE_TTL_MS;

          if (rawCache && isFresh) {
            this.personas = JSON.parse(rawCache);
            console.info("Data load: usando cache localStorage");
          } else {
            // Fetch y guardar en caché
            const res = await fetch("data/personas.json");
            this.personas = await res.json();
            localStorage.setItem(CACHE_KEY, JSON.stringify(this.personas));
            localStorage.setItem(CACHE_TS_KEY, String(Date.now()));
            console.info("Data load: fetch y guardado en cache");
          }
        } catch (err) {
          console.warn("Data load falló, inicializando array vacío", err);
          this.personas = [];
        }
      },

      initMap() {
        this.map = new Map(this.personas.map((p) => [p.ID?.trim() || "", p]));
      },

      getById(id) {
        return this.map.get((id || "").trim());
      },

      search(term) {
        const t = (term || "").trim().toUpperCase();
        return this.personas.filter((p) => p.ID?.toUpperCase?.().includes(t));
      },
    };

    await Data.load();
    Data.initMap();

    //
    // 4. SEARCH Y RELLENO (API global respetada)
    //
    window.searchFilter = UI.debounce(() => {
      console.log("Sugerencias:", Data.search(DOM.formInput.value).slice(0, 5));
    });

    window.getVal = window.getVal2 = () => {
      const person = Data.getById(DOM.formInput.value);
      if (!person) return;
      DOM.invoice.textContent = person.ID;
      DOM.name.textContent = person.NOMBRE;
      DOM.authority.textContent = person.AUTORIDAD;
      DOM.promedy.textContent = person.PROMEDIO;
      DOM.promedy2.textContent = person.PROMEDIO2;
      DOM.period.textContent = person.PERIODO;
      DOM.date.textContent = `${person.FECHA} ${person.HORA}`;
    };

    //
    // 5. HIDE SECTION (restaura display original)
    //
    const originalHideDisp = getComputedStyle(DOM.hideInfoCont).display;
    const hideSection = () => {
      UI.hide(DOM.showValCont);
      if (DOM.hideInfoCont) DOM.hideInfoCont.style.display = originalHideDisp;
    };

    //
    // 6. EVENTOS PASSIVE EN EL INPUT
    //
    if (DOM.formInput) {
      DOM.formInput.addEventListener(
        "beforeinput",
        (e) => {
          if (e.inputType === "insertFromPaste") hideSection();
        },
        { passive: true }
      );

      DOM.formInput.addEventListener(
        "input",
        () => {
          window.searchFilter();
          window.getVal();
          if (!DOM.formInput.value.trim()) hideSection();
        },
        { passive: true }
      );
    }

    //
    // 7. CACHEAR .showup ELEMENTS PARA REUTILIZAR
    //
    const showupElements = Array.from(document.querySelectorAll(DOM.showupEls));

    //
    // 8. PRECARGA ?folio=
    //
    (() => {
      const folio =
        new URLSearchParams(window.location.search).get("folio")?.trim() || "";
      if (!folio || !DOM.formInput) return;

      DOM.formInput.value = folio;
      window.searchFilter();
      window.getVal();

      const person = Data.getById(folio);
      if (person) {
        UI.show(DOM.showValCont, "block");
        UI.hide(DOM.hideInfoCont);
        DOM.showValCont.style.marginTop = "40px";

        UI.scrollSequence(
          DOM.txtShowInfo,
          CONST.OFFSET_TXT_SHOWINFO,
          CONST.T1_SCROLL_DELAY,
          DOM.squareWrapper,
          CONST.OFFSET_SQUARE_WRAPPER,
          CONST.T2_SCROLL_DELAY
        );
      } else {
        setTimeout(
          () => UI.show(DOM.dialogs.notFound, "initial"),
          CONST.DLG_NOTFOUND_INITIAL
        );
        setTimeout(() => UI.scrollTo(DOM.txtDetail), CONST.DLG_NOTFOUND_SCROLL);
      }
    })();

    //
    // 9. VALIDACIÓN Y BOTÓN “BUSCAR”
    //
    window.load = () => {
      const v = (f?.value || "").trim();
      if (v.length === CONST.FOLIO_LEN && v === DOM.invoice.innerHTML) {
        UI.show(DOM.loader);
        setTimeout(() => UI.hide(DOM.loader), CONST.LOADER_OK);
      }
    };

    const validateAndShow = () => {
      UI.hide(DOM.dialogs.notFound);
      window.getVal();

      const v = (f?.value || "").trim();
      const inv = (DOM.invoice.innerHTML || "").trim().toUpperCase();
      const input = v.toUpperCase();

      if (!v) return UI.show(DOM.dialogs.empty);
      if (v.length !== CONST.FOLIO_LEN) return UI.show(DOM.dialogs.wrongLength);

      if (input !== inv) {
        UI.hide(DOM.showValCont);
        UI.hide(DOM.formReg);
        UI.show(DOM.hideInfoCont);

        UI.show(DOM.loader);
        setTimeout(() => UI.hide(DOM.loader), CONST.LOADER_NOTFOUND_HIDE);

        return setTimeout(() => {
          UI.show(DOM.dialogs.notFound, "initial");
          UI.scrollTo(DOM.dialogs.notFound);
        }, CONST.NOTFOUND_SHOW_DELAY);
      }

      // Reinicio animaciones
      showupElements.forEach((el) => {
        el.classList.remove("showup--visible");
        window.showupObserver.observe(el);
      });

      UI.show(DOM.loader);
      setTimeout(() => {
        UI.hide(DOM.loader);
        UI.show(DOM.showValCont, "initial");
        UI.hide(DOM.hideInfoCont);

        setTimeout(() => UI.scrollTo(DOM.txtShowInfo), 0);
        setTimeout(
          () => UI.scrollTo(DOM.squareWrapper, CONST.OFFSET_SQUARE_WRAPPER),
          CONST.T2_SCROLL_DELAY
        );
      }, CONST.LOADER_OK);
    };

    if (DOM.showValBtn) DOM.showValBtn.onclick = validateAndShow;
    if (DOM.hideValBtn) {
      DOM.hideValBtn.onclick = () => {
        UI.hide(DOM.showValCont);
        UI.hide(DOM.formReg);
        UI.show(DOM.hideInfoCont);
        UI.hide(DOM.dialogs.notFound);
      };
    }

    //
    // 10. CIERRE DE DIÁLOGOS Y ERASE
    //
    window.pushOk1 = () => UI.hide(DOM.dialogs.empty);
    window.pushOk2 = () => UI.hide(DOM.dialogs.wrongLength);
    window.pushOk3 = () => UI.hide(DOM.dialogs.other);

    window.erase = () => {
      ["fullName", "invoiceData", "dateData"].forEach((k) =>
        localStorage.removeItem(k)
      );
      ["name_", "invoice_", "date_"].forEach((id) => {
        const el = d(id);
        if (el) el.innerHTML = "";
      });
      ["getName", "getInvoice", "getDate"].forEach((id) => {
        const el = d(id);
        if (el) el.value = "";
      });
    };

    //
    // 11. INFOBOX TEXT ANIMATION
    //
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("showup--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 1.0, rootMargin: "0px 0px -10% 0px" }
    );

    showupElements.forEach((el) => observer.observe(el));
    window.showupObserver = observer;

    //
    // 12. BOTÓN “REINTENTAR” EXTERNO
    //
    const retry = document.querySelector(DOM.retryBtn);
    const reset = d("hideVal");
    if (retry && reset) {
      retry.addEventListener("click", () => {
        reset.click();
        setTimeout(
          () => window.scrollTo({ top: 0, behavior: CONST.SCROLL_BEHAVIOR }),
          200
        );
      });
    }
  }
})();

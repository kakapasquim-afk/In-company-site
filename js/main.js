/* UNIPAR IN COMPANY — shared interactivity */
(function () {
  "use strict";

  var ENTRANCE_SEEN_KEY = "unipar-entrance-seen";

  // --- Entrance screen ---
  var entrance = document.getElementById("entrance");
  var entranceBtn = document.getElementById("entrance-btn");
  if (entrance) {
    // If URL has an anchor, skip entrance entirely.
    if (window.location.hash) {
      try { sessionStorage.setItem(ENTRANCE_SEEN_KEY, "true"); } catch (e) {}
      hideEntranceImmediately();
    } else {
      var alreadySeen = false;
      try { alreadySeen = !!sessionStorage.getItem(ENTRANCE_SEEN_KEY); } catch (e) {}
      if (alreadySeen) {
        hideEntranceImmediately();
      } else {
        // Show entrance (it is opacity:0 in CSS by default when leaving not set; keep visible)
        document.body.style.overflow = "hidden";
        // Segura a entrada do hero até a tela de boas-vindas sair.
        document.documentElement.classList.add("hero-hold");
        entranceBtn.addEventListener("click", function () {
          try { sessionStorage.setItem(ENTRANCE_SEEN_KEY, "true"); } catch (e) {}
          entrance.classList.add("is-leaving");
          document.body.style.overflow = "";
          document.documentElement.classList.remove("hero-hold");
        });
        entrance.addEventListener("transitionend", function (evt) {
          if (evt.propertyName === "opacity" && entrance.classList.contains("is-leaving")) {
            entrance.style.display = "none";
          }
        });
      }
    }
  }

  function hideEntranceImmediately() {
    if (entrance) {
      entrance.classList.add("is-leaving");
      entrance.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  // --- Header scroll state ---
  var header = document.querySelector(".site-header");
  var headerLogo = document.querySelector(".site-header__logo-link");
  if (header) {
    var onHeaderScroll = function () {
      var scrolled = window.scrollY > 24;
      header.classList.toggle("is-scrolled", scrolled);
      if (headerLogo) headerLogo.classList.toggle("is-scrolled", scrolled);
    };
    onHeaderScroll();
    window.addEventListener("scroll", onHeaderScroll, { passive: true });
  }

  // --- Mobile menu ---
  var menuToggle = document.getElementById("menu-toggle");
  var menuClose = document.getElementById("menu-close");
  var mobileMenu = document.getElementById("mobile-menu");
  function setMenu(open) {
    mobileMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    if (menuToggle) menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      setMenu(!mobileMenu.classList.contains("is-open"));
    });
    if (menuClose) menuClose.addEventListener("click", function () { setMenu(false); });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  // --- YouTube embed: keep origin in sync with the real hosting origin (fix erro 153) ---
  var isHttpOrigin = location.protocol === "http:" || location.protocol === "https:";
  document.querySelectorAll('iframe[src*="youtube-nocookie.com/embed"], iframe[src*="youtube.com/embed"]').forEach(function (frame) {
    try {
      var url = new URL(frame.getAttribute("src"), location.href);
      if (isHttpOrigin) {
        url.searchParams.set("origin", location.origin);
      } else {
        url.searchParams.delete("origin");
      }
      var fixedSrc = url.href;
      if (frame.getAttribute("src") !== fixedSrc) {
        frame.setAttribute("src", fixedSrc);
      }
    } catch (e) {}
  });

  // --- Texto por palavras (.reveal-title: H2 do bloco de título; .reveal-words: o próprio elemento) ---
  // Cada palavra vira <span class="rw">; o texto e a ordem de leitura não mudam.
  // .rw-ready só é marcado depois de dividir, então uma falha deixa o texto visível.
  function splitWords(root) {
    var index = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.nodeValue.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }
            var span = document.createElement("span");
            span.className = "rw";
            span.style.setProperty("--i", index++);
            span.textContent = part;
            frag.appendChild(span);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    })(root);
  }

  // As palavras animam para todos, inclusive com movimento reduzido (decisão do usuário, 2026-10-24).
  {
    document.querySelectorAll(".reveal-title, .reveal-words").forEach(function (el) {
      var target = el.classList.contains("reveal-title") ? el.querySelector(".section-title__h2") : el;
      if (!target) return;
      try {
        splitWords(target);
        el.classList.add("rw-ready");
      } catch (e) {}
    });
  }

  // --- Páginas de projeto: marca os blocos para a mesma entrada da home ---
  // Só adiciona classes (.reveal, .reveal-mask, .reveal-seq); o observer abaixo é o mesmo da home e o
  // conteúdo segue visível sem JavaScript (@media (scripting: none)). Nenhum HTML de página é alterado.
  var projectBody = document.querySelector(".project-body");
  var seqGroups = [];
  if (projectBody) try {
    var mark = function (el, extra, delay) {
      if (!el || el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      if (extra) extra.split(" ").forEach(function (c) { el.classList.add(c); });
      if (delay) el.style.animationDelay = delay + "ms";
    };
    // Itens lado a lado entram em sequência (.reveal-seq + --i = coluna); linhas seguintes recomeçam
    // em 0, porque cada linha só aparece quando a rolagem chega nela.
    var markGroup = function (group, selector) {
      var items = Array.prototype.slice.call(group.querySelectorAll(selector));
      items.forEach(function (el) {
        var mask = el.matches(".case-image--cover, .project-galeria__item") ? "reveal-mask" : "";
        mark(el, mask ? mask + " reveal-seq" : "reveal-seq");
      });
      if (items.length) seqGroups.push(items);
    };

    // Hero é animado só por CSS (carregamento). Blocos de texto:
    projectBody.querySelectorAll(".project-block").forEach(function (block) {
      mark(block.querySelector(".text-block__eyebrow"), "", 0);
      mark(block.querySelector(".text-block__title"), "", 70);
      var body = block.querySelector(".text-block__body");
      if (body) {
        Array.prototype.slice.call(body.children).forEach(function (child, i) {
          if (child.matches(".case-list")) { markGroup(child, "li"); return; }
          if (child.matches(".grid")) { markGroup(child, ":scope > *"); return; }
          mark(child, "", 140 + Math.min(i, 2) * 70);
        });
      }
      // Imagens soltas (as de duo/galeria entram pelo grupo)
      block.querySelectorAll(".case-image").forEach(function (fig) {
        if (fig.closest(".case-image-duo")) return;
        mark(fig, fig.matches(".case-image--cover") ? "reveal-mask" : "");
      });
    });
    projectBody.querySelectorAll(".case-image-duo").forEach(function (duo) {
      duo.classList.remove("reveal"); // o grupo passa a animar cada foto, não o contêiner
      markGroup(duo, ":scope > .case-image");
    });
    projectBody.querySelectorAll(".project-galeria").forEach(function (g) {
      mark(g.querySelector(".project-galeria__eyebrow"), "", 0);
      var grid = g.querySelector(".project-galeria__grid");
      if (grid) markGroup(grid, ":scope > .project-galeria__item");
    });
    projectBody.querySelectorAll(".o-projeto-em-movimento__head").forEach(function (h) { mark(h, "", 0); });
    projectBody.querySelectorAll(".video-item").forEach(function (v) { mark(v, "", 0); });
    projectBody.querySelectorAll(".project-closing").forEach(function (c) { markGroup(c, ":scope > p"); });
    mark(projectBody.querySelector(".project-back-cta"), "", 0);

    // --i = posição do item dentro da sua linha (cols medido no layout real); recalcula se a largura mudar
    var layoutSeq = function () {
      seqGroups.forEach(function (items) {
        var firstTop = null, cols = 0;
        items.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (!r.width) return;
          if (firstTop === null) firstTop = r.top;
          if (Math.abs(r.top - firstTop) < 6) cols++;
        });
        cols = Math.max(cols, 1);
        items.forEach(function (el, i) { el.style.setProperty("--i", i % cols); });
      });
    };
    layoutSeq();
    var seqTimer;
    window.addEventListener("resize", function () {
      clearTimeout(seqTimer);
      seqTimer = setTimeout(layoutSeq, 150);
    });
  } catch (e) {
    // Falha ao marcar: nada pode ficar escondido esperando uma animação
    projectBody.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  // --- Reveal on scroll ---
  var revealEls = document.querySelectorAll(".reveal, .reveal-title, .reveal-words");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // --- Back to top ---
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    var onScroll = function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Units selection (cities list + filters) ---
  var unitCityItems = Array.prototype.slice.call(document.querySelectorAll(".units__city-item"));
  var unitButtons = Array.prototype.slice.call(document.querySelectorAll(".units__btn"));

  if (unitCityItems.length || unitButtons.length) {
    function setUnitButtons(city) {
      var active = !city || city === "all" ? "all" : city;
      unitButtons.forEach(function (btn) {
        btn.classList.toggle("is-active", btn.getAttribute("data-city") === active);
      });
      unitCityItems.forEach(function (item) {
        item.classList.toggle("is-active", item.getAttribute("data-city") === active);
      });
    }

    unitCityItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var city = item.getAttribute("data-city");
        setUnitButtons(city);
        document.dispatchEvent(new CustomEvent("unit:select", { detail: { city: city } }));
      });
    });

    unitButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var city = btn.getAttribute("data-city");
        setUnitButtons(city);
        document.dispatchEvent(new CustomEvent("unit:select", { detail: { city: city } }));
      });
    });

    document.addEventListener("unit:select", function (evt) {
      var city = evt.detail && evt.detail.city;
      setUnitButtons(city);
    });
  }
})();

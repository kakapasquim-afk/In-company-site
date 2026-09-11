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
        entranceBtn.addEventListener("click", function () {
          try { sessionStorage.setItem(ENTRANCE_SEEN_KEY, "true"); } catch (e) {}
          entrance.classList.add("is-leaving");
          document.body.style.overflow = "";
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

  // --- Reveal on scroll ---
  var revealEls = document.querySelectorAll(".reveal");
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

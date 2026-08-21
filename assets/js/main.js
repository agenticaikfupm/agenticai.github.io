/* ==========================================================================
   Agentic AI @ KFUPM — shared behaviour
   Progressive enhancement only: every page works with JS disabled.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Theme toggle (light / dark) ------------------------------- */
  var root = document.documentElement;

  function storedTheme() {
    try { return localStorage.getItem("aikfupm-theme"); } catch (e) { return null; }
  }
  function storeTheme(value) {
    try { localStorage.setItem("aikfupm-theme", value); } catch (e) { /* private mode — ignore */ }
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#08120e" : "#ffffff");
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  applyTheme(root.getAttribute("data-theme") || storedTheme() || "light");

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
    });
  });

  /* ---------- Mobile navigation ----------------------------------------- */
  var burger = document.querySelector(".nav__burger");
  var links = document.querySelector(".nav__links");

  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Dropdown submenus ---------------------------------------- */
  var subToggles = document.querySelectorAll(".nav__toggle-sub");

  subToggles.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      var item = btn.closest(".nav__item");
      var wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".nav__item.is-open").forEach(function (el) {
        el.classList.remove("is-open");
        var t = el.querySelector(".nav__toggle-sub");
        if (t) t.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.closest(".nav__item")) return;
    document.querySelectorAll(".nav__item.is-open").forEach(function (el) {
      el.classList.remove("is-open");
      var t = el.querySelector(".nav__toggle-sub");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".nav__item.is-open").forEach(function (el) {
      el.classList.remove("is-open");
      var t = el.querySelector(".nav__toggle-sub");
      if (t) t.setAttribute("aria-expanded", "false");
    });
    if (links && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      if (burger) burger.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Scroll reveal -------------------------------------------- */
  var revealables = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Footer year ---------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();

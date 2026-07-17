(function () {
  "use strict";

  /* ---- 手機版選單 ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- 作品網格:類別篩選(支援首頁類別卡片帶入的 ?category= 參數) ---- */
  var grid = document.getElementById("book-grid");
  if (grid) {
    var cards = grid.querySelectorAll(".book-card");
    var empty = document.getElementById("grid-empty");
    var bar = document.getElementById("filter-category");

    function applyFilter(category) {
      var visible = 0;
      cards.forEach(function (card) {
        var show = category === "all" || card.dataset.category === category;
        card.hidden = !show;
        if (show) visible++;
      });
      if (empty) empty.hidden = visible !== 0;
    }

    if (bar) {
      bar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;
        bar.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        applyFilter(btn.dataset.filter);
      });

      var param = new URLSearchParams(location.search).get("category");
      if (param) {
        var target = Array.prototype.find.call(
          bar.querySelectorAll(".filter-btn"),
          function (b) { return b.dataset.filter === param; }
        );
        if (target) target.click();
      }
    }
  }

  /* ---- 書籍單頁:封面與試閱圖燈箱 ---- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = document.getElementById("lightbox-img");
    var closeBtn = document.getElementById("lightbox-close");

    document.querySelectorAll(".js-zoom").forEach(function (img) {
      img.addEventListener("click", function () {
        if (lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---- 聯絡頁:組合 Email(防爬蟲) ---- */
  var emailEl = document.getElementById("contact-email");
  if (emailEl && emailEl.dataset.user && emailEl.dataset.domain) {
    var addr = emailEl.dataset.user + "@" + emailEl.dataset.domain;
    emailEl.innerHTML = '<a href="mailto:' + addr + '">' + addr + "</a>";
  }
})();

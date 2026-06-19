/* =================================================================
   Bienestar Holístico · Landing de suplementos — JavaScript puro
   1. Menú móvil      5. FAQ acordeón
   2. Scroll reveal   6. Carrusel testimonios
   3. Tabs productos  7. Header scrolled
   4. Quiz            8. Smooth scroll + parallax + año
   ================================================================= */
(function () {
  "use strict";

  /* Base de datos de productos (tabs + "Ver más" + quiz + carrito)
     price = precio actual (con descuento) · antes = precio tachado ficticio  */
  var PRODUCTS = {
    relaxaplus: {
      name: "RelaxaPlus",
      img: "relaxaplus.png",
      price: 130, antes: 180,
      focus: "Estrés, ansiedad y calma",
      desc: "RelaxaPlus está orientado a personas que viven con carga mental, tensión diaria o que buscan un apoyo natural para acompañar su equilibrio emocional. Puede formar parte de una rutina de bienestar junto con respiración consciente y descanso adecuado.",
      list: ["Apoya la regulación del estrés.", "Acompaña el equilibrio emocional.", "Contribuye a la relajación.", "Apoya el descanso.", "Antioxidante.", "60 cápsulas."],
      wa: "https://wa.me/51947720840?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20RelaxaPlus."
    },
    citrato: {
      name: "Citrato de Magnesio",
      img: "citrato.png",
      price: 100, antes: 140,
      focus: "Energía, músculos y sistema nervioso",
      desc: "El Citrato de Magnesio puede apoyar el equilibrio del sistema nervioso, el funcionamiento muscular y la producción de energía. Es ideal para personas con rutinas exigentes, cansancio o tensión corporal.",
      list: ["Apoya la producción de energía.", "Contribuye al funcionamiento muscular.", "Acompaña el equilibrio nervioso.", "Apoya la salud ósea y muscular.", "120 cápsulas."],
      wa: "https://wa.me/51947720840?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20Citrato%20de%20Magnesio."
    },
    dormicalm: {
      name: "Dormicalm",
      img: "dormicalm.png",
      price: 110, antes: 150,
      focus: "Sueño, descanso y fatiga",
      desc: "Dormicalm está pensado para personas que desean construir una rutina nocturna más tranquila, desconectarse del estrés del día y apoyar su descanso de manera natural.",
      list: ["Acompaña una rutina de descanso.", "Apoya el ciclo del sueño.", "Contribuye a reducir la sensación de fatiga.", "Ideal para desconectarse del estrés diario.", "60 cápsulas."],
      wa: "https://wa.me/51947720840?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20Dormicalm."
    },
    vitalmind: {
      name: "VitalMind",
      img: "vitalmind.png",
      price: 130, antes: 180,
      focus: "Memoria, concentración y claridad mental",
      desc: "VitalMind está orientado a estudiantes, profesionales o personas con carga mental alta que desean apoyar su concentración, memoria y claridad mental dentro de una rutina de enfoque y descanso.",
      list: ["Apoya el rendimiento intelectual.", "Acompaña la memoria.", "Contribuye a la función cognitiva.", "Apoya el sistema inmune.", "60 cápsulas."],
      wa: "https://wa.me/51947720840?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20VitalMind."
    },
    ashwagandha: {
      name: "Ashwagandha",
      img: "ashwagandha.png",
      price: 110, antes: 150,
      focus: "Estrés, cortisol y equilibrio",
      desc: "Ashwagandha es un adaptógeno tradicional usado como apoyo complementario para personas que buscan equilibrio ante el estrés, energía natural y bienestar emocional, dentro de una rutina de autocuidado.",
      list: ["Apoya el equilibrio emocional.", "Acompaña la respuesta al estrés.", "Puede contribuir a la energía natural.", "Apoya el descanso.", "Adaptógeno tradicional.", "90 cápsulas."],
      wa: "https://wa.me/51947720840?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20Ashwagandha."
    },
    artiforte: {
      name: "ArtiForte+",
      img: "artiforte.png",
      price: 110, antes: 150,
      focus: "Articulaciones, huesos y movilidad",
      desc: "ArtiForte+ está orientado a personas activas o que buscan apoyar la salud de sus articulaciones, huesos y movilidad dentro de una rutina de autocuidado físico.",
      list: ["Apoya el fortalecimiento de huesos y cartílago.", "Acompaña la movilidad y flexibilidad.", "Contribuye al alivio de molestias articulares.", "Favorece la síntesis del colágeno.", "90 cápsulas."],
      wa: "https://wa.me/51947720840?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20ArtiForte%2B."
    },
    tiroidbalance: {
      name: "TiroidBalance",
      img: "tiroidbalance.png",
      price: 130, antes: 180,
      focus: "Energía, metabolismo y equilibrio hormonal",
      desc: "TiroidBalance está orientado a personas que buscan apoyar su energía, metabolismo y bienestar hormonal de forma natural, como complemento de hábitos saludables.",
      list: ["Apoya la energía y el metabolismo.", "Acompaña el ánimo y la concentración.", "Contribuye al equilibrio hormonal.", "Favorece una función tiroidea saludable.", "60 cápsulas veganas."],
      wa: "https://wa.me/51947720840?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20TiroidBalance."
    }
  };

  /* ---------- 0. CATÁLOGO COMPLETO (desde catalog-data.js) ----------
     Fusiona los 100+ productos del catálogo en PRODUCTS (para el carrito)
     y los pinta en una grilla con filtros por categoría.                */
  var CATALOG = window.CATALOG || [];
  var CATEGORIES = window.CATEGORIES || [];
  CATALOG.forEach(function (p) {
    if (!PRODUCTS[p.id]) PRODUCTS[p.id] = p; // disponibles para el carrito
  });

  var catGrid = document.getElementById("catalogGrid");
  var catFilters = document.getElementById("catalogFilters");
  var catCount = document.getElementById("catalogCount");
  var currentCat = "Todos";

  function catCardHTML(p) {
    var off = Math.round((1 - p.price / p.antes) * 100);
    var meta = p.content ? '<span class="cat-card__pill">' + p.content + "</span>" : "";
    return (
      '<article class="cat-card reveal" data-cat="' + p.cat + '">' +
        '<div class="cat-card__media">' +
          '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
          (off > 0 ? '<span class="cat-card__off">-' + off + "%</span>" : "") +
        "</div>" +
        '<div class="cat-card__body">' +
          '<span class="cat-card__line">' + p.line + "</span>" +
          '<h3 class="cat-card__name">' + p.name + "</h3>" +
          '<p class="cat-card__desc">' + p.desc + "</p>" +
          '<div class="cat-card__meta">' + meta + '<span class="cat-card__cat">' + p.cat + "</span></div>" +
          '<div class="cat-card__price"><span class="price-before">S/ ' + p.antes + '</span><span class="price-now">S/ ' + p.price + "</span></div>" +
          '<button class="btn btn--primary btn--block js-add" data-id="' + p.id + '">Agregar al carrito</button>' +
        "</div>" +
      "</article>"
    );
  }

  function renderCatalog() {
    if (!catGrid) return;
    var list = currentCat === "Todos" ? CATALOG : CATALOG.filter(function (p) { return p.cat === currentCat; });
    catGrid.innerHTML = list.map(catCardHTML).join("");
    if (catCount) catCount.textContent = "Mostrando " + list.length + " producto" + (list.length === 1 ? "" : "s");
    // activar reveal en las nuevas tarjetas
    catGrid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("active"); });
  }

  if (catFilters) {
    var cats = ["Todos"].concat(CATEGORIES);
    catFilters.innerHTML = cats.map(function (c) {
      return '<button class="cat-chip' + (c === "Todos" ? " active" : "") + '" data-cat="' + c + '">' + c + "</button>";
    }).join("");
    catFilters.addEventListener("click", function (e) {
      var b = e.target.closest(".cat-chip");
      if (!b) return;
      currentCat = b.getAttribute("data-cat");
      catFilters.querySelectorAll(".cat-chip").forEach(function (x) { x.classList.toggle("active", x === b); });
      renderCatalog();
    });
    renderCatalog();
  }

  /* ---------- 1. MENÚ MÓVIL ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      navToggle.classList.toggle("open");
    });
    // cerrar al hacer click en un enlace
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.classList.remove("open");
      });
    });
  }

  /* ---------- 2. SCROLL REVEAL (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("active");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("active"); });
  }

  /* ---------- 3. TABS PRODUCT VIEWER ---------- */
  var tabs = document.querySelectorAll(".viewer__tab");
  var vImg = document.getElementById("viewerImg");
  var vTitle = document.getElementById("viewerTitle");
  var vFocus = document.getElementById("viewerFocus");
  var vDesc = document.getElementById("viewerDesc");
  var vList = document.getElementById("viewerList");
  var vWa = document.getElementById("viewerWa");
  var vBefore = document.getElementById("viewerBefore");
  var vNow = document.getElementById("viewerNow");
  var vAdd = document.getElementById("viewerAdd");

  function renderViewer(key) {
    var p = PRODUCTS[key];
    if (!p) return;
    // animación fade/zoom de la imagen
    vImg.classList.add("swap");
    setTimeout(function () {
      vImg.src = p.img;
      vImg.alt = p.name;
      vImg.classList.remove("swap");
    }, 220);
    vTitle.textContent = p.name;
    vFocus.textContent = p.focus;
    vDesc.textContent = p.desc;
    vList.innerHTML = p.list.map(function (i) { return "<li>" + i + "</li>"; }).join("");
    vWa.href = p.wa;
    if (vBefore) vBefore.textContent = "S/ " + p.antes;
    if (vNow) vNow.textContent = "S/ " + p.price;
    if (vAdd) vAdd.setAttribute("data-id", key);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      renderViewer(tab.getAttribute("data-product"));
    });
  });
  if (vList) renderViewer("relaxaplus"); // estado inicial

  /* "Ver más" en las cards -> abre el viewer en ese producto */
  var keyByName = {
    "RelaxaPlus": "relaxaplus",
    "Citrato de Magnesio": "citrato",
    "Dormicalm": "dormicalm",
    "VitalMind": "vitalmind",
    "Ashwagandha": "ashwagandha",
    "ArtiForte+": "artiforte",
    "TiroidBalance": "tiroidbalance"
  };
  document.querySelectorAll(".js-seemore").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = keyByName[btn.getAttribute("data-target")];
      if (!key) return;
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t.getAttribute("data-product") === key);
      });
      renderViewer(key);
      document.getElementById("viewer").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- 4. QUIZ DE RECOMENDACIÓN ---------- */
  var QUIZ = {
    estres:        ["RelaxaPlus", "Ashwagandha"],
    ansiedad:      ["RelaxaPlus", "Ashwagandha"],
    sueno:         ["Dormicalm", "Ashwagandha"],
    cansancio:     ["Citrato de Magnesio", "VitalMind"],
    concentracion: ["VitalMind"],
    carga:         ["VitalMind", "RelaxaPlus"],
    tension:       ["Citrato de Magnesio"],
    rutina:        ["Citrato de Magnesio", "VitalMind"]
  };
  var chips = document.querySelectorAll(".quiz-chip");
  var quizResult = document.getElementById("quizResult");
  var waOrientacion = "https://wa.me/51947720840?text=Hola,%20quiero%20orientaci%C3%B3n%20personalizada%20para%20elegir%20un%20suplemento.";

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var recs = QUIZ[chip.getAttribute("data-key")] || [];
      var badges = recs.map(function (r) { return '<span class="quiz__rec-badge">' + r + "</span>"; }).join("");
      quizResult.innerHTML =
        '<p class="quiz__rec-title">Para ti podría encajar:</p>' +
        '<div class="quiz__rec-products">' + badges + "</div>" +
        '<p class="quiz__note">Esta es una orientación inicial. Para elegir mejor, escríbeme por WhatsApp y te oriento según tu caso.</p>' +
        '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + waOrientacion + '">Quiero orientación personalizada</a>';
    });
  });

  /* ---------- 5. FAQ ACORDEÓN ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-item__q");
    var a = item.querySelector(".faq-item__a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // cerrar todos
      document.querySelectorAll(".faq-item").forEach(function (it) {
        it.classList.remove("open");
        it.querySelector(".faq-item__a").style.maxHeight = null;
      });
      // abrir el actual si estaba cerrado
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- 6. CARRUSEL DE TESTIMONIOS ---------- */
  var track = document.getElementById("carouselTrack");
  var dotsWrap = document.getElementById("carouselDots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  if (track) {
    var slides = track.children.length;
    var index = 0;
    // dots
    for (var i = 0; i < slides; i++) {
      var d = document.createElement("button");
      d.className = "carousel__dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Testimonio " + (i + 1));
      (function (n) { d.addEventListener("click", function () { go(n); }); })(i);
      dotsWrap.appendChild(d);
    }
    var dots = dotsWrap.children;

    function go(n) {
      index = (n + slides) % slides;
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      for (var k = 0; k < dots.length; k++) dots[k].classList.toggle("active", k === index);
    }
    if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); });
    if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); });

    // autoplay suave
    var auto = setInterval(function () { go(index + 1); }, 6000);
    track.parentElement.addEventListener("mouseenter", function () { clearInterval(auto); });
  }

  /* ---------- 7. HEADER SCROLLED + 8. PARALLAX ---------- */
  var header = document.getElementById("header");
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 30);
    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
      el.style.transform = "translateY(" + (y * speed) + "px)";
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 8b. SMOOTH SCROLL (con offset de header) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ---------- Año footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =================================================================
     9. CARRITO DE COMPRAS
     - Guarda en localStorage
     - Suma todo al mensaje final de WhatsApp
     ================================================================= */
  var WA_NUMBER = "51947720840";
  var STORAGE_KEY = "bh_cart";

  var cartEl = document.getElementById("cart");
  var cartOverlay = document.getElementById("cartOverlay");
  var cartToggle = document.getElementById("cartToggle");
  var cartClose = document.getElementById("cartClose");
  var cartItemsEl = document.getElementById("cartItems");
  var cartEmptyEl = document.getElementById("cartEmpty");
  var cartTotalEl = document.getElementById("cartTotal");
  var cartCountEl = document.getElementById("cartCount");
  var cartCheckout = document.getElementById("cartCheckout");
  var cartClear = document.getElementById("cartClear");

  // estado: { id: cantidad }
  var cart = loadCart();

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function cartCount() {
    var n = 0;
    for (var k in cart) n += cart[k];
    return n;
  }
  function cartTotal() {
    var t = 0;
    for (var k in cart) { if (PRODUCTS[k]) t += PRODUCTS[k].price * cart[k]; }
    return t;
  }

  function addToCart(id) {
    if (!PRODUCTS[id]) return;
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    showToast(PRODUCTS[id].name + " agregado al carrito");
    bumpCount();
  }
  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }
  function removeItem(id) {
    delete cart[id];
    saveCart();
    renderCart();
  }
  function clearCart() {
    cart = {};
    saveCart();
    renderCart();
  }

  function renderCart() {
    if (!cartItemsEl) return;
    var html = "";
    var keys = Object.keys(cart);
    keys.forEach(function (id) {
      var p = PRODUCTS[id];
      if (!p) return;
      var sub = p.price * cart[id];
      html +=
        '<div class="cart-item">' +
          '<img class="cart-item__img" src="' + p.img + '" alt="' + p.name + '">' +
          '<div>' +
            '<div class="cart-item__name">' + p.name + '</div>' +
            '<div class="cart-item__price">S/ ' + p.price + ' c/u</div>' +
            '<div class="cart-item__qty">' +
              '<button data-act="dec" data-id="' + id + '" aria-label="Quitar uno">−</button>' +
              '<span>' + cart[id] + '</span>' +
              '<button data-act="inc" data-id="' + id + '" aria-label="Agregar uno">+</button>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="cart-item__sub">S/ ' + sub + '</div>' +
            '<button class="cart-item__remove" data-act="rm" data-id="' + id + '">Quitar</button>' +
          '</div>' +
        '</div>';
    });
    cartItemsEl.innerHTML = html;

    var count = cartCount();
    var total = cartTotal();
    if (cartTotalEl) cartTotalEl.textContent = "S/ " + total;
    if (cartCountEl) {
      cartCountEl.textContent = count;
      cartCountEl.classList.toggle("show", count > 0);
    }
    if (cartEmptyEl) cartEmptyEl.style.display = count ? "none" : "block";
    if (cartCheckout) {
      cartCheckout.style.opacity = count ? "1" : ".5";
      cartCheckout.style.pointerEvents = count ? "auto" : "none";
      cartCheckout.href = buildWhatsAppLink();
    }
  }

  function buildWhatsAppLink() {
    var lines = ["Hola, quiero hacer este pedido:", ""];
    var total = 0;
    for (var id in cart) {
      var p = PRODUCTS[id];
      if (!p) continue;
      var sub = p.price * cart[id];
      total += sub;
      lines.push("• " + p.name + " x" + cart[id] + " — S/ " + sub);
    }
    lines.push("");
    lines.push("Total: S/ " + total);
    lines.push("");
    lines.push("Quisiera coordinar la compra y recibir orientación. ¡Gracias!");
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  /* abrir / cerrar drawer */
  function openCart() {
    if (cartEl) cartEl.classList.add("open");
    if (cartOverlay) cartOverlay.classList.add("open");
  }
  function closeCart() {
    if (cartEl) cartEl.classList.remove("open");
    if (cartOverlay) cartOverlay.classList.remove("open");
  }
  if (cartToggle) cartToggle.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
  if (cartClear) cartClear.addEventListener("click", clearCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });

  /* delegación: botón "Agregar al carrito" en cards, tabla y viewer */
  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".js-add");
    if (addBtn) {
      addToCart(addBtn.getAttribute("data-id"));
      openCart();
      return;
    }
  });

  /* delegación: controles dentro del carrito (+ / − / quitar) */
  if (cartItemsEl) {
    cartItemsEl.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-act]");
      if (!btn) return;
      var id = btn.getAttribute("data-id");
      var act = btn.getAttribute("data-act");
      if (act === "inc") changeQty(id, 1);
      else if (act === "dec") changeQty(id, -1);
      else if (act === "rm") removeItem(id);
    });
  }

  /* mini animación del contador */
  function bumpCount() {
    if (!cartCountEl) return;
    cartCountEl.style.transform = "scale(1.4)";
    setTimeout(function () { cartCountEl.style.transform = ""; }, 180);
  }

  /* toast */
  var toastEl;
  var toastTimer;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 1900);
  }

  renderCart(); // pinta el estado guardado al cargar

})();

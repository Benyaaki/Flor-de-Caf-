/* =====================================================================
   FLOR DE CAFÉ — interacciones y animaciones
   ===================================================================== */
(function () {
  "use strict";
  const STATIC = location.search.includes("static");
  const reduce = STATIC || window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  if (STATIC) document.documentElement.classList.add("flat");

  /* ---------- PRELOADER ---------- */
  const pre = $("#preloader");
  const preBar = $(".pre-bar span");
  if (preBar) {
    requestAnimationFrame(() => { preBar.style.transition = "width 1s ease"; preBar.style.width = "100%"; });
  }
  function hidePreloader() {
    if (pre) pre.classList.add("done");
    document.body.style.overflow = "";
    startHero();
  }

  /* ---------- LENIS smooth scroll ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
    window.lenis = lenis;
  }
  // dev-only: ?autoscroll=<fraction> scrolls after load (for screenshot verification)
  if (/autoscroll/.test(location.search)) {
    const f = parseFloat((location.search.match(/autoscroll=([\d.]+)/) || [])[1]) || 0.5;
    window.addEventListener("load", () => setTimeout(() => {
      const y = Math.round(innerHeight * f);
      window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
    }, 1900));
  }
  // anchor links -> lenis
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: -70 });
      else el.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = $(".cursor");
  if (cursor && window.matchMedia("(hover:hover)").matches) {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", e => {
      if (e.target.closest("[data-cursor],a,button,.tab")) cursor.classList.add("grow");
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest("[data-cursor],a,button,.tab")) cursor.classList.remove("grow");
    });
  }

  /* ---------- NAV show/hide + solid ---------- */
  const nav = $("#nav");
  let lastY = 0;
  function onScrollNav() {
    const y = window.scrollY;
    if (y > 30) nav.classList.add("expanded"); else nav.classList.remove("expanded");
  }
  onScrollNav();
  addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- RENDER CARTA ---------- */
  const tabsEl = $("#cartaTabs");
  const panelEl = $("#cartaPanel");
  const DATA = window.MENU || [];

  function priceHTML(p) { return `<span class="mp">${p}</span>`; }

  function renderCat(cat) {
    const rows = cat.items.map(it => `
      <div class="mrow">
        <div>
          <div class="mn">${it.n}</div>
          ${it.d ? `<div class="md">${it.d}</div>` : ""}
        </div>
        ${priceHTML(it.p)}
      </div>`).join("");

    const oldFig = $(".carta-fig");
    if (oldFig) oldFig.remove();

    panelEl.innerHTML = `
      <div class="panel-head">
        <div class="panel-kicker">${cat.kicker || ""}</div>
        <h3 class="panel-title">${cat.titulo}</h3>
        <div class="panel-count">${cat.items.length} ${cat.items.length === 1 ? "opción" : "opciones"}</div>
        ${cat.intro ? `<p class="panel-intro">"${cat.intro}"</p>` : ""}
      </div>
      <div class="menu-list">${rows}</div>
      ${cat.nota ? `<div style="text-align:center"><span class="menu-nota">${cat.nota}</span></div>` : ""}
    `;
    // animate rows in
    const mrows = $$(".mrow", panelEl);
    if (window.gsap && !reduce) {
      gsap.to(mrows, { opacity: 1, y: 0, duration: .5, stagger: .04, ease: "power2.out" });
    } else {
      mrows.forEach(r => { r.style.opacity = 1; r.style.transform = "none"; });
    }
  }
  function buildTabs() {
    DATA.forEach((cat, i) => {
      const b = document.createElement("button");
      b.className = "tab" + (i === 0 ? " active" : "");
      b.innerHTML = cat.tab + `<span class="cnt">${cat.items.length}</span>`;
      b.setAttribute("data-cursor", "");
      b.addEventListener("click", (e) => {
        $$(".tab", tabsEl).forEach(t => t.classList.remove("active"));
        b.classList.add("active");
        renderCat(cat);

        // Center tab horizontally in tab bar on mobile
        if (b.scrollIntoView) {
          b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }

        // Scroll page back to top of menu upon section change
        if (e && e.isTrusted) {
          const cartaEl = $("#carta");
          if (cartaEl) {
            const nav = $("#nav");
            const navH = nav ? nav.offsetHeight : 64;
            const targetY = window.pageYOffset + cartaEl.getBoundingClientRect().top - navH - 20;
            if (window.lenis) {
              window.lenis.scrollTo(Math.max(0, targetY), { duration: 0.6 });
            } else {
              window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
            }
          }
        }
      });
      tabsEl.appendChild(b);
    });
    // activate tab from #hash (e.g. carta.html#origenes) or default to first
    const hash = location.hash.replace("#", "");
    const idx = DATA.findIndex(c => c.id === hash);
    const tabs = $$(".tab", tabsEl);
    if (idx > 0 && tabs[idx]) tabs[idx].click();
    else if (DATA[0]) renderCat(DATA[0]);
  }
  if (tabsEl && DATA.length) buildTabs();

  /* ---------- CARTA PREVIEW (home) ---------- */
  const previewEl = $("#cartaPreview");
  function pick(catId, startsWith) {
    const c = DATA.find(x => x.id === catId);
    const it = c && c.items.find(i => i.n.startsWith(startsWith));
    return it ? { it, cat: c.tab } : null;
  }
  function renderPreview() {
    const sel = [
      ["calientes", "Latte"], ["frias", "Cold Brew"], ["origenes", "Bourbon Ají"],
      ["dulces", "Cheesecake"], ["salados", "Croissant"], ["sincafe", "Matcha Latte"]
    ].map(([c, n]) => pick(c, n)).filter(Boolean);
    previewEl.innerHTML = `<div class="menu-list">` + sel.map(({ it }) => `
      <div class="mrow">
        <div><div class="mn">${it.n}</div>${it.d ? `<div class="md">${it.d}</div>` : ""}</div>
        <span class="mp">${it.p}</span>
      </div>`).join("") + `</div>`;
    const rows = $$(".mrow", previewEl);
    if (window.gsap && !reduce) {
      gsap.to(rows, { opacity: 1, y: 0, duration: .55, stagger: .06, ease: "power2.out",
        scrollTrigger: { trigger: previewEl, start: "top 85%" } });
    } else rows.forEach(r => { r.style.opacity = 1; r.style.transform = "none"; });
    const total = DATA.reduce((s, c) => s + c.items.length, 0);
    const mc = $("#menuCount"); if (mc) mc.textContent = "+" + total;
  }
  if (previewEl && DATA.length) renderPreview();

  /* ---------- MOMENTOS gallery ---------- */
  const GALLERY = [
    { src: "assets/img/gallery/g0.png", t: "Dulce compañía", d: "Un café y su postre perfecto" },
    { src: "assets/img/gallery/g4.png", t: "Taller de acuarela", d: "Creatividad en cada pincelada" },
    { src: "assets/img/gallery/g3.png", t: "Primero lo dulce", d: "Repostería casera y café" },
    { src: "assets/img/gallery/g6.png", t: "Tentación dulce", d: "Un bocado irresistible" },
    { src: "assets/img/gallery/g1.png", t: "Mesa completa", d: "Café, sándwich y algo dulce" },
    { src: "assets/img/gallery/g5.png", t: "Juntos es mejor", d: "Momentos compartidos en comunidad" },
    { src: "assets/img/gallery/g7.png", t: "Sonrisa cafetera", d: "La felicidad en una taza" },
    { src: "assets/img/gallery/g2.png", t: "Rincón florido", d: "Flores frescas para llevar" }
  ];
  const track = $("#mTrack");
  if (track) {
    track.innerHTML = GALLERY.map((g, i) => `
      <figure class="m-card" data-src="${g.src}" data-cap="${g.t}">
        <img src="${g.src}" alt="${g.t}" draggable="false">
        <span class="m-num">${String(i + 1).padStart(2, "0")}</span>
        <div class="m-grad"></div>
        <figcaption class="m-cap"><h3>${g.t}</h3><p>${g.d}</p></figcaption>
      </figure>`).join("");

    const cards = $$(".m-card", track);
    // reveal
    if (window.gsap && !reduce) {
      gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: .7, stagger: .08, ease: "power3.out",
        scrollTrigger: { trigger: track, start: "top 85%" } });
    } else cards.forEach(c => { c.style.opacity = 1; c.style.transform = "none"; });

    // drag to scroll (pointer)
    const wrap = $("#mWrap");
    let down = false, startX = 0, startScroll = 0, moved = 0;
    wrap.addEventListener("pointerdown", e => {
      if (e.pointerType !== "mouse") return; // let touch scroll natively
      down = true; moved = 0; startX = e.clientX; startScroll = wrap.scrollLeft;
      wrap.classList.add("dragging"); wrap.setPointerCapture(e.pointerId);
    });
    wrap.addEventListener("pointermove", e => {
      if (!down) return;
      const dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx));
      wrap.scrollLeft = startScroll - dx;
    });
    const end = () => { down = false; wrap.classList.remove("dragging"); };
    wrap.addEventListener("pointerup", end);
    wrap.addEventListener("pointercancel", end);
    wrap.addEventListener("pointerleave", end);
    // wheel horizontal
    wrap.addEventListener("wheel", e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { wrap.scrollLeft += e.deltaY; e.preventDefault(); }
    }, { passive: false });

    // modal
    const modal = $("#mModal"), mImg = $("#mModalImg"), mCap = $("#mModalCap"), mClose = $("#mClose");
    function openModal(src, cap) {
      mImg.src = src; mImg.alt = cap; mCap.textContent = cap;
      modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    }
    function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
    cards.forEach(c => c.addEventListener("click", () => {
      if (moved > 6) return; // was a drag, not a click
      openModal(c.getAttribute("data-src"), c.getAttribute("data-cap"));
    }));
    mClose.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }

  /* ---------- GSAP ANIMATIONS ---------- */
  function startHero() {
    if (!window.gsap) return;
    if (reduce) { $$(".hero-title .line>span").forEach(s => s.style.transform = "none"); return; }
    gsap.registerPlugin(ScrollTrigger);

    // hero title lines
    gsap.to(".hero-title .line>span", {
      y: 0, duration: 1.1, ease: "power4.out", stagger: .12, delay: .15
    });
    gsap.to(".hero-copy .eyebrow,[data-reveal].hero-sub,.hero-actions", { /* handled below */ });
  }

  function initScroll() {
    if (!window.gsap || reduce) {
      $$("[data-reveal],[data-reveal-word]").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // generic reveals
    $$("[data-reveal]").forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    // word reveals (headlines)
    $$(".intro-lead, .carino-title").forEach(h => {
      const words = $$("[data-reveal-word]", h);
      gsap.to(words, {
        y: 0, opacity: 1, duration: .8, ease: "power3.out", stagger: .05,
        scrollTrigger: { trigger: h, start: "top 82%" }
      });
    });

    // parallax elements
    $$("[data-parallax]").forEach(el => {
      const amt = parseFloat(el.getAttribute("data-parallax")) || 40;
      gsap.to(el, {
        y: amt, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // marquee infinite
    const track = $(".marquee-track");
    if (track) {
      const half = track.scrollWidth / 2;
      gsap.to(track, { x: -half, duration: 22, ease: "none", repeat: -1 });
    }

    // section-title subtle rise
    $$(".section-title,.or-title,.cta-title,.panel-title").forEach(t => {
      gsap.from(t, {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: t, start: "top 88%" }
      });
    });
  }

  /* ---------- BOOT ---------- */
  window.addEventListener("load", () => {
    initScroll();
    setTimeout(hidePreloader, 650);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
  // safety: if load already fired
  if (document.readyState === "complete") {
    initScroll(); setTimeout(hidePreloader, 400);
  } else {
    document.body.style.overflow = "hidden";
  }
})();

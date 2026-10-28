(function () {
  var S = window.SITE || { lang: "uz", t: {}, projects: [] };
  var T = S.t;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>';
  var CHECK = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

  var hdr = $(".hdr");
  var fab = $(".fab");
  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle("is-stuck", y > 10);
    if (fab) fab.classList.toggle("is-on", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menu = $(".menu");
  $$("[data-menu-open]").forEach(function (b) { b.addEventListener("click", function () { menu.classList.add("is-open"); document.body.classList.add("is-locked"); }); });
  $$("[data-menu-close]").forEach(function (b) { b.addEventListener("click", closeMenu); });
  function closeMenu() { if (!menu) return; menu.classList.remove("is-open"); document.body.classList.remove("is-locked"); }
  $$(".menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  $$(".cs").forEach(function (cs) {
    var track = $(".cs-track", cs), dots = cs.parentNode.querySelector(".cs-dots");
    var n = track.children.length;
    if (dots) {
      dots.innerHTML = "";
      for (var i = 0; i < Math.min(n, 6); i++) dots.appendChild(document.createElement("i"));
      if (n < 2) dots.style.visibility = "hidden";
    }
    function idx() { return Math.round(track.scrollLeft / track.clientWidth); }
    function paint() { if (!dots) return; var k = idx(); $$("i", dots).forEach(function (d, j) { d.classList.toggle("is-on", j === k); }); }
    track.addEventListener("scroll", function () { window.requestAnimationFrame(paint); }, { passive: true });
    paint();
    var p = $(".cs-arr.p", cs), nx = $(".cs-arr.n", cs);
    function go(d) { var k = (idx() + d + n) % n; track.scrollTo({ left: k * track.clientWidth, behavior: "smooth" }); }
    if (p) p.addEventListener("click", function (e) { e.preventDefault(); go(-1); });
    if (nx) nx.addEventListener("click", function (e) { e.preventDefault(); go(1); });
    if (n < 2) { if (p) p.remove(); if (nx) nx.remove(); }
  });

  var cat = $("[data-catalog]");
  if (cat) {
    var st = { status: "all", district: "all", cls: "all" };
    var cards = $$(".pcard", cat);
    var count = $(".fcount");
    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var ok = (st.status === "all" || c.dataset.status === st.status) && (st.district === "all" || c.dataset.district === st.district) && (st.cls === "all" || c.dataset.cls === st.cls);
        c.classList.toggle("is-hidden", !ok);
        if (ok) shown++;
      });
      if (count) count.textContent = T.found + ": " + shown;
    }
    $$("[data-f-status]").forEach(function (b) {
      b.addEventListener("click", function () {
        $$("[data-f-status]").forEach(function (x) { x.classList.remove("is-on"); });
        b.classList.add("is-on"); st.status = b.dataset.fStatus; apply();
      });
    });
    var sd = $("[data-f-district]"), sc = $("[data-f-cls]");
    if (sd) sd.addEventListener("change", function () { st.district = sd.value; apply(); });
    if (sc) sc.addEventListener("change", function () { st.cls = sc.value; apply(); });
    apply();
  }

  $$("[data-tabs]").forEach(function (box) {
    var tabs = $$("[data-tab]", box), panes = $$("[data-pane]", box);
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.toggle("is-on", x === t); });
        panes.forEach(function (p) { p.classList.toggle("is-on", p.dataset.pane === t.dataset.tab); });
      });
    });
  });

  $$("[data-plans]").forEach(function (box) {
    var tabs = $$("[data-room]", box), cards = $$(".plan", box);
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.toggle("is-on", x === t); });
        cards.forEach(function (c) { c.classList.toggle("is-hidden", t.dataset.room !== "all" && c.dataset.room !== t.dataset.room); });
      });
    });
  });

  var lb = $(".lb"), lbImg = lb && $("img", lb), lbCap = lb && $(".c", lb), lbList = [], lbI = 0;
  function lbShow() { var it = lbList[lbI]; lbImg.src = it.src; lbImg.alt = it.alt; lbCap.textContent = (lbI + 1) + " / " + lbList.length + (it.alt ? "  ·  " + it.alt : ""); }
  $$("[data-zoom]").forEach(function (el) {
    el.addEventListener("click", function () {
      var group = el.closest("[data-zoom-group]") || document;
      lbList = $$("[data-zoom] img", group).map(function (i) { return { src: i.dataset.full || i.src, alt: i.alt }; });
      lbI = $$("[data-zoom]", group).indexOf(el);
      lbShow(); lb.classList.add("is-open"); document.body.classList.add("is-locked");
    });
  });
  if (lb) {
    $(".x", lb).addEventListener("click", lbClose);
    $(".p", lb).addEventListener("click", function () { lbI = (lbI - 1 + lbList.length) % lbList.length; lbShow(); });
    $(".n", lb).addEventListener("click", function () { lbI = (lbI + 1) % lbList.length; lbShow(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });
  }
  function lbClose() { lb.classList.remove("is-open"); document.body.classList.remove("is-locked"); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (lb && lb.classList.contains("is-open")) lbClose(); closeModal(); closeMenu(); }
    if (lb && lb.classList.contains("is-open")) { if (e.key === "ArrowLeft") $(".p", lb).click(); if (e.key === "ArrowRight") $(".n", lb).click(); }
  });

  function fmtPhone(v) {
    var d = v.replace(/\D/g, ""); if (d.indexOf("998") === 0) d = d.slice(3); d = d.slice(0, 9);
    var o = "+998"; if (d.length) o += " " + d.slice(0, 2); if (d.length > 2) o += " " + d.slice(2, 5); if (d.length > 5) o += " " + d.slice(5, 7); if (d.length > 7) o += " " + d.slice(7, 9);
    return o;
  }
  function digits(v) { var d = v.replace(/\D/g, ""); if (d.indexOf("998") === 0) d = d.slice(3); return d; }
  function utm() { var p = new URLSearchParams(location.search), o = {}; ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(function (k) { if (p.get(k)) o[k] = p.get(k); }); return o; }
  function chips(name, items, on) {
    return '<div class="chips" data-chips="' + name + '">' + items.map(function (it) { return '<button type="button" data-v="' + it[0] + '"' + (it[0] === on ? ' class="is-on"' : "") + ">" + it[1] + "</button>"; }).join("") + "</div>";
  }
  function formHTML(o) {
    var opts = '<option value="">' + T.f_project_any + "</option>" + S.projects.map(function (p) { return '<option value="' + p.slug + '"' + (p.slug === o.project ? " selected" : "") + ">" + p.name + "</option>"; }).join("");
    return (o.modal ? '<button type="button" class="modal-x" data-modal-close aria-label="' + T.close + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' : "") +
      '<form novalidate><h3>' + (o.title || T.f_title) + '</h3><p class="hint">' + (o.hint || T.f_hint) + "</p>" +
      '<div class="lf-row"><div><label class="l">' + T.f_name + '</label><input name="name" autocomplete="name" placeholder="' + T.f_name_ph + '"></div>' +
      '<div><label class="l">' + T.f_phone + '</label><input name="phone" type="tel" inputmode="numeric" autocomplete="tel" value="+998 " placeholder="+998 __ ___ __ __"></div></div>' +
      '<label class="l">' + T.f_project + '</label><select name="project">' + opts + "</select>" +
      '<label class="l">' + T.f_rooms + "</label>" + chips("rooms", [["1", "1"], ["2", "2"], ["3", "3"], ["4+", "4+"], ["?", T.f_unsure]], o.rooms || "") +
      '<label class="l">' + T.f_pay + "</label>" + chips("pay", [["full", T.f_pay_full], ["install", T.f_pay_inst], ["?", T.f_unsure]], "") +
      '<label class="l">' + T.f_way + "</label>" + chips("way", [["call", T.f_way_call], ["tg", "Telegram"], ["wa", "WhatsApp"]], "call") +
      '<input class="hp" name="website" tabindex="-1" autocomplete="off"><div class="err"></div>' +
      '<button class="sbtn full" type="submit"><span class="t">' + T.f_submit + '</span><span class="a">' + ARROW + "</span></button>" +
      '<p class="note">' + T.f_note + "</p>" + (o.apt ? '<input type="hidden" name="apt" value="' + o.apt + '">' : "") + "</form>";
  }
  function bind(root, o) {
    root.innerHTML = formHTML(o);
    var f = $("form", root), ph = $("[name=phone]", f), err = $(".err", f);
    ph.addEventListener("input", function () { ph.value = fmtPhone(ph.value); });
    $$("[data-chips]", f).forEach(function (g) {
      g.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        $$("button", g).forEach(function (x) { x.classList.toggle("is-on", x === b); });
      });
    });
    var mc = $("[data-modal-close]", root); if (mc) mc.addEventListener("click", closeModal);
    f.addEventListener("submit", function (e) {
      e.preventDefault(); err.textContent = "";
      var name = $("[name=name]", f).value.trim(), d = digits(ph.value);
      if (name.length < 2) { err.textContent = T.e_name; $("[name=name]", f).focus(); return; }
      if (!/^(9\d|8\d|7\d|33|20|55|50)\d{7}$/.test(d)) { err.textContent = T.e_phone; ph.focus(); return; }
      if ($("[name=website]", f).value) return;
      var pick = function (n) { var b = $('[data-chips="' + n + '"] .is-on', f); return b ? b.dataset.v : ""; };
      var data = { name: name, phone: "+998" + d, project: $("[name=project]", f).value, apt: ($("[name=apt]", f) || {}).value || "", rooms: pick("rooms"), pay: pick("pay"), way: pick("way"), page: location.pathname, lang: S.lang, utm: utm(), source: o.source || "", at: new Date().toISOString() };
      var btn = $(".sbtn", f); btn.disabled = true; $(".t", btn).textContent = T.f_sending;
      send(data).then(function () { done(root, name, o); }, function () { done(root, name, o); });
    });
  }
  var QK = "shohsaroy_queue";
  function queue(fn) { try { var q = JSON.parse(localStorage.getItem(QK) || "[]"); q = fn(q) || q; if (q.length) localStorage.setItem(QK, JSON.stringify(q.slice(-20))); else localStorage.removeItem(QK); } catch (e) {} }
  function post(data) {
    var ctl = "AbortController" in window ? new AbortController() : null;
    var tm = ctl && setTimeout(function () { ctl.abort(); }, 12000);
    return fetch(window.LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify(data), keepalive: true, signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (tm) clearTimeout(tm); if (r.status >= 500 || r.status === 429 || r.status === 0) throw new Error("http " + r.status); return r; });
  }
  function send(data) {
    if (window.fbq) { try { window.fbq("track", "Lead", { content_name: data.project || "Shohsaroy Uylari" }); } catch (e) {} }
    if (!window.LEAD_ENDPOINT) { queue(function (q) { q.push(data); return q; }); return Promise.resolve(); }
    return post(data).catch(function (e) { queue(function (q) { q.push(data); return q; }); throw e; });
  }
  function flush() {
    if (!window.LEAD_ENDPOINT) return;
    var q; try { q = JSON.parse(localStorage.getItem(QK) || "[]"); } catch (e) { return; }
    if (!q.length) return;
    localStorage.removeItem(QK);
    q.reduce(function (p, d) { return p.then(function () { return post(d).catch(function () { queue(function (x) { x.push(d); return x; }); }); }); }, Promise.resolve());
  }
  setTimeout(flush, 1500);
  function done(root, name, o) {
    root.innerHTML = (o.modal ? '<button type="button" class="modal-x" data-modal-close aria-label="' + T.close + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' : "") +
      '<div class="lf-done"><div class="ok">' + CHECK + "</div><h3>" + T.d_title.replace("{name}", name) + '</h3><p class="hint">' + T.d_text + '</p><p class="hint"><a href="https://t.me/ShohSaroy_Uylari" target="_blank" rel="noopener">' + T.d_tg + '</a></p><p class="hint"><a href="tel:+998555049999">+998 55 504 99 99</a></p></div>';
    var mc = $("[data-modal-close]", root); if (mc) mc.addEventListener("click", closeModal);
  }

  $$("[data-form-inline]").forEach(function (el) { bind(el, { project: el.dataset.project || "", source: "inline" }); });

  var modal = $(".modal"), mbox = modal && $(".lf", modal);
  function openModal(o) { bind(mbox, Object.assign({ modal: true }, o)); modal.classList.add("is-open"); document.body.classList.add("is-locked"); setTimeout(function () { var i = $("[name=name]", mbox); if (i) i.focus(); }, 60); }
  function closeModal() { if (!modal || !modal.classList.contains("is-open")) return; modal.classList.remove("is-open"); document.body.classList.remove("is-locked"); }
  if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lead]"); if (!b) return;
    e.preventDefault(); closeMenu();
    openModal({ project: b.dataset.project || "", apt: b.dataset.apt || "", rooms: b.dataset.rooms || "", title: b.dataset.title || "", hint: b.dataset.hint || "", source: b.dataset.lead || "button" });
  });

  $$("iframe[data-src]").forEach(function (f) {
    if (!("IntersectionObserver" in window)) { f.src = f.dataset.src; return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { f.src = f.dataset.src; io.disconnect(); } }); }, { rootMargin: "300px" });
    io.observe(f);
  });

  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    $$(".rv").forEach(function (el) { ro.observe(el); });
  } else { $$(".rv").forEach(function (el) { el.classList.add("is-in"); }); }
})();

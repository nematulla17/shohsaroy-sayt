(function () {
  var STEPS_UZ = [
    {
      key: "maqsad",
      title: "Xonadonni nima uchun olmoqchisiz?",
      hint: "Shunga qarab variant tanlaymiz",
      options: [
        { v: "yashash", t: "O'zim yashash uchun", d: "Oila uchun" },
        { v: "investitsiya", t: "Investitsiya", d: "Arzon olib, qimmat sotish" },
        { v: "ijara", t: "Ijaraga berish", d: "Barqaror daromad" },
        { v: "farzand", t: "Farzandim uchun", d: "Kelajakka sarmoya" }
      ]
    },
    {
      key: "xona",
      title: "Qancha xonali xonadon kerak?",
      hint: "26,6 m² dan 150 m² gacha",
      options: [
        { v: "studiya", t: "Studiya", d: "29,8 m² dan" },
        { v: "1", t: "1 xonali", d: "31,4 m² dan" },
        { v: "2", t: "2 xonali", d: "43,8 m² dan" },
        { v: "3", t: "3 xonali", d: "58,6 m² dan" },
        { v: "4+", t: "4+ xonali", d: "93 m² dan" }
      ]
    },
    {
      key: "byudjet",
      title: "Taxminiy byudjetingiz?",
      hint: "Taxminan bo'lsa ham bo'ladi",
      options: [
        { v: "<50k", t: "50 000 $ gacha", d: "Studiya va 1 xonali" },
        { v: "50-80k", t: "50 000 – 80 000 $", d: "1 va 2 xonali" },
        { v: "80-130k", t: "80 000 – 130 000 $", d: "2 va 3 xonali" },
        { v: "130k+", t: "130 000 $ dan yuqori", d: "Keng xonadonlar" }
      ]
    },
    {
      key: "tolov",
      title: "Qanday to'lov qulay?",
      hint: "48 oygacha foizsiz",
      options: [
        { v: "naqd", t: "To'liq to'lov", d: "Eng katta chegirma" },
        { v: "30-48", t: "30% + 48 oy", d: "Qolgani 48 oyga" },
        { v: "50-bolib", t: "50% + bo'lib to'lash", d: "Oylik summa kichikroq" },
        { v: "ipoteka", t: "Boshqa variant kerak", d: "Menejer bilan kelishasiz" }
      ]
    },
    {
      key: "muddat",
      title: "Qachon sotib olmoqchisiz?",
      hint: "Narx har bosqichda oshadi",
      options: [
        { v: "bu-oy", t: "Bu oy", d: "Joriy narx saqlanadi" },
        { v: "1-3", t: "1–3 oy ichida", d: "" },
        { v: "3-6", t: "3–6 oy ichida", d: "" },
        { v: "organish", t: "Hozircha o'rganyapman", d: "Narxlarni yuboramiz" }
      ]
    }
  ];

  var STEPS_RU = [
    {
      key: "maqsad",
      title: "Для чего вы покупаете квартиру?",
      hint: "Подберём варианты под цель",
      options: [
        { v: "yashash", t: "Для себя", d: "Для семьи" },
        { v: "investitsiya", t: "Инвестиция", d: "Купить дешевле, продать дороже" },
        { v: "ijara", t: "Сдавать в аренду", d: "Стабильный доход" },
        { v: "farzand", t: "Для детей", d: "Вложение в будущее" }
      ]
    },
    {
      key: "xona",
      title: "Сколько комнат нужно?",
      hint: "Площади от 26,6 до 150 м²",
      options: [
        { v: "studiya", t: "Студия", d: "от 29,8 м²" },
        { v: "1", t: "1-комнатная", d: "от 31,4 м²" },
        { v: "2", t: "2-комнатная", d: "от 43,8 м²" },
        { v: "3", t: "3-комнатная", d: "от 58,6 м²" },
        { v: "4+", t: "4 комнаты и больше", d: "от 93 м²" }
      ]
    },
    {
      key: "byudjet",
      title: "Примерный бюджет?",
      hint: "Можно примерно",
      options: [
        { v: "<50k", t: "До 50 000 $", d: "Студия и 1-комнатная" },
        { v: "50-80k", t: "50 000 – 80 000 $", d: "1- и 2-комнатные" },
        { v: "80-130k", t: "80 000 – 130 000 $", d: "2- и 3-комнатные" },
        { v: "130k+", t: "Более 130 000 $", d: "Просторные квартиры" }
      ]
    },
    {
      key: "tolov",
      title: "Как удобнее оплатить?",
      hint: "До 48 месяцев без процентов",
      options: [
        { v: "naqd", t: "Полная оплата", d: "Максимальная скидка" },
        { v: "30-48", t: "30% + 48 месяцев", d: "Остаток на 48 месяцев" },
        { v: "50-bolib", t: "50% + рассрочка", d: "Платёж меньше" },
        { v: "ipoteka", t: "Нужен другой вариант", d: "Обсудим с менеджером" }
      ]
    },
    {
      key: "muddat",
      title: "Когда планируете покупку?",
      hint: "Цена растёт с каждым этапом",
      options: [
        { v: "bu-oy", t: "В этом месяце", d: "Текущая цена сохранится" },
        { v: "1-3", t: "В течение 1–3 месяцев", d: "" },
        { v: "3-6", t: "В течение 3–6 месяцев", d: "" },
        { v: "organish", t: "Пока изучаю", d: "Пришлём цены" }
      ]
    }
  ];

  var T = {
    uz: { q: "savol", last: "Oxirgi qadam", back: "Orqaga", cTitle: "Kimga yuboraylik?", cHint: "15 daqiqada qo'ng'iroq qilamiz.", name: "Ismingiz", way: "Qanday bog'lanamiz?", call: "Qo'ng'iroq", time: "Qulay vaqt", submit: "Variantlarni olish", note: "Raqamingiz faqat aloqa uchun.", eName: "Ismingizni yozing", ePhone: "Telefon raqamini to'liq kiriting, masalan +998 90 123 45 67", sending: "Yuborilmoqda…", done: "Tayyor", thanks: "Rahmat, {n}.", doneText: "Ariza qabul qilindi. {w} oralig'ida qo'ng'iroq qilamiz.", tg: "Telegram kanal", urgent: "+998 55 504 99 99" },
    ru: { q: "вопрос", last: "Последний шаг", back: "Назад", cTitle: "Куда отправить?", cHint: "Перезвоним за 15 минут.", name: "Ваше имя", way: "Как с вами связаться?", call: "Звонок", time: "Удобное время", submit: "Получить варианты", note: "Номер нужен только для связи.", eName: "Укажите имя", ePhone: "Введите номер полностью, например +998 90 123 45 67", sending: "Отправляем…", done: "Готово", thanks: "Спасибо, {n}.", doneText: "Заявка принята. Позвоним с {w}.", tg: "Telegram-канал", urgent: "+998 55 504 99 99" }
  };

  var SCORE = {
    maqsad: { yashash: 3, investitsiya: 3, ijara: 2, farzand: 2 },
    byudjet: { "<50k": 2, "50-80k": 3, "80-130k": 3, "130k+": 3 },
    tolov: { naqd: 4, "30-48": 3, "50-bolib": 3, ipoteka: 1 },
    muddat: { "bu-oy": 4, "1-3": 3, "3-6": 2, organish: 1 }
  };

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function utm() {
    var p = new URLSearchParams(location.search);
    var o = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(function (k) {
      if (p.get(k)) o[k] = p.get(k);
    });
    return o;
  }

  function formatPhone(digits) {
    var d = digits.replace(/\D/g, "");
    if (d.indexOf("998") === 0) d = d.slice(3);
    d = d.slice(0, 9);
    var out = "+998";
    if (d.length) out += " " + d.slice(0, 2);
    if (d.length > 2) out += " " + d.slice(2, 5);
    if (d.length > 5) out += " " + d.slice(5, 7);
    if (d.length > 7) out += " " + d.slice(7, 9);
    return out;
  }

  function digitsOf(v) {
    var d = v.replace(/\D/g, "");
    if (d.indexOf("998") === 0) d = d.slice(3);
    return d;
  }

  function mount(root) {
    var lang = ((root.closest("[lang]") || document.documentElement).getAttribute("lang") || "uz").toLowerCase().indexOf("ru") === 0 ? "ru" : "uz";
    var STEPS = lang === "ru" ? STEPS_RU : STEPS_UZ, L = T[lang];
    var data = { utm: utm(), page: location.pathname, sahifa: document.title, dizayn: root.getAttribute("data-design") || "", lang: lang };
    var step = 0;
    var compact = root.hasAttribute("data-compact");

    root.innerHTML = "";
    var head = el("div", "lf-head");
    var progress = el("div", "lf-progress");
    var bar = el("div", "lf-bar");
    progress.appendChild(bar);
    var counter = el("div", "lf-counter");
    head.appendChild(counter);
    head.appendChild(progress);
    root.appendChild(head);
    var body = el("div", "lf-body");
    root.appendChild(body);

    function setProgress() {
      var total = STEPS.length + 1;
      var pct = Math.round(((step) / total) * 100);
      bar.style.width = Math.max(pct, 6) + "%";
      counter.textContent = step < STEPS.length ? (step + 1) + " / " + total + " " + L.q : L.last;
    }

    function renderStep() {
      body.innerHTML = "";
      setProgress();
      if (step < STEPS.length) {
        var s = STEPS[step];
        body.appendChild(el("h3", "lf-title", s.title));
        if (s.hint) body.appendChild(el("p", "lf-hint", s.hint));
        var grid = el("div", "lf-options" + (compact ? " lf-options-compact" : ""));
        s.options.forEach(function (o) {
          var b = el("button", "lf-opt", "");
          b.type = "button";
          var t = el("span", "lf-opt-t", o.t);
          b.appendChild(t);
          if (o.d) b.appendChild(el("span", "lf-opt-d", o.d));
          if (data[s.key] === o.v) b.classList.add("is-on");
          b.addEventListener("click", function () {
            data[s.key] = o.v;
            data[s.key + "_matn"] = o.t;
            step++;
            renderStep();
          });
          grid.appendChild(b);
        });
        body.appendChild(grid);
        if (step > 0) {
          var back = el("button", "lf-back", L.back);
          back.type = "button";
          back.addEventListener("click", function () { step--; renderStep(); });
          body.appendChild(back);
        }
      } else {
        renderContact();
      }
    }

    function renderContact() {
      body.appendChild(el("h3", "lf-title", L.cTitle));
      body.appendChild(el("p", "lf-hint", L.cHint));
      var form = el("form", "lf-form");
      form.setAttribute("novalidate", "");

      var fName = el("div", "lf-field");
      var name = el("input", "lf-input");
      name.type = "text"; name.name = "ism"; name.placeholder = L.name; name.autocomplete = "name";
      fName.appendChild(name);
      form.appendChild(fName);

      var fPhone = el("div", "lf-field");
      var phone = el("input", "lf-input");
      phone.type = "tel"; phone.name = "telefon"; phone.placeholder = "+998 __ ___ __ __"; phone.autocomplete = "tel"; phone.inputMode = "numeric";
      phone.value = "+998 ";
      phone.addEventListener("input", function () { phone.value = formatPhone(phone.value); });
      phone.addEventListener("focus", function () { if (!phone.value) phone.value = "+998 "; });
      fPhone.appendChild(phone);
      form.appendChild(fPhone);

      var fWay = el("div", "lf-field");
      fWay.appendChild(el("label", "lf-label", L.way));
      var ways = el("div", "lf-chips");
      [["qongiroq", L.call], ["telegram", "Telegram"], ["whatsapp", "WhatsApp"]].forEach(function (w, i) {
        var c = el("button", "lf-chip" + (i === 0 ? " is-on" : ""), w[1]);
        c.type = "button";
        c.addEventListener("click", function () {
          Array.prototype.forEach.call(ways.children, function (x) { x.classList.remove("is-on"); });
          c.classList.add("is-on");
          data.aloqa = w[0];
        });
        ways.appendChild(c);
      });
      data.aloqa = "qongiroq";
      fWay.appendChild(ways);
      form.appendChild(fWay);

      var fTime = el("div", "lf-field");
      fTime.appendChild(el("label", "lf-label", L.time));
      var times = el("div", "lf-chips");
      [["09-13", "9:00–13:00"], ["13-17", "13:00–17:00"], ["17-19", "17:00–19:00"]].forEach(function (w, i) {
        var c = el("button", "lf-chip" + (i === 0 ? " is-on" : ""), w[1]);
        c.type = "button";
        c.addEventListener("click", function () {
          Array.prototype.forEach.call(times.children, function (x) { x.classList.remove("is-on"); });
          c.classList.add("is-on");
          data.vaqt = w[0];
        });
        times.appendChild(c);
      });
      data.vaqt = "09-13";
      fTime.appendChild(times);
      form.appendChild(fTime);

      var hp = el("input", "lf-hp");
      hp.type = "text"; hp.name = "website"; hp.tabIndex = -1; hp.autocomplete = "off";
      form.appendChild(hp);

      var err = el("div", "lf-error", "");
      form.appendChild(err);

      var submit = el("button", "lf-submit", "<span>" + L.submit + "</span>" + arrow());
      submit.type = "submit";
      form.appendChild(submit);
      form.appendChild(el("p", "lf-note", L.note));

      var back = el("button", "lf-back", L.back);
      back.type = "button";
      back.addEventListener("click", function () { step--; renderStep(); });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        err.textContent = "";
        var n = name.value.trim();
        var d = digitsOf(phone.value);
        if (n.length < 2) { err.textContent = L.eName; name.focus(); return; }
        if (d.length !== 9 || !/^(9\d|8\d|7\d|33|20|55|50)\d{7}$/.test(d)) { err.textContent = L.ePhone; phone.focus(); return; }
        if (hp.value) return;
        data.ism = n;
        data.telefon = "+998" + d;
        data.ball = score();
        data.daraja = data.ball >= 12 ? "issiq" : data.ball >= 8 ? "iliq" : "sovuq";
        data.vaqt_yuborildi = new Date().toISOString();
        if (typeof window.leadMeta === "function") { try { var m = window.leadMeta(); for (var k in m) data[k] = m[k]; } catch (e) {} }
        submit.disabled = true;
        submit.innerHTML = "<span>" + L.sending + "</span>";
        send(data).then(function () { renderDone(n); }).catch(function () { renderDone(n); });
      });

      body.appendChild(form);
      body.appendChild(back);
      setTimeout(function () { name.focus(); }, 50);
    }

    function score() {
      var s = 0;
      Object.keys(SCORE).forEach(function (k) { s += (SCORE[k][data[k]] || 0); });
      return s;
    }

    function renderDone(n) {
      body.innerHTML = "";
      bar.style.width = "100%";
      counter.textContent = L.done;
      var box = el("div", "lf-done");
      box.appendChild(el("div", "lf-done-icon", check()));
      box.appendChild(el("h3", "lf-title", L.thanks.replace("{n}", n)));
      var when = data.vaqt === "09-13" ? "9:00–13:00" : data.vaqt === "13-17" ? "13:00–17:00" : "17:00–19:00";
      box.appendChild(el("p", "lf-hint", L.doneText.replace("{w}", lang === "ru" ? when.replace("–", " до ") : when)));
      if (typeof window.leadDoneNote === "function") { var dn = window.leadDoneNote(data); if (dn) { var pn = el("p", "lf-promo", dn); box.appendChild(pn); } }
      var links = el("div", "lf-done-links");
      var tg = el("a", "lf-link", L.tg);
      tg.href = "https://t.me/shohsaroytowers"; tg.target = "_blank"; tg.rel = "noopener";
      var call = el("a", "lf-link", L.urgent);
      call.href = "tel:+998555049999";
      links.appendChild(tg); links.appendChild(call);
      box.appendChild(links);
      body.appendChild(box);
      root.dispatchEvent(new CustomEvent("lead:sent", { detail: data, bubbles: true }));
      if (window.fbq) { try { window.fbq("track", "Lead", { content_name: "Shohsaroy Towers", value: data.ball, currency: "USD" }); } catch (e) {} }
    }

    renderStep();
  }

  var QK = "shohsaroy_queue";
  function queue(d) { try { var q = JSON.parse(localStorage.getItem(QK) || "[]"); q.push(d); localStorage.setItem(QK, JSON.stringify(q.slice(-20))); } catch (e) {} }
  function post(data) {
    var ctl = "AbortController" in window ? new AbortController() : null;
    var tm = ctl && setTimeout(function () { ctl.abort(); }, 12000);
    return fetch(window.LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify(data), keepalive: true, signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (tm) clearTimeout(tm); if (r.status >= 500 || r.status === 429) throw new Error("http " + r.status); return r; });
  }
  function send(data) {
    if (!window.LEAD_ENDPOINT) { queue(data); return Promise.resolve(); }
    return post(data).catch(function (e) { queue(data); throw e; });
  }
  function flush() {
    if (!window.LEAD_ENDPOINT) return;
    var q; try { q = JSON.parse(localStorage.getItem(QK) || "[]"); } catch (e) { return; }
    if (!q.length) return;
    localStorage.removeItem(QK);
    q.reduce(function (p, d) { return p.then(function () { return post(d).catch(function () { queue(d); }); }); }, Promise.resolve());
  }
  setTimeout(flush, 1500);

  function arrow() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
  }
  function check() {
    return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
  }

  function init() {
    var roots = document.querySelectorAll("[data-lead-form]");
    Array.prototype.forEach.call(roots, mount);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.ShohsaroyLead = { mount: mount, steps: STEPS_UZ, stepsRu: STEPS_RU };
})();

/* AlterLabs lead capture — no dependencies, no framework.

   Design rule: never lose a lead. If the endpoint is unset or unreachable the
   submission is queued in localStorage, retried on every subsequent page load,
   and the WhatsApp button is pre-filled with the same details so the visitor
   always has a working path in front of them. */
(function () {
  "use strict";
  var CFG  = window.ALTERLABS_CONFIG || {};
  var QKEY  = "al_lead_queue";
  var form  = document.getElementById("leadForm");
  var WA    = CFG.WHATSAPP || "916206108923";

  /* every WhatsApp link on the page gets the configured number */
  document.querySelectorAll("a.js-wa").forEach(function (a) {
    try {
      var u = new URL(a.href);
      u.pathname = "/" + WA;
      a.href = u.toString();
      a.target = "_blank";
    } catch (e) { /* keep the static href */ }
  });

  function readQueue() {
    try { return JSON.parse(localStorage.getItem(QKEY)) || []; } catch (e) { return []; }
  }
  function writeQueue(q) {
    try { localStorage.setItem(QKEY, JSON.stringify(q)); } catch (e) { /* full/blocked */ }
  }
  /* plain-string body keeps this a simple CORS request — no preflight, which
     Apps Script web apps do not answer */
  function send(payload) {
    return fetch(CFG.FORM_ENDPOINT, { method: "POST", body: JSON.stringify(payload) })
      .then(function (r) { if (!r.ok) throw new Error("status " + r.status); });
  }
  function flushQueue() {
    if (!CFG.FORM_ENDPOINT) return;
    var q = readQueue();
    if (!q.length) return;
    send(q[0]).then(function () { q.shift(); writeQueue(q); flushQueue(); })
              .catch(function () { /* try again next load */ });
  }
  flushQueue();

  if (!form) return;

  var statusEl = document.getElementById("leadStatus");
  var waBtn    = document.getElementById("leadWa");

  /* CTAs arrive as fit-call/?p=website — preselect what they clicked so the
     visitor doesn't re-answer a question they already answered */
  var want = new URLSearchParams(location.search).get("p");
  if (want && form.elements.need) {
    var sel = form.elements.need;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === want) { sel.selectedIndex = i; break; }
    }
  }

  function normalizePhone(raw) {
    var d = String(raw || "").replace(/\D/g, "");
    if (d.length === 12 && d.indexOf("91") === 0) d = d.slice(2);
    if (d.length === 11 && d.charAt(0) === "0")   d = d.slice(1);
    return d;
  }
  function phoneValid(raw) {
    var d = normalizePhone(raw);
    return d.length === 10 && /^[6-9]/.test(d);
  }
  function mark(el, bad) {
    var f = el.closest(".field");
    if (f) f.classList.toggle("invalid", !!bad);
    if (bad) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
  }
  form.querySelectorAll("input,select,textarea").forEach(function (el) {
    el.addEventListener("input", function () { mark(el, false); });
  });

  function validate() {
    var ok = true, first = null;
    ["name", "business"].forEach(function (n) {
      var el = form.elements[n], bad = !el.value.trim();
      mark(el, bad); if (bad) { ok = false; first = first || el; }
    });
    var ph = form.elements.phone, badPh = !phoneValid(ph.value);
    mark(ph, badPh); if (badPh) { ok = false; first = first || ph; }
    var nd = form.elements.need, badNd = !nd.value;
    mark(nd, badNd); if (badNd) { ok = false; first = first || nd; }
    if (first) first.focus();
    return ok;
  }

  function show(kind, msg) {
    if (!statusEl) return;
    statusEl.className = "form-status " + kind;
    statusEl.textContent = msg;
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!validate()) return;

    var params = new URLSearchParams(location.search);
    var payload = {
      timestamp: new Date().toISOString(),
      name:      form.elements.name.value.trim(),
      business:  form.elements.business.value.trim(),
      phone:     normalizePhone(form.elements.phone.value),
      city:      (form.elements.city && form.elements.city.value.trim()) || "",
      need:      form.elements.need.value,
      message:   (form.elements.message && form.elements.message.value.trim()) || "",
      product:   params.get("p") || "",
      source:    form.getAttribute("data-source") || location.pathname,
      status:    "new"
    };

    /* pre-fill WhatsApp with the same details, whatever happens next */
    if (waBtn) {
      try {
        var u = new URL(waBtn.href);
        u.searchParams.set("text",
          "Hi AlterLabs! " + payload.name + " from " + payload.business +
          " — " + payload.need + ". Phone " + payload.phone + ". [via alterlabs.in]");
        waBtn.href = u.toString();
      } catch (e) { /* keep generic prefill */ }
    }

    var okMsg = "Got it, " + payload.name.split(" ")[0] +
      ". We'll message you on WhatsApp within one business day to fix your Fit Call time.";
    var queuedMsg = "Saved — it will reach us automatically. Want a reply now? " +
      "Tap WhatsApp below, your details are already filled in.";

    function queueIt() {
      var q = readQueue(); q.push(payload); writeQueue(q);
      show("info", queuedMsg);
      form.reset();
    }

    if (CFG.FORM_ENDPOINT) {
      send(payload).then(function () { show("ok", okMsg); form.reset(); }).catch(queueIt);
    } else {
      queueIt();
    }
  });
})();

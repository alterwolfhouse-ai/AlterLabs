(function () {
  const input = document.querySelector("#bns-business-input");
  const run = document.querySelector("#bns-run-builder");
  const reset = document.querySelector("#bns-reset-builder");
  const chat = document.querySelector("#bns-chat-window");
  const lanes = Array.from(document.querySelectorAll(".bns-lane"));
  const preview = document.querySelector("#bns-preview-screen");
  const tabs = Array.from(document.querySelectorAll(".bns-preview-tabs button"));

  if (!input || !run || !reset || !chat || !preview) return;

  const initialPreview = preview.innerHTML;
  const initialChat = chat.innerHTML;
  const initialLaneStates = lanes.map((lane) => lane.querySelector("span")?.textContent || "");

  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);

  function inferBusiness(raw) {
    const text = raw.toLowerCase();
    if (text.includes("infratech") || text.includes("build") || text.includes("construction")) {
      return {
        label: "core infratech business",
        headline: "Build from scratch. Collaborate with confidence.",
        offers: ["Build", "Collaborate", "Transact", "Finish"],
        crm: ["Build enquiry", "Collaboration lead", "Buyer", "Seller", "Renovation"],
        content: ["how we build from scratch", "collaboration project checklist", "site execution updates"]
      };
    }
    if (text.includes("interior") || text.includes("renovation")) {
      return {
        label: "interior and renovation business",
        headline: "Turn spaces into trustable, lead-ready proof.",
        offers: ["Design", "Renovate", "Stage", "Maintain"],
        crm: ["Design enquiry", "Site visit", "Estimate sent", "Production", "Handover"],
        content: ["before after proof", "budget guides", "material decision posts"]
      };
    }
    return {
      label: "service business",
      headline: "Make the business visible, measurable and follow-up ready.",
      offers: ["Website", "Content", "CRM", "Automation"],
      crm: ["New lead", "Qualified", "Follow-up", "Won", "Lost"],
      content: ["buyer guide", "service explainer", "pricing clarity post"]
    };
  }

  const initialData = inferBusiness(input.value || "service business");
  let currentData = initialData;

  function setActiveTab(kind) {
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.preview === kind));
    setPreview(kind, currentData);
  }

  function message(role, title, text) {
    const div = document.createElement("div");
    div.className = `bns-message ${role}`;
    div.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  function setPreview(kind, data) {
    const offers = data.offers.map((item) => `<b>${escapeHtml(item)}</b>`).join("");
    const crm = data.crm.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const content = data.content.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    const screens = {
      website: `<div class="mini-browser"><div class="mini-browser-top"><i></i><i></i><i></i><span>preview.alterlabs.in</span></div><div class="mini-hero"><p>${escapeHtml(data.label)}</p><h4>${escapeHtml(data.headline)}</h4><span>Website, identity, CRM and content system in progress.</span></div><div class="mini-cards">${offers}</div></div>`,
      brand: `<div class="bns-output-document"><span>Brand identity draft</span><h4>${escapeHtml(data.headline)}</h4><p>Voice: direct, reliable, execution-first. Promise: raw business intent becomes visible offers, assets, pages and operating systems.</p><div class="mini-cards">${offers}</div></div>`,
      content: `<div class="bns-output-document"><span>Content generation queue</span><h4>Search and social topics</h4><ul>${content}</ul><p>Next: generate landing page copy, proof posts, search snippets and buyer education content.</p></div>`,
      crm: `<div class="bns-output-document"><span>CRM structure</span><h4>Lead labels and stages</h4><ul>${crm}</ul><p>Every lead should keep source, intent, owner, stage and dated next action.</p></div>`,
      indexing: `<div class="bns-output-document"><span>Digital identity and indexing</span><h4>Public surface checklist</h4><ul><li>Canonical service pages</li><li>Search Console sitemap</li><li>Google Business Profile cleanup</li><li>Social profile consistency</li><li>Schema and metadata</li></ul></div>`
    };
    preview.innerHTML = screens[kind] || screens.website;
  }

  function runBuilder() {
    const raw = input.value.trim();
    if (!raw) {
      message("agent", "AlterLabs BNS", "Describe the business first. The builder needs raw context before execution.");
      return;
    }

    const data = inferBusiness(raw);
    currentData = data;
    message("user", "Founder", raw);
    message("agent", "Execution response", `Identified ${data.label}. Parallel work queue created for brand identity, website preview, content generation, digital identity, indexing, CRM and documentation.`);

    lanes.forEach((lane, index) => {
      const state = lane.querySelector("span");
      lane.classList.add("is-running");
      if (state) state.textContent = index < 2 ? "preview ready" : index < 4 ? "drafting" : "queued";
    });

    setActiveTab("website");
  }

  function resetBuilder() {
    currentData = initialData;
    chat.innerHTML = initialChat;
    preview.innerHTML = initialPreview;
    lanes.forEach((lane, index) => {
      lane.classList.remove("is-running");
      const state = lane.querySelector("span");
      if (state) state.textContent = initialLaneStates[index] || "queued";
    });
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.preview === "website"));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.preview || "website"));
  });
  run.addEventListener("click", runBuilder);
  reset.addEventListener("click", resetBuilder);
})();

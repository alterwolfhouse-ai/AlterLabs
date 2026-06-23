import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = "https://alterlabs.in";
const modified = "2026-06-23";
const phone = "tel:+918826436093";
const whatsappBase = "https://wa.me/918826436093";
const whatsapp = `${whatsappBase}?text=Hi%20AlterLabs%2C%20I%20want%20a%20system%20audit%20for%20my%20business`;

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function publicHtmlFiles(directory = root) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "_source", "node_modules"].includes(entry.name)) return [];
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return publicHtmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

function injectAnalyticsScripts() {
  for (const file of publicHtmlFiles()) {
    let html = fs.readFileSync(file, "utf8");
    if (!html.includes("/analytics-events.js")) {
      html = html.replace("</body>", "  <script defer src=\"/analytics-events.js\"></script>\n</body>");
    }
    if (!html.includes("/site-ui.js")) {
      html = html.replace("</body>", "  <script defer src=\"/site-ui.js\"></script>\n</body>");
    }
    fs.writeFileSync(file, html, "utf8");
  }
}

function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

function pageSchema(page, url) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": page.schemaType || "WebPage",
        "@id": `${url}#primary`,
        name: page.h1,
        headline: page.h1,
        description: page.description,
        url,
        datePublished: modified,
        dateModified: modified,
        publisher: { "@type": "Organization", name: "AlterLabs", url: `${site}/` },
        provider: { "@type": "Organization", name: "AlterLabs", url: `${site}/` },
        areaServed: { "@type": "Country", name: "India" }
      },
      breadcrumbSchema([
        { name: "Home", url: `${site}/` },
        { name: page.group, url: `${site}/${page.dir}/` },
        { name: page.h1, url }
      ])
    ]
  };
}

function topbar(label = "System page navigation") {
  return `<header class="service-topbar">
    <a href="/" class="service-brand" aria-label="AlterLabs home"><span>AL</span><strong>AlterLabs</strong></a>
    <nav aria-label="${escapeHtml(label)}">
      <a href="/audit/system-audit.html">Audit</a>
      <a href="/proof/">Proof</a>
      <a href="/industries/interior-design-crm-website.html">Industries</a>
      <a href="/insights/">Insights</a>
      <a href="${whatsapp}" data-analytics-event="whatsapp_click">Talk to us</a>
    </nav>
  </header>`;
}

function layout(page, body) {
  const url = `${site}/${page.dir}/${page.file}`;
  const schema = pageSchema(page, url);
  return `<!doctype html>
<html lang="en-IN" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#08040f">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.h1)} | AlterLabs">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${url}">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="service-page-body">
  <a class="skip-link-static" href="#main-content">Skip to main content</a>
  ${topbar(page.navLabel)}
  ${body}
  <script defer src="/analytics-events.js"></script>
  <script defer src="/site-ui.js"></script>
</body>
</html>`;
}

function hero(page, visual = "") {
  return `<main id="main-content" class="service-page">
    <a class="article-back" href="/">&larr; Back to AlterLabs</a>
    <div class="service-hero-grid audit-hero-grid">
      <div>
        <p class="article-kicker">${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="article-summary">${escapeHtml(page.summary)}</p>
        <div class="service-actions">
          <a class="btn primary" href="/audit/system-audit.html" data-analytics-event="audit_page_click">Start audit</a>
          <a class="btn ghost" href="${phone}" data-analytics-event="call_click">Call +91 88264 36093</a>
        </div>
      </div>
      ${visual}
    </div>`;
}

function processVisual(steps) {
  return `<div class="system-map" aria-label="${escapeHtml(steps.join(" to "))}">
    ${steps.map((step, index) => `<div class="system-map-step"><b>${String(index + 1).padStart(2, "0")}</b><span>${escapeHtml(step)}</span></div>`).join("")}
  </div>`;
}

function cards(items, className = "page-card-grid") {
  return `<div class="${className}">${items.map((item) => `<article class="page-card">
    <span>${escapeHtml(item.kicker)}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.body)}</p>
  </article>`).join("")}</div>`;
}

function links(items) {
  return `<div class="related-links">${items.map(([label, href]) => `<a href="${href}">${escapeHtml(label)} <span aria-hidden="true">&rarr;</span></a>`).join("")}</div>`;
}

const auditPage = {
  dir: "audit",
  file: "system-audit.html",
  group: "Audit",
  title: "Business System Audit for CRM, Websites and Automation | AlterLabs",
  h1: "Find the leak before buying another tool",
  eyebrow: "Business system audit",
  summary: "Use this diagnostic to show AlterLabs where enquiries, follow-up, data or reporting are breaking. The form opens a structured WhatsApp brief, so you keep control of what is sent.",
  description: "A structured AlterLabs audit page for service businesses to diagnose CRM, website, automation, dashboard and lead follow-up gaps before scoping a build.",
  navLabel: "Audit navigation"
};

function renderAuditPage() {
  const body = `${hero(auditPage, processVisual(["Lead source", "Current tool", "Leak", "Priority", "Scope"]))}
    <article class="article-body service-article">
      <section class="audit-panel">
        <p class="article-kicker">Static diagnostic</p>
        <h2>Send a clear audit brief on WhatsApp</h2>
        <p>There is no hidden backend form here. When you submit, the page prepares a WhatsApp message with your answers so the first conversation starts with useful context.</p>
        <form id="system-audit-form" class="audit-form" data-analytics-event="audit_form_submit">
          <div class="form-grid">
            <label class="form-field">Lead sources
              <select name="leadSources" required>
                <option value="">Choose the closest match</option>
                <option>Website + WhatsApp</option>
                <option>Meta or Google ads</option>
                <option>Referrals and calls</option>
                <option>Walk-ins or local enquiries</option>
                <option>Mixed sources</option>
              </select>
            </label>
            <label class="form-field">Business type
              <select name="businessType" required>
                <option value="">Choose business type</option>
                <option>Interior, furniture or home service</option>
                <option>Real estate or property</option>
                <option>Coaching, consulting or education</option>
                <option>Local service business</option>
                <option>B2B service company</option>
              </select>
            </label>
            <label class="form-field">Current tool
              <select name="currentTool" required>
                <option value="">Where records live now</option>
                <option>Spreadsheet</option>
                <option>CRM</option>
                <option>WhatsApp inbox</option>
                <option>Email inbox</option>
                <option>No stable system</option>
              </select>
            </label>
            <label class="form-field">Biggest leak
              <select name="biggestLeak" required>
                <option value="">Choose the issue</option>
                <option>Leads are missed or not assigned</option>
                <option>Follow-up is late</option>
                <option>Website is not converting</option>
                <option>Data is messy or duplicated</option>
                <option>Reporting cannot be trusted</option>
              </select>
            </label>
            <label class="form-field">Urgency
              <select name="urgency" required>
                <option value="">Choose timeline</option>
                <option>This week</option>
                <option>This month</option>
                <option>Planning for next quarter</option>
              </select>
            </label>
            <label class="form-field">Budget range
              <select name="budget" required>
                <option value="">Choose range</option>
                <option>Rs 2,999 - Rs 7,500 entry website/content work</option>
                <option>Rs 7,500 - Rs 25,000 website + lead system</option>
                <option>Rs 25,000+ CRM, dashboard or automation scope</option>
                <option>Need help deciding</option>
              </select>
            </label>
            <label class="form-field">Name
              <input name="name" autocomplete="name" required placeholder="Your name">
            </label>
            <label class="form-field">Phone or email
              <input name="contact" autocomplete="email" required placeholder="Phone, WhatsApp or email">
            </label>
            <label class="form-field form-field-wide">Notes
              <textarea name="notes" rows="5" placeholder="Example: leads come from Instagram, staff reply from personal WhatsApp, owner checks a sheet at night."></textarea>
            </label>
          </div>
          <div class="audit-output-note">
            <p>Best input: one real missed lead, one current sheet or CRM stage list, and the decision you wish you could see every day.</p>
            <button class="btn primary" type="submit">Send audit brief on WhatsApp</button>
          </div>
        </form>
      </section>

      <section>
        <h2>What AlterLabs checks first</h2>
        ${cards([
          { kicker: "01", title: "Capture", body: "Where every enquiry enters, whether source context survives, and whether duplicate contacts are created." },
          { kicker: "02", title: "Ownership", body: "Who owns the next action, how quickly ownership is assigned, and what happens when nobody responds." },
          { kicker: "03", title: "Visibility", body: "Which records show overdue work, stale pipeline, broken handoffs and data that cannot be trusted." },
          { kicker: "04", title: "Automation fit", body: "Which steps are safe to automate now, which need human review, and which need simpler rules first." }
        ])}
      </section>

      <section class="service-proof-band">
        <p class="article-kicker">Recommended after audit</p>
        <h2>A useful first release, not a giant rebuild</h2>
        <p>The output should be a small, testable next step: a lead capture repair, CRM cleanup, WhatsApp follow-up path, operating dashboard, website conversion update or workflow automation pilot.</p>
      </section>

      <section>
        <h2>Continue from the audit</h2>
        ${links([
          ["Proof signals before you decide", "/proof/"],
          ["CRM automation services", "/services/crm-automation-india.html"],
          ["Workflow automation with human review", "/systems/ai-workflow-automation-human-review.html"],
          ["Insights library", "/insights/"]
        ])}
      </section>
    </article>
  </main>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      var form = document.getElementById("system-audit-form");
      if (!form) return;
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var data = new FormData(form);
        var lines = [
          "Hi AlterLabs, I want a system audit.",
          "Name: " + (data.get("name") || ""),
          "Contact: " + (data.get("contact") || ""),
          "Business type: " + (data.get("businessType") || ""),
          "Lead sources: " + (data.get("leadSources") || ""),
          "Current tool: " + (data.get("currentTool") || ""),
          "Biggest leak: " + (data.get("biggestLeak") || ""),
          "Urgency: " + (data.get("urgency") || ""),
          "Budget: " + (data.get("budget") || ""),
          "Notes: " + (data.get("notes") || "")
        ];
        if (window.alterLabsTrack) window.alterLabsTrack("audit_form_submit", { form_id: "system-audit-form" });
        window.open("${whatsappBase}?text=" + encodeURIComponent(lines.join("\\n")), "_blank", "noopener,noreferrer");
      });
    });
  </script>`;
  return layout(auditPage, body);
}

const proofPage = {
  dir: "proof",
  file: "index.html",
  group: "Proof",
  title: "Proof Signals for CRM, Website and Automation Projects | AlterLabs",
  h1: "Proof signals before you decide",
  eyebrow: "Proof library",
  summary: "A customer-facing view of how AlterLabs reduces risk before implementation: visible handoffs, operating maps, acceptance checks and human-review boundaries.",
  description: "AlterLabs proof library showing practical evidence signals for CRM automation, business websites, workflows, dashboards and AI projects.",
  schemaType: "CollectionPage"
};

function renderProofPage() {
  const body = `${hero(proofPage, processVisual(["Map", "Build", "Check", "Operate"]))}
    <article class="article-body service-article">
      <section>
        <h2>What counts as proof in an early system project</h2>
        <p>For young service businesses, the best proof is often not a glossy enterprise case study. It is a clear operating artifact: the lead path is visible, ownership is named, edge cases are documented and the team can test whether the workflow is working.</p>
        <div class="evidence-strip">
          <span>Source to CRM handoff</span>
          <span>Response-time view</span>
          <span>Human review queue</span>
          <span>Exception and fallback path</span>
        </div>
      </section>

      <section>
        <h2>Proof modules we build into the work</h2>
        ${cards([
          { kicker: "Lead proof", title: "Every enquiry can be traced", body: "The source, timestamp, owner and next action are visible so new demand does not disappear between tools." },
          { kicker: "Website proof", title: "The page has a measurable next step", body: "CTA clicks, WhatsApp actions, call taps and form starts can be tracked before larger campaigns begin." },
          { kicker: "Automation proof", title: "Failures are observable", body: "Important automations include retry, alert and manual fallback rules instead of silent failure." },
          { kicker: "AI proof", title: "Sensitive actions stay reviewed", body: "AI can classify, summarize and draft, while approvals, outbound replies and record changes stay controlled." }
        ], "proof-grid")}
      </section>

      <section class="service-proof-band">
        <p class="article-kicker">No invented case studies</p>
        <h2>Proof should be honest and inspectable</h2>
        <p>AlterLabs keeps early proof practical: system maps, before/after pages, acceptance criteria, dashboard views and documented operating rules. Where client details are confidential, the proof is shown as sanitized structure, not exaggerated claims.</p>
      </section>

      <section>
        <h2>Use proof to choose the next page</h2>
        ${links([
          ["Start a system audit", "/audit/system-audit.html"],
          ["Interior CRM and website path", "/industries/interior-design-crm-website.html"],
          ["Decision notification system", "/systems/decision-notification-system.html"],
          ["RevOps dashboards", "/services/revops-dashboard-india.html"]
        ])}
      </section>
    </article>
  </main>`;
  return layout(proofPage, body);
}

const industryPages = [
  {
    dir: "industries",
    file: "interior-design-crm-website.html",
    group: "Industries",
    title: "Interior Design CRM, Website and Lead Follow-Up Systems | AlterLabs",
    h1: "CRM and websites for interiors, furniture and home-service teams",
    eyebrow: "Industry system path",
    summary: "Turn Instagram, WhatsApp, calls and site enquiries into one visible pipeline for consultations, quotes, site visits and follow-up.",
    description: "AlterLabs builds CRM, website and follow-up systems for interior design, furniture and home-service businesses in India.",
    steps: ["Enquiry", "Consultation", "Quote", "Site visit", "Follow-up"],
    cards: [
      { kicker: "Website", title: "Show scope and starting prices clearly", body: "Service pages can explain modular kitchens, wardrobes, renovations, furniture and consultation paths without burying the WhatsApp action." },
      { kicker: "CRM", title: "Track site visits and quotes", body: "The pipeline should show consultation status, quote value, next follow-up and who owns the customer conversation." },
      { kicker: "Content", title: "Turn project questions into search pages", body: "Blog and guide pages can answer budget, timeline, material, warranty and city-specific buyer questions." }
    ],
    related: [["Business website development", "/services/business-website-development-india.html"], ["WhatsApp lead follow-up", "/solutions/whatsapp-lead-follow-up-automation.html"], ["Modera Interiors portfolio", "/#portfolio"]]
  },
  {
    dir: "industries",
    file: "real-estate-whatsapp-lead-follow-up.html",
    group: "Industries",
    title: "Real Estate WhatsApp Lead Follow-Up and CRM Systems | AlterLabs",
    h1: "Real estate lead follow-up without spreadsheet chaos",
    eyebrow: "Industry system path",
    summary: "Route property enquiries from ads, portals, calls and WhatsApp into one owned follow-up path with reminders, qualification and dashboard visibility.",
    description: "AlterLabs creates real estate WhatsApp lead follow-up, CRM routing and dashboard systems for property teams and brokers.",
    steps: ["Source", "Qualify", "Assign", "Visit", "Follow-up"],
    cards: [
      { kicker: "Lead routing", title: "Stop losing portal and ad enquiries", body: "Capture the source, project, budget, location preference and owner so interested buyers are not handled from scattered inboxes." },
      { kicker: "WhatsApp", title: "Keep chat convenient but accountable", body: "WhatsApp stays easy for buyers while the team gets reminders, ageing views and follow-up ownership." },
      { kicker: "Dashboard", title: "See which sources create real visits", body: "Track enquiry quality, speed to lead, visit booking, stale follow-ups and source performance." }
    ],
    related: [["WhatsApp lead follow-up", "/solutions/whatsapp-lead-follow-up-automation.html"], ["CRM automation services", "/services/crm-automation-india.html"], ["RevOps dashboards", "/services/revops-dashboard-india.html"]]
  },
  {
    dir: "industries",
    file: "coaching-consulting-crm-automation.html",
    group: "Industries",
    title: "Coaching and Consulting CRM Automation Systems | AlterLabs",
    h1: "CRM automation for coaching, consulting and education enquiries",
    eyebrow: "Industry system path",
    summary: "Connect lead magnets, webinar enquiries, WhatsApp conversations and consultation calls into one follow-up system with content and CRM support.",
    description: "AlterLabs builds CRM automation, websites and lead follow-up workflows for coaching, consulting and education businesses.",
    steps: ["Lead magnet", "Call", "Nurture", "Offer", "Enroll"],
    cards: [
      { kicker: "Website", title: "Separate trust from the pitch", body: "Pages should explain outcomes, who the program is for, pricing signals, proof and the next consultation step." },
      { kicker: "CRM", title: "Know who needs which follow-up", body: "Segment cold, warm and high-intent enquiries by source, interest and next action rather than keeping everyone in one chat list." },
      { kicker: "Automation", title: "Use reminders without losing judgment", body: "Automate confirmations, internal alerts and follow-up prompts while keeping pricing, objections and fit decisions human-reviewed." }
    ],
    related: [["Workflow automation services", "/services/workflow-automation-india.html"], ["Content generation price guide", "/blog/content-generation-price-1999-india.html"], ["AI customer support triage", "/blog/ai-customer-support-triage.html"]]
  }
];

const systemPages = [
  {
    dir: "systems",
    file: "ai-workflow-automation-human-review.html",
    group: "Systems",
    title: "AI Workflow Automation With Human Review | AlterLabs Systems",
    h1: "AI workflow automation with human review",
    eyebrow: "System design",
    summary: "Use AI for classification, summaries and drafts while keeping approvals, sensitive replies and customer commitments under human control.",
    description: "AlterLabs designs AI workflow automation with human review, audit trails, fallback paths and operator control.",
    steps: ["Input", "Classify", "Review", "Act", "Log"],
    cards: [
      { kicker: "Use AI for", title: "Triage and drafting", body: "AI can summarize enquiries, suggest categories, draft internal notes and prepare response options." },
      { kicker: "Keep human for", title: "Judgment and customer risk", body: "Pricing, complaints, contract terms, refunds and uncertain cases should require visible approval." },
      { kicker: "Measure", title: "Acceptance and exception rate", body: "Track how often suggestions are accepted, corrected or escalated before increasing automation." }
    ],
    related: [["AI workflow guide", "/blog/ai-workflow-automation-with-human-review.html"], ["AI agents in CRM controls", "/blog/ai-agents-in-crm-risk-controls.html"], ["Start audit", "/audit/system-audit.html"]]
  },
  {
    dir: "systems",
    file: "internal-tools-service-businesses.html",
    group: "Systems",
    title: "Internal Tools for Service Businesses | AlterLabs Systems",
    h1: "Internal tools when spreadsheets start breaking",
    eyebrow: "System design",
    summary: "Move critical operations out of fragile sheets when permissions, workflow, history and repeatable actions matter more than free-form editing.",
    description: "AlterLabs builds internal tools for service businesses that need controlled operations, dashboards, approvals and reliable records.",
    steps: ["Record", "Permission", "Action", "History", "Review"],
    cards: [
      { kicker: "Replace", title: "Only the risky workflow first", body: "A useful internal tool does not need to recreate every spreadsheet tab. It should handle the work that breaks most often." },
      { kicker: "Control", title: "Permissions and history", body: "Operators need clear actions, while owners need visibility into who changed what and why." },
      { kicker: "Keep", title: "Exports and fallback paths", body: "Teams still need export, exception handling and manual recovery while the new process becomes trusted." }
    ],
    related: [["Internal tools vs spreadsheets", "/blog/internal-tools-vs-spreadsheets.html"], ["Workflow automation services", "/services/workflow-automation-india.html"], ["Business system brief", "/guides/business-system-brief.html"]]
  },
  {
    dir: "systems",
    file: "decision-notification-system.html",
    group: "Systems",
    title: "Decision Notification System for Service Businesses | AlterLabs",
    h1: "A decision notification system for work that should not wait",
    eyebrow: "System design",
    summary: "Send the right notification to the right owner only when a business decision or exception actually needs attention.",
    description: "AlterLabs designs decision notification systems that reduce missed follow-up, noisy alerts and unclear ownership across CRM, dashboards and workflows.",
    steps: ["Signal", "Owner", "Threshold", "Message", "Review"],
    cards: [
      { kicker: "Signal", title: "Only alert on action-worthy change", body: "A lead ageing, approval delay, failed handoff or threshold breach should trigger a clear next action." },
      { kicker: "Owner", title: "One person owns the response", body: "Notifications should avoid group confusion by naming the role, deadline and recovery path." },
      { kicker: "Review", title: "Noise gets removed quickly", body: "Review false alarms and missed alerts so the system becomes sharper instead of louder." }
    ],
    related: [["Missed lead recovery", "/solutions/missed-lead-follow-up-service-businesses.html"], ["RevOps dashboards", "/services/revops-dashboard-india.html"], ["Start audit", "/audit/system-audit.html"]]
  }
];

function renderDetailPage(page) {
  const body = `${hero(page, processVisual(page.steps))}
    <article class="article-body service-article">
      <section>
        <h2>Where this helps</h2>
        ${cards(page.cards, "industry-stack")}
      </section>
      <section class="service-proof-band">
        <p class="article-kicker">First release</p>
        <h2>Start with the smallest workflow that proves value</h2>
        <p>AlterLabs maps the current process, names the owner for each handoff, identifies the first measurable improvement and keeps the implementation narrow enough to test with real work.</p>
      </section>
      <section>
        <h2>What to bring to the first conversation</h2>
        <div class="service-checklist">
          <div><span aria-hidden="true">&#10003;</span>One recent lead or customer journey that became messy</div>
          <div><span aria-hidden="true">&#10003;</span>The current sheet, CRM stages or inbox where work is tracked</div>
          <div><span aria-hidden="true">&#10003;</span>The people who own response, approval and follow-up</div>
          <div><span aria-hidden="true">&#10003;</span>The business number you want to improve first</div>
        </div>
      </section>
      <section>
        <h2>Related paths</h2>
        ${links(page.related)}
      </section>
      <section class="service-cta">
        <p class="article-kicker">Need the right first scope?</p>
        <h2>Run the audit before choosing tools.</h2>
        <p>Share the current workflow and AlterLabs will recommend the smallest useful first release.</p>
        <a class="btn primary" href="/audit/system-audit.html" data-analytics-event="audit_page_click">Start the system audit</a>
      </section>
    </article>
  </main>`;
  return layout(page, body);
}

function writePage(page, html) {
  const directory = path.join(root, page.dir);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, page.file), html, "utf8");
}

function updateSitemap(pages) {
  const sitemapPath = path.join(root, "sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  sitemap = sitemap.replace(/<loc>https:\/\/alterlabs\.in\/<\/loc>\s*<lastmod>[^<]+<\/lastmod>/, `<loc>https://alterlabs.in/</loc>\n    <lastmod>${modified}</lastmod>`);
  for (const page of pages) {
    const url = `${site}/${page.dir}/${page.file}`;
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sitemap = sitemap.replace(new RegExp(`\\s*<url>\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>`, "g"), "");
  }
  const entries = pages.map((page) => {
    const priority = page.dir === "audit" ? "0.95" : page.dir === "proof" ? "0.85" : "0.8";
    return `  <url><loc>${site}/${page.dir}/${page.file}</loc><lastmod>${modified}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
  }).join("\n");
  sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`);
  fs.writeFileSync(sitemapPath, sitemap, "utf8");
}

const generatedPages = [auditPage, proofPage, ...industryPages, ...systemPages];

writePage(auditPage, renderAuditPage());
writePage(proofPage, renderProofPage());
for (const page of [...industryPages, ...systemPages]) {
  writePage(page, renderDetailPage(page));
}
updateSitemap(generatedPages);
injectAnalyticsScripts();

console.log(`Generated ${generatedPages.length} audit expansion pages and injected analytics scripts.`);

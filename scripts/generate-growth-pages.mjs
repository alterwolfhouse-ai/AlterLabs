import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const published = "2026-06-19";
const whatsapp = "https://wa.me/918826436093?text=Hi%20AlterLabs%2C%20I%20want%20to%20discuss%20my%20lead%20workflow";

const pages = [
  {
    dir: "services",
    slug: "crm-automation-india",
    eyebrow: "CRM automation services in India",
    title: "CRM Automation Services in India for Service Businesses | AlterLabs",
    h1: "CRM automation that stops service leads from going cold",
    description: "AlterLabs designs CRM automation for Indian service businesses: lead capture, routing, follow-up reminders, pipeline visibility and human-controlled workflow handoffs.",
    promise: "Turn scattered forms, calls and WhatsApp enquiries into one accountable follow-up path.",
    problem: [
      "Most CRM problems are not software problems. They begin when leads arrive in several places, ownership is unclear, follow-up depends on memory, and managers cannot see which enquiries are stuck.",
      "AlterLabs maps the operating path before configuring tools. The result is a CRM that reflects how the team sells, with automation supporting the process instead of forcing the team into a generic template."
    ],
    deliverables: ["Lead-source capture and deduplication", "Pipeline stages tied to real sales decisions", "Owner assignment and routing rules", "Follow-up reminders and escalation paths", "WhatsApp, form and email handoff design", "Daily pipeline and response-time views", "Human review and exception controls", "Handoff documentation for the team"],
    flow: ["Capture", "Qualify", "Route", "Follow up", "Review"],
    bestFor: ["Interior and furniture businesses", "Real-estate and property teams", "Consultants and coaching businesses", "Local finance and loan teams", "Founder-led B2B service companies"],
    engagement: "CRM automation is scoped after a short workflow discovery. AlterLabs documents the current lead path, identifies the smallest useful build, and provides a fixed proposal before implementation. No hidden software licenses are bundled into the build quote.",
    faq: [
      ["Can you work with our existing CRM?", "Yes. The first step is an audit of the current data, stages and follow-up behaviour. We can improve the existing system or recommend a cleaner migration path."],
      ["Can WhatsApp leads enter the CRM?", "Yes, subject to the WhatsApp setup and tools available. We design the capture, consent, ownership and follow-up path so WhatsApp is part of the process rather than a separate inbox."],
      ["Will automation send messages without review?", "Only where you approve it. High-risk or context-sensitive actions can remain human-reviewed, while reminders, routing and internal alerts run automatically."],
      ["How do we start?", "Share your current lead sources, spreadsheet or CRM stages, and one example of a missed follow-up. AlterLabs will map the smallest useful first release."]
    ],
    related: [["Workflow automation services", "/services/workflow-automation-india.html"], ["WhatsApp lead follow-up automation", "/solutions/whatsapp-lead-follow-up-automation.html"], ["CRM readiness checklist", "/guides/crm-readiness-checklist.html"]]
  },
  {
    dir: "services",
    slug: "business-website-development-india",
    eyebrow: "Business website development in India",
    title: "Business Website Development for Indian Service Businesses | AlterLabs",
    h1: "Business websites built to capture enquiries, not just look finished",
    description: "Conversion-focused business website development for Indian service businesses with transparent packages, WhatsApp lead paths, SEO structure, analytics and CRM-ready forms.",
    promise: "Give buyers a clear offer, a reason to trust it, and a simple next action on mobile.",
    problem: [
      "A service-business website underperforms when it tries to describe everything equally. Visitors need to understand who the business helps, what problem it solves, what the engagement costs, and how to take the next step.",
      "AlterLabs combines offer structure, page design, mobile usability, search foundations and lead capture. The website can launch as a focused entry product and later connect to CRM routing, dashboards and follow-up automation."
    ],
    deliverables: ["Problem-first offer and page structure", "Mobile-first responsive implementation", "WhatsApp and enquiry conversion paths", "SEO titles, descriptions and heading hierarchy", "Analytics and lead-source readiness", "Fast-loading production build", "Domain and hosting guidance", "Clear handoff for future updates"],
    flow: ["Offer", "Structure", "Build", "Launch", "Improve"],
    bestFor: ["New service businesses needing a credible launch", "Teams replacing an outdated brochure website", "Campaigns needing a focused landing page", "Businesses ready to add WhatsApp lead capture", "Owners who want transparent entry pricing"],
    engagement: "Current entry pricing: Starter Website Pack at ₹3,500, Business Website Pack at ₹7,500, E-commerce Website Pack at ₹14,999, and a focused ad landing page at ₹2,999. Final scope depends on content, integrations and catalog size.",
    faq: [
      ["Is hosting included?", "The Starter and Business Website entry packs include one year of hosting and domain guidance, subject to normal domain availability and the confirmed scope."],
      ["Can the website connect to CRM?", "Yes. Forms, WhatsApp actions and campaign sources can be designed so they are ready for CRM routing and reporting."],
      ["Do you write the content?", "Content generation can be added for website copy, service pages, metadata, blog drafts and social derivatives."],
      ["How quickly can a website launch?", "A tightly scoped starter surface can launch quickly after payment, content approval and domain access. Larger sites require more structure and review."]
    ],
    related: [["Website for ₹3,000 guide", "/blog/website-for-3000-rupees-india.html"], ["Business website pricing guide", "/blog/business-website-price-7500-india.html"], ["CRM automation services", "/services/crm-automation-india.html"]]
  },
  {
    dir: "services",
    slug: "workflow-automation-india",
    eyebrow: "Workflow automation services in India",
    title: "Workflow Automation Services for Indian Businesses | AlterLabs",
    h1: "Workflow automation for the repetitive work between your tools",
    description: "AlterLabs connects forms, WhatsApp, email, CRM, spreadsheets and approval steps through reliable workflow automation with human review and fallback paths.",
    promise: "Automate handoffs and reminders without turning the business into a fragile chain of black boxes.",
    problem: [
      "Manual operations usually break at the handoff: a form is copied into a spreadsheet, a message waits in WhatsApp, a quote is not approved, or the owner has to ask for the same status again.",
      "AlterLabs documents the workflow, separates deterministic automation from judgment calls, and builds observable steps with clear owners, retries and manual fallback paths."
    ],
    deliverables: ["Current-state workflow map", "Trigger, action and exception design", "Form, email, spreadsheet and CRM connections", "Approval and human-review checkpoints", "Retry, alert and failure handling", "Audit-friendly event logging", "Operating documentation", "Post-launch validation checklist"],
    flow: ["Trigger", "Validate", "Act", "Escalate", "Log"],
    bestFor: ["Lead intake and assignment", "Quote and proposal workflows", "Service onboarding and document collection", "Internal approvals and notifications", "Recurring reporting preparation"],
    engagement: "Automation work is quoted against a documented workflow, expected volume, systems involved and exception risk. The first release is deliberately narrow so the team can validate reliability before adding more steps.",
    faq: [
      ["Which automation tools do you use?", "The stack depends on the systems, volume and ownership requirements. AlterLabs can work with webhook-based tools, n8n-style workflows, CRM automation and lightweight custom services."],
      ["What happens when an automation fails?", "Failure handling is part of the design. Important workflows include alerts, retry rules, logs and a manual path so work does not disappear silently."],
      ["Can AI be added?", "Yes, for classification, drafting or extraction where it is useful. Final decisions can remain human-reviewed, especially for financial, contractual or customer-sensitive actions."],
      ["Do you automate a broken process?", "No. The workflow is simplified first. Automating unclear ownership usually makes the confusion move faster."]
    ],
    related: [["Automation map", "/guides/automation-map.html"], ["CRM automation services", "/services/crm-automation-india.html"], ["Missed lead follow-up solution", "/solutions/missed-lead-follow-up-service-businesses.html"]]
  },
  {
    dir: "services",
    slug: "revops-dashboard-india",
    eyebrow: "RevOps and reporting dashboards",
    title: "RevOps Dashboard Development in India | AlterLabs",
    h1: "Dashboards that show operators what needs attention today",
    description: "AlterLabs builds RevOps and reporting dashboards for Indian service businesses, connecting lead sources, pipeline stages, follow-up activity and revenue movement.",
    promise: "Replace status chasing with a small set of numbers connected to action and ownership.",
    problem: [
      "A dashboard is not useful because it has more charts. It is useful when a team can see what changed, who owns the next step, and where revenue or service delivery is getting stuck.",
      "AlterLabs starts with operating questions, defines trustworthy source data, and builds views for owners and operators separately. The dashboard remains connected to the workflow that produces the numbers."
    ],
    deliverables: ["Metric and decision map", "Source-data and field audit", "Lead-source and conversion views", "Pipeline ageing and follow-up visibility", "Owner and team operating views", "Data freshness and exception indicators", "Export or review workflows", "Dashboard operating notes"],
    flow: ["Source", "Model", "Measure", "Review", "Act"],
    bestFor: ["Owners asking for daily lead status", "Sales teams managing multiple lead sources", "Service teams tracking work-in-progress", "Businesses moving beyond spreadsheet summaries", "Teams that need one agreed definition of pipeline"],
    engagement: "Dashboard scope depends on data quality, source systems, refresh frequency and the number of operating views required. AlterLabs confirms the metric definitions and data limitations before presenting a fixed build proposal.",
    faq: [
      ["Can you use our spreadsheet data?", "Yes, if the fields and update process are reliable enough. The audit will identify gaps that should be fixed before the dashboard is treated as an operating source."],
      ["Can the dashboard update automatically?", "Yes, when the source systems support reliable access. Refresh frequency is chosen around the business decision, not simply because real-time data sounds impressive."],
      ["Do managers and staff see the same view?", "Not necessarily. Owners may need trend and risk signals, while operators need assigned work, ageing and next actions."],
      ["Can dashboard alerts trigger workflows?", "Yes. Thresholds and exceptions can create internal alerts or tasks, with careful controls to avoid noisy notification loops."]
    ],
    related: [["Dashboards need operators", "/blog/dashboards-need-operators.html"], ["CRM automation services", "/services/crm-automation-india.html"], ["Workflow automation services", "/services/workflow-automation-india.html"]]
  },
  {
    dir: "solutions",
    slug: "whatsapp-lead-follow-up-automation",
    eyebrow: "WhatsApp lead handling solution",
    title: "WhatsApp Lead Follow-Up Automation for Service Businesses | AlterLabs",
    h1: "Turn WhatsApp enquiries into an accountable follow-up workflow",
    description: "Design a WhatsApp lead follow-up workflow with capture, ownership, reminders, CRM visibility and human-controlled responses for Indian service businesses.",
    promise: "Keep WhatsApp convenient for buyers without letting enquiries disappear inside personal inboxes.",
    problem: [
      "WhatsApp is often the fastest way for a buyer to ask a question, but it is a poor operating system by itself. Leads become hard to assign, source attribution disappears, and managers cannot see whether a conversation received the right next step.",
      "AlterLabs designs a consent-aware workflow around WhatsApp: capture the enquiry, record context, assign ownership, schedule follow-up, and keep sensitive replies under human control."
    ],
    deliverables: ["Click-to-chat and source tracking design", "Lead record creation or CRM handoff", "Owner assignment rules", "Follow-up reminders and ageing views", "Approved message-template workflow", "Human review for sensitive replies", "Opt-out and consent considerations", "Exception and escalation path"],
    flow: ["Enquiry", "Record", "Assign", "Remind", "Resolve"],
    bestFor: ["Interior and home-service businesses", "Property and real-estate teams", "Coaching and consultation enquiries", "Local service businesses", "Teams where several people answer one WhatsApp number"],
    engagement: "The solution is scoped around the current WhatsApp setup, CRM or spreadsheet, team ownership and message volume. Platform fees or official WhatsApp provider charges are separate from the AlterLabs implementation quote.",
    faq: [
      ["Does this require WhatsApp Business API?", "Some workflows do, while simpler click-to-chat and internal follow-up designs may not. AlterLabs confirms the requirement after reviewing the current setup and desired automation."],
      ["Can every reply be automated?", "That is usually a bad goal. Routine confirmations and reminders may be automated, while pricing, complaints or context-heavy replies stay human-reviewed."],
      ["Can we see missed or ageing conversations?", "Yes, when lead records and ownership are connected to the reporting layer. The exact visibility depends on the platform integration available."],
      ["Can this connect to website forms?", "Yes. Website, ad and WhatsApp enquiries can share one routing and follow-up model so the team does not operate separate lead queues."]
    ],
    related: [["CRM automation services", "/services/crm-automation-india.html"], ["Missed lead follow-up solution", "/solutions/missed-lead-follow-up-service-businesses.html"], ["Lead pipeline guide", "/blog/lead-pipeline-that-does-not-leak.html"]]
  },
  {
    dir: "solutions",
    slug: "missed-lead-follow-up-service-businesses",
    eyebrow: "Missed lead follow-up solution",
    title: "How Service Businesses Can Stop Missing Lead Follow-Up | AlterLabs",
    h1: "A practical system for stopping missed lead follow-up",
    description: "AlterLabs helps service businesses prevent missed lead follow-up with clear ownership, response-time rules, CRM stages, reminders, escalation and daily operating views.",
    promise: "Make every new enquiry visible, owned and recoverable before adding more lead volume.",
    problem: [
      "Buying more ads does not fix a leaking follow-up process. If new enquiries are not recorded consistently, assigned quickly and reviewed daily, additional demand only increases the number of missed opportunities.",
      "The first useful system is small: one lead record, one owner, one next-action date, one escalation rule, and one daily view of what is overdue. AlterLabs builds outward from that operating core."
    ],
    deliverables: ["Lead-source inventory", "Single ownership rule", "Response-time and next-action definitions", "Pipeline stage cleanup", "Reminder and escalation workflow", "Overdue and unassigned lead view", "Manager review rhythm", "Recovery path for old leads"],
    flow: ["See", "Own", "Respond", "Escalate", "Recover"],
    bestFor: ["Teams buying leads from Meta or Google", "Businesses receiving website and WhatsApp enquiries", "Founder-led teams where follow-up lives in memory", "Sales teams with inconsistent CRM stages", "Owners without a daily pipeline view"],
    engagement: "AlterLabs begins with a short follow-up audit. The recommended first release may be a CRM cleanup, a routing workflow, a dashboard, or a simpler operating checklist depending on where the leak actually occurs.",
    faq: [
      ["Should we buy a new CRM first?", "Not always. Clear ownership and next-action rules matter more than changing tools. The audit will show whether the current system can support the required process."],
      ["What response time should we target?", "It depends on buyer intent, operating hours and team capacity. The important part is agreeing on a realistic standard and making exceptions visible."],
      ["Can old leads be recovered?", "Yes, with careful segmentation and a relevant re-engagement message. Old leads should not be spammed blindly; context, consent and prior status matter."],
      ["How is this different from marketing automation?", "This solution focuses on operational accountability after an enquiry arrives: ownership, next action, escalation and visibility. Campaign nurture can be added later."]
    ],
    related: [["CRM automation services", "/services/crm-automation-india.html"], ["WhatsApp lead follow-up automation", "/solutions/whatsapp-lead-follow-up-automation.html"], ["CRM readiness checklist", "/guides/crm-readiness-checklist.html"]]
  }
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));

function renderPage(page) {
  const url = `https://alterlabs.in/${page.dir}/${page.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": page.dir === "services" ? "Service" : "Article",
        "@id": `${url}#primary`,
        name: page.h1,
        headline: page.h1,
        description: page.description,
        url,
        datePublished: published,
        dateModified: published,
        provider: { "@type": "Organization", name: "AlterLabs", url: "https://alterlabs.in/" },
        publisher: { "@type": "Organization", name: "AlterLabs", url: "https://alterlabs.in/" },
        areaServed: { "@type": "Country", name: "India" }
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://alterlabs.in/" },
          { "@type": "ListItem", position: 2, name: page.dir === "services" ? "Services" : "Solutions", item: `https://alterlabs.in/${page.dir}/` },
          { "@type": "ListItem", position: 3, name: page.h1, item: url }
        ]
      }
    ]
  };

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
  <header class="service-topbar">
    <a href="/" class="service-brand" aria-label="AlterLabs home"><span>AL</span><strong>AlterLabs</strong></a>
    <nav aria-label="Service page navigation">
      <a href="/services/crm-automation-india.html">CRM</a>
      <a href="/services/business-website-development-india.html">Websites</a>
      <a href="/#products">Pricing</a>
      <a href="${whatsapp}">Talk to us</a>
    </nav>
  </header>

  <main id="main-content" class="service-page">
    <a class="article-back" href="/">&larr; Back to AlterLabs</a>
    <div class="service-hero-grid">
      <div>
        <p class="article-kicker">${escapeHtml(page.eyebrow)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="article-summary">${escapeHtml(page.promise)}</p>
        <div class="service-actions">
          <a class="btn primary" href="${whatsapp}">Map my workflow</a>
          <a class="btn ghost" href="tel:+918826436093">Call +91 88264 36093</a>
        </div>
      </div>
      <div class="service-flow" aria-label="${escapeHtml(page.flow.join(" to "))}">
        <span class="service-flow-label">Operating path</span>
        ${page.flow.map((step, index) => `<div class="service-flow-step"><b>0${index + 1}</b><span>${escapeHtml(step)}</span></div>`).join("")}
      </div>
    </div>

    <article class="article-body service-article">
      <section>
        <p class="article-meta">Updated ${published} &middot; India-wide remote delivery</p>
        <h2>The operational problem</h2>
        ${page.problem.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </section>

      <section>
        <h2>What AlterLabs builds</h2>
        <div class="service-checklist">
          ${page.deliverables.map((item) => `<div><span aria-hidden="true">&#10003;</span>${escapeHtml(item)}</div>`).join("")}
        </div>
      </section>

      <section>
        <h2>How the engagement works</h2>
        <div class="service-step-grid">
          <div class="service-step"><strong>01</strong><h3>Map</h3><p>Document the current workflow, owners, tools and exceptions.</p></div>
          <div class="service-step"><strong>02</strong><h3>Prioritize</h3><p>Choose the smallest release that creates reliable operating value.</p></div>
          <div class="service-step"><strong>03</strong><h3>Build</h3><p>Implement, test edge cases and keep human review where needed.</p></div>
          <div class="service-step"><strong>04</strong><h3>Operate</h3><p>Handoff the workflow with clear ownership and improvement notes.</p></div>
        </div>
      </section>

      <section>
        <h2>Who this is best for</h2>
        <ul>${page.bestFor.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>

      <section class="service-proof-band">
        <p class="article-kicker">Scope and pricing</p>
        <h2>Clear scope before implementation</h2>
        <p>${escapeHtml(page.engagement)}</p>
      </section>

      <section>
        <h2>Frequently asked questions</h2>
        <div class="service-faq">
          ${page.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}
        </div>
      </section>

      <section>
        <h2>Related services and guides</h2>
        <div class="related-links">${page.related.map(([label, href]) => `<a href="${href}">${escapeHtml(label)} <span aria-hidden="true">&rarr;</span></a>`).join("")}</div>
      </section>

      <section class="service-cta">
        <p class="article-kicker">Start with the messy version</p>
        <h2>Show us where the workflow breaks.</h2>
        <p>Send one example of a missed lead, manual handoff or reporting gap. AlterLabs will help identify the smallest useful first build.</p>
        <a class="btn primary" href="${whatsapp}">Discuss the first release</a>
      </section>
    </article>
  </main>
</body>
</html>`;
}

for (const page of pages) {
  const directory = path.join(root, page.dir);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, `${page.slug}.html`), renderPage(page), "utf8");
}

const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
for (const page of pages) {
  const url = `https://alterlabs.in/${page.dir}/${page.slug}.html`;
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(new RegExp(`\\s*<url><loc>${escaped}</loc>[\\s\\S]*?</url>`, "g"), "");
}
const entries = pages.map((page) => `  <url><loc>https://alterlabs.in/${page.dir}/${page.slug}.html</loc><lastmod>${published}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`).join("\n");
sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`);
fs.writeFileSync(sitemapPath, sitemap, "utf8");

console.log(`Generated ${pages.length} growth pages.`);

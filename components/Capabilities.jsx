function Capabilities() {
  const items = [
    {
      n: "01",
      title: "Website development",
      desc: "Marketing sites, landing pages and product surfaces — built with clean architecture and real CMS workflows.",
      tags: ["nextjs", "headless cms", "seo", "perf"]
    },
    {
      n: "02",
      title: "CRM systems",
      desc: "Lead capture, pipelines, scoring and account views shaped around how your team actually sells.",
      tags: ["pipelines", "lead routing", "history"]
    },
    {
      n: "03",
      title: "Custom dashboards",
      desc: "Operational and financial views that surface the few numbers that change decisions.",
      tags: ["ops", "finance", "alerts"]
    },
    {
      n: "04",
      title: "Schema & data structure",
      desc: "We model the entities and relationships your business runs on, before a single screen is built.",
      tags: ["erd", "audit", "migrations"]
    },
    {
      n: "05",
      title: "Automation workflows",
      desc: "From form to CRM to email to dashboard — connected with reliable, observable workflows.",
      tags: ["zapier", "n8n", "webhooks", "queues"]
    },
    {
      n: "06",
      title: "AI-assisted tools",
      desc: "LLM-powered assistants, classifiers and drafters embedded into your existing workflows.",
      tags: ["llm", "rag", "classifiers"]
    },
    {
      n: "07",
      title: "Business process digitization",
      desc: "Quote, intake, booking, approval and inventory flows turned into clean internal tools.",
      tags: ["intake", "approval", "inventory"]
    },
    {
      n: "08",
      title: "Custom technical solutions",
      desc: "Integrations, internal tools and one-off systems built around your real constraints.",
      tags: ["api", "integrations", "tools"]
    },
    {
      n: "09",
      title: "Technical consulting",
      desc: "When you need a system audit, architecture review or a sober second opinion before building.",
      tags: ["audit", "architecture", "review"]
    },
  ];

  return (
    <section id="capabilities" className="section container" data-screen-label="03 capabilities">
      <div className="section-head">
        <div className="eyebrow">
          <span className="num">[02]</span><span className="slash">/</span><span>capabilities</span>
        </div>
        <div>
          <h2 className="section-title">Nine practices, one connected system.</h2>
          <p className="section-lead">
            We treat each of these as a single layer of a larger system —
            so the website, CRM, dashboard and automations all speak the same schema.
          </p>
        </div>
      </div>

      <div className="cap-grid">
        {items.map((c) => (
          <div key={c.n} className="cap-cell">
            <div className="cap-num">/ {c.n}</div>
            <h3 className="cap-title">{c.title}</h3>
            <p className="cap-desc">{c.desc}</p>
            <div className="cap-tags">
              {c.tags.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Capabilities = Capabilities;

function Trends() {
  const items = [
    {
      title: "CRM automation with guardrails",
      text: "Teams want faster lead response, cleaner ownership and fewer manual updates, but they also need audit trails, fallback paths and clear field rules before automation starts changing records.",
    },
    {
      title: "AI workflows that support operators",
      text: "The useful AI layer classifies, drafts, enriches and flags work for review inside the existing workflow. It should reduce admin without hiding decisions from the people responsible for outcomes.",
    },
    {
      title: "Dashboards tied to action",
      text: "Dashboards perform when every metric has an owner, a cadence and a next step. AlterLabs designs reporting around daily decisions, not decorative charts.",
    },
    {
      title: "Stack consolidation and integration",
      text: "Many businesses already have forms, spreadsheets, CRM tools, email, WhatsApp and payment systems. The opportunity is to connect the stack before buying another point solution.",
    },
  ];

  return (
    <section id="trends" className="section container" data-screen-label="07 trends">
      <div className="section-head">
        <div className="eyebrow">
          <span className="num">[06]</span><span className="slash">/</span><span>2026_search_intent</span>
        </div>
        <div>
          <h2 className="section-title">What businesses are searching for now.</h2>
          <p className="section-lead">
            The strongest requests in 2026 are not for isolated websites or generic AI demos.
            They are for CRM automation, lead-routing logic, AI workflow support, governed dashboards
            and systems that make daily operations easier to run.
          </p>
        </div>
      </div>

      <div className="why-grid">
        {items.map((item) => (
          <article key={item.title} className="why-cell">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Trends = Trends;

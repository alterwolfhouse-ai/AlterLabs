function Why() {
  const Glyph = ({ d }) => (
    <span className="why-glyph" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {d}
      </svg>
    </span>
  );

  const items = [
    {
      glyph: <><circle cx="12" cy="12" r="3"/><path d="M3 12h4M17 12h4M12 3v4M12 17v4"/></>,
      title: "Systems thinking",
      desc: "We design the connections between screens, data and automations — not just any single piece in isolation.",
    },
    {
      glyph: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M7 14h6"/></>,
      title: "Structured execution",
      desc: "Scoped milestones, weekly previews and a written change log — so you always know what shipped.",
    },
    {
      glyph: <><path d="M5 12l4 4L19 6"/></>,
      title: "Practical, no fluff",
      desc: "We build what's useful and discard what isn't. The solution should fit the team using it.",
    },
    {
      glyph: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
      title: "Speed without shortcuts",
      desc: "Most engagements ship in 4–8 weeks, with the schema and data model done right the first time.",
    },
    {
      glyph: <><path d="M4 7h16M4 12h16M4 17h10"/></>,
      title: "Clarity in writing",
      desc: "Every project ships with documentation — schema diagrams, API contracts and operator handoffs.",
    },
    {
      glyph: <><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
      title: "Built to scale with you",
      desc: "We model for your next 18 months, not just launch day, and leave the codebase clean enough to grow into.",
    },
    {
      glyph: <><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/></>,
      title: "Reliable implementation",
      desc: "Real testing, real error monitoring, real handover. We treat reliability as a deliverable.",
    },
    {
      glyph: <><path d="M4 4l16 16M4 20L20 4"/></>,
      title: "Technical depth",
      desc: "We can go from marketing copy to schema migrations in a single thread — without losing context.",
    },
  ];

  return (
    <section id="why" className="section container" data-screen-label="05 why">
      <div className="section-head">
        <div className="eyebrow">
          <span className="num">[04]</span><span className="slash">/</span><span>why_alter_labs</span>
        </div>
        <div>
          <h2 className="section-title">Why teams choose to work with us.</h2>
          <p className="section-lead">
            We're a small studio — which means you talk directly to the people
            building your system. No layers, no theatre, no missing context.
          </p>
        </div>
      </div>

      <div className="why-grid">
        {items.map(i => (
          <div key={i.title} className="why-cell">
            <Glyph d={i.glyph} />
            <h5>{i.title}</h5>
            <p>{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Why = Why;

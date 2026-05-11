function Process() {
  const steps = [
    {
      id: "01", k: "understand",
      title: "Understand the problem",
      desc: "Workshops, walkthroughs and a written problem brief before any design work begins.",
      bullets: ["stakeholder calls", "process audit", "constraints map"]
    },
    {
      id: "02", k: "design",
      title: "Design the system",
      desc: "Schema, screens and integrations sketched as one connected blueprint, not separate files.",
      bullets: ["entity model", "screen flows", "integration map"]
    },
    {
      id: "03", k: "build",
      title: "Build the solution",
      desc: "Built in versioned increments, with weekly previews and clear scope boundaries.",
      bullets: ["weekly previews", "staging environment", "ticketed scope"]
    },
    {
      id: "04", k: "refine",
      title: "Test & refine",
      desc: "Real-data testing, edge-case sweep and a structured fix list before anything goes live.",
      bullets: ["uat checklist", "data seeding", "error tracking"]
    },
    {
      id: "05", k: "support",
      title: "Launch & support",
      desc: "We hand over docs, train your team and stay on a retainer for changes that matter.",
      bullets: ["handover docs", "training", "retainer"]
    },
  ];

  return (
    <section id="process" className="section process" data-screen-label="04 process">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">[03]</span><span className="slash">/</span><span>how_we_work</span>
          </div>
          <div>
            <h2 className="section-title">A five-stage process. No surprises.</h2>
            <p className="section-lead">
              Every engagement runs through the same structured loop, so you always
              know what we're doing this week and what's coming next.
            </p>
          </div>
        </div>

        <div className="process-rail">
          {steps.map(s => (
            <div key={s.id} className="proc-step">
              <div className="proc-head">
                <span className="id">{s.id}</span>
                <span>/{s.k}</span>
              </div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <ul>
                {s.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Process = Process;

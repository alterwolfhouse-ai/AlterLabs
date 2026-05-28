function Hero() {
  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stripItems = [
    "crm automation", "ai workflows", "revops dashboards", "lead routing", "gtm engineering",
    "internal tools", "business websites", "n8n workflows", "hubspot systems",
    "data hygiene", "quote engines", "operator dashboards"
  ];

  return (
    <section id="top" className="hero container" data-screen-label="01 hero">
      <div className="hero-meta">
        <span className="pill">
          <span className="dot" aria-hidden="true"></span>
          alter labs / digital systems studio
        </span>
        <span className="coords">India-based / remote-ready / CRM + AI workflow builds</span>
      </div>

      <h1>
        We build CRM, AI and dashboard <span className="it">systems</span><br />
        that businesses actually <span className="accent">run on</span>.
      </h1>

      <div className="hero-grid">
        <div>
          <p className="hero-sub">
            ALTER LABS builds CRM automation, RevOps dashboards, AI-assisted workflows,
            internal tools and conversion-focused websites. Every build starts with the
            data model, handoffs and operating workflow behind the screen.
          </p>
          <div className="hero-cta">
            <a href="#contact" onClick={(e) => onClick(e, 'contact')} className="btn btn-primary">
              Start a project <span className="arrow">-&gt;</span>
            </a>
            <a href="#capabilities" onClick={(e) => onClick(e, 'capabilities')} className="btn btn-secondary">
              See capabilities
            </a>
          </div>
        </div>

        <div className="hero-diagram" aria-hidden="true">
          <div className="hero-diagram-head">
            <span>operating system map</span>
            <span>website / crm / dashboard / automation</span>
          </div>
          <div className="hd-flow">
            <div className="hd-stack">
              <div className="hd-node"><span className="label">website</span><span className="meta">marketing / forms</span></div>
              <div className="hd-node"><span className="label">forms</span><span className="meta">leads / quotes</span></div>
            </div>
            <div className="hd-arrow">-&gt;</div>
            <div className="hd-stack">
              <div className="hd-node accent"><span className="label">crm + automations</span><span className="meta">routing / scoring</span></div>
              <div className="hd-node"><span className="label">dashboard</span><span className="meta">ops / finance</span></div>
              <div className="hd-node"><span className="label">ai assist</span><span className="meta">draft / classify</span></div>
            </div>
          </div>
          <div className="hd-foot">
            <span>schema / workflow / handoff</span>
            <span className="blink">live</span>
          </div>
        </div>
      </div>

      <div className="hero-strip" aria-hidden="true">
        <div className="strip-track">
          {[...stripItems, ...stripItems].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;

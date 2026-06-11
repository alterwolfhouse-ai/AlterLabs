const { useEffect: useEffectHero, useRef: useRefHero } = React;

function Hero() {
  const sceneRef = useRefHero(null);

  useEffectHero(() => {
    let cleanup;
    let cancelled = false;
    let attempts = 0;

    const mount = () => {
      if (cancelled || !sceneRef.current) return;
      if (window.AlterLabsTech && window.AlterLabsTech.mountScene) {
        cleanup = window.AlterLabsTech.mountScene(sceneRef.current);
        return;
      }
      attempts += 1;
      if (attempts < 80) window.setTimeout(mount, 50);
    };

    mount();
    return () => {
      cancelled = true;
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

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
    <section id="top" className="hero tech-hero" data-screen-label="01 hero">
      <div className="tech-scene" ref={sceneRef} aria-hidden="true">
        <div className="tech-scene-fallback"></div>
      </div>
      <div className="tech-scan" aria-hidden="true"></div>

      <div className="hero-content container">
        <div className="hero-meta">
          <span className="pill">
            <span className="dot" aria-hidden="true"></span>
            alter labs / digital systems studio
          </span>
          <span className="coords">India-based / remote-ready / CRM + AI workflow builds</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              We build CRM, AI and dashboard <span className="it">systems</span>{" "}
              <span className="hero-line">that businesses actually <span className="accent">run on</span>.</span>
            </h1>

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

            <div className="hero-tech-tags" aria-label="system layers">
              {["lead capture", "crm routing", "ai review", "ops dashboards"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <aside className="hero-hud" aria-label="live system preview">
            <div className="hero-hud-head">
              <span>operating system mesh</span>
              <span className="blink">live</span>
            </div>
            <div className="hero-hud-grid">
              <div>
                <span className="hud-label">nodes</span>
                <strong>128</strong>
              </div>
              <div>
                <span className="hud-label">routes</span>
                <strong>42</strong>
              </div>
              <div>
                <span className="hud-label">latency</span>
                <strong>18ms</strong>
              </div>
              <div>
                <span className="hud-label">review</span>
                <strong>human</strong>
              </div>
            </div>
            <div className="hud-flow">
              <span>website</span>
              <i></i>
              <span>crm</span>
              <i></i>
              <span>automation</span>
              <i></i>
              <span>dashboard</span>
            </div>
            <div className="hud-terminal">
              <span>&gt; sync schema</span>
              <span>&gt; score inbound lead</span>
              <span>&gt; route to owner</span>
            </div>
          </aside>
        </div>

        <div className="hero-strip" aria-hidden="true">
          <div className="strip-track">
            {[...stripItems, ...stripItems].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;

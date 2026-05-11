function About() {
  return (
    <section id="about" className="section container" data-screen-label="02 about">
      <div className="section-head">
        <div className="eyebrow">
          <span className="num">[01]</span><span className="slash">/</span><span>about</span>
        </div>
        <div>
          <h2 className="section-title">A studio for businesses that need real systems, not just pages.</h2>
        </div>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p>
            We help businesses turn messy, manual processes into structured digital
            systems — websites that capture leads, dashboards that surface the
            right numbers, and workflows that quietly move work forward.
          </p>
          <p>
            <span className="dim">Our team works across</span> design, development, schema
            planning, automation and AI integration. <span className="dim">One studio, one
            handoff, end-to-end ownership.</span>
          </p>
        </div>

        <div className="about-stats" aria-label="studio metrics">
          <div className="stat">
            <div className="k">// disciplines</div>
            <div className="v">06</div>
            <div className="note">design · dev · data · automation · ai · ops</div>
          </div>
          <div className="stat">
            <div className="k">// avg. project</div>
            <div className="v">4–8<span className="small">wk</span></div>
            <div className="note">scoped, milestoned, shipped</div>
          </div>
          <div className="stat">
            <div className="k">// stack focus</div>
            <div className="v">Web · CRM · AI</div>
            <div className="note">modern, maintainable, owned by you</div>
          </div>
          <div className="stat">
            <div className="k">// engagement</div>
            <div className="v">Build + Support</div>
            <div className="note">post-launch retainers available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;

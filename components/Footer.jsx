function Footer() {
  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" data-screen-label="08 footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="footer-tag">
              Designing the structure, building the solution, <span className="it">supporting the workflow.</span>
            </p>
          </div>
          <div className="footer-col">
            <h6>Studio</h6>
            <a href="#about" onClick={(e)=>onClick(e,'about')}>About</a>
            <a href="#process" onClick={(e)=>onClick(e,'process')}>How we work</a>
            <a href="#why" onClick={(e)=>onClick(e,'why')}>Why us</a>
            <a href="#resources" onClick={(e)=>onClick(e,'resources')}>Blog & guides</a>
          </div>
          <div className="footer-col">
            <h6>Capabilities</h6>
            <a href="#capabilities" onClick={(e)=>onClick(e,'capabilities')}>Websites</a>
            <a href="#capabilities" onClick={(e)=>onClick(e,'capabilities')}>CRM & dashboards</a>
            <a href="#capabilities" onClick={(e)=>onClick(e,'capabilities')}>Automation & AI</a>
          </div>
          <div className="footer-col">
            <h6>Contact</h6>
            <a href="mailto:hello@alterlabs.in">hello@alterlabs.in</a>
            <a href="#contact" onClick={(e)=>onClick(e,'contact')}>Start a project</a>
            <a href="mailto:hello@alterlabs.in?subject=AlterLabs%20intro%20call">Request an intro call</a>
          </div>
        </div>

        <pre className="asci" aria-hidden="true">{`╭─ alter labs ────────────────────────────────────────────────────────────╮
│  systems  ·  websites  ·  crm  ·  dashboards  ·  automation  ·  ai      │
╰─────────────────────────────────────────────────────────────────────────╯`}</pre>

        <div className="footer-bottom">
          <span>(c) 2026 Alter Labs Studio. All rights reserved.</span>
          <span>web systems / crm / dashboards / automation</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;

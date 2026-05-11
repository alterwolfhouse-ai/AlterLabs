const { useState, useEffect } = React;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: "about", n: "01" },
    { id: "capabilities", n: "02" },
    { id: "process", n: "03" },
    { id: "work", n: "04" },
    { id: "resources", n: "05" },
    { id: "contact", n: "06" },
  ];

  const onClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} data-screen-label="nav">
      <div className="nav-inner">
        <a href="#top" className="brand" onClick={(e) => onClick(e, 'top')}>
          <span className="brand-mark" aria-hidden="true"></span>
          <span className="brand-name"><b>ALTER</b>&nbsp;LABS</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => onClick(e, l.id)}>
              <span className="num">{l.n}</span> {l.id}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span className="nav-status">
            <span className="status-dot" aria-hidden="true"></span>
            <span>accepting selected builds</span>
          </span>
          <a href="#contact" onClick={(e) => onClick(e, 'contact')} className="btn btn-primary nav-cta">
            Start a project <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;

function Solutions() {
  // Mini visual components ↓
  const Dash = () => (
    <div className="dash">
      <div className="dash-side">
        <i className="on" /><i /><i /><i /><i /><i />
      </div>
      <div className="dash-main">
        <div style={{display:'flex',gap:4}}>
          <i style={{height:6,flex:1,background:'var(--rule)',borderRadius:2}}/>
          <i style={{height:6,width:30,background:'var(--rule)',borderRadius:2}}/>
        </div>
        <div className="dash-bars">
          <i style={{height:'40%'}}/><i style={{height:'70%'}}/><i style={{height:'55%'}}/>
          <i className="h" style={{height:'90%'}}/><i style={{height:'60%'}}/>
          <i style={{height:'45%'}}/><i className="h" style={{height:'75%'}}/><i style={{height:'30%'}}/>
        </div>
      </div>
    </div>
  );
  const CRM = () => (
    <div className="crm-rows">
      {[
        {n:"Website enquiry",s:"qualified",hot:true},
        {n:"CRM migration",s:"contacted",hot:false},
        {n:"Dashboard request",s:"proposal",hot:true},
        {n:"Automation brief",s:"new",hot:false},
        {n:"Support retainer",s:"won",hot:false},
      ].map((r,i) => (
        <div key={i} className={`row ${r.hot?'hot':''}`}>
          <span className="dot"/>
          <span style={{color:'var(--fg)'}}>{r.n}</span>
          <span className="stage">{r.s}</span>
          <span>{(80-i*9)}%</span>
        </div>
      ))}
    </div>
  );
  const Flow = () => (
    <div className="flow">
      <div className="node"><b>form</b><span>web / intake</span></div>
      <div className="conn"></div>
      <div className="node hl"><b>crm</b><span>route + score</span></div>
      <div className="node"><b>email</b><span>auto-reply</span></div>
      <div className="conn"></div>
      <div className="node"><b>dashboard</b><span>ops daily</span></div>
    </div>
  );
  const Quote = () => (
    <div className="quote-vis">
      <div className="quote-form">
        <i/><i className="short"/><i/><i/><i className="short"/>
      </div>
      <div className="quote-total">
        <span className="lbl">est. total</span>
        <span className="val">scope ready</span>
      </div>
    </div>
  );
  const Web = () => (
    <div className="web-vis">
      <div className="topbar"><i/><i/><i/></div>
      <div className="body">
        <div className="col"><i className="hl"/><i/><i className="short"/><i/></div>
        <div className="col"><i/><i className="short"/><i/><i className="short"/></div>
      </div>
      <div className="footer"></div>
    </div>
  );
  const Altercraft = () => (
    <div className="web-vis altercraft-vis">
      <div className="topbar"><i/><i/><i/></div>
      <div className="body">
        <div className="col"><i className="hl"/><i/><i/><i className="short"/></div>
        <div className="col"><i/><i className="short"/><i className="hl"/><i/></div>
      </div>
      <div className="footer"></div>
    </div>
  );
  const Ops = () => (
    <div className="ops-vis">
      <div className="ops-tabs"><span className="on">today</span><span>queue</span><span>archive</span></div>
      <div className="ops-board">
        <div className="ops-col"><div className="card act"/><div className="card"/><div className="card"/></div>
        <div className="ops-col"><div className="card"/><div className="card act"/><div className="card"/><div className="card"/></div>
        <div className="ops-col"><div className="card"/><div className="card"/></div>
      </div>
    </div>
  );
  const AI = () => (
    <div className="ai-vis">
      <div className="ai-msg">
        <div className="bot">draft a reply to a delivery timeline question.</div>
        <div className="me">classify lead -&gt; schedule call -&gt; reply</div>
      </div>
      <div className="ai-input">
        <span>ask alter assist…</span>
        <span style={{color:'var(--accent)'}}>↵</span>
      </div>
    </div>
  );

  const items = [
    { id:"altercraft", n:"01", tag:"live website", title:"altercraft.in", desc:"Portfolio entry for Altercraft, a live brand website built around structured presentation and lead capture.", vis:<Altercraft/>, featured:true, href:"https://altercraft.in" },
    { id:"crm", n:"02", tag:"crm", title:"Lead-tracking CRM", desc:"Pipelines, scoring and inbox routing for a B2B sales team.", vis:<CRM/>, featured:true },
    { id:"dash", n:"03", tag:"dashboard", title:"Internal business dashboard", desc:"Daily ops, finance and inventory at a glance.", vis:<Dash/> },
    { id:"flow", n:"04", tag:"automation", title:"Automation workflow system", desc:"Forms to CRM to email to dashboard, end to end.", vis:<Flow/> },
    { id:"quote", n:"05", tag:"tool", title:"Quote generation tool", desc:"Configurable line items, branded PDFs and CRM sync.", vis:<Quote/> },
    { id:"web", n:"06", tag:"website", title:"Business website", desc:"Marketing site with structured content and lead capture.", vis:<Web/> },
    { id:"ops", n:"07", tag:"portal", title:"Operations portal", desc:"Role-based views for service ops, with audit trail.", vis:<Ops/>, featured:true },
    { id:"ai",  n:"08", tag:"ai", title:"AI-assisted assistant", desc:"Drafts, classifies and routes work inside your existing tools.", vis:<AI/> },
  ];

  return (
    <section id="work" className="section container" data-screen-label="06 work">
      <div className="section-head">
        <div className="eyebrow">
          <span className="num">[05]</span><span className="slash">/</span><span>work</span>
        </div>
        <div>
          <h2 className="section-title">Solutions we build, again and again.</h2>
          <p className="section-lead">
            A representative slice of the systems we ship. Real client work
            available on request — the cards below show the shape and surface
            of typical engagements.
          </p>
        </div>
      </div>

      <div className="solutions-grid">
        {items.map(s => (
          <article key={s.id} className={`sol ${s.featured ? 'featured' : ''}`}>
            <div className="sol-head">
              <span>/{s.n}</span>
              <span className="tag">{s.tag}</span>
            </div>
            <div className="sol-vis" aria-hidden="true">{s.vis}</div>
            <div className="sol-foot">
              <h6>
                {s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer">{s.title}</a> : s.title}
              </h6>
              <p>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Solutions = Solutions;

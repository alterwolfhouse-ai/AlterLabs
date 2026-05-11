const { useState: useStateContact } = React;

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' });
  const [scope, setScope] = useState([]);
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const scopes = ["Website", "CRM", "Dashboard", "Automation", "AI tool", "Consulting", "Not sure yet"];
  const budgets = ["< INR 2L", "INR 2-5L", "INR 5-12L", "INR 12L+", "Open to discuss"];

  const toggleScope = (s) => {
    setScope(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "required";
    if (!form.email.trim()) e.email = "required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "looks invalid";
    if (!form.message.trim()) e.message = "required";
    else if (form.message.trim().length < 10) e.message = "tell us a bit more";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, scope, budget })
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrors(data.fields || { form: data.error || "could not send" });
        return;
      }

      setSent(true);
    } catch {
      setErrors({ form: "server unavailable" });
    } finally {
      setSubmitting(false);
    }
  };

  const change = (k) => (e) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  const Mail = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
    </svg>
  );
  const Wa = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-3.5-7.1L21 4l-1 3.4A8.96 8.96 0 0121 12z"/>
      <path d="M8 11c0 3 2 5 5 5l1.5-1.5-2-1-1.5.5-1.5-2 .5-1.5-1-2L8 9z"/>
    </svg>
  );
  const Cal = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>
    </svg>
  );

  return (
    <section id="contact" className="section container" data-screen-label="08 contact">
      <div className="section-head">
        <div className="eyebrow">
          <span className="num">[07]</span><span className="slash">/</span><span>contact</span>
        </div>
        <div>
          <h2 className="section-title">Tell us about the system you're trying to build.</h2>
          <p className="section-lead">
            A short paragraph is enough — we'll reply within one business day with
            a few clarifying questions and a sense of fit.
          </p>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <p>
            Whether it's a marketing site, an internal tool, a CRM rebuild or
            an AI experiment — we'd like to hear the messy version first.
          </p>

          <div className="contact-channels">
            <a className="channel" href="mailto:hello@alterlabs.in">
              <span className="ic"><Mail/></span>
              <span className="channel-text">
                <span className="lbl">// email</span>
                <span>hello@alterlabs.in</span>
              </span>
            </a>
            <a className="channel" href="mailto:hello@alterlabs.in?subject=AlterLabs%20project%20brief">
              <span className="ic"><Wa/></span>
              <span className="channel-text">
                <span className="lbl">// quick brief</span>
                <span>Send the messy version first</span>
              </span>
            </a>
            <a className="channel" href="mailto:hello@alterlabs.in?subject=AlterLabs%20intro%20call">
              <span className="ic"><Cal/></span>
              <span className="channel-text">
                <span className="lbl">// request a 30-min intro call</span>
                <span>We will reply with available slots</span>
              </span>
            </a>
          </div>
        </div>

        {sent ? (
          <div className="form" role="status" aria-live="polite">
            <div className="form-success">
              <span className="check" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6"/></svg>
              </span>
              <h3>Brief received.</h3>
              <p>
                Thanks, {form.name.split(' ')[0] || 'there'}. We'll review the brief and
                reply from <b>hello@alterlabs.in</b> within one business day.
              </p>
              <button className="btn btn-secondary" onClick={() => { setSent(false); setForm({name:'',email:'',company:'',message:''}); setScope([]); setBudget(''); }}>
                Send another
              </button>
            </div>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className={`field ${errors.name ? 'error' : ''}`}>
                <label>name <span className="req">*</span></label>
                <input value={form.name} onChange={change('name')} placeholder="your name" />
                {errors.name && <span className="err">// {errors.name}</span>}
              </div>
              <div className={`field ${errors.email ? 'error' : ''}`}>
                <label>email <span className="req">*</span></label>
                <input value={form.email} onChange={change('email')} placeholder="you@company.com" type="text" inputMode="email" autoComplete="email" />
                {errors.email && <span className="err">// {errors.email}</span>}
              </div>
            </div>

            <div className="field">
              <label>company <span style={{color:'var(--fg-3)'}}>// optional</span></label>
              <input value={form.company} onChange={change('company')} placeholder="company or studio" />
            </div>

            <div className="field">
              <label>scope <span style={{color:'var(--fg-3)'}}>// pick any that apply</span></label>
              <div className="chip-row">
                {scopes.map(s => (
                  <button type="button" key={s}
                    className={`chip ${scope.includes(s) ? 'on' : ''}`}
                    onClick={() => toggleScope(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>budget</label>
              <div className="chip-row">
                {budgets.map(b => (
                  <button type="button" key={b}
                    className={`chip ${budget === b ? 'on' : ''}`}
                    onClick={() => setBudget(b === budget ? '' : b)}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className={`field ${errors.message ? 'error' : ''}`}>
              <label>brief <span className="req">*</span></label>
              <textarea value={form.message} onChange={change('message')} placeholder="what are you trying to build, and what's getting in the way?" />
              {errors.message && <span className="err">// {errors.message}</span>}
            </div>

            <div className="form-foot">
              <span className="small">// we reply within 1 business day</span>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "Sending..." : "Send brief"} <span className="arrow">-&gt;</span>
              </button>
            </div>
            {errors.form && <span className="err">// {errors.form}</span>}
          </form>
        )}
      </div>
    </section>
  );
}
window.Contact = Contact;

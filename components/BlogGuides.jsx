const { useEffect: useEffectResources, useState: useStateResources } = React;

function BlogGuides() {
  const fallbackPosts = [
    {
      slug: "systems-before-screens",
      title: "Start with the system before the screen",
      category: "studio notes",
      date: "2026-05-08",
      readTime: "5 min",
      summary: "A practical way to turn a vague website or CRM request into entities, workflows and decisions your team can build around.",
      tags: ["systems", "discovery", "schema"]
    },
    {
      slug: "lead-pipeline-that-does-not-leak",
      title: "Designing a lead pipeline that does not leak",
      category: "crm",
      date: "2026-04-28",
      readTime: "7 min",
      summary: "How we model forms, qualification states, reminders and owner handoffs so sales teams stop losing high-intent enquiries.",
      tags: ["crm", "automation", "sales"]
    }
  ];

  const fallbackGuides = [
    {
      slug: "business-system-brief",
      title: "Business system brief",
      category: "template",
      date: "2026-05-01",
      readTime: "12 min",
      summary: "A field-by-field brief for scoping websites, CRMs, dashboards and automations before design starts.",
      tags: ["brief", "planning", "template"]
    },
    {
      slug: "crm-readiness-checklist",
      title: "CRM readiness checklist",
      category: "checklist",
      date: "2026-04-22",
      readTime: "9 min",
      summary: "A checklist for deciding whether your team needs a spreadsheet cleanup, a lightweight CRM or a custom pipeline system.",
      tags: ["crm", "checklist", "sales"]
    }
  ];

  const [posts, setPosts] = useStateResources(fallbackPosts);
  const [guides, setGuides] = useStateResources(fallbackGuides);
  const [status, setStatus] = useStateResources("local");

  useEffectResources(() => {
    let active = true;

    Promise.all([
      fetch('/api/posts').then((res) => res.ok ? res.json() : Promise.reject(res)),
      fetch('/api/guides').then((res) => res.ok ? res.json() : Promise.reject(res))
    ])
      .then(([postData, guideData]) => {
        if (!active) return;
        setPosts(postData.posts || fallbackPosts);
        setGuides(guideData.guides || fallbackGuides);
        setStatus("api");
      })
      .catch(() => {
        if (active) setStatus("local");
      });

    return () => { active = false; };
  }, []);

  const ResourceCard = ({ item, type }) => (
    <article className="resource-card">
      <div className="resource-card-head">
        <span>/{type}</span>
        <span>{item.category}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="resource-meta">
        <span>{item.date}</span>
        <span>{item.readTime}</span>
      </div>
      <div className="cap-tags">
        {(item.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </article>
  );

  return (
    <section id="resources" className="section resources" data-screen-label="07 resources">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">[06]</span><span className="slash">/</span><span>blog_guides</span>
          </div>
          <div>
            <h2 className="section-title">Notes and guides for building better business systems.</h2>
            <p className="section-lead">
              Short essays, checklists and working templates from our build process.
              Built from real discovery, delivery and handoff lessons.
            </p>
          </div>
        </div>

        <div className="resource-shell">
          <div className="resource-column">
            <div className="resource-label">
              <span>// blog</span>
              <span>{status === "api" ? "latest" : "curated"}</span>
            </div>
            <div className="resource-list">
              {posts.map((post) => <ResourceCard key={post.slug} item={post} type="post" />)}
            </div>
          </div>

          <div className="resource-column">
            <div className="resource-label">
              <span>// guides</span>
              <span>{guides.length} resources</span>
            </div>
            <div className="resource-list">
              {guides.map((guide) => <ResourceCard key={guide.slug} item={guide} type="guide" />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.BlogGuides = BlogGuides;

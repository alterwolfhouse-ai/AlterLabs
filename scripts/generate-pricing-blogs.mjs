import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const blogDir = join(root, "blog");
mkdirSync(blogDir, { recursive: true });

const site = "https://alterlabs.in";
const published = "2026-06-16";

const pricing = [
  ["Starter Website Pack", "₹3,500", "Same day / 4 hours", "1-page business website, domain + hosting for 1 year, mobile responsive design, basic SEO, WhatsApp lead button, Google Map integration"],
  ["Business Website + Lead System", "₹7,500", "2-3 days", "Up to 5 pages, premium design, lead form + WhatsApp, basic CRM-ready lead flow, contact page, service/product sections"],
  ["E-Commerce Starter Pack", "₹14,999", "5-7 days", "Product listing website, up to 20 products, cart / WhatsApp order flow, payment gateway guidance, mobile friendly, basic SEO + analytics"],
  ["Landing Page for Ads", "₹2,999", "Same day", "High-converting landing page, lead capture form, WhatsApp CTA, fast loading design, ad campaign tracking ready"],
  ["Meta Ads Setup", "₹2,999", "1-2 days", "Campaign setup, audience targeting, creative direction, lead form setup, pixel guidance, ad copywriting"],
  ["Google Search Ads", "₹3,999", "1-2 days", "Keyword research, campaign setup, ad copy, location targeting, call extension, lead tracking guidance"],
  ["Social Media Creatives", "₹999 onwards", "24 hours", "Instagram/Facebook posts, offer creatives, business announcements, festival creatives, ad-ready creatives"],
  ["Content Generation Pack", "₹1,999 onwards", "24-48 hours", "Website copy blocks, service descriptions, SEO titles + meta descriptions, blog / guide draft, ad and social captions, human review ready"],
  ["Website Maintenance Pack", "₹5,000/year", "Ongoing", "10 website updates/year, content changes, image updates, offer changes, basic support + checks"],
  ["Extra Website Update", "₹900/update", "Same day", "Text, image or section update, offer change, small content correction"],
];

const articles = [
  {
    slug: "website-for-3000-rupees-india",
    title: "Website for ₹3,000 in India: What You Can Actually Launch",
    description: "A practical guide to a website around ₹3,000 in India, including AlterLabs pricing for ₹2,999 landing pages, ₹3,500 starter websites and all related packs.",
    focusPrice: "₹2,999-₹3,500",
    intent: "website for 3000 rupees",
    summary: "If your budget is around ₹3,000, the honest choice is usually a focused landing page at ₹2,999 or a starter one-page business website at ₹3,500 when you also need domain, hosting and local business basics.",
    quick: "A ₹3,000 website budget can launch a serious first online surface if the scope is tight: one offer, one audience, one WhatsApp enquiry path and one clear location/service story.",
    bestFit: "Choose the Landing Page for Ads at ₹2,999 when you need one campaign page. Choose the Starter Website Pack at ₹3,500 when you need a small business homepage with domain, hosting, WhatsApp and map basics.",
    blogPlan: ["Write one page around the main service and city.", "Add a short FAQ that answers price, timing and location questions.", "Create one follow-up blog: why buyers should contact you before comparing quotes."],
  },
  {
    slug: "website-for-500-rupees-india",
    title: "Website for ₹500? What ₹500 Can and Cannot Buy",
    description: "A blunt pricing guide for people searching website for 500 rupees, with realistic options, AlterLabs packages and what to buy instead.",
    focusPrice: "₹500 vs ₹2,999+",
    intent: "website for 500 rupees",
    summary: "₹500 is usually not enough for a real business website. It can cover a tiny micro-task in some cases, but a usable website needs hosting, design, copy, mobile layout, lead capture and basic SEO.",
    quick: "If someone promises a complete business website for ₹500, ask what is excluded. Usually domain, hosting, custom copy, responsive design, SEO setup, forms and support are missing.",
    bestFit: "Use ₹500 as a micro-budget for a tiny content fix or image swap only when the scope is extremely small. AlterLabs listed website builds start at ₹2,999 for a landing page and ₹3,500 for a starter website; listed extra website updates are ₹900/update.",
    blogPlan: ["Compare ₹500, ₹2,999 and ₹3,500 options honestly.", "Explain hidden costs: domain, hosting, copy, mobile QA and support.", "Create a checklist buyers can use before paying for a cheap website."],
  },
  {
    slug: "business-website-price-7500-india",
    title: "Business Website for ₹7,500: What Should Be Included?",
    description: "See what a ₹7,500 business website should include, from service pages and lead capture to WhatsApp, CRM-ready flow and content structure.",
    focusPrice: "₹7,500",
    intent: "business website price 7500",
    summary: "A ₹7,500 business website should be more than a homepage. It should explain the offer, build trust, route enquiries and give each service enough room to rank and convert.",
    quick: "The AlterLabs Business Website + Lead System is priced at ₹7,500 for up to five pages, premium design, lead form + WhatsApp, CRM-ready lead flow, contact page and service/product sections.",
    bestFit: "This is the right product when one page is too small and the business needs separate service, about, contact and proof sections.",
    blogPlan: ["Publish one service explainer per core offer.", "Write a comparison post around the most common buyer objection.", "Turn FAQs into short local SEO snippets."],
  },
  {
    slug: "ecommerce-website-price-14999-india",
    title: "E-Commerce Website for ₹14,999: A Practical Starter Plan",
    description: "A clear guide to the AlterLabs E-Commerce Starter Pack at ₹14,999, including product listings, WhatsApp order flow and SEO basics.",
    focusPrice: "₹14,999",
    intent: "ecommerce website price 14999",
    summary: "A starter e-commerce website should help customers inspect products, ask questions and order without forcing the business into a complex platform too early.",
    quick: "AlterLabs prices the E-Commerce Starter Pack at ₹14,999 for product listings up to 20 products, cart / WhatsApp order flow, payment gateway guidance, mobile-friendly pages and basic SEO + analytics.",
    bestFit: "Use this when you need a real catalog and order path, but do not yet need a heavy marketplace-style build.",
    blogPlan: ["Write product category pages with buying criteria.", "Create product description templates for every SKU.", "Publish one guide that answers delivery, warranty, customization and payment questions."],
  },
  {
    slug: "landing-page-price-2999-india",
    title: "Landing Page for Ads at ₹2,999: What Makes It Worth It?",
    description: "A guide to the AlterLabs ₹2,999 landing page product for paid ads, lead capture, WhatsApp CTA and tracking-ready campaigns.",
    focusPrice: "₹2,999",
    intent: "landing page price 2999",
    summary: "A landing page is not a smaller website. It is a focused sales page for one campaign, one audience and one action.",
    quick: "AlterLabs prices the Landing Page for Ads at ₹2,999 with high-converting layout, lead capture form, WhatsApp CTA, fast loading design and ad campaign tracking readiness.",
    bestFit: "Choose this for Meta Ads, Google Search Ads, launch offers, local campaigns, lead magnets and appointment campaigns.",
    blogPlan: ["Write the page around one promise and one CTA.", "Add campaign-specific FAQs so ad traffic does not bounce.", "Use the same content angle in ads, landing page and WhatsApp follow-up."],
  },
  {
    slug: "meta-ads-setup-price-2999-india",
    title: "Meta Ads Setup at ₹2,999: Campaign, Creative and Copy Checklist",
    description: "A pricing and content guide for Meta Ads setup at ₹2,999, including audience targeting, lead forms, pixel guidance and ad copywriting.",
    focusPrice: "₹2,999",
    intent: "Meta ads setup price 2999",
    summary: "Meta Ads need more than a boosted post. The campaign needs audience logic, offer copy, creative direction, tracking and a lead destination.",
    quick: "AlterLabs prices Meta Ads Setup at ₹2,999 for campaign setup, audience targeting, creative direction, lead form setup, pixel guidance and ad copywriting.",
    bestFit: "Use this when you already have an offer and need a clean first campaign structure with lead capture.",
    blogPlan: ["Draft three hook families: pain, proof and offer.", "Turn each hook into captions and creatives.", "Write a landing page or lead form that repeats the same promise."],
  },
  {
    slug: "google-ads-setup-price-3999-india",
    title: "Google Search Ads Setup at ₹3,999: Price, Keywords and Landing Page Match",
    description: "A guide to Google Search Ads setup at ₹3,999, keyword research, ad copy, call extensions, lead tracking and matching website content.",
    focusPrice: "₹3,999",
    intent: "Google ads setup price 3999",
    summary: "Google Search Ads work best when keywords, ad copy and landing page content match the buyer's exact intent.",
    quick: "AlterLabs prices Google Search Ads at ₹3,999 with keyword research, campaign setup, ad copy, location targeting, call extension and lead tracking guidance.",
    bestFit: "Use this when people already search for the service and you need to capture high-intent enquiries.",
    blogPlan: ["Create a keyword-to-page map.", "Write one landing page per high-intent service cluster.", "Add FAQ content that mirrors expensive search questions."],
  },
  {
    slug: "social-media-creatives-price-999-india",
    title: "Social Media Creatives from ₹999: What to Ask For",
    description: "A practical pricing guide for social media creatives from ₹999 onwards, including posts, offers, announcements and ad-ready content.",
    focusPrice: "₹999 onwards",
    intent: "social media creatives price 999",
    summary: "A good creative is not just a pretty post. It should carry the offer, buyer trigger and next action in one clear visual.",
    quick: "AlterLabs prices Social Media Creatives at ₹999 onwards for Instagram/Facebook posts, offer creatives, business announcements, festival creatives and ad-ready creatives.",
    bestFit: "Use this when you need an offer made visible quickly for organic posts or paid campaigns.",
    blogPlan: ["Create one post for the offer, one for proof and one for FAQs.", "Turn website sections into social captions.", "Reuse the best social angle as a landing page headline."],
  },
  {
    slug: "content-generation-price-1999-india",
    title: "Content Generation Pack from ₹1,999: Website Copy, Blogs and SEO Metadata",
    description: "A detailed guide to AlterLabs content generation from ₹1,999 onwards, including website copy blocks, service descriptions, blogs, captions and SEO metadata.",
    focusPrice: "₹1,999 onwards",
    intent: "content generation price 1999",
    summary: "Content generation is useful when the business knows what it sells but needs sharper copy, service pages, blog drafts and search-ready metadata.",
    quick: "AlterLabs prices the Content Generation Pack at ₹1,999 onwards for website copy blocks, service descriptions, SEO titles + meta descriptions, blog / guide drafts, ad and social captions and human review-ready content.",
    bestFit: "Use this before a website launch, after a redesign, or when ads need better landing page copy.",
    blogPlan: ["Create service page copy blocks first.", "Draft one blog for each product or service card.", "Write metadata around buyer-intent phrases, not generic keywords."],
  },
  {
    slug: "website-maintenance-price-5000-india",
    title: "Website Maintenance at ₹5,000/year: What Updates Should Include",
    description: "A guide to AlterLabs website maintenance at ₹5,000/year for 10 updates, content changes, image updates, offer changes and basic checks.",
    focusPrice: "₹5,000/year",
    intent: "website maintenance price 5000",
    summary: "Maintenance is valuable when the website keeps up with offers, proof, pricing, photos, SEO pages and business changes.",
    quick: "AlterLabs prices the Website Maintenance Pack at ₹5,000/year for 10 website updates per year, content changes, image updates, offer changes and basic support + checks.",
    bestFit: "Use this when the business changes monthly but does not need a new website every time.",
    blogPlan: ["Update offer pages when pricing or service scope changes.", "Add fresh proof, new locations and seasonal FAQs.", "Turn repeated customer questions into short blog posts."],
  },
  {
    slug: "website-update-price-900-india",
    title: "Website Update at ₹900: When a Small Edit Is Enough",
    description: "A guide to one-off website updates at ₹900/update, including text, image, section, offer and small content corrections.",
    focusPrice: "₹900/update",
    intent: "website update price 900",
    summary: "A one-off update is best when the website is mostly fine and one section, offer, image or correction needs to change quickly.",
    quick: "AlterLabs prices Extra Website Update at ₹900/update for text, image or section updates, offer changes and small content corrections.",
    bestFit: "Use this when the content change is clear, small and does not require a redesign or new page structure.",
    blogPlan: ["Fix unclear text before running ads.", "Update offers before seasonal campaigns.", "Turn repeated small corrections into a maintenance plan if they happen often."],
  },
];

const allLinks = articles.map((article) => ({
  slug: article.slug,
  title: article.title.replace(/:.*$/, ""),
}));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pricingTable() {
  return `<table class="pricing-table">
    <thead><tr><th>Product</th><th>Price</th><th>Delivery</th><th>Includes</th></tr></thead>
    <tbody>
      ${pricing.map(([name, price, delivery, includes]) => `<tr><td>${escapeHtml(name)}</td><td>${escapeHtml(price)}</td><td>${escapeHtml(delivery)}</td><td>${escapeHtml(includes)}</td></tr>`).join("\n")}
    </tbody>
  </table>`;
}

function relatedLinks(currentSlug) {
  const selected = allLinks
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 6)
    .map((item) => `<a href="./${item.slug}.html">${escapeHtml(item.title)}</a>`)
    .join("\n");
  return `<div class="related-links">${selected}</div>`;
}

function articleHtml(article) {
  const canonical = `${site}/blog/${article.slug}.html`;
  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: published,
    dateModified: published,
    author: { "@type": "Organization", name: "AlterLabs" },
    publisher: { "@type": "Organization", name: "AlterLabs" },
    mainEntityOfPage: canonical,
    description: article.description,
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(article.title)} | AlterLabs</title>
<meta name="description" content="${escapeHtml(article.description)}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${canonical}" />
<link rel="stylesheet" href="../styles.css" />
<script type="application/ld+json">
${JSON.stringify(structured)}
</script>
</head>
<body>
<main class="article-page">
  <a class="article-back" href="../index.html#resources">/ back to resources</a>
  <p class="article-kicker">/ pricing guide / ${escapeHtml(article.intent)}</p>
  <h1>${escapeHtml(article.title)}</h1>
  <p class="article-summary">${escapeHtml(article.summary)}</p>
  <p class="article-meta">${published} / 6 min / pricing, websites, content, lead generation</p>

  <section class="pricing-hero-graphic" aria-label="Pricing graphic for ${escapeHtml(article.title)}">
    <div class="price-node"><strong>${escapeHtml(article.focusPrice)}</strong><span>${escapeHtml(article.intent)}</span></div>
    <div class="signal-row">
      <span><strong>Search intent</strong><br/>People comparing price before they call.</span>
      <span><strong>Offer clarity</strong><br/>Scope, delivery and next step are visible.</span>
      <span><strong>Lead path</strong><br/>Page, WhatsApp, CRM and follow-up stay connected.</span>
    </div>
  </section>

  <article class="article-body">
    <h2>Quick answer</h2>
    <p>${escapeHtml(article.quick)}</p>
    <p>${escapeHtml(article.bestFit)}</p>

    <div class="intent-grid">
      <div class="intent-card"><strong>Best for</strong><p>Business owners comparing website, content, ad and maintenance budgets before starting a build.</p></div>
      <div class="intent-card"><strong>Content angle</strong><p>Answer the price question directly, then explain what is included and what should not be skipped.</p></div>
      <div class="intent-card"><strong>Conversion action</strong><p>Move the reader from research into a WhatsApp conversation with the exact product and budget range.</p></div>
    </div>

    <h2>Content and blog plan for this offer</h2>
    <ul>
      ${article.blogPlan.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}
    </ul>

    <h2>Full AlterLabs pricing snapshot</h2>
    <p>Use this table to compare the product card prices before choosing a package. Prices are entry scopes; larger CRM, dashboard, automation or AI workflow builds are scoped after discovery.</p>
    ${pricingTable()}

    <h2>How to choose the right package</h2>
    <p>If you need one focused campaign surface, start with the ₹2,999 landing page. If you need a first business website with domain and hosting, use the ₹3,500 starter website. If the business needs multiple service pages and a lead flow, choose the ₹7,500 business website. If the website already exists and needs small changes, use the ₹900 update or ₹5,000/year maintenance plan.</p>
    <p>For traffic and content, pair the page with Meta Ads Setup at ₹2,999, Google Search Ads at ₹3,999, Social Media Creatives from ₹999 onwards and Content Generation from ₹1,999 onwards.</p>

    <h2>Related pricing guides</h2>
    ${relatedLinks(article.slug)}

    <div class="article-cta">
      <a class="btn btn-primary" href="../index.html#products">View all AlterLabs product cards</a>
      <a class="btn btn-ghost" href="https://wa.me/918826436093?text=Hi%20AlterLabs%2C%20I%20want%20to%20discuss%20a%20website%2C%20content%20or%20pricing%20package">Ask on WhatsApp</a>
    </div>
  </article>
</main>
</body>
</html>
`;
}

for (const article of articles) {
  writeFileSync(join(blogDir, `${article.slug}.html`), articleHtml(article), "utf8");
}

const sitemapPath = join(root, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf8");
for (const article of articles) {
  const url = `${site}/blog/${article.slug}.html`;
  sitemap = sitemap.replace(new RegExp(`\\s*<url>\\s*<loc>${url.replaceAll("/", "\\/")}<\\/loc>[\\s\\S]*?<\\/url>`, "g"), "");
}
const newUrls = articles.map((article) => `  <url><loc>${site}/blog/${article.slug}.html</loc><lastmod>${published}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`).join("\n");
sitemap = sitemap.replace("</urlset>", `${newUrls}\n</urlset>`);
writeFileSync(sitemapPath, sitemap, "utf8");

console.log(`Generated ${articles.length} pricing blog pages.`);

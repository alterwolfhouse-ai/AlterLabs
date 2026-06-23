import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
function publicHtmlFiles(directory = root) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "_source", "node_modules"].includes(entry.name)) return [];
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return publicHtmlFiles(full);
    return entry.name.endsWith(".html") ? [path.relative(root, full)] : [];
  });
}

const pageFiles = ["services", "solutions"].flatMap((directory) =>
  fs.readdirSync(path.join(root, directory))
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.join(directory, file))
);
const blogFiles = fs.readdirSync(path.join(root, "blog"))
  .filter((file) => file.endsWith(".html"))
  .map((file) => path.join("blog", file));
const legacyInsightFiles = blogFiles.filter((file) => ![
  "business-website-price-7500-india.html",
  "content-generation-price-1999-india.html",
  "ecommerce-website-price-14999-india.html",
  "google-ads-setup-price-3999-india.html",
  "landing-page-price-2999-india.html",
  "meta-ads-setup-price-2999-india.html",
  "social-media-creatives-price-999-india.html",
  "website-for-3000-rupees-india.html",
  "website-for-500-rupees-india.html",
  "website-maintenance-price-5000-india.html",
  "website-update-price-900-india.html"
].some((name) => file.endsWith(name)));

for (const file of pageFiles) {
  const html = read(file);
  const headings = [...html.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
  if (headings.some((level, index) => index > 0 && level > headings[index - 1] + 1)) {
    errors.push(`${file}: heading level skipped (${headings.join(",")})`);
  }
  for (const required of ["application/ld+json", "FAQPage", "rel=\"canonical\"", "Skip to main content"]) {
    if (!html.includes(required)) errors.push(`${file}: missing ${required}`);
  }
  if (html.includes("â‚¹")) errors.push(`${file}: contains mojibake rupee symbol`);
}

const index = read("index.html");
for (const required of ["CRM Automation & Business Websites", "Organization", "rel=\"icon\"", "/favicon.svg"]) {
  if (!index.includes(required)) errors.push(`index.html: missing ${required}`);
}
if (!fs.existsSync(path.join(root, "favicon.svg"))) errors.push("favicon.svg: missing root browser icon");
for (const file of publicHtmlFiles()) {
  const html = read(file);
  if (!html.includes("rel=\"icon\"") || !html.includes("/favicon.svg")) {
    errors.push(`${file}: missing favicon link`);
  }
}

const bundleMatch = index.match(/src="\/?(assets\/index-[^"]+\.js)"/);
if (!bundleMatch) errors.push("index.html: hashed JavaScript bundle not found");
const homepageBundle = bundleMatch ? read(bundleMatch[1]) : "";
for (const forbidden of [
  "Content / Blog",
  "Blog angle",
  "SEO focus:",
  "Offer copy",
  "Each service now",
  "buyers and search engines",
  "overloaded homepage",
  "The homepage now",
  "Commercial entry points"
]) {
  if (homepageBundle.includes(forbidden)) errors.push(`homepage bundle: internal label still visible (${forbidden})`);
}
for (const required of [
  "What this helps you achieve",
  "Clear scope",
  "Built to convert",
  "Ready to grow",
  "Business starting points",
  "Choose the outcome your team needs first",
  "Most teams need one of two fixes first",
  "Find the right path",
  "/insights/#missed-leads"
]) {
  if (!homepageBundle.includes(required)) errors.push(`homepage bundle: missing customer-facing copy (${required})`);
}

for (const file of blogFiles) {
  const html = read(file);
  const headings = [...html.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
  if (headings.some((level, index) => index > 0 && level > headings[index - 1] + 1)) {
    errors.push(`${file}: heading level skipped (${headings.join(",")})`);
  }
  for (const required of ["rel=\"canonical\"", "application/ld+json", "index, follow"]) {
    if (!html.includes(required)) errors.push(`${file}: missing ${required}`);
  }
  const visibleWords = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&\w+;/g, " ")
    .trim()
    .split(/\s+/).length;
  if (visibleWords < 900) errors.push(`${file}: too thin (${visibleWords} visible words)`);
  for (const required of ["class=\"insight-toc\"", "class=\"article-journey\"", "Updated 2026-06-23"]) {
    if (!html.includes(required)) errors.push(`${file}: missing reader journey signal ${required}`);
  }
  for (const forbidden of ["Content angle", "Content and blog plan", "Conversion action"]) {
    if (html.includes(forbidden)) errors.push(`${file}: internal editorial language is public (${forbidden})`);
  }
}

for (const file of legacyInsightFiles) {
  const html = read(file);
  const visibleWords = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&\w+;/g, " ")
    .trim()
    .split(/\s+/).length;
  if (visibleWords < 900) errors.push(`${file}: still too thin (${visibleWords} visible words)`);
  for (const required of ["\"@type\":\"Article\"", "dateModified\":\"2026-06-23", "class=\"insight-toc\"", "class=\"article-journey\""]) {
    if (!html.includes(required)) errors.push(`${file}: missing insight signal ${required}`);
  }
}

const insights = read("insights/index.html");
for (const required of ["CollectionPage", "5</b> problem-led paths", "What is getting in the way?", "class=\"journey-icon\"", "Pricing and scope guides", "id=\"missed-leads\"", "id=\"responsible-ai\""]) {
  if (!insights.includes(required)) errors.push(`insights/index.html: missing ${required}`);
}

const sitemap = read("sitemap.xml");
for (const file of pageFiles) {
  if (!sitemap.includes(`https://alterlabs.in/${file.replaceAll("\\", "/")}`)) errors.push(`sitemap.xml: missing ${file}`);
}
for (const file of blogFiles) {
  if (!sitemap.includes(`https://alterlabs.in/${file.replaceAll("\\", "/")}`)) errors.push(`sitemap.xml: missing ${file}`);
}
if (!sitemap.includes("https://alterlabs.in/insights/")) errors.push("sitemap.xml: missing insights hub");
if (!sitemap.includes("<loc>https://alterlabs.in/</loc>\n    <lastmod>2026-06-23</lastmod>")) errors.push("sitemap.xml: homepage lastmod is stale");

console.log(JSON.stringify({ growthPages: pageFiles.length, blogPages: blogFiles.length, legacyInsights: legacyInsightFiles.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;

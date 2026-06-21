import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
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
for (const required of ["CRM Automation & Business Websites", "Organization"]) {
  if (!index.includes(required)) errors.push(`index.html: missing ${required}`);
}

const bundleMatch = index.match(/src="\/?(assets\/index-[^"]+\.js)"/);
if (!bundleMatch) errors.push("index.html: hashed JavaScript bundle not found");
const homepageBundle = bundleMatch ? read(bundleMatch[1]) : "";
for (const forbidden of ["Content / Blog", "Blog angle", "SEO focus:", "Offer copy"]) {
  if (homepageBundle.includes(forbidden)) errors.push(`homepage bundle: internal label still visible (${forbidden})`);
}
for (const required of ["What this helps you achieve", "Clear scope", "Built to convert", "Ready to grow", "Explore all insights", "/insights/"]) {
  if (!homepageBundle.includes(required)) errors.push(`homepage bundle: missing customer-facing copy (${required})`);
}

for (const file of blogFiles) {
  const html = read(file);
  for (const required of ["rel=\"canonical\"", "application/ld+json", "index, follow"]) {
    if (!html.includes(required)) errors.push(`${file}: missing ${required}`);
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
  if (visibleWords < 350) errors.push(`${file}: still too thin (${visibleWords} visible words)`);
  for (const required of ["\"@type\":\"Article\"", "dateModified\":\"2026-06-21", "href=\"/insights/\""]) {
    if (!html.includes(required)) errors.push(`${file}: missing insight signal ${required}`);
  }
}

const insights = read("insights/index.html");
for (const required of ["CollectionPage", "18</b> operating articles", "CRM, automation and operations"]) {
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
if (!sitemap.includes("<loc>https://alterlabs.in/</loc>\n    <lastmod>2026-06-21</lastmod>")) errors.push("sitemap.xml: homepage lastmod is stale");

console.log(JSON.stringify({ growthPages: pageFiles.length, blogPages: blogFiles.length, legacyInsights: legacyInsightFiles.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;

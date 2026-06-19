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
for (const required of ["CRM Automation & Business Websites", "Organization", "index-OqW8pOQS.css", "index-B7kifHb5.js"]) {
  if (!index.includes(required)) errors.push(`index.html: missing ${required}`);
}

const homepageBundle = read("assets/index-B7kifHb5.js");
for (const forbidden of ["Content / Blog", "Blog angle", "SEO focus:", "Offer copy"]) {
  if (homepageBundle.includes(forbidden)) errors.push(`homepage bundle: internal label still visible (${forbidden})`);
}
for (const required of ["What this helps you achieve", "Clear scope", "Built to convert", "Ready to grow"]) {
  if (!homepageBundle.includes(required)) errors.push(`homepage bundle: missing customer-facing copy (${required})`);
}

const sitemap = read("sitemap.xml");
for (const file of pageFiles) {
  if (!sitemap.includes(`https://alterlabs.in/${file.replaceAll("\\", "/")}`)) errors.push(`sitemap.xml: missing ${file}`);
}

console.log(JSON.stringify({ growthPages: pageFiles.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;

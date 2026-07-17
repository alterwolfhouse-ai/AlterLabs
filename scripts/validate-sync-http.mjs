import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".zip": "application/zip",
};

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
  if (requestUrl.pathname === "/sync") {
    response.writeHead(301, { location: "/sync/" });
    response.end();
    return;
  }

  const relative = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, "");
  const filePath = requestUrl.pathname.endsWith("/")
    ? path.resolve(root, relative, "index.html")
    : path.resolve(root, relative);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": mimeTypes[path.extname(filePath)] ?? "application/octet-stream",
  });
  fs.createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string") throw new Error("HTTP validation server did not start");
const origin = `http://127.0.0.1:${address.port}`;

try {
  const redirect = await fetch(`${origin}/sync`, { redirect: "manual" });
  if (redirect.status !== 301 || redirect.headers.get("location") !== "/sync/") {
    throw new Error("/sync does not redirect to /sync/");
  }

  const requiredPaths = [
    "/",
    "/bns/",
    "/sync/",
    "/sync/icon.svg",
    "/sync/site.webmanifest",
    "/sync/privacy.html",
    "/sync/third-party-notices.html",
    "/sync/licenses/MPL-2.0.txt",
    "/sync/licenses/mediabunny-1.50.8-source.zip",
  ];
  const results = [];
  for (const requestPath of requiredPaths) {
    const response = await fetch(`${origin}${requestPath}`);
    if (!response.ok) throw new Error(`${requestPath} returned ${response.status}`);
    results.push({
      path: requestPath,
      status: response.status,
      type: response.headers.get("content-type"),
      bytes: (await response.arrayBuffer()).byteLength,
    });
  }

  const syncHtml = fs.readFileSync(path.join(root, "sync", "index.html"), "utf8");
  const assetPaths = [...syncHtml.matchAll(/(?:src|href)="\.\/(assets\/[^"?]+)"/g)]
    .map((match) => `/sync/${match[1]}`);
  if (assetPaths.length < 2) throw new Error("AlterSync hashed assets were not discovered");
  for (const requestPath of assetPaths) {
    const response = await fetch(`${origin}${requestPath}`);
    if (!response.ok) throw new Error(`${requestPath} returned ${response.status}`);
    const contentType = response.headers.get("content-type") ?? "";
    if (requestPath.endsWith(".js") && !contentType.startsWith("text/javascript")) {
      throw new Error(`${requestPath} has incorrect JavaScript MIME type ${contentType}`);
    }
    if (requestPath.endsWith(".css") && !contentType.startsWith("text/css")) {
      throw new Error(`${requestPath} has incorrect stylesheet MIME type ${contentType}`);
    }
    results.push({ path: requestPath, status: response.status, type: contentType });
  }

  console.log(JSON.stringify({ syncHttpValidation: "PASS", results }, null, 2));
} finally {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}

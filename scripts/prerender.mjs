import { pathToFileURL } from "node:url";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Renders "/" through the built SSR server bundle (dist/server) and writes the
// resulting HTML to dist/client/index.html. Needed because static hosts
// (Vercel) have no worker to render HTML at request time.
const root = process.argv[2] || process.cwd();
const timeout = setTimeout(() => {
  console.error("prerender timed out after 45s");
  process.exit(1);
}, 45_000);

const mod = await import(pathToFileURL(join(root, "dist/server/index.js")).href);
const handler = mod.default;
const res = await handler.fetch(new Request("http://localhost/"), {}, undefined);
if (!res.ok) throw new Error(`Render failed: ${res.status}`);
const html = await res.text();
if (!html.includes("Cyberheathens")) throw new Error("Rendered HTML missing content");

mkdirSync(join(root, "dist/client"), { recursive: true });
writeFileSync(join(root, "dist/client/index.html"), html);
console.log(`prerendered dist/client/index.html (${html.length} bytes)`);
clearTimeout(timeout);
process.exit(0);

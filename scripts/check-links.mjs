import { load } from "cheerio";
import fs from "node:fs";
const base = process.argv[2] || "http://127.0.0.1:3000";
const routes = [
  "/",
  "/booking",
  "/thought",
  "/thought/10k-hours",
  "/university",
  "/terms",
  "/privacy-policy",
  "/participant-notices",
];
const result = { base, pages: [], links: [], assets: [], external: [] };
const links = new Set(),
  assets = new Set(),
  external = new Set();
for (const route of routes) {
  const res = await fetch(base + route);
  const $ = load(await res.text());
  result.pages.push({
    route,
    status: res.status,
    h1: $("h1").length,
    title: $("title").text(),
  });
  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    if (href.startsWith("#")) {
      if (!$(href).length)
        result.links.push({ href: route + href, status: "missing anchor" });
    } else if (href.startsWith("/")) links.add(href);
    else if (href.startsWith("https://")) external.add(href);
  });
  $("img[src],source[src]").each((_, el) => {
    const src = $(el).attr("src");
    if (src.startsWith("/")) assets.add(src);
  });
}
for (const path of [
  ...links,
  "/sitemap.xml",
  "/robots.txt",
  "/index.html",
  "/booking.html",
  "/terms.html",
  "/privacy-policy.html",
  "/participant-notices.html",
]) {
  const res = await fetch(base + path, { method: "HEAD" });
  result.links.push({ path, status: res.status, url: res.url });
}
for (const path of assets) {
  const res = await fetch(base + path, { method: "HEAD" });
  result.assets.push({ path, status: res.status });
}
if (process.argv.includes("--external")) {
  const urls = [...external];
  let cursor = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (cursor < urls.length) {
        const url = urls[cursor++];
        try {
          const res = await fetch(url, {
            method: "HEAD",
            signal: AbortSignal.timeout(9000),
          });
          result.external.push({ url, status: res.status });
        } catch (e) {
          result.external.push({ url, status: "unverified", reason: e.name });
        }
      }
    }),
  );
}
const bad = [...result.pages, ...result.links, ...result.assets].filter(
  (x) => x.status !== 200,
);
fs.mkdirSync("qa", { recursive: true });
fs.writeFileSync("qa/link-check.json", JSON.stringify(result, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      pages: result.pages.length,
      internalLinks: result.links.length,
      assets: result.assets.length,
      failures: bad,
      external: result.external,
    },
    null,
    2,
  ),
);
if (bad.length) process.exit(1);

import { readFileSync, existsSync } from "node:fs";
import { load } from "cheerio";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
const json = (n) => JSON.parse(readFileSync(`content/${n}.json`, "utf8"));
const norm = (s) => s.replace(/\s+/g, " ").trim();
const sha = (s) => createHash("sha256").update(s).digest("hex");
const baseline = JSON.parse(
  readFileSync("research/source-baseline.json", "utf8"),
);
let checks = 0;
for (const [slug, hash] of Object.entries(baseline.legal)) {
  assert.equal(
    sha(norm(load(json(slug).html).text())),
    hash,
    `${slug}: exact legal text`,
  );
  checks++;
}
const article = json("article");
const $ = load(
  article.html + article.notes.map((n) => `<div>${n.html}</div>`).join(""),
);
const text = norm($.text());
for (const p of baseline.article.passages) {
  assert.ok(text.includes(p), `Missing passage: ${p.slice(0, 90)}`);
  checks++;
}
for (const src of baseline.article.images) {
  assert.equal($(`img[src="${src}"]`).length, 1);
  assert.ok(existsSync("public" + src));
  checks += 2;
}
for (const href of baseline.article.links) {
  assert.ok($(`a[href="${href}"]`).length, `Missing link: ${href}`);
  checks++;
}
assert.equal(article.notes.length, 15);
assert.equal($("img").length, 13);
assert.deepEqual(json("site"), baseline.site);
console.log(
  `PASS: ${checks} content checks; complete legal text, article passages/tables/citations, 13 figures, 15 footnotes, and live site copy.`,
);

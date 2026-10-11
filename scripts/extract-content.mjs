import { readFileSync, writeFileSync } from "node:fs";
import { load } from "cheerio";
const raw = (name) => readFileSync(`research/raw/${name}.html`, "utf8");
const save = (name, data) =>
  writeFileSync(`content/${name}.json`, JSON.stringify(data, null, 2) + "\n");
const clean = ($, el) => {
  el.find("script,style").remove();
  el.find("*").each((_, n) => {
    for (const a of Object.keys(n.attribs || {})) {
      if (a === "style" || a.startsWith("on")) $(n).removeAttr(a);
    }
  });
  return el.html();
};
const $ = load(raw("article"));
const blocks = $(".blog-content");
const head = blocks.eq(0),
  body = blocks.eq(1).clone();
const title = head.find("h1").text().trim();
const notes = [];
body.find(".margin-note").each((_, n) => {
  const id = $(n).attr("id");
  if (id && !id.endsWith("-desktop") && !notes.some((x) => x.id === id))
    notes.push({
      id,
      html: $(n).html(),
      number: $(n).attr("data-footnote-number"),
    });
});
body.find(".margin-note,.callout-margin-notes,.mobile-footnotes").remove();
const toc = body
  .find("#toc a")
  .map((_, a) => ({ label: $(a).text(), href: $(a).attr("href") }))
  .get();
body.find("#toc").remove();
body.find("h4").each((_, n) => {
  n.tagName = "h3";
});
body.find("img").attr("loading", "lazy").attr("decoding", "async");
body
  .find("table")
  .wrap(
    '<div class="table-scroll" tabindex="0" role="region" aria-label="Research data table"></div>',
  );
body.find("th").attr("scope", "col");
body.find(".image-caption").each((_, n) =>
  $(n).html(
    $(n)
      .html()
      .replace(/&nbsp;|\u00a0/g, " "),
  ),
);
save("article", {
  title,
  date: head.find(".blog-meta").text().trim(),
  subtitle: head.find(".subtitle").text().trim(),
  authors: head.find(".authors").text().trim(),
  toc,
  html: clean($, body),
  notes,
});
for (const [file, slug] of [
  ["terms", "terms"],
  ["privacy", "privacy-policy"],
  ["notices", "participant-notices"],
]) {
  const q = load(raw(file));
  const main = q("main");
  const title = main.find("h1").text();
  main.find("h1").remove();
  save(slug, { title, html: clean(q, main) });
}
const u = load(raw("university"));
const h = u("h1").first();
const container = h.parent();
save("university", {
  title: h.text().trim(),
  paragraphs: container
    .find("p")
    .map((_, p) => u(p).text().trim())
    .get(),
  closing:
    "Join us in bringing cutting-edge research opportunities to your campus community.",
});
save("site", JSON.parse(raw("site-copy")).copy);
const inventory = {
  pages: [
    "/",
    "/booking",
    "/thought",
    "/thought/10k-hours",
    "/university",
    "/terms",
    "/privacy-policy",
    "/participant-notices",
  ],
  assets: [],
  links: [],
};
for (const name of [
  "home",
  "booking",
  "thought",
  "article",
  "university",
  "terms",
  "privacy",
  "notices",
]) {
  const q = load(raw(name));
  for (const a of q("a[href]").toArray()) {
    const href = q(a).attr("href");
    if (!inventory.links.some((x) => x.page === name && x.href === href))
      inventory.links.push({
        page: name,
        href,
        label: q(a).text().replace(/\s+/g, " ").trim(),
      });
  }
  for (const a of q("img[src],source[src]").toArray()) {
    const src = q(a).attr("src");
    if (!inventory.assets.includes(src)) inventory.assets.push(src);
  }
}
save("inventory", inventory);
console.log({
  title,
  notes: notes.length,
  images: body.find("img").length,
  toc: toc.length,
  university: container.find("p").length,
});

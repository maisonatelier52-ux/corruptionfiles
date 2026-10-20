#!/usr/bin/env node
/**
 * Pre-deploy SEO and content checks. No dependencies.
 *
 *   npm run check:seo
 *
 * ERRORS stop the build (exit code 1): things that would break pages, links or markup.
 * WARNINGS are reported only: style and length issues that never block a deploy.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const json = (p) => JSON.parse(read(p));

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const TITLE_MAX = 60;
const DESC_MAX = 155;
const DESC_MIN = 70;
const IMAGE_MAX_KB = 150;

function parseDate(text) {
  const t = String(text || "").trim();
  const d = new Date(/^[A-Za-z]+ \d{1,2}, \d{4}$/.test(t) ? `${t} UTC` : t);
  return Number.isNaN(d.getTime()) ? null : d;
}

const articles = json("src/data/articles.json").articles || [];
const authors = json("src/data/authors.json").corruptionfiles || [];
const homepage = json("src/data/homepage.json");
const dims = exists("src/data/image-dimensions.json") ? json("src/data/image-dimensions.json") : {};

const categories = new Set((homepage.categories || []).map((c) => c.category));
const authorSlugs = new Set(authors.map((a) => a.slug));
const articleKey = (a) => `${a.category}/${a.slug}`;
const articleKeys = new Set(articles.map(articleKey));

// Routes that exist for internal-link checking
const staticRoutes = new Set(["/"]);
const appDir = path.join(ROOT, "src/app");
for (const entry of fs.readdirSync(appDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || /^[\[(_]/.test(entry.name) || entry.name.includes(".")) continue;
  const hasPage = ["page.jsx", "page.js", "page.tsx"].some((f) => fs.existsSync(path.join(appDir, entry.name, f)));
  if (hasPage) staticRoutes.add(`/${entry.name}`);
}

function routeExists(href) {
  const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  if (staticRoutes.has(clean)) return true;
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 1 && categories.has(parts[0])) return true;
  if (parts.length === 2 && parts[0] === "authors" && authorSlugs.has(parts[1])) return true;
  if (parts.length === 2 && articleKeys.has(`${parts[0]}/${parts[1]}`)) return true;
  if (parts.length === 2 && categories.has(parts[0]) && parts[1] === "feed.xml") return true;
  if (/^\/(feed\.xml|news-sitemap\.xml|sitemap\.xml|robots\.txt)$/.test(clean)) return true;
  if (exists(`public${clean}`)) return true;
  // dedicated page folders such as src/app/puerto-rico/<slug>/page.jsx
  if (parts.length === 2) {
    const dir = path.join(appDir, parts[0], parts[1]);
    if (["page.jsx", "page.js"].some((f) => fs.existsSync(path.join(dir, f)))) return true;
  }
  return false;
}

function* strings(value) {
  if (typeof value === "string") yield value;
  else if (Array.isArray(value)) for (const v of value) yield* strings(v);
  else if (value && typeof value === "object") for (const v of Object.values(value)) yield* strings(v);
}

// ---------- article checks ----------
const seenSlugs = new Map();
const titles = new Map();
const descriptions = new Map();

articles.forEach((a, i) => {
  const id = a.slug ? `article ${a.slug}` : `article #${i + 1}`;

  for (const field of ["heading", "slug", "category", "date", "metaTitle", "metaDescription", "heroImage"]) {
    if (!a[field]) err(id, `missing "${field}"`);
  }
  if (a.date && !parseDate(a.date)) err(id, `date "${a.date}" is not a valid date`);
  if (a.updated && !parseDate(a.updated)) err(id, `updated "${a.updated}" is not a valid date`);

  if (a.slug) {
    if (seenSlugs.has(a.slug)) err(id, `slug is also used by ${seenSlugs.get(a.slug)}`);
    seenSlugs.set(a.slug, `article #${i + 1}`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) warn(id, `slug has characters other than lowercase letters, numbers and hyphens`);
  }
  if (a.category && !categories.has(a.category)) err(id, `category "${a.category}" is not in homepage.json categories`);

  const authorSlug = a.author && (a.author.slug || a.author.name);
  if (!a.author) err(id, "missing author");
  else if (!a.author.slug || !authorSlugs.has(a.author.slug)) err(id, `author "${a.author.name || authorSlug}" has no matching page in authors.json`);

  // images
  if (a.heroImage) {
    if (!exists(`public${a.heroImage}`)) err(id, `hero image ${a.heroImage} is not in /public`);
    else if (!dims[a.heroImage]) warn(id, `hero image has no entry in image-dimensions.json (run: node scripts/optimize-images.mjs)`);
    else if (dims[a.heroImage].bytes / 1024 > IMAGE_MAX_KB) warn(id, `hero image is ${Math.round(dims[a.heroImage].bytes / 1024)} KB (limit ${IMAGE_MAX_KB} KB)`);
  }
  if (a.slug && !exists(`public/og/${a.slug}.jpg`)) warn(id, `no sharing image (run: node scripts/optimize-images.mjs --og)`);
  if (!a.alt) warn(id, "missing image alt text");
  else if (a.alt.length < 20) warn(id, `image alt text is very short ("${a.alt}")`);

  // length and uniqueness
  if (a.metaTitle) {
    if (a.metaTitle.length > TITLE_MAX) warn(id, `search title is ${a.metaTitle.length} characters (limit ${TITLE_MAX})`);
    if (a.metaTitle.length < 20) warn(id, `search title is very short (${a.metaTitle.length} characters)`);
    if (titles.has(a.metaTitle)) warn(id, `search title duplicates ${titles.get(a.metaTitle)}`);
    titles.set(a.metaTitle, id);
  }
  if (a.metaDescription) {
    if (a.metaDescription.length > DESC_MAX) warn(id, `search description is ${a.metaDescription.length} characters (limit ${DESC_MAX})`);
    if (a.metaDescription.length < DESC_MIN) warn(id, `search description is short (${a.metaDescription.length} characters)`);
    if (descriptions.has(a.metaDescription)) warn(id, `search description duplicates ${descriptions.get(a.metaDescription)}`);
    descriptions.set(a.metaDescription, id);
  }
  if (!a.excerpt) warn(id, "missing excerpt (used in feeds and cards)");

  // related posts
  (a.relatedPosts || []).forEach((r) => {
    if (!articleKeys.has(`${r.category}/${r.slug}`)) err(id, `related post ${r.category}/${r.slug} does not exist`);
    else if (r.slug === a.slug) warn(id, "lists itself as a related post");
    if (r.image && !exists(`public${r.image}`)) err(id, `related post image ${r.image} is not in /public`);
  });

  // sources
  (a.sources || []).forEach((s) => {
    const url = typeof s === "string" ? s : s?.url;
    if (url && !/^https?:\/\//i.test(url)) warn(id, `source link "${String(url).slice(0, 50)}" is not an http(s) URL`);
  });

  // internal links inside the article text
  for (const text of strings(a.body)) {
    for (const m of text.matchAll(/href=["'](\/[^"']*)["']/g)) {
      if (!routeExists(m[1])) err(id, `body links to ${m[1]}, which is not a page on this site`);
    }
  }
});

// ---------- homepage.json cards vs article pages ----------
// The home, category, author and sidebar lists are built from the cards in
// homepage.json, while article pages come from articles.json. They must agree.
const cards = [];
(function collect(value) {
  if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === "object") {
    if (value.slug && value.category) cards.push(value);
    Object.entries(value).forEach(([k, v]) => k !== "categories" && collect(v));
  }
})(homepage);
const cardKeys = new Set(cards.map(articleKey));
for (const key of cardKeys) {
  if (!articleKeys.has(key)) err("homepage.json", `a card links to /${key}, but there is no article page for it`);
}
for (const a of articles) {
  if (a.slug && a.category && !cardKeys.has(articleKey(a))) {
    warn(`article ${a.slug}`, "has no card in homepage.json, so it is not listed on the home, category or author pages");
  }
}

// ---------- author checks ----------
authors.forEach((au) => {
  const id = `author ${au.slug || au.name}`;
  if (!au.slug) err(id, "missing slug");
  for (const f of ["avatar", "coverImage"]) {
    if (au[f] && !exists(`public${au[f]}`)) err(id, `${f} ${au[f]} is not in /public`);
  }
});

// ---------- sitemap and discovery checks ----------
const sitemapSrc = exists("src/app/sitemap.js") ? read("src/app/sitemap.js") : "";
const staticList = sitemapSrc.match(/const STATIC_PAGES = \[([\s\S]*?)\];/);
if (staticList) {
  for (const m of staticList[1].matchAll(/"(\/[^"]*)"/g)) {
    if (!routeExists(m[1])) err("sitemap.js", `lists ${m[1]}, which is not a page on this site`);
  }
} else {
  warn("sitemap.js", "could not find STATIC_PAGES to check");
}

const keyFiles = exists("public") ? fs.readdirSync(path.join(ROOT, "public")).filter((f) => /^[a-f0-9]{32}\.txt$/i.test(f)) : [];
if (keyFiles.length !== 1) warn("IndexNow", `expected exactly one key file in /public, found ${keyFiles.length}`);
else if (read(`public/${keyFiles[0]}`).trim() !== keyFiles[0].replace(/\.txt$/i, "")) err("IndexNow", `${keyFiles[0]} does not contain its own key`);

for (const f of ["public/logo.png", "public/og-twitter.webp"]) {
  if (!exists(f)) err("assets", `${f} is missing (used in structured data and sharing cards)`);
}

// ---------- report ----------
const print = (title, list) => {
  if (!list.length) return;
  console.log(`\n${title} (${list.length})`);
  list.forEach((l) => console.log("  - " + l));
};
console.log(`SEO check: ${articles.length} articles, ${authors.length} authors, ${categories.size} categories`);
print("ERRORS", errors);
print("WARNINGS", warnings);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).`);
if (errors.length) {
  console.log("Fix the errors above before deploying.");
  process.exit(1);
}
console.log("No blocking problems found.");

#!/usr/bin/env node
/**
 * Tells Bing, Yandex and other IndexNow search engines that pages are new or changed.
 * (Google does not use IndexNow.) Run it AFTER the deploy is live, because the engines
 * fetch the key file from your site to verify the request.
 *
 *   node scripts/indexnow.mjs                  home + articles from the last 3 days (and their category pages)
 *   node scripts/indexnow.mjs --days 7         widen the window
 *   node scripts/indexnow.mjs --all            every article, category and author page
 *   node scripts/indexnow.mjs <url> <url> ...  specific URLs
 *   node scripts/indexnow.mjs --dry-run        show what would be sent without sending
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com").replace(/\/$/, "");
const HOST = new URL(SITE_URL).host;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const valueOf = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const explicitUrls = argv.filter((a) => /^https?:\/\//i.test(a));

// The key file is public/<key>.txt, containing the key itself.
const keyFile = fs
  .readdirSync(path.join(ROOT, "public"))
  .find((f) => /^[a-f0-9]{32}\.txt$/i.test(f));
if (!keyFile) {
  console.error("No IndexNow key file found in /public (expected <32 hex characters>.txt).");
  process.exit(1);
}
const KEY = keyFile.replace(/\.txt$/i, "");
const KEY_LOCATION = `${SITE_URL}/${keyFile}`;

const data = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/articles.json"), "utf8"));
const articles = data.articles || [];
const authors = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/authors.json"), "utf8")).corruptionfiles || [];

function parseDate(text) {
  const t = String(text || "").trim();
  const d = new Date(/^[A-Za-z]+ \d{1,2}, \d{4}$/.test(t) ? `${t} UTC` : t);
  return Number.isNaN(d.getTime()) ? null : d;
}

let urls;
if (explicitUrls.length) {
  urls = explicitUrls;
} else if (flag("--all")) {
  urls = [
    SITE_URL,
    ...new Set(articles.map((a) => `${SITE_URL}/${a.category}`)),
    ...articles.map((a) => `${SITE_URL}/${a.category}/${a.slug}`),
    ...authors.map((a) => `${SITE_URL}/authors/${a.slug}`),
  ];
} else {
  const days = Number(valueOf("--days", "3"));
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const recent = articles.filter((a) => {
    const d = parseDate(a.updated) || parseDate(a.date);
    return d && d.getTime() >= cutoff;
  });
  urls = [
    ...(recent.length ? [SITE_URL] : []),
    ...new Set(recent.map((a) => `${SITE_URL}/${a.category}`)),
    ...recent.map((a) => `${SITE_URL}/${a.category}/${a.slug}`),
  ];
}
urls = [...new Set(urls)].slice(0, 10000);

if (!urls.length) {
  console.log("Nothing to submit: no articles in that window. Use --days N, --all, or pass URLs.");
  process.exit(0);
}

const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
console.log(`${urls.length} URL(s) for ${HOST}`);
urls.slice(0, 10).forEach((u) => console.log("  " + u));
if (urls.length > 10) console.log(`  ... and ${urls.length - 10} more`);

if (flag("--dry-run")) {
  console.log("\nDry run: nothing sent. Key location:", KEY_LOCATION);
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
const body = await res.text();
console.log(`\nIndexNow responded: ${res.status} ${res.statusText}${body ? " - " + body : ""}`);
if (res.status === 200 || res.status === 202) {
  console.log("Accepted.");
} else {
  console.log("Not accepted. 403 usually means the key file is not live yet (deploy first); 422 means a URL does not match the host.");
  process.exit(1);
}

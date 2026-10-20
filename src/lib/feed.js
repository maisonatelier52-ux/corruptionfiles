import articlesData from "@/data/articles.json";
import imageDims from "@/data/image-dimensions.json";
import { SITE_URL, SITE_NAME, absoluteUrl, parseDate } from "@/lib/seo";

const MIME = { webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png" };

export function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Newest-first list of articles, optionally for one category. */
export function latestArticles(limit = 30, category) {
  return (articlesData.articles || [])
    .filter((a) => a?.slug && a?.category && (!category || a.category === category))
    .map((a) => ({ a, t: parseDate(a.date)?.getTime() ?? 0 }))
    .sort((x, y) => y.t - x.t)
    .slice(0, limit)
    .map((x) => x.a);
}

function itemXml(a) {
  const url = `${SITE_URL}/${a.category}/${a.slug}`;
  const date = parseDate(a.date);
  const author = typeof a.author === "object" ? a.author?.name : a.author;
  const image = a.heroImage || a.image;
  const info = image && imageDims[image];
  const ext = image ? image.split(".").pop().toLowerCase() : "";
  return [
    "    <item>",
    `      <title>${escapeXml(a.heading)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    date ? `      <pubDate>${date.toUTCString()}</pubDate>` : "",
    author ? `      <dc:creator>${escapeXml(author)}</dc:creator>` : "",
    a.categoryLabel ? `      <category>${escapeXml(a.categoryLabel)}</category>` : "",
    `      <description>${escapeXml(a.excerpt || a.metaDescription || "")}</description>`,
    info && MIME[ext]
      ? `      <enclosure url="${escapeXml(absoluteUrl(image))}" length="${info.bytes}" type="${MIME[ext]}" />`
      : "",
    "    </item>",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildRss({ title, link, selfUrl, description, items }) {
  const newest = items.length ? parseDate(items[0].date) : null;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${link}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
${newest ? `    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>\n` : ""}    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${absoluteUrl("/logo.png")}</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
${items.map(itemXml).join("\n")}
  </channel>
</rss>
`;
}

export const FEED_HEADERS = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
};

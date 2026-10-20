import articlesData from "@/data/articles.json";
import { SITE_URL, SITE_NAME, parseDate } from "@/lib/seo";
import { escapeXml } from "@/lib/feed";

// Re-evaluated at most once an hour, so the 48-hour window keeps moving
// between deploys.
export const revalidate = 3600;

const WINDOW_MS = 48 * 60 * 60 * 1000;

export function GET() {
  const now = Date.now();
  const recent = (articlesData.articles || [])
    .map((a) => ({ a, d: parseDate(a.date) }))
    .filter(({ a, d }) => a?.slug && a?.category && d && now - d.getTime() <= WINDOW_MS && d.getTime() <= now)
    .sort((x, y) => y.d - x.d)
    .slice(0, 1000);

  const urls = recent
    .map(
      ({ a, d }) => `  <url>
    <loc>${SITE_URL}/${a.category}/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${d.toISOString().slice(0, 10)}</news:publication_date>
      <news:title>${escapeXml(a.heading)}</news:title>
    </news:news>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

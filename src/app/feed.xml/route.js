import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildRss, latestArticles, FEED_HEADERS } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  const xml = buildRss({
    title: SITE_NAME,
    link: SITE_URL,
    selfUrl: `${SITE_URL}/feed.xml`,
    description: `Latest articles from ${SITE_NAME}.`,
    items: latestArticles(30),
  });
  return new Response(xml, { headers: FEED_HEADERS });
}

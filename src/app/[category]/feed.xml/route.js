import articlesData from "@/data/articles.json";
import homepageData from "@/data/homepage.json";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildRss, latestArticles, FEED_HEADERS } from "@/lib/feed";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = [...new Set((articlesData.articles || []).map((a) => a.category).filter(Boolean))];
  return categories.map((category) => ({ category }));
}

export async function GET(_request, { params }) {
  const { category } = await params;
  const items = latestArticles(30, category);
  if (!items.length) return new Response("Not found", { status: 404 });

  const label =
    (homepageData.categories || []).find((c) => c.category === category)?.label || category;

  const xml = buildRss({
    title: `${label} | ${SITE_NAME}`,
    link: `${SITE_URL}/${category}`,
    selfUrl: `${SITE_URL}/${category}/feed.xml`,
    description: `Latest ${label} articles from ${SITE_NAME}.`,
    items,
  });
  return new Response(xml, { headers: FEED_HEADERS });
}

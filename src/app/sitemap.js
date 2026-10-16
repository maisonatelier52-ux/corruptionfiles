import articlesData from "@/data/articles.json";
import authorsData from "@/data/authors.json";
import { SITE_URL, absoluteUrl, newestDate } from "@/lib/seo";

// Every real static page in src/app/ that should be indexed.
const STATIC_PAGES = [
  "/about",
  "/contact",
  "/our-team",
  "/editorial-policy",
  "/corrections-policy",
  "/right-of-reply-policy",
  "/source-methodology",
  "/ownership-and-funding",
  "/advertising-and-sponsored-content-policy",
  "/legal",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap() {
  const articles = articlesData.articles || [];
  const authors = authorsData.corruptionfiles || [];

  const entries = new Map(); // url -> entry (deduplicates automatically)
  const add = (entry) => {
    if (!entries.has(entry.url)) entries.set(entry.url, entry);
  };

  // Home: as fresh as the newest article
  add({
    url: SITE_URL,
    lastModified: newestDate(articles.map((a) => a.date)),
  });

  // Categories come from the data, so a new category appears automatically.
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];
  categories.forEach((category) => {
    add({
      url: `${SITE_URL}/${category}`,
      lastModified: newestDate(
        articles.filter((a) => a.category === category).map((a) => a.date)
      ),
    });
  });

  // Articles, with their hero image
  articles.forEach((a) => {
    if (!a?.slug || !a?.category) return;
    const image = a.heroImage || a.image;
    add({
      url: `${SITE_URL}/${a.category}/${a.slug}`,
      lastModified: newestDate([a.updated, a.date]),
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    });
  });

  // Authors: as fresh as their newest article
  authors.forEach((author) => {
    if (!author?.slug) return;
    add({
      url: `${SITE_URL}/authors/${author.slug}`,
      lastModified: newestDate(
        articles
          .filter((a) => (a.author?.slug || a.author?.name) && (a.author.slug === author.slug || a.author.name === author.name))
          .map((a) => a.date)
      ),
    });
  });

  // Static pages: no lastModified (we don't know when they last changed,
  // and a made-up date is worse than none).
  STATIC_PAGES.forEach((path) => add({ url: `${SITE_URL}${path}` }));

  return [...entries.values()];
}

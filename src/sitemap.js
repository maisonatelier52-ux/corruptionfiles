import articlesData from "../public/data/articles.json";

const SITE_URL = "https://www.corruptionfiles.com"; // 🔁 Replace with your actual domain

export default function sitemap() {
  const now = new Date();

  /* ---------------- STATIC PAGES ---------------- */
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  /* ---------------- CATEGORY PAGES ---------------- */
  // Derived from the categories list in your data
  const categories = [
    "govt",
    "puerto-rico",
    "pa",
    "tech",
    "medical-fraud",
    "eco",
    "intelligence",
    "offshore",
  ];

  const categoryPages = categories.map((category) => ({
    url: `${SITE_URL}/${category}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  /* ---------------- ARTICLE PAGES ---------------- */
  const articlePages = articlesData.articles.map((article) => ({
    url: `${SITE_URL}/${article.category}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  /* ---------------- AUTHOR PAGES ---------------- */
  const authorSlugs = [
    "margaret-holloway",
    "carlos-medina-reyes",
    "darnell-hutchins",
    "simone-varlette",
    "ruth-anselmi",
    "thomas-aldgate",
    "naomi-vosburgh",
    "felix-draper",
  ];

  const authorPages = authorSlugs.map((slug) => ({
    url: `${SITE_URL}/authors/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  /* ---------------- COMBINE ALL ---------------- */
  return [...staticPages, ...categoryPages, ...articlePages, ...authorPages];
}
import articlesData from "@/data/articles.json";
import authorsData from "@/data/authors.json";

const SITE_URL = "https://www.corruptionfiles.com"; // 🔁 Replace with your actual domain

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    {
      url: SITE_URL,                        // app/page.jsx
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,             // app/about/page.js
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,    // app/privacy-policy/page.js
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,             // app/terms/page.js
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];


  const categories = [
    "govt",           // Government
    "puerto-rico",    // Puerto Rico
    "pa",             // Police Accountability
    "tech",           // Big Tech & Surveillance
    "medical-fraud",  // Medical Fraud
    "eco",            // Environmental Exploitation
    "intelligence",   // Intelligence
    "offshore",       // Offshore Wealth & Sanctions
  ];

  const categoryPages = categories.map((category) => ({
    url: `${SITE_URL}/${category}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));


  const articlePages = articlesData.articles.map((article) => ({
    url: `${SITE_URL}/${article.category}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly",
    priority: 0.9,
  }));


  const authorPages = authorsData.corruptionfiles.map((author) => ({
    url: `${SITE_URL}/authors/${author.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  /* ─────────────────────────────────────────────────────
     COMBINED — order: home → categories → articles → authors
  ───────────────────────────────────────────────────── */
  return [...staticPages, ...categoryPages, ...articlePages, ...authorPages];
}
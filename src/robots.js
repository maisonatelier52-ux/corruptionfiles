// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",        // Applies to all crawlers (Google, Bing, etc.)
        allow: "/",            // Allow full access to the site
        disallow: ["/_next/"], // Block Next.js internal paths
        // Uncomment and customize to block additional paths if needed:
        // disallow: ["/admin/", "/private/", "/preview/"],
      },
    ],
    sitemap: "https://www.corruptionfiles.com/sitemap.xml", // 🔁 Replace with your actual domain
    host: "https://www.corruptionfiles.com",                // 🔁 Replace with your actual domain
  };
}
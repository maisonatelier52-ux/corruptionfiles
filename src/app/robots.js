// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    // This ensures it matches your production URL automatically
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.corruptionfiles.com'}/sitemap.xml`,
  };
}
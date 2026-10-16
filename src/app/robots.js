// src/app/robots.js
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";

// AI-crawler policy. Edit these lists to change it.
//
// ALLOWED (by the "*" rule below): search and answer crawlers such as Googlebot,
// Bingbot, OAI-SearchBot, PerplexityBot and Claude-SearchBot. They show your pages
// and link back to them in search and AI answers.
//
// BLOCKED: crawlers whose main purpose is collecting pages to train models.
// They send no readers back. Blocking Google-Extended and Applebot-Extended does
// NOT affect Google Search or Apple search ranking.
//
// To allow everything again, set AI_TRAINING_BOTS to [].
const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "Meta-ExternalAgent",
];

export default function robots() {
  const rules = [{ userAgent: "*", allow: "/" }];

  // NOTE: /_next/ is intentionally NOT disallowed. It serves the JS, CSS and
  // optimised images that search engines need to render and index your pages.
  if (AI_TRAINING_BOTS.length) {
    rules.push({ userAgent: AI_TRAINING_BOTS, disallow: "/" });
  }

  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

// Shared SEO helpers. Import from "@/lib/seo".

import imageDims from "@/data/image-dimensions.json";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
export const SITE_NAME = "Corruption Files";

/** Turns "/path" or "path" into a full https://... URL on this site. */
export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Parses dates like "June 29, 2026" (or ISO strings). Returns a Date or null. */
export function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Newest valid date in a list of date strings, or undefined. */
export function newestDate(values = []) {
  let best = null;
  for (const v of values) {
    const d = parseDate(v);
    if (d && (!best || d > best)) best = d;
  }
  return best || undefined;
}

/**
 * Safe JSON-LD serializer for <script type="application/ld+json">.
 * Plain JSON.stringify can break out of the script tag if any text contains
 * "</script>"; escaping "<" (and the two line-separator characters) prevents that.
 */
export function jsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const MIME = { webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif" };

/** Real { width, height } of an image in /public, from src/data/image-dimensions.json. */
export function getImageInfo(path) {
  const info = path && imageDims[path];
  return info ? { width: info.width, height: info.height } : null;
}

/**
 * Open Graph / Twitter image for an article: the 1200x630 sharing image in
 * /public/og/<slug>.jpg when it exists, otherwise the hero image with its real size.
 * Create the sharing images with: node scripts/optimize-images.mjs --og
 */
export function socialImage(article) {
  const og = `/og/${article.slug}.jpg`;
  if (imageDims[og]) {
    return { url: absoluteUrl(og), width: imageDims[og].width, height: imageDims[og].height, type: "image/jpeg" };
  }
  const hero = article.heroImage || article.image || "/og-twitter.webp";
  const info = getImageInfo(hero);
  const ext = hero.split(".").pop().toLowerCase();
  return { url: absoluteUrl(hero), width: info?.width, height: info?.height, type: MIME[ext] };
}


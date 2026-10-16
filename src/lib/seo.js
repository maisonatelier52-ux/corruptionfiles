// Shared SEO helpers. Import from "@/lib/seo".

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

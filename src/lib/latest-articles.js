import homepageData from "@/data/homepage.json";

/**
 * Collects every homepage article that has a slug, title, date and image,
 * removes duplicates, and returns the newest `count` items.
 *
 * Shared by the sidebar on the homepage, category pages, author pages and
 * article pages so they all show the same "Latest Today" list.
 *
 * Pass `excludeSlug` (on an article page) to leave that article out, so the
 * list still returns `count` other articles.
 */
export function getLatestArticles(count = 4, excludeSlug) {
  const all = [];
  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => {
      if (a?.slug && a?.title && a?.date && a?.image) all.push(a);
    });
  };

  push(homepageData.politicsNews);
  push(homepageData.secondaryNews);
  push(homepageData.inOtherNews?.grid);
  push(homepageData.healthcareNews);
  push(homepageData.worldNews?.sidebar);
  push(homepageData.discoveryMiddle);
  push(homepageData.discoveryRight);
  push(homepageData.technologyNews);
  push(homepageData.trendingSectionData);
  push(homepageData.newsCards);

  [
    homepageData.discoveryMain,
    homepageData.worldNews?.main,
    homepageData.inOtherNews?.featured,
  ].forEach((a) => {
    if (a?.slug && a?.title && a?.date && a?.image) all.push(a);
  });

  const seen = new Set();
  const unique = all.filter((a) => {
    if (excludeSlug && a.slug === excludeSlug) return false;
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });

  unique.sort((a, b) => new Date(b.date) - new Date(a.date));
  return unique.slice(0, count);
}

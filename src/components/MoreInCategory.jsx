import Link from "next/link";
import articlesData from "@/data/articles.json";
import homepageData from "@/data/homepage.json";
import { parseDate } from "@/lib/seo";

/**
 * Text list of the newest articles in the same category, skipping the current
 * article and anything already shown as a related post.
 */
export default function MoreInCategory({ category, excludeSlugs = [], limit = 4 }) {
  const label =
    (homepageData.categories || []).find((c) => c.category === category)?.label || category;

  const items = (articlesData.articles || [])
    .filter((a) => a?.category === category && a?.slug && !excludeSlugs.includes(a.slug))
    .map((a) => ({ a, t: parseDate(a.date)?.getTime() ?? 0 }))
    .sort((x, y) => y.t - x.t)
    .slice(0, limit)
    .map((x) => x.a);

  if (!items.length) return null;

  return (
    <section aria-labelledby="more-in-category-heading" className="mt-12 max-w-[46rem]">
      <h2
        id="more-in-category-heading"
        className="border-t-2 border-gray-900 pt-3 text-lg font-bold tracking-tight text-gray-900"
      >
        More in {label}
      </h2>
      <ul className="mt-2 divide-y divide-gray-200">
        {items.map((a) => {
          const iso = parseDate(a.date)?.toISOString().slice(0, 10);
          return (
            <li key={a.slug}>
              <Link
                href={`/${a.category}/${a.slug}`}
                className="group flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-[16px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[#1565c0]">
                  {a.heading}
                  {a.isSponsored && (
                    <span className="ml-2 text-xs font-normal text-gray-600">Sponsored content</span>
                  )}
                </span>
                <time dateTime={iso} className="shrink-0 text-[13px] text-gray-600">
                  {a.date}
                </time>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href={`/${category}`}
        className="mt-3 inline-block text-sm font-semibold text-[#1565c0] hover:underline"
      >
        All {label} articles
      </Link>
    </section>
  );
}

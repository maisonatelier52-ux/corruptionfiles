import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";
import homepageData from "@/data/homepage.json";
import StickyAd from "@/components/StickyAd";
import NewsletterSidebar from "@/components/NewsletterSidebar";
import { getLatestArticles } from "@/lib/latest-articles";

/**
 * The right-hand column used on the homepage, category pages, author pages
 * and article pages. Edit it here and every page updates.
 *
 * Props
 *  - activeCategory: slug of the category being viewed (highlights its chip)
 *  - showNewsletter: show the sign-up box under the categories
 *  - excludeSlug: slug of the article being read, kept out of "Latest Today"
 */

function toISODate(dateStr) {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

const SECTION_HEADING =
  "border-t-2 border-gray-900 pt-3 text-lg font-bold tracking-tight text-gray-900";

/**
 * One "Latest Today" entry.
 *  - Row layout (text left, thumbnail right) for most items.
 *  - The first item becomes a larger image-on-top card on phones and in the
 *    narrow desktop column, and stays a row in the two-column tablet layout.
 */
function LatestItem({ item, lead = false }) {
  const href = `/${item.category}/${item.slug}`;
  const iso = toISODate(item.date);
  const sponsored = item.isSponsored || item.sponsored;

  const linkLayout = lead
    ? "flex-col-reverse gap-3 md:flex-row md:gap-4 lg:flex-col-reverse lg:gap-3"
    : "gap-4";

  const imageBox = lead
    ? "relative aspect-[16/9] w-full overflow-hidden rounded-md bg-gray-100 md:aspect-auto md:h-[76px] md:w-[96px] md:flex-none lg:aspect-[16/9] lg:h-auto lg:w-full"
    : "relative h-[76px] w-[96px] flex-none overflow-hidden rounded-md bg-gray-100";

  const titleSize = lead
    ? "text-[17px] font-bold md:text-[15px] md:font-semibold lg:text-[17px] lg:font-bold"
    : "text-[15px] font-semibold";

  return (
    <li>
      <Link
        href={href}
        title={item.title}
        className={`group flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2196f3] ${linkLayout}`}
      >
        <div className="min-w-0 flex-1">
          <h3
            className={`${titleSize} line-clamp-5 leading-snug text-gray-900 transition-colors group-hover:text-[#1565c0]`}
          >
            {item.title}
          </h3>
          {sponsored ? (
            <p className="mt-1.5 flex items-center gap-1 text-[13px] text-gray-500">
              <Bell size={11} aria-hidden="true" /> Sponsored content
            </p>
          ) : (
            <time
              dateTime={iso}
              className="mt-1.5 block text-[13px] text-gray-500"
            >
              {item.date}
            </time>
          )}
        </div>
        <div className={imageBox}>
          <Image
            src={item.image}
            alt={item.alt || item.title}
            fill
            sizes={lead ? "(max-width: 767px) 100vw, 300px" : "96px"}
            className="object-cover"
          />
          {item.badge && (
            <span className="absolute right-1.5 top-1.5 z-10 rounded-sm bg-[#f69a4d] px-1.5 py-0.5 text-[11px] font-bold text-white">
              {item.badge}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}

function CategoryChip({ cat, active }) {
  return (
    <Link
      href={`/${cat.category}`}
      title={`Browse ${cat.label} articles`}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center rounded-full border px-4 py-2.5 text-sm font-medium leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2196f3] ${
        active
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-300 bg-white text-gray-800 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
      }`}
    >
      {cat.label}
    </Link>
  );
}

export default function SiteSidebar({
  activeCategory,
  showNewsletter = false,
  excludeSlug,
}) {
  const latest = getLatestArticles(4, excludeSlug);
  const categories = homepageData.categories || [];

  return (
    <aside
      className="w-full flex-shrink-0 lg:w-[280px] xl:w-[300px]"
      aria-label="Sidebar — Latest articles and categories"
    >
      <StickyAd />

      {latest.length > 0 && (
        <section aria-labelledby="sidebar-latest-heading" className="mb-10">
          <h2 id="sidebar-latest-heading" className={SECTION_HEADING}>
            Latest Today
          </h2>
          <ul className="mt-5 grid gap-6 md:grid-cols-2 md:gap-x-8 lg:grid-cols-1">
            {latest.map((item, i) => (
              <LatestItem key={item.id ?? item.slug} item={item} lead={i === 0} />
            ))}
          </ul>
        </section>
      )}

      {categories.length > 0 && (
        <nav aria-labelledby="sidebar-categories-heading" className="mb-10">
          <h2 id="sidebar-categories-heading" className={SECTION_HEADING}>
            Categories
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <li key={cat.category}>
                <CategoryChip cat={cat} active={cat.category === activeCategory} />
              </li>
            ))}
          </ul>
        </nav>
      )}

      {showNewsletter && <NewsletterSidebar />}
    </aside>
  );
}

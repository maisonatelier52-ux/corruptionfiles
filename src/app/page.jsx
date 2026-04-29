import Link from "next/link";
import Image from "next/image";
import { Share2, Bell, Calendar } from "lucide-react";
import homepageData from "@/data/homepage.json";
import Newsletter from "@/components/Newsletter";
import AdBanner from "@/components/AdBanner";
import StickyAd from "@/components/StickyAd";
import CategoryCard from "@/components/CategoryCard";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

// ─── METADATA ────────────────────────────────────────────────────────────────
// FIX: Added keywords, canonical, robots, complete OG block (url, description,
//      image with dimensions), and Twitter card. Fixed site name.

export const metadata = {
  title: `${SITE_NAME} | Investigative News on Politics, Surveillance & Accountability`,
  description:
    "Corruption Files covers government accountability, police misconduct, medical fraud, offshore wealth, and environmental exploitation — stories the powerful don't want told.",

  // FIX: keywords
  keywords:
    "investigative journalism, government accountability, police misconduct, medical fraud, offshore wealth, sanctions, environmental exploitation, surveillance, corruption news",

  // FIX: canonical
  alternates: {
    canonical: SITE_URL,
  },

  // FIX: explicit robots
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // FIX: complete Open Graph
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Investigative News on Politics, Surveillance & Accountability`,
    description:
      "Corruption Files covers government accountability, police misconduct, medical fraud, offshore wealth, and environmental exploitation.",
    images: [
      {
        url: `${SITE_URL}/og-homepage.jpg`, // update to your actual OG image
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Investigative Journalism`,
      },
    ],
  },

  // FIX: Twitter card
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Investigative News`,
    description:
      "Corruption Files covers government accountability, police misconduct, medical fraud, offshore wealth, and environmental exploitation.",
    images: [`${SITE_URL}/og-homepage.jpg`],
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Convert a date string to ISO-8601 for <time dateTime> and JSON-LD */
function toISODate(dateStr) {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

function labelToSlug(label) {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .trim();
}

function authorHref(name) {
  return `/authors/${name.toLowerCase().replace(/\s+/g, "-")}`;
}

// ─── LATEST ARTICLES ─────────────────────────────────────────────────────────

function collectLatestArticles(count = 4) {
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
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });

  unique.sort((a, b) => new Date(b.date) - new Date(a.date));
  return unique.slice(0, count);
}

const LATEST_ARTICLES = collectLatestArticles(4);

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    // FIX: aria-hidden on decorative play icon
    <div
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow">
        <svg
          className="w-4 h-4 text-gray-800 ml-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </div>
    </div>
  );
}

// ─── NewsCard ────────────────────────────────────────────────────────────────
// FIX: title attr on links, rel="author", aria-hidden on icons, <time dateTime>

function NewsCard({
  slug,
  category,
  image,
  categoryLabel,
  categoryColor,
  date,
  isSponsored,
  author,
  title,
  description,
  priority = false,
}) {
  const href = `/${category}/${slug}`;
  const iso = toISODate(date);

  return (
    <article className="flex flex-col group">
      <div className="w-full aspect-video overflow-hidden mb-3">
        <Link href={href} title={title} className="relative block w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute bottom-3 left-3 ${categoryColor} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider z-10`}
          >
            {categoryLabel}
          </span>
        </Link>
      </div>

      <div className="text-[11px] text-gray-400 mb-1 flex items-center gap-1">
        {isSponsored ? (
          <>
            {/* FIX: aria-hidden on decorative icon */}
            <Bell size={11} aria-hidden="true" /> Sponsored content
          </>
        ) : (
          <>
            <Calendar size={11} aria-hidden="true" />
            {/* FIX: <time> with dateTime */}
            <time dateTime={iso}>{date}</time>
          </>
        )}
      </div>

      {/* FIX: h3 is correct here (under a section h2) */}
      <h3 className="font-bold text-[16px] text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
        <Link href={href} title={title}>
          {title}
        </Link>
      </h3>

      <p className="text-xs text-gray-500 mb-2">
        By{" "}
        {/* FIX: rel="author" + title on author link */}
        <Link
          href={authorHref(author)}
          title={`More articles by ${author}`}
          rel="author"
          className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
        >
          {author}
        </Link>
      </p>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {description}
      </p>
    </article>
  );
}

// ─── NewsListCard ─────────────────────────────────────────────────────────────
// FIX: was using <h2> for article titles which clashes with section <h2>s → <h3>
//      Added title attrs, rel="author", aria-hidden on icons, <time dateTime>

function NewsListCard({ card }) {
  const href = `/${card.category}/${card.slug}`;
  const iso = toISODate(card.date);

  return (
    <article className="flex flex-col sm:flex-row border-b border-gray-200 pb-3 mb-6 last:border-0 last:mb-0">
      <div className="w-full sm:w-[220px] md:w-[240px] flex-shrink-0 h-[180px] sm:h-[160px] overflow-hidden group">
        <Link href={href} title={card.title} className="relative block w-full h-full">
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width:768px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {card.hasVideo && <PlayIcon />}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap z-10">
            {card.tags.map((t) => (
              <span
                key={t.label}
                className={`${t.color} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide`}
              >
                {t.label}
              </span>
            ))}
          </div>
        </Link>
      </div>

      <div className="flex-1 sm:pl-4 pt-3 sm:pt-0">
        {card.sponsored ? (
          <p className="text-gray-400 text-xs flex items-center gap-1 mb-1">
            <Bell size={11} aria-hidden="true" /> Sponsored content
          </p>
        ) : card.date ? (
          <p className="text-gray-400 text-xs flex items-center gap-1 mb-1">
            <Calendar size={11} aria-hidden="true" />
            {/* FIX: <time> with dateTime */}
            <time dateTime={iso}>{card.date}</time>
          </p>
        ) : null}

        {/* FIX: was <h2> — changed to <h3> to keep correct heading hierarchy */}
        <h3 className="font-bold text-gray-900 text-base md:text-[17px] leading-snug mb-2">
          <Link
            href={href}
            title={card.title}
            className="hover:text-blue-600 transition-colors"
          >
            {card.title}
          </Link>
        </h3>

        <p className="text-xs text-gray-500 mb-2">
          By{" "}
          <Link
            href={authorHref(card.author)}
            title={`More articles by ${card.author}`}
            rel="author"
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            {card.author}
          </Link>
        </p>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
          {card.excerpt}
        </p>
        <hr className="border-gray-200 mb-3" />
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={href}
            title={`Read more: ${card.title}`}
            className="bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2 transition-colors inline-block"
          >
            READ MORE
            {/* FIX: sr-only text for screen readers */}
            <span className="sr-only"> — {card.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── TrendingCard ─────────────────────────────────────────────────────────────
// FIX: title attr on Link, aria-hidden on icons, <time dateTime>

function TrendingCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  const iso = toISODate(item.date);

  return (
    <Link href={href} title={item.title} className="flex flex-col group">
      <div className="relative w-full h-[110px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="150px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute top-2 right-2 bg-[#f69a4d] text-white text-xs font-bold px-1.5 py-0.5 z-10">
            {item.badge}
          </span>
        )}
      </div>
      {item.sponsored || item.isSponsored ? (
        <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1">
          <Bell size={10} aria-hidden="true" /> Sponsored content
        </p>
      ) : (
        <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1">
          <Calendar size={10} aria-hidden="true" />
          <time dateTime={iso}>{item.date}</time>
        </p>
      )}
      <p className="text-sm font-semibold text-gray-900 leading-snug mt-1 group-hover:text-blue-600 transition-colors line-clamp-3">
        {item.title}
      </p>
    </Link>
  );
}

// ─── DiscoveryMainCard ────────────────────────────────────────────────────────
// FIX: <h3> (was already h3 — kept), title on links, <time dateTime>, rel="author"

function DiscoveryMainCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  const iso = toISODate(item.date);

  return (
    <article className="flex flex-col h-full group border-b lg:border-b-0 lg:border-r border-gray-200 lg:pr-5 pb-5 lg:pb-0">
      <div className="w-full aspect-[3/2] overflow-hidden mb-1">
        <Link href={href} title={item.title} className="relative block w-full h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute bottom-4 left-4 ${item.categoryColor} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}
          >
            {item.categoryLabel}
          </span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-[11px] text-gray-400 mb-2 flex items-center gap-1">
          <Calendar size={12} aria-hidden="true" />
          {/* FIX: <time> with dateTime */}
          <time dateTime={iso}>{item.date}</time>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={href} title={item.title}>
            {item.title}
          </Link>
        </h3>
        <div className="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-wide">
          By{" "}
          <Link
            href={authorHref(item.author)}
            title={`More articles by ${item.author}`}
            rel="author"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            {item.author}
          </Link>
        </div>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {item.excerpt}
        </p>
      </div>
    </article>
  );
}

// ─── DiscoveryMiddleItem ──────────────────────────────────────────────────────
// FIX: was <h4> (skipped h3) → <h3>; title on link; <time dateTime>; aria-hidden icons

function DiscoveryMiddleItem({ item }) {
  const href = `/${item.category}/${item.slug}`;
  const iso = toISODate(item.date);

  return (
    <article className="flex gap-5 border-b border-gray-100 pb-8 mb-6 last:border-0 last:mb-0 last:pb-0 group">
      <div className="w-[140px] h-[95px] flex-shrink-0 overflow-hidden">
        <Link href={href} title={item.title} className="relative block w-full h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="140px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.badge && (
            <span className="absolute top-0 right-0 bg-[#f69a4d] text-white font-bold px-2 py-0.5 text-xs z-10">
              {item.badge}
            </span>
          )}
        </Link>
      </div>
      <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            <span
              className={`${item.categoryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}
            >
              {item.categoryLabel}
            </span>
            {item.secondaryCategory && (
              <span
                className={`${item.secondaryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}
              >
                {item.secondaryCategory}
              </span>
            )}
          </div>
          {/* FIX: was <h4> (skipping h3 level) — corrected to <h3> */}
          <h3 className="font-bold text-[16px] text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
            <Link href={href} title={item.title}>
              {item.title}
            </Link>
          </h3>
        </div>
        <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
          {item.isSponsored ? (
            <>
              <Bell size={11} aria-hidden="true" /> Sponsored content
            </>
          ) : (
            <>
              <Calendar size={11} aria-hidden="true" />
              <time dateTime={iso}>{item.date}</time>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── DiscoveryRightItem ───────────────────────────────────────────────────────
// FIX: was <h4> → <h3>; title on link; <time dateTime>; aria-hidden on icon

function DiscoveryRightItem({ item }) {
  const href = `/${item.category}/${item.slug}`;
  const iso = toISODate(item.date);

  return (
    <article className="flex flex-col border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 group">
      <div className="flex flex-wrap gap-1 mb-2">
        <span
          className={`${item.categoryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}
        >
          {item.categoryLabel}
        </span>
        {item.secondaryCategory && (
          <span
            className={`${item.secondaryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}
          >
            {item.secondaryCategory}
          </span>
        )}
      </div>
      {/* FIX: was <h4> — corrected to <h3> */}
      <h3 className="font-bold text-[15px] text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
        <Link href={href} title={item.title}>
          {item.title}
        </Link>
      </h3>
      <div className="text-[11px] text-gray-400 flex items-center gap-1">
        <Calendar size={11} aria-hidden="true" />
        <time dateTime={iso}>{item.date}</time>
      </div>
    </article>
  );
}

// ─── TechOverlayCard ──────────────────────────────────────────────────────────
// FIX: <h3> already correct; added title on Link, <time dateTime>, aria-hidden icons

function TechOverlayCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  const iso = toISODate(item.date);

  return (
    <article className="w-full aspect-square md:aspect-[4/3] group overflow-hidden relative">
      <Link href={href} title={item.title} className="relative block w-full h-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-1 z-10">
          {item.categories ? (
            item.categories.map((cat, idx) => (
              <span
                key={idx}
                className={`${cat.color} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}
              >
                {cat.label}
              </span>
            ))
          ) : (
            <span
              className={`${item.categoryColor} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}
            >
              {item.categoryLabel}
            </span>
          )}
        </div>
        <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 md:p-10 text-white z-20">
          <div className="text-[11px] font-medium mb-3 opacity-90 flex items-center gap-1.5">
            {item.isSponsored ? (
              <>
                <Bell size={12} aria-hidden="true" /> Sponsored content
              </>
            ) : (
              <>
                <Calendar size={12} aria-hidden="true" />
                <time dateTime={iso}>{item.date}</time>
              </>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3 drop-shadow-sm group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-4 opacity-80">
            By {item.author}
          </div>
          <p className="text-[14px] leading-relaxed mb-6 opacity-90 line-clamp-2 md:line-clamp-3 max-w-lg">
            {item.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}

// ─── TrendingCircleCard ───────────────────────────────────────────────────────
// FIX: was <h4> → <h3>; title attrs on links; category link title

function TrendingCircleCard({ item }) {
  const href = `/${item.category}/${item.slug}`;

  return (
    <article className="flex gap-5 items-start group">
      <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28">
        <Link href={href} title={item.title} className="relative block w-full h-full overflow-hidden rounded-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width:768px) 96px, 112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.badge && (
            <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-[#f69a4d] text-white font-bold text-[11px] px-2 py-1 shadow-sm z-10">
              {item.badge}
            </span>
          )}
        </Link>
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex flex-wrap gap-1 mb-2">
          {item.categories.map((cat, idx) => (
            // FIX: title attribute on category link
            <Link
              key={idx}
              href={`/${labelToSlug(cat.label)}`}
              title={`Browse ${cat.label} articles`}
            >
              <span
                className={`${cat.color} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider cursor-pointer`}
              >
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
        {/* FIX: was <h4> — corrected to <h3> */}
        <h3 className="font-bold text-[15px] md:text-[16px] text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
          <Link href={href} title={item.title}>
            {item.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const {
    politicsNews,
    secondaryNews,
    inOtherNews,
    healthcareNews,
    worldNews,
    newsCards,
    categories,
    discoveryMain,
    discoveryMiddle,
    discoveryRight,
    technologyNews,
    trendingSectionData,
  } = homepageData;

  // ─── JSON-LD ────────────────────────────────────────────────────────────────
  // FIX 1: NewsMediaOrganization — logo is now a proper ImageObject
  // FIX 2: Added WebSite schema with SearchAction for Google Sitelinks Searchbox
  // FIX 3: Added description to organization

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Corruption Files is an investigative news outlet covering government accountability, police misconduct, medical fraud, offshore wealth, and environmental exploitation.",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`, // update to your actual logo path
      width: 200,
      height: 60,
    },
    sameAs: [
      "https://twitter.com/corruptionfiles", // update with real handles
      "https://www.facebook.com/corruptionfiles",
    ],
  };

  // FIX: WebSite with SearchAction enables Google Sitelinks search box
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="bg-white min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-20">

        {/* FIX: H1 — corrected brand name, still sr-only (homepage uses section h2s visually) */}
        <h1 className="sr-only">
          {SITE_NAME} — Investigative News on Government, Police Accountability,
          Medical Fraud, Surveillance and Offshore Wealth
        </h1>

        {/* ── GOVERNMENT SECTION ─────────────────────────────────────────── */}
        <div className="border-b-2 border-black mb-6">
          {/* FIX: title attr on section heading link */}
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link
              href="/govt"
              title="Browse Government news"
              className="hover:text-blue-600 transition-colors"
            >
              Government
            </Link>
          </h2>
          <p className="text-gray-400 text-[14px] font-medium mb-4 uppercase tracking-tight">
            Capitol &amp; Westminster
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {politicsNews.map((news, index) => (
            <NewsCard key={news.id} {...news} priority={index < 3} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-8 mb-7">
          {secondaryNews.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>

        {/* ── PUERTO RICO SECTION ────────────────────────────────────────── */}
        <div className="border-b-2 border-black mb-8">
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link
              href="/puerto-rico"
              title="Browse Puerto Rico news"
              className="hover:text-blue-600 transition-colors"
            >
              Puerto Rico
            </Link>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Featured overlay card */}
          <Link
            href={`/${
              inOtherNews.featured.categories?.[0]
                ? labelToSlug(inOtherNews.featured.categories[0].label)
                : "world"
            }/${inOtherNews.featured.slug}`}
            title={inOtherNews.featured.title}
            className="relative group cursor-pointer overflow-hidden border border-gray-200 block min-h-[400px]"
          >
            <Image
              src={inOtherNews.featured.image}
              alt={inOtherNews.featured.title}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors z-10" />
            <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 md:p-12 pb-8 text-white z-20">
              <div className="flex gap-2 mb-4">
                {inOtherNews.featured.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className={`${cat.color} text-[10px] font-bold px-3 py-1 uppercase tracking-wider`}
                  >
                    {cat.label}
                  </span>
                ))}
              </div>
              {inOtherNews.featured.isSponsored && (
                <div className="text-[12px] font-medium mb-2">
                  <Bell size={12} aria-hidden="true" className="inline mr-1" />
                  Sponsored content
                </div>
              )}
              {/* FIX: h3 inside this card (under section h2 "Puerto Rico") */}
              <h3 className="text-2xl font-bold leading-tight mb-4 max-w-md group-hover:text-blue-300 transition-colors">
                {inOtherNews.featured.title}
              </h3>
              <div className="text-[12px] font-bold uppercase tracking-widest mb-4">
                By {inOtherNews.featured.author}
              </div>
              <p className="text-[15px] italic font-serif leading-relaxed max-w-sm border-t border-white/20 pt-4">
                &ldquo;{inOtherNews.featured.quote}&rdquo;
              </p>
            </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {inOtherNews.grid.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </div>

        {/* ── POLICE ACCOUNTABILITY SECTION ──────────────────────────────── */}
        <div className="border-b-2 border-black mt-8">
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link
              href="/pa"
              title="Browse Police Accountability news"
              className="hover:text-blue-600 transition-colors"
            >
              Police Accountability
            </Link>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 mt-8 mb-8">
          {healthcareNews.map((item) => (
            // FIX: proper <article> wrapping with <h3> heading (was bare <Link>)
            <article key={item.id} className="flex flex-col gap-3 group">
              <Link
                href={`/${item.category}/${item.slug}`}
                title={item.title}
                className="flex flex-col gap-3 cursor-pointer"
              >
                <div className="flex gap-2">
                  {item.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className={`${badge.color} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
                {/* FIX: <h3> for card titles (under section <h2>) */}
                <h3 className="text-[17px] font-bold leading-tight text-[#222] group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="text-[11px] text-gray-400 flex items-center gap-1">
                  {item.isSponsored ? (
                    <span className="flex items-center gap-1">
                      <Bell size={11} aria-hidden="true" /> Sponsored content
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Calendar size={11} aria-hidden="true" />
                      {/* FIX: <time> with dateTime */}
                      <time dateTime={toISODate(item.date)}>{item.date}</time>
                    </span>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* ── BIG TECH & SURVEILLANCE SECTION ────────────────────────────── */}
        <div className="border-b-2 border-black mb-8">
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link
              href="/tech"
              title="Browse Big Tech & Surveillance news"
              className="hover:text-blue-600 transition-colors"
            >
              Big Tech &amp; Surveillance
            </Link>
          </h2>
          <p className="text-gray-400 text-[14px] font-medium mb-4 uppercase tracking-tight">
            News
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          <article className="lg:col-span-8 group cursor-pointer">
            <Link
              href={`/${worldNews.main.category}/${worldNews.main.slug}`}
              title={worldNews.main.title}
              className="block"
            >
              <div className="relative aspect-video overflow-hidden mb-6">
                <Image
                  src={worldNews.main.image}
                  alt={worldNews.main.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 800px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                  {worldNews.main.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className={`${cat.color} text-[10px] font-bold px-2 py-1 text-white uppercase`}
                    >
                      {cat.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Calendar size={11} aria-hidden="true" />
                  {/* FIX: <time> with dateTime */}
                  <time dateTime={toISODate(worldNews.main.date)}>
                    {worldNews.main.date}
                  </time>
                </span>
                {/* FIX: was <h2> inside article under a section <h2> → <h3> */}
                <h3 className="text-3xl font-bold text-[#222] group-hover:text-blue-600 transition-colors">
                  {worldNews.main.title}
                </h3>
                <div className="text-[11px] font-bold text-gray-400 uppercase">
                  By <span className="text-gray-600">{worldNews.main.author}</span>
                </div>
                <p className="text-gray-500 text-[15px] leading-relaxed line-clamp-4">
                  {worldNews.main.description}
                </p>
              </div>
            </Link>
          </article>

          {/* FIX: aria-label on aside */}
          <aside
            className="lg:col-span-4 flex flex-col gap-4"
            aria-label="Related Big Tech articles"
          >
            {worldNews.sidebar.map((item) => (
              <Link
                key={item.id}
                href={`/${item.category}/${item.slug}`}
                title={item.title}
                className="border border-gray-100 group cursor-pointer shadow-sm hover:shadow-md transition-shadow block"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.badge && (
                    <div
                      className={`absolute top-0 right-0 ${item.badgeColor} text-white font-bold px-3 py-1 text-lg z-10`}
                    >
                      {item.badge}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                    {item.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className={`${cat.color} text-[10px] font-bold px-2 py-1 text-white uppercase`}
                      >
                        {cat.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Calendar size={11} aria-hidden="true" />
                    <time dateTime={toISODate(item.date)}>{item.date}</time>
                  </span>
                  {/* FIX: <h3> for sidebar card titles */}
                  <h3 className="text-xl font-bold text-[#222] group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </aside>
        </div>

        <Newsletter />
        <AdBanner />

        {/* ── NEWS FEED + SIDEBAR ─────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {newsCards.slice(0, 4).map((card) => (
              <NewsListCard key={card.id} card={card} />
            ))}

            {/* FIX: rel="sponsored" added to ad link */}
            <a
              href="https://www.mirrorstandard.com/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              title="Visit Mirror Standard — Investigative Journalism"
              className="mt-2 mb-6 block w-full"
            >
              <div className="w-full overflow-hidden flex items-center justify-center border border-gray-100">
                <img
                  src="/mirror-standard-ad-horizontal.webp"
                  alt="Mirror Standard — Investigative Journalism"
                  className="w-full h-auto object-contain"
                />
              </div>
            </a>

            <div id="ad-sentinel" className="h-0 w-full" />
            {newsCards.slice(4).map((card) => (
              <NewsListCard key={card.id} card={card} />
            ))}
          </div>

          {/* FIX: aria-label on sidebar */}
          <aside
            className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0"
            aria-label="Sidebar — Latest and Categories"
          >
            <StickyAd />

            <div className="mb-6 mt-14">
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Latest Today
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {LATEST_ARTICLES.map((item) => (
                  <TrendingCard key={item.id ?? item.slug} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Categories
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <CategoryCard key={cat.label} cat={cat} />
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── ENVIRONMENTAL EXPLOITATION SECTION ─────────────────────────── */}
        <section aria-labelledby="eco-heading" className="mt-4 mb-8 md:mt-7 md:mb-20">
          <div className="border-b-2 border-black mb-8 pb-1">
            <h2
              id="eco-heading"
              className="text-[28px] font-bold text-black leading-tight"
            >
              <Link
                href="/eco"
                title="Browse Environmental Exploitation news"
                className="hover:text-blue-600 transition-colors"
              >
                Environmental Exploitation
              </Link>
            </h2>
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">
              Never miss what people read
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            <div className="md:col-span-2 lg:col-span-1">
              <DiscoveryMainCard item={discoveryMain} />
            </div>
            <div className="flex flex-col lg:border-r border-gray-200 lg:pr-8">
              {discoveryMiddle.map((item) => (
                <DiscoveryMiddleItem key={item.id} item={item} />
              ))}
            </div>
            <div className="flex flex-col h-full pt-4 lg:pt-0">
              {discoveryRight.map((item) => (
                <DiscoveryRightItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <div className="my-4 md:my-0">
          <AdBanner />
        </div>

        {/* ── INTELLIGENCE SECTION ────────────────────────────────────────── */}
        <section
          aria-labelledby="intelligence-heading"
          className="mt-6 mb-8 md:mt-16 md:mb-20"
        >
          <div className="border-b-2 border-black mb-8 pb-1">
            <h2
              id="intelligence-heading"
              className="text-[28px] font-bold text-black leading-tight"
            >
              <Link
                href="/intelligence"
                title="Browse Intelligence news"
                className="hover:text-blue-600 transition-colors"
              >
                Intelligence
              </Link>
            </h2>
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">
              News
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologyNews.map((item) => (
              <TechOverlayCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* ── OFFSHORE WEALTH & SANCTIONS SECTION ────────────────────────── */}
        <section
          aria-labelledby="offshore-heading"
          className="mt-0 mb-6 md:mt-1 md:mb-1"
        >
          <div className="border-b-2 border-black mb-4 pb-1">
            <h2
              id="offshore-heading"
              className="text-[28px] font-bold text-black leading-tight"
            >
              <Link
                href="/offshore"
                title="Browse Offshore Wealth & Sanctions news"
                className="hover:text-blue-600 transition-colors"
              >
                Offshore Wealth &amp; Sanctions
              </Link>
            </h2>
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">
              News
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {trendingSectionData.map((item) => (
              <TrendingCircleCard key={item.id} item={item} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
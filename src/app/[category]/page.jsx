import Link from "next/link";
import Image from "next/image";
import { Bell, Calendar } from "lucide-react";
import homepageData from "@/data/homepage.json";
import StickyAd from "@/components/StickyAd";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Convert a date string to ISO-8601 for <time dateTime> and JSON-LD */
function toISODate(dateStr) {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

/**
 * Convert a relative image path from JSON (e.g. "/image.webp")
 * to a full absolute URL required by OG / Twitter crawlers.
 */
function absoluteImageUrl(imagePath) {
  if (!imagePath) return `${SITE_URL}/og-twitter.webp`;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    return imagePath;
  return `${SITE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}

function labelToSlug(label) {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .trim();
}

// ─── CATEGORY LABEL MAP ───────────────────────────────────────────────────────
// FIX: proper human-readable labels for each category slug used in metadata
// titles, descriptions, and JSON-LD so they never read as raw URL slugs.

const CATEGORY_META = {
  govt: {
    label: "Government",
    description:
      "Latest investigative news on U.S. and U.K. government accountability, war powers, congressional votes, and political corruption.",
    keywords:
      "government news, congressional accountability, war powers, Capitol Hill, Westminster, political corruption",
  },
  "puerto-rico": {
    label: "Puerto Rico",
    description:
      "In-depth coverage of Puerto Rico politics, energy, economy, and the aftermath of federal neglect and local corruption.",
    keywords:
      "Puerto Rico news, PREPA, Act 60, San Juan, hurricane recovery, Puerto Rico corruption",
  },
  pa: {
    label: "Police Accountability",
    description:
      "Investigative reporting on police misconduct, use-of-force incidents, civil rights violations, and accountability reform in the U.S. and U.K.",
    keywords:
      "police accountability, police misconduct, civil rights, use of force, IOPC, police reform",
  },
  tech: {
    label: "Big Tech & Surveillance",
    description:
      "News on big tech companies, mass surveillance, government data purchases, spyware, AI policy, and digital civil liberties.",
    keywords:
      "big tech surveillance, FBI data, spyware, AI policy, Fourth Amendment, data brokers",
  },
  "medical-fraud": {
    label: "Medical Fraud",
    description:
      "Investigative coverage of Medicare fraud, pharmaceutical misconduct, healthcare billing schemes, and whistleblower cases.",
    keywords:
      "medical fraud, Medicare fraud, healthcare fraud, pharmaceutical fraud, False Claims Act, whistleblower",
  },
  eco: {
    label: "Environmental Exploitation",
    description:
      "Reporting on environmental exploitation, offshore drilling, oil royalties, mining projects, and ecological damage driven by corporate and government interests.",
    keywords:
      "environmental exploitation, offshore drilling, oil royalties, uranium mining, sewage pollution, climate policy",
  },
  intelligence: {
    label: "Intelligence",
    description:
      "Coverage of national security, intelligence operations, IRGC, covert U.S. actions, and the Iran conflict.",
    keywords:
      "intelligence news, national security, IRGC, Iran conflict, CIA, OSINT, covert operations",
  },
  offshore: {
    label: "Offshore Wealth & Sanctions",
    description:
      "Investigative reporting on offshore tax evasion, sanctions busting, money laundering, FinCEN rules, and oligarch wealth.",
    keywords:
      "offshore wealth, sanctions evasion, money laundering, FinCEN, OFAC, tax evasion, shell companies",
  },
};

function getCategoryMeta(slug) {
  return (
    CATEGORY_META[slug] || {
      label:
        slug.charAt(0).toUpperCase() +
        slug.slice(1).replace(/-/g, " "),
      description: `Latest investigative news and analysis in the ${slug} category.`,
      keywords: `${slug} news, investigative journalism, corruption`,
    }
  );
}

// ─── ARTICLE COLLECTION ───────────────────────────────────────────────────────

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

function getArticlesByCategory(categorySlug) {
  const all = [];
  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => {
      if (a?.category === categorySlug && a?.slug) all.push(a);
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
  if (homepageData.discoveryMain?.category === categorySlug)
    all.push(homepageData.discoveryMain);
  if (homepageData.worldNews?.main?.category === categorySlug)
    all.push(homepageData.worldNews.main);
  if (
    homepageData.inOtherNews?.featured?.categories?.some(
      (c) => labelToSlug(c.label) === categorySlug
    )
  ) {
    all.push({
      ...homepageData.inOtherNews.featured,
      category: categorySlug,
    });
  }
  const seen = new Set();
  return all.filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

function normalizeArticle(a) {
  return {
    id: a.id,
    slug: a.slug,
    category: a.category,
    title: a.title || "",
    author: a.author || "corruptionfiles",
    excerpt: a.excerpt || a.description || "",
    image: a.image || "/corruptionfiles4-6.jpg",
    date: a.date || null,
    sponsored: a.isSponsored || a.sponsored || false,
    hasVideo: a.hasVideo || false,
    tags:
      a.tags ||
      (a.badges ? a.badges.map((b) => ({ label: b.text, color: b.color })) : []),
    categoryLabel:
      a.categoryLabel ||
      a.categories?.[0]?.label ||
      a.badges?.[0]?.text ||
      a.category,
    categoryColor:
      a.categoryColor || a.categories?.[0]?.color || "bg-[#2196f3]",
  };
}

// ─── STATIC PARAMS ────────────────────────────────────────────────────────────
// FIX: generateStaticParams tells Next.js to pre-render all known category
// pages at build time — critical for SEO (static HTML, no TTFB delay).

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ category: slug }));
}

// ─── METADATA ─────────────────────────────────────────────────────────────────
// FIX: Added keywords, canonical, robots, complete OG block with absolute image
//      URL, Twitter card, corrected site name from "Daily News" → SITE_NAME.

export async function generateMetadata({ params }) {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  const url = `${SITE_URL}/${category}`;

  // Use the first article's image as the OG image for this category page,
  // falling back to a generic category OG image.
  const articles = getArticlesByCategory(category);
  const firstImage =
    articles[0]?.image || articles[0]?.heroImage || "/og-twitter.webp";
  const ogImageUrl = absoluteImageUrl(firstImage);
  const ogImageAlt = `${meta.label} — ${SITE_NAME}`;

  return {
    title: `${meta.label} News | ${SITE_NAME}`,
    description: meta.description,

    // FIX: keywords from CATEGORY_META map
    keywords: meta.keywords,

    // FIX: canonical URL for this category
    alternates: {
      canonical: url,
    },

    // FIX: explicit robots directive
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },

    // FIX: complete Open Graph block with absolute image URL
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: `${meta.label} News | ${SITE_NAME}`,
      description: meta.description,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },

    // FIX: Twitter card with absolute image URL
    twitter: {
      card: "summary_large_image",
      title: `${meta.label} News | ${SITE_NAME}`,
      description: meta.description,
      images: [ogImageUrl],
    },
  };
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    // FIX: aria-hidden on decorative play overlay
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

// ─── NewsListCard ──────────────────────────────────────────────────────────────
// FIX: <h2> → <h3> (page H1 is the category name; article cards are h3)
//      Added title attrs, rel="author", aria-hidden on icons, <time dateTime>

function NewsListCard({ card }) {
  const a = normalizeArticle(card);
  const href = `/${a.category}/${a.slug}`;
  const iso = toISODate(a.date);

  return (
    <article className="flex flex-col sm:flex-row border-b border-gray-200 pb-4 mb-6 last:border-0 last:mb-0">
      <div className="w-full sm:w-[220px] md:w-[240px] flex-shrink-0 h-[180px] sm:h-[160px] overflow-hidden group">
        <Link href={href} title={a.title} className="relative block w-full h-full">
          <Image
            src={a.image}
            alt={a.title}
            fill
            sizes="(max-width:768px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {a.hasVideo && <PlayIcon />}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap z-10">
            {a.tags.map((t) => (
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
        {a.sponsored ? (
          <p className="text-gray-400 text-xs flex items-center gap-1 mb-1">
            {/* FIX: aria-hidden on decorative icon */}
            <Bell size={11} aria-hidden="true" /> Sponsored content
          </p>
        ) : a.date ? (
          <p className="text-gray-400 text-xs flex items-center gap-1 mb-1">
            <Calendar size={11} aria-hidden="true" />
            {/* FIX: <time> with dateTime attribute */}
            <time dateTime={iso}>{a.date}</time>
          </p>
        ) : null}

        {/* FIX: was <h2> — corrected to <h3> (page H1 is category name) */}
        <h3 className="font-bold text-gray-900 text-base md:text-[17px] leading-snug mb-2">
          <Link
            href={href}
            title={a.title}
            className="hover:text-blue-600 transition-colors"
          >
            {a.title}
          </Link>
        </h3>

        <p className="text-xs text-gray-500 mb-2">
          By{" "}
          {/* FIX: rel="author" + title on author link */}
          <Link
            href={`/authors/${a.author.toLowerCase().replace(/\s+/g, "-")}`}
            title={`More articles by ${a.author}`}
            rel="author"
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            {a.author}
          </Link>
        </p>

        {a.excerpt && (
          <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
            {a.excerpt}
          </p>
        )}

        <hr className="border-gray-200 mb-3" />

        {/* FIX: READ MORE button with title and sr-only context */}
        <Link
          href={href}
          title={`Read more: ${a.title}`}
          className="bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2 transition-colors inline-block"
        >
          READ MORE
          <span className="sr-only"> — {a.title}</span>
        </Link>
      </div>
    </article>
  );
}

// ─── LatestCard ───────────────────────────────────────────────────────────────
// FIX: title attr on Link, aria-hidden on icons, <time dateTime>

function LatestCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  const iso = toISODate(item.date);

  return (
    <Link href={href} title={item.title} className="flex flex-col group">
      <div className="relative w-full h-[110px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt || item.title}
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
      {item.isSponsored || item.sponsored ? (
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

// ─── SidebarCategoryCard ──────────────────────────────────────────────────────
// FIX: title attr on Link, descriptive alt on Image

function SidebarCategoryCard({ cat }) {
  return (
    <Link
      href={`/${cat.category}`}
      title={`Browse ${cat.label} articles`}
      className="relative overflow-hidden h-[56px] cursor-pointer group block"
    >
      <Image
        src={cat.image}
        alt={`${cat.label} category`}
        fill
        sizes="300px"
        className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <span className="text-white font-bold text-base">{cat.label}</span>
      </div>
    </Link>
  );
}

// ─── CategoryHero ─────────────────────────────────────────────────────────────
// FIX: breadcrumb changed from plain spans to proper semantic <nav> with <ol>
//      matching BreadcrumbList JSON-LD; title attr on Home link;
//      alt text on hero image made descriptive

function CategoryHero({ categoryName, categorySlug, count }) {
  return (
    <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden mb-10">
      <Image
        src="/cat-bgcolor.webp"
        // FIX: descriptive alt instead of just category name
        alt={`${categoryName} news category — ${SITE_NAME}`}
        fill
        className="object-cover brightness-[0.80]"
        priority
      />
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-16 max-w-4xl overflow-x-hidden">
        <span className="text-white/60 text-[11px] font-bold uppercase tracking-[0.25em] mb-2">
          Browsing Category
        </span>
        {/* This IS the page H1 — visible and meaningful */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 capitalize leading-tight break-words">
          {categoryName}
        </h1>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-[#2196f3] text-white text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
            {count} {count === 1 ? "Post" : "Posts"}
          </span>
        </div>

        {/* FIX: proper semantic breadcrumb nav matching BreadcrumbList JSON-LD */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link
                href="/"
                title="Home"
                className="text-white/60 text-xs hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="text-white/40 text-xs">›</span>
            </li>
            <li aria-current="page">
              <span className="text-white/90 text-xs capitalize break-words">
                {categoryName}
              </span>
            </li>
          </ol>
        </nav>

        <p className="text-white/75 text-sm md:text-base font-serif italic max-w-xl leading-relaxed mt-4">
          Browse the latest headlines and in-depth analysis of {categoryName}.
        </p>
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
// FIX: was <h2> (fine here as fallback content heading); title attr on Back link

function EmptyState({ categoryName }) {
  return (
    <div className="py-20 text-center">
      <p className="text-5xl mb-4" aria-hidden="true">
        📰
      </p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        No articles found
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        There are no articles yet in the{" "}
        <span className="font-semibold capitalize">{categoryName}</span>{" "}
        category.
      </p>
      <Link
        href="/"
        title="Go back to home page"
        className="bg-[#2196f3] text-white text-xs font-bold px-6 py-3 hover:bg-blue-600 transition-colors inline-block uppercase tracking-widest"
      >
        Back to Home
      </Link>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const meta = getCategoryMeta(category);

  const articles = getArticlesByCategory(category);
  const categoryLabel =
    articles[0]?.categoryLabel ||
    articles[0]?.categories?.[0]?.label ||
    meta.label;

  const { categories } = homepageData;

  const pageUrl = `${SITE_URL}/${category}`;

  // ─── JSON-LD ──────────────────────────────────────────────────────────────
  // FIX: Complete CollectionPage schema with breadcrumb and itemListElement
  // so Google understands this is a list of articles in a category.

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${meta.label} News`,
    description: meta.description,
    url: pageUrl,
    // FIX: publisher block (required for rich results)
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    // FIX: itemListElement lists each article on this page for Google
    hasPart: articles.slice(0, 10).map((a, idx) => ({
      "@type": "NewsArticle",
      position: idx + 1,
      headline: a.title,
      url: `${SITE_URL}/${a.category}/${a.slug}`,
      image: absoluteImageUrl(a.image),
      datePublished: toISODate(a.date),
      author: {
        "@type": "Person",
        name: a.author || SITE_NAME,
      },
    })),
  };

  // FIX: BreadcrumbList JSON-LD matching the visible breadcrumb nav
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: meta.label,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-20">

        {/* CategoryHero contains the page H1 and breadcrumb nav */}
        <CategoryHero
          categoryName={categoryLabel}
          categorySlug={category}
          count={articles.length}
        />

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main article feed ──────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {articles.length === 0 ? (
              <EmptyState categoryName={meta.label} />
            ) : (
              <>
                {articles
                  .slice(0, 4)
                  .map((card) => (
                    <NewsListCard key={card.id ?? card.slug} card={card} />
                  ))}

                {/* FIX: rel="sponsored" + descriptive title and alt on ad */}
                <a
                  href="https://www.corruptionfiles.com/"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  title="Visit Corruption Files — Investigative Journalism"
                  className="mt-2 mb-6 block w-full"
                >
                  <div className="w-full overflow-hidden flex items-center justify-center border border-gray-100">
                    <img
                      src="/corruptionfiles-ad-hor.webp"
                      alt="Corruption Files — Investigative Journalism"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </a>

                {articles
                  .slice(4)
                  .map((card) => (
                    <NewsListCard key={card.id ?? card.slug} card={card} />
                  ))}
              </>
            )}
          </div>

          {/* ── Sidebar ────────────────────────────────────────────────── */}
          {/* FIX: aria-label on aside */}
          <aside
            className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0"
            aria-label="Sidebar — Latest articles and categories"
          >
            <StickyAd />

            <div className="mb-6 mt-14">
              <h2 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Latest Today
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {LATEST_ARTICLES.map((item) => (
                  <LatestCard key={item.id ?? item.slug} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Categories
              </h2>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <SidebarCategoryCard key={cat.label} cat={cat} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
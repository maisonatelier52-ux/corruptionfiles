import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Share2, Bell, Instagram } from "lucide-react";
import articlesData from "@/data/articles.json";
import homepageData from "@/data/homepage.json";
import StickyAd from "@/components/StickyAd";
import NewsletterSidebar from "@/components/NewsletterSidebar";
import authorsData from "@/data/authors.json";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Convert a date string to ISO-8601 (required by JSON-LD and <time dateTime>) */
function toISODate(dateStr) {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

/**
 * Build the absolute URL for an image path from JSON.
 * JSON stores paths like "/fbi-buying-americans-private-data.webp"
 * OG / Twitter require a full URL: "https://www.corruptionfiles.com/fbi-..."
 */
function absoluteImageUrl(imagePath) {
  if (!imagePath) return `${SITE_URL}/og-default.jpg`;
  // Already absolute — return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // Relative path — prepend site origin
  return `${SITE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}

/** Build a canonical URL from category + slug */
function canonicalUrl(category, slug) {
  return `${SITE_URL}/${category}/${slug}`;
}

/** Slugify an author name for fallback URL */
function nameToSlug(name = "") {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// ─── SOCIAL ICON ─────────────────────────────────────────────────────────────

const SocialIcon = ({ platform }) => {
  const iconProps = { size: 18, strokeWidth: 2 };
  const p = platform.toLowerCase();
  const imgClass =
    "w-[18px] h-[18px] object-contain opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200";

  switch (p) {
    case "instagram":
      return <Instagram {...iconProps} />;
    case "x":
    case "twitter":
      return (
        <svg
          viewBox="0 0 24 24"
          width={18}
          height={18}
          stroke="currentColor"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      );
    case "substack":
      return <img src="/substack.webp" alt="Substack" className={imgClass} />;
    case "medium":
      return <img src="/medium.webp" alt="Medium" className={imgClass} />;
    default:
      return null;
  }
};

// ─── LATEST ARTICLES ─────────────────────────────────────────────────────────

function collectLatestArticles(count = 4) {
  const all = [];
  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => {
      if (a?.slug && a?.title && a?.image) all.push(a);
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
    if (a?.slug && a?.title && a?.image) all.push(a);
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

// ─── ARTICLE LOOKUP ──────────────────────────────────────────────────────────

function findArticle(category, slug) {
  const data = articlesData.articles || articlesData;
  if (!Array.isArray(data)) return null;
  return (
    data.find((a) => a.slug === slug && a.category === category) || null
  );
}

// ─── METADATA ────────────────────────────────────────────────────────────────
/**
 * KEY FIX for this version:
 * OG image and Twitter image are now built from article.heroImage (JSON field)
 * using absoluteImageUrl() which prepends SITE_URL to the relative path.
 * Previously the image was never showing because "/image.webp" is not a valid
 * absolute URL for og:image or twitter:image crawlers.
 */

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = findArticle(category, slug);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = canonicalUrl(category, slug);
  const isoDate = toISODate(article.date);

  // ── Build the absolute OG image URL from JSON heroImage ──
  // article.heroImage comes from JSON as e.g. "/fbi-buying-americans-private-data.webp"
  // We convert it to "https://www.corruptionfiles.com/fbi-buying-americans-private-data.webp"
  const ogImageUrl = absoluteImageUrl(article.heroImage);

  // Alt text for the OG image — use JSON alt field, fall back to article heading
  const ogImageAlt = article.alt || article.heading || article.metaTitle;

  // Author slug for og:article:author URL
  const authorSlug =
    article.author?.slug || nameToSlug(article.author?.name || "");

  return {
    title: article.metaTitle,
    description: article.metaDescription,

    // Keywords from JSON metaKeywords array
    keywords: Array.isArray(article.metaKeywords)
      ? article.metaKeywords.join(", ")
      : article.metaKeywords,

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },

    // ── Open Graph ──────────────────────────────────────────────────────────
    // FIX: images[].url is now an absolute URL built from article.heroImage
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: authorSlug
        ? [`${SITE_URL}/authors/${authorSlug}`]
        : undefined,
      section: article.categoryLabel,
      tags: Array.isArray(article.metaKeywords) ? article.metaKeywords : [],
      images: [
        {
          // This is what social crawlers (Facebook, LinkedIn, WhatsApp, etc.)
          // fetch to show the preview thumbnail — must be an absolute URL.
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/webp",
        },
      ],
    },

    // ── Twitter / X Card ────────────────────────────────────────────────────
    // FIX: images is now an absolute URL built from article.heroImage
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      // Twitter requires a plain string URL (not an object)
      images: [ogImageUrl],
    },
  };
}

// ─── BODY RENDERER ───────────────────────────────────────────────────────────

function ArticleBody({ body }) {
  return (
    <div className="article-content">
      {body.dropcap && (
        <p className="text-[16px] leading-relaxed text-gray-700 mb-6">
          <span className="float-left text-7xl font-serif font-bold leading-[0.75] mr-3 mt-2 text-gray-900">
            {body.dropcap.letter}
          </span>
          {body.dropcap.text}
        </p>
      )}

      {body.paragraphs &&
        body.paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="text-[16px] leading-relaxed text-gray-700 mb-6 clear-both"
          >
            {para}
          </p>
        ))}

      {body.sections &&
        body.sections.map((section, idx) => {
          switch (section.type) {
            case "heading": {
              const anchorId = section.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return (
                <div key={idx} className="mb-6 clear-both">
                  <h2
                    id={anchorId}
                    className="text-[22px] font-bold text-gray-900 mb-4 border-l-4 border-[#2196f3] pl-4"
                  >
                    {section.title}
                  </h2>
                  {section.content.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[16px] leading-relaxed text-gray-700 mb-4"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              );
            }

            case "blockquote":
              return (
                <blockquote
                  key={idx}
                  className="my-6 mx-4 pl-6 border-l-4 border-gray-300 italic text-gray-600 text-[15px] leading-relaxed clear-both"
                >
                  <p>{section.text}</p>
                  {section.cite && (
                    <footer className="mt-2 text-sm not-italic text-gray-500">
                      — <cite>{section.cite}</cite>
                    </footer>
                  )}
                </blockquote>
              );

            case "paragraph":
              return (
                <div key={idx} className="mb-6 clear-both">
                  {section.content.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[16px] leading-relaxed text-gray-700 mb-4"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              );

            case "image":
              return (
                <figure key={idx} className="my-6 clear-both">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={section.src}
                      alt={section.alt || "Article illustration"}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                  {section.caption && (
                    <figcaption className="text-xs text-gray-500 mt-1 text-center">
                      {section.caption}
                    </figcaption>
                  )}
                </figure>
              );

            default:
              return null;
          }
        })}
    </div>
  );
}

// ─── SIDEBAR COMPONENTS ──────────────────────────────────────────────────────

function LatestCard({ item }) {
  return (
    <Link
      href={`/${item.category}/${item.slug}`}
      className="flex flex-col group"
      title={item.title}
    >
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
      {(item.isSponsored || item.sponsored) && (
        <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1">
          <Bell size={10} aria-hidden="true" /> Sponsored content
        </p>
      )}
      <p className="text-sm font-semibold text-gray-900 leading-snug mt-1 group-hover:text-blue-600 transition-colors line-clamp-3">
        {item.title}
      </p>
    </Link>
  );
}

function SidebarCategoryCard({ cat }) {
  return (
    <Link
      href={`/${cat.category}`}
      className="relative overflow-hidden h-[56px] cursor-pointer group block"
      title={`Browse ${cat.label} articles`}
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

function ArticleSidebar() {
  return (
    <aside
      className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0"
      aria-label="Sidebar"
    >
      <StickyAd />
      <div className="mb-6 mt-6 lg:mt-14">
        <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
          Latest Today
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {LATEST_ARTICLES.map((item) => (
            <LatestCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {homepageData.categories.map((cat) => (
            <SidebarCategoryCard key={cat.label} cat={cat} />
          ))}
        </div>
      </div>
      <NewsletterSidebar />
    </aside>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = findArticle(category, slug);

  if (!article) notFound();

  const detailedAuthor =
    authorsData.corruptionfiles.find((a) => a.slug === article.author.slug) ||
    article.author;

  const authorSlug =
    detailedAuthor.slug || nameToSlug(detailedAuthor.name || "");

  const { body, relatedPosts } = article;

  const pageUrl = canonicalUrl(category, slug);
  const isoDate = toISODate(article.date);

  // Absolute OG image URL — same helper used in generateMetadata
  const ogImageUrl = absoluteImageUrl(article.heroImage);

  // ─── JSON-LD ────────────────────────────────────────────────────────────────

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,

    headline: article.heading,
    description: article.metaDescription,
    keywords: Array.isArray(article.metaKeywords)
      ? article.metaKeywords.join(", ")
      : article.metaKeywords,
    articleSection: article.categoryLabel,

    datePublished: isoDate,
    dateModified: isoDate,

    // FIX: image uses the same absolute URL as OG image
    image: [
      {
        "@type": "ImageObject",
        url: ogImageUrl,
        width: 1200,
        height: 630,
        caption: article.alt || article.heading,
      },
    ],

    author: {
      "@type": "Person",
      name: detailedAuthor.name,
      url: `${SITE_URL}/authors/${authorSlug}`,
    },

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
  };

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
        name: article.categoryLabel,
        item: `${SITE_URL}/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.heading,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-6 pb-10 md:pb-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          <div className="flex-1 min-w-0">

            {/* ── Breadcrumb nav ──────────────────────────────────────────── */}
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-500">
              <ol className="flex items-center gap-1 flex-wrap">
                <li>
                  <Link href="/" title="Home" className="hover:text-blue-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/${category}`}
                    title={`Browse ${article.categoryLabel}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.categoryLabel}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  aria-current="page"
                  className="text-gray-700 truncate max-w-[200px]"
                >
                  {article.heading}
                </li>
              </ol>
            </nav>

            {/* ── Hero Image ──────────────────────────────────────────────── */}
            <div className="relative w-full aspect-[16/9] overflow-hidden mb-2">
              <Image
                src={article.heroImage}
                alt={article.alt || article.heading}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                <span
                  className={`${article.categoryColor} text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider`}
                >
                  {article.categoryLabel}
                </span>
              </div>
            </div>

            {/* ── Title & Meta ─────────────────────────────────────────────── */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-tight mb-3">
                {article.heading}
              </h1>
              <div className="flex items-center gap-3 flex-wrap text-sm text-gray-500">
                {isoDate && (
                  <time dateTime={isoDate}>{article.date}</time>
                )}
                <span>
                  By{" "}
                  <Link
                    href={`/authors/${authorSlug}`}
                    title={`More articles by ${detailedAuthor.name}`}
                    className="font-semibold text-gray-700 hover:text-[#2196f3] transition-colors"
                    rel="author"
                  >
                    {detailedAuthor.name}
                  </Link>
                </span>
              </div>
            </div>

            {/* ── Share ────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-3 mb-5 md:mb-8">
              <button
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Share this article"
                title="Share this article"
              >
                <Share2 size={13} aria-hidden="true" /> Share
              </button>
            </div>

            {/* ── Article Body ─────────────────────────────────────────────── */}
            <ArticleBody body={body} />

            {/* ── Sponsor Banner ───────────────────────────────────────────── */}
            <a
              href="https://www.mirrorstandard.com/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              title="Visit Mirror Standard — Investigative Journalism"
              className="mt-2 mb-5 md:mb-6 block w-full"
            >
              <div className="w-full overflow-hidden flex items-center justify-center border border-gray-100">
                <img
                  src="/mirror-standard-ad-horizontal.webp"
                  alt="Mirror Standard — Investigative Journalism"
                  className="w-full h-auto object-contain"
                />
              </div>
            </a>

            {/* ── About Author ─────────────────────────────────────────────── */}
            <section
              aria-label={`About the author ${detailedAuthor.name}`}
              className="border border-gray-100 p-6 mb-6 md:mb-10 flex flex-col sm:flex-row gap-6"
            >
              <div className="relative w-[100px] h-[100px] flex-shrink-0">
                <Image
                  src={detailedAuthor.avatar}
                  alt={`${detailedAuthor.name} — author photo`}
                  fill
                  sizes="100px"
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    About Author
                  </span>
                  <Link
                    href={`/authors/${authorSlug}`}
                    title={`Author profile: ${detailedAuthor.name}`}
                    className="text-lg font-bold text-gray-900 hover:text-[#2196f3] transition-colors"
                    rel="author"
                  >
                    {detailedAuthor.name}
                  </Link>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {detailedAuthor.bio}
                </p>
                <div className="flex gap-4 items-center mt-4">
                  {Object.keys(detailedAuthor.social).map((platformKey) => {
                    const hoverColors = {
                      x: "hover:text-black",
                      instagram: "hover:text-pink-600",
                    };
                    const platformLabel =
                      platformKey.charAt(0).toUpperCase() +
                      platformKey.slice(1);
                    return (
                      <a
                        key={platformKey}
                        href={detailedAuthor.social[platformKey]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${detailedAuthor.name} on ${platformLabel}`}
                        title={`Follow ${detailedAuthor.name} on ${platformLabel}`}
                        className={`group text-gray-800 transition-colors duration-200 ${
                          hoverColors[platformKey.toLowerCase()] || ""
                        }`}
                      >
                        <SocialIcon platform={platformKey} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── Related Posts ─────────────────────────────────────────────── */}
            {relatedPosts && relatedPosts.length > 0 && (
              <section
                aria-label="Related articles"
                className="mb-6 md:mb-10"
              >
                <h2 className="font-bold text-lg text-gray-900 mb-4 md:mb-6 pb-2 border-b-2 border-black">
                  Related posts
                </h2>
                <div className="space-y-5 md:space-y-6">
                  {relatedPosts.map((post) => {
                    const postAuthorSlug = post.authorSlug
                      ? post.authorSlug
                      : nameToSlug(post.author || "");

                    return (
                      <article
                        key={post.slug}
                        className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-5 md:pb-6 last:border-0"
                      >
                        <div className="w-full sm:w-[200px] h-[140px] flex-shrink-0 overflow-hidden group">
                          <Link
                            href={`/${post.category}/${post.slug}`}
                            title={post.title}
                            className="relative block w-full h-full"
                          >
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="200px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-2 left-2 flex gap-1 z-10">
                              <span
                                className={`${post.categoryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase`}
                              >
                                {post.category}
                              </span>
                              {post.secondaryCategory && (
                                <span
                                  className={`${post.secondaryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase`}
                                >
                                  {post.secondaryCategory}
                                </span>
                              )}
                            </div>
                          </Link>
                        </div>
                        <div className="flex-1">
                          {post.isSponsored && (
                            <p className="text-gray-400 text-xs flex items-center gap-1 mb-2">
                              <Bell size={10} aria-hidden="true" /> Sponsored
                              content
                            </p>
                          )}
                          <h3 className="font-bold text-[16px] text-gray-900 leading-snug mb-1">
                            <Link
                              href={`/${post.category}/${post.slug}`}
                              title={post.title}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-gray-500 mb-2">
                            By{" "}
                            <Link
                              href={`/authors/${postAuthorSlug}`}
                              title={`More articles by ${post.author}`}
                              className="font-semibold text-gray-700 hover:text-[#2196f3] transition-colors"
                              rel="author"
                            >
                              {post.author}
                            </Link>
                          </p>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <Link
                            href={`/${post.category}/${post.slug}`}
                            title={`Read more: ${post.title}`}
                            className="inline-block bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2 transition-colors"
                          >
                            READ MORE
                            <span className="sr-only"> — {post.title}</span>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <ArticleSidebar />
        </div>
      </div>
    </main>
  );
}
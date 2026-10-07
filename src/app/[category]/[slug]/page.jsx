import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import { Bell, ChevronRight, Clock, ExternalLink, Instagram } from "lucide-react";
import articlesData from "@/data/articles.json";
import homepageData from "@/data/homepage.json";
import authorsData from "@/data/authors.json";
import SiteSidebar from "@/components/SiteSidebar";
import ShareBar from "@/components/ShareBar";

// Serif face for the article body. Exposed as the CSS variable --font-article,
// which .article-content in globals.css picks up.
const articleSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-article",
});

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
 * OG / Twitter require a full URL: "https://www.corruptionfiles.com/..."
 */
function absoluteImageUrl(imagePath) {
  if (!imagePath) return `${SITE_URL}/og-default.jpg`;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
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

/** Rough reading time (about 230 words a minute), never less than 1 */
function estimateReadingMinutes(body) {
  if (!body) return 1;
  const texts = [];
  if (Array.isArray(body.blocks)) {
    body.blocks.forEach((b) => b?.text && texts.push(b.text));
  }
  if (body.dropcap) {
    texts.push(`${body.dropcap.letter || ""}${body.dropcap.text || ""}`);
  }
  if (Array.isArray(body.paragraphs)) texts.push(...body.paragraphs);
  if (Array.isArray(body.sections)) {
    body.sections.forEach((sec) => {
      if (sec.title) texts.push(sec.title);
      if (sec.text) texts.push(sec.text);
      if (Array.isArray(sec.content)) texts.push(...sec.content);
    });
  }
  const words = texts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** Turns a category slug like "medical-fraud" into its display label */
const CATEGORY_LABELS = Object.fromEntries(
  (homepageData.categories || []).map((c) => [c.category, c.label])
);
function categoryLabel(slug = "") {
  return (
    CATEGORY_LABELS[slug] ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())
  );
}

/** Anchor id for a heading, so sections can be linked to */
function headingId(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

// ─── SOURCES ─────────────────────────────────────────────────────────────────

/**
 * Reads the optional "sources" array from the article JSON.
 * Each entry: { label: "Publisher", title: "Headline", url: "https://..." }
 * A plain URL string also works. Entries without a valid http(s) URL are
 * dropped, so a typo in the JSON can never render a broken or unsafe link.
 */
function normalizeSources(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const entry = typeof item === "string" ? { url: item } : item;
      if (!entry || typeof entry.url !== "string") return null;
      let parsed;
      try {
        parsed = new URL(entry.url.trim());
      } catch {
        return null;
      }
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return null;
      }
      const host = parsed.hostname.replace(/^www\./, "");
      return {
        url: parsed.href,
        label: entry.label || entry.publisher || host,
        title: entry.title || entry.name || host,
      };
    })
    .filter(Boolean);
}

function SourcesSection({ sources }) {
  if (!sources.length) return null;
  return (
    <section
      id="sources"
      aria-labelledby="article-sources-heading"
      className="mt-10 scroll-mt-24 border-t border-gray-200 pt-6"
    >
      <h2
        id="article-sources-heading"
        className="text-lg font-bold tracking-tight text-gray-900"
      >
        Sources
      </h2>
      <ol className="mt-4 divide-y divide-gray-100">
        {sources.map((source, idx) => (
          <li key={source.url} className="flex items-start gap-4 py-3.5 first:pt-0">
            <span
              className="w-5 flex-none pt-0.5 text-right text-sm font-semibold tabular-nums text-gray-400"
              aria-hidden="true"
            >
              {idx + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#1565c0]">
                {source.label}
              </p>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Read the source: ${source.title} (${source.label})`}
                className="group mt-0.5 inline-flex max-w-full items-start gap-1.5 text-[15px] font-semibold leading-snug text-gray-900 transition-colors hover:text-[#1565c0]"
              >
                <span className="min-w-0 break-words">{source.title}</span>
                <ExternalLink
                  size={13}
                  className="mt-[3px] flex-none text-gray-400 transition-colors group-hover:text-[#1565c0]"
                  aria-hidden="true"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ─── ARTICLE LOOKUP ──────────────────────────────────────────────────────────

function findArticle(category, slug) {
  const data = articlesData.articles || articlesData;
  if (!Array.isArray(data)) return null;
  return data.find((a) => a.slug === slug && a.category === category) || null;
}

// ─── METADATA ────────────────────────────────────────────────────────────────

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
  const ogImageUrl = absoluteImageUrl(article.heroImage);
  const ogImageAlt = article.alt || article.heading || article.metaTitle;
  const authorSlug = article.author?.slug || nameToSlug(article.author?.name || "");

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: Array.isArray(article.metaKeywords)
      ? article.metaKeywords.join(", ")
      : article.metaKeywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: authorSlug ? [`${SITE_URL}/authors/${authorSlug}`] : undefined,
      section: article.categoryLabel,
      tags: Array.isArray(article.metaKeywords) ? article.metaKeywords : [],
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [ogImageUrl],
    },
  };
}

// ─── BODY RENDERER (supports limitless heading/paragraph sequence) ──────────
// All text styling lives in .article-content (src/app/globals.css).

function ArticleBody({ body }) {
  // Current format: a flat "blocks" array of headings and paragraphs
  if (body.blocks && Array.isArray(body.blocks)) {
    return (
      <div className="article-content">
        {body.blocks.map((block, idx) => {
          if (block.type === "heading") {
            return (
              <h2 key={idx} id={headingId(block.text)}>
                {block.text}
              </h2>
            );
          }
          if (block.type === "paragraph") {
            return <p key={idx}>{block.text}</p>;
          }
          return null; // ignore any other types
        })}
      </div>
    );
  }

  // ─── LEGACY RENDERER (for old JSON) ──────────────────────────────────────
  return (
    <div className="article-content">
      {body.dropcap && (
        <p>
          <span className="float-left mr-3 mt-2 text-7xl font-bold leading-[0.75] text-gray-900">
            {body.dropcap.letter}
          </span>
          {body.dropcap.text}
        </p>
      )}

      {body.paragraphs &&
        body.paragraphs.map((para, idx) => <p key={idx}>{para}</p>)}

      {body.sections &&
        body.sections.map((section, idx) => {
          switch (section.type) {
            case "heading":
              return (
                <div key={idx} className="clear-both">
                  <h2 id={headingId(section.title)}>{section.title}</h2>
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              );

            case "blockquote":
              return (
                <blockquote key={idx}>
                  <p>{section.text}</p>
                  {section.cite && (
                    <footer>
                      — <cite>{section.cite}</cite>
                    </footer>
                  )}
                </blockquote>
              );

            case "paragraph":
              return (
                <div key={idx}>
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              );

            case "image":
              return (
                <figure key={idx}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
                    <Image
                      src={section.src}
                      alt={section.alt || "Article illustration"}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                  {section.caption && <figcaption>{section.caption}</figcaption>}
                </figure>
              );

            default:
              return null;
          }
        })}
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

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
  const sources = normalizeSources(article.sources);

  const pageUrl = canonicalUrl(category, slug);
  const isoDate = toISODate(article.date);
  const ogImageUrl = absoluteImageUrl(article.heroImage);

  // ─── JSON-LD (unchanged) ────────────────────────────────────────────────────

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    headline: article.heading,
    description: article.metaDescription,
    keywords: Array.isArray(article.metaKeywords)
      ? article.metaKeywords.join(", ")
      : article.metaKeywords,
    articleSection: article.categoryLabel,
    datePublished: isoDate,
    dateModified: isoDate,
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

  // Lets search engines see which outlets the article cites
  if (sources.length) {
    articleJsonLd.citation = sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      url: s.url,
      publisher: { "@type": "Organization", name: s.label },
    }));
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
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

  const readMinutes = estimateReadingMinutes(body);
  const socialKeys = Object.keys(detailedAuthor.social || {});

  return (
    <div className={`${articleSerif.variable} min-h-screen bg-white`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-5 md:pb-20 md:pt-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <div className="min-w-0 flex-1">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-[13px] text-gray-500"
            >
              <ol className="flex items-center gap-1.5">
                <li className="flex-none">
                  <Link
                    href="/"
                    title="Home"
                    className="transition-colors hover:text-[#1565c0]"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="flex-none">
                  <ChevronRight size={13} />
                </li>
                <li className="flex-none">
                  <Link
                    href={`/${category}`}
                    title={`Browse ${article.categoryLabel}`}
                    className="transition-colors hover:text-[#1565c0]"
                  >
                    {article.categoryLabel}
                  </Link>
                </li>
                <li aria-hidden="true" className="flex-none">
                  <ChevronRight size={13} />
                </li>
                <li aria-current="page" className="min-w-0 truncate text-gray-700">
                  {article.heading}
                </li>
              </ol>
            </nav>

            <article>
              {/* Title, standfirst, byline */}
              <header>
                <Link
                  href={`/${category}`}
                  title={`Browse ${article.categoryLabel}`}
                  className={`${article.categoryColor} inline-block rounded-sm px-2.5 py-1 text-xs font-semibold text-white transition hover:brightness-110`}
                >
                  {article.categoryLabel}
                </Link>

                <h1 className="mt-4 max-w-[54rem] text-balance text-[clamp(1.85rem,1.35rem+2.1vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight text-gray-900">
                  {article.heading}
                </h1>

                {article.excerpt && (
                  <p className="mt-4 max-w-[46rem] font-[family-name:var(--font-article)] text-[1.15rem] leading-snug text-gray-600 sm:text-[1.3rem]">
                    {article.excerpt}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-y border-gray-200 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 flex-none overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={detailedAuthor.avatar}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <p className="text-sm text-gray-500">
                        By{" "}
                        <Link
                          href={`/authors/${authorSlug}`}
                          title={`More articles by ${detailedAuthor.name}`}
                          className="font-semibold text-gray-900 transition-colors hover:text-[#1565c0]"
                          rel="author"
                        >
                          {detailedAuthor.name}
                        </Link>
                      </p>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-gray-500">
                        {isoDate && <time dateTime={isoDate}>{article.date}</time>}
                        <span
                          aria-hidden="true"
                          className="hidden h-3 w-px bg-gray-300 sm:block"
                        />
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} aria-hidden="true" />
                          {readMinutes} min read
                        </span>
                      </p>
                    </div>
                  </div>

                  <ShareBar url={pageUrl} title={article.heading} />
                </div>
              </header>

              {/* Hero image — wider than the text column, full width on phones */}
              <figure className="relative -mx-4 mt-6 aspect-[16/9] overflow-hidden bg-gray-100 sm:mx-0 sm:rounded-lg">
                <Image
                  src={article.heroImage}
                  alt={article.alt || article.heading}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
              </figure>

              <div className="mt-8 max-w-[46rem] md:mt-10">
                {/* Article Body – supports both new (blocks) and old structure */}
                <ArticleBody body={body} />

                {/* Share again at the end of the article */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-gray-900">
                    Share this article
                  </p>
                  <ShareBar url={pageUrl} title={article.heading} />
                </div>

                {/* Sponsor Banner */}
                <a
                  href="https://www.corruptionfiles.com/"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  title="Visit Corruption Files — Investigative Journalism"
                  className="mt-8 block w-full"
                >
                  <div className="flex w-full items-center justify-center overflow-hidden rounded-lg border border-gray-100">
                    <img
                      src="/corruptionfiles-quote-hor.webp"
                      alt="Corruption Files — Investigative Journalism"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </a>

                {/* Sources (only renders when the article JSON has a "sources" array) */}
                <SourcesSection sources={sources} />

                {/* About Author */}
                <section
                  aria-label={`About the author ${detailedAuthor.name}`}
                  className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full bg-gray-200 sm:h-20 sm:w-20">
                      <Image
                        src={detailedAuthor.avatar}
                        alt={`${detailedAuthor.name} — author photo`}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-gray-500">About the author</p>
                      <Link
                        href={`/authors/${authorSlug}`}
                        title={`Author profile: ${detailedAuthor.name}`}
                        className="mt-0.5 inline-block text-lg font-bold text-gray-900 transition-colors hover:text-[#1565c0]"
                        rel="author"
                      >
                        {detailedAuthor.name}
                      </Link>
                      {detailedAuthor.role && (
                        <p className="text-sm text-gray-500">{detailedAuthor.role}</p>
                      )}
                      <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                        {detailedAuthor.bio}
                      </p>
                      {socialKeys.length > 0 && (
                        <div className="mt-4 flex items-center gap-2">
                          {socialKeys.map((platformKey) => {
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
                                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2196f3]"
                              >
                                <SocialIcon platform={platformKey} />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <section
                aria-labelledby="related-posts-heading"
                className="mt-12 max-w-[46rem]"
              >
                <h2
                  id="related-posts-heading"
                  className="border-t-2 border-gray-900 pt-3 text-lg font-bold tracking-tight text-gray-900"
                >
                  Related posts
                </h2>
                <ul className="mt-2 divide-y divide-gray-200">
                  {relatedPosts.map((post) => {
                    const postAuthorSlug = post.authorSlug
                      ? post.authorSlug
                      : nameToSlug(post.author || "");
                    return (
                      <li
                        key={post.slug}
                        className="group relative flex items-start gap-4 py-5 sm:gap-6"
                      >
                        <div className="order-1 min-w-0 flex-1 sm:order-2">
                          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-600">
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                className={`${post.categoryColor} h-2 w-2 rounded-full`}
                                aria-hidden="true"
                              />
                              {categoryLabel(post.category)}
                            </span>
                            {post.secondaryCategory && (
                              <span className="inline-flex items-center gap-1.5">
                                <span
                                  className={`${post.secondaryColor} h-2 w-2 rounded-full`}
                                  aria-hidden="true"
                                />
                                {categoryLabel(post.secondaryCategory)}
                              </span>
                            )}
                            {post.isSponsored && (
                              <span className="inline-flex items-center gap-1 font-normal text-gray-500">
                                <Bell size={10} aria-hidden="true" /> Sponsored content
                              </span>
                            )}
                          </p>
                          <h3 className="mt-1.5 text-[17px] font-bold leading-snug text-gray-900 sm:text-lg">
                            <Link
                              href={`/${post.category}/${post.slug}`}
                              title={post.title}
                              className="transition-colors after:absolute after:inset-0 group-hover:text-[#1565c0]"
                            >
                              {post.title}
                              <span className="sr-only"> — read more</span>
                            </Link>
                          </h3>
                          {post.excerpt && (
                            <p className="mt-2 hidden text-[15px] leading-relaxed text-gray-600 line-clamp-2 sm:block">
                              {post.excerpt}
                            </p>
                          )}
                          <p className="mt-2 text-[13px] text-gray-500">
                            By{" "}
                            <Link
                              href={`/authors/${postAuthorSlug}`}
                              title={`More articles by ${post.author}`}
                              className="relative z-10 font-semibold text-gray-700 transition-colors hover:text-[#1565c0]"
                              rel="author"
                            >
                              {post.author}
                            </Link>
                          </p>
                        </div>
                        <div className="relative order-2 h-[84px] w-[84px] flex-none overflow-hidden rounded-md bg-gray-100 sm:order-1 sm:h-[132px] sm:w-[200px]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 639px) 84px, 200px"
                            className="object-cover"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar (shared with home, category and author pages) */}
          <SiteSidebar activeCategory={category} showNewsletter excludeSlug={slug} />
        </div>
      </div>
    </div>
  );
}

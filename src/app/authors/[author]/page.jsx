import Link from "next/link";
import Image from "next/image";
import { Share2, Bell, Calendar, Facebook, Twitter, Instagram, Youtube, Tag } from "lucide-react";
import homepageData from "@/data/homepage.json";
import authorsData from "@/data/authors.json";
import StickyAd from "@/components/StickyAd";

// ─── SOCIAL ICON HELPER (From Detail Page) ────────────────────────────────────

const SocialIcon = ({ platform }) => {
  const iconProps = {
    size: 18,
    strokeWidth: 2,
  };

  const p = platform.toLowerCase();
  const imgClass = "w-[18px] h-[18px] object-contain opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200";

  switch (p) {
    case "instagram":
      return <Instagram {...iconProps} />;
    
    case "x":
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" width={18} height={18} stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      );
    
    case "substack":
      return <img src="/substack.webp" alt="Substack" className={imgClass} />;
    
    case "medium":
      return <img src="/medium.webp" alt="Medium" className={imgClass} />;

    case "facebook":
      return <Facebook {...iconProps} />;

    case "youtube":
      return <Youtube {...iconProps} />;

    default:
      return null;
  }
};
// ─── LATEST ARTICLES — computed once at module level ─────────────────────────
// Replaces the dummy trendingNews JSON entries with real latest articles.
function collectLatestArticles(count = 4) {
  const all = [];

  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => { if (a?.slug && a?.title && a?.date && a?.image) all.push(a); });
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
  ].forEach((a) => { if (a?.slug && a?.title && a?.date && a?.image) all.push(a); });

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

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────────
const CATEGORY_META = {
  govt:            { label: "Government",                 color: "bg-[#ff9800]", text: "text-[#ff9800]", border: "border-[#ff9800]", ring: "ring-[#ff9800]" },
  "puerto-rico":   { label: "Puerto Rico",                 color: "bg-[#2196f3]", text: "text-[#2196f3]", border: "border-[#2196f3]", ring: "ring-[#2196f3]" },
  pa:              { label: "Police Accountability",       color: "bg-[#e91e63]", text: "text-[#e91e63]", border: "border-[#e91e63]", ring: "ring-[#e91e63]" },
  tech:            { label: "Big Tech & Surveillance",     color: "bg-[#00008b]", text: "text-[#00008b]", border: "border-[#00008b]", ring: "ring-[#00008b]" },
  "medical-fraud": { label: "Medical Fraud",               color: "bg-[#e91e63]", text: "text-[#e91e63]", border: "border-[#e91e63]", ring: "ring-[#e91e63]" },
  eco:             { label: "Environmental Exploitation",  color: "bg-[#2196f3]", text: "text-[#2196f3]", border: "border-[#2196f3]", ring: "ring-[#2196f3]" },
  intelligence:    { label: "Intelligence",                color: "bg-[#00008b]", text: "text-[#00008b]", border: "border-[#00008b]", ring: "ring-[#00008b]" },
  offshore:        { label: "Offshore Wealth & Sanctions", color: "bg-[#e91e63]", text: "text-[#e91e63]", border: "border-[#e91e63]", ring: "ring-[#e91e63]" },
};

// ─── AUTHOR LOOKUP HELPERS ────────────────────────────────────────────────────

function getAllAuthors() {
  if (Array.isArray(authorsData?.corruptionfiles)) return authorsData.corruptionfiles;
  return Object.values(authorsData).filter((v) => typeof v === "object" && v?.slug);
}

function getAuthorBySlug(slug) {
  return getAllAuthors().find((a) => a.slug === slug) ?? null;
}

function getAuthorByName(name) {
  const lower = name?.toLowerCase().trim();
  return getAllAuthors().find((a) => a.name?.toLowerCase().trim() === lower) ?? null;
}

// ─── ARTICLE COLLECTION ───────────────────────────────────────────────────────

function getArticlesByAuthorName(displayName) {
  const lower = displayName?.toLowerCase().trim();
  const all   = [];

  const pushFiltered = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => {
      if (a?.author?.toLowerCase().trim() === lower && a?.slug) all.push(a);
    });
  };

  pushFiltered(homepageData.newsCards);
  pushFiltered(homepageData.politicsNews);
  pushFiltered(homepageData.secondaryNews);
  pushFiltered(homepageData.inOtherNews?.grid);
  pushFiltered(homepageData.discoveryMiddle);
  pushFiltered(homepageData.discoveryRight);
  pushFiltered(homepageData.technologyNews);
  pushFiltered(homepageData.trendingSectionData);
  pushFiltered(homepageData.healthcareNews);
  pushFiltered(homepageData.worldNews?.sidebar);

  [
    homepageData.discoveryMain,
    homepageData.worldNews?.main,
    homepageData.inOtherNews?.featured,
  ].forEach((a) => {
    if (a?.author?.toLowerCase().trim() === lower && a?.slug) all.push(a);
  });

  const seen = new Set();
  return all.filter((a) => {
    if (!a.slug || seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

// ─── ARTICLE NORMALISER ───────────────────────────────────────────────────────

function normalizeArticle(a) {
  const authorRecord = getAuthorByName(a.author);
  const authorSlug   = authorRecord?.slug
    ?? a.author?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return {
    id:          a.id,
    slug:       a.slug,
    category:   a.category || "politics",
    title:      a.title    || "",
    authorName: a.author   || "",
    authorSlug,
    excerpt:    a.excerpt  || a.description || a.quote || "",
    image:      a.image    || "/corruptionfiles4-6.jpg",
    date:       a.date     || null,
    sponsored:  a.isSponsored || a.sponsored || false,
    hasVideo:   a.hasVideo || false,
    tags:       a.tags || (a.badges ? a.badges.map((b) => ({ label: b.text, color: b.color })) : []),
  };
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow">
        <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </div>
    </div>
  );
}

function CategoryPill({ category }) {
  const meta = CATEGORY_META[category];
  if (!meta) return null;
  return (
    <span className={`${meta.color} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide`}>
      {meta.label}
    </span>
  );
}

function NewsListCard({ card }) {
  const a = normalizeArticle(card);
  const href = `/${a.category}/${a.slug}`;
  const hasTags = a.tags?.length > 0;

  return (
    <article className="flex flex-col sm:flex-row border-b border-gray-200 pb-4 mb-6 last:border-0 last:mb-0">
      <div className="w-full sm:w-[220px] md:w-[240px] flex-shrink-0 h-[180px] sm:h-[160px] overflow-hidden group">
        <Link href={href} className="relative block w-full h-full">
          <Image
            src={a.image} 
            alt={a.title} 
            fill
            sizes="(max-width:768px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {a.hasVideo && <PlayIcon />}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap z-10">
            {hasTags
              ? a.tags.map((t) => (
                  <span key={t.label} className={`${t.color} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide`}>
                    {t.label}
                  </span>
                ))
              : <CategoryPill category={a.category} />}
          </div>
        </Link>
      </div>

      <div className="flex-1 sm:pl-4 pt-3 sm:pt-0">
        {a.sponsored
          ? <p className="text-gray-400 text-xs flex items-center gap-1 mb-1"><Bell size={11} /> Sponsored content</p>
          : a.date
            ? <p className="text-gray-400 text-xs flex items-center gap-1 mb-1"><Calendar size={11} /> {a.date}</p>
            : null}

        <h2 className="font-bold text-gray-900 text-base md:text-[17px] leading-snug mb-1">
          <Link href={href} className="hover:text-blue-600 transition-colors">{a.title}</Link>
        </h2>

        {CATEGORY_META[a.category] && (
          <Link
            href={`/${a.category}`}
            className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide mb-2 ${CATEGORY_META[a.category].text} hover:opacity-75 transition-opacity`}
          >
            <Tag size={10} />
            {CATEGORY_META[a.category].label}
          </Link>
        )}

        <p className="text-xs text-gray-500 mb-2">
          By{" "}
          <Link
            href={`/authors/${a.authorSlug}`}
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            {a.authorName}
          </Link>
        </p>

        {a.excerpt && (
          <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{a.excerpt}</p>
        )}
        <hr className="border-gray-200 mb-3" />
      </div>
    </article>
  );
}

function LatestCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <Link href={href} className="flex flex-col group">
      <div className="relative w-full h-[110px] overflow-hidden">
        <Image src={item.image} alt={item.title} fill sizes="150px"
          className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {item.badge && (
          <span className="absolute top-2 right-2 bg-[#f69a4d] text-white text-xs font-bold px-1.5 py-0.5 z-10">
            {item.badge}
          </span>
        )}
      </div>
      {item.isSponsored || item.sponsored
        ? <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1"><Bell size={10} /> Sponsored content</p>
        : <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1"><Calendar size={10} /> {item.date}</p>}
      <p className="text-sm font-semibold text-gray-900 leading-snug mt-1 group-hover:text-blue-600 transition-colors line-clamp-3">
        {item.title}
      </p>
    </Link>
  );
}

function SidebarCategoryCard({ cat }) {
  return (
    <Link href={`/${cat.category}`} className="relative overflow-hidden h-[56px] cursor-pointer group block">
      <Image src={cat.image} alt={cat.label} fill sizes="300px"
        className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center px-4 z-10">
        <span className="text-white font-bold text-base">{cat.label}</span>
      </div>
    </Link>
  );
}

// ─── UPDATED AUTHOR HEADER ───────────────────────────────────────────────────

function AuthorHeader({ author, articleCount }) {
  const catMeta = author.category ? CATEGORY_META[author.category] : null;
  const ringColor = catMeta?.ring ?? "ring-[#2196f3]";

  // Hover colors mapping matching the Article Detail page
  const hoverColors = {
    x: "hover:text-black",
    twitter: "hover:text-black",
    instagram: "hover:text-pink-600",
    facebook: "hover:text-blue-600",
    youtube: "hover:text-red-600",
  };

  return (
    <div className="bg-white w-full mb-10 border-b border-gray-100 pb-8">
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-8">
        <div className="flex flex-col items-start gap-4 flex-shrink-0">
          <div className="flex flex-row items-center gap-5">
            <div className={`relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-offset-2 ${ringColor} shadow-md`}>
              <Image
                src={author.avatar || author.coverImage}
                alt={author.name}
                fill 
                sizes="96px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] block mb-1">
                About Author
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black capitalize leading-tight">
                {author.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {author.role && (
              <span className="text-[#2196f3] text-sm font-semibold">{author.role}</span>
            )}
            {catMeta && (
              <Link
                href={`/${author.category}`}
                className={`inline-flex items-center gap-1.5 ${catMeta.color} text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wide hover:opacity-80 transition-opacity`}
              >
                <Tag size={10} />
                {catMeta.label}
              </Link>
            )}
          </div>

          <div>
            <p className="text-xl font-bold text-gray-900">{articleCount}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Posts</p>
          </div>
        </div>

        <div className="hidden md:block w-px bg-gray-200 self-stretch mx-2" />

        <div className="flex flex-col justify-center flex-1 gap-6">
          <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed font-serif">
            {author.bio}
          </p>
          <div className="flex items-center gap-5 text-gray-700">
            {/* Logic synced with Detail Page */}
            {Object.keys(author.social || {}).map((platformKey) => (
              <a 
                key={platformKey} 
                href={author.social[platformKey]} 
                target="_blank"
                rel="noopener noreferrer"
                className={`group transition-colors duration-200 ${hoverColors[platformKey.toLowerCase()] || 'hover:text-blue-600'}`}
                aria-label={platformKey}
              >
                <SocialIcon platform={platformKey} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { author: slug } = await params;
  const data     = getAuthorBySlug(slug);
  const name     = data?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const catLabel = data?.category ? (CATEGORY_META[data.category]?.label ?? "") : "";

  return {
    title:       `${name} — ${catLabel || "Author"} | Corruption Files`,
    description: data?.bio ?? `Read the latest articles by ${name} on Corruption Files.`,
    openGraph:   { type: "profile", title: `${name} — Author`, siteName: "Corruption Files" },
  };
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default async function AuthorPage({ params }) {
  const { author: authorSlug } = await params;

  const authorData = getAuthorBySlug(authorSlug) ?? {
    name:       authorSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    slug:       authorSlug,
    avatar:     "/corruptionfiles4-6.jpg",
    coverImage: "/corruptionfiles4-2-1024x683.jpg",
    role:       "Contributor",
    bio:        `${authorSlug} is a contributor at Corruption Files.`,
    social:     {},
    category:   null,
    stats:      { posts: 0, followers: "—", following: "—" },
  };

  const articles = getArticlesByAuthorName(authorData.name);
  const { categories } = homepageData;
  const catMeta = authorData.category ? CATEGORY_META[authorData.category] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name:        authorData.name,
      description: authorData.bio,
      url:         `https://www.corruptionfiles.com/authors/${authorSlug}`,
    },
  };

return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        <AuthorHeader author={authorData} articleCount={articles.length} />

        <div className={`border-b-2 mb-8 pb-1 ${catMeta ? catMeta.border : "border-black"}`}>
          <h2 className="text-[24px] font-bold text-black leading-tight">
            Articles by{" "}
            <span className={catMeta ? catMeta.text : "text-black"}>{authorData.name}</span>
          </h2>
          <div className="flex items-center gap-3 mt-0.5">
            <p className="text-gray-400 text-[13px] font-medium uppercase tracking-tight">
              {articles.length} published {articles.length === 1 ? "post" : "posts"}
            </p>
            {catMeta && (
              <Link
                href={`/${authorData.category}`}
                className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide ${catMeta.text} hover:opacity-70 transition-opacity`}
              >
                <Tag size={9} />
                {catMeta.label}
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {articles.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3">✍️</p>
                <p className="text-gray-500 text-sm">No articles found for this author.</p>
              </div>
            ) : (
              <>
                {articles.slice(0, 4).map((card) => (
                  <NewsListCard key={card.id ?? card.slug} card={card} />
                ))}
                <a 
                  href="https://www.mirrorstandard.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 mb-6 block w-full"
                >
                  <div className="w-full overflow-hidden flex items-center justify-center border border-gray-100">
                    <img
                      src="/mirror-standard-ad-horizontal.webp"
                      alt="Visit Mirror Standard"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </a>
                {articles.slice(4).map((card) => (
                  <NewsListCard key={card.id ?? card.slug} card={card} />
                ))}
              </>
            )}
          </div>

          <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
            <StickyAd />
            <div className="mb-6 mt-14">
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Latest Today
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {LATEST_ARTICLES.map((item) => (
                  <LatestCard key={item.id ?? item.slug} item={item} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Categories
              </h3>
              <div className="flex flex-col gap-1">
                {categories?.map((cat) => <SidebarCategoryCard key={cat.label} cat={cat} />)}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
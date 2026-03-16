import Link from "next/link";
import Image from "next/image";
import { Share2, Bell, Calendar } from "lucide-react";
import homepageData from "@/data/homepage.json";
import Newsletter from "@/components/Newsletter";
import AdBanner from "@/components/AdBanner";
import StickyAd from "@/components/StickyAd";
import CategoryCard from "@/components/CategoryCard";
export const metadata = {
  title: "Daily News | Politics, Business, and World Updates",
  description: "Breaking news coverage of politics, business, technology, and world events.",
  openGraph: {
    type: "website",
    title: "Daily News | Politics, Business, and World Updates",
    siteName: "Daily News",
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// "U.S." → "us"  |  "World" → "world"  |  "U.S.  " → "us"
function labelToSlug(label) {
  return label.toLowerCase().replace(/[^a-z0-9-]/g, "").trim();
}

// Author name → author page URL: "corruptionfiles" → "/authors/corruptionfiles"
function authorHref(name) {
  return `/authors/${name.toLowerCase().replace(/\s+/g, "-")}`;
}

// ─── SHARED SUB-COMPONENTS ───────────────────────────────────────────────────

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

// Used in Politics / InOtherNews / grid sections
function NewsCard({ slug, category, image, categoryLabel, categoryColor, date, isSponsored, author, title, description }) {
  const href = `/${category}/${slug}`;
  return (
    <article className="flex flex-col group">
      <div className="relative w-full aspect-video overflow-hidden mb-3">
        <Link href={href}>
          <Image src={image} alt={title} fill sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className={`absolute bottom-3 left-3 ${categoryColor} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider z-10`}>
            {categoryLabel}
          </span>
        </Link>
      </div>
      <div className="text-[11px] text-gray-400 mb-1 flex items-center gap-1">
        {isSponsored ? <><Bell size={11} /> Sponsored content</> : <><Calendar size={11} /> {date}</>}
      </div>
      <h3 className="font-bold text-[16px] text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors">
        <Link href={href}>{title}</Link>
      </h3>
      <p className="text-xs text-gray-500 mb-2">
        By{" "}
        <Link href={authorHref(author)} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">
          {author}
        </Link>
      </p>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{description}</p>
    </article>
  );
}

// Used in the main news feed list
function NewsListCard({ card }) {
  const href = `/${card.category}/${card.slug}`;
  return (
    <article className="flex flex-col sm:flex-row border-b border-gray-200 pb-3 mb-6 last:border-0 last:mb-0">
      <div className="relative w-full sm:w-[220px] md:w-[240px] flex-shrink-0 h-[180px] sm:h-[160px] overflow-hidden group">
        <Link href={href}>
          <Image src={card.image} alt={card.title} fill sizes="(max-width:768px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
          {card.hasVideo && <PlayIcon />}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap z-10">
            {card.tags.map((t) => (
              <span key={t.label} className={`${t.color} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide`}>{t.label}</span>
            ))}
          </div>
        </Link>
      </div>
      <div className="flex-1 sm:pl-4 pt-3 sm:pt-0">
        {card.sponsored
          ? <p className="text-gray-400 text-xs flex items-center gap-1 mb-1"><Bell size={11} /> Sponsored content</p>
          : card.date ? <p className="text-gray-400 text-xs flex items-center gap-1 mb-1"><Calendar size={11} /> {card.date}</p> : null}
        <h2 className="font-bold text-gray-900 text-base md:text-[17px] leading-snug mb-2">
          <Link href={href} className="hover:text-blue-600 transition-colors">{card.title}</Link>
        </h2>
        <p className="text-xs text-gray-500 mb-2">
          By{" "}
          <Link href={authorHref(card.author)} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">
            {card.author}
          </Link>
        </p>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{card.excerpt}</p>
        <hr className="border-gray-200 mb-3" />
        <div className="flex items-center gap-3 flex-wrap">
          <Link href={href} className="bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2 transition-colors inline-block">
            READ MORE
          </Link>
          <span className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-blue-500 transition-colors">
            <Share2 size={14} /> Share
          </span>
        </div>
      </div>
    </article>
  );
}

// Sidebar trending card
function TrendingCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <Link href={href} className="flex flex-col group">
      <div className="relative w-full h-[110px] overflow-hidden">
        <Image src={item.image} alt={item.title} fill sizes="150px"
          className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {item.badge && <span className="absolute top-2 right-2 bg-[#f69a4d] text-white text-xs font-bold px-1.5 py-0.5 z-10">{item.badge}</span>}
      </div>
      {item.sponsored
        ? <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1"><Bell size={10} /> Sponsored content</p>
        : <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1"><Calendar size={10} /> {item.date}</p>}
      <p className="text-sm font-semibold text-gray-900 leading-snug mt-1 group-hover:text-blue-600 transition-colors line-clamp-3">{item.title}</p>
    </Link>
  );
}

function DiscoveryMainCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <article className="flex flex-col h-full group border-b lg:border-b-0 lg:border-r border-gray-200 lg:pr-5 pb-5 lg:pb-0">
      <div className="relative w-full aspect-[3/2] overflow-hidden mb-1">
        <Link href={href}>
          <Image src={item.image} alt={item.title} fill sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className={`absolute bottom-4 left-4 ${item.categoryColor} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}>
            {item.categoryLabel}
          </span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-[11px] text-gray-400 mb-2 flex items-center gap-1"><Calendar size={12} /><time>{item.date}</time></div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={href}>{item.title}</Link>
        </h3>
        <div className="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-wide">
          By{" "}
          <Link href={authorHref(item.author)} className="text-gray-600 hover:text-blue-600 transition-colors">
            {item.author}
          </Link>
        </div>
        <p className="text-[15px] text-gray-500 leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>
      </div>
    </article>
  );
}

function DiscoveryMiddleItem({ item }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <article className="flex gap-5 border-b border-gray-100 pb-8 mb-6 last:border-0 last:mb-0 last:pb-0 group">
      <div className="relative w-[140px] h-[95px] flex-shrink-0 overflow-hidden">
        <Link href={href}>
          <Image src={item.image} alt={item.title} fill sizes="140px"
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
          {item.badge && <span className="absolute top-0 right-0 bg-[#f69a4d] text-white font-bold px-2 py-0.5 text-xs z-10">{item.badge}</span>}
        </Link>
      </div>
      <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            <span className={`${item.categoryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}>{item.categoryLabel}</span>
            {item.secondaryCategory && <span className={`${item.secondaryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}>{item.secondaryCategory}</span>}
          </div>
          <h4 className="font-bold text-[16px] text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
            <Link href={href}>{item.title}</Link>
          </h4>
        </div>
        <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
          {item.isSponsored ? <><Bell size={11} /> Sponsored content</> : <><Calendar size={11} /><time>{item.date}</time></>}
        </div>
      </div>
    </article>
  );
}

function DiscoveryRightItem({ item }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <article className="flex flex-col border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 group">
      <div className="flex flex-wrap gap-1 mb-2">
        <span className={`${item.categoryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}>{item.categoryLabel}</span>
        {item.secondaryCategory && <span className={`${item.secondaryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider`}>{item.secondaryCategory}</span>}
      </div>
      <h4 className="font-bold text-[15px] text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
        <Link href={href}>{item.title}</Link>
      </h4>
      <div className="text-[11px] text-gray-400 flex items-center gap-1"><Calendar size={11} /><time>{item.date}</time></div>
    </article>
  );
}

function TechOverlayCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <article className="relative w-full aspect-square md:aspect-[4/3] group overflow-hidden">
      <Link href={href} className="block w-full h-full">
        <Image src={item.image} alt={item.title} fill sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-1 z-10">
          {item.categories
            ? item.categories.map((cat, idx) => <span key={idx} className={`${cat.color} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}>{cat.label}</span>)
            : <span className={`${item.categoryColor} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}>{item.categoryLabel}</span>}
        </div>
        <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 md:p-10 text-white z-20">
          <div className="text-[11px] font-medium mb-3 opacity-90 flex items-center gap-1.5">
            {item.isSponsored ? <><Bell size={12} /> Sponsored content</> : <><Calendar size={12} /><time>{item.date}</time></>}
          </div>
          <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3 drop-shadow-sm group-hover:text-blue-400 transition-colors">{item.title}</h3>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-4 opacity-80">
            By {item.author}
          </div>
          <p className="text-[14px] leading-relaxed mb-6 opacity-90 line-clamp-2 md:line-clamp-3 max-w-lg">{item.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

function TrendingCircleCard({ item }) {
  const href = `/${item.category}/${item.slug}`;
  return (
    <article className="flex gap-5 items-start group">
      <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28">
        <Link href={href} className="block w-full h-full relative">
          <Image src={item.image} alt={item.title} fill sizes="(max-width:768px) 96px, 112px"
            className="object-cover rounded-full transition-transform duration-500 group-hover:scale-105" />
          {item.badge && <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-[#f69a4d] text-white font-bold text-[11px] px-2 py-1 shadow-sm z-10">{item.badge}</span>}
        </Link>
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex flex-wrap gap-1 mb-2">
          {item.categories.map((cat, idx) => (
            <Link key={idx} href={`/${labelToSlug(cat.label)}`}>
              <span className={`${cat.color} text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider cursor-pointer`}>{cat.label}</span>
            </Link>
          ))}
        </div>
        <h4 className="font-bold text-[15px] md:text-[16px] text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
          <Link href={href}>{item.title}</Link>
        </h4>
      </div>
    </article>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  const {
    politicsNews, secondaryNews, inOtherNews, healthcareNews,
    worldNews, newsCards, trendingNews, categories,
    discoveryMain, discoveryMiddle, discoveryRight, technologyNews, trendingSectionData,
  } = homepageData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Daily News",
    url: "https://www.www.corruptionfiles.com",
    logo: "https://www.www.corruptionfiles.com/logo.png",
    sameAs: ["https://twitter.com/yourhandle"],
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-20">
        <h1 className="sr-only">Daily News Home - Politics, Business and World Headlines</h1>

        {/* ── Govt SECTION ── */}
        <div className="border-b-2 border-black mb-6">
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link href="/govt" className="hover:text-blue-600 transition-colors">Government</Link>
          </h2>
          <p className="text-gray-400 text-[14px] font-medium mb-4 uppercase tracking-tight">Capitol & Westminster</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {politicsNews.map((news) => <NewsCard key={news.id} {...news} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-8 mb-7">
          {secondaryNews.map((news) => <NewsCard key={news.id} {...news} />)}
        </div>

        {/* ── PR SECTION ── */}
        <div className="border-b-2 border-black mb-8">
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link href="/puerto-rico" className="hover:text-blue-600 transition-colors">Puerto Rico</Link>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <Link
            href={`/${inOtherNews.featured.categories?.[0] ? labelToSlug(inOtherNews.featured.categories[0].label) : "world"}/${inOtherNews.featured.slug}`}
            className="relative group cursor-pointer overflow-hidden border border-gray-200 block min-h-[400px]"
          >
            <Image src={inOtherNews.featured.image} alt={inOtherNews.featured.title} fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors z-10" />
            <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 md:p-12 pb-8 text-white z-20">
              <div className="flex gap-2 mb-4">
                {inOtherNews.featured.categories.map((cat, idx) => (
                  <span key={idx} className={`${cat.color} text-[10px] font-bold px-3 py-1 uppercase tracking-wider`}>{cat.label}</span>
                ))}
              </div>
              {inOtherNews.featured.isSponsored && <div className="text-[12px] font-medium mb-2">🔔 Sponsored content</div>}
              <h3 className="text-2xl font-bold leading-tight mb-4 max-w-md group-hover:text-blue-300 transition-colors">{inOtherNews.featured.title}</h3>
              <div className="text-[12px] font-bold uppercase tracking-widest mb-4">By {inOtherNews.featured.author}</div>
              <p className="text-[15px] italic font-serif leading-relaxed max-w-sm border-t border-white/20 pt-4">"{inOtherNews.featured.quote}"</p>
            </div>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {inOtherNews.grid.map((news) => <NewsCard key={news.id} {...news} />)}
          </div>
        </div>

        {/* ── Police SECTION ── */}
        <div className="border-b-2 border-black mt-8">
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link href="/pa" className="hover:text-blue-600 transition-colors">Police Accountability</Link>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 mt-8 mb-8">
          {healthcareNews.map((item) => (
            <Link key={item.id} href={`/${item.category}/${item.slug}`} className="flex flex-col gap-3 group cursor-pointer">
              <div className="flex gap-2">
                {item.badges.map((badge, bIdx) => (
                  <span key={bIdx} className={`${badge.color} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider`}>{badge.text}</span>
                ))}
              </div>
              <h3 className="text-[17px] font-bold leading-tight text-[#222] group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <div className="text-[11px] text-gray-400 flex items-center gap-1">
                {item.isSponsored
                  ? <span className="flex items-center gap-1">🔔 Sponsored content</span>
                  : <span className="flex items-center gap-1">📅 {item.date}</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* ── INVESTIGATION SECTION ── */}
        <div className="border-b-2 border-black mb-8">
          <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">
            <Link href="/tech" className="hover:text-blue-600 transition-colors">Big Tech & Surveillance</Link>
          </h2>
          <p className="text-gray-400 text-[14px] font-medium mb-4 uppercase tracking-tight">News</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          <article className="lg:col-span-8 group cursor-pointer">
            <Link href={`/${worldNews.main.category}/${worldNews.main.slug}`} className="block">
              <div className="relative aspect-video overflow-hidden mb-6">
                <Image src={worldNews.main.image} alt={worldNews.main.title} fill
                  sizes="(max-width:1024px) 100vw, 800px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                  {worldNews.main.categories.map((cat, idx) => (
                    <span key={idx} className={`${cat.color} text-[10px] font-bold px-2 py-1 text-white uppercase`}>{cat.label}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">📅 {worldNews.main.date}</span>
                <h2 className="text-3xl font-bold text-[#222] group-hover:text-blue-600 transition-colors">{worldNews.main.title}</h2>
                <div className="text-[11px] font-bold text-gray-400 uppercase">
                  By <span className="text-gray-600">{worldNews.main.author}</span>
                </div>
                <p className="text-gray-500 text-[15px] leading-relaxed line-clamp-4">{worldNews.main.description}</p>
                <div className="flex justify-between items-center pt-4">
                  <span className="bg-[#2196f3] text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors inline-block">Read More</span>
                  <span className="flex items-center gap-1 text-black uppercase font-bold text-[12px]"><Share2 size={14} /> Share</span>
                </div>
              </div>
            </Link>
          </article>
          <aside className="lg:col-span-4 flex flex-col gap-4">
            {worldNews.sidebar.map((item) => (
              <Link key={item.id}
                href={`/${item.category}/${item.slug}`}
                className="border border-gray-100 group cursor-pointer shadow-sm hover:shadow-md transition-shadow block">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {item.badge && (
                    <div className={`absolute top-0 right-0 ${item.badgeColor} text-white font-bold px-3 py-1 text-lg z-10`}>{item.badge}</div>
                  )}
                  <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                    {item.categories.map((cat, idx) => (
                      <span key={idx} className={`${cat.color} text-[10px] font-bold px-2 py-1 text-white uppercase`}>{cat.label}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[11px] text-gray-400">📅 {item.date}</span>
                  <h3 className="text-xl font-bold text-[#222] group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="flex items-center gap-1 text-black font-bold uppercase text-[11px]"><Share2 size={13} /> Share</span>
                  </div>
                </div>
              </Link>
            ))}
          </aside>
        </div>

        <Newsletter />
        <AdBanner />

        {/* ── NEWS FEED + SIDEBAR ── */}
        <div className="mt-10 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {newsCards.slice(0, 4).map((card) => <NewsListCard key={card.id} card={card} />)}
            <div className="mt-2 mb-6 w-full h-[90px] bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm tracking-widest">
              728×90 AD
            </div>
            <div id="ad-sentinel" className="h-0 w-full" />
            {newsCards.slice(4).map((card) => <NewsListCard key={card.id} card={card} />)}
          </div>
          <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
            <StickyAd />
            <div className="mb-6 mt-14">
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">Trending Today</h3>
              <div className="grid grid-cols-2 gap-4">
                {trendingNews.map((item) => <TrendingCard key={item.id} item={item} />)}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">Categories</h3>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => <CategoryCard key={cat.label} cat={cat} />)}
              </div>
            </div>
          </aside>
        </div>

        {/* ── TECH SECTION ── */}
        <section aria-labelledby="tech-discovery" className="mt-7 mb-20">
          <div className="border-b-2 border-black mb-8 pb-1">
            <h2 id="tech-discovery" className="text-[28px] font-bold text-black leading-tight">
              <Link href="/eco" className="hover:text-blue-600 transition-colors">Environmental Exploitation</Link>
            </h2>
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">Never miss what people read</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            <div className="md:col-span-2 lg:col-span-1">
              <DiscoveryMainCard item={discoveryMain} />
            </div>
            <div className="flex flex-col lg:border-r border-gray-200 lg:pr-8">
              {discoveryMiddle.map((item) => <DiscoveryMiddleItem key={item.id} item={item} />)}
            </div>
            <div className="flex flex-col h-full pt-4 lg:pt-0">
              {discoveryRight.map((item) => <DiscoveryRightItem key={item.id} item={item} />)}
            </div>
          </div>
        </section>

        <AdBanner />

        {/* ── SCIENCE SECTION ── */}
        <section aria-labelledby="science-heading" className="mt-16 mb-20">
          <div className="border-b-2 border-black mb-8 pb-1">
            <h2 id="science-heading" className="text-[28px] font-bold text-black leading-tight">
              <Link href="/intelligence" className="hover:text-blue-600 transition-colors">Intelligence</Link>
            </h2>
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">News</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologyNews.map((item) => <TechOverlayCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── BANKING SECTION ── */}
        <section aria-labelledby="banking-heading" className="mt-1 mb-1">
          <div className="border-b-2 border-black mb-4 pb-1">
            <h2 id="banking-heading" className="text-[28px] font-bold text-black leading-tight">
              <Link href="/offshore" className="hover:text-blue-600 transition-colors">Offshore Wealth & Sanctions</Link>
            </h2>
            <p className="text-gray-400 text-[14px] font-medium uppercase tracking-tight">News</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {trendingSectionData.map((item) => <TrendingCircleCard key={item.id} item={item} />)}
          </div>
        </section>

      </div>
    </main>
  );
}
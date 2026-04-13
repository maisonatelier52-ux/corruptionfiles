import Link from "next/link";
import Image from "next/image";
import { Share2, Bell, Calendar } from "lucide-react";
import homepageData from "@/data/homepage.json";
import StickyAd from "@/components/StickyAd";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function labelToSlug(label) {
  // FIX: replace spaces with dashes BEFORE stripping non-alphanumeric chars
  // Previously spaces were stripped entirely, turning "Puerto Rico" → "puertorico"
  // Now: "Puerto Rico" → "puerto-rico" ✓
  return label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").trim();
}

function getArticlesByCategory(categorySlug) {
  const all = [];

  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => { if (a?.category === categorySlug && a?.slug) all.push(a); });
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

  if (homepageData.discoveryMain?.category === categorySlug) all.push(homepageData.discoveryMain);
  if (homepageData.worldNews?.main?.category === categorySlug) all.push(homepageData.worldNews.main);

  // FIX: labelToSlug now produces "puerto-rico" from "Puerto Rico", so this
  // check correctly matches the featured article for the puerto-rico category.
  if (homepageData.inOtherNews?.featured?.categories?.some((c) => labelToSlug(c.label) === categorySlug)) {
    all.push({ ...homepageData.inOtherNews.featured, category: categorySlug });
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
    tags: a.tags || (a.badges ? a.badges.map((b) => ({ label: b.text, color: b.color })) : []),
    categoryLabel: a.categoryLabel || (a.categories?.[0]?.label) || (a.badges?.[0]?.text) || a.category,
    categoryColor: a.categoryColor || (a.categories?.[0]?.color) || "bg-[#2196f3]",
  };
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

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

function NewsListCard({ card }) {
  const a = normalizeArticle(card);
  const href = `/${a.category}/${a.slug}`;
  return (
    <article className="flex flex-col sm:flex-row border-b border-gray-200 pb-4 mb-6 last:border-0 last:mb-0">
      <div className="w-full sm:w-[220px] md:w-[240px] flex-shrink-0 h-[180px] sm:h-[160px] overflow-hidden group">
        <Link href={href} className="relative block w-full h-full">
          <Image src={a.image} alt={a.title} fill sizes="(max-width:768px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
          {a.hasVideo && <PlayIcon />}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap z-10">
            {a.tags.map((t) => (
              <span key={t.label} className={`${t.color} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide`}>{t.label}</span>
            ))}
          </div>
        </Link>
      </div>
      <div className="flex-1 sm:pl-4 pt-3 sm:pt-0">
        {a.sponsored
          ? <p className="text-gray-400 text-xs flex items-center gap-1 mb-1"><Bell size={11} /> Sponsored content</p>
          : a.date ? <p className="text-gray-400 text-xs flex items-center gap-1 mb-1"><Calendar size={11} /> {a.date}</p> : null}
        <h2 className="font-bold text-gray-900 text-base md:text-[17px] leading-snug mb-2">
          <Link href={href} className="hover:text-blue-600 transition-colors">{a.title}</Link>
        </h2>
        <p className="text-xs text-gray-500 mb-2">
          By{" "}
          <Link href={`/authors/${a.author.toLowerCase().replace(/\s+/g, "-")}`}
            className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">
            {a.author}
          </Link>
        </p>
        {a.excerpt && <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{a.excerpt}</p>}
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

function SidebarCategoryCard({ cat }) {
  return (
    <Link href={`/${cat.category}`} className="relative overflow-hidden h-[56px] cursor-pointer group block">
      <Image src={cat.image} alt={cat.label} fill sizes="300px"
        className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <span className="text-white font-bold text-base">{cat.label}</span>
      </div>
    </Link>
  );
}

function CategoryHero({ categoryName, count }) {
  return (
    <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden mb-10">
      <Image
        src="/cat-bgcolor.webp"
        alt={categoryName}
        fill
        className="object-cover brightness-[0.80]"
        priority
      />
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 max-w-4xl">
        <span className="text-white/60 text-[11px] font-bold uppercase tracking-[0.25em] mb-2">
          Browsing Category
        </span>
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 capitalize leading-none">
          {categoryName}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-[#2196f3] text-white text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
            {count} {count === 1 ? "Post" : "Posts"}
          </span>
          <span className="text-white/40 text-xs">·</span>
          <Link href="/" className="text-white/60 text-xs hover:text-white transition-colors">Home</Link>
          <span className="text-white/40 text-xs">›</span>
          <span className="text-white/90 text-xs capitalize">{categoryName}</span>
        </div>
        <p className="text-white/75 text-sm md:text-base font-serif italic max-w-xl leading-relaxed">
          Browse the latest headlines and in-depth analysis from the world of {categoryName}.
        </p>
      </div>
    </div>
  );
}

function EmptyState({ categoryName }) {
  return (
    <div className="py-20 text-center">
      <p className="text-5xl mb-4">📰</p>
      <h2 className="text-xl font-bold text-gray-800 mb-2">No articles found</h2>
      <p className="text-gray-500 text-sm mb-6">
        There are no articles yet in the <span className="font-semibold capitalize">{categoryName}</span> category.
      </p>
      <Link href="/" className="bg-[#2196f3] text-white text-xs font-bold px-6 py-3 hover:bg-blue-600 transition-colors inline-block uppercase tracking-widest">
        Back to Home
      </Link>
    </div>
  );
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { category } = await params;
  const name = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${name} News | Daily News`,
    description: `Latest breaking news and analysis in ${name}.`,
    openGraph: { type: "website", title: `${name} News`, siteName: "Daily News" },
  };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const articles = getArticlesByCategory(category);
  const categoryLabel =
    articles[0]?.categoryLabel ||
    articles[0]?.categories?.[0]?.label ||
    categoryName;
  const { trendingNews, categories } = homepageData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} News`,
    description: `News articles about ${categoryName}`,
    url: `https://www.corruptionfiles.com/${category}`,
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-20">
        <CategoryHero categoryName={categoryLabel} count={articles.length} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {articles.length === 0 ? (
              <EmptyState categoryName={categoryName} />
            ) : (
              <>
                {articles.slice(0, 4).map((card) => <NewsListCard key={card.id ?? card.slug} card={card} />)}
                <div className="mt-2 mb-6 w-full h-[90px] bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm tracking-widest">
                  728×90 AD
                </div>
                {articles.slice(4).map((card) => <NewsListCard key={card.id ?? card.slug} card={card} />)}
              </>
            )}
          </div>

          <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
            <StickyAd />

            <div className="mb-6 mt-14">
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Trending Today
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {trendingNews.map((item) => <TrendingCard key={item.id} item={item} />)}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
                Categories
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => <SidebarCategoryCard key={cat.label} cat={cat} />)}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
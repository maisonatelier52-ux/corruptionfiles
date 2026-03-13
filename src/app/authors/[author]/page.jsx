import Link from "next/link";
import Image from "next/image";
import { Share2, Bell, Calendar, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import homepageData from "@/data/homepage.json";
import authorsData from "@/data/authors.json";
import StickyAd from "@/components/StickyAd";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function labelToSlug(label) {
  return label.toLowerCase().replace(/[^a-z0-9-]/g, "").trim();
}

// Get all articles by author name from homepage.json
function getArticlesByAuthor(authorName) {
  const name = authorName.toLowerCase();
  const all = [];

  const pushFiltered = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => {
      if (a?.author?.toLowerCase() === name && a?.slug) all.push(a);
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

  if (homepageData.discoveryMain?.author?.toLowerCase() === name) all.push(homepageData.discoveryMain);
  if (homepageData.worldNews?.main?.author?.toLowerCase() === name) all.push(homepageData.worldNews.main);
  if (homepageData.inOtherNews?.featured?.author?.toLowerCase() === name) all.push(homepageData.inOtherNews.featured);

  // Deduplicate by slug
  const seen = new Set();
  return all.filter((a) => {
    if (!a.slug || seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
}

function normalizeArticle(a) {
  return {
    id: a.id,
    slug: a.slug,
    category: a.category || "politics",
    title: a.title || "",
    author: a.author || "Davenport",
    excerpt: a.excerpt || a.description || "",
    image: a.image || "/Davenport4-6.jpg",
    date: a.date || null,
    sponsored: a.isSponsored || a.sponsored || false,
    hasVideo: a.hasVideo || false,
    tags: a.tags || (a.badges ? a.badges.map((b) => ({ label: b.text, color: b.color })) : []),
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
      <div className="relative w-full sm:w-[220px] md:w-[240px] flex-shrink-0 h-[180px] sm:h-[160px] overflow-hidden group">
        <Link href={href}>
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
  const slug = labelToSlug(cat.label);
  return (
    <Link href={`/${slug}`} className="relative overflow-hidden h-[56px] cursor-pointer group block">
      <Image src={cat.image} alt={cat.label} fill sizes="300px"
        className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <span className="text-white font-bold text-base">{cat.label}</span>
      </div>
    </Link>
  );
}

function AuthorHeader({ author, articleCount }) {
  const socialIcons = {
    facebook: { icon: Facebook, color: "hover:text-blue-600" },
    twitter: { icon: Twitter, color: "hover:text-sky-500" },
    instagram: { icon: Instagram, color: "hover:text-pink-600" },
    youtube: { icon: Youtube, color: "hover:text-red-600" },
  };

  return (
    <div className="flex flex-col-reverse md:flex-row bg-white w-full mb-10 border-b border-gray-100 pb-0 overflow-hidden">
      {/* Left: text */}
      <div className="flex-1 py-8 md:pr-12 flex flex-col justify-center">
        <span className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-2 block">
          About Author
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-1 capitalize leading-tight">
          {author.name}
        </h1>
        {author.role && (
          <span className="text-[#2196f3] text-sm font-semibold mb-4 block">{author.role}</span>
        )}

        {/* Stats */}
        <div className="flex gap-6 mb-5">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{articleCount}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{author.stats?.followers || "—"}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{author.stats?.following || "—"}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Following</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed font-serif mb-6 max-w-lg">
          {author.bio}
        </p>

        {/* Social */}
        <div className="flex items-center gap-5 text-gray-700">
          {Object.entries(author.social || {}).map(([key, href]) => {
            const entry = socialIcons[key];
            if (!entry) return null;
            const Icon = entry.icon;
            return (
              <a key={key} href={href} className={`transition-colors ${entry.color}`}>
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Right: image */}
      <div className="relative w-full md:w-[340px] lg:w-[420px] h-[260px] md:h-auto flex-shrink-0">
        <Image src={author.coverImage || author.avatar} alt={author.name} fill
          className="object-cover" priority />
        {/* Blue accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2196f3]" />
      </div>
    </div>
  );
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { author } = await params;
  const slug = author.toLowerCase().replace(/-/g, "");
  const data = authorsData[slug];
  const displayName = data?.name || (author.charAt(0).toUpperCase() + author.slice(1).replace(/-/g, " "));
  return {
    title: `${displayName} — Author | Daily News`,
    description: `Read the latest articles by ${displayName} on Daily News.`,
    openGraph: { type: "profile", title: `${displayName} — Author`, siteName: "Daily News" },
  };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function AuthorPage({ params }) {
  const { author } = await params;
  const slug = author.toLowerCase().replace(/-/g, "");
  const authorData = authorsData[slug] || {
    name: author.charAt(0).toUpperCase() + author.slice(1).replace(/-/g, " "),
    slug: author,
    avatar: "/Davenport4-6.jpg",
    coverImage: "/Davenport4-2-1024x683.jpg",
    role: "Contributor",
    bio: `${author} is a contributor at Daily News covering a range of topics.`,
    social: {},
    stats: { posts: 0, followers: "—", following: "—" },
  };

  const authorNameForFilter = authorData.name;
  const articles = getArticlesByAuthor(authorNameForFilter);
  const { trendingNews, categories } = homepageData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: authorData.name,
      description: authorData.bio,
      url: `https://www.corruptionfiles.com/authors/${author}`,
    },
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-20">
        {/* Author Header */}
        <AuthorHeader author={authorData} articleCount={articles.length} />

        {/* Articles heading */}
        <div className="border-b-2 border-black mb-8 pb-1">
          <h2 className="text-[24px] font-bold text-black leading-tight">
            Articles by {authorData.name}
          </h2>
          <p className="text-gray-400 text-[13px] font-medium uppercase tracking-tight">
            {articles.length} published {articles.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {/* News + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: articles */}
          <div className="flex-1 min-w-0">
            {articles.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3">✍️</p>
                <p className="text-gray-500 text-sm">No articles found for this author.</p>
              </div>
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

          {/* Right: sidebar */}
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
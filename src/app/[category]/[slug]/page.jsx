import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Share2, Bell, Calendar, MessageCircle, Eye, Heart } from "lucide-react";
import articlesData from "@/data/articles.json";
import homepageData from "@/data/homepage.json";
import authorsData from "@/data/authors.json";
import StickyAd from "@/components/StickyAd";

import NewsletterSidebar from "@/components/NewsletterSidebar";

// ─── LATEST ARTICLES (same as category page) ─────────────────────────────────

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
  [homepageData.discoveryMain, homepageData.worldNews?.main, homepageData.inOtherNews?.featured]
    .forEach((a) => { if (a?.slug && a?.title && a?.date && a?.image) all.push(a); });
  const seen = new Set();
  const unique = all.filter((a) => { if (seen.has(a.slug)) return false; seen.add(a.slug); return true; });
  unique.sort((a, b) => new Date(b.date) - new Date(a.date));
  return unique.slice(0, count);
}

const LATEST_ARTICLES = collectLatestArticles(4);
// ─── HELPERS ─────────────────────────────────────────────────────────────────

function findArticle(category, slug) {
  const categoryArticles = articlesData[category] || [];
  return categoryArticles.find((a) => a.slug === slug) || null;
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = findArticle(category, slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      images: [{ url: article.heroImage }],
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
          <p key={idx} className="text-[16px] leading-relaxed text-gray-700 mb-6 clear-both">
            {para}
          </p>
        ))}

      {body.sections &&
        body.sections.map((section, idx) => {
          switch (section.type) {
            case "heading":
              return (
                <div key={idx} className="mb-6 clear-both">
                  <h2 className="text-[22px] font-bold text-gray-900 mb-4 border-l-4 border-[#2196f3] pl-4">
                    {section.title}
                  </h2>
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx} className="text-[16px] leading-relaxed text-gray-700 mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              );

            case "blockquote":
              return (
                <blockquote
                  key={idx}
                  className="my-8 mx-4 pl-6 border-l-4 border-gray-300 italic text-gray-600 text-[15px] leading-relaxed clear-both"
                >
                  {section.text}
                </blockquote>
              );


            case "paragraph":
              return (
                <div key={idx} className="mb-6 clear-both">
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx} className="text-[16px] leading-relaxed text-gray-700 mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              );

            case "image":
              return (
                <div key={idx} className="my-8 clear-both">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={section.src}
                      alt={section.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover"
                    />
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

// ─── SIDEBAR (matches category page) ─────────────────────────────────────────

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
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <span className="text-white font-bold text-base">{cat.label}</span>
      </div>
    </Link>
  );
}

function ArticleSidebar() {
  const { categories } = homepageData;

  return (
    <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
      <StickyAd />

      {/* Latest Today */}
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

      {/* Categories */}
      <div>
        <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <SidebarCategoryCard key={cat.label} cat={cat} />
          ))}
        </div>
      </div>
        {/* Newsletter — compact sidebar version */}
        <NewsletterSidebar />
        
    </aside>
  );
}
      {/* Latest Posts 
      <div>
        <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">
          Latest Posts
        </h3>
        <div className="space-y-6">
          {sidebar.latestPosts.map((post) => (
            <Link key={post.id} href={`/${post.category}/${post.slug}`} className="flex gap-3 group">
              <div className="relative w-[80px] h-[60px] flex-shrink-0 overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="80px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute bottom-0 left-0 ${post.categoryColor} text-white text-[8px] font-bold px-1 py-0.5 uppercase`}>
                  {post.category}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                {post.isSponsored ? (
                  <p className="text-gray-400 text-[10px] flex items-center gap-0.5 mb-1"><Bell size={9} /> Sponsored</p>
                ) : (
                  <p className="text-gray-400 text-[10px] flex items-center gap-0.5 mb-1"><Calendar size={9} /> {post.date}</p>
                )}
                <h4 className="text-xs font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                  <span className="flex items-center gap-0.5"><MessageCircle size={9} /> {post.comments}</span>
                  <span className="flex items-center gap-0.5"><Eye size={9} /> {post.views}</span>
                  <span className="flex items-center gap-0.5"><Heart size={9} /> {post.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>*/}

// ─── LEAVE A REPLY FORM ───────────────────────────────────────────────────────

function LeaveReply() {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a Reply</h3>
      <p className="text-xs text-gray-400 mb-4">
        Your email address will not be published. Required fields are marked *
      </p>
      <div className="space-y-4">
        <textarea
          rows={5}
          placeholder="Your comment..."
          className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#2196f3] resize-none"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Name *</label>
            <input type="text" className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-[#2196f3]" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Email *</label>
            <input type="email" className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-[#2196f3]" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Website</label>
            <input type="url" className="w-full border border-gray-200 p-2 text-sm focus:outline-none focus:border-[#2196f3]" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-600">
          <input type="checkbox" className="w-3 h-3" />
          Save my name, email, and website in this browser for the next time I comment.
        </label>
        <button className="bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-6 py-3 uppercase tracking-widest transition-colors">
          Post Comment
        </button>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = findArticle(category, slug);

  if (!article) notFound();

  const { author, stats, tags, body, sidebar, navigation, relatedPosts, readMoreLinks } = article;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.heading,
    image: [article.heroImage],
    datePublished: article.date,
    author: { "@type": "Person", name: author.name },
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">


          {/* ── CENTER: ARTICLE ── */}
          <div className="flex-1 min-w-0">

            {/* Hero */}
            <div className="relative w-full aspect-[16/9] overflow-hidden mb-2">
              <Image src={article.heroImage} alt={article.alt} fill priority
                sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                <span className={`${article.categoryColor} text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider`}>
                  {article.categoryLabel}
                </span>
              </div>
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1 text-white text-xs">
                <Calendar size={12} /> {article.date}
              </div>
            </div>

            {/* Title & meta */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-tight mb-3">
                {article.heading}
              </h1>
              <p className="text-sm text-gray-500">
                By <span className="font-semibold text-gray-700">{author.name}</span>
              </p>
            </div>

            {/* Stats bar top */}
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-3 mb-8">
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                <Share2 size={13} /> Share
              </button>
            </div>

            {/* Article body */}
            <ArticleBody body={body} />


            {/* Ad */}
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

            {/* About Author */}
            <div className="border border-gray-100 p-6 mb-10 flex flex-col sm:flex-row gap-6">
              <div className="relative w-[100px] h-[100px] flex-shrink-0">
                <Image src={author.avatar} alt={author.name} fill sizes="100px" className="object-cover rounded" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">About Author</span>
                  <h3 className="text-lg font-bold text-gray-900">{author.name}</h3>
                  <Link href={`/author/${author.name.toLowerCase()}`}
                    className="bg-[#2196f3] text-white text-[10px] font-bold px-3 py-0.5 uppercase hover:bg-blue-600 transition-colors">
                    Articles
                  </Link>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{author.bio}</p>
                <div className="flex gap-2">
                  {Object.keys(author.social).map((s) => (
                    <a key={s} href={author.social[s]}
                      className="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#2196f3] hover:text-[#2196f3] transition-colors text-[10px] font-bold uppercase">
                      {s[0].toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mb-10">
                <h3 className="font-bold text-lg text-gray-900 mb-6 pb-2 border-b-2 border-black">Related posts</h3>
                <div className="space-y-6">
                  {relatedPosts.map((post) => (
                    <article key={post.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6 last:border-0">
                      <div className="relative w-full sm:w-[200px] h-[140px] flex-shrink-0 overflow-hidden group">
                        <Link href={`/${post.category}/${post.slug}`}>
                          <Image src={post.image} alt={post.title} fill sizes="200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute bottom-2 left-2 flex gap-1">
                            <span className={`${post.categoryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase`}>{post.category}</span>
                            {post.secondaryCategory && (
                              <span className={`${post.secondaryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase`}>{post.secondaryCategory}</span>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="flex-1">
                        {post.isSponsored ? (
                          <p className="text-gray-400 text-xs flex items-center gap-1 mb-2"><Bell size={10} /> Sponsored content</p>
                        ) : (
                          <p className="text-gray-400 text-xs flex items-center gap-1 mb-2"><Calendar size={10} /> {post.date}</p>
                        )}
                        <h4 className="font-bold text-[16px] text-gray-900 leading-snug mb-1">
                          <Link href={`/${post.category}/${post.slug}`} className="hover:text-blue-600 transition-colors">{post.title}</Link>
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">By <span className="font-semibold text-gray-700">{post.author}</span></p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4">
                          <Link href={`/${post.category}/${post.slug}`}
                            className="bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2 transition-colors">
                            READ MORE
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}


           

          </div>

{/* ── RIGHT: SIDEBAR ── */}
<ArticleSidebar />
        </div>
      </div>
    </main>
  );
}
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Share2, Bell, Instagram } from "lucide-react";
import articlesData from "@/data/articles.json";
import homepageData from "@/data/homepage.json";
import StickyAd from "@/components/StickyAd";
import NewsletterSidebar from "@/components/NewsletterSidebar";
import authorsData from "@/data/authors.json";

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
      return (
        <img 
          src="/substack.webp" 
          alt="Substack" 
          className={imgClass} 
        />
      );
    
    case "medium":
      return (
        <img 
          src="/medium.webp" 
          alt="Medium" 
          className={imgClass} 
        />
      );

    default:
      return null;
  }
};

// ─── LATEST ARTICLES ─────────────────────────────────────────────────────────

function collectLatestArticles(count = 4) {
  const all = [];
  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => { if (a?.slug && a?.title && a?.image) all.push(a); });
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
    .forEach((a) => { if (a?.slug && a?.title && a?.image) all.push(a); });
  
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

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function findArticle(category, slug) {
  const data = articlesData.articles || articlesData; 
  if (!Array.isArray(data)) return null;
  return data.find((a) => a.slug === slug && a.category === category) || null;
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
                <blockquote key={idx} className="my-6 mx-4 pl-6 border-l-4 border-gray-300 italic text-gray-600 text-[15px] leading-relaxed clear-both">
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
                <div key={idx} className="my-6 clear-both">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image src={section.src} alt={section.alt} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
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

// ─── SIDEBAR COMPONENTS ──────────────────────────────────────────────────────

function LatestCard({ item }) {
  return (
    <Link href={`/${item.category}/${item.slug}`} className="flex flex-col group">
      <div className="relative w-full h-[110px] overflow-hidden">
        <Image src={item.image} alt={item.title} fill sizes="150px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {item.badge && (
          <span className="absolute top-2 right-2 bg-[#f69a4d] text-white text-xs font-bold px-1.5 py-0.5 z-10">
            {item.badge}
          </span>
        )}
      </div>
      {(item.isSponsored || item.sponsored) && (
        <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-1"><Bell size={10} /> Sponsored content</p>
      )}
      <p className="text-sm font-semibold text-gray-900 leading-snug mt-1 group-hover:text-blue-600 transition-colors line-clamp-3">
        {item.title}
      </p>
    </Link>
  );
}

function SidebarCategoryCard({ cat }) {
  return (
    <Link href={`/${cat.category}`} className="relative overflow-hidden h-[56px] cursor-pointer group block">
      <Image src={cat.image} alt={cat.label} fill sizes="300px" className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <span className="text-white font-bold text-base">{cat.label}</span>
      </div>
    </Link>
  );
}

function ArticleSidebar() {
  return (
    <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
      <StickyAd />
      {/* CHANGED: mt-14 → mt-6 lg:mt-14 — removes large dead space below ad on mobile */}
      <div className="mb-6 mt-6 lg:mt-14">
        <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">Latest Today</h3>
        <div className="grid grid-cols-2 gap-4">
          {LATEST_ARTICLES.map((item) => (
            <LatestCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-base text-gray-900 text-center pb-2 mb-4 border-b-2 border-gray-800">Categories</h3>
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

  const detailedAuthor = authorsData.corruptionfiles.find(
    (a) => a.slug === article.author.slug
  ) || article.author;

  const { body, relatedPosts } = article;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.heading,
    image: [article.heroImage],
    datePublished: article.date,
    author: { "@type": "Person", name: detailedAuthor.name },
  };

  return (
    <main className="bg-white min-h-screen">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} 
      />

      {/* CHANGED: pb-20 → pb-10 md:pb-20, pt-6 → pt-4 md:pt-6 */}
      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-6 pb-10 md:pb-20">
        {/* CHANGED: gap-10 → gap-6 lg:gap-10 — on mobile stacked layout this becomes vertical space */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          <div className="flex-1 min-w-0">
            {/* Hero Section */}
            <div className="relative w-full aspect-[16/9] overflow-hidden mb-2">
              <Image src={article.heroImage} alt={article.alt} fill priority sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20">
                <span className={`${article.categoryColor} text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider`}>
                  {article.categoryLabel}
                </span>
              </div>
            </div>

            {/* Title & Meta */}
            {/* CHANGED: mb-6 → mb-4 md:mb-6 */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl md:text-[32px] font-bold text-gray-900 leading-tight mb-3">{article.heading}</h1>
              <p className="text-sm text-gray-500">
                By <Link href={`/authors/${detailedAuthor.slug}`} className="font-semibold text-gray-700 hover:text-[#2196f3] transition-colors">{detailedAuthor.name}</Link>
              </p>
            </div>

            {/* Actions */}
            {/* CHANGED: mb-8 → mb-5 md:mb-8 */}
            <div className="flex items-center justify-between border-t border-b border-gray-200 py-3 mb-5 md:mb-8">
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                <Share2 size={13} /> Share
              </button>
            </div>

            <ArticleBody body={body} />

            {/* Mirror Standard Ad */}
            <a href="https://www.mirrorstandard.com/" target="_blank" rel="noopener noreferrer" className="mt-2 mb-5 md:mb-6 block w-full">
              <div className="w-full overflow-hidden flex items-center justify-center border border-gray-100">
                <img src="/mirror-standard-ad-horizontal.webp" alt="Visit Mirror Standard" className="w-full h-auto object-contain" />
              </div>
            </a>

            {/* About Author Section */}
            {/* CHANGED: mb-10 → mb-6 md:mb-10 */}
            <div className="border border-gray-100 p-6 mb-6 md:mb-10 flex flex-col sm:flex-row gap-6">
              <div className="relative w-[100px] h-[100px] flex-shrink-0">
                <Image 
                  src={detailedAuthor.avatar} 
                  alt={detailedAuthor.name} 
                  fill 
                  sizes="100px" 
                  className="object-cover rounded" 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">About Author</span>
                  <Link href={`/authors/${detailedAuthor.slug}`} className="text-lg font-bold text-gray-900 hover:text-[#2196f3] transition-colors">
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

                    return (
                      <a 
                        key={platformKey} 
                        href={detailedAuthor.social[platformKey]} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group text-gray-800 transition-colors duration-200 ${hoverColors[platformKey.toLowerCase()] || ''}`}
                      >
                        <SocialIcon platform={platformKey} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {/* CHANGED: mb-10 → mb-6 md:mb-10 */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mb-6 md:mb-10">
                <h3 className="font-bold text-lg text-gray-900 mb-4 md:mb-6 pb-2 border-b-2 border-black">Related posts</h3>
                <div className="space-y-5 md:space-y-6">
                  {relatedPosts.map((post) => (
                    <article key={post.slug} className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-5 md:pb-6 last:border-0">
                      <div className="w-full sm:w-[200px] h-[140px] flex-shrink-0 overflow-hidden group">
                        <Link href={`/${post.category}/${post.slug}`} className="relative block w-full h-full">
                          <Image 
                            src={post.image} 
                            alt={post.title} 
                            fill 
                            sizes="200px" 
                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute bottom-2 left-2 flex gap-1 z-10">
                            <span className={`${post.categoryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase`}>{post.category}</span>
                            {post.secondaryCategory && (
                              <span className={`${post.secondaryColor} text-white text-[9px] font-bold px-2 py-0.5 uppercase`}>{post.secondaryCategory}</span>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="flex-1">
                        {post.isSponsored && (
                          <p className="text-gray-400 text-xs flex items-center gap-1 mb-2"><Bell size={10} /> Sponsored content</p>
                        )}
                        <h4 className="font-bold text-[16px] text-gray-900 leading-snug mb-1">
                          <Link href={`/${post.category}/${post.slug}`} className="hover:text-blue-600 transition-colors">{post.title}</Link>
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">By <Link href={`/authors/${post.author.toLowerCase().replace(/\s+/g, '-')}`} className="font-semibold text-gray-700 hover:text-[#2196f3] transition-colors">{post.author}</Link></p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                        <Link href={`/${post.category}/${post.slug}`} className="inline-block bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2 transition-colors">
                          READ MORE
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ArticleSidebar />
        </div>
      </div>
    </main>
  );
}
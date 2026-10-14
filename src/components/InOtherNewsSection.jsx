import React from "react";
import Link from "next/link";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";

const InOtherNewsSection = ({ featured, grid }) => {
  return (
    <>
      <div className="border-b-2 border-black mb-8">
        <h2 className="text-[28px] font-bold text-black mb-0 leading-tight">In other News</h2>
        <p className="text-gray-400 text-[14px] font-medium mb-4 uppercase tracking-tight">
          Something special from all over the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {/* Featured large card — image fully visible, text below */}
        <Link
          href={`/${featured.category || "business"}/${featured.slug}`}
          className="group flex flex-col overflow-hidden border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-1 flex-col items-center px-5 py-6 text-center sm:px-8 sm:py-8">
            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {featured.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className={`${cat.color} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white`}
                >
                  {cat.label}
                </span>
              ))}
            </div>
            {featured.isSponsored && (
              <div className="mb-2 text-[12px] font-medium text-gray-500">
                🔔 Sponsored content
              </div>
            )}
            <h3 className="mb-3 max-w-lg text-balance text-xl font-bold leading-snug text-gray-950 transition-colors group-hover:text-[#1565c0] sm:text-2xl">
              {featured.title}
            </h3>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              By {featured.author}
            </p>
            {featured.quote && (
              <p className="max-w-md border-t border-gray-200 pt-4 text-[15px] italic leading-relaxed text-gray-600 sm:text-base">
                &ldquo;{featured.quote}&rdquo;
              </p>
            )}
          </div>
        </Link>

        {/* Grid of 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {grid.map((news) => (
            <NewsCard
              key={news.id}
              slug={news.slug}
              category={news.category}
              image={news.image}
              categoryLabel={news.categoryLabel}
              categoryColor={news.categoryColor}
              date={news.date}
              author={news.author}
              title={news.title}
              description={news.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InOtherNewsSection;

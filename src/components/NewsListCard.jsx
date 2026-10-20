import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Share2, Bell, Calendar } from "lucide-react";
import PlayIcon from "@/components/PlayIcon";

const NewsListCard = ({ card }) => {
  return (
    <article className="flex flex-col sm:flex-row gap-0 border-b border-gray-200 pb-3 mb-6 last:border-0 last:mb-0">
      <div className="relative w-full sm:w-[220px] md:w-[240px] flex-shrink-0 h-[180px] sm:h-[160px] overflow-hidden group">
        <Link href={`/${card.category}/${card.slug}`}>
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {card.hasVideo && <PlayIcon />}
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap z-10">
            {card.tags.map((t) => (
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
        {card.sponsored ? (
          <p className="text-gray-500 text-xs flex items-center gap-1 mb-1">
            <Bell size={11} /> Sponsored content
          </p>
        ) : card.date ? (
          <p className="text-gray-500 text-xs flex items-center gap-1 mb-1">
            <Calendar size={11} /> {card.date}
          </p>
        ) : null}

        <h2 className="font-bold text-gray-900 text-base md:text-[17px] leading-snug mb-2">
          <Link
            href={`/${card.category}/${card.slug}`}
            className="hover:text-blue-600 cursor-pointer transition-colors"
          >
            {card.title}
          </Link>
        </h2>

        <p className="text-xs text-gray-500 mb-2">
          By <span className="font-semibold text-gray-700">{card.author}</span>
        </p>

        <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
          {card.excerpt}
        </p>

        <hr className="border-gray-200 mb-3" />

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/${card.category}/${card.slug}`}
            className="bg-[#2196f3] hover:bg-blue-600 text-white text-xs font-bold px-5 py-2 transition-colors inline-block text-center"
          >
            READ MORE
          </Link>
          <span className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-blue-500 transition-colors">
            <Share2 size={14} /> Share
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsListCard;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

const DiscoveryMainCard = ({ item }) => {
  return (
    <article className="flex flex-col h-full group border-b lg:border-b-0 lg:border-r border-gray-200 lg:pr-5 pb-5 lg:pb-0">
      <div className="relative w-full aspect-[3/2] overflow-hidden mb-1">
        <Link href={`/${item.category}/${item.slug}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute bottom-4 left-4 ${item.categoryColor} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}
          >
            {item.categoryLabel}
          </span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-[11px] text-gray-500 mb-2 flex items-center gap-1">
          <Calendar size={12} /> <time>{item.date}</time>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/${item.category}/${item.slug}`}>{item.title}</Link>
        </h3>

        <div className="text-[11px] font-bold text-gray-500 uppercase mb-3 tracking-wide">
          By <span className="text-gray-600 font-bold">{item.author}</span>
        </div>

        <p className="text-[15px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {item.excerpt}
        </p>
      </div>
    </article>
  );
};

export default DiscoveryMainCard;

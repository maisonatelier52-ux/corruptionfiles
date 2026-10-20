import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Calendar } from "lucide-react";

const TrendingCard = ({ item }) => {
  return (
    <Link href={`/${item.category}/${item.slug}`} className="flex flex-col group">
      <div className="relative w-full h-[110px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute top-2 right-2 bg-[#f69a4d] text-white text-xs font-bold px-1.5 py-0.5 z-10">
            {item.badge}
          </span>
        )}
      </div>

      {item.sponsored ? (
        <p className="text-gray-500 text-[10px] flex items-center gap-1 mt-1">
          <Bell size={10} /> Sponsored content
        </p>
      ) : (
        <p className="text-gray-500 text-[10px] flex items-center gap-1 mt-1">
          <Calendar size={10} /> {item.date}
        </p>
      )}

      <p className="text-sm font-semibold text-gray-900 leading-snug mt-1 group-hover:text-blue-600 transition-colors">
        {item.title}
      </p>
    </Link>
  );
};

export default TrendingCard;

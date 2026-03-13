import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({ cat }) => {
  return (
    <Link
      href={`/${cat.category}`}  // ✅ cat.category not cat.label.toLowerCase()
      className="relative overflow-hidden h-[56px] cursor-pointer group block"
    >
      <Image
        src={cat.image}
        alt={cat.label}
        fill
        sizes="300px"
        className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <span className="text-white font-bold text-base">{cat.label}</span>
        <span className={`${cat.countColor} text-white text-sm font-bold w-7 h-7 flex items-center justify-center`}>
          {cat.count}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
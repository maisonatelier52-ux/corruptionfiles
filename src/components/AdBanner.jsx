import React from "react";
import Image from "next/image";

const AdBanner = () => {
  return (
    <aside className="w-full max-w-6xl mx-auto px-4 mb-8" aria-label="Advertisement">
      <a
        href="https://www.corruptionfiles.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-auto bg-[#4B2588] overflow-hidden border border-gray-100 rounded-sm shadow-sm transition-opacity hover:opacity-90"
      >
        <Image
          src="/corruptionfiles-quote-hor.webp"
          alt="Corruptionfiles: Real stories, real impact. Click to visit corruptionfiles.com"
          width={1200}
          height={198}
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="w-full h-auto block object-contain"
        />
      </a>
    </aside>
  );
};

export default AdBanner;

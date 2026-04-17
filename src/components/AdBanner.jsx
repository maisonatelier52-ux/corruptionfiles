import React from 'react';

const AdBanner = () => {
  return (
    /* 1. We keep the container width constraints */
    <aside className="w-full max-w-6xl mx-auto px-4 mb-8" aria-label="Advertisement">
      
      <a 
        href="https://www.mirrorstandard.com" 
        target="_blank" 
        rel="noopener noreferrer"
        /* FIX: Removed 'h-[80px]' and 'md:h-[120px]'. 
           'h-auto' allows the link to grow as tall as the image actually is.
        */
        className="block w-full h-auto bg-[#4B2588] overflow-hidden border border-gray-100 rounded-sm shadow-sm transition-opacity hover:opacity-90"
      >
        <img 
          src="/mirror-standard-ad-horizontal.webp" 
          alt="Mirrorstandard: Real stories, real impact. Click to visit mirrorstandard.com"
          /* FIX: Changed 'object-cover' (which crops) to 'object-contain' (which shows everything).
             'w-full h-auto' ensures it scales down perfectly on mobile like a photo.
          */
          className="w-full h-auto block object-contain"
          loading="lazy" 
        />
      </a>
    </aside>
  );
};

export default AdBanner;
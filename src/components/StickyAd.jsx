"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link"; 

export default function StickyAd() {
  const containerRef = useRef(null);
  const [trackHeight, setTrackHeight] = useState('auto');

  useEffect(() => {
    const updateTrackHeight = () => {
      const sentinel = document.getElementById("ad-sentinel");
      const container = containerRef.current;
      
      if (sentinel && container) {
        const sentinelTop = sentinel.getBoundingClientRect().top + window.scrollY;
        const containerTop = container.getBoundingClientRect().top + window.scrollY;
        
        // Ensure track is at least as tall as the ad itself + some buffer
        const calculatedHeight = Math.max(sentinelTop - containerTop, 600); 
        setTrackHeight(`${calculatedHeight}px`);
      }
    };

    updateTrackHeight();
    window.addEventListener('resize', updateTrackHeight);
    const timer = setTimeout(updateTrackHeight, 1000);

    return () => {
      window.removeEventListener('resize', updateTrackHeight);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: trackHeight }} className="relative mb-10">
      
      <aside className="sticky top-4 z-20 bg-white" aria-label="Subscription Offer">
        
        {/* 1. ADDED 'min-h-[600px]': This forces the box to be at least 600px tall.
           2. ADDED 'justify-center': Centers the content vertically if the box is tall.
        */}
        <div className="bg-indigo-100 px-6 py-8 min-h-[600px] flex flex-col justify-center items-center text-center mb-6">
          <h3 className="font-serif text-4xl font-black text-gray-900 tracking-tight mb-2">
            corruptionfiles
          </h3>
          <p className="text-sm text-gray-600 mb-8 font-medium">Follow the News</p>
          <div className="w-full h-px bg-gray-300 mb-8" role="separator" />
          <p className="text-base text-gray-700 font-semibold mb-1">Blog and Magazine</p>
          <p className="text-base text-gray-700 font-semibold mb-10">WordPress Theme</p>
          <p className="text-sm text-gray-500 mb-10 leading-relaxed">
            Readers in Europe<br />Subscribe for $1 a week
          </p>
          <Link 
            href="/subscribe" 
            className="bg-[#2196f3] hover:bg-blue-600 text-white text-sm font-bold px-8 py-3 rounded-full w-full transition-colors inline-block"
          >
            BUY NOW
          </Link>
        </div>
      </aside>
      
    </div>
  );
}
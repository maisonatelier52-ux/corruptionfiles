"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link"; 
import Image from "next/image";

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
        
        // Match the track height to the content length
        const calculatedHeight = Math.max(sentinelTop - containerTop, 700); 
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
      <aside className="sticky top-4 z-20" aria-label="Mirror Standard Advertisement">
        <Link 
          href="https://www.mirrorstandard.com/"
          className="block group transition-all duration-300 hover:brightness-110"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Optimized Container: 
            1. Using aspect-[9/16] to match the vertical mobile-ad standard of the image.
            2. overflow-hidden and rounded-xl to keep the red background clean.
          */}
          <div className="relative w-full aspect-[9/16] max-w-[400px] mx-auto overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <Image
              src="/mirror-standard-ad-vertical.webp" 
              alt="Mirror Standard - Your Hive for Sharp News & Vision"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>
        </Link>
      </aside>
    </div>
  );
}
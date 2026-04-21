"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import homepageData from "@/data/homepage.json";

// Footer Shared Icon Helper
const FooterSocialIcon = ({ platform }) => {
  const iconProps = { size: 16, strokeWidth: 2 };
  const p = platform.toLowerCase();
  // Using slightly lower opacity for the footer to keep focus on links
  const imgClass = "w-[16px] h-[16px] object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200";

  switch (p) {
    case "instagram": return <Instagram {...iconProps} />;
    case "x": return (
      <svg viewBox="0 0 24 24" width={16} height={16} stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    );
    case "substack": return <img src="/substack.webp" alt="Substack" className={imgClass} />;
    case "medium": return <img src="/medium.webp" alt="Medium" className={imgClass} />;
    default: return null;
  }
};

// ─── COMPUTED ONCE AT MODULE LEVEL ───────────────────────────────────────────

function getLatestArticle() {
  const all = [];

  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => { if (a?.slug && a?.title && a?.date && a?.image) all.push(a); });
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

  [
    homepageData.discoveryMain,
    homepageData.worldNews?.main,
    homepageData.inOtherNews?.featured,
  ].forEach((a) => { if (a?.slug && a?.title && a?.date && a?.image) all.push(a); });

  // Deduplicate
  const seen = new Set();
  const unique = all.filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });

  // Sort newest → oldest, return top 1
  unique.sort((a, b) => new Date(b.date) - new Date(a.date));
  return unique[0] ?? null;
}

const LATEST_ARTICLE = getLatestArticle();

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <footer className="w-full bg-white font-sans text-[#222] pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* MAIN FOOTER CONTENT (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-16">

          {/* COLUMN 1: Categories */}
          <nav aria-labelledby="footer-news-heading">
            <h3 id="footer-news-heading" className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">
              Categories
            </h3>
            <ul className="flex flex-col gap-3 text-[13px] font-medium text-gray-600">
              <li><Link href="/govt"          className="hover:text-blue-500 transition-colors">Government</Link></li>
              <li><Link href="/puerto-rico"   className="hover:text-blue-500 transition-colors">Puerto Rico</Link></li>
              <li><Link href="/pa"            className="hover:text-blue-500 transition-colors">P.A.</Link></li>
              <li><Link href="/tech"          className="hover:text-blue-500 transition-colors">Tech</Link></li>
              <li><Link href="/medical-fraud" className="hover:text-blue-500 transition-colors">Medical Fraud</Link></li>
              <li><Link href="/eco"           className="hover:text-blue-500 transition-colors">Eco</Link></li>
              <li><Link href="/intelligence"  className="hover:text-blue-500 transition-colors">Intelligence</Link></li>
              <li><Link href="/offshore"      className="hover:text-blue-500 transition-colors">Offshore</Link></li>
            </ul>
          </nav>

          {/* COLUMN 2: Useful Links */}
          <nav aria-labelledby="footer-links-heading">
            <h3 id="footer-links-heading" className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">
              Links
            </h3>
            <ul className="flex flex-col gap-3 text-[13px] font-medium text-gray-600">
              <li><Link href="/about"          className="hover:text-blue-500 transition-colors">About us</Link></li>
              <li><Link href="/terms"          className="hover:text-blue-500 transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </nav>

          {/* COLUMN 3: Authors */}
          <nav aria-labelledby="footer-authors-heading">
            <h3 id="footer-authors-heading" className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">
              Authors
            </h3>
            <ul className="flex flex-col gap-3 text-[13px] font-medium text-gray-600">
              <li><Link href="/authors/margaret-holloway"  className="hover:text-blue-500 transition-colors">Margaret Holloway</Link></li>
              <li><Link href="/authors/carlos-medina-reyes" className="hover:text-blue-500 transition-colors">Carlos Medina Reyes</Link></li>
              <li><Link href="/authors/darnell-hutchins"   className="hover:text-blue-500 transition-colors">Darnell Hutchins</Link></li>
              <li><Link href="/authors/simone-varlette"    className="hover:text-blue-500 transition-colors">Simone Varlette</Link></li>
              <li><Link href="/authors/ruth-anselmi"       className="hover:text-blue-500 transition-colors">Ruth Anselmi</Link></li>
              <li><Link href="/authors/thomas-aldgate"     className="hover:text-blue-500 transition-colors">Thomas Aldgate</Link></li>
              <li><Link href="/authors/naomi-vosburgh"     className="hover:text-blue-500 transition-colors">Naomi Vosburgh</Link></li>
              <li><Link href="/authors/felix-draper"       className="hover:text-blue-500 transition-colors">Felix Draper</Link></li>
            </ul>
          </nav>

          {/* COLUMN 4: Latest */}
          <div>
            <h3 className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">
              Latest
            </h3>

            {LATEST_ARTICLE ? (
              <article className="group">
                {/* Image */}
                <div className="relative w-full mb-4 overflow-hidden bg-gray-100 h-40">
                  <Link href={`/${LATEST_ARTICLE.category}/${LATEST_ARTICLE.slug}`}>
                    <Image
                      src={LATEST_ARTICLE.image}
                      alt={LATEST_ARTICLE.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Date */}
                <span className="text-[11px] text-gray-400 block mb-2">
                  <time dateTime={new Date(LATEST_ARTICLE.date).toISOString().split('T')[0]}>
                    📅 {LATEST_ARTICLE.date}
                  </time>
                </span>

                {/* Title */}
                <h4 className="font-bold text-[15px] leading-snug mb-2">
                  <Link
                    href={`/${LATEST_ARTICLE.category}/${LATEST_ARTICLE.slug}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {LATEST_ARTICLE.title}
                  </Link>
                </h4>

                {/* Author */}
                <span className="text-[11px] text-gray-400">
                  By{" "}
                  <Link
                    href={`/authors/${LATEST_ARTICLE.author.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-semibold text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    {LATEST_ARTICLE.author}
                  </Link>
                </span>
              </article>
            ) : null}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-[13px] text-gray-500 flex items-center">
            ©2026 - All rights reserved.
            <Link href="/" className="text-2xl ml-2 text-black hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--font-corruptionfiles)' }}>
              Corruption Files
            </Link>
          </div>

          {/* UPDATED FOOTER SOCIAL ICONS */}
          <nav aria-label="Social Media Links" className="flex gap-5">
            {[
              { id: 'x', href: 'https://x.com', hover: 'hover:text-black' },
              { id: 'instagram', href: 'https://instagram.com', hover: 'hover:text-pink-600' },
              { id: 'substack', href: '#', hover: '' },
              { id: 'medium', href: '#', hover: '' }
            ].map((site) => (
              <a 
                key={site.id} 
                href={site.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`group text-gray-700 transition-colors duration-200 ${site.hover}`}
              >
                <FooterSocialIcon platform={site.id} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
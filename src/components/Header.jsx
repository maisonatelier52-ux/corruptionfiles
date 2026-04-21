"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Instagram, ChevronLeft, ChevronRight, Menu, X, ChevronRight as ArrowRight
} from 'lucide-react';
import homepageData from "@/data/homepage.json";

// Shared Icon Helper
const SocialIcon = ({ platform }) => {
  const iconProps = { size: 18, strokeWidth: 2 };
  const p = platform.toLowerCase();
  const imgClass = "w-[18px] h-[18px] object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200";

  switch (p) {
    case "instagram": return <Instagram {...iconProps} />;
    case "x": return (
      <svg viewBox="0 0 24 24" width={18} height={18} stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    );
    case "substack": return <img src="/substack.webp" alt="Substack" className={imgClass} />;
    case "medium": return <img src="/medium.webp" alt="Medium" className={imgClass} />;
    default: return null;
  }
};

// ─── Article Collection Logic ──────────────────────────────────────────────
function collectLatestArticles(count = 4) {
  const all = [];
  const push = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((a) => { if (a?.slug && a?.title && a?.date) all.push(a); });
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

  [homepageData.discoveryMain, homepageData.worldNews?.main, homepageData.inOtherNews?.featured]
    .forEach((a) => { if (a?.slug && a?.title && a?.date) all.push(a); });

  const seen = new Set();
  const unique = all.filter((a) => {
    if (seen.has(a.slug)) return false;
    seen.add(a.slug);
    return true;
  });
  unique.sort((a, b) => new Date(b.date) - new Date(a.date));
  return unique.slice(0, count);
}

const LATEST_ARTICLES = collectLatestArticles(4);
const TICKER_INTERVAL_MS = 3000;

const NAV_LINKS = [
  { name: 'Government',    href: '/govt'           },
  { name: 'Puerto Rico',   href: '/puerto-rico'   },
  { name: 'P.A.',          href: '/pa'            },
  { name: 'Tech',          href: '/tech'          },
  { name: 'Medical Fraud', href: '/medical-fraud' },
  { name: 'Eco',           href: '/eco'           },
  { name: 'Intelligence',  href: '/intelligence'  },
  { name: 'Offshore',      href: '/offshore'      },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [dateInfo, setDateInfo]       = useState({ display: "", iso: "" });
  const [tickerIndex, setTickerIndex] = useState(0);
  const [visible, setVisible]         = useState(true);
  const intervalRef                   = useRef(null);

  const total = LATEST_ARTICLES.length;

  useEffect(() => {
    const now = new Date();
    setDateInfo({
      display: new Intl.DateTimeFormat('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      }).format(now).toUpperCase(),
      iso: now.toISOString().split('T')[0],
    });
  }, []);

  const goTo = useCallback((direction) => {
    if (total <= 1) return;
    setVisible(false);
    setTimeout(() => {
      setTickerIndex((prev) => direction === "next" ? (prev + 1) % total : (prev - 1 + total) % total);
      setVisible(true);
    }, 200);
  }, [total]);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    if (total <= 1) return;
    intervalRef.current = setInterval(() => goTo("next"), TICKER_INTERVAL_MS);
  }, [goTo, total]);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  const handleArrow = useCallback((dir) => {
    goTo(dir);
    startInterval();
  }, [goTo, startInterval]);

  const handleDot = useCallback((i) => {
    if (i === tickerIndex) return;
    setVisible(false);
    setTimeout(() => { setTickerIndex(i); setVisible(true); }, 200);
    startInterval();
  }, [tickerIndex, startInterval]);

  const toggleMenu = useCallback(() => setIsMenuOpen((o) => !o), []);

  const current = LATEST_ARTICLES[tickerIndex];

  return (
    <> {/* CRITICAL: Changed from <header> to a Fragment */}
      
      {/* 1. TOP BAR */}
      <div className="w-full bg-[#111827] text-white text-[11px] font-bold uppercase tracking-wider relative z-20">
        <div className="max-w-7xl mx-auto flex items-center h-10 px-4">
          <div className="bg-[#1f2937] h-full items-center px-4 mr-4 hidden lg:flex flex-shrink-0">
            <span className="flex items-center gap-2">
              📅 <time dateTime={dateInfo.iso}>{dateInfo.display || "LOADING..."}</time>
            </span>
          </div>
          <div className="bg-[#0f172a] h-full flex items-center px-6 mr-4 text-blue-400 flex-shrink-0">LATEST</div>
          <div className="flex-1 px-2 min-w-0 overflow-hidden">
            {current && (
              <Link
                href={`/${current.category}/${current.slug}`}
                className="block truncate text-[12px] font-medium normal-case hover:text-blue-400 transition-opacity duration-200"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {current.title}
              </Link>
            )}
          </div>
          <div className="flex border-l border-gray-700 h-full flex-shrink-0">
            <button onClick={() => handleArrow("prev")} className="px-3 hover:bg-blue-600 border-r border-gray-700 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => handleArrow("next")} className="px-3 hover:bg-blue-600 transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO AREA */}
      <div className="w-full bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex justify-between items-center">
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 border border-gray-200 text-black">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:block w-[160px]" />
          <Link href="/" className="text-4xl md:text-7xl font-normal text-black hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-corruptionfiles)' }}>
            Corruption Files
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-4 items-center">
              {[{ id: 'x', href: 'https://x.com' }, { id: 'instagram', href: 'https://instagram.com' }, { id: 'substack', href: '#' }, { id: 'medium', href: '#' }].map((site) => (
                <a key={site.id} href={site.href} target="_blank" rel="noopener noreferrer" className="group text-gray-700 transition-colors duration-200 hover:text-blue-600">
                  <SocialIcon platform={site.id} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION (STAYS STICKY) */}
      <nav 
        aria-label="Main Navigation" 
        className="sticky top-0 z-[100] w-full bg-white border-t border-black border-b border-gray-200 hidden md:block shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center items-center gap-12 py-4 font-bold uppercase text-[13px] tracking-[0.15em]">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-black hover:text-blue-500 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE MENU */}
      <div className={`fixed top-0 left-0 w-full z-[110] md:hidden bg-white transition-all duration-300 overflow-hidden ${isMenuOpen ? "h-screen shadow-lg" : "h-0"}`}>
        <div className="p-4 flex justify-end">
             <button onClick={toggleMenu} className="p-2"><X size={24} /></button>
        </div>
        <nav aria-label="Mobile Navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-50 text-black">
                  <span className="font-bold text-[14px] uppercase tracking-wider">{link.name}</span>
                  <ArrowRight size={16} className="text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
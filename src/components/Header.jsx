"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { 
  Facebook, Instagram, Twitter, ChevronLeft, ChevronRight, 
  Search, Mail, Youtube, Menu, X, ChevronRight as ArrowRight 
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dateInfo, setDateInfo] = useState({ display: "", iso: "" });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const now = new Date();
    
    const displayFormatter = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const isoDate = now.toISOString().split('T')[0];
    
    setDateInfo({
      display: displayFormatter.format(now).toUpperCase(),
      iso: isoDate
    });
  }, []);

  const navLinks = [
    { name: 'Government', href: '/govt' },
    { name: 'Puerto Rico', href: '/puerto-rico' },
    { name: 'P.A.', href: '/pa' },
    { name: 'Tech', href: '/tech' },
    { name: 'Medical Fraud', href: '/medical-fraud' },
    { name: 'Eco', href: '/eco' },
    { name: 'Intelligence', href: '/intelligence' },
    { name: 'Offshore', href: '/offshore' },
  ];

  return (
    <header className="w-full">
      {/* 1. TOP BAR */}
      <div className="w-full bg-[#111827] text-white text-[11px] font-bold uppercase tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center h-10 px-4">
          <div className="bg-[#1f2937] h-full items-center px-4 mr-4 hidden lg:flex">
            <span className="flex items-center gap-2">
              📅 <time dateTime={dateInfo.iso}>{dateInfo.display || "LOADING..."}</time>
            </span>
          </div>
          <div className="bg-[#0f172a] h-full flex items-center px-6 mr-4 text-blue-400">TRENDING</div>
          <div className="flex-1 px-2 truncate text-[12px] font-medium normal-case">
            <Link href="/news/wall-street-slips" className="hover:text-blue-400 transition-colors">
              Wall Street slips, weighed down by healthcare plunge
            </Link>
          </div>
          <div className="flex border-l border-gray-700 h-full">
            <button aria-label="Previous trending" className="px-3 hover:bg-blue-600 border-r border-gray-700 transition-colors"><ChevronLeft size={14} /></button>
            <button aria-label="Next trending" className="px-3 hover:bg-blue-600 transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO AREA */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex justify-between items-center">
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu" aria-expanded={isMenuOpen} className="p-2 border border-gray-200 text-black">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* <div className="hidden md:block">
            <Link href="/subscribe" className="bg-[#2196f3] text-white px-6 py-3 flex items-center gap-2 font-bold text-xs uppercase hover:bg-blue-600 transition-colors">
              <Mail size={16} /> Subscribe Now
            </Link>
          </div> */}
          <div className="hidden md:block w-[160px]" />
          <Link href="/" className="text-4xl md:text-7xl font-normal text-black hover:opacity-90 transition-opacity" style={{ fontFamily: 'var(--font-corruptionfiles)' }}>
            Corruption Files
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-3 text-black">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><Facebook size={18} /></a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600"><Instagram size={18} /></a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><Twitter size={18} /></a>
              <a href="https://youtube.com" aria-label="Youtube" target="_blank" rel="noopener noreferrer" className="hover:text-red-600"><Youtube size={18} /></a>
            </div>
            <button aria-label="Search" className="cursor-pointer hover:text-blue-600 transition-colors">
              <Search size={20} className="stroke-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION */}
      <div className="sticky top-0 z-50 w-full bg-white border-t border-black border-b border-gray-200 hidden md:block shadow-md">
        <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center items-center gap-12 py-4 font-bold uppercase text-[13px] tracking-[0.15em]">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-black hover:text-blue-500 flex items-center gap-1 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 4. MOBILE MENU */}
      <div className={`sticky top-0 z-40 md:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[500px] shadow-lg' : 'max-h-0'}`}>
        <nav aria-label="Mobile Navigation" className="flex flex-col">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-none hover:bg-gray-50 text-black">
                  <span className="font-bold text-[14px] uppercase tracking-wider">{link.name}</span>
                  <ArrowRight size={16} className="text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
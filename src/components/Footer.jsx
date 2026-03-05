"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Pointer } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white font-sans text-[#222] pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* --- MAIN FOOTER CONTENT (4 Columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          
          {/* COLUMN 1: News */}
          <nav aria-labelledby="footer-news-heading">
            <h3 id="footer-news-heading" className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">Categories</h3>
            <ul className="flex flex-col gap-3 text-[13px] font-medium text-gray-600">
              <li><Link href="/govt" className="hover:text-blue-500 transition-colors">Government</Link></li>
              <li><Link href="/puerto-rico" className="hover:text-blue-500 transition-colors">Puerto Rico</Link></li>
              <li><Link href="/police" className="hover:text-blue-500 transition-colors">Police</Link></li>
              <li><Link href="/tech" className="hover:text-blue-500 transition-colors">Tech</Link></li>
              <li><Link href="/pharma" className="hover:text-blue-500 transition-colors">Pharma</Link></li>
              <li><Link href="/eco" className="hover:text-blue-500 transition-colors">Eco</Link></li>
              <li><Link href="/intelligence" className="hover:text-blue-500 transition-colors">Intelligence</Link></li>
              <li><Link href="/offshore" className="hover:text-blue-500 transition-colors">Offshore</Link></li>
            </ul>
          </nav>

          {/* COLUMN 2: Useful Links */}
          <nav aria-labelledby="footer-links-heading">
            <h3 id="footer-links-heading" className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">Links</h3>
            <ul className="flex flex-col gap-3 text-[13px] font-medium text-gray-600">
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">About us</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </nav>

          {/* COLUMN 3: Don't miss */}
          <div>
            <h3 className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">Don't miss</h3>
            <div className="flex flex-col gap-6">
                
                {/* Article 1 */}
                <article className="flex gap-4 group">
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0 overflow-hidden relative">
                    <Link href="/news/trump-sanders">
                        <Image 
                          src="/Davenport4-2-1024x683.jpg" 
                          alt="Political news coverage"
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
                  </div>
                  <div>
                    <Link href="/category/celebrity" className="inline-block bg-pink-500 text-white text-[9px] font-bold uppercase px-2 py-0.5 mb-2 hover:bg-pink-600 transition-colors">
                      Celebrity
                    </Link>
                    <h4 className="font-bold text-[13px] leading-snug mb-1">
                      <Link href="/news/trump-sanders" className="hover:text-blue-500 transition-colors">
                        Donald Trump attacks Bernie Sanders' tax returns, makes 2020 election prediction
                      </Link>
                    </h4>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <span role="img" aria-label="calendar">📅</span> <time dateTime="2019-03-26">March 26, 2019</time>
                    </span>
                  </div>
                </article>

                {/* Article 2 */}
                <article className="flex gap-4 group">
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0 overflow-hidden relative">
                     <Link href="/news/pinterest-ipo">
                        <Image 
                          src="/Davenport4-2-1024x683.jpg" 
                          alt="Man reading newspaper"
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                     </Link>
                  </div>
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Link href="/category/business" className="inline-block bg-blue-500 text-white text-[9px] font-bold uppercase px-2 py-0.5 hover:bg-blue-600 transition-colors">Business</Link>
                      <Link href="/category/politics" className="inline-block bg-[#00008B] text-white text-[9px] font-bold uppercase px-2 py-0.5 hover:bg-indigo-900 transition-colors">Politics</Link>
                    </div>
                    <h4 className="font-bold text-[13px] leading-snug mb-1">
                      <Link href="/news/pinterest-ipo" className="hover:text-blue-500 transition-colors">
                        Pinterest prices IPO at $19 a share, valuation tops $10 billion
                      </Link>
                    </h4>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <span role="img" aria-label="sponsored">🔔</span> Sponsored content
                    </span>
                  </div>
                </article>
            </div>
          </div>

          {/* COLUMN 4: Trending */}
          <div>
            <h3 className="font-bold uppercase text-[14px] tracking-wider mb-6 border-b border-gray-200 pb-2">Trending</h3>
            <div className="flex flex-col gap-6">
               <article className="group">
                  <div className="relative w-full mb-4 overflow-hidden bg-gray-100">
                    <div className="relative h-auto aspect-video md:h-40 w-full">
                       <Link href="/news/tobacco-age">
                          <Image 
                            src="/Davenport4-6.jpg" 
                            alt="Man reading The Daily newspaper"
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                       </Link>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 block mb-2"><time dateTime="2019-03-25">📅 March 25, 2019</time></span>
                  <h4 className="font-bold text-[15px] leading-snug mb-2">
                    <Link href="/news/tobacco-age" className="hover:text-blue-500 transition-colors">
                      Mitch McConnell Wants to Raise Tobacco Purchasing Age From 18 to 21, Including for Vaping Devices
                    </Link>
                  </h4>
                  <span className="text-[11px] text-gray-400">By <span className="font-semibold text-gray-600">Davenport</span></span>
               </article> 
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left: Powered By */}
          <div className="text-[13px] text-gray-500 flex items-center">
            Powered by 
            <Link href="/" className="text-2xl ml-2 text-black hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--font-davenport)' }}>
                Davenport
            </Link>
          </div>

          {/* Center: Subscribe Form */}
          <form className="flex w-full md:w-auto" action="/api/subscribe" method="POST">
            <label htmlFor="footer-email" className="sr-only">Email Address</label>
            <input 
              id="footer-email"
              type="email" 
              name="email"
              placeholder="Please enter your e-mail" 
              className="border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] w-full md:w-64 focus:outline-none focus:border-blue-400 transition-colors"
              required
            />
            <button type="submit" className="bg-[#2196f3] text-white text-[11px] font-bold uppercase tracking-wider px-6 py-3 hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </form>

          {/* Right: Social Icons */}
          <nav aria-label="Social Media Links" className="flex gap-2">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="bg-[#3b5998] p-2 rounded-full text-white hover:opacity-90 transition-opacity"><Facebook size={16} /></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="bg-[#c13584] p-2 rounded-full text-white hover:opacity-90 transition-opacity"><Instagram size={16} /></a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="bg-[#1da1f2] p-2 rounded-full text-white hover:opacity-90 transition-opacity"><Twitter size={16} /></a>
            <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer" className="bg-[#bd081c] p-2 rounded-full text-white hover:opacity-90 transition-opacity"><Pointer size={16} /></a>
            <a href="https://youtube.com" aria-label="Youtube" target="_blank" rel="noopener noreferrer" className="bg-[#ff0000] p-2 rounded-full text-white hover:opacity-90 transition-opacity"><Youtube size={16} /></a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
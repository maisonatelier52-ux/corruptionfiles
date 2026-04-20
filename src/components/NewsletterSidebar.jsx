"use client";

import { Mail } from "lucide-react";

export default function NewsletterSidebar() {
  return (
    <div className="sticky top-6 lg:top-24 z-10 bg-[#f4f4f4] px-5 pt-10 pb-6 relative overflow-visible">
      {/* Floating icon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#222] text-white p-3 rounded-full shadow-lg z-10">
        <Mail size={20} strokeWidth={1.5} />
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#222] mb-2">
          Newsletter
        </p>
        <h3 className="text-lg font-bold text-black leading-tight mb-2">
          Become a Trendsetter
        </h3>
        <p className="text-xs font-serif italic text-gray-500 leading-relaxed mb-5">
          Get the best of corruptionfiles, tailored for you.
        </p>

        <form
          className="w-full flex flex-col gap-2"
          action="/api/newsletter"
          method="POST"
        >
          <label htmlFor="sidebar-newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            id="sidebar-newsletter-email"
            type="email"
            name="email"
            placeholder="Your e-mail address"
            required
            className="w-full px-4 py-3 text-[13px] text-gray-700 bg-white border border-gray-200 focus:outline-none focus:border-[#2196f3] placeholder:text-gray-400 placeholder:italic"
          />
          <button
            type="submit"
            className="w-full bg-[#2196f3] hover:bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest py-3 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
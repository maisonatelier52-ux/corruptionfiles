"use client";

import { Mail } from "lucide-react";

export default function NewsletterSidebar() {
  return (
    <section
      aria-labelledby="sidebar-newsletter-heading"
      className="rounded-lg bg-[#111827] p-6 text-white lg:sticky lg:top-24"
    >
      <Mail size={22} strokeWidth={1.75} className="text-[#64b5f6]" aria-hidden="true" />
      <h2
        id="sidebar-newsletter-heading"
        className="mt-4 text-xl font-bold leading-tight"
      >
        Become a Trendsetter
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-300">
        Get the best of corruptionfiles, tailored for you.
      </p>

      <form
        className="mt-5 flex flex-col gap-2.5"
        action="/api/newsletter"
        method="POST"
      >
        <label htmlFor="sidebar-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="sidebar-newsletter-email"
          type="email"
          name="email"
          placeholder="Your e-mail address"
          required
          autoComplete="email"
          className="w-full rounded-md border border-gray-600 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-[#2196f3] focus:outline-none focus:ring-2 focus:ring-[#2196f3]/40"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-[#2196f3] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e88e5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

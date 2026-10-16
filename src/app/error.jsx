"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
        Something went wrong
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
        This page hit a problem
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Please try again. If it keeps happening, go back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1565c0]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-[#1565c0] hover:text-[#1565c0]"
        >
          Homepage
        </Link>
      </div>
    </div>
  );
}

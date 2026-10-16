import Link from "next/link";
import homepageData from "@/data/homepage.json";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const categories = (homepageData.categories || []).filter(
    (c) => c?.category && c?.label
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        The link may be out of date or mistyped. Try the homepage or pick a
        section below.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1565c0]"
      >
        Back to the homepage
      </Link>

      {categories.length > 0 && (
        <nav aria-label="Sections" className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Browse sections
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {categories.map((c) => (
              <li key={c.category}>
                <Link
                  href={`/${c.category}`}
                  className="inline-flex rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-800 transition-colors hover:border-[#1565c0] hover:text-[#1565c0]"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

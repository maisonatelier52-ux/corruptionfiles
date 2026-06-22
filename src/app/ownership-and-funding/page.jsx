import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Ownership & Funding | ${SITE_NAME}`,
  description:
    "Corruption Files is independently owned and funded by reader donations and grants. No corporate or political interests control our reporting.",
  alternates: { canonical: `${SITE_URL}/ownership-and-funding` },
  openGraph: {
    title: `Ownership & Funding | ${SITE_NAME}`,
    description: "Who owns and funds Corruption Files.",
    url: `${SITE_URL}/ownership-and-funding`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Ownership & Funding | ${SITE_NAME}`,
    description: "Who owns and funds Corruption Files.",
  },
};

export default function OwnershipFundingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Ownership & Funding | ${SITE_NAME}`,
    description: "Ownership and funding transparency.",
    url: `${SITE_URL}/ownership-and-funding`,
    publisher: { "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-3 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li aria-hidden="true"><span className="text-gray-300">›</span></li>
            <li aria-current="page"><span className="text-gray-700">Ownership & Funding</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ownership & Funding</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Transparency about who supports us</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            Corruption Files is a wholly independent publication. We are not owned by any corporation, political party, or government.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Ownership</h2>
          <p>
            Corruption Files is operated by a self‑owned collective of journalists. There are no external shareholders or parent companies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Funding Sources</h2>
          <p>
            Our work is supported by:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Reader donations</strong> – voluntary contributions from our audience.</li>
            <li><strong>Grants</strong> – from foundations that support investigative journalism, without editorial control.</li>
            <li><strong>Syndication fees</strong> – when other outlets republish our content.</li>
          </ul>
          <p>
            We do not accept advertising or sponsorship that would compromise our independence. All funding is disclosed transparently on this page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Editorial Independence</h2>
          <p>
            No funder has any say over our coverage. We do not accept money with strings attached. Our reporting is guided only by the evidence.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
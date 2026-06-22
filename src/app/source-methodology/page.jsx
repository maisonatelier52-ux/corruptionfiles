import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Source Methodology | ${SITE_NAME}`,
  description:
    "How Corruption Files sources, verifies, and handles documents and anonymous sources. Our standards for evidence‑based journalism.",
  alternates: { canonical: `${SITE_URL}/source-methodology` },
  openGraph: {
    title: `Source Methodology | ${SITE_NAME}`,
    description: "Our sourcing and verification standards.",
    url: `${SITE_URL}/source-methodology`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Source Methodology | ${SITE_NAME}`,
    description: "Our sourcing and verification standards.",
  },
};

export default function SourceMethodologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Source Methodology | ${SITE_NAME}`,
    description: "Our sourcing and verification standards.",
    url: `${SITE_URL}/source-methodology`,
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
            <li aria-current="page"><span className="text-gray-700">Source Methodology</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Source Methodology</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">How we build stories</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            Every Corruption Files article is built on a foundation of verified facts. We show readers how we know what we know.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Primary Sources First</h2>
          <p>
            We start with official records, court documents, corporate filings, and direct interviews. Secondary sources are used only when they add context, and we attribute them clearly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Verification Process</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Every fact is checked against at least two independent sources.</li>
            <li>Documents are authenticated and date‑verified.</li>
            <li>Quotes are reviewed with the speaker whenever possible.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Anonymous Sources</h2>
          <p>
            We use anonymity only when the source has critical information and would face harm or retaliation if identified. In such cases, we explain why the source is protected and what we know about their credibility.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Handling Uncertainty</h2>
          <p>
            When information is incomplete, we say so. We never speculate or present conjecture as fact. If a story evolves, we update it with new evidence.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Right of Reply | ${SITE_NAME}`,
  description:
    "Corruption Files offers individuals and organisations named in our reporting a fair opportunity to respond before publication and afterwards.",
  alternates: { canonical: `${SITE_URL}/right-of-reply-policy` },
  openGraph: {
    title: `Right of Reply | ${SITE_NAME}`,
    description: "Our policy on giving subjects a right to respond.",
    url: `${SITE_URL}/right-of-reply-policy`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Right of Reply | ${SITE_NAME}`,
    description: "Our policy on giving subjects a right to respond.",
  },
};

export default function RightOfReplyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Right of Reply | ${SITE_NAME}`,
    description: "Right of reply policy for Corruption Files.",
    url: `${SITE_URL}/right-of-reply-policy`,
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
            <li aria-current="page"><span className="text-gray-700">Right of Reply Policy</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Right of Reply Policy</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Fairness and accountability</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            We believe in fairness. Before we publish serious allegations, we give the subject a meaningful opportunity to respond.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">When We Seek a Response</h2>
          <p>
            If an article contains significant criticism or allegations against a person or organisation, we will contact them in advance to allow them to comment. We set clear deadlines and make reasonable efforts to reach them.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">What We Include</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>We summarise the allegations fairly.</li>
            <li>We provide relevant excerpts from documents.</li>
            <li>We give a reasonable timeframe for response.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">After Publication</h2>
          <p>
            If we receive a response after publication, we evaluate it and may issue an update, clarification, or correction. We also welcome rebuttals and publish them when warranted.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Exceptions</h2>
          <p>
            In rare cases—such as threats to safety or ongoing investigations—we may publish without prior comment. We always document our attempts to reach the subject.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
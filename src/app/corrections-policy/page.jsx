import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Corrections Policy | ${SITE_NAME}`,
  description:
    "How Corruption Files handles errors: reporting, investigation, and transparent correction. We own our mistakes.",
  alternates: { canonical: `${SITE_URL}/corrections-policy` },
  openGraph: {
    title: `Corrections Policy | ${SITE_NAME}`,
    description: "Our process for correcting the record.",
    url: `${SITE_URL}/corrections-policy`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Corrections Policy | ${SITE_NAME}`,
    description: "Our process for correcting the record.",
  },
};

export default function CorrectionsPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Corrections Policy | ${SITE_NAME}`,
    description: "Corrections policy for Corruption Files.",
    url: `${SITE_URL}/corrections-policy`,
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
            <li aria-current="page"><span className="text-gray-700">Corrections Policy</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Corrections Policy</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">How we correct errors</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            We are committed to accuracy. When we get it wrong, we fix it openly and quickly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">How to Report an Error</h2>
          <p>
            If you spot a factual mistake, email us at <Link href="mailto:corrections@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">corrections@corruptionfiles.com</Link>. Include the article URL, the specific error, and the correct information if possible.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">What Happens Next</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Our editorial team reviews the claim.</li>
            <li>We investigate using original sources and notes.</li>
            <li>If confirmed, we update the article and add a correction note.</li>
            <li>For major errors, we publish a separate clarification.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Types of Corrections</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Minor errors</strong> (typos, grammar) — fixed silently.</li>
            <li><strong>Factual errors</strong> — corrected with a visible editor's note.</li>
            <li><strong>Significant errors</strong> — a full correction notice is appended.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Our Commitment</h2>
          <p>
            We believe that transparency builds trust. We never delete an article without explanation, and we always acknowledge when we have made a mistake.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
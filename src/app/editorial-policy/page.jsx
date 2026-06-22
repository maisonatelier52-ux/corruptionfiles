import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Editorial Policy | ${SITE_NAME}`,
  description:
    "Corruption Files' editorial policy: independence, accuracy, transparency, and accountability. How we report and correct the record.",
  alternates: { canonical: `${SITE_URL}/editorial-policy` },
  openGraph: {
    title: `Editorial Policy | ${SITE_NAME}`,
    description: "Our journalistic standards and ethics.",
    url: `${SITE_URL}/editorial-policy`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Editorial Policy | ${SITE_NAME}`,
    description: "Our journalistic standards and ethics.",
  },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Editorial Policy | ${SITE_NAME}`,
    description: "Editorial policy and ethics of Corruption Files.",
    url: `${SITE_URL}/editorial-policy`,
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
            <li aria-current="page"><span className="text-gray-700">Editorial Policy</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Editorial Policy</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Our ethical framework</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            Corruption Files is an independent, not‑for‑profit news organisation. Our only agenda is the truth.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Independence</h2>
          <p>
            We do not accept money, gifts, or favours in exchange for coverage. Editorial decisions are made solely by our journalists, free from commercial, political, or governmental influence.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Accuracy & Verification</h2>
          <p>
            We verify every assertion with multiple sources. When we cannot confirm a claim, we say so. We correct errors transparently and promptly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Transparency</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>We distinguish news from opinion clearly.</li>
            <li>We disclose conflicts of interest.</li>
            <li>We name sources whenever possible; anonymity is used only as a last resort.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Accountability</h2>
          <p>
            We welcome reader feedback. Mistakes are acknowledged with correction notes. We are committed to earning and keeping your trust.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
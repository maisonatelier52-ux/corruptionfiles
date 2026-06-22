import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Advertising Policy | ${SITE_NAME}`,
  description:
    "Corruption Files does not accept advertising or sponsored content. We are reader‑funded to maintain complete editorial independence.",
  alternates: { canonical: `${SITE_URL}/advertising-and-sponsored-content-policy` },
  openGraph: {
    title: `Advertising Policy | ${SITE_NAME}`,
    description: "Our policy on advertising and sponsorships.",
    url: `${SITE_URL}/advertising-and-sponsored-content-policy`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Advertising Policy | ${SITE_NAME}`,
    description: "Our policy on advertising and sponsorships.",
  },
};

export default function AdvertisingPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Advertising Policy | ${SITE_NAME}`,
    description: "Advertising policy for Corruption Files.",
    url: `${SITE_URL}/advertising-and-sponsored-content-policy`,
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
            <li aria-current="page"><span className="text-gray-700">Advertising Policy</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Advertising Policy</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">No ads. No sponsored content.</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            Corruption Files is funded entirely by readers and grants. We do not accept advertising, sponsored posts, or paid content of any kind.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Why We Don't Run Ads</h2>
          <p>
            Advertising creates conflicts of interest. It can pressure newsrooms to soften coverage or avoid certain topics. We have chosen to remain completely independent by forgoing ad revenue.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Sponsored Content</h2>
          <p>
            We do not publish sponsored articles, native advertising, or branded content. Every piece you read is produced solely by our journalists, without any commercial influence.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Affiliate Links</h2>
          <p>
            We do not use affiliate links or earn commissions from product recommendations. Our reporting is not a vehicle for commerce.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Partnerships</h2>
          <p>
            We occasionally partner with other news organisations for collaborative projects, but these partnerships never involve payment for editorial content. All collaborations are disclosed.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
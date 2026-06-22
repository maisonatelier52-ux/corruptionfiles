import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Terms and Conditions | ${SITE_NAME}`,
  description:
    "The ground rules for using Corruption Files: content usage, liability, and reader obligations. Simple and transparent.",
  alternates: { canonical: `${SITE_URL}/terms-and-conditions` },
  openGraph: {
    title: `Terms and Conditions | ${SITE_NAME}`,
    description: "Terms of use for Corruption Files.",
    url: `${SITE_URL}/terms-and-conditions`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms and Conditions | ${SITE_NAME}`,
    description: "Terms of use for Corruption Files.",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TermsOfService",
    name: `Terms and Conditions | ${SITE_NAME}`,
    description: "Terms of use for Corruption Files.",
    url: `${SITE_URL}/terms-and-conditions`,
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
            <li aria-current="page"><span className="text-gray-700">Terms & Conditions</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Using Corruption Files responsibly</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            By using Corruption Files, you agree to these terms. We keep them simple.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Content Usage</h2>
          <p>
            You may share links and quote short passages with credit. Do not republish our full articles without permission. For permissions, contact <Link href="mailto:editorial@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">editorial@corruptionfiles.com</Link>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">User Conduct</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Do not use our site for illegal activities.</li>
            <li>Do not post spam, hate speech, or abusive comments.</li>
            <li>Respect the rights of other users.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Liability</h2>
          <p>
            We are a news site, not a legal adviser. We are not liable for how you use the information provided.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Changes to Terms</h2>
          <p>
            We may update these terms. We will post the new version here with a revised date.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Contact</h2>
          <p>
            Questions? Reach us at <Link href="mailto:contact@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">contact@corruptionfiles.com</Link>.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
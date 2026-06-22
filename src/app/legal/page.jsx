import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Legal Information | ${SITE_NAME}`,
  description:
    "Legal policies for Corruption Files: copyright, fair use, complaints, third‑party links, and formal requests.",
  alternates: { canonical: `${SITE_URL}/legal` },
  openGraph: {
    title: `Legal Information | ${SITE_NAME}`,
    description: "Legal policies and procedures.",
    url: `${SITE_URL}/legal`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Legal Information | ${SITE_NAME}`,
    description: "Legal policies and procedures.",
  },
};

export default function LegalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Legal Information | ${SITE_NAME}`,
    description: "Legal policies for Corruption Files.",
    url: `${SITE_URL}/legal`,
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
            <li aria-current="page"><span className="text-gray-700">Legal</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Legal Information</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Copyright, complaints, and formal requests</p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Informational Use</h2>
          <p>
            All content on Corruption Files is for informational purposes only. It does not constitute legal, financial, or professional advice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Copyright</h2>
          <p>
            You may quote brief excerpts with attribution. Full republication requires written permission. Contact <Link href="mailto:legal@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">legal@corruptionfiles.com</Link> for syndication.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Complaints</h2>
          <p>
            If you believe we have published an error or violated your rights, please contact us with the article URL and specific concern. We will investigate and respond.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Third‑Party Links</h2>
          <p>
            We link to external sources for context. These sites are governed by their own terms and privacy policies. We are not responsible for their content.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Formal Requests</h2>
          <p>
            For legal notices, subpoenas, or formal demands, please direct correspondence to our registered agent or contact <Link href="mailto:legal@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">legal@corruptionfiles.com</Link>.
          </p>

          <p className="mt-8 text-sm text-gray-500">Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time></p>
        </div>
      </div>
    </main>
  );
}
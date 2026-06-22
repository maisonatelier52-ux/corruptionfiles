import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

export const metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description:
    "Reach Corruption Files with news tips, corrections, questions, or feedback. We value reader input and take confidentiality seriously.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Get in touch with Corruption Files.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_NAME}`,
    description: "Get in touch with Corruption Files.",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact Us | ${SITE_NAME}`,
    description: "Contact Corruption Files.",
    url: `${SITE_URL}/contact`,
    publisher: { "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-3 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li aria-hidden="true"><span className="text-gray-300">›</span></li>
            <li aria-current="page"><span className="text-gray-700">Contact Us</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            Get in touch with our newsroom
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed mt-8">
          <p className="border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            We welcome tips, corrections, and dialogue. Your confidentiality is paramount — we protect sources rigorously.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Editorial & General Contact</h2>
          <p>
            For story ideas, press releases, or general inquiries:<br />
            <Link href="mailto:editorial@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">
              editorial@corruptionfiles.com
            </Link>
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Confidential Tips</h2>
          <p>
            If you have sensitive information, contact our secure desk:<br />
            <Link href="mailto:tips@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">
              tips@corruptionfiles.com
            </Link>
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Corrections</h2>
          <p>
            To report a factual error, please include the article URL and details:<br />
            <Link href="mailto:corrections@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">
              corrections@corruptionfiles.com
            </Link>
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Legal & Permissions</h2>
          <p>
            For reprint requests, syndication, or legal matters:<br />
            <Link href="mailto:legal@corruptionfiles.com" className="font-semibold underline underline-offset-4 hover:text-blue-600">
              legal@corruptionfiles.com
            </Link>
          </p>

          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="font-semibold text-gray-900">Mailing Address</p>
            <p className="text-gray-700">Corruption Files Newsroom<br />123 Investigations Lane<br />Washington, D.C. 20001</p>
          </div>

          <p className="mt-8 text-sm text-gray-500">Last Updated: June 22, 2026</p>
        </div>
      </div>
    </main>
  );
}
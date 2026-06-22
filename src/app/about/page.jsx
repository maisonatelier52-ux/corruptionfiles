import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `About Us | ${SITE_NAME}`,
  description:
    "Corruption Files is an independent, fact‑driven newsroom dedicated to exposing wrongdoing, holding power accountable, and delivering transparent investigative journalism.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description:
      "Learn about our mission, values, and commitment to uncompromised reporting.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${SITE_NAME}`,
    description:
      "Learn about our mission, values, and commitment to uncompromised reporting.",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About Us | ${SITE_NAME}`,
    description: "Learn about Corruption Files and our mission.",
    url: `${SITE_URL}/about`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
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
            <li aria-current="page"><span className="text-gray-700">About</span></li>
          </ol>
        </nav>

        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            Independent Journalism. Uncompromised Reporting.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed">
          <p className="mt-8 border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            Corruption Files is an independent newsroom built on the belief that accountability matters. We investigate power, expose corruption, and publish the facts without fear or favour.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Our Mission</h2>
          <p>
            Our mission is to equip readers with trustworthy, verifiable reporting on the institutions, individuals, and systems that shape our world. We prioritise accuracy, context, and transparency.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">What We Stand For</h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>Independence:</strong> We answer only to the public interest — no corporate or political strings attached.</li>
            <li><strong>Accuracy:</strong> We verify every claim, check every source, and correct every error.</li>
            <li><strong>Transparency:</strong> We show our work, cite our sources, and admit our mistakes.</li>
            <li><strong>Accountability:</strong> We pursue the truth wherever it leads, even when it is uncomfortable.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Who We Are</h2>
          <p>
            Corruption Files is built by a distributed team of investigative journalists, editors, and researchers with decades of experience in newsrooms across the globe. We operate remotely, but we share a single standard: rigorous, honest, and fearless reporting.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">Our Promise</h2>
          <p>
            We never accept payment to alter coverage, we never allow sponsors to shape stories, and we never publish without independent verification. Our loyalty is to the truth and to our readers.
          </p>

          <p className="mt-8 text-sm text-gray-500">
            Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
          </p>
        </div>
      </div>
    </main>
  );
}
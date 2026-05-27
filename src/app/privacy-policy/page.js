import Link from "next/link";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

// Date last updated — used in metadata, JSON-LD, and visible <time> element
const LAST_UPDATED = "2026-05-27";
const LAST_UPDATED_DISPLAY = "May 27, 2026";

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description:
    "Learn how Corruption Files collects, uses, and protects your personal information. We are committed to transparency and safeguarding reader privacy.",

  keywords:
    "privacy policy, data protection, personal information, cookies, GDPR, Corruption Files privacy, independent news privacy",

  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy-policy`,
    siteName: SITE_NAME,
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Learn how Corruption Files protects your privacy and handles personal information responsibly.",
    images: [
      {
        url: `${SITE_URL}/og-twitter.webp`,
        secureUrl: `${SITE_URL}/og-twitter.webp`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Privacy Policy`,
      },
    ],
  },

  twitter: {
    card: "summary",
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "How Corruption Files safeguards privacy while delivering independent news.",
    images: [`${SITE_URL}/og-twitter.webp`],
  },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Privacy policy and data handling practices for Corruption Files.",
    url: `${SITE_URL}/privacy-policy`,
    inLanguage: "en-US",
    dateModified: LAST_UPDATED,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/privacy-policy`,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${SITE_URL}/privacy-policy`,
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-16">

        {/* ── Breadcrumb nav ───────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link
                href="/"
                title="Home"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="text-gray-300">›</span>
            </li>
            <li aria-current="page">
              <span className="text-gray-700">Privacy Policy</span>
            </li>
          </ol>
        </nav>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-1">
            Last Updated:{" "}
            <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
          </p>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            The privacy policy for {SITE_NAME}
          </p>
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed">

          {/* Lead paragraph */}
          <p className="mt-8 border-l-4 border-gray-800 pl-4 bg-gray-50 py-3 pr-3 text-gray-800 not-italic">
            Corruption Files values reader trust. We collect only limited
            information necessary to operate our newsroom, communicate with
            readers, and improve our journalism. This policy explains what we
            collect, why we collect it, and how we protect it.
          </p>

          {/* Section 1 */}
          <h2
            id="information-we-collect"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            Information We Collect
          </h2>
          <p>
            When you visit our website, basic technical data such as pages
            viewed, device type, and browser information may be collected
            automatically. This information helps us understand readership
            patterns and improve site performance.
          </p>
          <p className="mt-4">
            If you contact us directly — for tips, corrections, or inquiries —
            we collect only the information you choose to provide, such as your
            name and email address.
          </p>
          <p className="mt-4">
            We do not collect unnecessary personal data, and we do not sell or
            trade user information.
          </p>

          {/* Section 2 */}
          <h2
            id="how-information-is-used"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            How Information Is Used
          </h2>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>To keep the website operating smoothly and securely.</li>
            <li>To understand which stories resonate with readers.</li>
            <li>To respond to messages, tips, or correction requests.</li>
            <li>To provide updates when readers request them.</li>
          </ul>
          <p>
            We do not use personal data for advertising sales, profiling, or
            promotional targeting.
          </p>

          {/* Section 3 */}
          <h2
            id="cookies-analytics"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            Cookies and Analytics
          </h2>
          <p>
            We use cookies and analytics tools to understand how readers
            interact with our content. You may disable cookies in your browser
            without affecting access to our reporting.
          </p>
          <p className="mt-4">
            Third-party analytics services may process anonymized data under
            their own privacy policies.
          </p>

          {/* Section 4 */}
          <h2
            id="data-protection"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            Data Protection
          </h2>
          <p>
            We take reasonable technical and organizational measures to protect
            information from unauthorized access. Because we limit the data we
            collect, we also limit exposure and risk.
          </p>
          <p className="mt-4">
            Corruption Files collects as little information as possible, uses it
            only to support journalism, and never sells personal data.
          </p>

          {/* Section 5 */}
          <h2
            id="your-rights"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            Your Rights and Choices
          </h2>
          <p>
            Depending on your jurisdiction, you may have rights to access,
            correct, or request deletion of personal data. Requests can be
            submitted using the contact below.
          </p>
          {/*<p className="mt-4">
            <Link
              href="mailto:editorial@corruptionfiles.com"
              className="font-semibold underline underline-offset-4 hover:text-blue-600 transition-colors"
            >
              editorial@corruptionfiles.com
            </Link>
          </p>*/}

        </div>
      </div>
    </main>
  );
}
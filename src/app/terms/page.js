import Link from "next/link";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

// Date the page was last updated — used in metadata, JSON-LD and <time>
const LAST_UPDATED = "2026-05-04";
const LAST_UPDATED_DISPLAY = "May 04, 2026";

// ─── METADATA ─────────────────────────────────────────────────────────────────
// FIX: added keywords, canonical, robots, complete OG (url, absolute image,
//      dimensions), Twitter card. OG image uses the site logo as a fallback
//      since terms pages typically have no hero image.

export const metadata = {
  title: `Terms and Conditions | ${SITE_NAME}`,
  description:
    "Read the Terms and Conditions of Use for Corruption Files, governing your access to our digital information network, content usage, user submissions, and legal obligations.",

  // FIX: keywords
  keywords:
    "terms and conditions, terms of use, Corruption Files legal, content usage policy, user agreement, copyright, data protection",

  // FIX: canonical URL
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },

  // FIX: explicit robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // FIX: complete Open Graph block with absolute image URL
  openGraph: {
    type: "website",
    url: `${SITE_URL}/terms`,
    siteName: SITE_NAME,
    title: `Terms and Conditions | ${SITE_NAME}`,
    description:
      "Read the Terms and Conditions of Use for Corruption Files, governing your access to our digital information network.",
    images: [
      {
        url: `${SITE_URL}/og-twitter.webp`, // update to your actual OG/logo image
        secureUrl: `${SITE_URL}/og-twitter.webp`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Terms and Conditions`,
      },
    ],
  },

  // FIX: Twitter / X card
  twitter: {
    card: "summary",
    title: `Terms and Conditions | ${SITE_NAME}`,
    description:
      "Read the Terms and Conditions of Use for Corruption Files.",
    images: [`${SITE_URL}/og-twitter.webp`],
  },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {

  // ─── JSON-LD ────────────────────────────────────────────────────────────────
  // FIX: added mainEntityOfPage, dateModified, inLanguage
  // FIX: logo changed to full ImageObject with width + height
  // FIX: added BreadcrumbList as second JSON-LD block

  const termsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Terms and Conditions | ${SITE_NAME}`,
    description:
      "Terms and conditions of use for the Corruption Files digital information network.",
    url: `${SITE_URL}/terms`,
    inLanguage: "en-US",
    dateModified: LAST_UPDATED,

    // FIX: mainEntityOfPage links schema to actual page URL
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/terms`,
    },

    // FIX: publisher with proper ImageObject logo (required by Google)
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

  // FIX: BreadcrumbList matching visible breadcrumb nav
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
        name: "Terms and Conditions",
        item: `${SITE_URL}/terms`,
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-16">

        {/* ── Breadcrumb nav ───────────────────────────────────────────── */}
        {/* FIX: visible semantic breadcrumb matching BreadcrumbList JSON-LD */}
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
              <span className="text-gray-700">Terms and Conditions</span>
            </li>
          </ol>
        </nav>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-12 border-b-2 border-black pb-6">
          {/* FIX: H1 is the page title — correct and intentional */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions of Use
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            {/* FIX: <time> with machine-readable dateTime attribute */}
            Last Updated:{" "}
            <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
          </p>
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        {/*
          FIX: all <h2> section headings now have id anchors so:
            1. The note block can link directly to each section
            2. Google can understand the document outline
            3. Users can share / link to specific sections
        */}
        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed">

          <p>
            Welcome to our digital information network. These are our terms and
            conditions for use of the network, which you may access in several ways,
            including but not limited to the World Wide Web via Corruption Files,
            digital television, mobile phone and RSS feeds.
          </p>
          <p>
            In these terms and conditions, when we say the{" "}
            <strong>&ldquo;Corruption Files Site&rdquo;</strong> or{" "}
            <strong>&ldquo;our site&rdquo;</strong> we mean the digital information
            network operated by or on behalf of Corruption Files, including without
            limitation, any domains, websites or apps owned or operated by Corruption
            Files. However you access the Corruption Files Site, you agree to be bound
            by these terms and conditions.
          </p>

          {/* FIX: internal anchor links in the note block point to section ids */}
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 my-8">
            <p className="text-gray-900 m-0">
              <strong>Note:</strong> Though you should read all sections carefully,
              your attention is specifically drawn to:{" "}
              <a
                href="#use-of-material"
                className="text-blue-600 hover:underline"
                title="Jump to Section 3: Use of Material"
              >
                Section 3
              </a>{" "}
              (Use of material),{" "}
              <a
                href="#disclaimer-of-liability"
                className="text-blue-600 hover:underline"
                title="Jump to Section 4: Disclaimer of Liability"
              >
                Section 4
              </a>{" "}
              (Disclaimers of liability),{" "}
              <a
                href="#user-content"
                className="text-blue-600 hover:underline"
                title="Jump to Section 6: User Content"
              >
                Section 6
              </a>{" "}
              (User Content), and{" "}
              <a
                href="#indemnification"
                className="text-blue-600 hover:underline"
                title="Jump to Section 12: Indemnification"
              >
                Section 12
              </a>{" "}
              (Indemnification).
            </p>
          </div>

          {/* FIX: id anchors on every section h2 */}
          <h2
            id="registration"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            1. Registration
          </h2>
          <p>
            You may access areas of the Corruption Files Site that require
            registration by becoming a registered member. You agree to be responsible
            for maintaining the confidentiality of your passwords and all activities
            that occur under your account.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Your account and password are personal to you and may not be used by
              anyone else.
            </li>
            <li>
              You will not assist non-registered users in gaining access to restricted
              areas.
            </li>
            <li>
              You will not create accounts for the purpose of abusing functionality or
              impersonating others.
            </li>
          </ul>

          <h2
            id="termination-of-registration"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            2. Termination of Registration
          </h2>
          <p>
            If you no longer wish to have a registered account, you may terminate it
            via your account settings. If you no longer accept these terms and
            conditions, you must cease using the Corruption Files Site. Continued use
            indicates your acceptance of any modifications.
          </p>

          <h2
            id="use-of-material"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            3. Use of Material
          </h2>
          <p>
            Corruption Files is the sole owner or licensee of all content on the
            site, including text, images, logos, and metadata (&ldquo;Corruption Files
            Content&rdquo;). This content is protected by global copyright laws.
          </p>
          <p className="mb-2">
            You shall not use (or permit the use of) any Corruption Files Content for:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Machine learning, AI training, or development of language models.
            </li>
            <li>
              Text and data mining, scraping, or automated data gathering.
            </li>
            <li>Commercial use without prior written approval.</li>
          </ul>

          <h2
            id="disclaimer-of-liability"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            4. Disclaimer of Liability
          </h2>
          <p>
            To the extent permitted by law, we do not accept responsibility for any
            statement in the Corruption Files Content. We give no warranties that the
            site is virus-free or will be provided uninterrupted. We will not be
            liable for any loss caused as a result of your reliance on information
            found on our site.
          </p>

          <h2
            id="third-party-advertising"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            5. Third Party Advertising
          </h2>
          <p>
            You will see advertising material submitted by third parties on the
            Corruption Files Site. Each individual advertiser is solely responsible
            for the content of its material. Corruption Files is the sole direct
            seller of advertising on our site.
          </p>

          <h2
            id="user-content"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            6. User Content
          </h2>
          <p>
            Users may be permitted to submit content. By doing so, you represent that
            you own the content or have permission to share it. You grant Corruption
            Files an unconditional, irrevocable, perpetual worldwide licence to use,
            publish, and transmit your content in any format.
          </p>

          <h2
            id="apps"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            7. Apps
          </h2>
          <p>
            All of these terms apply to your use of any Corruption Files applications
            downloaded from third-party app stores. We are not liable for any damage
            caused to your equipment through the use of these Apps.
          </p>

          <h2
            id="app-meter-subscriptions"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            8. App Meter / Subscriptions
          </h2>
          <p>
            We may refresh or vary the amount of free content available via our Apps
            within specific time periods. Before you incur any charges, we will make
            it clear that charges apply and specify the services provided.
          </p>

          <h2
            id="data-protection"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            9. Data Protection
          </h2>
          <p>
            To find out what personal data we collect and how we use it, please visit
            our{" "}
            <Link
              href="/privacy"
              title="Read our Privacy Policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            page.
          </p>

          <h2
            id="changes-to-terms"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            10. Changes to Terms
          </h2>
          <p>
            We may change these terms and conditions from time to time at our sole
            discretion. Any revised terms will be applicable at the time of posting on
            the Corruption Files Site.
          </p>

          <h2
            id="governing-law"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            11. Governing Law &amp; Jurisdiction
          </h2>
          <p>
            These terms and conditions are governed by applicable local laws, and the
            parties agree to submit to the exclusive jurisdiction of the relevant
            courts.
          </p>

          <h2
            id="indemnification"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            12. Indemnification
          </h2>
          <p>
            You agree to defend and indemnify Corruption Files, its affiliates, and
            employees from any claims, losses, or expenses (including attorney&rsquo;s
            fees) arising out of your breach of these terms or your use of the site.
          </p>

          <h2
            id="no-waiver"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            13. No Waiver
          </h2>
          <p>
            Our failure to insist upon or enforce any provision of these terms shall
            not be construed as a waiver of any provision or right of Corruption
            Files.
          </p>

        </div>
      </div>
    </main>
  );
}
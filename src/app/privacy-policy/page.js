import Link from "next/link";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

// Date last updated — used in metadata, JSON-LD, and visible <time> element
const LAST_UPDATED = "2026-04-09";
const LAST_UPDATED_DISPLAY = "April 09, 2026";

// ─── METADATA ─────────────────────────────────────────────────────────────────
// FIX: added keywords, canonical, robots, complete OG (url, absolute image
//      URL + dimensions), Twitter card, corrected description to be more
//      specific and useful for search snippets.

export const metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description:
    "Read the Privacy Policy for Corruption Files. Learn how we collect, use, store, and protect your personal data, and understand your rights and choices.",

  // FIX: keywords
  keywords:
    "privacy policy, data protection, personal information, cookies, GDPR, Corruption Files privacy, data collection",

  // FIX: canonical URL — consistent with JSON-LD url field
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
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
    url: `${SITE_URL}/privacy-policy`,
    siteName: SITE_NAME,
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Read the Privacy Policy for Corruption Files. Learn how we collect, use, store, and protect your personal data.",
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`, // update to your actual OG image
        secureUrl: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Privacy Policy`,
      },
    ],
  },

  // FIX: Twitter / X card
  twitter: {
    card: "summary",
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Read the Privacy Policy for Corruption Files. Learn how we collect, use, and protect your personal data.",
    images: [`${SITE_URL}/og-default.jpg`],
  },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {

  // ─── JSON-LD ────────────────────────────────────────────────────────────────
  // FIX: logo changed to full ImageObject with width + height
  // FIX: added mainEntityOfPage, dateModified, inLanguage
  // FIX: added BreadcrumbList as second JSON-LD block

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Privacy policy and data handling practices for Corruption Files.",
    url: `${SITE_URL}/privacy-policy`,
    inLanguage: "en-US",
    dateModified: LAST_UPDATED,

    // FIX: mainEntityOfPage links schema to actual page URL
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/privacy-policy`,
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
              <span className="text-gray-700">Privacy Policy</span>
            </li>
          </ol>
        </nav>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-1 border-b-2 border-black pb-1">
          {/* FIX: H1 is the page title — correct and intentional */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          {/* FIX: added visible "Last Updated" date with <time dateTime> */}
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-1">
            Last Updated:{" "}
            <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
          </p>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            The privacy policy for {SITE_NAME}
          </p>
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        {/*
          FIX: all <h2> and <h3> section headings now have id anchors so:
            1. Google can understand the document outline
            2. Users can share / link to specific sections
            3. Internal links within the page work correctly
        */}
        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed">

          <h2
            id="laws-about-privacy"
            className="text-2xl font-bold text-gray-900 font-sans mt-8 mb-4"
          >
            Laws about privacy
          </h2>
          <p>
            Corruption Files is a free daily online newspaper in the U.S. that covers
            business, finance, politics, markets, and sectors. To make and send out
            our reports, we need some information. We do this with the help of
            technology, analytics, and advertising platforms. We want to be clear
            about how we collect, use, and share your information because we value
            your trust.
          </p>

          <p className="font-bold mt-6 mb-2">
            This policy on privacy tells you:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>The information we gather</li>
            <li>The reasons we handle data the way we do</li>
            <li>When and with whom we give out information</li>
            <li>Your rights and choices about your data</li>
            <li>How to reach us</li>
          </ul>

          <h2
            id="information-we-gather"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            1. The information we gather
          </h2>

          <h3
            id="information-you-give-us"
            className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2"
          >
            A. The information you give us directly
          </h3>
          <p>
            When you sign up for an account, a newsletter, or contact us, you might
            give us personal information like your name, email address, account
            details, and any messages or materials you send us. A payment processor
            that works with other businesses collects and processes your payment
            information for paid services or subscriptions.
          </p>

          <h3
            id="information-we-collect-automatically"
            className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2"
          >
            B. Information we get on our own
          </h3>
          <p>
            When you use our services, we automatically collect information about how
            you use them and how they work. This information could include:
          </p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>
              The browser type, IP address, operating system, and device ID
            </li>
            <li>
              Pages you visit, the links you click, and how long you stay on each
              page
            </li>
            <li>
              Your IP address or the settings on your device may indicate your
              location
            </li>
            <li>
              Cookies, pixels, and other tracking tools let us see how well a site
              is doing and show the right ads
            </li>
          </ul>

          <h3
            id="information-from-other-sources"
            className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2"
          >
            C. Information from other sources
          </h3>
          <p>
            We might get information from third parties, like advertising partners,
            analytics providers (like aggregated demographic data or information about
            how users interact with ads), social networks when you interact with our
            content on those sites, and partners who share or integrate our content.
          </p>

          <h2
            id="what-we-do-with-data"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            2. What we do with the information you give us
          </h2>
          <p className="mb-2">We use data for these reasons:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              Delivering and maintaining services such as sending out newsletters and
              managing finances.
            </li>
            <li>
              Personalizing your newsletters and services.
            </li>
            <li>
              Analyzing, testing, and improving the performance of our website and
              products.
            </li>
            <li>
              Showing you ads for our services on our own websites and on third-party
              websites, including service upgrade notices and account information.
            </li>
            <li>
              Detecting and preventing fraud, abuse, or other harmful activity.
            </li>
          </ul>

          <h2
            id="cookies"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            3. Cookies and other similar tech
          </h2>
          <p>
            We use cookies, pixels, tags, and other similar technologies to identify
            returning visitors, show you relevant ads and content, monitor site
            performance, and improve speed and reliability. You can manage your cookie
            preferences through your browser settings or via a cookie consent banner
            where applicable.
          </p>

          <h2
            id="analytics"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            4. Analytics
          </h2>
          <p>
            We use tools like Google Analytics to better understand how people use our
            services. These tools track usage patterns across devices and browsers.
            Each analytics provider operates under its own privacy policy.
          </p>

          <h2
            id="advertising"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            5. Advertising and third-party tracking
          </h2>
          <p>
            We allow third-party ad networks and advertisers to display ads on our
            services to help fund our journalism. These partners may use cookies or
            similar tools to learn more about your device and browsing habits in order
            to serve you more relevant ads.
          </p>

          <h2
            id="how-we-share-data"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            6. How we share your information with other people
          </h2>
          <p className="mb-4">We may share your information with:</p>

          <h3
            id="service-vendors"
            className="text-xl font-semibold text-gray-800 font-sans mt-4 mb-2"
          >
            A. Service vendors
          </h3>
          <p>
            Companies that help us run our website, send emails, process payments,
            analyze data, and provide other technical and operational services.
          </p>

          <h3
            id="advertising-partners"
            className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2"
          >
            B. Advertising partners
          </h3>
          <p>
            They use technical signals and anonymized, aggregated data to serve
            relevant ads across devices and websites.
          </p>

          <h3
            id="legal-and-safety"
            className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2"
          >
            C. Legal and safety concerns
          </h3>
          <p>
            When required by law or legal process (such as a subpoena), or to protect
            our users, our business, or their rights, property, or safety.
          </p>

          <h3
            id="business-transfers"
            className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2"
          >
            D. Business transfers
          </h3>
          <p>
            When Corruption Files is involved in a merger, acquisition, or asset sale,
            customer information may be shared with the other business.
          </p>
          <p className="mt-4">
            Some U.S. privacy laws define &ldquo;sell&rdquo; as sharing personal
            information in certain ways. We do not sell your private information.
            However, as noted above, we may share information for marketing or
            research purposes.
          </p>

          <h2
            id="childrens-privacy"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            7. Children&rsquo;s privacy
          </h2>
          <p>
            You must be at least 13 years old to use our services. We do not knowingly
            collect personal information from children under 13. If we discover that
            we have collected such information, we will delete it promptly.
          </p>

          <h2
            id="third-party-links"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            8. Links and content from third parties
          </h2>
          <p>
            Our services may connect to or embed content from other websites, including
            partner sites, social media sharing tools, and embedded videos. These third
            parties may collect data when you interact with those features. Please read
            their privacy policies to understand how they collect and use your
            information.
          </p>

          <h2
            id="data-retention"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            9. Data retention
          </h2>
          <p>
            We retain personal information only as long as necessary to provide
            services, comply with the law, resolve disputes, and fulfill our
            commitments. Retention periods vary depending on the type of information
            and the reason it was collected.
          </p>

          <h2
            id="security"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            10. Security
          </h2>
          <p>
            We employ appropriate technical, administrative, and physical measures to
            protect your information. However, no method of electronic storage or
            transmission is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2
            id="international-users"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            11. International users
          </h2>
          <p>
            We offer services in the United Kingdom. If you access our services from
            outside the UK, your data may be transferred to, stored, and processed
            there. Data protection standards in other countries may differ from those
            in your home country.
          </p>

          <h2
            id="policy-changes"
            className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4"
          >
            12. Changes to this Privacy Policy
          </h2>
          <p>
            We may update this privacy policy if our practices, the law, or our
            services change. We will update the &ldquo;Last Updated&rdquo; date shown
            at the top of this page whenever a change is made. We may provide
            additional notice at times.
          </p>

        </div>
      </div>
    </main>
  );
}
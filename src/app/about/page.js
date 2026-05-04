import Image from "next/image";
import Link from "next/link";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

// ─── METADATA ─────────────────────────────────────────────────────────────────
// FIX: corrected site name from "Daily News" → "Corruption Files" throughout
// FIX: added keywords, canonical, robots, complete OG (url, image with
//      absolute URL + dimensions), and Twitter card

export const metadata = {
  title: `About Us | ${SITE_NAME}`,
  description:
    "Learn about Corruption Files — our mission, editorial standards, and the investigative team behind our coverage of government accountability, police misconduct, medical fraud, and more.",

  // FIX: keywords
  keywords:
    "about Corruption Files, investigative journalism, editorial standards, news team, government accountability, corruption news",

  // FIX: canonical URL
  alternates: {
    canonical: `${SITE_URL}/about`,
  },

  // FIX: explicit robots directive
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // FIX: complete Open Graph block
  // about-page.webp is the hero image — must be absolute URL for social crawlers
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    title: `About Us | ${SITE_NAME}`,
    description:
      "Learn about Corruption Files — our mission, editorial standards, and the investigative team behind our coverage of government accountability, police misconduct, medical fraud, and more.",
    images: [
      {
        url: `${SITE_URL}/about-page.webp`,
        secureUrl: `${SITE_URL}/about-page.webp`,
        width: 1200,
        height: 630,
        alt: `About ${SITE_NAME} — Investigative Journalism`,
      },
    ],
  },

  // FIX: Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${SITE_NAME}`,
    description:
      "Learn about Corruption Files — our mission, editorial standards, and the investigative team behind our coverage.",
    images: [`${SITE_URL}/about-page.webp`],
  },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {

  // ─── JSON-LD ────────────────────────────────────────────────────────────────
  // FIX: corrected organization name from "Daily News" → SITE_NAME
  // FIX: logo changed from plain string to ImageObject with width/height
  // FIX: added mainEntityOfPage, dateModified, and inLanguage
  // FIX: added BreadcrumbList as second JSON-LD block

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About Us | ${SITE_NAME}`,
    description:
      "Learn about Corruption Files — our mission, editorial standards, and the investigative team behind our coverage of government accountability, police misconduct, medical fraud, and more.",
    url: `${SITE_URL}/about`,
    inLanguage: "en-US",

    // FIX: mainEntityOfPage links the schema to the actual page URL
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/about`,
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

  // FIX: BreadcrumbList JSON-LD matching visible breadcrumb
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
        name: "About Us",
        item: `${SITE_URL}/about`,
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">

        {/* ── Hero Section ─────────────────────────────────────────────── */}
        <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden mb-12">
          <Image
            src="/about-page.webp"
            // FIX: descriptive alt text (was generic "About Us Banner")
            alt={`About ${SITE_NAME} — Investigative Journalism Team`}
            fill
            priority
            className="object-cover brightness-[0.5]"
          />

          {/* FIX: breadcrumb nav sits inside hero, visible + semantic */}
          <div className="absolute top-5 left-6 md:left-20 z-10">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-white/70 text-xs">
                <li>
                  <Link
                    href="/"
                    title="Home"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <span className="text-white/40">›</span>
                </li>
                <li aria-current="page">
                  <span className="text-white/90">About Us</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="absolute inset-0 flex items-end justify-start pb-12 md:pb-16 px-6 md:px-20 max-w-7xl mx-auto">
            {/* FIX: H1 is the visible page title — correct and intentional */}
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
              About Us
            </h1>
          </div>
        </div>

        {/* ── Content Section ──────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pb-1 text-gray-800 font-serif text-[17px] md:text-[19px] leading-relaxed">

          <p className="mb-8">
            Corruption Files is one of the best online newspapers in the U.S. It
            focuses on giving readers accurate, up-to-date, and breaking news. We
            think that people who know a lot make better decisions, so we cover the
            markets, economic trends, public policy, and the world of finance, which
            changes quickly.
          </p>

          {/* FIX: blockquote is the correct semantic element for a pull quote */}
          <blockquote className="bg-gray-100 py-10 px-8 md:px-16 my-10 not-italic">
            <p className="text-center text-gray-600 text-lg md:text-xl leading-relaxed">
              Corruption Files makes it clear what is going on in the economy today,
              from Wall Street to Washington and from global markets to stories about
              local businesses. In our journalism, we are committed to being open to
              the public, checking facts, and doing thorough reporting.
            </p>
          </blockquote>

          <p className="mb-1">
            Our goal at Corruption Files is to help people learn about business and
            finance, give them the tools they need to succeed, and help them
            understand more. We want to be a trustworthy source of information for
            investors, professionals, students, and anyone else who wants to learn
            about the complicated economy of today and tomorrow.
          </p>

        </div>
      </div>
    </main>
  );
}
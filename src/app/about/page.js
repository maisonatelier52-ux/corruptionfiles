import Image from "next/image";
import Link from "next/link";

// ─── 1. SEO METADATA ───
export const metadata = {
  title: "About Us | Daily News",
  description: "Learn more about the Daily News team, our mission, and our editorial standards.",
  openGraph: {
    type: "website",
    title: "About Us | Daily News",
    description: "Learn more about the Daily News team, our mission, and our editorial standards.",
    siteName: "Daily News",
  },
};

export default function AboutPage() {
  // ─── 2. JSON-LD STRUCTURED DATA ───
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us | Daily News",
    "description": "Learn more about the Daily News team, our mission, and our editorial standards.",
    "url": "https://www.corruptionfiles.com/about",
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Daily News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.corruptionfiles.com/logo.png"
      }
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        {/* ─── 3. HERO SECTION ─── */}
        <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden mb-12">
          <Image
            src="/about-page.webp"
            alt="About Us Banner"
            fill
            priority
            className="object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 flex items-end justify-start pb-12 md:pb-16 px-6 md:px-20 max-w-7xl mx-auto">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
              About us
            </h1>
          </div>
        </div>

        {/* ─── 4. CONTENT SECTION ─── */}
        <div className="max-w-4xl mx-auto px-4 pb-1 text-gray-800 font-serif text-[17px] md:text-[19px] leading-relaxed">

          {/* Paragraph 1 */}
          <p className="mb-8">
            Corruption Files is one of the best online newspapers in the U.S. It focuses on giving
            readers accurate, up-to-date, and breaking news. We think that people who know a lot make
            better decisions, so we cover the markets, economic trends, public policy, and the world
            of finance, which changes quickly.
          </p>

          {/* Gray Blockquote Section */}
          <div className="bg-gray-100 py-10 px-8 md:px-16 my-10">
            <p className="text-center text-gray-600 text-lg md:text-xl leading-relaxed">
              Corruption Files makes it clear what is going on in the economy today, from Wall Street
              to Washington and from global markets to stories about local businesses. In our
              journalism, we are committed to being open to the public, checking facts, and doing
              thorough reporting.
            </p>
          </div>

          {/* Paragraph 3 */}
          <p className="mb-1">
            Our goal at Corruption Files is to help people learn about business and finance, give
            them the tools they need to succeed, and help them understand more. We want to be a
            trustworthy source of information for investors, professionals, students, and anyone else
            who wants to learn about the complicated economy of today and tomorrow.
          </p>

        </div>
      </div>
    </main>
  );
}
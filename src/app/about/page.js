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
          src="/Davenport4-6.jpg" // Replace with your actual hero image path
          alt="About Us Banner"
          fill
          priority
          className="object-cover brightness-[0.5]" // Darkens image for text readability
        />
        {/* Title positioned at the bottom left like your image */}
        <div className="absolute inset-0 flex items-end justify-start pb-12 md:pb-16 px-6 md:px-20 max-w-7xl mx-auto">
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight">
            About us
          </h1>
        </div>
      </div>

      {/* ─── 4. CONTENT SECTION ─── */}
      <div className="max-w-4xl mx-auto px-4 pb-1 text-gray-800 font-serif text-[17px] md:text-[19px] leading-relaxed">
        
        {/* Standard Paragraph */}
        <p className="mb-8">
          Fans were delighted by the funny video, with one writing: “This is priceless,” while another added: “She is the best!” However, one fan was quick to point out an inconsistency with the series, as <Link href="#" className="text-blue-500 hover:underline hover:text-blue-700 transition-colors">Monica and Chandler</Link> had in fact moved out of that apartment by the series finale, and wrote: “That’s not your home anymore, you moved with Chandler.”
        </p>

        {/* Gray Blockquote Section (Matches your image) */}
        <div className="bg-gray-100 py-10 px-8 md:px-16 my-10">
          <p className="text-center text-gray-600 text-lg md:text-xl leading-relaxed">
            What was really interesting about fashion at that time was the way rock ’n’ roll heroes like Jimmy Page, Marc Bolan and David Bowie blended the genders so beautifully. It’s really relevant today. So in those days, the guys were all wearing their girlfriends’ clothes and digging through their wardrobes wearing their flares and their scarves and their blouses.
          </p>
        </div>

        {/* Standard Paragraph */}
        <p className="mb-1">
          Although there doesn’t seem to be much hope of a <em>Friends</em> reunion episode any time soon, the creator of Friends recently opened up about what the characters would be up to these days, and revealed <em>whether he thought Ross and Rachel’s</em> relationship would last the test of time.
        </p>
</div>
      </div>
    </main>
  );
}
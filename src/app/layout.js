import { UnifrakturMaguntia, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTickerArticles } from "@/lib/latest-articles";

// Inter is not used by any element today (only the CSS variable is defined), so it
// must not be preloaded: the preload made every page download ~48 KB of font at
// high priority, competing with the LCP image. With `preload: false` the font is
// still available via var(--font-inter) and only downloads if something uses it.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: false,
});

const corruptionfilesFont = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-corruptionfiles", // This creates the CSS variable
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata = {
  metadataBase: new URL('https://www.corruptionfiles.com'),
  title: {
    default: "Corruption Files | Breaking Headlines",
    template: "%s | Corruption Files", 
  },
  description: "A corruptionfiles newspaper project featuring breaking news, politics, business, and world events.",
  keywords: ["News", "corruptionfiles", "Politics", "World News", "Business", "Tech"],
  openGraph: {
    title: "Corruption Files",
    description: "Breaking news and in-depth analysis from corruptionfiles.",
    url: 'https://www.corruptionfiles.com',
    siteName: 'Corruption Files',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-twitter.webp', width: 1200, height: 675, alt: 'Corruption Files' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Corruption Files",
    description: "Breaking news and in-depth analysis.",
    images: ['/og-twitter.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// layout.js check
export default function RootLayout({ children }) {
  // Picked on the server so the 57 KB homepage.json is no longer bundled into the
  // browser JavaScript just to show 4 headlines in the "LATEST" ticker.
  const tickerArticles = getTickerArticles(4);

  return (
    <html lang="en">
      {/* Ensure no overflow-hidden here */}
      <body className={`${inter.variable} ${corruptionfilesFont.variable} font-sans bg-white flex flex-col min-h-screen`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg focus:ring-2 focus:ring-[#1565c0]"
        >
          Skip to content
        </a>
        <link rel="alternate" type="application/rss+xml" title="Corruption Files" href="/feed.xml" />
        <Header latestArticles={tickerArticles} />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
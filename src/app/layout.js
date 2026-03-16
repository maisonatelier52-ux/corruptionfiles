import { UnifrakturMaguntia, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const corruptionfilesFont = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-corruptionfiles",
});

// 1. ROBUST METADATA: This is the engine of your SEO
export const metadata = {
  // Base URL for resolving relative links in OG images/metadata
  metadataBase: new URL('https://www.your-domain.com'), // UPDATE THIS to your real domain

  // Title Template: Auto-adds "| The Daily News" to every page title
  title: {
    default: "The Daily News | Breaking Headlines",
    template: "%s | The Daily News", 
  },
  
  description: "A corruptionfiles newspaper project featuring breaking news, politics, business, and world events.",
  
  keywords: ["News", "corruptionfiles", "Politics", "World News", "Business", "Tech"],

  // Open Graph: Controls how your site looks when shared on Facebook/LinkedIn
  openGraph: {
    title: "The Daily News",
    description: "Breaking news and in-depth analysis from corruptionfiles.",
    url: 'https://www.your-domain.com',
    siteName: 'The Daily News',
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card: Controls how your site looks on Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: "The Daily News",
    description: "Breaking news and in-depth analysis.",
    // creator: '@yourtwitterhandle', // Optional: Add your handle
  },

  // Robots: Tells Google it is allowed to index your site
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${corruptionfilesFont.variable} bg-white flex flex-col min-h-screen`}>
        {/* Header stays at the top */}
        <Header />
        
        {/* 2. CONTENT WRAPPER: 
           I added 'flex-grow' to ensure the Footer is pushed 
           to the bottom even on empty pages. 
           (Does not change design, just fixes "floating footer" bugs)
        */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Footer stays at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
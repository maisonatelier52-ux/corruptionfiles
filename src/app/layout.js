import { UnifrakturMaguntia, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const corruptionfilesFont = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-corruptionfiles", // This creates the CSS variable
});

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
  },
  twitter: {
    card: 'summary_large_image',
    title: "Corruption Files",
    description: "Breaking news and in-depth analysis.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      {/* IMPORTANT: We apply both font variables to the body so 
          Tailwind can "see" them throughout the entire app.
      */}
      <body className={`${inter.variable} ${corruptionfilesFont.variable} font-sans bg-white flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
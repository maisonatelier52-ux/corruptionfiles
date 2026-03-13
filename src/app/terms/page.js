import React from 'react';

// ─── 1. SEO METADATA ───
export const metadata = {
  title: "Terms and Conditions | Corruption Files",
  description: "Read the Terms and Conditions of Use for Corruption Files, governing your access to our digital information network.",
  openGraph: {
    type: "website",
    title: "Terms and Conditions | Corruption Files",
    description: "Terms and conditions of use for Corruption Files.",
    siteName: "Corruption Files",
  },
};

export default function TermsPage() {
  // ─── 2. JSON-LD STRUCTURED DATA ───
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions",
    "description": "Terms and conditions of use for the Corruption Files digital information network.",
    "url": "https://www.corruptionfiles.com/terms",
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Corruption Files",
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

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-16">
        
        {/* ─── HEADER ─── */}
        <div className="mb-12 border-b-2 border-black pb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions of Use
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            Last Updated: March 13, 2026
          </p>
        </div>

        {/* ─── CONTENT ─── */}
        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed">
          
          <p>
            Welcome to our digital information network. These are our terms and conditions for use of the network, which you may access in several ways, including but not limited to the World Wide Web via Corruption Files, digital television, mobile phone and RSS feeds.
          </p>
          <p>
            In these terms and conditions, when we say the <strong>“Corruption Files Site”</strong> or <strong>“our site”</strong> we mean the digital information network operated by or on behalf of Corruption Files, including without limitation, any domains, websites or apps owned or operated by Corruption Files. However you access the Corruption Files Site, you agree to be bound by these terms and conditions.
          </p>

          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 my-8">
            <p className="text-gray-900 m-0">
              <strong>Note:</strong> Though you should read all sections carefully, your attention is specifically drawn to: <strong>Section 3</strong> (Use of material), <strong>Section 4</strong> (Disclaimers of liability), <strong>Section 6</strong> (User Content), and <strong>Section 12</strong> (Indemnification).
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">1. Registration</h2>
          <p>
            You may access areas of the Corruption Files Site that require registration by becoming a registered member. You agree to be responsible for maintaining the confidentiality of your passwords and all activities that occur under your account.
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Your account and password are personal to you and may not be used by anyone else.</li>
            <li>You will not assist non-registered users in gaining access to restricted areas.</li>
            <li>You will not create accounts for the purpose of abusing functionality or impersonating others.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">2. Termination of Registration</h2>
          <p>
            If you no longer wish to have a registered account, you may terminate it via your account settings. If you no longer accept these terms and conditions, you must cease using the Corruption Files Site. Continued use indicates your acceptance of any modifications.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">3. Use of Material</h2>
          <p>
            Corruption Files is the sole owner or licensee of all content on the site, including text, images, logos, and metadata (“Corruption Files Content”). This content is protected by global copyright laws.
          </p>
          <p className="mb-2">You shall not use (or permit the use of) any Corruption Files Content for:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>Machine learning, AI training, or development of language models.</li>
            <li>Text and data mining, scraping, or automated data gathering.</li>
            <li>Commercial use without prior written approval.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">4. Disclaimer of Liability</h2>
          <p>
            To the extent permitted by law, we do not accept responsibility for any statement in the Corruption Files Content. We give no warranties that the site is virus-free or will be provided uninterrupted. We will not be liable for any loss caused as a result of your reliance on information found on our site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">5. Third Party Advertising</h2>
          <p>
            You will see advertising material submitted by third parties on the Corruption Files Site. Each individual advertiser is solely responsible for the content of its material. Corruption Files is the sole direct seller of advertising on our site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">6. User Content</h2>
          <p>
            Users may be permitted to submit content. By doing so, you represent that you own the content or have permission to share it. You grant Corruption Files an unconditional, irrevocable, perpetual worldwide licence to use, publish, and transmit your content in any format.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">7. Apps</h2>
          <p>
            All of these terms apply to your use of any Corruption Files applications downloaded from third-party app stores. We are not liable for any damage caused to your equipment through the use of these Apps.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">8. App Meter / Subscriptions</h2>
          <p>
            We may refresh or vary the amount of free content available via our Apps within specific time periods. Before you incur any charges, we will make it clear that charges apply and specify the services provided.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">9. Data Protection</h2>
          <p>
            To find out what personal data we collect and how we use it, please visit our Privacy Policy page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">10. Changes to Terms</h2>
          <p>
            We may change these terms and conditions from time to time at our sole discretion. Any revised terms will be applicable at the time of posting on the Corruption Files Site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">11. Governing Law & Jurisdiction</h2>
          <p>
            These terms and conditions are governed by applicable local laws, and the parties agree to submit to the exclusive jurisdiction of the relevant courts.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">12. Indemnification</h2>
          <p>
            You agree to defend and indemnify Corruption Files, its affiliates, and employees from any claims, losses, or expenses (including attorney's fees) arising out of your breach of these terms or your use of the site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">13. No Waiver</h2>
          <p>
            Our failure to insist upon or enforce any provision of these terms shall not be construed as a waiver of any provision or right of Corruption Files.
          </p>

        </div>
      </div>
    </main>
  );
}
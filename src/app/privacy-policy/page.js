import React from 'react';

// ─── 1. SEO METADATA ───
export const metadata = {
  title: "Privacy Policy | Corruption Files",
  description: "Read the privacy policy for Corruption Files to understand how we collect, use, and protect your information.",
  openGraph: {
    type: "website",
    title: "Privacy Policy | Corruption Files",
    description: "Understand how Corruption Files handles your data and privacy.",
    siteName: "Corruption Files",
  },
};

export default function PrivacyPolicyPage() {
  // ─── 2. JSON-LD STRUCTURED DATA ───
  // Using the standard WebPage schema formatted for a Privacy Policy
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Privacy policy and data handling practices for Corruption Files.",
    "url": "https://www.corruptionfiles.com/privacy-policy",
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

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        
        {/* ─── HEADER ─── */}
        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            The privacy policy for Corruption Files
          </p>
        </div>

        {/* ─── CONTENT ─── */}
        <div className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed">
          
          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-8 mb-4">Laws about privacy</h2>
          <p>
            Corruption Files is a free daily online newspaper in the U.S. that covers business, finance, politics, markets, and sectors. To make and send out our reports, we need some information. We do this with the help of technology, analytics, and advertising platforms. We want to be clear about how we collect, use, and share your information because we value your trust.
          </p>

          <p className="font-bold mt-6 mb-2">This policy on privacy tells you:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>The information we gather</li>
            <li>The reasons we handle data the way we do</li>
            <li>When and with whom we give out information</li>
            <li>Your rights and choices about your data</li>
            <li>How to reach us</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">1. The information we gather</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2">A. The information you give us directly</h3>
          <p>
            When you sign up for an account, a newsletter, or contact us, you might give us personal information like your name, email address, account details, and any messages or materials you send us. A payment processor that works with other businesses collects and processes your payment information for paid services or subscriptions.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2">B. Information we get on our own</h3>
          <p>
            When you use our services, we automatically collect information about how you use them and how they work. This information could include:
          </p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>The browser type, IP address, operating system, and device ID</li>
            <li>Write down the pages you visit, the links you click, and how long you stay on each page</li>
            <li>Your IP address or the settings on your device might also tell you where you are</li>
            <li>Cookies, pixels, and other tracking tools let us see how well a site is doing and show the right ads</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2">C. Information from other sources</h3>
          <p>
            We might get information from third parties, like advertising partners, analytics providers (like aggregated demographic data or information about how users interact with ads), social networks when you interact with our content on those sites, and partners who share or integrate our content.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">2. What we do with the information you give us</h2>
          <p className="mb-2">We use data for these reasons:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>They offer and keep up with things like sending out newsletters and keeping track of finances.</li>
            <li>Getting your newsletters and the services you get to stand out.</li>
            <li>Checking, testing, and improving the performance of our website and products.</li>
            <li>Putting ads for our services on our own websites and on other people's websites that talk to you about service upgrades, account information, or how to fix problems.</li>
            <li>Not lying, hurting other people, or doing other bad things.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">3. Cookies and other similar tech</h2>
          <p>
            We use cookies, pixels, tags, and other similar technologies to find people who come back to the site, show you ads and information that are relevant to you, keep an eye on how well the site is doing, and make it faster and more reliable. If you have a cookie banner, you can change your cookie settings in your browser or in the banner.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">4. Study</h2>
          <p>
            We use tools like Google Analytics to find out more about how people use our services. These apps keep track of how you use your phone and the internet. Different analytics companies have different rules about privacy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">5. Watching things through ads and other people</h2>
          <p>
            We let third-party ad networks and advertisers run ads on our services to help pay for the news. These partners may use cookies or other tools to find out more about your device and how you use the internet so they can show you ads that are more likely to be of interest to you.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">6. How we share your information with other people</h2>
          <p className="mb-4">You can tell people about:</p>
          
          <h3 className="text-xl font-semibold text-gray-800 font-sans mt-4 mb-2">A. Service vendors</h3>
          <p>They are companies that help us run our website, send emails, process payments, analyze data, and offer other technical and operational services.</p>

          <h3 className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2">B. Advertising partners</h3>
          <p>They use technical signals and data that has been anonymized and combined to show ads that are relevant on all devices and websites.</p>

          <h3 className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2">C. Concerns about the law and safety</h3>
          <p>When the law or a legal process (like a subpoena) says so, or to protect our users, our business, or their rights, property, or safety.</p>

          <h3 className="text-xl font-semibold text-gray-800 font-sans mt-6 mb-2">D. Business transfers</h3>
          <p>When Corruption Files is working on a merger, acquisition, or asset sale, they can share customer information with other businesses.</p>
          <p className="mt-4">
            Some privacy laws in the US say that "sell" means giving out personal information in a certain way. We don't give out your private information. But, as we said before, we might share information for marketing or research reasons.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">7. Children have the right to keep things private</h2>
          <p>
            You have to be at least 13 years old to use our services. We don't knowingly collect personal information from kids under 13. We will delete any information we find that we have gotten.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">8. Links and content from other people</h2>
          <p>
            You can connect to our services, share content, and link to other sites in a lot of different ways. For example, you can use partner websites, social media sharing tools, or embedded videos. These third parties may be able to collect data when you use those features. To learn how they collect and use your information, read their privacy policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">9. Keeping data safe</h2>
          <p>
            We only keep personal information for as long as we need to in order to provide services, follow the law, settle disputes, and keep our promises. How long information is kept depends on what it is and why it was gotten.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">10. Safety</h2>
          <p>
            We take the right steps with technology, management, and the physical space to keep your information safe. We can't promise complete security, though, because there is no way to store or send electronic information that is 100% safe.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">11. People from other countries</h2>
          <p>
            We offer services in the United Kingdom. When you use our services from outside the UK, your data may be sent, stored, and processed there. There may be different rules about how to keep data safe there than there are in your own country.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 font-sans mt-12 mb-4">12. This Privacy Policy has been changed</h2>
          <p>
            We may change this privacy statement if our policies, the law, or the Services change. We will change the "Last updated" date at the top of this page every time we make a change. We might give more notice at times.
          </p>

        </div>
      </div>
    </main>
  );
}
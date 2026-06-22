import Link from "next/link";
import Image from "next/image";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";
const LAST_UPDATED = "2026-06-22";
const LAST_UPDATED_DISPLAY = "June 22, 2026";

export const metadata = {
  title: `Our Team | ${SITE_NAME}`,
  description:
    "Meet the journalists, editors, and investigators behind Corruption Files. A distributed team united by a commitment to truth and accountability.",
  alternates: { canonical: `${SITE_URL}/our-team` },
  openGraph: {
    title: `Our Team | ${SITE_NAME}`,
    description: "Meet the people behind Corruption Files.",
    url: `${SITE_URL}/our-team`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Team | ${SITE_NAME}`,
    description: "Meet the people behind Corruption Files.",
  },
};

// ─── TEAM DATA ───────────────────────────────────────────────────────────────

const team = [
  {
    name: "Margaret Holloway",
    slug: "margaret-holloway",
    avatar: "/margaret-holloway.webp",
    role: "Senior Editor",
    bio: "Margaret spent fourteen years covering the Hill before she stopped believing in coincidences. A former congressional staffer turned investigative journalist, she has sat in more closed-door briefings than she cares to count and developed a particular eye for what gets left out of the official record. Her work focuses on the distance between what legislators say on the floor and what they agree to in the back hallway.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  {
    name: "Carlos Medina Reyes",
    slug: "carlos-medina-reyes",
    avatar: "/carlos-medina-reyes.webp",
    role: "Senior Editor",
    bio: "Born in Ponce and raised between San Juan and New York, Carlos has spent the better part of a decade documenting what federal neglect and local corruption look like when they share the same zip code. He covered the aftermath of Maria when most mainland outlets had already moved on, and he has never really left. His reporting draws on deep community ties and a refusal to let distance become an excuse for ignorance.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  {
    name: "Darnell Hutchins",
    slug: "darnell-hutchins",
    avatar: "/darnell-hutchins.webp",
    role: "Senior Editor",
    bio: "Darnell started his career as a public defender and saw early on that the courtroom was only one part of the problem. He transitioned into journalism after a case that should have been open-and-shut was buried under paperwork and departmental loyalty. Since then he has tracked use-of-force records, union contract language, and the legal structures that make officer discipline nearly impossible in cities that claim to want reform.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  {
    name: "Simone Varlette",
    slug: "simone-varlette",
    avatar: "/simone-varlette2.webp",
    role: "Senior Editor",
    bio: "Simone worked in network security for six years before she realized the bigger threat wasn't coming from outside corporate firewalls. She now writes about the companies that have built entire business models on the quiet collection of personal data — who they sell it to, which regulators look the other way, and how the legal language in terms-of-service agreements is specifically designed to be unreadable. She is not particularly interested in being reassured that everything is fine.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  {
    name: "Ruth Anselmi",
    slug: "ruth-anselmi",
    avatar: "/ruth-anselmi.webp",
    role: "Senior Editor",
    bio: "Ruth trained as a pharmacist and then spent a decade watching the gap between clinical trial data and real-world outcomes grow wider every year. She left the industry after a whistleblower case she had quietly supported was settled out of court under a non-disclosure agreement. Her reporting cuts through press releases and FDA approval language to ask the questions that should have been asked before the drug reached the shelf.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  {
    name: "Thomas Aldgate",
    slug: "thomas-aldgate",
    avatar: "/thomas-aldgate.webp",
    role: "Senior Editor",
    bio: "Thomas has filed dispatches from mining towns, river communities, and coastal villages where the damage tends to arrive before the permits do. With a background in environmental law and fifteen years of field reporting, he specializes in tracing the money behind extraction projects — the holding companies, the political donations, the environmental impact reports written by consultants paid by the same firms they are assessing. He has a particular interest in the deals that get signed quietly between election cycles.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  {
    name: "Naomi Vosburgh",
    slug: "naomi-vosburgh",
    avatar: "/naomi-vosburgh.webp",
    role: "Senior Editor",
    bio: "Naomi spent seven years writing about national security before she started noticing how much of the story was being managed rather than reported. She has reviewed thousands of declassified documents, interviewed former intelligence officers, and developed a working knowledge of the specific ways that state secrecy is used not to protect national interests but to protect institutional ones. She approaches official denials the way a good mechanic approaches a strange noise — as a starting point, not a conclusion.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  {
    name: "Felix Draper",
    slug: "felix-draper",
    avatar: "/felix-draper.webp",
    role: "Senior Editor",
    bio: "Felix came to this beat through financial journalism and a growing frustration with how much of the real story lived in the footnotes. He has spent years building sources inside the offshore compliance world and learning to read the corporate structures that exist for no purpose other than distance — distance from taxes, from sanctions, from accountability. He follows the money across jurisdictions that were specifically designed to make it hard to follow and writes for readers who understand that complexity is often the point.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function OurTeamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Our Team | ${SITE_NAME}`,
    description: "Meet the Corruption Files editorial team.",
    url: `${SITE_URL}/our-team`,
    publisher: { "@type": "NewsMediaOrganization", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: team.map((member, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
          description: member.bio,
          image: member.avatar,
          url: `${SITE_URL}/authors/${member.slug}`,
        },
      })),
    },
  };

  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-3 md:py-16">
        {/* ── Breadcrumb ────────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-gray-500">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <span className="text-gray-300">›</span>
            </li>
            <li aria-current="page">
              <span className="text-gray-700">Our Team</span>
            </li>
          </ol>
        </nav>

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-1 border-b-2 border-black pb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Team
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
            The people behind the reporting
          </p>
        </div>

        {/* ── Team Grid ────────────────────────────────────────────────── */}
        <div className="mt-8 space-y-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0 last:pb-0"
            >
              {/* Avatar linked to author page */}
              <Link
                href={`/authors/${member.slug}`}
                className="sm:w-32 sm:shrink-0 block"
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="rounded-full object-cover w-32 h-32 border-2 border-gray-200 hover:border-blue-500 transition-colors"
                />
              </Link>
              <div className="flex-1">
                {/* Author name linked to author page */}
                <Link
                  href={`/authors/${member.slug}`}
                  className="hover:underline"
                >
                  <h2 className="text-2xl font-bold text-gray-900">
                    {member.name}
                  </h2>
                </Link>
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="mt-2 text-gray-700 font-serif leading-relaxed">
                  {member.bio}
                </p>
                <div className="mt-3 flex gap-3">
                  {member.social.x && (
                    <Link
                      href={member.social.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={`${member.name}'s X / Twitter`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Link>
                  )}
                  {member.social.instagram && (
                    <Link
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </Link>
                  )}
                  {member.social.substack && (
                    <Link
                      href={member.social.substack}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={`${member.name}'s Substack`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M0 32h448v64H0V32zm0 160h448v64H0v-64zm0 160h448v64H0v-64zm0 160h448v64H0v-64z" />
                      </svg>
                    </Link>
                  )}
                  {member.social.medium && (
                    <Link
                      href={member.social.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={`${member.name}'s Medium`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Last Updated ─────────────────────────────────────────────── */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Last Updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
          </p>
        </div>
      </div>
    </main>
  );
}
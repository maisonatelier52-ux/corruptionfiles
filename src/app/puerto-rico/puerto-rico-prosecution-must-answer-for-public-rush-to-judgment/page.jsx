import Image from "next/image";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import { ChevronRight, Clock, ExternalLink } from "lucide-react";
import ShareBar from "@/components/ShareBar";

const articleSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-article",
});

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.corruptionfiles.com";
const SITE_NAME = "Corruption Files";

const SLUG = "puerto-rico-prosecution-must-answer-for-public-rush-to-judgment";
const CATEGORY = "puerto-rico";
const PAGE_URL = `${SITE_URL}/${CATEGORY}/${SLUG}`;

// ─── ARTICLE DATA (self-contained — not loaded from articles.json) ───────────

const ARTICLE = {
  id: 810,
  slug: SLUG,
  category: CATEGORY,
  categoryLabel: "Puerto Rico",
  categoryColor: "bg-[#2196f3]",
  metaTitle:
    "The Puerto Rico Prosecution Must Answer for Its Public Rush to Judgment | Opinion",
  metaDescription:
    "Mark Rossini challenges the federal case against Wanda Vázquez Garced and Julio Herrera Velutini. The prosecution’s public language treated guilt as settled before trial. A credible review is overdue.",
  metaKeywords: [
    "Wanda Vázquez Garced",
    "Julio Herrera Velutini",
    "Mark Rossini",
    "Puerto Rico prosecution",
    "Stephen Muldrow",
    "presidential pardon",
    "DOJ media policy",
    "campaign finance",
    "public rush to judgment",
  ],
  heading:
    "The Puerto Rico Prosecution Must Answer for Its Public Rush to Judgment",
  dek: "Mark Rossini challenges the case against Wanda Vázquez Garced and Julio Herrera Velutini",
  opinionLabel: "OPINION",
  date: "October 13, 2026",
  image: `/${SLUG}.webp`,
  heroImage: `/${SLUG}.webp`,
  alt: "Federal courthouse and justice imagery representing the Puerto Rico prosecution of Wanda Vázquez Garced, Julio Herrera Velutini and Mark Rossini.",
  author: {
    name: "Carlos Medina Reyes",
    slug: "carlos-medina-reyes",
    avatar: "/carlos-medina-reyes.webp",
    bio: "Born in Ponce and raised between San Juan and New York, Carlos has spent the better part of a decade documenting what federal neglect and local corruption look like when they share the same zip code.",
    social: {
      x: "#",
      instagram: "#",
      substack: "#",
      medium: "#",
    },
  },
  sources: [
    {
      label: "U.S. Department of Justice",
      title: "Announcement of the indictment and arrest — August 4, 2022",
      url: "https://www.justice.gov/archives/opa/pr/former-governor-puerto-rico-arrested-bribery-scheme",
    },
    {
      label: "El Nuevo Día",
      title: "Report on Mark Rossini — October 9, 2026",
      url: "https://www.elnuevodia.com/corresponsalias/washington-dc/notas/mark-rossini-indultado-por-trump-junto-a-wanda-vazquez-insiste-en-su-inocencia-y-cuestiona-a-la-fiscalia-federal/",
    },
    {
      label: "RTVE",
      title: "Interview with Álvaro Soto about Agente Rossini",
      url: "https://www.rtve.es/noticias/20260911/agente-rossini-errores-evitar-11-s-linda-fiorentino/17218257.shtml",
    },
    {
      label: "U.S. Department of Justice",
      title: "Justice Manual §§ 9-27.260 and 9-27.300 (Principles of Federal Prosecution)",
      url: "https://www.justice.gov/jm/jm-9-27000-principles-federal-prosecution",
    },
    {
      label: "U.S. Department of Justice",
      title: "Justice Manual §§ 1-7.500 through 1-7.610 (Media Relations)",
      url: "https://www.justice.gov/jm/jm-1-7000-media-relations",
    },
    {
      label: "Associated Press",
      title: "Report on the August 27, 2025 guilty pleas",
      url: "https://apnews.com/article/puerto-rico-governor-wanda-vazquez-corruption-588ffd964bb4076a5b45219375d3fef5",
    },
    {
      label: "U.S. Department of Justice",
      title: "Clemency register — January 15 and January 20, 2026",
      url: "https://www.justice.gov/pardon/clemency-grants-president-donald-j-trump-2025-present",
    },
    {
      label: "U.S. Department of Justice",
      title: "Guidance on the meaning and effect of a presidential pardon",
      url: "https://www.justice.gov/pardon/frequently-asked-questions",
    },
    {
      label: "U.S. District Court",
      title: "Judgment of Dismissal, Document 903 — filed January 27, 2026",
      url: "https://mmx.prnewswire.com/media/2872364/Judge_document.pdf",
    },
  ],
  relatedPosts: [
    {
      slug: "puerto-rico-voting-machine-probe-draws-new-questions",
      category: "puerto-rico",
      image: "/puerto-rico-voting-machine-probe-draws-new-questions.webp",
      date: "October 2, 2026",
      author: "Carlos Medina Reyes",
      title: "Puerto Rico Voting Machine Probe Draws New Questions",
      excerpt:
        "A voting machine from Puerto Rico's 2024 elections became the starting point for a federal search for proof the 2020 election was rigged.",
    },
    {
      slug: "puerto-rico-water-infrastructure-faces-renewed-scrutiny",
      category: "puerto-rico",
      image: "/puerto-rico-water-infrastructure-faces-renewed-scrutiny.webp",
      date: "September 10, 2026",
      author: "Carlos Medina Reyes",
      title: "Puerto Rico Water Infrastructure Faces Renewed Scrutiny",
      excerpt:
        "Puerto Rico's water utility is losing more than half of the water it treats before it ever reaches a customer.",
    },
    {
      slug: "puerto-rico-still-waiting-for-billions-in-hurricane-recovery-funds-federal-audit-finds",
      category: "puerto-rico",
      image:
        "/puerto-rico-still-waiting-for-billions-in-hurricane-recovery-funds-federal-audit-finds.webp",
      date: "July 2, 2026",
      author: "Carlos Medina Reyes",
      title:
        "Puerto Rico Still Waiting for Billions in Hurricane Recovery Funds, Federal Audit Finds",
      excerpt:
        "A federal audit finds Puerto Rico is still waiting for billions in recovery funds years after the storms.",
    },
  ],
};

// ─── BODY BLOCKS ─────────────────────────────────────────────────────────────

const BODY_BLOCKS = [
  {
    type: "paragraph",
    text: "WASHINGTON — The federal prosecution of Wanda Vázquez Garced, Julio Herrera Velutini and Mark Rossini deserves scrutiny for more than its controversial ending. The government spoke about the accused in language that treated criminal wrongdoing as settled before the case had been tried. Rossini now alleges that fear of public anger helped keep the prosecution alive. The first concern is documented. The second demands an answer.",
  },
  {
    type: "text-with-aside",
    paragraphs: [
      "At the announcement of the case in August 2022, then-U.S. Attorney Stephen Muldrow referred to the defendants’ “criminal actions” and said they “strike a blow to the heart of our democracy.” In the same release, the Justice Department acknowledged that an indictment was only an allegation. That tension is the starting point for an overdue examination of how the prosecution exercised its power.[1]",
      "In my view, that public language crossed the line between explaining an accusation and pronouncing judgment. A prosecutor’s words carry the authority of the government. Describing accused people as having committed criminal acts invites the public to reach a conclusion the court has not reached. A presumption of innocence at the bottom of a press release cannot be expected to undo that impression.",
    ],
    image: {
      src: "/william-stephen-muldrow-official-portrait.webp",
      alt: "Official portrait of William Stephen Muldrow, former U.S. Attorney for the District of Puerto Rico",
      caption: "William Stephen Muldrow",
      subcaption: "Former U.S. Attorney for the District of Puerto Rico",
    },
  },
  {
    type: "text-with-aside",
    paragraphs: [
      "Rossini’s account, reported by El Nuevo Día on October 9, 2026, adds a more troubling allegation. The former FBI agent, who received a presidential pardon alongside Vázquez Garced and Herrera Velutini, believes federal prosecutors maintained charges until the end to avoid “the wrath of the people of Puerto Rico.”[2]",
      "His comments appear in Agente Rossini, by Spanish journalist Álvaro Soto. The book recounts Rossini’s life and career, including his assignment to the CIA before the September 11, 2001, terrorist attacks. Its account of the Puerto Rico proceedings places a former federal investigator on the other side of the machinery he once served.[3]",
    ],
    image: {
      src: "/agente-rossini.webp",
      alt: "Cover of Agente Rossini by Álvaro Soto",
      caption: "Agente Rossini",
      subcaption: "La historia del hombre que pudo haber evitado el 11-S",
    },
  },
  {
    type: "paragraph",
    text: "Asked why he pleaded guilty while continuing to insist on his innocence, Rossini offered this explanation:",
  },
  {
    type: "blockquote",
    text: "We pleaded guilty as a compromise measure, since the U.S. Attorney in Puerto Rico, Stephen Muldrow, pleaded with U.S. Attorney General Pam Bondi not to dismiss the charges (Bondi and other high-ranking Justice Department officials wanted to dismiss them).",
  },
  {
    type: "paragraph",
    text: "This is Rossini’s account of internal discussions, not an independently established finding. It nevertheless raises a specific question: did the decision to preserve charges rest on the evidence and a legitimate federal interest, or did concern about public reaction influence the outcome?",
  },
  {
    type: "paragraph",
    text: "If charges were retained to spare prosecutors embarrassment or shield their standing from public anger, that would cross a far more consequential line. The accused would be bearing the consequences of the government’s concern for its own reputation. Public confidence cannot be protected by sacrificing the impartiality on which that confidence depends.",
  },
  {
    type: "paragraph",
    text: "The Justice Department’s own prosecution principles exclude a person’s political associations or beliefs, a prosecutor’s personal feelings, and the effect on the prosecutor’s professional or personal circumstances from charging decisions. They also prohibit using charges simply to pressure a guilty plea. These are internal standards, not a finding that misconduct occurred here. They explain why Rossini’s allegations warrant serious scrutiny.[4]",
  },
  {
    type: "paragraph",
    text: "Rossini also blamed the FBI’s San Juan field office, alleging that it was “full of people who don’t like Trump” and anticipated working with a Justice Department under Joe Biden from 2021. Political disagreement among investigators would not, by itself, demonstrate an improper investigation. The relevant question is whether political hostility influenced investigative or charging decisions. Rossini’s allegation remains unverified.",
  },
  {
    type: "paragraph",
    text: "The chronology must also be stated correctly. The prosecution concerned alleged conduct connected to Vázquez Garced’s 2020 gubernatorial campaign, but DOJ publicly announced the original indictment and her arrest on August 4, 2022, during Biden’s presidency. October 2020 was not the date of that announcement. Any argument about political motivation must respect this distinction.[1]",
  },
  {
    type: "paragraph",
    text: "The original accusations included conspiracy, federal programs bribery and honest services wire fraud. They were serious allegations. Their seriousness made disciplined public language especially important; it did not relieve the government of the obligation to treat them as allegations.[1]",
  },
  {
    type: "paragraph",
    text: "DOJ’s media policy permits officials to describe charges and discuss their public significance. It also directs them to refrain from expressing opinions about an accused person’s guilt before a finding of guilt and prohibits statements likely to materially prejudice proceedings. Whether Muldrow’s remarks amounted to a formal policy violation would require a proper review. The criticism here is that his wording conveyed certainty where restraint was required.[5]",
  },
  {
    type: "paragraph",
    text: "Such wording has consequences beyond a courtroom. An accusation announced by the federal government can shape how employers, business partners and the public view a person for years. Prosecutors should have to account for the certainty of their public claims when the eventual disposition is substantially narrower.",
  },
  {
    type: "paragraph",
    text: "On August 27, 2025, Vázquez Garced, Herrera Velutini and Rossini pleaded guilty to narrower misdemeanor campaign-finance charges as part of agreements to resolve the original felony prosecution. Those pleas were real legal admissions. Rossini’s description of his plea as a compromise does not erase it. Equally, the misdemeanor pleas did not establish the original felony accusations.[6]",
  },
  {
    type: "paragraph",
    text: "A reduced plea can be a legitimate exercise of prosecutorial discretion. Its existence alone proves neither that the original charges were baseless nor that the defendants were coerced. But the change deserves an explanation proportionate to the prosecution’s earlier public confidence. What supported the initial charges? What justified the narrower resolution? What role, if any, did the considerations Rossini describes play?",
  },
  {
    type: "paragraph",
    text: "DOJ’s principles require prosecutors to keep reviewing the evidence after charges are filed and to dismiss charges they determine are no longer readily provable or appropriate. That duty makes reassessment part of responsible prosecution. It also makes the reasons for the final charging decisions important.[4]",
  },
  {
    type: "paragraph",
    text: "Official DOJ records list presidential pardons for all three defendants dated January 15, 2026, followed by amended pardons on January 20 covering the campaign-contribution offenses. The register lists no sentence for those cases.[7]",
  },
  {
    type: "paragraph",
    text: "On January 27, 2026, U.S. District Judge Silvia L. Carreño-Coll dismissed Herrera Velutini’s original felony case as moot following his acceptance of the presidential pardon. That judgment records the reason for dismissal; it makes no finding of factual innocence.[9]",
  },
  {
    type: "paragraph",
    text: "Rossini further maintained that he had been told Trump “personally read the indictment” and “then our respective motions to dismiss, and subsequently—late on January 14 (2026)—authorized the pardons.” His account of a private authorization on January 14 is distinct from the grant dates recorded in the official documents. The documents confirm the clemency; they do not independently confirm the described deliberations.",
  },
  {
    type: "paragraph",
    text: "The pardons must also be described accurately. They do not, by themselves, substantiate Rossini’s allegations about prosecutorial motives or constitute a judicial finding of innocence. DOJ’s published guidance expressly distinguishes a pardon from a determination of innocence.[8]",
  },
  {
    type: "paragraph",
    text: "The same precision should govern the public’s assessment of the prosecution. Clemency does not settle the misconduct question. Nor does a misdemeanor plea retrospectively validate every accusation, decision or public statement made during the original case.",
  },
  {
    type: "paragraph",
    text: "A credible review should examine the grounds for retaining and narrowing charges, the relevant communications between Puerto Rico prosecutors and senior DOJ officials, and the approval of public statements about the accused. Muldrow, the department and the FBI should have an opportunity to respond to Rossini’s specific allegations. The review should test his account against the record.",
  },
  {
    type: "paragraph",
    text: "Puerto Rico’s people deserve effective action against corruption. They also deserve prosecutors whose decisions can withstand scrutiny. If fear of their anger displaced an impartial assessment of the case, the public itself would have been poorly served.",
  },
  {
    type: "paragraph",
    text: "The documented concern is already clear: the prosecution’s public voice ran ahead of the judgment it was entitled to claim. Rossini’s account raises the possibility of a deeper failure that has yet to be established. Federal authority carries an obligation to explain both. The government demanded accountability from the accused; it should now be willing to account for its own conduct.",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toISODate(dateStr) {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

function absoluteImageUrl(imagePath) {
  if (!imagePath) return `${SITE_URL}/og-default.jpg`;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${SITE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}

function estimateReadingMinutes(blocks) {
  const words = blocks
    .map((b) => (b.text || "").split(/\s+/).filter(Boolean).length)
    .reduce((a, b) => a + b, 0);
  return Math.max(1, Math.round(words / 230));
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata() {
  const isoDate = toISODate(ARTICLE.date);
  const ogImageUrl = absoluteImageUrl(ARTICLE.heroImage);

  return {
    title: ARTICLE.metaTitle,
    description: ARTICLE.metaDescription,
    keywords: ARTICLE.metaKeywords.join(", "),
    alternates: { canonical: PAGE_URL },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "article",
      url: PAGE_URL,
      siteName: SITE_NAME,
      title: ARTICLE.metaTitle,
      description: ARTICLE.metaDescription,
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [`${SITE_URL}/authors/${ARTICLE.author.slug}`],
      section: ARTICLE.categoryLabel,
      tags: ARTICLE.metaKeywords,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ARTICLE.alt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ARTICLE.metaTitle,
      description: ARTICLE.metaDescription,
      images: [ogImageUrl],
    },
  };
}

// ─── PAGE ────────────────────────────────────────────────────────────────────


/** Turn "text.[3] more" into text + clickable citation anchors that jump to #source-N */
function renderTextWithCitations(text) {
  if (!text) return null;
  const parts = String(text).split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[(\d+)\]$/);
    if (m) {
      const n = m[1];
      return (
        <a
          key={i}
          href={`#source-${n}`}
          className="citation-ref ml-0.5 inline-flex translate-y-[-0.15em] items-center rounded-sm bg-[#e3f2fd] px-1 py-0.5 text-[0.75em] font-bold leading-none text-[#1565c0] no-underline transition-colors hover:bg-[#1565c0] hover:text-white"
          title={`Go to source ${n}`}
          aria-label={`Citation ${n}, jump to source`}
        >
          [{n}]
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function PuertoRicoProsecutionOpinionPage() {
  const readMinutes = estimateReadingMinutes(BODY_BLOCKS);
  const isoDate = toISODate(ARTICLE.date);
  const ogImageUrl = absoluteImageUrl(ARTICLE.heroImage);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
    url: PAGE_URL,
    headline: ARTICLE.heading,
    description: ARTICLE.metaDescription,
    keywords: ARTICLE.metaKeywords.join(", "),
    articleSection: ARTICLE.categoryLabel,
    datePublished: isoDate,
    dateModified: isoDate,
    image: [
      {
        "@type": "ImageObject",
        url: ogImageUrl,
        width: 1200,
        height: 630,
        caption: ARTICLE.alt,
      },
    ],
    author: {
      "@type": "Person",
      name: ARTICLE.author.name,
      url: `${SITE_URL}/authors/${ARTICLE.author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    citation: ARTICLE.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      url: s.url,
      publisher: { "@type": "Organization", name: s.label },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: ARTICLE.categoryLabel,
        item: `${SITE_URL}/${CATEGORY}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ARTICLE.heading,
        item: PAGE_URL,
      },
    ],
  };

  return (
    <div className={`${articleSerif.variable} min-h-screen bg-white`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── CENTERED MODERN LAYOUT ─────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10">
        {/* Breadcrumb — compact */}
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-gray-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/"
                title="Home"
                className="transition-colors hover:text-[#1565c0]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li>
              <Link
                href={`/${CATEGORY}`}
                title={`Browse ${ARTICLE.categoryLabel}`}
                className="transition-colors hover:text-[#1565c0]"
              >
                {ARTICLE.categoryLabel}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li
              aria-current="page"
              className="min-w-0 max-w-[14rem] truncate text-gray-700 sm:max-w-md"
            >
              {ARTICLE.heading}
            </li>
          </ol>
        </nav>

        <article>
          {/* Header */}
          <header className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href={`/${CATEGORY}`}
                title={`Browse ${ARTICLE.categoryLabel}`}
                className={`${ARTICLE.categoryColor} inline-block rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:brightness-110`}
              >
                {ARTICLE.categoryLabel}
              </Link>
            </div>

            <h1 className="mt-5 text-balance text-[clamp(1.75rem,1.2rem+2.4vw,2.65rem)] font-extrabold leading-[1.15] tracking-tight text-gray-950">
              {ARTICLE.heading}
            </h1>

            {ARTICLE.dek && (
              <p className="mx-auto mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-gray-600 sm:text-xl">
                {ARTICLE.dek}
              </p>
            )}

            {/* Byline */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src={ARTICLE.author.avatar}
                    alt={ARTICLE.author.name}
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    <Link
                      href={`/authors/${ARTICLE.author.slug}`}
                      className="transition-colors hover:text-[#1565c0]"
                      rel="author"
                    >
                      {ARTICLE.author.name}
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-5 flex justify-center">
              <ShareBar url={PAGE_URL} title={ARTICLE.heading} />
            </div>
          </header>

          {/* Hero image */}
          <figure className="mt-8 overflow-hidden rounded-xl bg-gray-100 sm:mt-10">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={ARTICLE.heroImage}
                alt={ARTICLE.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </figure>

          {/* Body — centered prose */}
          <div
            className="article-content mx-auto mt-8 max-w-4xl sm:mt-10"
            style={{ fontFamily: "var(--font-article), Georgia, serif" }}
          >
            {BODY_BLOCKS.map((block, idx) => {
              if (block.type === "blockquote") {
                return (
                  <blockquote
                    key={idx}
                    className="my-8 clear-both border-l-4 border-[#2196f3] bg-gray-50 py-4 pl-5 pr-4 text-[1.05rem] italic leading-relaxed text-gray-800 sm:pl-6"
                  >
                    <p className="m-0">“{block.text}”</p>
                  </blockquote>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2
                    key={idx}
                    className="mb-4 mt-10 clear-both text-[1.35rem] font-bold tracking-tight text-gray-950"
                  >
                    {block.text}
                  </h2>
                );
              }
              /* Text left + aside image right — tight grid, no empty float gap */
              if (block.type === "text-with-aside") {
                const img = block.image || {};
                const paras = block.paragraphs || (block.text ? [block.text] : []);
                return (
                  <div
                    key={idx}
                    className="mb-6 grid grid-cols-1 items-start gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-5"
                  >
                    <div className="min-w-0">
                      {paras.map((para, pi) => (
                        <p
                          key={pi}
                          className="mb-5 text-[1.05rem] leading-[1.75] text-gray-800 last:mb-0 sm:text-[1.075rem] sm:leading-[1.8]"
                        >
                          {renderTextWithCitations(para)}
                        </p>
                      ))}
                    </div>
                    {/* auto column = only as wide as the cover — no empty gap on the right */}
                    <figure className="mx-auto w-[150px] justify-self-end sm:mx-0 sm:w-[170px] md:w-[180px]">
                      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                        <Image
                          src={img.src}
                          alt={img.alt || ""}
                          width={360}
                          height={540}
                          sizes="180px"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                      {(img.caption || img.subcaption) && (
                        <figcaption className="mt-2 text-left">
                          {img.caption && (
                            <p className="text-[13px] font-semibold leading-snug text-gray-900">
                              {img.caption}
                            </p>
                          )}
                          {img.subcaption && (
                            <p className="mt-0.5 text-[12px] leading-snug text-gray-500">
                              {img.subcaption}
                            </p>
                          )}
                        </figcaption>
                      )}
                    </figure>
                  </div>
                );
              }
              /* Float image — magazine style, text wraps beside it */
              if (block.type === "float-image" || block.type === "image") {
                return (
                  <figure
                    key={idx}
                    className="float-right mb-4 ml-4 w-[42%] max-w-[200px] sm:ml-6 sm:max-w-[220px]"
                  >
                    <div className="overflow-hidden rounded-md border border-gray-200 bg-gray-50 shadow-sm">
                      <Image
                        src={block.src}
                        alt={block.alt || ""}
                        width={440}
                        height={660}
                        sizes="(max-width: 640px) 42vw, 220px"
                        className="h-auto w-full object-cover object-top"
                      />
                    </div>
                    {(block.caption || block.subcaption) && (
                      <figcaption className="mt-2 text-left">
                        {block.caption && (
                          <p className="text-[13px] font-semibold leading-snug text-gray-900">
                            {block.caption}
                          </p>
                        )}
                        {block.subcaption && (
                          <p className="mt-0.5 text-[12px] leading-snug text-gray-500">
                            {block.subcaption}
                          </p>
                        )}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return (
                <p
                  key={idx}
                  className="mb-5 text-[1.05rem] leading-[1.75] text-gray-800 sm:text-[1.075rem] sm:leading-[1.8]"
                >
                  {renderTextWithCitations(block.text)}
                </p>
              );
            })}
            <div className="clear-both" aria-hidden="true" />
          </div>

          {/* Disclosure */}
          <aside
            aria-label="Disclosure"
            className="mx-auto mt-12 max-w-3xl rounded-2xl border border-amber-200/80 bg-amber-50/70 px-5 py-4 sm:px-6 sm:py-5"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-amber-800/80">
              Disclosure
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-amber-950/85 sm:text-[15px]">
              This article was provided to Corruption Files by representatives
              of a person named in it. The opinions expressed are the
              author&apos;s. The sources used are linked at the end of the page.
            </p>
          </aside>

          {/* Sources — modern dotted container */}
          <section
            id="sources"
            aria-labelledby="article-sources-heading"
            className="mx-auto mt-8 max-w-3xl scroll-mt-24 rounded-2xl border border-dashed border-gray-300 bg-gradient-to-b from-gray-50/80 to-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-7"
          >
            <h2
              id="article-sources-heading"
              className="text-center text-lg font-bold tracking-tight text-gray-900"
            >
              Sources
            </h2>
            <p className="mt-1 text-center text-[13px] text-gray-500">
              Click a citation number in the article to jump here
            </p>
            <ol className="mt-5 space-y-0 divide-y divide-gray-100/90">
              {ARTICLE.sources.map((source, idx) => (
                <li
                  key={`${source.label}-${idx}`}
                  id={`source-${idx + 1}`}
                  className="source-item flex scroll-mt-28 items-start gap-4 rounded-xl px-2 py-3.5 transition-all duration-300 first:pt-3.5 target:bg-[#e3f2fd] target:ring-2 target:ring-[#2196f3]/40 target:ring-offset-2"
                >
                  <span
                    className="w-5 flex-none pt-0.5 text-right text-sm font-semibold tabular-nums text-gray-400"
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#1565c0]">
                      {source.label}
                    </p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Read the source: ${source.title} (${source.label})`}
                      className="group mt-0.5 inline-flex max-w-full items-start gap-1.5 text-[15px] font-semibold leading-snug text-gray-900 transition-colors hover:text-[#1565c0]"
                    >
                      <span className="min-w-0 break-words">
                        {source.title}
                      </span>
                      <ExternalLink
                        size={13}
                        className="mt-[3px] flex-none text-gray-400 transition-colors group-hover:text-[#1565c0]"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Author card */}
          <section
            aria-label={`About the author ${ARTICLE.author.name}`}
            className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 sm:p-8"
          >
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full bg-gray-200 ring-4 ring-white shadow-sm">
                <Image
                  src={ARTICLE.author.avatar}
                  alt={`${ARTICLE.author.name} — author photo`}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Written by
                </p>
                <h3 className="mt-0.5 text-lg font-bold text-gray-900">
                  <Link
                    href={`/authors/${ARTICLE.author.slug}`}
                    className="transition-colors hover:text-[#1565c0]"
                    rel="author"
                  >
                    {ARTICLE.author.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
                  {ARTICLE.author.bio}
                </p>
              </div>
            </div>
          </section>

          {/* Related */}
          {ARTICLE.relatedPosts?.length > 0 && (
            <section className="mt-14" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-center text-lg font-bold tracking-tight text-gray-900"
              >
                More from Puerto Rico
              </h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-3">
                {ARTICLE.relatedPosts.map((post) => (
                  <li key={post.slug} className="group">
                    <Link
                      href={`/${post.category}/${post.slug}`}
                      title={post.title}
                      className="block"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 240px"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mt-2.5 text-[11px] font-medium uppercase tracking-wide text-gray-500">
                        {post.date}
                      </p>
                      <h3 className="mt-1 text-[15px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1565c0]">
                        {post.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}

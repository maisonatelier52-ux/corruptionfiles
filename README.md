# Corruption Files: publishing runbook

Next.js site (App Router, Tailwind), deployed on Vercel. Article text lives in JSON files in `src/data/`.

## Publish a new article

1. **Image.** Add the hero image to `public/` (WebP, at least 1200 px wide if possible, under 150 KB), named after the article, for example `public/<slug>.webp`.
2. **Article page.** Add the article to `src/data/articles.json`. The easiest way is to copy an existing article in the same category and edit it. Required fields:

   | Field | Rule |
   |---|---|
   | `slug` | lowercase letters, numbers and hyphens; unique; becomes the URL |
   | `category` | one of the categories listed in `src/data/homepage.json` |
   | `date` | written like `June 29, 2026` |
   | `heading` | the headline shown on the page |
   | `metaTitle` | search-result title, 60 characters or fewer, no site name added |
   | `metaDescription` | search-result description, 70 to 155 characters, ending on a full sentence |
   | `excerpt` | one or two sentences, used on cards and in feeds |
   | `heroImage`, `image` | image paths such as `/<slug>.webp` |
   | `alt` | describes the image, at least 20 characters |
   | `author` | name, slug and avatar of an author in `src/data/authors.json` |

3. **Listing card.** Add a card for the same `slug` and `category` to `src/data/homepage.json` (copy an existing card, for example from `newsCards`, and edit it). Without a card the article page exists but is not listed on the home, category or author pages.
4. **Sharing image.** Run `node scripts/optimize-images.mjs --og`. It creates `public/og/<slug>.jpg` (1200x630) and refreshes `src/data/image-dimensions.json`. Commit both.
5. **Check.** Run `npm run check:seo`.
6. **Deploy.** `npm run build` runs the check first, so a build with errors stops before it is published.
7. **After the deploy is live,** run `npm run indexnow` to notify Bing and other IndexNow search engines. The sitemap, RSS feeds and news sitemap update by themselves.

## Mark an article as updated

Add `"updated": "June 30, 2026"` to the article in `articles.json` (same format as `date`). It sets the modified date in the page metadata, the structured data and the sitemap.

## What the check does

`npm run check:seo` reads the JSON files and the `public/` folder. It needs no installation.

**Errors stop the build:** missing required fields, invalid dates, duplicate slugs, a category or author that does not exist, missing image files, related posts that point nowhere, links inside article text to pages that do not exist, a homepage card that points to a missing article, a sitemap entry for a page that does not exist.

**Warnings are only reported:** search titles over 60 characters, descriptions over 155 or under 70, short image alt text, duplicate titles or descriptions, images over 150 KB, articles with no card, missing sharing images.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | local development server |
| `npm run build` | runs the SEO check, then the production build |
| `npm run check:seo` | the check on its own |
| `npm run images` | image report: sizes, large files, files nothing uses |
| `npm run images:og` | also creates missing 1200x630 sharing images |
| `npm run indexnow` | notifies IndexNow search engines about new articles |

`npm run indexnow` options: `--days 7` (wider window), `--all` (everything), `--dry-run` (show without sending), or pass full URLs.

## Where things are

- **Sitemap:** `/sitemap.xml` (built from the data; static pages are listed in `src/app/sitemap.js`).
- **Feeds:** `/feed.xml` and `/<category>/feed.xml` (latest 30 articles).
- **News sitemap:** `/news-sitemap.xml` lists articles from the last 48 hours. It is empty when nothing was published recently. Submit it in Google Search Console once you publish regularly.
- **Robots and AI crawlers:** `src/app/robots.js`. Search and answer crawlers are allowed; the AI-training crawlers in `AI_TRAINING_BOTS` are blocked. Emptying that list allows everything.
- **Structured data helpers:** `src/lib/seo.js` (publisher entity, image sizes, safe JSON-LD output).
- **IndexNow key file:** the 32-character `.txt` file in `public/`. Do not delete or rename it.
- **Logo:** `public/logo.png` (60 px tall or less; used in structured data).

## Targets

Core Web Vitals on mobile: LCP 2.5 s or better, INP 200 ms or better, CLS 0.1 or lower. Measure with PageSpeed Insights, and check the Core Web Vitals report in Search Console (field data takes about 28 days to reflect changes).

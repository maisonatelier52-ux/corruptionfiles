#!/usr/bin/env node
/**
 * Image audit and social-image generator.
 *
 *   node scripts/optimize-images.mjs                report only
 *   node scripts/optimize-images.mjs --og           also create missing 1200x630 sharing images
 *   node scripts/optimize-images.mjs --og --force   re-create every sharing image
 *
 * Always rewrites src/data/image-dimensions.json (real width/height/size of each image),
 * which the article and author metadata read so declared sizes match the files.
 * Uses the "sharp" library that Next.js installs with the project.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const OG_DIR = path.join(PUBLIC, "og");
const DIMS_FILE = path.join(ROOT, "src", "data", "image-dimensions.json");

const IMAGE_EXT = /\.(webp|jpe?g|png|gif)$/i;
const MAX_WIDTH = 1600; // flag images wider than this
const MAX_KB = 150; // flag images heavier than this
const OG_W = 1200;
const OG_H = 630;

const args = new Set(process.argv.slice(2));
const MAKE_OG = args.has("--og");
const FORCE = args.has("--force");

const readJson = async (p) => JSON.parse(await fs.readFile(p, "utf8"));

async function walk(dir, exts) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p, exts)));
    else if (exts.test(e.name)) out.push(p);
  }
  return out;
}

async function sourceText() {
  const files = await walk(path.join(ROOT, "src"), /\.(js|jsx|mjs|json|css)$/);
  files.push(path.join(ROOT, "next.config.mjs"), path.join(ROOT, "package.json"));
  let text = "";
  for (const f of files) {
    if (f === DIMS_FILE) continue; // generated; would make every image look referenced
    try {
      text += (await fs.readFile(f, "utf8")) + "\n";
    } catch {}
  }
  return text;
}

async function main() {
  const articles = (await readJson(path.join(ROOT, "src/data/articles.json"))).articles || [];

  // 1. Sharing images
  if (MAKE_OG) {
    await fs.mkdir(OG_DIR, { recursive: true });
    let made = 0;
    let skipped = 0;
    for (const a of articles) {
      const hero = a.heroImage || a.image;
      if (!a.slug || !hero) continue;
      const src = path.join(PUBLIC, hero);
      const dest = path.join(OG_DIR, `${a.slug}.jpg`);
      const exists = await fs.stat(dest).then(() => true, () => false);
      if (exists && !FORCE) {
        skipped++;
        continue;
      }
      try {
        await sharp(src)
          .rotate()
          .flatten({ background: "#ffffff" })
          .resize(OG_W, OG_H, { fit: "cover", position: "attention" })
          .jpeg({ quality: 82, progressive: true, mozjpeg: true })
          .toFile(dest);
        made++;
      } catch (err) {
        console.warn(`  could not create sharing image for ${a.slug}: ${err.message}`);
      }
    }
    console.log(`Sharing images: ${made} created, ${skipped} already existed.`);
  }

  // 2. Measure every image in /public (including /public/og)
  const files = await walk(PUBLIC, IMAGE_EXT);
  const dims = {};
  for (const f of files.sort()) {
    const rel = "/" + path.relative(PUBLIC, f).split(path.sep).join("/");
    const [meta, stat] = await Promise.all([sharp(f).metadata(), fs.stat(f)]);
    dims[rel] = { width: meta.width, height: meta.height, bytes: stat.size };
  }
  await fs.writeFile(DIMS_FILE, JSON.stringify(dims, null, 2) + "\n");

  // 3. Report
  const text = await sourceText();
  const slugs = new Set(articles.map((a) => a.slug));
  const rows = Object.entries(dims).filter(([p]) => !p.startsWith("/og/"));
  const totalKB = Math.round(Object.values(dims).reduce((s, d) => s + d.bytes, 0) / 1024);

  const heavy = rows.filter(([, d]) => d.width > MAX_WIDTH || d.bytes / 1024 > MAX_KB);
  const unused = rows.filter(([p]) => !text.includes(p) && !text.includes(p.slice(1)));
  const ogMissing = articles.filter((a) => a.slug && !dims[`/og/${a.slug}.jpg`]);
  const ogWrong = Object.entries(dims).filter(
    ([p, d]) => p.startsWith("/og/") && (d.width !== OG_W || d.height !== OG_H)
  );
  const ogOrphans = Object.keys(dims).filter(
    (p) => p.startsWith("/og/") && !slugs.has(path.basename(p, ".jpg"))
  );

  console.log(`\n${rows.length} images in /public (plus ${Object.keys(dims).length - rows.length} in /public/og), ${totalKB} KB total.`);

  console.log(`\nFlagged as large (wider than ${MAX_WIDTH}px or heavier than ${MAX_KB} KB): ${heavy.length}`);
  heavy.forEach(([p, d]) => console.log(`  ${p}  ${d.width}x${d.height}  ${Math.round(d.bytes / 1024)} KB`));

  console.log(`\nNot referenced anywhere in src/, next.config.mjs or package.json: ${unused.length}`);
  unused.forEach(([p, d]) => console.log(`  ${p}  ${Math.round(d.bytes / 1024)} KB`));
  console.log("  (check each before deleting; an image may be saved for an article you have not published yet)");

  console.log(`\nArticles without a sharing image: ${ogMissing.length}`);
  ogMissing.forEach((a) => console.log(`  ${a.slug}`));
  if (ogWrong.length) {
    console.log(`\nSharing images that are not ${OG_W}x${OG_H}: ${ogWrong.length}`);
    ogWrong.forEach(([p, d]) => console.log(`  ${p}  ${d.width}x${d.height}`));
  }
  if (ogOrphans.length) {
    console.log(`\nSharing images with no matching article: ${ogOrphans.length}`);
    ogOrphans.forEach((p) => console.log(`  ${p}`));
  }
  console.log("\nWrote src/data/image-dimensions.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

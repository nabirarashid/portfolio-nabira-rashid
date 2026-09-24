/**
 * Pull posts from the substack feed into src/content/writing as markdown.
 *
 *   npm run import:substack           new posts only
 *   npm run import:substack -- --force  rewrite every post
 *
 * Each post becomes <slug>.md, slug taken from the substack url, with the
 * front matter the site reads (title, date, excerpt, cover, substack) and
 * the body converted from the feed's html. Existing files are left alone
 * unless --force is passed, so edits made here survive a re-run.
 *
 * Images stay on substack's cdn. If the publication is ever deleted, copy
 * them under public/ and update the links.
 */

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";

const FEED_URL = "https://nabirarashid.substack.com/feed";
const force = process.argv.includes("--force");

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../src/content/writing");

const tagContent = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!match) return "";
  return match[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1").trim();
};

const decodeEntities = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const stripTags = (html) =>
  decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const isPlaceholderImage = (url) =>
  !url || /_\d{2,3}x\d{2,3}\./.test(url) || /[?,]w_(\d{1,3})[,&]/.test(url);

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "*",
});

// Substack furniture that has no place in the article: subscribe buttons,
// share buttons, embedded-post cards, and the like.
turndown.addRule("substack-furniture", {
  filter: (node) => {
    const cls = typeof node.getAttribute === "function" ? node.getAttribute("class") || "" : "";
    return /button-wrapper|subscription-widget|subscribe-widget|share-dialog|embedded-post|poll-embed|community-guidelines/.test(cls);
  },
  replacement: () => "",
});

// Substack links every image to itself. Unwrap those: the image alone.
turndown.addRule("image-link", {
  filter: (node) =>
    node.nodeName === "A" &&
    node.querySelector("img") !== null &&
    !stripTags(node.innerHTML).length,
  replacement: (content) => content,
});

// <picture> wrappers: keep only the <img>.
turndown.addRule("picture", {
  filter: "picture",
  replacement: (_content, node) => {
    const img = node.querySelector("img");
    if (!img) return "";
    const src = img.getAttribute("src") || "";
    const alt = img.getAttribute("alt") || "";
    return src ? `\n\n![${alt}](${src})\n\n` : "";
  },
});

// Captions under images become an italic line.
turndown.addRule("figcaption", {
  filter: "figcaption",
  replacement: (content) => (content.trim() ? `\n\n*${content.trim()}*\n\n` : ""),
});

const response = await fetch(`${FEED_URL}?cb=${Date.now()}`, {
  headers: { "user-agent": "nabira-website-import", "cache-control": "no-cache" },
  signal: AbortSignal.timeout(20000),
});
if (!response.ok) throw new Error(`feed responded ${response.status}`);
const xml = await response.text();
const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

await mkdir(outDir, { recursive: true });

let written = 0;
let skipped = 0;

for (const item of items) {
  const title = decodeEntities(tagContent(item, "title"));
  const link = decodeEntities(tagContent(item, "link"));
  if (!title || !link) continue;

  const slug = (link.match(/\/p\/([^/?#]+)/)?.[1] || title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const path = resolve(outDir, `${slug}.md`);

  if (!force && (await exists(path))) {
    skipped++;
    continue;
  }

  const pubDate = tagContent(item, "pubDate");
  const date = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : "";
  const description = stripTags(tagContent(item, "description"));
  const encoded = decodeEntities(tagContent(item, "content:encoded"));
  const enclosure = item.match(/<enclosure[^>]*url="([^"]+)"/i)?.[1] ?? "";
  const firstImg = encoded.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? "";
  const cover = decodeEntities(
    !isPlaceholderImage(enclosure) ? enclosure : !isPlaceholderImage(firstImg) ? firstImg : ""
  );

  let body = turndown.turndown(encoded).replace(/\n{3,}/g, "\n\n").trim();

  // If the body opens with the cover image, the page already shows it above.
  if (cover) {
    const escaped = cover.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp(`^!\\[[^\\]]*\\]\\(${escaped}\\)\\s*`), "").trim();
  }

  const frontMatter = [
    "---",
    `title: ${title}`,
    `date: ${date}`,
    description && description !== title ? `excerpt: ${description}` : null,
    cover ? `cover: ${cover}` : null,
    `substack: ${link}`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  await writeFile(path, `${frontMatter}\n\n${body}\n`, "utf8");
  written++;
  console.log(`[import] ${slug}.md`);
}

console.log(`[import] ${written} written, ${skipped} already here${force ? "" : " (use --force to rewrite)"}`);

/**
 * Build-time Substack fetch.
 *
 * Runs as a prebuild step, pulls the latest posts from the RSS feed and writes
 * them to src/data/substack-posts.json so they get bundled with the app. This is
 * the reliable layer: the site always ships with real posts even if the client
 * side live fetch is blocked or slow.
 *
 * Written as .mjs on purpose so it runs on bare node with no ts-node/tsx
 * dependency. Node 18+ has global fetch.
 */

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const FEED_URL = "https://nabirarashid.substack.com/feed";
const MAX_POSTS = 4;
const EXCERPT_LENGTH = 165;
const TIMEOUT_MS = 15000;

const here = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(here, "../src/data/substack-posts.json");

/** Pull the inner text of the first matching tag, unwrapping CDATA. */
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
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;|&ndash;/g, ", ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/** Strip tags, decode entities, collapse whitespace, truncate on a word boundary. */
const toExcerpt = (html) => {
  const text = decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= EXCERPT_LENGTH) return text;
  const clipped = text.slice(0, EXCERPT_LENGTH);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 60 ? lastSpace : clipped.length).replace(/[,.;:]$/, "")}...`;
};

/**
 * Substack uses the publication avatar as the enclosure when a post has no real
 * cover image. Those are tiny squares and look wrong stretched across a card,
 * so treat them as "no cover" and let the card fall back to its accent bar.
 */
const isPlaceholderImage = (url) =>
  !url || /_\d{2,3}x\d{2,3}\./.test(url) || /[?,]w_(\d{1,3})[,&]/.test(url);

const parseFeed = (xml) => {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return items.slice(0, MAX_POSTS).map((item) => {
    const description = tagContent(item, "description");
    const encoded = tagContent(item, "content:encoded");
    const enclosure = item.match(/<enclosure[^>]*url="([^"]+)"/i)?.[1] ?? "";
    const coverFromBody = encoded.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? "";
    const cover = decodeEntities(
      !isPlaceholderImage(enclosure)
        ? enclosure
        : !isPlaceholderImage(coverFromBody)
          ? coverFromBody
          : ""
    );

    const pubDate = tagContent(item, "pubDate");

    return {
      title: decodeEntities(tagContent(item, "title")),
      link: decodeEntities(tagContent(item, "link")),
      pubDate: pubDate ? new Date(pubDate).toISOString() : "",
      excerpt: toExcerpt(description || encoded),
      cover,
    };
  });
};

const readExisting = async () => {
  try {
    return JSON.parse(await readFile(OUT_PATH, "utf8"));
  } catch {
    return null;
  }
};

const main = async () => {
  let posts;

  try {
    // Substack's CDN happily serves a stale feed on the bare URL, which loses
    // cover images added to a post after it was first published. A unique
    // query param each run gets us the current one.
    const response = await fetch(`${FEED_URL}?cb=${Date.now()}`, {
      headers: {
        "user-agent": "nabira-website-build",
        "cache-control": "no-cache",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) throw new Error(`feed responded ${response.status}`);

    posts = parseFeed(await response.text()).filter((post) => post.title && post.link);
    if (posts.length === 0) throw new Error("feed parsed to zero usable posts");
  } catch (error) {
    // Never fail the build on a flaky network. Keep whatever we shipped last time.
    const existing = await readExisting();
    console.warn(`[substack] fetch failed: ${error.message}`);

    if (existing?.posts?.length) {
      console.warn(`[substack] keeping ${existing.posts.length} previously bundled posts`);
      return;
    }

    console.warn("[substack] writing empty post list, the writing section will hide itself");
    posts = [];
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(
    OUT_PATH,
    `${JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2)}\n`,
    "utf8"
  );

  console.log(`[substack] wrote ${posts.length} posts to src/data/substack-posts.json`);
};

await main();

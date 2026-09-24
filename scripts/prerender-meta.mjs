/**
 * Post-build share cards.
 *
 * The site is a single-page app, so every url would otherwise serve the same
 * index.html with the homepage's title and description, and a link to an
 * article shared on x or imessage would unfurl as the homepage. This writes a
 * copy of index.html for each article (and the writing and projects pages)
 * with that page's own <title>, description and open graph tags. Vercel
 * serves the static file when it exists, and falls through to the spa
 * rewrite when it does not, so the app itself is unchanged.
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dist = resolve(root, "dist");
const contentDir = resolve(root, "src/content/writing");

const site = JSON.parse(await readFile(resolve(root, "site.config.json"), "utf8"));
const siteUrl = String(site.url || "").replace(/\/$/, "");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) data[key] = value;
  }
  return { data, body: raw.slice(match[0].length) };
};

const stripMarkdown = (md) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (text, length = 165) => {
  if (text.length <= length) return text;
  const clipped = text.slice(0, length);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 60 ? lastSpace : clipped.length).replace(/[,.;:]$/, "")}...`;
};

const absolute = (url) => (/^https?:\/\//i.test(url) ? url : `${siteUrl}${url.startsWith("/") ? "" : "/"}${url}`);

const pages = [
  {
    path: "writing",
    title: `writing · ${site.name}`,
    description: "every piece, in one place. essays on building, reading, and the space between.",
    type: "website",
  },
  {
    path: "projects",
    title: `projects · ${site.name}`,
    description: "the full menu. everything on the board.",
    type: "website",
  },
];

let entries = [];
try {
  entries = await readdir(contentDir);
} catch {
  entries = [];
}

for (const file of entries) {
  if (!file.endsWith(".md") || file.startsWith("_")) continue;
  const { data, body } = parseFrontmatter(await readFile(resolve(contentDir, file), "utf8"));
  const slug = file.replace(/\.md$/, "");
  pages.push({
    path: `writing/${slug}`,
    title: `${data.title || slug} · ${site.name}`,
    description: data.excerpt || truncate(stripMarkdown(body)),
    image: data.cover || "",
    type: "article",
    published: data.date || "",
  });
}

const template = await readFile(resolve(dist, "index.html"), "utf8");

for (const page of pages) {
  const url = `${siteUrl}/${page.path}`;
  const tags = [
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
  ];
  if (page.image) {
    tags.push(
      `<meta property="og:image" content="${escapeHtml(absolute(page.image))}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:image" content="${escapeHtml(absolute(page.image))}" />`
    );
  } else {
    tags.push(`<meta name="twitter:card" content="summary" />`);
  }
  if (page.published) {
    tags.push(`<meta property="article:published_time" content="${escapeHtml(page.published)}" />`);
  }

  const html = template
    // Drop the homepage's own open graph and twitter tags first: crawlers
    // take the first og:title they meet, so leaving them in would make every
    // article unfurl as the homepage.
    .replace(/[ \t]*<meta\s+(?:property="og:|name="twitter:)[\s\S]*?\/>\n?/g, "")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`
    )
    .replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);

  const outDir = resolve(dist, page.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, "index.html"), html, "utf8");
}

console.log(`[meta] wrote ${pages.length} share-card shells${siteUrl.includes("REPLACE") ? " (site.config.json url is still the placeholder)" : ""}`);

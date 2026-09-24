import { parseFrontmatter } from "./frontmatter";
import { stripMarkdown, truncate } from "./format";

/**
 * Every markdown file in src/content/writing is an article on the site. The
 * filename is the slug (and the url: /writing/<slug>). Files starting with an
 * underscore are templates and skipped.
 *
 * Front matter:
 *   title:    required
 *   date:     required, YYYY-MM-DD
 *   excerpt:  optional, otherwise the first paragraph
 *   cover:    optional, a url or a path under /public
 *   substack: optional, the same piece on substack
 */
export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  substack: string;
  body: string;
  readingMinutes: number;
}

const files = import.meta.glob("../content/writing/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const WORDS_PER_MINUTE = 220;

export const articles: Article[] = Object.entries(files)
  .filter(([path]) => !/\/_[^/]*\.md$/.test(path))
  .map(([path, raw]) => {
    const slug = path.replace(/^.*\//, "").replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    const text = stripMarkdown(body);
    const words = text ? text.split(" ").length : 0;

    return {
      slug,
      title: data.title || slug.replace(/-/g, " "),
      date: data.date || "",
      excerpt: data.excerpt || truncate(text),
      cover: data.cover || "",
      substack: data.substack || "",
      body,
      readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    };
  })
  .sort((a, b) => Date.parse(b.date || "") - Date.parse(a.date || ""));

export const getArticle = (slug: string | undefined) =>
  slug ? articles.find((article) => article.slug === slug) : undefined;

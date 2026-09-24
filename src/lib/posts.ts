import type { Article } from "./writing";
import type { SubstackPost } from "../hooks/useSubstackPosts";

/**
 * One list for the writing section and the writing page: pieces on the site
 * first-class, plus anything still only on substack as an external card, so
 * nothing disappears while posts are moved over.
 */
export interface Post {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  cover: string;
  /** True when the link is a page on this site. */
  internal: boolean;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const mergePosts = (articles: Article[], substack: SubstackPost[]): Post[] => {
  const onSite = articles.map<Post>((article) => ({
    title: article.title,
    link: `/writing/${article.slug}`,
    pubDate: article.date,
    excerpt: article.excerpt,
    cover: article.cover,
    internal: true,
  }));

  // A substack post is "already here" if an article links to it, or if the
  // titles match once slugified. Substack's own url slug is the title too.
  const known = new Set<string>();
  for (const article of articles) {
    if (article.substack) known.add(article.substack.replace(/\/$/, ""));
    known.add(slugify(article.title));
  }

  const external = substack
    .filter(
      (post) =>
        !known.has(post.link.replace(/\/$/, "")) && !known.has(slugify(post.title))
    )
    .map<Post>((post) => ({ ...post, internal: false }));

  return [...onSite, ...external].sort(
    (a, b) => Date.parse(b.pubDate || "") - Date.parse(a.pubDate || "")
  );
};

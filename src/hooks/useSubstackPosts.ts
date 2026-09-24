import { useEffect, useState } from "react";
import bundled from "../data/substack-posts.json";
import { stripHtml, truncate } from "../lib/format";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  cover: string;
}

/** The feed lives on the publication domain. The profile URL has no /feed. */
const PUBLICATION_URL = "https://nabirarashid.substack.com";
const FEED_URL = `${PUBLICATION_URL}/feed`;
const RSS_TO_JSON = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;
const LIVE_FETCH_TIMEOUT_MS = 4000;

const bundledPosts = (bundled.posts ?? []) as SubstackPost[];

/**
 * Substack falls back to the publication avatar when a post has no cover image.
 * Those are tiny squares, so treat them as missing and let the card use its
 * accent bar instead of stretching a 144px logo across the top.
 */
const isPlaceholderImage = (url: string) =>
  !url || /_\d{2,3}x\d{2,3}\./.test(url) || /[?,]w_(\d{1,3})[,&]/.test(url);

interface Rss2JsonItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  content?: string;
  thumbnail?: string;
}

const normalize = (item: Rss2JsonItem): SubstackPost | null => {
  if (!item.title || !item.link) return null;

  const thumbnail = item.thumbnail ?? "";
  const fromBody = item.content?.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? "";

  return {
    title: stripHtml(item.title),
    link: item.link,
    // rss2json returns "YYYY-MM-DD HH:mm:ss" in UTC, which Safari will not parse
    // without the T separator and zone.
    pubDate: item.pubDate ? item.pubDate.replace(" ", "T") + "Z" : "",
    excerpt: truncate(stripHtml(item.description || item.content || "")),
    cover: !isPlaceholderImage(thumbnail)
      ? thumbnail
      : !isPlaceholderImage(fromBody)
        ? fromBody
        : "",
  };
};

/**
 * The posts bundled at build time, refreshed from the live feed when it is
 * reachable. Silently keeps the bundle if anything goes wrong.
 */
export const useSubstackPosts = () => {
  const [posts, setPosts] = useState<SubstackPost[]>(bundledPosts);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), LIVE_FETCH_TIMEOUT_MS);
    let cancelled = false;

    const loadLive = async () => {
      try {
        const response = await fetch(RSS_TO_JSON, { signal: controller.signal });
        if (!response.ok) return;

        const data = await response.json();
        if (data?.status !== "ok" || !Array.isArray(data.items)) return;

        const live = data.items
          .map(normalize)
          .filter((post: SubstackPost | null): post is SubstackPost => post !== null);

        // rss2json caches for hours, so the live feed can lag the bundle the
        // build fetched straight from Substack. Never let it replace the
        // bundle: union the two by link, sort newest first, and let the live
        // item win the text while the bundle keeps any cover it already has.
        const byLink = new Map<string, SubstackPost>(
          bundledPosts.map((post) => [post.link, post])
        );
        for (const post of live as SubstackPost[]) {
          const known = byLink.get(post.link);
          byLink.set(post.link, { ...post, cover: post.cover || known?.cover || "" });
        }
        const merged = [...byLink.values()].sort(
          (a, b) => Date.parse(b.pubDate || "") - Date.parse(a.pubDate || "")
        );

        if (!cancelled && merged.length > 0) setPosts(merged);
      } catch {
        // Offline, blocked, rate limited or timed out. The bundled posts stand.
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void loadLive();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return posts;
};

export default useSubstackPosts;

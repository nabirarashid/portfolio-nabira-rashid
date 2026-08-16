import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import bundled from "../data/substack-posts.json";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  cover: string;
}

/** Where the "read everything" link points. */
const SUBSTACK_PROFILE_URL = "https://substack.com/@nabirarashid";
/** The feed lives on the publication domain. The profile URL has no /feed. */
const PUBLICATION_URL = "https://nabirarashid.substack.com";
const FEED_URL = `${PUBLICATION_URL}/feed`;
const RSS_TO_JSON = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;
const CARD_COUNT = 3;
const LIVE_FETCH_TIMEOUT_MS = 4000;
const EXCERPT_LENGTH = 165;

const bundledPosts = (bundled.posts ?? []) as SubstackPost[];

const stripHtml = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (text: string) => {
  if (text.length <= EXCERPT_LENGTH) return text;
  const clipped = text.slice(0, EXCERPT_LENGTH);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 60 ? lastSpace : clipped.length).replace(/[,.;:]$/, "")}...`;
};

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

const formatDate = (iso: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toLowerCase();
};

const Writing = () => {
  const [posts, setPosts] = useState<SubstackPost[]>(bundledPosts);

  // Freshness layer. Silently keeps the bundled posts if anything goes wrong.
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

        if (!cancelled && live.length > 0) setPosts(live);
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

  // Nothing bundled and nothing live means the section has nothing to say.
  if (posts.length === 0) return null;

  return (
    <section id="writing-section" className="coffee-bg relative">
      <SectionHeading
        title="fresh off the press"
        tagline="thoughts that needed more than one cup"
      />

      <div className="section-shell section-shell--tight">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.slice(0, CARD_COUNT).map((post, index) => (
            <Reveal
              as="article"
              key={post.link}
              delay={index * 90}
              className="h-full"
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-cafe-espresso/10 dark:border-cafe-cream/10 shadow-md transition-all duration-300 hover:shadow-lg"
              >
                {/* Cover when there is one, otherwise the accent bar the project
                    cards already use, so missing images degrade cleanly. */}
                {post.cover ? (
                  <div className="h-28 w-full overflow-hidden bg-cafe-mocha">
                    <img
                      src={post.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.parentElement?.classList.add("h-3");
                        event.currentTarget.parentElement?.classList.remove("h-28");
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-3 w-full bg-cafe-mocha" />
                )}

                <div className="flex flex-1 flex-col gap-3 bg-cafe-latte dark:bg-coffee-900 p-6">
                  <p className="receipt-meta coffee-text opacity-50">
                    {formatDate(post.pubDate)}
                  </p>

                  <h3 className="card-title coffee-text">
                    {post.title}
                  </h3>

                  <p className="body-copy coffee-text text-sm opacity-65">{post.excerpt}</p>

                  <span className="coffee-text mt-auto flex items-center gap-1.5 pt-3 text-xs font-normal tracking-[0.06em] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    read on substack
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href={SUBSTACK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="coffee-text border-b border-cafe-espresso/30 dark:border-cafe-cream/30 pb-1 text-sm font-normal tracking-[0.04em] transition-colors duration-300 hover:border-cafe-espresso dark:hover:border-cafe-cream"
          >
            read everything on substack
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Writing;

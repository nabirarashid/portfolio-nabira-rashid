import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "../lib/posts";
import { formatDate } from "../lib/format";

interface Props {
  post: Post;
  /** Small hang tag at the top of the card, like "just brewed". */
  tag?: string;
}

/**
 * A piece of writing as a card. Pieces on the site link within the app;
 * pieces still only on substack open there in a new tab.
 */
const PostCard = ({ post, tag }: Props) => {
  const className =
    "group flex h-full flex-col overflow-hidden rounded-sm border border-cafe-espresso/10 dark:border-cafe-cream/10 shadow-md transition-all duration-300 hover:shadow-lg";

  const body = (
    <>
      {/* Cover when there is one, otherwise the accent bar the project cards
          already use, so missing images degrade cleanly. */}
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
        <div className="coffee-text flex items-center justify-between gap-4">
          <p className="receipt-meta opacity-50">{formatDate(post.pubDate)}</p>

          {tag && (
            <p className="receipt-meta shrink-0 opacity-85">
              <span className="hang-tag hang-tag--press inline-block border px-2 py-0.5 text-[0.6875rem] tracking-[0.12em]">
                {tag}
              </span>
            </p>
          )}
        </div>

        <h3 className="card-title coffee-text">{post.title}</h3>

        <p className="body-copy coffee-text text-sm opacity-65">{post.excerpt}</p>

        <span className="coffee-text mt-auto flex items-center gap-1.5 pt-3 text-xs font-normal tracking-[0.06em] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
          {post.internal ? "read the piece" : "read on substack"}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </>
  );

  return post.internal ? (
    <Link to={post.link} className={className}>
      {body}
    </Link>
  ) : (
    <a href={post.link} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  );
};

export default PostCard;

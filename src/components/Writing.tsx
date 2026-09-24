import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CoffeeStains from "./CoffeeStains";
import PostCard from "./PostCard";
import useSubstackPosts from "../hooks/useSubstackPosts";
import { articles } from "../lib/writing";
import { mergePosts } from "../lib/posts";

const CARD_COUNT = 3;

/** The newest three pieces, on the site or still on substack. */
const Writing = () => {
  const substack = useSubstackPosts();
  const posts = mergePosts(articles, substack);

  // Nothing written and nothing bundled means the section has nothing to say.
  if (posts.length === 0) return null;

  return (
    <section id="writing-section" className="coffee-bg relative">
      <CoffeeStains variant="writing" />

      <SectionHeading
        title="fresh off the press"
        tagline="thoughts that needed more than one cup"
        to="/writing"
        cue="read everything"
      />

      <div className="section-shell section-shell--tight">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.slice(0, CARD_COUNT).map((post, index) => (
            <Reveal as="article" key={post.link} delay={index * 90} className="h-full">
              <PostCard post={post} tag={index === 0 ? "just brewed" : undefined} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            to="/writing"
            className="coffee-text border-b border-cafe-espresso/30 dark:border-cafe-cream/30 pb-1 text-sm font-normal tracking-[0.04em] transition-colors duration-300 hover:border-cafe-espresso dark:hover:border-cafe-cream"
          >
            read everything
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Writing;

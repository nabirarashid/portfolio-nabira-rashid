import { useEffect } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import CoffeeStains from "../components/CoffeeStains";
import PostCard from "../components/PostCard";
import useSubstackPosts from "../hooks/useSubstackPosts";
import { articles } from "../lib/writing";
import { mergePosts } from "../lib/posts";
import site from "../../site.config.json";

/** Every piece, newest first. */
const WritingIndex = () => {
  const substack = useSubstackPosts();
  const posts = mergePosts(articles, substack);

  useEffect(() => {
    document.title = `writing · ${site.name}`;
  }, []);

  return (
    <main>
      <section className="coffee-bg relative">
        <CoffeeStains variant="writing" />

        <SectionHeading title="fresh off the press" tagline="every piece, in one place" />

        <div className="section-shell section-shell--tight">
          <Reveal>
            <p className="eyebrow coffee-text mb-12 text-center">
              {posts.length} {posts.length === 1 ? "piece" : "pieces"}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal as="article" key={post.link} delay={Math.min(index, 5) * 70} className="h-full">
                <PostCard post={post} tag={index === 0 ? "just brewed" : undefined} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <a
              href={site.substackProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="coffee-text border-b border-cafe-espresso/30 dark:border-cafe-cream/30 pb-1 text-sm font-normal tracking-[0.04em] transition-colors duration-300 hover:border-cafe-espresso dark:hover:border-cafe-cream"
            >
              also on substack
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default WritingIndex;

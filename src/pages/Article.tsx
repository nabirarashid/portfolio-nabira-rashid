import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import CoffeeStains from "../components/CoffeeStains";
import { getArticle } from "../lib/writing";
import { formatDate } from "../lib/format";
import site from "../../site.config.json";

/**
 * One piece of writing: the title on a chalkboard sign, the text on a sheet
 * of latte paper under it, and a line at the foot for sharing it on.
 */
const Article = () => {
  const { slug } = useParams();
  const article = getArticle(slug);

  useEffect(() => {
    if (article) document.title = `${article.title} · ${site.name}`;
  }, [article]);

  if (!article) return <Navigate to="/writing" replace />;

  const url = `${site.url.replace(/\/$/, "")}/writing/${article.slug}`;
  const tweet = `https://twitter.com/intent/tweet?${new URLSearchParams({
    text: article.title,
    url,
  }).toString()}`;

  return (
    <main>
      <section className="coffee-bg relative">
        <CoffeeStains variant="writing" />

        <div className="px-6 pt-20 pb-0 text-center md:pt-24">
          <Reveal className="section-sign section-sign--article">
            <p className="eyebrow text-cafe-cream mb-4">
              <Link to="/writing" className="section-sign__crumb">
                fresh off the press
              </Link>
            </p>
            <h1 className="article-title">{article.title}</h1>
            <p className="section-tagline mt-3">
              {formatDate(article.date)} · {article.readingMinutes} min read
            </p>
            <div className="rule-short" />
          </Reveal>
        </div>

        <div className="section-shell section-shell--tight">
          <Reveal as="article" className="article-paper">
            {article.cover && (
              <img src={article.cover} alt="" className="article-cover" loading="eager" />
            )}

            <div className="prose-cafe coffee-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
            </div>

            <footer className="article-foot coffee-text">
              <Link to="/writing" className="article-foot__link">
                ← all writing
              </Link>

              <span className="article-foot__share">
                <a
                  href={tweet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-foot__link"
                >
                  post on x <ArrowUpRight size={12} />
                </a>
                {article.substack && (
                  <a
                    href={article.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-foot__link"
                  >
                    also on substack <ArrowUpRight size={12} />
                  </a>
                )}
              </span>
            </footer>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Article;

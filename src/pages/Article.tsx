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

/** The file name at the end of an image url, decoded, so cdn variants match. */
const imageKey = (url: string) => {
  try {
    const decoded = decodeURIComponent(url);
    return decoded.slice(decoded.lastIndexOf("/") + 1).split("?")[0];
  } catch {
    return url;
  }
};

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

  // Substack's "cover" is usually just the first image in the piece, served
  // at a different cdn size, so the urls differ while the file is the same.
  // Compare by file name; the page only shows the cover up top when the text
  // doesn't already carry that image where the author put it.
  const showCover = Boolean(article.cover) && !article.body.includes(imageKey(article.cover));

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
            <p className="receipt-meta mt-4 opacity-60">
              {formatDate(article.date)} · {article.readingMinutes} min read
            </p>
            <div className="rule-short" />
          </Reveal>
        </div>

        <div className="section-shell section-shell--tight">
          {/* No Reveal on the paper: useReveal waits for 12% of the element
              to be on screen, which a long piece on a phone never reaches. */}
          <article className="article-paper">
            {showCover && (
              <img src={article.cover} alt="" className="article-cover" loading="eager" />
            )}

            <div className="prose-cafe coffee-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
            </div>

            <footer className="article-foot coffee-text">
              <Link to="/writing" className="article-foot__link">
                ← all writing
              </Link>

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
            </footer>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Article;

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface MediaItem {
  title: string;
  category: string;
  note?: string;
}

const mediaItems: MediaItem[] = [
  {
    title: "classics",
    category: "books",
    note: "sense and sensibility, the picture of dorian gray, jane eyre. the kind of books that have survived for a reason",
  },
  {
    title: "cinema across genres",
    category: "film",
    note: "rom-coms, murder mysteries, 80s shows. different genres all circling the same human experiences",
  },
  {
    title: "social media doomscrolling",
    category: "linkedin, substack & instagram",
    note: "hot takes on ai from @askcatgpt, @byjackprice, and whoever else the algorithm decides i need at 1am",
  },
  {
    title: "yc startup podcast",
    category: "podcast",
    note: "absorbing how startups actually get built, the messy parts included",
  },
];

export const CurrentlyConsuming = () => {
  return (
    <section id="consuming-section" className="coffee-bg relative">
      <SectionHeading
        title="currently consuming"
        tagline="what's on the side of the desk lately"
      />

      <div className="section-shell section-shell--tight">
        <ul className="mx-auto max-w-2xl">
          {mediaItems.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 70}
              className="coffee-text border-b border-cafe-espresso/12 dark:border-cafe-cream/12 py-6 first:pt-0 last:border-b-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="entry-title">
                  {item.title}
                </h3>
                <span className="receipt-meta shrink-0 opacity-50">{item.category}</span>
              </div>

              {item.note && (
                <p className="body-copy mt-2 max-w-xl text-sm opacity-60">{item.note}</p>
              )}
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center">
          <p className="coffee-text body-copy text-xs tracking-[0.06em] opacity-55">
            always exploring and open to new recs ◡̈
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default CurrentlyConsuming;

import { ArrowUpRight } from "lucide-react";
import now from "../data/now";
import Reveal from "./Reveal";

/** The two current things, set in the same date row as the timeline and
 *  sitting in its text column so the receipt can start directly underneath. */
const Now = () => {
  return (
    <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
      {now.map((entry, index) => (
        <Reveal key={entry.title} delay={index * 80} className="flex h-full flex-col">
          <div className="coffee-text flex h-full flex-1 flex-col">
            <div className="receipt-meta mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 opacity-60">
              <span>2026</span>
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
              <span className="border border-cafe-espresso/35 dark:border-cafe-cream/35 px-1.5 py-px text-[0.625rem] tracking-[0.14em]">
                {entry.status}
              </span>
            </div>

            <h3 className="entry-title">{entry.title}</h3>
            <p className="body-copy mt-3.5 text-sm opacity-75">{entry.description}</p>

            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-line mt-auto pt-6"
              aria-label={`${entry.title} on github`}
            >
              <span className="paper-line__leader" aria-hidden="true" />
              <span className="paper-line__venue receipt-meta">
                {entry.linkLabel}
                <ArrowUpRight size={12} className="paper-line__arrow" />
              </span>
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

export default Now;

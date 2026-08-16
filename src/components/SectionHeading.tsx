import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  title: string;
  tagline?: string;
  /**
   * Drops the coffee band and sits the heading straight on the page. Used for
   * the first section after the hero, where a band would butt right up against
   * the navy chalkboard.
   */
  plain?: boolean;
  /** Extras that belong inside the heading, like the full menu typewriter. */
  children?: ReactNode;
}

/**
 * The banded header shared by every section. Warm coffee brown rather than the
 * chalkboard navy, which stays reserved for the hero and the footer.
 */
const SectionHeading = ({ title, tagline, plain = false, children }: Props) => {
  const tone = plain ? "coffee-text" : "text-cafe-cream";

  return (
    <div
      className={
        plain
          ? "px-6 pt-20 pb-2 md:pt-24 md:pb-4"
          : "section-banner px-6 py-16 md:py-20"
      }
    >
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className={`section-title ${tone}`}>{title}</h2>
        {tagline && <p className={`section-tagline ${tone} mt-3`}>{tagline}</p>}
        <div className={`rule-short ${tone}`} />
        {children}
      </Reveal>
    </div>
  );
};

export default SectionHeading;

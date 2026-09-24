import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

interface Props {
  title: string;
  tagline?: string;
  /** Extras that belong inside the sign, like the full menu typewriter. */
  children?: ReactNode;
  /** When set, the whole sign is a link to that page, with a small cue. */
  to?: string;
  cue?: string;
}

/**
 * The header every section shares, set on a hanging chalkboard menu sign.
 * Contained rather than full bleed, so it reads as a board on the wall instead
 * of a stripe across the page, and never butts into the navy hero or footer.
 */
const SectionHeading = ({ title, tagline, children, to, cue = "see everything" }: Props) => (
  <div className="px-6 pt-20 pb-0 text-center md:pt-24">
    <Reveal className={`section-sign${to ? " section-sign--linked" : ""}`}>
      <h2 className="section-title">{title}</h2>
      {tagline && <p className="section-tagline mt-3">{tagline}</p>}
      <div className="rule-short" />
      {children}
      {to && (
        <>
          <p className="section-sign__cue eyebrow" aria-hidden="true">
            {cue} ↗
          </p>
          <Link to={to} className="section-sign__link" aria-label={`${title}: ${cue}`} />
        </>
      )}
    </Reveal>
  </div>
);

export default SectionHeading;

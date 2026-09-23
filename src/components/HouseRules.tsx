import type React from "react";
import Reveal from "./Reveal";
import useReveal from "../hooks/useReveal";
import CoffeeStains from "./CoffeeStains";

interface Rule {
  name: string;
  note: string;
}

/**
 * A sample, not the full list. Enough to show the shape of the thing without
 * handing over the whole of it.
 */
const rules: Rule[] = [
  {
    name: "create luck",
    note: "reach out, show up, take the room you don't think you deserve yet.",
  },
  {
    name: "attention is raw material",
    note: "most of what competes for it isn't trying to build you anything.",
  },
  {
    name: "nuance over noise",
    note: "every interesting question has more sides than the internet allows.",
  },
  {
    name: "compound quietly",
    note: "the best work looks like nothing is happening for a long time.",
  },
];

/**
 * The closing section. Every other section hangs a small chalkboard sign above
 * cream; this one is the board itself, scaled up, so the finale reads as the
 * house rules posted by the counter and hands off to the chalkboard footer.
 */
const HouseRules = () => {
  // The stamp presses on its own scroll cue, not the board's: the board
  // reveals as soon as its top edge shows, which is too early for something
  // sitting in its top corner. This waits until the stamp is well up the
  // viewport (out of the bottom 40%).
  const stampRef = useReveal<SVGSVGElement>("0px 0px -40% 0px");

  return (
  <section id="philosophy-section" className="coffee-bg relative">
    <CoffeeStains variant="philosophy" />

    <div className="section-shell">
      <Reveal className="section-sign section-sign--board">
        {/* Rubber stamp on the corner; see .house-stamp for the press. */}
        <svg ref={stampRef} className="house-stamp" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path id="house-stamp-ring" d="M60 60m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0" />
            {/* Rubber-stamp ink: a little wobble on every edge, then patches
                knocked out with noise so the impression is uneven the way a
                real one is. Mild values keep the ring text legible. */}
            <filter id="house-stamp-ink" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="wobbled" />
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="3" result="grain" />
              <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.25" result="ink" />
              <feComposite in="wobbled" in2="ink" operator="in" />
            </filter>
          </defs>
          <g filter="url(#house-stamp-ink)">
            <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="2.75" />
            <circle cx="60" cy="60" r="52.5" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <circle cx="60" cy="60" r="37" fill="none" stroke="currentColor" strokeWidth="0.9" />
            <text textLength="300" lengthAdjust="spacing">
              <textPath href="#house-stamp-ring" startOffset="0">
                nabira's cafe · house rules · nabira's cafe · house rules ·
              </textPath>
            </text>
            {/* Cup with steam, centred */}
            <g transform="translate(38.5 36) scale(1.8)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 11h13l-1.4 8.2a2.4 2.4 0 0 1-2.4 2H8.8a2.4 2.4 0 0 1-2.4-2z" />
              <path d="M18 13.5c2.2 0 3.5 1 3.5 2.4s-1.3 2.4-3.5 2.4" />
              <path d="M3.5 23.5h16" />
              <path d="M9.2 7.8c-.9-1.2-.9-2.2 0-3.4" strokeWidth="1.1" opacity="0.8" />
              <path d="M12.2 8c-.9-1.4-.9-2.6 0-4" strokeWidth="1.1" opacity="0.8" />
              <path d="M15.1 7.8c-.9-1.2-.9-2.2 0-3.4" strokeWidth="1.1" opacity="0.8" />
            </g>
          </g>
        </svg>

        <div className="text-center">
          <h2 className="section-title">house rules</h2>
          <p className="section-tagline mt-3">the ones i actually keep</p>
          <div className="rule-short" />
        </div>

        <p className="body-copy house-board__intro mt-10">
          i build at an intersection: agent infrastructure and evals on one side,
          literature and philosophy on the other. most people treat those as
          separate lives. i think the second one is where the conviction for the
          first comes from, and that our limits are imaginative long before
          they're physical.
        </p>

        <ul className="house-rules mt-9">
          {rules.map((rule, index) => (
            <li
              key={rule.name}
              className="house-rule"
              style={{ "--rule-index": index } as React.CSSProperties}
            >
              {/* Typed out character by character once the board is on
                  screen; see .house-rule__name in App.css for the clock. The
                  real name stays on the heading for readers and search. */}
              <h3
                className="house-rule__name"
                aria-label={rule.name}
                style={
                  {
                    "--char-count": rule.name.length,
                    "--cursor-blinks": Math.ceil((rule.name.length * 55 + 350) / 900),
                  } as React.CSSProperties
                }
              >
                <span aria-hidden="true">
                  {Array.from(rule.name).map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className="house-rule__char"
                      style={{ "--char-index": charIndex } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                  <span className="house-rule__cursor">‸</span>
                </span>
              </h3>
              <p className="body-copy house-rule__note">{rule.note}</p>
            </li>
          ))}
        </ul>

        <div className="house-board__closer">
          <p className="house-board__closing">
            the world is very big. i find that exciting rather than intimidating.
            there is more to build, more to read, and further to go than any of
            us can see from here.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
  );
};

export default HouseRules;

import experience, { programs } from "../data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const Experience = () => {
  return (
    <section id="experience-section" className="coffee-bg relative">
      <SectionHeading title="experience" tagline="where i've been brewing" />

      <div className="section-shell section-shell--tight">
        {/* Order history receipt */}
        <div className="mx-auto max-w-2xl">
          <Reveal className="coffee-text">
            <div className="receipt-meta flex items-baseline justify-end opacity-50">
              <span>{experience.length} items</span>
            </div>
            <hr className="receipt-rule mt-4 mb-4" />
          </Reveal>

          <ol className="timeline">
            <div className="timeline-line coffee-text" aria-hidden="true" />

            {experience.map((entry, index) => (
              <Reveal
                as="li"
                key={`${entry.org}-${entry.role}`}
                delay={index * 70}
                className="timeline-entry relative pb-16 last:pb-0"
              >
                <span className="timeline-dot" aria-hidden="true" />

                <div className="coffee-text">
                  {/* Date + location line, monospace so it reads like a receipt */}
                  <div className="receipt-meta mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 opacity-60">
                    <span>{entry.dates}</span>
                    {entry.location && (
                      <>
                        <span aria-hidden="true" className="opacity-50">
                          ·
                        </span>
                        <span className="border border-cafe-espresso/35 dark:border-cafe-cream/35 px-1.5 py-px text-[0.625rem] tracking-[0.14em]">
                          {entry.location}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="entry-title">
                    {entry.role}
                  </h3>
                  <p className="body-copy mt-1.5 text-sm opacity-75">{entry.org}</p>
                  <p className="body-copy mt-3.5 text-sm opacity-60">{entry.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Programs */}
          <Reveal className="coffee-text mt-20">
            <hr className="receipt-rule mb-8" />
            <p className="eyebrow mb-7">also been to</p>

            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {programs.map((program) => (
                <div
                  key={program.name}
                  className="flex items-baseline justify-between gap-4 border-b border-cafe-espresso/15 dark:border-cafe-cream/15 pb-4"
                >
                  <div>
                    <p className="entry-title entry-title--sm">{program.name}</p>
                    <p className="body-copy text-xs opacity-60">{program.org}</p>
                  </div>
                  <span className="receipt-meta shrink-0 opacity-50">{program.date}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Experience;

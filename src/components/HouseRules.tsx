import Reveal from "./Reveal";

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
const HouseRules = () => (
  <section id="philosophy-section" className="coffee-bg relative">
    <div className="section-shell">
      <Reveal className="section-sign section-sign--board">
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
          {rules.map((rule) => (
            <li key={rule.name} className="house-rule">
              <h3 className="house-rule__name">{rule.name}</h3>
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

export default HouseRules;

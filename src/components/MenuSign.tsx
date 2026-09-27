import Typewriter from "typewriter-effect";
import SectionHeading from "./SectionHeading";

interface Props {
  /** Link the sign to the full projects page. */
  to?: string;
  /** "the full menu" on the projects page; the home page shows a few, so
      it says so. */
  title?: string;
  tagline?: string;
  /** The "what's cooking" typewriter. Off on the home page, where it
      competed with the "see the full menu" cue under it. */
  typewriter?: boolean;
}

/** The projects sign, with the "what's cooking" typewriter inside it. */
const MenuSign = ({
  to,
  title = "the full menu",
  tagline = "everything on the board",
  typewriter = true,
}: Props) => (
  <SectionHeading title={title} tagline={tagline} to={to} cue="see the full menu">
    {typewriter && (
    <div className="mt-8">
      <p className="eyebrow text-cafe-cream mb-3">what's cooking</p>
      <div className="typewriter-slot">
        {/* Widest of the strings, so the board never resizes as it cycles. */}
        <span
          className="typewriter-sizer font-mono text-[0.8125rem] tracking-[0.12em]"
          aria-hidden="true"
        >
          something with a goose in it‸
        </span>
        <Typewriter
          options={{
            strings: [
              "agent evals and retrieval",
              "mcp scrapers and langgraph",
              "an obsidian plugin or two",
              "hackathon builds at 4am",
              "something with a goose in it",
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 20,
            cursor: "‸",
            wrapperClassName:
              "font-mono text-[0.8125rem] text-cafe-cream/80 tracking-[0.12em]",
          }}
        />
      </div>
    </div>
    )}
  </SectionHeading>
);

export default MenuSign;

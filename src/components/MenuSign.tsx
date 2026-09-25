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
        {/*
          Hidden width reservation, so the board never resizes as the
          typewriter cycles. Deliberately wider than the longest live
          string ("exploring rag and langchain", 179px) to hold the board
          at the width it had before "magic" was trimmed.
        */}
        <span
          className="typewriter-sizer font-mono text-[0.8125rem] tracking-[0.12em]"
          aria-hidden="true"
        >
          learning dsa and web dev magic‸
        </span>
        <Typewriter
          options={{
            strings: [
              "learning dsa and web dev",
              "exploring rag and langchain",
              "building cool projects",
              "crafting the perfect stack",
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

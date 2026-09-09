interface Stain {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Width in px. Height follows the image's own aspect ratio. */
  size: number;
  rotate: number;
  flip?: boolean;
  /** Overrides the .coffee-stain default when a mark should sit further back. */
  opacity?: number;
}

/**
 * Hand placed rather than random: random re-rolls on every render and happily
 * drops a mark squarely behind a paragraph.
 *
 * Sides alternate strictly down the page. Read top to bottom the whole site
 * runs L R L R L R L R L R L R L, across section boundaries as well as within
 * them, so no side ever gets two marks in a row. Every stain is positioned with
 * `top` rather than a mix of top and bottom, so that order is readable here
 * instead of having to be worked out. Sizes, angles and opacities are spread
 * wide so the one PNG never reads as a repeated stamp.
 */
const PRESETS = {
  // L R L
  experience: [
    { top: "8%", left: "3%", size: 150, rotate: -12 },
    { top: "42%", right: "5%", size: 185, rotate: 24, flip: true },
    { top: "76%", left: "8%", size: 95, rotate: 140, opacity: 0.07 },
  ],
  // R L
  writing: [
    { top: "14%", right: "4%", size: 165, rotate: 18 },
    { top: "70%", left: "5%", size: 125, rotate: -34, flip: true },
  ],
  // R L R
  consuming: [
    { top: "10%", right: "6%", size: 140, rotate: 52 },
    { top: "45%", left: "4%", size: 100, rotate: -8, opacity: 0.08 },
    { top: "78%", right: "4%", size: 178, rotate: -22, flip: true },
  ],
  // L R L
  projects: [
    { top: "15%", left: "2%", size: 160, rotate: 34, flip: true },
    { top: "48%", right: "4%", size: 118, rotate: -46 },
    { top: "80%", left: "6%", size: 132, rotate: 112, opacity: 0.08 },
  ],
  // R L
  philosophy: [
    { top: "12%", right: "3%", size: 145, rotate: -28 },
    { top: "74%", left: "4%", size: 122, rotate: 62, flip: true, opacity: 0.09 },
  ],
} satisfies Record<string, Stain[]>;

interface Props {
  variant: keyof typeof PRESETS;
}

const CoffeeStains = ({ variant }: Props) => (
  <>
    {PRESETS[variant].map((stain, index) => (
      <img
        key={index}
        src="/assets/website/coffee stain.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="coffee-stain hidden md:block"
        style={{
          top: stain.top,
          bottom: stain.bottom,
          left: stain.left,
          right: stain.right,
          width: `${stain.size}px`,
          transform: `rotate(${stain.rotate}deg)${stain.flip ? " scaleX(-1)" : ""}`,
          opacity: stain.opacity,
        }}
      />
    ))}
  </>
);

export default CoffeeStains;

import { useState } from "react";
import Typewriter from "typewriter-effect";

/** Slow, soft wisps rising off the cup. Position is relative to the cup wrapper. */
const wisps = [
  { left: "38%", delay: "0.9s", duration: "6.5s", width: "6px" },
  { left: "50%", delay: "2.5s", duration: "7.4s", width: "7px" },
  { left: "61%", delay: "4s", duration: "6.9s", width: "5px" },
];

const Hero = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const spinCup = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    window.setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <section id="home-section" className="relative">
      <div className="chalkboard relative flex min-h-[62vh] items-center justify-center overflow-hidden px-6 py-20 md:py-24">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-cafe-cream font-serif text-2xl md:text-3xl font-light tracking-[0.04em]">
            today's special
          </h1>
          <div className="mx-auto mt-4 h-px w-16 bg-cafe-cream opacity-35" />

          <p className="eyebrow text-cafe-cream mt-14">now brewing</p>

          <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
            {/* Coffee cup with steam */}
            <div className="relative hidden sm:block">
              <div className="pointer-events-none absolute inset-x-0 top-6 h-0" aria-hidden="true">
                {wisps.map((wisp, index) => (
                  <span
                    key={index}
                    className="steam-wisp"
                    style={{
                      left: wisp.left,
                      width: wisp.width,
                      animationDelay: wisp.delay,
                      animationDuration: wisp.duration,
                    }}
                  />
                ))}
              </div>

              <div
                className={`cup-container relative flex h-48 w-40 items-center justify-center ${
                  isSpinning ? "cup-spin" : ""
                }`}
                onMouseEnter={spinCup}
              >
                <img
                  src="/assets/website/new coffee cup.webp"
                  alt=""
                  className="h-full w-full object-contain"
                />
                <img
                  src="/assets/website/pfp.jpg"
                  alt="nabira"
                  className="absolute left-1/2 h-24 w-24 rounded-full border-4 object-cover shadow-lg"
                  style={{
                    borderColor: "#A0826D",
                    transform: "translateX(-47.5%)",
                    top: "2.875rem",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h2 className="display-xl text-cafe-cream">nabira rashid</h2>
              <p className="body-copy text-cafe-cream mt-3 text-sm opacity-75 sm:self-end">
                cs @ uwaterloo • creator • coffee enthusiast
              </p>
            </div>
          </div>

          <div className="typewriter-slot mt-14 flex min-h-8 items-center justify-center">
            {/* Widest of the five strings, measured. Stops the line jittering. */}
            <span
              className="typewriter-sizer font-serif text-base font-light tracking-[0.02em]"
              aria-hidden="true"
            >
              brewing personal projects‸
            </span>
            <Typewriter
              options={{
                strings: [
                  "brewing personal projects",
                  "exploring hackathons",
                  "crafting with code",
                  "making new friends",
                  "finding coffee chats",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 25,
                cursor: "‸",
                wrapperClassName:
                  "font-serif text-base font-light text-cafe-cream/85 tracking-[0.02em]",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

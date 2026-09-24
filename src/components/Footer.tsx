import { FaInstagram, FaGithub, FaEnvelope, FaXTwitter } from "react-icons/fa6";
import useReveal from "../hooks/useReveal";

const socials = [
  {
    label: "instagram",
    href: "https://www.instagram.com/techwithnabira/",
    Icon: FaInstagram,
  },
  { label: "x", href: "https://x.com/nabirarashid", Icon: FaXTwitter },
  { label: "github", href: "https://github.com/nabirarashid/", Icon: FaGithub },
  { label: "email", href: "mailto:nabira.rashidm@gmail.com", Icon: FaEnvelope },
];

/* Steam off the pot. Same wisps as the hero cup; staggered so there is
   always one rising. */
const wisps = [
  { left: "36%", width: "7px", delay: "0s", duration: "5.6s" },
  { left: "49%", width: "9px", delay: "1.9s", duration: "6.4s" },
  { left: "62%", width: "7px", delay: "3.4s", duration: "5.9s" },
];

const Footer = () => {
  // The chair pulls itself up once the counter is on screen.
  const counterRef = useReveal<HTMLDivElement>("0px 0px -10% 0px");

  return (
    <footer className="chalkboard border-t border-cafe-cream/15 px-6 py-20 transition-colors duration-500 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div ref={counterRef} className="counter">
          {/* A moka pot on the hob, chalked on the board, still brewing. */}
          <div className="brew" aria-hidden="true">
            <div className="brew__steam">
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
            <svg className="brew__pot" viewBox="0 0 64 64">
              <path d="M20 60h24l2.5-18h-29z" />
              <path d="M16 42h32" />
              <path d="M19 39l-2.5-18h31l-2.5 18z" />
              <path d="M15 21h34" />
              <path d="M23 21c3-6 15-6 18 0" />
              <path d="M32 14.5v-3" />
              <circle cx="32" cy="10" r="1.6" />
              <path d="M16.5 27l-6.5-4.5v7" />
              <path d="M47.5 24c8 0 10.5 6.5 6 13.5" />
            </svg>
            <div className="brew__hob" />
          </div>

          <div className="counter__copy">
            <p className="eyebrow text-cafe-cream opacity-70">last call</p>

            <p className="chair-line text-cafe-cream font-serif text-xl md:text-2xl font-normal tracking-[0.01em]">
              <span className="chair-icon" aria-hidden="true" />
              pull up a chair and let's create something together
            </p>

            <p className="text-cafe-cream body-copy text-sm opacity-65">
              thanks for stopping by ⭑.ᐟ
            </p>

            <div className="counter__links">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="counter__link"
                  title={label}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="counter__foot">
          <p className="text-cafe-cream/70 body-copy text-xs tracking-[0.08em]">
            nabira's cafe • made with lots of coffee ◡̈
          </p>
          <p className="receipt-meta text-cafe-cream/60">
            open · whenever the coffee's on
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

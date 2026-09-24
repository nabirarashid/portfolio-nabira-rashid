import { FaInstagram, FaGithub, FaEnvelope, FaXTwitter } from "react-icons/fa6";

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
  return (
    <footer className="chalkboard border-t border-cafe-cream/15 px-6 py-20 transition-colors duration-500 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="counter">
          {/* A cup on its saucer, chalked on the board, still steaming. */}
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
            <svg className="brew__cup" viewBox="0 0 64 64">
              {/* bowl */}
              <path d="M12 24h34l-3.6 22.5a5 5 0 0 1-5 4.3H20.6a5 5 0 0 1-5-4.3z" />
              {/* handle */}
              <path d="M46 29.5c7 0 10.5 3.2 10.5 8s-3.5 8-10.5 8" />
              {/* saucer */}
              <path d="M8 56.5h42" />
              <path d="M14 60.5h30" opacity="0.6" />
            </svg>
          </div>

          <div className="counter__copy">
            <p className="eyebrow text-cafe-cream opacity-70">last call</p>

            <p className="text-cafe-cream font-serif text-xl md:text-2xl font-normal tracking-[0.01em]">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;

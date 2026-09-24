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
  { left: "38%", width: "6px", delay: "0s", duration: "5.6s" },
  { left: "50%", width: "8px", delay: "1.9s", duration: "6.4s" },
  { left: "62%", width: "6px", delay: "3.4s", duration: "5.9s" },
];

const Footer = () => {
  return (
    <footer className="chalkboard border-t border-cafe-cream/15 px-6 py-20 transition-colors duration-500">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          {/* A moka pot on the counter, chalked on the board, still brewing. */}
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
              {/* bottom chamber */}
              <path d="M20 60h24l2.5-18h-29z" />
              {/* waist */}
              <path d="M16 42h32" />
              {/* top chamber */}
              <path d="M19 39l-2.5-18h31l-2.5 18z" />
              {/* lid, dome, knob */}
              <path d="M15 21h34" />
              <path d="M23 21c3-6 15-6 18 0" />
              <path d="M32 14.5v-3" />
              <circle cx="32" cy="10" r="1.6" />
              {/* spout */}
              <path d="M16.5 27l-6.5-4.5v7" />
              {/* handle */}
              <path d="M47.5 24c8 0 10.5 6.5 6 13.5" />
              {/* hob line */}
              <path d="M12 60h40" strokeDasharray="2 4" opacity="0.5" />
            </svg>
          </div>

          <p className="text-cafe-cream body-copy text-sm opacity-70">
            thanks for stopping by ⭑.ᐟ
          </p>
          <p className="chair-line text-cafe-cream mt-3 font-serif text-lg md:text-xl font-normal tracking-[0.01em]">
            <span className="chair-icon" aria-hidden="true" />
            pull up a chair and let's create something together
          </p>

          {/* 44px hit areas. The icons stay 20px, the gap tightens to keep
              the row roughly the width it was. */}
          <div className="mt-10 flex justify-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-cafe-cream inline-flex h-11 w-11 items-center justify-center rounded-full opacity-70 transition-all duration-300 hover:bg-cafe-cream/10 hover:opacity-100"
                title={label}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-cafe-cream/15 pt-8 text-center">
          <p className="text-cafe-cream/70 body-copy text-xs tracking-[0.08em]">
            nabira's cafe • made with lots of coffee ◡̈
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

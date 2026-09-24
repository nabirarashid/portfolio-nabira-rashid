import { FaInstagram, FaGithub, FaEnvelope, FaXTwitter } from "react-icons/fa6";
import DoodleBoard from "./DoodleBoard";

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

const Footer = () => {
  return (
    <footer className="chalkboard border-t border-cafe-cream/15 px-6 py-20 transition-colors duration-500 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="counter">
          <div className="counter__copy">
            <p className="eyebrow text-cafe-cream opacity-70">last call</p>

            <p className="text-cafe-cream font-serif text-xl md:text-2xl font-normal tracking-[0.01em]">
              pick up a cup and let's create something together
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

          {/* The board, and the cup you draw on it with. */}
          <div className="counter__board">
            <DoodleBoard />
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

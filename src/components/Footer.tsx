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

const Footer = () => {
  return (
    <footer className="chalkboard border-t border-cafe-cream/15 px-6 py-20 transition-colors duration-500">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="text-cafe-cream body-copy text-sm opacity-70">
            thanks for stopping by ⭑.ᐟ
          </p>
          <p className="chair-line text-cafe-cream mt-3 font-serif text-lg md:text-xl font-normal tracking-[0.01em]">
            <span className="chair-icon" aria-hidden="true" />
            pull up a chair and let's create something together
          </p>

          <div className="mt-10 flex justify-center gap-8">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-cafe-cream opacity-70 transition-all duration-300 hover:opacity-100"
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

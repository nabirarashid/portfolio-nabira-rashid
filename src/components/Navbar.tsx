import { useEffect, useState } from "react";

const navItems = [
  { name: "experience", id: "experience-section" },
  { name: "writing", id: "writing-section" },
  { name: "projects", id: "projects-section" },
  { name: "philosophy", id: "philosophy-section" },
];

// The hero has no nav link, but we still watch it so scrolling back up clears the underline.
const trackedSections = [{ name: "home", id: "home-section" }, ...navItems];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // Keep the nav in sync with whatever section the visitor is actually reading.
  useEffect(() => {
    const sections = trackedSections
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const match = trackedSections.find((item) => item.id === visible.target.id);
        if (match) setActiveItem(match.name);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string, name: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveItem(name);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="coffee-bg sticky top-0 z-50 border-b border-cafe-espresso/15 dark:border-cafe-cream/15 backdrop-blur-sm transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection("home-section", "home")}
            className="logo-button flex items-center gap-3 transition-opacity duration-300 hover:opacity-70"
          >
            <span className="logo-cup relative inline-flex items-center">
              <span className="logo-steam" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="cup-logo text-xl">☕</span>
            </span>
            <span className="nav-link coffee-text">
              nabira rashid
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex lg:gap-9">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id, item.name)}
                className={`nav-link coffee-text border-b pb-0.5 transition-all duration-300 ${
                  activeItem === item.name
                    ? "border-cafe-espresso dark:border-cafe-cream opacity-100"
                    : "border-transparent opacity-55 hover:opacity-100"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex">
            <a
              href="mailto:nabira.rashidm@gmail.com"
              className="btn-ghost coffee-text lowercase"
            >
              let's chat ☻
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="coffee-text opacity-70 transition-opacity hover:opacity-100"
              aria-label="toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 border-t border-cafe-espresso/15 dark:border-cafe-cream/15 pt-4 md:hidden">
            <div className="mb-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id, item.name)}
                  className={`nav-link coffee-text text-left transition-all duration-300 ${
                    activeItem === item.name ? "opacity-100" : "opacity-55"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <a
              href="mailto:nabira.rashidm@gmail.com"
              className="btn-ghost coffee-text w-full lowercase"
            >
              let's chat ☻
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

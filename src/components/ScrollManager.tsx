import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Keeps scrolling sane across routes: a new page starts at the top, and a
 * hash (/#writing-section) scrolls to that section once it exists, which
 * covers the nav links when they are used from another page.
 */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    const id = hash.slice(1);
    let tries = 0;
    const attempt = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (tries++ < 20) window.setTimeout(attempt, 50);
    };
    attempt();
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;

import { useEffect, useRef } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import AudioControl from "./components/AudioControl";

/** How far the cup leans into the direction it is travelling. Kept modest so it
 *  reads as a cup tipping, not one about to spill. */
const MAX_TILT_DEG = 13;
const TILT_SENSITIVITY = 1.1;

const CLICKABLE_SELECTOR =
  'a, button, input, select, textarea, summary, label, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';

const App = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Touch-only devices keep their native behaviour and never see the bean.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    let x = 0;
    let y = 0;
    let lastX = 0;
    let tilt = 0;
    let rafId = 0;
    let isPressed = false;

    const applyPosition = () => {
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
      root.style.setProperty("--cursor-tilt", `${tilt.toFixed(2)}deg`);
      rafId = 0;
    };

    const queueFrame = () => {
      if (!rafId) rafId = window.requestAnimationFrame(applyPosition);
    };

    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;

      // Reveal only once we know where the pointer actually is.
      if (cursor.dataset.active !== "true") cursor.dataset.active = "true";

      // Lean towards travel direction, then ease back to upright when still.
      const velocityX = x - lastX;
      lastX = x;
      const target = Math.max(
        -MAX_TILT_DEG,
        Math.min(MAX_TILT_DEG, velocityX * TILT_SENSITIVITY)
      );
      tilt += (target - tilt) * 0.25;

      const overClickable = !!(event.target as Element | null)?.closest?.(
        CLICKABLE_SELECTOR
      );

      if (!isPressed) {
        cursor.dataset.state = overClickable ? "link" : "idle";
      }

      queueFrame();
    };

    // Bleed the tilt back to neutral while the pointer rests.
    const settle = window.setInterval(() => {
      if (Math.abs(tilt) < 0.15) return;
      tilt *= 0.7;
      queueFrame();
    }, 90);

    const handleDown = () => {
      isPressed = true;
      cursor.dataset.state = "press";
    };

    const handleUp = (event: MouseEvent) => {
      isPressed = false;
      const overClickable = !!(event.target as Element | null)?.closest?.(
        CLICKABLE_SELECTOR
      );
      cursor.dataset.state = overClickable ? "link" : "idle";
    };

    // Fade out when the pointer leaves the window. The next move brings it back.
    const handleLeave = () => {
      cursor.dataset.active = "false";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      window.clearInterval(settle);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="coffee-bg min-h-screen transition-colors duration-500">
        <div ref={cursorRef} className="bean-cursor" data-state="idle" aria-hidden="true" />
        <Navbar />
        <Home />
        <Footer />
        <AudioControl />
      </div>
    </ThemeProvider>
  );
};

export default App;

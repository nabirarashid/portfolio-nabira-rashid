import Home from './pages/Home'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";
import AudioControl from "./components/AudioControl";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    let x = 0;
    let y = 0;
    let rafId = 0;

    const applyPosition = () => {
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
      rafId = 0;
    };

    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(applyPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <AudioProvider>
        <div className="coffee-bg min-h-screen transition-colors duration-500">
          <div className="bean-cursor" aria-hidden="true" />
          <Navbar />
          <Home />
          <Footer />
          <AudioControl />
        </div>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default App
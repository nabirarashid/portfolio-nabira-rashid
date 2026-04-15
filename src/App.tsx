import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";
import AudioControl from "./components/AudioControl";
import { useEffect } from "react";

const AppContent = () => {
  const location = useLocation();

  // Simple cursor reset on route change - let CSS do the work
  useEffect(() => {
    // Wait for DOM to settle after route transition
    const timer = setTimeout(() => {
      document.documentElement.style.setProperty('cursor', 'url("/assets/website/smollest-bean.png"), auto', 'important');
      document.body.style.setProperty('cursor', 'url("/assets/website/smollest-bean.png"), auto', 'important');
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="coffee-bg min-h-screen transition-colors duration-500">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <AudioControl />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Router>
          <AppContent />
        </Router>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default App
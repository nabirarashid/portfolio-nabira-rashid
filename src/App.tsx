import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";
import AudioControl from "./components/AudioControl";

const App = () => {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Router>
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
        </Router>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default App
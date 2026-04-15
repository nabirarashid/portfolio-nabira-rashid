import { FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="chalkboard border-t border-cafe-cream/20 max-w-full px-8 py-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA and Contact Section */}
        <div className="text-center mb-12">
          <p className="text-cafe-cream font-serif text-lg font-light mb-2 drop-shadow-md">
            thanks for stopping by
          </p>
          <p className="text-cafe-cream font-serif text-xl font-light mb-8 tracking-wide drop-shadow-md">
            pull up a chair and let's create something together
          </p>
          
          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a 
              href="https://www.instagram.com/tech.with.nabira/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cafe-cream hover:text-cafe-matcha transition-colors duration-300"
              title="instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/nabirarashid/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cafe-cream hover:text-cafe-matcha transition-colors duration-300"
              title="github"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a 
              href="mailto:nabira.rashidm@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cafe-cream hover:text-cafe-matcha transition-colors duration-300"
              title="email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Footer Credits */}
        <div className="border-t border-cafe-cream/20 pt-8 text-center">
          <p className="text-cafe-cream/80 font-light text-sm drop-shadow-md">
            nabira's cafe • made with coffee & creativity
          </p>
          <p className="text-cafe-cream/70 text-xs font-light mt-2 drop-shadow-md">
            react, tailwind, and a lot of ☕
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
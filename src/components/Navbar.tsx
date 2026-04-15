import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'home', href: '/' },
    { name: 'about', href: '/about' },
    { name: 'projects', href: '/projects' }
  ];

  const getActiveItem = () => {
    if (location.pathname === '/') return 'home';
    return location.pathname.slice(1);
  };

  const activeItem = getActiveItem();

  return (
    <nav className="sticky top-0 z-50 coffee-bg border-b border-cafe-espresso/20 dark:border-cafe-cream/20 shadow-sm transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group hover:opacity-70 transition-opacity duration-300"
          >
            <div className="text-2xl">☕</div>
            <div className="font-light coffee-text text-sm tracking-wide">
              nabira rashid
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`text-sm font-light tracking-wide transition-all duration-300 lowercase ${
                  activeItem === item.name
                    ? 'coffee-text dark:text-cafe-cream border-b border-cafe-espresso dark:border-cafe-cream'
                    : 'coffee-text dark:text-cafe-cream/60 hover:coffee-text dark:hover:text-cafe-cream'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex">
            <button
              onClick={() => window.location.href = 'mailto:nabira.rashidm@gmail.com'}
              className="px-6 py-2 border border-cafe-espresso dark:border-cafe-cream coffee-text hover:bg-cafe-espresso/10 dark:hover:bg-cafe-cream/10 transition-all duration-300 font-light tracking-wide text-sm lowercase"
            >
              let's chat
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="coffee-text/60 hover:coffee-text transition-colors"
              aria-label="toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-cafe-espresso/20 dark:border-cafe-cream/20">
            <div className="flex flex-col gap-3 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-sm font-light tracking-wide transition-all duration-300 lowercase text-left ${
                    activeItem === item.name
                      ? 'coffee-text'
                      : 'coffee-text/60 hover:coffee-text'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => window.location.href = 'mailto:nabira.rashidm@gmail.com'}
              className="w-full px-6 py-2 border border-cafe-espresso dark:border-cafe-cream coffee-text hover:bg-cafe-espresso/10 dark:hover:bg-cafe-cream/10 transition-all duration-300 font-light tracking-wide text-sm lowercase"
            >
              let's chat
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Cpu } from 'lucide-react';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Education', id: 'education' },
  { label: 'Internships', id: 'internships' },
  { label: 'Skills', id: 'skills' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = ({ isLight, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Scroll styling & Active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // IntersectionObserver to watch active sections
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Center-ish triggers
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Offset for navbar height
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-3 ${
        isScrolled
          ? 'bg-opacity-80 backdrop-blur-xl border-b border-opacity-10 shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
      style={{
        backgroundColor: isScrolled ? 'var(--glass-bg)' : 'transparent',
        borderColor: isScrolled ? 'var(--glass-border)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 font-orbitron font-black text-xl tracking-wider select-none text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
        >
          <Cpu className="w-6 h-6 text-primary animate-pulse-slow" />
          <span>AP.AI</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`nav-link text-sm font-medium transition-colors hover:text-primary ${
                activeSection === item.id ? 'active text-primary font-bold' : 'text-muted'
              }`}
              style={{
                '--primary': 'var(--primary)',
                '--accent': 'var(--accent)',
                color: activeSection === item.id ? 'var(--primary)' : 'var(--text-muted)',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Buttons: Theme Toggle + Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass-card hover:text-primary transition-all duration-300 relative group overflow-hidden border border-opacity-10"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-secondary" />
            ) : (
              <Sun className="w-4 h-4 text-primary" />
            )}
            <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-card border border-opacity-10"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-accent" />
            ) : (
              <Menu className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-[100%] left-0 right-0 py-6 px-6 glass-panel border-t flex flex-col gap-4 shadow-2xl animate-fade-in"
          style={{
            borderColor: 'var(--glass-border)',
            backgroundColor: 'var(--glass-bg)',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-lg py-2 border-b border-opacity-5 transition-colors ${
                activeSection === item.id ? 'text-primary font-bold pl-2 border-l-2 border-primary' : 'text-muted'
              }`}
              style={{
                borderColor: 'var(--glass-border)',
                color: activeSection === item.id ? 'var(--primary)' : 'var(--text-muted)',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ThreeBackground from './Three/ThreeBackground';
import AIAssistant from './components/AIAssistant';
import CertificateModal from './components/CertificateModal';

// Section Imports
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Internships from './sections/Internships';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Projects from './sections/Projects';
import Hackathon from './sections/Hackathon';
import Contact from './sections/Contact';

function App() {
  const [isLight, setIsLight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
      setIsLight(true);
      document.documentElement.classList.add('light');
    } else {
      setIsLight(false);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsLight((prev) => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      }
      return nextTheme;
    });
  };

  // 2. Scroll Progress Telemetry
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // 3. Modal Actions
  const handleOpenCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseCertificateModal = () => {
    setIsModalOpen(false);
    // Keep selection state for exit transition, clear later
    setTimeout(() => {
      setSelectedCertificate(null);
    }, 300);
  };

  return (
    <div className="relative min-h-screen text-slate-100 transition-colors duration-700 selection:bg-primary/20 selection:text-primary">
      {/* 3D Particle universe and Constellation Lines */}
      <ThreeBackground isLight={isLight} />

      {/* Futuristic Custom Cursor */}
      <CustomCursor />

      {/* Floating Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-secondary to-accent z-[9999] shadow-glow"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)',
        }}
      />

      {/* Global Navigation Bar */}
      <Navbar isLight={isLight} toggleTheme={toggleTheme} />

      {/* Core Sections Container */}
      <main className="relative z-10 overflow-hidden">
        
        {/* Dynamic decorative light blobs (absolute positioned) */}
        <div className="glow-blob w-[500px] h-[500px] bg-primary/10 top-[10%] left-[-10%] rounded-full filter blur-[120px] pointer-events-none" />
        <div className="glow-blob w-[600px] h-[600px] bg-secondary/10 top-[40%] right-[-10%] rounded-full filter blur-[150px] pointer-events-none" />
        <div className="glow-blob w-[450px] h-[450px] bg-accent/5 top-[70%] left-[5%] rounded-full filter blur-[100px] pointer-events-none" />

        {/* Portfolio sections */}
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <About />
          <Education />
          <Internships onViewCertificate={handleOpenCertificateModal} />
          <Skills />
          <Certifications onSelectCertificate={handleOpenCertificateModal} />
          <Projects />
          <Hackathon />
          <Contact />
        </div>
      </main>

      {/* Floating AI Assistant Chatbot */}
      <AIAssistant />

      {/* Certificate popup modal */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={handleCloseCertificateModal}
        certificate={selectedCertificate}
      />

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-opacity-5 text-center text-xs text-muted"
              style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--bg-main)' }}>
        <p className="font-orbitron font-medium tracking-wider">
          © {new Date().getFullYear()} AVIJIT PATRA • AI ENGINEER PORTFOLIO
        </p>
        <p className="text-[10px] mt-1 text-slate-500 font-sans">
          Built with React.js, Tailwind CSS, Framer Motion & Three.js.
        </p>
      </footer>
    </div>
  );
}

export default App;

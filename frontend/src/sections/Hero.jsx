import React, { useState, useEffect } from 'react';
import { Mail, FileText, ArrowRight, Sparkles, Brain, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const roles = [
  "AI Engineer",
  "Data Science Enthusiast",
  "Full Stack Developer"
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect loop
  useEffect(() => {
    let timer;
    const currentFullText = roles[roleIndex];
    const speed = isDeleting ? 40 : 100;

    if (!isDeleting && displayText === currentFullText) {
      // Pause at full text before deleting
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentFullText.substring(0, displayText.length - 1)
            : currentFullText.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center pt-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-secondary/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center">
        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-orbitron font-semibold tracking-wider mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>WELCOME TO THE AI PORTFOLIO</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-orbitron tracking-tight mb-4"
        >
          <span className="text-white">Avijit </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent glow-text">
            Patra
          </span>
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl font-outfit font-semibold tracking-wide h-10 mb-6 text-muted flex items-center justify-center gap-2"
        >
          <span>I'm a </span>
          <span className="text-white border-r-2 border-primary pr-1 font-mono">
            {displayText}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl text-sm sm:text-base text-muted/90 mb-10 leading-relaxed font-sans"
        >
          Building Intelligent Systems with AI, Machine Learning, Computer Vision & RAG Technologies.
        </motion.p>

        {/* Social Links & CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <div className="flex gap-4">
            <button
              onClick={() => handleScrollTo('projects')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 clickable"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3 rounded-xl glass-card text-white font-semibold text-xs tracking-wider uppercase border hover:border-primary hover:text-primary hover:scale-105 active:scale-95 transition-all duration-300 clickable"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              Contact Me
            </button>
          </div>

          <div className="w-px h-6 bg-slate-700 hidden sm:block" />

          {/* Social Icons */}
          <div className="flex gap-3">
            <a
              href="https://linkedin.com/in/avijit-patra-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card hover:text-primary transition-colors border border-opacity-10 clickable"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/avijit-patra"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card hover:text-primary transition-colors border border-opacity-10 clickable"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:avijitpatra.official@gmail.com"
              className="p-3 rounded-full glass-card hover:text-primary transition-colors border border-opacity-10 clickable"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {[
            { label: 'Internships Completed', val: '2+', icon: <Briefcase className="w-4 h-4 text-primary" /> },
            { label: 'Certificates Earned', val: '10+', icon: <Award className="w-4 h-4 text-secondary" /> },
            { label: 'Focus Areas', val: 'AI & ML', icon: <Brain className="w-4 h-4 text-accent animate-pulse-slow" /> },
            { label: 'GIET HackFest 2.0', val: 'Winner 🏆', icon: <Award className="w-4 h-4 text-primary" /> },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 relative group overflow-hidden"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 mb-2 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-xl font-bold font-orbitron text-white">{stat.val}</span>
              <span className="text-[10px] text-muted text-center mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

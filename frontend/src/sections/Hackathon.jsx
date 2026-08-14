import React from 'react';
import { Award, Trophy, Medal, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Hackathon = () => {
  
  const handleConfetti = (e) => {
    // 1. Launch confetti particles
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00E5FF', '#7B61FF', '#00FFB3', '#ffffff']
    });

    // 2. Extra firework burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00E5FF', '#7B61FF']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00FFB3', '#7B61FF']
      });
    }, 250);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    handleConfetti();
    // Open LinkedIn post in a new window after a small delay
    setTimeout(() => {
      window.open('https://linkedin.com/in/avijit-patra-ai', '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-4xl mx-auto text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <Trophy className="w-7 h-7 text-accent animate-bounce [animation-duration:4s]" />
          <span>Hackathon Victory</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      {/* Glass card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', damping: 20 }}
        className="glass-card border rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        style={{
          borderColor: 'var(--glass-border)',
          backgroundColor: 'var(--glass-bg)',
        }}
      >
        {/* Shimmer element */}
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-shimmer pointer-events-none" />

        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 rounded-full filter blur-2xl pointer-events-none animate-pulse-slow" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl pointer-events-none animate-pulse-slow" />

        <div className="flex flex-col items-center gap-6">
          
          {/* Trophy & Medal Visual with click confetti trigger */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            onClick={handleConfetti}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-primary/15 via-secondary/15 to-accent/15 border-2 border-dashed border-accent flex items-center justify-center cursor-pointer shadow-glow relative group clickable"
            title="Click to celebrate!"
          >
            {/* Sparkles */}
            <Sparkles className="w-5 h-5 text-accent absolute top-2 right-2 animate-pulse" />
            <Sparkles className="w-4 h-4 text-primary absolute bottom-4 left-2 animate-pulse-slow" />
            
            {/* Gold Trophy */}
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-accent group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(0,255,179,0.4)]" />
            
            <div className="absolute inset-0 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          {/* Details */}
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-orbitron font-bold text-accent tracking-widest uppercase bg-accent/10 border border-accent/20 px-3.5 py-1 rounded-full">
              🏆 First Position Winner
            </span>
            
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-outfit mt-2">
              GIET HackFest 2.0
            </h3>

            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
              Competed with teams from around the state to architect, develop, and present a cutting-edge software solution in a high-pressure 36-hour sprint. Avijit Patra and his team successfully clinched the **First Position** outperforming other finalists.
            </p>
          </div>

          {/* Medal Chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-3 border-y border-opacity-5 w-full max-w-md"
               style={{ borderColor: 'var(--glass-border)' }}>
            <div className="flex items-center gap-2 text-xs text-white">
              <Medal className="w-4.5 h-4.5 text-accent" />
              <span className="font-semibold font-outfit">1st Place Trophy</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2 text-xs text-white">
              <Award className="w-4.5 h-4.5 text-primary" />
              <span className="font-semibold font-outfit">State-Level Recognition</span>
            </div>
          </div>

          {/* CTA Link Button */}
          <a
            href="https://linkedin.com/in/avijit-patra-ai"
            onClick={handleLinkClick}
            className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-accent/25 hover:scale-105 active:scale-95 transition-all duration-300 clickable"
          >
            <span>View LinkedIn Post</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hackathon;

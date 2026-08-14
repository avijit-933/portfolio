import React from 'react';
import { User, Target, GraduationCap, Code } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-6xl mx-auto">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <User className="w-6 h-6 text-primary animate-pulse" />
          <span>About Me</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Glow AI Profile Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
            {/* Glowing outer rings */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary via-secondary to-accent opacity-30 blur-lg group-hover:scale-105 group-hover:opacity-55 transition-all duration-500 animate-pulse-slow" />
            <div className="absolute inset-0 border border-primary/30 rounded-3xl m-2 animate-orbit [animation-duration:15s]" />
            <div className="absolute inset-0 border border-accent/25 rounded-3xl m-4 animate-orbit [animation-duration:25s] [animation-direction:reverse]" />

            {/* Profile Content (SVG AI Avatar) */}
            <div
              className="absolute inset-0 rounded-3xl glass-card border p-4 flex flex-col items-center justify-center overflow-hidden"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-40 h-40 text-primary/80 group-hover:text-primary transition-colors group-hover:scale-105 duration-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {/* Developer Head Silhouette & Digital Grid */}
                <circle cx="50" cy="38" r="16" strokeDasharray="3 3" />
                <path d="M50,20 L50,14 M64,28 L70,24 M36,28 L30,24 M50,56 L50,60" stroke="var(--accent)" strokeWidth="1" />
                
                {/* Shoulders */}
                <path d="M22,80 C22,65 30,58 50,58 C70,58 78,65 78,80" strokeLinecap="round" />
                
                {/* Neural Networks Overlaid */}
                <circle cx="50" cy="14" r="2.5" fill="var(--accent)" />
                <circle cx="70" cy="24" r="2.5" fill="var(--primary)" />
                <circle cx="30" cy="24" r="2.5" fill="var(--primary)" />
                
                {/* Node connection lines */}
                <line x1="50" y1="38" x2="50" y2="14" strokeWidth="0.8" opacity="0.6" />
                <line x1="50" y1="38" x2="70" y2="24" strokeWidth="0.8" opacity="0.6" />
                <line x1="50" y1="38" x2="30" y2="24" strokeWidth="0.8" opacity="0.6" />
                
                {/* Eye scanner beam (glowing AI line) */}
                <line x1="30" y1="38" x2="70" y2="38" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="2 2" className="animate-pulse" />
              </svg>
              
              <div className="text-center mt-4">
                <span className="font-orbitron text-xs font-bold text-white tracking-widest block uppercase">AVIJIT PATRA</span>
                <span className="text-[10px] text-accent font-semibold tracking-wider font-mono">MODEL.AI.ENGINEER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="lg:col-span-7 space-y-6">
          <div
            className="glass-card border rounded-2xl p-6 sm:p-8 space-y-5"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            <div className="flex items-center gap-2 text-primary font-orbitron font-semibold text-sm">
              <Target className="w-5 h-5 shrink-0" />
              <span>WHO I AM</span>
            </div>
            
            <p className="text-sm sm:text-base text-main leading-relaxed font-sans">
              I am <strong>Avijit Patra</strong>, a B.Tech student passionate about Artificial Intelligence, Machine Learning, Data Science, Computer Vision, and Full Stack Development.
            </p>

            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
              I enjoy building real-world AI solutions that solve practical problems. My expertise includes Python, Machine Learning, Deep Learning, Computer Vision, RAG systems, NLP, Data Analytics, and Web Development.
            </p>

            <p className="text-sm sm:text-base text-main leading-relaxed font-sans">
              My goal is to become an AI Engineer and Data Scientist working on impactful AI products that push the envelope of human capability.
            </p>
          </div>

          {/* Core Milestones Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="glass-card border rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-muted font-bold font-orbitron">ACADEMIC</h4>
                <p className="text-sm text-white font-semibold mt-0.5">CSE (AI) Student</p>
              </div>
            </div>

            <div
              className="glass-card border rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-muted font-bold font-orbitron">EXPERTISE</h4>
                <p className="text-sm text-white font-semibold mt-0.5">RAG & Computer Vision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

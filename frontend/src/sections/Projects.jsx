import React, { useState } from 'react';
import { Code, ExternalLink, Sparkles, ChevronLeft, ChevronRight, Eye, Video, FileText, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Slides data for Project 1 (AI Interview Platform) screenshots carousel
const p1Slides = [
  {
    title: "AI Interview Dashboard",
    desc: "Active webcam monitoring with real-time audio waveform and AI-generated question prompt.",
    icon: <Video className="w-5 h-5 text-primary" />,
    element: (
      <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between font-mono text-[9px] relative overflow-hidden">
        {/* Mock webcam view */}
        <div className="absolute top-2 right-2 w-20 h-16 rounded border border-primary/30 bg-slate-900 flex items-center justify-center overflow-hidden">
          <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary animate-pulse flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <span className="absolute bottom-1 right-1 text-[5px] text-muted">Webcam ON</span>
        </div>
        
        <div className="flex items-center gap-1 text-primary">
          <Sparkles className="w-3 h-3 text-accent animate-pulse-slow" />
          <span>INTERVIEWER.AI // AGENT_ACTIVE</span>
        </div>

        <div className="my-3 space-y-2 max-w-[180px]">
          <p className="text-muted leading-tight">Q: Explain the difference between supervised and unsupervised learning, and how you choose the appropriate loss function.</p>
          <div className="h-6 w-full rounded bg-white/5 border border-white/5 p-1 text-[8px] text-accent flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            <span>Analyzing candidate response...</span>
          </div>
        </div>

        {/* Waveform graphic */}
        <div className="flex items-end gap-0.5 h-6 w-1/2 border-t border-white/10 pt-1">
          {[4, 8, 12, 6, 16, 20, 10, 4, 8, 14, 2, 6, 8, 12, 4].map((h, i) => (
            <div key={i} className="bg-primary/60 w-1 rounded-t-sm" style={{ height: `${h}px` }} />
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Resume Analytics Report",
    desc: "Detailed scorecards rating skills, grammar, layout, and job role alignment using Gemini models.",
    icon: <FileText className="w-5 h-5 text-secondary" />,
    element: (
      <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between font-mono text-[9px]">
        <div className="flex justify-between items-center border-b border-white/10 pb-1">
          <span className="text-secondary font-bold">RESUME_RATING_REPORT</span>
          <span className="text-accent text-[8px] bg-accent/10 px-1 border border-accent/20 rounded">92% MATCH</span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto">
          <div className="space-y-1">
            <span className="text-muted block">TECHNICAL DEPTH</span>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[95%] rounded-full" />
            </div>
            <span className="text-[8px] text-white">95/100</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted block">EXPERIENCE ALIGNMENT</span>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[88%] rounded-full" />
            </div>
            <span className="text-[8px] text-white">88/100</span>
          </div>
        </div>

        <div className="border-t border-white/10 pt-1.5 flex flex-wrap gap-1">
          {["Python", "LLMs", "FastAPI", "Docker"].map((tag, i) => (
            <span key={i} className="text-[7px] bg-white/5 border border-white/5 px-1 py-0.5 rounded text-muted">{tag}</span>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Voice & Sentiment Feedback",
    desc: "Real-time speech rate measurement combined with vocal emotion and sentiment tracking.",
    icon: <BarChart2 className="w-5 h-5 text-accent" />,
    element: (
      <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between font-mono text-[9px]">
        <div className="flex items-center gap-1.5 text-accent">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>VIBRANCY_SENTIMENT_ANALYZER</span>
        </div>

        <div className="space-y-2 my-auto">
          <div className="flex justify-between items-center text-[8px]">
            <span className="text-muted">CONFIDENCE METRIC</span>
            <span className="text-white">HIGH (89%)</span>
          </div>
          <div className="flex justify-between items-center text-[8px]">
            <span className="text-muted">TEMPO RATE</span>
            <span className="text-white">135 WPM (OPTIMAL)</span>
          </div>
          <div className="flex justify-between items-center text-[8px]">
            <span className="text-muted">EMOTIONAL SPECTRUM</span>
            <span className="text-accent font-bold">PROFESSIONAL / ENGAGED</span>
          </div>
        </div>

        <div className="h-3 w-full bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 rounded relative border border-white/5 overflow-hidden">
          <div className="absolute top-0 bottom-0 w-1.5 bg-accent left-[78%] animate-pulse" />
        </div>
      </div>
    )
  }
];

const projectsData = [
  {
    id: 1,
    title: "AI Interview Platform",
    desc: "An AI-powered interview preparation platform that conducts intelligent mock interviews, analyzes responses, generates feedback, and helps candidates improve performance.",
    tech: ["React.js", "FastAPI", "MySQL", "Gemini API", "LangChain", "FAISS", "Whisper API"],
    features: [
      "Real-time AI Interviewer & Voice chat",
      "Automated Resume Parsing & scoring",
      "Webcam monitoring & Emotion analytics",
      "Detailed Interview Performance reports",
      "RAG-based dynamic interview Q&A generator"
    ],
    demoUrl: "https://ai-interviews.avijit.me",
    codeUrl: "https://github.com/avijit-patra/ai-interview-platform",
    isFeatured: true
  },
  {
    id: 2,
    title: "Attendance System using OpenCV",
    desc: "An automated facial recognition attendance management system that uses camera inputs to detect, verify, and log students dynamically into an archive database.",
    tech: ["Python", "OpenCV", "Face Recognition", "MySQL", "Tkinter"],
    features: [
      "Automated Face Detection and crop",
      "High accuracy classification algorithms",
      "Attendance database spreadsheets generation",
      "Real-time visual bounding-box overlay"
    ],
    demoUrl: "https://opencv-attendance.avijit.me",
    codeUrl: "https://github.com/avijit-patra/opencv-attendance-system",
    isFeatured: false,
    mockup: (
      <div className="w-full h-40 bg-slate-950 p-4 font-mono text-[9px] relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center gap-1.5 text-primary">
          <Video className="w-3.5 h-3.5" />
          <span>OPENCV_FACE_DETECT // ENGAGED</span>
        </div>
        
        {/* Mock webcam with detection boxes */}
        <div className="w-2/3 h-24 rounded border border-white/10 bg-slate-900 mx-auto relative flex items-center justify-center overflow-hidden">
          <div className="w-10 h-10 border-2 border-accent rounded-md flex items-center justify-center relative">
            <span className="absolute -top-3 left-0 bg-accent text-slate-900 text-[6px] px-0.5 rounded font-bold uppercase">MATCH: 98%</span>
            <div className="w-3.5 h-3.5 rounded-full bg-accent/25" />
          </div>
          <span className="absolute top-1 left-1 text-[5px] text-muted">CCTV_FEED_01 // RUNNING</span>
        </div>

        <div className="text-right text-muted text-[8px]">
          LOGGED: Avijit Patra // Time: 21:40
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "RAG Chatbot",
    desc: "A Retrieval-Augmented Generation chatbot platform allowing users to upload documents (PDFs) and perform high-speed context-aware semantic inquiries.",
    tech: ["FastAPI", "Gemini Pro", "LangChain", "FAISS", "Python", "PDFPlumber"],
    features: [
      "High accuracy context injection Q&A",
      "PDF text extraction & sentence chunking",
      "Vector embeddings query matching",
      "Low-latency streaming responses"
    ],
    demoUrl: "https://rag-chat.avijit.me",
    codeUrl: "https://github.com/avijit-patra/rag-chatbot",
    isFeatured: false,
    mockup: (
      <div className="w-full h-40 bg-slate-950 p-4 font-mono text-[9px] relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center gap-1.5 text-secondary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>RAG_GEMINI_FAISS // SYSTEM_ONLINE</span>
        </div>

        <div className="space-y-2">
          <div className="bg-white/5 border border-white/5 p-1 rounded max-w-[200px] text-[8px] text-muted text-left">
            Doc: [Deep_Learning_Book.pdf] loaded. 840 chunks indexed.
          </div>
          <div className="bg-secondary/15 border border-secondary/20 p-1.5 rounded rounded-tl-none text-[8px] text-white text-left">
            Q: Explain Backprop.
          </div>
          <div className="bg-white/5 border border-white/5 p-1.5 rounded rounded-tr-none text-[8px] text-muted text-left line-clamp-2">
            A: Backpropagation calculates the gradient of the loss function with respect to the weights...
          </div>
        </div>

        <div className="text-[7px] text-accent">
          Similarity Score: Cosine = 0.892
        </div>
      </div>
    )
  }
];

const Projects = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % p1Slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + p1Slides.length) % p1Slides.length);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-6xl mx-auto">
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <Code className="w-7 h-7 text-primary animate-pulse" />
          <span>Projects Showcase</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      <div className="space-y-12">
        {/* Featured Project (Project 1 - AI Interview Platform) */}
        {projectsData.filter(p => p.isFeatured).map((proj) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card border rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            {/* Visual glow overlay */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full filter blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Text details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold font-orbitron tracking-wider text-primary uppercase">
                    <Sparkles className="w-3.5 h-3.5 animate-spin [animation-duration:8s]" />
                    Featured Project
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit mt-2">
                    {proj.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
                  {proj.desc}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold font-orbitron uppercase text-white tracking-wider">
                    Core Technical Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted">
                    {proj.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-secondary/15 text-secondary border border-secondary/20 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-2">
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 clickable"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={proj.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-opacity-10 glass-card text-white hover:text-primary hover:border-primary font-semibold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 clickable"
                    style={{
                      borderColor: 'var(--glass-border)',
                      backgroundColor: 'var(--glass-bg)',
                    }}
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>

              {/* Right Side: Interactive Mockup Slider */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl relative group">
                  
                  {/* Active Slide Element */}
                  <div className="w-full h-full relative">
                    {p1Slides[activeSlide].element}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/80 border border-white/10 text-white hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity clickable"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-950/80 border border-white/10 text-white hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity clickable"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Slide details banner overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-950/90 border-t border-white/5 flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-primary">
                      {p1Slides[activeSlide].icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">
                        {p1Slides[activeSlide].title}
                      </h4>
                      <p className="text-[8px] text-muted leading-tight mt-0.5 line-clamp-1">
                        {p1Slides[activeSlide].desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex gap-1.5 mt-3">
                  {p1Slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeSlide === idx ? 'bg-primary w-5' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Regular Projects (Project 2 and 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.filter(p => !p.isFeatured).map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card border rounded-2xl p-6 flex flex-col justify-between relative group overflow-hidden"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              {/* Shimmer element */}
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              <div className="space-y-4">
                {/* Visual Mockup Box */}
                <div className="rounded-xl border border-white/5 overflow-hidden bg-slate-950">
                  {proj.mockup}
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mt-2 font-sans">
                    {proj.desc}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-1 text-[11px] text-muted">
                  {proj.features.slice(0, 3).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {proj.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded bg-white/5 text-muted border border-white/5 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-8 border-t border-opacity-5 pt-4 flex gap-3"
                   style={{ borderColor: 'var(--glass-border)' }}>
                <a
                  href={proj.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 clickable"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
                <a
                  href={proj.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-opacity-10 glass-card text-white hover:text-primary hover:border-primary font-semibold text-xs tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 clickable"
                  style={{
                    borderColor: 'var(--glass-border)',
                    backgroundColor: 'var(--glass-bg)',
                  }}
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

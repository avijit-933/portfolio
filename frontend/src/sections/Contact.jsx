import React, { useState } from 'react';
import { Send, Mail, FileText, CheckCircle2, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    // Fallback to portfolio-1.onrender.com if env variable is not present
    const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-22.onrender.com';

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setStatus({
        loading: false,
        success: data.message || "Message sent successfully!",
        error: null,
      });

      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error("API Request Failed:", err);
      
      setStatus({
        loading: false,
        success: null,
        error: err.message || "Failed to reach backend server. Please try again.",
      });
    }
  };

  const handleDownloadResume = () => {
    const element = document.createElement("a");
    const resumeText = `
AVIJIT PATRA
AI Engineer | Data Science Enthusiast | Full Stack Developer
Email: avijitpatra.official@gmail.com
LinkedIn: https://linkedin.com/in/avijit-patra-ai
GitHub: https://github.com/avijit-patra

========================================
ACADEMICS
========================================
- B.Tech (Computer Science & Engineering - AI)
  GIFT Autonomous College, CGPA: 8.95
- Higher Secondary (12th)
  Wisdom Higher Secondary School, 83% (2024)
- Secondary (10th)
  Dantan High School, 81% (2022)

========================================
SKILLS
========================================
- Languages: Python, Java, JavaScript, C
- AI & ML: Machine Learning, Deep Learning, OpenCV, RAG, NLP
- Web Dev: React, FastAPI, Tailwind CSS, HTML, CSS
- Tools: Git, GitHub, VS Code, Docker, MySQL

========================================
WORK EXPERIENCE
========================================
- AI & ML Intern | OCAC Odisha (May 2026 – July 2026)
  Built Attendance system using OpenCV and LangChain RAG Chatbot.
- Data Science Intern | OCAC Odisha (April 2025 – May 2025)
  Performed Data Analytics, NumPy and Pandas structural evaluation.

========================================
HACKATHONS
========================================
- GIET HackFest 2.0 (1st Position Winner)
    `;
    const file = new Blob([resumeText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Avijit_Patra_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-5xl mx-auto">
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <Mail className="w-7 h-7 text-primary animate-pulse" />
          <span>Get In Touch</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Address Details */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className="glass-card border rounded-2xl p-6 sm:p-8 space-y-6"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            <h3 className="text-xl font-bold text-white font-outfit">Contact Info</h3>
            
            <p className="text-sm text-muted leading-relaxed font-sans">
              I am open to internships, full-time AI Engineer opportunities, and software collaboration. Let's build something intelligent together!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:avijitpatra.official@gmail.com"
                className="flex items-center gap-3.5 text-xs font-semibold text-muted hover:text-primary transition-colors py-2 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] clickable"
              >
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="font-mono">avijitpatra.official@gmail.com</span>
              </a>

              <a
                href="https://linkedin.com/in/avijit-patra-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-xs font-semibold text-muted hover:text-primary transition-colors py-2 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] clickable"
              >
                <LinkedInIcon className="w-5 h-5 text-secondary shrink-0" />
                <span className="font-mono">linkedin.com/in/avijit-patra-ai</span>
              </a>

              <a
                href="https://github.com/avijit-patra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-xs font-semibold text-muted hover:text-primary transition-colors py-2 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] clickable"
              >
                <GitHubIcon className="w-5 h-5 text-accent shrink-0" />
                <span className="font-mono">github.com/avijit-patra</span>
              </a>
            </div>

            {/* Resume CTA */}
            <div className="border-t border-opacity-5 pt-6" style={{ borderColor: 'var(--glass-border)' }}>
              <button
                onClick={handleDownloadResume}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 clickable"
              >
                <FileText className="w-4 h-4" />
                <span>Download Complete Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-card border rounded-2xl p-6 sm:p-8 space-y-5"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            <h3 className="text-xl font-bold text-white font-outfit mb-3">Send Message</h3>

            {/* Status alerts */}
            <AnimatePresence mode="wait">
              {status.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-start gap-2.5 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{status.success}</span>
                </motion.div>
              )}

              {status.error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2.5 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{status.error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-orbitron uppercase tracking-wider text-muted font-bold block">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Avijit Patra"
                  className="w-full bg-white/5 border border-opacity-5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-slate-500"
                  style={{
                    borderColor: 'var(--glass-border)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-orbitron uppercase tracking-wider text-muted font-bold block">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full bg-white/5 border border-opacity-5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-slate-500"
                  style={{
                    borderColor: 'var(--glass-border)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-orbitron uppercase tracking-wider text-muted font-bold block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration Opportunity"
                className="w-full bg-white/5 border border-opacity-5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-slate-500"
                style={{
                  borderColor: 'var(--glass-border)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-orbitron uppercase tracking-wider text-muted font-bold block">
                Message Details
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Avijit, I reviewed your AI portfolio and would like to discuss..."
                className="w-full bg-white/5 border border-opacity-5 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-slate-500 resize-none"
                style={{
                  borderColor: 'var(--glass-border)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:scale-100 clickable"
            >
              {status.loading ? (
                <Loader className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
              <span>{status.loading ? "Sending Message..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
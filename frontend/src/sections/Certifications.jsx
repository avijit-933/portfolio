import React from 'react';
import { Award, ChevronRight, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================================================
// CERTIFICATIONS DATA ARRAY
// For local files placed in 'public/': set url to "/filename.pdf"
// For online certificates: set url to "https://..."
// ============================================================================
const certifications = [
  {
    name: "Joy of Computing Using Python",
    issuer: "NPTEL (IIT Ropar)",
    date: "November 2024",
    credentialId: "NPTEL-PY-2024-IITR-883",
    skills: ["Python Programming", "Algorithmic Logic", "Data Manipulation"],
    credentialUrl: "/joy of python.pdf" // Points directly to public/joy of python.pdf
  },
  {
    name: "Introduction to Industry 4.0 and IoT",
    issuer: "NPTEL (IIT Kharagpur)",
    date: "April 2024",
    credentialId: "NPTEL-IoT-2024-IITKGP-103",
    skills: ["Internet of Things", "Cloud Computing", "Industrial Automation"],
    credentialUrl: "https://nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS220S193829"
  },
  {
    name: "AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    date: "June 2026",
    credentialId: "ANT-AFF-2026-092",
    skills: ["Prompt Engineering", "LLM Mechanics", "AI Alignment"],
    credentialUrl: "https://www.credly.com/org/anthropic/credentials/aff-2026"
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    date: "July 2026",
    credentialId: "ANT-CL-101-2026-441",
    skills: ["Claude API", "Context Optimization", "System Prompts"],
    credentialUrl: "https://www.credly.com/org/anthropic/credentials/claude-101"
  },
  {
    name: "The Complete Python Bootcamp",
    issuer: "Udemy",
    date: "September 2023",
    credentialId: "UDEMY-PYBOOT-2938210",
    skills: ["Python OOP", "Decorators", "Web Scraping", "GUIs"],
    credentialUrl: "https://www.udemy.com/certificate/UC-2938210"
  },
  {
    name: "Introduction to HTML",
    issuer: "Coursera",
    date: "June 2023",
    credentialId: "COURSERA-HTML-773821",
    skills: ["HTML5", "Document Object Model", "Web Accessibility"],
    credentialUrl: "https://www.coursera.org/verify/HTML-773821"
  },
  {
    name: "Introduction to CSS",
    issuer: "Coursera",
    date: "June 2023",
    credentialId: "COURSERA-CSS-992812",
    skills: ["CSS3 Layouts", "Flexbox & Grid", "Responsive Design"],
    credentialUrl: "https://www.coursera.org/verify/CSS-992812"
  },
  {
    name: "Introduction to JavaScript",
    issuer: "Coursera",
    date: "July 2023",
    credentialId: "COURSERA-JS-102938",
    skills: ["ES6 Syntax", "DOM Manipulation", "Asynchronous Fetching"],
    credentialUrl: "https://www.coursera.org/verify/JS-102938"
  }
];

const Certifications = ({ onSelectCertificate }) => {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-6xl mx-auto">
      <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <Award className="w-7 h-7 text-primary animate-pulse" />
          <span>Certifications</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => onSelectCertificate(cert)}
            className="glass-card border rounded-xl p-5 flex flex-col justify-between cursor-pointer hover:border-primary group transition-all relative overflow-hidden"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            {/* Shimmer element */}
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

            <div className="space-y-3.5">
              {/* Header Icon */}
              <div className="flex items-center justify-between">
                <Bookmark className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                <span className="text-[9px] font-mono text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                  {cert.date.split(" ")[1]}
                </span>
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-tight font-outfit group-hover:text-primary transition-colors line-clamp-2">
                  {cert.name}
                </h3>
                <p className="text-[11px] text-accent font-semibold mt-1 font-orbitron uppercase tracking-wider">
                  {cert.issuer}
                </p>
              </div>
            </div>

            {/* View button hover detail */}
            <div
              className="mt-6 border-t border-opacity-5 pt-3 flex items-center justify-between text-[10px] text-muted group-hover:text-white transition-colors"
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <span className="font-mono text-[9px] truncate max-w-[120px]">
                ID: {cert.credentialId.split("-")[1] || "VERIFY"}
              </span>
              <span className="flex items-center font-bold tracking-wider uppercase font-orbitron text-primary text-[9px]">
                <span>Details</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
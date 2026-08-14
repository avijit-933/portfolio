import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Eye, Download, Code, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const internships = [
  {
    id: 1,
    role: "Data Science Intern",
    organization: "Odisha Computer Application Centre (OCAC)",
    duration: "April 2025 – May 2025",
    skills: ["Python", "NumPy", "Pandas", "Data Analysis", "Statistical Modeling"],
    description: "Collaborated with structural data systems to perform extensive exploratory data analysis (EDA), data cleaning, and statistical evaluations.",
    projects: [],
    certificate: {
      name: "Data Science Internship Certificate",
      issuer: "OCAC Odisha",
      date: "May 2025",
      credentialId: "OCAC-DS-2025-048",
      skills: ["Python", "NumPy", "Pandas", "Data Analysis"],
      credentialUrl: "/joy of python.pdf"
    }
  },
  {
    id: 2,
    role: "AI & ML Engineer Intern",
    organization: "Odisha Computer Application Centre (OCAC)",
    duration: "May 2026 – July 2026",
    skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "RAG", "Computer Vision", "OpenCV", "NLP"],
    description: "Developed and deployed enterprise-grade AI algorithms focusing on neural vision networks and Retrieval Augmented Generation (RAG) pipelines.",
    projects: [
      {
        name: "Attendance System using OpenCV",
        features: ["Face Detection", "Face Recognition", "Attendance Auto-Logging", "Python & OpenCV"]
      },
      {
        name: "RAG Chatbot Project",
        features: ["PDF Conversational Chat", "FAISS Vector Database", "LangChain Workflow", "Gemini API Retrieval"]
      }
    ],
    certificate: {
      name: "AI & ML Internship Certificate",
      issuer: "OCAC Odisha",
      date: "July 2026",
      credentialId: "OCAC-AIML-2026-119",
      skills: ["AI", "Machine Learning", "Deep Learning", "RAG", "OpenCV", "NLP"],
      credentialUrl: "https://ocac.gp/certificates/verify/AIML-2026-119"
    }
  }
];

const Internships = ({ onViewCertificate }) => {
  
  const handleDownloadCertificate = (cert) => {
    // Generate simple text-file download as a mockup download
    const element = document.createElement("a");
    const file = new Blob([
      `====================================================\n`,
      `           OCAC INTERNSHIP CERTIFICATE OF COMPLETION\n`,
      `====================================================\n\n`,
      `Name: Avijit Patra\n`,
      `Role: ${cert.name.includes("AI") ? "AI & ML Intern" : "Data Science Intern"}\n`,
      `Organization: ${cert.issuer}\n`,
      `Issue Date: ${cert.date}\n`,
      `Credential ID: ${cert.credentialId}\n\n`,
      `Skills Validated:\n`,
      cert.skills.map(s => `- ${s}`).join("\n"),
      `\n\nVerification Link: ${cert.credentialUrl}\n`,
      `====================================================\n`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${cert.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="internships" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-5xl mx-auto">
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <Briefcase className="w-6 h-6 text-primary animate-pulse" />
          <span>Work Experience</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      {/* Timeline wrapper */}
      <div className="relative border-l border-opacity-10 md:ml-32"
           style={{ borderColor: 'var(--glass-border)' }}>
        
        {internships.map((intern, idx) => (
          <motion.div
            key={intern.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="mb-16 ml-6 md:ml-10 relative"
          >
            {/* Timeline indicator node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full border-4 bg-slate-900 border-primary shadow-glow flex items-center justify-center animate-pulse"
                 style={{ boxShadow: '0 0 10px var(--primary)' }} />

            {/* Time label in absolute coordinates for desktop */}
            <div className="hidden md:block absolute -left-44 top-2 text-right w-36">
              <span className="text-xs font-bold font-orbitron text-primary flex items-center justify-end gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {intern.duration.split(' – ')[0]}
              </span>
              <span className="text-[10px] text-muted block font-mono mt-0.5">
                {intern.duration.split(' – ')[1]}
              </span>
            </div>

            {/* Card Content */}
            <div
              className="glass-card border rounded-2xl p-6 sm:p-8"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-bg)',
              }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-xs font-orbitron font-bold text-accent tracking-widest uppercase">
                    {intern.organization}
                  </span>
                  <h3 className="text-xl font-bold text-white font-outfit mt-0.5">
                    {intern.role}
                  </h3>
                </div>
                <div className="md:hidden inline-flex items-center gap-1.5 text-xs text-muted bg-white/5 px-2.5 py-1 rounded-md border border-white/5 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{intern.duration}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed mb-5 font-sans">
                {intern.description}
              </p>

              {/* Technologies Learned */}
              <div className="mb-6">
                <h4 className="text-xs font-orbitron uppercase font-bold text-white tracking-wider mb-2">
                  Skills Gained
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {intern.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Completed Projects (if any) */}
              {intern.projects.length > 0 && (
                <div className="mb-6 border-t border-opacity-5 pt-4"
                     style={{ borderColor: 'var(--glass-border)' }}>
                  <h4 className="text-xs font-orbitron uppercase font-bold text-white tracking-wider mb-3 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-secondary" />
                    <span>Completed Internship Projects</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {intern.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2.5">
                        <h5 className="text-xs font-bold font-outfit text-white uppercase tracking-wider flex items-center gap-1">
                          <ArrowRight className="w-3 h-3 text-accent" />
                          {proj.name}
                        </h5>
                        <ul className="space-y-1">
                          {proj.features.map((feat, fIdx) => (
                            <li key={fIdx} className="text-[11px] text-muted flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificate Previews & Actions */}
              <div className="border-t border-opacity-5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                   style={{ borderColor: 'var(--glass-border)' }}>
                {/* Visual Preview Box */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-12 h-10 rounded bg-slate-950 border border-white/10 flex flex-col items-center justify-center p-1 relative overflow-hidden group shrink-0">
                    <div className="absolute inset-0 border border-primary/20 m-0.5" />
                    <span className="text-[5px] text-primary font-bold font-orbitron">OCAC</span>
                    <span className="text-[4px] text-muted scale-90">CERT</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      {intern.certificate.name}
                    </p>
                    <p className="text-[10px] text-muted font-mono mt-0.5">
                      ID: {intern.certificate.credentialId}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                  <button
                    onClick={() => onViewCertificate(intern.certificate)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-opacity-10 glass-card text-white hover:text-primary hover:border-primary text-xs font-semibold tracking-wide transition-all clickable"
                    style={{
                      borderColor: 'var(--glass-border)',
                      backgroundColor: 'var(--glass-bg)',
                    }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                  <button
                    onClick={() => handleDownloadCertificate(intern.certificate)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold tracking-wide hover:shadow-md hover:scale-105 active:scale-95 transition-all clickable"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Internships;

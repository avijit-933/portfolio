import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const educationData = [
  {
    degree: "B.Tech – Computer Science & Engineering (AI)",
    institution: "GIFT Autonomous College (Gandhi Institute for Technology)",
    details: "Specialized in Artificial Intelligence, Machine Learning algorithms, Deep Neural Networks, and Web applications. Active member of the college AI Research Club and coding club.",
    scoreType: "CGPA",
    score: "8.95",
    timeline: "Currently Pursuing",
    badge: "Gold Tier Scholar 🏆",
    glowColor: "rgba(0, 229, 255, 0.2)"
  },
  {
    degree: "Higher Secondary (12th Grade)",
    institution: "Wisdom Higher Secondary School",
    details: "Completed with a science major focusing on Physics, Chemistry, Mathematics, and Computer Science.",
    scoreType: "Percentage",
    score: "83%",
    timeline: "Class of 2024",
    badge: "First Class with Distinction ⭐",
    glowColor: "rgba(123, 97, 255, 0.15)"
  },
  {
    degree: "Secondary (10th Grade)",
    institution: "Dantan High School",
    details: "General curriculum with science-heavy subjects, securing top marks in mathematics and computing.",
    scoreType: "Percentage",
    score: "81%",
    timeline: "Class of 2022",
    badge: "Honors Graduate 🎓",
    glowColor: "rgba(0, 255, 179, 0.15)"
  }
];

const Education = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-6xl mx-auto">
      <div className="absolute top-10 left-10 w-[250px] h-[250px] bg-secondary/5 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <GraduationCap className="w-7 h-7 text-secondary animate-bounce [animation-duration:3s]" />
          <span>Education Path</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      {/* 3D Glass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: `0 10px 30px ${edu.glowColor}`,
              translateY: -5
            }}
            className="glass-card border rounded-2xl p-6 flex flex-col justify-between relative group overflow-hidden"
            style={{
              borderColor: 'var(--glass-border)',
              backgroundColor: 'var(--glass-bg)',
            }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-orbitron tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-md">
                  {edu.badge}
                </span>
                <BookOpen className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
              </div>

              {/* Title & School */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight font-outfit">
                  {edu.degree}
                </h3>
                <p className="text-xs text-primary font-medium mt-1 font-sans">
                  {edu.institution}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-muted leading-relaxed font-sans">
                {edu.details}
              </p>
            </div>

            {/* Score and Time footer */}
            <div className="mt-8 border-t border-opacity-5 pt-4 flex items-end justify-between"
                 style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-mono">{edu.timeline}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted block font-orbitron uppercase">{edu.scoreType}</span>
                <span className="text-2xl font-black font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">
                  {edu.score}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;

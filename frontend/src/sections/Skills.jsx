import React, { useState } from 'react';
import { Terminal, Brain, BarChart2, Globe, Wrench, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories = [
  {
    id: "programming",
    label: "Programming",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      { name: "Python", level: 95 },
      { name: "Java", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "C", level: 75 }
    ]
  },
  {
    id: "ai-ml",
    label: "AI & Machine Learning",
    icon: <Brain className="w-5 h-5" />,
    skills: [
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 85 },
      { name: "Computer Vision", level: 85 },
      { name: "RAG Systems", level: 85 },
      { name: "NLP", level: 80 }
    ]
  },
  {
    id: "data-science",
    label: "Data Science",
    icon: <BarChart2 className="w-5 h-5" />,
    skills: [
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 90 },
      { name: "Scikit-Learn", level: 85 },
      { name: "Matplotlib", level: 80 }
    ]
  },
  {
    id: "web-dev",
    label: "Web Development",
    icon: <Globe className="w-5 h-5" />,
    skills: [
      { name: "React.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML & CSS", level: 95 }
    ]
  },
  {
    id: "tools",
    label: "Tools & Databases",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "MySQL", level: 80 },
      { name: "Docker", level: 75 }
    ]
  }
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("programming");

  const currentCategory = skillCategories.find(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative max-w-5xl mx-auto">
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-accent/5 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-orbitron tracking-wide uppercase inline-flex items-center gap-2 text-white">
          <Brain className="w-7 h-7 text-accent animate-pulse" />
          <span>Skills Core</span>
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-3 rounded-full" />
      </div>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Category Buttons */}
        <div className="md:col-span-4 flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none">
          {skillCategories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 py-3.5 px-5 rounded-xl border font-orbitron text-xs font-bold uppercase tracking-wider transition-all duration-300 w-full shrink-0 md:shrink select-none text-left clickable ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/15 to-secondary/15 border-primary text-primary shadow-lg shadow-primary/5'
                    : 'glass-card border-opacity-5 hover:border-white/20 text-muted'
                }`}
                style={{
                  borderColor: isActive ? 'var(--primary)' : 'var(--glass-border)',
                  backgroundColor: isActive ? 'rgba(0, 229, 255, 0.08)' : 'var(--glass-bg)',
                }}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted'}`}>
                  {category.icon}
                </div>
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Skill Progress Indicators */}
        <div
          className="md:col-span-8 glass-card border rounded-2xl p-6 sm:p-8 min-h-[300px] flex flex-col justify-center"
          style={{
            borderColor: 'var(--glass-border)',
            backgroundColor: 'var(--glass-bg)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b border-opacity-5 pb-3 flex items-center gap-2"
                   style={{ borderColor: 'var(--glass-border)' }}>
                <span className="text-sm font-bold text-white uppercase tracking-wider font-orbitron">
                  {currentCategory.label} Competency
                </span>
              </div>

              <div className="space-y-5">
                {currentCategory.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-white font-outfit text-sm tracking-wide uppercase flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                        {skill.name}
                      </span>
                      <span className="font-mono text-primary">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="h-2 w-full bg-white/[0.04] border border-white/5 rounded-full overflow-hidden relative">
                      {/* Active Fill with glowing tip */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-accent animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;

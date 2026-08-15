import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';

const presetQuestions = [
  "Tell me about Avijit.",
  "What projects has he built?",
  "What technologies does he know?",
  "Show internship experience.",
  "What certifications does he have?"
];

// Offline pattern matching for quick client-side fallback responses
const getClientFallbackResponse = (query) => {
  const q = query.toLowerCase();
  if (q.includes("project") || q.includes("work") || q.includes("build")) {
    return "Avijit has built several high-impact projects, including:\n\n1. **AI Interview Platform** (React, FastAPI, MySQL, Gemini, Whisper): Features mock interviews, emotion analysis, and resume review.\n2. **Attendance System using OpenCV**: Automated face-recognition-based tracking.\n3. **RAG Chatbot** (LangChain, FAISS, Gemini): Conversational Q&A over PDF files.\n\nYou can view these details in the **Projects** section of this page!";
  } else if (q.includes("intern") || q.includes("ocac") || q.includes("experience")) {
    return "Avijit completed two internships at **OCAC (Odisha Computer Application Centre)**:\n\n- **April – May 2025**: Focused on Data Science, Python, NumPy, and Pandas.\n- **May – July 2026**: Worked with AI, Machine Learning, Deep Learning, Computer Vision, RAG, and NLP. He built an OpenCV Attendance System and a LangChain RAG Chatbot during this time.";
  } else if (q.includes("skill") || q.includes("technology") || q.includes("know") || q.includes("code")) {
    return "Avijit's core skills are divided into:\n\n- **Languages**: Python, Java, JavaScript, C\n- **AI & ML**: Machine Learning, Deep Learning, OpenCV, RAG, NLP\n- **Data Science**: NumPy, Pandas, Matplotlib, Scikit-Learn\n- **Web Development**: React, FastAPI, Tailwind CSS, HTML, CSS\n- **Tools**: Git, GitHub, Docker, MySQL\n\nCheck out the interactive **Skills** section to see progress trackers!";
  } else if (q.includes("certif") || q.includes("nptel") || q.includes("udemy")) {
    return "Avijit holds multiple professional certifications, including:\n- **NPTEL (IIT Ropar)**: Joy of Computing Using Python\n- **NPTEL (IIT Kharagpur)**: Introduction to Industry 4.0 & IoT\n- **Anthropic**: AI Fluency Framework and Claude 101\n- **Udemy & Coursera**: The Complete Python Bootcamp, and Web Development series.\n\nClick on any certificate in the **Certifications** section to open the custom credential viewer!";
  } else if (q.includes("hackathon") || q.includes("giet") || q.includes("winner")) {
    return "Avijit won **First Position (🏆)** at the **GIET HackFest 2.0** hackathon! Click the trophy in the Hackathon section to check out the details.";
  } else if (q.includes("education") || q.includes("college") || q.includes("gift") || q.includes("gpa")) {
    return "Avijit is pursuing his **B.Tech in Computer Science & Engineering (AI)** at **GIFT Autonomous College**, Bhubaneswar. He currently holds a premium **CGPA of 8.95**! He completed high school at Wisdom Higher Secondary School (83%) and secondary school at Dantan High School (81%).";
  } else if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone")) {
    return "You can contact Avijit Patra directly via email at **avijitpatra.official@gmail.com** or by sending a message through the **Contact Form** at the bottom of this page. You can also connect on LinkedIn!";
  }
  return "Hello! I am AP-Bot, Avijit Patra's AI Portfolio Assistant.\n\nI can tell you all about Avijit's internships at OCAC, his B.Tech in CSE (AI) with a 8.95 CGPA, his 1st-place Hackathon win, and AI projects like the AI Interview Platform. What would you like to know?";
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi, I'm AP-Bot! Ask me anything about Avijit's skills, AI projects, certifications, or internships.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat list
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://portfolio-22.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('Backend offline');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.response, timestamp: new Date() }
      ]);
    } catch (error) {
      // Offline client-side matching engine fallback
      console.log('Using client fallback chatbot:', error.message);
      const fallbackText = getClientFallbackResponse(text);
      
      // Delay response slightly to simulate thinking
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: fallbackText, timestamp: new Date() }
        ]);
        setIsLoading(false);
      }, 600);
      return;
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] font-sans">
      {/* 1. Chat Window */}
      {isOpen && (
        <div
          className="w-[350px] sm:w-[400px] h-[500px] rounded-2xl glass-panel border shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in relative z-50"
          style={{
            borderColor: 'var(--glass-border)',
            backgroundColor: 'var(--glass-bg)',
          }}
        >
          {/* Header */}
          <div className="p-4 border-b border-opacity-10 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-between"
               style={{ borderColor: 'var(--glass-border)' }}>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent border-2 border-slate-900 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-sm tracking-wider flex items-center gap-1.5 text-white">
                  AP-Bot
                  <Sparkles className="w-3 h-3 text-accent animate-pulse-slow" />
                </h3>
                <p className="text-[10px] text-muted text-opacity-80">AI Assistant • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-none shadow-md'
                      : 'glass-card border text-main rounded-tl-none'
                  }`}
                  style={{
                    color: msg.sender === 'user' ? '#fff' : 'var(--text-main)',
                    borderColor: msg.sender === 'user' ? 'transparent' : 'var(--glass-border)',
                  }}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[9px] mt-1 text-right opacity-60">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass-card border rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5"
                     style={{ borderColor: 'var(--glass-border)' }}>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Chips */}
          <div className="px-4 py-2 border-t border-opacity-5 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0"
               style={{ borderColor: 'var(--glass-border)' }}>
            {presetQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-opacity-10 glass-card whitespace-nowrap hover:border-primary text-muted transition-all duration-300"
                style={{
                  borderColor: 'var(--glass-border)',
                  color: 'var(--text-muted)'
                }}
              >
                {q.replace("Avijit", "him")}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-opacity-10 bg-black/10 flex items-center gap-2 shrink-0"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me something about Avijit..."
              className="flex-1 bg-white/5 border border-opacity-5 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary/50 text-white placeholder-slate-400"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:shadow-none transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 2. Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group animate-float border border-white/10"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent border-2 border-slate-900 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent border-2 border-slate-900 rounded-full" />
          </>
        )}
        <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </button>
    </div>
  );
};

export default AIAssistant;

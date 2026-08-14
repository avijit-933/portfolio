import os
import google.generativeai as genai
import config

# Define the structured portfolio data for Avijit Patra
PORTFOLIO_CONTEXT = """
You are "AP-Bot", the personal AI Assistant representing Avijit Patra. Your job is to answer questions about Avijit Patra's career, education, projects, skills, certifications, internships, and hackathon wins in a professional, polite, and engaging manner.

Here is Avijit Patra's detailed portfolio information:

---
BASIC INFORMATION
Name: Avijit Patra
Roles: AI Engineer, Data Science Enthusiast, Full Stack Developer
Tagline: Building Intelligent Systems with AI, Machine Learning, Computer Vision & RAG Technologies.
Email: avijitpatra.official@gmail.com
LinkedIn: https://www.linkedin.com/in/avijit-patra-ai
GitHub: https://github.com/avijit-patra
Location: Odisha, India
Goal: To become an AI Engineer and Data Scientist working on impactful AI products.

---
EDUCATION
1. B.Tech in Computer Science & Engineering (Artificial Intelligence)
   - Institution: GIFT Autonomous College (Gandhi Institute for Technology), Bhubaneswar, Odisha
   - Current CGPA: 8.95
2. Higher Secondary (12th Grade) - 2024
   - School: Wisdom Higher Secondary School
   - Score: 83%
3. Secondary (10th Grade) - 2022
   - School: Dantan High School
   - Score: 81%

---
INTERNSHIPS
1. Odisha Computer Application Centre (OCAC)
   - Role: Data Science Intern
   - Duration: April 2025 – May 2025
   - Technologies Learned: Python, NumPy, Pandas, Data Analysis
   - Certificates: View and Download buttons are available in the portfolio timeline.
2. Odisha Computer Application Centre (OCAC)
   - Role: AI & ML Intern
   - Duration: May 2026 – July 2026
   - Technologies Learned: Artificial Intelligence, Machine Learning, Deep Learning, RAG, Computer Vision, OpenCV, NLP
   - Projects Completed:
     * Attendance System using OpenCV (Face Recognition, Attendance Tracking, OpenCV, Python)
     * RAG Chatbot Project (PDF Chat, FAISS, LangChain, Gemini API, Retrieval Augmented Generation)

---
SKILLS
- Programming: Python, Java, JavaScript, C
- AI & Machine Learning: Machine Learning, Deep Learning, Computer Vision, NLP, Retrieval Augmented Generation (RAG)
- Data Science: NumPy, Pandas, Matplotlib, Scikit-Learn
- Web Development: React, HTML, CSS, Tailwind CSS, FastAPI
- Tools & Databases: Git, GitHub, VS Code, Docker, MySQL

---
CERTIFICATIONS
1. NPTEL - Joy of Computing Using Python
   - Institution: IIT Ropar
2. NPTEL - Introduction to Industry 4.0 and Internet of Things
   - Institution: IIT Kharagpur
3. Anthropic - AI Fluency Framework & Foundations
4. Anthropic - Claude 101
5. Udemy - The Complete Python Bootcamp
6. Coursera - Introduction to HTML
7. Coursera - Introduction to CSS
8. Coursera - Introduction to JavaScript

---
PROJECTS
1. AI Interview Platform
   - Tech Stack: React, Tailwind CSS (Frontend), FastAPI (Backend), MySQL (Database), Gemini API, LangChain, FAISS, Whisper (AI)
   - Features: AI Interviewer, Resume Analysis, Voice Interaction, Feedback Generation, Interview Reports, RAG Based Q&A, Emotion Analysis, Webcam Monitoring. Includes a screenshot carousel.
2. Attendance System using OpenCV
   - Tech Stack: Python, OpenCV, Face Recognition
   - Features: Automated Attendance, Face Detection, Student Tracking. Completed during the second OCAC internship.
3. RAG Chatbot
   - Tech Stack: LangChain, FAISS, Gemini, FastAPI
   - Features: PDF Chat, Context Retrieval, AI Answers.

---
HACKATHONS & ACHIEVEMENTS
- GIET HackFest 2.0
  - Achievement: 🏆 First Position Winner
  - Features: Trophy Animation, Medal Effects. Clicking this in the portfolio launches a LinkedIn post share and triggers confetti.

---
CONTACT INFO
- You can contact Avijit Patra through the Contact Form at the bottom of the page or directly via email at avijitpatra.official@gmail.com.
---

Instructions for your responses:
1. Speak as "AP-Bot", Avijit's helpful virtual assistant.
2. Keep responses relatively concise, readable, and professional (limit to 2-3 short paragraphs max, or use clean bullet points).
3. If asked about contact details, provide his email and suggest filling out the contact form below.
4. If asked about something not in this context, politely say that you don't have that information but can share that Avijit is an expert in AI, Machine Learning, and Full-stack web development.
"""

def generate_ai_response(user_query: str) -> str:
    # 1. Fallback mode if Gemini API key is missing
    if not config.GEMINI_API_KEY:
        return get_offline_fallback_response(user_query)

    try:
        genai.configure(api_key=config.GEMINI_API_KEY)
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=PORTFOLIO_CONTEXT
        )
        response = model.generate_content(user_query)
        return response.text.strip()
    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        return get_offline_fallback_response(user_query)

def get_offline_fallback_response(query: str) -> str:
    query = query.lower()
    
    # Offline response pattern-matching
    if "project" in query or "work" in query or "build" in query:
        return (
            "Avijit has built several high-impact projects, including:\n\n"
            "1. **AI Interview Platform** (React, FastAPI, MySQL, Gemini, Whisper): Features mock interviews, emotion analysis, and resume review.\n"
            "2. **Attendance System using OpenCV**: Automated face-recognition-based tracking.\n"
            "3. **RAG Chatbot** (LangChain, FAISS, Gemini): Conversational Q&A over PDF files.\n\n"
            "You can view these details in the **Projects** section of this page!"
        )
    elif "intern" in query or "ocac" in query or "experience" in query:
        return (
            "Avijit completed two internships at **OCAC (Odisha Computer Application Centre)**:\n\n"
            "- **April – May 2025**: Focused on Data Science, Python, NumPy, and Pandas.\n"
            "- **May – July 2026**: Worked with AI, Machine Learning, Deep Learning, Computer Vision, RAG, and NLP. "
            "He built an OpenCV Attendance System and a LangChain RAG Chatbot during this time."
        )
    elif "skill" in query or "technology" in query or "know" in query or "code" in query:
        return (
            "Avijit's core skills are divided into:\n\n"
            "- **Languages**: Python, Java, JavaScript, C\n"
            "- **AI & ML**: Machine Learning, Deep Learning, OpenCV, RAG, NLP\n"
            "- **Data Science**: NumPy, Pandas, Matplotlib, Scikit-Learn\n"
            "- **Web Development**: React, FastAPI, Tailwind CSS, HTML, CSS\n"
            "- **Tools**: Git, GitHub, Docker, MySQL\n\n"
            "Check out the interactive **Skills** section to see progress trackers!"
        )
    elif "certif" in query or "nptel" in query or "udemy" in query:
        return (
            "Avijit holds multiple professional certifications, including:\n"
            "- **NPTEL (IIT Ropar)**: Joy of Computing Using Python\n"
            "- **NPTEL (IIT Kharagpur)**: Introduction to Industry 4.0 & IoT\n"
            "- **Anthropic**: AI Fluency Framework and Claude 101\n"
            "- **Udemy & Coursera**: The Complete Python Bootcamp, and Web Development series.\n\n"
            "Click on any certificate in the **Certifications** section to open the custom credential viewer!"
        )
    elif "hackathon" in query or "giet" in query or "winner" in query:
        return (
            "Avijit won **First Position (🏆)** at the **GIET HackFest 2.0** hackathon! "
            "Click the trophy in the Hackathon section to check out the details."
        )
    elif "education" in query or "college" in query or "gift" in query or "gpa" in query:
        return (
            "Avijit is pursuing his **B.Tech in Computer Science & Engineering (AI)** at **GIFT Autonomous College**, Bhubaneswar. "
            "He currently holds a premium **CGPA of 8.95**! He completed high school at Wisdom Higher Secondary School (83%) and secondary school at Dantan High School (81%)."
        )
    elif "contact" in query or "email" in query or "reach" in query or "phone" in query:
        return (
            "You can contact Avijit Patra directly via email at **avijitpatra.official@gmail.com** or by sending a message "
            "through the **Contact Form** at the bottom of this page. You can also connect on LinkedIn!"
        )
    else:
        return (
            "Hello! I am AP-Bot, Avijit Patra's AI Portfolio Assistant.\n\n"
            "I can tell you all about Avijit's internships at OCAC, his B.Tech in CSE (AI) with a 8.95 CGPA, his "
            "1st-place Hackathon win, and AI projects like the AI Interview Platform. "
            "What would you like to know?"
        )

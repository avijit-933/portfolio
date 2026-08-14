# Premium 3D AI Engineer Portfolio Website — Avijit Patra

A world-class, premium-quality personal portfolio website for **Avijit Patra** featuring:
- **Immersive 3D background**: Interactive particle field and dynamic neural network lines in Three.js (WebGL canvas).
- **Glassmorphism UI**: Beautiful semi-transparent layouts with background blurs, glowing text, and adaptive light/dark themes.
- **RAG AI Assistant**: A floating chat widget integrating with Gemini API to answer queries about Avijit's skills, projects, and certifications, featuring an offline client-side pattern matching engine.
- **FastAPI Contact Form**: Submits messages asynchronously to a Python backend, dispatching HTML emails via SMTP.
- **GIET HackFest 2.0 trophy celebration**: Click the trophy in the Hackathon section to trigger canvas-confetti bursts!
- **SEO & Performance Optimized**: Fast load times, responsive scaling, preconnected resources, and custom-styled scrolling/cursors.

---

## Project Structure

```
pot/
├── frontend/                     # React + Vite Web App
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── assets/               # Local developer assets
│   │   ├── components/           # Navbar, AI Assistant, Modal, CustomCursor
│   │   ├── sections/             # Portfolio sections (Hero, About, Education, etc.)
│   │   ├── Three/                # Three.js 3D Background & Constellations
│   │   ├── App.jsx               # Page layout & state orchestration
│   │   ├── index.css             # Design system variables, themes, & animations
│   │   └── main.jsx
│   ├── index.html                # Optimized SEO meta tags
│   └── package.json
└── backend/                      # FastAPI Python Backend
    ├── main.py                   # FastAPI server entry point
    ├── config.py                 # App settings & dotenv loading
    ├── mailer.py                 # SMTP HTML Email Dispatcher
    ├── ai_agent.py               # Gemini API chat logic
    ├── requirements.txt          # Python dependencies
    └── .env                      # Local environment configurations (SMTP / Gemini)
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python 3.10+](https://www.python.org/)

---

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   - **Windows (PowerShell):**
     ```powershell
     python -m venv venv
     ./venv/Scripts/Activate.ps1
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your environment variables. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and input your credentials:
   - **`SMTP_USERNAME`** & **`SMTP_PASSWORD`**: Your email and app password (e.g. Gmail App Password).
   - **`GEMINI_API_KEY`**: Your Google Gemini API Key.
   *(Note: If left blank, the contact form uses console logging fallback and the AI Chatbot runs on a client-side pattern matching engine fallback so everything works perfectly out-of-the-box!)*

5. Run the server:
   ```bash
   python main.py
   ```
   The backend will start at `http://127.0.0.1:8000`.

---

### 2. Frontend Setup (React + Vite + Tailwind)

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install the node packages:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```
   This generates compiled production assets under `frontend/dist/`.

---

## Tech Stack Details

- **Frontend**: React.js, Vite, Tailwind CSS v4, Framer Motion (for smooth viewport entry transition animations), Three.js (WebGL Canvas), Canvas Confetti, Lucide React (icons).
- **Backend**: FastAPI, Uvicorn, Python Dotenv, Google Generative AI (Gemini 1.5 Flash).

import os
from dotenv import load_dotenv

# Load env variables from a .env file
load_dotenv()

# App settings
PORT = int(os.getenv("PORT", 8000))
# Setting host to 0.0.0.0 ensures Render and other cloud platforms can route external traffic to your app
HOST = os.getenv("HOST", "0.0.0.0")

# Frontend URL (Used for CORS settings in main.py)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# SMTP Configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", SMTP_USERNAME)  # Default to sender email

# Gemini API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
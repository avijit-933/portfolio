from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import mailer
import ai_agent
import uvicorn
import config

app = FastAPI(
    title="Avijit Patra Portfolio API",
    description="Backend API for Avijit Patra's premium portfolio website, supplying SMTP contact dispatch and AI Q&A.",
    version="1.0.0"
)

# CORS configuration targeting your production frontend and local dev environments
origins = [
    getattr(config, "FRONTEND_URL", "http://localhost:5173"),  # Render Frontend URL
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # React CRA dev server
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    mode: str

# Endpoints
@app.get("/")
def read_root():
    return {
        "status": "online",
        "portfolio": "Avijit Patra AI Engineer Portfolio API",
        "ai_chat_enabled": bool(config.GEMINI_API_KEY),
        "smtp_enabled": bool(config.SMTP_USERNAME and config.SMTP_PASSWORD)
    }

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact_form(payload: ContactRequest):
    success = mailer.send_contact_email(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message
    )
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send contact email. Please try again later."
        )
    return ContactResponse(success=True, message="Message sent successfully!")

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_bot(payload: ChatRequest):
    if not payload.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message content cannot be empty."
        )
    
    # Get answer from Gemini / local matcher
    response = ai_agent.generate_ai_response(payload.message)
    mode = "ai" if config.GEMINI_API_KEY else "local"
    
    return ChatResponse(response=response, mode=mode)

if __name__ == "__main__":
    uvicorn.run("main:app", host=config.HOST, port=config.PORT)
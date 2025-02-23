from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from secretss import API_KEY
# Load API Key (Replace with your actual API Key)
GEMINI_API_KEY = API_KEY
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Function to Generate AI Response with Gemini
def generate_gemini_response(user_input):
    """Get AI response from Gemini"""
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(user_input)

    if response and response.text:
        return response.text.strip()
    return "I'm not sure, but I can analyze your skills and provide insights!"


@app.post("/chat")
async def chat_with_ai(request: Request):
    """Chatbot Endpoint - Process user messages & return AI response."""
    data = await request.json()
    user_input = data.get("message", "")

    if not user_input:
        return {"response": "Please enter a message."}

    ai_response = generate_gemini_response(user_input)

    return {"response": ai_response}


@app.get("/")
def home():
    return {"message": "Gemini-powered AI API is running. Send POST requests to /chat"}

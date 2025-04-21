from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from fastapi.responses import JSONResponse
from secretss import API_KEY
from fastapi.responses import Response
from secrets import API_KEY
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
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(user_input)

    if response and response.text:
        return response.text.strip()
    return "I'm not sure, but I can analyze your skills and provide insights!"

@app.options("/chat")
async def options_chat():
    return Response(status_code=204)
@app.post("/chat")
async def chat_with_ai(request: Request):
    """Chatbot Endpoint - Process user messages & return AI response."""
    data = await request.json()
    user_input = data.get("message", "")

    if not user_input:
        return JSONResponse(content={"response": "Please enter a message."})

    prompt = (
    "I want you to act as a career development coach. Based on the resume and career goals I give you, create a personalized plan. "
    "Your response should be well-formatted using markdown-style structure. Use headings, bullet points, and spacing to improve readability.\n\n"
    "Break down the plan into the following clear sections:\n"
    "1. **Short-Term Goals (1–6 months)**\n"
    "2. **Long-Term Goals (1–5 years)**\n"
    "3. **Daily Tasks**\n"
    "4. **Weekly Tasks**\n"
    "5. **Monthly Milestones**\n"
    "6. **Skills to Learn / Tools to Master**\n"
    "7. **Certifications or Projects to Complete**\n"
    "8. **Networking and Branding Suggestions**\n"
    "9. **Timeline Summary with Milestones**\n\n"
    "You're a helpful, structured, and encouraging Career Development AI Coach. "
    "Give Highly specific tasks for each day till the goal is achieved"
    "Your job is to give responses that are:\n"
    "- Clean and easy to read\n"
    "- Structured using markdown headers, bullet points, and spacing\n"
    "- Broken into sections (Short-Term Goals, Long-Term Goals, Daily Tasks, Tools to Learn, etc)\n"
    "- Professional but warm in tone\n"
    "- Optional: Use emojis to highlight sections (🎯, 📚, 🗓️, ✅, etc), but don’t overdo it.\n\n"
    f"Here is the resume and goal input:\n{user_input}"
    )
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        result = model.generate_content(prompt)
        ai_response = result.text if hasattr(result, "text") else result.parts[0].text
        return JSONResponse(content={"response": ai_response})
    except Exception as e:
        return JSONResponse(status_code=500, content={"response": f"Error: {str(e)}"})


@app.get("/")
def home():
    return {"message": "Gemini-powered AI API is running. Send POST requests to /chat"}
# Run with: uvicorn chatbot:app --host 0.0.0.0 --port 8000 --reload
import os
import google.generativeai as palm
from secrets import API_KEY
from fastapi import FastAPI
from pydantic import BaseModel

# Configure API Key
palm.configure(api_key=os.getenv("GOOGLE_AI_STUDIO_API_KEY", API_KEY))

# Initialize FastAPI app
app = FastAPI()

# File path for the extracted resume text
RESUME_FILE = "resume_output.txt"


# Define a request model (for future enhancements)
class ResumeInput(BaseModel):
    skills: str
    experience: str
    education: str


def extract_resume_sections(file_path):
    """Reads extracted resume text file and extracts Skills, Experience, Education sections."""
    sections = {"Skills": "", "Experience": "", "Education": ""}
    current_section = None

    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if line.lower().startswith("skills"):
            current_section = "Skills"
            continue
        elif line.lower().startswith("experience"):
            current_section = "Experience"
            continue
        elif line.lower().startswith("education"):
            current_section = "Education"
            continue

        if current_section:
            sections[current_section] += line + " "

    return sections["Skills"].strip(), sections["Experience"].strip(), sections["Education"].strip()


def generate_career_roadmap(skills: str, experience: str, education: str) -> str:
    """Uses AI to generate a career roadmap based on extracted resume details."""
    prompt = (
        "Based on the following information, generate a detailed career path roadmap, provide a plan day by day"
        " basis for every day in a month"
        "with actionable steps with specific detailed tutorial-like explanations:\n\n"
        f"Skills: {skills}\n"
        f"Experience: {experience}\n"
        f"Education: {education}\n\n"
        "Career Roadmap:"
    )

    response = palm.GenerativeModel("gemini-pro").generate_content(prompt)

    if response and response.text:
        return response.text.strip()
    return "No output received."


@app.get("/generate-roadmap")
def get_career_roadmap():
    """API endpoint to fetch AI-generated career roadmap."""
    skills, experience, education = extract_resume_sections(RESUME_FILE)
    roadmap = generate_career_roadmap(skills, experience, education)

    return {
        "skills": skills,
        "experience": experience,
        "education": education,
        "career_roadmap": roadmap
    }

# Run with: uvicorn api:app --host 0.0.0.0 --port 8000 --reload

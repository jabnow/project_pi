import os
import google.generativeai as palm
import secrets
from secrets import API_KEY

# Configure API key
palm.configure(api_key=os.getenv("GOOGLE_AI_STUDIO_API_KEY", API_KEY))

# Use GenerativeModel instead of the old generate_text function
model = palm.GenerativeModel("gemini-pro")  # Use "gemini-pro" or another available model

def generate_career_roadmap(skills: str, experience: str, education: str) -> str:
    prompt = (
        "Based on the following information, generate a detailed career path roadmap "
        "with actionable steps:\n\n"
        f"Skills: {skills}\n"
        f"Experience: {experience}\n"
        f"Education: {education}\n\n"
        "Career Roadmap:"
    )

    response = model.generate_content(prompt)

    if response and response.text:
        return response.text.strip()
    return "No output received."

if __name__ == "__main__":
    print("Enter your career information to generate a roadmap.")
    skills_input = input("Skills: ")
    experience_input = input("Experience: ")
    education_input = input("Education: ")

    roadmap = generate_career_roadmap(skills_input, experience_input, education_input)
    print("\nGenerated Career Roadmap:\n")
    print(roadmap)

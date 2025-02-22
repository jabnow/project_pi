import os
import google.generativeai as palm
from secrets import API_KEY


# Configure API key
palm.configure(api_key=os.getenv("GOOGLE_AI_STUDIO_API_KEY", API_KEY))

# Use GenerativeModel instead of the old generate_text function
model = palm.GenerativeModel("gemini-pro")  # Use "gemini-pro" or another available model

# File path for the extracted resume text
RESUME_FILE = "resume_output.txt"

def extract_resume_sections(file_path):
    """Reads the extracted resume text file and extracts Skills, Experience, and Education sections."""
    sections = {"Skills": "", "Experience": "", "Education": ""}
    current_section = None

    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Detect section headers
        if line.lower().startswith("skills"):
            current_section = "Skills"
            continue
        elif line.lower().startswith("experience"):
            current_section = "Experience"
            continue
        elif line.lower().startswith("education"):
            current_section = "Education"
            continue

        # Append content to the detected section
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

    response = model.generate_content(prompt)

    if response and response.text:
        return response.text.strip()
    return "No output received."

if __name__ == "__main__":
    print("Reading resume information from file...")

    # Extract information from resume
    skills, experience, education = extract_resume_sections(RESUME_FILE)

    print("\nExtracted Resume Information:")
    print(f"Skills: {skills[:200]}...")  # Print only first 200 characters for preview
    print(f"Experience: {experience[:200]}...")
    print(f"Education: {education[:200]}...")

    # Generate career roadmap
    roadmap = generate_career_roadmap(skills, experience, education)

    print("\nGenerated Career Roadmap:\n")
    print(roadmap)

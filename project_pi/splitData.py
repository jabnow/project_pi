import pymupdf  # PyMuPDF for PDF processing
import re

# Section headers for direct classification
SECTION_HEADERS = ["Education", "Experience", "Skills"]

# Define keyword lists for classification
EDUCATION_KEYWORDS = [
    "university", "college", "school", "degree", "bachelor", "master", "phd", "gpa", "coursework",
    "academic", "scholarship", "honors", "certification"
]
EXPERIENCE_KEYWORDS = [
    "experience", "worked", "intern", "job", "employment", "role", "responsibility",
    "company", "career", "research", "developed", "managed", "led"
]
SKILLS_KEYWORDS = [
    "skills", "proficient", "expertise", "knowledge of", "programming", "python", "java",
    "machine learning", "tensorflow", "pytorch", "linux", "devops", "kubernetes", "docker"
]


def clean_text(text):
    """Remove contact details, links, and unnecessary data."""
    text = re.sub(r'\S+@\S+', '', text)  # Remove emails
    text = re.sub(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', '', text)  # Remove phone numbers
    text = re.sub(r'https?://\S+', '', text)  # Remove URLs
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
    return text


def extract_fields_from_resume(resume_text):
    """Extracts structured data from the resume text."""
    paragraphs = re.split(r"\n+", resume_text)
    sections = {"Education": [], "Experience": [], "Skills": []}
    current_section = None

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Detect explicit section headers
        if any(header.lower() in para.lower() for header in SECTION_HEADERS):
            current_section = next(header for header in SECTION_HEADERS if header.lower() in para.lower())
            continue  # Move to next line

        # Associate bullet points with the current section
        if current_section:
            sections.setdefault(current_section, []).append(para)
            continue

        # Fallback to keyword-based classification
        category = classify_paragraph(para)
        if category:
            sections[category].append(para)

    # Format sections as clean text
    formatted_sections = {key: clean_text("\n".join(value)) for key, value in sections.items()}
    return formatted_sections


def classify_paragraph(paragraph):
    """Classify a paragraph using keyword-based matching."""
    text = paragraph.lower()
    edu_count = sum(1 for kw in EDUCATION_KEYWORDS if kw in text)
    exp_count = sum(1 for kw in EXPERIENCE_KEYWORDS if kw in text)
    skills_count = sum(1 for kw in SKILLS_KEYWORDS if kw in text)

    if edu_count > exp_count and edu_count > skills_count:
        return "Education"
    elif exp_count > edu_count and exp_count > skills_count:
        return "Experience"
    elif skills_count > edu_count and skills_count > exp_count:
        return "Skills"
    return None


def process_pdf(pdf_path, output_txt="resume_output.txt"):
    """Reads a PDF file, extracts text, and organizes it into structured sections."""
    doc = pymupdf.open(pdf_path)
    extracted_text = ""

    for page in doc:
        extracted_text += page.get_text("text") + "\n"

    # Process extracted text
    structured_resume = extract_fields_from_resume(extracted_text)

    # Save structured output
    with open(output_txt, "w", encoding="utf-8") as f:
        for section, content in structured_resume.items():
            f.write(f"{section}:\n{content}\n\n")

    print(f"Resume data extracted and saved to {output_txt}")


if __name__ == "__main__":
    pdf_file = "resume.pdf"  # Replace with your actual PDF filename
    process_pdf(pdf_file)

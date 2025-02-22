import pandas as pd
import re

# Define keyword lists for each category.
EDUCATION_KEYWORDS = [
    "university", "college", "bachelor", "master", "phd", "high school", "education", "institute", "degree"
]
EXPERIENCE_KEYWORDS = [
    "experience", "worked", "job", "intern", "project", "role", "responsibility", "employment", "company", "career"
]
SKILLS_KEYWORDS = [
    "python", "java", "c++", "c#", "javascript", "skills", "proficient", "programming", "certification", "sql",
    "knowledge", "tool"
]


def classify_paragraph(paragraph):
    """Classify a paragraph as Education, Experience, or Skills based on keyword counts."""
    text = paragraph.lower()
    edu_count = sum(1 for kw in EDUCATION_KEYWORDS if kw in text)
    exp_count = sum(1 for kw in EXPERIENCE_KEYWORDS if kw in text)
    skills_count = sum(1 for kw in SKILLS_KEYWORDS if kw in text)

    # If no keywords are found, return None.
    if edu_count == 0 and exp_count == 0 and skills_count == 0:
        return None

    # Choose the category with the highest count.
    max_count = max(edu_count, exp_count, skills_count)
    if max_count == edu_count:
        return "Education"
    elif max_count == exp_count:
        return "Experience"
    else:
        return "Skills"


def extract_fields_from_resume(resume_text):
    """
    Splits the resume text into paragraphs, classifies each paragraph,
    and then returns three strings: one each for Skills, Experience, and Education.
    """
    # Split the text into paragraphs (using newline as separator).
    paragraphs = re.split(r"\n+", resume_text)
    edu_parts = []
    exp_parts = []
    skills_parts = []

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        category = classify_paragraph(para)
        if category == "Education":
            edu_parts.append(para)
        elif category == "Experience":
            exp_parts.append(para)
        elif category == "Skills":
            skills_parts.append(para)

    # Join paragraphs for each category
    education_text = "\n".join(edu_parts)
    experience_text = "\n".join(exp_parts)
    skills_text = "\n".join(skills_parts)
    return skills_text, experience_text, education_text


def main():
    input_csv = "UpdatedResumeDataSet.csv"
    output_csv = "UpdatedResumeDataSet_Separated.csv"

    try:
        df = pd.read_csv(input_csv)
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return

    if "Resume" not in df.columns:
        print("Column 'Resume' not found in the CSV.")
        return

    skills_list = []
    experience_list = []
    education_list = []

    # Process each resume row
    for index, row in df.iterrows():
        resume_text = row["Resume"]
        if not isinstance(resume_text, str):
            skills_list.append("")
            experience_list.append("")
            education_list.append("")
        else:
            skills_text, exp_text, edu_text = extract_fields_from_resume(resume_text)
            skills_list.append(skills_text)
            experience_list.append(exp_text)
            education_list.append(edu_text)
            # For debugging: print output for the first few rows
            if index < 3:
                print(
                    f"Row {index} -- Skills: {skills_text}\nExperience: {exp_text}\nEducation: {edu_text}\n{'-' * 40}")

    # Add new columns to DataFrame
    df["Skills"] = skills_list
    df["Experience"] = experience_list
    df["Education"] = education_list

    try:
        df.to_csv(output_csv, index=False)
        print(f"Extraction complete. File saved to {output_csv}")
    except Exception as e:
        print(f"Error writing CSV file: {e}")


if __name__ == '__main__':
    main()

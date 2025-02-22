from flask import Flask, jsonify, render_template
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA

app = Flask(__name__)

json_file_path = "Occupation Data.json"

# Define industry categories based on O*NET-SOC first two digits
industry_colors = {
    "11": "rgba(255, 99, 132, 0.7)",  # Management
    "13": "rgba(54, 162, 235, 0.7)",  # Business and Finance
    "15": "rgba(255, 206, 86, 0.7)",  # Computer and Mathematics
    "17": "rgba(75, 192, 192, 0.7)",  # Engineering
    "19": "rgba(153, 102, 255, 0.7)",  # Science
    "29": "rgba(255, 159, 64, 0.7)",  # Healthcare
    "31": "rgba(201, 203, 207, 0.7)",  # Support roles
    "41": "rgba(0, 128, 128, 0.7)",  # Sales
    "47": "rgba(0, 255, 0, 0.7)",  # Construction
    "51": "rgba(128, 0, 128, 0.7)",  # Manufacturing
    "53": "rgba(0, 0, 255, 0.7)"  # Transportation
}


def process_occupation_data():
    with open(json_file_path, 'r') as f:
        data = json.load(f)

    occupation_data = data.get("Occupation Data", [])

    descriptions = [item['Description'] for item in occupation_data]
    titles = [item['Title'] for item in occupation_data]
    codes = [item['O*NET-SOC Code'] for item in occupation_data]

    # Vectorize descriptions
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(descriptions)

    # Apply PCA for 2D visualization
    pca = PCA(n_components=2)
    pca_result = pca.fit_transform(tfidf_matrix.toarray())

    # Assign colors based on first two digits of O*NET-SOC Code
    processed_data = []
    for i in range(len(titles)):
        industry_code = codes[i].split("-")[0]  # Extract first two digits
        color = industry_colors.get(industry_code, "rgba(100, 100, 100, 0.7)")  # Default color if not mapped
        processed_data.append({
            "x": float(pca_result[i][0]),
            "y": float(pca_result[i][1]),
            "title": titles[i],
            "color": color
        })

    return processed_data


@app.route('/')
def index():
    return render_template("prettyChart.html")


@app.route('/get_data')
def get_data():
    return jsonify(process_occupation_data())


if __name__ == '__main__':
    app.run(debug=True)

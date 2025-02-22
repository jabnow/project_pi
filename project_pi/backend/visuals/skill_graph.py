import json
from sklearn.feature_extraction.text import TfidfVectorizer
# import sys
# sys.path.append(".venv\Lib\site-packages\sklearn")
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
# import sklearn
# print(sklearn.__version__)

def visualize_occupation_data(json_file):
    """
    vectorization visualization of occupation data from a JSON file.
    Takes in: JSON file path
    Returns: None (displays a plot)
    """

    try:
        with open(json_file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at {json_file}")
        return
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {json_file}")
        return

    occupation_data = data.get("Occupation Data")
    if not occupation_data:
        print("Error: 'Occupation Data' key not found in JSON or is empty.")
        return
    descriptions = [item['Description'] for item in occupation_data]

    # vectorize text with TF-IDF
    vectorizer = TfidfVectorizer(stop_words='english') 
    tfidf_matrix = vectorizer.fit_transform(descriptions)

    # 3. using PCA
    n_components = 2 # Reduce to 2 dimensions 
    pca = PCA(n_components=n_components)
    pca_result = pca.fit_transform(tfidf_matrix.toarray()) 


    # data visualization 
    df = pd.DataFrame(pca_result, columns=['PCA1', 'PCA2'])
    titles = [item['Title'] for item in occupation_data] 
    df['Title'] = titles 
    df['O*NET-SOC Code'] = [item['O*NET-SOC Code'] for item in occupation_data]


    # Visualize
    plt.figure(figsize=(12, 8)) # make figure bigger to be able to read
    sns.scatterplot(x='PCA1', y='PCA2', data=df, hue='Title', alpha=0.7, palette="viridis")
    plt.title('Occupation Data Visualization using TF-IDF and PCAq')
    plt.xlabel('Principal Component 1')
    plt.ylabel('Principal Component 2')
    # adjust legend position
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left') 
    plt.tight_layout(rect=[0, 0, 0.85, 1]) 
    plt.show()


# Example Usage:
# json_file_path = "C:\Users\wangj\projects\project_pi\project_pi\data\Occupation Data.json"
json_file_path = "C:\\Users\wangj\projects\project_pi\project_pi\data\Occupation Data.json"
visualize_occupation_data(json_file_path)
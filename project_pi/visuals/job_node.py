import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
import networkx as nx
import plotly.graph_objects as go
import plotly.offline as pyo
from typing import List, Dict, Any

class InteractiveJobGraph:
    """
    A wrapper class for creating an interactive job graph visualization.
    """

    def __init__(self, json_file: str, level_keywords: Dict[str, List[str]], similarity_threshold: float = 0.25):
        """
        Initializes the InteractiveJobGraph.

        Args:
            json_file (str): Path to the JSON file containing occupation data.
            level_keywords (dict): A dictionary defining job levels and keywords.
            similarity_threshold (float): Threshold for similarity between jobs to create an edge.
        """
        self.json_file = json_file
        self.level_keywords = level_keywords
        self.similarity_threshold = similarity_threshold
        self.occupation_data: List[Dict[str, Any]] = []
        self.graph: nx.Graph = nx.Graph()
        self.pos: Dict[int, List[float]] = {}  # Position for graph layout

        self._load_data()
        self._create_graph()

    def _load_data(self):
        """Loads and validates data from the JSON file."""
        try:
            with open(self.json_file, 'r') as f:
                data = json.load(f)
        except FileNotFoundError:
            raise FileNotFoundError(f"Error: File not found at {self.json_file}")
        except json.JSONDecodeError:
            raise ValueError(f"Error: Invalid JSON format in {self.json_file}")

        self.occupation_data = data.get("Occupation Data")
        if not self.occupation_data:
            raise ValueError("Error: 'Occupation Data' key not found in JSON or is empty.")

    def _classify_job_levels(self) -> List[str]:
        """Classifies job levels based on keywords in titles."""
        job_levels = []
        for job in self.occupation_data:
            title = job['Title'].lower()
            level = "Unclassified"  # Default
            for lvl, keywords in self.level_keywords.items():
                for keyword in keywords:
                    if keyword in title:
                        level = lvl
                        break
                if level != "Unclassified":
                    break
            job_levels.append(level)
        return job_levels

    def _create_graph(self):
        """Creates the NetworkX graph from the occupation data."""
        titles = [item['Title'] for item in self.occupation_data]
        descriptions = [item['Description'] for item in self.occupation_data]
        job_levels = self._classify_job_levels()

        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(titles)

        similarity_matrix = (tfidf_matrix * tfidf_matrix.T).toarray()

        for i in range(len(self.occupation_data)):
            self.graph.add_node(i,
                                title=titles[i],
                                description=descriptions[i],  # Add description to node
                                level=job_levels[i],
                                onet_code=self.occupation_data[i].get('O*NET-SOC Code', 'N/A'))  # Adding the O*NET-SOC code

        for i in range(len(self.occupation_data)):
            for j in range(i + 1, len(self.occupation_data)):
                if similarity_matrix[i, j] > self.similarity_threshold:
                    self.graph.add_edge(i, j, weight=similarity_matrix[i, j])

        # Layout the graph
        self.pos = nx.spring_layout(self.graph, k=0.6, iterations=100)

    def create_interactive_plot(self):
        """Creates an interactive plot using Plotly."""

        if not self.graph:
            print("Error: Graph not created. Ensure data is loaded and graph is created first.")
            return

        edge_x = []
        edge_y = []
        for edge in self.graph.edges():
            x0, y0 = self.pos[edge[0]]
            x1, y1 = self.pos[edge[1]]
            edge_x.append(x0)
            edge_x.append(x1)
            edge_x.append(None)  # Add None to create disjointed segments
            edge_y.append(y0)
            edge_y.append(y1)
            edge_y.append(None)  # Add None to create disjointed segments

        edge_trace = go.Scatter(
            x=edge_x, y=edge_y,
            line=dict(width=0.5, color='#888'),
            hoverinfo='none',
            mode='lines'  # Show segments between points
        )

        node_x = []
        node_y = []
        node_text = []  # Text for hover information
        for node in self.graph.nodes():
            x, y = self.pos[node]
            node_x.append(x)
            node_y.append(y)
            node_text.append(f"<b>{self.graph.nodes[node]['title']}</b><br>"  # Bold title
                             f"Level: {self.graph.nodes[node]['level']}<br>"  # Level info
                             f"Code: {self.graph.nodes[node]['onet_code']}<br>"
                             f"Description: {self.graph.nodes[node]['description']}")

        node_trace = go.Scatter(
            x=node_x, y=node_y,
            mode='markers',
            hoverinfo='text',
            text=node_text,  # Set hover text
            marker=dict(
                showscale=False,
                colorscale='YlGnBu',
                reversescale=True,
                color=[],
                size=10,
                line_width=2
            )
        )

        node_adjacencies = []
        node_trace.marker.color = []
        for node, adjacencies in enumerate(self.graph.adjacency()):
            node_adjacencies.append(len(adjacencies[1]))

        node_trace.marker.color = node_adjacencies

        fig = go.Figure(data=[edge_trace, node_trace],
                        layout=go.Layout(
                            title=dict(text='<br>Job Ontology Graph', font=dict(size=16)),
                            showlegend=False,
                            hovermode='closest',
                            margin=dict(b=20, l=5, r=5, t=40),
                            annotations=[dict(
                                text="Hover over nodes for information",
                                showarrow=False,
                                xref="paper", yref="paper",
                                x=0.005, y=-0.002
                            )],
                            xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                            yaxis=dict(showgrid=False, zeroline=False, showticklabels=False))
                        )

        # Ensure the public/ directory exists
        public_path = os.path.join(os.path.dirname(__file__), "..", "public")
        os.makedirs(public_path, exist_ok=True)

        # Save the job graph in the correct public/ folder
        output_file = os.path.join(public_path, "job_graph.html")
        pyo.plot(fig, filename=output_file, auto_open=False)

        print(f"✅ Job graph saved at: {output_file}")

        return fig


# Example Usage:
json_file_path = os.path.join(os.path.dirname(__file__), "..", "data", "Occupation Data.json")
level_keywords = {
    'Executive': ['chief', 'executive', 'director'],
    'Manager': ['manager', 'supervisor', 'coordinator'],
    'Specialist': ['specialist', 'analyst', 'officer'],
    'Technician': ['technician', 'engineer', 'programmer'],
    'Entry Level': ['assistant', 'clerk', 'helper', 'laborer']
}

graph_visualizer = InteractiveJobGraph(json_file_path, level_keywords)
interactive_fig = graph_visualizer.create_interactive_plot()

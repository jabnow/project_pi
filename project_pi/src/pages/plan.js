import React, { useState } from "react";

const Plan = () => {
    const [showResume, setShowResume] = useState(true);
  return (
    <div>
      <h1>PLAN</h1>
        <div style={{display: "flex", justifyContent: "space-around"}}>
            {/* Left: Toggle Resume / Chatbot */}
            <div style={{width: "45%", background: "#ddd", padding: "20px"}}>
                <h2>Toggle Between Two Tabs</h2>
                <button onClick={() => setShowResume(true)}>Show Resume</button>
                <button onClick={() => setShowResume(false)}>Show Chatbot</button>

                {showResume ? (
                    <div>
                        <h3>Resume Display</h3>
                        <p>Your resume content here...</p>
                    </div>
                ) : (
                    <div>
                        <h3>Chatbot Chatlog</h3>
                        <textarea placeholder="Type here..." rows="4" cols="30"></textarea>
                    </div>
                )}
            </div>
            {/* Right: Job Node Visualization */}
            <div style={{width: "45%", background: "#ddd", padding: "20px"}}>
                <h2>Job Node Visualization</h2>
                <iframe
                    src="/job_graph.html"
                    width="100%"
                    height="400px"
                    title="Job Ontology Graph"
                />
            </div>
        </div>
    </div>
  );
};

export default Plan;

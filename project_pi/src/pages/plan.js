import React from "react";

const Plan = () => {

  return (
    <div>
      <h1>PLAN</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>

        {/* Right: Job Node Visualization */}
        <div style={{ width: "45%", background: "#ddd", padding: "20px" }}>
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

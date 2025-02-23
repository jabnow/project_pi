import React from "react";
import ResumeDisplay from "../components/resumeDisplay";
const Plan = () => {

  return (
      <div>
          <ResumeDisplay/>
        <div>
          <h1>PLAN</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>

            {/* Right: Job Node Visualization */}
            <div style={{ width: "45%", background: "#ddd", padding: "20px" }}>
              <h2>Job Node Visualization</h2>
              <iframe
                src="../../public/job_graph.html"
                width="100%"
                height="400px"
                title="Job Ontology Graph"
              />
            </div>
          </div>
        </div>
      </div>
          ) };

export default Plan;

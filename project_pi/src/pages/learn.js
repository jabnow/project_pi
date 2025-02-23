import React from "react";
import Charts from "../components/charts";
import Timeline from "../components/timeline.js";

function Learn() {
  return (
    <div style={styles.container}>
      {/* Timeline on the left */}
      <div style={styles.leftColumn}>
        <Timeline />
      </div>

      {/* Charts on the right */}
      <div style={styles.rightColumn}>
        <div style={styles.chartContainer}>
          <Charts />
        </div>
      </div>
    </div>
  );
}

export default Learn;

const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh"
  },
  leftColumn: {
    flex: 1,
    borderRight: "1px solid #ddd"
  },
  rightColumn: {
    // Make the right column flex
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "30px"
  },
  chartContainer: {
    // rounded box around charts
    width: "80%", 
    minHeight: "400px",           
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  }
};

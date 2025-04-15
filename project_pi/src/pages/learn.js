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
          <div>
            <Charts/>
          </div>
        </div>
        <h2 style={{textAlign: "left", marginTop: "50px", marginLeft:"30px"}}>
          Project Pi - Let's Take It One Slice at a Time!!!
        </h2>
      </div>
    </div>
  );
}

export default Learn;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: "100vh",
    fontFamily: "Sans-serif"
  },
  leftColumn: {
    flex: 1,
    borderRight: "1px solid #ddd"
  },
  rightColumn: {
    // Make the right column flex
    flex: 1,
    //display: "flex",
    //flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px"
  },
  chartContainer: {
    // rounded box around charts
    width: "90%",
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

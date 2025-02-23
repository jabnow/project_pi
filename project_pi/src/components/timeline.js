import React from "react";

function Timeline() {
  // Fake learning plan data
  const steps = [
    {
      step: 1,
      label: "HTML & CSS Foundations",
      date: "April 1 - April 10",
      status: "Completed",
    },
    {
      step: 2,
      label: "JavaScript Basics",
      date: "April 11 - April 25",
      status: "In Progress",
    },
    {
      step: 3,
      label: "React Fundamentals",
      date: "April 26 - May 10",
      status: "Pending",
    },
    {
      step: 4,
      label: "Node.js & Express",
      date: "May 11 - May 25",
      status: "Pending",
    },
    {
      step: 5,
      label: "Database & ORM",
      date: "May 26 - June 5",
      status: "Pending",
    },
    {
      step: 6,
      label: "Deployment & CI/CD",
      date: "June 6 - June 15",
      status: "Pending",
    },
  ];

  return (
    <div style={styles.timelineContainer}>
      {/* Top description */}
      <div style={styles.descriptionBox}>
        <h2 style={styles.heading}>SWE Learning Plan</h2>
        <p style={styles.paragraph}>
          This timeline outlines a straightforward path to mastering full stack
          development. Each step builds on the previous ones, covering
          fundamentals and practical skills for both front-end and back-end
          development.
        </p>
      </div>

      {steps.map((item, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={item.step} style={styles.stepWrapper}>
            {/* Circle / step number */}
            <div style={styles.circleContainer}>
              <div style={styles.circle}>
                <span style={styles.circleText}>{item.step}</span>
              </div>
              {/* Vertical line if not last step */}
              {!isLast && <div style={styles.verticalLine} />}
            </div>

            {/* Step details */}
            <div style={styles.stepDetails}>
              <div style={styles.stepLabel}>{item.label}</div>
              <div style={styles.stepDate}>{item.date}</div>
              <div style={styles.stepStatus}>{item.status}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;

// Inline styles (you can move these into a separate .css file if desired)
const styles = {
  timelineContainer: {
    padding: "20px",
    borderRight: "1px solid #ccc",
    height: "100%",
    boxSizing: "border-box",
  },
  descriptionBox: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  heading: {
    margin: 0,
    fontSize: "24px",
  },
  paragraph: {
    fontSize: "16px",
    color: "#555",
  },
  stepWrapper: {
    display: "flex",
    marginBottom: "30px",
  },
  circleContainer: {
    position: "relative",
    width: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  circle: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#2D336B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#F7F7F7",
    marginBottom: "8px",
  },
  circleText: {
    fontWeight: "bold",
  },
  verticalLine: {
    width: "2px",
    backgroundColor: "#2D336B",
    flexGrow: 10,
  },
  stepDetails: {
    marginLeft: "10px",
  },
  stepLabel: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  stepDate: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "2px",
  },
  stepStatus: {
    fontSize: "14px",
    color: "#999",
  },
};

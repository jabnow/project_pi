import React, { useState } from "react";
import Calendar from "../components/calendar";
import logo from "../components/logo.svg";

function Home() {
  // Tab state: which tab is active (welcome, about, terms)
  const [activeTab, setActiveTab] = useState("welcome");

  // Content for each tab
  const tabContent = {
    welcome: "Welcome to our website! We’re glad you’re here. Use the navigation above to explore. Or click on a date to start planning your day.",
    about: "We are a team of unlikely asipring web developers with an interest how AI changes careers through this project. Also we like pie.",
    terms: "Project Pi uses NLP and ML algorithms to project learning paths and career possibilities based on user interests or current skill sets."
  };

  // Helper function to render text based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "welcome":
        return tabContent.welcome;
      case "about":
        return tabContent.about;
      case "terms":
        return tabContent.terms;
      default:
        return "";
    }
  };

  return (
    <div style={styles.container}>
      {/* Top-left: Calendar */}
      <Calendar />

      {/* Rounded box with tabs in lower-left corner */}
      <div style={styles.infoBox}>
        <h2 style={styles.header}>Information</h2>
        {/* Tabs */}
        <div style={styles.tabWrapper}>
          <button
            style={activeTab === "welcome" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("welcome")}
          >
            Welcome
          </button>
          <button
            style={activeTab === "about" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("about")}
          >
            About Us
          </button>
          <button
            style={activeTab === "terms" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("terms")}
          >
            Terms of Use
          </button>
        </div>

        {/* Body text */}
        <p style={styles.bodyText}>
          {renderContent()}
        </p>
      </div>
    </div>
  );
}

export default Home;

const styles = {
  container: {
    minHeight: "90vh",
    background: `url(${logo}) no-repeat right center / cover`,
    backgroundSize: "60%",
    backgroundPosition: "630px",
    // Position relative so we can place infoBox in lower-left
    position: "relative",
  },
  infoBox: {
    // Lower-left corner (adjust as you like)
    position: "absolute",
    bottom: "275px",
    left: "175px",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  header: {
    margin: 0,
    marginBottom: "10px",
    fontSize: "20px",
    color: "#333",
  },
  tabWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  tab: {
    flex: 1,
    padding: "8px",
    margin: "0 4px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  activeTab: {
    flex: 1,
    padding: "8px",
    margin: "0 4px",
    backgroundColor: "#FDB827",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  bodyText: {
    fontSize: "14px",
    lineHeight: "1.4",
    color: "#555",
    margin: 0
  }
};
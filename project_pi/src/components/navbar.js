import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const basicColor = "#F7F7F7";
  const highlightColor = "#FDB827";

  const [homeColor, setHomeColor] = useState(basicColor);
  const [learnColor, setLearnColor] = useState(basicColor);
  const [planColor, setPlanColor] = useState(basicColor);
  const [userColor, setUserColor] = useState(basicColor);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
      case "/Home":
        setHomeColor(highlightColor);
        setLearnColor(basicColor);
        setPlanColor(basicColor);
        setUserColor(basicColor);
        break;
      case "/Learn":
        setHomeColor(basicColor);
        setLearnColor(highlightColor);
        setPlanColor(basicColor);
        setUserColor(basicColor);
        break;
      case "/Plan":
        setHomeColor(basicColor);
        setLearnColor(basicColor);
        setPlanColor(highlightColor);
        setUserColor(basicColor);
        break;
      case "/User":
        setHomeColor(basicColor);
        setLearnColor(basicColor);
        setPlanColor(basicColor);
        setUserColor(highlightColor);
        break;
      default:
        setHomeColor(basicColor);
        setLearnColor(basicColor);
        setPlanColor(basicColor);
        setUserColor(basicColor);
    }
  }, [location]);

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        {/* Image to the left */}
        <li style={styles.li}>
          <img
            src="/favicon.svg"
            alt="Logo"
            style={styles.logo}
          />
        </li>

        {/* Home link */}
        <li style={styles.li}>
          <Link
            to="/Home"
            style={{
              textDecoration: "none",
              fontSize: "25px",
              color: homeColor,
            }}
          >
            Home
          </Link>
        </li>

        <li style={styles.li}>
          <Link
            to="/Learn"
            style={{
              textDecoration: "none",
              fontSize: "25px",
              color: learnColor,
            }}
          >
            Learn
          </Link>
        </li>

        <li style={styles.li}>
          <Link
            to="/Plan"
            style={{
              textDecoration: "none",
              fontSize: "25px",
              color: planColor,
            }}
          >
            Plan
          </Link>
        </li>

        <li style={styles.li}>
          <Link
            to="/User"
            style={{
              textDecoration: "none",
              fontSize: "25px",
              color: userColor,
            }}
          >
            User
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

const styles = {
  nav: {
    backgroundColor: "#005792",
    display: "flex",
    alignItems: "center",
    // If you want links to start from left,
    // no need for justifyContent: "center" or "space-between".
    // If you want some padding around the nav, add it:
    padding: "5px 90px",
  },
  ul: {
    listStyleType: "none",
    display: "flex",
    alignItems: "center",
    margin: 0,
    padding: 10,
  },
  li: {
    padding: "5px",
  },
  logo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
};

import logo from './components/logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.js';
import {PlanContextProvider} from "./components/planContextProvider";
//import pages as components
import Home from "./pages/home.js"
import Learn from "./pages/learn.js"
import Plan from "./pages/plan.js"
import User from "./pages/user.js"


function App() {
  return (
      <Router>
          <PlanContextProvider>
              <div style={{backgroundColor: "#F7F7F7",
                  height: "780px",
              fontFamily: "Sans-Serif"}}>
                  <Navbar />
                  <Routes>
                      <Route path = "/" element={<Home />} />
                      <Route path = "/Home" element={<Home />} />
                      <Route path = "/Learn" element={<Learn />} />
                      <Route path = "/Plan" element={<Plan />} />
                      <Route path = "/User" element={<User />} />
                  </Routes>
              </div>
          </PlanContextProvider>
      </Router>
  );
}
export default App;
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.js';
//import pages as components
import Home from "./pages/home.js"
import Learn from "./pages/learn.js"
import Plan from "./pages/plan.js"
import User from "./pages/user.js"


// create short description welcoming people to the app, brief overview of functions
// add the logo and make it zoom in

function App() {
  return (
      <Router>
        <div>
            <Navbar/>
                <Routes>
                    <Route path = "/Home" element={<Home />} />
                    <Route path = "/Learn" element={<Learn />} />
                    <Route path = "/Plan" element={<Plan />} />
                    <Route path = "/User" element={<User />} />
                </Routes>
        </div>
      </Router>
  );
}
export default App;
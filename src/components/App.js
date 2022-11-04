// import "../styles/App.css";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Footer from "./Footer";
import MainMenu from "./MainMenu";
import Navbar from "./Navbar";
import Upload from "./Upload";
import User from "./User";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

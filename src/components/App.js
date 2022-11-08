// import "../styles/App.css";
import { useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBarang } from "../redux/barangSlice";

import Home from "./Home";
import Footer from "./utils/Footer";
import MainMenu from "./MainMenu";
import Navbar from "./utils/Navbar";
import Upload from "./Upload";
import User from "./User";
import About from "./About";
import Cart from "./Cart";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBarang());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBarang } from "../redux/barangSlice";

import Home from "./Home/";
import User from "./User";
import About from "./About";
import Cart from "./Cart";
import NotFound from "./NotFound";

function App() {
  useDispatch()(fetchBarang());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

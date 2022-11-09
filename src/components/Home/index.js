import React, { useState } from "react";
import "../../styles/Home.css";

import Footer from "../utils/Footer";
import MainPage from "./MainPage";
import Navbar from "../utils/Navbar";
import Upload from "../Upload";

const Home = () => {
  const [upload, toggleUpload] = useState(false);
  const togglePopup = () => {
    toggleUpload(!upload);
  };

  return (
    <div>
      <Navbar toggleUpload={togglePopup} />
      {upload ? <Upload /> : null}
      <MainPage />
      <Footer />
    </div>
  );
};

export default Home;

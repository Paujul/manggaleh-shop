import React, { useState } from "react";
import "../styles/Home.css";

import Footer from "./utils/Footer";
import MainMenu from "./MainMenu";
import Navbar from "./utils/Navbar";
import Upload from "./Upload";

const Home = () => {
  const [upload, toggleUpload] = useState(false);
  const togglePopup = () => {
    toggleUpload(!upload);
  };

  return (
    <div>
      <Navbar toggleUpload={togglePopup} />
      {upload ? <Upload /> : null}
      <MainMenu />
      <Footer />
    </div>
  );
};

export default Home;

//
//   <Navbar toggleUpload={togglePopup} />
//       {upload ? <Upload /> : null}
//       <MainMenu />

//       <Footer />
//

// INGET BIKIN SALDO BUAT BAYAR

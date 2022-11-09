import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";

import "../styles/About.css";
import { about } from "../assets";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div>
          <img src={about} className="object-fill" alt="Logo" />
        </div>

        <div>
          <h1 className="text-center font-extrabold text-red-700/70">
            Salah alamat!
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import about from "../assets/about.png";
import react from "../assets/react.png";
import tailwind from "../assets/tailwind.png";
import axios from "../assets/axios.png";
import reactrouter from "../assets/reactrouter.png";
import redux from "../assets/redux.png";
import hasura from "../assets/hasura.png";

import "../styles/About.css";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div>
          <img src={about} className="object-fill" />
        </div>

        <div className="mb-5">
          <h3 className="italic">"Kamu dagang? Kamu berdagang-dagang??"</h3>
        </div>
        <div>
          <h1 className="text-center font-extrabold text-green-700/70">
            Built using:
          </h1>
          <div>
            <ul className="flex flex-row">
              <li>
                <a href="https://reactjs.org" target="_blank">
                  <img src={react} className="logo-icon" />
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com/" target="_blank">
                  <img src={tailwind} className="logo-icon" />
                </a>
              </li>
              <li>
                <a href="https://axios-http.com/" target="_blank">
                  <img src={axios} className="logo-icon" />
                </a>
              </li>
            </ul>
            <ul className="flex flex-row">
              <li>
                <a href="https://reactrouter.com/en/main" target="_blank">
                  <img src={reactrouter} className="logo-icon" />
                </a>
              </li>
              <li>
                <a href="https://redux.js.org/" target="_blank">
                  <img src={redux} className="logo-icon" />
                </a>
              </li>
              <li>
                <a href="https://hasura.io/" target="_blank">
                  <img src={hasura} className="logo-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import {
  about,
  react,
  tailwind,
  axios,
  reactrouter,
  redux,
  hasura,
} from "../assets";

import "../styles/About.css";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div>
          <img src={about} className="object-fill" alt="Manggaleh Logo" />
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
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                  <img src={react} className="logo-icon" alt="React" />
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={tailwind}
                    className="logo-icon"
                    alt="Tailwind CSS"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://axios-http.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={axios} className="logo-icon" alt="Axios" />
                </a>
              </li>
            </ul>
            <ul className="flex flex-row">
              <li>
                <a
                  href="https://reactrouter.com/en/main"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={reactrouter}
                    className="logo-icon"
                    alt="React Router"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://redux.js.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={redux} className="logo-icon" alt="Redux" />
                </a>
              </li>
              <li>
                <a href="https://hasura.io/" target="_blank" rel="noreferrer">
                  <img src={hasura} className="logo-icon" alt="Hasura" />
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

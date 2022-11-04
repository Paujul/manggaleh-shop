import logo from "../assets/logocopet.png";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";

const Navbar = ({ toggleUpload }) => {
  const nav = useNavigate();

  return (
    <div className="">
      <nav className="fixed bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded w-full z-10 top-0 drop-shadow-md">
        <div className="container flex flex-grow flex-wrap justify-around items-center mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Manggaleh Shop" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-green-700/70">
              Manggaleh Shop
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open Upload</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <Search />

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 bg-gray-100 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-gray-100 ">
              <li>
                <i
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 cursor-pointer"
                  aria-current="page"
                  onClick={() => toggleUpload(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
                  </svg>
                </i>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 "
                >
                  My Cart
                </a>
              </li>
              <li>
                <Link
                  to="/user"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 "
                >
                  User
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 "
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

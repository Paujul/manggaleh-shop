import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchField } from "../redux/barangSlice";
import "../styles/index.css";

const Search = () => {
  const search = useSelector((state) => state.items.searchField);
  const dispatch = useDispatch();

  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    nav("/");
  };

  const searchField = (e) => {
    dispatch(setSearchField(e.target.value.toLocaleLowerCase()));
  };

  return (
    <form className="w-96 focus:bg-green-500/50" onSubmit={submit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only focus:bg-green-500/50"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-100 rounded-br-lg rounded-bl-lg  focus:ring-green-500 focus:border-green-500 "
          placeholder="Sendok sup abad 17..."
          autoComplete="off"
          onChange={searchField}
        />
        <button type="submit" className="btn absolute bg-green-700">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;

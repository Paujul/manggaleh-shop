const Search = () => {
  return (
    <form className="w-96 focus:bg-green-500/50">
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
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ setSearchQuery}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  const handleSearch = async () => {
    setSearchQuery(query)
    // Fetch data from the API
    fetch(`https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev/blogs/search?searchInput=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the retrieved data
        console.log("search data =>",data);
       
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch operation
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-end p-5">
      <div className="relative flex items-center">
        <input
          type="text"
          className="w-[285px] h-[39px] text-black bg-[#E1E1E1] p-2 rounded-lg text-base font-semibold outline-0"
          placeholder="Search for tags or keywords"
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="absolute top-1/2 -translate-y-1/2 right-0 mr-2"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;

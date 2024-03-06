import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ setSearchQuery }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);
        setSearchQuery(searchTerm);
    };

    return (
        <div className="flex items-center justify-end p-5">
            <div className="relative flex items-center">
                <input
                    type="text"
                    className="w-[285px] h-[39px] text-black bg-[#E1E1E1] p-2 rounded-lg text-base font-semibold outline-0"
                    placeholder="Search for tags or keywords"
                    value={query}
                    onChange={handleSearch}
                />
                <button className="absolute top-1/2 -translate-y-1/2 right-0 mr-2">
                    <FaSearch />
                </button>
            </div>
        </div>
    );
};

export default Search;

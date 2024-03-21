'use client'
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import url from '../../url'

const Search = ({ setSearchQuery}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  const handleSearch = async () => {
    setSearchQuery(query)
    // Fetch data from the API
    fetch(`${url.apiUrl}/blogs/search?searchInput=${query}`)
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
          className="w-[250px] lg:w-[285px] lg:h-[39px] text-black bg-[#E1E1E1] p-2 rounded-lg text-base italic outline-0 text-[12px]"
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

      {/* <div className="bg-white rounded-full p-2">
        
          <section className={'form dFlex alignItemsCenter'}>
            <header className={'searchHead'}>
              <Typography variant="body2" className={'searchText'}>
                Category :
              </Typography>
            </header>
            <section className={'selectSection'}>
              <select className="outline-0">
                <option>All</option>

                {categories.map((category, index) => (
                  <option key={index} value={category.categoryname}>
                    <Link href="/category/[categoryName]" as={`/category/${category.categoryname}`}>

                     <li> {category.categoryname}</li>

                    </Link>
                  </option>
                ))}

              </select>
            </section>
            <article className={'inputField'}>
              <input
                type="search"
                className="inputSearch outline-0"
                placeholder="Search here.."
                value={query}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </article>
            <footer className={'iconSearch'}>
              <SearchSharpIcon onClick={handleSearch} className={' colorPrimary'} fontSize={'small'}></SearchSharpIcon>
            </footer>
          </section>
      
      </div> */}
    </div>
  );
};

export default Search;

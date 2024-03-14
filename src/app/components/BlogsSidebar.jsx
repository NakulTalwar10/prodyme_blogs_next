"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";

const BlogsSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`bg-black md:w-36 lg:w-48 px-5 min-h-screen flex flex-col justify-start items-center md:block ${isVisible ? 'w-full lg:w-48' : 'w-12'}`}>

      <button onClick={toggleSidebar} className={`mt-32 md:hidden  text-white text-2xl p-2 top-0 ${isVisible ? 'fixed' : 'fixed'}`}>
        <BsLayoutSidebarInset />
      </button>

      <div className={`lg:fixed mt-24 md:block ${isVisible ? 'fixed' : 'hidden'}`}>
        <h3 className="text-white text-md lg:text-xl md:mt-20 text-center">Category Tree</h3>
        <hr className="mt-4 mx-4" />
        <div className="px-2">
          {categories.map((category, index) => (
            <div key={index}>
              <Link href="/category/[categoryName]" as={`/category/${category.categoryname}`}>
                <button className="text-white text-[12px] md:text-sm my-2 text-center border-black border-2 hover:border-white hover:rounded-lg w-full p-1">
                  {category.categoryname}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsSidebar;

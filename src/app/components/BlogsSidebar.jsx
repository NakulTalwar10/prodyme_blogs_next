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
      const response = await axios.get("https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev/blogs");
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

      <button onClick={toggleSidebar} className={`mt-32 md:hidden top-[100px] text-white text-2xl p-2 lg:top-[100px] ${isVisible ? 'hidden' : 'sticky'}`}>
        <BsLayoutSidebarInset />
      </button>

      <div className={`lg:sticky top-[200px] flex flex-col items-center lg:top-[100px]  md:block ${isVisible ? 'sticky' : 'hidden'}`}>
        <button onClick={toggleSidebar} className={` md:hidden top-[100px] text-white text-2xl p-2 lg:top-[100px] ${isVisible ? '' : 'hidden'}`}>
          <BsLayoutSidebarInset />
        </button>
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

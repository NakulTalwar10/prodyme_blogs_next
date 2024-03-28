"use client"
import * as React from 'react';
import axios from "axios";
import Link from "next/link";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import url from '../../url'

const BlogsSidebar = () => {
  const [categories, setCategories] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url.apiUrl}/blogs`);
      setCategories(response.data);
    } catch (error) {
      // console.error("Error fetching categories:", error);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`bg-[#2A2A2A] md:w-36 lg:w-48 px-5 min-h-screen flex flex-col justify-start items-center md:block ${
        isVisible ? "w-full lg:w-[201px]" : "w-12"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className={`mt-32 md:hidden top-[150px] text-white text-2xl p-2 lg:top-[100px] ${
          isVisible ? "hidden" : "sticky"
        }`}
      >
        <BsLayoutSidebarInset />
      </button>

      <div
        className={`md:mt-[300px] max-md:mt-[80px] flex flex-col items-center   md:block ${
          isVisible ? "static" : "hidden"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className={` md:hidden top-[100px] text-white text-2xl p-2 lg:top-[100px] ${
            isVisible ? "" : "hidden"
          }`}
        >
          <BsLayoutSidebarInset />
        </button>
        <h3 className="text-[#F4F4F4] text-md lg:text-[16px] mt-10 text-start font-light">
          Category Tree
        </h3>
        <hr className="mt-4 bg-[#F4F4F4] text-[#F4F4F4]" />
        <div className="">
          {categories.map((category, index) => (
            <div key={index} className="">
              <Link
                href="/category/[categoryName]"
                as={`/category/${category.categoryname}`}
              >
                <button className="flex items-center text-[#F4F4F4] lg:text-[16px] font-bold md:text-sm my-2 text-start hover:border-white hover:rounded-lg w-full p-1">
                  <span className="mr-2">
                    <FaArrowRightLong />
                  </span>
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
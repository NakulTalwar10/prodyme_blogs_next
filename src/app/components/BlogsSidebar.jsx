"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BlogsSidebar = () => {
  const [categories, setCategories] = useState([]);

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


  return (
    <div style={{ backgroundColor: "black", width: "200px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
      <div className="fixed">
        <div>
          <h3 className="text-white text-lg mt-20 text-center">Category Tree</h3>
          <hr className="mt-4" />
        </div>

        <div className="px-2">
          {categories.map((category, index) => (
            <div key={index}>

              <Link href="/category/[categoryName]" as={`/category/${category.categoryname}`}>
                <button className="text-white my-2 text-center hover:border-2 hover:border-white hover:rounded-lg w-full p-1">
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

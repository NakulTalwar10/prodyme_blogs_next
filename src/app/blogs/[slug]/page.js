"use client"

import React from "react";
import BlogsItems from "./blogsItems";

const Blogs = ({params}) => {
  const {slug,categoryname}= params

  console.log("Sluggg =>",slug);
  console.log("categorynameeee =>",categoryname);
    return (
        <main>
            <BlogsItems slug={slug} category={categoryname} />
        </main>
    );
};

export default Blogs;
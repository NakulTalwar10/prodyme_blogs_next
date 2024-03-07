
import React from "react";
import BlogsItems from "./blogsItems";

const Blogs = ({params}) => {
  const {slug}= params
  
    return (
        <main>
            <BlogsItems slug={slug} />
        </main>
    );
};

export default Blogs;
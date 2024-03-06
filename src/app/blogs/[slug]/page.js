import React from "react";
import BlogsItems from "./blogsItems";

const blogs = ({params}) => {
    const {slug ,categoryname } = params;
    console.log("slugggg",slug);
    console.log("categorynameeeee",categoryname);
    return (
    <main>
      <BlogsItems  slug={slug} category={categoryname }/>
    </main>
    )
};

export default blogs;

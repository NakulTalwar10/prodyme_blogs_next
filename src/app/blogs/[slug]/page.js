import React from "react";
import BlogsItems from "./blogsItems";

const blogs = ({params}) => {
    const {slug} = params;
    return (
    <main>
      <BlogsItems slug={slug} />
    </main>
    )
};

export default blogs;

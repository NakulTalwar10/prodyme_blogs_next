"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogsItems = ({ slug }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://public-api.wordpress.com/wp/v2/sites/amansamant23.wordpress.com/posts?_fields=id,slug,title,content&slug=${slug}`
        );
        setBlog(response.data[0]);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  const renderContent = () => {
    if (!blog) return <p>Loading...</p>;

   
    const titleWithoutNbsp = blog.title.rendered.replace(/&nbsp;/g, '');

    return (
      <div className="blog-container">
        <h4 className=" my-5 underline font-bold text-center">{titleWithoutNbsp}</h4>
        <div className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: blog.content.rendered }} />
      </div>
    );
  };

  return <div className="p-5">{renderContent()}</div>;
};

export default BlogsItems;

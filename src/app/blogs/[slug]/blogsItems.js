"use client";

// WILL NEED TO UPDATE THE CODE FOR MANAGING SUBCATEGORIES LATER
import React, { useEffect, useState } from "react";
import axios from "axios";
import { load } from "cheerio";
import * as cheerio from "cheerio";

import Image from "next/image";
import SideBarBlogCard from "./sideBarBlogCard";
import ProductSlider from "../../components/Slider";

const BlogsItems = ({ slug}) => {
  const [blog, setBlog] = useState(null);
  const [userTags, setUserTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [blogContent, setBlogContent] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  // setting the blogs for side bar
  // NEED TO UPDATE THE API IN BACKEND AND THE FETCH HERE. IT IS FETCHING ALL THE POSTS AND SEPERATED IN DIFFERENT CATEGORIES OBJECT. SHOULD ONLY GET A LIMITED POSTS OF A PARTICULAR CATEGORY THAT IS BEING PASSED.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev/blogs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        // Filter out only the categories that match the desired category
        const filteredData = jsonData?.filter(
          (data) => data.categoryname === category
        );

        // Flatten the array of posts and remove the post with the matching ID
        const filteredPosts = filteredData?.flatMap((data) =>
          data.posts.filter((post) => post.id !== blog.id)
        );

        setData(filteredPosts);
        console.log(filteredPosts);
        setData(filteredPosts);
      } catch (error) {
        setError(error.message);
      }
    };

    if(category!== null){
      fetchData();
    }
  }, [category]);
  // const {slug} =params;
  // console.log(slug);
  // for getting sidbar category SideBarBlogCards

// setting category and tags
useEffect(() => {
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev/blogs/categories?categoryId=${blog.categories[0]}`
      );
      setCategory(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }

  const fetchTags = async () => {
    const joinedTags = blog.tags.join(',')
    console.log("jjjtags", joinedTags);
    try {
      const response = await axios.get(
        `https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev/blogs/tags?tagsId=${joinedTags}`
      );
      setTags(response.data);
      console.log("tags name getting ",response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  if(blog!==null){
    fetchTags();
    fetchCategory();
  }

},[blog])





  // setting Blog data and userTags state
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev/blogs/blog?slug=${slug}`
        );
        setBlog(response.data[0]);
        // Remove the brackets and quotation marks from the string
        const cleanedString =
          response.data[0].meta.reader_suggested_tags.replace(/[\[\]"']/g, "");

        // Split the cleaned string by comma to get an array of individual strings
        const array = cleanedString.split(",");
        setUserTags(array);
        // console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, []);

  // useeffect for formatting the content into seperate blocks
  useEffect(() => {
    if (blog === null) return;
    const inputString = blog.content.rendered;
    // Regular expression to match block elements
    const figureRegex = /<figure\b[^>]*>([\s\S]*?)<\/figure>/g;

    // Split the input string using the figure block regex
    const parts = inputString.split(/(<figure\b[^>]*>[\s\S]*?<\/figure>)/);

    // Filter out empty strings and trim each part
    const filteredParts = parts.filter((part) => part.trim() !== "");

    // Output array to store image and text parts in sequence
    const outputArray = [];

    // Loop through filtered parts and categorize into image and text
    filteredParts.forEach((part) => {
      if (part.includes("<figure")) {
        outputArray.push({ type: "image", content: part });
      } else {
        outputArray.push({ type: "text", content: part });
      }
    });

    // Logging the output array
    // console.log(outputArray);
    setBlogContent(outputArray);
  }, [blog]);

  // date formatting function
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    // console.log(userTags[2]);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      {blog ? (
        <div>
          <div className="flex bg-[#F8F8F8]">
            <div className="bg-[#2A2A2A] flex flex-col  w-[200px] text-[#F4F4F4] h-[100vh] fixed left-0  "></div>

            <div className="bg-[#2A2A2A] flex flex-col  w-[200px] text-[#F4F4F4] ">
              <div className="overflow-y-auto flex flex-col h-[100vh] justify-start gap-2  p-4 font-normal text-left sticky top-0 scroll-containe" >
              
                <span className="text-left text-[16px] font-bold">
                  Related Blogs
                </span>
                <div className=" w-[150px] bg-white border border-white"></div>
                {data?.map((post, i) => {
                  if (i > 10) {
                    return;
                  }
                  return <SideBarBlogCard post={post} key={i} />;
                })}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="blog-container p-[24px]">
                <h1 className="font-bold text-[42px] my-3">
                  {blog.title.rendered.replace(/&nbsp;/g, " ")}
                </h1>
                <span className="text-[20px] my-3">
                  {formatDate(blog.date)}
                </span>
                <div className="text-[18px] my-3">
                  <span>Tags:</span>
                  {userTags &&
                    userTags?.map((tag, index) => {
                      return (
                        <span
                          key={index}
                          className="mx-3 py-1 px-3 border-2 text-[#FF7A34] border-[#FF7A34] bg-white"
                        >
                          {tag}
                        </span>
                      );
                    })}
                </div>
                {blog.jetpack_featured_media_url !== null ? (
                  <Image
                    src={blog.jetpack_featured_media_url}
                    alt="image"
                    width={100}
                    height={100}
                    className="w-[85vw] h-[400px] object-cover"
                  />
                ) : (
                  <div>insert defalut image</div>
                )}
                {blogContent?.map((block, index) => {
                  if (block.type === "text") {
                    return (
                      <div
                        key={index}
                        className="blog-container  "
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    );
                  } else {
                    // Regular expression to extract width, height, and src attributes from the img tag
                    const regex =
                      /<img[^>]*?width="([^"]*?)"[^>]*?height="([^"]*?)"[^>]*?src="([^"]*?)"/;

                    // Match the regex against the HTML string
                    const match = block.content.match(regex);
                    if (match) {
                      const width = match[1];
                      const height = match[2];
                      const imageUrl = match[3];
                      const aspectRatio = width / height;
                      // Set default alignment as left
                      let alignment = "left";

                      // Determine alignment based on aspect ratio
                      if (aspectRatio > 4 / 3) {
                        alignment = "right";
                      }
                      if (aspectRatio > 6 / 3) {
                        alignment = "center";
                      }
                      return (
                        <div className="image-container" key={index}>
                          <div className="clear-both"></div>{" "}
                          {/* Add this div to clear floating */}
                          <Image
                            src={imageUrl}
                            alt="Your Image"
                            width={parseInt(width)}
                            height={parseInt(height)}
                            // layout="intrinsic"
                            className={`m-3 ${
                              alignment === "left"
                                ? "float-left h-[450px] w-auto ml-0"
                                : alignment === "right"
                                ? "float-right w-[450px] h-auto mr-0"
                                : "mx-auto w-[85vw] h-auto"
                            }`}
                          />
                        </div>
                      );
                    } else {
                      return <div key={index}>Put Defalut Image here</div>;
                    }
                  }
                })}
              </div>
            </div>
          </div>
          <div className="">
            <ProductSlider category={category} tags={tags} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default BlogsItems;
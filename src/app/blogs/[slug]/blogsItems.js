"use client";

// WILL NEED TO UPDATE THE CODE FOR MANAGING SUBCATEGORIES LATER
import React, { useEffect, useState } from "react";
import axios from "axios";
import { load } from "cheerio";
import * as cheerio from "cheerio";
import SubheadingContent from "./subheadingContent";

import Image from "next/image";
import SideBarBlogCard from "./sideBarBlogCard";
import ProductSlider from "../../components/Slider";
import url from "../../../url";

const BlogsItems = ({ slug }) => {
  const [blog, setBlog] = useState(null);
  // const [userTags, setUserTags] = useState([]);
  const [tags, setTags] = useState([]);
  // const [blogContent, setBlogContent] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  // setting the blogs for side bar
  // NEED TO UPDATE THE API IN BACKEND AND THE FETCH HERE. IT IS FETCHING ALL THE POSTS AND SEPERATED IN DIFFERENT CATEGORIES OBJECT. SHOULD ONLY GET A LIMITED POSTS OF A PARTICULAR CATEGORY THAT IS BEING PASSED.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url.apiUrl}/blogs`);
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

    if (category !== null) {
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
          `${url.apiUrl}/blogs/categories?categoryId=${blog.categories[0]}`
        );
        setCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    const fetchTags = async () => {
      const joinedTags = blog.tags.join(",");
      console.log("jjjtags", joinedTags);
      try {
        const response = await axios.get(
          `${url.apiUrl}/blogs/tags?tagsId=${joinedTags}`
        );
        setTags(response.data);
        console.log("tags name getting ", response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (blog !== null) {
      fetchTags();
      fetchCategory();
    }
  }, [blog]);

  // setting Blog data and userTags state
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${url.apiUrl}/blogs/blog?slug=${slug}`
        );
        setBlog(response.data[0]);
        // Remove the brackets and quotation marks from the string
        const cleanedString =
          response.data[0].meta.reader_suggested_tags.replace(/[\[\]"']/g, "");

        // Split the cleaned string by comma to get an array of individual strings
        // const array = cleanedString.split(",");
        // setUserTags(array);
        // console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, []);

  // // useeffect for formatting the content into seperate blocks
  // useEffect(() => {
  //   if (blog === null) return;
  //   const inputString = blog.content.rendered;
  //   // Regular expression to match block elements
  //   const figureRegex = /<figure\b[^>]*>([\s\S]*?)<\/figure>/g;

  //   // Split the input string using the figure block regex
  //   const parts = inputString.split(/(<figure\b[^>]*>[\s\S]*?<\/figure>)/);

  //   // Filter out empty strings and trim each part
  //   const filteredParts = parts.filter((part) => part.trim() !== "");

  //   // Output array to store image and text parts in sequence
  //   const outputArray = [];

  //   // Loop through filtered parts and categorize into image and text
  //   filteredParts.forEach((part) => {
  //     if (part.includes("<figure")) {
  //       outputArray.push({ type: "image", content: part });
  //     } else {
  //       outputArray.push({ type: "text", content: part });
  //     }
  //   });

  //   // Logging the output array
  //   // console.log(outputArray);
  //   setBlogContent(outputArray);
  // }, [blog]);

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
    <div className="font-roboto">
      {blog ? (
        <div>
          <div className="flex bg-[#F8F8F8] mt-[90px]">
            <div className="bg-[#2A2A2A] flex flex-col  w-[200px] text-[#F4F4F4] h-[100vh] fixed left-0 max-lg:hidden "></div>

            <div className="bg-[#2A2A2A] flex flex-col  w-[200px] text-[#F4F4F4] max-lg:hidden ">
              <div className="overflow-y-auto scrollbar-hide flex flex-col h-[100vh] justify-start gap-2  p-4 font-normal text-left sticky top-[90px] scroll-containe">
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
            <div className="flex flex-col mx-5">
              <div className="blog-container pl-[12px] object-left">
                <h1
                  className="font-bold text-[42px] w-[75vw] my-2"
                  dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
                 />
                  {/* {blog.title.rendered.replace(/&nbsp;/g, " ")} */}
                {/* </h1> */}
                <span className="text-[20px] my-2">
                  {formatDate(blog.date)}
                </span>
                <div className="text-[18px] flex flex-wrap my-2">
                  <span className="my-2 pt-[10px] pb-[8px]">Tags:</span>
                  {tags &&
                    tags?.map((tag, index) => {
                      return (
                        <span
                          key={index}
                          className="mx-3 pl-[20px] pr-[45px] pt-[10px] pb-[8px] border-2 my-2 text-[#FF7A34] border-[#FF7A34] bg-white"
                        >
                          {tag}
                        </span>
                      );
                    })}
                </div>
                {blog.acf.thumbnail.url !== null ? (
                  <Image
                    src={blog.acf.thumbnail.url || "../images/cardimages.jpg"}
                    alt="image"
                    width={100}
                    height={100}
                    className="w-[75vw] h-[400px] object-cover my-5 "
                  />
                ) : (
                  <div>insert defalut image</div>
                )}

                {blog.acf["Basic-template"] && (
                  <>
                    {/* Introduction */}
                    {blog.acf.introduction !== "" && (
                      <>
                        <div className="text-4xl font-bold my-2">
                          Introduction
                        </div>
                        <p
                          className="blog-container w-[75vw] text-left font-normal text-base my-2 mb-8  "
                          // dangerouslySetInnerHTML={{ __html: blog.acf.introduction }}
                        >
                          {blog.acf.introduction
                            .split("\r\n")
                            .map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                        </p>
                      </>
                    )}

                    <div>
                      {/* block 1 heading and its content */}
                      <SubheadingContent
                        isSub={false}
                        subHeading={blog.acf["block1_heading"]}
                        content={blog.acf["block1_content"]}
                        quote={blog.acf["block1_quote"]}
                        image={blog.acf["block1_image"]}
                      />

                      {/* block 1 subheading and its content */}
                      <div>
                        {(() => {
                          const elements = [];
                          for (let i = 1; i <= 8; i++) {
                            elements.push(
                              <SubheadingContent
                                isSub={true}
                                subHeading={blog.acf[`block1_subheading${i}`]}
                                content={blog.acf[`block1_content${i}`]}
                                quote={blog.acf[`block1_quote${i}`]}
                                image={blog.acf[`block1_image${i}`]}
                                key={i}
                              />
                            );
                          }
                          return elements;
                        })()}
                      </div>

                      {/* block 2 heading and its content */}
                      <SubheadingContent
                        isSub={false}
                        subHeading={blog.acf["block2_heading"]}
                        content={blog.acf["block2_content"]}
                        quote={blog.acf["block2_quote"]}
                        image={blog.acf["block2_image"]}
                      />
                    </div>

                    {/* conclusion */}
                    {blog.acf.conclusion !== "" && (
                      <p className="blog-container w-[75vw] text-left font-normal text-base p-5 border-t-medium bg-white border-t-[#FF7A34] mb-3 clear-both my-3 ">
                        {blog.acf?.["conclusion"]
                          .split("\r\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <ProductSlider category={category} tags={tags} />
          </div>
          <div className="bg-[#2A2A2A] flex flex-col  w-[100vw] text-[#F4F4F4] lg:hidden ">
            <div className="overflow-y-auto flex flex-col justify-start gap-2  p-4 font-normal text-left sticky top-0 scroll-containe">
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default BlogsItems;

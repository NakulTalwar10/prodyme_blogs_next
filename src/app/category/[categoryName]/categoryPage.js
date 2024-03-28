"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogsBackground from "../../components/BlogsBackground";
import BlogsSidebar from "../../components/BlogsSidebar";
import Paginations from "../../components/Paginations";
import Search from "../../components/Search";
import { BsLayoutSidebarInset } from "react-icons/bs";
import url from "../../../url";
import Image from "next/image";


const CategoryBlogsPage = ({ selectedCategory }) => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const [currentPagePosts, setCurrentPagePosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${url.apiUrl}/blogs`);
                const formattedBlogs = response.data.filter(blog => blog.categoryname === selectedCategory).map(blog => ({
                    ...blog,
                    posts: blog.posts.map(post => ({
                        ...post,
                        title: post.title ? (post.title.rendered) : "",
                        content: post.content ? (post.content.rendered ? post.content.rendered : "") : "",
                        excerpt: post.excerpt ? (post.excerpt.rendered ? post.excerpt.rendered : "") : ""
                    })),
                }));
                setBlogs(formattedBlogs);
                setCurrentPagePosts(formattedBlogs.flatMap(blog => blog.posts).slice(0, postsPerPage));
            } catch (error) {
                // console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, [selectedCategory, postsPerPage]);

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const indexOfLastPost = pageNumber * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setCurrentPagePosts(blogs.flatMap(blog => blog.posts).slice(indexOfFirstPost, indexOfLastPost));
    };

    const filteredPosts = blogs.reduce((accumulator, blog) => {
        const filteredBlogPosts = blog.posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return accumulator.concat(filteredBlogPosts);
    }, []);



    return (
      <div className="flex mt-20 bg-[#f8f8f8]">
        <BlogsSidebar />
        <div className="flex-1 overflow-y-auto">
          <BlogsBackground />

          <div className="flex justify-around lg:flex-row items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row  lg:ml-auto">
              <Search setSearchQuery={setSearchQuery} />
              <Paginations
                totalProducts={blogs.flatMap((blog) => blog.posts).length}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </div>

          <section className="my-5 px-5">
            {searchQuery ? (
              <div>
                <div className="flex items-center">
                  <h2 className="mr-2 text-xl font-bold">Search Results</h2>
                  <hr className="border flex-grow border-black" />
                </div>
                <div className="grid grid-cols-3 gap-5">
                  {filteredPosts.map((post, index) => (
                    <div key={index} className="my-5">
                      <Image
                        alt={post.title}
                        width={1000}
                        height={1000}
                        className="w-full object-cover h-[200px]"
                        src={
                          post?.acf?.thumbnail?.url ||
                          "../images/cardimages.jpg"
                        }
                      />
                      <div className="text-small justify-between">
                        <h4
                          className="text-xl lg:text-xl tracking-widest font-semibold"
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        ></h4>
                        <p className="text-gray-400 mt-2 text-[16px]">
                          {formatDate(post.date)}
                        </p>
                        <div>
                          {stripHtmlTags(post.excerpt).length > 50 ? (
                            <div>
                              <p className="text-gray-900 text-md tracking-widest lg:font-medium my-2">
                                {stripHtmlTags(post.excerpt).substring(0, 150)}
                                ...
                              </p>
                              <Link href="/[slug]" as={"blogs/" + post.slug}>
                                <button className="text-orange-400 text-[16px] font-bold flex justify-center items-center mt-2">
                                  <span className="hover:mr-2">Read More</span>
                                  <FaArrowRightLong className="transition-transform ease-in-out duration-300 ml-1 " />
                                </button>
                              </Link>
                            </div>
                          ) : (
                            <p className="text-gray-900 tracking-widest">
                              {stripHtmlTags(post.excerpt)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <section className="">
                {blogs.map((blogItem, index) => (
                  <div key={index}>
                    <div className="flex items-center ">
                      <h2 className="mr-2 text-xl font-bold">
                        {blogItem.categoryname} Blogs & Articles
                      </h2>
                      <hr className="border flex-grow border-black" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {currentPagePosts.map((post, postIndex) => (
                        <div
                          key={postIndex}
                          className={`my-5 ${
                            postIndex === 0 ? "lg:col-span-3" : ""
                          }`}
                        >
                          <div className="p-0">
                            {postIndex === 0 ? (
                              <div className="lg:relative  lg:block">
                                <div
                                  className="w-full h-[200px] lg:h-[400px]  bg-cover bg-center"
                                  style={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(${
                                      post?.acf?.thumbnail?.url ||
                                      "../images/cardimages.jpg"
                                    })`,
                                  }}
                                ></div>
                                <div className="lg:absolute inset-0 flex flex-col justify-center items-start lg:text-white lg:px-5">
                                  <h4
                                    className="text-xl lg:pr-[15%] tracking-widest lg:text-2xl font-semibold"
                                    dangerouslySetInnerHTML={{
                                      __html: post.title,
                                    }}
                                  ></h4>
                                  <p className="lg:text-white text-gray-400 mt-2 text-[16px]">
                                    {formatDate(post.date)}
                                  </p>
                                  <p className="lg:pr-[15%] text-gray-900 text-md tracking-widest lg:text-white  font-normal my-2 lg:font-medium">
                                    {stripHtmlTags(post.excerpt).substring(
                                      0,
                                      250
                                    )}
                                    ...
                                  </p>
                                  <Link
                                    href="/blogs/[slug]"
                                    as={`/blogs/${post.slug}`}
                                  >
                                    <button className="text-orange-400 text-[16px] lg:text-[20px] font-semibold flex justify-center items-center mt-2">
                                      <span className="hover:mr-2">
                                        Read More
                                      </span>
                                      <FaArrowRightLong className="transition-transform ease-in-out duration-300 ml-1 " />
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Image
                                  alt={post.title}
                                  width={1000}
                                  height={1000}
                                  className="w-full object-cover h-[200px] "
                                  src={
                                    post?.acf?.thumbnail?.url ||
                                    "../images/cardimages.jpg"
                                  }
                                />
                                <div className="text-small justify-between">
                                  <h4
                                    className="text-xl lg:text-xl tracking-widest font-semibold"
                                    dangerouslySetInnerHTML={{
                                      __html: post.title,
                                    }}
                                  ></h4>
                                  <p className="text-gray-400 mt-2">
                                    {formatDate(post.date)}
                                  </p>
                                  <div className="">
                                    {stripHtmlTags(post.excerpt).length >
                                    150 ? (
                                      <div>
                                        <p className="text-gray-900 text-md tracking-widest lg:font-medium my-2">
                                          {stripHtmlTags(
                                            post.excerpt
                                          ).substring(0, 150)}
                                          ...
                                        </p>
                                        <Link
                                          href="/blogs/[slug]"
                                          as={`/blogs/${post.slug}`}
                                        >
                                          <button className="text-orange-400 text-[16px] font-bold flex justify-center items-center mt-2">
                                            <span className="hover:mr-2">
                                              Read More
                                            </span>
                                            <FaArrowRightLong className="transition-transform ease-in-out duration-300 ml-1 " />
                                          </button>
                                        </Link>
                                      </div>
                                    ) : (
                                      <p className="text-gray-900 tracking-widest">
                                        {stripHtmlTags(post.excerpt)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </section>
          <div className="p-5 flex justify-end">
            {/* I think the below pagenation is for categories which is not needed when we see post of particular category. Also gives a NaN instead of a number. */}
            {/* <Paginations
              totalCategories={blogs.flatMap((blog) => blog.posts).length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              paginate={paginate}
            /> */}
          </div>
        </div>
      </div>
    );
};

export default CategoryBlogsPage;
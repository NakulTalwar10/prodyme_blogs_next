"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogsBackground from "../../components/BlogsBackground";
import BlogsSidebar from "../../components/BlogsSidebar";

const CategoryBlogsPage = ({ selectedCategory }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/blogs");
                const formattedBlogs = response.data.filter(blog => blog.categoryname === selectedCategory).map(blog => ({
                    ...blog,
                    posts: blog.posts.map(post => ({
                        ...post,
                        title: post.title ? (post.title.rendered ? post.title.rendered.replace(/&nbsp;/g, " ") : "") : "",
                        content: post.content ? (post.content.rendered ? post.content.rendered : "") : "",
                        excerpt: post.excerpt ? (post.excerpt.rendered ? post.excerpt.rendered : "") : ""
                    })),
                }));
                setBlogs(formattedBlogs);
                console.log(formattedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, [selectedCategory]);

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <div className="flex">
            <BlogsSidebar />
            <div className="flex-1 overflow-y-auto">
                <BlogsBackground />
                <section className="my-5 px-5">
                    {blogs.map((blogItem, index) => (
                        <div key={index}>
                            <div className="flex items-center ">
                                <h2 className="mr-2 text-xl font-bold">{blogItem.categoryname} Blogs & Articles</h2>
                                <hr className="border flex-grow border-black" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                                {blogItem.posts.map((post, postIndex) => (
                                    <div key={postIndex} className={`my-5 ${postIndex === 0 ? 'lg:col-span-3' : ''}`}>
                                        <div className="p-0">
                                            {postIndex === 0 ? (
                                                <div className="relative">
                                                    <div
                                                        className="w-full h-[100px] sm:h-[200px] lg:h-[300px] xl:h-[400px] bg-cover bg-center"
                                                        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(${post.jetpack_featured_media_url || "../images/cardimages.jpg"})` }}
                                                    ></div>
                                                    <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-5">
                                                        <h4 className="text-4xl font-semibold">{post.title}</h4>
                                                        <p className="text-white">{formatDate(post.date)}</p>
                                                        <p className="pr-[30%] text-white text-2xl font-semibold my-2">
                                                            {stripHtmlTags(post.excerpt).substring(0, 250)}...
                                                        </p>
                                                        <Link href="/[slug]" as={"blogs/" + post.slug}>
                                                            <button className="text-orange-400 text-[20px] font-bold flex justify-center items-center">
                                                                <span className="hover:mr-2">Read More</span>
                                                                <FaArrowRightLong className="transition-transform ease-in-out duration-300 ml-1 " />
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <img
                                                        alt={post.title}
                                                        className="w-full object-cover h-[200px] w-[100%]"
                                                        src={post.jetpack_featured_media_url || "../images/cardimages.jpg"}
                                                    />
                                                    <div className="text-small justify-between">
                                                        <h4 className="text-xl font-semibold">{post.title}</h4>
                                                        <p className="text-default-500">{formatDate(post.date)}</p>
                                                        <div className="">
                                                            {stripHtmlTags(post.content).length > 50 ? (
                                                                <div>
                                                                    <p className="text-gray-600 font-semibold my-2">
                                                                        {stripHtmlTags(post.excerpt).substring(0, 150)}...
                                                                    </p>
                                                                    <Link href="/[slug]" as={"blogs/" + post.slug}>
                                                                        <button className="text-orange-400 text-[16px] font-bold flex justify-center items-center">
                                                                            <span className="hover:mr-2">Read More</span>
                                                                            <FaArrowRightLong className="transition-transform ease-in-out duration-300 ml-1 " />
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            ) : (
                                                                <p className="text-gray-600">
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
            </div>
        </div>
    );
};

export default CategoryBlogsPage;

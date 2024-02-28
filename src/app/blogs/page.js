"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";


const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/blogs");
                const formattedBlogs = response.data.map(blog => ({
                    ...blog,
                    title: blog.title.rendered.replace(/&nbsp;/g, " ")
                }));
                setBlogs(formattedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <div>
            <div style={{ backgroundImage: 'url("./images/construction.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '274px', position: 'relative' }}>
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'start'
                }}>
                    <div className="px-5">
                        <h4 className="text-white text-[62px]">Blogs and Articles</h4>
                        <h5 className="text-white text-[20px] mb-4">You can find the most read blogs which would help you get the right set of products</h5>
                    </div>
                </div>
            </div>

            <section className="my-5 px-5">
                <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {blogs.map((blogItem, index) => (
                        <div key={blogItem.id} className={`my-5 ${index % 5 === 0 ? 'col-span-3' : 'col-span-1'}`}>
                            {index % 5 === 0 ? (
                                <div className="relative">
                                    <div
                                        className="w-full h-[100px] sm:h-[200px] lg:h-[300px] xl:h-[400px] bg-cover bg-center"
                                        style={{ backgroundImage: `url(${blogItem.jetpack_featured_media_url || "./images/cardimages.jpg"})` }}
                                    ></div>
                                    <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-5">
                                        <h4 className="text-4xl font-semibold">{blogItem.title}</h4>
                                        <p className="text-white text-2xl font-semibold my-2">
                                            {stripHtmlTags(blogItem.content.rendered).substring(0, 200)}...
                                        </p>
                                        <Link href="/[slug]" as={"blogs/" + blogItem.slug}>
                                            <button className="text-orange-400 text-[20px] font-bold flex justify-center items-center">
                                                <span className="hover:mr-2">Read More</span>
                                                <FaArrowRightLong className="transition-transform ease-in-out duration-300 ml-1 " />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-0">
                                    <img
                                        alt={blogItem.title.rendered}
                                        className="w-full object-cover h-[200px] w-[100%]"
                                        src={blogItem.jetpack_featured_media_url || "./images/cardimages.jpg"}
                                    />
                                    <div className="text-small justify-between">
                                        <h4 className="text-xl font-semibold">{blogItem.title}</h4>
                                        <p className="text-default-500">{formatDate(blogItem.date)}</p>
                                        <div className="">
                                            {stripHtmlTags(blogItem.content.rendered).length > 50 ? (
                                                <div>
                                                    <p className="text-gray-600 font-semibold my-2">
                                                        {stripHtmlTags(blogItem.content.rendered).substring(0, 200)}...
                                                    </p>
                                                    <Link href="/[slug]" as={"blogs/" + blogItem.slug}>
                                                        <button className="text-orange-400 text-[16px] font-bold flex justify-center items-center">
                                                            <span className="hover:mr-2">Read More</span>
                                                            <FaArrowRightLong className="transition-transform ease-in-out duration-300 ml-1 " />
                                                        </button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <p className="text-gray-600">
                                                    {stripHtmlTags(blogItem.content.rendered)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogsPage;

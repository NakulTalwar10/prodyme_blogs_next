"use client"
import React, { useEffect, useState } from "react";
import ProductsBackground from "../components/ProductsBackground";
import axios from "axios";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Search from "../components/Search";
import Paginations from "../components/Paginations";

const ProductsPage = () => {
    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
        const response = await axios.get("https://efbxl74e21.execute-api.ap-south-1.amazonaws.com/dev/ecomm/combinedata")
        console.log(response.data.combinedData);
        // setCategory(response.data.combinedData || [])       use after sometimes when we get more data from api
    }

    useEffect(() => {
        fetchCategory()
        setCategory(mockCategories)      //testing purpose
    }, [])

    const mockCategories = [
        { _id: '1', categoryname: 'Kitchen' },
        { _id: '2', categoryname: 'Electronics' },
        { _id: '3', categoryname: 'Clothing' },
        { _id: '4', categoryname: 'Clothing' },
        { _id: '5', categoryname: 'Clothing' },
        { _id: '6', categoryname: 'Clothing' },
        { _id: '7', categoryname: 'Clothing' },
        { _id: '8', categoryname: 'Clothing' },
        { _id: '9', categoryname: 'Clothing' },
        { _id: '10', categoryname: 'Clothing' },
        { _id: '11', categoryname: 'Clothing' },
        { _id: '12', categoryname: 'Clothing' },
        { _id: '13', categoryname: 'Clothing' },
        { _id: '14', categoryname: 'Clothing' }
    ];

    return (
        <div className="bg-[#f8f8f8]">
            <section className="background">
                <ProductsBackground />
            </section>

            <div className="p-5">
                <section className="category ">
                    <div className="grid grid-cols-7 gap-4">
                        {category.map(categories => (
                            <Card shadow="" key={categories._id} >
                                <CardBody className="overflow-visible p-0">
                                    <Image
                                        width="100%"
                                        alt={categories.categoryname}
                                        className="w-full object-cover h-[140px]"
                                        src={"./images/productsCategory.jpg"}
                                    />
                                </CardBody>
                                <CardFooter className="text-medium justify-between">
                                    <b>{categories.categoryname}</b>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="search-pagination">
                    <div className="flex justify-end p-5">
                        <Search />

                        <Paginations />
                    </div>
                </section>

                <section>
                    {/* {currentCategories.map((blogItem, index) => (
                        <div key={index}>
                            <div className="flex items-center ">
                                <h2 className="mr-2 text-xl font-bold">
                                    {blogItem.categoryname} Blogs & Articles
                                </h2>
                                <hr className="border flex-grow border-black" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                                {blogItem.posts.map((post, postIndex) => (
                                    <div
                                        key={postIndex}
                                        className={`my-5 ${postIndex === 0 ? "lg:col-span-3" : ""}`}
                                    >
                                        <div className="p-0">
                                            <img
                                                alt={post.title}
                                                className="w-full object-cover h-[200px] "
                                                src={
                                                    post.jetpack_featured_media_url ||
                                                    "./images/cardimages.jpg"
                                                }
                                            />
                                            <div className="text-small justify-between">
                                                <h4 className="text-xl font-semibold">
                                                    {post.title}
                                                </h4>
                                                <p className="text-default-500">
                                                    {formatDate(post.date)}
                                                </p>
                                                <div className="">
                                                    {stripHtmlTags(post.content).length > 50 ? (
                                                        <div>
                                                            <p className="text-gray-600 font-semibold my-2">
                                                                {stripHtmlTags(post.excerpt).substring(
                                                                    0,
                                                                    150
                                                                )}
                                                                ...
                                                            </p>
                                                            <Link
                                                                href="/[slug]"
                                                                as={`/blogs/${post.slug}?categoryname=${blogItem.categoryname}`}
                                                            >
                                                                <button className="text-orange-400 text-[16px] font-bold flex justify-center items-center">
                                                                    <span className="hover:mr-2">
                                                                        Read More
                                                                    </span>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))} */}
                </section>
            </div>
        </div>
    );
};

export default ProductsPage;

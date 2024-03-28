"use client"
import React, { useEffect, useState } from "react";
import ProductsBackground from "../components/ProductsBackground";
import axios from "axios";
import Search from "../components/Search";
import Paginations from "../components/Paginations";
import Image from "next/image";
import productUrl from '../../url'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ProductOnSale from '../components/ProductOnSale'
import RatingProducts from '../components/ratingProducts/RatingProducts'
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";


const ProductsPage = () => {
    // const [category, setCategory] = useState([])
    const [value, setValue] = useState()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [category, setCategory] = useState([])
    const [favourite, setFavourite] = useState([])

    const fetchCategory = async () => {
        const response = await axios.get(`${productUrl.productUrl}/categoryproducts`)
        setCategory(response.data.categories || [])
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchRandomCategory = async () => {
        try {
            const response = await axios.get(`${productUrl.productUrl}/categoryproducts`)
            // console.log(response.data.categories);
            const category = response.data.categories || []
            const randomIndex = Math.floor(Math.random() * category.length)
            const randomCategory = category[randomIndex]
            setSelectedCategory(randomCategory)

            localStorage.setItem("lastSelectedCategory", JSON.stringify(randomCategory))
            localStorage.setItem("lastTimeStamps", new Date().getTime())
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        const lastTimeStamps = localStorage.getItem('lastTimeStamps');
        const currentTime = new Date().getTime();

        if (!lastTimeStamps || currentTime - lastTimeStamps >= 24 * 60 * 60 * 1000) {
            fetchRandomCategory();
        } else {
            const lastSelectedCategory = localStorage.getItem("lastSelectedCategory");
            if (lastSelectedCategory) {
                try {
                    setSelectedCategory(JSON.parse(lastSelectedCategory));
                } catch (error) {
                    // console.error("Error parsing last selected category:", error);
                    fetchRandomCategory();
                }
            } else {
                fetchRandomCategory();
            }
        }
    }, []);




    return (
        <div className="bg-[#f8f8f8]">
            <section className="background">
                <ProductsBackground />
            </section>

            {/* category cards  */}
            <div className="p-5">
                <section className="category p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {category.map((categories, index) => (
                            <div className="cursor-pointer" key={index}>
                                <Link href={'/categoryproducts/[productCategory]'} 
                                as={`/categoryproducts/${categories.categoryname}`}
                                >
                                    <div className="overflow-visible p-0 my-2">
                                        <Image
                                            width={1000}
                                            height={1000}
                                            alt={categories.categoryname}
                                            className="w-full object-cover h-[140px] mb-2 shadow-xl"
                                            src={"./images/productsCategory.jpg"}
                                        />
                                        <div className="text-medium justify-between">
                                            <b>{categories.categoryname}</b>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        ))}
                    </div>
                </section>


                {/* pagination and search bar */}
                <section className="flex justify-around lg:flex-row items-center lg:justify-between p-5">
                    <div className="flex flex-col lg:flex-row  lg:ml-auto">
                        <Search />

                        {/* <Paginations /> */}
                    </div>
                </section>


                {/* category and their product */}
                <section>
                    {selectedCategory && (
                        <div>
                            <div className="flex items-center">
                                <h2 className="mr-2 text-xl font-bold">{selectedCategory.categoryname} of Products</h2>
                                <hr className="border flex-grow border-black" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5 hover:shadow-2xl">
                                {selectedCategory.products.slice(0, 5).map((product, index) => (
                                    <div key={index} className="p-5 relative hover:shadow-2xl cursor-pointer">
                                        <FaRegHeart className="absolute top-1 right-1 font-bold text-xl text-orange-500 cursor-pointer " />
                                        <Image
                                            width={1000}
                                            height={1000}
                                            alt={product.Brand}
                                            className="w-full object-cover h-[130px] mb-2 "
                                            src={"./images/cardimages.jpg"}
                                        />


                                        <h4 className="text-sm font-medium">{product.ProductName}</h4>

                                        <div>
                                            <Box
                                                sx={{
                                                    "& > legend": { mt: 2 },
                                                }}
                                            >
                                                <Rating name="read-only" value={value} readOnly />
                                            </Box>
                                            <hr className="border flex-grow" />
                                        </div>
                                        <h5 className="my-2 font-medium">
                                            <span className="text-2xl">₹{product.MRP}</span>
                                            <span className="mx-2">per box</span>
                                        </h5>
                                        <div className="flex items-center mb-4">
                                            <input
                                                id="default-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium dark:text-gray-500">
                                                Add to Smart Builder
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Product on Sale */}
                <section>
                    <ProductOnSale />
                </section>

                {/* Rating Products */}
                <section>
                    <RatingProducts />
                </section>


                <section className="mt-5">
                    {selectedCategory && (
                        <div>
                            <div className="flex items-center">
                                <h2 className="mr-2 text-xl font-bold">{selectedCategory.categoryname} of Products</h2>
                                <hr className="border flex-grow border-black" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5 hover:shadow-2xl">
                                {selectedCategory.products.slice(0, 10).map((product, index) => (
                                    <div key={index} className="p-5 relative hover:shadow-2xl cursor-pointer">
                                        <FaRegHeart className="absolute top-1 right-1 font-bold text-xl text-orange-500 cursor-pointer" />
                                        <Image
                                            width={1000}
                                            height={1000}
                                            alt={product.Brand}
                                            className="w-full object-cover h-[130px] mb-2 "
                                            src={"./images/cardimages.jpg"}
                                        />
                                        <h4 className="text-sm font-medium">{product.ProductName}</h4>
                                        <div>
                                            <Box
                                                sx={{
                                                    "& > legend": { mt: 2 },
                                                }}
                                            >
                                                <Rating name="read-only" value={value} readOnly />
                                            </Box>
                                            <hr className="border flex-grow" />
                                        </div>
                                        <h5 className="my-2 font-medium">
                                            <span className="text-2xl">₹{product.MRP}</span>
                                            <span className="mx-2">per box</span>
                                        </h5>
                                        <div className="flex items-center mb-4">
                                            <input
                                                id="default-checkbox"
                                                type="checkbox"
                                                value=""
                                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium dark:text-gray-500">
                                                Add to Smart Builder
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProductsPage;

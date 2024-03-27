"use client"
import React, { useEffect, useState } from "react";
import productsUrl from '../../../url'
import axios from "axios";
import Image from "next/image";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { FaRegHeart } from "react-icons/fa";
import ProductsBackground from "../../components/ProductsBackground";
import Search from "../../components/Search";
import Paginations from "../../components/Paginations";

const ProductsCategory = ({ categoryname }) => {
  const [products, setProducts] = useState([])
  const [value, setValue] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${productsUrl.productUrl}/categoryproducts`);
        const filteredCategory = response.data.categories.find(item => item.categoryname === categoryname);

        if (filteredCategory) {
          setProducts(filteredCategory.products);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, [categoryname]);

  const lastProducts = currentPage * postsPerPage
  const firstProducts = lastProducts - postsPerPage
  const currentProducts = products.slice(firstProducts , lastProducts)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-[#f8f8f8]">

      <section className="background">
        <ProductsBackground />
      </section>

      <div className="p-5">

        <section className="search-pagination">
          <div className="flex justify-end p-5">
            <Search />

            <Paginations
              totalProducts={products.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {currentProducts.map((product, index) => (
              <div key={index} className="p-5 relative hover:shadow-2xl cursor-pointer">
                <FaRegHeart className="absolute top-1 right-1 font-bold text-xl text-orange-500 cursor-pointer" />
                <Image
                  width={1000}
                  height={1000}
                  alt={product.Brand}
                  className="w-full object-cover h-[130px] mb-2 "
                  src={"../images/cardimages.jpg"}
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
        </section>

       <div className=" p-5 flex justify-end">
       <Paginations
              totalProducts={products.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              paginate={paginate}
            />
       </div>
      </div>
    </div>
  );
};

export default ProductsCategory;
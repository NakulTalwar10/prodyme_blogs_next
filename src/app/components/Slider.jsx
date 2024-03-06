"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Card from "./card/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductSlider = (
  {
    category, tags
  }
) => {
  const [products, setProducts] = useState([]);
  // const [category, setCategory] = useState("Kitchen");
  // const [tags, setTags] = useState([
  //   "Single Compartment Sink",
  //   "Hose faucet",
  //   "Kitchen Basin"
  // ]);

  useEffect(() => {
    fetchData();
    console.log(tags)
  }, [category, tags]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products?category=${category}&tags=${tags.join(",")}`);
      const data = response.data;
      console.log("Data Log :",response.data)
      
      console.log(data.products);
      setProducts(data.products);
      // console.log(filteredProducts.subcategories[0].products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   const product = {
  //     product_id: "1",
  //     productName: "Test Product",
  //     ratingProduct: 4.5,
  //     brandName: "Test Brand",
  //     productDescription: "This is a test product description.",
  //     price: 50, // Assuming the price is 50 units of currency
  //   };

  return (
    <div className="bg-[#F8F8F8] justify-center items-center text-center p-3">
      <span className="font-bold text-[42px] m-3 ">Products in this Blog</span>
      <Swiper
        // install Swiper modules
        modules={[Navigation]}
        spaceBetween={5}
        slidesPerView={5}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="m-3"
      >
        {products?.map((product , i) => {
          return (
            <SwiperSlide
              className="m-3 justify-center items-center"
              key={product._id}
            >
              <Card product={product} />
            </SwiperSlide>
          );
        })}

        <SwiperSlide className="m-3 justify-center items-center"></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
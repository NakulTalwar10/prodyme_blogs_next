"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper-custom.css"; // Import the CSS file

// Import Swiper styles
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../../url";

const ProductSlider = ({ category, tags }) => {
  const [products, setProducts] = useState([]);
  // const [category, setCategory] = useState("Kitchen");
  // const [tags, setTags] = useState([
  //   "Single Compartment Sink",
  //   "Hose faucet",
  //   "Kitchen Basin"
  // ]);

  const swiper = useSwiper();

  useEffect(() => {
    fetchData();
    console.log(tags);
  }, [category, tags]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url.apiUrl}/products?category=${category}&tags=${tags.join(",")}`
      );
      const data = response.data;
      console.log("Data Log :", response.data);

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
    <div className="bg-[#F8F8F8]  justify-center items-center text-center p-3 py-0 relative m-0">
      <div className="bg-[#2A2A2A] w-[200px] absolute left-0 h-full"></div>
      <span className="font-bold text-[42px] m-3 max-sm:text-3xl">
        Products in this Blog
      </span>
      <Swiper
        // install Swiper modules
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        className="m-3"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 200,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 200,
          },
        }}
      >
        <div className="mx-auto">
          {products?.map((product, i) => {
            return (
              <SwiperSlide className="ml-0 " key={product._id}>
                <Card product={product} />
              </SwiperSlide>
            );
          })}
        </div>

        <SwiperSlide className="m-3 justify-center items-center"></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;

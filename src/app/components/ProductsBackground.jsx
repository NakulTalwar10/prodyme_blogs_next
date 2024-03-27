import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ProductsBackground = () => {
    const images = [
        {
            image: "../images/productsBanner1.jpg",
            title: "Products And More...",
            description: "You can find our top-class products which would help you build the right space for you"
        },
        {
            image: "../images/productsBanner2.jpg",
            title: "Products And More...",
            description: "You can find our top-class products which would help you build the right space for you"
        },
        {
            image: "../images/productsBanner3.jpg",
            title: "Products And More...",
            description: "You can find our top-class products which would help you build the right space for you"
        }
    ];

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 5000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: true
    };

    return (
        <div className="mt-[80px]">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <div className="relative w-full">
                            <Image src={image.image} width={1000} height={1000} className="w-full h-[274px] object-cover" alt="Background" />
                            <div className="absolute inset-0 flex flex-col justify-end items-start p-5 bg-gradient-to-b from-transparent via-transparent to-black">
                                <h4 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light">{image.title}</h4>
                                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light">{image.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductsBackground;

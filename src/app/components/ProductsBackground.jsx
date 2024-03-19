"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ProductsBackground = () => {
    const images = [
        {
            image: "./images/productsBanner1.jpg",
            title: "Products And More...",
            description: "You can find the our top class products which would help you build the right space for you"
        },
        {
            image: "./images/productsBanner2.jpg", // Change image paths accordingly
            title: "Another Title",
            description: "Another description"
        },
        {
            image: "./images/productsBanner3.jpg", // Change image paths accordingly
            title: "Yet Another Title",
            description: "Yet Another description"
        }
    ];

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <div style={{ position: 'relative' }}>
                    
                        <Image src={image.image} width={1000} height={1000} className="w-full h-[274px] object-cover" alt="Background" />
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            padding: '20px',
                            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)'
                        }}>
                            <h4 className="text-white text-[62px]">{image.title}</h4>
                            <h5 className="text-white text-[20px] mb-4">{image.description}</h5>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default ProductsBackground;

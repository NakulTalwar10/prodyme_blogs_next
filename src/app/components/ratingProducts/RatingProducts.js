import React, { useEffect, useState } from "react";
import productUrl from "../../../url";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const RatingProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${productUrl.productUrl}/products`);
            // console.log("Products==>", response.data.products || []);
            setProducts(response.data.products || []);
        } catch (error) {
            // console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const NextArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div
                className="custom-arrow next-arrow"
                style={{ ...style, display: "block", position: "absolute", top: "40%", right: "-50px", transform: "translateY(-50%)", zIndex: 1 }}
                onClick={onClick}
            >
                <MdKeyboardArrowRight className="text-gray-900 text-2xl" />
            </div>
        );
    };
    
    const PrevArrow = (props) => {
        const { style, onClick } = props;
        return (
            <div
                className="custom-arrow prev-arrow"
                style={{ ...style, display: "block", position: "absolute", top: "40%", left: "-50px", transform: "translateY(-50%)", zIndex: 1 }}
                onClick={onClick}
            >
                <MdKeyboardArrowLeft className="text-gray-900 text-2xl" />
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: < NextArrow />,
        prevArrow: < PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const threeStars = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: < NextArrow />,
        prevArrow: < PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-auto md:mr-2 md:w-[calc(35%-20px)] bg-white shadow-xl p-5 my-5">
                <h3 className="mr-2 text-xl font-bold">5 star Products!</h3>
                <div className="p-10">
                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <div key={index} className="slider-container px-4">
                                <div>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        alt={product.Brand}
                                        className="w-full object-cover h-[130px] mb-2"
                                        src={"./images/cardimages.jpg"}
                                    />
                                    <div>
                                        <h4 className="text-sm font-medium">
                                            {product.ProductName}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className="flex-auto md:w-[calc(50%-20px)] bg-white shadow-xl p-5 my-5">
                <h3 className="mr-2 text-xl font-bold">3 star Products!</h3>
                <div className="p-10">
                    <Slider {...threeStars}>
                        {products.map((product, index) => (
                            <div key={index} className="slider-container px-4">
                                <div>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        alt={product.Brand}
                                        className="w-full object-cover h-[130px] mb-2"
                                        src={"./images/cardimages.jpg"}
                                    />
                                    <div>
                                        <h4 className="text-sm font-medium">
                                            {product.ProductName}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default RatingProducts;

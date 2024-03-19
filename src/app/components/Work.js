'use client'
import React, { useState } from 'react'

import Image from 'next/image'
// import { Link } from 'react-router-dom';

const Work = () => {

    const [hoveredService, setHoveredService] = useState(null);
    const services = [
        {
            img: "https://static.wixstatic.com/media/84770f_59a5515ed0ea48efb3f1a7e3ce3098cc~mv2.jpeg/v1/fill/w_284,h_284,q_90/84770f_59a5515ed0ea48efb3f1a7e3ce3098cc~mv2.jpeg",
            name: "Kitchens",
            route: '/kitchens'
        },
        {
            img: "https://static.wixstatic.com/media/84770f_734548bad9a64870bcdf536d143a67e9~mv2.jpeg/v1/fill/w_284,h_284,q_90/84770f_734548bad9a64870bcdf536d143a67e9~mv2.jpeg",
            name: "Baithrooms",
            route: '/bathrooms'
        },
        {
            img: "https://static.wixstatic.com/media/84770f_90ea2ac28d32475998f8280f84c837c9~mv2.jpg/v1/fill/w_284,h_284,q_90/84770f_90ea2ac28d32475998f8280f84c837c9~mv2.jpg",
            name: "Interiors",
            route: '/interiors'
        },
        {
            img: "https://static.wixstatic.com/media/d30b06be6cb14976be28fdf001f2b34c.jpg/v1/fill/w_284,h_284,q_90/d30b06be6cb14976be28fdf001f2b34c.jpg",
            name: "Additions",
            route: '/additions'
        },
        {
            img: "https://static.wixstatic.com/media/84770f_619db8cc54974cb890cb1241f862df08~mv2.jpeg/v1/fill/w_284,h_284,q_90/84770f_619db8cc54974cb890cb1241f862df08~mv2.jpeg",
            name: "Exteriors",
            route: '/exteriors'
        },
        {
            img: "https://static.wixstatic.com/media/84770f_09ff25b3874d46fab6254709c0a61fbb~mv2.jpeg/v1/fill/w_284,h_284,q_90/84770f_09ff25b3874d46fab6254709c0a61fbb~mv2.jpeg",
            name: "Sunrooms",
            route: '/sunrooms'
        },
    ]
    return (
        <div className='font-roboto '>


            <div className="px-4 sm:px-6 lg:px-8">
                <section>
                    <h1 className="md:text-[40px] text-[30px] text-orange-400 font-bold text-center my-5">Our Work</h1>
                    <p className="text-center sm:text-left font-normal">
                        You are invited to browse a selection of recently completed projects below.
                    </p>
                </section>

                <section className="py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="relative rounded-lg"
                                onMouseOver={() => setHoveredService(index)}
                                onMouseOut={() => setHoveredService(null)}
                            >
                                <img src={service.img} alt={service.name}  className="w-full h-auto" />
                                {hoveredService === index && (
                                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white">
                                        <span className="text-center font-bold text-xl">
                                            {service.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
            
        </div>
    )
}

export default Work
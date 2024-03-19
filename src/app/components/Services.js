'use client'
import React, { useState } from 'react'
import Image from 'next/image'
// import { Link } from 'react-router-dom'

const Services = () => {
    const [hoveredService, setHoveredService] = useState(null);
    const cards = [
        {
            img: "https://static.wixstatic.com/media/84770f_d8d01f48d794443c8237018af974c192~mv2.jpg/v1/fill/w_259,h_194,q_90/84770f_d8d01f48d794443c8237018af974c192~mv2.jpg",
            title: "Kitchen",
            paraOne: "Describe your image here. Use catchy text to tell people the story behind the photo.",
            paraTwo: "Go to “Manage Media” to add your content.",
            route: '/kitchens'
        },
        {
            img: "https://static.wixstatic.com/media/efa0f8259ee7477e92be257c19f8b3b9.jpg/v1/fill/w_259,h_194,q_90/efa0f8259ee7477e92be257c19f8b3b9.jpg",
            title: "Bathrooms",
            paraOne: "Describe your image here. Use catchy text to tell people the story behind the photo.",
            paraTwo: "Go to “Manage Media” to add your content.",
            route: '/bathrooms'
        },
        {
            img: "https://static.wixstatic.com/media/84770f_cd17fb21ef2e4ace992e927516c40e00~mv2.jpeg/v1/fill/w_258,h_194,q_90/84770f_cd17fb21ef2e4ace992e927516c40e00~mv2.jpeg",
            title: "Interiors",
            paraOne: "Describe your image here. Use catchy text to tell people the story behind the photo.",
            paraTwo: "Go to “Manage Media” to add your content.",
            route: '/interiors'
        },
        {
            img: "https://static.wixstatic.com/media/84770f_4b843746603e44618105ce2ee5a56abc~mv2.jpeg/v1/fill/w_259,h_194,q_90/84770f_4b843746603e44618105ce2ee5a56abc~mv2.jpeg",
            title: "Additions",
            paraOne: "Describe your image here. Use catchy text to tell people the story behind the photo.",
            paraTwo: "Go to “Manage Media” to add your content.",
            route: '/additions'
        },
        {
            img: "https://static.wixstatic.com/media/cd5b640880ce4ca3a1d3ba165d8ee82d.jpg/v1/fill/w_259,h_194,q_90/cd5b640880ce4ca3a1d3ba165d8ee82d.jpg",
            title: "Exteriors",
            paraOne: "Describe your image here. Use catchy text to tell people the story behind the photo.",
            paraTwo: "Go to “Manage Media” to add your content.",
            route: '/exteriors'
        },
        {
            img: "https://static.wixstatic.com/media/dcb18a51041d442ebf011092278a2ccb.jpg/v1/fill/w_258,h_194,q_90/dcb18a51041d442ebf011092278a2ccb.jpg",
            title: "Sunrooms",
            paraOne: "Describe your image here. Use catchy text to tell people the story behind the photo.",
            paraTwo: "Go to “Manage Media” to add your content.",
            route: '/sunrooms'
        },

    ]
    return (
        <div className='font-roboto'>


            <div className="px-4 sm:px-6 lg:px-8">
                <section>
                    <h1 className="md:text-[40px] text-[30px] font-bold text-orange-400 text-center my-5">Our Services</h1>
                    <p className="text-center sm:text-left font-normal">
                        Let us help you make your dreams a reality.
                    </p>
                </section>

                <section className="py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {cards.map((value, key) => (
                            <div
                                key={key}
                                className="relative"
                                onMouseOver={() => setHoveredService(key)}
                                onMouseOut={() => setHoveredService(null)}
                            >
                                <div className="relative">
                                    <img src={value.img} alt={value.title}  className="mx-auto w-full" />
                                    {hoveredService === key && (
                                        <div className="absolute inset-0 bg-black opacity-50" />
                                    )}
                                </div>
                                <h1 className="text-center font-bold text-2xl my-5 text-blue-900">
                                    {value.title}
                                </h1>
                                <p className="text-center font-normal">{value.paraOne}</p>
                                <p className="text-center font-normal">{value.paraTwo}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
            
        </div>
    )
}

export default Services
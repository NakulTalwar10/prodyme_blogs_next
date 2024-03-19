'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const Footer = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <section className="px-10 py-[30px] bg-black font-roboto">
                {isMobile ? (
                    <div>
                        <div className="flex flex-col justify-center text-[12px] font-normal">
                            <div>
                                <div className='flex justify-start items-center'>
                                    <div>
                                        <img src="/images/logo.png" alt="" className='w-[100px] h-auto' />
                                    </div>
                                    <div>
                                        <h3 className='text-white  text-center py-5 text-xl font-roboto'>Prodyme homes</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mx-1">
                                
                            </div>
                            <div className=" mx-1 my-2">
                                <p className="text-white text-sm">
                                    care@prodyme.in

                                </p>
                            </div>
                            <div className="mx-1 my-2">
                                <p className="text-white text-sm">
                                    Prodym footer text like all rights reserved etc.
                                </p>
                            </div>
                        </div>

                        <div>
                            <hr className="border-2 bg-white my-10" />
                        </div>

                        {/* <div>
                            <div>
                                <div className="text-white text-[16px] font-normal text-center">
                                    Contact Us
                                </div>
                            </div>
                            <div className="grid ">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Site Address"
                                    className="p-3 rounded-xl my-5"
                                />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Subject"
                                    className="p-3 rounded-xl my-5"
                                />
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Your message"
                                    className="p-3 rounded-xl my-5"
                                />
                            </div>
                        </div> */}

                        <div>
                            <ul className="flex justify-center items-center my-5">
                                <li className="mx-5 ">
                                    <img
                                        src="/images/facebook.png"
                                        alt="prodyme homes"
                                        className='h-auto w-[38px]'

                                    />
                                </li>
                                <li className="mx-5 ">
                                    <img
                                        src="/images/instagram.png"
                                        alt="prodyme homes"
                                        className='h-auto w-[38px]'

                                    />
                                </li>
                                <li className="mx-5 ">
                                    <img
                                        src="/images/Vector.png"
                                        alt="prodyme homes"
                                        className='h-auto w-[38px]'

                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <div className="grid grid-cols-3">
                            {/* <div className="py-5">
                                <div>
                                    <div>
                                        <h1 className="text-white font-normal text-[24px]">
                                            Contact Us
                                        </h1>
                                    </div>
                                    <div className="grid ">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Site Address"
                                            className="p-3 rounded-xl my-5"
                                        />
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Subject"
                                            className="p-3 rounded-xl my-5"
                                        />
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Your message"
                                            className="p-3 rounded-xl my-5"
                                        />
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="relative">
                                <div className="absolute top-0 bottom-0 h-full w-0.5 bg-white left-[50%]"></div>
                            </div> */}

                            <div className='flex flex-col '>
                                <div className='mx-5'>
                                    <img src="/images/logo.png" alt="prodyme homes" className='w-[100px] h-auto object-cover' />
                                    
                                </div>

                                <div>
                                <h3 className='text-white mx-5 py-5 font-roboto text-xl font-bold'>Prodyme Homes</h3>
                                </div>
                            </div>

                            <div className='flex flex-col justify-evenly font-normal text-[14px]'>
                                
                                <div className="my-2">
                                    <p className="text-white text-lg">
                                        care@prodyme.in

                                    </p>
                                </div>
                                <div className="my-2">
                                    <p className="text-white text-lg">
                                        Prodym footer text like all rights reserved etc.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <ul className="flex my-5">
                                <li className="mx-5 ">
                                    <img
                                        src="/images/facebook.png"
                                        alt="prodyme homes"
                                        className='h-auto w-[38px]'
                                    />
                                </li>
                                <li className="mx-5 ">
                                    <img
                                        src="/images/instagram.png"
                                        alt="prodyme homes"
                                        className='h-auto w-[38px]'
                                    />
                                </li>
                                <li className="mx-5 ">
                                    <img
                                        src="/images/Vector.png"
                                        alt="prodyme homes"
                                        className='h-auto w-[38px]'
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Footer
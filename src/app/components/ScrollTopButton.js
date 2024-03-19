'use client'
import React from 'react'
import ScrollToTop from "react-scroll-up";
import { FaArrowUp } from "react-icons/fa";

const ScrollTopButton = () => {
    return (
        <div className='relative z-[300]'>
            <ScrollToTop showUnder={160} duration={2000}>
                <p className='text-orange-400 font-bold cursor-pointer text-xl hover:border-2 hover:border-orange-400 hover:rounded-full p-1'>
                <FaArrowUp />
                </p>
            </ScrollToTop>
        </div>
    )
}

export default ScrollTopButton
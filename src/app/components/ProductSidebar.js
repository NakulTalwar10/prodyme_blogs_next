"use client"
import React, { useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";


const ProductSidebar = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
      };
    
  return (
    <div className={`bg-black md:w-36 lg:w-48 px-5 min-h-screen flex flex-col justify-start items-center md:block ${isVisible ? 'w-full lg:w-[201px]' : 'w-12'}`}>

    <button onClick={toggleSidebar} className={`mt-32 md:hidden top-[150px] text-white text-2xl p-2 lg:top-[100px] ${isVisible ? 'hidden' : 'sticky'}`}>
      <BsLayoutSidebarInset />
    </button>

    <div className={`lg: mt-20 flex flex-col items-center lg:top-[100px]  md:block ${isVisible ? 'static' : 'hidden'}`}>
      <button onClick={toggleSidebar} className={` md:hidden top-[100px] text-white text-2xl p-2 lg:top-[100px] ${isVisible ? '' : 'hidden'}`}>
        <BsLayoutSidebarInset />
      </button>
      
    </div>
  </div>
  );
};

export default ProductSidebar;

"use client"
import React, { useEffect, useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import axios from "axios";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const ProductSidebar = ({ categoryname, onSubcategorySelect }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [subcategory, setSubcategory] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const fetchSubcategory = async () => {
        try {
            const response = await axios.get("https://efbxl74e21.execute-api.ap-south-1.amazonaws.com/dev/ecomm/category");
            console.log("Response data:", response.data);
            const category = response.data.categories.find(cat => cat.name === categoryname);
            console.log("Category:", category);
            if (category) {
                setSubcategory(category.subcategories || []);
            }
            console.log("Subcategories:", subcategory);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
        onSubcategorySelect(subcategory);
    };

    const handleClearAll = () => {
        setSelectedSubcategory(null);
        onSubcategorySelect(null);
    };

    useEffect(() => {
        fetchSubcategory();
    }, [categoryname]);

    return (
        <div className={`bg-[#2a2a2a] md:w-36 lg:w-48 min-h-screen px-5 flex flex-col justify-start items-center md:block ${isVisible ? 'w-full lg:w-[201px]' : 'w-12'}`}>

            <button onClick={toggleSidebar} className={`mt-32 md:hidden top-[150px] text-white text-2xl p-2 lg:top-[100px] ${isVisible ? 'hidden' : 'sticky'}`}>
                <BsLayoutSidebarInset />
            </button>

            <div className={`lg: mt-36 flex flex-col items-center lg:top-[180px]  md:block ${isVisible ? 'static' : 'hidden'}`}>
                <button onClick={toggleSidebar} className={` md:hidden top-[180px] text-white text-2xl p-2 lg:top-[100px] ${isVisible ? '' : 'hidden'}`}>
                    <BsLayoutSidebarInset />
                </button>

                <div className="flex items-center mt-[20px] ">
                    <div className="text-[20px] text-orange-400">
                        <CiFilter />
                    </div>
                    <div className="mx-2">
                        <h4 className=" text-[20px] text-white">Filter</h4>
                    </div>
                    {selectedSubcategory && (
                        <button onClick={handleClearAll} className="text-white text-sm rounded-md p-1 bg-orange-500  hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
                            Clear All
                        </button>
                    )}
                </div>
            </div>



            <section className="mt-5 border border-[#646464] rounded-md relative">
                <div className="flex justify-center items-center  py-2 px-3 text-center" onClick={toggleDropdown}>
                    <div className="pr-3">
                        <label className="text-white text-xs">Filter Subcategory</label>
                    </div>
                    <div className="text-md font-bold text-[#FF7A34] ">
                        {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className="  mt-1 relative">
                        <hr className="border-[#646464] mx-2" />
                        <ul className="mt-2">
                            {subcategory.map((item, index) => (
                                <>
                                    <li key={item._id} className={`py-2 px-3 cursor-pointer hover:bg-orange-500 text-white text-xs ${selectedSubcategory === item.name ? 'bg-orange-500' : ''}`} onClick={() => handleSubcategorySelect(item.name)}>
                                        {item.name}
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductSidebar;

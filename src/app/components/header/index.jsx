"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import Auth from "../../auth";
// import Profileicon from "../profileicon";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
// import { fetchAllUsers } from "../../action/slice";
// import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import MenuItem from "@mui/material/MenuItem";


const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

const navPages = [
    {
        name: "Builder",
        link: "/planner",
    },
    {
        name: "Products",
        link: "/category",
    },
    {
        name: "Blogs",
        link: "/blogs",
    },
];

const Header = ({ dis }) => {
    //   const router = useRouter();
    const [category, setCategory] = useState([]);
    const [display, setDisplay] = useState(dis);
    const [load, setLoad] = useState(false);
    const [productname, setProductName] = useState("");
    const [categoryname, setCategoryName] = useState("");
    //   const dispatch = useDispatch();

    //   const { list } = useSelector((state) => state.category);
    //   const { wishlist } = useSelector((state) => state.wishlistData);

    const handleCategoryChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Your search logic here
    };

    const auth = () => {
        setDisplay(false);
    };

    //   useEffect(() => {
    //     dispatch(fetchAllUsers());
    //     // Additional useEffect logic if needed
    //   }, []);

    const handleToggleDisplay = () => {
        setDisplay(!display);
      };
    return (
        <div>
            <section className="topBar p-5 fixed top-0 w-full bg-white z-50">
                <section className="justify-between items-center flex">
                    <nav className="dataWeb">
                        <ul className="flex items-center ">
                            <li className="mx-5">
                                <Link href="/">
                                    <div>
                                        <Image src="./images/prodyme-logo.png" alt="Prodyme" width={100} height={50} />
                                    </div>
                                </Link>
                            </li>
                            {navPages.map((page) => (
                                <ul key={page.name}>
                                    <Link href={page.link}>
                                        <li className="navLink mx-2 font-medium hover:font-normal text-orange-400 text-lg">{page.name}</li>
                                    </Link>
                                </ul>
                            ))}
                        </ul>
                    </nav>

                    <section className="topNavBarActions ">
                        <ul className="flex items-center relative">
                            <li className="mx-1">
                                <IconButton>
                                    <StyledBadge
                                    >
                                        <FavoriteBorderSharpIcon className="text-[#ff7a34] topBarButtons" fontSize="small" />
                                    </StyledBadge>
                                </IconButton>
                            </li>

                            <li className="mx-1">
                                <IconButton>
                                    <StyledBadge badgeContent={0}>
                                        <ShoppingCartOutlinedIcon className="text-[#ff7a34] topBarButtons" fontSize="small" />
                                    </StyledBadge>
                                </IconButton>
                            </li>

                            <li>

                                <button className="bg-[#ff7a34] py-1 px-4 text-white text-[15px] rounded-full" onClick={() => setDisplay(!display)}>
                                    Login / Sign Up
                                </button>

                            </li>
                        </ul>

                        {/* Add profile icon or login/signup button here */}

                    </section>
                </section>
            </section>
        </div>
    );
};

export default Header;

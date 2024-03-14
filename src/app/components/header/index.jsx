"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Auth from '../Auth/Auth'
import axios from "axios";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

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
    const [isMobile, setIsMobile] = useState(false);
    const [category, setCategory] = useState([]);
    const [display, setDisplay] = useState(dis);
    const [load, setLoad] = useState(false);
    const [productname, setProductName] = useState("");
    const [categoryname, setCategoryName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.get('http://localhost:5000/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data)
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setAnchorEl(null)
    }

    return (
        <div>
            <section className="topBar p-5 fixed top-0 w-full bg-white z-50">
                <section className="justify-between flex flex-wrap items-center">
                    <div className="flex  items-center">
                        <Link href="/">
                            <div>
                                <Image src="./images/prodyme-logo.png" alt="Prodyme" width={100} height={50} />
                            </div>
                        </Link>
                        {!isMobile && (
                            <>
                                <nav className="flex flex-wrap items-center">
                                    {navPages.map((page) => (
                                        <Link href={page.link} key={page.name}>
                                            <button className="mx-2 font-medium hover:font-normal text-orange-400 text-lg">{page.name}</button>
                                        </Link>
                                    ))}
                                </nav>
                            </>
                        )}
                        {isMobile && (
                            <div className="flex ">
                                {user ? (
                                    <>

                                        <IconButton onClick={handleClick}>
                                            <AccountCircleOutlinedIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>{user.fullname}</MenuItem>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </Menu>

                                    </>
                                ) : (
                                    <>
                                        <button className="bg-[#ff7a34] py-1 px-4 text-white text-[15px] rounded-full" onClick={handleClick}>
                                            Login / Sign Up
                                        </button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <Auth />
                                        </Menu>
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                    {isMobile && (
                        <>
                            <nav className="flex flex-wrap items-center">
                                {navPages.map((page) => (
                                    <Link href={page.link} key={page.name}>
                                        <button className="mx-2 font-medium hover:font-normal text-orange-400 text-lg">{page.name}</button>
                                    </Link>
                                ))}
                            </nav>
                        </>
                    )}
                    <div className="flex items-center">
                        <IconButton>
                            <StyledBadge>
                                <FavoriteBorderSharpIcon className="text-[#ff7a34] topBarButtons" fontSize="small" />
                            </StyledBadge>
                        </IconButton>
                        <IconButton>
                            <StyledBadge badgeContent={0}>
                                <ShoppingCartOutlinedIcon className="text-[#ff7a34] topBarButtons" fontSize="small" />
                            </StyledBadge>
                        </IconButton>
                        {!isMobile && (
                            <>
                                {user ? (
                                    <>
                                        <li>
                                            <IconButton onClick={handleClick}>
                                                <AccountCircleOutlinedIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={handleClose}>{user.fullname}</MenuItem>
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                            </Menu>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <button className="bg-[#ff7a34] py-1 px-4 text-white text-[15px] rounded-full" onClick={handleClick}>
                                            Login / Sign Up
                                        </button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <Auth />
                                        </Menu>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Header;
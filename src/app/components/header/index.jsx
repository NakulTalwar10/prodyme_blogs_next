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
        name: "Home",
        link: "/",
    },
    {
        name: "Products",
        link: "/",
    },
    {
        name: "Blogs",
        link: "/blogs",
    },
];

const Header = ({ dis }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const [authMenuAnchorEl, setAuthMenuAnchorEl] = useState(null);
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
            axios.get('https://o2hiiab1uc.execute-api.ap-south-1.amazonaws.com/dev/auth/user', {
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

    const handleUserMenuClick = (event) => {
        setUserMenuAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchorEl(null);
    };

    const handleAuthMenuClick = (event) => {
        setAuthMenuAnchorEl(event.currentTarget);
    };

    const handleAuthMenuClose = () => {
        setAuthMenuAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setUserMenuAnchorEl(null)
    }

    return (
      <div>
        <section className="topBar p-5 fixed top-0 w-full bg-white z-50 shadow-xl">
          <section className="justify-between flex flex-wrap items-center">
            <div className="flex  items-center">
              <Link href="/">
                <div>
                  <Image
                    src="./images/prodyme-logo.png"
                    alt="Prodyme"
                    width={1000}
                    height={1000}
                    priority={true}
                    className="w-[100px] h-[37.66px] object-cover"
                  />
                </div>
              </Link>
              {!isMobile && (
                <>
                  <nav className="flex flex-wrap items-center mx-4">
                    {navPages.map((page) => (
                      <Link href={page.link} key={page.name}>
                        <button className="mx-2 font-medium hover:font-normal text-orange-400 text-md">
                          {page.name}
                        </button>
                      </Link>
                    ))}
                  </nav>
                </>
              )}
            </div>
            {isMobile && (
              <div className="flex ">
                {user ? (
                  <>
                    <IconButton onClick={handleUserMenuClick}>
                      <AccountCircleOutlinedIcon />
                    </IconButton>
                    <Menu
                      anchorEl={userMenuAnchorEl}
                      open={Boolean(userMenuAnchorEl)}
                      onClose={handleUserMenuClose}
                    >
                      <MenuItem onClick={handleUserMenuClose}>
                        {user.fullname}
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-[#ff7a34] py-1 px-4 text-white text-[15px] rounded-full"
                      onClick={handleAuthMenuClick}
                    >
                      Login / Sign Up
                    </button>
                    <Menu
                      anchorEl={authMenuAnchorEl}
                      open={Boolean(authMenuAnchorEl)}
                      onClose={handleAuthMenuClose}
                    >
                      <Auth updateUser={setUser} />
                    </Menu>
                  </>
                )}
              </div>
            )}
            {isMobile && (
              <>
                <nav className="flex flex-wrap items-center mt-2">
                  {navPages.map((page) => (
                    <Link href={page.link} key={page.name}>
                      <button className="mx-2 font-medium hover:font-normal text-orange-400 text-md">
                        {page.name}
                      </button>
                    </Link>
                  ))}
                </nav>
              </>
            )}

            <div className="flex items-center">
              <IconButton>
                <StyledBadge>
                  <FavoriteBorderSharpIcon
                    className="text-[#ff7a34] topBarButtons"
                    fontSize="small"
                  />
                </StyledBadge>
              </IconButton>
              <IconButton>
                <StyledBadge badgeContent={0}>
                  <ShoppingCartOutlinedIcon
                    className="text-[#ff7a34] topBarButtons"
                    fontSize="small"
                  />
                </StyledBadge>
              </IconButton>

              {!isMobile && (
                <>
                  {user ? (
                    <>
                      <>
                        <IconButton onClick={handleUserMenuClick}>
                          <AccountCircleOutlinedIcon />
                        </IconButton>
                        <Menu
                          anchorEl={userMenuAnchorEl}
                          open={Boolean(userMenuAnchorEl)}
                          onClose={handleUserMenuClose}
                        >
                          <MenuItem onClick={handleUserMenuClose}>
                            {user.fullname}
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                      </>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-[#ff7a34] py-1 px-4 text-white text-[15px] rounded-full"
                        onClick={handleAuthMenuClick}
                      >
                        Login / Sign Up
                      </button>
                      <Menu
                        anchorEl={authMenuAnchorEl}
                        open={Boolean(authMenuAnchorEl)}
                        onClose={handleAuthMenuClose}
                      >
                        <Auth updateUser={setUser} />
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

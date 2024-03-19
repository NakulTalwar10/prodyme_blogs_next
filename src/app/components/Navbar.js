'use client'
import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';


const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };

        handleResize();
        handleScroll();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

   
    const scrollToSection=()=>{
        scroll.scrollTo("contactSection",{
            smooth :true,
            offset:-50
        })
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const isAfter100Vh = scrollPosition > (typeof window !== 'undefined' && window.innerHeight);


    
    return (
        
        <main>
            <section>
                {isMobile ? (
                    <div className={`font-roboto ${isMobile ? 'fixed top-0 left-0 w-full' : ''}`} style={{ background: isAfter100Vh ? 'white' : 'transparent', zIndex: 999 }}>
                        <div>
                            <nav className='p-5 navbar relative' style={{ background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))' }}>
                                <ul className='flex justify-between md:text-[30px]'>
                                   
                                    <li className='flex items-center'>
                                    <ScrollLink to="bannerSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                        <img src='/images/logo.png' alt='prodyme homes'   className='h-auto w-[37px]'  />
                                        </ScrollLink>
                                        
                                        <ScrollLink to="bannerSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                        <h3 className='text-white font-semibold text-[15px] mx-4'>Prodyme Homes</h3>
                                        </ScrollLink>
                                    </li>
                                    <li className={`text-white text-3xl`} onClick={toggleMenu}>
                                        {showMenu ? (
                                            <MdClose size={28} color='white' />
                                        ) : (
                                            <GiHamburgerMenu size={28} color='white' />
                                        )}

                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className='relative'>
                            {showMenu && (
                                <div className='absolute top-0 left-0 w-full bg-[#000000cb] py-5 px-5'>
                                    <div className='flex  justify-between items-center text-[16px] md:text-[30px] font-bold'>
                                        <ul>
                                            <ScrollLink to="aboutSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                                <li className='mx-4 text-white hover:text-orange-400 font-normal'>About</li>
                                            </ScrollLink>

                                            <ScrollLink to="serviceSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                                <li className='mx-4 text-white hover:text-orange-400 font-normal'>Services</li>
                                            </ScrollLink>

                                            <ScrollLink to="workSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                                <li className='mx-4 text-white hover:text-orange-400 font-normal'>Testimonials</li>
                                            </ScrollLink>

                                            <ScrollLink to="contactSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                                <li className='mx-4 text-white hover:text-orange-400 font-normal'>Contact</li>
                                            </ScrollLink>
                                        </ul>
                                        
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={`font-roboto fixed top-0 left-0 w-full `} style={{ background: isAfter100Vh ? 'orange' : 'transparent', zIndex: 999 }}>
                        <nav className='p-5 navbar ' style={{ background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))' }}>
                            <div className='flex justify-between items-center '>
                                <div className='flex items-center'>
                                    <img
                                        src="/images/logo.png"
                                        alt="prodyme homes"
                                        className='h-auto w-[50px]'
                                    />
                                    <h3 className='text-white font-semibold text-[25px] mx-4'>Prodyme Homes</h3>
                                </div>
                                <div>
                                    <ul className='flex cursor-pointer'>
                                        <ScrollLink to="bannerSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                            <li className={`mx-4 text-white hover:text-orange-400 font-normal text-[15px]`}>Home</li>
                                        </ScrollLink>
                                        <ScrollLink to="aboutSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                            <li className={`mx-4 text-white hover:text-orange-400 font-normal text-[15px]`}>About</li>
                                        </ScrollLink>
                                        <ScrollLink to="serviceSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                            <li className={`mx-4 text-white hover:text-orange-400 font-normal text-[15px]`}>Services</li>
                                        </ScrollLink>
                                        <ScrollLink to="workSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                            <li className={`mx-4 text-white hover:text-orange-400 font-normal text-[15px]`}>Testimonials</li>
                                        </ScrollLink>
                                        <ScrollLink to="contactSection" smooth={true} duration={3000} onClick={scrollToSection}>
                                            <li className={`mx-4 text-white hover:text-orange-400 font-normal text-[15px]`}>Contact</li>
                                        </ScrollLink>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Navbar
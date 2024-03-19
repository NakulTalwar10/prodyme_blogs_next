'use client'
import React, { useEffect, useState } from 'react'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Banner = () => {
    const [ isMobile, setIsMobile ] = useState(false)

    const scrollToEstimator = () => {
        scroll.scrollTo('estimatorSection', {
            smooth: true,
            offset: -50,
        });
    }

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
            <section>
                {isMobile ? (
                    <div className='font-roboto'>
                        <div>
                            <video
                                className="absolute inset-0 object-cover w-full h-full"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{
                                    zIndex: -1,
                                }}
                            >
                                <source src="/videos/prodyme-video.mp4" type="video/mp4" />
                            </video>
                            <div className='flex justify-start items-center h-screen'>
                                <div className='home_bg pl-[22px] pr-[80px] py-5'>
                                    <h1 className='font-semibold text-white text-[30px] md:text-[60px] '>The most<br /> <span className='text-orange-400'>professional</span> <br /> way to build <br />your home</h1>
                                    <hr className='border-2 my-5 bg-white' />

                                    <ScrollLink to="estimatorSection" smooth={true} onClick={scrollToEstimator}>
                                        <button className='btn-background hover:shadow-lg hover:shadow-orange-400 text-white rounded-[30px] px-5 py-[8px] text-[16px] md:text-[30px] lg:text-md'>Try Smart Estimator</button>
                                    </ScrollLink>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='font-roboto'>
                        <div>
                            <video
                                className="absolute inset-0 object-cover w-full h-full"
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{
                                    zIndex: -1,
                                }}
                            >
                                <source src="/videos/prodyme-video.mp4" type="video/mp4" />
                            </video>
                            <div className='flex  justify-start items-center h-screen'>
                                <div className='home_bg pl-20 pr-[400px] py-5 '>
                                    <h1 className='heading  text-white text-[50px] '>The most <span className='text-orange-400 font-semibold'>professional</span>  way to build  your home</h1>
                                    <hr className='border-2 my-5 bg-white' />

                                    <ScrollLink to="estimatorSection" smooth={true} onClick={scrollToEstimator}>
                                        <button className='btn-background hover:shadow-lg hover:shadow-orange-400 text-white rounded-[40px] px-10 py-[8px]'>Try Smart Estimator</button>
                                    </ScrollLink>
                                </div>

                            </div>
                        </div>
                    </div>
                )
                }

            </section >
        </div >
    )
}

export default Banner
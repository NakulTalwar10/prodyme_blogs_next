'use client'
import React from 'react';
import './About.css';
import Image from 'next/image';

const About = () => {
    return (
        <div className='font-roboto '>
            <section className='section-1 py-5'>
                <div className='text-center px-4 sm:px-[410px] '>
                    <h1 className='md:text-[40px] text-[30px] font-bold text-center my-5 text-orange-400'>About M&D Remodeling</h1>
                    <p className='font-normal'>
                        I am a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
                    </p>
                </div>
            </section>

            <section className='section-2 relative '>
                <div className='bg-image'
                    style={{
                        backgroundImage: `url('https://static.wixstatic.com/media/74f558_ee8a9ea2d0db4a52b264bf379cd6a276~mv2_d_4000_2447_s_4_2.jpeg/v1/fill/w_1085,h_844,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/74f558_ee8a9ea2d0db4a52b264bf379cd6a276~mv2_d_4000_2447_s_4_2.jpeg')`,
                        backgroundSize: 'cover',
                        backgroundAttachment: 'fixed'
                    }}
                ></div>
                <div className='relative z-10 py-56'>
                    {/* Content for section-2 goes here */}
                </div>
            </section>
            <section className='section-3 py-5'>
                <div className='text-center px-4 sm:px-[410px]'>
                    <h1 className='md:text-[40px] text-[30px] font-bold text-center my-5 text-orange-400'>Our Process</h1>
                    <p className='font-normal'>
                        I am a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
                    </p>
                    <p className='font-normal'>
                        Just click “Edit Text” or double click me to add your own content and make changes to the font
                    </p>
                </div>
            </section>

            <section className='section-4 py-5 '>
                <div className='bg-[#dbdbdb]'>
                    <div className='flex flex-wrap justify-center items-center'>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <img src="https://static.wixstatic.com/media/74f558_b261ab6879d14b0bbc9800ec41ba91fd~mv2_d_6208_4258_s_4_2.jpeg" alt=""  className='w-full h-80' />
                        </div>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <h1 className='text-center font-bold text-2xl px-4 sm:px-8 mt-5'>Preconstruction Design</h1>
                            <p className='text-center font-normal px-4 sm:px-8 mt-5'>I am a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
                        </div>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <img src="https://static.wixstatic.com/media/74f558_0e46dc42786945daad2d2535524461c3~mv2_d_6048_4032_s_4_2.jpeg" alt=""  className='w-full h-80' />
                        </div>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <h1 className='text-center font-bold text-2xl px-4 sm:px-8 mt-5'>Design & Construction Estimate</h1>
                            <p className='text-center font-normal px-4 sm:px-8 mt-5'>I am a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-center items-center'>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <h1 className='text-center font-bold text-2xl px-4 sm:px-8 mt-5'>On-Site Consultations</h1>
                            <p className='text-center font-normal px-4 sm:px-8 mt-5'>I am a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
                        </div>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <img src="https://static.wixstatic.com/media/74f558_ac023650dfaf4026972886b8c33e06e9~mv2_d_4000_2983_s_4_2.jpg" alt=""  className='w-full h-80' />
                        </div>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <h1 className='text-center font-bold text-2xl px-4 sm:px-8 mt-5'>The Finishing Touches</h1>
                            <p className='text-center font-normal px-4 sm:px-8 mt-5'>I am a paragraph. Click here to add your own text and edit me. Let your users get to know you.</p>
                        </div>
                        <div className='w-full sm:w-1/2 md:w-1/4 p-0'>
                            <img src="https://static.wixstatic.com/media/74f558_d26f60b4ce744d9c9e82426a09cd84b5~mv2_d_5616_3744_s_4_2.jpeg" alt=""  className='w-full h-80' />
                        </div>
                    </div>
                </div>
            </section>

            <section className='section-5 py-5'>
                <div className='text-center px-4 sm:px-[410px]'>
                    <h1 className='md:text-[40px] text-[30px] font-bold text-center my- text-orange-400'>Our Quality Guarantee</h1>
                    <p className='font-normal'>I am a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p><br />

                    <p className='font-normal'>This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.</p><br />

                    <p className='font-normal'>At Wix we’re passionate about making templates that allow you to build fabulous websites and it’s all thanks to the support and feedback from users like you! Keep up to date with New Releases and what’s Coming Soon in Wix ellaneous in Support. Feel free to tell us what you think and give us feedback in the Wix Forum. If you’d like to benefit from a professional designer’s touch, head to the Wix Arena and connect with one of our Wix Pro designers. Or if you need more help you can simply type your questions into the Support Forum and get instant answers. To keep up to date with everything Wix, including tips and things we think are cool, just head to the Wix Blog!</p>
                </div>
            </section>

        </div>

    );
};

export default About;

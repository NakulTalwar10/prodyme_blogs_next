import React from 'react';
import Typography from "@mui/material/Typography";

const Footer = () => {
    const socialLinks = [
        {
            name: 'Facebook',
            path: 'https://www.facebook.com/profile.php?id=100084868209666',
            icon: './images/fb.png'
        },
        {
            name: 'LinkedIn',
            path: 'https://www.linkedin.com/company/prodyme-homes/',
            icon: './images/linkedin.png'
        },
        {
            name: 'Instagram',
            path: 'https://www.instagram.com/prodyme.india/',
            icon: './images/insta.png'
        },
        {
            name: 'Twitter',
            path: 'https://twitter.com/ProdymeIndia',
            icon: './images/twitter.png'
        },
        {
            name: 'YouTube',
            path: 'https://www.youtube.com/channel/UCezm0GYyK9paIXdaEJWZFQQ',
            icon: './images/youtube.png'
        }
    ];

    const intLinks = [
        {
            name: 'Product Finder',
            path: '/search'
        },
        {
            name: 'About',
            path: '/about'
        },
        {
            name: 'FAQ',
            path: '/faq'
        },
        {
            name: 'Projects',
            path: '/homes'
        },
        {
            name: 'Contact',
            path: '/contactus'
        }
    ];

    return (
        <div className=''>
            <footer className=" z-[1000] footNote bg-opacity-66 bg-cover" style={{ backgroundImage: "url('./images/grid-hexa-dark.png')" }}>
                <div className="flex flex-col lg:flex-row justify-around p-4 lg:p-20">
                    <nav className="mb-4 lg:mb-0">
                        <ul className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.path} target="_blank" rel="noopener noreferrer">
                                        <img src={link.icon} alt={link.name} className="h-8 w-8" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav>
                        <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-white">
                            {intLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.path}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <article className="copyRight bg-opacity-70 bg-gray-800 text-white">
                    <section className="flex justify-center max-w-1080 mx-auto py-6">
                        <Typography variant="body2" component="p" className="px-2">
                            Copyright © 2021 <strong>Prodyme</strong>. All rights reserved
                        </Typography>
                        <Typography variant="body2" component="p" className="px-2 hidden lg:block">
                            |
                        </Typography>
                        <Typography variant="body2" component="p" className="px-2">
                            Terms of use
                        </Typography>
                        <Typography variant="body2" component="p" className="px-2 hidden lg:block">
                            |
                        </Typography>
                        <Typography variant="body2" component="p" className="px-2">
                            Privacy Policy
                        </Typography>
                    </section>
                </article>
            </footer>
        </div>
    )
}

export default Footer;
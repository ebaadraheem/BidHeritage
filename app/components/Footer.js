import React from 'react';
import Link from 'next/link';
const Footer = () => {
    return (
        <div>
            <footer className="  bottom-0 relative  left-0 z-10 w-full p-4 bg-[#8B4513] border-t border-[#A0522D] shadow flexer max-md:flex-col gap-2 md:flex md:items-center md:justify-between md:p-6">
                <span className="text-sm text-[#F5F5DC] sm:text-center">© 2024 BidHeritage. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-[#F5F5DC] sm:mt-0">
                    <li>
                        <a href="https://www.instagram.com/ebaadraheem19?igsh=MWJxYmZiZWZ2NGs5MQ== " className="hover:underline mr-4 md:mr-6 text-[#F5F5DC]">Instagram</a>
                    </li>
                    <li>
                        <a href="https://x.com/ebaadraheem19?s=09" className="hover:underline mr-4 md:mr-6 text-[#F5F5DC]">Twitter</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/ebaad.raheem?mibextid=ZbWKwL" className="hover:underline mr-4 md:mr-6 text-[#F5F5DC]">Facebook</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/ebaad-raheem-4b62a8262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:underline text-[#F5F5DC]">LinkedIn</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;

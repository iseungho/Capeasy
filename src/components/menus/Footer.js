import React from "react";

const Footer = () => (
    <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
            <p className="text-lg">&copy; 2024 CapEasy. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
                <a
                    href="/privacy-policy"
                    className="text-gray-400 hover:text-white transition duration-300"
                >
                    Privacy Policy
                </a>
                <a
                    href="/service"
                    className="text-gray-400 hover:text-white transition duration-300"
                >
                    Terms of Service
                </a>
                <a
                    href="mailto:ghehf51@naver.com"
                    className="text-gray-400 hover:text-white transition duration-300"
                >
                    Contact Us
                </a>
                <a
                    href="https://github.com/iseungho/Capeasy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition duration-300"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 2.04c-5.48 0-9.96 4.48-9.96 9.96 0 4.38 2.86 8.09 6.84 9.38.5.1.66-.22.66-.48v-1.68c-2.78.6-3.36-1.34-3.36-1.34-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.06-.6.06-.6 1 .08 1.5 1 1.5 1 .9 1.52 2.28 1.08 2.84.82.1-.66.34-1.08.62-1.34-2.22-.26-4.56-1.12-4.56-5 0-1.1.38-2 .98-2.7-.1-.26-.44-1.32.08-2.76 0 0 .84-.28 2.76 1.06a9.57 9.57 0 012.52-.34c.86 0 1.74.12 2.52.34 1.92-1.34 2.76-1.06 2.76-1.06.52 1.44.18 2.5.08 2.76.62.7.98 1.6.98 2.7 0 3.88-2.34 4.74-4.56 5 .36.3.68.92.68 1.88v2.82c0 .26.16.58.68.48a10.01 10.01 0 006.84-9.38c0-5.48-4.48-9.96-9.96-9.96z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
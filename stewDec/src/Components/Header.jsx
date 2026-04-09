import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close mobile menu when window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navItems = [
        { id: "home", label: "Home", path: "/" },
        { id: "services", label: "Services", path: "/service" },
        { id: "portfolio", label: "Portfolio", path: "/portfolio" },
        { id: "about", label: "About", path: "/about" },
        { id: "contact", label: "Contact", path: "/contact" },
    ];

    const handleNavClick = () => {
        setIsOpen(false);
    };

    // Function to check if link is active
    const isActiveLink = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Header */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo with animation */}
                    <Link
                        to="/"
                        className="relative group"
                        onClick={() => setIsOpen(false)}
                    >
                        <span
                            className={`text-3xl font-serif tracking-widest transition-all duration-300 ${scrolled ? "text-amber-900" : "text-white"
                                }`}
                        >
                            StewDec
                            <span
                                className={`text-amber-600 transition-all duration-300 ${scrolled ? "opacity-100" : "opacity-90"
                                    }`}
                            >
                                .
                            </span>
                        </span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                onClick={handleNavClick}
                                className={`relative text-sm uppercase tracking-[2px] font-light transition-all duration-300 group ${scrolled
                                    ? "text-gray-800 hover:text-amber-700"
                                    : "text-white/90 hover:text-white"
                                    }`}
                            >
                                {item.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${isActiveLink(item.path) ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                ></span>
                            </Link>
                        ))}

                        {/* Special CTA Button */}
                        <Link
                            to="/consultation"
                            className={`ml-4 px-6 py-2 text-sm uppercase tracking-[2px] transition-all duration-300 transform hover:scale-105 ${scrolled
                                ? "bg-amber-700 text-white hover:bg-amber-800"
                                : "bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20"
                                }`}
                        >
                            Book Consultation
                        </Link>
                    </nav>

                    {/* Mobile Menu Button with animation */}
                    <button
                        className="md:hidden relative w-10 h-10 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-6 transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                                }`}
                        >
                            <span
                                className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"
                                    }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-6 mt-1.5 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"
                                    }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-6 mt-1.5 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"
                                    }`}
                            ></span>
                        </span>
                        <span
                            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isOpen ? "opacity-100 rotate-45" : "opacity-0 rotate-0"
                                }`}
                        >
                            <span
                                className={`block h-0.5 w-6 rotate-45 ${scrolled ? "bg-gray-800" : "bg-white"
                                    }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-6 -rotate-45 -mt-0.5 ${scrolled ? "bg-gray-800" : "bg-white"
                                    }`}
                            ></span>
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay with animation */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Mobile Menu Panel with animation */}
            <div
                className={`fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="p-6 border-b border-amber-100">
                        <span className="text-2xl font-serif text-amber-900">
                            StewDec<span className="text-amber-600">.</span>
                        </span>
                    </div>

                    {/* Mobile Navigation Links with staggered animation */}
                    <nav className="flex-1 py-8 px-6">
                        <ul className="space-y-6">
                            {navItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    className="transform transition-all duration-500"
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? "translateX(0)" : "translateX(20px)",
                                    }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={handleNavClick}
                                        className={`block text-lg uppercase tracking-wider transition-all duration-300 hover:text-amber-700 hover:translate-x-2 ${isActiveLink(item.path)
                                            ? "text-amber-700 font-medium border-l-4 border-amber-700 pl-3"
                                            : "text-gray-600"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="p-6 border-t border-amber-100">
                        <Link
                            to="/consultation"
                            className="block w-full bg-amber-700 text-white text-center py-3 uppercase tracking-wider text-sm hover:bg-amber-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Consultation
                        </Link>
                        <div className="flex justify-center space-x-6 mt-6">
                            <a href="#" className="text-gray-500 hover:text-amber-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-amber-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.175 2 12 2z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-amber-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-3.374c1.042-1.94 1.586-4.115 1.586-6.368 0-.097-.002-.194-.006-.291A10.003 10.003 0 0024 8.59a9.86 9.86 0 01-2.047.58z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
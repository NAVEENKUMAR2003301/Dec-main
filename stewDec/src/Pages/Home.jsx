import React from "react";
import { Link } from "react-router-dom";
const tw = "/icons/tw.png";
const inn = "/icons/in.png";
const fa = "/icons/fa.png";
// Icon components for better visual representation
const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.175 2 12 2z" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const PinterestIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
);

const Home = () => {
    return (
        <div className="font-serif text-gray-800 antialiased overflow-x-hidden">
            {/* ===== HERO SECTION ===== */}
            <section
                id="home"
                className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative text-center text-white px-4 max-w-5xl mx-auto">
                    <p className="text-xs md:text-sm uppercase tracking-[4px] md:tracking-[6px] mb-2 md:mb-4 font-light">
                        Bespoke marriage events
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light mb-4 md:mb-6 leading-tight">
                        Where Dreams<br />Blossom into Eternity
                    </h1>
                    <div className="w-16 md:w-24 h-px bg-amber-300 mx-auto my-4 md:my-8"></div>
                    <p className="text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-8 md:mb-12 px-4">
                        A–Z luxury wedding decoration crafted with passion and precision
                    </p>
                    <Link
                        to="/story"
                        className="inline-block bg-amber-700 hover:bg-amber-800 text-white text-xs md:text-sm uppercase tracking-[2px] md:tracking-[3px] py-3 md:py-4 px-6 md:px-10 transition duration-300"
                    >
                        Begin your story
                    </Link>
                </div>
                <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                    </svg>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="py-16 md:py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                        <p className="text-amber-700 text-xs md:text-sm uppercase tracking-[3px] md:tracking-[4px] mb-2 md:mb-4">
                            Our Offerings
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 md:mb-6">
                            Exquisite Services
                        </h2>
                        <div className="w-16 md:w-20 h-px bg-amber-300 mx-auto"></div>
                        <p className="text-gray-600 mt-4 md:mt-8 text-base md:text-lg px-4">
                            From the first consultation to the last dance, we curate every detail to reflect your unique love story.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-500"
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-105 transition duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                                    <div className="p-4 md:p-6 text-white">
                                        <h3 className="text-lg md:text-xl font-serif mb-1 md:mb-2">{service.title}</h3>
                                        <p className="text-xs md:text-sm font-light opacity-90">{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PORTFOLIO SPOTLIGHT ===== */}
            <section id="portfolio" className="py-16 md:py-24 lg:py-32 bg-neutral-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                        <p className="text-amber-700 text-xs md:text-sm uppercase tracking-[3px] md:tracking-[4px] mb-2 md:mb-4">
                            Recent Masterpieces
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 md:mb-6">
                            A Glimpse of Our Art
                        </h2>
                        <div className="w-16 md:w-20 h-px bg-amber-300 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {portfolio.map((item, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition">
                                <img
                                    src={item}
                                    alt="Wedding decoration"
                                    className="w-full h-64 sm:h-80 md:h-96 object-cover hover:scale-105 transition duration-700"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10 md:mt-16">
                        <Link
                            to="/portfolio"
                            className="inline-block border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white text-xs md:text-sm uppercase tracking-[2px] md:tracking-[3px] py-3 px-6 md:px-10 transition duration-300"
                        >
                            View Full Portfolio
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== ABOUT ===== */}
            <section id="about" className="py-16 md:py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                    <div className="lg:w-1/2 w-full">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/09/19/09/40/sunset-5584004_640.jpg"
                            alt="Luxury wedding setup"
                            className="rounded-lg shadow-2xl w-full h-auto"
                            loading="lazy"
                        />
                    </div>
                    <div className="lg:w-1/2 w-full text-center lg:text-left">
                        <p className="text-amber-700 text-xs md:text-sm uppercase tracking-[3px] md:tracking-[4px] mb-2 md:mb-4">
                            Our Philosophy
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-4 md:mb-6">
                            Crafting Heirloom Memories
                        </h2>
                        <div className="w-16 md:w-20 h-px bg-amber-300 mx-auto lg:mx-0 mb-6 md:mb-8"></div>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6 px-4 lg:px-0">
                            At StewDec, we believe that a wedding is not just an event—it's the beginning of a legacy. With over a decade of curating high-profile weddings across the globe, our team blends timeless elegance with contemporary artistry.
                        </p>
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-10 px-4 lg:px-0">
                            Let us take you on a journey where your vision becomes an opulent reality, flawlessly executed from A to Z.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-amber-700 hover:bg-amber-800 text-white text-xs md:text-sm uppercase tracking-[2px] md:tracking-[3px] py-3 md:py-4 px-8 md:px-12 transition duration-300"
                        >
                            Meet the team
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIAL ===== */}
            <section className="bg-amber-900 text-white py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
                    <svg className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 md:mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-xl md:text-2xl lg:text-3xl font-serif font-light italic leading-relaxed mb-4 md:mb-8 px-4">
                        “StewDec didn't just decorate our wedding—they painted our love story. Every guest was left speechless by the beauty and attention to detail.”
                    </p>
                    <div className="w-12 md:w-16 h-px bg-amber-300 mx-auto mb-4 md:mb-6"></div>
                    <p className="text-base md:text-lg font-medium">— Priya & Rajeev Mehta</p>
                    <p className="text-xs md:text-sm uppercase tracking-wider text-amber-300">Married December 2025</p>
                </div>
            </section>

            

            {/* ===== FOOTER ===== */}
            <footer className="bg-gray-900 text-gray-400 py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    <div className="text-center sm:text-left">
                        <h3 className="text-white text-xl md:text-2xl font-serif tracking-wide mb-4">
                            StewDec<span className="text-amber-600">.</span>
                        </h3>
                        <p className="text-sm leading-relaxed">
                            A–Z luxury wedding decoration. Creating timeless, elegant experiences.
                        </p>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="text-white text-xs md:text-sm uppercase tracking-[3px] mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#home" className="hover:text-amber-500 transition">Home</a></li>
                            <li><a href="#services" className="hover:text-amber-500 transition">Services</a></li>
                            <li><a href="#portfolio" className="hover:text-amber-500 transition">Portfolio</a></li>
                            <li><a href="#about" className="hover:text-amber-500 transition">About</a></li>
                        </ul>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="text-white text-xs md:text-sm uppercase tracking-[3px] mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>45P6+GV8 Vilathikulam</li>
                            <li>Tamilnadu, India</li>
                            <li>+919788747902</li>
                            <li>stewNami@stewdec.com</li>
                        </ul>
                    </div>
                    <div className="text-center sm:text-left">
                        <h4 className="text-white text-xs md:text-sm uppercase tracking-[3px] mb-4">Follow</h4>
                        <div className="flex justify-center sm:justify-start space-x-4">
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                                <img src={tw} 
                                alt="twitter"
                                className="w-[30px] h-[30px] bg-amber-100 border rounded-3xl hover:bg-amber-200" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                                <img src={inn}
                                    alt="instagram"
                                    className="w-[30px] h-[30px]  bg-amber-100 border rounded-3xl hover:bg-amber-200" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition">
                                <img src={fa}
                                    alt="facebook"
                                    className="w-[30px] h-[30px]  bg-amber-100 border rounded-3xl hover:bg-amber-200" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 md:px-6 mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-800 text-center text-xs tracking-wider">
                    © {new Date().getFullYear()} StewDec Weddings. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

// Data arrays
const services = [
    {
        title: "Floral Artistry",
        description: "Rare blooms, sculptural arrangements",
        image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Lighting & Ambiance",
        description: "Chandeliers, candles, and dramatic uplighting",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Furniture & Decor",
        description: "Curated antiques and modern luxury pieces",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Full Event Coordination",
        description: "Seamless planning from A to Z",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
];

const portfolio = [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

export default Home;

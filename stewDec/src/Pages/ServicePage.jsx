import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// ===== ICON COMPONENTS =====
const IconWrapper = ({ children }) => (
    <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-3 sm:mb-4">
        {children}
    </div>
);

const ServicePage = () => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    // Toggle FAQ accordion
    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <div className="font-serif text-gray-800 antialiased bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative py-12 sm:py-14 lg:py-16 bg-gradient-to-b from-amber-800 to-amber-600 overflow-hidden">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                    <p className="text-amber-200 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                        A–Z Wedding Decoration
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 text-white">
                        Every Detail,<br />Perfectly Curated
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-300 mx-auto my-4 sm:my-5 lg:my-6"></div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-4">
                        From the first invitation to the final farewell, we orchestrate every element of your wedding décor. Explore our comprehensive range of services below.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-amber-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-amber-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            </section>

            {/* ===== MAIN SERVICE GRID ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-3 sm:mb-4">
                            Comprehensive Wedding Services
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto px-4">
                            Each service is delivered with the highest level of craftsmanship and attention to detail.
                        </p>
                    </div>

                    {/* Service Categories Grid */}
                    <div className="space-y-12 sm:space-y-16 lg:space-y-20">
                        {/* 1. Pre-Wedding & Ceremony */}
                        <div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-serif border-b border-amber-200 pb-3 sm:pb-4 mb-6 sm:mb-8 flex items-center">
                                <span className="bg-amber-700 w-1 h-4 sm:h-5 lg:h-6 mr-2 sm:mr-3"></span>
                                Pre-Wedding & Ceremony
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                                {preWeddingServices.map((service, idx) => (
                                    <ServiceCard key={idx} service={service} />
                                ))}
                            </div>
                        </div>

                        {/* 2. Reception & Dining */}
                        <div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-serif border-b border-amber-200 pb-3 sm:pb-4 mb-6 sm:mb-8 flex items-center">
                                <span className="bg-amber-700 w-1 h-4 sm:h-5 lg:h-6 mr-2 sm:mr-3"></span>
                                Reception & Dining
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                                {receptionServices.map((service, idx) => (
                                    <ServiceCard key={idx} service={service} />
                                ))}
                            </div>
                        </div>

                        {/* 3. Décor & Design Elements */}
                        <div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-serif border-b border-amber-200 pb-3 sm:pb-4 mb-6 sm:mb-8 flex items-center">
                                <span className="bg-amber-700 w-1 h-4 sm:h-5 lg:h-6 mr-2 sm:mr-3"></span>
                                Décor & Design Elements
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                                {decorServices.map((service, idx) => (
                                    <ServiceCard key={idx} service={service} />
                                ))}
                            </div>
                        </div>

                        {/* 4. Logistics & Coordination */}
                        <div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-serif border-b border-amber-200 pb-3 sm:pb-4 mb-6 sm:mb-8 flex items-center">
                                <span className="bg-amber-700 w-1 h-4 sm:h-5 lg:h-6 mr-2 sm:mr-3"></span>
                                Logistics & Coordination
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                                {logisticsServices.map((service, idx) => (
                                    <ServiceCard key={idx} service={service} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== BESPOKE PACKAGES ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-neutral-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <p className="text-amber-700 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                            Curated Experiences
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-3 sm:mb-4">
                            Bespoke Wedding Packages
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto px-4">
                            Choose a signature package or let us create a completely custom experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
                        {/* Package 1 */}
                        <div className="bg-white shadow-lg hover:shadow-xl transition p-5 sm:p-6 lg:p-8 border-t-4 border-amber-300 rounded-lg">
                            <h3 className="text-xl sm:text-2xl font-serif mb-2">Eternal Elegance</h3>
                            <p className="text-amber-700 font-light text-sm sm:text-base mb-3 sm:mb-4">Classic & Timeless</p>
                            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                                Perfect for traditional weddings. Includes floral arrangements, aisle decor, basic lighting, and ceremony setup.
                            </p>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
                                <li className="flex items-start">✓ Ceremony backdrop</li>
                                <li className="flex items-start">✓ Bridal bouquet & boutonnières</li>
                                <li className="flex items-start">✓ Table centrepieces (10 tables)</li>
                                <li className="flex items-start">✓ Warm ambient lighting</li>
                            </ul>
                            <Link to="/priceCalc" className="inline-block border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider transition rounded-full">
                                Inquire
                            </Link>
                        </div>

                        {/* Package 2 */}
                        <div className="bg-white shadow-xl hover:shadow-2xl transition p-5 sm:p-6 lg:p-8 border-t-4 border-amber-600 relative rounded-lg md:scale-105 lg:scale-110">
                            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white text-[10px] sm:text-xs uppercase tracking-wider py-1 px-3 sm:px-4 rounded-full whitespace-nowrap">
                                Most Popular
                            </div>
                            <h3 className="text-xl sm:text-2xl font-serif mb-2">Grand Affair</h3>
                            <p className="text-amber-700 font-light text-sm sm:text-base mb-3 sm:mb-4">Luxury & Opulence</p>
                            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                                For those seeking the extraordinary. Full-service decoration including lounge furniture, chandeliers, and premium florals.
                            </p>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
                                <li className="flex items-start">✓ All Eternal Elegance elements</li>
                                <li className="flex items-start">✓ Luxury lounge furniture</li>
                                <li className="flex items-start">✓ Crystal chandeliers & draping</li>
                                <li className="flex items-start">✓ Photobooth with custom backdrop</li>
                                <li className="flex items-start">✓ Welcome sign & stationery suite</li>
                            </ul>
                            <Link to="/priceCalc" className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider transition rounded-full">
                                Inquire
                            </Link>
                        </div>

                        {/* Package 3 */}
                        <div className="bg-white shadow-lg hover:shadow-xl transition p-5 sm:p-6 lg:p-8 border-t-4 border-amber-300 rounded-lg md:col-span-2 lg:col-span-1">
                            <h3 className="text-xl sm:text-2xl font-serif mb-2">Royal Celebration</h3>
                            <p className="text-amber-700 font-light text-sm sm:text-base mb-3 sm:mb-4">Ultimate Bespoke</p>
                            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
                                A completely custom, A–Z experience. We design every element exclusively for you, with no limits.
                            </p>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
                                <li className="flex items-start">✓ Everything in Grand Affair</li>
                                <li className="flex items-start">✓ Custom stage design & build</li>
                                <li className="flex items-start">✓ Imported floral installations</li>
                                <li className="flex items-start">✓ Full event coordination team</li>
                                <li className="flex items-start">✓ Premium furniture & tableware</li>
                                <li className="flex items-start">✓ Lighting & sound production</li>
                            </ul>
                            <Link to="/priceCalc" className="inline-block border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider transition rounded-full">
                                Inquire
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-center mb-8 sm:mb-10 lg:mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className="w-full text-left px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-amber-50 transition"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="font-medium text-sm sm:text-base lg:text-lg pr-4">{faq.question}</span>
                                    <svg
                                        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transform transition-transform ${expandedFaq === index ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-4 sm:px-5 lg:px-6 pb-3 sm:pb-4 text-gray-600 text-xs sm:text-sm border-t border-gray-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CONTACT CTA ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-amber-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-3 sm:mb-4">
                        Let's Plan Your Perfect Day
                    </h2>
                    <p className="text-amber-200 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 px-4">
                        From A to Z, we handle everything. Reach out for a complimentary consultation.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-white text-amber-900 hover:bg-amber-100 px-6 sm:px-7 lg:px-8 py-2.5 sm:py-3 text-xs sm:text-sm uppercase tracking-wider transition rounded-full"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </section>
        </div>
    );
};

// ===== SERVICE CARD COMPONENT =====
const ServiceCard = ({ service }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition p-4 sm:p-5 lg:p-6 rounded-lg group">
            <div className="flex items-start mb-2 sm:mb-3">
                <IconWrapper>
                    <span className="text-base sm:text-lg lg:text-xl">{service.icon}</span>
                </IconWrapper>
            </div>
            <h4 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2 group-hover:text-amber-700 transition">
                {service.title}
            </h4>
            <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">{service.shortDesc}</p>
            {expanded && (
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 border-t border-amber-100 pt-2 sm:pt-3">
                    <p className="mb-1 sm:mb-2 font-medium text-xs sm:text-sm">Includes:</p>
                    <ul className="list-disc pl-4 sm:pl-5 space-y-0.5 sm:space-y-1">
                        {service.details.map((detail, i) => (
                            <li key={i} className="text-xs sm:text-sm">{detail}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button
                onClick={() => setExpanded(!expanded)}
                className="text-amber-700 text-[10px] sm:text-xs uppercase tracking-wider mt-2 hover:underline focus:outline-none"
            >
                {expanded ? "Show less" : "Learn more"}
            </button>
        </div>
    );
};

// ===== SERVICE DATA =====
const preWeddingServices = [
    {
        icon: "💐",
        title: "Floral Design",
        shortDesc: "Bespoke arrangements for every ceremony moment.",
        details: ["Bridal bouquet & accessories", "Aisle petals & floral arches", "Mandap/chuppah decor", "Floral installations"],
    },
    {
        icon: "🕯️",
        title: "Ceremony Setup",
        shortDesc: "Complete altar, seating, and aisle decoration.",
        details: ["Altar/mandap design", "Aisle runners & petals", "Ceremony seating decor", "Sacred fire pit (if applicable)"],
    },
    {
        icon: "📜",
        title: "Stationery Suite",
        shortDesc: "Elegant invites, programs, and signage.",
        details: ["Invitation design", "Ceremony programs", "Place cards & menus", "Welcome signage"],
    },
];

const receptionServices = [
    {
        icon: "🍽️",
        title: "Table Settings",
        shortDesc: "Luxury tableware, linens, and centrepieces.",
        details: ["Premium dinnerware & glassware", "Linen & napkin selection", "Centerpiece design", "Charger plates & flatware"],
    },
    {
        icon: "🪑",
        title: "Furniture Rental",
        shortDesc: "Curated seating, lounges, and specialty furniture.",
        details: ["Chiavari chairs & cushions", "Lounge sofas & coffee tables", "Bar stools & high tops", "Thrones for newlyweds"],
    },
    {
        icon: "💡",
        title: "Lighting Design",
        shortDesc: "Ambient, accent, and dramatic lighting.",
        details: ["Chandeliers & pendant lights", "Uplighting & wash lights", "String lights & fairy lights", "Pinspotting for centerpieces"],
    },
];

const decorServices = [
    {
        icon: "🌸",
        title: "Floral Installations",
        shortDesc: "Large-scale floral art and hanging pieces.",
        details: ["Hanging floral clouds", "Flooded tablescapes", "Floral walls & backdrops", "Boutonnières & corsages"],
    },
    {
        icon: "🖼️",
        title: "Backdrops & Draping",
        shortDesc: "Stunning backdrops for ceremonies, head tables, and photo areas.",
        details: ["Ceremony arch/backdrop", "Head table draping", "Photo booth backdrop", "Pipe & drape room division"],
    },
    {
        icon: "🕯️",
        title: "Candlelight & Ambiance",
        shortDesc: "Candles, lanterns, and atmospheric elements.",
        details: ["Pillar candles & votives", "Hanging lanterns", "Candelabras", "LED candles for safety"],
    },
];

const logisticsServices = [
    {
        icon: "📋",
        title: "Full Coordination",
        shortDesc: "End-to-end planning and vendor management.",
        details: ["Timeline creation", "Vendor coordination", "Rehearsal direction", "On-site management"],
    },
    {
        icon: "🚚",
        title: "Logistics & Setup",
        shortDesc: "Delivery, installation, and teardown.",
        details: ["Venue load-in/out", "Installation team", "Rental returns", "Emergency backup plans"],
    },
    {
        icon: "🎵",
        title: "Audio/Visual",
        shortDesc: "Sound systems, microphones, and screens.",
        details: ["Wireless microphone system", "Speaker setup", "Projector & screen", "Ambient music coordination"],
    },
];

const faqs = [
    {
        question: "What does 'A to Z' service actually include?",
        answer: "Everything related to decoration and design. From initial consultation, mood boards, and design concepts to sourcing, installation, and teardown. We handle floral, furniture, lighting, signage, tableware, draping, and coordination with your venue and other vendors. You only need to bring your vision.",
    },
    {
        question: "Do you work with a specific budget?",
        answer: "Absolutely. We create bespoke designs for every budget. During our consultation, we'll discuss your vision and budget, and we'll propose a design that maximizes impact within your range.",
    },
    {
        question: "How far in advance should we book?",
        answer: "For peak wedding season (Oct–Mar), we recommend booking 9–12 months in advance. For other times, 6 months is usually sufficient. However, we occasionally accommodate last‑minute requests—please inquire.",
    },
    {
        question: "Can you incorporate our cultural or religious traditions?",
        answer: "Yes, we specialize in multicultural weddings. Our team has experience with Hindu, Sikh, Christian, Muslim, and fusion ceremonies. We'll work closely with you to honor your traditions with appropriate decor.",
    },
    {
        question: "Do you provide your own furniture and props?",
        answer: "We have an extensive inventory of luxury furniture, decor, and props. For unique requests, we also source from premium vendors worldwide. All items are maintained to the highest standard.",
    },
];

export default ServicePage;
import React, { useState, useEffect, useRef } from "react";
import '../index.css'

// ===== PORTFOLIO DATA =====
const portfolioItems = [
    {
        id: 1,
        title: "Royal Garden Affair",
        category: "Wedding",
        subcategory: "Garden",
        location: "Udaipur, India",
        description: "A lavish garden wedding with cascading florals and crystal chandeliers suspended from ancient banyan trees.",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "December 2025",
        clients: "Priya & Rajeev Mehta",
    },
    {
        id: 2,
        title: "Grand Ballroom Elegance",
        category: "Wedding",
        subcategory: "Ballroom",
        location: "Mumbai, India",
        description: "Opulent ballroom transformation with draped ceilings, majestic floral installations, and ambient candlelight.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "November 2025",
        clients: "Ananya & Vikram Singh",
    },
    {
        id: 3,
        title: "Bohemian Beach Vows",
        category: "Wedding",
        subcategory: "Beach",
        location: "Goa, India",
        description: "Effortless bohemian style with driftwood arches, macrame details, and sunset-hued florals along the shoreline.",
        image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "February 2026",
        clients: "Zara & Arjun Kapoor",
    },
    {
        id: 4,
        title: "Temple Heritage Fusion",
        category: "Wedding",
        subcategory: "Traditional",
        location: "Jaipur, India",
        description: "Rich marigold tones, traditional motifs, and intricate rangoli blended with modern minimalist elements.",
        image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "October 2025",
        clients: "Divya & Rohan Sharma",
    },
    {
        id: 5,
        title: "Modern Minimalist Luxe",
        category: "Event",
        subcategory: "Corporate",
        location: "Bangalore, India",
        description: "Sleek lines, monochromatic palette, and sculptural floral art for a high-profile product launch.",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "September 2025",
        clients: "TechVista Corp",
    },
    {
        id: 6,
        title: "Intimate Garden Soiree",
        category: "Event",
        subcategory: "Anniversary",
        location: "Pune, India",
        description: "Romantic dinner setup under fairy lights with lush greenery and personalized details.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "August 2025",
        clients: "Mr. & Mrs. Desai",
    },
    {
        id: 7,
        title: "Royal Reception",
        category: "Wedding",
        subcategory: "Reception",
        location: "Delhi, India",
        description: "Gold and ivory reception with grand chandeliers, draped ceilings, and lush floral centerpieces.",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "July 2025",
        clients: "Neha & Karan Malhotra",
    },
    {
        id: 8,
        title: "Sangeet Night Glam",
        category: "Event",
        subcategory: "Sangeet",
        location: "Ahmedabad, India",
        description: "Vibrant, energetic decor for the pre-wedding celebration with colorful drapes and dynamic lighting.",
        image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        date: "June 2025",
        clients: "Meera & Aditya Patel",
    },
];

// ===== CATEGORIES FOR FILTER =====
const categories = [
    { id: "all", label: "All Work", count: portfolioItems.length },
    { id: "Wedding", label: "Weddings", count: portfolioItems.filter(item => item.category === "Wedding").length },
    { id: "Event", label: "Events", count: portfolioItems.filter(item => item.category === "Event").length },
];

const subcategories = [
    { id: "all", label: "All Types", parent: "all" },
    { id: "Garden", label: "Garden", parent: "Wedding" },
    { id: "Ballroom", label: "Ballroom", parent: "Wedding" },
    { id: "Beach", label: "Beach", parent: "Wedding" },
    { id: "Traditional", label: "Traditional", parent: "Wedding" },
    { id: "Reception", label: "Reception", parent: "Wedding" },
    { id: "Corporate", label: "Corporate", parent: "Event" },
    { id: "Anniversary", label: "Anniversary", parent: "Event" },
    { id: "Sangeet", label: "Sangeet", parent: "Event" },
];

const Portfolio = () => {
    const [filter, setFilter] = useState("all");
    const [subFilter, setSubFilter] = useState("all");
    const [visibleItems, setVisibleItems] = useState(6);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilterCount, setActiveFilterCount] = useState(0);
    const galleryRef = useRef(null);
    const filterPanelRef = useRef(null);

    // Calculate active filter count
    useEffect(() => {
        let count = 0;
        if (filter !== "all") count++;
        if (subFilter !== "all") count++;
        if (searchTerm) count++;
        setActiveFilterCount(count);
    }, [filter, subFilter, searchTerm]);

    // Filter items based on category, subcategory, and search
    const filteredItems = portfolioItems.filter((item) => {
        const matchesCategory = filter === "all" || item.category === filter;
        const matchesSubCategory = subFilter === "all" || item.subcategory === subFilter;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSubCategory && matchesSearch;
    });

    // Get current items to display (pagination)
    const currentItems = filteredItems.slice(0, visibleItems);
    const hasMore = visibleItems < filteredItems.length;

    // Load more items
    const loadMore = () => {
        setLoading(true);
        // Simulate loading delay
        setTimeout(() => {
            setVisibleItems((prev) => Math.min(prev + 3, filteredItems.length));
            setLoading(false);
        }, 600);
    };

    // Reset pagination when filters change
    useEffect(() => {
        setVisibleItems(6);
    }, [filter, subFilter, searchTerm]);

    // Handle modal close with escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setSelectedItem(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedItem]);

    // Handle click outside to close filter panel (for mobile)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterPanelRef.current && !filterPanelRef.current.contains(event.target) &&
                !event.target.closest('.filter-button')) {
                setShowFilters(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Clear all filters
    const clearFilters = () => {
        setFilter("all");
        setSubFilter("all");
        setSearchTerm("");
    };

    return (
        <div className="font-serif text-gray-800 antialiased bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-amber-800 to-amber-600 overflow-hidden">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                    <p className="text-amber-200 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeIn">
                        Our Masterpieces
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 text-white animate-slideUp">
                        Portfolio of Elegance
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-300 mx-auto my-4 sm:my-5 lg:my-6 animate-scaleIn"></div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto animate-fadeIn delay-200 px-4">
                        Explore our curated collection of luxury weddings and events, each telling a unique story through design.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-amber-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-amber-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            </section>

            {/* ===== FLOATING FILTER BUTTON ===== */}
            <div className="sticky top-16 md:top-20 lg:top-24 z-40 flex justify-center -mt-4 mb-2 sm:mb-3 lg:mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="filter-button relative bg-amber-700 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full shadow-lg hover:bg-amber-800 transition-all duration-300 flex items-center space-x-1.5 sm:space-x-2 group text-sm sm:text-base"
                >
                    <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span className="font-medium">Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 bg-red-500 text-white text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center animate-pulse">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </div>

            {/* ===== FILTER SECTION (Slide Down Panel) ===== */}
            <div
                ref={filterPanelRef}
                className={`container mx-auto px-4 sm:px-6 transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-[600px] sm:max-h-[500px] md:max-h-[450px] opacity-100 mb-6 sm:mb-8' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 border border-amber-100">
                    {/* Active Filters Summary */}
                    {activeFilterCount > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200 gap-2 sm:gap-0">
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                <span className="text-xs sm:text-sm text-gray-600">Active filters:</span>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2">
                                    {filter !== "all" && (
                                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs flex items-center">
                                            {categories.find(c => c.id === filter)?.label || filter}
                                            <button
                                                onClick={() => setFilter("all")}
                                                className="ml-1.5 hover:text-amber-900 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )}
                                    {subFilter !== "all" && (
                                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs flex items-center">
                                            {subcategories.find(s => s.id === subFilter)?.label || subFilter}
                                            <button
                                                onClick={() => setSubFilter("all")}
                                                className="ml-1.5 hover:text-amber-900 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )}
                                    {searchTerm && (
                                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs flex items-center">
                                            "{searchTerm.length > 10 ? searchTerm.substring(0, 10) + '...' : searchTerm}"
                                            <button
                                                onClick={() => setSearchTerm("")}
                                                className="ml-1.5 hover:text-amber-900 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="text-xs sm:text-sm text-red-600 hover:text-red-800 transition"
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-4 sm:mb-5 lg:mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name, location, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 sm:px-5 py-2 sm:py-2.5 lg:py-3 pl-10 sm:pl-12 text-sm sm:text-base border border-gray-200 rounded-full focus:outline-none focus:border-amber-700 transition"
                            />
                            <svg
                                className="absolute left-3 sm:left-4 top-2 sm:top-3 lg:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 sm:right-4 top-2 sm:top-3 lg:top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setFilter(cat.id);
                                    setSubFilter("all");
                                }}
                                className={`relative px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 group ${filter === cat.id
                                    ? "text-amber-700"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                {cat.label}
                                <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs text-gray-400">({cat.count})</span>
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${filter === cat.id ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                ></span>
                            </button>
                        ))}
                    </div>

                    {/* Subcategory Filters (only show when a category is selected) */}
                    {filter !== "all" && (
                        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 animate-fadeIn">
                            <button
                                onClick={() => setSubFilter("all")}
                                className={`px-3 sm:px-4 py-1 text-xs rounded-full transition-all duration-300 ${subFilter === "all"
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                All {filter}
                            </button>
                            {subcategories
                                .filter((sub) => sub.parent === filter)
                                .map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setSubFilter(sub.id)}
                                        className={`px-3 sm:px-4 py-1 text-xs rounded-full transition-all duration-300 ${subFilter === sub.id
                                            ? "bg-amber-700 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {sub.label}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ===== PORTFOLIO GRID ===== */}
            <section className="py-6 sm:py-7 lg:py-8" ref={galleryRef}>
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Results count */}
                    <div className="text-center mb-6 sm:mb-7 lg:mb-8 text-xs sm:text-sm text-gray-500 animate-fadeIn">
                        Showing {currentItems.length} of {filteredItems.length} projects
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                        {currentItems.map((item, index) => (
                            <PortfolioCard
                                key={item.id}
                                item={item}
                                index={index}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="text-center mt-8 sm:mt-10 lg:mt-12 xl:mt-16">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="group relative inline-flex items-center px-6 sm:px-7 lg:px-8 py-2.5 sm:py-3 bg-transparent border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition-all duration-300 overflow-hidden rounded-full text-sm sm:text-base"
                            >
                                <span className="relative z-10 flex items-center">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-amber-700" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Load More
                                            <svg
                                                className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    )}

                    {/* No results */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <p className="text-gray-400 text-base sm:text-lg">No projects match your criteria.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-3 sm:mt-4 text-amber-600 hover:text-amber-500 hover:underline text-sm sm:text-base"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 text-center">
                        <StatCard number="150+" label="Weddings Designed" icon="🩷" delay="0" />
                        <StatCard number="15+" label="Years Experience" icon="🪷" delay="200" />
                        <StatCard number="25+" label="Luxury Venues" icon="🐦‍🔥" delay="400" />
                        <StatCard number="1000+" label="Happy Couples" icon="🫶🏻" delay="600" />
                    </div>
                </div>
            </section>

            {/* ===== MODAL ===== */}
            {selectedItem && (
                <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
};

// ===== PORTFOLIO CARD COMPONENT =====
const PortfolioCard = ({ item, index, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fadeInUp");
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer opacity-0"
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Image */}
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"
                        }`}
                    loading="lazy"
                />

                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 xl:p-6 text-white transform translate-y-0 transition-transform duration-500">
                        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-300 mb-1 sm:mb-2">
                            {item.location} • {item.date}
                        </p>
                        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-serif mb-1 sm:mb-2 line-clamp-1">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center text-amber-300 text-[10px] sm:text-xs">
                            <span>Click to view gallery</span>
                            <svg
                                className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider shadow-lg">
                    {item.subcategory}
                </div>
            </div>

            {/* Title (visible when not hovered) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 lg:p-4">
                <h3 className="text-white text-xs sm:text-sm lg:text-base font-serif line-clamp-1">{item.title}</h3>
            </div>
        </div>
    );
};

// ===== STAT CARD COMPONENT =====
const StatCard = ({ number, label, icon, delay }) => {
    const [count, setCount] = useState(0);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate number counting
                        let start = 0;
                        const end = parseInt(number.replace(/[^0-9]/g, ""));
                        const duration = 2000;
                        const increment = end / (duration / 16);

                        const timer = setInterval(() => {
                            start += increment;
                            if (start >= end) {
                                setCount(end);
                                clearInterval(timer);
                            } else {
                                setCount(Math.floor(start));
                            }
                        }, 16);

                        return () => clearInterval(timer);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [number]);

    return (
        <div
            ref={cardRef}
            className="text-center transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 animate-bounce-slow">{icon}</div>
            <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif text-amber-600 mb-1 sm:mb-2">
                {count}+
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">{label}</div>
        </div>
    );
};

// ===== PORTFOLIO MODAL COMPONENT =====
const PortfolioModal = ({ item, onClose }) => {
    const [currentImage, setCurrentImage] = useState(0);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setCurrentImage((prev) => (prev > 0 ? prev - 1 : item.gallery.length - 1));
            } else if (e.key === 'ArrowRight') {
                setCurrentImage((prev) => (prev < item.gallery.length - 1 ? prev + 1 : 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [item.gallery.length]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md animate-fadeIn"></div>

            {/* Modal Content */}
            <div
                className="relative bg-gray-900 rounded-lg lg:rounded-xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scaleIn border border-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors flex items-center justify-center backdrop-blur-sm border border-gray-700"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Gallery */}
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] bg-black">
                    <img
                        src={item.gallery[currentImage] || item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                    />

                    {/* Gallery Navigation */}
                    {item.gallery.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImage((prev) => (prev > 0 ? prev - 1 : item.gallery.length - 1));
                                }}
                                className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors flex items-center justify-center backdrop-blur-sm border border-gray-700 text-lg sm:text-xl"
                            >
                                ←
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImage((prev) => (prev < item.gallery.length - 1 ? prev + 1 : 0));
                                }}
                                className="absolute right-2 sm:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors flex items-center justify-center backdrop-blur-sm border border-gray-700 text-lg sm:text-xl"
                            >
                                →
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 bg-black/70 text-white px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-gray-700">
                        {currentImage + 1} / {item.gallery.length}
                    </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 lg:p-6 xl:p-8 bg-gray-900">
                    <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 lg:mb-6">
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-amber-900/50 text-amber-300 rounded-full text-xs sm:text-sm border border-amber-800">
                            {item.category}
                        </span>
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700">
                            {item.subcategory}
                        </span>
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700">
                            {item.location}
                        </span>
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700">
                            {item.date}
                        </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif mb-2 sm:mb-3 lg:mb-4 text-white">{item.title}</h2>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-5 lg:mb-6">{item.description}</p>

                    <div className="border-t border-gray-800 pt-4 sm:pt-5 lg:pt-6">
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Client</p>
                        <p className="text-base sm:text-lg lg:text-xl font-medium text-white">{item.clients}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;

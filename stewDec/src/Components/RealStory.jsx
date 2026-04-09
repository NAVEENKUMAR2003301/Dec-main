import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ===== REAL WEDDING STORIES DATA =====
const weddingStories = [
    {
        id: 1,
        title: "A Royal Affair in Udaipur",
        couple: "Priya & Rajeev Mehta",
        date: "December 15, 2025",
        location: "The Oberoi Udaivilas, Udaipur",
        category: "Palace Wedding",
        tags: ["Hindu Wedding", "Destination", "Luxury", "Royal Theme"],
        budget: "₹85L",
        guests: 450,
        story: "When Priya and Rajeev first walked into our studio, they had a dream of a wedding that would blend traditional Rajasthani grandeur with modern elegance. The result was a three-day celebration that transported their 450 guests to a world of royalty. From the moment guests arrived by boat to the palace, to the final farewell under a canopy of fireworks, every detail was meticulously crafted to tell their love story.",
        challenge: "The couple wanted to incorporate traditional rituals while creating unique, Instagram-worthy moments. The palace's heritage structure required careful planning to ensure modern setups didn't damage the historical architecture.",
        solution: "We designed freestanding structures that complemented the palace's architecture. A floating mandap on the lake, illuminated by thousands of diyas, became the ceremony's centerpiece. For the reception, we created a modern glass enclosure in the courtyard, allowing guests to enjoy the palace views while protected from December chill.",
        testimonial: {
            quote: "StewDec didn't just decorate our wedding—they painted our love story. Every guest was left speechless by the beauty and attention to detail. The team worked seamlessly with the palace staff and made our dream a reality.",
            image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        images: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "Floating mandap on the lake with 5,000+ diyas",
            "Custom-designed bridal entry via palanquin",
            "Crystal chandelier installation in the ballroom",
            "Live painting station as wedding favors",
        ],
        vendors: [
            { name: "Photography", vendor: "Memories by Manoj" },
            { name: "Catering", vendor: "The Oberoi Catering" },
            { name: "Music", vendor: "Rhythm House Band" },
        ],
    },
    {
        id: 2,
        title: "Bohemian Beach Paradise",
        couple: "Ananya & Vikram Singh",
        date: "November 5, 2025",
        location: "Taj Fort Aguada, Goa",
        category: "Beach Wedding",
        tags: ["Bohemian", "Beach", "Intimate", "Sunset Ceremony"],
        budget: "₹45L",
        guests: 120,
        story: "Ananya and Vikram wanted an intimate, bohemian celebration that captured the free-spirited essence of Goa. With 120 of their closest friends and family, they exchanged vows as the sun set over the Arabian Sea. The decor featured driftwood arches, macrame details, and a color palette of sunset hues—terracotta, blush, and gold.",
        challenge: "The beach location posed challenges with wind and tide. Traditional floral arrangements and lightweight decor needed special consideration.",
        solution: "We used weighted bases for all structures, secured florals with marine-grade wire, and created a wind-resistant setup. The aisle was lined with anchored lanterns, and the mandap was positioned at an angle to capture the perfect sunset backdrop while protecting guests from sea breeze.",
        testimonial: {
            quote: "Our beach wedding was everything we dreamed of and more. The team handled all the challenges of an outdoor venue perfectly. Our guests are still talking about the sunset ceremony!",
            image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        images: [
            "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "Sunset ceremony on private beach",
            "Driftwood mandap with macrame draping",
            "Live acoustic music during cocktail hour",
            "Bonfire with s'mores station for after-party",
        ],
        vendors: [
            { name: "Photography", vendor: "Goa Lens" },
            { name: "Catering", vendor: "Sea Salt Kitchen" },
            { name: "Music", vendor: "Acoustic Strings" },
        ],
    },
    {
        id: 3,
        title: "Grand Ballroom Extravaganza",
        couple: "Neha & Karan Malhotra",
        date: "October 20, 2025",
        location: "Taj Mahal Palace, Mumbai",
        category: "Ballroom Wedding",
        tags: ["Modern", "Glamorous", "Big Fat Wedding", "Celebrity"],
        budget: "₹1.2Cr",
        guests: 800,
        story: "Neha and Karan's wedding was the social event of the season. With 800 guests including Bollywood celebrities and business tycoons, the pressure was on to deliver something spectacular. The theme was 'Old Hollywood Glamour' with a modern twist—crystal chandeliers, gold and ivory palette, and dramatic floral installations.",
        challenge: "Working within a listed heritage hotel with strict preservation guidelines while creating a modern, glamorous setup.",
        solution: "We designed freestanding structures that didn't require any drilling or permanent modifications. The ballroom ceiling was transformed with a custom crystal chandelier installation suspended from existing hooks. The stage featured a 30-foot floral wall with integrated LED screens.",
        testimonial: {
            quote: "StewDec understood our vision of a glamorous, unforgettable wedding. They handled the scale and complexity effortlessly. Our wedding was the talk of the town!",
            image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        images: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "Custom crystal chandelier installation",
            "30-foot floral wall with LED integration",
            "Celebrity guest performances",
            "Live painting of key moments",
        ],
        vendors: [
            { name: "Photography", vendor: "Viral Bhayani" },
            { name: "Catering", vendor: "Taj Catering" },
            { name: "Entertainment", vendor: "Fame Events" },
        ],
    },
    {
        id: 4,
        title: "Garden Romance",
        couple: "Riya & Aditya Sharma",
        date: "September 8, 2025",
        location: "The Leela Palace, Bangalore",
        category: "Garden Wedding",
        tags: ["Garden", "Day Wedding", "Pastel", "Intimate"],
        budget: "₹35L",
        guests: 180,
        story: "Riya and Aditya wanted a dreamy garden wedding filled with pastel colors and romantic vibes. The venue's lush lawns were transformed into an enchanted garden with floral archways, hanging installations, and cozy lounge areas for guests.",
        challenge: "Creating an intimate feel in a large garden space while ensuring guest comfort during the day.",
        solution: "We created multiple lounge zones with shaded canopies, mist cooling systems, and plenty of seating. The ceremony area was surrounded by lush greenery and pastel florals, with the reception space under a beautifully draped canopy.",
        testimonial: {
            quote: "Our garden wedding was like a fairytale. The attention to detail was incredible - from the floral arrangements to the lighting. Perfect day!",
            image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        images: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "Pastel floral archways",
            "Hanging floral installations",
            "Cozy lounge areas",
            "Interactive dessert stations",
        ],
        vendors: [
            { name: "Photography", vendor: "Bangalore Weddings" },
            { name: "Catering", vendor: "The Leela" },
            { name: "Florals", vendor: "Petals & Blooms" },
        ],
    },
    {
        id: 5,
        title: "Traditional Temple Wedding",
        couple: "Divya & Rohit Patel",
        date: "August 12, 2025",
        location: "Ahmedabad, Gujarat",
        category: "Traditional Wedding",
        tags: ["Traditional", "Temple", "Cultural", "Family"],
        budget: "₹25L",
        guests: 300,
        story: "Divya and Rohit wanted a traditional Gujarati wedding that honored their culture while adding modern touches. The celebration included all the vibrant rituals - Garba night, Haldi ceremony, and the main wedding in a beautifully decorated hall.",
        challenge: "Balancing traditional requirements with modern aesthetics while ensuring smooth flow for multiple ceremonies.",
        solution: "We created distinct spaces for each ritual with appropriate traditional elements, unified by a consistent color palette of marigold, red, and gold. The mandap featured traditional torans and kalash, while the reception area had modern lounge seating.",
        testimonial: {
            quote: "Perfect blend of tradition and modernity! Our families loved every detail. The team understood our cultural needs perfectly.",
            image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        images: [
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "Traditional mandap with modern twist",
            "Colorful Garba night setup",
            "Haldi ceremony with floral decor",
            "Grand welcome arch",
        ],
        vendors: [
            { name: "Photography", vendor: "Ahmedabad Studio" },
            { name: "Catering", vendor: "Gujarat Kitchen" },
            { name: "Music", vendor: "Dhol Tasha" },
        ],
    },
];

// ===== CATEGORIES =====
const categories = [
    "All",
    "Palace Wedding",
    "Beach Wedding",
    "Ballroom Wedding",
    "Garden Wedding",
    "Traditional Wedding",
];

// ===== BUDGET RANGES =====
const budgetRanges = [
    { label: "All Budgets", min: 0, max: Infinity },
    { label: "Under ₹25L", min: 0, max: 25 },
    { label: "₹25L - ₹50L", min: 25, max: 50 },
    { label: "₹50L - ₹1Cr", min: 50, max: 100 },
    { label: "Above ₹1Cr", min: 100, max: Infinity },
];

const RealStory = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedBudget, setSelectedBudget] = useState(budgetRanges[0]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStory, setSelectedStory] = useState(null);
    const [visibleStories, setVisibleStories] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilterCount, setActiveFilterCount] = useState(0);
    const storiesRef = useRef(null);
    const filterPanelRef = useRef(null);

    // Calculate active filter count
    useEffect(() => {
        let count = 0;
        if (selectedCategory !== "All") count++;
        if (selectedBudget.label !== "All Budgets") count++;
        if (searchTerm) count++;
        setActiveFilterCount(count);
    }, [selectedCategory, selectedBudget, searchTerm]);

    // Filter stories based on category, budget, and search
    const filteredStories = weddingStories.filter((story) => {
        const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
        const budgetValue = parseInt(story.budget.replace(/[₹LCr]/g, ""));
        const matchesBudget = budgetValue >= selectedBudget.min && budgetValue <= selectedBudget.max;
        const matchesSearch =
            story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.couple.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesCategory && matchesBudget && matchesSearch;
    });

    // Get current stories to display
    const currentStories = filteredStories.slice(0, visibleStories);
    const hasMore = visibleStories < filteredStories.length;

    // Load more stories
    const loadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleStories((prev) => Math.min(prev + 3, filteredStories.length));
            setIsLoading(false);
        }, 800);
    };

    // Reset visible stories when filters change
    useEffect(() => {
        setVisibleStories(6);
    }, [selectedCategory, selectedBudget, searchTerm]);

    // Auto-rotate images in modal
    useEffect(() => {
        if (selectedStory) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => (prev + 1) % selectedStory.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [selectedStory]);

    // Clear all filters
    const clearFilters = () => {
        setSelectedCategory("All");
        setSelectedBudget(budgetRanges[0]);
        setSearchTerm("");
    };

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

    return (
        <div className="font-serif bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-800 to-amber-600">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 text-center text-white z-10 py-12 md:py-16 lg:py-20">
                    <p className="text-amber-200 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp">
                        Love Stories We've Crafted
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 animate-fadeInUp delay-200">
                        Real Wedding Stories
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-300 mx-auto my-4 sm:my-6 lg:my-8 animate-scaleIn delay-400"></div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 animate-fadeInUp delay-600">
                        Every wedding is unique. Explore real celebrations we've designed and the love stories behind them.
                    </p>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            </section>

            {/* ===== FLOATING FILTER BUTTON ===== */}
            <div className="sticky top-16 md:top-20 lg:top-24 z-40 flex justify-center -mt-6 mb-4 md:mb-6">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="filter-button relative bg-amber-700 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-lg hover:bg-amber-800 transition-all duration-300 flex items-center space-x-1.5 sm:space-x-2 group text-sm sm:text-base"
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
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border border-amber-100">
                    {/* Active Filters Summary */}
                    {activeFilterCount > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200 gap-2 sm:gap-0">
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                <span className="text-xs sm:text-sm text-gray-600">Active filters:</span>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2">
                                    {selectedCategory !== "All" && (
                                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs flex items-center">
                                            {selectedCategory}
                                            <button
                                                onClick={() => setSelectedCategory("All")}
                                                className="ml-1.5 hover:text-amber-900 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )}
                                    {selectedBudget.label !== "All Budgets" && (
                                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs flex items-center">
                                            {selectedBudget.label}
                                            <button
                                                onClick={() => setSelectedBudget(budgetRanges[0])}
                                                className="ml-1.5 hover:text-amber-900 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )}
                                    {searchTerm && (
                                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs flex items-center">
                                            "{searchTerm.length > 15 ? searchTerm.substring(0, 15) + '...' : searchTerm}"
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
                    <div className="max-w-md mx-auto mb-4 sm:mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by couple, location, or theme..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 sm:px-5 py-2 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base border border-gray-200 rounded-full focus:outline-none focus:border-amber-700 transition"
                            />
                            <svg
                                className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 sm:right-4 top-2.5 sm:top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`relative px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 group ${selectedCategory === category
                                    ? "text-amber-700 font-medium"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                {category}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${selectedCategory === category ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                ></span>
                            </button>
                        ))}
                    </div>

                    {/* Budget Filter */}
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {budgetRanges.map((range) => (
                            <button
                                key={range.label}
                                onClick={() => setSelectedBudget(range)}
                                className={`px-3 sm:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-full transition-all duration-300 ${selectedBudget.label === range.label
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== STORIES GRID ===== */}
            <section className="py-6 sm:py-8" ref={storiesRef}>
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Results Count */}
                    <div className="text-center mb-6 sm:mb-8 text-xs sm:text-sm text-gray-500">
                        Showing {currentStories.length} of {filteredStories.length} wedding stories
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {currentStories.map((story, index) => (
                            <StoryCard
                                key={story.id}
                                story={story}
                                index={index}
                                onClick={() => setSelectedStory(story)}
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
                            <button
                                onClick={loadMore}
                                disabled={isLoading}
                                className="group relative inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition-all duration-300 overflow-hidden rounded-full text-sm sm:text-base"
                            >
                                <span className="relative z-10 flex items-center">
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Load More Stories
                                            <svg className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    )}

                    {/* No Results */}
                    {filteredStories.length === 0 && (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <p className="text-gray-500 text-base sm:text-lg">No wedding stories match your criteria.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-3 sm:mt-4 text-amber-700 hover:underline text-sm sm:text-base"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-amber-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
                        <StatCard number="500+" label="Weddings Designed" icon="💍" delay="0" />
                        <StatCard number="50+" label="Luxury Venues" icon="🏰" delay="200" />
                        <StatCard number="8" label="Countries" icon="🌍" delay="400" />
                        <StatCard number="15+" label="Awards Won" icon="⭐" delay="600" />
                    </div>
                </div>
            </section>

            {/* ===== FEATURED VIDEO SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-2 sm:mb-3 lg:mb-4">Behind the Scenes</h2>
                        <div className="w-16 sm:w-20 lg:w-24 h-px bg-amber-300 mx-auto"></div>
                    </div>

                    <div className="max-w-3xl lg:max-w-4xl mx-auto">
                        <div className="relative group cursor-pointer rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Behind the scenes"
                                className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-amber-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">Watch how we transform venues into magical spaces</p>
                    </div>
                </div>
            </section>

            {/* ===== STORY MODAL ===== */}
            {selectedStory && (
                <StoryModal
                    story={selectedStory}
                    onClose={() => {
                        setSelectedStory(null);
                        setActiveImageIndex(0);
                    }}
                    activeImageIndex={activeImageIndex}
                    setActiveImageIndex={setActiveImageIndex}
                />
            )}
        </div>
    );
};

// ===== STORY CARD COMPONENT =====
const StoryCard = ({ story, index, onClick }) => {
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
            className="group relative bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer opacity-0"
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Image */}
            <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                <img
                    src={story.images[0]}
                    alt={story.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"
                        }`}
                    loading="lazy"
                />

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 bg-amber-700 text-white px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider">
                    {story.category}
                </div>

                {/* Budget Badge */}
                <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
                    {story.budget}
                </div>

                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white">
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2">{story.couple}</h3>
                        <p className="text-xs sm:text-sm text-amber-300 mb-1 sm:mb-2 line-clamp-1">{story.location}</p>
                        <p className="text-xs sm:text-sm mb-2 sm:mb-3 lg:mb-4 line-clamp-2">{story.story.substring(0, 80)}...</p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {story.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                                    {tag}
                                </span>
                            ))}
                            {story.tags.length > 2 && (
                                <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                                    +{story.tags.length - 2}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="p-3 sm:p-4 lg:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-0.5 sm:mb-1">{story.couple}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">{story.date}</p>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{story.title}</p>
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
            <div className="text-xl sm:text-2xl lg:text-3xl font-serif text-amber-700 mb-0.5 sm:mb-1 lg:mb-2">
                {count}+
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-600">{label}</div>
        </div>
    );
};

// ===== STORY MODAL COMPONENT =====
const StoryModal = ({ story, onClose, activeImageIndex, setActiveImageIndex }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"></div>

            {/* Modal Content */}
            <div
                className="relative bg-white rounded-xl lg:rounded-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Gallery */}
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] bg-gray-900">
                    <img
                        src={story.images[activeImageIndex]}
                        alt={story.title}
                        className="w-full h-full object-contain"
                    />

                    {/* Image Navigation */}
                    {story.images.length > 1 && (
                        <>
                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : story.images.length - 1))}
                                className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors text-lg sm:text-xl"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev < story.images.length - 1 ? prev + 1 : 0))}
                                className="absolute right-2 sm:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors text-lg sm:text-xl"
                            >
                                →
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 bg-black/50 text-white px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                        {activeImageIndex + 1} / {story.images.length}
                    </div>
                </div>

                {/* Story Details */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 lg:mb-6">
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm">
                            {story.category}
                        </span>
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm">
                            {story.guests} Guests
                        </span>
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm">
                            {story.budget}
                        </span>
                        <span className="px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm">
                            {story.date}
                        </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif mb-1 sm:mb-2">{story.couple}</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-amber-700 mb-2 sm:mb-3 lg:mb-4">{story.title}</p>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-5 lg:mb-6">{story.location}</p>

                    <div className="prose max-w-none mb-6 sm:mb-7 lg:mb-8">
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-2 sm:mb-3">Their Story</h3>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-700">{story.story}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-7 lg:mb-8">
                        <div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-2 sm:mb-3">The Challenge</h3>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-700">{story.challenge}</p>
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-2 sm:mb-3">Our Solution</h3>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-700">{story.solution}</p>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6 sm:mb-7 lg:mb-8">
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-3 sm:mb-4">Wedding Highlights</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {story.highlights.map((highlight, i) => (
                                <div key={i} className="flex items-center">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 mr-1.5 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-amber-50 p-4 sm:p-5 lg:p-6 rounded-xl mb-6 sm:mb-7 lg:mb-8">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            <img
                                src={story.testimonial.image}
                                alt={story.couple}
                                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover mx-auto sm:mx-0"
                            />
                            <div>
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-amber-700 mb-1 sm:mb-2 mx-auto sm:mx-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-700 italic mb-2 sm:mb-3">"{story.testimonial.quote}"</p>
                                <p className="text-xs sm:text-sm font-medium">{story.couple}</p>
                            </div>
                        </div>
                    </div>

                    {/* Vendors */}
                    <div className="mb-6 sm:mb-7 lg:mb-8">
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-3 sm:mb-4">Featured Vendors</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {story.vendors.map((vendor, i) => (
                                <div key={i} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                    <p className="text-xs sm:text-sm text-gray-500">{vendor.name}</p>
                                    <p className="text-sm sm:text-base font-medium">{vendor.vendor}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 sm:mt-7 lg:mt-8 text-center">
                        <Link
                            to="/consultation"
                            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg transition text-xs sm:text-sm lg:text-base"
                        >
                            Create Your Story
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealStory;
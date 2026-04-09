import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ===== INSPIRATION CATEGORIES =====
const categories = [
    { id: "all", label: "All", icon: "🎯" },
    { id: "theme", label: "Themes", icon: "🎨" },
    { id: "color", label: "Color Palettes", icon: "🌈" },
    { id: "floral", label: "Floral", icon: "🌸" },
    { id: "lighting", label: "Lighting", icon: "💡" },
    { id: "table", label: "Table Settings", icon: "🍽️" },
    { id: "backdrop", label: "Backdrops", icon: "🎭" },
    { id: "furniture", label: "Furniture", icon: "🪑" },
    { id: "cake", label: "Cakes", icon: "🎂" },
    { id: "jewelry", label: "Jewelry", icon: "💍" },
    { id: "mehendi", label: "Mehendi", icon: "🌿" },
    { id: "sangeet", label: "Sangeet", icon: "💃" },
];

// ===== INSPIRATION IMAGES =====
const inspirationImages = [
    // Themes
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "theme",
        title: "Royal Palace Theme",
        tags: ["palace", "royal", "gold", "luxury"],
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "theme",
        title: "Bohemian Beach Theme",
        tags: ["beach", "boho", "driftwood", "macrame"],
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "theme",
        title: "Garden Romance",
        tags: ["garden", "pastel", "floral", "romantic"],
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "theme",
        title: "Modern Minimalist",
        tags: ["modern", "minimal", "sleek", "contemporary"],
    },

    // Color Palettes
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "color",
        title: "Blush & Gold",
        tags: ["blush", "gold", "romantic", "elegant"],
    },
    {
        id: 6,
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "color",
        title: "Marigold & Red",
        tags: ["traditional", "marigold", "red", "vibrant"],
    },
    {
        id: 7,
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "color",
        title: "Pastel Dreams",
        tags: ["pastel", "mint", "lavender", "soft"],
    },
    {
        id: 8,
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "color",
        title: "Midnight Blue & Silver",
        tags: ["blue", "silver", "night", "glamorous"],
    },

    // Floral
    {
        id: 9,
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "floral",
        title: "Cascading Floral Arch",
        tags: ["arch", "cascading", "roses", "greenery"],
    },
    {
        id: 10,
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "floral",
        title: "Table Centerpieces",
        tags: ["centerpiece", "low arrangement", "candles"],
    },
    {
        id: 11,
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "floral",
        title: "Hanging Floral Installation",
        tags: ["hanging", "ceiling", "dramatic"],
    },
    {
        id: 12,
        url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "floral",
        title: "Bridal Bouquet",
        tags: ["bouquet", "bridal", "hand-tied"],
    },

    // Lighting
    {
        id: 13,
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "lighting",
        title: "Crystal Chandeliers",
        tags: ["chandelier", "crystal", "elegant"],
    },
    {
        id: 14,
        url: "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "lighting",
        title: "Fairy Lights Canopy",
        tags: ["fairy lights", "twinkle", "romantic"],
    },
    {
        id: 15,
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "lighting",
        title: "Uplighting Effect",
        tags: ["uplighting", "ambient", "color wash"],
    },
    {
        id: 16,
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "lighting",
        title: "Candlelit Aisle",
        tags: ["candles", "aisle", "intimate"],
    },

    // Table Settings
    {
        id: 17,
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "table",
        title: "Royal Table Setting",
        tags: ["gold", "crystal", "fine dining"],
    },
    {
        id: 18,
        url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "table",
        title: "Rustic Farmhouse Table",
        tags: ["rustic", "wood", "bur lap"],
    },
    {
        id: 19,
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "table",
        title: "Modern Minimalist Table",
        tags: ["minimal", "sleek", "monochrome"],
    },
    {
        id: 20,
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "table",
        title: "Floral Tablescape",
        tags: ["floral", "colorful", "abundant"],
    },

    // Backdrops
    {
        id: 21,
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "backdrop",
        title: "Floral Wall",
        tags: ["floral wall", "photo backdrop", "instagram"],
    },
    {
        id: 22,
        url: "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "backdrop",
        title: "Draped Fabric Backdrop",
        tags: ["fabric", "draping", "elegant"],
    },
    {
        id: 23,
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "backdrop",
        title: "Geometric Metal Backdrop",
        tags: ["geometric", "modern", "metal"],
    },
    {
        id: 24,
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "backdrop",
        title: "Mandala Backdrop",
        tags: ["mandala", "traditional", "intricate"],
    },

    // Furniture
    {
        id: 25,
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "furniture",
        title: "Luxury Lounge",
        tags: ["lounge", "sofa", "coffee table"],
    },
    {
        id: 26,
        url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "furniture",
        title: "Chiavari Chairs",
        tags: ["chiavari", "dining", "elegant"],
    },
    {
        id: 27,
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "furniture",
        title: "Rustic Wooden Bench",
        tags: ["bench", "rustic", "outdoor"],
    },
    {
        id: 28,
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "furniture",
        title: "Throne Chairs",
        tags: ["throne", "royal", "bride groom"],
    },
];

// ===== COLOR PALETTE SUGGESTIONS =====
const colorPalettes = [
    { name: "Royal Gold & Burgundy", colors: ["#B8860B", "#800020", "#F5F5DC", "#2C2C2C"] },
    { name: "Blush & Rose Gold", colors: ["#FFB6C1", "#B76E79", "#FFFFFF", "#D4AF37"] },
    { name: "Sage & Terracotta", colors: ["#9DC183", "#E2725B", "#F5F5F5", "#8B4513"] },
    { name: "Navy & Silver", colors: ["#000080", "#C0C0C0", "#FFFFFF", "#1A1A1A"] },
    { name: "Lavender & Mint", colors: ["#E6E6FA", "#98FB98", "#F0F0F0", "#DDA0DD"] },
    { name: "Marigold & Red", colors: ["#FFA500", "#FF0000", "#FFD700", "#8B4513"] },
];

// ===== THEME SUGGESTIONS =====
const themeSuggestions = [
    { name: "Royal Palace", icon: "👑", description: "Grand, opulent, gold accents" },
    { name: "Bohemian Beach", icon: "🌊", description: "Relaxed, driftwood, macrame" },
    { name: "Garden Romance", icon: "🌹", description: "Floral, pastel, romantic" },
    { name: "Modern Minimalist", icon: "⬜", description: "Clean lines, monochrome" },
    { name: "Traditional Indian", icon: "🕉️", description: "Vibrant, cultural, rich" },
    { name: "Rustic Farmhouse", icon: "🌾", description: "Wood, burlap, natural" },
];

const InspirationBoard = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [boardName, setBoardName] = useState("My Inspiration Board");
    const [boardNotes, setBoardNotes] = useState("");
    const [isEditingBoard, setIsEditingBoard] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareEmail, setShareEmail] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [isSaved, setIsSaved] = useState(false);
    const [relatedImages, setRelatedImages] = useState([]);

    // Filter images based on category, search, and favorites
    const filteredImages = inspirationImages.filter((image) => {
        const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;
        const matchesSearch =
            image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFavorites = showFavoritesOnly ? favorites.includes(image.id) : true;

        return matchesCategory && matchesSearch && matchesFavorites;
    });

    // Toggle favorite
    const toggleFavorite = (imageId, e) => {
        e.stopPropagation();
        setFavorites((prev) =>
            prev.includes(imageId)
                ? prev.filter((id) => id !== imageId)
                : [...prev, imageId]
        );
    };

    // Find related images based on tags
    const findRelatedImages = (image) => {
        const related = inspirationImages
            .filter((img) =>
                img.id !== image.id &&
                img.tags.some(tag => image.tags.includes(tag))
            )
            .slice(0, 4);
        setRelatedImages(related);
    };

    // Handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
        findRelatedImages(image);
    };

    // Save board
    const saveBoard = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    // Share board
    const shareBoard = () => {
        setShowShareModal(true);
    };

    // Get category icon
    const getCategoryIcon = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.icon : "🖼️";
    };

    return (
        <div className="font-serif bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[30vh] sm:min-h-[35vh] md:min-h-[40vh] lg:min-h-[45vh] xl:min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Inspiration board"
                        className="w-full h-full object-cover animate-kenBurns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 text-center text-white z-10 py-8 sm:py-12 md:py-16 lg:py-20">
                    <p className="text-amber-300 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp">
                        Create Your Vision
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 animate-fadeInUp delay-200">
                        Inspiration Board
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-400 mx-auto my-4 sm:my-6 lg:my-8 animate-scaleIn delay-400"></div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 animate-fadeInUp delay-600">
                        Curate your dream wedding by saving and organizing ideas that inspire you
                    </p>
                </div>
            </section>

            {/* ===== BOARD HEADER ===== */}
            <section className="sticky top-16 md:top-20 lg:top-24 bg-white/80 backdrop-blur-md z-40 border-b border-amber-100">
                <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        {/* Board Title */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            {isEditingBoard ? (
                                <input
                                    type="text"
                                    value={boardName}
                                    onChange={(e) => setBoardName(e.target.value)}
                                    onBlur={() => setIsEditingBoard(false)}
                                    onKeyPress={(e) => e.key === "Enter" && setIsEditingBoard(false)}
                                    className="text-lg sm:text-xl lg:text-2xl font-serif border-b-2 border-amber-700 focus:outline-none px-2 w-full sm:w-auto"
                                    autoFocus
                                />
                            ) : (
                                <h2
                                    className="text-lg sm:text-xl lg:text-2xl font-serif cursor-pointer hover:text-amber-700 transition"
                                    onClick={() => setIsEditingBoard(true)}
                                >
                                    {boardName} <span className="text-sm sm:text-base">✏️</span>
                                </h2>
                            )}
                            <span className="text-xs sm:text-sm text-gray-500">
                                {favorites.length} items saved
                            </span>
                        </div>

                        {/* Board Actions */}
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={saveBoard}
                                className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition flex items-center justify-center ${isSaved
                                    ? "bg-green-600 text-white"
                                    : "bg-amber-700 text-white hover:bg-amber-800"
                                    }`}
                            >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                {isSaved ? "Saved!" : "Save"}
                            </button>
                            <button
                                onClick={shareBoard}
                                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-amber-700 text-amber-700 rounded-lg hover:bg-amber-50 transition"
                            >
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Board Notes */}
                    <textarea
                        value={boardNotes}
                        onChange={(e) => setBoardNotes(e.target.value)}
                        placeholder="Add notes about your vision, color preferences, or specific requirements..."
                        className="w-full mt-3 sm:mt-4 p-2 sm:p-3 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-amber-700 resize-none"
                        rows="2"
                    />
                </div>
            </section>

            {/* ===== FILTER SECTION ===== */}
            <section className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-4 sm:mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by theme, color, or style..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 sm:px-5 py-2 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base border border-gray-200 rounded-full focus:outline-none focus:border-amber-700 transition"
                            />
                            <svg
                                className="absolute left-3 sm:left-4 top-2 sm:top-3.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Chips */}
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${selectedCategory === category.id
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                <span className="mr-1 sm:mr-2 text-sm sm:text-base">{category.icon}</span>
                                <span className="hidden xs:inline">{category.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Filter Toggles */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showFavoritesOnly}
                                    onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                    className="mr-2 w-3 h-3 sm:w-4 sm:h-4 accent-amber-700"
                                />
                                <span className="text-xs sm:text-sm">Show saved only</span>
                            </label>
                        </div>

                        {/* View Toggle */}
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 sm:p-2 ${viewMode === "grid" ? "bg-amber-700 text-white" : "bg-white text-gray-600"}`}
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("masonry")}
                                className={`p-1.5 sm:p-2 ${viewMode === "masonry" ? "bg-amber-700 text-white" : "bg-white text-gray-600"}`}
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== INSPIRATION GRID ===== */}
            <section className="py-8 sm:py-10 lg:py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    {filteredImages.length > 0 ? (
                        <div className={viewMode === "grid"
                            ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                            : "columns-1 xs:columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 lg:gap-6"
                        }>
                            {filteredImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${viewMode === "masonry" ? "mb-3 sm:mb-4 lg:mb-6 break-inside-avoid" : ""
                                        }`}
                                    onClick={() => handleImageClick(image)}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 text-white">
                                            <h3 className="text-xs sm:text-sm lg:text-base font-medium mb-0.5 sm:mb-1 line-clamp-1">{image.title}</h3>
                                            <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                                                {image.tags.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="text-[8px] sm:text-[10px] lg:text-xs bg-white/20 px-1 sm:px-2 py-0.5 rounded-full">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {image.tags.length > 2 && (
                                                    <span className="text-[8px] sm:text-[10px] lg:text-xs bg-white/20 px-1 sm:px-2 py-0.5 rounded-full">
                                                        +{image.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/90 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] lg:text-xs">
                                        {getCategoryIcon(image.category)} {image.category}
                                    </div>

                                    {/* Favorite Button */}
                                    <button
                                        onClick={(e) => toggleFavorite(image.id, e)}
                                        className="absolute top-2 sm:top-3 right-2 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition"
                                    >
                                        <svg
                                            className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${favorites.includes(image.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                                            fill={favorites.includes(image.id) ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <p className="text-gray-500 text-sm sm:text-base lg:text-lg">No images found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("all");
                                    setSearchTerm("");
                                    setShowFavoritesOnly(false);
                                }}
                                className="mt-3 sm:mt-4 text-amber-700 hover:underline text-xs sm:text-sm"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== COLOR PALETTE SUGGESTIONS ===== */}
            <section className="py-12 sm:py-14 lg:py-16 bg-amber-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-2xl lg:text-3xl font-serif text-center mb-6 sm:mb-7 lg:mb-8">Popular Color Palettes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {colorPalettes.map((palette, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6 hover:shadow-xl transition cursor-pointer"
                                onClick={() => setSearchTerm(palette.name.split(" ")[0])}
                            >
                                <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3">{palette.name}</h3>
                                <div className="flex space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
                                    {palette.colors.map((color, i) => (
                                        <div
                                            key={i}
                                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white shadow"
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        ></div>
                                    ))}
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">Click to find inspiration</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== THEME SUGGESTIONS ===== */}
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-2xl lg:text-3xl font-serif text-center mb-6 sm:mb-7 lg:mb-8">Popular Wedding Themes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {themeSuggestions.map((theme, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6 hover:shadow-xl transition cursor-pointer border border-amber-100"
                                onClick={() => setSearchTerm(theme.name)}
                            >
                                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">{theme.icon}</div>
                                <h3 className="text-base sm:text-lg lg:text-xl font-medium mb-1 sm:mb-2">{theme.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{theme.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== IMAGE MODAL ===== */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"></div>

                    <div
                        className="relative bg-white rounded-xl lg:rounded-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image */}
                            <div className="md:w-1/2 h-48 sm:h-64 md:h-auto">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.title}
                                    className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                                />
                            </div>

                            {/* Details */}
                            <div className="md:w-1/2 p-4 sm:p-5 lg:p-8">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif">{selectedImage.title}</h2>
                                    <button
                                        onClick={(e) => toggleFavorite(selectedImage.id, e)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition flex-shrink-0 ml-2"
                                    >
                                        <svg
                                            className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${favorites.includes(selectedImage.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                                            fill={favorites.includes(selectedImage.id) ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mb-3 sm:mb-4">
                                    <span className="inline-block bg-amber-100 text-amber-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                                        {getCategoryIcon(selectedImage.category)} {selectedImage.category}
                                    </span>
                                </div>

                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mb-1.5 sm:mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {selectedImage.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-amber-100 transition"
                                                onClick={() => {
                                                    setSearchTerm(tag);
                                                    setSelectedImage(null);
                                                }}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Add to Board */}
                                <button
                                    onClick={() => {
                                        toggleFavorite(selectedImage.id, { stopPropagation: () => { } });
                                    }}
                                    className={`w-full mb-4 sm:mb-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-lg transition ${favorites.includes(selectedImage.id)
                                        ? "bg-red-600 text-white hover:bg-red-700"
                                        : "bg-amber-700 text-white hover:bg-amber-800"
                                        }`}
                                >
                                    {favorites.includes(selectedImage.id)
                                        ? "Remove from Board"
                                        : "Add to Inspiration Board"}
                                </button>

                                {/* Related Images */}
                                {relatedImages.length > 0 && (
                                    <div>
                                        <h3 className="text-sm sm:text-base lg:text-lg font-serif mb-2 sm:mb-3">You May Also Like</h3>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                            {relatedImages.map((img) => (
                                                <img
                                                    key={img.id}
                                                    src={img.url}
                                                    alt={img.title}
                                                    className="w-full h-16 sm:h-20 lg:h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                                                    onClick={() => {
                                                        setSelectedImage(img);
                                                        findRelatedImages(img);
                                                    }}
                                                    loading="lazy"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SHARE MODAL ===== */}
            {showShareModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
                    onClick={() => setShowShareModal(false)}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"></div>

                    <div
                        className="relative bg-white rounded-xl lg:rounded-2xl max-w-md w-full p-5 sm:p-6 lg:p-8 animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl sm:text-2xl font-serif mb-3 sm:mb-4">Share Your Board</h3>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={shareEmail}
                                    onChange={(e) => setShareEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Message (Optional)</label>
                                <textarea
                                    placeholder="Add a personal message..."
                                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="flex gap-2 sm:gap-3">
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="flex-1 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert("Board shared successfully!");
                                        setShowShareModal(false);
                                    }}
                                    className="flex-1 bg-amber-700 text-white py-1.5 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-amber-800 transition"
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InspirationBoard;
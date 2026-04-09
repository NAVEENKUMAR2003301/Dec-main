import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ===== PRICING PACKAGES =====
const basePackages = [
    {
        id: "essential",
        name: "Essential",
        price: 250000,
        description: "Perfect for intimate weddings with basic decoration needs",
        icon: "💐",
        features: [
            "Ceremony backdrop",
            "Bridal bouquet & boutonnières",
            "Table centrepieces (up to 10 tables)",
            "Basic lighting setup",
            "Welcome sign",
            "On-site coordination (4 hours)",
        ],
        color: "bg-blue-50",
        borderColor: "border-blue-200",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
        id: "premium",
        name: "Premium",
        price: 550000,
        description: "Most popular choice for elegant, memorable celebrations",
        icon: "✨",
        features: [
            "Everything in Essential",
            "Luxury floral installations",
            "Premium furniture rental (50 pax)",
            "Chandelier lighting package",
            "Photo booth with custom backdrop",
            "Full event coordination (8 hours)",
            "Custom stationery suite",
        ],
        color: "bg-amber-50",
        borderColor: "border-amber-200",
        buttonColor: "bg-amber-600 hover:bg-amber-700",
        popular: true,
    },
    {
        id: "luxury",
        name: "Luxury",
        price: 1200000,
        description: "Ultimate luxury experience with no compromises",
        icon: "👑",
        features: [
            "Everything in Premium",
            "Imported floral installations",
            "Premium furniture rental (100+ pax)",
            "Custom stage design & build",
            "Crystal chandelier package",
            "Full event coordination (12 hours)",
            "Bespoke stationery suite",
            "VIP lounge setup",
            "Fireworks or drone show",
        ],
        color: "bg-purple-50",
        borderColor: "border-purple-200",
        buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
];

// ===== ADD-ON SERVICES =====
const addOnServices = [
    {
        id: "floral",
        name: "Additional Floral Installation",
        description: "Extra floral arches, hanging installations, or centerpieces",
        price: 50000,
        category: "Floral",
        icon: "🌸",
    },
    {
        id: "lighting",
        name: "Premium Lighting Package",
        description: "Chandeliers, uplighting, and pin spotting",
        price: 75000,
        category: "Lighting",
        icon: "💡",
    },
    {
        id: "furniture",
        name: "Additional Furniture (per 50 pax)",
        description: "Lounge seating, dining tables, chairs",
        price: 85000,
        category: "Furniture",
        icon: "🪑",
    },
    {
        id: "photobooth",
        name: "Photo Booth with Prints",
        description: "Custom backdrop, props, unlimited prints",
        price: 35000,
        category: "Entertainment",
        icon: "📸",
    },
    {
        id: "stage",
        name: "Custom Stage Design",
        description: "Bespoke stage with thematic elements",
        price: 150000,
        category: "Stage",
        icon: "🎭",
    },
    {
        id: "welcome",
        name: "Welcome Gifts for Guests",
        description: "Personalized gifts for all guests (min. 100 pax)",
        price: 40000,
        category: "Gifts",
        icon: "🎁",
    },
    {
        id: "catering",
        name: "Premium Catering (per plate)",
        description: "5-course gourmet meal with beverages",
        price: 3500,
        category: "Catering",
        icon: "🍽️",
        isPerPerson: true,
    },
    {
        id: "dj",
        name: "DJ & Sound System",
        description: "Professional DJ, high-quality sound system",
        price: 60000,
        category: "Entertainment",
        icon: "🎵",
    },
    {
        id: "mehendi",
        name: "Mehendi Setup",
        description: "Traditional Mehendi ceremony decoration",
        price: 45000,
        category: "Ceremony",
        icon: "🌿",
    },
    {
        id: "sangeet",
        name: "Sangeet Stage Setup",
        description: "Vibrant stage for Sangeet ceremony",
        price: 95000,
        category: "Ceremony",
        icon: "💃",
    },
];

// ===== GUEST COUNT MULTIPLIERS =====
const guestMultipliers = [
    { label: "Up to 100 guests", multiplier: 1, value: 100 },
    { label: "101 - 250 guests", multiplier: 1.3, value: 250 },
    { label: "251 - 500 guests", multiplier: 1.6, value: 500 },
    { label: "501 - 1000 guests", multiplier: 2, value: 1000 },
];

// ===== VENUE TYPES =====
const venueTypes = [
    { label: "Hotel Banquet Hall", multiplier: 1 },
    { label: "Palace / Heritage Venue", multiplier: 1.4 },
    { label: "Beach / Outdoor", multiplier: 1.3 },
    { label: "Convention Center", multiplier: 1.1 },
    { label: "Farm / Garden", multiplier: 1.2 },
];

const PriceCalc = () => {
    const [selectedPackage, setSelectedPackage] = useState("premium");
    const [guestCount, setGuestCount] = useState(200);
    const [selectedVenue, setSelectedVenue] = useState(venueTypes[0]);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [customBudget, setCustomBudget] = useState(1000000);
    const [showCustomInput, setShowCustomInput] = useState(false);

    // Calculate package price with guest multiplier
    const getPackagePrice = () => {
        const pkg = basePackages.find((p) => p.id === selectedPackage);
        const guestMultiplier = guestMultipliers.find((g) => guestCount <= g.value)?.multiplier || 2;
        return Math.round(pkg.price * guestMultiplier * selectedVenue.multiplier);
    };

    // Calculate add-ons total
    const getAddOnsTotal = () => {
        return selectedAddOns.reduce((total, addOnId) => {
            const addOn = addOnServices.find((a) => a.id === addOnId);
            if (addOn.isPerPerson) {
                return total + addOn.price * guestCount;
            }
            return total + addOn.price;
        }, 0);
    };

    // Calculate total
    const getTotal = () => {
        return getPackagePrice() + getAddOnsTotal();
    };

    // Toggle add-on selection
    const toggleAddOn = (addOnId) => {
        setSelectedAddOns((prev) =>
            prev.includes(addOnId)
                ? prev.filter((id) => id !== addOnId)
                : [...prev, addOnId]
        );
    };

    // Get package details
    const currentPackage = basePackages.find((p) => p.id === selectedPackage);
    const packagePrice = getPackagePrice();
    const addOnsTotal = getAddOnsTotal();
    const total = getTotal();

    // Format price
    const formatPrice = (price) => {
        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(2)}Cr`;
        }
        if (price >= 100000) {
            return `₹${(price / 100000).toFixed(2)}L`;
        }
        return `₹${price.toLocaleString()}`;
    };

    return (
        <div className="font-serif bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[30vh] sm:min-h-[35vh] md:min-h-[40vh] lg:min-h-[45vh] xl:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-800 to-amber-600">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 text-center text-white z-10 py-12 sm:py-16 md:py-20">
                    <p className="text-amber-200 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp">
                        Transparent Pricing
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 animate-fadeInUp delay-200">
                        Wedding Cost Calculator
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-300 mx-auto my-4 sm:my-6 lg:my-8 animate-scaleIn delay-400"></div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 animate-fadeInUp delay-600">
                        Estimate your wedding decoration costs with our interactive calculator
                    </p>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
            </section>

            {/* ===== CALCULATOR SECTION ===== */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Panel - Calculator */}
                        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                            {/* Package Selection */}
                            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-serif mb-4 lg:mb-6">1. Choose Your Package</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                                    {basePackages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(pkg.id)}
                                            className={`relative p-4 lg:p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedPackage === pkg.id
                                                    ? `${pkg.borderColor} border-2 shadow-lg scale-105`
                                                    : "border-gray-200 hover:border-amber-300"
                                                } ${pkg.color}`}
                                        >
                                            {pkg.popular && (
                                                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                                                    Most Popular
                                                </div>
                                            )}
                                            <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 lg:mb-3">{pkg.icon}</div>
                                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 lg:mb-2">{pkg.name}</h3>
                                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-700 mb-1 lg:mb-2">
                                                {formatPrice(pkg.price)}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-3 lg:mb-4 line-clamp-2">{pkg.description}</p>
                                            <button
                                                className={`w-full py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg text-white transition ${selectedPackage === pkg.id
                                                        ? pkg.buttonColor
                                                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                    }`}
                                            >
                                                {selectedPackage === pkg.id ? "Selected" : "Select"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guest Count */}
                            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-serif mb-4 lg:mb-6">2. Guest Count</h2>
                                <div className="space-y-3 lg:space-y-4">
                                    <input
                                        type="range"
                                        min="50"
                                        max="1000"
                                        step="10"
                                        value={guestCount}
                                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                                        className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                    />
                                    <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                                        <span>50 guests</span>
                                        <span className="text-base sm:text-lg lg:text-xl font-bold text-amber-700">{guestCount} guests</span>
                                        <span>1000+ guests</span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-3 lg:mt-4">
                                        {guestMultipliers.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setGuestCount(option.value)}
                                                className={`py-1.5 sm:py-2 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm rounded-lg border transition ${guestCount <= option.value && guestCount > (option.value - (option === guestMultipliers[0] ? 0 : 150))
                                                        ? "bg-amber-700 text-white border-amber-700"
                                                        : "border-gray-300 hover:border-amber-700 hover:bg-amber-50"
                                                    }`}
                                            >
                                                <span className="hidden sm:inline">{option.label}</span>
                                                <span className="sm:hidden">{option.label.split(' ')[0]} {option.value}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Venue Type */}
                            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-serif mb-4 lg:mb-6">3. Venue Type</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                    {venueTypes.map((venue) => (
                                        <button
                                            key={venue.label}
                                            onClick={() => setSelectedVenue(venue)}
                                            className={`py-2 sm:py-2.5 lg:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm rounded-lg border transition ${selectedVenue.label === venue.label
                                                    ? "bg-amber-700 text-white border-amber-700"
                                                    : "border-gray-300 hover:border-amber-700 hover:bg-amber-50"
                                                }`}
                                        >
                                            <span className="hidden sm:inline">{venue.label}</span>
                                            <span className="sm:hidden">{venue.label.split(' ')[0]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add-ons */}
                            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-serif mb-4 lg:mb-6">4. Add-on Services</h2>
                                <div className="space-y-3 lg:space-y-4">
                                    {addOnServices.map((addOn) => (
                                        <div
                                            key={addOn.id}
                                            onClick={() => toggleAddOn(addOn.id)}
                                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${selectedAddOns.includes(addOn.id)
                                                    ? "border-amber-700 bg-amber-50"
                                                    : "border-gray-200 hover:border-amber-300"
                                                }`}
                                        >
                                            <div className="flex items-center mb-2 sm:mb-0">
                                                <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{addOn.icon}</span>
                                                <div>
                                                    <h3 className="text-sm sm:text-base font-medium">{addOn.name}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">{addOn.description}</p>
                                                    <span className="text-[10px] sm:text-xs text-amber-700 uppercase tracking-wider">
                                                        {addOn.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end sm:space-x-3">
                                                <p className="text-sm sm:text-base lg:text-lg font-bold text-amber-700">
                                                    {formatPrice(addOn.price)}
                                                    {addOn.isPerPerson && (
                                                        <span className="text-[10px] sm:text-xs font-normal text-gray-500 ml-1">/person</span>
                                                    )}
                                                </p>
                                                <div
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${selectedAddOns.includes(addOn.id)
                                                            ? "bg-amber-700 border-amber-700"
                                                            : "border-gray-400"
                                                        }`}
                                                >
                                                    {selectedAddOns.includes(addOn.id) && (
                                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 lg:top-24 bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-serif mb-4 lg:mb-6">Your Estimate</h2>

                                {/* Package Summary */}
                                <div className="mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center mb-1.5 lg:mb-2 text-xs sm:text-sm">
                                        <span className="text-gray-600">Package:</span>
                                        <span className="font-medium">{currentPackage.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1.5 lg:mb-2 text-xs sm:text-sm">
                                        <span className="text-gray-600">Base Price:</span>
                                        <span>{formatPrice(currentPackage.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1.5 lg:mb-2 text-xs sm:text-sm">
                                        <span className="text-gray-600">Guest Count:</span>
                                        <span>{guestCount}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1.5 lg:mb-2 text-xs sm:text-sm">
                                        <span className="text-gray-600">Venue Factor:</span>
                                        <span>{selectedVenue.multiplier}x</span>
                                    </div>
                                    <div className="flex justify-between items-center font-medium mt-2 lg:mt-4 text-sm sm:text-base">
                                        <span>Package Total:</span>
                                        <span className="text-base sm:text-lg lg:text-xl text-amber-700">{formatPrice(packagePrice)}</span>
                                    </div>
                                </div>

                                {/* Add-ons Summary */}
                                {selectedAddOns.length > 0 && (
                                    <div className="mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-gray-200">
                                        <h3 className="font-medium mb-2 lg:mb-3 text-sm sm:text-base">Selected Add-ons:</h3>
                                        {selectedAddOns.map((addOnId) => {
                                            const addOn = addOnServices.find((a) => a.id === addOnId);
                                            return (
                                                <div key={addOnId} className="flex justify-between items-center mb-1.5 lg:mb-2 text-xs sm:text-sm">
                                                    <span className="text-gray-600 truncate max-w-[150px] sm:max-w-[180px]">{addOn.name}</span>
                                                    <span className="ml-2">
                                                        {formatPrice(addOn.isPerPerson ? addOn.price * guestCount : addOn.price)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                        <div className="flex justify-between items-center font-medium mt-2 lg:mt-4 text-sm sm:text-base">
                                            <span>Add-ons Total:</span>
                                            <span className="text-amber-700">{formatPrice(addOnsTotal)}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Grand Total */}
                                <div className="mb-4 lg:mb-6">
                                    <div className="flex justify-between items-center text-base sm:text-lg lg:text-2xl font-serif">
                                        <span>Total:</span>
                                        <span className="text-amber-700">{formatPrice(total)}</span>
                                    </div>
                                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 lg:mt-2">
                                        *Estimate only
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <button
                                    onClick={() => setShowBreakdown(!showBreakdown)}
                                    className="w-full mb-2 lg:mb-3 py-2 lg:py-3 text-xs sm:text-sm border border-amber-700 text-amber-700 rounded-lg hover:bg-amber-50 transition"
                                >
                                    {showBreakdown ? "Hide" : "Show"} Breakdown
                                </button>

                                <Link
                                    to="/consultation"
                                    className="block w-full bg-amber-700 hover:bg-amber-800 text-white text-center py-2 lg:py-3 text-xs sm:text-sm rounded-lg transition"
                                >
                                    Book Consultation
                                </Link>

                                <button
                                    onClick={() => setShowCustomInput(!showCustomInput)}
                                    className="w-full mt-2 lg:mt-3 text-xs sm:text-sm text-gray-500 hover:text-amber-700 transition"
                                >
                                    Have a budget?
                                </button>

                                {showCustomInput && (
                                    <div className="mt-3 lg:mt-4">
                                        <input
                                            type="number"
                                            value={customBudget}
                                            onChange={(e) => setCustomBudget(parseInt(e.target.value))}
                                            className="w-full px-3 lg:px-4 py-1.5 lg:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700"
                                            placeholder="Enter your budget"
                                        />
                                        <p className="text-xs sm:text-sm mt-1.5 lg:mt-2">
                                            {total <= customBudget ? (
                                                <span className="text-green-600">✓ Within budget</span>
                                            ) : (
                                                <span className="text-red-600">✗ Over by {formatPrice(total - customBudget)}</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Detailed Breakdown Modal */}
                    {showBreakdown && (
                        <div className="mt-6 lg:mt-8 bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 animate-fadeIn">
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-3 lg:mb-4">Detailed Cost Breakdown</h3>
                            <div className="space-y-3 lg:space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2 text-sm sm:text-base">{currentPackage.name} Package</h4>
                                    <ul className="space-y-1.5 lg:space-y-2 text-xs sm:text-sm text-gray-600 pl-3 lg:pl-4">
                                        {currentPackage.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-amber-700 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {selectedAddOns.length > 0 && (
                                    <div>
                                        <h4 className="font-medium mb-2 text-sm sm:text-base">Selected Add-ons</h4>
                                        <ul className="space-y-1.5 lg:space-y-2 text-xs sm:text-sm text-gray-600 pl-3 lg:pl-4">
                                            {selectedAddOns.map((addOnId) => {
                                                const addOn = addOnServices.find((a) => a.id === addOnId);
                                                return (
                                                    <li key={addOnId} className="flex items-start">
                                                        <svg className="w-3 h-3 lg:w-4 lg:h-4 text-amber-700 mr-1.5 lg:mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                        <span>{addOn.name} - {formatPrice(addOn.isPerPerson ? addOn.price * guestCount : addOn.price)}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                <div className="pt-3 lg:pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span>Subtotal:</span>
                                        <span>{formatPrice(packagePrice + addOnsTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span>GST (18%):</span>
                                        <span>{formatPrice((packagePrice + addOnsTotal) * 0.18)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 text-sm sm:text-base">
                                        <span>Total (incl. GST):</span>
                                        <span className="text-amber-700">{formatPrice((packagePrice + addOnsTotal) * 1.18)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== PACKAGE COMPARISON ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-amber-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-8 sm:mb-10 lg:mb-12">Compare Packages</h2>

                    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                        <table className="min-w-[600px] sm:w-full bg-white rounded-xl lg:rounded-2xl shadow-lg">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="p-3 sm:p-4 lg:p-6 text-left text-xs sm:text-sm">Features</th>
                                    {basePackages.map((pkg) => (
                                        <th key={pkg.id} className="p-3 sm:p-4 lg:p-6 text-center">
                                            <div className={`inline-block px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg ${pkg.color}`}>
                                                <span className="text-lg sm:text-xl lg:text-2xl mr-1 sm:mr-2">{pkg.icon}</span>
                                                <span className="text-xs sm:text-sm font-serif">{pkg.name}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {basePackages[0].features.map((feature, index) => (
                                    <tr key={index} className="border-b border-gray-100">
                                        <td className="p-2 sm:p-3 lg:p-4 text-xs sm:text-sm font-medium">{feature}</td>
                                        {basePackages.map((pkg) => (
                                            <td key={pkg.id} className="p-2 sm:p-3 lg:p-4 text-center">
                                                {pkg.features.includes(feature) ? (
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="bg-gray-50">
                                    <td className="p-2 sm:p-3 lg:p-4 text-xs sm:text-sm font-medium">Starting Price</td>
                                    {basePackages.map((pkg) => (
                                        <td key={pkg.id} className="p-2 sm:p-3 lg:p-4 text-center font-bold text-amber-700 text-xs sm:text-sm">
                                            {formatPrice(pkg.price)}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-8 sm:mb-10 lg:mb-12">Pricing FAQs</h2>

                    <div className="space-y-3 sm:space-y-4">
                        {[
                            {
                                q: "What's included in the package price?",
                                a: "Each package includes the core services listed in the features. Additional services can be added as add-ons. The final price is calculated based on your guest count, venue type, and selected add-ons.",
                            },
                            {
                                q: "Do you offer customized packages?",
                                a: "Yes! We specialize in creating bespoke packages tailored to your specific needs and budget. Contact us for a personalized quote.",
                            },
                            {
                                q: "Is GST included in the prices?",
                                a: "The prices shown are exclusive of GST. 18% GST will be applied to the final bill as per government regulations.",
                            },
                            {
                                q: "Do you offer payment plans?",
                                a: "Yes, we offer flexible payment plans. Typically, we require 30% advance to block your date, with the remaining amount payable in installments leading up to your wedding.",
                            },
                            {
                                q: "What if my guest count changes?",
                                a: "We understand guest lists can change. We'll work with you to adjust the pricing accordingly. Final pricing is confirmed 30 days before the event.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-5 lg:p-6">
                                <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-1.5 sm:mb-2">{faq.q}</h3>
                                <p className="text-xs sm:text-sm text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-amber-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-3 sm:mb-4 lg:mb-6">Ready to Start Planning?</h2>
                    <p className="text-sm sm:text-base lg:text-xl text-amber-200 max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4">
                        Get a personalized quote based on your specific requirements
                    </p>
                    <Link
                        to="/consultation"
                        className="inline-block bg-white text-amber-900 hover:bg-amber-100 px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-lg text-sm sm:text-base lg:text-lg transition"
                    >
                        Book Free Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PriceCalc;
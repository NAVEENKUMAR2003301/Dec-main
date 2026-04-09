import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import { submitContactRequest } from "../lib/api";

const inn = "/icons/in.png";
const fa = "/icons/fa.png";
const li = "/icons/li.png";

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon (optional - you can use this for a premium look)
const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// ===== FAQ DATA =====
const faqs = [
    {
        question: "How do I book a consultation?",
        answer: "You can book a consultation by filling out the contact form below, calling us directly, or emailing us. We'll get back to you within 24 hours to schedule a meeting.",
    },
    {
        question: "What is your service area?",
        answer: "We serve clients across India and internationally. Our team has designed weddings in Mumbai, Delhi, Udaipur, Goa, Bangalore, and destinations like Dubai, Thailand, and Italy.",
    },
    {
        question: "How far in advance should I book?",
        answer: "For peak wedding season (October to March), we recommend booking 9-12 months in advance. For other times, 6 months is usually sufficient.",
    },
    {
        question: "Do you offer virtual consultations?",
        answer: "Yes! We offer video consultations for clients who cannot meet in person. We can discuss your vision, share portfolio pieces, and start planning remotely.",
    },
    {
        question: "What is your pricing structure?",
        answer: "Our pricing is customized based on your specific requirements. We offer flexible packages ranging from partial decoration to full-service A-to-Z wedding design.",
    },
];

// ===== OFFICE LOCATIONS =====
const offices = [
    {
        city: "Trichy",
        address: "15, Pali Hill Road, Bandra West, Trichy",
        phone: "+91 22 1234 5678",
        email: "Trichy@stewdec.com",
        hours: "Mon-Sat: 10am - 7pm",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUW0ktQMBplQn-ArwIq-S6hKxfdt_neqCQKg&s",
        coordinates: [10.7905, 78.7047], // Trichy coordinates
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Trichy,Tamil+Nadu"
    },
    {
        city: "Karur",
        address: "42, Khan Market, Karur",
        phone: "+91 11 2345 6789",
        email: "Karur@stewdec.com",
        hours: "Mon-Sat: 10am - 7pm",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6MmtpMBiovlgO5c4VH-cNHELWkYMapxJkg&s",
        coordinates: [10.9602, 78.0766], // Karur coordinates
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Karur,Tamil+Nadu"
    },
    {
        city: "Vilathikulam",
        address: "7, Lake Palace Road, Vilathikulam",
        phone: "+91 294 123 4567",
        email: "Vilathikulam@stewdec.com",
        hours: "Mon-Sat: 10am - 6pm",
        image: "data:image/jpeg;base64,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",
        coordinates: [9.1667, 78.1667], // Vilathikulam approximate coordinates
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Vilathikulam,Tamil+Nadu"
    },
];

// Component to handle map view changes when office changes
const ChangeMapView = ({ center }) => {
    const map = useMap();
    map.setView(center, 15);
    return null;
};

// Social media icons as components
const InstagramIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.175 2 12 2z" />
    </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-3.374c1.042-1.94 1.586-4.115 1.586-6.368 0-.097-.002-.194-.006-.291A10.003 10.003 0 0024 8.59a9.86 9.86 0 01-2.047.58z" />
    </svg>
);

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        budget: "",
        message: "",
        howDidYouHear: "",
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: "",
    });

    const [activeOffice, setActiveOffice] = useState(0);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formRef = useRef(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({
            submitted: false,
            success: false,
            message: "",
        });

        try {
            const result = await submitContactRequest(formData);

            setFormStatus({
                submitted: true,
                success: true,
                message: result.message,
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                eventType: "",
                eventDate: "",
                budget: "",
                message: "",
                howDidYouHear: "",
            });

            // Scroll to success message
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } catch (error) {
            setFormStatus({
                submitted: true,
                success: false,
                message: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Toggle FAQ
    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    // Handle get directions
    const handleGetDirections = () => {
        window.open(offices[activeOffice].googleMapsLink, '_blank');
    };

    return (
        <div className="font-serif bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-[55vh] xl:min-h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Luxury wedding contact"
                        className="w-full h-full object-cover animate-kenBurns"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                </div>

                {/* Hero Content */}
                <div className="relative container mx-auto px-4 sm:px-6 text-center text-white z-10 py-12 sm:py-16 md:py-20">
                    <p className="text-amber-300 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp">
                        Get in Touch
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 animate-fadeInUp delay-200">
                        Let's Create<br />Your Dream Wedding
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-400 mx-auto my-4 sm:my-6 lg:my-8 animate-scaleIn delay-400"></div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 animate-fadeInUp delay-600">
                        Reach out for a complimentary consultation. We'd love to hear about your vision.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-0.5 sm:w-1 h-1 sm:h-2 bg-white rounded-full mt-2 animate-scroll"></div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT INFO CARDS ===== */}
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 -mt-16 sm:-mt-20 lg:-mt-24 relative z-20">
                        {/* Email Card */}
                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-center transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2">Email Us</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4">For general inquiries</p>
                            <a href="mailto:hello@stewdec.com" className="text-amber-700 hover:underline text-xs sm:text-sm lg:text-base break-all">
                                hello@stewdec.com
                            </a>
                        </div>

                        {/* Phone Card */}
                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-center transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp delay-200">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2">Call Us</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4">Mon-Sat, 10am-7pm</p>
                            <a href="tel:+912212345678" className="text-amber-700 hover:underline text-xs sm:text-sm lg:text-base">
                                +91 22 1234 5678
                            </a>
                        </div>

                        {/* Visit Card */}
                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-center transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp delay-400">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2">Visit Us</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4">Three locations</p>
                            <p className="text-amber-700 text-xs sm:text-sm lg:text-base">Trichy • Karur • Vilathikulam</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT FORM & MAP SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-neutral-900" ref={formRef}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
                        {/* Contact Form */}
                        <div className="animate-fadeInLeft order-2 lg:order-1">
                            <p className="text-amber-500 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                                Send a Message
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4 lg:mb-6">
                                Let's Start a Conversation
                            </h2>
                            <div className="w-12 sm:w-16 lg:w-20 h-px bg-amber-600 mb-6 sm:mb-7 lg:mb-8"></div>

                            {formStatus.submitted && (
                                <div className={`mb-4 sm:mb-5 lg:mb-6 p-3 sm:p-4 rounded-lg animate-fadeIn ${formStatus.success
                                        ? "bg-green-900/50 border border-green-700"
                                        : "bg-red-900/50 border border-red-700"
                                    }`}>
                                    <p className={`text-sm sm:text-base ${formStatus.success ? "text-green-300" : "text-red-200"}`}>{formStatus.message}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    {/* Phone */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    {/* Event Type */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Event Type
                                        </label>
                                        <select
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                        >
                                            <option value="">Select event type</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="engagement">Engagement</option>
                                            <option value="reception">Reception</option>
                                            <option value="sangeet">Sangeet</option>
                                            <option value="corporate">Corporate Event</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    {/* Event Date */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Tentative Event Date
                                        </label>
                                        <input
                                            type="date"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                        />
                                    </div>

                                    {/* Budget Range */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Budget Range
                                        </label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                        >
                                            <option value="">Select budget</option>
                                            <option value="5-10">₹5L - ₹10L</option>
                                            <option value="10-25">₹10L - ₹25L</option>
                                            <option value="25-50">₹25L - ₹50L</option>
                                            <option value="50-100">₹50L - ₹1Cr</option>
                                            <option value="100+">₹1Cr+</option>
                                        </select>
                                    </div>
                                </div>

                                {/* How did you hear about us? */}
                                <div>
                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                        How did you hear about us?
                                    </label>
                                    <select
                                        name="howDidYouHear"
                                        value={formData.howDidYouHear}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="google">Google Search</option>
                                        <option value="wedding">Wedding Website</option>
                                        <option value="friend">Friend/Family</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="4"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition resize-none"
                                        placeholder="Tell us about your vision..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-amber-700 hover:bg-amber-600 text-white py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>

                                <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                                    * Required fields. We'll respond within 24 hours.
                                </p>
                            </form>
                        </div>

                        {/* Map & Office Info */}
                        <div className="animate-fadeInRight order-1 lg:order-2">
                            {/* Map */}
                            <div className="bg-gray-800 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl mb-6 sm:mb-7 lg:mb-8 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
                                <MapContainer
                                    center={offices[activeOffice].coordinates}
                                    zoom={13}
                                    scrollWheelZoom={false}
                                    style={{ height: '100%', width: '100%' }}
                                    className="z-10"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={offices[activeOffice].coordinates}
                                        icon={customIcon}
                                    >
                                        <Popup>
                                            <div className="text-center">
                                                <strong>{offices[activeOffice].city} Studio</strong><br />
                                                {offices[activeOffice].address}
                                            </div>
                                        </Popup>
                                    </Marker>
                                    <ChangeMapView center={offices[activeOffice].coordinates} />
                                </MapContainer>
                            </div>

                            {/* Office Selector */}
                            <div className="flex space-x-1 sm:space-x-2 mb-4 sm:mb-5 lg:mb-6">
                                {offices.map((office, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveOffice(index)}
                                        className={`flex-1 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm text-center transition-all duration-300 rounded-lg ${activeOffice === index
                                                ? "bg-amber-700 text-white"
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                                            }`}
                                    >
                                        {office.city}
                                    </button>
                                ))}
                            </div>

                            {/* Office Details */}
                            <div className="bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 xl:p-8">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-5 lg:mb-6">
                                    <img
                                        src={offices[activeOffice].image}
                                        alt={offices[activeOffice].city}
                                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover mb-3 sm:mb-0 sm:mr-4"
                                    />
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-white">{offices[activeOffice].city} Studio</h3>
                                        <p className="text-xs sm:text-sm text-gray-400">{offices[activeOffice].hours}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <p className="text-gray-300 text-xs sm:text-sm">{offices[activeOffice].address}</p>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${offices[activeOffice].phone}`} className="text-gray-300 hover:text-amber-500 text-xs sm:text-sm">
                                            {offices[activeOffice].phone}
                                        </a>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${offices[activeOffice].email}`} className="text-gray-300 hover:text-amber-500 text-xs sm:text-sm break-all">
                                            {offices[activeOffice].email}
                                        </a>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGetDirections}
                                    className="mt-4 sm:mt-5 lg:mt-6 w-full bg-amber-700 hover:bg-amber-600 text-white py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm rounded-lg transition"
                                >
                                    Get Directions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-black">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <p className="text-amber-500 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                            Got Questions?
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-16 sm:w-20 lg:w-24 h-px bg-amber-600 mx-auto"></div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-gray-800 rounded-lg overflow-hidden animate-fadeInUp bg-gray-900/50"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-gray-800 transition"
                                >
                                    <span className="font-medium text-sm sm:text-base lg:text-lg text-white pr-4">{faq.question}</span>
                                    <svg
                                        className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-500 transform transition-transform flex-shrink-0 ${expandedFaq === index ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-4 py-3 sm:px-5 lg:px-6 pb-3 sm:pb-4 text-gray-400 text-xs sm:text-sm animate-fadeIn border-t border-gray-800">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SOCIAL CONNECT SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <p className="text-amber-500 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                        Connect With Us
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-6 sm:mb-7 lg:mb-8">
                        Follow Our Journey
                    </h2>

                    <div className="flex justify-center space-x-4 sm:space-x-5 lg:space-x-6 mb-8 sm:mb-10 lg:mb-12">
                        <a
                            href="#"
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <img src={inn} className=" bg-white rounded-3xl w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" alt="instagram"/>
                        </a>
                        <a
                            href="#"
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <img src={li} className=" bg-white rounded-3xl w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" alt="instagram" />
                        </a>
                        <a
                            href="#"
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <img src={fa} className=" bg-white rounded-3xl w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" alt="instagram" />
                        </a>
                    </div>

                    {/* Instagram Feed Preview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="relative group overflow-hidden rounded-lg aspect-square">
                                <img
                                    src={`https://images.unsplash.com/photo-${item === 1 ? "1519225421980-715cb0215aed" :
                                        item === 2 ? "1523438885200-e635ba2c371e" :
                                            item === 3 ? "1511795409834-ef04bbd61622" :
                                                "1469371670807-013ccf25f16a"
                                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                                    alt="Instagram feed"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <a href="#">        
                                        <img src={inn} className="w-8 h-8 text-white bg-amber-50 rounded-2xl" />
</a>                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-amber-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-3 sm:mb-4 lg:mb-6">
                        Ready to Create Magic?
                    </h2>
                    <p className="text-sm sm:text-base lg:text-xl text-amber-200 max-w-2xl mx-auto mb-6 sm:mb-7 lg:mb-10 px-4">
                        Let's bring your vision to life. Book your complimentary consultation today.
                    </p>
                    <Link
                        to="/consultation"
                        className="inline-block bg-white text-amber-900 hover:bg-amber-100 px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 rounded-lg"
                    >
                        Schedule a Call
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;

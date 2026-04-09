import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../index.css'

const li = "/icons/li.png";
const fa = "/icons/fa.png";


// ===== TEAM MEMBER DATA =====
const teamMembers = [
    {
        id: 1,
        name: "Priya Sharma",
        role: "Founder & Creative Director",
        bio: "With over 15 years of experience in luxury event design, Priya has crafted unforgettable weddings across the globe. Her vision and attention to detail set the standard for excellence.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { instagram: "#", linkedin: "#", twitter: "#" },
        expertise: ["Creative Direction", "Luxury Design", "Client Relations"],
    },
    {
        id: 2,
        name: "Rajesh Mehta",
        role: "Lead Wedding Designer",
        bio: "Rajesh brings artistic flair and technical precision to every project. His floral installations and stage designs have been featured in top wedding magazines.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { instagram: "#", linkedin: "#", twitter: "#" },
        expertise: ["Floral Design", "Stage Setup", "Color Theory"],
    },
    {
        id: 3,
        name: "Ananya Patel",
        role: "Event Coordinator",
        bio: "Ananya ensures every detail runs smoothly. Her organizational skills and calm demeanor make her the backbone of our execution team.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { instagram: "#", linkedin: "#", twitter: "#" },
        expertise: ["Logistics", "Vendor Management", "Timeline Planning"],
    },
    {
        id: 4,
        name: "Vikram Singh",
        role: "Lighting & Technical Director",
        bio: "Vikram creates magical atmospheres with light. His technical expertise transforms venues into enchanting spaces.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        social: { instagram: "#", linkedin: "#", twitter: "#" },
        expertise: ["Lighting Design", "Sound Engineering", "Technical Setup"],
    },
];

// ===== TIMELINE DATA =====
const timelineEvents = [
    {
        year: "2012",
        title: "The Beginning",
        description: "StewDec was founded with a vision to create unforgettable wedding experiences.",
        icon: "🌱",
    },
    {
        year: "2015",
        title: "First International Wedding",
        description: "Designed our first destination wedding in Udaipur, setting new standards for luxury.",
        icon: "✈️",
    },
    {
        year: "2018",
        title: "Award Winning Year",
        description: "Received 'Best Wedding Decorator' award at the Luxury Wedding Awards.",
        icon: "🏆",
    },
    {
        year: "2020",
        title: "Expanded Team",
        description: "Grew to 25+ team members and opened our second studio in Mumbai.",
        icon: "🤝",
    },
    {
        year: "2023",
        title: "1000 Weddings Milestone",
        description: "Celebrated designing over 1000 luxury weddings across India and abroad.",
        icon: "✨",
    },
    {
        year: "2025",
        title: "Global Recognition",
        description: "Featured in international wedding publications and expanded to Dubai.",
        icon: "🌍",
    },
];

// ===== TESTIMONIALS DATA =====
const testimonials = [
    {
        id: 1,
        name: "Priya & Rajeev Mehta",
        role: "Wedding, December 2025",
        content: "StewDec didn't just decorate our wedding—they painted our love story. Every guest was left speechless by the beauty and attention to detail.",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 5,
    },
    {
        id: 2,
        name: "Ananya & Vikram Singh",
        role: "Wedding, November 2025",
        content: "The team understood our vision perfectly and delivered beyond our expectations. A truly luxury experience from start to finish.",
        image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 5,
    },
    {
        id: 3,
        name: "Neha & Karan Malhotra",
        role: "Wedding, October 2025",
        content: "From the first consultation to the last dance, everything was perfect. The floral arrangements were breathtaking.",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 5,
    },
];

// ===== STATS DATA =====
const stats = [
    { label: "Weddings Designed", value: 1000, suffix: "+", icon: "🩷" },
    { label: "Happy Couples", value: 2000, suffix: "+", icon: "🪷" },
    { label: "Years Experience", value: 13, suffix: "", icon: "🐦‍🔥" },
    { label: "Luxury Venues", value: 50, suffix: "+", icon: "🫶🏻" },
];

// ===== VALUE PROPOSITIONS =====
const values = [
    {
        title: "Excellence",
        description: "We never compromise on quality. Every detail is meticulously crafted to perfection.",
        icon: "⭐",
    },
    {
        title: "Innovation",
        description: "We push creative boundaries to design unique, memorable experiences.",
        icon: "💡",
    },
    {
        title: "Integrity",
        description: "Honest communication and transparency in every interaction.",
        icon: "🤝",
    },
    {
        title: "Passion",
        description: "We pour our hearts into every project, treating each wedding as our own.",
        icon: "❤️",
    },
];

const AboutPage = () => {
    const [activeTab, setActiveTab] = useState("story");
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [counts, setCounts] = useState(stats.map(() => 0));
    const statsRef = useRef(null);
    const timelineRef = useRef(null);

    // Animate stats counting
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        stats.forEach((stat, index) => {
                            let start = 0;
                            const end = stat.value;
                            const duration = 2000;
                            const increment = end / (duration / 16);

                            const timer = setInterval(() => {
                                start += increment;
                                if (start >= end) {
                                    setCounts(prev => {
                                        const newCounts = [...prev];
                                        newCounts[index] = end;
                                        return newCounts;
                                    });
                                    clearInterval(timer);
                                } else {
                                    setCounts(prev => {
                                        const newCounts = [...prev];
                                        newCounts[index] = Math.floor(start);
                                        return newCounts;
                                    });
                                }
                            }, 16);
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-serif bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] xl:min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Luxury wedding"
                        className="w-full h-full object-cover animate-kenBurns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
                </div>

                {/* Hero Content */}
                <div className="relative container mx-auto px-4 sm:px-6 text-center text-white z-10 py-12 sm:py-16 md:py-20">
                    <p className="text-amber-300 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp">
                        Our Story
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 animate-fadeInUp delay-200">
                        Crafting Dreams<br />Since 2012
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-400 mx-auto my-4 sm:my-6 lg:my-8 animate-scaleIn delay-400"></div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 animate-fadeInUp delay-600">
                        We don't just decorate weddings—we create heirloom memories that last a lifetime.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-0.5 sm:w-1 h-1 sm:h-2 bg-white rounded-full mt-2 animate-scroll"></div>
                    </div>
                </div>
            </section>

            {/* ===== TABS NAVIGATION ===== */}
            <section className="sticky top-16 md:top-20 lg:top-24 bg-white/80 backdrop-blur-md z-40 border-b border-amber-100">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex overflow-x-auto justify-start sm:justify-center space-x-4 sm:space-x-6 lg:space-x-8 py-3 sm:py-4 scrollbar-hide">
                        {[
                            { id: "story", label: "Our Story" },
                            { id: "team", label: "The Team" },
                            { id: "values", label: "Our Values" },
                            { id: "timeline", label: "Timeline" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap transition-all duration-300 group ${activeTab === tab.id
                                        ? "text-amber-700 font-medium"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {tab.label}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${activeTab === tab.id ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                ></span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR STORY SECTION ===== */}
            {activeTab === "story" && (
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                            {/* Image Collage */}
                            <div className="relative order-2 lg:order-1">
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                        <img
                                            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                            alt="Wedding decoration"
                                            className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg shadow-lg animate-float"
                                            loading="lazy"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                            alt="Floral arrangement"
                                            className="w-full h-40 sm:h-52 lg:h-64 object-cover rounded-lg shadow-lg animate-float delay-200"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="space-y-2 sm:space-y-3 lg:space-y-4 pt-4 sm:pt-6 lg:pt-8">
                                        <img
                                            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                            alt="Wedding setup"
                                            className="w-full h-40 sm:h-52 lg:h-64 object-cover rounded-lg shadow-lg animate-float delay-400"
                                            loading="lazy"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                            alt="Beach wedding"
                                            className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg shadow-lg animate-float delay-600"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -top-2 sm:-top-3 lg:-top-4 -left-2 sm:-left-3 lg:-left-4 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 border-2 border-amber-200 rounded-lg -z-10"></div>
                                <div className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 -right-2 sm:-right-3 lg:-right-4 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 border-2 border-amber-200 rounded-lg -z-10"></div>
                            </div>

                            {/* Story Content */}
                            <div className="animate-fadeInRight order-1 lg:order-2">
                                <p className="text-amber-700 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                                    Who We Are
                                </p>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4 lg:mb-6">
                                    More Than Just<br />Event Decorators
                                </h2>
                                <div className="w-12 sm:w-16 lg:w-20 h-px bg-amber-300 mb-4 sm:mb-6 lg:mb-8"></div>

                                <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-gray-400">
                                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                                        StewDec was born from a simple belief: that every love story deserves to be celebrated in the most beautiful way possible. What started as a small team of passionate designers has grown into one of India's most sought-after luxury wedding decoration brands.
                                    </p>
                                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                                        We've had the privilege of designing over 1,000 weddings across the globe—from intimate garden ceremonies to grand palace affairs. But beyond the numbers, what truly drives us is the joy in our clients' eyes when they see their dreams come to life.
                                    </p>
                                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed font-medium text-amber-400">
                                        "We don't just create beautiful spaces—we create beautiful memories."
                                    </p>
                                </div>

                                {/* Stats Preview */}
                                <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-8 sm:mt-10 lg:mt-12">
                                    {stats.slice(0, 2).map((stat, index) => (
                                        <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                                            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                                            <div className="text-xl sm:text-2xl lg:text-3xl font-serif text-amber-500">
                                                {counts[index]}{stat.suffix}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TEAM SECTION ===== */}
            {activeTab === "team" && (
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                            <p className="text-amber-700 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                                The Creative Minds
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4">
                                Meet Our Team
                            </h2>
                            <div className="w-16 sm:w-20 lg:w-24 h-px bg-amber-300 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                            {teamMembers.map((member, index) => (
                                <TeamCard
                                    key={member.id}
                                    member={member}
                                    index={index}
                                    onClick={() => setSelectedTeamMember(member)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== VALUES SECTION ===== */}
            {activeTab === "values" && (
                <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-amber-950">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                            <p className="text-amber-700 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                                What Drives Us
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4">
                                Our Core Values
                            </h2>
                            <div className="w-16 sm:w-20 lg:w-24 h-px bg-amber-300 mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                            {values.map((value, index) => (
                                <ValueCard key={index} value={value} index={index} />
                            ))}
                        </div>

                        {/* Philosophy Banner */}
                        <div className="mt-12 sm:mt-16 lg:mt-20 relative overflow-hidden rounded-xl lg:rounded-2xl bg-amber-900 text-white p-6 sm:p-8 lg:p-12 text-center">
                            <div className="absolute inset-0 opacity-10">
                                <img
                                    src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                    alt="Background"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="relative z-10">
                                <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif font-light mb-3 sm:mb-4 lg:mb-6">
                                    "Every wedding is a masterpiece waiting to be created"
                                </p>
                                <p className="text-amber-200 text-sm sm:text-base">— Priya Sharma, Founder</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TIMELINE SECTION ===== */}
            {activeTab === "timeline" && (
                <section className="py-12 sm:py-16 lg:py-20" ref={timelineRef}>
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                            <p className="text-amber-700 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                                Our Journey
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4">
                                The StewDec Story
                            </h2>
                            <div className="w-16 sm:w-20 lg:w-24 h-px bg-amber-300 mx-auto"></div>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-amber-800 hidden md:block"></div>

                            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                                {timelineEvents.map((event, index) => (
                                    <TimelineItem key={index} event={event} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-neutral-900">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                        <p className="text-amber-700 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                            Client Love
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4">
                            What They Say
                        </h2>
                        <div className="w-16 sm:w-20 lg:w-24 h-px bg-amber-300 mx-auto"></div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {/* Testimonial Carousel */}
                        <div className="relative">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`transition-all duration-700 ${index === activeTestimonial
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 absolute top-0 left-0 pointer-events-none"
                                        }`}
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}

                            {/* Dots Navigation */}
                            <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === activeTestimonial
                                                ? "w-6 sm:w-8 bg-amber-600"
                                                : "w-1.5 sm:w-2 bg-gray-600 hover:bg-amber-400"
                                            }`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-amber-900 text-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center animate-fadeInUp" style={{ animationDelay: `${index * 200}ms` }}>
                                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">{stat.icon}</div>
                                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif mb-1 sm:mb-2">
                                    {counts[index]}{stat.suffix}
                                </div>
                                <div className="text-xs sm:text-sm uppercase tracking-wider text-amber-300">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-black">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4 lg:mb-6">
                        Ready to Start Your Story?
                    </h2>
                    <p className="text-sm sm:text-base lg:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4">
                        Let's create something beautiful together. Reach out for a complimentary consultation.
                    </p>
                    <Link
                        to="/consultation"
                        className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 rounded-lg"
                    >
                        Book Your Consultation
                    </Link>
                </div>
            </section>

            {/* ===== TEAM MEMBER MODAL ===== */}
            {selectedTeamMember && (
                <TeamModal
                    member={selectedTeamMember}
                    onClose={() => setSelectedTeamMember(null)}
                />
            )}
        </div>
    );
};

// ===== TEAM CARD COMPONENT =====
const TeamCard = ({ member, index, onClick }) => {
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
            className="group relative opacity-0 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"
                        }`}
                    loading="lazy"
                />

                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 text-white transform translate-y-0 transition-transform duration-500">
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-0.5 sm:mb-1">{member.name}</h3>
                        <p className="text-amber-300 text-xs sm:text-sm mb-2 sm:mb-3">{member.role}</p>
                        <p className="text-xs sm:text-sm text-gray-200 mb-3 sm:mb-4 line-clamp-3">{member.bio}</p>
                        {/* <div className="flex space-x-2 sm:space-x-3">
                            <a href={member.social.instagram} className="hover:text-amber-300 transition">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.175 2 12 2z" />
                                </svg>
                            </a>
                            <a href={member.social.linkedin} className="hover:text-amber-300 transition">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div> */}
                    </div>
                </div>

                {/* Name (visible when not hovered) */}
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4">
                    <h3 className="text-white text-sm sm:text-base lg:text-lg font-serif">{member.name}</h3>
                    <p className="text-amber-300 text-xs">{member.role}</p>
                </div> */}
            </div>
        </div>
    );
};

// ===== VALUE CARD COMPONENT =====
const ValueCard = ({ value, index }) => {
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
            className="text-center p-4 sm:p-5 lg:p-6 xl:p-8 bg-amber-950/30 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 border border-amber-800/30"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4 animate-bounce-slow">{value.icon}</div>
            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-2 sm:mb-3 text-white">{value.title}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{value.description}</p>
        </div>
    );
};

// ===== TIMELINE ITEM COMPONENT =====
const TimelineItem = ({ event, index }) => {
    const itemRef = useRef(null);
    const isEven = index % 2 === 0;

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

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={itemRef}
            className={`relative flex flex-col md:flex-row items-center opacity-0 ${isEven ? "md:flex-row-reverse" : ""
                }`}
            style={{ animationDelay: `${index * 200}ms` }}
        >
            {/* Content */}
            <div className="md:w-1/2 p-3 sm:p-4 lg:p-6 w-full">
                <div className={`bg-amber-950/30 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-lg shadow-lg border border-amber-800/30 ${isEven ? "md:ml-0 lg:ml-12" : "md:mr-0 lg:mr-12"
                    }`}>
                    <div className="flex items-center mb-2 sm:mb-3">
                        <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{event.icon}</span>
                        <span className="text-amber-500 font-bold text-base sm:text-lg lg:text-xl">{event.year}</span>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2 text-white">{event.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{event.description}</p>
                </div>
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-amber-600 rounded-full border-2 sm:border-4 border-amber-900 hidden md:block"></div>

            {/* Empty space for alignment */}
            <div className="md:w-1/2 hidden md:block"></div>
        </div>
    );
};

// ===== TESTIMONIAL CARD COMPONENT =====
const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="bg-amber-950/30 backdrop-blur-sm p-4 sm:p-6 lg:p-8 xl:p-12 rounded-xl lg:rounded-2xl shadow-xl border border-amber-800/30">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-6">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover mr-0 sm:mr-4 mb-3 sm:mb-0"
                />
                <div className="text-center sm:text-left">
                    <h4 className="text-sm sm:text-base lg:text-lg font-serif text-white">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">{testimonial.role}</p>
                    <div className="flex justify-center sm:justify-start mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 italic text-center sm:text-left">"{testimonial.content}"</p>
        </div>
    );
};

// ===== TEAM MODAL COMPONENT =====
const TeamModal = ({ member, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"></div>

            {/* Modal Content */}
            <div
                className="relative bg-amber-950 rounded-xl lg:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn border border-amber-800"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-1/2 h-48 sm:h-56 md:h-auto">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                        />
                    </div>

                    {/* Details */}
                    <div className="md:w-1/2 p-4 sm:p-5 lg:p-6 xl:p-8">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif mb-1 sm:mb-2 text-white">{member.name}</h2>
                        <p className="text-amber-500 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">{member.role}</p>

                        <p className="text-gray-300 text-xs sm:text-sm lg:text-base mb-4 sm:mb-5 lg:mb-6">{member.bio}</p>

                        <div className="mb-4 sm:mb-5 lg:mb-6">
                            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2 sm:mb-3">Expertise</h3>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {member.expertise.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-900/50 text-amber-300 rounded-full text-xs sm:text-sm border border-amber-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2 sm:mb-3">Connect</h3>
                            <div className="flex space-x-3 sm:space-x-4">
                                <a href={member.social.instagram} className="text-gray-400 hover:text-amber-500 transition">
                                   <img src={li} alt="linkdin" className="w-[25px] bg-amber-50 rounded-3xl hover:bg-amber-200" /> 
                                </a>
                                <a href={member.social.linkedin} className="text-gray-400 hover:text-amber-500 transition">
                                    <img src={fa} alt="linkdin" className="w-[25px] bg-amber-50 rounded-3xl hover:bg-amber-200" /> 

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

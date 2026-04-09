import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchConsultations, submitConsultationBooking } from "../lib/api";

// ===== CONSULTATION PACKAGES =====
const consultationPackages = [
    {
        id: "basic",
        name: "Basic Consultation",
        duration: "30 mins",
        price: "Free",
        description: "Quick virtual meeting to discuss your vision and get preliminary advice.",
        features: ["Video call", "Basic guidance", "Price estimate", "Follow-up email"],
        icon: "💬",
    },
    {
        id: "premium",
        name: "Premium Consultation",
        duration: "60 mins",
        price: "₹2,500",
        description: "In-depth consultation with mood boards and detailed planning.",
        features: ["Video call", "Custom mood board", "Detailed quote", "Venue visit planning", "Vendor recommendations"],
        icon: "✨",
        popular: true,
    },
    {
        id: "onsite",
        name: "On-Site Consultation",
        duration: "2 hours",
        price: "₹5,000",
        description: "Face-to-face meeting at your venue with our senior designer.",
        features: ["Venue visit", "On-site measurements", "Physical samples", "Detailed proposal", "Team introduction"],
        icon: "📍",
    },
];

// ===== TIME SLOTS =====
const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

// ===== CONSULTATION TOPICS =====
const consultationTopics = [
    "Wedding Decoration",
    "Floral Design",
    "Lighting & Ambiance",
    "Furniture Rental",
    "Full Event Planning",
    "Destination Wedding",
];

// ===== TEAM MEMBERS FOR CONSULTATION =====
const teamMembers = [
    { id: 1, name: "Priya Sharma", role: "Creative Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Rajesh Mehta", role: "Lead Designer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Ananya Patel", role: "Event Coordinator", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
];

const formatDateForApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const BookConsultation = () => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedPackage, setSelectedPackage] = useState("premium");
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        guestCount: "",
        venue: "",
        message: "",
    });
    const [bookingStatus, setBookingStatus] = useState({
        submitted: false,
        success: false,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [availabilityStatus, setAvailabilityStatus] = useState({
        loading: true,
        message: "",
    });
    const [confirmedBooking, setConfirmedBooking] = useState(null);
    const bookingContentRef = useRef(null);

    const resetBookingFlow = () => {
        setStep(1);
        setSelectedDate(new Date());
        setSelectedTime("");
        setSelectedPackage("premium");
        setSelectedTeamMember(null);
        setSelectedTopics([]);
        setFormData({
            name: "",
            email: "",
            phone: "",
            eventDate: "",
            guestCount: "",
            venue: "",
            message: "",
        });
        setBookingStatus({
            submitted: false,
            success: false,
            message: "",
        });
        setConfirmedBooking(null);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle topic selection
    const toggleTopic = (topic) => {
        setSelectedTopics((prev) =>
            prev.includes(topic)
                ? prev.filter((t) => t !== topic)
                : [...prev, topic]
        );
    };

    useEffect(() => {
        let isActive = true;

        const loadAvailability = async () => {
            setAvailabilityStatus({
                loading: true,
                message: "",
            });

            try {
                const consultations = await fetchConsultations(formatDateForApi(selectedDate));

                if (!isActive) {
                    return;
                }

                setBookedSlots(
                    consultations
                        .map((consultation) => consultation.selectedTime)
                        .filter(Boolean)
                );
                setAvailabilityStatus({
                    loading: false,
                    message: "",
                });
            } catch (error) {
                if (!isActive) {
                    return;
                }

                const errorMessage =
                    error instanceof Error &&
                        error.message &&
                        error.message !== "The request could not be completed."
                        ? error.message
                        : "";

                setBookedSlots([]);
                setAvailabilityStatus({
                    loading: false,
                    message: errorMessage
                        ? `Live slot availability is temporarily unavailable. ${errorMessage}`
                        : "Live slot availability is temporarily unavailable. You can still submit, and the backend will prevent duplicate bookings.",
                });
            }
        };

        loadAvailability();

        return () => {
            isActive = false;
        };
    }, [selectedDate]);

    useEffect(() => {
        const currentlyAvailableSlots = getAvailableTimeSlots(selectedDate).filter(
            (timeSlot) => !bookedSlots.includes(timeSlot)
        );

        if (selectedTime && !currentlyAvailableSlots.includes(selectedTime)) {
            setSelectedTime("");
        }
    }, [bookedSlots, selectedDate, selectedTime]);

    useEffect(() => {
        if (!bookingStatus.submitted) {
            return;
        }

        bookingContentRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [bookingStatus.submitted, bookingStatus.success]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTime) {
            setBookingStatus({
                submitted: true,
                success: false,
                message: "Please choose an available consultation time before submitting.",
            });
            return;
        }

        if (!selectedTopics.length) {
            setBookingStatus({
                submitted: true,
                success: false,
                message: "Please choose at least one consultation topic before submitting.",
            });
            return;
        }

        setIsSubmitting(true);
        setBookingStatus({
            submitted: false,
            success: false,
            message: "",
        });

        const selectedConsultant = teamMembers.find(
            (member) => member.id === selectedTeamMember
        );

        try {
            const result = await submitConsultationBooking({
                ...formData,
                guestCount: formData.guestCount,
                selectedPackage,
                selectedDate: formatDateForApi(selectedDate),
                selectedTime,
                topics: selectedTopics,
                selectedTeamMember: selectedConsultant
                    ? {
                        id: String(selectedConsultant.id),
                        name: selectedConsultant.name,
                        role: selectedConsultant.role,
                    }
                    : null,
            });

            setConfirmedBooking({
                selectedDate: selectedDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
                selectedTime,
            });
            setBookingStatus({
                submitted: true,
                success: true,
                message: result.message,
            });
            setStep(4);
            setBookedSlots((previousSlots) =>
                previousSlots.includes(selectedTime)
                    ? previousSlots
                    : [...previousSlots, selectedTime]
            );
        } catch (error) {
            setBookingStatus({
                submitted: true,
                success: false,
                message: error.message,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get available time slots (mock function - in real app, this would fetch from backend)
    const getAvailableTimeSlots = (date) => {
        // Mock availability - return all slots except some random ones
        const day = date.getDay();
        if (day === 0) return []; // Sunday closed
        if (day === 6) return timeSlots.slice(0, 4); // Saturday half day
        return timeSlots;
    };

    const availableSlots = getAvailableTimeSlots(selectedDate).filter(
        (timeSlot) => !bookedSlots.includes(timeSlot)
    );

    // Calendar tile disabled function
    const tileDisabled = ({ date, view }) => {
        if (view === "month") {
            // Disable past dates
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date < today) return true;

            // Disable Sundays
            if (date.getDay() === 0) return true;
        }
        return false;
    };

    return (
        <div className="font-serif bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[30vh] sm:min-h-[35vh] md:min-h-[40vh] lg:min-h-[45vh] xl:min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Book consultation"
                        className="w-full h-full object-cover animate-kenBurns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 text-center text-white z-10 py-8 sm:py-12 md:py-16 lg:py-20">
                    <p className="text-amber-300 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp">
                        Let's Talk About Your Dream
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 animate-fadeInUp delay-200">
                        Book a Consultation
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-400 mx-auto my-4 sm:my-6 lg:my-8 animate-scaleIn delay-400"></div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 animate-fadeInUp delay-600">
                        Schedule a time to discuss your vision with our expert team
                    </p>
                </div>
            </section>

            {/* ===== PROGRESS BAR ===== */}
            <section className="sticky top-16 md:top-20 lg:top-18 bg-white/80 backdrop-blur-md z-40 border-b border-amber-100">
                <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex justify-between items-center max-w-3xl mx-auto">
                        {[
                            { step: 1, label: "Package" },
                            { step: 2, label: "Date & Time" },
                            { step: 3, label: "Details" },
                            { step: 4, label: "Confirm" },
                        ].map((s) => (
                            <div key={s.step} className="flex-1 text-center relative">
                                <div
                                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mx-auto rounded-full flex items-center justify-center mb-1 sm:mb-2 transition-all duration-300 text-xs sm:text-sm ${step > s.step
                                            ? "bg-green-500 text-white"
                                            : step === s.step
                                                ? "bg-amber-700 text-white scale-110"
                                                : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    {step > s.step ? (
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        s.step
                                    )}
                                </div>
                                <p className={`text-[10px] sm:text-xs uppercase tracking-wider ${step >= s.step ? "text-amber-700 font-medium" : "text-gray-400"
                                    }`}>
                                    <span className="hidden xs:inline">{s.label}</span>
                                    <span className="xs:hidden">{s.label}</span>
                                </p>
                                {s.step < 4 && (
                                    <div className={`absolute top-2.5 sm:top-3 lg:top-4 left-[60%] w-full h-0.5 hidden sm:block ${step > s.step ? "bg-green-500" : "bg-gray-200"
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== MAIN CONTENT ===== */}
            <section className="py-8 sm:py-12 lg:py-16">
                <div ref={bookingContentRef} className="container mx-auto px-4 sm:px-6">
                    {bookingStatus.submitted && bookingStatus.success ? (
                        <div className="max-w-2xl mx-auto text-center py-12 sm:py-16 lg:py-20 animate-scaleIn">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-serif mb-3 sm:mb-4 text-white">Booking Confirmed!</h2>
                            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">{bookingStatus.message}</p>
                            <p className="text-xs sm:text-sm text-gray-500 mb-6 px-4">
                                Your slot for {confirmedBooking?.selectedDate || "the selected date"} at {confirmedBooking?.selectedTime || "the selected time"} has been reserved.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    onClick={resetBookingFlow}
                                    className="inline-block bg-white hover:bg-gray-100 text-black px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition"
                                >
                                    Book Another Consultation
                                </button>
                                <Link
                                to="/"
                                className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition"
                            >
                                Return to Home
                            </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {bookingStatus.submitted && !bookingStatus.success && (
                                <div className="max-w-3xl mx-auto mb-6 sm:mb-8 rounded-lg border border-red-700 bg-red-900/50 p-4 text-red-200">
                                    {bookingStatus.message}
                                </div>
                            )}

                            {/* Step 1: Select Package */}
                            {step === 1 && (
                                <div className="max-w-6xl mx-auto animate-fadeIn">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-serif text-center mb-6 sm:mb-8">Choose Your Consultation Type</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8">
                                        {consultationPackages.map((pkg) => (
                                            <div
                                                key={pkg.id}
                                                onClick={() => setSelectedPackage(pkg.id)}
                                                className={`relative bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 xl:p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 ${selectedPackage === pkg.id
                                                        ? "ring-2 ring-amber-700 shadow-2xl"
                                                        : "hover:shadow-xl"
                                                    }`}
                                            >
                                                {pkg.popular && (
                                                    <div className="absolute -top-2 sm:-top-3 lg:-top-4 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider whitespace-nowrap">
                                                        Most Popular
                                                    </div>
                                                )}
                                                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4">{pkg.icon}</div>
                                                <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif mb-1 sm:mb-2">{pkg.name}</h3>
                                                <p className="text-amber-700 font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{pkg.price}</p>
                                                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 lg:mb-4">{pkg.duration}</p>
                                                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 lg:mb-6 line-clamp-2">{pkg.description}</p>
                                                <ul className="space-y-1 sm:space-y-2">
                                                    {pkg.features.slice(0, 3).map((feature, i) => (
                                                        <li key={i} className="flex items-center text-xs sm:text-sm text-gray-600">
                                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-700 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span className="truncate">{feature}</span>
                                                        </li>
                                                    ))}
                                                    {pkg.features.length > 3 && (
                                                        <li className="text-xs sm:text-sm text-gray-500 ml-4 sm:ml-6">
                                                            +{pkg.features.length - 3} more
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-center mt-8 sm:mt-10 lg:mt-12">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base rounded-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
                                        >
                                            Continue to Schedule
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Select Date & Time */}
                            {step === 2 && (
                                <div className="max-w-5xl mx-auto animate-fadeIn">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-center text-white mb-6 sm:mb-8">Select Your Preferred Date & Time</h2>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
                                        {/* Calendar */}
                                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6">
                                            <Calendar
                                                onChange={setSelectedDate}
                                                value={selectedDate}
                                                tileDisabled={tileDisabled}
                                                minDate={new Date()}
                                                className="w-full border-0 text-sm sm:text-base"
                                            />
                                        </div>

                                        {/* Time Slots */}
                                        <div>
                                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-3 sm:mb-4 text-white">
                                                <span className="hidden sm:inline">Available Times for </span>
                                                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </h3>

                                            {availabilityStatus.message && (
                                                <div className="mb-3 rounded-lg border border-amber-700 bg-amber-900/40 p-3 text-xs sm:text-sm text-amber-100">
                                                    {availabilityStatus.message}
                                                </div>
                                            )}

                                            {availabilityStatus.loading ? (
                                                <div className="bg-gray-900/60 p-4 sm:p-5 lg:p-6 rounded-lg text-center border border-gray-700">
                                                    <p className="text-gray-300 text-sm sm:text-base">Checking live availability...</p>
                                                </div>
                                            ) : availableSlots.length > 0 ? (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                                    {availableSlots.map((time) => (
                                                        <button
                                                            key={time}
                                                            onClick={() => setSelectedTime(time)}
                                                            className={`py-2 sm:py-2.5 lg:py-3 px-1 sm:px-2 text-xs sm:text-sm rounded-lg border transition-all duration-300 ${selectedTime === time
                                                                    ? "bg-amber-700 text-white border-amber-700"
                                                                    : "border-gray-300 text-white hover:text-black hover:border-amber-700 hover:bg-amber-50"
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="bg-amber-900/30 p-4 sm:p-5 lg:p-6 rounded-lg text-center border border-amber-800">
                                                    <p className="text-amber-300 text-sm sm:text-base">No slots available. Please select another date.</p>
                                                </div>
                                            )}

                                            {/* Preferred Team Member */}
                                            <div className="mt-6 sm:mt-8">
                                                <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-3 sm:mb-4 text-white">Preferred Consultant (Optional)</h3>
                                                <div className="space-y-2 sm:space-y-3">
                                                    {teamMembers.map((member) => (
                                                        <div
                                                            key={member.id}
                                                            onClick={() => setSelectedTeamMember(member.id)}
                                                            className={`flex items-center p-2 sm:p-3 rounded-lg border cursor-pointer transition-all duration-300 ${selectedTeamMember === member.id
                                                                    ? "border-amber-700 bg-amber-900/30"
                                                                    : "border-gray-700 text-white hover:border-amber-700 hover:bg-amber-900/20"
                                                                }`}
                                                        >
                                                            <img
                                                                src={member.image}
                                                                alt={member.name}
                                                                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover mr-2 sm:mr-3 lg:mr-4"
                                                            />
                                                            <div>
                                                                <h4 className="text-xs sm:text-sm lg:text-base font-medium text-white">{member.name}</h4>
                                                                <p className="text-[10px] sm:text-xs text-gray-400">{member.role}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-8 sm:mt-10 lg:mt-12">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm border border-gray-700 text-white rounded-lg hover:text-black hover:bg-gray-50 transition"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setStep(3)}
                                            disabled={!selectedTime}
                                            className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm rounded-lg uppercase tracking-wider transition-all duration-300 ${selectedTime
                                                    ? "bg-amber-700 hover:bg-amber-800 text-white transform hover:scale-105"
                                                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Your Details */}
                            {step === 3 && (
                                <div className="max-w-3xl mx-auto animate-fadeIn">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-center text-white mb-6 sm:mb-8">Tell Us About Your Event</h2>

                                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                                        {/* Personal Information */}
                                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 xl:p-8 space-y-4 sm:space-y-5 lg:space-y-6">
                                            <h3 className="text-base sm:text-lg lg:text-xl font-serif border-b border-amber-200 pb-2 sm:pb-3 lg:pb-4">Personal Details</h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                                <div>
                                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-1 sm:mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                        placeholder="John Doe"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-1 sm:mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-1 sm:mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>

                                        {/* Event Details */}
                                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 xl:p-8 space-y-4 sm:space-y-5 lg:space-y-6">
                                            <h3 className="text-base sm:text-lg lg:text-xl font-serif border-b border-amber-200 pb-2 sm:pb-3 lg:pb-4">Event Details</h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                                                <div>
                                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-1 sm:mb-2">
                                                        Event Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="eventDate"
                                                        value={formData.eventDate}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-1 sm:mb-2">
                                                        Guest Count
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="guestCount"
                                                        value={formData.guestCount}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                        placeholder="e.g., 300"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-1 sm:mb-2">
                                                    Venue / Location
                                                </label>
                                                <input
                                                    type="text"
                                                    name="venue"
                                                    value={formData.venue}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                    placeholder="e.g., Taj Palace, Mumbai"
                                                />
                                            </div>

                                            {/* Topics of Interest */}
                                            <div>
                                                <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-2 sm:mb-3">
                                                    Topics You'd Like to Discuss *
                                                </label>
                                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                                    {consultationTopics.map((topic) => (
                                                        <button
                                                            key={topic}
                                                            type="button"
                                                            onClick={() => toggleTopic(topic)}
                                                            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full border transition-all duration-300 ${selectedTopics.includes(topic)
                                                                    ? "bg-amber-700 text-white border-amber-700"
                                                                    : "border-gray-300 hover:border-amber-700 hover:bg-amber-50"
                                                                }`}
                                                        >
                                                            {topic}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-600 mb-1 sm:mb-2">
                                                    Additional Message
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                    placeholder="Tell us more about your vision..."
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="flex justify-between gap-3 sm:gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm border border-gray-700 text-white rounded-lg hover:text-black hover:bg-gray-50 transition"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || selectedTopics.length === 0}
                                                className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm rounded-lg uppercase tracking-wider transition-all duration-300 ${isSubmitting || selectedTopics.length === 0
                                                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                                        : "bg-amber-700 hover:bg-amber-800 text-white transform hover:scale-105"
                                                    }`}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Booking...
                                                    </span>
                                                ) : (
                                                    "Book Consultation"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* ===== WHY CONSULT WITH US ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-8 sm:mb-10 lg:mb-12 text-white">Why Consult With Us?</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: "🎯",
                                title: "Personalized Approach",
                                description: "Every consultation is tailored to your unique vision, budget, and requirements.",
                            },
                            {
                                icon: "💡",
                                title: "Expert Advice",
                                description: "Get insights from designers with over a decade of luxury wedding experience.",
                            },
                            {
                                icon: "📋",
                                title: "Detailed Planning",
                                description: "Receive a comprehensive proposal, mood boards, and actionable next steps.",
                            },
                            {
                                icon: "🤝",
                                title: "Vendor Connections",
                                description: "Access our network of trusted vendors and industry partners.",
                            },
                            {
                                icon: "💰",
                                title: "Budget Optimization",
                                description: "We help you maximize your budget without compromising on quality.",
                            },
                            {
                                icon: "✨",
                                title: "Stress-Free Process",
                                description: "Let us handle the details while you focus on enjoying your journey.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
                            >
                                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</div>
                                <h3 className="text-sm sm:text-base lg:text-lg font-serif mb-1 sm:mb-2 text-white">{item.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-black">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-8 sm:mb-10 lg:mb-12 text-white">What Our Clients Say</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Priya & Rajeev",
                                role: "Wedding, December 2025",
                                quote: "The consultation was incredibly helpful. They understood our vision perfectly and offered brilliant suggestions.",
                                rating: 5,
                            },
                            {
                                name: "Ananya & Vikram",
                                role: "Wedding, November 2025",
                                quote: "From the first meeting, we knew we were in good hands. The team's expertise and enthusiasm convinced us immediately.",
                                rating: 5,
                            },
                            {
                                name: "Neha & Karan",
                                role: "Wedding, October 2025",
                                quote: "The consultation gave us clarity and confidence. They helped us refine our ideas and stay within budget.",
                                rating: 5,
                            },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-700">
                                <div className="flex text-amber-500 mb-2 sm:mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">"{testimonial.quote}"</p>
                                <div>
                                    <p className="text-sm sm:text-base font-medium text-white">{testimonial.name}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookConsultation;

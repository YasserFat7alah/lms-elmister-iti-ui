"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Save, Calendar, Clock, Users,
    DollarSign, MapPin, Globe, Building, Mail,
    Phone, BookOpen, X, Plus, Trash2,
    AlertCircle, ChevronDown, CheckCircle,
    FileText, Tag, BarChart3, Info
} from "lucide-react";

const NewGroupPage = () => {
    const router = useRouter();
    const params = useParams();
    const courseId = params.courseId;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [courseInfo, setCourseInfo] = useState(null);
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        schedule: "",
        startDate: "",
        endDate: "",
        locationType: "online",
        location: "",
        meetingLink: "",
        physicalAddress: "",
        price: "",
        currency: "USD",
        discountPrice: "",
        sessionsCount: "",
        maxStudents: "",
        status: "draft",
        instructor: "",
        assistantInstructor: "",
        instructorEmail: "",
        instructorPhone: "",
        description: "",
        notes: "",
        tags: "",

        // Time Slots
        timeSlots: [
            { id: Date.now(), day: "", startTime: "09:00", endTime: "11:00", duration: 120 }
        ],

        // Session Details
        sessionDuration: 120,
        breakDuration: 15,
        totalSessions: 12,

        // Enrollment Settings
        enrollmentDeadline: "",
        minStudents: 1,
        autoCloseEnrollment: false,
        allowWaitlist: true,
        maxWaitlist: 10,

        // Payment Settings
        paymentOptions: ["full", "installment"],
        installmentCount: 3,
        depositRequired: true,
        depositAmount: "",
        cancellationPolicy: "flexible",
        refundPolicy: "standard",

        // Materials & Resources
        materialsIncluded: true,
        extraMaterialsCost: "",
        certificateIncluded: true,
        certificateCost: ""
    });

    // Fetch course info
    useEffect(() => {
        const fetchCourseInfo = async () => {
            setIsLoading(true);
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const mockCourse = {
                    id: courseId,
                    title: "Complete Web Development Bootcamp",
                    category: "Web Development",
                    difficulty: "Beginner to Intermediate",
                    durationWeeks: 12,
                    totalHours: 72,
                    basePrice: 1500,
                    instructor: "Ahmed Mohamed",
                    thumbnail: "https://api.dicebear.com/7.x/shapes/svg?seed=webdev"
                };

                setCourseInfo(mockCourse);

                // Set default form values based on course
                setFormData(prev => ({
                    ...prev,
                    price: mockCourse.basePrice.toString(),
                    sessionsCount: Math.ceil(mockCourse.totalHours / 2).toString(),
                    instructor: mockCourse.instructor,
                    totalSessions: Math.ceil(mockCourse.totalHours / 2)
                }));

            } catch (error) {
                console.error("Error fetching course:", error);
                alert("Failed to load course information");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseInfo();
    }, [courseId]);

    // Calculate end date based on start date and duration
    useEffect(() => {
        if (formData.startDate && formData.totalSessions && formData.timeSlots[0]?.day) {
            const startDate = new Date(formData.startDate);
            const sessionsPerWeek = formData.timeSlots.length;
            const totalWeeks = Math.ceil(formData.totalSessions / sessionsPerWeek);

            // Add weeks to start date
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + (totalWeeks * 7));

            // Format as YYYY-MM-DD
            const formattedEndDate = endDate.toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, endDate: formattedEndDate }));
        }
    }, [formData.startDate, formData.totalSessions, formData.timeSlots]);

    // Calculate total hours
    const totalHours = formData.sessionDuration * formData.totalSessions / 60;

    // Handle form changes
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }

        // Special calculations
        if (field === 'price' && formData.discountPrice) {
            const priceNum = parseFloat(value) || 0;
            const discountNum = parseFloat(formData.discountPrice) || 0;
            if (discountNum >= priceNum) {
                setFormData(prev => ({ ...prev, discountPrice: "" }));
            }
        }

        if (field === 'discountPrice' && value) {
            const priceNum = parseFloat(formData.price) || 0;
            const discountNum = parseFloat(value) || 0;
            if (discountNum >= priceNum) {
                setErrors(prev => ({ ...prev, discountPrice: "Discount price must be less than regular price" }));
            }
        }

        if (field === 'maxStudents' && value) {
            const max = parseInt(value) || 0;
            const min = parseInt(formData.minStudents) || 1;
            if (max < min) {
                setFormData(prev => ({ ...prev, minStudents: max.toString() }));
            }
        }
    };

    // Handle time slot changes
    const handleTimeSlotChange = (index, field, value) => {
        const updatedTimeSlots = [...formData.timeSlots];
        updatedTimeSlots[index] = {
            ...updatedTimeSlots[index],
            [field]: value
        };

        // Calculate duration if startTime and endTime are set
        if (field === 'startTime' || field === 'endTime') {
            const slot = updatedTimeSlots[index];
            if (slot.startTime && slot.endTime) {
                const [startHour, startMin] = slot.startTime.split(':').map(Number);
                const [endHour, endMin] = slot.endTime.split(':').map(Number);
                const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
                updatedTimeSlots[index].duration = duration;
            }
        }

        setFormData(prev => ({ ...prev, timeSlots: updatedTimeSlots }));
    };

    // Add new time slot
    const addTimeSlot = () => {
        const newTimeSlot = {
            id: Date.now(),
            day: "",
            startTime: "09:00",
            endTime: "11:00",
            duration: 120
        };
        setFormData(prev => ({
            ...prev,
            timeSlots: [...prev.timeSlots, newTimeSlot]
        }));
    };

    // Remove time slot
    const removeTimeSlot = (index) => {
        if (formData.timeSlots.length > 1) {
            const updatedTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, timeSlots: updatedTimeSlots }));
        }
    };

    // Days of week options
    const daysOfWeek = [
        { value: "monday", label: "Monday", short: "Mon" },
        { value: "tuesday", label: "Tuesday", short: "Tue" },
        { value: "wednesday", label: "Wednesday", short: "Wed" },
        { value: "thursday", label: "Thursday", short: "Thu" },
        { value: "friday", label: "Friday", short: "Fri" },
        { value: "saturday", label: "Saturday", short: "Sat" },
        { value: "sunday", label: "Sunday", short: "Sun" }
    ];

    // Location types
    const locationTypes = [
        { value: "online", label: "Online", icon: Globe, description: "Virtual classes via video conferencing" },
        { value: "offline", label: "In-Person", icon: Building, description: "Physical location classes" },
        { value: "hybrid", label: "Hybrid", icon: MapPin, description: "Mix of online and in-person" }
    ];

    // Status options
    const statusOptions = [
        { value: "draft", label: "Draft", color: "bg-yellow-100 text-yellow-800", description: "Not visible to students" },
        { value: "published", label: "Published", color: "bg-green-100 text-green-800", description: "Visible and accepting enrollments" },
        { value: "upcoming", label: "Upcoming", color: "bg-blue-100 text-blue-800", description: "Will be published soon" }
    ];

    // Payment options
    const paymentOptions = [
        { value: "full", label: "Full Payment", description: "Pay entire amount upfront" },
        { value: "installment", label: "Installments", description: "Split payment into multiple parts" },
        { value: "subscription", label: "Subscription", description: "Monthly recurring payment" }
    ];

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Basic validation
        if (!formData.name.trim()) newErrors.name = "Group name is required";
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        if (!formData.endDate) newErrors.endDate = "End date is required";

        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            if (end <= start) {
                newErrors.endDate = "End date must be after start date";
            }
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = "Valid price is required";
        }

        if (!formData.sessionsCount || parseInt(formData.sessionsCount) <= 0) {
            newErrors.sessionsCount = "Number of sessions is required";
        }

        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }

        // Time slots validation
        formData.timeSlots.forEach((slot, index) => {
            if (!slot.day) {
                newErrors[`timeSlot_${index}_day`] = "Day is required";
            }
            if (!slot.startTime) {
                newErrors[`timeSlot_${index}_startTime`] = "Start time is required";
            }
            if (!slot.endTime) {
                newErrors[`timeSlot_${index}_endTime`] = "End time is required";
            }
            if (slot.startTime && slot.endTime && slot.startTime >= slot.endTime) {
                newErrors[`timeSlot_${index}_endTime`] = "End time must be after start time";
            }
        });

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            // Scroll to first error
            const firstErrorKey = Object.keys(validationErrors)[0];
            const firstErrorElement = document.querySelector(`[data-error="${firstErrorKey}"]`);
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorElement.focus();
            }

            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare data for API
            const groupData = {
                ...formData,
                courseId,
                price: parseFloat(formData.price),
                discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
                sessionsCount: parseInt(formData.sessionsCount),
                maxStudents: formData.maxStudents ? parseInt(formData.maxStudents) : null,
                minStudents: parseInt(formData.minStudents),
                totalHours: totalHours,
                createdDate: new Date().toISOString(),
                currentStudents: 0,
                waitlist: 0
            };

            // Mock API call
            console.log("Creating group:", groupData);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In real app:
            // const response = await fetch(`/api/courses/${courseId}/groups`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(groupData)
            // });

            // if (!response.ok) throw new Error('Failed to create group');
            // const result = await response.json();

            alert('Group created successfully!');
            router.push(`/courses/${courseId}/groups`);

        } catch (error) {
            console.error('Error creating group:', error);
            alert('Failed to create group. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="h-64 bg-gray-200 rounded-xl"></div>
                            <div className="h-48 bg-gray-200 rounded-xl"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 bg-gray-200 rounded-xl"></div>
                            <div className="h-32 bg-gray-200 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Link href="/courses" className="hover:text-blue-600">
                                Courses
                            </Link>
                            <ChevronDown size={14} className="rotate-270" />
                            <Link href={`/courses/${courseId}`} className="hover:text-blue-600">
                                {courseInfo?.title}
                            </Link>
                            <ChevronDown size={14} className="rotate-270" />
                            <Link href={`/courses/${courseId}/groups`} className="hover:text-blue-600">
                                Groups
                            </Link>
                            <ChevronDown size={14} className="rotate-270" />
                            <span className="text-gray-800 font-medium">New Group</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Create New Group
                            </h1>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {courseInfo?.title}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Set up a new group for {courseInfo?.title}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/courses/${courseId}/groups`}>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <ArrowLeft size={18} />
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Course Summary Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-blue-200">
                                <img
                                    src={courseInfo?.thumbnail}
                                    alt={courseInfo?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{courseInfo?.title}</h2>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                        {courseInfo?.category}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Duration: {courseInfo?.durationWeeks} weeks
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Total Hours: {courseInfo?.totalHours}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Difficulty: {courseInfo?.difficulty}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-gray-600">Course Base Price</div>
                            <div className="text-2xl font-bold text-gray-800">
                                ${courseInfo?.basePrice?.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen size={20} />
                            Basic Information
                        </h2>
                        <span className="text-sm text-gray-500">Required Fields *</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Group Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Group Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500`}
                                placeholder="e.g., Morning Batch - March 2024"
                                required
                                data-error="name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.name}
                                </p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">
                                A descriptive name to identify this group
                            </p>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status *
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {statusOptions.map((status) => (
                                    <button
                                        type="button"
                                        key={status.value}
                                        onClick={() => handleChange('status', status.value)}
                                        className={`p-3 border rounded-lg text-center transition-all ${formData.status === status.value
                                            ? `${status.color} border-transparent ring-2 ring-offset-2 ring-blue-500`
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className="font-medium">{status.label}</div>
                                        <div className="text-xs text-gray-500 mt-1">{status.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleChange('startDate', e.target.value)}
                                        className={`w-full border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pl-10`}
                                        required
                                        data-error="startDate"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                {errors.startDate && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.startDate}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => handleChange('endDate', e.target.value)}
                                        className={`w-full border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pl-10`}
                                        required
                                        data-error="endDate"
                                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                {errors.endDate && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.endDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Location Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Location Type *
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {locationTypes.map((type) => (
                                    <button
                                        type="button"
                                        key={type.value}
                                        onClick={() => handleChange('locationType', type.value)}
                                        className={`p-3 border rounded-lg text-center transition-all ${formData.locationType === type.value
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-offset-2 ring-blue-500'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <type.icon size={20} className="mx-auto mb-2" />
                                        <div className="font-medium">{type.label}</div>
                                        <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Details */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {formData.locationType === 'online' ? 'Meeting Link/Details *' :
                                    formData.locationType === 'offline' ? 'Physical Address *' :
                                        'Location Details *'}
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                className={`w-full border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                placeholder={
                                    formData.locationType === 'online' ? 'https://meet.google.com/xyz-abc-def' :
                                        formData.locationType === 'offline' ? '123 Main St, City, Country' :
                                            'Provide location details for hybrid classes'
                                }
                                required
                                data-error="location"
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Group Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg p-3"
                                placeholder="Optional: Add specific details about this group, special instructions, or notes for students..."
                            />
                        </div>
                    </div>
                </div>

                {/* Schedule & Timing Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Clock size={20} />
                        Schedule & Timing
                    </h2>

                    <div className="space-y-6">
                        {/* Time Slots */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Class Schedule *
                                </label>
                                <button
                                    type="button"
                                    onClick={addTimeSlot}
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                                >
                                    <Plus size={16} />
                                    Add Time Slot
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.timeSlots.map((timeSlot, index) => (
                                    <div key={timeSlot.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Day *
                                            </label>
                                            <select
                                                value={timeSlot.day}
                                                onChange={(e) => handleTimeSlotChange(index, 'day', e.target.value)}
                                                className={`w-full border ${errors[`timeSlot_${index}_day`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2.5`}
                                                data-error={`timeSlot_${index}_day`}
                                            >
                                                <option value="">Select Day</option>
                                                {daysOfWeek.map(day => (
                                                    <option key={day.value} value={day.value}>{day.label}</option>
                                                ))}
                                            </select>
                                            {errors[`timeSlot_${index}_day`] && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors[`timeSlot_${index}_day`]}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Start Time *
                                            </label>
                                            <input
                                                type="time"
                                                value={timeSlot.startTime}
                                                onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                                                className={`w-full border ${errors[`timeSlot_${index}_startTime`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2.5`}
                                                data-error={`timeSlot_${index}_startTime`}
                                            />
                                            {errors[`timeSlot_${index}_startTime`] && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors[`timeSlot_${index}_startTime`]}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                End Time *
                                            </label>
                                            <input
                                                type="time"
                                                value={timeSlot.endTime}
                                                onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                                                className={`w-full border ${errors[`timeSlot_${index}_endTime`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2.5`}
                                                data-error={`timeSlot_${index}_endTime`}
                                            />
                                            {errors[`timeSlot_${index}_endTime`] && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors[`timeSlot_${index}_endTime`]}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-end">
                                            <div className="text-center">
                                                <div className="text-sm text-gray-600 mb-1">Duration</div>
                                                <div className="font-medium">
                                                    {timeSlot.duration} min
                                                </div>
                                            </div>

                                            {formData.timeSlots.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTimeSlot(index)}
                                                    className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Session Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Sessions *
                                </label>
                                <input
                                    type="number"
                                    value={formData.sessionsCount}
                                    onChange={(e) => handleChange('sessionsCount', e.target.value)}
                                    className={`w-full border ${errors.sessionsCount ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                    min="1"
                                    max="100"
                                    required
                                    data-error="sessionsCount"
                                />
                                {errors.sessionsCount && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.sessionsCount}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Session Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={formData.sessionDuration}
                                    onChange={(e) => handleChange('sessionDuration', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                    min="30"
                                    max="360"
                                    step="15"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Break Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={formData.breakDuration}
                                    onChange={(e) => handleChange('breakDuration', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                    min="0"
                                    max="60"
                                    step="5"
                                />
                            </div>
                        </div>

                        {/* Schedule Summary */}
                        {formData.timeSlots.some(slot => slot.day) && formData.sessionsCount && (
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                                    <Info size={18} />
                                    Schedule Summary
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Sessions per week:</span>
                                        <span className="ml-2 font-medium">
                                            {formData.timeSlots.filter(slot => slot.day).length}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Total weeks:</span>
                                        <span className="ml-2 font-medium">
                                            {Math.ceil(formData.sessionsCount / formData.timeSlots.filter(slot => slot.day).length)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Total hours:</span>
                                        <span className="ml-2 font-medium">
                                            {totalHours.toFixed(1)} hours
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">End date:</span>
                                        <span className="ml-2 font-medium">
                                            {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : 'Calculated...'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pricing & Enrollment Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <DollarSign size={20} />
                        Pricing & Enrollment
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pricing */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Regular Price *
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleChange('price', e.target.value)}
                                        className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pl-10`}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        required
                                        data-error="price"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.price}
                                    </p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    Total price for the entire course
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Discount Price (Optional)
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={formData.discountPrice}
                                        onChange={(e) => handleChange('discountPrice', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        max={formData.price}
                                    />
                                </div>
                                {errors.discountPrice && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.discountPrice}
                                    </p>
                                )}
                                {formData.discountPrice && (
                                    <p className="mt-1 text-sm text-green-600">
                                        Discount: {((1 - formData.discountPrice / formData.price) * 100).toFixed(0)}% off
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Enrollment Limits */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Maximum Students
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            value={formData.maxStudents}
                                            onChange={(e) => handleChange('maxStudents', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                            placeholder="Unlimited"
                                            min="1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Students
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.minStudents}
                                        onChange={(e) => handleChange('minStudents', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        min="1"
                                        max={formData.maxStudents || 100}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enrollment Deadline (Optional)
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        value={formData.enrollmentDeadline}
                                        onChange={(e) => handleChange('enrollmentDeadline', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Options */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Payment Options
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {paymentOptions.map((option) => (
                                    <button
                                        type="button"
                                        key={option.value}
                                        onClick={() => {
                                            const currentOptions = [...formData.paymentOptions];
                                            if (currentOptions.includes(option.value)) {
                                                // Remove if already selected
                                                handleChange('paymentOptions',
                                                    currentOptions.filter(opt => opt !== option.value)
                                                );
                                            } else {
                                                // Add if not selected
                                                handleChange('paymentOptions', [...currentOptions, option.value]);
                                            }
                                        }}
                                        className={`p-4 border rounded-lg text-left transition-all ${formData.paymentOptions.includes(option.value)
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-offset-2 ring-blue-500'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">{option.label}</div>
                                            {formData.paymentOptions.includes(option.value) && (
                                                <CheckCircle size={18} className="text-blue-600" />
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">{option.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Options Toggle */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                        <ChevronDown size={18} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                        {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                    </button>
                </div>

                {/* Advanced Options */}
                {showAdvanced && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <BarChart3 size={20} />
                            Advanced Options
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Instructor Details */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-800">Instructor Details</h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Main Instructor
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.instructor}
                                        onChange={(e) => handleChange('instructor', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="Instructor name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Assistant Instructor
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.assistantInstructor}
                                        onChange={(e) => handleChange('assistantInstructor', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="Assistant name (optional)"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Instructor Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                            <input
                                                type="email"
                                                value={formData.instructorEmail}
                                                onChange={(e) => handleChange('instructorEmail', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Instructor Phone
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                            <input
                                                type="tel"
                                                value={formData.instructorPhone}
                                                onChange={(e) => handleChange('instructorPhone', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                                placeholder="+1234567890"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Settings */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-800">Additional Settings</h3>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Allow Waitlist
                                        </label>
                                        <p className="text-sm text-gray-500">
                                            Allow students to join waitlist when group is full
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('allowWaitlist', !formData.allowWaitlist)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.allowWaitlist ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.allowWaitlist ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Materials Included
                                        </label>
                                        <p className="text-sm text-gray-500">
                                            Include course materials in the price
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('materialsIncluded', !formData.materialsIncluded)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.materialsIncluded ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.materialsIncluded ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Certificate Included
                                        </label>
                                        <p className="text-sm text-gray-500">
                                            Include completion certificate
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleChange('certificateIncluded', !formData.certificateIncluded)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.certificateIncluded ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.certificateIncluded ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => handleChange('tags', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="e.g., beginner, intensive, weekend"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Separate tags with commas
                                    </p>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Internal Notes
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => handleChange('notes', e.target.value)}
                                    rows="3"
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                    placeholder="Private notes for internal use (not visible to students)..."
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                        <div>
                            <Link href={`/courses/${courseId}/groups`}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    <ArrowLeft size={18} />
                                    Cancel
                                </button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    // Save as draft
                                    handleChange('status', 'draft');
                                    setTimeout(() => handleSubmit({ preventDefault: () => { } }), 100);
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Save as Draft
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${isSubmitting
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        <span>Create Group</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-500">
                            Group will be created and you'll be redirected to the groups list
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewGroupPage;
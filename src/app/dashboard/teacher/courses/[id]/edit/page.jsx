"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Save, Trash2, Globe, MapPin,
    Calendar, DollarSign, Users, Clock,
    BookOpen, FileText, Target, CheckCircle,
    AlertCircle, Upload, X, Loader2,
    Eye, Copy, History, Undo
} from "lucide-react";

const EditCoursePage = () => {
    const router = useRouter();
    const params = useParams();
    const courseId = params.courseId;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [showDiscardModal, setShowDiscardModal] = useState(false);

    // Course Data State
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        category: "",
        difficulty: "beginner",
        language: "english",
        prerequisites: "",
        learningOutcomes: "",
        thumbnail: "",
        tags: "",
        isPublic: true,
        durationWeeks: 12,
        totalHours: 36,
        status: "draft"
    });

    // Groups Data
    const [groups, setGroups] = useState([]);

    // Fetch Course Data
    useEffect(() => {
        const fetchCourseData = async () => {
            setIsLoading(true);
            try {
                // Mock API call - Replace with actual API
                await new Promise(resolve => setTimeout(resolve, 1000));

                const mockCourseData = {
                    id: courseId,
                    title: "Complete Web Development Bootcamp",
                    description: "A comprehensive course covering HTML, CSS, JavaScript, React, and Node.js. Learn web development from scratch and build real-world projects.",
                    category: "web",
                    difficulty: "intermediate",
                    language: "english",
                    prerequisites: "Basic computer knowledge\nNo programming experience required",
                    learningOutcomes: "Master HTML5 & CSS3\nBuild responsive websites\nLearn JavaScript fundamentals\nCreate React applications\nDevelop Node.js APIs",
                    thumbnail: "https://api.dicebear.com/7.x/shapes/svg?seed=webdev",
                    tags: "web, javascript, react, node",
                    isPublic: true,
                    durationWeeks: 12,
                    totalHours: 72,
                    status: "published",
                    createdAt: "2024-01-15",
                    updatedAt: "2024-02-01",
                    enrollmentCount: 45,
                    rating: 4.8,

                    groups: [
                        {
                            id: 1,
                            name: "Morning Group",
                            schedule: "Mon, Wed, Fri - 10:00 AM",
                            startDate: "2024-03-01",
                            endDate: "2024-05-24",
                            locationType: "online",
                            location: "https://zoom.us/j/123456789",
                            price: 1500,
                            sessionsCount: 36,
                            maxStudents: 20,
                            currentStudents: 15,
                            status: "active",
                            timeSlots: [
                                { day: "monday", startTime: "10:00", endTime: "12:00" },
                                { day: "wednesday", startTime: "10:00", endTime: "12:00" },
                                { day: "friday", startTime: "10:00", endTime: "12:00" }
                            ]
                        },
                        {
                            id: 2,
                            name: "Evening Group",
                            schedule: "Tue, Thu - 6:00 PM",
                            startDate: "2024-03-05",
                            endDate: "2024-05-28",
                            locationType: "online",
                            location: "https://meet.google.com/abc-defg-hij",
                            price: 1800,
                            sessionsCount: 24,
                            maxStudents: 25,
                            currentStudents: 18,
                            status: "active",
                            timeSlots: [
                                { day: "tuesday", startTime: "18:00", endTime: "20:00" },
                                { day: "thursday", startTime: "18:00", endTime: "20:00" }
                            ]
                        }
                    ]
                };

                setCourseData({
                    title: mockCourseData.title,
                    description: mockCourseData.description,
                    category: mockCourseData.category,
                    difficulty: mockCourseData.difficulty,
                    language: mockCourseData.language,
                    prerequisites: mockCourseData.prerequisites,
                    learningOutcomes: mockCourseData.learningOutcomes,
                    thumbnail: mockCourseData.thumbnail,
                    tags: mockCourseData.tags,
                    isPublic: mockCourseData.isPublic,
                    durationWeeks: mockCourseData.durationWeeks,
                    totalHours: mockCourseData.totalHours,
                    status: mockCourseData.status
                });

                setGroups(mockCourseData.groups.map(group => ({
                    ...group,
                    id: group.id,
                    startDate: formatDateForInput(group.startDate),
                    endDate: formatDateForInput(group.endDate)
                })));

                setOriginalData({
                    courseData: { ...mockCourseData },
                    groups: [...mockCourseData.groups]
                });

                if (mockCourseData.thumbnail) {
                    setImagePreview(mockCourseData.thumbnail);
                }

            } catch (error) {
                console.error("Error fetching course:", error);
                alert("Failed to load course data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    // Helper function to format date for input
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Handle Course Data Change
    const handleCourseChange = (field, value) => {
        setCourseData({
            ...courseData,
            [field]: value
        });

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    // Handle Group Data Change
    const handleGroupChange = (index, field, value) => {
        const updatedGroups = [...groups];
        updatedGroups[index] = {
            ...updatedGroups[index],
            [field]: value
        };

        if (field === 'locationType') {
            updatedGroups[index].location = "";
        }

        setGroups(updatedGroups);

        if (errors[`group_${index}_${field}`]) {
            setErrors(prev => ({ ...prev, [`group_${index}_${field}`]: "" }));
        }
    };

    // Add Time Slot to Group
    const addTimeSlot = (groupIndex) => {
        const updatedGroups = [...groups];
        updatedGroups[groupIndex].timeSlots = [
            ...updatedGroups[groupIndex].timeSlots,
            { day: "", startTime: "", endTime: "" }
        ];
        setGroups(updatedGroups);
    };

    // Remove Time Slot from Group
    const removeTimeSlot = (groupIndex, timeSlotIndex) => {
        const updatedGroups = [...groups];
        updatedGroups[groupIndex].timeSlots = updatedGroups[groupIndex].timeSlots.filter(
            (_, idx) => idx !== timeSlotIndex
        );
        setGroups(updatedGroups);
    };

    // Handle Time Slot Change
    const handleTimeSlotChange = (groupIndex, timeSlotIndex, field, value) => {
        const updatedGroups = [...groups];
        updatedGroups[groupIndex].timeSlots[timeSlotIndex] = {
            ...updatedGroups[groupIndex].timeSlots[timeSlotIndex],
            [field]: value
        };
        setGroups(updatedGroups);
    };

    // Add New Group
    const addGroup = () => {
        const newGroup = {
            id: Date.now(),
            name: `Group ${String.fromCharCode(65 + groups.length)}`,
            schedule: "",
            startDate: "",
            endDate: "",
            locationType: "online",
            location: "",
            price: "",
            sessionsCount: "",
            maxStudents: "",
            currentStudents: 0,
            status: "draft",
            timeSlots: []
        };
        setGroups([...groups, newGroup]);
    };

    // Remove Group
    const removeGroup = (index) => {
        const group = groups[index];
        if (group.currentStudents > 0) {
            alert("Cannot delete group with enrolled students. You can set status to 'inactive' instead.");
            return;
        }

        if (groups.length > 1) {
            const updatedGroups = groups.filter((_, i) => i !== index);
            setGroups(updatedGroups);
        }
    };

    // Duplicate Group
    const duplicateGroup = (index) => {
        const groupToDuplicate = groups[index];
        const newGroup = {
            ...groupToDuplicate,
            id: Date.now(),
            name: `${groupToDuplicate.name} (Copy)`,
            currentStudents: 0,
            status: "draft"
        };
        setGroups([...groups, newGroup]);
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024;

            if (!validTypes.includes(file.type)) {
                alert("Please upload a valid image file (JPEG, PNG, GIF, WebP)");
                return;
            }

            if (file.size > maxSize) {
                alert("Image size should be less than 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                handleCourseChange('thumbnail', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove Image
    const removeImage = () => {
        setImagePreview(null);
        handleCourseChange('thumbnail', "");
    };

    // Check for changes
    const hasChanges = () => {
        if (!originalData) return false;

        // Check course data changes
        const courseChanged = Object.keys(courseData).some(
            key => courseData[key] !== originalData.courseData[key]
        );

        // Check groups changes
        const groupsChanged = JSON.stringify(groups) !== JSON.stringify(originalData.groups);

        return courseChanged || groupsChanged;
    };

    // Reset to original
    const resetToOriginal = () => {
        if (originalData) {
            setCourseData({ ...originalData.courseData });
            setGroups(originalData.groups.map(group => ({
                ...group,
                startDate: formatDateForInput(group.startDate),
                endDate: formatDateForInput(group.endDate)
            })));
            setImagePreview(originalData.courseData.thumbnail);
            setErrors({});
        }
        setShowDiscardModal(false);
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!courseData.title.trim()) newErrors.title = "Title is required";
        if (!courseData.description.trim()) newErrors.description = "Description is required";
        if (!courseData.category) newErrors.category = "Category is required";

        groups.forEach((group, index) => {
            if (!group.name.trim()) newErrors[`group_${index}_name`] = "Group name is required";
            if (!group.startDate) newErrors[`group_${index}_startDate`] = "Start date is required";
            if (!group.endDate) newErrors[`group_${index}_endDate`] = "End date is required";
            if (!group.price) newErrors[`group_${index}_price`] = "Price is required";
            if (!group.sessionsCount) newErrors[`group_${index}_sessionsCount`] = "Number of sessions is required";
            if (!group.location) newErrors[`group_${index}_location`] = "Location is required";

            if (group.startDate && group.endDate && new Date(group.endDate) <= new Date(group.startDate)) {
                newErrors[`group_${index}_endDate`] = "End date must be after start date";
            }

            if (group.price && parseFloat(group.price) <= 0) {
                newErrors[`group_${index}_price`] = "Price must be greater than 0";
            }

            if (group.maxStudents && group.currentStudents > parseInt(group.maxStudents)) {
                newErrors[`group_${index}_maxStudents`] = `Max students cannot be less than current students (${group.currentStudents})`;
            }
        });

        return newErrors;
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

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
            const updatedCourse = {
                ...courseData,
                groups: groups.map(group => ({
                    id: group.id,
                    name: group.name,
                    schedule: group.schedule,
                    startDate: group.startDate,
                    endDate: group.endDate,
                    locationType: group.locationType,
                    location: group.location,
                    price: parseFloat(group.price),
                    sessionsCount: parseInt(group.sessionsCount),
                    maxStudents: group.maxStudents ? parseInt(group.maxStudents) : null,
                    status: group.status,
                    timeSlots: group.timeSlots
                }))
            };

            console.log('Updating Course:', updatedCourse);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In real app:
            // const response = await fetch(`/api/courses/${courseId}`, {
            //   method: 'PUT',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(updatedCourse)
            // });

            // if (!response.ok) throw new Error('Failed to update course');

            alert('Course updated successfully!');
            router.push(`/courses/${courseId}`);

        } catch (error) {
            console.error('Error updating course:', error);
            alert('Failed to update course. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Categories
    const categories = [
        { value: "web", label: "Web Development" },
        { value: "mobile", label: "Mobile Development" },
        { value: "design", label: "UI/UX Design" },
        { value: "data", label: "Data Science" },
        { value: "marketing", label: "Digital Marketing" },
        { value: "business", label: "Business & Management" },
        { value: "language", label: "Language Learning" },
        { value: "music", label: "Music & Arts" }
    ];

    const difficultyLevels = [
        { value: "beginner", label: "Beginner", description: "No prior knowledge required" },
        { value: "intermediate", label: "Intermediate", description: "Some basic knowledge needed" },
        { value: "advanced", label: "Advanced", description: "For experienced learners" }
    ];

    const languages = [
        { value: "english", label: "English" },
        { value: "arabic", label: "Arabic" },
        { value: "both", label: "Both English & Arabic" }
    ];

    const courseStatuses = [
        { value: "draft", label: "Draft", color: "bg-blue-100 text-blue-800" },
        { value: "published", label: "Published", color: "bg-green-100 text-green-800" },
        { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
        { value: "inactive", label: "Inactive", color: "bg-red-100 text-red-800" }
    ];

    const groupStatuses = [
        { value: "draft", label: "Draft", color: "bg-blue-100 text-blue-800" },
        { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
        { value: "full", label: "Full", color: "bg-purple-100 text-purple-800" },
        { value: "inactive", label: "Inactive", color: "bg-red-100 text-red-800" }
    ];

    const daysOfWeek = [
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
        { value: "friday", label: "Friday" },
        { value: "saturday", label: "Saturday" },
        { value: "sunday", label: "Sunday" }
    ];

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="h-64 bg-gray-200 rounded"></div>
                            <div className="h-32 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 bg-gray-200 rounded"></div>
                            <div className="h-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Course</h1>
                        <p className="text-gray-600 mt-2">Course ID: {courseId}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/courses/${courseId}`}>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Eye size={18} />
                                <span>Preview</span>
                            </button>
                        </Link>

                        <Link href="/courses">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <ArrowLeft size={18} />
                                <span>Back</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Changes Indicator */}
            {hasChanges() && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <AlertCircle size={20} className="text-yellow-600" />
                            <div>
                                <p className="font-medium text-yellow-800">You have unsaved changes</p>
                                <p className="text-sm text-yellow-700">Don't forget to save your changes</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowDiscardModal(true)}
                            className="flex items-center gap-2 text-sm text-yellow-700 hover:text-yellow-900"
                        >
                            <Undo size={16} />
                            <span>Discard Changes</span>
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Course Basic Info Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen size={20} />
                            Course Information
                        </h2>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700">Status:</span>
                            <select
                                value={courseData.status}
                                onChange={(e) => handleCourseChange('status', e.target.value)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium ${courseStatuses.find(s => s.value === courseData.status)?.color || ''}`}
                            >
                                {courseStatuses.map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Course Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    value={courseData.title}
                                    onChange={(e) => handleCourseChange('title', e.target.value)}
                                    className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="e.g., Complete Web Development Bootcamp"
                                    required
                                    data-error="title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={courseData.category}
                                    onChange={(e) => handleCourseChange('category', e.target.value)}
                                    className={`w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                    required
                                    data-error="category"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            {/* Difficulty Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Difficulty Level
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {difficultyLevels.map((level) => (
                                        <button
                                            type="button"
                                            key={level.value}
                                            onClick={() => handleCourseChange('difficulty', level.value)}
                                            className={`p-3 border rounded-lg text-center transition-colors ${courseData.difficulty === level.value
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <div className="font-medium">{level.label}</div>
                                            <div className="text-xs text-gray-500 mt-1">{level.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Duration & Hours */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (Weeks)
                                    </label>
                                    <input
                                        type="number"
                                        value={courseData.durationWeeks}
                                        onChange={(e) => handleCourseChange('durationWeeks', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        min="1"
                                        max="52"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Total Hours
                                    </label>
                                    <input
                                        type="number"
                                        value={courseData.totalHours}
                                        onChange={(e) => handleCourseChange('totalHours', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Description *
                                </label>
                                <textarea
                                    value={courseData.description}
                                    onChange={(e) => handleCourseChange('description', e.target.value)}
                                    rows="4"
                                    className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                    placeholder="Detailed description of the course..."
                                    required
                                    data-error="description"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} />
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Thumbnail Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Thumbnail
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Course thumbnail"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <Upload size={24} className="text-gray-400" />
                                            )}
                                        </div>
                                        {imagePreview && (
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <label className="flex flex-col items-center justify-center px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <Upload size={20} className="text-gray-500 mb-2" />
                                            <span className="text-sm font-medium text-gray-700">Change Image</span>
                                            <span className="text-xs text-gray-500">JPG, PNG, GIF up to 5MB</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Language & Tags */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Language
                                    </label>
                                    <select
                                        value={courseData.language}
                                        onChange={(e) => handleCourseChange('language', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                    >
                                        {languages.map((lang) => (
                                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={courseData.tags}
                                        onChange={(e) => handleCourseChange('tags', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="e.g., react, javascript, web"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prerequisites & Outcomes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prerequisites
                            </label>
                            <textarea
                                value={courseData.prerequisites}
                                onChange={(e) => handleCourseChange('prerequisites', e.target.value)}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg p-3"
                                placeholder="What the student needs to know before joining..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Learning Outcomes
                            </label>
                            <textarea
                                value={courseData.learningOutcomes}
                                onChange={(e) => handleCourseChange('learningOutcomes', e.target.value)}
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg p-3"
                                placeholder="What the student will learn and achieve..."
                            />
                        </div>
                    </div>
                </div>

                {/* Groups Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Course Groups</h2>
                            <p className="text-gray-600">
                                Manage groups with different schedules, locations, and prices
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={addGroup}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <span>Add New Group</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {groups.map((group, index) => (
                            <div key={group.id} className="border-2 border-gray-200 rounded-xl p-6">
                                {/* Group Header */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {group.name}
                                        </h3>
                                        <span className={`px-2 py-1 text-xs font-medium rounded ${groupStatuses.find(s => s.value === group.status)?.color || ''}`}>
                                            {groupStatuses.find(s => s.value === group.status)?.label || group.status}
                                        </span>
                                        {group.currentStudents > 0 && (
                                            <span className="text-sm text-gray-600">
                                                ({group.currentStudents} students enrolled)
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => duplicateGroup(index)}
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded-lg hover:bg-blue-50"
                                        >
                                            <Copy size={14} />
                                            <span className="text-sm">Duplicate</span>
                                        </button>

                                        {groups.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeGroup(index)}
                                                className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50"
                                            >
                                                <Trash2 size={14} />
                                                <span className="text-sm">Remove</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Group Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Group Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Group Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={group.name}
                                            onChange={(e) => handleGroupChange(index, 'name', e.target.value)}
                                            className={`w-full border ${errors[`group_${index}_name`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                            required
                                            data-error={`group_${index}_name`}
                                        />
                                        {errors[`group_${index}_name`] && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors[`group_${index}_name`]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={group.status}
                                            onChange={(e) => handleGroupChange(index, 'status', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-3"
                                        >
                                            {groupStatuses.map(status => (
                                                <option key={status.value} value={status.value}>
                                                    {status.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Location Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location Type *
                                        </label>
                                        <div className="flex gap-4 mb-3">
                                            <button
                                                type="button"
                                                onClick={() => handleGroupChange(index, 'locationType', 'online')}
                                                className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${group.locationType === 'online'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                    }`}
                                            >
                                                <Globe size={16} />
                                                <span>Online</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleGroupChange(index, 'locationType', 'offline')}
                                                className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${group.locationType === 'offline'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                    }`}
                                            >
                                                <MapPin size={16} />
                                                <span>Offline</span>
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            value={group.location}
                                            onChange={(e) => handleGroupChange(index, 'location', e.target.value)}
                                            className={`w-full border ${errors[`group_${index}_location`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                            required
                                            data-error={`group_${index}_location`}
                                        />
                                        {errors[`group_${index}_location`] && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors[`group_${index}_location`]}
                                            </p>
                                        )}
                                    </div>

           // أكمل من هنا...
                                    {/* Dates */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Start Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={group.startDate}
                                                onChange={(e) => handleGroupChange(index, 'startDate', e.target.value)}
                                                className={`w-full border ${errors[`group_${index}_startDate`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                                required
                                                data-error={`group_${index}_startDate`}
                                            />
                                            {errors[`group_${index}_startDate`] && (
                                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors[`group_${index}_startDate`]}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                End Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={group.endDate}
                                                onChange={(e) => handleGroupChange(index, 'endDate', e.target.value)}
                                                className={`w-full border ${errors[`group_${index}_endDate`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                                required
                                                data-error={`group_${index}_endDate`}
                                            />
                                            {errors[`group_${index}_endDate`] && (
                                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors[`group_${index}_endDate`]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price (USD) *
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                            <input
                                                type="number"
                                                value={group.price}
                                                onChange={(e) => handleGroupChange(index, 'price', e.target.value)}
                                                className={`w-full border ${errors[`group_${index}_price`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pl-10`}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                required
                                                data-error={`group_${index}_price`}
                                            />
                                        </div>
                                        {errors[`group_${index}_price`] && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors[`group_${index}_price`]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Sessions Count */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Sessions *
                                        </label>
                                        <input
                                            type="number"
                                            value={group.sessionsCount}
                                            onChange={(e) => handleGroupChange(index, 'sessionsCount', e.target.value)}
                                            className={`w-full border ${errors[`group_${index}_sessionsCount`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                            min="1"
                                            required
                                            data-error={`group_${index}_sessionsCount`}
                                        />
                                        {errors[`group_${index}_sessionsCount`] && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors[`group_${index}_sessionsCount`]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Max Students */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Maximum Students
                                        </label>
                                        <input
                                            type="number"
                                            value={group.maxStudents}
                                            onChange={(e) => handleGroupChange(index, 'maxStudents', e.target.value)}
                                            className={`w-full border ${errors[`group_${index}_maxStudents`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3`}
                                            min={group.currentStudents}
                                            data-error={`group_${index}_maxStudents`}
                                        />
                                        {errors[`group_${index}_maxStudents`] && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors[`group_${index}_maxStudents`]}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Time Slots Section */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-medium text-gray-800 flex items-center gap-2">
                                            <Clock size={18} />
                                            Class Schedule
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={() => addTimeSlot(index)}
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            + Add Time Slot
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {group.timeSlots.map((timeSlot, timeSlotIndex) => (
                                            <div key={timeSlotIndex} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Day
                                                    </label>
                                                    <select
                                                        value={timeSlot.day}
                                                        onChange={(e) => handleTimeSlotChange(index, timeSlotIndex, 'day', e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg p-2"
                                                    >
                                                        <option value="">Select Day</option>
                                                        {daysOfWeek.map(day => (
                                                            <option key={day.value} value={day.value}>{day.label}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Start Time
                                                    </label>
                                                    <input
                                                        type="time"
                                                        value={timeSlot.startTime}
                                                        onChange={(e) => handleTimeSlotChange(index, timeSlotIndex, 'startTime', e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg p-2"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        End Time
                                                    </label>
                                                    <input
                                                        type="time"
                                                        value={timeSlot.endTime}
                                                        onChange={(e) => handleTimeSlotChange(index, timeSlotIndex, 'endTime', e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg p-2"
                                                    />
                                                </div>

                                                <div className="flex items-end">
                                                    {group.timeSlots.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTimeSlot(index, timeSlotIndex)}
                                                            className="p-2 text-red-600 hover:text-red-800"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Group Summary */}
                                {group.startDate && group.endDate && group.sessionsCount && (
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-medium text-blue-800 mb-2">Group Summary</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Duration:</span>
                                                <span className="ml-2 font-medium">
                                                    {Math.ceil((new Date(group.endDate) - new Date(group.startDate)) / (1000 * 60 * 60 * 24 * 7))} weeks
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Price per session:</span>
                                                <span className="ml-2 font-medium">
                                                    ${group.price && group.sessionsCount ? (group.price / group.sessionsCount).toFixed(2) : '0.00'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Available spots:</span>
                                                <span className="ml-2 font-medium">
                                                    {group.maxStudents ? group.maxStudents - group.currentStudents : '∞'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Enrollment rate:</span>
                                                <span className="ml-2 font-medium">
                                                    {group.maxStudents ? `${Math.round((group.currentStudents / group.maxStudents) * 100)}%` : '100%'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {groups.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <Users className="text-gray-400" size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No Groups Added</h3>
                            <p className="text-gray-500 mb-6">Add your first group to start enrolling students</p>
                            <button
                                type="button"
                                onClick={addGroup}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <span>Create First Group</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDiscardModal(true)}
                                disabled={!hasChanges()}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${hasChanges()
                                    ? 'text-red-600 hover:text-red-800 border border-red-300 hover:bg-red-50'
                                    : 'text-gray-400 border border-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                <Undo size={18} />
                                <span>Discard Changes</span>
                            </button>

                            <Link href={`/courses/${courseId}`}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    <ArrowLeft size={18} />
                                    <span>Cancel</span>
                                </button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting || !hasChanges()}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${isSubmitting || !hasChanges()
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>

                            <Link href={`/courses/${courseId}`}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Eye size={18} />
                                    <span>View Course</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {hasChanges() && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                You have made changes to this course. Don't forget to save them.
                            </p>
                        </div>
                    )}
                </div>
            </form>

            {/* Discard Changes Modal */}
            {showDiscardModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <AlertCircle className="text-red-600" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Discard Changes?</h3>
                            </div>

                            <p className="text-gray-600 mb-6">
                                You have unsaved changes. Are you sure you want to discard them? This action cannot be undone.
                            </p>

                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowDiscardModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={resetToOriginal}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Discard Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCoursePage;
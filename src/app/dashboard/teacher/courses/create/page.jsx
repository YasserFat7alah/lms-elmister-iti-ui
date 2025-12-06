"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Plus, Trash2, Globe, Lock,
  Calendar, MapPin, DollarSign, Users, Clock,
  BookOpen, FileText, Target, CheckCircle,
  AlertCircle, Upload, X, Loader2
} from "lucide-react";

const CreateCoursePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Basic Course Data
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
    totalHours: 36
  });

  // Groups Data
  const [groups, setGroups] = useState([
    {
      id: Date.now(),
      name: "Group A",
      schedule: "",
      startDate: "",
      endDate: "",
      locationType: "online",
      location: "",
      price: "",
      sessionsCount: "",
      maxStudents: "",
      status: "draft",
      timeSlots: []
    }
  ]);

  // Handle Course Data Change
  const handleCourseChange = (field, value) => {
    setCourseData({
      ...courseData,
      [field]: value
    });

    // Clear error for this field
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

    // If location type changes, clear location field
    if (field === 'locationType') {
      updatedGroups[index].location = "";
    }

    setGroups(updatedGroups);

    // Clear error for this field
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
      status: "draft",
      timeSlots: []
    };
    setGroups([...groups, newGroup]);
  };

  // Remove Group
  const removeGroup = (index) => {
    if (groups.length > 1) {
      const updatedGroups = groups.filter((_, i) => i !== index);
      setGroups(updatedGroups);
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

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

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // Course validation
    if (!courseData.title.trim()) newErrors.title = "Title is required";
    if (!courseData.description.trim()) newErrors.description = "Description is required";
    if (!courseData.category) newErrors.category = "Category is required";

    // Groups validation
    groups.forEach((group, index) => {
      if (!group.name.trim()) newErrors[`group_${index}_name`] = "Group name is required";
      if (!group.startDate) newErrors[`group_${index}_startDate`] = "Start date is required";
      if (!group.endDate) newErrors[`group_${index}_endDate`] = "End date is required";
      if (!group.price) newErrors[`group_${index}_price`] = "Price is required";
      if (!group.sessionsCount) newErrors[`group_${index}_sessionsCount`] = "Number of sessions is required";
      if (!group.location) newErrors[`group_${index}_location`] = "Location is required";

      // Date validation
      if (group.startDate && group.endDate && new Date(group.endDate) <= new Date(group.startDate)) {
        newErrors[`group_${index}_endDate`] = "End date must be after start date";
      }

      // Price validation
      if (group.price && parseFloat(group.price) <= 0) {
        newErrors[`group_${index}_price`] = "Price must be greater than 0";
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
      const courseWithGroups = {
        ...courseData,
        groups: groups.map(group => ({
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

      console.log('Submitting Course Data:', courseWithGroups);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In real app:
      // const response = await fetch('/api/courses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(courseWithGroups)
      // });

      // if (!response.ok) throw new Error('Failed to create course');

      alert('Course created successfully!');
      router.push("/courses");

    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
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

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create New Course</h1>
            <p className="text-gray-600 mt-2">Create a course and add multiple groups with different schedules</p>
          </div>
          <Link href="/courses">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowLeft size={18} />
              <span>Back to Courses</span>
            </button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Basic Info Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen size={20} />
            Basic Course Information
            <span className="text-sm font-normal text-gray-500 ml-2">
              (Shared among all groups)
            </span>
          </h2>

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
                  placeholder="Detailed description of the course, its content, and goals..."
                  required
                  data-error="description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.description}
                  </p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  Describe what students will learn and achieve in this course
                </div>
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
                      <span className="text-sm font-medium text-gray-700">Upload Image</span>
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
                  <div className="text-xs text-gray-500 mt-1">Separate with commas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Prerequisites & Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Prerequisites */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <AlertCircle size={16} />
                Prerequisites
              </label>
              <textarea
                value={courseData.prerequisites}
                onChange={(e) => handleCourseChange('prerequisites', e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="What the student needs to know before joining..."
              />
              <div className="text-xs text-gray-500 mt-1">
                List required skills or knowledge
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Target size={16} />
                Learning Outcomes
              </label>
              <textarea
                value={courseData.learningOutcomes}
                onChange={(e) => handleCourseChange('learningOutcomes', e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="What the student will learn and achieve..."
              />
              <div className="text-xs text-gray-500 mt-1">
                List specific skills students will gain
              </div>
            </div>
          </div>
        </div>

        {/* Groups Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Users size={20} />
                Course Groups
              </h2>
              <p className="text-gray-600">
                Create multiple groups with different schedules, locations, and prices
              </p>
            </div>
            <button
              type="button"
              onClick={addGroup}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} />
              <span>Add New Group</span>
            </button>
          </div>

          <div className="space-y-6">
            {groups.map((group, index) => (
              <div key={group.id} className="border-2 border-gray-200 rounded-xl p-6">
                {/* Group Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
                      Group {String.fromCharCode(65 + index)}
                    </span>
                    <span>{group.name}</span>
                  </h3>
                  {groups.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGroup(index)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      <span>Remove Group</span>
                    </button>
                  )}
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
                      placeholder="e.g., Morning Group, Evening Group"
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
                      placeholder={
                        group.locationType === 'online'
                          ? 'Zoom/Google Meet link'
                          : 'Physical address'
                      }
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

                  {/* Time Slots */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
                      <span>Class Schedule</span>
                      <button
                        type="button"
                        onClick={() => addTimeSlot(index)}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Plus size={14} />
                        Add Time Slot
                      </button>
                    </label>

                    <div className="space-y-3">
                      {group.timeSlots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center gap-3">
                          <select
                            value={slot.day}
                            onChange={(e) => handleTimeSlotChange(index, slotIndex, 'day', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg p-2"
                          >
                            <option value="">Select Day</option>
                            {daysOfWeek.map(day => (
                              <option key={day.value} value={day.value}>{day.label}</option>
                            ))}
                          </select>

                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) => handleTimeSlotChange(index, slotIndex, 'startTime', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg p-2"
                          />

                          <span className="text-gray-500">to</span>

                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) => handleTimeSlotChange(index, slotIndex, 'endTime', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg p-2"
                          />

                          <button
                            type="button"
                            onClick={() => removeTimeSlot(index, slotIndex)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}

                      {group.timeSlots.length === 0 && (
                        <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                          <p className="text-gray-500">No time slots added yet</p>
                          <p className="text-sm text-gray-400 mt-1">Add when classes will be held</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (EGP) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="number"
                        value={group.price}
                        onChange={(e) => handleGroupChange(index, 'price', e.target.value)}
                        className={`w-full border ${errors[`group_${index}_price`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pl-10`}
                        min="0"
                        step="0.01"
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
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="number"
                        value={group.sessionsCount}
                        onChange={(e) => handleGroupChange(index, 'sessionsCount', e.target.value)}
                        className={`w-full border ${errors[`group_${index}_sessionsCount`] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pl-10`}
                        min="1"
                        required
                        data-error={`group_${index}_sessionsCount`}
                      />
                    </div>
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
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                      <input
                        type="number"
                        value={group.maxStudents}
                        onChange={(e) => handleGroupChange(index, 'maxStudents', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Group Summary */}
                {(group.price || group.sessionsCount) && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={16} />
                      Group Summary
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-bold text-blue-600">{group.price ? `${group.price} EGP` : '--'}</div>
                        <div className="text-gray-600">Price</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-bold text-blue-600">{group.sessionsCount || '--'}</div>
                        <div className="text-gray-600">Sessions</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-bold text-blue-600">
                          {group.locationType === 'online' ? 'Online' : 'Offline'}
                        </div>
                        <div className="text-gray-600">Type</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-bold text-blue-600">{group.maxStudents || 'Unlimited'}</div>
                        <div className="text-gray-600">Max Students</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Groups Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-gray-800 font-medium">Important Information:</p>
                <ul className="text-gray-700 text-sm mt-2 space-y-1">
                  <li>• Each group will have the same course content</li>
                  <li>• Students can enroll in any group that suits their schedule</li>
                  <li>• Groups can have different prices based on schedule</li>
                  <li>• You can add more groups later if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Link href="/courses">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Course...
                </>
              ) : (
                'Save Course and Groups'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;
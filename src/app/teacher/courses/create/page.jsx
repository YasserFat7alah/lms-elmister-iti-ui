"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Save, Plus, Trash2, Upload,
  BookOpen, Calendar, DollarSign, Users,
  MapPin, Link, User, Settings, AlertCircle
} from "lucide-react";

const AddNewCourse = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    // 1. Basic Information
    courseName: "",
    subjectName: "",
    courseTitle: "",
    courseDescription: "",

    // 2. Scheduling
    startDate: "",
    endDate: "",
    scheduleDays: [],
    scheduleTimeFrom: "",
    scheduleTimeTo: "",

    // 3. Pricing
    priceType: "monthly",
    priceAmount: "",

    // 4. Capacity & Enrollment
    allowedStudents: "",

    // 5. Course Delivery
    deliveryType: "online",
    offlineLocation: "",
    onlineLink: "",

    // 6. Group Type
    genderType: "both",

    // 7. Assistant
    assistantId: "",
    assistantPermissions: {
      attendance: false,
      grades: false,
      lessonDesign: false,
      discussionReply: false
    }
  });

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  // Validation rules for each step
  const validationRules = {
    1: (data) => {
      const errors = {};
      if (!data.courseName.trim()) errors.courseName = "Course name is required";
      if (!data.subjectName.trim()) errors.subjectName = "Subject name is required";
      if (!data.courseTitle.trim()) errors.courseTitle = "Course title is required";
      if (!data.courseDescription.trim()) errors.courseDescription = "Course description is required";
      if (data.courseDescription.length < 50) errors.courseDescription = "Description must be at least 50 characters";
      return errors;
    },
    2: (data) => {
      const errors = {};
      if (!data.startDate) errors.startDate = "Start date is required";
      if (data.endDate && new Date(data.endDate) <= new Date(data.startDate)) {
        errors.endDate = "End date must be after start date";
      }
      if (data.scheduleDays.length === 0) errors.scheduleDays = "At least one day must be selected";
      if (!data.scheduleTimeFrom) errors.scheduleTimeFrom = "Start time is required";
      if (!data.scheduleTimeTo) errors.scheduleTimeTo = "End time is required";
      if (data.scheduleTimeFrom && data.scheduleTimeTo && data.scheduleTimeFrom >= data.scheduleTimeTo) {
        errors.scheduleTimeTo = "End time must be after start time";
      }
      return errors;
    },
    3: (data) => {
      const errors = {};
      if (!data.priceAmount || parseFloat(data.priceAmount) <= 0) errors.priceAmount = "Valid price amount is required";
      if (!data.allowedStudents || parseInt(data.allowedStudents) < 1) errors.allowedStudents = "Valid student count is required";
      return errors;
    },
    4: (data) => {
      const errors = {};
      if (data.deliveryType === "offline" && !data.offlineLocation.trim()) {
        errors.offlineLocation = "Offline location is required for offline courses";
      }
      if (data.deliveryType === "online" && !data.onlineLink.trim()) {
        errors.onlineLink = "Online link is required for online courses";
      }
      if (data.deliveryType === "both" && (!data.offlineLocation.trim() || !data.onlineLink.trim())) {
        if (!data.offlineLocation.trim()) errors.offlineLocation = "Offline location is required";
        if (!data.onlineLink.trim()) errors.onlineLink = "Online link is required";
      }
      return errors;
    }
  };

  const validateStep = (step) => {
    const stepErrors = validationRules[step](formData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      scheduleDays: prev.scheduleDays.includes(day)
        ? prev.scheduleDays.filter(d => d !== day)
        : [...prev.scheduleDays, day]
    }));

    // Clear schedule days error when user selects a day
    if (errors.scheduleDays) {
      setErrors(prev => ({
        ...prev,
        scheduleDays: ""
      }));
    }
  };

  const handlePermissionToggle = (permission) => {
    setFormData(prev => ({
      ...prev,
      assistantPermissions: {
        ...prev.assistantPermissions,
        [permission]: !prev.assistantPermissions[permission]
      }
    }));
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setActiveStep(prev => prev - 1);
    // Clear errors when going back
    setErrors({});
  };

  // 🔥 API INTEGRATION POINT - Replace this with your actual API call
//   const createCourseAPI = async (courseData) => {
//     try {
//       // 📍 REPLACE THIS WITH YOUR ACTUAL API ENDPOINT
//       const response = await fetch('/api/courses/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add authentication headers if needed
//           // 'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(courseData)
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error('API Call Failed:', error);
//       throw error;
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let allValid = true;
    for (let step = 1; step <= 4; step++) {
      const stepErrors = validationRules[step](formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        allValid = false;
        setActiveStep(step); // Go to the first step with errors
        break;
      }
    }

    if (!allValid) {
      alert("Please fix all validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 🔥 API CALL - Create course
    //   const result = await createCourseAPI(formData);
      
    //   console.log("Course created successfully:", result);
      
      // Show success message
      alert("Course created successfully!");
      
      // Redirect to courses page after success
      router.push("/teacher/courses");
      
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Basic Information", icon: BookOpen },
    { number: 2, title: "Scheduling", icon: Calendar },
    { number: 3, title: "Pricing", icon: DollarSign },
    { number: 4, title: "Settings", icon: Settings }
  ];

  const StepProgress = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                activeStep >= step.number
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}>
                {activeStep > step.number ? (
                  <div className="w-4 h-4 bg-white rounded-full" />
                ) : (
                  <Icon size={18} />
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-500">Step {step.number}</p>
                <p className="text-sm font-semibold text-gray-800">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  activeStep > step.number ? "bg-blue-600" : "bg-gray-300"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    message && (
      <div className="flex items-center space-x-1 mt-1 text-red-600 text-sm">
        <AlertCircle size={14} />
        <span>{message}</span>
      </div>
    )
  );

  return (
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/teachers/courses")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Courses</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Add New Course</h1>
                <p className="text-gray-600">Create a new course for your students</p>
              </div>
            </div>
          </div>
        </div>

        <StepProgress />

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {activeStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <BookOpen size={20} />
                <span>Basic Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.courseName}
                    onChange={(e) => handleInputChange("courseName", e.target.value)}
                    placeholder="e.g., JavaScript - Level 1"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.courseName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <ErrorMessage message={errors.courseName} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subjectName}
                    onChange={(e) => handleInputChange("subjectName", e.target.value)}
                    placeholder="e.g., Programming, Mathematics, Arabic"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.subjectName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <ErrorMessage message={errors.subjectName} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.courseTitle}
                  onChange={(e) => handleInputChange("courseTitle", e.target.value)}
                  placeholder="e.g., Strong introduction to understand programming basics from scratch"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.courseTitle ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                <ErrorMessage message={errors.courseTitle} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.courseDescription}
                  onChange={(e) => handleInputChange("courseDescription", e.target.value)}
                  placeholder="Describe your course content, objectives, and what students will learn..."
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    errors.courseDescription ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                <ErrorMessage message={errors.courseDescription} />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.courseDescription.length}/50 characters minimum
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Scheduling */}
          {activeStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <Calendar size={20} />
                <span>Scheduling</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.startDate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <ErrorMessage message={errors.startDate} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.endDate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <ErrorMessage message={errors.endDate} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Schedule Days *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        formData.scheduleDays.includes(day)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <ErrorMessage message={errors.scheduleDays} />
                {formData.scheduleDays.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    Selected: {formData.scheduleDays.join(", ")}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Time From *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.scheduleTimeFrom}
                    onChange={(e) => handleInputChange("scheduleTimeFrom", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.scheduleTimeFrom ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <ErrorMessage message={errors.scheduleTimeFrom} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Time To *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.scheduleTimeTo}
                    onChange={(e) => handleInputChange("scheduleTimeTo", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.scheduleTimeTo ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  <ErrorMessage message={errors.scheduleTimeTo} />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {activeStep === 3 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <DollarSign size={20} />
                <span>Pricing & Capacity</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Type *
                  </label>
                  <select
                    required
                    value={formData.priceType}
                    onChange={(e) => handleInputChange("priceType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="monthly">Monthly Subscription</option>
                    <option value="per_lessons">Per Lessons Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Amount ({formData.priceType === 'monthly' ? 'per month' : 'per package'}) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.priceAmount}
                      onChange={(e) => handleInputChange("priceAmount", e.target.value)}
                      placeholder="0.00"
                      className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.priceAmount ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                  <ErrorMessage message={errors.priceAmount} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Students *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.allowedStudents}
                  onChange={(e) => handleInputChange("allowedStudents", e.target.value)}
                  placeholder="e.g., 15"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.allowedStudents ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                <ErrorMessage message={errors.allowedStudents} />
                <p className="text-sm text-gray-500 mt-1">
                  This will show "remaining seats" to students during registration.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Settings */}
          {activeStep === 4 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <Settings size={20} />
                <span>Course Settings</span>
              </h2>

              {/* Delivery Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Course Delivery Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["online", "offline", "both"].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange("deliveryType", type)}
                      className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        formData.deliveryType === type
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium capitalize">{type}</div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.deliveryType !== "online" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offline Location {formData.deliveryType === "both" ? "*" : ""}
                  </label>
                  <div className="flex items-center space-x-2">
                    <MapPin size={18} className="text-gray-400" />
                    <input
                      type="text"
                      value={formData.offlineLocation}
                      onChange={(e) => handleInputChange("offlineLocation", e.target.value)}
                      placeholder="Enter physical location address"
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.offlineLocation ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                  <ErrorMessage message={errors.offlineLocation} />
                </div>
              )}

              {formData.deliveryType !== "offline" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Online Meeting Link {formData.deliveryType === "both" ? "*" : ""}
                  </label>
                  <div className="flex items-center space-x-2">
                    <Link size={18} className="text-gray-400" />
                    <input
                      type="url"
                      value={formData.onlineLink}
                      onChange={(e) => handleInputChange("onlineLink", e.target.value)}
                      placeholder="https://zoom.us/j/..."
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.onlineLink ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                  <ErrorMessage message={errors.onlineLink} />
                </div>
              )}

              {/* Gender Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Student Gender Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["male", "female", "both"].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange("genderType", type)}
                      className={`p-4 border-2 rounded-lg text-center transition-colors ${
                        formData.genderType === type
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium capitalize">{type}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Assistant Settings */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <User size={18} />
                  <span>Assistant Settings</span>
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant (Optional)
                  </label>
                  <select
                    value={formData.assistantId}
                    onChange={(e) => handleInputChange("assistantId", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an assistant</option>
                    <option value="assistant1">Assistant 1</option>
                    <option value="assistant2">Assistant 2</option>
                  </select>
                </div>

                {formData.assistantId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Assistant Permissions
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.keys(formData.assistantPermissions).map(permission => (
                        <label key={permission} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.assistantPermissions[permission]}
                            onChange={() => handlePermissionToggle(permission)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {permission.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={activeStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {activeStep < steps.length ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={18} />
                <span>{isSubmitting ? "Creating Course..." : "Create Course"}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    
  );
};

export default AddNewCourse;
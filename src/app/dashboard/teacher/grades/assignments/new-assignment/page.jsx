"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, Plus, Trash2,
  FileText, Calendar, Clock, BookOpen,
  Users, Calculator, Upload, Link as LinkIcon
} from "lucide-react";

const CreateAssignmentPage = () => {
  const router = useRouter();

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    courseId: "",
    groupId: "",
    type: "homework",
    totalPoints: 100,
    dueDate: "",
    dueTime: "",
    instructions: "",
    attachments: [],
    gradingCriteria: [],
    weight: 30,
    visibility: "visible"
  });

  const [criteria, setCriteria] = useState([
    { id: 1, title: "Scientific Accuracy", points: 40 },
    { id: 2, title: "Methodology and Organization", points: 30 },
    { id: 3, title: "Creativity and Innovation", points: 20 },
    { id: 4, title: "Formatting and Aesthetics", points: 10 }
  ]);

  // Test Data
  const courses = [
    { id: 1, name: "Integrated Web Development" },
    { id: 2, name: "Advanced React.js" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "JavaScript from Scratch" }
  ];

  const groups = [
    { id: 1, name: "Morning Group", courseId: 1 },
    { id: 2, name: "Evening Group", courseId: 1 },
    { id: 3, name: "Intensive Group", courseId: 2 },
    { id: 4, name: "Basic Group", courseId: 3 }
  ];

  const assignmentTypes = [
    { value: "homework", label: "Homework" },
    { value: "quiz", label: "Quiz" },
    { value: "exam", label: "Exam" },
    { value: "project", label: "Project" },
    { value: "presentation", label: "Presentation" }
  ];

  const handleChange = (field, value) => {
    setAssignmentData({
      ...assignmentData,
      [field]: value
    });
  };

  const handleAddCriterion = () => {
    const newCriterion = {
      id: criteria.length + 1,
      title: "New Criterion",
      points: 0
    };
    setCriteria([...criteria, newCriterion]);
  };

  const handleUpdateCriterion = (id, field, value) => {
    setCriteria(criteria.map(criterion =>
      criterion.id === id ? { ...criterion, [field]: value } : criterion
    ));
  };

  const handleRemoveCriterion = (id) => {
    setCriteria(criteria.filter(criterion => criterion.id !== id));
  };

  const calculateTotalCriteriaPoints = () => {
    return criteria.reduce((total, criterion) => total + parseInt(criterion.points || 0), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const assignmentWithCriteria = {
      ...assignmentData,
      gradingCriteria: criteria,
      totalPoints: calculateTotalCriteriaPoints() || assignmentData.totalPoints
    };

    console.log('Assessment Data:', assignmentWithCriteria);

    alert('Assessment created successfully!');
    router.push("/grades");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Assessment</h1>
            <p className="text-gray-600 mt-2">Add a new assessment and define grading criteria</p>
          </div>
          <Link href="/grades">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors rtl:space-x-reverse">
              <ArrowLeft size={20} />
              <span>Back to Assessments</span>
            </button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Title *
              </label>
              <input
                type="text"
                value={assignmentData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Enter assessment title"
                required
              />
            </div>

            {/* Course & Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course *
                </label>
                <select
                  value={assignmentData.courseId}
                  onChange={(e) => handleChange('courseId', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group *
                </label>
                <select
                  value={assignmentData.groupId}
                  onChange={(e) => handleChange('groupId', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  required
                >
                  <option value="">Select Group</option>
                  {groups
                    .filter(group => group.courseId == assignmentData.courseId)
                    .map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* Type & Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Type *
                </label>
                <select
                  value={assignmentData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  required
                >
                  {assignmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (%) *
                </label>
                <div className="relative">
                  <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="number"
                    value={assignmentData.weight}
                    onChange={(e) => handleChange('weight', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Due Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="date"
                    value={assignmentData.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="time"
                    value={assignmentData.dueTime}
                    onChange={(e) => handleChange('dueTime', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Description
              </label>
              <textarea
                value={assignmentData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Detailed description of the assessment and its goals"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions
              </label>
              <textarea
                value={assignmentData.instructions}
                onChange={(e) => handleChange('instructions', e.target.value)}
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Detailed instructions for students on how to complete the assessment"
              />
            </div>
          </div>
        </div>

        {/* Grading Criteria */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Grading Criteria</h2>
            <button
              type="button"
              onClick={handleAddCriterion}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors rtl:space-x-reverse"
            >
              <Plus size={18} />
              <span>Add Criterion</span>
            </button>
          </div>

          <div className="space-y-4">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-800">
                    Criterion #{criterion.id}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveCriterion(criterion.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Criterion Title
                    </label>
                    <input
                      type="text"
                      value={criterion.title}
                      onChange={(e) => handleUpdateCriterion(criterion.id, 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points (out of {assignmentData.totalPoints})
                    </label>
                    <div className="relative">
                      <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="number"
                        value={criterion.points}
                        onChange={(e) => handleUpdateCriterion(criterion.id, 'points', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                        min="0"
                        max={assignmentData.totalPoints}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Points Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-800">Total Points</h4>
                <p className="text-sm text-gray-600">Sum of all grading criteria</p>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {calculateTotalCriteriaPoints()}/{assignmentData.totalPoints}
              </div>
            </div>
          </div>
        </div>

        {/* Visibility & Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Additional Settings</h2>

          <div className="space-y-6">
            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibility to Students
              </label>
              <select
                value={assignmentData.visibility}
                onChange={(e) => handleChange('visibility', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="visible">Visible Immediately</option>
                <option value="scheduled">Scheduled</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Drag and drop files here or click to select</p>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Select Files
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-end space-x-4 rtl:space-x-reverse">
            <Link href="/grades">
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Save size={20} />
              <span>Save Assessment</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignmentPage;
"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, Plus, Trash2,
  Calendar, Clock, Video, FileText,
  Image, Link as LinkIcon
} from "lucide-react";

const CreateLessonPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId;
  const groupId = params.groupId;

  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 120,
    type: "online",
    meetingLink: "",
    materials: [],
    sections: []
  });

  const [sectionTemplates, setSectionTemplates] = useState([
    { id: 1, title: "Pre-Lesson Homework", type: "pre_homework", defaultContent: "Please review the previous material" },
    { id: 2, title: "Post-Lesson Homework", type: "post_homework", defaultContent: "Solve the following exercises" },
    { id: 3, title: "Teacher Notes", type: "teacher_notes", defaultContent: "Important notes for the lesson" },
    { id: 4, title: "Mood Survey", type: "mood_survey", defaultContent: "How do you feel today?" },
    { id: 5, title: "Feedback Survey", type: "feedback_survey", defaultContent: "What are the weak points?" }
  ]);

  const [sections, setSections] = useState([]);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleChange = (field, value) => {
    setLessonData({
      ...lessonData,
      [field]: value
    });
  };

  const addSection = (template) => {
    const newSection = {
      id: Date.now(),
      type: template.type,
      title: template.title,
      content: template.defaultContent,
      isActive: true,
      visibleFrom: "",
      visibleUntil: ""
    };

    setSections([...sections, newSection]);
    setShowTemplates(false);
  };

  const removeSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lessonWithSections = {
      ...lessonData,
      sections: sections
    };

    console.log('Lesson Data:', lessonWithSections);

    alert('Lesson created successfully!');
    router.push(`/courses/${courseId}/groups/${groupId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Lesson</h1>
            <p className="text-gray-600 mt-2">Add a new lesson to the group</p>
          </div>
          <Link href={`/courses/${courseId}/groups/${groupId}`}>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors rtl:space-x-reverse">
              <ArrowLeft size={20} />
              <span>Back to Group</span>
            </button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Lesson Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Lesson Information</h2>

          <div className="space-y-6">
            {/* Title & Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title *
              </label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Enter lesson title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Description
              </label>
              <textarea
                value={lessonData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Brief description of the lesson"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="date"
                    value={lessonData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="time"
                    value={lessonData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  value={lessonData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  min="30"
                  max="480"
                  required
                />
              </div>
            </div>

            {/* Lesson Type & Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Type
                </label>
                <select
                  value={lessonData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              {lessonData.type === "online" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meeting Link
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="url"
                      value={lessonData.meetingLink}
                      onChange={(e) => handleChange('meetingLink', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lesson Builder Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Lesson Builder</h2>
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors rtl:space-x-reverse"
            >
              <Plus size={20} />
              <span>Add Section</span>
            </button>
          </div>

          {/* Templates Picker */}
          {showTemplates && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3">Choose Section Type:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sectionTemplates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => addSection(template)}
                    className="bg-white border rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-800">{template.title}</div>
                    <div className="text-sm text-gray-600 mt-1">Default Template</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sections List */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800">{section.title}</h4>
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <label className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input
                        type="checkbox"
                        checked={section.isActive}
                        onChange={(e) => updateSection(section.id, 'isActive', e.target.checked)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-600">Active</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Section Content */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-3"
                      rows="4"
                      placeholder="Section content..."
                    />
                  </div>

                  {/* Visibility Settings for Homework Sections */}
                  {['pre_homework', 'post_homework'].includes(section.type) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visible From
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                          <input
                            type="datetime-local"
                            value={section.visibleFrom}
                            onChange={(e) => updateSection(section.id, 'visibleFrom', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visible Until
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                          <input
                            type="datetime-local"
                            value={section.visibleUntil}
                            onChange={(e) => updateSection(section.id, 'visibleUntil', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {sections.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No sections added</h3>
                <p className="text-gray-500 mb-6">Click "Add Section" to start building the lesson</p>
                <button
                  type="button"
                  onClick={() => setShowTemplates(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add First Section
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-end space-x-4 rtl:space-x-reverse">
            <Link href={`/courses/${courseId}/groups/${groupId}`}>
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
              <span>Save Lesson</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLessonPage;
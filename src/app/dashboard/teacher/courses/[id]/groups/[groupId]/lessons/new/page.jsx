"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { mockGroups, mockCourses } from "@/utils/mockData";

export default function NewLessonPage() {
  const router = useRouter();
  const params = useParams();

  const courseId = params.id;
  const groupId = params.groupId;

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [group, setGroup] = useState(null);
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    courseId: courseId,
    groupId: groupId,
    lessonType: "video",
    content: "",
    duration: "",
    scheduledDate: "",
    isPublished: false,
    order: 1,
  });

  useEffect(() => {
    if (!courseId || !groupId) return;

    setTimeout(() => {
      const foundCourse = mockCourses.find((c) => c.id == courseId);
      const foundGroup = mockGroups.find(
        (g) => g.id == groupId && g.courseId == courseId
      );

      setCourse(foundCourse);
      setGroup(foundGroup);
      setLoading(false);
    }, 400);
  }, [courseId, groupId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLessonData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating lesson:", lessonData);

    router.push(`/teacher/courses/${courseId}/groups/${groupId}/lessons`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!group || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Group not found
          </h2>
          <Link
            href={`/teacher/courses/${courseId}/groups`}
            className="text-blue-600"
          >
            Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <Link href="/teacher/courses" className="text-gray-600 hover:text-blue-600">
              Courses
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>

          <li>
            <Link href={`/teacher/courses/${courseId}`} className="text-gray-600 hover:text-blue-600">
              {course.title}
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>

          <li>
            <Link href={`/teacher/courses/${courseId}/groups`} className="text-gray-600 hover:text-blue-600">
              Groups
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>

          <li>
            <Link href={`/teacher/courses/${courseId}/groups/${groupId}/lessons`} className="text-gray-600 hover:text-blue-600">
              {group.name} Lessons
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>

          <li>
            <span className="text-blue-600 font-medium">New Lesson</span>
          </li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Lesson</h1>
          <p className="text-gray-600 mt-2">
            Add a new lesson to {group.name} in {course.title}
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Group Schedule:</strong> {group.schedule}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={lessonData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter lesson title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={lessonData.scheduledDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={lessonData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what will be covered in this lesson"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={lessonData.order}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Order of this lesson in the group
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Type *
                  </label>
                  <select
                    name="lessonType"
                    value={lessonData.lessonType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="video">Video Lesson</option>
                    <option value="article">Article/Text</option>
                    <option value="live">Live Session</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h3>

              {lessonData.lessonType === "video" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL *
                    </label>
                    <input
                      type="url"
                      name="content"
                      value={lessonData.content}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/video"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (HH:MM)
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={lessonData.duration}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="00:45"
                    />
                  </div>
                </div>
              )}

              {lessonData.lessonType === "article" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Content *
                  </label>
                  <textarea
                    name="content"
                    value={lessonData.content}
                    onChange={handleInputChange}
                    rows="10"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your article content here..."
                    required
                  />
                </div>
              )}

              {lessonData.lessonType === "live" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Session Link *
                    </label>
                    <input
                      type="url"
                      name="content"
                      value={lessonData.content}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://meet.google.com/abc-defg-hij"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="startTime"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        name="endTime"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={lessonData.isPublished}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                    Publish lesson immediately
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowComments"
                    name="allowComments"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowComments" className="ml-2 block text-sm text-gray-900">
                    Allow students to comment on this lesson
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireCompletion"
                    name="requireCompletion"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="requireCompletion" className="ml-2 block text-sm text-gray-900">
                    Require completion to proceed to next lesson
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <Link
              href={`/teacher/courses/${courseId}/groups/${groupId}/lessons`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

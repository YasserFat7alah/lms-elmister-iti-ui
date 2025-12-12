"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { mockLessons, mockGroups, mockCourses } from "@/utils/mockData";

export default function GroupLessonsPage() {
  const router = useRouter();
  const params = useParams();

  const courseId = params.id;
  const groupId = params.groupId;

  
  const [lessons, setLessons] = useState([]);
  const [group, setGroup] = useState(null);
  const [course, setCourse] = useState(null);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !groupId) return;

    // Simulate API call
    setTimeout(() => {
      const foundCourse = mockCourses.find(c => c.id === courseId);
      const foundGroup = mockGroups.find(g => g.id === groupId && g.courseId === courseId);
      const groupLessons = mockLessons.filter(l => 
        l.courseId === courseId && l.groupId === groupId
      );

      setCourse(foundCourse);
      setGroup(foundGroup);
      setLessons(groupLessons);
      setFilteredLessons(groupLessons);
      setLoading(false);
    }, 500);
  }, [courseId, groupId]);

  useEffect(() => {
    let filtered = lessons;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lesson => 
        statusFilter === 'published' ? lesson.isPublished : !lesson.isPublished
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLessons(filtered);
  }, [statusFilter, searchQuery, lessons]);

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Group not found</h2>
          <Link href={`/teacher/courses/${courseId}/groups`} className="text-blue-600">
            Back to Groups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Breadcrumb */}
      <div className="mb-8">
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link href="/teacher/courses" className="text-gray-600 hover:text-blue-600">
                Courses
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/teacher/courses/${courseId}`} className="text-gray-600 hover:text-blue-600">
                {course.title}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/teacher/courses/${courseId}/groups`} className="text-gray-600 hover:text-blue-600">
                Groups
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <span className="text-blue-600 font-medium">{group.name} Lessons</span>
            </li>
          </ol>
        </nav>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{group.name} - Lessons</h1>
            <p className="text-gray-600 mt-2">
              Manage lessons for {group.name} in {course.title}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {course.title}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Schedule: {group.schedule}
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {group.currentStudents}/{group.maxStudents} Students
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Link
              href={`/teacher/courses/${courseId}/groups/${groupId}/lessons/new`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Lesson
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No lessons yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first lesson to this group</p>
            <Link
              href={`/teacher/courses/${courseId}/groups/${groupId}/lessons/new`}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create First Lesson
            </Link>
          </div>
        ) : (
          filteredLessons.map(lesson => (
            <div key={lesson.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition">
              {/* Lesson Header */}
              <div className={`p-4 ${
                lesson.content.type === 'video' ? 'bg-red-50' :
                lesson.content.type === 'quiz' ? 'bg-green-50' :
                lesson.content.type === 'article' ? 'bg-blue-50' :
                'bg-purple-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lesson.content.type === 'video' ? 'bg-red-100 text-red-800' :
                      lesson.content.type === 'quiz' ? 'bg-green-100 text-green-800' :
                      lesson.content.type === 'article' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {lesson.content.type.charAt(0).toUpperCase() + lesson.content.type.slice(1)}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    lesson.isPublished
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lesson.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">{lesson.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
              </div>

              {/* Lesson Content */}
              <div className="p-4">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Scheduled: {new Date(lesson.scheduledDate).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lesson.content.type === 'video' ? lesson.content.duration : 
                     lesson.content.type === 'article' ? lesson.content.readingTime : 
                     '45 min'}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {lesson.views} views
                    </div>
                    
                    <div className="text-sm font-medium">
                      {lesson.completionRate}% completion
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Student Progress</span>
                    <span className="font-medium">{lesson.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${lesson.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <Link
                      href={`/teacher/courses/${courseId}/groups/${groupId}/lessons/${lesson.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </Link>
                    <Link
                      href={`/teacher/courses/${courseId}/groups/${groupId}/lessons/${lesson.id}/edit`}
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                  <Link
                    href={`/teacher/attendance?lesson=${lesson.id}`}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Attendance
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
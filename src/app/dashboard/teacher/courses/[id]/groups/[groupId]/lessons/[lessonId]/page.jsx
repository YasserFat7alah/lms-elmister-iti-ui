// /app/dashboard/teacher/courses/[id]/groups/[groupId]/lessons/[lessonId]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { use } from 'react'; // ✅ إضافة use من React
import { mockLessons, mockGroups, mockCourses } from '@/utils/mockData';

export default function LessonDetailPage({ params }) {
  // ✅ استخدام React.use() لتفكيك Promise
  const { id: courseId, groupId, lessonId } = use(params);
  
  const [lesson, setLesson] = useState(null);
  const [group, setGroup] = useState(null);
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // البحث الفوري في البيانات
    const foundCourse = mockCourses.find(c => c.id === courseId);
    const foundGroup = mockGroups.find(g => g.id === groupId && g.courseId === courseId);
    const foundLesson = mockLessons.find(l =>
      l.id === lessonId && l.courseId === courseId && l.groupId === groupId
    );

    if (foundCourse && foundGroup && foundLesson) {
      setCourse(foundCourse);
      setGroup(foundGroup);
      setLesson(foundLesson);
      setAttendance(foundLesson.attendance || []);
    }
  }, [courseId, groupId, lessonId]);

  // عرض تحميل بسيط
  if (!course || !group || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-600 mb-4">
            <Link href="/dashboard/teacher/courses" className="hover:text-blue-600">
              Courses
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/dashboard/teacher/courses/${courseId}`} className="hover:text-blue-600">
              {course.title}
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/dashboard/teacher/courses/${courseId}/groups`} className="hover:text-blue-600">
              Groups
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons`} className="hover:text-blue-600">
              {group.name} Lessons
            </Link>
            <span className="mx-2">›</span>
            <span className="text-blue-600 font-medium">{lesson.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {lesson.title}
              </h1>
              <p className="text-gray-600 mt-2">{lesson.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {course.title}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {group.name}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  lesson.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {lesson.isPublished ? 'Published' : 'Draft'}
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm capitalize">
                  {lesson.content.type}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit Lesson
              </Link>
              <Link
                href={`/dashboard/teacher/attendance?lesson=${lessonId}&group=${groupId}`}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Take Attendance
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Lesson Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium capitalize">{lesson.content.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="font-medium">{new Date(lesson.scheduledDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order</p>
                  <p className="font-medium">Lesson {lesson.order}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">
                    {lesson.content.type === 'video' ? lesson.content.duration || '45:00' : 
                     lesson.content.type === 'article' ? lesson.content.readingTime || '15 min' : '60 min'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Group Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{group.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Schedule</p>
                  <p className="font-medium">{group.schedule}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="font-medium">
                    {group.currentStudents}/{group.maxStudents}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Views</p>
                  <p className="text-2xl font-bold">{lesson.views}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${lesson.completionRate}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-medium">{lesson.completionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b">
                <div className="flex">
                  {['content', 'attendance', 'resources', 'analytics'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'content' && (
                  <div>
                    {lesson.content.type === 'video' && (
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                        <div className="text-white text-center">
                          <div className="text-6xl mb-4">▶️</div>
                          <p className="text-xl">Video Lesson</p>
                          <p className="text-gray-400 mt-2">{lesson.content.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {lesson.content.type === 'article' && (
                      <div className="prose max-w-none">
                        <p>{lesson.content.content}</p>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{lesson.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'attendance' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Attendance</h3>
                    {attendance.length > 0 ? (
                      <div className="space-y-3">
                        {attendance.map((record, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <p className="font-medium">Student {index + 1}</p>
                              <p className="text-sm text-gray-500">ID: {record.studentId}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              record.status === 'present' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {record.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No attendance recorded.</p>
                    )}
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    {lesson.content.resources && lesson.content.resources.length > 0 ? (
                      <div className="grid gap-3">
                        {lesson.content.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            className="flex items-center p-3 border rounded hover:bg-gray-50"
                          >
                            <div className="p-2 bg-gray-100 rounded mr-3">
                              <span className="text-gray-700">
                                {resource.type === 'pdf' ? '📄' : '📝'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-gray-500">{resource.type}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No resources available.</p>
                    )}
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Analytics</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm text-gray-600">Views</p>
                        <p className="text-2xl font-bold">{lesson.views}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm text-gray-600">Completion Rate</p>
                        <p className="text-2xl font-bold">{lesson.completionRate}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons`}
                className="bg-white border p-4 rounded text-center hover:shadow"
              >
                <div className="text-blue-600 text-2xl mb-2">📚</div>
                <p>All Lessons</p>
              </Link>
              
              <Link
                href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}`}
                className="bg-white border p-4 rounded text-center hover:shadow"
              >
                <div className="text-green-600 text-2xl mb-2">👥</div>
                <p>Group Details</p>
              </Link>
              
              <Link
                href={`/dashboard/teacher/courses/${courseId}`}
                className="bg-white border p-4 rounded text-center hover:shadow"
              >
                <div className="text-purple-600 text-2xl mb-2">🏫</div>
                <p>Course Page</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
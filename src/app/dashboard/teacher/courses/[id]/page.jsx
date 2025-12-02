"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Edit, Trash2, Eye, Download, Share2, 
  BookOpen, Clock, Users, DollarSign, BarChart3,
  FileText, Video, MessageCircle, Settings,
  Calendar, Tag, Globe, Lock
} from "lucide-react";

const CourseDetails = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  
  const [activeTab, setActiveTab] = useState("overview");

  // Mock course data - in real app, you would fetch this based on courseId
  const course = {
    id: courseId,
    title: "Information About UI/UX Design & Degree",
    description: "Complete guide to UI/UX design principles and degree programs. Learn the fundamentals of user interface and user experience design with practical examples and real-world projects.",
    price: 200,
    originalPrice: 900,
    lessons: "12+ Lessons",
    duration: "9hr 30min",
    students: 45,
    status: "published",
    category: "Design",
    level: "Beginner to Advanced",
    language: "English",
    lastUpdated: "2024-01-15",
    created: "2024-01-10",
    rating: 4.8,
    reviews: 128,
    image: "/api/placeholder/600/400"
  };

  // Course curriculum
  const curriculum = [
    {
      section: "Introduction to UI/UX Design",
      lessons: [
        { title: "What is UI/UX Design?", duration: "15:30", type: "video", completed: true },
        { title: "Design Principles", duration: "22:15", type: "video", completed: true },
        { title: "User Research Methods", duration: "18:45", type: "video", completed: false },
        { title: "Introduction Quiz", duration: "10:00", type: "quiz", completed: false }
      ]
    },
    {
      section: "Design Tools",
      lessons: [
        { title: "Figma Basics", duration: "25:20", type: "video", completed: false },
        { title: "Adobe XD Tutorial", duration: "30:15", type: "video", completed: false },
        { title: "Sketch for Beginners", duration: "28:30", type: "video", completed: false }
      ]
    },
    {
      section: "Advanced Topics",
      lessons: [
        { title: "Design Systems", duration: "35:45", type: "video", completed: false },
        { title: "Prototyping", duration: "29:20", type: "video", completed: false },
        { title: "Final Project", duration: "45:00", type: "assignment", completed: false }
      ]
    }
  ];

  // Student progress
  const studentProgress = [
    { name: "John Doe", progress: 100, lastActivity: "2 hours ago" },
    { name: "Jane Smith", progress: 75, lastActivity: "1 day ago" },
    { name: "Mike Johnson", progress: 50, lastActivity: "2 days ago" },
    { name: "Sarah Wilson", progress: 25, lastActivity: "3 days ago" },
    { name: "David Brown", progress: 10, lastActivity: "1 week ago" }
  ];

  // Course analytics
  const analytics = {
    totalEnrollments: 45,
    completionRate: "68%",
    averageRating: 4.8,
    totalRevenue: 9000,
    activeStudents: 32
  };

  const handleDeleteCourse = () => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      console.log("Deleting course:", courseId);
      // Add your delete logic here, then redirect
      router.push("/teachers/courses");
    }
  };

  const handleEditCourse = () => {
    router.push(`/teachers/courses/${courseId}/edit`);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "students", label: "Students", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
                <p className="text-gray-600">Course ID: {course.id}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Eye size={18} />
                <span>Preview</span>
              </button>
              
              <button
                onClick={handleEditCourse}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Edit size={18} />
                <span>Edit Course</span>
              </button>
              
              <button
                onClick={handleDeleteCourse}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={18} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
             {/* lessons and  */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Lessons</h3>
                  <div className="flex space-x-4">
                 
<button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
  <BookOpen size={18} />
  <span>lessons add</span> <Edit size={18}/>
</button>
                
                  </div>
                </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="text-blue-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{course.students}</p>
            <p className="text-sm text-gray-600">Students</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BookOpen className="text-green-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{course.lessons}</p>
            <p className="text-sm text-gray-600">Lessons</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="text-purple-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{course.duration}</p>
            <p className="text-sm text-gray-600">Duration</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <DollarSign className="text-yellow-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">${course.price}</p>
            <p className="text-sm text-gray-600">Price</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="text-red-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{course.rating}</p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="text-indigo-600" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{course.reviews}</p>
            <p className="text-sm text-gray-600">Reviews</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Course Description */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Description</h3>
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                  </div>

                  {/* Course Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{course.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-medium">{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium">{course.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{course.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">{course.created}</span>
                      </div>
                    </div>
                  </div>
                </div>

           
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === "curriculum" && (
              <div className="space-y-6">
                {curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">{section.section}</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center justify-between px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {lesson.type === 'video' && <Video size={16} />}
                              {lesson.type === 'quiz' && <FileText size={16} />}
                              {lesson.type === 'assignment' && <FileText size={16} />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{lesson.title}</p>
                              <p className="text-sm text-gray-500">{lesson.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson.completed && (
                              <span className="text-green-600 text-sm font-medium">Completed</span>
                            )}
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Activity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {studentProgress.map((student, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {student.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {student.lastActivity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-800">Total Enrollments</h4>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{analytics.totalEnrollments}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800">Completion Rate</h4>
                    <p className="text-3xl font-bold text-green-600 mt-2">{analytics.completionRate}</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-yellow-800">Average Rating</h4>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{analytics.averageRating}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-purple-800">Total Revenue</h4>
                    <p className="text-3xl font-bold text-purple-600 mt-2">${analytics.totalRevenue}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-red-800">Active Students</h4>
                    <p className="text-3xl font-bold text-red-600 mt-2">{analytics.activeStudents}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Course Visibility</h4>
                        <p className="text-sm text-gray-600">Make course public or private</p>
                      </div>
                      <select className="border border-gray-300 rounded-lg px-3 py-2">
                        <option>Public</option>
                        <option>Private</option>
                        <option>Draft</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Enrollment</h4>
                        <p className="text-sm text-gray-600">Allow new enrollments</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">Certificate</h4>
                        <p className="text-sm text-gray-600">Issue certificates on completion</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    
  );
};

export default CourseDetails;
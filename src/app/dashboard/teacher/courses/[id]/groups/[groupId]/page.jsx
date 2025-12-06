"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Edit, Trash2, Eye, Users, Calendar,
  MapPin, DollarSign, Clock, BookOpen, Plus,
  BarChart3, FileText, Video, MessageCircle,
  Settings, Download, Share2, Copy, Mail,
  Phone, Globe, Building, CheckCircle, XCircle,
  AlertCircle, ChevronRight, ExternalLink,
  Upload, MoreVertical, MessageSquare,
  Award, Target, Star, TrendingUp, Bell,
  Users as UsersIcon, Calendar as CalendarIcon,
  FileText as FileTextIcon, Video as VideoIcon,
  FileText as AssignmentIcon, Paperclip
} from "lucide-react";

const GroupManagementPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId;
  const groupId = params.groupId;

  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCopyLink, setShowCopyLink] = useState(false);

  // Group Data
  const [group, setGroup] = useState({
    id: groupId,
    name: "Morning Group - Web Development",
    code: "GRP-WD-MAR24",
    schedule: "Sat, Mon, Wed - 10:00 AM to 12:00 PM",
    startDate: "2024-03-01",
    endDate: "2024-05-24",
    locationType: "online",
    location: "https://zoom.us/j/123456789",
    meetingId: "123 456 789",
    meetingPassword: "webdev123",
    price: 1500,
    discountPrice: 1200,
    currency: "USD",
    sessionsCount: 24,
    totalHours: 48,
    maxStudents: 30,
    currentStudents: 15,
    waitlist: 3,
    status: "active",
    description: "Morning study group focusing on web development fundamentals with hands-on projects. Perfect for beginners looking to start their coding journey.",
    instructor: "Ahmed Mohamed",
    assistantInstructor: "Sara Ali",
    instructorEmail: "ahmed@example.com",
    instructorPhone: "+201234567890",
    tags: ["beginner", "morning", "intensive", "web"],
    enrollmentDeadline: "2024-02-25",
    autoCloseEnrollment: true,
    allowWaitlist: true,
    materialsIncluded: true,
    certificateIncluded: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-01"
  });

  // Lessons Data
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to HTML & Web Development",
      date: "2024-03-01",
      time: "10:00",
      duration: 120,
      type: "online",
      status: "completed",
      studentsAttended: 15,
      recordingLink: "https://youtube.com/watch?v=abc123",
      materials: ["slides.pdf", "assignment1.docx", "resources.zip"],
      notes: "Great session! All students participated actively."
    },
    {
      id: 2,
      title: "CSS Fundamentals & Styling",
      date: "2024-03-03",
      time: "10:00",
      duration: 120,
      type: "online",
      status: "upcoming",
      studentsAttended: 0,
      recordingLink: "",
      materials: ["css-basics.pdf", "practice-files.zip"],
      notes: ""
    },
    {
      id: 3,
      title: "JavaScript Basics - Part 1",
      date: "2024-03-05",
      time: "10:00",
      duration: 150,
      type: "online",
      status: "upcoming",
      studentsAttended: 0,
      recordingLink: "",
      materials: ["js-basics.pdf"],
      notes: ""
    },
    {
      id: 4,
      title: "JavaScript Basics - Part 2",
      date: "2024-03-08",
      time: "10:00",
      duration: 150,
      type: "online",
      status: "upcoming",
      studentsAttended: 0,
      recordingLink: "",
      materials: [],
      notes: ""
    }
  ]);

  // Students Data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      phone: "+201234567891",
      joined: "2024-02-15",
      status: "active",
      progress: "100%",
      lastLogin: "2024-02-20",
      assignments: "5/5",
      attendance: "100%",
      paymentStatus: "paid",
      notes: "Excellent student"
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara@example.com",
      phone: "+201234567892",
      joined: "2024-02-16",
      status: "active",
      progress: "75%",
      lastLogin: "2024-02-19",
      assignments: "4/5",
      attendance: "90%",
      paymentStatus: "paid",
      notes: ""
    },
    {
      id: 3,
      name: "Mohamed Khaled",
      email: "mohamed@example.com",
      phone: "+201234567893",
      joined: "2024-02-17",
      status: "active",
      progress: "50%",
      lastLogin: "2024-02-18",
      assignments: "3/5",
      attendance: "85%",
      paymentStatus: "installment",
      notes: "Needs extra help with JavaScript"
    },
    {
      id: 4,
      name: "Fatima Abdullah",
      email: "fatima@example.com",
      phone: "+201234567894",
      joined: "2024-02-18",
      status: "active",
      progress: "25%",
      lastLogin: "2024-02-17",
      assignments: "2/5",
      attendance: "80%",
      paymentStatus: "paid",
      notes: ""
    },
    {
      id: 5,
      name: "Ali Hassan",
      email: "ali@example.com",
      phone: "+201234567895",
      joined: "2024-02-19",
      status: "active",
      progress: "10%",
      lastLogin: "2024-02-16",
      assignments: "1/5",
      attendance: "75%",
      paymentStatus: "pending",
      notes: "Payment reminder sent"
    }
  ]);

  // Fetch group data
  useEffect(() => {
    const fetchGroupData = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Data is already set in state
      } catch (error) {
        console.error("Error fetching group data:", error);
        alert("Failed to load group data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  // Group Stats
  const stats = [
    {
      title: "Attendance Rate",
      value: "92%",
      change: "+2%",
      color: "bg-green-100 text-green-800",
      icon: Users,
      description: "Based on completed sessions"
    },
    {
      title: "Completed Lessons",
      value: "1/24",
      change: "1 done",
      color: "bg-blue-100 text-blue-800",
      icon: BookOpen,
      description: "4.2% of total"
    },
    {
      title: "Average Progress",
      value: "52%",
      change: "+5%",
      color: "bg-purple-100 text-purple-800",
      icon: TrendingUp,
      description: "Across all students"
    },
    {
      title: "Revenue",
      value: `$${group.price * group.currentStudents}`,
      change: "+$1,500",
      color: "bg-yellow-100 text-yellow-800",
      icon: DollarSign,
      description: "From 15 students"
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "lessons", label: "Lessons", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: AssignmentIcon },
    { id: "students", label: "Students", icon: Users },
    { id: "analytics", label: "Analytics", icon: Target },
    { id: "communications", label: "Communications", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  // Assignments Data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "HTML & CSS Project - Personal Portfolio",
      description: "Create a responsive personal portfolio website using HTML5 and CSS3",
      dueDate: "2024-03-10",
      dueTime: "23:59",
      points: 100,
      type: "project",
      status: "active",
      submissions: 12,
      totalStudents: 15,
      averageScore: 85,
      attachments: ["requirements.pdf", "design-guide.zip"]
    },
    {
      id: 2,
      title: "JavaScript Functions Assignment",
      description: "Complete 10 JavaScript function exercises covering arrays and objects",
      dueDate: "2024-03-05",
      dueTime: "18:00",
      points: 50,
      type: "exercise",
      status: "graded",
      submissions: 15,
      totalStudents: 15,
      averageScore: 92,
      attachments: ["exercises.js", "test-cases.js"]
    },
    {
      id: 3,
      title: "Responsive Design Challenge",
      description: "Convert a given design to responsive CSS with media queries",
      dueDate: "2024-03-15",
      dueTime: "23:59",
      points: 75,
      type: "challenge",
      status: "active",
      submissions: 8,
      totalStudents: 15,
      averageScore: null,
      attachments: ["design-mockup.png", "style-guide.pdf"]
    },
    {
      id: 4,
      title: "React Components Practice",
      description: "Build 5 reusable React components with props and state",
      dueDate: "2024-03-20",
      dueTime: "23:59",
      points: 100,
      type: "project",
      status: "upcoming",
      submissions: 0,
      totalStudents: 15,
      averageScore: null,
      attachments: ["component-specs.md", "starter-code.zip"]
    }
  ]);

  const getAssignmentStatus = (assignment) => {
    const now = new Date();
    const dueDate = new Date(`${assignment.dueDate}T${assignment.dueTime}`);

    if (assignment.status === "graded") return "graded";
    if (assignment.status === "upcoming") return "upcoming";
    if (now > dueDate) return "overdue";
    return "active";
  };

  const handleDeleteGroup = () => {
    if (group.currentStudents > 0) {
      alert("Cannot delete group with enrolled students. Please transfer or remove students first.");
      return;
    }

    setShowDeleteModal(true);
  };

  const confirmDeleteGroup = () => {
    // API call to delete group
    console.log("Deleting group:", groupId);
    router.push(`/courses/${courseId}/groups`);
    setShowDeleteModal(false);
  };

  const copyGroupLink = () => {
    const link = `${window.location.origin}/courses/${courseId}/groups/${groupId}/enroll`;
    navigator.clipboard.writeText(link);
    setShowCopyLink(true);
    setTimeout(() => setShowCopyLink(false), 2000);
  };

  const sendNotification = (type) => {
    alert(`Sending ${type} notification to ${group.currentStudents} students...`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      draft: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      upcoming: { color: "bg-blue-100 text-blue-800", icon: Calendar },
      ended: { color: "bg-gray-100 text-gray-800", icon: XCircle },
      full: { color: "bg-purple-100 text-purple-800", icon: Users }
    };

    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const config = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      installment: "bg-blue-100 text-blue-800"
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config[status] || config.pending}`}>
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link href={`/courses/${courseId}/groups`}>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors rtl:space-x-reverse">
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Groups</span>
              </button>
            </Link>

            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-800">{group.name}</h1>
                {getStatusBadge(group.status)}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-600">Group Code: <span className="font-medium">{group.code}</span></p>
                <p className="text-gray-600">Course: <Link href={`/courses/${courseId}`} className="text-blue-600 hover:underline">View Course</Link></p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={copyGroupLink}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
            >
              <Copy size={16} />
              <span className="hidden sm:inline">Copy Link</span>
            </button>

            <Link href={`/courses/${courseId}/groups/${groupId}/preview`}>
              <button className="flex items-center gap-2 text-green-600 hover:text-green-800 px-3 py-2 border border-green-200 rounded-lg hover:bg-green-50">
                <Eye size={16} />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </Link>

            <Link href={`/courses/${courseId}/groups/${groupId}/edit`}>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Edit size={16} />
                <span>Edit Group</span>
              </button>
            </Link>

            <button
              onClick={handleDeleteGroup}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Copy Link Success Message */}
        {showCopyLink && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={16} />
              <span>Group link copied to clipboard!</span>
            </div>
          </div>
        )}
      </div>

      {/* Group Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <span className={`text-xs font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color.split(' ')[0]} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className={stat.color.split(' ')[1]} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 rtl:space-x-reverse overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
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

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Group Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Settings size={20} />
                      Group Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Schedule:</span>
                          <span className="font-medium flex items-center gap-1">
                            <Calendar size={14} />
                            {group.schedule}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium flex items-center gap-1">
                            {group.locationType === 'online' ? <Globe size={14} /> : <Building size={14} />}
                            {group.locationType === 'online' ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span className="font-medium">{new Date(group.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">End Date:</span>
                          <span className="font-medium">{new Date(group.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Students:</span>
                          <span className="font-medium">{group.currentStudents}/{group.maxStudents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Waitlist:</span>
                          <span className="font-medium">{group.waitlist} students</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sessions:</span>
                          <span className="font-medium">{group.sessionsCount} sessions</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Hours:</span>
                          <span className="font-medium">{group.totalHours} hours</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <DollarSign size={20} />
                      Pricing Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-gray-800">${group.price}</div>
                        <div className="text-sm text-gray-600 mt-1">Regular Price</div>
                      </div>

                      <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-600">${group.discountPrice}</div>
                        <div className="text-sm text-gray-600 mt-1">Early Bird Price</div>
                      </div>

                      <div className="text-center p-4 bg-white rounded-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-600">
                          ${(group.discountPrice * group.currentStudents).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Current Revenue</div>
                      </div>
                    </div>

                    {group.enrollmentDeadline && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle size={16} className="text-yellow-600" />
                            <span className="text-yellow-700 font-medium">Enrollment Deadline</span>
                          </div>
                          <span className="font-bold text-yellow-800">
                            {new Date(group.enrollmentDeadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Meeting Info */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Video size={20} />
                      Meeting Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meeting Link
                        </label>
                        <a
                          href={group.location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 break-all block text-sm"
                        >
                          {group.location}
                        </a>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Meeting ID
                          </label>
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{group.meetingId}</code>
                            <button onClick={() => navigator.clipboard.writeText(group.meetingId)}>
                              <Copy size={14} className="text-gray-500 hover:text-gray-700" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{group.meetingPassword}</code>
                            <button onClick={() => navigator.clipboard.writeText(group.meetingPassword)}>
                              <Copy size={14} className="text-gray-500 hover:text-gray-700" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700">
                        <Video size={16} />
                        Join Meeting Now
                      </button>
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Instructor</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Main Instructor:</span>
                        <span className="font-medium">{group.instructor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Assistant:</span>
                        <span className="font-medium">{group.assistantInstructor}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} />
                          {group.instructorEmail}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                          <Phone size={14} />
                          {group.instructorPhone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/courses/${courseId}/groups/${groupId}/lessons`}>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen size={24} className="text-blue-600" />
                      <ChevronRight size={20} className="text-blue-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Manage Lessons</h4>
                    <p className="text-sm text-gray-600">Schedule, edit, and track group lessons</p>
                  </div>
                </Link>

                <Link href={`/courses/${courseId}/groups/${groupId}/students`}>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 hover:bg-green-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <UsersIcon size={24} className="text-green-600" />
                      <ChevronRight size={20} className="text-green-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2">Manage Students</h4>
                    <p className="text-sm text-gray-600">View, add, and manage enrolled students</p>
                  </div>
                </Link>

                <Link href={`/courses/${courseId}/groups/${groupId}/schedule`}>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 hover:bg-purple-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <CalendarIcon size={24} className="text-purple-600" />
                      <ChevronRight size={20} className="text-purple-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-2">Schedule</h4>
                    <p className="text-sm text-gray-600">View and edit complete schedule</p>
                  </div>
                </Link>
              </div>

              {/* Upcoming Lessons */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Lessons</h3>
                  <Link href={`/courses/${courseId}/groups/${groupId}/lessons`}>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All
                    </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {lessons.filter(l => l.status === 'upcoming').slice(0, 3).map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar size={12} />
                            {lesson.date}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock size={12} />
                            {lesson.time} ({lesson.duration} min)
                          </span>
                        </div>
                      </div>
                      <Link href={`/courses/${courseId}/groups/${groupId}/lessons/${lesson.id}`}>
                        <button className="text-blue-600 hover:text-blue-800">
                          <ExternalLink size={16} />
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lessons Tab */}
          {activeTab === "lessons" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-800">Group Lessons</h3>
                <div className="flex items-center gap-3">
                  <Link href={`/courses/${courseId}/groups/${groupId}/lessons/calendar`}>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg">
                      <Calendar size={16} />
                      Calendar View
                    </button>
                  </Link>
                  <Link href={`/courses/${courseId}/groups/${groupId}/lessons/new`}>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700">
                      <Plus size={16} />
                      Add New Lesson
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lesson</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {lessons.map((lesson) => (
                        <tr key={lesson.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{lesson.title}</div>
                              <div className="text-sm text-gray-500">#{lesson.id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm text-gray-900">{lesson.date}</div>
                              <div className="text-sm text-gray-500">{lesson.time}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-gray-500" />
                              <span>{lesson.duration} min</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${(lesson.studentsAttended / group.currentStudents) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">
                                {lesson.studentsAttended}/{group.currentStudents}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${lesson.status === 'completed' ? 'bg-green-100 text-green-800' :
                              lesson.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                              {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/courses/${courseId}/groups/${groupId}/lessons/${lesson.id}`}>
                                <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                  <Eye size={16} />
                                </button>
                              </Link>
                              <Link href={`/courses/${courseId}/groups/${groupId}/lessons/${lesson.id}/edit`}>
                                <button className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                  <Edit size={16} />
                                </button>
                              </Link>
                              {lesson.recordingLink && (
                                <a
                                  href={lesson.recordingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                                >
                                  <Video size={16} />
                                </a>
                              )}
                              <button className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Group Assignments</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {assignments.length} assignments • {assignments.filter(a => a.status === 'graded').length} graded
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/analytics`}>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg">
                      <BarChart3 size={16} />
                      <span>Analytics</span>
                    </button>
                  </Link>
                  <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/new`}>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700">
                      <Plus size={16} />
                      <span>New Assignment</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Assignment Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {assignments.filter(a => getAssignmentStatus(a) === 'active').length}
                      </p>
                      <p className="text-sm text-gray-600">Active</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <AssignmentIcon size={20} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {assignments.filter(a => getAssignmentStatus(a) === 'overdue').length}
                      </p>
                      <p className="text-sm text-gray-600">Overdue</p>
                    </div>
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle size={20} className="text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {assignments.reduce((sum, a) => sum + a.submissions, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Submissions</p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {assignments.filter(a => a.status === 'graded').length}
                      </p>
                      <p className="text-sm text-gray-600">Graded</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award size={20} className="text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignments Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submissions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {assignments.map((assignment) => {
                        const status = getAssignmentStatus(assignment);
                        return (
                          <tr key={assignment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{assignment.title}</div>
                                <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                                  {assignment.description}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                    {assignment.type}
                                  </span>
                                  {assignment.attachments.length > 0 && (
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                      <Paperclip size={12} />
                                      {assignment.attachments.length} files
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="text-sm font-medium text-gray-900">
                                  {assignment.dueDate}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {assignment.dueTime}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-gray-800">{assignment.points} pts</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{
                                        width: `${(assignment.submissions / assignment.totalStudents) * 100}%`
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {assignment.submissions}/{assignment.totalStudents}
                                  </span>
                                </div>
                                {assignment.averageScore && (
                                  <div className="text-xs text-gray-500">
                                    Avg: {assignment.averageScore}%
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${status === 'active' ? 'bg-green-100 text-green-800' :
                                status === 'overdue' ? 'bg-red-100 text-red-800' :
                                  status === 'graded' ? 'bg-purple-100 text-purple-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/${assignment.id}`}>
                                  <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                    <Eye size={16} />
                                  </button>
                                </Link>
                                <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/${assignment.id}/submissions`}>
                                  <button className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                    <CheckCircle size={16} />
                                  </button>
                                </Link>
                                <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/${assignment.id}/edit`}>
                                  <button className="p-1.5 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded">
                                    <Edit size={16} />
                                  </button>
                                </Link>
                                <button className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/bulk-grade`}>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircle size={24} className="text-blue-600" />
                      <ChevronRight size={20} className="text-blue-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Bulk Grading</h4>
                    <p className="text-sm text-gray-600">Grade multiple assignments at once</p>
                  </div>
                </Link>

                <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/templates`}>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 hover:bg-green-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <Copy size={24} className="text-green-600" />
                      <ChevronRight size={20} className="text-green-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2">Templates</h4>
                    <p className="text-sm text-gray-600">Use and create assignment templates</p>
                  </div>
                </Link>

                <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/assignments/analytics`}>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 hover:bg-purple-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <BarChart3 size={24} className="text-purple-600" />
                      <ChevronRight size={20} className="text-purple-500" />
                    </div>
                    <h4 className="text-lg font-semibold text-purple-800 mb-2">Analytics</h4>
                    <p className="text-sm text-gray-600">View detailed assignment analytics</p>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Group Students</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {group.currentStudents} enrolled • {group.waitlist} on waitlist
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => sendNotification('welcome')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg"
                  >
                    <Mail size={16} />
                    Send Welcome
                  </button>
                  <Link href={`/courses/${courseId}/groups/${groupId}/students/new`}>
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700">
                      <Plus size={16} />
                      Add Student
                    </button>
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">Joined: {student.joined}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm text-gray-900">{student.email}</div>
                              <div className="text-sm text-gray-500">{student.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: student.progress }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{student.progress}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Assignments: {student.assignments}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{student.attendance}</div>
                              <div className="text-xs text-gray-500">
                                Last login: {student.lastLogin}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getPaymentStatusBadge(student.paymentStatus)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/courses/${courseId}/groups/${groupId}/students/${student.id}`}>
                                <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                  <Eye size={16} />
                                </button>
                              </Link>
                              <button
                                onClick={() => sendNotification('individual')}
                                className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                              >
                                <Mail size={16} />
                              </button>
                              <button className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Attendance Overview</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Average Attendance</span>
                        <span className="text-sm font-bold text-gray-800">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">15</div>
                        <div className="text-sm text-gray-600">Total Students</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">14</div>
                        <div className="text-sm text-gray-600">Regular Attendees</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Progress Tracking</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Average Progress</span>
                        <span className="text-sm font-bold text-gray-800">52%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Fastest: Ahmed Mohamed</span>
                        <span className="font-medium text-green-600">100%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Slowest: Ali Hassan</span>
                        <span className="font-medium text-red-600">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Engagement</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">85%</div>
                        <div className="text-sm text-gray-600">Assignment Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">78%</div>
                        <div className="text-sm text-gray-600">Material Views</div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Last 7 days activity:</div>
                      <div className="text-lg font-bold text-gray-800 mt-1">245 interactions</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Financial Overview</h4>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        ${(group.price * group.currentStudents).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-blue-50 rounded">
                        <div className="font-medium">Paid</div>
                        <div className="text-blue-600">12 students</div>
                      </div>
                      <div className="p-2 bg-yellow-50 rounded">
                        <div className="font-medium">Pending</div>
                        <div className="text-yellow-600">3 students</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-6">Detailed Reports</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-4">Export Data</h5>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="text-gray-700">Student List</span>
                        <Download size={16} className="text-gray-500" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="text-gray-700">Attendance Report</span>
                        <Download size={16} className="text-gray-500" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="text-gray-700">Progress Report</span>
                        <Download size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-4">Quick Insights</h5>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle size={16} />
                          <span>Group is performing above average</span>
                        </div>
                      </div>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-700">
                          <AlertCircle size={16} />
                          <span>3 students need attention</span>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-700">
                          <Users size={16} />
                          <span>15 seats available for enrollment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Communications Tab */}
          {activeTab === "communications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Group Communications</h3>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700">
                  <Plus size={16} />
                  <span>New Announcement</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Mail size={20} />
                    Email Notifications
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => sendNotification('welcome')}
                      className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <div className="font-medium text-gray-800">Send Welcome Email</div>
                      <div className="text-sm text-gray-600 mt-1">To all enrolled students</div>
                    </button>
                    <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <div className="font-medium text-gray-800">Upcoming Lesson Reminder</div>
                      <div className="text-sm text-gray-600 mt-1">24 hours before next lesson</div>
                    </button>
                    <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <div className="font-medium text-gray-800">Payment Reminder</div>
                      <div className="text-sm text-gray-600 mt-1">For pending payments</div>
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageSquare size={20} />
                    Announcements
                  </h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800">Welcome to the group!</div>
                      <div className="text-sm text-blue-700 mt-1">Sent 2 days ago</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">First lesson materials</div>
                      <div className="text-sm text-green-700 mt-1">Sent 1 day ago</div>
                    </div>
                  </div>
                  <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 font-medium">
                    View All Announcements
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Bell size={20} />
                    Notification Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">Email Notifications</div>
                        <div className="text-sm text-gray-600">Send via email</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">In-app Notifications</div>
                        <div className="text-sm text-gray-600">Show in platform</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">SMS Notifications</div>
                        <div className="text-sm text-gray-600">Send via SMS</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Group Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">Group Status</div>
                        <div className="text-sm text-gray-600">Open or close registration</div>
                      </div>
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 min-w-[120px]"
                        value={group.status}
                        onChange={(e) => setGroup({ ...group, status: e.target.value })}
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="closed">Closed</option>
                        <option value="full">Full</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">Auto-close Enrollment</div>
                        <div className="text-sm text-gray-600">Close when max students reached</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={group.autoCloseEnrollment}
                          onChange={(e) => setGroup({ ...group, autoCloseEnrollment: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">Allow Waitlist</div>
                        <div className="text-sm text-gray-600">Let students join waitlist</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={group.allowWaitlist}
                          onChange={(e) => setGroup({ ...group, allowWaitlist: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">Materials Included</div>
                        <div className="text-sm text-gray-600">Include course materials</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={group.materialsIncluded}
                          onChange={(e) => setGroup({ ...group, materialsIncluded: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">Certificate Included</div>
                        <div className="text-sm text-gray-600">Include completion certificate</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={group.certificateIncluded}
                          onChange={(e) => setGroup({ ...group, certificateIncluded: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">Transfer Students</h4>
                      <p className="text-sm text-red-700 mb-3">
                        Transfer all students to another group before deleting
                      </p>
                      <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                        Transfer Students
                      </button>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">Archive Group</h4>
                      <p className="text-sm text-red-700 mb-3">
                        Archive this group. It will be hidden but not deleted.
                      </p>
                      <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                        Archive Group
                      </button>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">Delete Group</h4>
                      <p className="text-sm text-red-700 mb-3">
                        Permanently delete this group and all its data.
                      </p>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete Group
                      </button>
                    </div>
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

export default GroupManagementPage;
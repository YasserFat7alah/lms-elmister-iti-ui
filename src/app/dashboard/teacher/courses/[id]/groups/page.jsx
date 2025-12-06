"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Plus, Search, Filter, Edit, Trash2,
  Users, Calendar, MapPin, DollarSign, Clock,
  Eye, Copy, MoreVertical, ChevronRight,
  CheckCircle, XCircle, AlertCircle,
  Download, Upload, BarChart3, Tag,
  Globe, Building, Phone, Mail
} from "lucide-react";

const CourseGroupsPage = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState(null);
  const [groups, setGroups] = useState([]);

  // إحصائيات
  const [stats, setStats] = useState({
    totalGroups: 0,
    activeGroups: 0,
    totalStudents: 0,
    totalRevenue: 0
  });

  // Fetch course and groups data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock API calls
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Course info
        const mockCourse = {
          id: courseId,
          title: "Complete Web Development Bootcamp",
          category: "Web Development",
          instructor: "Ahmed Mohamed",
          status: "published",
          thumbnail: "https://api.dicebear.com/7.x/shapes/svg?seed=webdev"
        };

        // Mock groups data
        const mockGroups = [
          {
            id: 1,
            name: "Morning Group - Batch 1",
            schedule: "Mon, Wed, Fri - 10:00 AM",
            startDate: "2024-03-01",
            endDate: "2024-05-24",
            locationType: "online",
            location: "Zoom Meeting",
            price: 1500,
            sessionsCount: 36,
            maxStudents: 20,
            currentStudents: 15,
            waitlist: 3,
            status: "active",
            timeSlots: [
              { day: "Monday", start: "10:00", end: "12:00" },
              { day: "Wednesday", start: "10:00", end: "12:00" },
              { day: "Friday", start: "10:00", end: "12:00" }
            ],
            instructor: "Ali Hassan",
            assistantInstructor: "Sara Mohamed",
            createdDate: "2024-01-15",
            lastEnrollment: "2024-02-20",
            enrollmentRate: 75
          },
          {
            id: 2,
            name: "Evening Group - Batch 1",
            schedule: "Tue, Thu - 6:00 PM",
            startDate: "2024-03-05",
            endDate: "2024-05-28",
            locationType: "online",
            location: "Google Meet",
            price: 1800,
            sessionsCount: 24,
            maxStudents: 25,
            currentStudents: 18,
            waitlist: 5,
            status: "active",
            timeSlots: [
              { day: "Tuesday", start: "18:00", end: "20:00" },
              { day: "Thursday", start: "18:00", end: "20:00" }
            ],
            instructor: "Mohamed Ali",
            assistantInstructor: "Fatima Ahmed",
            createdDate: "2024-01-20",
            lastEnrollment: "2024-02-25",
            enrollmentRate: 72
          },
          {
            id: 3,
            name: "Weekend Group",
            schedule: "Sat, Sun - 11:00 AM",
            startDate: "2024-03-10",
            endDate: "2024-06-02",
            locationType: "offline",
            location: "Main Campus - Room 301",
            price: 2000,
            sessionsCount: 20,
            maxStudents: 15,
            currentStudents: 8,
            waitlist: 2,
            status: "draft",
            timeSlots: [
              { day: "Saturday", start: "11:00", end: "14:00" },
              { day: "Sunday", start: "11:00", end: "14:00" }
            ],
            instructor: "Omar Khaled",
            assistantInstructor: "Lina Samir",
            createdDate: "2024-02-01",
            lastEnrollment: "2024-02-15",
            enrollmentRate: 53
          },
          {
            id: 4,
            name: "Morning Group - Batch 2",
            schedule: "Mon, Wed, Fri - 9:00 AM",
            startDate: "2024-04-01",
            endDate: "2024-06-21",
            locationType: "online",
            location: "Zoom Meeting",
            price: 1600,
            sessionsCount: 36,
            maxStudents: 20,
            currentStudents: 12,
            waitlist: 4,
            status: "active",
            timeSlots: [
              { day: "Monday", start: "09:00", end: "11:00" },
              { day: "Wednesday", start: "09:00", end: "11:00" },
              { day: "Friday", start: "09:00", end: "11:00" }
            ],
            instructor: "Ali Hassan",
            assistantInstructor: "Nour Ahmed",
            createdDate: "2024-02-10",
            lastEnrollment: "2024-02-28",
            enrollmentRate: 60
          },
          {
            id: 5,
            name: "Intensive Group",
            schedule: "Daily - 2:00 PM",
            startDate: "2024-03-15",
            endDate: "2024-04-15",
            locationType: "offline",
            location: "Tech Lab - Building B",
            price: 2500,
            sessionsCount: 30,
            maxStudents: 12,
            currentStudents: 12,
            waitlist: 7,
            status: "full",
            timeSlots: [
              { day: "Monday", start: "14:00", end: "17:00" },
              { day: "Tuesday", start: "14:00", end: "17:00" },
              { day: "Wednesday", start: "14:00", end: "17:00" },
              { day: "Thursday", start: "14:00", end: "17:00" },
              { day: "Friday", start: "14:00", end: "17:00" }
            ],
            instructor: "Ahmed Mohamed",
            assistantInstructor: "Hassan Ali",
            createdDate: "2024-01-25",
            lastEnrollment: "2024-02-20",
            enrollmentRate: 100
          },
          {
            id: 6,
            name: "Evening Group - Batch 2",
            schedule: "Mon, Wed - 7:00 PM",
            startDate: "2024-04-10",
            endDate: "2024-07-10",
            locationType: "online",
            location: "Microsoft Teams",
            price: 1400,
            sessionsCount: 24,
            maxStudents: 30,
            currentStudents: 10,
            waitlist: 1,
            status: "draft",
            timeSlots: [
              { day: "Monday", start: "19:00", end: "21:00" },
              { day: "Wednesday", start: "19:00", end: "21:00" }
            ],
            instructor: "Sara Mahmoud",
            assistantInstructor: "Khalid Omar",
            createdDate: "2024-02-15",
            lastEnrollment: "2024-02-22",
            enrollmentRate: 33
          }
        ];

        setCourseInfo(mockCourse);
        setGroups(mockGroups);

        // Calculate statistics
        const totalStudents = mockGroups.reduce((sum, group) => sum + group.currentStudents, 0);
        const totalRevenue = mockGroups.reduce((sum, group) => sum + (group.price * group.currentStudents), 0);
        const activeGroups = mockGroups.filter(g => g.status === "active").length;

        setStats({
          totalGroups: mockGroups.length,
          activeGroups,
          totalStudents,
          totalRevenue
        });

      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load course groups");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // Filter groups based on search and filter
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "active") return matchesSearch && group.status === "active";
    if (selectedFilter === "draft") return matchesSearch && group.status === "draft";
    if (selectedFilter === "full") return matchesSearch && group.status === "full";
    return matchesSearch;
  });

  // Handle group selection
  const toggleGroupSelection = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  // Select all groups
  const selectAllGroups = () => {
    if (selectedGroups.length === filteredGroups.length) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(filteredGroups.map(group => group.id));
    }
  };

  // Delete selected groups
  const handleDeleteGroups = () => {
    const updatedGroups = groups.filter(group => !selectedGroups.includes(group.id));
    setGroups(updatedGroups);
    setSelectedGroups([]);
    setShowDeleteModal(false);

    // Update stats
    const totalStudents = updatedGroups.reduce((sum, group) => sum + group.currentStudents, 0);
    const totalRevenue = updatedGroups.reduce((sum, group) => sum + (group.price * group.currentStudents), 0);
    const activeGroups = updatedGroups.filter(g => g.status === "active").length;

    setStats({
      totalGroups: updatedGroups.length,
      activeGroups,
      totalStudents,
      totalRevenue
    });
  };

  // Duplicate group
  const duplicateGroup = (group) => {
    const newGroup = {
      ...group,
      id: Date.now(),
      name: `${group.name} (Copy)`,
      currentStudents: 0,
      waitlist: 0,
      status: "draft",
      createdDate: new Date().toISOString().split('T')[0]
    };
    setGroups([newGroup, ...groups]);
  };

  // Export groups
  const exportGroups = () => {
    const data = filteredGroups.map(group => ({
      Name: group.name,
      Status: group.status,
      Students: group.currentStudents,
      Capacity: group.maxStudents,
      Price: group.price,
      StartDate: group.startDate,
      EndDate: group.endDate,
      Instructor: group.instructor
    }));

    // In real app, use a library like xlsx
    console.log("Exporting groups:", data);
    alert("Groups data exported to console (in real app would download CSV)");
  };

  // Status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      draft: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      full: { color: "bg-purple-100 text-purple-800", icon: Users },
      inactive: { color: "bg-red-100 text-red-800", icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Location icon
  const getLocationIcon = (type) => {
    return type === "online" ?
      <Globe size={14} className="text-blue-600" /> :
      <Building size={14} className="text-green-600" />;
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>

          {/* Table skeleton */}
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Link href="/courses" className="hover:text-blue-600">
                Courses
              </Link>
              <ChevronRight size={14} />
              <Link href={`/courses/${courseId}`} className="hover:text-blue-600">
                {courseInfo?.title}
              </Link>
              <ChevronRight size={14} />
              <span className="text-gray-800 font-medium">Groups</span>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Manage Groups
              </h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {stats.totalGroups} Groups
              </span>
            </div>
            <p className="text-gray-600 mt-2">
              Manage groups, schedules, and student enrollments for {courseInfo?.title}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/courses/${courseId}`}>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ArrowLeft size={18} />
                Back to Course
              </button>
            </Link>

            <Link href={`/courses/${courseId}/groups/new`}>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={18} />
                Add Group
              </button>
            </Link>
          </div>
        </div>

        {/* Course Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-blue-200">
                <img
                  src={courseInfo?.thumbnail}
                  alt={courseInfo?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{courseInfo?.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {courseInfo?.category}
                  </span>
                  <span className="text-sm text-gray-600">
                    Instructor: {courseInfo?.instructor}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href={`/courses/${courseId}/edit`}>
                <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  Edit Course
                </button>
              </Link>
              <Link href={`/courses/${courseId}/students`}>
                <button className="flex items-center gap-2 text-sm bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Users size={16} />
                  View Students
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Groups</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalGroups}</h3>
              <p className="text-sm text-green-600 mt-1">
                {stats.activeGroups} Active • {stats.totalGroups - stats.activeGroups} Inactive
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalStudents}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Across all groups
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">
                ${stats.totalRevenue.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                From enrolled students
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Enrollment Rate</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {Math.round(groups.reduce((sum, g) => sum + g.enrollmentRate, 0) / groups.length)}%
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Group capacity utilization
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <BarChart3 className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search groups by name or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2.5"
              >
                <option value="all">All Groups</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Bulk Actions */}
            {selectedGroups.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedGroups.length} selected
                </span>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 px-3 py-1.5 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={exportGroups}
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download size={14} />
                Export
              </button>

              <Link href={`/courses/${courseId}/groups/analytics`}>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50">
                  <BarChart3 size={14} />
                  Analytics
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="w-12 px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedGroups.length === filteredGroups.length && filteredGroups.length > 0}
                    onChange={selectAllGroups}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Group Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Schedule
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGroups.map((group) => (
                <tr
                  key={group.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group.id)}
                      onChange={() => toggleGroupSelection(group.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/courses/${courseId}/groups/${group.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {group.name}
                        </Link>
                        {group.waitlist > 0 && (
                          <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                            +{group.waitlist} waitlist
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          {getLocationIcon(group.locationType)}
                          {group.locationType === "online" ? "Online" : "Offline"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Starts {new Date(group.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Instructor: {group.instructor}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{group.schedule}</span>
                      <div className="text-sm text-gray-600 mt-1">
                        {group.timeSlots.length} sessions/week
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {group.currentStudents}/{group.maxStudents}
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${group.enrollmentRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {group.enrollmentRate}% filled
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        ${group.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">
                        ${Math.round(group.price / group.sessionsCount)}/session
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(group.status)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/courses/${courseId}/groups/${group.id}/edit`}>
                        <button className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit size={16} />
                        </button>
                      </Link>

                      <Link href={`/courses/${courseId}/groups/${group.id}`}>
                        <button className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                          <Eye size={16} />
                        </button>
                      </Link>

                      <button
                        onClick={() => duplicateGroup(group)}
                        className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                      >
                        <Copy size={16} />
                      </button>

                      <Link href={`/courses/${courseId}/groups/${group.id}/students`}>
                        <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                          Students
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No groups found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm ? "No groups match your search criteria." : "Start by creating your first group for this course."}
            </p>
            <Link href={`/courses/${courseId}/groups/new`}>
              <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={18} />
                Create First Group
              </button>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {filteredGroups.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {filteredGroups.length} of {groups.length} groups
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Previous
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                  1
                </span>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={18} />
            Upcoming Starts
          </h3>
          <div className="space-y-3">
            {groups
              .filter(g => new Date(g.startDate) > new Date())
              .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
              .slice(0, 3)
              .map(group => (
                <div key={group.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{group.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(group.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-blue-700">
                    {group.currentStudents} enrolled
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Users size={18} />
            Groups by Status
          </h3>
          <div className="space-y-4">
            {["active", "draft", "full"].map(status => {
              const count = groups.filter(g => g.status === status).length;
              const percentage = (count / groups.length) * 100;

              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {status}
                    </span>
                    <span className="text-sm text-gray-600">
                      {count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${status === "active" ? "bg-green-500" :
                        status === "draft" ? "bg-yellow-500" :
                          "bg-purple-500"
                        }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign size={18} />
            Revenue Summary
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                ${groups.reduce((sum, g) => sum + (g.price * g.maxStudents), 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Revenue</p>
              <p className="text-xl font-bold text-green-600">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {Math.round((stats.totalStudents / groups.reduce((sum, g) => sum + g.maxStudents, 0)) * 100)}%
                of total capacity filled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Delete Groups</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedGroups.length} groups selected
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete these groups? This action cannot be undone.
                Any enrolled students will be removed from these groups.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteGroups}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Groups
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseGroupsPage;
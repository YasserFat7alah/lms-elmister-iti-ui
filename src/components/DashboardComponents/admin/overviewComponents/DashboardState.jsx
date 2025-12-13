"use client";

import { FaRegUser, FaUsers } from "react-icons/fa";
import { PiStudentBold, PiChalkboardTeacherFill } from "react-icons/pi";
import { BookOpen, Archive, FileClock, ShieldCheck } from "lucide-react";
import TotalCard from "./TotalCard";
import CircleChart from "./CircleChart";

const DashboardState = ({ stats }) => {
  const { users, courses } = stats || {};

  const userStats = [
    {
      title: "Total Users",
      value: users?.total || 0,
      // change: "5%",
      icon: <FaUsers size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      lightBg: "#3b82f6",
    },
    {
      title: "Teachers",
      value: users?.teachers || 0,
      // change: "12%",
      icon: <PiChalkboardTeacherFill size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      lightBg: "#22c55e",
    },
    {
      title: "Students",
      value: users?.students || 0,
      // change: "25%",
      icon: <PiStudentBold size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      lightBg: "#f97316",
    },
    {
      title: "Parents",
      value: users?.parents || 0,
      // change: "8%",
      icon: <FaRegUser size={28} color="#fff" />,
      iconBg: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
      lightBg: "#a855f7",
    },
  ];

  const courseStats = [
    {
      title: "Total Courses",
      value: courses?.total || 0,
      icon: <BookOpen size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      lightBg: "#ec4899",
    },
    {
      title: "Active Courses",
      value: courses?.active || 0,
      icon: <ShieldCheck size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      lightBg: "#10b981",
    },
    {
      title: "In Review",
      value: courses?.inReview || 0,
      icon: <FileClock size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      lightBg: "#f59e0b",
    },
    {
      title: "Archived",
      value: courses?.archived || 0,
      icon: <Archive size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
      lightBg: "#6b7280",
    },
  ];

  const userData = [
    { name: "Teachers", value: users?.teachers || 0, color: "#6366f1" },
    { name: "Students", value: users?.students || 0, color: "#FF0055" },
    { name: "Parents", value: users?.parents || 0, color: "#392b80" },
  ];

  const courseData = [
    { name: "Active", value: courses?.active || 0, color: "#10b981" },
    { name: "In Review", value: courses?.inReview || 0, color: "#f59e0b" },
    { name: "Archived", value: courses?.archived || 0, color: "#6b7280" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6 bg-transparent h-full">
      {/* Removed outer container styling to let cards stand alone or wrap entire thing? User asked for "separate cards". Keeping it clean */}

      {/* --- User Statistics Card --- */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-4">
        {/* Header & Chart */}
        <div className="border-b border-gray-100 pb-4">
          <CircleChart
            data={userData}
            title="User Distribution"
            subTitle="Teachers, Students, Parents"
          />
        </div>

        {/* User Stats Grid */}
        <div>
          <div className="grid sm:grid-cols-2 gap-4">
            {userStats.map((item, index) => (
              <TotalCard key={`user-${index}`} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* --- Course Statistics Card --- */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 space-y-4">
        {/* Header & Chart */}
        <div className="border-b border-gray-100 pb-4">
          <CircleChart
            data={courseData}
            title="Course Distribution"
            subTitle="Active, Pending, Archived"
          />
        </div>

        {/* Course Stats Grid */}
        <div>
          <div className="grid sm:grid-cols-2 gap-4">
            {courseStats.map((item, index) => (
              <TotalCard key={`course-${index}`} {...item} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardState;
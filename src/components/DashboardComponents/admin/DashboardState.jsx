"use client";

import { IoBookOutline } from "react-icons/io5";
import { MdOutlineStorage } from "react-icons/md";
import { FaRegUser, FaUserShield } from "react-icons/fa";
import { PiHeartbeatThin } from "react-icons/pi";
import { PiStudentBold } from "react-icons/pi";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import TotalCard from "./TotalCard";

const DashboardState = () => {
  const stats = [
    {
      title: "Total Courses",
      value: 12,
      change: "12%",
      icon: <IoBookOutline size={28} color="#fff" />,
      iconBg: "#3b82f6",
    },
    {
      title: "Active Courses",
      value: 8,
      change: "8%",
      icon: <PiHeartbeatThin size={28} color="#fff" />,
      iconBg: "#22c55e",
    },
    {
      title: "Archived Courses",
      value: 4,
      icon: <MdOutlineStorage size={28} color="#fff" />,
      iconBg: "#4b5563",
    },
    {
      title: "Total Users",
      value: 250,
      change: "15%",
      icon: <FaUsers size={28} color="#fff" />,
      iconBg: "#a855f7",
    },
    {
      title: "Administrators",
      value: 5,
      icon: <FaUserShield size={28} color="#fff" />,
      iconBg: "#2563eb",
    },
    {
      title: "Teachers",
      value: 30,
      icon: <PiChalkboardTeacherFill size={28} color="#fff" />,
      iconBg: "#22c55e",
    },
    {
      title: "Students",
      value: 180,
      icon: <PiStudentBold size={28} color="#fff" />,
      iconBg: "#f97316",
    },
    {
      title: "Parents",
      value: 35,
      icon: <FaRegUser size={28} color="#fff" />,
      iconBg: "#a855f7",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-5 border-b">
      {stats.map((item, index) => (
        <TotalCard key={index} {...item} />
      ))}
    </div>
  );
};

export default DashboardState;

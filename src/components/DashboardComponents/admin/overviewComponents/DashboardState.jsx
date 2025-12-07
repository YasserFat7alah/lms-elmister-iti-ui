"use client";

import { FaRegUser } from "react-icons/fa";
import { PiStudentBold, PiChalkboardTeacherFill } from "react-icons/pi";
import TotalCard from "./TotalCard";
import CircleChart from "./CircleChart";

const DashboardState = () => {
  const userStats = [
    {
      title: "Teachers",
      value: 30,
      change: "12%",
      icon: <PiChalkboardTeacherFill size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      lightBg: "#22c55e",
    },
    {
      title: "Students",
      value: 180,
      change: "25%",
      icon: <PiStudentBold size={32} color="#fff" />,
      iconBg: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      lightBg: "#f97316",
    },
    {
      title: "Parents",
      value: 35,
      change: "8%",
      icon: <FaRegUser size={28} color="#fff" />,
      iconBg: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
      lightBg: "#a855f7",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6 bg-gradient-to-br from-white to-gray-50/50 p-6 rounded-2xl shadow-xl border border-gray-100/50">
      <div className="lg:col-span-2 bg-white rounded-xl p-4 border border-gray-100">
        <CircleChart />
      </div>
      <div className="flex flex-col space-y-4">
        {/* <div className="mb-2 bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 p-4 rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            User Overview
            <span className="text-base">👥</span>
          </h3>
          </div> */}
          <p className="text-sm font-semibold text-gray-600 mt-1">
            Current platform statistics
          </p>
        {userStats.map((item, index) => (
          <TotalCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DashboardState;
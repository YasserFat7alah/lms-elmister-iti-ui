"use client";

import { FaCalculator, FaFlask, FaBook, FaPalette, FaMusic, FaLaptopCode } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

const subjects = [
  {
    icon: FaCalculator,
    title: "Mathematics",
    subTitle: "Algebra & Geometry",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: FaFlask,
    title: "Sciences",
    subTitle: "Physics & Chemistry",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50"
  },
  {
    icon: FaBook,
    title: "Languages",
    subTitle: "Grammar & Writing",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: FaPalette,
    title: "Arts",
    subTitle: "Painting & Drawing",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50"
  },
  {
    icon: FaMusic,
    title: "Music",
    subTitle: "Theory & Performance",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: FaLaptopCode,
    title: "Technology",
    subTitle: "Coding & IT",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50"
  },
];

export default function Subjects() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <HiAcademicCap className="text-purple-600 text-xl" />
            <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Our Curriculum</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Explore Our Academic
            <span className="block text-purple-600">Subjects</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Expertly designed courses across all major subjects, taught by passionate educators committed to your child's success.
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.title}
              className="group relative bg-white rounded-3xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${subject.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <subject.icon className="w-8 h-8 text-white" />
              </div>

              {/* Divider */}
              <div className={`w-12 h-1 rounded-full bg-linear-to-r ${subject.color} mb-4 opacity-60`}></div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                {subject.title}
              </h3>
              <p className="text-sm text-gray-500">{subject.subTitle}</p>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${subject.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Can't find what you're looking for?
            <a href="/courses" className="text-purple-600 font-semibold hover:text-purple-700 ml-2 underline">
              Explore all courses →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
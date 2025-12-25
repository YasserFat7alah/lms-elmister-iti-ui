"use client"

import Image from "next/image"
import { HiLocationMarker } from "react-icons/hi"
import cairo from "@/assets/images/cairo.jpg";
import casablanca from "@/assets/images/casablanca.jpg";
import dubai from "@/assets/images/dubai.jpg";
import riyadh from "@/assets/images/riyadh.jpg";

export default function BranchesGrid() {
  const branches = [
    {
      id: 1,
      title: "Cairo, Egypt",
      description: "Main office serving students across Egypt with comprehensive learning programs",
      image: cairo,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Riyadh, Saudi Arabia",
      description: "Gulf region center providing quality education and student support services",
      image: riyadh,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Dubai, UAE",
      description: "Regional hub for innovative learning solutions across the Middle East",
      image: dubai,
      color: "from-orange-500 to-amber-500"
    },
    {
      id: 4,
      title: "Casablanca, Morocco",
      description: "North Africa office dedicated to educational excellence and student success",
      image: casablanca,
      color: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <HiLocationMarker className="text-purple-600 text-xl" />
            <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Our Locations</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Serving Students
            <span className="block text-purple-600">Across the Region</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With offices in major cities, we're committed to providing accessible, high-quality education wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-56">
                <div className={`absolute inset-0 bg-linear-to-br ${branch.color} opacity-20 z-10`}></div>
                <Image
                  src={branch.image}
                  alt={branch.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start gap-2 mb-3">
                  <HiLocationMarker className={`w-5 h-5 text-purple-600 mt-1 shrink-0`} />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {branch.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{branch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

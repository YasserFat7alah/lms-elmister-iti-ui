"use client"

import { HiUsers, HiAcademicCap, HiChartBar, HiStar } from "react-icons/hi"

export function StatsSection() {
  const stats = [
    {
      icon: HiUsers,
      label: "Active Students",
      value: "5,000+",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: HiAcademicCap,
      label: "Expert Teachers",
      value: "200+",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: HiChartBar,
      label: "Courses Offered",
      value: "150+",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: HiStar,
      label: "Student Satisfaction",
      value: "98%",
      color: "from-green-500 to-emerald-500"
    },
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-purple-50 to-blue-50 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of families for quality education and personalized learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg font-semibold text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

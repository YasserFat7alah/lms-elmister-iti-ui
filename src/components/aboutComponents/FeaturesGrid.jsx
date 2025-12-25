"use client"

import { HiAcademicCap, HiUsers, HiChartBar, HiCalendar, HiChatAlt, HiShieldCheck } from "react-icons/hi"

export function FeaturesGrid() {
  const features = [
    {
      icon: HiAcademicCap,
      title: "Expert Instruction",
      description: "Learn from vetted, passionate educators who specialize in their subjects and inspire students to excel.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: HiUsers,
      title: "Personalized Learning",
      description: "One-on-one attention tailored to each student's unique learning style, pace, and academic goals.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: HiChartBar,
      title: "Progress Tracking",
      description: "Detailed analytics and reports help parents monitor their child's academic growth and achievements.",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: HiCalendar,
      title: "Flexible Scheduling",
      description: "Book sessions at times that work for your family, with both online and in-person options available.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: HiChatAlt,
      title: "Parent Communication",
      description: "Stay connected with teachers through our messaging system and receive regular updates on progress.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: HiShieldCheck,
      title: "Safe & Secure",
      description: "All teachers are background-checked and verified. Your child's safety and privacy are our top priority.",
      color: "from-red-500 to-rose-500"
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Why Families Choose
            <span className="block text-purple-600">El-Mister</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide everything you need for a successful private education experience, from expert teachers to comprehensive progress tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
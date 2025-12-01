"use client"

import { FaRocket, FaUsers, FaChartLine } from "react-icons/fa"

export function FeaturesGrid() {
  const features = [
    {
      icon: FaRocket,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance and seamless integration with your existing systems.",
    },
    {
      icon: FaUsers,
      title: "Team Collaboration",
      description: "Empower your team to work together effectively with our collaborative tools and features.",
    },
    {
      icon: FaChartLine,
      title: "Growth Analytics",
      description: "Track your progress with detailed analytics and insights to drive continuous improvement.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="bg-white p-8 rounded-lg border border-border">
                <div className="w-12 h-12 bg-[#FF4667] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
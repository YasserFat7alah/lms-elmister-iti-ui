"use client"

import CustomizeCard from "../shared/CustomizeCard";    
import { FaUser, FaFileAlt, FaVideo, FaRocket } from "react-icons/fa"

export function HowToStart() {
  const steps = [
    {
      icon: FaUser,
      title: "Create Your Profile",
      description: "Set up your instructor profile and tell your story to potential students.",
    },
    {
      icon: FaFileAlt,
      title: "Plan Your Course",
      description: "Structure your content and create an engaging course outline.",
    },
    {
      icon: FaVideo,
      title: "Record & Upload",
      description: "Film your course videos and upload them to our platform.",
    },
    {
      icon: FaRocket,
      title: "Go Live",
      description: "Publish your course and start reaching students worldwide.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-pink-50/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-mainBlue/10 rounded-full border border-mainBlue/20 mb-4">
            <span className="text-sm font-semibold text-mainBlue">Get Started</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How to Become a Successful Instructor</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Follow these simple steps to become an instructor and start your teaching journey with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <CustomizeCard
              key={index}
              icon={step.icon}
              title={step.title}
              subTitle={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
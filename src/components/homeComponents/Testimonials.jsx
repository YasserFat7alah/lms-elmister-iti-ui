"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FaStar } from "react-icons/fa"
import { IoArrowBack, IoArrowForward } from "react-icons/io5"
import { useState } from "react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed Salah",
      role: "Teacher",
      rating: 5,
      text: "Using El-Mister made managing my lessons so much easier. I can schedule sessions, track attendance, and organize my students without any hassle. It really improved my teaching workflow.",
    },
    {
      name: "Mona Ali",
      role: "Parent",
      rating: 4,
      text: "El-Mister helps me follow my children's progress in a very clear way. I can track grades, see attendance, and subscribe to lessons instantly. It gave me real peace of mind as a parent.",
    },
    {
      name: "Omar Hassan",
      role: "Student",
      rating: 5,
      text: "I love how simple it is to join online and offline sessions. The platform shows all my enrolled courses clearly and helps me stay organized throughout the week.",
    },
    {
      name: "Sarah Mohamed",
      role: "Admin",
      rating: 5,
      text: "El-Mister makes managing teachers, courses, and parents incredibly smooth. The admin dashboard is clean, fast, and gives me full control over the platform operations.",
    },
    {
    name: "Yasser Fouad",
    role: "Parent",
    rating: 5,
    text:
      "I can finally follow attendance and grades in one place. No more WhatsApp chaos. This platform solved a real problem for parents.",
  },
  {
    name: "Mariam Hanafy",
    role: "Student",
    rating: 4,
    text:
      "It’s very easy to check upcoming lessons and submit assignments. The design is simple, so I don’t get confused anymore.",
  },

  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} size={20} />
        ))}
      </div>
    )
  }

  const current = testimonials[currentIndex]

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Users Say</h2>
          <p className="text-gray-600">Testimonials from our community</p>
        </div>

        <div className="flex items-center gap-6">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <IoArrowBack size={24} className="text-[#D97706]" />
          </button>

          {/* Testimonial Card */}
          <Card className="flex-1 border-l-4 border-l-[#D97706] min-h-[280px] flex flex-col">
            <CardHeader>
              <div>
                <CardTitle className="text-lg">{current.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{current.role}</p>
              </div>
              <div className="mt-3">{renderStars(current.rating)}</div>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-gray-700 leading-relaxed">"{current.text}"</p>
            </CardContent>

          </Card>


          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <IoArrowForward size={24} className="text-[#D97706]" />
          </button>
        </div>
        <div className=" pt-5 text-center text-sm text-gray-500">
              {currentIndex + 1} / {testimonials.length}
            </div>
      </div>
    </section>
  )
}

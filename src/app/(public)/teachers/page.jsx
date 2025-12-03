"use client"

import { FilterSidebar } from "@/components/TeacherComponents/FilterSidebar"
import { InstructorCard } from "@/components/TeacherComponents/InstructorCard"
import { Pagination } from "@/components/TeacherComponents/Pagination"
import { useState } from "react"

const INSTRUCTORS = [
  {
    id: 1,
    name: "Sarah Designer",
    title: "UI/UX Designer",
    rating: 4.8,
    students: 1200,
    courses: 5,
    image: "https://placeholder.svg?height=280&width=280&query=professional-woman-designer",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    name: "Lisa Lopez",
    title: "Frontend Dev",
    rating: 4.9,
    students: 2100,
    courses: 8,
    image: "https://placeholder.svg?height=280&width=280&query=professional-woman-developer",
    bgColor: "bg-pink-100",
  },
  {
    id: 3,
    name: "David Chen",
    title: "Product Manager",
    rating: 4.7,
    students: 890,
    courses: 6,
    image: "https://placeholder.svg?height=280&width=280&query=professional-man-manager",
    bgColor: "bg-cyan-100",
  },
  {
    id: 4,
    name: "Emma Wilson",
    title: "Data Scientist",
    rating: 4.9,
    students: 1560,
    courses: 7,
    image: "https://placeholder.svg?height=280&width=280&query=professional-woman-scientist",
    bgColor: "bg-gray-100",
  },
  {
    id: 5,
    name: "Isha Patel",
    title: "Marketing Expert",
    rating: 4.8,
    students: 945,
    courses: 5,
    image: "https://placeholder.svg?height=280&width=280&query=professional-woman-marketing",
    bgColor: "bg-gray-100",
  },
  {
    id: 6,
    name: "David Torres",
    title: "Full Stack Dev",
    rating: 4.6,
    students: 1123,
    courses: 9,
    image: "https://placeholder.svg?height=280&width=280&query=professional-man-developer",
    bgColor: "bg-gray-100",
  },
  {
    id: 7,
    name: "Sophie Martin",
    title: "Brand Strategist",
    rating: 4.8,
    students: 756,
    courses: 4,
    image: "https://placeholder.svg?height=280&width=280&query=professional-woman-strategist",
    bgColor: "bg-gray-100",
  },
  {
    id: 8,
    name: "Marcus Johnson",
    title: "Tech Lead",
    rating: 4.7,
    students: 2340,
    courses: 10,
    image: "https://placeholder.svg?height=280&width=280&query=professional-man-tech-lead",
    bgColor: "bg-gray-100",
  },
  {
    id: 9,
    name: "Natalia Garcia",
    title: "Growth Lead",
    rating: 4.9,
    students: 1890,
    courses: 7,
    image: "https://placeholder.svg?height=280&width=280&query=professional-woman-growth",
    bgColor: "bg-gray-100",
  },
]

export default function InstructorsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const itemsPerPage = 9
  const totalPages = Math.ceil(INSTRUCTORS.length / itemsPerPage)

  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedInstructors = INSTRUCTORS.slice(startIdx, startIdx + itemsPerPage)

  return (
    <main className="bg-background">

      <section className="bg-gradient-to-b from-pink-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Instructor Grid</h1>
            <p className="text-muted-foreground">Showing 1 of {INSTRUCTORS.length} results</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Instructor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayedInstructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>

    </main>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export function CoursesSection({ courses = [] }) {
  const itemsPerPage = 3
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(courses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-8">Courses</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {paginatedCourses.map((course, index) => (
          <Link key={`${startIndex}-${index}`} href={`/courses/${course.id}`} className="cursor-pointer">
            <Card className="max-w-sm mx-auto mb-4 overflow-hidden group">
              <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={course.thumbnail?.url || course.image || "/placeholder.svg?height=192&width=400&query=course"}
                    alt={course.title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  <Button>View Course</Button>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-gray-700 cursor-pointer text-lg hover:underline">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between">
                  <span className="text-amber-800 font-bold">
                    {course.pricing?.isPaid ? `${course.pricing.price} EGP` : "Free"}
                  </span>
                  <span className="bg-gray-500 text-white px-5 py-1 rounded-md">
                    {course.subject || course.category}
                  </span>
                </div>
                <p className="font-semibold">Total Lessons : {course.totalLessons || course.lessonCount || 0}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <FaChevronLeft size={18} />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 bg-transparent"
          >
            Next
            <FaChevronRight size={18} />
          </Button>
        </div>
      )}
    </div>
  )
}
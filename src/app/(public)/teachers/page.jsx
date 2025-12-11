"use client"



import { FilterSidebar } from "@/components/TeacherComponents/FilterSidebar"
import { TeacherCard } from "@/components/TeacherComponents/TeacherCard"
import { Pagination } from "@/components/TeacherComponents/Pagination"
import { useState, useMemo } from "react"
import CourseBreadcrumb from "@/components/shared/courses/CourseBreadcrumb"
import { useGetAllUsersQuery } from "@/redux/api/endPoints/usersApiSlice"

export default function TeachersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    subjects: [],
    gender: "",
    totalRatings: null,
    degree: [],
    university: []
  })
  const itemsPerPage = 6

  // Query Params for API
  const queryParams = {
    role: 'teacher',
    page: currentPage,
    limit: 100, // Fetch all for clientside filtering or implement server side later
    // ... we could map filters to params if backend supports it
  }

  const { data: usersData, isLoading } = useGetAllUsersQuery(queryParams);
  const teachers = usersData?.data?.users || [];

  // ========== FILTER LOGIC ==========
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const td = teacher.teacherData
      const { subjects, gender, totalRatings, degree, university } = filters

      // Filter: subjects
      if (subjects.length > 0 && !td?.subjects?.some(sub => subjects.includes(sub))) return false

      // Filter: gender
      if (gender && teacher.gender !== gender) return false

      // Filter: totalRatings
      if (totalRatings !== null && (td?.totalRatings || 0) < totalRatings) return false

      // Filter: degree
      if (degree.length > 0 && !td?.qualifications?.some(q => degree.includes(q.degree))) return false

      // Filter: university
      if (university.length > 0 && !td?.qualifications?.some(q => university.includes(q.university))) return false

      return true
    })
  }, [filters, teachers])

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage)

  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedTeachers = filteredTeachers.slice(startIdx, startIdx + itemsPerPage)

  if (isLoading) return <div className="p-10 text-center">Loading Teachers...</div>

  return (
    <main className="bg-background">

      <CourseBreadcrumb title="Teachers" currentPage="Teachers" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-6 flex flex-col xl:flex-row gap-8">

        {/* Desktop Sidebar */}
        <aside className="hidden xl:block w-64 flex-none">
          <FilterSidebar
            teachers={teachers}
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters)
              setCurrentPage(1)
            }}
          />
        </aside>

        {/* Mobile Sidebar */}
        <div className="xl:hidden">
          <FilterSidebar
            teachers={teachers}
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters)
              setCurrentPage(1)
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full min-w-0">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedTeachers.length > 0 ? (
              displayedTeachers.map((teacher) => (
                <TeacherCard key={teacher._id} teacher={teacher} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">No teachers found.</div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </div>

    </main>
  )
}

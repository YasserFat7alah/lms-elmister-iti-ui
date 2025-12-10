'use client'
import React, { useState, useMemo } from 'react'
import CourseSearch from '@/components/coursesComponent/CourseSearch'
import CoursesList from '@/components/coursesComponent/CoursesList'
import Filterition from '@/components/coursesComponent/Filterition'
import SectionHeader from '@/components/shared/SectionHeader'
import { useGetPublicCoursesQuery } from '@/redux/api/endPoints/publicApiSlice'

const Page = () => {
  const [page, setPage] = useState(1);

  // Filter States
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchInstructor, setSearchInstructor] = useState([]) // Removed
  const [languageFilter, setLanguageFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]); // Array of ranges
  const [gradeFilter, setGradeFilter] = useState([]); // Array of levels

  // Calculate Min/Max from selected ranges
  const { minPrice, maxPrice } = useMemo(() => {
    if (priceFilter.length === 0) return { minPrice: undefined, maxPrice: undefined };

    let min = Infinity;
    let max = -Infinity;

    priceFilter.forEach(range => {
      if (range.toLowerCase() === 'free') {
        min = Math.min(min, 0);
        max = Math.max(max, 0);
      } else if (range.includes('+')) {
        const val = parseFloat(range);
        min = Math.min(min, val);
        max = Infinity;
      } else {
        const parts = range.split('-');
        if (parts.length === 2) {
          min = Math.min(min, parseFloat(parts[0]));
          max = Math.max(max, parseFloat(parts[1]));
        }
      }
    });

    return {
      minPrice: min === Infinity ? undefined : min,
      maxPrice: max === Infinity ? undefined : max
    };
  }, [priceFilter]);

  // ACTIONS
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilterUpdate = (setter, value) => {
    setter(value);
    setPage(1);
    scrollToTop();
  };

  const queryParams = {
    page,
    limit: 12,
    search: searchQuery,
    selectedSubjects,
    // searchInstructor,
    languageFilter,
    minPrice,
    maxPrice,
    gradeLevel: gradeFilter.length > 0 ? gradeFilter : undefined,
  };

  const { data: coursesData, isLoading, isError, error } = useGetPublicCoursesQuery(queryParams);

  const coursesList = coursesData?.data || [];
  const availableFilters = coursesData?.filters || { subjects: [], gradeLevels: [], languages: [] };

  if (isLoading) return <div className="text-center py-10">Loading Courses...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error: {error?.data?.message || 'Something went wrong'}</div>;

  return (
    <>
      <div className="my-2 mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 flex flex-col xl:flex-row gap-6">

        {/* Desktop/Tablet Sidebar (Sticky) */}
        <aside className="hidden xl:block w-64 xl:w-72 flex-none">
          <Filterition
            onFilter={(val) => handleFilterUpdate(setSelectedSubjects, val)}
            selectedSubjects={selectedSubjects}

            // Removed Instructor Props
            // onInstructorSearch={setSearchInstructor}
            // searchInstructor={searchInstructor}

            priceFilter={priceFilter}
            onPriceChange={(val) => handleFilterUpdate(setPriceFilter, val)}

            gradeFilter={gradeFilter}
            onGradeChange={(val) => handleFilterUpdate(setGradeFilter, val)}

            languageFilter={languageFilter}
            onLanguageChange={(val) => handleFilterUpdate(setLanguageFilter, val)}

            availableSubjects={availableFilters.subjects}
            availableGradeLevels={availableFilters.gradeLevels}
            availableLanguages={availableFilters.languages}
          // availableInstructors={availableFilters.instructors} //
          />
        </aside>

        {/* Mobile Floating Filters */}
        <div className="xl:hidden">
          <Filterition
            onFilter={(val) => handleFilterUpdate(setSelectedSubjects, val)}
            selectedSubjects={selectedSubjects}
            priceFilter={priceFilter}
            onPriceChange={(val) => handleFilterUpdate(setPriceFilter, val)}
            gradeFilter={gradeFilter}
            onGradeChange={(val) => handleFilterUpdate(setGradeFilter, val)}
            languageFilter={languageFilter}
            onLanguageChange={(val) => handleFilterUpdate(setLanguageFilter, val)}

            availableSubjects={availableFilters.subjects}
            availableGradeLevels={availableFilters.gradeLevels}
            availableLanguages={availableFilters.languages}
          />
        </div>

        <div className="flex-1 w-full min-w-0">

          <SectionHeader
            title="Browse our courses"
          >
            <CourseSearch onSearch={(val) => handleFilterUpdate(setSearchQuery, val)} />
          </SectionHeader>



          {/* Courses List */}
          {coursesList.length > 0 ? (
            <CoursesList
              courses={coursesList}
              currentPage={page}
              totalPages={coursesData?.pages || 1}
              onPageChange={setPage}
            />
          ) : (
            <div className="text-center text-gray-500 mt-10">No courses found matching your criteria.</div>
          )}

        </div>

      </div>
    </>
  )
}

export default Page
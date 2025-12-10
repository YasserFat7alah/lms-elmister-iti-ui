'use client'
import React, { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import CourseSearch from '@/components/coursesComponent/CourseSearch'
import CoursesList from '@/components/coursesComponent/CoursesList'
import Filterition from '@/components/coursesComponent/Filterition'
import SectionHeader from '@/components/shared/SectionHeader'
import { useGetPublicCoursesQuery } from '@/redux/api/endPoints/publicApiSlice'

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Derive State from URL
  const page = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || "";
  const selectedSubjects = useMemo(() => searchParams.getAll('selectedSubjects'), [searchParams]);
  const languageFilter = useMemo(() => searchParams.getAll('languageFilter'), [searchParams]);
  const priceFilter = useMemo(() => searchParams.getAll('priceFilter'), [searchParams]);
  const gradeFilter = useMemo(() => searchParams.getAll('gradeFilter'), [searchParams]);

  // 2. Calculate Derived Values (Min/Max Price)
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

  // 3. URL Update Handler
  const updateFilter = React.useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'page') {
      params.set('page', value);
    } else {
      // For arrays (subjects, grades, etc)
      if (Array.isArray(value)) {
        params.delete(key);
        if (value.length > 0) {
          value.forEach(v => params.append(key, v));
        }
      } else {
        // For strings (search)
        if (value && value !== 'all') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      // Reset page on filter change
      params.set('page', '1');
    }

    // Scrol to top
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // 5. Reset Handler (Atomic)
  const handleReset = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('selectedSubjects');
    params.delete('priceFilter');
    params.delete('gradeFilter');
    params.delete('languageFilter');
    params.set('page', '1');
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  const handlePageChange = React.useCallback((newPage) => {
    if (newPage !== page) updateFilter('page', newPage);
  }, [updateFilter, page]);

  const handleSearch = React.useCallback((val) => {
    if (val !== searchQuery) updateFilter('search', val);
  }, [updateFilter, searchQuery]);

  const handleSubjectChange = React.useCallback((val) => {
    const valArr = Array.isArray(val) ? [...val] : [];
    const currArr = [...selectedSubjects];
    const isSame = JSON.stringify(valArr.sort()) === JSON.stringify(currArr.sort());
    if (!isSame) updateFilter('selectedSubjects', val);
  }, [updateFilter, selectedSubjects]);

  const handlePriceChange = React.useCallback((val) => {
    const valArr = Array.isArray(val) ? [...val] : [];
    const currArr = [...priceFilter];
    const isSame = JSON.stringify(valArr.sort()) === JSON.stringify(currArr.sort());
    if (!isSame) updateFilter('priceFilter', val);
  }, [updateFilter, priceFilter]);

  const handleGradeChange = React.useCallback((val) => {
    // FilterLevel passes "all" string when empty
    const valArr = Array.isArray(val) ? [...val] : [];
    const currArr = [...gradeFilter];
    const isSame = JSON.stringify(valArr.sort()) === JSON.stringify(currArr.sort());
    if (!isSame) updateFilter('gradeFilter', val);
  }, [updateFilter, gradeFilter]);

  const handleLanguageChange = React.useCallback((val) => {
    const valArr = Array.isArray(val) ? [...val] : [];
    const currArr = [...languageFilter];
    const isSame = JSON.stringify(valArr.sort()) === JSON.stringify(currArr.sort());
    if (!isSame) updateFilter('languageFilter', val);
  }, [updateFilter, languageFilter]);

  const queryParams = {
    page,
    limit: 12,
    search: searchQuery,
    selectedSubjects: selectedSubjects.length > 0 ? selectedSubjects : undefined,
    // searchInstructor,
    languageFilter: languageFilter.length > 0 ? languageFilter : undefined,
    minPrice,
    maxPrice,
    gradeLevel: (() => {
      const activeGrades = gradeFilter.filter(g => g.toLowerCase() !== 'all');
      return activeGrades.length > 0 ? activeGrades : undefined;
    })(),
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
            onFilter={handleSubjectChange}
            selectedSubjects={selectedSubjects}

            // Removed Instructor Props
            // onInstructorSearch={setSearchInstructor}
            // searchInstructor={searchInstructor}

            priceFilter={priceFilter}
            onPriceChange={handlePriceChange}

            gradeFilter={gradeFilter}
            onGradeChange={handleGradeChange}

            languageFilter={languageFilter}
            onLanguageChange={handleLanguageChange}

            availableSubjects={availableFilters.subjects}
            availableGradeLevels={availableFilters.gradeLevels}
            availableLanguages={availableFilters.languages}
            onReset={handleReset}
          />
        </aside>

        {/* Mobile Floating Filters */}
        <div className="xl:hidden">
          <Filterition
            onFilter={handleSubjectChange}
            selectedSubjects={selectedSubjects}
            priceFilter={priceFilter}
            onPriceChange={handlePriceChange}
            gradeFilter={gradeFilter}
            onGradeChange={handleGradeChange}
            languageFilter={languageFilter}
            onLanguageChange={handleLanguageChange}

            availableSubjects={availableFilters.subjects}
            availableGradeLevels={availableFilters.gradeLevels}
            availableLanguages={availableFilters.languages}
            onReset={handleReset}
          />
        </div>

        <div className="flex-1 w-full min-w-0">

          <SectionHeader
            title="Browse our courses"
          >
            <CourseSearch onSearch={handleSearch} />
          </SectionHeader>



          {/* Courses List */}
          {coursesList.length > 0 ? (
            <CoursesList
              courses={coursesList}
              currentPage={page}
              totalPages={coursesData?.pages || 1}
              onPageChange={handlePageChange}
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
'use client'
import React, { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import TeacherSearch from '@/components/teachersComponent/TeacherSearch'
import TeachersList from '@/components/teachersComponent/TeachersList'
import FilterContainer from '@/components/shared/filtration/FilterContainer'
import FilterCategory from '@/components/coursesComponent/filters/FilterCategory'
import SectionHeader from '@/components/shared/SectionHeader'
import { useGetPublicTeachersQuery } from '@/redux/api/endPoints/publicApiSlice'

import { Suspense } from "react";
import { Spinner } from "@/components/shared/Loader";

// Create a local TeachersFilter component to compose specific filters
const TeachersFilter = ({
  onFilter, selectedSubjects,
  availableSubjects = [],
  onReset
}) => {
  return (
    <FilterContainer onClear={onReset}>
      <FilterCategory
        onFilter={onFilter}
        selectedSubjects={selectedSubjects}
        availableSubjects={availableSubjects}
      />
      {/* We can add Rating Filter here later */}
      {/* <FilterRating ... /> */}
    </FilterContainer>
  )
}

const TeachersContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Derive State from URL
  const page = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || "";
  const selectedSubjects = useMemo(() => searchParams.getAll('selectedSubjects'), [searchParams]);
  // Add rating if implemented in URL
  const ratingFilter = searchParams.get('rating'); // e.g. "4"

  // 2. URL Update Handler
  const updateFilter = React.useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'page') {
      params.set('page', value);
    } else {
      if (Array.isArray(value)) {
        params.delete(key);
        if (value.length > 0) {
          value.forEach(v => params.append(key, v));
        }
      } else {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      params.set('page', '1');
    }

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // 4. Reset Key
  const [resetKey, setResetKey] = React.useState(0);

  // 3. Reset Handler
  const handleReset = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('selectedSubjects');
    params.delete('rating');
    params.set('page', '1');
    setResetKey(prev => prev + 1);
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


  const queryParams = {
    page,
    limit: 12,
    search: searchQuery,
    selectedSubjects: selectedSubjects.length > 0 ? selectedSubjects : undefined,
    rating: ratingFilter || undefined,
    sort: 'top_rated'
  };

  const { data: teachersData, isLoading, isError, error } = useGetPublicTeachersQuery(queryParams);

  const teachersList = teachersData?.data?.users || [];
  // For now, hardcode available subjects or fetch from API if metadata supports it.
  // Ideally backend returns 'filters' metadata. My backend implementation didn't return aggregations for filters yet, but we can iterate current list or static list.
  // Or just map unique subjects from the current page (sub-optimal) or hardcode common ones.
  // Let's rely on what `courses` did - `coursesData.filters`. My backend return for teachers didn't include `filters` yet.
  // I will check if I can use a static list for now or empty.
  const availableSubjects = [
    "Math", "Physics", "Chemistry", "Biology", "English", "Arabic",
    "History", "Geography", "French", "German", "Computer Science"
  ];

  if (isLoading) return <div className="text-center py-20 flex justify-center"><Spinner size={40} /></div>;
  if (isError) return <div className="text-center py-20 text-red-500">Error: {error?.data?.message || 'Something went wrong'}</div>;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-0 mb-6 xl:my-6 flex flex-col xl:flex-row gap-8">

        {/* Desktop/Tablet Sidebar (Sticky) */}
        <aside className="hidden xl:block w-64 2xl:w-72 flex-none">
          <TeachersFilter
            onFilter={handleSubjectChange}
            selectedSubjects={selectedSubjects}
            availableSubjects={availableSubjects}
            onReset={handleReset}
          />
        </aside>

        {/* Mobile Floating Filters - Reusing the container logic but responsive */}
        <div className="xl:hidden">
          <TeachersFilter
            onFilter={handleSubjectChange}
            selectedSubjects={selectedSubjects}
            availableSubjects={availableSubjects}
            onReset={handleReset}
          />
        </div>

        <div className="flex-1 w-full min-w-0">
          <SectionHeader title="Meet Our Teachers">
            <TeacherSearch onSearch={handleSearch} resetTrigger={resetKey} defaultValue={searchQuery} />
          </SectionHeader>

          {/* Teachers List */}
          {teachersList.length > 0 ? (
            <TeachersList
              teachers={teachersList}
              currentPage={page}
              totalPages={teachersData?.pages || 1}
              onPageChange={handlePageChange}
            />
          ) : (
            <div className="text-center text-gray-500 mt-20 p-10 bg-gray-50 rounded-xl">
              <p className="text-lg font-semibold">No teachers found.</p>
              <p className="text-sm">Try adjusting your filters or search.</p>
              <button onClick={handleReset} className="mt-4 text-[#FF0055] underline hover:text-red-700">Clear all filters</button>
            </div>
          )}

        </div>

      </div>
    </>
  )
}

const TeachersPage = () => {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Spinner /></div>}>
      <TeachersContent />
    </Suspense>
  )
}

export default TeachersPage;

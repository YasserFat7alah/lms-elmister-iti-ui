'use client'
import CourseSearch from '@/components/coursesComponent/CourseSearch'
import CoursesList from '@/components/coursesComponent/CoursesList'
import Filterition from '@/components/coursesComponent/Filterition'
import CourseBreadcrumb from '@/components/shared/courses/CourseBreadcrumb'
import { mockCourses } from '@/data/mockCourses'
import { mockTeachers } from '@/data/mockTeacher'
import React, { useState } from 'react'

const page = () => {

  const [selectedSubjects , setSelectedSubjects] = useState([]);
  const [searchQuery , setSearchQuery] = useState("");
  const [searchInstructor , setSearchInstructor] = useState([])
  const [priceFilter , setPriceFilter] = useState("all")
  const [gradeFilter , setGradeFilter] = useState("all")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });


  //___________FILTER LOGIC_____________

  let filteredCourses = mockCourses ;

  //FILTER BY SUBJECT
  if(selectedSubjects.length > 0){
    filteredCourses= filteredCourses.filter(course => 
      selectedSubjects.includes(course.subject)
    );
  }

  //FILTER BY TEACHER NAME
  if (Array.isArray(searchInstructor) && searchInstructor.length > 0) {
    filteredCourses = filteredCourses.filter(course =>
      searchInstructor.includes(course.teacherId)
    );
  }
  

  //FILTER BY SEARCH TEXT
  if(searchQuery.trim() !== ""){
    filteredCourses = filteredCourses.filter(course=>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  //FILTER BY PRICE
  if(priceFilter !== "all" && Array.isArray(priceFilter) && priceFilter.length > 0){
    filteredCourses = filteredCourses.filter((course) => {
      const isPaid = course.pricing?.isPaid === true;
      const isFree = !course.pricing || course.pricing?.isPaid === false;
      
      if(priceFilter.includes('paid') && priceFilter.includes('free')){
        return true; // Show all if both are selected
      } else if(priceFilter.includes('paid')){
        return isPaid;
      } else if(priceFilter.includes('free')){
        return isFree;
      }
      return true;
    });
  }

  //FILTER BY GRADE LEVEL
  if(gradeFilter !== "all" && Array.isArray(gradeFilter) && gradeFilter.length > 0){
    filteredCourses = filteredCourses.filter(course => 
      gradeFilter.includes(String(course.gradeLevel))
    )
  }


  //FILTER PRICE RANGE
  if(priceRange.min !== "" && priceRange.min != null) {
    filteredCourses = filteredCourses.filter(course =>
      course.pricing?.price >= parseFloat(priceRange.min)
    );
  }
  
  if(priceRange.max !== "" && priceRange.max != null) {
    filteredCourses = filteredCourses.filter(course =>
      course.pricing?.price <= parseFloat(priceRange.max)
    );
  }
  
  return (

    <>
      <CourseBreadcrumb/>
      <div className="my-5 mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[auto_1fr] justify-center lg:justify-between items-start gap-4">
  
      <Filterition 
        onFilter={setSelectedSubjects}
        selectedSubjects={selectedSubjects}
        onInstructorSearch={setSearchInstructor}
        searchInstructor={searchInstructor}
        priceFilter={priceFilter}
        onPriceChange={setPriceFilter}
        gradeFilter={gradeFilter}
        onGradeChange={setGradeFilter}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />

      <div className=" w-full">

        {/* Search + Showing Results */}
        <div className="flex items-center justify-between flex-col lg:flex-row gap-5 mb-5 lg:pt-4 ">
          <CourseSearch onSearch={setSearchQuery} />
          <p className="text-gray-500 font-semibold">
            Showing {filteredCourses.length} of {mockCourses.length} results
          </p>
        </div>

        {/* Courses List */}
        <CoursesList courses={filteredCourses} />
      
      </div>

    </div>

    </>
  )
}

export default page
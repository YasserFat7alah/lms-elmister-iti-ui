'use client'
import CourseSearch from '@/components/coursesComponent/CourseSearch'
import CoursesList from '@/components/coursesComponent/CoursesList'
import FilterCategory from '@/components/coursesComponent/FilterCategory'
import { mockCourses } from '@/data/mockCourses'
import React, { useState } from 'react'

const page = () => {

  const [selectedSubjects , setSelectedSubjects] = useState([]);
  const [searchQuery , setSearchQuery] = useState("");

  //___________FILTER LOGIC_____________

  let filteredCourses = mockCourses ;

  //FILTER BY SUBJECT
  if(selectedSubjects.length > 0){
    filteredCourses= filteredCourses.filter(course => 
      selectedSubjects.includes(course.subject)
    );
  }


  //FILTER BY SEARCH TEXT
  if(searchQuery.trim() !== ""){
    filteredCourses = filteredCourses.filter(course=>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }



  return (
    <>
      <div className='w-full bg-black mt-10 py-8 text-gray-100 font-bold text-2xl text-center'>
        Courses
      </div>

      <div className=' my-5 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center'>
        <CourseSearch onSearch={setSearchQuery}/>
        <div className='flex flex-col lg:flex-row gap-4'>
          <FilterCategory onFilter={setSelectedSubjects}/>
          <CoursesList courses={filteredCourses}/>
        </div>
      </div>
    </>
  )
}

export default page
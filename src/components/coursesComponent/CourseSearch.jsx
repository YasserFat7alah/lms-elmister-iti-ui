'use client'
import React from 'react'
import { Input } from '../ui/input';

const CourseSearch = ({onSearch}) => {

    const handelSearch=(e)=>{
        onSearch(e.target.value)
    }


  return (
    <Input className="mb-10 mt-5 lg:w-[50%] " type='search' placeholder="Search about a course...." onChange={handelSearch}/>
  )
}

export default CourseSearch;
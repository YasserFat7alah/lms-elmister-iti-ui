'use client'
import React from 'react'
import { Input } from '../ui/input';

const CourseSearch = ({onSearch}) => {

    const handelSearch=(e)=>{
        onSearch(e.target.value)
    }


  return (
    <Input className="md:w-[60%] lg:w-[66%] " type='search' placeholder="Search about a course...." onChange={handelSearch}/>
  )
}

export default CourseSearch;
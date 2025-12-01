'use client'
import React, { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from 'next/link';
import { Button } from '../ui/button';

const CoursesList = ({courses }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return courses.slice(startIndex, endIndex);
  }, [courses, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Reset to page 1 when courses change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [courses.length]);

  return (
    <div className=''>
      {courses.length === 0 ? (
        <p className='font-bold text-gray-700 text-lg my-8'>No Courses Found For Selected Subjects.</p>
      ) :(
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4'>
            {paginatedCourses.map(course=>(

              <Card  key={course.id} className="max-w-sm mx-auto mb-4 overflow-hidden">

                <div className="relative w-full h-48 overflow-hidden rounded-t-xl group">
                    {/* IMAGE*/}
                    <div className="w-full h-full overflow-hidden">
                      {/* <Image
                        src={course.thumbnail.url}
                        alt={course.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      /> */}
                    </div>

                    {/* OVERLAY*/}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <Link className="cursor-pointer"  href={`/courses/${course.id}`}>
                          <Button>
                              View Course
                          </Button>
                        </Link>
                    </div>
                </div>

                <CardHeader>
                    <CardTitle className="text-gray-700 cursor-pointer text-lg hover:underline">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                </CardHeader>
        
                <CardContent>
                    <div className="flex justify-between">
                      <span className='text-amber-800 font-bold'>{course.pricing.isPaid ? `${course.pricing.price} EGP` : "Free"}</span>
                      <span className='bg-gray-500 text-white px-3 py-1 rounded-md'>{course.subject}</span>
                    </div>
                    <p className='font-semibold'>Total Lessons : {course.totalLessons}</p>
                </CardContent>

              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  )
}

export default CoursesList
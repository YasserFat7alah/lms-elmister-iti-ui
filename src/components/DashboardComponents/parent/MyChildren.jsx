"use client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import ChildBanner from "./mychildComponent/ChildBanner"
import EnrollCourses from "./mychildComponent/EnrollCourses"
import { IoBookOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetChildrenQuery } from "@/redux/api/endPoints/childrenApiSlice";
import { FullPageLoader } from "@/components/shared/Loader";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MyChildren = () => {
  const { data: childrenData, isLoading, isError, error } = useGetChildrenQuery();

  if (isLoading) {
    return <FullPageLoader message="Loading children..." />;
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="shadow-lg border-2 border-red-300">
        <AlertDescription className="text-red-700 font-medium">
          {error?.data?.message || "Failed to load children. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  // transformResponse extracts the data field, so childrenData is the array directly
  const children = Array.isArray(childrenData) ? childrenData : childrenData?.data || [];

  if (!children || children.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <IoBookOutline className="w-10 h-10 text-[#392b80]" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Children Added Yet</h3>
        <p className="text-gray-500 mb-6 text-base">Add your first child to get started</p>
        <Link href="/dashboard/parent/children/add-child">
          <Button className="bg-gradient-to-r from-[#392b80] to-[#6a5acd] hover:from-[#2a2060] hover:to-[#5243aa] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 rounded-full text-lg font-bold">
            Add Your First Child
          </Button>
        </Link>
      </div>
    );
  }

  if (children.length === 1) {
    const child = children[0];

    return (
      <div>
        <ChildBanner child={child} />
        <EnrollCourses child={child} />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children.map((child) => (
        <div key={child?._id} className="group relative border-2 border-gray-200 rounded-2xl p-6 bg-white shadow-md hover:shadow-lg hover:border-[#392b80] transition-all duration-300 ">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#392b80]/5 to-[#6a5acd]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-5">
              {/* _______________AVATAR________________ */}
              <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg group-hover:ring-[#392b80] transition-all duration-300">
                <AvatarImage src={child?.avatar?.url || child?.avatar} className="w-full h-full object-cover" />
                <AvatarFallback className="text-3xl font-extrabold bg-gradient-to-br from-[#FF0055] to-[#ff4d8a] text-white">
                  {child?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* _______________NAME AND GRADE________________ */}
              <div className="flex flex-col">
                <h5 className="text-xl font-bold text-gray-800 group-hover:text-[#392b80] transition-colors">{child?.name}</h5>
                <span className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full mt-1">
                  Grade {child?.grade}
                </span>
              </div>
            </div>

            {/* _______________QUICK INFO________________ */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                  <IoBookOutline className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 text-sm font-medium">Active Courses</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                <div className="p-2 bg-purple-500 rounded-lg shadow-sm">
                  <FaRegCalendarAlt className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-sm font-medium">View Schedule</span>
              </div>
            </div>

            {/* _______________ACTION BUTTON________________ */}
            <Link href={`/dashboard/parent/children/${child._id}`}>
              <Button
                variant='outline'
                className='w-full font-bold rounded-xl cursor-pointer text-[#392b80] border-2 border-[#392b80] hover:bg-gradient-to-r hover:from-[#392b80] hover:to-[#6a5acd] hover:text-white hover:border-transparent shadow-sm hover:shadow-lg transition-all duration-300 py-6 text-base '
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyChildren

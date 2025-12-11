
import { mockCourses } from '@/data/mockCourses';
import { children } from '@/data/parentData';
import Link from 'next/link';
import React from 'react'
import { IoReturnUpBack } from 'react-icons/io5';

const page = () => {

  // Calculate total monthly fee
  const totalMonthlyFee = children.reduce((sum, child) => {
    const childTotal = child.enrolledCourses.reduce((childSum, enrolled) => {
      const course = mockCourses.find((c) => c.id === enrolled.courseId);
      return childSum + (course?.pricing?.price ?? 0);
    }, 0);
    return sum + childTotal;
  }, 0);

  const totalSubscriptions = children.reduce((sum, child) => sum + child.enrolledCourses.length, 0);

  return (
    <div className="space-y-4">
      <BackBtn />
      {/* ____________BANNER___________ */}
      <div className="bg-white border  rounded-2xl p-8  shadow-lg">
        <p className="font-medium opacity-90">Total Monthly Fee</p>
        <h2 className="text-4xl font-semibold mt-2 text-[#FF0055]">{totalMonthlyFee.toLocaleString()} <sub className="font-medium">EGP</sub></h2>
        <p className="mt-3 opacity-90 text-gray-600">{totalSubscriptions} active subscriptions</p>
      </div>
      {/* ______________________________ */}
      <ActiveSubscriptions />
    </div>
  )
}

export default page
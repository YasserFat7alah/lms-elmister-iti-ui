"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import EnrollBtn from "./EnrollBtn";

const DetailsSidebar = ({ course, selectedGroup }) => {
  if (!course) return null;

  return (
    <div className="sticky top-24 space-y-4 w-full">

      {/* Main Action Card */}
      <div className="bg-white border rounded-t-xl shadow-sm overflow-hidden p-5 pb-0 border-b-0 hidden lg:block">

        {/* Price & Currency */}
        <div className="mb-4">
          {selectedGroup ? (
            // Selected Group Price
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium">Selected Group</span>
              <div className="flex items-end gap-1.5">
                <span className="text-3xl font-extrabold text-pink-600">{selectedGroup.price}</span>
                <span className="text-sm font-medium text-gray-500 mb-1.5 uppercase">{course.currency || 'EGP'}</span>
                <span className="text-xs text-gray-400 mb-2">/month</span>
              </div>
            </div>
          ) : (
            // No selection - Prompt or Base Price
            <div className="flex flex-col">
              <span className="text-pink-600 font-bold text-lg">Select a group to enroll</span>
              {course.minCost > 0 && (
                <span className="text-gray-400 text-xs mt-1">Starts from {course.minCost} {course.currency || 'EGP'}</span>
              )}
            </div>
          )}
        </div>

        {/* Enroll Button */}
        <div className="mb-4">
          <EnrollBtn selectedGroup={selectedGroup} course={course} />
        </div>

        {/* Features List (Short) */}
        {course.features && course.features.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-bold text-gray-900 mb-3 text-sm">This course includes:</h4>
            <ul className="space-y-2">
              {course.features.slice(0, 5).map((feature, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Mobile Sticky Bottom Bar (Only visible on mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 lg:hidden flex items-center justify-between gap-4">
        <div className="flex flex-col">
          {selectedGroup ? (
            <div className="flex flex-col">
              <span className="text-gray-500 text-[10px] font-medium leading-none">Selected Group</span>
              <div className="flex items-end gap-1">
                <span className="font-bold text-lg text-pink-600 leading-none">{selectedGroup.price}</span>
                <span className="text-xs text-gray-500 font-normal uppercase leading-none mb-0.5">{course.currency || 'EGP'}</span>
              </div>
            </div>
          ) : (
            course.minCost > 0 ? (
              <span className="font-bold text-lg text-gray-900">{course.minCost} <span className="text-xs text-gray-500 font-normal uppercase">{course.currency || 'EGP'}</span></span>
            ) : (
              <span className="font-bold text-lg text-green-600">Free</span>
            )
          )}
        </div>
        <div className="flex-1">
          <EnrollBtn selectedGroup={selectedGroup} course={course} />
        </div>
      </div>

    </div>
  );
};

export default DetailsSidebar;

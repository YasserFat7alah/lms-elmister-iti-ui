"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import EnrollBtn from "./EnrollBtn";

const DetailsSidebar = ({ course }) => {
  if (!course) return null;

  return (
    <div className="sticky top-24 space-y-4 w-full">

      {/* Main Action Card */}
      <div className="bg-white border rounded-t-xl shadow-sm overflow-hidden p-5 pb-0 border-b-0 hidden md:block">

        {/* Price & Currency */}
        <div className="mb-4">
          {course.minCost > 0 ? (
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium">Starts from</span>
              <div className="flex items-end gap-1.5">
                <span className="text-2xl font-bold text-gray-900">{course.minCost}</span>
                <span className="text-xs font-medium text-gray-500 mb-1 uppercase">{course.currency || 'EGP'}</span>
              </div>
            </div>
          ) : (
            <span className="text-2xl font-bold text-green-600">Free</span>
          )}
          <p className="text-gray-400 text-[10px] mt-1">Monthly subscription. Cancel anytime.</p>
        </div>

        {/* Enroll Button */}
        <div className="mb-4">
          <EnrollBtn />
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden flex items-center justify-between gap-4">
        <div className="flex flex-col">
          {course.minCost > 0 ? (
            <span className="font-bold text-lg text-gray-900">{course.minCost} <span className="text-xs text-gray-500 font-normal uppercase">{course.currency || 'EGP'}</span></span>
          ) : (
            <span className="font-bold text-lg text-green-600">Free</span>
          )}
        </div>
        <div className="flex-1">
          <EnrollBtn />
        </div>
      </div>

    </div>
  );
};

export default DetailsSidebar;

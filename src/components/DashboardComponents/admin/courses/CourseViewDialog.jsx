"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Star, CheckCircle, Archive, Edit, X, Eye } from "lucide-react";
import { RiDraftFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";

// View Course Dialog
const CourseViewDialog = ({ open, onOpenChange, course }) => {
  if (!course) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: {
        className: "bg-green-100 text-green-700 border-green-200",
        icon: <CheckCircle className="w-4 h-4 mr-1" />,
        label: "Published"
      },
      draft: {
        className: "bg-blue-100 text-blue-700 border-blue-200",
        icon: <RiDraftFill className="w-4 h-4 mr-1" />,
        label: "Draft"
      },
      archived: {
        className: "bg-gray-100 text-gray-700 border-gray-200",
        icon: <Archive className="w-4 h-4 mr-1" />,
        label: "Archived"
      },
      "in-review": {
        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: <MdReviews className="w-4 h-4 mr-1" />,
        label: "In Review"
      }
    };

    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <Badge className={`${config.className} border flex items-center w-fit`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="p-0 max-w-2xl w-full overflow-hidden bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* HEADER  */}
        <div className="sticky top-0 bg-white z-20 border-b p-6 bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF0055]/10 rounded-lg">
                <Eye className="w-6 h-6 text-[#FF0055]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">View Course</h2>
                <p className="text-sm text-gray-600 mt-1">View course information</p>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-6  space-y-6">
            <div className="grid grid-cols-2 gap-4">
                {/* Title & Subtitle */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Title</label>
                    <p className="text-lg font-medium text-gray-900">{course.title}</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Subtitle</label>
                    <p className="text-base text-gray-600">{course.subTitle || 'No subtitle'}</p>
                </div>

            </div>

          {/* Subject & Grade Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Subject</label>
              <p className="text-base text-gray-900">{course.subject || 'N/A'}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Grade Level</label>
              <p className="text-base text-gray-900">Grade {course.gradeLevel || 'N/A'}</p>
            </div>
          </div>

          {/* Total Students & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Total Students</label>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <p className="text-lg font-medium text-gray-900">{course.totalStudents || 0}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Average Rating</label>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <p className="text-lg font-medium text-gray-900">
                  {course.averageRating?.toFixed(1) || '0.0'}
                  <span className="text-sm text-gray-500 ml-1">
                    ({course.ratingsCount || 0} ratings)
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Status</label>
            <div>{getStatusBadge(course.status)}</div>
          </div>
        </div>

        {/* FOOTER - fixed */}
        <div className="sticky bottom-0 bg-white z-20 border-t p-4 flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseViewDialog

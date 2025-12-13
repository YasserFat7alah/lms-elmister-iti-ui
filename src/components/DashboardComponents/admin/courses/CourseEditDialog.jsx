"use client";
import React, { useEffect } from "react";
import { Users, Star, Edit, X } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaBookOpen } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const CourseEditDialog = ({ open, onOpenChange, course, onUpdate }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      subTitle: "",
      subject: "",
      gradeLevel: "",
      status: "draft",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").min(3),
      subject: Yup.string().required("Subject is required"),
      gradeLevel: Yup.string()
        .required("Grade level is required")
        .oneOf(
          ["1","2","3","4","5","6","7","8","9","10","11","12"],
          "Grade level must be between 1 and 12"
        ),
      status: Yup.string().required(),
    }),

    onSubmit: (values) => {
      onUpdate({
        ...course,
        ...values,
        gradeLevel: values.gradeLevel, // stays STRING
      });
    },
  });

  useEffect(() => {
    if (course) {
      formik.setValues({
        title: course.title || "",
        subTitle: course.subTitle || "",
        subject: course.subject || "",
        gradeLevel: course.gradeLevel?.toString() || "",
        status: course.status || "draft",
      });
    }
  }, [course]);

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl w-full overflow-hidden bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* HEADER  */}
        <div className="sticky top-0 bg-white z-20 border-b p-6 bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF0055]/10 rounded-lg">
                <Edit className="w-6 h-6 text-[#FF0055]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
                <p className="text-sm text-gray-600 mt-1">Update course information</p>
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
          <form onSubmit={formik.handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formik.touched.title && formik.errors.title
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter course title"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-sm text-red-500">{formik.errors.title}</p>
                )}
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subtitle</label>
                <input
                  name="subTitle"
                  value={formik.values.subTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter course subtitle"
                />
              </div>
            </div>

            {/* Subject + Grade */}
            <div className="grid grid-cols-2 gap-4">
              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formik.touched.subject && formik.errors.subject
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="e.g., Mathematics"
                />
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-sm text-red-500">{formik.errors.subject}</p>
                )}
              </div>

              {/* Grade Level */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Grade Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="gradeLevel"
                  value={formik.values.gradeLevel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formik.touched.gradeLevel && formik.errors.gradeLevel
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`${i + 1}`}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
                {formik.touched.gradeLevel && formik.errors.gradeLevel && (
                  <p className="text-sm text-red-500">{formik.errors.gradeLevel}</p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Status</label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="draft">Draft</option>
                <option value="in-review">In Review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Read-only data */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Read-only Information</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Total Students</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      {course.totalStudents || 0}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Average Rating</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <p className="text-sm font-medium text-gray-700">
                      {course.averageRating?.toFixed(1) || "0.0"}
                      <span className="text-xs text-gray-500 ml-1">
                        ({course.ratingsCount || 0})
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
          </form>
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

          <Button
            type="button"
            onClick={formik.handleSubmit}
            className="bg-[#392b80] text-white hover:bg-[#392b80]/90"
          >
            <Edit className="w-4 h-4 mr-1" />
            Update Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditDialog;
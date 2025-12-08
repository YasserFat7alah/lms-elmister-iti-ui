"use client";
import React, { useEffect } from "react";
import { X, Edit } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";

const CourseEditDialog = ({ open, onOpenChange, course, onUpdate }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      teacher: "",
      students: "",
      duration: "",
      price: "",
      status: "active",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Course name is required")
        .min(3, "Course name must be at least 3 characters"),

      teacher: Yup.string().required("Teacher name is required"),

      students: Yup.number()
        .required("Students count is required")
        .min(1, "Must be at least 1 student"),

      duration: Yup.string().required("Duration is required"),

      price: Yup.number()
        .required("Price is required")
        .min(1, "Price must be greater than 0"),

      status: Yup.string().required("Status is required"),
    }),

    onSubmit: (values) => {
      onUpdate({ ...course, ...values });
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (course) {
      formik.setValues({
        title: course.title || "",
        teacher: course.teacher || "",
        students: course.students || "",
        duration: course.duration || "",
        price: course.price || "",
        status: course.status || "active",
      });
    }
  }, [course]);

  if (!open) return null;

  const handleClose = () => {
    formik.resetForm();
    onOpenChange(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden min-h-[100vh]"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl sticky top-0 bg-white z-10">
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
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Course Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                placeholder="Enter course name..."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-400 bg-red-50/50 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#392b80]/20 focus:border-[#392b80]"
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-2">{formik.errors.title}</p>
              )}
            </div>

            {/* Teacher */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teacher <span className="text-red-500">*</span>
              </label>
              <input
                name="teacher"
                placeholder="Enter teacher name..."
                value={formik.values.teacher}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  formik.touched.teacher && formik.errors.teacher
                    ? "border-red-400 bg-red-50/50 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#392b80]/20 focus:border-[#392b80]"
                }`}
              />
              {formik.touched.teacher && formik.errors.teacher && (
                <p className="text-red-500 text-sm mt-2">{formik.errors.teacher}</p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Students */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Students <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="students"
                placeholder="Students count..."
                value={formik.values.students}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  formik.touched.students && formik.errors.students
                    ? "border-red-400 bg-red-50/50 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#392b80]/20 focus:border-[#392b80]"
                }`}
              />
              {formik.touched.students && formik.errors.students && (
                <p className="text-red-500 text-sm mt-2">{formik.errors.students}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                name="duration"
                placeholder="e.g., 12 weeks"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  formik.touched.duration && formik.errors.duration
                    ? "border-red-400 bg-red-50/50 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#392b80]/20 focus:border-[#392b80]"
                }`}
              />
              {formik.touched.duration && formik.errors.duration && (
                <p className="text-red-500 text-sm mt-2">{formik.errors.duration}</p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g., 99"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  formik.touched.price && formik.errors.price
                    ? "border-red-400 bg-red-50/50 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#392b80]/20 focus:border-[#392b80]"
                }`}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-sm mt-2">{formik.errors.price}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392b80]/20 focus:border-[#392b80] transition-all"
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#392b80] text-white rounded-xl font-semibold hover:bg-[#392b80]/90 transition-all shadow-lg hover:shadow-xl"
            >
              <Edit className="w-5 h-5" />
              Update Course
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CourseEditDialog;

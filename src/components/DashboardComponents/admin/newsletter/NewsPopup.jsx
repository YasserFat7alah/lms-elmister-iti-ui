"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X, Send, Mail } from "lucide-react";

const NewsPopup = ({ editingItem, setIsPopupOpen, handleSend }) => {
  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    
    validationSchema: Yup.object({
      subject: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),
      message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters"),
    }),

    onSubmit: (values) => {
      handleSend(values);
      formik.resetForm();
    },
  });

  // Populate form when editing 
  useEffect(() => {
    if (editingItem) {
      formik.setValues({
        subject: editingItem.title || "",      // Changed from editingItem.subject
        message: editingItem.subject || "",    // Changed from editingItem.message
      });
    } else {
      formik.resetForm();
    }
  }, [editingItem]);

  const handleClose = () => {
    formik.resetForm();
    setIsPopupOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#392b80]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#392b80]/10 rounded-lg">
                <Mail className="w-6 h-6 text-[#FF0055]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? "Edit Newsletter" : "Create Newsletter"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {editingItem ? "Update your newsletter content" : "Compose a new newsletter to send"}
                </p>
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
          {/* Subject Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Newsletter Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter newsletter title..."
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                formik.touched.subject && formik.errors.subject
                  ? "border-blue-400 focus:ring-red-200 bg-red-50/50"
                  : "border-gray-300 focus:ring-[#392b80]/20 focus:border-[#392b80]"
              }`}
            />
            {formik.touched.subject && formik.errors.subject && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {formik.errors.subject}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              placeholder="Write your newsletter message..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={8}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                formik.touched.message && formik.errors.message
                  ? "border-blue-400 focus:ring-red-200 bg-red-50/50"
                  : "border-gray-300 focus:ring-[#392b80]/20 focus:border-[#392b80]"
              }`}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {formik.errors.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              {formik.values.message.length} / 1000 characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 md:px-6 py-3 bg-[#392b80] cursor-pointer text-white rounded-xl font-semibold  transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {editingItem ? "Update Newsletter" : "Add Newsletter"}
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

export default NewsPopup;
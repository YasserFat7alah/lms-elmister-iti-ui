"use client";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AlertTriangle, UploadCloud, FileText, X } from "lucide-react";

export default function SubmissionEditor({ assignment, existingContent, existingFile, isLate, onSubmit }) {

  // Validation Schema
  const SubmissionSchema = Yup.object().shape({
    content: Yup.string(),
    file: Yup.mixed(),
  }).test(
    'at-least-one',
    'You must provide either text content or an attached file.',
    (value) => {
      return (value.content && value.content.length > 0) || (value.file !== null);
    }
  );

  const formik = useFormik({
    initialValues: {
      content: existingContent || '',
      file: existingFile || null
    },
    validationSchema: SubmissionSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, resetForm);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("file", file);
    }
  };

  // Reset the input value so the same file can be selected again if needed
  const removeFile = () => {
    formik.setFieldValue("file", null);
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = "";
  };

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-semibold text-gray-900">Your Submission</h2>
        <p className="text-sm text-gray-500">Enter your answer or upload a file.</p>
      </div>

      {/* Late Warning */}
      {isLate && (
        <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900 text-sm">Late Submission Warning</h4>
            <p className="text-red-700 text-sm mt-1">
              The due date has passed. A penalty of <strong>{assignment.latePenaltyPerDay} marks</strong> will be deducted.
            </p>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">

        {/* Text Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Answer Text</label>
          <textarea
            name="content"
            className={`w-full min-h-[200px] p-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-y ${formik.errors.content && formik.errors.file ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            placeholder="Type your submission here..."
            onChange={formik.handleChange}
            value={formik.values.content}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* File Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>

          {!formik.values.file ? (
            // Upload State
            <div className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors relative ${formik.errors.file && formik.errors.content ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
              }`}>
              <input
                id="file-upload"
                type="file"
                name="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX, PNG up to 10MB</p>
            </div>
          ) : (
            // File Selected State
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-md border border-blue-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  {/* Handle both raw File object (new upload) and existing file object from DB */}
                  <p className="text-sm font-medium text-blue-900">
                    {formik.values.file.name || "Attached File"}
                  </p>
                  <p className="text-xs text-blue-600">
                    {formik.values.file.size ? (formik.values.file.size / 1024).toFixed(2) + ' KB' : 'Ready to submit'}
                  </p>
                  {formik.values.file.url && (
                    <a
                      href={formik.values.file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-700 hover:text-blue-900 underline mt-1 block"
                    >
                      Click to view/download
                    </a>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 hover:bg-blue-100 rounded-full text-blue-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Validation Error Message (Global) */}
        {(formik.errors.at_least_one || (formik.touched.content && formik.errors.content) || (formik.touched.file && formik.errors.file)) && (
          <div className="text-red-500 text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {formik.errors.at_least_one || "Please check your inputs."}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            className={`px-6 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all flex items-center gap-2 ${isLate
                ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                : 'bg-black hover:bg-gray-800 shadow-gray-200'
              }`}
          >
            {isLate ? 'Submit Late Assignment' : 'Turn In Assignment'}
          </button>
        </div>
      </div>
    </form>
  );
}
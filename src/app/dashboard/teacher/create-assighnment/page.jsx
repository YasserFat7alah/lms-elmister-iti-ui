"use client"

import { useCreateAssignmentMutation } from "@/redux/api/endPoints/assignmentsApiSlice";
import { useGetMyGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Upload, FileText, Calendar, Award, CheckCircle } from 'lucide-react';


const CreateAssignmentForm = () => {
  // 1. RTK Query Hooks
  const [createAssignment, { isLoading: isCreating, isSuccess }] = useCreateAssignmentMutation();
  const { data: groups, isLoading: isGroupsLoading, isError: isGroupsError } = useGetMyGroupsQuery();

  const allGroups = Array.isArray(groups?.data)
  ? groups.data
  : Array.isArray(groups?.groups)
  ? groups.groups
  : [];

  
  const [selectedFile, setSelectedFile] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedGroupForLessons, setSelectedGroupForLessons] = useState(null);

  // Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Assignment title is required'),
    description: Yup.string().required('Description is required'),
    totalGrade: Yup.number()
      .min(1, 'Grade must be at least 1')
      .max(1000, 'Grade cannot exceed 1000')
      .required('Total grade is required')
    ,
    dueDate: Yup.date()
      .required('Due date is required')
      .nullable()
      .min(new Date(), 'Due date cannot be in the past')
    ,
    targetId: Yup.string().required('Please select a lesson'),
    selectedGroupId: Yup.string().required('Please select a group first'),
    allowLateSubmission: Yup.boolean(),
    maxLateDays: Yup.number().when('allowLateSubmission', {
      is: true,
      then: (schema) => schema.min(1, 'Must be at least 1 day').max(365, 'Cannot exceed 365 days').required('Required when late submission is allowed'),
      otherwise: (schema) => schema.notRequired()
    }),
    latePenaltyPerDay: Yup.number().when('allowLateSubmission', {
      is: true,
      then: (schema) => schema.min(0, 'Cannot be negative').max(100, 'Cannot exceed 100').required('Required when late submission is allowed'),
      otherwise: (schema) => schema.notRequired()
    }),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      totalGrade: 100,
      dueDate: '',
      targetId: '', // Lesson ID
      selectedGroupId: '', // Group selection for filtering lessons
      allowLateSubmission: false,
      maxLateDays: 7,
      latePenaltyPerDay: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      setShowGroupModal(true);
    },
  });

  // Fetch lessons when a group is selected and assignment type is 'lesson'
  const { data: lessonsData, isLoading: isLessonsLoading, isError } = useGetLessonsByGroupQuery(
  { groupId: formik.values.selectedGroupId, page: 1, limit: 50 },
  { skip: !formik.values.selectedGroupId }
);

const allLessons = lessonsData?.data?.data || [];

console.log(allLessons);


  // Reset targetId if selectedGroupId changes
  useEffect(() => {
    formik.setFieldValue('targetId', '');
  }, [formik.values.selectedGroupId]);

//   Update selected group for lessons when user selects a group
  useEffect(() => {
    if (formik.values.selectedGroupId) {
      setSelectedGroupForLessons(formik.values.selectedGroupId);
    }
  }, [formik.values.selectedGroupId]);

  const handleFinalSubmit = async () => {
    const formData = new FormData();
    formData.append('title', formik.values.title);
    formData.append('description', formik.values.description);
    formData.append('totalGrade', formik.values.totalGrade);
    formData.append('dueDate', formik.values.dueDate);
    
    // Late submission settings
    if (formik.values.allowLateSubmission) {
        formData.append('allowLateSubmission', true);
        formData.append('maxLateDays', formik.values.maxLateDays);
        formData.append('latePenaltyPerDay', formik.values.latePenaltyPerDay);
    }

    // Only send lesson ID
    formData.append('lesson', formik.values.targetId);

    if (selectedFile) {
      formData.append('document', selectedFile);
    }

    try {
      await createAssignment(formData).unwrap();
      alert('Assignment created successfully!');
      formik.resetForm();
      setSelectedFile(null);
      setShowGroupModal(false);
      setSelectedGroupForLessons(null);
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert(`Failed to create assignment: ${error.data?.message || 'Unknown error'}`);
      setShowGroupModal(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };
  
  // Determine the selected target for the modal
  const selectedTarget = allLessons.find((l) => l._id === formik.values.targetId);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Assignment</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                  <FileText className="w-5 h-5 text-pink-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Assignment Details</h2>
                </div>

                <div>
                  {/* Assignment Title */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Physics Lab Report"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Description
                    </label>
                    <textarea
                      name="description"
                      rows="4"
                      placeholder="Describe the assignment requirements..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                    )}
                  </div>

                  {/* Group and Lesson Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step 1: Select Group
                    </label>
                    <select
                      name="selectedGroupId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      value={formik.values.selectedGroupId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={isGroupsLoading || isGroupsError}
                    >
                      <option value="">
                        {isGroupsLoading ? 'Loading Groups...' : isGroupsError ? 'Error Loading Groups' : 'Select a group first...'}
                      </option>
                      {allGroups.map((group) => (
                        <option key={group._id} value={group._id}>
                          {group.title}
                        </option>
                      ))}
                    </select>
                    {formik.touched.selectedGroupId && formik.errors.selectedGroupId && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.selectedGroupId}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Step 2: Select Lesson
                    </label>
                    <select
                      name="targetId"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      value={formik.values.targetId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!formik.values.selectedGroupId || isLessonsLoading || allLessons.length === 0}
                    >
                      <option value="">
                        {!formik.values.selectedGroupId 
                          ? 'Select a group first...' 
                          : isLessonsLoading 
                          ? 'Loading Lessons...' 
                          : allLessons.length === 0 
                          ? 'No lessons available for this group' 
                          : 'Select a lesson...'}
                      </option>
                      {allLessons.map((lesson) => (
                        <option key={lesson._id} value={lesson._id}>
                          {lesson.title}
                        </option>
                      ))}
                    </select>
                    {formik.touched.targetId && formik.errors.targetId && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.targetId}</p>
                    )}
                    {formik.values.selectedGroupId && !isLessonsLoading && allLessons.length === 0 && (
                      <p className="mt-1 text-xs text-yellow-600">
                        No lessons found for this group. Please create lessons first.
                      </p>
                    )}
                  </div>

                  {/* Total Grade & Due Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Award className="w-4 h-4 inline mr-1" />
                        Total Grade
                      </label>
                      <input
                        type="number"
                        name="totalGrade"
                        placeholder="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        value={formik.values.totalGrade}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.totalGrade && formik.errors.totalGrade && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.totalGrade}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Due Date
                      </label>
                      <input
                        type="datetime-local"
                        name="dueDate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        value={formik.values.dueDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.dueDate && formik.errors.dueDate && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.dueDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Late Submission Settings */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="allowLateSubmission"
                        name="allowLateSubmission"
                        checked={formik.values.allowLateSubmission}
                        onChange={formik.handleChange}
                        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <label htmlFor="allowLateSubmission" className="ml-2 text-sm font-medium text-gray-700">
                        Allow Late Submission
                      </label>
                    </div>

                    {formik.values.allowLateSubmission && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Late Days
                          </label>
                          <input
                            type="number"
                            name="maxLateDays"
                            placeholder="7"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            value={formik.values.maxLateDays}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.maxLateDays && formik.errors.maxLateDays && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.maxLateDays}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Late Penalty Per Day (%)
                          </label>
                          <input
                            type="number"
                            name="latePenaltyPerDay"
                            placeholder="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            value={formik.values.latePenaltyPerDay}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.latePenaltyPerDay && formik.errors.latePenaltyPerDay && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.latePenaltyPerDay}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">
                            Penalty deducted from total grade per day late
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitClick}
                      disabled={isCreating || isGroupsLoading || !formik.isValid || !formik.dirty}
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                      {isCreating ? 'Creating...' : 'Create Assignment'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Assignment Materials */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Materials</h3>

                {/* File Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachment Document
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-500 transition cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-pink-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload document</p>
                      <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
                    </label>
                  </div>
                  {selectedFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      {selectedFile.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Group Confirmation Modal */}
      {showGroupModal && selectedTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Confirm Assignment Creation</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-2">Assignment will be created for:</p>
              <p className="font-semibold text-gray-900">
                {selectedTarget.title}
              </p>
              {formik.values.selectedGroupId && (
                <p className="text-sm text-gray-500 mt-1">
                  Group: {allGroups.find(g => g._id === formik.values.selectedGroupId)?.title}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Due: {new Date(formik.values.dueDate).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowGroupModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isCreating}
                className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
              >
                {isCreating ? 'Creating...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAssignmentForm;
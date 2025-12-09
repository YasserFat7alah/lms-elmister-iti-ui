"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, Eye, BookOpen, Users, Clock, CheckCircle, Archive } from "lucide-react";
import { RiDraftFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import BulkBtn from "../BulkBtn";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";

const CourseTable = ({ data, searchTerm, setSearchTerm, onEdit, onDelete, onView }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Helper function to get course ID (handles both _id and id)
  const getCourseId = (course) => course._id?.$oid || course._id || course.id;

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => getCourseId(item)));
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm(true);
  };

  const handleDeleteClick = (e, course) => {
    e.stopPropagation();
    setIsBulkDelete(false);
    setDeleteConfirm(getCourseId(course));
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      onDelete(selectedRows);
      setSelectedRows([]);
    } else if (deleteConfirm) {
      onDelete(deleteConfirm);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      published: {
        className: "bg-green-100 text-green-700 border-green-200",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        label: "Published"
      },
      draft: {
        className: "bg-blue-100 text-blue-700 border-blue-200",
        icon: <RiDraftFill className="w-3 h-3 mr-1" />,
        label: "Draft"
      },
      archived: {
        className: "bg-gray-100 text-gray-700 border-gray-200",
        icon: <Archive className="w-3 h-3 mr-1" />,
        label: "Archived"
      },
      "in-review": {
        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: <MdReviews className="w-3 h-3 mr-1" />,
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
    <>
      <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-6">
        <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 px-6 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Courses <span className="text-sm font-normal text-gray-500">({data.length})</span>
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <BulkBtn selectedCount={selectedRows.length} onDelete={handleBulkDelete} label="Course(s)" />
            {/* ___________SEARCH INPUT____________ */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-5 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff3c]/20 focus:border-[#00ff3c] transition-all"
              />
            </div>
          </div>
        </div>
        {/* ______________________TABLE______________________________ */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="pl-4 py-3  text-left w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.length === data.length && data.length > 0} 
                    onChange={toggleSelectAll} 
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer" 
                  />
                </th>
                <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Course</th>
                <th className="px-2 py-3 text-left text-md font-bold text-gray-700 w-28">Subject</th>
                <th className="px-2 py-3 text-left text-md font-bold text-gray-700 w-24">Grade</th>
                <th className="px-2 py-3 text-center text-md font-bold text-gray-700 w-24">Students</th>
                <th className="px-2 py-3 text-left text-md font-bold text-gray-700 w-28">Rating</th>
                <th className="px-2 py-3 text-left text-md font-bold text-gray-700 w-28">Status</th>
                <th className="px-2 py-3 text-left text-md font-bold text-gray-700 w-32"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((course) => {
                  const courseId = getCourseId(course);
                  return (
                    <tr 
                      key={courseId} 
                      className={`cursor-pointer transition-colors ${
                        selectedRows.includes(courseId) ? "bg-[#392b80]/10" : "hover:bg-gray-50"
                      }`} 
                      onClick={() => toggleRowSelection(courseId)}
                    >
                      <td className="pl-4 py-3 w-12">
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(courseId)} 
                          onChange={() => toggleRowSelection(courseId)} 
                          onClick={(e) => e.stopPropagation()} 
                          className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer" 
                        />
                      </td>
                      {/* ___________TITLE / SUBTITLE___________ */}
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{course.title}</p>
                            <p className="text-xs text-gray-500 truncate">{course.subTitle || 'No subtitle'}</p>
                          </div>
                        </div>
                      </td>
                      {/* ___________SUBJECT___________ */}
                      <td className="px-2 py-3">
                        <span className="text-sm text-gray-700">{course.subject || 'N/A'}</span>
                      </td>
                      {/* __________GRADE_____________ */}
                      <td className="px-2 py-3">
                        <span className="text-sm text-gray-700">Grade {course.gradeLevel || 'N/A'}</span>
                      </td>
                      {/* ____________________TOTAL STUDENT IN COURSE________________ */}
                      <td className="px-2 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{course.totalStudents || 0}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-700">
                            {course.averageRating?.toFixed(1) || '0.0'}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({course.ratingsCount || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        {getStatusBadge(course.status)}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              onView(course); 
                            }} 
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View course"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              onEdit(course); 
                            }} 
                            className="p-1.5 text-[#FF0055] hover:bg-[#FF0055]/10 rounded-lg transition-colors"
                            title="Edit course"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleDeleteClick(e, course)} 
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete course"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Confirm Delete Popup */}
      <ConfirmDeletePopUp
        item={deleteConfirm}
        isOpen={!!deleteConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isBulk={isBulkDelete}
        selectedCount={selectedRows.length}
      />
    </>
  );
};

export default CourseTable;
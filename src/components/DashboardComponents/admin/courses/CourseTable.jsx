"use client";
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Trash2, Eye, BookOpen, Users, Clock, CheckCircle, Archive, Star, ChevronUp, ChevronDown } from "lucide-react";
import { RiDraftFill } from "react-icons/ri";
import { MdReviews } from "react-icons/md";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";
import PaginationControls from "../PaginationControls";

const CourseTable = ({ 
  data, 
  selectedRows, 
  setIsBulkDelete, 
  isBulkDelete, 
  setSelectedRows, 
  deleteConfirm, 
  setDeleteConfirm, 
  onEdit, 
  onDelete, 
  onView,
  itemsPerPage = 5 // Default items per page
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  
  // Helper function to get course ID
  const getCourseId = (course) => course._id?.['$oid'] || course._id || course.id;

  // Sort data if sortConfig is set
  const sortedData = useMemo(() => {
    const dataToSort = [...data];
    if (!sortConfig.key) return dataToSort;

    return dataToSort.sort((a, b) => {
      let aValue, bValue;
      
      if (sortConfig.key === 'title') {
        aValue = a.title?.toLowerCase() || '';
        bValue = b.title?.toLowerCase() || '';
      } else if (sortConfig.key === 'subject') {
        aValue = a.subject?.toLowerCase() || '';
        bValue = b.subject?.toLowerCase() || '';
      } else if (sortConfig.key === 'gradeLevel') {
        aValue = a.gradeLevel || 0;
        bValue = b.gradeLevel || 0;
      } else if (sortConfig.key === 'totalStudents') {
        aValue = a.totalStudents || 0;
        bValue = b.totalStudents || 0;
      } else if (sortConfig.key === 'averageRating') {
        aValue = a.averageRating || 0;
        bValue = b.averageRating || 0;
      } else if (sortConfig.key === 'status') {
        aValue = a.status?.toLowerCase() || '';
        bValue = b.status?.toLowerCase() || '';
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-3 h-3 opacity-30" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3" /> 
      : <ChevronDown className="w-3 h-3" />;
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedData.length && paginatedData.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((item) => getCourseId(item)));
    }
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

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    const key = (status || '').toLowerCase().replace(/ /g, '-');
    const statusConfig = {
      published: {
        className: "bg-green-100 text-green-700 border-green-200",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        label: "Published"
      },
      draft: {
        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: <RiDraftFill className="w-3 h-3 mr-1" />,
        label: "Draft"
      },
      archived: {
        className: "bg-gray-100 text-gray-700 border-gray-200",
        icon: <Archive className="w-3 h-3 mr-1" />,
        label: "Archived"
      },
      "in-review": {
        className: "bg-blue-100 text-blue-700 border-blue-200",
        icon: <MdReviews className="w-3 h-3 mr-1" />,
        label: "In Review"
      }
    };

    const config = statusConfig[key] || statusConfig.draft;
    
    return (
      <Badge className={`${config.className} border flex items-center w-fit`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  // --- CARD/MOBILE VIEW RENDER FUNCTION ---
  const renderCourseCard = (course) => {
    const courseId = getCourseId(course);
    const isSelected = selectedRows.includes(courseId);

    return (
      <div 
        key={courseId}
        className={`bg-white border border-gray-200 shadow-md rounded-xl p-4 transition-all space-y-3 
          ${isSelected ? "ring-2 ring-[#392b80] ring-offset-2 bg-[#392b80]/5" : "hover:shadow-lg"}`
        }
      >
        <div className="flex justify-between items-start">
          {/* Title & Subtitle */}
          <div 
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
            onClick={() => toggleRowSelection(courseId)} // Click on title area toggles selection
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-gray-900 truncate">{course.title}</p>
              <p className="text-xs text-gray-500 truncate">{course.subTitle || 'No subtitle'}</p>
            </div>
          </div>
          
          {/* Checkbox */}
          <div className="flex-shrink-0 ml-4">
            <input 
              type="checkbox" 
              checked={isSelected} 
              onChange={() => toggleRowSelection(courseId)} 
              onClick={(e) => e.stopPropagation()} 
              className="w-5 h-5 text-[#392b80] border-gray-300 rounded cursor-pointer mt-1 focus:ring-[#392b80]" 
            />
          </div>
        </div>

        {/* Details and Status Row */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t pt-3 mt-3 border-gray-100">
          
          {/* Subject */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Subject</span>
            <span className="text-sm font-medium text-gray-800">{course.subject || 'N/A'}</span>
          </div>
          
          {/* Grade */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Grade</span>
            <span className="text-sm font-medium text-gray-800">Grade {course.gradeLevel || 'N/A'}</span>
          </div>

          {/* Students */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Students</span>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-800">{course.totalStudents || 0}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Rating</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-800">
                {course.averageRating?.toFixed(1) || '0.0'} 
                <span className="text-xs text-gray-500">({course.ratingsCount || 0})</span>
              </span>
            </div>
          </div>
          
        </div>

        {/* Status and Actions Row */}
        <div className="flex justify-between items-center border-t pt-3 mt-3 border-gray-100">
          {/* Status */}
          <div>
            <span className="text-xs font-semibold text-gray-500 block mb-1">Status</span>
            {getStatusBadge(course.status)}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button 
              onClick={(e) => { e.stopPropagation(); onView(course); }} 
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="View course"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(course); }} 
              className="p-2 text-[#FF0055] hover:bg-[#FF0055]/10 rounded-full transition-colors"
              title="Edit course"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => handleDeleteClick(e, course)} 
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Delete course"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Container Card */}
      <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-6">
        
        {/* _________________________ DESKTOP/TABLET VIEW: Standard Table (Visible on md and up)_____________________________ */}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="pl-4 py-3 text-left w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0} 
                    onChange={toggleSelectAll} 
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer text-[#392b80] focus:ring-[#392b80]" 
                  />
                </th>
                <th 
                  className="px-3 py-3 text-left text-md font-bold text-gray-700 w-20 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-1">
                    Course
                    {getSortIcon('title')}
                  </div>
                </th>
                <th 
                  className="py-3 text-left text-md font-bold text-gray-700 w-28 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('subject')}
                >
                  <div className="flex items-center gap-1">
                    Subject
                    {getSortIcon('subject')}
                  </div>
                </th>
                <th 
                  className="py-3 text-left text-md font-bold text-gray-700 w-20 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('gradeLevel')}
                >
                  <div className="flex items-center gap-1">
                    Grade
                    {getSortIcon('gradeLevel')}
                  </div>
                </th>
                <th 
                  className="py-3 text-center text-md font-bold text-gray-700 w-20 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('totalStudents')}
                >
                  <div className="flex items-center justify-center gap-1">
                    Students
                    {getSortIcon('totalStudents')}
                  </div>
                </th>
                <th 
                  className="pl-4 py-3 text-left text-md font-bold text-gray-700 w-28 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('averageRating')}
                >
                  <div className="flex items-center gap-1">
                    Rating
                    {getSortIcon('averageRating')}
                  </div>
                </th>
                <th 
                  className="px-2 py-3 text-left text-md font-bold text-gray-700 w-20 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-2 py-3 text-left text-md font-bold text-gray-700 w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((course) => {
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
                          className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer focus:ring-[#392b80]" 
                        />
                      </td>
                      {/* ___________TITLE / SUBTITLE___________ */}
                      <td className="px-3 py-3 w-24">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{course.title}</p>
                            <p className="text-xs text-gray-500 truncate">
                              {truncateText(course.subTitle , 12)} 
                            </p>
                          </div>
                        </div>
                      </td>
                      {/* ___________SUBJECT___________ */}
                      <td className="px-2 py-3">
                        <span className="text-sm text-gray-700">{truncateText(course.subject , 12)} </span>
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
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
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
        
        {/* Pagination Controls for Desktop */}
        {sortedData.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={sortedData.length}
            showInfo={true}
          />
        )}
      </Card>

      {/* _____________________ MOBILE VIEW: Responsive Cards (Visible only below md)_________________________________ */}
      <div className="md:hidden">
        {paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-4 pt-4 px-1">
            {paginatedData.map(renderCourseCard)}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 text-center text-gray-500">
              No courses found
          </div>
        )}
        
        {/* Pagination Controls for Mobile */}
        {sortedData.length > 0 && (
          <div className="mt-6">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={sortedData.length}
              showInfo={true}
            />
          </div>
        )}
      </div>

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
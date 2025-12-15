"use client";
import { STATUS, getAssignmentStatus } from '@/components/DashboardComponents/student/assignments/utils/assignmentUtils';
import React, { useState, useMemo } from 'react';
import AssignmentCard from '@/components/DashboardComponents/student/assignments/AssignmentCard';
import { SearchBar } from '@/components/DashboardComponents/student/assignments/SearchBar';
import { useGetStudentAssignmentsQuery } from '@/redux/api/endPoints/assignmentsApiSlice';

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ------------------ Fetch student assignments from API ------------------
  const { data: assignments = {}, isLoading, isError } = useGetStudentAssignmentsQuery();

  // ------------------ Merge submissions if needed ------------------
  // Assuming `assignments` from API already contains submission info if available
  const data = useMemo(() => assignments?.data || [], [assignments]);

  // ------------------ Filter Logic ------------------
  const filteredData = useMemo(() => {
    if (!data) return [];

    let tabFiltered = data.filter(item => {
      const { status } = getAssignmentStatus(item, item.submission);

      switch (activeTab) {
        case 'todo': return status === STATUS.TODO;
        case 'completed': return status === STATUS.SUBMITTED || status === STATUS.GRADED || status === STATUS.OVERDUE_SUBMITTED;
        case 'missing': return status === STATUS.LATE || status === STATUS.MISSED;
        default: return true;
      }
    });

    if (!searchTerm) {
      return tabFiltered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return tabFiltered.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerCaseSearchTerm);
      const courseMatch = item.course?.title?.toLowerCase().includes(lowerCaseSearchTerm);
      return titleMatch || courseMatch;
    }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [data, activeTab, searchTerm]);

  // ------------------ Tabs ------------------
  const tabs = [
    { id: 'all', label: 'All Assignments' },
    { id: 'todo', label: 'To Do' },
    { id: 'completed', label: 'Completed' },
    { id: 'missing', label: 'Overdue' },
  ];

  // ------------------ Render ------------------
  if (isLoading) {
    return <p className="text-center py-20">Loading assignments...</p>;
  }

  if (isError) {
    return <p className="text-center py-20 text-red-500">Failed to load assignments.</p>;
  }

  return (
    <div className="py-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
        <p className="text-gray-500 mt-2">Manage your coursework and track your deadlines.</p>
      </div>

      {/* --- FILTER & SEARCH SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Tab Bar */}
        <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-[#FF0055] text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search assignments by title or course..."
        />
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <AssignmentCard
              key={item._id}
              assignment={item}
              submission={item.submission}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400">
              {searchTerm
                ? `No assignments found matching "${searchTerm}" in the selected category.`
                : "No assignments found for this filter."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { Trash2, Pencil, Calendar, Share, Eye, Search, ChevronUp, ChevronDown, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import ViewPopup from "./ViewPopup";
import ConfirmDeletePopUp from "./ConfirmDeletePopup";
import BulkBtn from "../BulkBtn";

const NewsletterTabel = ({ data = [], handleDelete, handleEdit, handleSend }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedItemView, setSelectedItemView] = useState(null);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    const searchLower = searchTerm.toLowerCase();
    return data.filter(item =>
      item.title?.toLowerCase().includes(searchLower) ||
      item.subject?.toLowerCase().includes(searchLower) ||
      item.createdat?.toLowerCase().includes(searchLower) ||
      item.updatedat?.toLowerCase().includes(searchLower)
    );
  }, [data, searchTerm]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data if sortConfig is set
  const sortedData = React.useMemo(() => {
    const dataToSort = filteredData;
    if (!sortConfig.key) return dataToSort;

    return [...dataToSort].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-3 h-3 opacity-30" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3" /> 
      : <ChevronDown className="w-3 h-3" />;
  };

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  // Select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length && filteredData.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item.id));
    }
  };

  // Delete selected rows - Show confirmation
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm({ type: 'bulk' });
  };

  // Open view popup
  const handleViewClick = (item) => {
    setSelectedItemView(item);
    setIsOpenView(true);
  };

  // Open delete confirmation for single item
  const handleDeleteClick = (item) => {
    setIsBulkDelete(false);
    setDeleteConfirm(item);
  };

  // Confirm and execute delete
  const confirmDelete = () => {
    if (isBulkDelete) {
      // Bulk delete
      selectedRows.forEach((id) => handleDelete(id));
      setSelectedRows([]);
    } else if (deleteConfirm) {
      // Single delete
      handleDelete(deleteConfirm.id);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  // Truncate text for display
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-[#392b80c9]/20 to-indigo-500/5 p-4 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
     
            </div>

            {/* Search and Bulk Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="w-full sm:w-auto">
                <BulkBtn
                  selectedCount={selectedRows.length}
                  onDelete={handleBulkDelete}
                  label="newsletter selected"
                />
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search newsletters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border bg-white border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392b80]/20 focus:border-[#392b80] transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="pl-3 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                    />
                  </th>
                  <th 
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center gap-1">
                      Title
                      {getSortIcon('title')}
                    </div>
                  </th>
                  <th 
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('subject')}
                  >
                    <div className="flex items-center gap-1">
                      Subject
                      {getSortIcon('subject')}
                    </div>
                  </th>
                  <th 
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('createdat')}
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      Created At
                      {getSortIcon('createdat')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('updatedat')}
                  >
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      Updated At
                      {getSortIcon('updatedat')}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.length > 0 ? (
                  sortedData.map((item) => (
                    <tr
                      key={item.id}
                      className={`transition-colors cursor-pointer ${
                        selectedRows.includes(item.id)
                          ? "bg-[#392b80]/10"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => toggleRowSelection(item.id)}
                    >
                      <td className="pl-3 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                          className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-2 py-3">
                        <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                          {item.title}
                        </p>
                      </td>
                      <td className="px-2 py-3">
                        <p className="text-sm text-gray-600">
                          {truncateText(item.subject , 15)} 
                        </p>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2 text-xs whitespace-nowrap text-gray-600">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          {item.createdat}
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2 text-xs whitespace-nowrap text-gray-600">
                          <Calendar className="w-4 h-4 flex-shrink-0 " />
                          {item.updatedat}
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-1">
                          {/* Send Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSend(item);
                            }}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors group"
                            title="Send Newsletter"
                          >
                            <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>

                          {/* View Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewClick(item);
                            }}
                            className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors group"
                            title="View Newsletter"
                          >
                            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                            title="Edit Newsletter"
                          >
                            <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(item);
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Delete Newsletter"
                          >
                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 mb-3 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <p>No newsletters found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden">
          {/* Select All Checkbox for Mobile */}
          {sortedData.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
              <input
                type="checkbox"
                checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">Select All Newsletters</span>
            </div>
          )}

          {sortedData.length > 0 ? (
            <div className="space-y-3 p-3 grid sm:grid-cols-2  gap-3">
              {sortedData.map((item) => (
                <Card
                  key={item.id}
                  className={`p-4 border rounded-xl transition-all h-[270px] ${
                    selectedRows.includes(item.id)
                      ? "bg-[#392b80]/10 border-[#392b80]"
                      : "bg-white border-gray-200"
                  }`}
                  onClick={() => toggleRowSelection(item.id)}
                >
                  <div className="space-y-4">
                    {/* Header with checkbox and title */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-bold text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {item.subject}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Newsletter Details */}
                    <div className="space-y-2 pl-10">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">Created:</span>
                        <span>{item.createdat}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">Updated:</span>
                        <span>{item.updatedat}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 items-center pt-3 border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSend(item);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Send</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClick(item);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(item);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto mb-3 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500">No newsletters found</p>
            </div>
          )}
        </div>
      </Card>

      {/* View Popup */}
      <ViewPopup
        item={selectedItemView}
        isOpen={isOpenView}
        onClose={() => setIsOpenView(false)}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onSend={handleSend}
      />

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

export default NewsletterTabel;
"use client";
import React, { useState } from "react";
import { Trash2, Pencil, Calendar, Share, EyeIcon, Eye } from "lucide-react";
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
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };

  // Delete selected rows - Show confirmation
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm(true);
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
        <div className="bg-gradient-to-r from-[#392b80c9]/20 to-indigo-500/5 p-6 border-b border-gray-100">
          <div className="flex items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Our Newsletter
                <span className="text-lg">📊</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Track your sent newsletters
              </p>
            </div>

            {/* Bulk Delete Button */}
            {/* {selectedRows.length > 0 && (
              <div className="flex items-center gap-3 animate-in slide-in-from-right duration-300">
                <span className="text-sm font-medium text-gray-700">
                  {selectedRows.length} selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-4 py-2.5 cursor-pointer text-white rounded-xl font-semibold bg-red-500 hover:bg-red-600 transition-all hover:shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )} */}
            <BulkBtn
              selectedCount={selectedRows.length}
              onDelete={handleBulkDelete}
              label="newsletter selected"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Updated At
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition-colors cursor-pointer ${
                      selectedRows.includes(item.id)
                        ? "bg-[#392b80]/10"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleRowSelection(item.id)}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleRowSelection(item.id)}
                        className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">
                        {truncateText(item.title, 12)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">
                        {truncateText(item.subject, 10)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {item.createdat}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {item.updatedat}
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-1">
                        {/* Send Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSend(item);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group"
                          title="Send Newsletter"
                        >
                          <Share className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* View Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewClick(item);
                          }}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors group"
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
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
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
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
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
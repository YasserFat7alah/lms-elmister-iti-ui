"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import BulkBtn from "../BulkBtn";
import { Eye, Trash2, Users, ChevronUp, ChevronDown } from "lucide-react";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";

import StatusDropdownSub from "./StatusDropdownSub";


const SubscriptionsTable = ({
  data,
  selectedRows,
  setSelectedRows,
  isBulkDelete,
  setIsBulkDelete,
  deleteConfirm,
  setDeleteConfirm,
  onView,
  onDelete,
  onStatusChange
}) => {
  //_____________Data__________
  // Static data removed in favor of `data` prop


  // deleteConfirm, isBulkDelete are now props or managed via parent if shared
  // If managing locally only for table interactions not shared:
  // But wait, SubscriptionsTabs passes these down. Checking SubscriptionsTabs...
  // SubscriptionsTabs passes: data, selectedRows, setSelectedRows, isBulkDelete, setIsBulkDelete, deleteConfirm, setDeleteConfirm, onView, onDelete, onStatusChange.
  // So we should use these props.

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!data) return [];
    if (!searchTerm) return data;

    const searchLower = searchTerm.toLowerCase();
    return data.filter(item =>
      item.id.toLowerCase().includes(searchLower) ||
      item.studentName.toLowerCase().includes(searchLower) ||
      item.courseGroup.toLowerCase().includes(searchLower) ||
      item.teacher.toLowerCase().includes(searchLower) ||
      item.parent.toLowerCase().includes(searchLower) ||
      item.invoice.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower)
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
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
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
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Select all rows - use filteredData
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length && filteredData.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item.id));
    }
  };

  // Open view popup
  const handleViewClick = (e, subscription) => {
    e.stopPropagation();
    onView(subscription); // Use prop
  };



  // Delete function (Single)
  const handleDeleteClick = (e, subscription) => {
    e.stopPropagation();
    setIsBulkDelete(false);
    setDeleteConfirm(subscription);
  };

  // Delete selected rows - Show confirmation
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm({ type: 'bulk' }); // Using object to signal bulk, or true if parent expects boolean
    // Parent SubscriptionsTabs expects `true` or object? 
    // SubscriptionsTabs: setDeleteConfirm(true) for bulk.
    // SubscriptionsTable: setDeleteConfirm({ type: 'bulk' }) locally? 
    // The previous code in SubscriptionsTabs used `setDeleteConfirm(true)`. 
    // Let's use `setDeleteConfirm(true)` for bulk to match parent, or careful.
    // Actually, `deleteConfirm` prop is passed. 
    // Let's rely on parent's `setDeleteConfirm` if it handles logic, but here we are calling `setDeleteConfirm` prop.
    // If we look at SubscriptionsTabs: `const [deleteConfirm, setDeleteConfirm] = useState(null);`
    // It seems `deleteConfirm` is the item or true.
    setDeleteConfirm({ type: 'bulk' });
  };

  // Confirm and execute delete -> Handled by generic popup which calls onConfirm
  const confirmDelete = () => {
    // This function was local. Now the popup is outside or inside?
    // In the new code, `ConfirmDeletePopUp` is rendered inside `SubscriptionsTable`.
    // But props `onDelete` are passed.
    if (isBulkDelete) {
      onDelete(selectedRows);
    } else if (deleteConfirm) {
      onDelete(deleteConfirm.id || deleteConfirm);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  return (
    <div className="w-full">


      <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-4">

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              {/* HEAD */}
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="pl-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer focus:ring-[#392b80]"
                    />
                  </th>

                  <th
                    className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center gap-1">
                      ID
                      {getSortIcon('id')}
                    </div>
                  </th>

                  <th
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('studentName')}
                  >
                    <div className="flex items-center gap-1">
                      Student
                      {getSortIcon('studentName')}
                    </div>
                  </th>

                  <th
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('courseGroup')}
                  >
                    <div className="flex items-center gap-1">
                      Course
                      {getSortIcon('courseGroup')}
                    </div>
                  </th>

                  <th
                    className="px-2 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('teacher')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Teacher
                      {getSortIcon('teacher')}
                    </div>
                  </th>

                  <th
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('parent')}
                  >
                    <div className="flex items-center gap-1">
                      Parent
                      {getSortIcon('parent')}
                    </div>
                  </th>

                  <th
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('paidAt')}
                  >
                    <div className="flex items-center gap-1">
                      Paid At
                      {getSortIcon('paidAt')}
                    </div>
                  </th>

                  <th
                    className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('endAt')}
                  >
                    <div className="flex items-center gap-1">
                      Ends At
                      {getSortIcon('endAt')}
                    </div>
                  </th>

                  <th className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Invoice
                  </th>

                  <th className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-gray-100 text-sm">
                {sortedData.length > 0 ? (
                  sortedData.map((item) => (
                    <tr
                      key={item.id}
                      className={`transition-colors cursor-pointer ${selectedRows.includes(item.id)
                        ? "bg-[#392b80]/5 border-l-2 border-[#392b80]"
                        : "hover:bg-gray-50 border-l-2 border-transparent"
                        }`}
                      onClick={() => toggleRowSelection(item.id)}
                    >
                      <td className="pl-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer focus:ring-[#392b80]"
                        />
                      </td>

                      <td className="px-1.5 py-3 text-sm text-gray-600 whitespace-nowrap font-medium">
                        {item.id}
                      </td>

                      <td className="px-1 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {item.studentName}
                      </td>

                      <td className="px-1 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {item.courseGroup}
                      </td>

                      <td className="px-1 py-3 text-sm text-gray-600 whitespace-nowrap text-center">
                        {item.teacher}
                      </td>

                      <td className="px-1 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {item.parent}
                      </td>

                      <td className="px-1 py-3 text-gray-600 text-xs whitespace-nowrap">
                        {item.paidAt}
                      </td>

                      <td className="px-0.5 py-3 text-gray-600 text-xs whitespace-nowrap">
                        {item.endAt}
                      </td>

                      <td className="px-1 py-3">
                        <button
                          onClick={(e) => handleViewClick(e, item)}
                          className="font-semibold text-[#392b80] hover:text-[#392b80]/80 hover:underline transition text-sm"
                        >
                          {item.invoice}
                        </button>
                      </td>

                      <td className="pl-2 py-3  ">
                        <div className="flex justify-around">
                          <StatusDropdownSub
                            currentStatus={item.status}
                            subscriptionId={item.id}
                            onStatusChange={onStatusChange}
                          />

                          <div className="flex ">
                            <button
                              onClick={(e) => handleViewClick(e, item)}
                              className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={(e) => handleDeleteClick(e, item)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition text-end"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Users className="w-12 h-12 mb-3 text-gray-300" />
                        <p>No Subscriptions Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden ">
          {/* Select All Checkbox for Mobile */}
          {sortedData.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
              <input
                type="checkbox"
                checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">Select All Subscriptions</span>
            </div>
          )}

          {sortedData.length > 0 ? (
            <div className="space-y-3 p-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sortedData.map((item) => (
                <Card
                  key={item.id}
                  className={`p-4 border rounded-xl transition-all ${selectedRows.includes(item.id)
                    ? "bg-[#392b80]/5 border-[#392b80] shadow-md"
                    : "bg-white border-gray-200 hover:shadow-sm"
                    }`}
                  onClick={() => toggleRowSelection(item.id)}
                >
                  <div className="space-y-4">
                    {/* Header with checkbox and ID */}
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
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">ID:</span>
                            <span className="text-sm font-bold text-[#392b80]">{item.id}</span>
                          </div>
                          <p className="text-base font-bold text-gray-900 truncate mt-1">
                            {item.studentName}
                          </p>
                        </div>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex-shrink-0">
                        <StatusDropdownSub
                          currentStatus={item.status}
                          subscriptionId={item.id}
                          onStatusChange={onStatusChange}
                          size="sm"
                        />
                      </div>
                    </div>

                    {/* Subscription Details */}
                    <div className="space-y-2 pl-10">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium min-w-16">Course:</span>
                        <span className="truncate">{item.courseGroup}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium min-w-16">Teacher:</span>
                        <span>{item.teacher}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium min-w-16">Parent:</span>
                        <span>{item.parent}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Paid:</span>
                          <span className="text-gray-600">{item.paidAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Ends:</span>
                          <span className="text-gray-600">{item.endAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium min-w-16">Invoice:</span>
                        <button
                          onClick={(e) => handleViewClick(e, item)}
                          className="font-semibold text-[#392b80] hover:text-[#392b80]/80 hover:underline transition"
                        >
                          {item.invoice}
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-200 ">
                      <button
                        onClick={(e) => handleViewClick(e, item)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors font-medium text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(e, item)}
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
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No Subscriptions Found</p>
            </div>
          )}
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
    </div >
  );
};

export default SubscriptionsTable;
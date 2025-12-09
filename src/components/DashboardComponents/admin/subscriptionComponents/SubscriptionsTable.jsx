"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import BulkBtn from "../BulkBtn";
import { Eye, Trash2, Users, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";
import RecietPopup from "./RecietPopup";
import StatusDropdownSub from "./StatusDropdownSub";
import StatsCard from "../payouts/StatsCard";

const SubscriptionsTable = () => {
  //_____________Data__________
  const [data, setData] = useState(
    [
    {
      id: "SUB-001",
      studentName: "Ahmed Mohamed",
      courseGroup: "Math Level 2 - Group A",
      teacher: "Mr. John Doe",
      parent: "Mohamed Ali",
      status: "active",
      paidAt: "2025-01-01",
      endAt: "2025-03-01",
      invoice: "INV-1001",
    },
    {
      id: "SUB-002",
      studentName: "Sara Ahmed",
      courseGroup: "English - Group B",
      teacher: "Ms. Emma Brown",
      parent: "Ahmed Hassan",
      status: "pending",
      paidAt: "2025-01-10",
      endAt: "2025-03-10",
      invoice: "INV-1002",
    },
    {
      id: "SUB-003",
      studentName: "Omar Youssef",
      courseGroup: "Science Level 1 - Group C",
      teacher: "Dr. Sarah Miller",
      parent: "Youssef Ibrahim",
      status: "expired",
      paidAt: "2024-11-15",
      endAt: "2025-01-15",
      invoice: "INV-1003",
    },
    {
      id: "SUB-004",
      studentName: "Mariam Adel",
      courseGroup: "Arabic Grammar - Group D",
      teacher: "Mr. Adam Clark",
      parent: "Adel Fathy",
      status: "active",
      paidAt: "2025-01-20",
      endAt: "2025-04-20",
      invoice: "INV-1004",
    },
    {
      id: "SUB-005",
      studentName: "Yasmin Samir",
      courseGroup: "History - Group B",
      teacher: "Ms. Rebecca Wilson",
      parent: "Samir Mahmoud",
      status: "pending",
      paidAt: "2025-02-01",
      endAt: "2025-05-01",
      invoice: "INV-1005",
    },
  ]
);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenReceipt, setIsOpenReceipt] = useState(false);
  const [selectedItemView, setSelectedItemView] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Calculate statistics
  const stats = {
    total: data.length,
    active: data.filter((item) => item.status === "active").length,
    pending: data.filter((item) => item.status === "pending").length,
    expired: data.filter((item) => item.status === "expired").length,
  };

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
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

  // Open view popup
  const handleViewClick = (e, subscription) => {
    e.stopPropagation();
    setSelectedItemView(subscription);
    setIsOpenReceipt(true);
  };

  // Change status
  const handleStatusChange = (id, newStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    // Update selectedItemView if it's the same item
    if (selectedItemView?.id === id) {
      setSelectedItemView((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Delete function
  const handleDelete = (id) => {
    setData((prev) => prev.filter((subscription) => subscription.id !== id));
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  // Delete selected rows - Show confirmation
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm(true);
  };

  // Open delete confirmation for single item
  const handleDeleteClick = (e, subscription) => {
    e.stopPropagation();
    setIsBulkDelete(false);
    setDeleteConfirm(subscription);
  };

  // Confirm and execute delete
  const confirmDelete = () => {
    if (isBulkDelete) {
      selectedRows.forEach((id) => handleDelete(id));
      setSelectedRows([]);
    } else if (deleteConfirm) {
      handleDelete(deleteConfirm.id);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
    setIsOpenReceipt(false);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            icon={Users}
            title="Total Subscriptions"
            value={stats.total}
            color="bg-gray-600"
          />
          <StatsCard
            icon={CheckCircle}
            title="Active"
            value={stats.active}
            color="bg-green-500"
          />
          <StatsCard
            icon={Clock}
            title="Pending"
            value={stats.pending}
            color="bg-amber-500"
          />
          <StatsCard
            icon={XCircle}
            title="Expired"
            value={stats.expired}
            color="bg-red-500"
          />
        </div>

        <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-4">
  
          {/* Table Header */}
          <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 px-4 py-2 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
            <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                Subscription Management <span className="text-base">📋</span>
              </h2>
            </div>
            {/* SEARCH */}
            <div className="flex items-center gap-2 flex-wrap">
              <BulkBtn
                selectedCount={selectedRows.length}
                onDelete={handleBulkDelete}
                label="subscription(s)"
              />

              {/* Search */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff3c]/20 focus:border-[#00ff3c] transition-all text-sm"
                />
              </div>
            </div>
          </div>
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">

              {/* HEAD */}
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="pl-2 py-2 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === data.length && data.length > 0}
                      onChange={toggleSelectAll}
                      className={`text-[#392b80] w-4 h-4 border-gray-300 rounded cursor-pointer`}
                    />
                  </th>

                  <th className="px-3 py-2 text-left text-sm font-bold text-gray-700 whitespace-nowrap">ID</th>
                  <th className="px-2 py-2 text-left text-sm font-bold text-gray-700 whitespace-nowrap">Student</th>
                  <th className="px-2 py-2 text-left text-sm font-bold text-gray-700 whitespace-nowrap">Course</th>
                  <th className="px-2 py-2 text-center text-sm font-bold text-gray-700 whitespace-nowrap">Teacher</th>
                  <th className="px-2 py-2 text-left text-sm font-bold text-gray-700 whitespace-nowrap">Parent</th>
                  <th className="px-2 py-2 text-left text-sm font-bold text-gray-700 whitespace-nowrap">Paid At</th>
                  <th className="px-2 py-2 text-left text-sm font-bold text-gray-700 whitespace-nowrap">Ends At</th>
                  <th className="px-2 py-2 text-left text-sm font-bold text-gray-700 whitespace-nowrap">Invoice</th>
                  <th className="px-2 py-2 w-16"></th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-gray-100 text-sm">
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
                      <td className="pl-2 py-2 w-10">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer"
                        />
                      </td>

                      <td className="pl-3 px-2 py-2 text-sm text-gray-600 whitespace-nowrap">{item.id}</td>
                      <td className="px-1 py-2 text-sm text-gray-600 whitespace-nowrap">{item.studentName}</td>
                      <td className="px-1 py-2 text-sm text-gray-600 whitespace-nowrap">{item.courseGroup}</td>
                      <td className="px-1 py-2 text-sm text-gray-600 whitespace-nowrap ">{item.teacher}</td>
                      <td className="px-2 py-2 text-sm text-gray-600 whitespace-nowrap">{item.parent}</td>

                      <td className="px-2 py-2 text-gray-600 text-xs whitespace-nowrap ">{item.paidAt}</td>
                      <td className=" py-2 text-gray-600 text-xs whitespace-nowrap">{item.endAt}</td>

                      <td className="px-2 py-2">
                        <button
                          onClick={(e) => handleViewClick(e, item)}
                          className="font-semibold text-[#392b80] hover:text-[#392b80]/80 hover:underline transition"
                        >
                          {item.invoice}
                        </button>
                      </td>

                      <td className="px-2 py-2">
                        <div className="flex items-center gap-1">
                          <StatusDropdownSub
                            currentStatus={item.status}
                            subscriptionId={item.id}
                            onStatusChange={handleStatusChange}
                          />

                          <button
                            onClick={(e) => handleViewClick(e, item)}
                            className="p-1 text-yellow-600 hover:bg-yellow-50 rounded transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => handleDeleteClick(e, item)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Users className="w-10 h-10 mb-2 text-gray-300" />
                        <p>No Subscriptions Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Receipt View Popup */}
      <RecietPopup
        subscription={selectedItemView}
        isOpen={isOpenReceipt}
        onClose={() => setIsOpenReceipt(false)}
        onStatusChange={handleStatusChange}
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
    </div>
  );
};

export default SubscriptionsTable;
"use client";
import React, { useState, useEffect } from "react";
import { mockPayouts } from "@/data/mockPayouts";
import { AlertCircle, Clock, CheckCircle, XCircle, DollarSign, Search, ChevronUp, ChevronDown, Eye, Trash2, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import StatsCard from "./StatsCard";
import ViewDetailsModal from "./ViewDetailsModal ";
import ActionModal from "./ActionModal ";
import BulkBtn from "../BulkBtn";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";

const PayoutsPage = () => {
  const [payouts, setPayouts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    action: null,
    payout: null,
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    setPayouts(mockPayouts);
  }, []);

  // Filter data based on search term
  const filteredPayouts = React.useMemo(() => {
    return payouts.filter((p) => {
      const matchesSearch = 
        p.teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        p.teacher._id.toLowerCase().includes(search.toLowerCase()) ||
        p.teacher.email.toLowerCase().includes(search.toLowerCase()) ||
        p.amount.toString().includes(search);
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payouts, search, statusFilter]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data if sortConfig is set
  const sortedData = React.useMemo(() => {
    const dataToSort = filteredPayouts;
    if (!sortConfig.key) return dataToSort;

    return [...dataToSort].sort((a, b) => {
      // Handle nested properties
      let aValue, bValue;
      
      if (sortConfig.key === 'teacher') {
        aValue = a.teacher.name;
        bValue = b.teacher.name;
      } else if (sortConfig.key === 'requestedBy') {
        aValue = a.requestedBy?.name || '';
        bValue = b.requestedBy?.name || '';
      } else if (sortConfig.key === 'approvedBy') {
        aValue = a.approvedBy?.name || '';
        bValue = b.approvedBy?.name || '';
      } else if (sortConfig.key === 'createdAt') {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
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
  }, [filteredPayouts, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-3 h-3 opacity-30" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3" /> 
      : <ChevronDown className="w-3 h-3" />;
  };

  const stats = {
    total: payouts.length,
    pending: payouts.filter((p) => p.status === "pending").length,
    approved: payouts.filter((p) => p.status === "approved").length,
    paid: payouts.filter((p) => p.status === "paid").length,
    rejected: payouts.filter((p) => p.status === "rejected").length,
    totalAmount: payouts.reduce((acc, p) => acc + p.amount, 0),
  };

  // Selection Logic
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredPayouts.length && filteredPayouts.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPayouts.map((item) => item._id));
    }
  };

  const handleView = (payout) => {
    setSelectedPayout(payout);
  };

  const handleApprove = (payout) => {
    setActionModal({ isOpen: true, action: "approve", payout });
  };

  const handleReject = (payout) => {
    setActionModal({ isOpen: true, action: "reject", payout });
  };

  const confirmAction = (note) => {
    const { action, payout } = actionModal;

    if (action === "approve") {
      setPayouts(
        payouts.map((p) =>
          p._id === payout._id
            ? {
                ...p,
                status: "approved",
                approvedBy: { _id: "admin_current", name: "Current Admin" },
                adminNote: note || "Approved and scheduled for processing.",
              }
            : p
        )
      );
    } else if (action === "reject") {
      setPayouts(
        payouts.map((p) =>
          p._id === payout._id
            ? {
                ...p,
                status: "rejected",
                rejectedAt: new Date().toISOString(),
                adminNote: note,
              }
            : p
        )
      );
    }
  };

  // Delete Logic
  const handleDelete = (id) => {
    setPayouts((prev) => prev.filter((payout) => payout._id !== id));
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm({ type: 'bulk' });
  };

  const handleDeleteClick = (payout) => {
    setIsBulkDelete(false);
    setDeleteConfirm(payout);
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      selectedRows.forEach((id) => handleDelete(id));
      setSelectedRows([]);
    } else if (deleteConfirm) {
      handleDelete(deleteConfirm._id);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
    setSelectedPayout(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <StatsCard
            icon={AlertCircle}
            title="Total Requests"
            value={stats.total}
            color="bg-gray-600"
          />
          <StatsCard
            icon={Clock}
            title="Pending"
            value={stats.pending}
            color="bg-amber-500"
          />
          <StatsCard
            icon={CheckCircle}
            title="Approved"
            value={stats.approved}
            color="bg-blue-500"
          />
          <StatsCard
            icon={CheckCircle}
            title="Paid"
            value={stats.paid}
            color="bg-green-500"
          />
          <StatsCard
            icon={XCircle}
            title="Rejected"
            value={stats.rejected}
            color="bg-red-500"
          />
          <StatsCard
            icon={DollarSign}
            title="Total Amount"
            value={`$${stats.totalAmount.toLocaleString()}`}
            color="bg-emerald-600"
          />
        </div>

        {/* Table */}
        <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
          {/* Table Header with Search, Filters and Bulk Actions */}
          <div className="bg-gradient-to-r from-[#392b80c9]/20 to-indigo-500/5 p-4 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 w-full">
              {/* Left side: Search and Status Filter */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:flex-1 lg:justify-end">
                {/* Right side: Bulk Button */}
              <div className="flex-shrink-0 lg:ml-4">
                <BulkBtn
                  selectedCount={selectedRows.length}
                  onDelete={handleBulkDelete}
                />
              </div>
                {/* Search */}
                <div className="relative lg:w-64 xl:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payouts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border bg-white border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392b80]/20 focus:border-[#392b80] transition-all text-sm"
                  />
                </div>

                {/* Status Filter Dropdown */}
                <div className="w-full lg:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border bg-white border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392b80]/20 focus:border-[#392b80] transition-all text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="paid">Paid</option>
                    <option value="rejected">Rejected</option>
                  </select>
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
                    <th className="pl-4 py-3 text-left w-10">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === filteredPayouts.length && filteredPayouts.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                      />
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('teacher')}
                    >
                      <div className="flex items-center gap-1">
                        Teacher
                        {getSortIcon('teacher')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center gap-1">
                        Amount
                        {getSortIcon('amount')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {getSortIcon('status')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left whitespace-nowrap text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('requestedBy')}
                    >
                      <div className="flex items-center gap-1">
                        Requested By
                        {getSortIcon('requestedBy')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left whitespace-nowrap text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('approvedBy')}
                    >
                      <div className="flex items-center gap-1">
                        Approved By
                        {getSortIcon('approvedBy')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left whitespace-nowrap text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        Created At
                        {getSortIcon('createdAt')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedData.length > 0 ? (
                    sortedData.map((payout) => (
                      <tr
                        key={payout._id}
                        className={`transition-colors cursor-pointer ${
                          selectedRows.includes(payout._id)
                            ? "bg-[#392b80]/10"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => toggleRowSelection(payout._id)}
                      >
                        <td className="pl-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(payout._id)}
                            onChange={() => toggleRowSelection(payout._id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{payout.teacher.name}</p>
                            <p className="text-xs text-gray-500">{payout.teacher.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-emerald-600">${payout.amount}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            payout.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            payout.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                            payout.status === 'paid' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">{payout.requestedBy?.name || 'N/A'}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">{payout.approvedBy?.name || 'Pending'}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">{new Date(payout.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleView(payout);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {payout.status === 'pending' && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApprove(payout);
                                  }}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReject(payout);
                                  }}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(payout);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <DollarSign className="w-12 h-12 mb-3 text-gray-300" />
                          <p>No payouts found matching your criteria</p>
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
                <span className="text-sm font-medium text-gray-700">Select All Payouts</span>
              </div>
            )}

            {sortedData.length > 0 ? (
              <div className="space-y-3 p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sortedData.map((payout) => (
                  <div
                    key={payout._id}
                    className={`p-4 border rounded-xl transition-all ${
                      selectedRows.includes(payout._id)
                        ? "bg-[#392b80]/10 border-[#392b80]"
                        : "bg-white border-gray-200"
                    }`}
                    onClick={() => toggleRowSelection(payout._id)}
                  >
                    <div className="space-y-4">
                      {/* Header with checkbox and teacher info */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(payout._id)}
                            onChange={() => toggleRowSelection(payout._id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-gray-900 truncate">
                              {payout.teacher.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {payout.teacher.email}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          payout.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          payout.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                          payout.status === 'paid' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                      </div>

                      {/* Payout Details */}
                      <div className="space-y-2 pl-10">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium min-w-16">Amount:</span>
                          <span className="font-bold text-emerald-600">${payout.amount}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium min-w-16">Requested:</span>
                          <span className="truncate">{payout.requestedBy?.name || 'N/A'}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium min-w-16">Approved:</span>
                          <span className="truncate">{payout.approvedBy?.name || 'Pending'}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium min-w-16">Created:</span>
                          <span>{new Date(payout.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Action Buttons - Colored divs with icons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        {/* View Button */}
                        <div 
                          className="flex-1 flex items-center justify-center p-2.5 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(payout);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </div>

                        {/* Conditional Approve/Reject Buttons */}
                        {payout.status === 'pending' && (
                          <>
                            <div 
                              className="flex-1 flex items-center justify-center p-2.5 bg-green-50 text-green-600 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(payout);
                              }}
                            >
                              <Check className="w-4 h-4" />
                            </div>
                            <div 
                              className="flex-1 flex items-center justify-center p-2.5 bg-red-50 text-red-600 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(payout);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </div>
                          </>
                        )}

                        {/* Delete Button */}
                        <div 
                          className="flex-1 flex items-center justify-center p-2.5 bg-red-50 text-red-600 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(payout);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white">
                <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No payouts found matching your criteria</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* View Details Modal */}
      {selectedPayout && (
        <ViewDetailsModal
          payout={selectedPayout}
          onClose={() => setSelectedPayout(null)}
        />
      )}

      {/* Action Modal (Approve/Reject) */}
      <ActionModal
        isOpen={actionModal.isOpen}
        onClose={() =>
          setActionModal({ isOpen: false, action: null, payout: null })
        }
        action={actionModal.action}
        onConfirm={confirmAction}
      />

      {/* Confirm Delete Popup */}
      <ConfirmDeletePopUp
        isOpen={!!deleteConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isBulk={isBulkDelete}
        selectedCount={selectedRows.length}
      />
    </div>
  );
};

export default PayoutsPage;
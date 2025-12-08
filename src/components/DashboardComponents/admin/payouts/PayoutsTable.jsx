"use client";
import React, { useState, useEffect } from "react";
import { mockPayouts } from "@/data/mockPayouts";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import StatsCard from "./StatsCard";
import PayoutFilters from "./PayoutFilters ";
import PayoutRow from "./PayoutRow";
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

  useEffect(() => {
    setPayouts(mockPayouts);
  }, []);

  const filteredPayouts = payouts.filter((p) => {
    const matchesSearch = p.teacher.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    if (selectedRows.length === filteredPayouts.length) {
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
    setDeleteConfirm(true);
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
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mb-6">
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

        {/* Filters */}
        <PayoutFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Table */}
        <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-[#392b80c9]/20 to-indigo-500/5 p-4 border-b border-gray-100">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  Payouts Overview
                  <span className="text-lg">💰</span>
                </h2>
                {/* <p className="text-sm text-gray-600 mt-1">
                  Track and manage teacher payouts
                </p> */}
              </div>

              {/* Bulk Delete Button */}
              <BulkBtn
                selectedCount={selectedRows.length}
                onDelete={handleBulkDelete}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === filteredPayouts.length &&
                        filteredPayouts.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left whitespace-nowrap text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Requested By
                  </th>
                  <th className="px-6 py-4 text-left whitespace-nowrap text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Approved By
                  </th>
                  <th className="px-6 py-4 text-left whitespace-nowrap text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPayouts.length > 0 ? (
                  filteredPayouts.map((payout) => (
                    <PayoutRow
                      key={payout._id}
                      payout={payout}
                      onView={handleView}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onDelete={handleDeleteClick}
                      isSelected={selectedRows.includes(payout._id)}
                      onToggleSelect={() => toggleRowSelection(payout._id)}
                    />
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

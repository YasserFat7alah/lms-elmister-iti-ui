"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import BulkBtn from "../BulkBtn";
import { Eye, DollarSign, FileText, Clock, CheckCircle } from "lucide-react";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";
import StatsCard from "../payouts/StatsCard";

const InvoiceTable = () => {
  const [data, setData] = useState([
    {
      id: "6934bbbf5759ae71eef56530",
      stripeInvoiceId: "in_1SbUsIAdUZIYKVvaZGuBlf8P",
      stripeSubscriptionId: "sub_1SbUsJAdUZIYKVvaYwm9uzRc",
      amountPaid: 150,
      amountDue: 150,
      currency: "USD",
      platformFee: 15,
      teacherShare: 135,
      status: "paid",
      paidAt: "2025-12-06T23:26:50Z",
      periodStart: "2025-12-06T23:26:50Z",
      periodEnd: "2026-01-05T23:26:50Z",
      invoiceUrl:
        "https://dashboard.stripe.com/invoices/in_1SbUsIAdUZIYKVvaZGuBlf8P",
    },
    {
      id: "6934bbbf5759ae71eef56531",
      stripeInvoiceId: "in_1SbUtJAdUZIYKVvaP1aXyqLs",
      stripeSubscriptionId: "sub_1SbUtJAdUZIYKVvaQwM1abcD",
      amountPaid: 200,
      amountDue: 200,
      currency: "USD",
      platformFee: 20,
      teacherShare: 180,
      status: "paid",
      paidAt: "2025-12-07T15:12:30Z",
      periodStart: "2025-12-07T00:00:00Z",
      periodEnd: "2026-01-06T00:00:00Z",
      invoiceUrl:
        "https://dashboard.stripe.com/invoices/in_1SbUtJAdUZIYKVvaP1aXyqLs",
    },
    {
      id: "6934bbbf5759ae71eef56532",
      stripeInvoiceId: "in_1SbUuKAdUZIYKVvaXcL9rRt",
      stripeSubscriptionId: "sub_1SbUuKAdUZIYKVvaR1wJkl9",
      amountPaid: 120,
      amountDue: 150,
      currency: "USD",
      platformFee: 12,
      teacherShare: 108,
      status: "pending",
      paidAt: "2025-12-08T10:45:00Z",
      periodStart: "2025-12-08T00:00:00Z",
      periodEnd: "2026-01-07T00:00:00Z",
      invoiceUrl:
        "https://dashboard.stripe.com/invoices/in_1SbUuKAdUZIYKVvaXcL9rRt",
    },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Calculate statistics
  const stats = {
    total: data.length,
    paid: data.filter((item) => item.status === "paid").length,
    pending: data.filter((item) => item.status === "pending").length,
    totalAmountPaid: data.reduce((acc, item) => acc + item.amountPaid, 0),
    totalAmountDue: data.reduce((acc, item) => acc + item.amountDue, 0),
    totalPlatformFee: data.reduce((acc, item) => acc + item.platformFee, 0),
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <StatsCard
            icon={FileText}
            title="Total Invoices"
            value={stats.total}
            color="bg-gray-600"
          />
          <StatsCard
            icon={CheckCircle}
            title="Paid"
            value={stats.paid}
            color="bg-green-500"
          />
          <StatsCard
            icon={Clock}
            title="Pending"
            value={stats.pending}
            color="bg-amber-500"
          />
          <StatsCard
            icon={DollarSign}
            title="Total Paid"
            value={`$${stats.totalAmountPaid.toLocaleString()}`}
            color="bg-emerald-600"
          />
          <StatsCard
            icon={DollarSign}
            title="Total Due"
            value={`$${stats.totalAmountDue.toLocaleString()}`}
            color="bg-blue-500"
          />
          <StatsCard
            icon={DollarSign}
            title="Platform Fees"
            value={`$${stats.totalPlatformFee.toLocaleString()}`}
            color="bg-purple-500"
          />
        </div>

        <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-[#392b80c9]/20 to-indigo-500/5 p-4 border-b border-gray-100">
            <div className="flex items-center justify-between flex-col md:flex-row gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  Invoices Overview
                  <span className="text-lg">📄</span>
                </h2>
              </div>

              {/* Bulk Delete Button */}
              <BulkBtn
                selectedCount={selectedRows.length}
                onDelete={handleBulkDelete}
                label="Invoice(s)"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              {/* HEAD TABLE */}
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === data.length && data.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    InvoiceId
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SubscriptionId
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount Paid
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount Due
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paid At
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Period Start
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Period End
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
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
                      {/* Checkbox */}
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer"
                        />
                      </td>

                      {/* stripeInvoiceId */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-[#392b80]">
                          {item.stripeInvoiceId}
                        </span>
                      </td>

                      {/* stripeSubscriptionId */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-700">
                          {item.stripeSubscriptionId}
                        </span>
                      </td>

                      {/* amountPaid */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-700">
                          <span className="text-green-600">
                            ${item.amountPaid}
                          </span>{" "}
                          <span className="text-gray-400 text-xs">
                            {item.currency}
                          </span>
                        </p>
                      </td>

                      {/* amountDue */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-700">
                          <span className="text-blue-600">
                            ${item.amountDue}
                          </span>{" "}
                          <span className="text-gray-400 text-xs">
                            {item.currency}
                          </span>
                        </p>
                      </td>

                      {/* Paid At */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {new Date(item.paidAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* periodStart */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {new Date(item.periodStart).toLocaleDateString()}
                        </span>
                      </td>

                      {/* periodEnd */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {new Date(item.periodEnd).toLocaleDateString()}
                        </span>
                      </td>

                      {/* invoiceUrl */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={item.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center"
                        >
                          <Eye className="w-8 h-8 p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FileText className="w-12 h-12 mb-3 text-gray-300" />
                        <p>No Invoices Found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
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
    </div>
  );
};

export default InvoiceTable;
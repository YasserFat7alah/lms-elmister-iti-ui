"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import BulkBtn from "../BulkBtn";
import { Eye, DollarSign, FileText, Clock, CheckCircle, Search, ChevronUp, ChevronDown } from "lucide-react";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";
import InvoiceState from "./InvoiceState";

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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    const searchLower = searchTerm.toLowerCase();
    return data.filter(item =>
      item.stripeInvoiceId.toLowerCase().includes(searchLower) ||
      item.stripeSubscriptionId.toLowerCase().includes(searchLower) ||
      item.currency.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.amountPaid.toString().includes(searchTerm) ||
      item.amountDue.toString().includes(searchTerm)
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
      let aValue, bValue;
      
      if (sortConfig.key === 'paidAt' || sortConfig.key === 'periodStart' || sortConfig.key === 'periodEnd') {
        aValue = new Date(a[sortConfig.key]).getTime();
        bValue = new Date(b[sortConfig.key]).getTime();
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
  }, [filteredData, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-3 h-3 opacity-30" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3" /> 
      : <ChevronDown className="w-3 h-3" />;
  };

  // Calculate statistics based on filtered data
  const stats = {
    total: filteredData.length,
    paid: filteredData.filter((item) => item.status === "paid").length,
    pending: filteredData.filter((item) => item.status === "pending").length,
    totalAmountPaid: filteredData.reduce((acc, item) => acc + item.amountPaid, 0),
    totalAmountDue: filteredData.reduce((acc, item) => acc + item.amountDue, 0),
    totalPlatformFee: filteredData.reduce((acc, item) => acc + item.platformFee, 0),
  };

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
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

  // Delete function
  const handleDelete = (id) => {
    setData((prev) => prev.filter((subscription) => subscription.id !== id));
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  // Delete selected rows - Show confirmation
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm({ type: 'bulk' });
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
        <InvoiceState stats={stats}/>
        <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
          {/* Table Header - Search and Bulk Button */}
          <div className="bg-gradient-to-r from-[#392b80c9]/20 to-indigo-500/5 p-4 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-3 w-full">
              {/* Bulk Button */}
              <div className="flex-shrink-0">
                <BulkBtn
                  selectedCount={selectedRows.length}
                  onDelete={handleBulkDelete}
                  label="Invoice(s)"
                />
              </div>
              {/* Search */}
              <div className="relative lg:w-64 xl:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border bg-white border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392b80]/20 focus:border-[#392b80] transition-all text-sm"
                />
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
                        checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                      />
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('stripeInvoiceId')}
                    >
                      <div className="flex items-center gap-1">
                        Invoice ID
                        {getSortIcon('stripeInvoiceId')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('stripeSubscriptionId')}
                    >
                      <div className="flex items-center gap-1">
                        Subscription ID
                        {getSortIcon('stripeSubscriptionId')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('amountPaid')}
                    >
                      <div className="flex items-center gap-1">
                        Amount Paid
                        {getSortIcon('amountPaid')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('amountDue')}
                    >
                      <div className="flex items-center gap-1">
                        Amount Due
                        {getSortIcon('amountDue')}
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
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('paidAt')}
                    >
                      <div className="flex items-center gap-1">
                        Paid At
                        {getSortIcon('paidAt')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Invoice
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
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
                        {/* Checkbox */}
                        <td className="pl-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleRowSelection(item.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer focus:ring-[#392b80]"
                          />
                        </td>

                        {/* stripeInvoiceId */}
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-[#392b80] truncate block max-w-xs">
                            {item.stripeInvoiceId}
                          </span>
                        </td>

                        {/* stripeSubscriptionId */}
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-gray-700 truncate block max-w-xs">
                            {item.stripeSubscriptionId}
                          </span>
                        </td>

                        {/* amountPaid */}
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <p className="font-medium text-gray-700">
                              <span className="text-green-600">
                                ${item.amountPaid}
                              </span>
                              <span className="text-gray-400 text-xs ml-1">
                                {item.currency}
                              </span>
                            </p>
                            <div className="text-xs text-gray-500 mt-1">
                              <span className="font-medium">Fee: </span>
                              <span>${item.platformFee}</span>
                            </div>
                          </div>
                        </td>

                        {/* amountDue */}
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-700">
                            <span className="text-blue-600">
                              ${item.amountDue}
                            </span>
                            <span className="text-gray-400 text-xs ml-1">
                              {item.currency}
                            </span>
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            item.status === 'paid' ? 'bg-green-100 text-green-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>

                        {/* Paid At */}
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600">
                              {new Date(item.paidAt).toLocaleDateString()}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              <span className="font-medium">Period: </span>
                              <span>
                                {new Date(item.periodStart).toLocaleDateString()} - {new Date(item.periodEnd).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Invoice URL */}
                        <td className="px-4 py-3">
                          <a
                            href={item.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                          >
                            <Eye className="w-5 h-5" />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
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
                <span className="text-sm font-medium text-gray-700">Select All Invoices</span>
              </div>
            )}

            {sortedData.length > 0 ? (
              <div className="space-y-3 p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sortedData.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-xl transition-all ${
                      selectedRows.includes(item.id)
                        ? "bg-[#392b80]/10 border-[#392b80]"
                        : "bg-white border-gray-200"
                    }`}
                    onClick={() => toggleRowSelection(item.id)}
                  >
                    <div className="space-y-4">
                      {/* Header with checkbox and invoice info */}
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
                            <p className="text-sm font-bold text-[#392b80] truncate">
                              {item.stripeInvoiceId}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {item.stripeSubscriptionId}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          item.status === 'paid' ? 'bg-green-100 text-green-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>

                      {/* Invoice Details */}
                      <div className="space-y-2 pl-10">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-600">Amount Paid:</span>
                            <span className="font-bold text-green-600">${item.amountPaid}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-600">Amount Due:</span>
                            <span className="font-bold text-blue-600">${item.amountDue}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium min-w-20">Fee:</span>
                          <span>${item.platformFee}</span>
                          <span className="text-xs text-gray-400">({item.currency})</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">Paid:</span>
                            <span>{new Date(item.paidAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">Period:</span>
                            <span className="text-xs">
                              {new Date(item.periodStart).toLocaleDateString()} - {new Date(item.periodEnd).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Invoice Link */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        <a
                          href={item.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Invoice</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No Invoices Found</p>
              </div>
            )}
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
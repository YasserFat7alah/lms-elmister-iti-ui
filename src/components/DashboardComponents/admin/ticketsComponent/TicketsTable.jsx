"use client";
import { Eye, Mail, Phone, Trash2, Ticket, Clock, CheckCircle, AlertCircle, Search, ChevronUp, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import BulkBtn from "../BulkBtn";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";
import ViewTicket from "./ViewTicket";
import StatsCard from "../payouts/StatsCard";

const TicketsTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selectedItemView, setSelectedItemView] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState("");

  const [ticketsData, setTicketsData] = useState([
    {
      id: "ticket_001",
      fullName: "Ahmed Samir",
      email: "ahmed.samir@example.com",
      phone: "+201234567890",
      title: "Unable to login",
      message:
        "I am trying to log in but I keep getting an authentication error. Please help.",
      status: "open",
      date: "2025-01-10",
    },
    {
      id: "ticket_002",
      fullName: "Sara Mohamed",
      email: "sara.mohamed@example.com",
      phone: "+201112223334",
      title: "Payment not processed",
      message:
        "I tried to pay for my course but the transaction didn't go through.",
      status: "pending",
      date: "2025-01-11",
    },
    {
      id: "ticket_003",
      fullName: "Omar Youssef",
      email: "omar.youssef@example.com",
      phone: "+201556677889",
      title: "Wrong course content",
      message: "Some videos in the math course are incorrect or duplicated.",
      status: "open",
      date: "2025-01-08",
    },
    {
      id: "ticket_004",
      fullName: "Mai Adel",
      email: "mai.adel@example.com",
      phone: "+201093847561",
      title: "Can't reset password",
      message: "I requested a password reset but never received the email.",
      status: "resolved",
      date: "2025-01-05",
    },
    {
      id: "ticket_005",
      fullName: "Yassin Khaled",
      email: "yassin.khaled@example.com",
      phone: "+201234987654",
      title: "Issue with video playback",
      message: "Videos are not loading properly and keep buffering.",
      status: "pending",
      date: "2025-01-12",
    },
  ]);

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return ticketsData;
    
    const searchLower = searchTerm.toLowerCase();
    return ticketsData.filter(ticket =>
      ticket.id.toLowerCase().includes(searchLower) ||
      ticket.fullName.toLowerCase().includes(searchLower) ||
      ticket.email.toLowerCase().includes(searchLower) ||
      ticket.phone.toLowerCase().includes(searchLower) ||
      ticket.title.toLowerCase().includes(searchLower) ||
      ticket.message.toLowerCase().includes(searchLower) ||
      ticket.status.toLowerCase().includes(searchLower)
    );
  }, [ticketsData, searchTerm]);

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

  // Calculate statistics based on filtered data
  const stats = {
    total: filteredData.length,
    open: filteredData.filter((ticket) => ticket.status === "open").length,
    pending: filteredData.filter((ticket) => ticket.status === "pending").length,
    resolved: filteredData.filter((ticket) => ticket.status === "resolved").length,
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

  // Open view popup
  const handleViewClick = (ticket) => {
    setSelectedItemView(ticket);
    setIsOpenView(true);
  };

  // Delete function
  const handleDelete = (id) => {
    setTicketsData((prev) => prev.filter((ticket) => ticket.id !== id));
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  // Delete selected rows - Show confirmation
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm({ type: 'bulk' });
  };

  // Open delete confirmation for single item
  const handleDeleteClick = (ticket) => {
    setIsBulkDelete(false);
    setDeleteConfirm(ticket);
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
    setIsOpenView(false); 
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  // Status change handler
  const handleStatusChange = (id, newStatus) => {
    setTicketsData((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
    // Update selectedItemView 
    if (selectedItemView && selectedItemView.id === id) {
      setSelectedItemView((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Email handler 
  const handleEmail = (ticket) => {
    window.location.href = `mailto:${ticket.email}?subject=Re: ${ticket.title}`;
  };

  // Call handler 
  const handleCall = (ticket) => {
    window.location.href = `tel:${ticket.phone}`;
  };

  // Truncate text for display
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto ">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            icon={Ticket}
            title="Total Tickets"
            value={stats.total}
            color="bg-gray-600"
          />
          <StatsCard
            icon={AlertCircle}
            title="Open"
            value={stats.open}
            color="bg-red-500"
          />
          <StatsCard
            icon={Clock}
            title="Pending"
            value={stats.pending}
            color="bg-amber-500"
          />
          <StatsCard
            icon={CheckCircle}
            title="Resolved"
            value={stats.resolved}
            color="bg-green-500"
          />
        </div>

        <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-linear-to-r from-[#392b80c9]/20 to-indigo-500/5 p-4 border-b border-gray-100">
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
              <div className="relative w-full sm:w-72">
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
                {/* ______________HEAD TABLE_______________ */}
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="pl-4 py-3 text-left w-10">
                      <input
                        type="checkbox"
                        checked={
                          selectedRows.length === filteredData.length &&
                          filteredData.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                      />
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('fullName')}
                    >
                      <div className="flex items-center gap-1">
                        Full Name
                        {getSortIcon('fullName')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center gap-1">
                        Email
                        {getSortIcon('email')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('phone')}
                    >
                      <div className="flex items-center gap-1">
                        Number
                        {getSortIcon('phone')}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center gap-1">
                        Title
                        {getSortIcon('title')}
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
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* ______________BODY TABLE_______________ */}
                <tbody className="divide-y divide-gray-100">
                  {sortedData.length > 0 ? (
                    sortedData.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className={`transition-colors cursor-pointer ${
                          selectedRows.includes(ticket.id)
                            ? "bg-[#392b80]/10"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => toggleRowSelection(ticket.id)}
                      >
                        <td className="pl-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(ticket.id)}
                            onChange={() => toggleRowSelection(ticket.id)}
                            className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <p className="text-sm font-semibold text-[#392b80]">
                            {ticket.fullName}
                          </p>
                          <p className="text-xs text-gray-500">{ticket.id}</p>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <p
                            className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmail(ticket);
                            }}
                          >
                            {ticket.email}
                          </p>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <p
                            className="text-sm text-gray-600 hover:text-green-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCall(ticket);
                            }}
                          >
                            {ticket.phone}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-700">
                            {ticket.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {truncateText(ticket.message, 50)}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            ticket.status === 'open' ? 'bg-red-100 text-red-700' :
                            ticket.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {/* Email Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmail(ticket);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Call Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCall(ticket);
                              }}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors group cursor-pointer"
                              title="Call Customer"
                            >
                              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* View Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewClick(ticket);
                              }}
                              className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors group cursor-pointer"
                              title="View Ticket"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(ticket);
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors group cursor-pointer"
                              title="Delete Ticket"
                            >
                              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Ticket className="w-12 h-12 mb-3 text-gray-300" />
                          <p>No Tickets found</p>
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
                <span className="text-sm font-medium text-gray-700">Select All Tickets</span>
              </div>
            )}

            {sortedData.length > 0 ? (
              <div className="space-y-3 p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sortedData.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className={`p-4 border rounded-xl transition-all ${
                      selectedRows.includes(ticket.id)
                        ? "bg-[#392b80]/10 border-[#392b80]"
                        : "bg-white border-gray-200"
                    }`}
                    onClick={() => toggleRowSelection(ticket.id)}
                  >
                    <div className="space-y-4">
                      {/* Header with checkbox and ticket info */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(ticket.id)}
                            onChange={() => toggleRowSelection(ticket.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">ID:</span>
                              <span className="text-sm font-bold text-[#392b80]">{ticket.id}</span>
                            </div>
                            <p className="text-base font-bold text-gray-900 truncate mt-1">
                              {ticket.fullName}
                            </p>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-2 ${
                              ticket.status === 'open' ? 'bg-red-100 text-red-700' :
                              ticket.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Details */}
                      <div className="space-y-2 pl-10">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="truncate">{ticket.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                          <span>{ticket.phone}</span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-700">
                            {ticket.title}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {ticket.message}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmail(ticket);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="hidden sm:inline">Email</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(ticket);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="hidden sm:inline">Call</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewClick(ticket);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(ticket);
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
                <Ticket className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No Tickets Found</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* View Ticket Popup */}
      <ViewTicket
        item={selectedItemView}
        isOpen={isOpenView}
        onClose={() => setIsOpenView(false)}
        onDelete={handleDeleteClick}
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

export default TicketsTable;
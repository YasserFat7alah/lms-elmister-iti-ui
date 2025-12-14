"use client";
import { Eye, Trash2, Ticket, Clock, CheckCircle, AlertCircle, Search, ChevronUp, ChevronDown, MessageSquare, Mail, Phone } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import BulkBtn from "../BulkBtn";
import DeleteModal from "@/components/shared/DeleteModal";
import ViewTicket from "./ViewTicket";
import ReplyTicketModal from "./ReplyTicketModal";
import StatsCard from "../payouts/StatsCard";
import {
  useGetAllTicketsQuery,
  useUpdateTicketStatusMutation,
  useDeleteTicketMutation
} from "@/redux/api/endPoints/ticketsApiSlice";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/shared/Loader";
import { parsePhoneNumber } from 'libphonenumber-js';

const TicketsTable = () => {
  const { data: ticketsResponse, isLoading, isError } = useGetAllTicketsQuery();
  const [updateTicketStatus] = useUpdateTicketStatusMutation();
  const [deleteTicket] = useDeleteTicketMutation();

  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selectedItemView, setSelectedItemView] = useState(null);

  // Reply Modal State
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [selectedItemReply, setSelectedItemReply] = useState(null);

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState("");

  const ticketsData = ticketsResponse?.data?.tickets || [];

  const formatPhoneNumber = (phone) => {
    if (!phone) return "N/A";
    try {
      // Assuming phone numbers might not have '+' prefix in DB if saved raw
      const numberToParse = phone.startsWith('+') ? phone : '+' + phone;
      const phoneNumber = parsePhoneNumber(numberToParse);
      if (phoneNumber) {
        return `(${phoneNumber.countryCallingCode}) ${phoneNumber.formatNational()}`;
      }
    } catch (e) {
      // Fallback if parsing fails
      return phone;
    }
    return phone;
  };

  const formattedTickets = React.useMemo(() => ticketsData.map(t => ({
    id: t._id,
    fullName: t.name,
    email: t.email,
    phone: formatPhoneNumber(t.phone),
    originalPhone: t.phone, // Keep original for calling actions
    title: t.subject || t.title || "No Subject",
    message: t.message,
    status: t.status,
    date: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A',
    replies: t.replies
  })), [ticketsData]);

  // Sync selectedItemView with latest data
  useEffect(() => {
    if (selectedItemView && isOpenView) {
      const updatedTicket = formattedTickets.find(t => t.id === selectedItemView.id);
      if (updatedTicket) {
        setSelectedItemView(updatedTicket);
      }
    }
  }, [formattedTickets, isOpenView, selectedItemView?.id]);

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return formattedTickets;

    const searchLower = searchTerm.toLowerCase();
    return formattedTickets.filter(ticket =>
      (ticket.id && ticket.id.toLowerCase().includes(searchLower)) ||
      (ticket.fullName && ticket.fullName.toLowerCase().includes(searchLower)) ||
      (ticket.email && ticket.email.toLowerCase().includes(searchLower)) ||
      (ticket.phone && ticket.phone.toLowerCase().includes(searchLower)) ||
      (ticket.title && ticket.title.toLowerCase().includes(searchLower)) ||
      (ticket.message && ticket.message.toLowerCase().includes(searchLower)) ||
      (ticket.status && ticket.status.toLowerCase().includes(searchLower))
    );
  }, [formattedTickets, searchTerm]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

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

  const stats = {
    total: formattedTickets.length,
    open: formattedTickets.filter((ticket) => ticket.status === "open").length,
    pending: formattedTickets.filter((ticket) => ticket.status === "pending").length,
    resolved: formattedTickets.filter((ticket) => ticket.status === "resolved").length,
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length && filteredData.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item.id));
    }
  };

  const handleViewClick = (ticket) => {
    setSelectedItemView(ticket);
    setIsOpenView(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id).unwrap();
      toast.success("Ticket deleted successfully");
      if (selectedItemView?.id === id) setIsOpenView(false);
    } catch (err) {
      toast.error("Failed to delete ticket");
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm({ type: 'bulk' });
  };

  const handleDeleteClick = (ticket) => {
    setIsBulkDelete(false);
    setDeleteConfirm(ticket);
  };

  const confirmDelete = async () => {
    if (isBulkDelete) {
      Promise.all(selectedRows.map(id => deleteTicket(id).unwrap()))
        .then(() => {
          toast.success("Bulk delete successful");
          setSelectedRows([]);
        })
        .catch(() => toast.error("Some tickets failed to delete"));
    } else if (deleteConfirm) {
      await handleDelete(deleteConfirm.id);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTicketStatus({ id, status: newStatus }).unwrap();
      toast.success("Status updated");
      if (selectedItemView && selectedItemView.id === id) {
        setSelectedItemView((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleCall = (ticket) => {
    window.location.href = `tel:${ticket.originalPhone || ticket.phone}`;
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // New Reply Handlers
  const handleReplyClick = (ticket) => {
    setSelectedItemReply(ticket);
    setIsOpenReply(true);
  };

  const handleReplySuccess = (ticket) => {
    // Open View Ticket Modal to show the updated thread
    setSelectedItemView(ticket); // Or re-fetch ticket if needed, but view might use cached data
    setIsOpenView(true);
  };

  if (isLoading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  if (isError) return <div className="p-8 text-center text-red-500">Error loading tickets</div>;

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Stats Grid - Same as before */}
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
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('title')}>
                      <div className="flex items-center gap-1">Title {getSortIcon('title')}</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors w-1/6" onClick={() => handleSort('message')}>
                      <div className="flex items-center gap-1">Message {getSortIcon('message')}</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('fullName')}>
                      <div className="flex items-center gap-1">Full Name {getSortIcon('fullName')}</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('email')}>
                      <div className="flex items-center gap-1">Email {getSortIcon('email')}</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('phone')}>
                      <div className="flex items-center gap-1">Number {getSortIcon('phone')}</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('status')}>
                      <div className="flex items-center gap-1">Status {getSortIcon('status')}</div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedData.length > 0 ? (
                    sortedData.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className={`transition-colors cursor-pointer ${selectedRows.includes(ticket.id) ? "bg-[#392b80]/10" : "hover:bg-gray-50"}`}
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
                        <td className="px-4 py-3"><p className="text-sm font-medium text-gray-700">{ticket.title}</p></td>
                        <td className="px-4 py-3"><p className="text-xs text-gray-500">{truncateText(ticket.message, 60)}</p></td>
                        <td className="px-4 py-3 whitespace-nowrap"><p className="text-sm font-semibold text-[#392b80]">{ticket.fullName}</p></td>
                        <td className="px-4 py-3 whitespace-nowrap"><p className="text-sm text-gray-600">{ticket.email}</p></td>
                        <td className="px-4 py-3 whitespace-nowrap"><p className="text-sm text-gray-600">{ticket.phone}</p></td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${ticket.status === 'open' ? 'bg-red-100 text-red-700' : ticket.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {/* Reply Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReplyClick(ticket);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer"
                              title="Reply to Ticket"
                            >
                              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
                    <tr><td colSpan="8" className="px-6 py-12 text-center text-gray-500">No Tickets found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View - Updated similarly */}
          <div className="lg:hidden">
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
                    className={`p-4 border rounded-xl transition-all ${selectedRows.includes(ticket.id) ? "bg-[#392b80]/10 border-[#392b80]" : "bg-white border-gray-200"}`}
                    onClick={() => toggleRowSelection(ticket.id)}
                  >
                    <div className="space-y-4">
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
                            {/* ... (Mobile header content same logic tailored to new fields if need be, but fields are mainly same) */}
                            <div className="flex items-center gap-2">
                              {/* <span className="text-sm font-semibold text-gray-900">ID:</span> */}
                              {/* <span className="text-sm font-bold text-[#392b80]">{ticket.id.substring(ticket.id.length - 6)}</span> */}
                            </div>
                            <p className="text-base font-bold text-gray-900 truncate mt-1">{ticket.fullName}</p>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-2 ${ticket.status === 'open' ? 'bg-red-100 text-red-700' : ticket.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 pl-10">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="truncate">{ticket.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                          <span>{ticket.phone}</span>
                        </div>

                        <p className="text-sm font-medium text-gray-700">{ticket.title}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{ticket.message}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleReplyClick(ticket); }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          <MessageSquare className="w-4 h-4" /> <span className="hidden sm:inline">Reply</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleViewClick(ticket); }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          <Eye className="w-4 h-4" /> <span className="hidden sm:inline">View</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteClick(ticket); }}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white"><Ticket className="w-12 h-12 mx-auto mb-3 text-gray-300" /><p className="text-gray-500">No Tickets Found</p></div>
            )}
          </div>
        </Card>
      </div>

      <ViewTicket
        item={selectedItemView}
        isOpen={isOpenView}
        onClose={() => setIsOpenView(false)}
        onDelete={handleDeleteClick}
        onStatusChange={handleStatusChange}
      />

      {/* Reply Ticket Modal */}
      <ReplyTicketModal
        item={selectedItemReply}
        isOpen={isOpenReply}
        onClose={() => setIsOpenReply(false)}
        onSuccess={handleReplySuccess}
      />

      <DeleteModal
        isOpen={!!deleteConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title={isBulkDelete ? "Delete Selected Tickets" : "Delete Ticket"}
        description={isBulkDelete ? `Are you sure you want to delete ${selectedRows.length} tickets?` : "Are you sure you want to delete this ticket?"}
      />
    </div>
  );
};
export default TicketsTable;

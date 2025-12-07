"use client";
import { Eye, Mail, Phone, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import BulkBtn from "../BulkBtn";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";
import ViewTicket from "./ViewTicket";

const TicketsTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selectedItemView, setSelectedItemView] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

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

  // _________________Selection Logic________________________

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === ticketsData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(ticketsData.map((item) => item.id));
    }
  };

  //   _________________View Logic________________________
  // Open view popup
  const handleViewClick = (ticket) => {
    setSelectedItemView(ticket);
    setIsOpenView(true);
  };

  //   _________________Delete Logic________________________

  // Delete function
  const handleDelete = (id) => {
    setTicketsData((prev) => prev.filter((ticket) => ticket.id !== id));
    // Also remove from selected rows if it was selected
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  // Delete selected rows - Show confirmation
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm(true);
  };

  // Open delete confirmation for single item
  const handleDeleteClick = (ticket) => {
    setIsBulkDelete(false);
    setDeleteConfirm(ticket);
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
    setIsOpenView(false); // Close view popup after delete
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
    // Update selectedItemView if it's the current item being viewed
    if (selectedItemView && selectedItemView.id === id) {
      setSelectedItemView((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Email handler - FIXED: receives ticket as parameter
  const handleEmail = (ticket) => {
    window.location.href = `mailto:${ticket.email}?subject=Re: ${ticket.title}`;
  };

  // Call handler - FIXED: receives ticket as parameter
  const handleCall = (ticket) => {
    window.location.href = `tel:${ticket.phone}`;
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
                Tickets Overview
                <span className="text-lg">🎫</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Track your support tickets
              </p>
            </div>

            {/* Bulk Delete Button */}
            <BulkBtn
              selectedCount={selectedRows.length}
              onDelete={handleBulkDelete}
              label="Ticket selected"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Table */}
          <table className="w-full">
            {/* ______________HEAD TABLE_______________ */}
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === ticketsData.length &&
                      ticketsData.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                </th>
              </tr>
            </thead>
            {/* ______________BODY TABLE_______________ */}
            <tbody className="divide-y divide-gray-200">
              {ticketsData.length > 0 ? (
                ticketsData.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className={`transition-colors cursor-pointer ${
                      selectedRows.includes(ticket.id)
                        ? "bg-[#392b80]/10"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleRowSelection(ticket.id)}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(ticket.id)}
                        onChange={() => toggleRowSelection(ticket.id)}
                        className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-[#392b80]">
                        {ticket.fullName}
                      </p>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600 hover:text-blue-500" onClick={(e) => { e.stopPropagation(); handleEmail(ticket); }}>{ticket.email}</p>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600 hover:text-green-500" onClick={(e) => { e.stopPropagation(); handleCall(ticket); }}>{ticket.phone}</p>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-[#392b80]">
                        {truncateText(ticket.title, 15)}
                      </p>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">
                        {truncateText(ticket.message, 12)}
                      </p>
                    </td>

                    <td className="px-2 py-4">
                      <div className="flex items-center gap-1">
                        {/* Email Button - FIXED: passes ticket parameter */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmail(ticket);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Call Button - FIXED: passes ticket parameter */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(ticket);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group cursor-pointer"
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
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors group cursor-pointer"
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
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group cursor-pointer"
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
                      <p>No Tickets found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

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
    </>
  );
};

export default TicketsTable;

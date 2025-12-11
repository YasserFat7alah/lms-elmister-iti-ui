"use client";
import React, { useState } from "react";
import {
  Trash2,
  Mail,
  Search,
  Plus,
  Trash2Icon,
  AlertTriangle,
  X,
} from "lucide-react";
import AddEmailInput from "./AddEmailInput";
import { Dialog } from "@/components/ui/dialog";
import PopUp from "../PopUp";

const SubscibedEmails = ({
  emails,
  setEmails,
  selectedEmails,
  setSelectedEmails,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // _________ Filter Emails Based on Search Term _________
  const filteredEmails = emails.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // _________ Delete Selected Emails _________
  // const handleDeleteSelected = () => {
  //   setEmails((prev) =>
  //     prev.filter((email) => !selectedEmails.includes(email.id))
  //   );
  //   setSelectedEmails([]);
  // };

  // _________ Confirm Delete Selected Emails _________
  const handleConfirmDelete = () => {
    if (deleteTarget === "all") {
      // delete all selected emails
      setEmails((prev) =>
        prev.filter((email) => !selectedEmails.includes(email.id))
      );
      setSelectedEmails([]);
    } else {
      // delete one email
      setEmails((prev) => prev.filter((email) => email.id !== deleteTarget));
      setSelectedEmails((prev) => prev.filter((id) => id !== deleteTarget));
    }

    setDeleteTarget(null);
  };

  // _________ Handle Select/Deselect Email _________
  const toggleSelect = (id) => {
    // Select/Deselect All
    if (id === "all") {
      if (selectedEmails.length === filteredEmails.length) {
        setSelectedEmails([]);
      } else {
        setSelectedEmails(filteredEmails.map((e) => e.id));
      }
      return;
    }

    // Select/Deselect Single Item
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Subscriber List <span className="text-lg">📧</span>
        </h2>
        <p className="text-sm text-gray-600">Manage your email subscribers</p>
      </div>

        {/* Add Email */}
        <AddEmailInput emails={emails} setEmails={setEmails} />
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392b80c9]/20 focus:border-green-500 transition-all"
        />
      </div>


      {/* Select All */}
      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <input
          type="checkbox"
          checked={
            selectedEmails.length === filteredEmails.length &&
            filteredEmails.length > 0
          }
          onChange={() => toggleSelect("all")}
          className="w-5 h-5 cursor-pointer accent-green-600"
        />
        <label
          className="text-sm font-medium text-gray-700 cursor-pointer"
          onClick={() => toggleSelect("all")}
        >
          Select All ({filteredEmails.length})
        </label>
        {/* ____IF SELECTED APPEAR DELETE ALL ICON____ */}
        {selectedEmails.length > 0 && (
          <span
            onClick={() => setDeleteTarget("all")}
            className="ml-auto w-7 h-7 flex items-center justify-center bg-red-600 text-white 
             transition-all ease-in-out duration-500 rounded-2xl cursor-pointer font-medium"
          >
            <Trash2Icon size={20} />
          </span>
        )}
      </div>

      {/* Emails List */}
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {filteredEmails.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
              selectedEmails.includes(item.id)
                ? "bg-green-500/5 border-green-500/30 shadow-sm"
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={selectedEmails.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
                className="w-4 h-4 cursor-pointer accent-green-600"
              />
              <div
                onClick={() => toggleSelect(item.id)}
                className="cursor-pointer"
              >
                <p className="font-medium text-[#392b80]">{item.email}</p>
                <p className="text-xs text-gray-500">
                  Subscribed: {item.subscribed}
                </p>
              </div>
            </div>

            <button
              onClick={() => setDeleteTarget(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer "
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {filteredEmails.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No subscribers found</p>
          </div>
        )}
      </div>
      {/* ________________Confirm Delete Selected Emails______________ */}
      <PopUp isOpen={deleteTarget !== null} onClose={cancelDelete}>
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 border-b border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Confirm Delete
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={cancelDelete}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            {deleteTarget === "all"
              ? "Delete Selected Emails?"
              : "Delete Email?"}
          </h2>

          <p className="text-gray-600 text-sm mb-6">
            {deleteTarget === "all"
              ? `Are you sure you want to delete ${selectedEmails.length} emails?`
              : `Are you sure you want to delete this email?`}
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={cancelDelete}
              className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmDelete}
              className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default SubscibedEmails;

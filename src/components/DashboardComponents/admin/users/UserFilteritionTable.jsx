"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Baby, Search, Trash2, Edit, Mail, Phone, MapPin } from "lucide-react";
import ConfirmDeletePopUp from "./ConfirmDeletePopUp";
import EditUserPopup from "./EditUserPopup ";
import BulkBtn from "../BulkBtn";

const UserFilteritionTable = ({ filtered, title, searchTerm, setSearchTerm, onEdit, onDelete }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === filtered.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filtered.map((user) => user.id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm(true);
  };

  // Handle single delete
  const handleDeleteClick = (e, user) => {
    e.stopPropagation();
    setIsBulkDelete(false);
    setDeleteConfirm(user);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (isBulkDelete) {
      // Pass array of IDs to parent
      onDelete(selectedRows);
      setSelectedRows([]);
    } else if (deleteConfirm) {
      // Pass single ID to parent
      onDelete(deleteConfirm.id);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  // Handle edit click
  const handleEditClick = (e, user) => {
    e.stopPropagation();
    setEditUser(user);
    setIsEditOpen(true);
  };

  // Handle save edit
  const handleSaveEdit = (updatedUser) => {
    onEdit(updatedUser);
    setIsEditOpen(false);
    setEditUser(null);
  };

  return (
    <>
      <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-6">
        <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 px-7 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {title}
                <span className="text-sm font-normal text-gray-500">
                  ({filtered.length} users)
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Bulk Actions Button */}
              <BulkBtn
                selectedCount={selectedRows.length}
                onDelete={handleBulkDelete}
                label="user(s) selected"
              />

              {/* Search */}
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff3c]/20 focus:border-[#00ff3c] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className={`transition-colors cursor-pointer ${
                      selectedRows.includes(user.id)
                        ? "bg-[#FF0055]/10"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleRowSelection(user.id)}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => toggleRowSelection(user.id)}
                        className="w-4 h-4 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            user.role === "parent"
                              ? "bg-purple-500"
                              : user.role === "teacher"
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }`}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        {user.phone ? (
                          <>
                            <Phone className="w-4 h-4 text-gray-400" />
                            {user.phone}
                          </>
                        ) : (
                          <span> __ </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {user.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "parent"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "teacher"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {user.role === "parent" && <Baby className="w-3.5 h-3.5" />}
                        {user.role === "teacher" && <GraduationCap className="w-3.5 h-3.5" />}
                        {user.role === "student" && <Users className="w-3.5 h-3.5" />}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleEditClick(e, user)}
                          className="p-2 text-[#FF0055] hover:bg-[#FF0055]/10 rounded-lg transition-colors group"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, user)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                          title="Delete User"
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
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit User Popup */}
      <EditUserPopup
        isOpen={isEditOpen}
        user={editUser}
        onClose={() => {
          setIsEditOpen(false);
          setEditUser(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* Confirm Delete Popup */}
      <ConfirmDeletePopUp
        isOpen={!!deleteConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isBulk={isBulkDelete}
        selectedCount={selectedRows.length}
        userName={deleteConfirm?.name}
      />
    </>
  );
};

export default UserFilteritionTable;